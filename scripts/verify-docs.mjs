/**
 * Verifies the generated docs against the plugin source.
 *
 * Every check re-derives its number from the PHP with an independent parser —
 * deliberately not the one in generate-docs.mjs — so a parsing hole in the
 * generator shows up as a mismatch instead of being reproduced on both sides.
 *
 * Usage: node scripts/verify-docs.mjs   (exit 1 on any mismatch)
 */

import { existsSync, readFileSync, readdirSync, statSync } from 'fs'
import { dirname, join, resolve } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const repoRoot = resolve(__dirname, '..')
const pluginRoot = resolve(repoRoot, '..')
const pluginsRoot = resolve(pluginRoot, '..')
const proRoot = join(pluginsRoot, 'fluent-booking-pro')
const docsRoot = join(repoRoot, 'docs')

const failures = []
const notes = []

function check(label, expected, actual) {
  if (expected === actual) {
    notes.push(`  ok   ${label}: ${actual}`)
    return
  }
  failures.push(`  FAIL ${label}: source says ${expected}, docs say ${actual}`)
}

function read(file) {
  return readFileSync(file, 'utf8')
}

function walk(dir, filter = () => true) {
  if (!existsSync(dir)) return []
  const out = []
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    if (statSync(full).isDirectory()) out.push(...walk(full, filter))
    else if (filter(full)) out.push(full)
  }
  return out
}

const sources = [
  { id: 'core', root: pluginRoot, label: 'fluent-booking' },
  ...(existsSync(proRoot) ? [{ id: 'pro', root: proRoot, label: 'fluent-booking-pro' }] : []),
]

// ── Hooks ────────────────────────────────────────────────────────────────────

