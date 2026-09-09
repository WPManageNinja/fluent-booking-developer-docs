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