const hookCalls = { action: [], filter: [] }
for (const src of sources) {
  for (const dir of ['app', 'boot']) {
    for (const file of walk(join(src.root, dir), (p) => p.endsWith('.php'))) {
      const content = read(file)
      const re = /(do_action|apply_filters)(?:_ref_array)?\s*\(\s*['"]([^'"\n]+)['"]/g
      let m
      while ((m = re.exec(content))) {
        hookCalls[m[1] === 'do_action' ? 'action' : 'filter'].push(m[2])
      }
    }
  }
}

for (const type of ['action', 'filter']) {
  const dir = join(docsRoot, 'hooks', type === 'action' ? 'actions' : 'filters')
  const documented = new Set()
  for (const file of walk(dir, (p) => p.endsWith('.md'))) {
    for (const m of read(file).matchAll(/^## `([^`]+)`$/gm)) documented.add(m[1])
  }
  const unique = new Set(hookCalls[type])
  check(`${type} hooks (unique)`, unique.size, documented.size)

  const missing = [...unique].filter((n) => !documented.has(n))
  if (missing.length) failures.push(`  FAIL ${type} hooks missing from docs: ${missing.join(', ')}`)

  const index = read(join(dir, 'index.md'))
  const sites = Number(index.match(/call sites:\*\* (\d+)/)[1])
  check(`${type} call sites`, hookCalls[type].length, sites)
}

// ── REST routes ──────────────────────────────────────────────────────────────

const sourceRoutes = new Set()
for (const src of sources) {
  const file = join(src.root, 'app', 'Http', 'Routes', 'api.php')
  if (!existsSync(file)) continue
  read(file)
    .split('\n')
    .forEach((line, i) => {
      if (/\$router->(get|post|put|patch|delete|options|any)\s*\(/.test(line)) {
        sourceRoutes.add(`${src.label}/app/Http/Routes/api.php:${i + 1}`)
      }
    })
}

const documentedRoutes = new Set()
for (const file of walk(join(docsRoot, 'rest-api', 'operations'), (p) => p.endsWith('.md'))) {
  const m = read(file).match(/\*\*Route source:\*\* `([^`]+)`/)
  if (m) documentedRoutes.add(m[1])
}
check('REST routes', sourceRoutes.size, documentedRoutes.size)
const missingRoutes = [...sourceRoutes].filter((r) => !documentedRoutes.has(r))
if (missingRoutes.length) failures.push(`  FAIL routes missing from docs: ${missingRoutes.join(', ')}`)

const opPages = walk(join(docsRoot, 'rest-api', 'operations'), (p) => p.endsWith('.md')).length
const specs = walk(join(repoRoot, 'public', 'openapi'), (p) => p.endsWith('.json') && !p.endsWith('manifest.json')).length
check('OpenAPI specs (one per operation page)', opPages, specs)

// ── Database ─────────────────────────────────────────────────────────────────

const schemaDoc = read(join(docsRoot, 'database', 'schema.md'))
for (const src of sources) {
  for (const file of walk(join(src.root, 'database', 'Migrations'), (p) => p.endsWith('.php'))) {
    const content = read(file)
    const table =
      content.match(/\$tableName\s*=\s*['"]([^'"]+)['"]/)?.[1] ||
      content.match(/\$table\s*=\s*\$wpdb->prefix\s*\.\s*['"]([^'"]+)['"]/)?.[1]
    if (!table) {
      failures.push(`  FAIL could not read table name from ${file}`)
      continue
    }
    const body = content.match(/CREATE\s+TABLE[^(]*\(([\s\S]*?)\)\s*\$charsetCollate;/i)?.[1] ?? ''
    const columns = [...body.matchAll(/^\s*`([^`]+)`\s+[A-Za-z]/gm)].length
    const indexes = [...body.matchAll(/^\s*(?:UNIQUE\s+)?(?:KEY|INDEX)\s+`/gim)].length

    const row = schemaDoc.match(new RegExp(`\\| \`${table}\` \\|[^|]*\\| (\\d+) \\| (\\d+) \\|`))
    if (!row) {
      failures.push(`  FAIL ${table} is missing from database/schema.md`)
      continue
    }
    check(`${table} columns`, columns, Number(row[1]))
    check(`${table} indexes`, indexes, Number(row[2]))
  }
}

// ── MCP abilities ────────────────────────────────────────────────────────────

const sourceAbilities = new Set()
for (const src of sources) {
  for (const file of walk(join(src.root, 'app', 'Modules', 'MCP'), (p) => p.endsWith('.php'))) {
    const content = read(file)
    if (!/public\s+static\s+function\s+definitions\s*\(/.test(content)) continue
    for (const m of content.matchAll(/'(fluent-booking\/[a-z0-9-]+)'\s*=>\s*\[/g)) sourceAbilities.add(m[1])
  }
}
const abilityPages = walk(join(docsRoot, 'mcp', 'abilities'), (p) => p.endsWith('.md'))
check('MCP abilities', sourceAbilities.size, abilityPages.length)
const documentedAbilities = new Set(abilityPages.map((p) => read(p).match(/^# `([^`]+)`$/m)?.[1]))
const missingAbilities = [...sourceAbilities].filter((a) => !documentedAbilities.has(a))
if (missingAbilities.length) failures.push(`  FAIL MCP abilities missing from docs: ${missingAbilities.join(', ')}`)

// Each ability's parameter table must carry every property in its input schema.
for (const src of sources) {
  for (const file of walk(join(src.root, 'app', 'Modules', 'MCP'), (p) => p.endsWith('.php'))) {
    const content = read(file)
    for (const m of content.matchAll(/'(fluent-booking\/[a-z0-9-]+)'\s*=>\s*\[/g)) {
      const schemaIndex = content.indexOf("'input_schema'", m.index)
      const endIndex = content.indexOf("'execute_callback'", m.index)
      if (schemaIndex === -1 || schemaIndex > endIndex) continue
      const propsIndex = content.indexOf("'properties'", schemaIndex)
      // An ability with no parameters has no properties block of its own; the
      // next one in the file belongs to another ability.
      if (propsIndex === -1 || propsIndex > endIndex) continue
      // `'properties' => new \stdClass()` is how a parameterless ability is
      // declared (an empty PHP array would serialise as a JSON array); there is
      // no property list to compare in that case.
      const afterArrow = content.slice(propsIndex).match(/'properties'\s*=>\s*(\[|new\b)/)
      if (!afterArrow || afterArrow[1] !== '[') continue
      const open = content.indexOf('[', propsIndex)
      let depth = 0
      let end = open
      for (let i = open; i < content.length; i++) {
        if (content[i] === '[') depth++
        else if (content[i] === ']') {
          depth--
          if (depth === 0) {
            end = i
            break
          }
        }
      }
      const propNames = []
      const propBody = content.slice(open + 1, end)
      let depth2 = 0
      for (let i = 0; i < propBody.length; i++) {
        const ch = propBody[i]
        if (ch === "'" || ch === '"') {
          const quote = ch
          let j = i + 1
          while (j < propBody.length && propBody[j] !== quote) j += propBody[j] === '\\' ? 2 : 1
          // Keys are aligned with padding in the source, so look past it.
          if (depth2 === 0 && /^\s*=>/.test(propBody.slice(j + 1, j + 40))) propNames.push(propBody.slice(i + 1, j))
          i = j
          continue
        }
        if (ch === '[' || ch === '(') depth2++
        else if (ch === ']' || ch === ')') depth2--
      }

      const page = join(docsRoot, 'mcp', 'abilities', `${m[1].split('/').pop()}.md`)
      if (!existsSync(page)) continue
      const doc = read(page)
      const undocumented = propNames.filter((name) => !doc.includes(`| \`${name}\` |`))
      if (undocumented.length) {
        failures.push(`  FAIL ${m[1]} parameters missing from docs: ${undocumented.join(', ')}`)
      } else {
        notes.push(`  ok   ${m[1]} parameters: ${propNames.length}`)
      }
    }
  }
}

// ── Platform surfaces ────────────────────────────────────────────────────────

// Shortcodes: every add_shortcode tag, and every shortcode_atts default.
const sourceShortcodes = new Map()
for (const src of sources) {
  for (const file of walk(join(src.root, 'app'), (p) => p.endsWith('.php'))) {
    const content = read(file)
    if (!content.includes('add_shortcode')) continue
    for (const m of content.matchAll(/add_shortcode\(\s*['"]([^'"]+)['"]\s*,\s*\[\s*\$this\s*,\s*['"]([^'"]+)['"]/g)) {
      const attsIndex = content.search(new RegExp(`function\\s+${m[2]}\\s*\\([\\s\\S]{0,400}?shortcode_atts\\(\\s*\\[`))
      const attributes = []
      if (attsIndex !== -1) {
        const open = content.indexOf('[', content.indexOf('shortcode_atts', attsIndex))
        let depth = 0
        for (let i = open; i < content.length; i++) {
          if (content[i] === '[') depth++
          else if (content[i] === ']') {
            depth--
            if (depth === 0) {
              for (const attr of content.slice(open + 1, i).matchAll(/^\s*'([a-z_]+)'\s*=>/gm)) attributes.push(attr[1])
              break
            }
          }
        }
      }
      sourceShortcodes.set(m[1], attributes)
    }
  }
}

const shortcodeDoc = read(join(docsRoot, 'platform', 'shortcodes.md'))
check('shortcodes', sourceShortcodes.size, [...shortcodeDoc.matchAll(/^## `\[([^\]]+)\]`$/gm)].length)
for (const [tag, attributes] of sourceShortcodes) {
  if (!shortcodeDoc.includes(`## \`[${tag}]\``)) {
    failures.push(`  FAIL shortcode [${tag}] is missing from docs`)
    continue
  }
  const section = shortcodeDoc.slice(shortcodeDoc.indexOf(`## \`[${tag}]\``)).split(/\n<a id=/)[0]
  const missing = attributes.filter((a) => !section.includes(`| \`${a}\` |`))
  if (missing.length) failures.push(`  FAIL [${tag}] attributes missing from docs: ${missing.join(', ')}`)
}

// AJAX actions
const sourceAjax = new Set()
for (const src of sources) {
  for (const file of walk(join(src.root, 'app'), (p) => p.endsWith('.php'))) {
    const content = read(file)
    for (const m of content.matchAll(/add_action\(\s*['"]wp_ajax_(?:nopriv_)?([a-z0-9_]+)['"]\s*,\s*\[\s*\$this\s*,/g)) {
      sourceAjax.add(m[1])
    }
  }
}
const missingAjax = [...sourceAjax].filter((a) => !shortcodeDoc.includes(`| \`${a}\` |`))
check('AJAX actions', sourceAjax.size, sourceAjax.size - missingAjax.length)
if (missingAjax.length) failures.push(`  FAIL AJAX actions missing from docs: ${missingAjax.join(', ')}`)

// Blocks and their attributes
const blockDoc = read(join(docsRoot, 'platform', 'blocks.md'))
const sourceBlocks = new Map()
for (const src of sources) {
  for (const file of walk(join(src.root, 'app'), (p) => p.endsWith('.php'))) {
    const content = read(file)
    if (!content.includes('register_block_type')) continue
    const registrations = [...content.matchAll(/register_block_type\(\s*['"]([^'"]+)['"]/g)]
    registrations.forEach((m, index) => {
      const next = registrations[index + 1]
      const segment = content.slice(m.index, next ? next.index : content.length)
      const attributes = [...segment.matchAll(/'([a-zA-Z_]+)'\s*=>\s*(?:array\(|\[)\s*\n\s*'type'/g)].map((a) => a[1])
      sourceBlocks.set(m[1], attributes)
    })
  }
}
check('blocks', sourceBlocks.size, [...blockDoc.matchAll(/^## `([^`]+)`$/gm)].length)
for (const [name, attributes] of sourceBlocks) {
  const heading = `## \`${name}\``
  if (!blockDoc.includes(heading)) {
    failures.push(`  FAIL block ${name} is missing from docs`)
    continue
  }
  const section = blockDoc.slice(blockDoc.indexOf(heading)).split(/\n<a id=/)[0]
  const missing = attributes.filter((a) => !section.includes(`| \`${a}\` |`))
  if (missing.length) failures.push(`  FAIL ${name} attributes missing from docs: ${missing.join(', ')}`)
  else notes.push(`  ok   ${name} attributes: ${attributes.length}`)
}

// Smartcodes
const helperSource = read(join(pluginRoot, 'app', 'Services', 'Helper.php'))
const smartcodeStart = helperSource.search(/function\s+getEditorShortCodes\s*\(/)
const smartcodeEnd = helperSource.indexOf("apply_filters('fluent_booking/editor_shortcodes_groups'", smartcodeStart)
const smartcodeBody = helperSource.slice(smartcodeStart, smartcodeEnd)
const sourceSmartcodes = new Set([
  ...[...smartcodeBody.matchAll(/'((?:\{\{|##)[^']+)'\s*=>/g)].map((m) => m[1]),
  ...[...smartcodeBody.matchAll(/\['shortcodes'\]\['([^']+)'\]/g)].map((m) => m[1]),
])
const smartcodeDoc = read(join(docsRoot, 'platform', 'smartcodes.md'))
// Smartcode cells are rendered as `<code v-pre>` so Vue leaves the braces alone.
const missingSmartcodes = [...sourceSmartcodes].filter(
  (code) => !smartcodeDoc.includes(`<code v-pre>${code.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code>`),
)
check('smartcodes', sourceSmartcodes.size, sourceSmartcodes.size - missingSmartcodes.length)
if (missingSmartcodes.length) failures.push(`  FAIL smartcodes missing from docs: ${missingSmartcodes.join(', ')}`)

// Permission sets and policies
const permissionSource = read(join(pluginRoot, 'app', 'Services', 'PermissionManager.php'))
const setsBody = permissionSource.slice(permissionSource.search(/function\s+allPermissionSets\s*\(/))
const sourceSets = [...setsBody.slice(0, setsBody.indexOf('];')).matchAll(/'([a-z_]+)'\s*=>\s*__\(/g)].map((m) => m[1])
const permissionDoc = read(join(docsRoot, 'platform', 'permissions.md'))
const missingSets = sourceSets.filter((s) => !permissionDoc.includes(`| \`${s}\` |`))
check('permission sets', sourceSets.length, sourceSets.length - missingSets.length)
if (missingSets.length) failures.push(`  FAIL permission sets missing from docs: ${missingSets.join(', ')}`)

const sourcePolicies = sources.flatMap((src) =>
  walk(join(src.root, 'app', 'Http', 'Policies'), (p) => p.endsWith('.php')).map((f) => f.split('/').pop().replace('.php', '')),
)
const missingPolicies = sourcePolicies.filter((p) => !permissionDoc.includes(`| \`${p}\` |`))
check('policies', sourcePolicies.length, sourcePolicies.length - missingPolicies.length)
if (missingPolicies.length) failures.push(`  FAIL policies missing from docs: ${missingPolicies.join(', ')}`)

// Scheduled tasks
const sourceTasks = new Set()
for (const src of sources) {
  for (const file of walk(join(src.root, 'app'), (p) => p.endsWith('.php'))) {
    for (const m of read(file).matchAll(/as_schedule_recurring_action\(\s*time\(\)\s*,[^,]*,\s*['"]([^'"]+)['"]/g)) {
      sourceTasks.add(m[1])
    }
  }
}
const taskDoc = read(join(docsRoot, 'platform', 'scheduled-tasks.md'))
const missingTasks = [...sourceTasks].filter((t) => !taskDoc.includes(`## \`${t}\``))
check('scheduled tasks', sourceTasks.size, sourceTasks.size - missingTasks.length)
if (missingTasks.length) failures.push(`  FAIL scheduled tasks missing from docs: ${missingTasks.join(', ')}`)

// Event configuration vocabularies
const eventConfigDoc = read(join(docsRoot, 'platform', 'event-configuration.md'))

const slotSource = read(join(pluginRoot, 'app', 'Models', 'CalendarSlot.php'))
const locationBody = slotSource.slice(slotSource.indexOf("apply_filters('fluent_booking/get_location_fields'"))
const sourceLocationTypes = [...locationBody.slice(0, locationBody.indexOf('], $calendarEvent')).matchAll(/'([a-z_]+)'\s*=>\s*\[\s*\n\s*'title'/g)].map((m) => m[1])
const missingLocations = sourceLocationTypes.filter((t) => !eventConfigDoc.includes(`| \`${t}\` |`))
check('location types', sourceLocationTypes.length, sourceLocationTypes.length - missingLocations.length)
if (missingLocations.length) failures.push(`  FAIL location types missing from docs: ${missingLocations.join(', ')}`)

const fieldSource = read(join(pluginRoot, 'app', 'Services', 'BookingFieldService.php'))
const defaultsBody = fieldSource.slice(fieldSource.search(/\$defaultFields\s*=\s*\[/))
const sourceSystemFields = [...defaultsBody.slice(0, defaultsBody.indexOf('\n        ];')).matchAll(/^\s{12}'([a-z_]+)'\s*=>\s*\[/gm)].map((m) => m[1])
const missingFields = sourceSystemFields.filter((f) => !eventConfigDoc.includes(`| \`${f}\` |`))
check('system booking fields', sourceSystemFields.length, sourceSystemFields.length - missingFields.length)
if (missingFields.length) failures.push(`  FAIL system booking fields missing from docs: ${missingFields.join(', ')}`)

const typesBody = helperSource.slice(helperSource.indexOf("apply_filters('fluent_booking/custom_fields_types'"))
const sourceFieldTypes = [...typesBody.slice(0, typesBody.indexOf(']);')).matchAll(/'value'\s*=>\s*'([^']+)'/g)].map((m) => m[1])
const missingTypes = sourceFieldTypes.filter((t) => !eventConfigDoc.includes(`| \`${t}\` |`))
check('custom field types', sourceFieldTypes.length, sourceFieldTypes.length - missingTypes.length)
if (missingTypes.length) failures.push(`  FAIL custom field types missing from docs: ${missingTypes.join(', ')}`)

// MCP gates must reach the ability pages.
const gateSource = read(join(pluginRoot, 'app', 'Modules', 'MCP', 'Support', 'PermissionGate.php'))
const gateConsts = new Map(
  [...gateSource.matchAll(/const\s+([A-Z_]+)\s*=\s*\[([^\]]*)\]/g)].map((m) => [m[1], [...m[2].matchAll(/'([a-z_]+)'/g)].map((c) => c[1])]),
)
for (const m of gateSource.matchAll(/function\s+([a-zA-Z0-9_]+Gate)\s*\([^)]*\)\s*\{([\s\S]*?)\n    \}/g)) {
  const constName = m[2].match(/self::([A-Z_]+)/)
  if (!constName || !gateConsts.has(constName[1])) continue
  const caps = gateConsts.get(constName[1])
  const users = abilityPages.filter((p) => read(p).includes(`${m[1]}()`))
  for (const page of users) {
    const doc = read(page)
    const missing = caps.filter((cap) => !doc.includes(`\`${cap}\``))
    if (missing.length) failures.push(`  FAIL ${page.split('/').pop()} omits required sets: ${missing.join(', ')}`)
  }
  notes.push(`  ok   ${m[1]} required sets on ${users.length} ability page(s): ${caps.length}`)
}

// ── Curated pages that quote source lists ────────────────────────────────────

// The outgoing-webhook guide lists the trigger slugs; they come from the Pro
// WebhookIntegration status map.
const webhookFile = join(proRoot, 'app', 'Services', 'Integrations', 'Webhook', 'WebhookIntegration.php')
if (existsSync(webhookFile)) {
  const webhookSource = read(webhookFile)
  const mapBody = webhookSource.slice(webhookSource.search(/\$maps\s*=\s*\[/))
  const triggers = [...mapBody.slice(0, mapBody.indexOf('];')).matchAll(/=>\s*'([a-z_]+)'/g)].map((m) => m[1])
  const webhookDoc = read(join(docsRoot, 'guides', 'incoming-webhooks.md'))
  const missingTriggers = triggers.filter((t) => !webhookDoc.includes(`\`${t}\``))
  check('webhook triggers', triggers.length, triggers.length - missingTriggers.length)
  if (missingTriggers.length) {
    failures.push(`  FAIL webhook triggers missing from guides/incoming-webhooks.md: ${missingTriggers.join(', ')}`)
  }
}

// The custom-booking-fields guide quotes the field-type catalog inline.
const fieldGuide = read(join(docsRoot, 'guides', 'custom-booking-fields.md'))
const missingGuideTypes = sourceFieldTypes.filter((t) => !fieldGuide.includes(`'${t}'`))
check('field types in the custom-fields guide', sourceFieldTypes.length, sourceFieldTypes.length - missingGuideTypes.length)
if (missingGuideTypes.length) {
  failures.push(`  FAIL field types missing from guides/custom-booking-fields.md: ${missingGuideTypes.join(', ')}`)
}

// ── Models ───────────────────────────────────────────────────────────────────

const modelFiles = sources.flatMap((src) => walk(join(src.root, 'app', 'Models'), (p) => p.endsWith('.php')))
const modelNames = new Set(modelFiles.map((f) => f.split('/').pop().replace('.php', '')))
const modelPages = walk(join(docsRoot, 'database', 'models'), (p) => p.endsWith('.md')).length
check('models', modelNames.size, modelPages)

// ── Home page counters ───────────────────────────────────────────────────────

const home = read(join(docsRoot, 'index.md'))
const homeStats = home.match(/:stats="\{([^}]*)\}"/)?.[1] ?? ''
const homeValue = (key) => Number(homeStats.match(new RegExp(`${key}:\\s*(\\d+)`))?.[1] ?? -1)
check('home page: routes', sourceRoutes.size, homeValue('routes'))
check('home page: models', modelPages, homeValue('models'))
check('home page: MCP abilities', sourceAbilities.size, homeValue('mcpAbilities'))
check('home page: OpenAPI specs', specs, homeValue('openapiSpecs'))

// ── Result ───────────────────────────────────────────────────────────────────

console.log(notes.join('\n'))
if (failures.length) {
  console.error(`\n${failures.length} mismatch(es):\n${failures.join('\n')}`)
  process.exit(1)
}
console.log('\nAll checks passed — docs match the plugin source.')
