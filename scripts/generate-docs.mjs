/**
 * FluentBooking Developer Docs generator.
 *
 * Scans:
 *   - fluent-booking core PHP source (../../../fluent-booking)
 *   - fluent-booking-pro PHP source (../../../fluent-booking-pro), if present.
 *
 * Emits:
 *   - docs/database/models/*.md, docs/database/schema.md, docs/database/models.md
 *   - docs/database/relationships.md, docs/database/query-builder.md
 *   - docs/hooks/actions/*.md, docs/hooks/filters/*.md (+ index pages)
 *   - docs/rest-api/index.md, docs/rest-api/<module>.md
 *   - docs/rest-api/operations/<module>/<op>.md
 *   - public/openapi/<module>/<op>.json
 *   - .generated/restapi-module-order.json
 */

import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  rmSync,
  statSync,
  writeFileSync,
} from 'fs'
import { basename, dirname, join, relative, resolve } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const repoRoot = resolve(__dirname, '..')
const pluginRoot = resolve(repoRoot, '..')
const pluginsRoot = resolve(pluginRoot, '..')
const proPluginRoot = resolve(pluginsRoot, 'fluent-booking-pro')
const docsRoot = join(repoRoot, 'docs')
const openapiRoot = join(repoRoot, 'public', 'openapi')
const generatedRoot = join(repoRoot, '.generated')

const SOURCE_CONFIGS = [
  { id: 'core', label: 'Core', root: pluginRoot, pluginDir: 'fluent-booking' },
  ...(existsSync(proPluginRoot)
    ? [{ id: 'pro', label: 'Pro', root: proPluginRoot, pluginDir: 'fluent-booking-pro' }]
    : []),
]

// ── Model registry ───────────────────────────────────────────────────────────

const MODEL_REGISTRY = [
  { name: 'Booking', slug: 'booking', source: 'core', table: 'fcal_bookings', summary: 'Represents an individual booking (appointment) created when an attendee schedules time on a calendar.' },
  { name: 'Calendar', slug: 'calendar', source: 'core', table: 'fcal_calendars', summary: 'Top-level scheduling container that owns event types, availability, and bookings for a host or resource.' },
  { name: 'CalendarSlot', slug: 'calendar-slot', source: 'core', table: 'fcal_calendar_events', summary: 'Bookable event type within a calendar (for example, a 15-minute consultation), with its configuration and availability rules. Internally referred to as a "slot" and stored in the `fcal_calendar_events` table.' },
  { name: 'Availability', slug: 'availability', source: 'core', table: 'fcal_meta', summary: 'Availability schedule defining recurring weekly hours and date overrides. Stored in `fcal_meta` with `object_type=\'availability\'` — the weekly schedule lives in the serialized `value` column.' },
  { name: 'BookingActivity', slug: 'booking-activity', source: 'core', table: 'fcal_booking_activity', summary: 'Activity stream entries tied to a booking — status changes, notes, and audit log lines.' },
  { name: 'BookingHost', slug: 'booking-host', source: 'core', table: 'fcal_booking_hosts', summary: 'Pivot rows linking bookings to their host users in multi-host (team / collective / round-robin) scheduling.' },
  { name: 'BookingMeta', slug: 'booking-meta', source: 'core', table: 'fcal_booking_meta', summary: 'Key/value metadata attached to bookings (booking field answers, location details, custom data). Columns: `booking_id`, `meta_key`, `value`.' },
  { name: 'Meta', slug: 'meta', source: 'core', table: 'fcal_meta', summary: 'Polymorphic key/value metadata table used by FluentBooking entities (calendars, events, availability, webhooks). Columns: `object_type`, `object_id`, `key`, `value`.' },
  { name: 'Staff', slug: 'staff', source: 'core', summary: 'Lightweight representation of a host/staff user — wraps WP user data with FluentBooking-specific helpers.' },
  { name: 'User', slug: 'user', source: 'core', summary: 'Extended WordPress user model exposing FluentBooking-specific relations such as calendars and bookings.' },
  { name: 'Model', slug: 'model', source: 'core', summary: 'Shared base ORM class extended by every FluentBooking model. Sets up timestamps, casts, and the booted-trait pipeline.' },
  { name: 'Order', slug: 'order', source: 'pro', summary: 'Payment order created when a paid event is booked (Pro). Tracks total, currency, and order status.' },
  { name: 'OrderItems', slug: 'order-items', source: 'pro', summary: 'Line items belonging to a payment order (Pro). One row per bookable item (event, addon, coupon).' },
  { name: 'Transactions', slug: 'transactions', source: 'pro', summary: 'Transaction records persisted for each payment gateway response (Pro). Includes successful, refunded, and failed attempts.' },
  { name: 'Webhook', slug: 'webhook', source: 'pro', summary: 'Outbound webhook configuration (Pro). Defines event triggers, target URL, headers, and authentication.' },
]

const MODEL_BY_NAME = new Map(MODEL_REGISTRY.map((m) => [m.name, m]))

// ── Hook categorization ──────────────────────────────────────────────────────

const ACTION_CATEGORIES = [
  {
    slug: 'bookings-and-scheduling',
    title: 'Bookings & Scheduling',
    description: 'Action hooks fired through the booking lifecycle — creation, confirmation, rescheduling, cancellation, and notes.',
    matchers: [
      /\/(before|after|pre)_(booking|patch_booking|create_booking|delete_booking|after_booking_scheduled|after_booking_rescheduled)/,
      /\/booking_schedule(_|$)/,
      /\/(after_booking|before_booking|after_patch_booking)/,
      /\/log_booking_(activity|note)/,
      /\/after_booking_meta_update/,
      /\/saving_addons/,
      /\/short_code_render/,
      /\/starting_scheduling_ajax/,
    ],
  },
  {
    slug: 'calendars-and-events',
    title: 'Calendars & Events',
    description: 'Action hooks for calendar and event-type creation, updates, deletion, and event ordering.',
    matchers: [
      /\/(before|after)_create_calendar(_slot|_event)?$/,
      /\/(before|after)_update_calendar/,
      /\/(before|after)_delete_calendar/,
      /\/(before|after)_create_event/,
      /\/(before|after)_update_event/,
      /\/(before|after)_delete_calendar_event/,
      /\/after_update_event_details/,
      /\/before_get_all_calendars/,
    ],
  },
  {
    slug: 'availability',
    title: 'Availability',
    description: 'Action hooks for availability-schedule creation, updates, cloning, and deletion.',
    matchers: [
      /\/(before|after|avaibility)_(creating_schedule|create_schedule|delete_availability_schedule|availability_schedule|update_schedule)/,
      /\/avaibility_schedule_updated/,
      /\/availability_schedule_(cloned|created|updated)/,
      /\/availability_schedules$/,
    ],
  },
  {
    slug: 'integrations',
    title: 'Integrations',
    description: 'Action hooks fired by third-party integrations (Google, Outlook, Zoom, FluentCRM, FluentBoards, Twilio, remote calendars).',
    matchers: [
      /\/integration_notify_/,
      /\/integration_/,
      /\/(disconnect|save)_integration/,
      /\/(create|patch|delete|cancel|refresh)_remote_calendar/,
      /\/disconnect_remote_calendar/,
      /\/disconnect_general_integration_feed_/,
      /\/(google|outlook|zoom|twilio)_/,
      /^fluent_calendar\//,
      /^fluent_boards\//,
      /^fluent_crm\//,
      /^fluentform\//,
      /^fluent_form_/,
    ],
  },
  {
    slug: 'landing-pages-and-display',
    title: 'Landing Pages & Display',
    description: 'Action hooks fired around landing page rendering, booking confirmation pages, and front-end markup.',
    matchers: [
      /\/(main|author)_landing_(head|footer)/,
      /\/main_landing$/,
      /\/(before|after)_calendar_event_landing_page/,
      /\/landing_page_route_/,
      /\/booking_confirmation_footer/,
      /\/booking_details_header/,
      /\/payment_receipt\/after_content/,
      /\/front_(head|footer)/,
    ],
  },
  {
    slug: 'admin-and-settings',
    title: 'Admin & Settings',
    description: 'Action hooks fired around admin app rendering, settings persistence, and configuration updates.',
    matchers: [
      /\/admin_app_rendering/,
      /\/save_client_settings_/,
      /\/after_update_advanced_settings/,
      /\/loaded$/,
      /^action_scheduler/,
    ],
  },
  {
    slug: 'payments-and-orders',
    title: 'Payments & Orders',
    description: 'Action hooks fired during the payment lifecycle (Pro) — order creation, payment status transitions, refunds, and gateway IPN.',
    matchers: [
      /\/payment\//,
      /\/payment_receipt\//,
      /\/(after|before)_draft_order_created/,
      /\/(after|before)_delete_order/,
      /\/after_order_items_created/,
      /\/ipn_paypal/,
      /\/refund_payment_/,
      /\/register_payment_methods/,
      /\/transaction_updated/,
      /\/before_render_payment_method_/,
    ],
  },
  {
    slug: 'coupons',
    title: 'Coupons',
    description: 'Action hooks fired during coupon lifecycle events (Pro).',
    matchers: [/\/coupon_/, /\/(before|after)_delete_coupon/],
  },
]

const FILTER_CATEGORIES = [
  {
    slug: 'booking-configuration',
    title: 'Booking Configuration',
    description: 'Filters that shape booking data, fields, exports, and confirmation/rescheduling responses.',
    matchers: [
      /\/booking_(data|fields|export|status|confirmation|rescheduled_response|webhook_request|meta_info|meeting_title|receipt|per_page|period|export_columns|export_row)/,
      /\/after_booking_data/,
      /\/booking_period_options/,
      /\/booked_events/,
      /\/file_upload_validation_rules_data/,
      /\/exporting_booking_data_csv/,
      /\/booking_status_changing_times_schema/,
      /\/buffer_times_schema/,
      /\/payment_coupon_field/,
    ],
  },
  {
    slug: 'calendar-and-event-settings',
    title: 'Calendar & Event Settings',
    description: 'Filters affecting calendar / event creation, validation, options, and sharing settings.',
    matchers: [
      /\/(create_calendar|create_calendar_event|calendar_options|calendar_event|calendar_setting|calendar\/sharing_settings|event_landing_page_vars|event_short_description|event_colors|event_payment_settings|exporting_calendar_data_json|auto_create_calendar)/,
      /\/get_calendar_event_settings/,
      /\/(create_calendar|create_calendar_event)_validation_rule/,
      /\/get_event_payment_settings/,
    ],
  },
  {
    slug: 'availability-and-slots',
    title: 'Availability & Slots',
    description: 'Filters affecting availability schedules, slot computation, and fallback timezone behavior.',
    matchers: [
      /\/availability_schedule_options/,
      /\/available_(date_formats|slots_for_view)/,
      /\/fallback_timezone/,
    ],
  },
  {
    slug: 'display-and-templates',
    title: 'Display & Templates',
    description: 'Filters affecting front-end templates, html output, landing pages, and receipt rendering.',
    matchers: [
      /\/booking_confirmation_page_(title|vars)/,
      /\/booking_confirmation_response/,
      /\/booking_receipt_landing_base_url/,
      /\/confirm_and_reject_button_html/,
      /\/author_photo/,
      /\/allowed_html_tags/,
      /\/add_to_calendar_html/,
      /\/get_iframe_html/,
      /\/get_location_fields/,
      /\/event_short_description/,
      /\/payment_receipt\//,
      /\/event_landing_page_vars/,
    ],
  },
  {
    slug: 'admin-and-configuration',
    title: 'Admin & Configuration',
    description: 'Filters affecting admin UI, menu items, dashboard widgets, and global defaults.',
    matchers: [
      /\/admin_(base_url|menu_items|portal_vars|vars)/,
      /\/dashboard_(notices|widgets)/,
      /\/general_settings/,
      /\/default_(booking_filters|currency_settings|email_notification_settings|paginations|terms_and_conditions|sms_notification_settings|coupon_data)/,
      /\/get_features/,
      /\/data_export_limit/,
      /\/asset_listed_slugs/,
      /\/backend_sanitized_values/,
      /\/(integrations|calendar_event_setting)_menu_items/,
      /\/booking_per_page_options/,
      /\/editor_shortcodes_groups/,
      /\/no_permission_message/,
      /\/get_general_integration_feed_/,
    ],
  },
  {
    slug: 'payments-and-advanced',
    title: 'Payments & Advanced',
    description: 'Filters for payment processing, currency handling, gateway settings, and stripe/paypal-specific behavior.',
    matchers: [
      /\/(accepted_currencies|global_currency_settings|global_currency_symbols)/,
      /\/payment\//,
      /\/create_draft_(order|transactions)/,
      /\/(create|default)_coupon_data/,
      /^fluent_booking_(stripe|global_checkout_mode|form_disable_stripe_connect)/,
    ],
  },
  {
    slug: 'integrations',
    title: 'Integrations',
    description: 'Filters consumed by integration handlers (Twilio, Google, Outlook, FluentForm, FluentBoards, FluentCRM, webhooks).',
    matchers: [
      /\/before_send_integration_data_/,
      /\/get_integration_/,
      /\/get_available_form_integrations/,
      /\/(google|outlook|twilio|crm)_/,
      /\/fluent_board(s)?_/,
      /\/ff_editor_calendar_options/,
      /\/crm_(meeting_data|meetings_response|trigger_calendar_options)/,
      /\/booking_webhook_request/,
      /\/get_payment_(connect_info|settings_disconnect)_/,
    ],
  },
]

// ── File helpers ─────────────────────────────────────────────────────────────

function ensureDir(p) {
  if (!existsSync(p)) mkdirSync(p, { recursive: true })
}

function writeFile(p, content) {
  ensureDir(dirname(p))
  writeFileSync(p, content)
}

function read(p) {
  return readFileSync(p, 'utf8')
}

function listFiles(dir, filter = () => true) {
  if (!existsSync(dir)) return []
  const out = []
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    const stat = statSync(full)
    if (stat.isDirectory()) {
      out.push(...listFiles(full, filter))
    } else if (filter(full)) {
      out.push(full)
    }
  }
  return out
}

function displaySourcePath(absPath) {
  for (const cfg of SOURCE_CONFIGS) {
    if (absPath.startsWith(cfg.root + '/') || absPath === cfg.root) {
      return `${cfg.pluginDir}/${relative(cfg.root, absPath).replace(/\\/g, '/')}`
    }
  }
  return absPath
}

function inferSourceId(absPath) {
  for (const cfg of SOURCE_CONFIGS) {
    if (absPath.startsWith(cfg.root + '/')) return cfg.id
  }
  return 'core'
}

function escapeMd(value) {
  return String(value).replace(/\|/g, '\\|').replace(/\n/g, ' ')
}

function humanize(slug) {
  return slug
    .replace(/[-_/]+/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim()
}

function renderProBadge() {
  return '<span class="pro-badge">PRO</span>'
}

function renderEditionLabel(sourceIds) {
  const set = new Set(sourceIds)
  if (set.has('core') && set.has('pro')) return `Core + ${renderProBadge()}`
  if (set.has('pro')) return renderProBadge()
  return 'Core'
}

// ── PHP source parsing ───────────────────────────────────────────────────────

function buildClassIndex() {
  const index = new Map()
  for (const cfg of SOURCE_CONFIGS) {
    const phpFiles = listFiles(join(cfg.root, 'app'), (p) => p.endsWith('.php'))
    for (const file of phpFiles) {
      const content = read(file)
      const nsMatch = content.match(/^namespace\s+([^;]+);/m)
      const classMatch = content.match(/^(?:abstract\s+|final\s+)?class\s+([A-Za-z0-9_]+)/m)
      if (!classMatch) continue
      const namespace = nsMatch ? nsMatch[1].trim() : ''
      const className = classMatch[1]
      const fqcn = namespace ? `${namespace}\\${className}` : className
      index.set(fqcn, { file, namespace, className, sourceId: cfg.id, content })
      if (!index.has(className)) {
        index.set(className, { file, namespace, className, sourceId: cfg.id, content })
      }
    }
  }
  return index
}

function parseTableSchemas() {
  const schemas = new Map()

  for (const cfg of SOURCE_CONFIGS) {
    const migDir = join(cfg.root, 'database', 'Migrations')
    if (!existsSync(migDir)) continue

    for (const file of listFiles(migDir, (p) => p.endsWith('.php'))) {
      const content = read(file)
      // Match either:
      //   static $tableName = 'fcal_X';
      //   $table = $wpdb->prefix .'fcal_X';
      //   $table = $wpdb->prefix . 'fcal_X';
      let tableName = null
      const staticMatch = content.match(/\$tableName\s*=\s*['"]([^'"]+)['"]/)
      if (staticMatch) tableName = staticMatch[1]
      if (!tableName) {
        const inlineMatch = content.match(/\$table\s*=\s*\$wpdb->prefix\s*\.\s*['"]([^'"]+)['"]/)
        if (inlineMatch) tableName = inlineMatch[1]
      }
      if (!tableName) continue

      const createMatch = content.match(/CREATE\s+TABLE[^(]*\(([\s\S]*?)\)\s*\$charsetCollate;/i)
      if (!createMatch) continue
      const body = createMatch[1]

      const columns = []
      const indexes = []

      const lines = body.split('\n').map((l) => l.trim()).filter(Boolean)
      for (const rawLine of lines) {
        const line = rawLine.replace(/,\s*\/\*.*?\*\/\s*$/, '').replace(/\/\*[^*]*\*\//g, '').replace(/,\s*$/, '').trim()
        if (!line) continue
        const colMatch = line.match(/^`([^`]+)`\s+([A-Z][A-Z0-9_()\s,UNSIGNED]+?)\s*(NOT NULL|NULL|)\s*(DEFAULT\s+([^,]+?))?\s*(AUTO_INCREMENT|PRIMARY KEY)?\s*$/i)
        if (colMatch) {
          const [, colName, rawType, nullStr, , defaultRaw] = colMatch
          let defaultValue = defaultRaw ? defaultRaw.trim().replace(/^'|'$/g, '') : null
          if (defaultValue === 'NULL') defaultValue = null
          columns.push({
            name: colName,
            type: rawType.replace(/\s+/g, ' ').trim(),
            nullable: !/NOT NULL/i.test(nullStr),
            default: defaultValue,
            primary: /PRIMARY KEY/i.test(line),
          })
          continue
        }
        // KEY / UNIQUE KEY / INDEX / UNIQUE INDEX. Several migrators build the
        // index name from an interpolated prefix (`{$indexPrefix}_status_idx`),
        // and column lists can carry a prefix length and a sort direction
        // (`vendor_charge_id`(64) ASC).
        const keyMatch = line.match(/^(?:UNIQUE\s+)?(?:KEY|INDEX)\s+`([^`]+)`\s*\(([^)]*(?:\([^)]*\)[^)]*)*)\)/i)
        if (keyMatch) {
          const name = keyMatch[1].replace(/\{\$[A-Za-z0-9_]+\}/g, '').replace(/^_+/, '')
          const columns = keyMatch[2]
            .split(',')
            .map((s) => s.replace(/`/g, '').replace(/\(\d+\)/g, '').replace(/\s+(ASC|DESC)\s*$/i, '').trim())
            .filter(Boolean)
          indexes.push({ name, columns, unique: /^UNIQUE/i.test(line) })
        }
      }

      schemas.set(tableName, { tableName, file, columns, indexes, sourceId: cfg.id })
    }
  }

  return schemas
}

function extractFillable(content) {
  const match = content.match(/protected\s+\$fillable\s*=\s*\[([\s\S]*?)\];/)
  if (!match) return []
  return match[1]
    .split(',')
    .map((s) => s.trim().replace(/^['"]|['"]$/g, ''))
    .filter(Boolean)
}

function extractCasts(content) {
  const match = content.match(/protected\s+\$casts\s*=\s*\[([\s\S]*?)\];/)
  if (!match) return {}
  const out = {}
  const lines = match[1].split(/[\n,]/).map((l) => l.trim()).filter(Boolean)
  for (const line of lines) {
    const m = line.match(/['"]([^'"]+)['"]\s*=>\s*['"]([^'"]+)['"]/)
    if (m) out[m[1]] = m[2]
  }
  return out
}

function extractRelationships(content) {
  const relations = []
  const methodRegex = /public\s+function\s+([a-zA-Z0-9_]+)\s*\(\s*\)\s*\{([\s\S]*?)\n\s*\}/g
  let m
  while ((m = methodRegex.exec(content))) {
    const [, name, body] = m
    const relMatch = body.match(/return\s+\$this->(belongsTo|hasMany|hasOne|belongsToMany|morphTo|morphMany|morphOne|morphToMany)\s*\(\s*([^,)]+)/)
    if (!relMatch) continue
    const type = relMatch[1]
    const targetExpr = relMatch[2].trim()
    let target = targetExpr.replace(/::class$/, '').split('\\').pop()
    relations.push({ name, type, target })
  }
  return relations
}

function extractScopes(content) {
  const scopes = []
  const re = /public\s+function\s+scope([A-Z][A-Za-z0-9_]*)\s*\(([^)]*)\)/g
  let m
  while ((m = re.exec(content))) {
    scopes.push({ name: m[1], params: m[2].trim() })
  }
  return scopes
}

function extractPublicMethods(content) {
  const methods = []
  const re = /public\s+(?:static\s+)?function\s+([a-zA-Z0-9_]+)\s*\(([^)]*)\)/g
  let m
  while ((m = re.exec(content))) {
    const name = m[1]
    if (name.startsWith('scope') || name.startsWith('__')) continue
    if (['boot', 'booted', 'newQuery', 'getCasts', 'getDates', 'getTable'].includes(name)) continue
    methods.push({ name, params: m[2].trim() })
  }
  return methods
}

function parseModels(classIndex, tableSchemas) {
  const result = []
  for (const entry of MODEL_REGISTRY) {
    const idx = classIndex.get(`FluentBooking\\App\\Models\\${entry.name}`) ||
                classIndex.get(`FluentBookingPro\\App\\Models\\${entry.name}`) ||
                classIndex.get(entry.name)
    if (!idx) {
      result.push({ ...entry, missing: true })
      continue
    }
    const content = idx.content
    const tableMatch = content.match(/protected\s+\$table\s*=\s*['"]([^'"]+)['"]/)
    const table = tableMatch ? tableMatch[1] : entry.table || null
    const primaryMatch = content.match(/protected\s+\$primaryKey\s*=\s*['"]([^'"]+)['"]/)
    const primary = primaryMatch ? primaryMatch[1] : 'id'
    const extendsMatch = content.match(/class\s+\w+\s+extends\s+(\w+)/)
    const extendsClass = extendsMatch ? extendsMatch[1] : 'Model'

    const fillable = extractFillable(content)
    const casts = extractCasts(content)
    const relationships = extractRelationships(content)
    const scopes = extractScopes(content)
    const methods = extractPublicMethods(content)

    result.push({
      ...entry,
      file: idx.file,
      table,
      primary,
      extendsClass,
      fillable,
      casts,
      relationships,
      scopes,
      methods,
      schema: table ? tableSchemas.get(table) || null : null,
    })
  }
  return result
}

// ── Routes ───────────────────────────────────────────────────────────────────

function collectRouteFiles() {
  const files = []
  for (const cfg of SOURCE_CONFIGS) {
    const apiPath = join(cfg.root, 'app', 'Http', 'Routes', 'api.php')
    if (existsSync(apiPath)) files.push({ file: apiPath, sourceId: cfg.id })

    const routesDir = join(cfg.root, 'app', 'Http', 'Routes')
    if (existsSync(routesDir)) {
      for (const f of readdirSync(routesDir)) {
        const full = join(routesDir, f)
        if (full === apiPath) continue
        if (f.endsWith('.php')) files.push({ file: full, sourceId: cfg.id })
      }
    }
  }
  return files
}

function parseRoutes() {
  const routeFiles = collectRouteFiles()
  const routes = []

  for (const { file, sourceId } of routeFiles) {
    const content = read(file)
    const lines = content.split('\n')

    const groupStack = []
    const groupPolicy = []
    let bracesAtGroupStart = []

    // Track brace depth at group start
    let braceDepth = 0
    let charIndex = 0

    for (let lineIdx = 0; lineIdx < lines.length; lineIdx++) {
      const line = lines[lineIdx]

      // Detect prefix group start
      const prefixMatch = line.match(/\$router->prefix\(\s*['"]([^'"]+)['"]\s*\)/)
      // Policy can be string 'CalendarPolicy' or class const CalendarPolicy::class
      const policyStringMatch = line.match(/->withPolicy\(\s*['"]([^'"]+)['"]\s*\)/)
      const policyClassMatch = line.match(/->withPolicy\(\s*([A-Za-z0-9_\\]+)::class\s*\)/)
      const policy = policyStringMatch
        ? policyStringMatch[1]
        : policyClassMatch
          ? policyClassMatch[1].split('\\').pop()
          : null
      const groupOpenMatch = line.match(/->group\(function\s*\(\$router\)\s*\{/)

      if (prefixMatch && groupOpenMatch) {
        groupStack.push(prefixMatch[1])
        groupPolicy.push(policy)
      }

      // Detect closing brace for group
      if (/^\s*\}\);?\s*$/.test(line) && groupStack.length > 0) {
        groupStack.pop()
        groupPolicy.pop()
      }

      // Route handler forms:
      //   $router->get('/path', 'Controller@action')
      //   $router->get('/path', [Controller::class, 'action'])
      //   $router->get('/path', Controller::class, 'action')   (Pro source has a few of these without brackets)
      const stringHandlerMatch = line.match(/\$router->(get|post|put|patch|delete|options|any)\(\s*['"]([^'"]+)['"]\s*,\s*['"]([^'"]+@[^'"]+)['"]/)
      const arrayHandlerMatch = line.match(/\$router->(get|post|put|patch|delete|options|any)\(\s*['"]([^'"]+)['"]\s*,\s*\[\s*([A-Za-z0-9_\\]+)::class\s*,\s*['"]([^'"]+)['"]\s*\]/)
      const looseHandlerMatch = line.match(/\$router->(get|post|put|patch|delete|options|any)\(\s*['"]([^'"]+)['"]\s*,\s*([A-Za-z0-9_\\]+)::class\s*,\s*['"]([^'"]+)['"]/)

      let method, path, controller, action
      if (stringHandlerMatch) {
        method = stringHandlerMatch[1]
        path = stringHandlerMatch[2]
        const handler = stringHandlerMatch[3]
        ;[controller, action] = handler.split('@')
      } else if (arrayHandlerMatch) {
        method = arrayHandlerMatch[1]
        path = arrayHandlerMatch[2]
        controller = arrayHandlerMatch[3].split('\\').pop()
        action = arrayHandlerMatch[4]
      } else if (looseHandlerMatch) {
        method = looseHandlerMatch[1]
        path = looseHandlerMatch[2]
        controller = looseHandlerMatch[3].split('\\').pop()
        action = looseHandlerMatch[4]
      }

      if (method && path && controller && action) {
        const groupPrefix = groupStack.join('/')
        const fullPath = (groupPrefix ? '/' + groupPrefix : '') + (path === '/' ? '' : (path.startsWith('/') ? path : '/' + path))

        routes.push({
          method: method.toUpperCase(),
          path: fullPath.replace(/\/+/g, '/'),
          controller,
          action,
          policy: groupPolicy[groupPolicy.length - 1] || null,
          sourceId,
          file,
          line: lineIdx + 1,
        })
      }
    }
  }

  return routes
}

function classifyRoute(route) {
  const segments = route.path.split('/').filter(Boolean)
  const first = segments[0] || 'misc'

  const map = {
    calendars: { module: 'calendars', subModule: null },
    events: { module: 'events', subModule: null },
    bookings: { module: 'bookings', subModule: null },
    schedules: { module: 'schedules', subModule: null },
    availability: { module: 'availability', subModule: null },
    'availability-schedules': { module: 'availability', subModule: null },
    settings: { module: 'settings', subModule: null },
    admin: { module: 'admin', subModule: null },
    reports: { module: 'reports', subModule: null },
    integrations: { module: 'integrations', subModule: null },
    webhooks: { module: 'webhooks', subModule: null },
    payments: { module: 'payments', subModule: null },
    payment: { module: 'payments', subModule: null },
    coupons: { module: 'payments', subModule: 'coupons' },
    orders: { module: 'payments', subModule: 'orders' },
    sms: { module: 'webhooks', subModule: 'sms' },
    hosts: { module: 'admin', subModule: 'hosts' },
    'global-settings': { module: 'settings', subModule: null },
    'general-settings': { module: 'settings', subModule: null },
  }

  // Detect sub-resources inside calendars (events, booking-fields, etc.)
  if (first === 'calendars' && route.path.includes('/events/')) {
    if (route.path.includes('/availability') || route.path.includes('/event-availability') || route.path.includes('/event-available-slots')) return { module: 'event-availability' }
    if (route.path.includes('/booking-fields')) return { module: 'event-booking-fields' }
    if (route.path.includes('/email-notifications')) return { module: 'event-notifications' }
    if (route.path.includes('/sms-notifications')) return { module: 'webhooks' }
    if (route.path.includes('/webhooks')) return { module: 'webhooks' }
    if (route.path.includes('/payment-settings')) return { module: 'payments' }
    if (route.path.includes('/integrations')) return { module: 'event-integrations' }
    if (
      route.path.includes('/details') ||
      route.path.includes('/limits') ||
      route.path.includes('/settings') ||
      route.path.includes('/assignments') ||
      route.path.includes('/advanced-settings') ||
      route.path.includes('/recurring-settings')
    ) {
      return { module: 'event-settings' }
    }
    return { module: 'events' }
  }
  // Calendar-level (non-event) integrations: remote-calendars, zoom-connection, general_integration_feed
  if (first === 'calendars' && route.path.includes('/integrations')) {
    return { module: 'calendar-integrations' }
  }
  if (first === 'calendars' && route.path.includes('/sharing-settings')) {
    return { module: 'sharing-settings' }
  }
  // Schedules transactions are payment records
  if (first === 'schedules' && route.path.includes('/transactions')) {
    return { module: 'payments' }
  }
  // Top-level /integrations payment-methods + woo-products → payments
  if (first === 'integrations' && (route.path.includes('payment-methods') || route.path.includes('woo-products'))) {
    return { module: 'payments' }
  }

  return map[first] || { module: 'misc' }
}

function slugifyOperation(route) {
  // Set by assignOperationSlugs() once the module grouping is known; the
  // action-derived form is the fallback for routes rendered outside a group.
  if (route.opSlug) return route.opSlug
  return kebab(route.action || 'op')
}

function titleForOperation(route) {
  return humanize(slugifyOperation(route)).replace(/\b\w/g, (c) => c.toUpperCase())
}

// ── Hooks ────────────────────────────────────────────────────────────────────

function extractHookCalls() {
  const calls = []
  for (const cfg of SOURCE_CONFIGS) {
    const dirs = ['app', 'boot', 'Modules'].map((d) => join(cfg.root, d)).filter((p) => existsSync(p))
    for (const dir of dirs) {
      for (const file of listFiles(dir, (p) => p.endsWith('.php'))) {
        const content = read(file)
        // Scanned over the whole file, not line by line: plenty of call sites
        // wrap the hook name onto its own line, e.g.
        //   apply_filters(
        //       'fluent_booking/pro_upgrade_base_url',
        const hookRe = /(do_action|apply_filters)(?:_ref_array)?\s*\(\s*['"]([^'"\n]+)['"]/g
        let m
        while ((m = hookRe.exec(content))) {
          calls.push({
            name: m[2],
            type: m[1] === 'do_action' ? 'action' : 'filter',
            file,
            line: content.slice(0, m.index).split('\n').length,
            sourceId: cfg.id,
          })
        }
      }
    }
  }
  return calls
}

function categorizeHook(name, type) {
  const categories = type === 'action' ? ACTION_CATEGORIES : FILTER_CATEGORIES
  for (const cat of categories) {
    if (cat.matchers.some((re) => re.test(name))) return cat.slug
  }
  return 'miscellaneous'
}

function summarizeHooks(calls) {
  const byNameAction = new Map()
  const byNameFilter = new Map()
  for (const c of calls) {
    const bucket = c.type === 'action' ? byNameAction : byNameFilter
    if (!bucket.has(c.name)) bucket.set(c.name, [])
    bucket.get(c.name).push(c)
  }
  return { byNameAction, byNameFilter, callSiteCount: calls.length }
}

// ── Doc emitters: shared ─────────────────────────────────────────────────────

function frontmatter(obj) {
  const lines = ['---']
  for (const [k, v] of Object.entries(obj)) {
    if (typeof v === 'boolean') lines.push(`${k}: ${v}`)
    else if (typeof v === 'string') lines.push(`${k}: ${JSON.stringify(v).slice(1, -1).includes(':') ? `"${v.replace(/"/g, '\\"')}"` : v}`)
    else lines.push(`${k}: ${JSON.stringify(v)}`)
  }
  lines.push('---', '')
  return lines.join('\n')
}

// ── Doc emitters: models / schema ────────────────────────────────────────────

function describeColumn(name, type) {
  const dict = {
    id: 'Primary key for the row.',
    hash: 'Random hash used as a public, non-enumerable booking identifier.',
    calendar_id: 'Foreign key to `fcal_calendars`.',
    event_id: 'Foreign key to `fcal_calendar_events` (the CalendarSlot model).',
    parent_id: 'Parent row used for rescheduled or grouped bookings.',
    group_id: 'Shared group ID for bookings created together (group / collective).',
    fcrm_id: 'Optional FluentCRM contact ID for the booker.',
    host_user_id: 'WordPress user ID of the host that owns the booking.',
    person_user_id: 'WordPress user ID of the attendee, if they were logged in.',
    person_contact_id: 'FluentCRM contact ID for the attendee, when available.',
    person_time_zone: 'IANA timezone of the attendee at the time of booking.',
    start_time: 'Booking start time in UTC.',
    end_time: 'Booking end time in UTC.',
    slot_minutes: 'Length of the booked slot in minutes.',
    first_name: 'Attendee first name.',
    last_name: 'Attendee last name.',
    email: 'Attendee email address.',
    message: 'Free-form message submitted by the attendee.',
    internal_note: 'Internal note visible only to hosts and admins.',
    phone: 'Attendee phone number (when collected).',
    country: 'Attendee country code (when collected).',
    ip_address: 'IP address recorded when the booking was created.',
    browser: 'Browser detected when the booking was created.',
    device: 'Device detected when the booking was created.',
    other_info: 'Serialized custom-field answers and miscellaneous attendee data.',
    location_details: 'Serialized location data (Zoom link, address, custom location).',
    cancelled_by: 'User ID of the person who cancelled the booking, if any.',
    status: 'Lifecycle status (`scheduled`, `cancelled`, `completed`, `rejected`, `pending`).',
    source: 'How the booking was created (`web`, `api`, etc.).',
    booking_type: 'Internal booking subtype.',
    event_type: '`single` or `group` event.',
    payment_status: 'Payment lifecycle status (`pending`, `paid`, `refunded`).',
    payment_method: 'Selected payment method slug.',
    source_url: 'Referring URL where the booking originated.',
    source_id: 'Generic foreign key for the source record (form ID, etc.).',
    utm_source: 'Marketing UTM source value.',
    utm_medium: 'Marketing UTM medium value.',
    utm_campaign: 'Marketing UTM campaign value.',
    utm_term: 'Marketing UTM term value.',
    utm_content: 'Marketing UTM content value.',
    created_at: 'Creation timestamp maintained by the ORM.',
    updated_at: 'Update timestamp maintained by the ORM.',
    user_id: 'WordPress user ID associated with the row.',
    title: 'Human-readable title stored for the record.',
    slug: 'Sanitized slug or public identifier.',
    description: 'Description text stored for the record.',
    meta: 'Serialized meta payload.',
    settings: 'Serialized settings payload.',
    name: 'Name stored for the record.',
    type: 'Subtype discriminator.',
    duration: 'Event length in minutes.',
    duration_type: 'Unit used for the configured duration (minutes / hours).',
    enabled: 'Whether the record is currently enabled.',
    object_type: 'Polymorphic object type for the meta row.',
    object_id: 'Polymorphic object ID for the meta row.',
    key: 'Meta key.',
    value: 'Meta value (often JSON-encoded).',
  }
  if (dict[name]) return dict[name]
  if (name.endsWith('_id')) return 'Foreign key to a related record.'
  if (/_at$/.test(name)) return 'Timestamp column.'
  return `${humanize(name)} stored for this record.`
}

function renderSchemaPage(models) {
  const populated = models.filter((m) => m.schema && m.schema.columns.length)
  const lines = []
  lines.push(frontmatter({ title: 'Database Schema', description: 'Source-verified database schema reference for FluentBooking.' }))
  lines.push('# Database Schema\n')
  lines.push('FluentBooking stores all data in custom WordPress tables prefixed with `fcal_`. The schema below is parsed directly from the `CREATE TABLE` statements inside `database/Migrations/`, so the columns, types, and defaults reflect what is installed at activation.\n')

  lines.push('## Tables\n')
  lines.push('| Table | Model | Columns | Indexes |')
  lines.push('| --- | --- | --- | --- |')
  for (const m of populated) {
    const cols = m.schema.columns.length
    const idx = m.schema.indexes.length
    lines.push(`| \`${m.schema.tableName}\` | [${m.name}](/database/models/${m.slug}) | ${cols} | ${idx} |`)
  }
  lines.push('')

  lines.push('## Entity Relationship Diagram\n')
  lines.push('```mermaid')
  lines.push('erDiagram')
  for (const m of populated) {
    lines.push(`    ${m.name.toUpperCase()} {`)
    for (const col of m.schema.columns.slice(0, 8)) {
      const type = col.type.split(/[ (]/)[0]
      lines.push(`        ${type.toLowerCase()} ${col.name}`)
    }
    lines.push('    }')
  }
  // Common relationships
  lines.push('    CALENDAR ||--o{ CALENDARSLOT : has')
  lines.push('    CALENDAR ||--o{ BOOKING : owns')
  lines.push('    CALENDARSLOT ||--o{ BOOKING : creates')
  lines.push('    BOOKING ||--o{ BOOKINGMETA : has')
  lines.push('    BOOKING ||--o{ BOOKINGACTIVITY : logs')
  lines.push('    BOOKING ||--o{ BOOKINGHOST : assigns')
  lines.push('```')
  lines.push('')

  for (const m of populated) {
    lines.push(`## \`${m.schema.tableName}\` (${m.name})\n`)
    lines.push(`> Migration source: \`${displaySourcePath(m.schema.file)}\`\n`)
    lines.push('| Column | Type | Nullable | Default | Description |')
    lines.push('| --- | --- | --- | --- | --- |')
    for (const col of m.schema.columns) {
      const desc = describeColumn(col.name, col.type)
      lines.push(`| \`${col.name}\` | \`${col.type}\` | ${col.nullable ? 'Yes' : 'No'} | ${col.default === null || col.default === undefined ? '`—`' : '`' + col.default + '`'} | ${escapeMd(desc)} |`)
    }
    if (m.schema.indexes.length) {
      lines.push('\n**Indexes**\n')
      for (const idx of m.schema.indexes) {
        lines.push(`- \`${idx.name}\`${idx.unique ? ' (unique)' : ''} on (${idx.columns.map((c) => `\`${c}\``).join(', ')})`)
      }
    }
    lines.push('')
  }

  return lines.join('\n')
}

function renderModelDoc(model) {
  const lines = []
  lines.push(frontmatter({
    title: `${model.name} Model`,
    description: `ORM reference for ${model.name} in FluentBooking.`,
  }))
  lines.push(`# ${model.name} Model\n`)
  if (model.source === 'pro') lines.push(`${renderProBadge()}\n`)
  lines.push(`${model.summary}\n`)

  if (model.missing) {
    lines.push('> Source class not found in the installed plugin tree. Refer to the FluentBooking source directly for current attributes.')
    return lines.join('\n')
  }

  lines.push('## Class\n')
  lines.push(`- **Source:** \`${displaySourcePath(model.file)}\``)
  if (model.table) lines.push(`- **Table:** \`${model.table}\``)
  lines.push(`- **Primary key:** \`${model.primary}\``)
  lines.push(`- **Extends:** \`${model.extendsClass}\``)
  lines.push('')

  if (model.schema && model.schema.columns.length) {
    lines.push('## Attributes\n')
    lines.push('| Column | Type | Nullable | Default | Description |')
    lines.push('| --- | --- | --- | --- | --- |')
    for (const col of model.schema.columns) {
      const cast = model.casts[col.name] ? `, cast: ${model.casts[col.name]}` : ''
      const desc = describeColumn(col.name, col.type)
      lines.push(`| \`${col.name}\` | \`${col.type}${cast}\` | ${col.nullable ? 'Yes' : 'No'} | ${col.default === null || col.default === undefined ? '`—`' : '`' + col.default + '`'} | ${escapeMd(desc)} |`)
    }
    lines.push('')
  } else if (model.fillable.length) {
    lines.push('## Fillable Attributes\n')
    for (const f of model.fillable) lines.push(`- \`${f}\``)
    lines.push('')
  }

  if (model.relationships.length) {
    lines.push('## Relationships\n')
    lines.push('| Method | Type | Target |')
    lines.push('| --- | --- | --- |')
    for (const r of model.relationships) {
      lines.push(`| \`${r.name}()\` | \`${r.type}\` | \`${r.target}\` |`)
    }
    lines.push('')
  }

  if (model.scopes.length) {
    lines.push('## Query Scopes\n')
    lines.push('| Scope | Parameters |')
    lines.push('| --- | --- |')
    for (const s of model.scopes) {
      lines.push(`| \`${s.name}\` | \`${s.params || '$query'}\` |`)
    }
    lines.push('')
  }

  if (model.methods.length) {
    lines.push('## Public Methods\n')
    lines.push('| Method | Signature |')
    lines.push('| --- | --- |')
    for (const m of model.methods) {
      lines.push(`| \`${m.name}()\` | \`${m.params || '—'}\` |`)
    }
    lines.push('')
  }

  return lines.join('\n')
}

function renderModelsIndex(models) {
  const lines = []
  lines.push(frontmatter({ title: 'Database Models', description: 'Overview of every model FluentBooking exposes.' }))
  lines.push('# Database Models\n')
  lines.push(`FluentBooking exposes ${models.length} ORM models built on the WPFluent framework (Laravel-inspired Eloquent). Models extend a shared \`Model\` base class and live under \`FluentBooking\\App\\Models\` (core) and \`FluentBookingPro\\App\\Models\` (Pro).\n`)
  lines.push('## Model Catalog\n')
  lines.push('| Model | Edition | Table | Description |')
  lines.push('| --- | --- | --- | --- |')
  for (const m of models) {
    const edition = m.source === 'pro' ? renderProBadge() : 'Core'
    const table = m.table ? `\`${m.table}\`` : '—'
    lines.push(`| [${m.name}](/database/models/${m.slug}) | ${edition} | ${table} | ${escapeMd(m.summary)} |`)
  }
  lines.push('')
  return lines.join('\n')
}

function renderRelationshipsDoc(models) {
  const lines = []
  lines.push(frontmatter({ title: 'Model Relationships', description: 'Cross-model relationships exposed by FluentBooking ORM models.' }))
  lines.push('# Model Relationships\n')
  lines.push('FluentBooking models use the standard WPFluent relationship helpers — `belongsTo`, `hasMany`, `hasOne`, `belongsToMany`, and morph variants. The table below is parsed directly from each model class so it stays in sync with the source.\n')
  lines.push('| Model | Method | Type | Target |')
  lines.push('| --- | --- | --- | --- |')
  for (const m of models) {
    if (!m.relationships || !m.relationships.length) continue
    for (const r of m.relationships) {
      lines.push(`| [${m.name}](/database/models/${m.slug}) | \`${r.name}()\` | \`${r.type}\` | \`${r.target}\` |`)
    }
  }
  lines.push('')
  return lines.join('\n')
}

function renderQueryBuilderDoc() {
  return `${frontmatter({ title: 'Query Builder', description: 'Using the WPFluent query builder against FluentBooking models.' })}# Query Builder

FluentBooking models inherit the WPFluent query builder, a Laravel-inspired API. Use it for all read/write access — direct \`$wpdb\` queries bypass model casts, events, and relationships.

## Basics

\`\`\`php
use FluentBooking\\App\\Models\\Booking;
use FluentBooking\\App\\Models\\Calendar;
use FluentBooking\\App\\Models\\CalendarSlot;

// Find by primary key
$booking = Booking::find(123);

// Conditional query
$upcoming = Booking::where('status', 'scheduled')
    ->where('start_time', '>=', current_time('mysql'))
    ->orderBy('start_time')
    ->get();

// Eager load relationships
$calendar = Calendar::with(['events', 'bookings'])->find(1);
\`\`\`

## Filtering bookings

\`\`\`php
$bookings = Booking::where('calendar_id', $calendarId)
    ->whereIn('status', ['scheduled', 'completed'])
    ->whereBetween('start_time', [$from, $to])
    ->orderBy('start_time', 'desc')
    ->paginate(20);
\`\`\`

## Inserting and updating

\`\`\`php
$booking = Booking::create([
    'calendar_id' => $calendarId,
    'event_id'    => $eventId,
    'first_name'  => 'Ada',
    'last_name'   => 'Lovelace',
    'email'       => 'ada@example.com',
    'start_time'  => $start,
    'end_time'    => $end,
    'status'      => 'scheduled',
]);

$booking->update(['status' => 'completed']);
\`\`\`

## Scopes

Scopes registered as \`scope*\` methods on a model are callable directly. See each model page for the list of available scopes.

## Raw access

When you need raw SQL, prefer:

\`\`\`php
use FluentBooking\\App\\Models\\Booking;

$rows = Booking::query()
    ->selectRaw('DATE(start_time) AS day, COUNT(*) AS total')
    ->groupBy('day')
    ->get();
\`\`\`

Avoid \`$wpdb->prepare()\` against the FluentBooking tables unless you are doing something the query builder cannot model. Direct queries skip relationship resolution, casts, and event hooks.

## Pagination

\`\`\`php
$paginator = Booking::where('status', 'scheduled')->paginate($perPage, ['*'], 'page', $page);
\`\`\`

\`paginate()\` returns a paginator object with \`data\`, \`total\`, \`per_page\`, \`current_page\`, and \`last_page\` shaped for the REST API response.
`
}

// ── Doc emitters: hooks ──────────────────────────────────────────────────────

function emitHookCategoryDoc({ type, slug, category, calls, allByName }) {
  const names = [...allByName.entries()]
    .filter(([name]) => categorizeHook(name, type) === slug)
    .sort(([a], [b]) => a.localeCompare(b))

  const callSiteCount = names.reduce((acc, [, list]) => acc + list.length, 0)

  const title = `${category.title} ${type === 'action' ? 'Actions' : 'Filters'}`
  const lines = []
  lines.push(frontmatter({ title, description: category.description }))
  lines.push(`# ${title}\n`)
  lines.push(`${category.description}\n`)
  lines.push(`${names.length} unique ${type} hook${names.length === 1 ? '' : 's'} currently map to this category, across ${callSiteCount} call site${callSiteCount === 1 ? '' : 's'}.\n`)

  if (!names.length) {
    lines.push('_No hooks of this category were detected in the current source tree._')
    return lines.join('\n')
  }

  lines.push('## Hook Inventory\n')
  lines.push('| Hook | Edition | Call Sites | First Source |')
  lines.push('| --- | --- | --- | --- |')
  for (const [name, list] of names) {
    const sources = [...new Set(list.map((c) => c.sourceId))]
    const first = list[0]
    const anchor = name.replace(/[^a-z0-9]/gi, '').toLowerCase()
    lines.push(`| [\`${name}\`](#${anchor}) | ${renderEditionLabel(sources)} | ${list.length} | \`${displaySourcePath(first.file)}:${first.line}\` |`)
  }
  lines.push('')

  for (const [name, list] of names) {
    const anchor = name.replace(/[^a-z0-9]/gi, '').toLowerCase()
    lines.push(`<a id="${anchor}"></a>\n`)
    lines.push(`## \`${name}\`\n`)
    lines.push(`- **Type:** ${type}`)
    lines.push(`- **Edition:** ${renderEditionLabel([...new Set(list.map((c) => c.sourceId))])}`)
    lines.push(`- **Call sites:** ${list.length}`)
    lines.push('')
    lines.push('**Source locations**\n')
    for (const c of list.slice(0, 10)) {
      lines.push(`- \`${displaySourcePath(c.file)}:${c.line}\``)
    }
    if (list.length > 10) lines.push(`- _… and ${list.length - 10} more_`)
    lines.push('')
    lines.push('**Example**\n')
    if (type === 'action') {
      lines.push('```php')
      lines.push(`add_action('${name}', function (...$args) {`)
      lines.push('    // Your custom logic here.')
      lines.push('}, 10, count($args ?? []));')
      lines.push('```')
    } else {
      lines.push('```php')
      lines.push(`add_filter('${name}', function ($value, ...$rest) {`)
      lines.push('    return $value;')
      lines.push('}, 10, 1 + count($rest ?? []));')
      lines.push('```')
    }
    lines.push('')
  }

  return lines.join('\n')
}

function emitHooksOverview({ type, calls, allByName, categories }) {
  const lines = []
  const title = type === 'action' ? 'Action Hooks' : 'Filter Hooks'
  lines.push(frontmatter({ title, description: `Source-verified ${title.toLowerCase()} inventory for FluentBooking.` }))
  lines.push(`# ${title}\n`)
  lines.push(`This page is generated from ${type === 'action' ? '`do_action()` / `do_action_ref_array()`' : '`apply_filters()` / `apply_filters_ref_array()`'} calls in the FluentBooking core and Pro plugin source trees.\n`)

  const totalUnique = allByName.size
  const totalSites = calls.length
  const usedCategories = []
  for (const cat of categories) {
    if (cat.slug === 'miscellaneous') continue // listed separately below
    const count = [...allByName.keys()].filter((n) => categorizeHook(n, type) === cat.slug).length
    if (count) usedCategories.push({ ...cat, count })
  }
  const miscCount = [...allByName.keys()].filter((n) => categorizeHook(n, type) === 'miscellaneous').length

  lines.push('## Overview\n')
  lines.push(`- **Unique ${type} hook names:** ${totalUnique}`)
  lines.push(`- **${type === 'action' ? 'Action' : 'Filter'} call sites:** ${totalSites}`)
  lines.push(`- **Categories covered:** ${usedCategories.length}${miscCount ? ' (+ miscellaneous)' : ''}`)
  lines.push('')

  lines.push('## Categories\n')
  for (const cat of usedCategories) {
    lines.push(`- [${cat.title}](/hooks/${type === 'action' ? 'actions' : 'filters'}/${cat.slug}) — ${cat.count} hook${cat.count === 1 ? '' : 's'}`)
  }
  if (miscCount) {
    lines.push(`- [Miscellaneous](/hooks/${type === 'action' ? 'actions' : 'filters'}/miscellaneous) — ${miscCount} hook${miscCount === 1 ? '' : 's'}`)
  }
  lines.push('')

  return lines.join('\n')
}

// ── Doc emitters: REST API ───────────────────────────────────────────────────

const REST_MODULE_META = {
  calendars: { title: 'Calendars', description: 'Calendar CRUD, ordering, sharing-page configuration, and event-type lifecycle for each calendar.' },
  events: { title: 'Events', description: 'Calendar event types — bookable slots configured per calendar.' },
  'event-availability': { title: 'Event Availability', description: 'Availability rules attached to a specific calendar event.' },
  'event-booking-fields': { title: 'Event Booking Fields', description: 'Custom booking-form fields configured per calendar event.' },
  'event-notifications': { title: 'Event Email Notifications', description: 'Per-event email notification templates and configuration.' },
  'event-integrations': { title: 'Event Integrations', description: 'Per-event integration configuration (CRM, automation feeds, custom integrations).' },
  'calendar-integrations': { title: 'Calendar Integrations', description: 'Calendar-level integration endpoints — remote calendar connections (Google, Outlook, Apple, CalDAV), Zoom user connections, and general integration feeds.' },
  'event-settings': { title: 'Event Settings', description: 'Per-event details, limits, and configuration endpoints.' },
  'sharing-settings': { title: 'Sharing & Landing', description: 'Public calendar landing-page configuration and sharing settings.' },
  bookings: { title: 'Bookings', description: 'Booking CRUD, listing, search, and patch endpoints.' },
  schedules: { title: 'Schedules', description: 'Schedule management endpoints used by the admin app.' },
  availability: { title: 'Availability Schedules', description: 'Standalone (reusable) availability schedules used across events.' },
  settings: { title: 'Settings', description: 'Plugin-wide settings — general, branding, dashboard, email, and global configuration.' },
  admin: { title: 'Admin & Hosts', description: 'Admin operations including host management, dashboard, and impersonation.' },
  reports: { title: 'Reports', description: 'Analytics, exports, and reporting endpoints (Pro features included).' },
  integrations: { title: 'Integrations', description: 'Global integration configuration (Zoom, Google, Outlook, Apple, FluentCRM, webhooks).' },
  webhooks: { title: 'Webhooks & SMS', description: 'Outbound webhook configuration and SMS notification endpoints (Pro).' },
  payments: { title: 'Payments', description: 'Payment gateways, transactions, orders, and coupon administration (Pro).' },
  misc: { title: 'Miscellaneous', description: 'Routes that did not match a primary module classification.' },
}

const REST_MODULE_ORDER = [
  'calendars',
  'events',
  'event-availability',
  'event-booking-fields',
  'event-notifications',
  'event-integrations',
  'event-settings',
  'sharing-settings',
  'bookings',
  'schedules',
  'availability',
  'settings',
  'admin',
  'reports',
  'integrations',
  'calendar-integrations',
  'webhooks',
  'payments',
  'misc',
]

function groupRoutes(routes) {
  const map = new Map()
  for (const r of routes) {
    const { module } = classifyRoute(r)
    if (!map.has(module)) map.set(module, [])
    map.get(module).push(r)
  }
  for (const list of map.values()) assignOperationSlugs(list)
  return map
}

/**
 * Page slugs are derived from the controller action, so two controllers landing
 * in the same module with the same action name (core `IntegrationController@index`
 * and Pro `IntegrationSettingsController@index`) would write to the same file and
 * the second would silently erase the first. Disambiguate every colliding slug
 * with its controller name, and keep the assignment on the route so the module
 * table, the operation page, and the OpenAPI spec all agree.
 */
function assignOperationSlugs(routes) {
  const byBase = new Map()
  for (const r of routes) {
    const base = kebab(r.action || 'op')
    if (!byBase.has(base)) byBase.set(base, [])
    byBase.get(base).push(r)
  }

  for (const [base, list] of byBase) {
    if (list.length === 1) {
      list[0].opSlug = base
      continue
    }
    const seen = new Map()
    for (const r of list) {
      const controller = kebab((r.controller || 'controller').replace(/Controller$/, ''))
      let slug = `${controller}-${base}`
      // Same controller AND same action twice in one module (a route registered
      // under two paths): fall back to a method + path suffix so both survive.
      if (seen.has(slug)) {
        slug = `${slug}-${r.method.toLowerCase()}-${kebab(r.path.split('/').filter((p) => p && !p.startsWith('{')).pop() || 'route')}`
      }
      let unique = slug
      let n = 2
      while (seen.has(unique)) unique = `${slug}-${n++}`
      seen.set(unique, r)
      r.opSlug = unique
    }
  }
}

function kebab(value) {
  return String(value)
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/[^A-Za-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase()
}

function emitRestApiIndex(routes, grouped) {
  const lines = []
  lines.push(frontmatter({ title: 'REST API Overview', description: 'Source-verified REST API reference for FluentBooking.' }))
  lines.push('# FluentBooking REST API\n')
  lines.push(`This reference covers ${routes.length} routes registered in the FluentBooking core and Pro route files.\n`)
  lines.push('## Base URL\n')
  lines.push('`https://your-site.com/wp-json/fluent-booking/v2`\n')
  lines.push('## Authentication\n')
  lines.push('- **Admin and settings routes:** use WordPress Application Passwords (`username:application_password` via Basic auth) or a WordPress nonce in the `X-WP-Nonce` header.')
  lines.push('- **Portal routes:** browser clients use cookie authentication with an `X-WP-Nonce` header; server-to-server integrations can use Application Passwords.')
  lines.push('- **Method override:** the FluentBooking frontend sends PUT, PATCH, and DELETE requests as POST requests with an `X-HTTP-Method-Override` header.')
  lines.push('')
  lines.push('::: tip A second namespace\nAgent traffic has its own stack at `fluent-booking/mcp`, outside this policy chain — see the [MCP server reference](/mcp/).\n:::\n')

  lines.push('## Modules\n')
  lines.push('| Module | Edition | Routes | Description |')
  lines.push('| --- | --- | --- | --- |')
  for (const slug of REST_MODULE_ORDER) {
    const list = grouped.get(slug)
    if (!list || !list.length) continue
    const meta = REST_MODULE_META[slug]
    const sources = [...new Set(list.map((r) => r.sourceId))]
    lines.push(`| [${meta.title}](/rest-api/${slug}) | ${renderEditionLabel(sources)} | ${list.length} | ${escapeMd(meta.description)} |`)
  }
  lines.push('')
  return lines.join('\n')
}

function emitModulePage(slug, routes) {
  const meta = REST_MODULE_META[slug]
  const lines = []
  lines.push(frontmatter({ title: `${meta.title} API`, description: meta.description }))
  lines.push(`# ${meta.title} API\n`)
  lines.push(`${meta.description}\n`)

  const policies = [...new Set(routes.map((r) => r.policy).filter(Boolean))]
  if (policies.length) {
    lines.push('## Authentication\n')
    lines.push(`These routes are registered with: ${policies.map((p) => `\`${p}\``).join(', ')}.\n`)
  }

  lines.push('## Endpoints\n')
  lines.push('| Method | Path | Edition | Operation | Controller |')
  lines.push('| --- | --- | --- | --- | --- |')
  for (const r of routes) {
    const opSlug = slugifyOperation(r)
    const opTitle = titleForOperation(r)
    const edition = r.sourceId === 'pro' ? renderProBadge() : 'Core'
    lines.push(`| \`${r.method}\` | \`${r.path}\` | ${edition} | [${opTitle}](/rest-api/operations/${slug}/${opSlug}) | \`${r.controller}@${r.action}\` |`)
  }
  lines.push('')
  return lines.join('\n')
}

function emitOperationPage(slug, route) {
  const opSlug = slugifyOperation(route)
  const title = titleForOperation(route)
  const lines = []
  lines.push(frontmatter({ title, description: `${title} for the FluentBooking ${REST_MODULE_META[slug].title} API.`, outline: false, aside: false }))
  lines.push('## Endpoint\n')
  lines.push(`- **Method:** \`${route.method}\``)
  lines.push(`- **Path:** \`${route.path}\``)
  lines.push(`- **Edition:** ${route.sourceId === 'pro' ? 'Pro' : 'Core'}`)
  lines.push(`- **Controller:** \`${route.controller}@${route.action}\``)
  lines.push(`- **Route source:** \`${displaySourcePath(route.file)}:${route.line}\``)
  if (route.policy) lines.push(`- **Policy:** \`${route.policy}\``)
  lines.push('')
  lines.push(`<OAOperation operationId="${camelOperationId(route)}" specUrl="/openapi/public/${slug}/${opSlug}.json" />`)
  return lines.join('\n')
}

function camelOperationId(route) {
  // Must be unique across the whole spec set, so it follows the (already
  // disambiguated) page slug rather than the raw action name.
  const slug = slugifyOperation(route)
  return slug.replace(/-([a-z0-9])/g, (_, c) => c.toUpperCase())
}

// ── Response example builders ────────────────────────────────────────────────

const MODULE_TO_MODEL = {
  calendars: 'Calendar',
  events: 'CalendarSlot',
  'event-availability': 'Availability',
  'event-settings': 'CalendarSlot',
  'event-booking-fields': null,
  'event-notifications': null,
  'event-integrations': null,
  'sharing-settings': null,
  bookings: 'Booking',
  schedules: 'Booking',
  availability: 'Availability',
  settings: null,
  admin: null,
  reports: null,
  integrations: null,
  webhooks: 'Webhook',
  payments: 'Order',
  misc: null,
}

const RESOURCE_KEY = {
  Calendar: 'calendar',
  CalendarSlot: 'event',
  Availability: 'availability',
  Booking: 'booking',
  BookingActivity: 'activity',
  BookingHost: 'host',
  BookingMeta: 'meta',
  Order: 'order',
  OrderItems: 'item',
  Transactions: 'transaction',
  Webhook: 'webhook',
  Staff: 'staff',
  User: 'user',
  Meta: 'meta',
}

const RESOURCE_LIST_KEY = {
  Calendar: 'calendars',
  CalendarSlot: 'events',
  Availability: 'availability_schedules',
  Booking: 'bookings',
  BookingActivity: 'activities',
  BookingHost: 'hosts',
  BookingMeta: 'metas',
  Order: 'orders',
  OrderItems: 'items',
  Transactions: 'transactions',
  Webhook: 'webhooks',
  Staff: 'staff',
  User: 'users',
  Meta: 'metas',
}

function exampleValueForColumn(col) {
  const name = col.name
  const type = (col.type || '').toUpperCase()
  if (col.default !== null && col.default !== undefined && col.default !== '' && !/auto/i.test(String(col.default))) {
    if (/^\d+$/.test(col.default)) return Number(col.default)
    if (/^(true|false)$/i.test(col.default)) return col.default.toLowerCase() === 'true'
    if (col.default !== "''") return col.default
  }
  if (name === 'id') return 1
  if (name === 'hash') return 'a1b2c3d4e5f6g7h8'
  if (name === 'group_id') return 1
  if (name === 'parent_id') return null
  if (name === 'calendar_id') return 1
  if (name === 'event_id') return 10
  if (name === 'booking_id') return 100
  if (name === 'host_user_id') return 1
  if (name === 'person_user_id') return 5
  if (name === 'person_contact_id') return null
  if (name === 'cancelled_by') return null
  if (name === 'user_id') return 1
  if (name === 'fcrm_id') return null
  if (name === 'source_id') return null
  if (name.endsWith('_id')) return 1
  if (name === 'email') return 'ada@example.com'
  if (name === 'first_name') return 'Ada'
  if (name === 'last_name') return 'Lovelace'
  if (name === 'phone') return '+15550100'
  if (name === 'country') return 'US'
  if (name === 'slug') return 'sample'
  if (name === 'title') return 'Sample Title'
  if (name === 'name') return 'Sample Name'
  if (name === 'description') return 'Sample description.'
  if (name === 'message') return 'Looking forward to it.'
  if (name === 'internal_note') return ''
  if (name === 'status') return 'scheduled'
  if (name === 'payment_status') return null
  if (name === 'payment_method') return null
  if (name === 'event_type') return 'single'
  if (name === 'booking_type') return 'scheduling'
  if (name === 'source') return 'web'
  if (name === 'source_url') return 'https://example.com/book'
  if (name === 'person_time_zone' || name === 'timezone') return 'UTC'
  if (name === 'start_time') return '2026-01-15 14:00:00'
  if (name === 'end_time') return '2026-01-15 14:15:00'
  if (name === 'slot_minutes') return 15
  if (name === 'ip_address') return '203.0.113.10'
  if (name === 'browser') return 'Chrome'
  if (name === 'device') return 'Desktop'
  if (name === 'other_info') return '{}'
  if (name === 'location_details') return '{"type":"online","value":"https://meet.example.com/abc"}'
  if (/^utm_/.test(name)) return ''
  if (name === 'created_at' || name === 'updated_at') return '2026-01-15 10:00:00'
  if (name.endsWith('_at')) return '2026-01-15 10:00:00'
  if (name === 'meta' || name === 'settings' || name === 'value') return {}
  if (name === 'meta_key') return 'sample_key'
  if (name === 'meta_value') return 'sample_value'
  if (name === 'object_type') return 'calendar'
  if (name === 'object_id') return 1
  if (name === 'key') return 'sample_key'
  if (name === 'duration') return 15
  if (name === 'duration_type') return 'minutes'
  if (name === 'enabled') return 1
  if (name === 'is_default') return 1
  if (type.includes('TINYINT(1)')) return 0
  if (type.includes('INT') || type.includes('BIGINT')) return 0
  if (type.includes('TEXT') || type.includes('LONGTEXT')) return ''
  if (type.includes('VARCHAR') || type.includes('CHAR')) return ''
  if (type.includes('TIMESTAMP') || type.includes('DATETIME')) return '2026-01-15 10:00:00'
  if (type.includes('DATE')) return '2026-01-15'
  return null
}

function buildModelExample(modelName, models, overrides = {}) {
  const m = models.find((x) => x.name === modelName)
  if (!m || !m.schema || !m.schema.columns.length) {
    return overrides
  }
  const out = {}
  for (const col of m.schema.columns) {
    out[col.name] = exampleValueForColumn(col)
  }
  Object.assign(out, overrides)
  return out
}

function detectOperationVerb(route) {
  const a = route.action || ''
  const m = route.method
  const path = route.path || ''

  if (m === 'DELETE' || /^delete/i.test(a)) return 'delete'
  if (/^(check|verify|validate)/i.test(a)) return 'status'
  if (/^(export)/i.test(a)) return 'list'
  if (/^(clone|duplicate)/i.test(a)) return 'create'
  if (/^(create|store|add)/i.test(a) && m !== 'GET') return 'create'
  if (/^(save|update|patch|reorder|set|cancel|reject|confirm|complete|reschedule|send|process|toggle|enable|disable)/i.test(a) && m !== 'GET') {
    return 'update'
  }

  if (m === 'GET' || /^get/i.test(a)) {
    if (/^getAll/.test(a)) return 'list'
    if (/Lists?$/.test(a)) return 'list'
    if (/^(list|batch|search)/i.test(a)) return 'list'
    // Plural action: get<Noun>s
    if (/^get.+s$/i.test(a) && !/(status|address|details|business|settings|notifications|preferences|columns|fields|metas|options)$/i.test(a)) {
      // Special: "Settings", "Notifications", "Fields" etc. that ARE collections
    }
    if (/^get.+s$/i.test(a)) {
      // Most plural getters in FluentBooking ARE lists (getBookings, getSlots, getCalendars)
      // except a few config endpoints. Default to list.
      if (/Settings$|Notifications$|Fields$|Options$|Vars$|Schema$|Defaults$|Counts?$|Stats?$|Filters?$|Permissions?$|Columns?$/.test(a)) {
        return 'single'
      }
      return 'list'
    }
    // No path params + GET → list
    if (!path.includes('{') && m === 'GET') return 'list'
    // Sub-resource collection paths
    if (/\/(events|bookings|schedules|slots|notifications|hosts|integrations|payments|orders|transactions|attendees|booking-fields|email-notifications|coupons|webhooks|reports|members|activities)$/i.test(path)) {
      return 'list'
    }
    return 'single'
  }

  if (m === 'POST') return 'update'
  if (m === 'PUT' || m === 'PATCH') return 'update'
  return 'single'
}

function buildResponseExample(slug, route, models) {
  const verb = detectOperationVerb(route)
  const modelName = MODULE_TO_MODEL[slug]
  const action = route.action || ''

  // Custom action handlers
  if (/checkSlug$/i.test(action)) {
    return { status: 'available', message: 'Slug is available.' }
  }
  if (/^export/i.test(action) || /Export$/i.test(action)) {
    return { url: 'https://your-site.com/wp-content/uploads/fluent-booking/exports/export-12345.csv', expires_at: '2026-01-15 11:00:00' }
  }
  if (/cloneEvent|cloneCalendarEvent|clone$/i.test(action)) {
    const exObj = modelName ? buildModelExample(modelName, models, { id: 2, slug: 'sample-copy' }) : { id: 2 }
    return { message: 'Successfully cloned.', [RESOURCE_KEY[modelName] || 'item']: exObj }
  }

  if (verb === 'delete') {
    return { message: 'Successfully deleted.' }
  }

  if (verb === 'status') {
    return { status: 'ok', message: 'Validation passed.' }
  }

  const example = modelName ? buildModelExample(modelName, models) : null
  const singleKey = RESOURCE_KEY[modelName] || 'data'
  const listKey = RESOURCE_LIST_KEY[modelName] || 'data'

  if (verb === 'list') {
    const items = example ? [example, { ...example, id: (example.id || 1) + 1, slug: 'sample-2' }] : []
    return {
      [listKey]: items,
      total: items.length,
      per_page: 20,
      current_page: 1,
      last_page: 1,
      from: items.length ? 1 : 0,
      to: items.length,
    }
  }

  if (verb === 'create') {
    return example
      ? { message: 'Successfully created.', [singleKey]: example }
      : { message: 'Successfully created.' }
  }

  if (verb === 'update') {
    return example
      ? { message: 'Successfully updated.', [singleKey]: example }
      : { message: 'Successfully updated.' }
  }

  // single
  return example ? { [singleKey]: example } : { data: {} }
}

function schemaFromExample(value) {
  if (value === null) return { type: 'object', nullable: true }
  if (Array.isArray(value)) {
    return {
      type: 'array',
      items: value.length ? schemaFromExample(value[0]) : { type: 'object' },
    }
  }
  if (typeof value === 'object') {
    const props = {}
    for (const [k, v] of Object.entries(value)) {
      props[k] = schemaFromExample(v)
    }
    return { type: 'object', properties: props }
  }
  if (typeof value === 'number') return Number.isInteger(value) ? { type: 'integer' } : { type: 'number' }
  if (typeof value === 'boolean') return { type: 'boolean' }
  return { type: 'string' }
}

function emitOpenApiSpec(slug, route, models) {
  const opId = camelOperationId(route)
  const pathParams = []
  const openapiPath = route.path.replace(/\{([^}]+)\}/g, (m, name) => {
    pathParams.push(name)
    return `{${name}}`
  })

  const parameters = pathParams.map((name) => ({
    name,
    in: 'path',
    required: true,
    schema: { type: 'string' },
    description: `${humanize(name)} path parameter.`,
  }))

  const spec = {
    openapi: '3.0.4',
    info: {
      title: `FluentBooking ${REST_MODULE_META[slug].title} API`,
      version: '1.0.0',
      description: REST_MODULE_META[slug].description,
    },
    servers: [
      { url: 'https://your-site.test/wp-json/fluent-booking/v2', description: 'Replace with your own WordPress site.' },
    ],
    paths: {
      ['/' + openapiPath.replace(/^\/+/, '')]: {
        [route.method.toLowerCase()]: {
          operationId: opId,
          summary: titleForOperation(route),
          tags: [REST_MODULE_META[slug].title],
          description: `Handler: \`${route.controller}@${route.action}\`. Source: \`${displaySourcePath(route.file)}:${route.line}\`.`,
          parameters,
          security: [{ ApplicationPasswords: [] }],
          ...(() => {
            const verb = detectOperationVerb(route)
            if (!['create', 'update'].includes(verb)) return {}
            const modelName = MODULE_TO_MODEL[slug]
            const body = modelName ? buildModelExample(modelName, models) : {}
            // strip server-managed fields for request body
            for (const k of ['id', 'hash', 'created_at', 'updated_at', 'ip_address', 'browser', 'device']) {
              delete body[k]
            }
            return {
              requestBody: {
                required: verb === 'create',
                content: {
                  'application/json': {
                    schema: schemaFromExample(body),
                    example: body,
                  },
                },
              },
            }
          })(),
          responses: (() => {
            const example = buildResponseExample(slug, route, models)
            const schema = schemaFromExample(example)
            const okStatus = detectOperationVerb(route) === 'create' ? 201 : 200
            const responses = {
              [okStatus]: {
                description: okStatus === 201 ? 'Resource created.' : 'Successful response.',
                content: {
                  'application/json': {
                    schema,
                    example,
                  },
                },
              },
              401: {
                description: 'Unauthorized — invalid or missing credentials.',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        code: { type: 'string' },
                        message: { type: 'string' },
                        data: { type: 'object', properties: { status: { type: 'integer' } } },
                      },
                    },
                    example: { code: 'rest_not_logged_in', message: 'You are not currently logged in.', data: { status: 401 } },
                  },
                },
              },
              403: {
                description: 'Forbidden — current user cannot perform this action.',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        code: { type: 'string' },
                        message: { type: 'string' },
                        data: { type: 'object', properties: { status: { type: 'integer' } } },
                      },
                    },
                    example: { code: 'rest_forbidden', message: 'Sorry, you are not allowed to do that.', data: { status: 403 } },
                  },
                },
              },
            }

            if (['create', 'update'].includes(detectOperationVerb(route))) {
              responses[422] = {
                description: 'Validation failed — inspect `data.errors` for field-level messages.',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        code: { type: 'string' },
                        message: { type: 'string' },
                        data: {
                          type: 'object',
                          properties: {
                            status: { type: 'integer' },
                            errors: { type: 'object', additionalProperties: { type: 'array', items: { type: 'string' } } },
                          },
                        },
                      },
                    },
                    example: {
                      code: 'validation_failed',
                      message: 'The given data was invalid.',
                      data: { status: 422, errors: { title: ['The title field is required.'] } },
                    },
                  },
                },
              }
            }

            if (route.path.includes('{')) {
              responses[404] = {
                description: 'Resource not found.',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        code: { type: 'string' },
                        message: { type: 'string' },
                        data: { type: 'object', properties: { status: { type: 'integer' } } },
                      },
                    },
                    example: { code: 'not_found', message: 'Resource not found.', data: { status: 404 } },
                  },
                },
              }
            }

            return responses
          })(),
        },
      },
    },
    components: {
      securitySchemes: {
        ApplicationPasswords: {
          type: 'apiKey',
          in: 'header',
          name: 'Authorization',
          description: 'WordPress Application Passwords — use Basic auth with username:application_password.',
        },
      },
    },
  }

  return spec
}

// ── Main ─────────────────────────────────────────────────────────────────────

function cleanGeneratedDocs() {
  const dirsToClean = [
    join(docsRoot, 'database', 'models'),
    join(docsRoot, 'hooks', 'actions'),
    join(docsRoot, 'hooks', 'filters'),
    join(docsRoot, 'rest-api', 'operations'),
    join(docsRoot, 'mcp', 'abilities'),
    join(docsRoot, 'platform'),
    openapiRoot,
  ]
  for (const d of dirsToClean) {
    if (existsSync(d)) rmSync(d, { recursive: true, force: true })
    ensureDir(d)
  }
  // Single-file outputs we'll overwrite (don't delete manually-curated guides/helpers/etc).
}


/**
 * The home page is hand-written apart from its counters, which have to track
 * what was actually generated — a stale "74 API Routes" on the front page is a
 * worse lie than a missing page.
 */
function updateHomeStats(stats) {
  const file = join(docsRoot, 'index.md')
  if (!existsSync(file)) return
  const content = read(file)
  const next = content.replace(
    /<DocsHome\s+:stats="\{[^}]*\}"\s*\/>/,
    `<DocsHome :stats="{ models: ${stats.models}, routes: ${stats.routes}, hooks: ${stats.hooks}, openapiSpecs: ${stats.openapiSpecs}, mcpAbilities: ${stats.mcpAbilities} }" />`,
  )
  if (next !== content) writeFile(file, next)
}

// ── Platform surfaces ────────────────────────────────────────────────────────

/**
 * Shortcodes, blocks, smartcodes, capabilities and the recurring task hooks are
 * all public developer surface that neither the route parser nor the hook
 * scanner can see: they are registered through WordPress APIs, not through this
 * plugin's own router.
 */
function parseShortcodes() {
  const shortcodes = []
  for (const cfg of SOURCE_CONFIGS) {
    for (const file of listFiles(join(cfg.root, 'app'), (p) => p.endsWith('.php'))) {
      const content = read(file)
      if (!content.includes('add_shortcode')) continue
      for (const m of content.matchAll(/add_shortcode\(\s*['"]([^'"]+)['"]\s*,\s*(?:\[\s*\$this\s*,\s*['"]([^'"]+)['"]\s*\]|\[\s*([A-Za-z0-9_\\]+)::class\s*,\s*['"]([^'"]+)['"]\s*\])/g)) {
        const method = m[2] || m[4]
        shortcodes.push({
          tag: m[1],
          handler: method,
          handlerClass: m[3] ? m[3].split('\\').pop() : (content.match(/^\s*class\s+([A-Za-z0-9_]+)/m) || [])[1],
          file,
          line: content.slice(0, m.index).split('\n').length,
          sourceId: cfg.id,
          attributes: parseShortcodeAtts(content, method),
        })
      }
    }
  }
  shortcodes.sort((a, b) => a.tag.localeCompare(b.tag))
  return shortcodes
}

/** The `shortcode_atts([...])` defaults inside one handler method. */
function parseShortcodeAtts(content, method) {
  if (!method) return []
  const methodIndex = content.search(new RegExp(`function\\s+${method}\\s*\\(`))
  if (methodIndex === -1) return []
  const attsIndex = content.indexOf('shortcode_atts', methodIndex)
  if (attsIndex === -1) return []
  const open = content.indexOf('[', attsIndex)
  const close = matchBracket(content, open)
  if (open === -1 || close === -1) return []
  const attributes = []
  for (const { key, value } of phpArrayEntries(content.slice(open + 1, close))) {
    if (!key) continue
    const parsed = phpStringValue(value)
    attributes.push({ name: key, default: parsed === null ? value.trim() : parsed })
  }
  return attributes
}

/** `wp_ajax_` / `wp_ajax_nopriv_` actions — the public front-end endpoints. */
function parseAjaxActions() {
  const byAction = new Map()
  for (const cfg of SOURCE_CONFIGS) {
    for (const file of listFiles(join(cfg.root, 'app'), (p) => p.endsWith('.php'))) {
      const content = read(file)
      if (!content.includes('wp_ajax')) continue
      for (const m of content.matchAll(/add_action\(\s*['"]wp_ajax_(nopriv_)?([a-z0-9_]+)['"]\s*,\s*\[\s*\$this\s*,\s*['"]([^'"]+)['"]/g)) {
        const action = m[2]
        if (!byAction.has(action)) {
          byAction.set(action, {
            action,
            handler: m[3],
            handlerClass: (content.match(/^\s*class\s+([A-Za-z0-9_]+)/m) || [])[1],
            file,
            line: content.slice(0, m.index).split('\n').length,
            sourceId: cfg.id,
            guestAccess: false,
          })
        }
        if (m[1]) byAction.get(action).guestAccess = true
      }
    }
  }
  return [...byAction.values()].sort((a, b) => a.action.localeCompare(b.action))
}

/**
 * PHP's two array syntaxes are mixed freely in this codebase, and the block
 * registrations in particular use `array(...)` inside `[...]`. Rewriting
 * `array(` to `[` (with its matching paren) lets one parser read both; line
 * numbers are taken from the original text, never from the rewritten copy.
 */
function normalizeArraySyntax(content) {
  let result = content
  let guard = 0
  while (guard++ < 200) {
    const match = result.match(/\barray\s*\(/)
    if (!match) break
    const start = match.index
    const parenIndex = result.indexOf('(', start)
    const close = matchBracket(result, parenIndex, '(', ')')
    if (close === -1) break
    result = `${result.slice(0, start)}[${result.slice(parenIndex + 1, close)}]${result.slice(close + 1)}`
  }
  return result
}

function parseBlocks() {
  const blocks = []
  for (const cfg of SOURCE_CONFIGS) {
    for (const file of listFiles(join(cfg.root, 'app'), (p) => p.endsWith('.php'))) {
      const original = read(file)
      if (!original.includes('register_block_type')) continue
      const content = normalizeArraySyntax(original)
      for (const m of content.matchAll(/register_block_type\(\s*['"]([^'"]+)['"]\s*,\s*\[/g)) {
        const attrsIndex = content.indexOf("'attributes'", m.index)
        const renderMatch = content.slice(m.index, m.index + 600).match(/'render_callback'\s*=>\s*\[\s*\$this\s*,\s*['"]([^'"]+)['"]/)
        const attributes = []
        if (attrsIndex !== -1) {
          const open = content.indexOf('[', attrsIndex)
          const close = matchBracket(content, open)
          if (open !== -1 && close !== -1) {
            for (const { key, value } of phpArrayEntries(content.slice(open + 1, close))) {
              if (!key) continue
              const body = phpArrayBody(value)
              const attr = { name: key, type: null, default: null }
              if (body) {
                for (const inner of phpArrayEntries(body)) {
                  if (inner.key === 'type') attr.type = phpStringValue(inner.value)
                  else if (inner.key === 'default') attr.default = phpStringValue(inner.value)
                }
              }
              attributes.push(attr)
            }
          }
        }
        blocks.push({
          name: m[1],
          render: renderMatch ? renderMatch[1] : null,
          file,
          // From the original text: the normalized copy has different offsets.
          line: original.slice(0, original.indexOf(`register_block_type('${m[1]}'`)).split('\n').length,
          sourceId: cfg.id,
          attributes,
        })
      }
    }
  }
  blocks.sort((a, b) => a.name.localeCompare(b.name))
  return blocks
}

/**
 * Smartcodes (`{{booking.event_name}}`) available to email templates and
 * landing pages, read from Helper::getEditorShortCodes(). That method builds two
 * literal group maps — one for plain-text contexts, one for HTML — plus a
 * payment group and codes derived at runtime from the event's own fields.
 */
function parseSmartcodes() {
  const cfg = SOURCE_CONFIGS.find((c) => c.id === 'core')
  const file = join(cfg.root, 'app', 'Services', 'Helper.php')
  if (!existsSync(file)) return { groups: [], dynamic: [], file, filter: null }
  const content = read(file)
  const fnIndex = content.search(/function\s+getEditorShortCodes\s*\(/)
  if (fnIndex === -1) return { groups: [], dynamic: [], file, filter: null }
  const fnEnd = content.indexOf("apply_filters('fluent_booking/editor_shortcodes_groups'", fnIndex)
  const body = content.slice(fnIndex, fnEnd === -1 ? content.length : fnEnd)

  // Both `$groups = [...]` literals, plus the conditional payment group.
  const groups = new Map()
  const collect = (arrayBody, htmlOnly) => {
    for (const { key, value } of phpArrayEntries(arrayBody)) {
      if (!key) continue
      const groupBody = phpArrayBody(value)
      if (!groupBody) continue
      let title = key
      let codes = []
      for (const entry of phpArrayEntries(groupBody)) {
        if (entry.key === 'title') title = phpStringValue(entry.value) || key
        else if (entry.key === 'shortcodes') {
          const codesBody = phpArrayBody(entry.value)
          if (codesBody) {
            codes = phpArrayEntries(codesBody)
              .filter((c) => c.key)
              .map((c) => ({ code: c.key, label: phpStringValue(c.value) || '' }))
          }
        }
      }
      if (!groups.has(key)) groups.set(key, { key, title, codes: [] })
      const group = groups.get(key)
      group.title = title
      for (const code of codes) {
        const existing = group.codes.find((c) => c.code === code.code)
        if (existing) {
          existing.htmlOnly = existing.htmlOnly && htmlOnly
          continue
        }
        group.codes.push({ ...code, htmlOnly })
      }
    }
  }

  for (const m of body.matchAll(/\$groups\s*=\s*\[/g)) {
    const open = body.indexOf('[', m.index)
    const close = matchBracket(body, open)
    if (close === -1) continue
    // The second literal is the HTML-supported branch; anything only in there
    // is HTML-only.
    const htmlOnly = /if\s*\(!\$isHtmlSupported\)[\s\S]*?\$groups\s*=\s*\[[\s\S]*?\$groups\s*=\s*\[/.test(body.slice(0, open + 1))
    collect(body.slice(open + 1, close), htmlOnly)
  }

  for (const m of body.matchAll(/\$groups\['([a-z_]+)'\]\s*=\s*\[/g)) {
    // The match ends on the opening bracket of the value, not on the `['key']`
    // subscript that precedes it.
    const open = m.index + m[0].length - 1
    const close = matchBracket(body, open)
    if (close === -1) continue
    const wrapped = `'${m[1]}' => [${body.slice(open + 1, close)}],`
    collect(wrapped, false)
  }

  // Single assignments: $groups['payment']['shortcodes']['{{…}}'] = __('…');
  for (const m of body.matchAll(/\$groups\['([a-z_]+)'\]\['shortcodes'\]\['([^']+)'\]\s*=\s*([^;]+);/g)) {
    const group = groups.get(m[1])
    if (!group || group.codes.some((c) => c.code === m[2])) continue
    group.codes.push({ code: m[2], label: phpStringValue(m[3]) || '', htmlOnly: /receipt_html|_html\}\}/.test(m[2]) })
  }

  const dynamic = []
  if (/\{\{booking\.custom\./.test(body)) {
    dynamic.push({
      pattern: '{{booking.custom.<field_key>}}',
      note: 'One per custom booking field on the event; date fields also get a `.format.Y-m-d` variant.',
    })
  }
  if (/team_member\./.test(body)) {
    dynamic.push({
      pattern: '{{team_member.<n>.name}} / {{team_member.<n>.email}}',
      note: 'One pair per extra host on a multi-host event, numbered from 1.',
    })
  }

  return {
    groups: [...groups.values()],
    dynamic,
    file,
    line: content.slice(0, fnIndex).split('\n').length,
    filter: 'fluent_booking/editor_shortcodes_groups',
  }
}

function parsePermissionSets() {
  const cfg = SOURCE_CONFIGS.find((c) => c.id === 'core')
  const file = join(cfg.root, 'app', 'Services', 'PermissionManager.php')
  if (!existsSync(file)) return { sets: [], file }
  const content = read(file)
  const fnIndex = content.search(/function\s+allPermissionSets\s*\(/)
  if (fnIndex === -1) return { sets: [], file }
  const open = content.indexOf('[', fnIndex)
  const close = matchBracket(content, open)
  const sets = []
  for (const { key, value } of phpArrayEntries(content.slice(open + 1, close))) {
    if (!key) continue
    sets.push({ key, label: phpStringValue(value) || '' })
  }
  return { sets, file, line: content.slice(0, fnIndex).split('\n').length }
}

/** Each Policy class with the checks it actually calls, plus its route count. */
function parsePolicies(routes) {
  const policies = []
  const routeCounts = new Map()
  for (const route of routes) {
    if (!route.policy) continue
    routeCounts.set(route.policy, (routeCounts.get(route.policy) || 0) + 1)
  }

  for (const cfg of SOURCE_CONFIGS) {
    const dir = join(cfg.root, 'app', 'Http', 'Policies')
    if (!existsSync(dir)) continue
    for (const file of listFiles(dir, (p) => p.endsWith('.php'))) {
      const content = read(file)
      const name = (content.match(/^\s*class\s+([A-Za-z0-9_]+)/m) || [])[1] || basename(file, '.php')
      const methods = [...content.matchAll(/public\s+function\s+([a-zA-Z0-9_]+)\s*\(/g)].map((m) => m[1])
      const permissionSets = new Set()
      for (const m of content.matchAll(/userCan\(\s*\[?([^)]*?)\]?\s*\)/g)) {
        for (const set of m[1].matchAll(/'([a-z_]+)'/g)) permissionSets.add(set[1])
      }
      const wpCaps = new Set([...content.matchAll(/current_user_can\(\s*['"]([a-z_]+)['"]/g)].map((m) => m[1]))
      const checks = new Set([...content.matchAll(/PermissionManager::([a-zA-Z0-9_]+)\(/g)].map((m) => m[1]))
      policies.push({
        name,
        file,
        sourceId: cfg.id,
        methods,
        routes: routeCounts.get(name) || 0,
        permissionSets: [...permissionSets].sort(),
        wpCaps: [...wpCaps].sort(),
        checks: [...checks].filter((c) => c !== 'userCan').sort(),
      })
    }
  }
  policies.sort((a, b) => a.name.localeCompare(b.name))
  return policies
}

/** MCP permission gate → the permission sets its capability list names. */
function parseMcpGates() {
  const cfg = SOURCE_CONFIGS.find((c) => c.id === 'core')
  const file = join(cfg.root, 'app', 'Modules', 'MCP', 'Support', 'PermissionGate.php')
  const gates = new Map()
  if (!existsSync(file)) return gates
  const content = read(file)

  const constants = new Map()
  for (const m of content.matchAll(/const\s+([A-Z_]+)\s*=\s*\[([^\]]*)\]/g)) {
    constants.set(m[1], [...m[2].matchAll(/'([a-z_]+)'/g)].map((c) => c[1]))
  }

  for (const m of content.matchAll(/function\s+([a-zA-Z0-9_]+Gate)\s*\([^)]*\)\s*\{([\s\S]*?)\n    \}/g)) {
    const caps = m[2].match(/self::([A-Z_]+)/)
    gates.set(m[1], caps && constants.has(caps[1]) ? constants.get(caps[1]) : [])
  }
  return gates
}

/** The recurring Action Scheduler hooks and what each run does. */
function parseScheduledTasks() {
  const tasks = new Map()
  for (const cfg of SOURCE_CONFIGS) {
    for (const file of listFiles(join(cfg.root, 'app'), (p) => p.endsWith('.php'))) {
      const content = read(file)
      for (const m of content.matchAll(/as_schedule_recurring_action\(\s*time\(\)\s*,\s*\(?([^,)]*)\)?\s*,\s*['"]([^'"]+)['"]/g)) {
        const interval = m[1].trim()
        tasks.set(m[2], {
          hook: m[2],
          interval,
          seconds: /^[\d\s*()]+$/.test(interval) ? Number(eval(interval)) : null, // eslint-disable-line no-eval
          sourceId: cfg.id,
          steps: [],
          handler: null,
          file: null,
          line: null,
        })
      }
    }
  }

  // Match each hook to the Scheduler class that listens for it, and list the
  // steps that class runs — the "what happens every five minutes" answer.
  for (const cfg of SOURCE_CONFIGS) {
    const dir = join(cfg.root, 'app', 'Hooks', 'Scheduler')
    if (!existsSync(dir)) continue
    for (const file of listFiles(dir, (p) => p.endsWith('.php'))) {
      const content = read(file)
      for (const m of content.matchAll(/add_action\(\s*['"]([^'"]+)['"]\s*,\s*\[\s*\$this\s*,\s*['"]([^'"]+)['"]/g)) {
        const task = tasks.get(m[1])
        if (!task) continue
        task.handler = `${(content.match(/^\s*class\s+([A-Za-z0-9_]+)/m) || [])[1]}::${m[2]}()`
        task.file = file
        task.line = content.slice(0, m.index).split('\n').length
        const handlerIndex = content.search(new RegExp(`function\\s+${m[2]}\\s*\\(`))
        if (handlerIndex !== -1) {
          const handlerBody = content.slice(handlerIndex, content.indexOf('\n    }', handlerIndex))
          for (const call of handlerBody.matchAll(/\$this->([a-zA-Z0-9_]+)\(/g)) {
            if (!task.steps.includes(call[1])) task.steps.push(call[1])
          }
          for (const call of handlerBody.matchAll(/([A-Z][A-Za-z0-9_]+)::([a-zA-Z0-9_]+)\(/g)) {
            const step = `${call[1]}::${call[2]}`
            if (!task.steps.includes(step)) task.steps.push(step)
          }
        }
      }
    }
  }

  return [...tasks.values()].sort((a, b) => (a.seconds ?? 0) - (b.seconds ?? 0))
}

/**
 * Event configuration vocabularies: the location types an event can offer, the
 * booking-form fields every event starts with, and the field types an operator
 * can add. All three show up in REST payloads and MCP arguments as bare string
 * keys, so they are worth a table of their own.
 */
function parseEventConfiguration() {
  const cfg = SOURCE_CONFIGS.find((c) => c.id === 'core')

  const locationGroups = []
  const slotFile = join(cfg.root, 'app', 'Models', 'CalendarSlot.php')
  if (existsSync(slotFile)) {
    const content = read(slotFile)
    const hookIndex = content.indexOf("apply_filters('fluent_booking/get_location_fields'")
    if (hookIndex !== -1) {
      const open = content.indexOf('[', hookIndex)
      const close = matchBracket(content, open)
      for (const { key, value } of phpArrayEntries(content.slice(open + 1, close))) {
        if (!key) continue
        const groupBody = phpArrayBody(value)
        if (!groupBody) continue
        const group = { key, label: key, types: [] }
        for (const entry of phpArrayEntries(groupBody)) {
          if (entry.key === 'label') group.label = phpStringValue(entry.value) || key
          else if (entry.key === 'options') {
            const optionsBody = phpArrayBody(entry.value)
            if (!optionsBody) continue
            for (const option of phpArrayEntries(optionsBody)) {
              if (!option.key) continue
              const optionBody = phpArrayBody(option.value)
              const type = { key: option.key, title: option.key, proOnly: false }
              if (optionBody) {
                for (const field of phpArrayEntries(optionBody)) {
                  if (field.key === 'title') type.title = phpStringValue(field.value) || option.key
                  else if (field.key === 'disabled') type.proOnly = phpStringValue(field.value) === true
                }
              }
              group.types.push(type)
            }
          }
        }
        locationGroups.push(group)
      }
    }
  }

  const systemFields = []
  const fieldFile = join(cfg.root, 'app', 'Services', 'BookingFieldService.php')
  if (existsSync(fieldFile)) {
    const content = read(fieldFile)
    const defaultsIndex = content.search(/\$defaultFields\s*=\s*\[/)
    if (defaultsIndex !== -1) {
      const open = content.indexOf('[', defaultsIndex)
      const close = matchBracket(content, open)
      for (const { key, value } of phpArrayEntries(content.slice(open + 1, close))) {
        if (!key) continue
        const body = phpArrayBody(value)
        const field = { key, type: null, label: null, required: false, alterable: true }
        if (body) {
          for (const entry of phpArrayEntries(body)) {
            if (entry.key === 'type') field.type = phpStringValue(entry.value)
            else if (entry.key === 'label') field.label = phpStringValue(entry.value)
            else if (entry.key === 'required') field.required = phpStringValue(entry.value) === true
            else if (entry.key === 'disable_alter') field.alterable = phpStringValue(entry.value) !== true
          }
        }
        systemFields.push(field)
      }
    }
  }

  const customFieldTypes = []
  const helperFile = join(cfg.root, 'app', 'Services', 'Helper.php')
  if (existsSync(helperFile)) {
    const content = read(helperFile)
    const hookIndex = content.indexOf("apply_filters('fluent_booking/custom_fields_types'")
    if (hookIndex !== -1) {
      const open = content.indexOf('[', hookIndex)
      const close = matchBracket(content, open)
      for (const entry of phpArrayEntries(content.slice(open + 1, close))) {
        const body = phpArrayBody(entry.value)
        if (!body) continue
        const type = { value: null, label: null }
        for (const field of phpArrayEntries(body)) {
          if (field.key === 'value') type.value = phpStringValue(field.value)
          else if (field.key === 'label') type.label = phpStringValue(field.value)
        }
        if (type.value) customFieldTypes.push(type)
      }
    }
  }

  return { locationGroups, systemFields, customFieldTypes }
}

function emitEventConfigurationPage({ locationGroups, systemFields, customFieldTypes }) {
  const lines = []
  lines.push(frontmatter({
    title: 'Event Configuration',
    description: 'Source-verified location types, system booking fields, and custom field types for FluentBooking events.',
  }))
  lines.push('# Event Configuration\n')
  lines.push('The vocabularies an event type is configured with. These keys travel as plain strings through the [REST API](/rest-api/), the [MCP abilities](/mcp/), and the `location_settings` / booking-field columns, so this is the list to check a value against.\n')

  lines.push('## Location types\n')
  lines.push('`location_type` on an event\'s `location_settings`. Conferencing types are declared by the free plugin but disabled there — FluentBooking Pro enables them through `fluent_booking/get_location_fields`.\n')
  lines.push('| Group | Type | Label | Requires Pro |')
  lines.push('| --- | --- | --- | --- |')
  for (const group of locationGroups) {
    for (const type of group.types) {
      lines.push(`| ${escapeMd(group.label)} | \`${type.key}\` | ${escapeMd(type.title)} | ${type.proOnly ? 'Yes' : 'No'} |`)
    }
  }
  lines.push('')

  lines.push('## System booking fields\n')
  lines.push('Every event starts with these fields on its booking form. They cannot be deleted; a field marked not editable cannot be relabelled or made optional either.\n')
  lines.push('| Field | Type | Label | Required | Editable |')
  lines.push('| --- | --- | --- | --- | --- |')
  for (const field of systemFields) {
    lines.push(`| \`${field.key}\` | \`${field.type || '—'}\` | ${escapeMd(field.label || '')} | ${field.required ? 'Yes' : 'No'} | ${field.alterable ? 'Yes' : 'No'} |`)
  }
  lines.push('')

  lines.push('## Custom field types\n')
  lines.push('The types an operator can add to a booking form, filterable through `fluent_booking/custom_fields_types`. See the [custom booking fields guide](/guides/custom-booking-fields) for the shape of a field entry and how to read submitted values.\n')
  lines.push('| Type | Label |')
  lines.push('| --- | --- |')
  for (const type of customFieldTypes) {
    lines.push(`| \`${type.value}\` | ${escapeMd(type.label || '')} |`)
  }
  lines.push('')
  return lines.join('\n')
}

// ── Platform doc emitters ────────────────────────────────────────────────────

function emitPlatformIndex({ shortcodes, ajax, blocks, smartcodes, permissions, policies, tasks, eventConfig }) {
  const smartcodeCount = smartcodes.groups.reduce((total, g) => total + g.codes.length, 0)
  const lines = []
  lines.push(frontmatter({
    title: 'Platform',
    description: 'Shortcodes, blocks, smartcodes, capabilities, and scheduled tasks — the WordPress-level surface of FluentBooking.',
  }))
  lines.push('# Platform\n')
  lines.push('The surface FluentBooking exposes through WordPress itself rather than through its own router: shortcodes and AJAX endpoints on the front end, Gutenberg blocks in the editor, smartcodes in email and landing-page templates, the permission sets the REST policies enforce, and the recurring background tasks.\n')
  lines.push('| Reference | Entries | What it covers |')
  lines.push('| --- | --- | --- |')
  lines.push(`| [Shortcodes & AJAX](/platform/shortcodes) | ${shortcodes.length} shortcodes, ${ajax.length} AJAX actions | Front-end embedding and the endpoints the public booking form posts to. |`)
  lines.push(`| [Blocks](/platform/blocks) | ${blocks.length} | Gutenberg blocks and their attributes. |`)
  lines.push(`| [Smartcodes](/platform/smartcodes) | ${smartcodeCount} | Template placeholders for emails, landing pages, and notifications. |`)
  lines.push(`| [Permissions](/platform/permissions) | ${permissions.sets.length} permission sets, ${policies.length} policies | What each REST policy and MCP gate requires. |`)
  lines.push(`| [Scheduled Tasks](/platform/scheduled-tasks) | ${tasks.length} | Recurring Action Scheduler hooks and what each run does. |`)
  lines.push(
    `| [Event Configuration](/platform/event-configuration) | ${
      eventConfig.locationGroups.reduce((total, g) => total + g.types.length, 0)
    } location types, ${eventConfig.systemFields.length} system fields, ${eventConfig.customFieldTypes.length} field types | The keys an event's locations and booking form are configured with. |`,
  )
  lines.push('')
  return lines.join('\n')
}

function emitShortcodesPage(shortcodes, ajax) {
  const lines = []
  lines.push(frontmatter({
    title: 'Shortcodes & AJAX',
    description: 'Source-verified shortcode and AJAX endpoint reference for FluentBooking.',
  }))
  lines.push('# Shortcodes & AJAX\n')
  lines.push('Shortcodes are registered in the front-end handlers with `add_shortcode()`; the attribute defaults below are the ones `shortcode_atts()` applies, so an attribute missing from a shortcode falls back to the value shown.\n')

  lines.push('## Shortcodes\n')
  lines.push('| Shortcode | Edition | Attributes | Handler |')
  lines.push('| --- | --- | --- | --- |')
  for (const sc of shortcodes) {
    const attrs = sc.attributes.length ? sc.attributes.map((a) => `\`${a.name}\``).join(', ') : '—'
    lines.push(`| [\`[${sc.tag}]\`](#${sc.tag.replace(/_/g, '')}) | ${renderEditionLabel([sc.sourceId])} | ${attrs} | \`${sc.handlerClass}@${sc.handler}\` |`)
  }
  lines.push('')

  for (const sc of shortcodes) {
    lines.push(`<a id="${sc.tag.replace(/_/g, '')}"></a>\n`)
    lines.push(`## \`[${sc.tag}]\`\n`)
    lines.push(`- **Edition:** ${renderEditionLabel([sc.sourceId])}`)
    lines.push(`- **Handler:** \`${sc.handlerClass}@${sc.handler}\``)
    lines.push(`- **Source:** \`${displaySourcePath(sc.file)}:${sc.line}\``)
    lines.push('')
    if (sc.attributes.length) {
      lines.push('| Attribute | Default |')
      lines.push('| --- | --- |')
      for (const attr of sc.attributes) {
        const value = attr.default === '' ? '`""`' : `\`${attr.default}\``
        lines.push(`| \`${attr.name}\` | ${value} |`)
      }
      lines.push('')
      const example = sc.attributes
        .slice(0, 2)
        .map((a) => `${a.name}="${a.default === '' || a.default === 0 ? (a.name.includes('id') ? '12' : 'value') : a.default}"`)
        .join(' ')
      lines.push('```text')
      lines.push(`[${sc.tag}${example ? ' ' + example : ''}]`)
      lines.push('```\n')
    } else {
      lines.push('This shortcode takes no attributes.\n')
    }
  }

  lines.push('## AJAX actions\n')
  lines.push('The public booking form posts to `admin-ajax.php`. An action listed as reachable by guests is registered for `wp_ajax_nopriv_` as well — it is how an unauthenticated visitor books.\n')
  lines.push('| Action | Guests | Edition | Handler | Source |')
  lines.push('| --- | --- | --- | --- | --- |')
  for (const action of ajax) {
    lines.push(
      `| \`${action.action}\` | ${action.guestAccess ? 'Yes' : 'No'} | ${renderEditionLabel([action.sourceId])} | \`${action.handlerClass}@${action.handler}\` | \`${displaySourcePath(action.file)}:${action.line}\` |`,
    )
  }
  lines.push('')
  return lines.join('\n')
}

function emitBlocksPage(blocks) {
  const lines = []
  lines.push(frontmatter({
    title: 'Blocks',
    description: 'Source-verified Gutenberg block reference for FluentBooking.',
  }))
  lines.push('# Blocks\n')
  lines.push('FluentBooking registers its editor blocks with `register_block_type()` and renders them server-side, so the attributes below are the block\'s stored data and the render callback is what turns them into markup.\n')
  lines.push('| Block | Edition | Attributes | Render callback |')
  lines.push('| --- | --- | --- | --- |')
  for (const block of blocks) {
    lines.push(`| [\`${block.name}\`](#${block.name.replace(/[^a-z0-9]/gi, '')}) | ${renderEditionLabel([block.sourceId])} | ${block.attributes.length} | ${block.render ? `\`${block.render}()\`` : '—'} |`)
  }
  lines.push('')

  for (const block of blocks) {
    lines.push(`<a id="${block.name.replace(/[^a-z0-9]/gi, '')}"></a>\n`)
    lines.push(`## \`${block.name}\`\n`)
    lines.push(`- **Edition:** ${renderEditionLabel([block.sourceId])}`)
    if (block.render) lines.push(`- **Render callback:** \`${block.render}()\``)
    lines.push(`- **Source:** \`${displaySourcePath(block.file)}:${block.line}\``)
    lines.push('')
    if (block.attributes.length) {
      lines.push('| Attribute | Type | Default |')
      lines.push('| --- | --- | --- |')
      for (const attr of block.attributes) {
        const value = attr.default === null || attr.default === undefined ? '`—`' : attr.default === '' ? '`""`' : `\`${attr.default}\``
        lines.push(`| \`${attr.name}\` | \`${attr.type || '—'}\` | ${value} |`)
      }
      lines.push('')
    } else {
      lines.push('This block declares no attributes.\n')
    }
  }
  return lines.join('\n')
}

/**
 * Smartcodes are written `{{group.key}}`, which Vue reads as an interpolation —
 * even inside a Markdown code span. `v-pre` on the element is the documented way
 * to keep the braces literal.
 */
function renderSmartcode(code) {
  // Placeholder patterns carry angle brackets (`{{team_member.<n>.name}}`),
  // which the HTML parser would read as a tag.
  const escaped = code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  return `<code v-pre>${escaped}</code>`
}

function emitSmartcodesPage(smartcodes) {
  const total = smartcodes.groups.reduce((sum, g) => sum + g.codes.length, 0)
  const lines = []
  lines.push(frontmatter({
    title: 'Smartcodes',
    description: 'Source-verified smartcode reference for FluentBooking email and template contexts.',
  }))
  lines.push('# Smartcodes\n')
  lines.push(`Smartcodes are the ${renderSmartcode('{{group.key}}')} placeholders email templates, landing pages, and notification bodies are written with. ${total} are declared in \`Helper::getEditorShortCodes()\`; a few more are derived per event at runtime.\n`)
  lines.push('Codes marked **HTML only** are offered exclusively in contexts that accept markup — a plain-text email body does not get them. The `##code##` form is used where a value has to survive being placed in an `href`.\n')

  lines.push('## Groups\n')
  lines.push('| Group | Key | Codes |')
  lines.push('| --- | --- | --- |')
  for (const group of smartcodes.groups) {
    lines.push(`| [${group.title}](#${group.key.replace(/[^a-z0-9]/gi, '')}) | \`${group.key}\` | ${group.codes.length} |`)
  }
  lines.push('')

  for (const group of smartcodes.groups) {
    lines.push(`<a id="${group.key.replace(/[^a-z0-9]/gi, '')}"></a>\n`)
    lines.push(`## ${group.title}\n`)
    lines.push('| Smartcode | Description | HTML only |')
    lines.push('| --- | --- | --- |')
    for (const code of group.codes) {
      lines.push(`| ${renderSmartcode(code.code)} | ${escapeMd(code.label)} | ${code.htmlOnly ? 'Yes' : 'No'} |`)
    }
    lines.push('')
  }

  if (smartcodes.dynamic.length) {
    lines.push('## Per-event codes\n')
    lines.push('These are added to the list when an event is in context, so they depend on that event\'s configuration:\n')
    lines.push('| Pattern | Notes |')
    lines.push('| --- | --- |')
    for (const item of smartcodes.dynamic) {
      lines.push(`| ${renderSmartcode(item.pattern)} | ${escapeMd(item.note)} |`)
    }
    lines.push('')
  }

  lines.push('## Adding your own\n')
  lines.push(`The whole group map passes through [\`${smartcodes.filter}\`](/hooks/filters/miscellaneous#${smartcodes.filter.replace(/[^a-z0-9]/gi, '')}), so an add-on can append a group or extra codes:\n`)
  lines.push('::: v-pre')
  lines.push('```php')
  lines.push(`add_filter('${smartcodes.filter}', function ($groups, $calendarEvent, $isHtmlSupported) {`)
  lines.push("    $groups['my_addon'] = [")
  lines.push("        'title'      => 'My Add-on',")
  lines.push("        'key'        => 'my_addon',")
  lines.push("        'shortcodes' => [")
  lines.push("            '{{my_addon.reference}}' => 'Internal reference',")
  lines.push('        ],')
  lines.push('    ];')
  lines.push('')
  lines.push('    return $groups;')
  lines.push('}, 10, 3);')
  lines.push('```')
  lines.push(':::\n')
  lines.push(`Parsed from \`${displaySourcePath(smartcodes.file)}:${smartcodes.line}\`.\n`)
  return lines.join('\n')
}

function emitPermissionsPage(permissions, policies, gates, abilities) {
  const lines = []
  lines.push(frontmatter({
    title: 'Permissions',
    description: 'Source-verified permission sets, REST policies, and MCP gates for FluentBooking.',
  }))
  lines.push('# Permissions\n')
  lines.push('FluentBooking does not use WordPress roles for its own authorization. It stores a list of permission sets per user (in `fcal_meta` under `_access_permissions`) and checks those; a user with `manage_options` is treated as having all of them.\n')

  lines.push('## Permission sets\n')
  lines.push('| Set | Grants |')
  lines.push('| --- | --- |')
  for (const set of permissions.sets) {
    lines.push(`| \`${set.key}\` | ${escapeMd(set.label)} |`)
  }
  lines.push('')
  lines.push('```php')
  lines.push('use FluentBooking\\App\\Services\\PermissionManager;')
  lines.push('')
  lines.push("if (PermissionManager::userCan(['manage_all_bookings', 'manage_all_data'])) {")
  lines.push('    // Any one of the listed sets is enough.')
  lines.push('}')
  lines.push('```\n')

  lines.push('## REST policies\n')
  lines.push('Every route group declares a policy; the policy\'s `verifyRequest()` runs before any of its per-method checks. The sets and capabilities below are the ones each policy class actually references.\n')
  lines.push('A policy with no routes is not attached to any route group — it exists for a surface that does not use it (yet). A set marked with * is referenced by a policy but is not one of the sets above, so nothing ever grants it.\n')
  lines.push('| Policy | Edition | Routes | Permission sets | WordPress caps | Checks used |')
  lines.push('| --- | --- | --- | --- | --- | --- |')
  const knownSets = new Set(permissions.sets.map((set) => set.key))
  for (const policy of policies) {
    const sets = policy.permissionSets.map((set) => `\`${set}\`${knownSets.has(set) ? '' : '*'}`).join(', ')
    lines.push(
      `| \`${policy.name}\` | ${renderEditionLabel([policy.sourceId])} | ${policy.routes} | ${sets || '—'} | ${policy.wpCaps.map((c) => `\`${c}\``).join(', ') || '—'} | ${policy.checks.map((c) => `\`${c}()\``).join(', ') || '—'} |`,
    )
  }
  lines.push('')

  if (gates.size) {
    lines.push('## MCP gates\n')
    lines.push('The [MCP server](/mcp/) authorizes through `PermissionGate` instead of a policy. Read abilities need only a working transport (MCP enabled, application-password auth); write abilities additionally need one of the listed sets.\n')
    lines.push('| Gate | Requires one of | Abilities |')
    lines.push('| --- | --- | --- |')
    for (const [gate, caps] of [...gates.entries()].sort()) {
      const users = abilities.filter((a) => a.permission?.method === gate)
      if (!users.length && !caps.length) continue
      lines.push(
        `| \`${gate}()\` | ${caps.length ? caps.map((c) => `\`${c}\``).join(', ') : 'transport only'} | ${users.map((a) => `[\`${a.slug}\`](/mcp/abilities/${a.slug})`).join(', ') || '—'} |`,
      )
    }
    lines.push('')
  }

  lines.push(`Parsed from \`${displaySourcePath(permissions.file)}\` and \`app/Http/Policies/\`.\n`)
  return lines.join('\n')
}

function emitScheduledTasksPage(tasks) {
  const lines = []
  lines.push(frontmatter({
    title: 'Scheduled Tasks',
    description: 'Source-verified reference for the FluentBooking recurring background tasks.',
  }))
  lines.push('# Scheduled Tasks\n')
  lines.push('FluentBooking schedules its recurring work with Action Scheduler under the `fluent-booking` group. Both hooks are plain WordPress actions, so you can hook them to run your own work on the same cadence, or fire one manually to test.\n')
  lines.push('| Hook | Interval | Handler |')
  lines.push('| --- | --- | --- |')
  for (const task of tasks) {
    lines.push(`| [\`${task.hook}\`](#${task.hook.replace(/[^a-z0-9]/gi, '')}) | ${describeInterval(task)} | ${task.handler ? `\`${task.handler}\`` : '—'} |`)
  }
  lines.push('')

  for (const task of tasks) {
    lines.push(`<a id="${task.hook.replace(/[^a-z0-9]/gi, '')}"></a>\n`)
    lines.push(`## \`${task.hook}\`\n`)
    lines.push(`- **Interval:** ${describeInterval(task)} (\`${task.interval}\` seconds)`)
    if (task.handler) lines.push(`- **Handler:** \`${task.handler}\``)
    if (task.file) lines.push(`- **Source:** \`${displaySourcePath(task.file)}:${task.line}\``)
    lines.push('')
    if (task.steps.length) {
      lines.push('**Each run**\n')
      for (const step of task.steps) {
        lines.push(`- \`${step}${step.includes('::') ? '()' : '()'}\``)
      }
      lines.push('')
    }
    lines.push('```php')
    lines.push(`add_action('${task.hook}', function () {`)
    lines.push('    // Runs on the same schedule, after FluentBooking\'s own handler.')
    lines.push('}, 20);')
    lines.push('```\n')
  }
  return lines.join('\n')
}

function describeInterval(task) {
  if (!task.seconds) return task.interval
  if (task.seconds % 86400 === 0) return task.seconds === 86400 ? 'Daily' : `Every ${task.seconds / 86400} days`
  if (task.seconds % 3600 === 0) return task.seconds === 3600 ? 'Hourly' : `Every ${task.seconds / 3600} hours`
  return `Every ${task.seconds / 60} minutes`
}

// ── Helper / service classes ─────────────────────────────────────────────────

/**
 * The service classes the curated helper guide points integrators at. Their
 * method lists are parsed rather than hand-maintained: the prose page groups
 * the useful ones, this index is the complete surface.
 */
const HELPER_CLASSES = [
  { class: 'Helper', file: 'app/Services/Helper.php', source: 'core', summary: 'Catch-all static service: meta access, URL builders, settings, encryption, sanitization, and lookups.' },
  { class: 'DateTimeHelper', file: 'app/Services/DateTimeHelper.php', source: 'core', summary: 'Timezone-aware datetime conversion, formatting, and slot math.' },
  { class: 'LocationService', file: 'app/Services/LocationService.php', source: 'core', summary: 'Meeting location types, their settings shape, and their rendered output.' },
  { class: 'PermissionManager', file: 'app/Services/PermissionManager.php', source: 'core', summary: 'Capability checks for hosts, admins, and the REST policies.' },
  { class: 'BookingFieldService', file: 'app/Services/BookingFieldService.php', source: 'core', summary: 'Booking-form field definitions, validation, and stored answers.' },
  { class: 'EditorShortCodeParser', file: 'app/Services/EditorShortCodeParser.php', source: 'core', summary: 'Smartcode parsing used by email templates and landing pages.' },
]

function parseHelperClasses() {
  const result = []
  for (const entry of HELPER_CLASSES) {
    const cfg = SOURCE_CONFIGS.find((c) => c.id === entry.source)
    if (!cfg) continue
    const file = join(cfg.root, entry.file)
    if (!existsSync(file)) continue
    const content = read(file)
    const methods = []
    const re = /public\s+(static\s+)?function\s+([a-zA-Z0-9_]+)\s*\(([^)]*)\)/g
    let m
    while ((m = re.exec(content))) {
      if (m[2].startsWith('__')) continue
      methods.push({
        name: m[2],
        static: Boolean(m[1]),
        params: m[3].replace(/\s+/g, ' ').trim(),
        line: content.slice(0, m.index).split('\n').length,
      })
    }
    result.push({ ...entry, file, methods })
  }
  return result
}

function emitHelperApiIndex(classes) {
  const lines = []
  lines.push(frontmatter({
    title: 'Service API Index',
    description: 'Complete, source-parsed method index for the FluentBooking helper and service classes.',
  }))
  lines.push('# Service API Index\n')
  lines.push('Every public method on the helper and service classes integrators call directly, parsed from the plugin source. The [Helper Class Reference](/helpers/helper-class) groups the most useful ones with notes; this page is the complete list.\n')

  lines.push('## Classes\n')
  lines.push('| Class | Methods | Purpose |')
  lines.push('| --- | --- | --- |')
  for (const cls of classes) {
    lines.push(`| [\`${cls.class}\`](#${cls.class.toLowerCase()}) | ${cls.methods.length} | ${escapeMd(cls.summary)} |`)
  }
  lines.push('')

  for (const cls of classes) {
    lines.push(`## ${cls.class}\n`)
    lines.push(`\`FluentBooking\\App\\Services\\${cls.class}\` — \`${displaySourcePath(cls.file)}\`\n`)
    lines.push('| Method | Signature | Line |')
    lines.push('| --- | --- | --- |')
    for (const method of cls.methods) {
      lines.push(`| \`${method.name}\` | \`${method.static ? 'static ' : ''}${method.name}(${method.params})\` | ${method.line} |`)
    }
    lines.push('')
  }

  return lines.join('\n')
}

// ── MCP server ───────────────────────────────────────────────────────────────

/**
 * The MCP server is a second stack next to the REST controllers: ability
 * callbacks registered with the WordPress Abilities API and exposed on their
 * own REST namespace. It has no routes and no Policy, so parseRoutes() cannot
 * see it — the ability schemas are read straight out of each tool class's
 * `definitions()` array instead.
 */
const MCP_TOOLSETS = [
  {
    slug: 'core',
    title: 'Core',
    edition: 'core',
    summary: 'Bookings, event types, slots, context and reports. On by default.',
  },
  {
    slug: 'scheduling',
    title: 'Scheduling',
    edition: 'core',
    summary: 'Availability schedules — reading them and writing weekly hours and date overrides.',
  },
  {
    slug: 'payments',
    title: 'Payments',
    edition: 'pro',
    summary: 'Orders and transactions (Pro). Read only; refunds stay in the admin.',
  },
]

/** Find the matching close bracket for the opening bracket at `start`. */
function matchBracket(content, start, open = '[', close = ']') {
  let depth = 0
  let inString = null
  for (let i = start; i < content.length; i++) {
    const ch = content[i]
    if (inString) {
      if (ch === '\\') {
        i++
        continue
      }
      if (ch === inString) inString = null
      continue
    }
    if (ch === "'" || ch === '"') {
      inString = ch
      continue
    }
    if (ch === open) depth++
    else if (ch === close) {
      depth--
      if (depth === 0) return i
    }
  }
  return -1
}

/** Split an array body on its top-level commas. */
function splitTopLevel(body) {
  const parts = []
  let depth = 0
  let inString = null
  let current = ''
  for (let i = 0; i < body.length; i++) {
    const ch = body[i]
    current += ch
    if (inString) {
      if (ch === '\\') {
        current += body[++i] ?? ''
        continue
      }
      if (ch === inString) inString = null
      continue
    }
    if (ch === "'" || ch === '"') {
      inString = ch
      continue
    }
    if (ch === '[' || ch === '(') depth++
    else if (ch === ']' || ch === ')') depth--
    else if (ch === ',' && depth === 0) {
      parts.push(current.slice(0, -1))
      current = ''
    }
  }
  if (current.trim()) parts.push(current)
  return parts
}

/**
 * Unwrap the value forms the tool definitions actually use: a plain string, a
 * `__()` / `esc_html__()` translation call, or a `sprintf()` whose first
 * argument is one. Anything else (a class constant, a concatenation) is
 * reported as-is so it never silently becomes an empty description.
 */
function phpStringValue(raw) {
  const value = raw.trim()
  const sprintfMatch = value.match(/^sprintf\s*\(/)
  const inner = sprintfMatch ? value.slice(sprintfMatch[0].length) : value
  const translated = inner.match(/^(?:__|esc_html__|esc_attr__|_x)\s*\(\s*(['"])((?:\\.|(?!\1).)*)\1/)
  if (translated) return unescapePhpString(translated[2], translated[1])
  const literal = inner.match(/^(['"])((?:\\.|(?!\1).)*)\1/)
  if (literal) return unescapePhpString(literal[2], literal[1])
  if (/^(true|false)$/i.test(value)) return value.toLowerCase() === 'true'
  if (/^-?\d+$/.test(value)) return Number(value)
  return null
}

function unescapePhpString(value, quote) {
  const unescaped = value.replace(/\\\\/g, '\\').replace(new RegExp(`\\\\${quote}`, 'g'), quote)
  // Drop printf placeholders — they read as noise in prose.
  return unescaped.replace(/%\d+\$[ds]/g, '…').replace(/%[ds]/g, '…')
}

/** `'key' => value` pairs of an array body, values left as raw PHP text. */
function phpArrayEntries(body) {
  const entries = []
  for (const part of splitTopLevel(body)) {
    const trimmed = part.trim()
    if (!trimmed) continue
    const keyMatch = trimmed.match(/^(['"])((?:\\.|(?!\1).)*)\1\s*=>\s*/)
    if (!keyMatch) {
      entries.push({ key: null, value: trimmed })
      continue
    }
    entries.push({ key: unescapePhpString(keyMatch[2], keyMatch[1]), value: trimmed.slice(keyMatch[0].length).trim() })
  }
  return entries
}

/** The body of an array value, or null when the value is not an array. */
function phpArrayBody(value) {
  const trimmed = value.trim()
  if (!trimmed.startsWith('[')) return null
  const end = matchBracket(trimmed, 0)
  if (end === -1) return null
  return trimmed.slice(1, end)
}

function parseMcpSchemaProperty(name, raw, requiredNames) {
  const body = phpArrayBody(raw)
  const prop = { name, type: null, description: null, required: requiredNames.includes(name), enum: null, itemsType: null }
  if (!body) return prop
  for (const { key, value } of phpArrayEntries(body)) {
    if (key === 'type') prop.type = phpStringValue(value)
    else if (key === 'description') prop.description = phpStringValue(value)
    else if (key === 'enum') {
      const enumBody = phpArrayBody(value)
      if (enumBody) prop.enum = phpArrayEntries(enumBody).map((e) => phpStringValue(e.value)).filter((v) => v !== null)
    } else if (key === 'items') {
      const itemsBody = phpArrayBody(value)
      if (itemsBody) {
        for (const item of phpArrayEntries(itemsBody)) {
          if (item.key === 'type') prop.itemsType = phpStringValue(item.value)
        }
      }
    }
  }
  return prop
}

function parseMcpInputSchema(raw) {
  const body = phpArrayBody(raw)
  if (!body) return { properties: [], required: [] }
  let propertiesRaw = null
  let required = []
  for (const { key, value } of phpArrayEntries(body)) {
    if (key === 'properties') propertiesRaw = value
    else if (key === 'required') {
      const reqBody = phpArrayBody(value)
      if (reqBody) required = phpArrayEntries(reqBody).map((e) => phpStringValue(e.value)).filter(Boolean)
    }
  }
  const properties = []
  const propsBody = propertiesRaw ? phpArrayBody(propertiesRaw) : null
  if (propsBody) {
    for (const { key, value } of phpArrayEntries(propsBody)) {
      if (!key) continue
      properties.push(parseMcpSchemaProperty(key, value, required))
    }
  }
  return { properties, required }
}

function parseMcpCallback(raw) {
  const match = raw.match(/\[\s*([A-Za-z0-9_\\]+)::class\s*,\s*['"]([^'"]+)['"]\s*\]/)
  if (!match) return null
  const cls = match[1] === 'self' ? null : match[1].split('\\').pop()
  return { class: cls, method: match[2] }
}

/** Every ability a tool or prompt class declares in its `definitions()`. */
function parseMcpDefinitions(file, sourceId, toolsetBySourceClass) {
  const content = read(file)
  const className = (content.match(/^\s*(?:final\s+)?class\s+([A-Za-z0-9_]+)/m) || [])[1] || basename(file, '.php')
  const defsIndex = content.search(/public\s+static\s+function\s+definitions\s*\(/)
  if (defsIndex === -1) return []

  const arrayStart = content.indexOf('[', content.indexOf('return', defsIndex))
  if (arrayStart === -1) return []
  const arrayEnd = matchBracket(content, arrayStart)
  if (arrayEnd === -1) return []

  const abilities = []
  for (const { key, value } of phpArrayEntries(content.slice(arrayStart + 1, arrayEnd))) {
    if (!key || !key.includes('/')) continue
    const body = phpArrayBody(value)
    if (!body) continue

    const ability = {
      name: key,
      slug: key.split('/').pop(),
      class: className,
      file,
      line: content.slice(0, content.indexOf(`'${key}'`, arrayStart)).split('\n').length,
      sourceId,
      toolset: toolsetBySourceClass.get(className) || (sourceId === 'pro' ? 'payments' : 'core'),
      label: null,
      description: null,
      annotations: {},
      permission: null,
      execute: null,
      schema: { properties: [], required: [] },
      isPrompt: /Prompts?$/.test(className),
    }

    for (const entry of phpArrayEntries(body)) {
      switch (entry.key) {
        case 'label':
          ability.label = phpStringValue(entry.value)
          break
        case 'description':
          ability.description = phpStringValue(entry.value)
          break
        case 'input_schema':
          ability.schema = parseMcpInputSchema(entry.value)
          break
        case 'annotations': {
          const annBody = phpArrayBody(entry.value)
          if (annBody) {
            for (const ann of phpArrayEntries(annBody)) {
              if (ann.key) ability.annotations[ann.key] = phpStringValue(ann.value)
            }
          }
          break
        }
        case 'permission_callback':
          ability.permission = parseMcpCallback(entry.value)
          break
        case 'execute_callback':
          ability.execute = parseMcpCallback(entry.value)
          break
        default:
          break
      }
    }

    abilities.push(ability)
  }

  return abilities
}

/** toolset slug per tool class, read from the registrar's own class map. */
function parseMcpToolsetMap(coreRoot) {
  const map = new Map()
  const registrar = join(coreRoot, 'app', 'Modules', 'MCP', 'AbilitiesRegistrar.php')
  if (!existsSync(registrar)) return map
  const content = read(registrar)
  const start = content.search(/private\s+static\s+function\s+toolClasses\s*\(/)
  if (start === -1) return map
  const arrayStart = content.indexOf('[', content.indexOf('$classes =', start))
  if (arrayStart === -1) return map
  const arrayEnd = matchBracket(content, arrayStart)
  if (arrayEnd === -1) return map

  const constToSlug = { TOOLSET_CORE: 'core', TOOLSET_SCHEDULING: 'scheduling', TOOLSET_PAYMENTS: 'payments' }
  for (const part of splitTopLevel(content.slice(arrayStart + 1, arrayEnd))) {
    const header = part.match(/([A-Za-z0-9_]+)::([A-Z_]+)\s*=>\s*\[/)
    if (!header) continue
    const toolset = constToSlug[header[2]]
    if (!toolset) continue
    const listStart = part.indexOf('[', part.indexOf('=>'))
    const listEnd = matchBracket(part, listStart)
    if (listStart === -1 || listEnd === -1) continue
    for (const cls of part.slice(listStart + 1, listEnd).matchAll(/([A-Za-z0-9_]+)::class/g)) {
      map.set(cls[1], toolset)
    }
  }
  return map
}

function parseMcpAbilities() {
  const coreCfg = SOURCE_CONFIGS.find((c) => c.id === 'core')
  const toolsetBySourceClass = parseMcpToolsetMap(coreCfg.root)

  // Pro registers its classes through the fluent_booking/mcp_tool_classes
  // filter rather than the registrar's literal map, so read the toolset key it
  // pushes into ($classes['payments'][] = self::class).
  for (const cfg of SOURCE_CONFIGS) {
    const mcpRoot = join(cfg.root, 'app', 'Modules', 'MCP')
    if (!existsSync(mcpRoot)) continue
    for (const file of listFiles(mcpRoot, (p) => p.endsWith('.php'))) {
      const content = read(file)
      const pushed = content.match(/\$classes\[\s*['"]([a-z_]+)['"]\s*\]\[\s*\]\s*=\s*self::class/)
      if (!pushed) continue
      const className = (content.match(/^\s*(?:final\s+)?class\s+([A-Za-z0-9_]+)/m) || [])[1]
      if (className) toolsetBySourceClass.set(className, pushed[1])
    }
  }

  const abilities = []
  for (const cfg of SOURCE_CONFIGS) {
    const mcpRoot = join(cfg.root, 'app', 'Modules', 'MCP')
    if (!existsSync(mcpRoot)) continue
    for (const file of listFiles(mcpRoot, (p) => p.endsWith('.php'))) {
      abilities.push(...parseMcpDefinitions(file, cfg.id, toolsetBySourceClass))
    }
  }

  abilities.sort((a, b) => a.name.localeCompare(b.name))
  return abilities
}

/** The MCP endpoint, read from MCPInit rather than hard-coded here. */
function parseMcpServerMeta(coreRoot) {
  const file = join(coreRoot, 'app', 'Modules', 'MCP', 'MCPInit.php')
  const meta = { namespace: 'fluent-booking', route: 'mcp', serverId: 'fluent-booking' }
  if (!existsSync(file)) return meta
  const content = read(file)
  const ns = content.match(/function\s+serverNamespace\s*\([^)]*\)\s*\{[^}]*return\s+'([^']+)'/)
  const route = content.match(/function\s+serverRoute\s*\([^)]*\)\s*\{[^}]*return\s+'([^']+)'/)
  const serverId = content.match(/const\s+SERVER_ID\s*=\s*'([^']+)'/)
  if (ns) meta.namespace = ns[1]
  if (route) meta.route = route[1]
  if (serverId) meta.serverId = serverId[1]
  return meta
}

function renderMcpAnnotations(ability) {
  const flags = []
  if (ability.annotations.readonly === true) flags.push('read-only')
  if (ability.annotations.destructive === true) flags.push('destructive')
  if (ability.annotations.idempotent === true) flags.push('idempotent')
  return flags.length ? flags.join(', ') : 'write'
}

function emitMcpIndex(abilities, meta) {
  const tools = abilities.filter((a) => !a.isPrompt)
  const prompts = abilities.filter((a) => a.isPrompt)
  const lines = []
  lines.push(frontmatter({
    title: 'MCP Server',
    description: 'Source-verified reference for the FluentBooking MCP server — abilities, toolsets, and permissions.',
  }))
  lines.push('# MCP Server\n')
  lines.push('FluentBooking ships an MCP (Model Context Protocol) server so AI agents can read and write scheduling data through typed abilities instead of scraping the admin REST API. It is a parallel stack to the `fluent-booking/v2` controllers: abilities are registered with the WordPress Abilities API, they are not routes, and they carry no `Policy` — authorization is the MCP `PermissionGate` plus each tool\'s own ownership checks.\n')

  lines.push('## Endpoint\n')
  lines.push(`- **URL:** \`https://your-site.com/wp-json/${meta.namespace}/${meta.route}\``)
  lines.push(`- **Server id:** \`${meta.serverId}\``)
  lines.push('- **Transport:** HTTP (`\\WP\\MCP\\Transport\\HttpTransport`)')
  lines.push('- **Authentication:** WordPress Application Passwords (Basic auth). The server sits outside the `fluent-booking/v2` policy stack deliberately, so the v2 nonce flow does not apply.')
  lines.push('- **Requirements:** an MCP adapter and the Abilities API must be present, and MCP must be switched on in FluentBooking → Settings → MCP for AI Agents.')
  lines.push('')

  lines.push('## Toolsets\n')
  lines.push('Abilities are grouped into toolsets an operator switches on individually — schemas an operator never uses should not cost context in every request.\n')
  lines.push('| Toolset | Edition | Abilities | Description |')
  lines.push('| --- | --- | --- | --- |')
  for (const toolset of MCP_TOOLSETS) {
    const count = abilities.filter((a) => a.toolset === toolset.slug).length
    lines.push(`| \`${toolset.slug}\` | ${renderEditionLabel([toolset.edition])} | ${count} | ${escapeMd(toolset.summary)} |`)
  }
  lines.push('')

  lines.push('## Tools\n')
  lines.push('| Ability | Edition | Toolset | Mode | Description |')
  lines.push('| --- | --- | --- | --- | --- |')
  for (const ability of tools) {
    lines.push(
      `| [\`${ability.name}\`](/mcp/abilities/${ability.slug}) | ${renderEditionLabel([ability.sourceId])} | \`${ability.toolset}\` | ${renderMcpAnnotations(ability)} | ${escapeMd(truncate(ability.description || ability.label || '', 160))} |`,
    )
  }
  lines.push('')

  if (prompts.length) {
    lines.push('## Prompts\n')
    lines.push('Prompts are registered as a separate argument to the server, not as tools — listed as tools they would show up in `tools/list` carrying a body of instructions.\n')
    lines.push('| Prompt | Edition | Description |')
    lines.push('| --- | --- | --- |')
    for (const prompt of prompts) {
      lines.push(`| [\`${prompt.name}\`](/mcp/abilities/${prompt.slug}) | ${renderEditionLabel([prompt.sourceId])} | ${escapeMd(truncate(prompt.description || prompt.label || '', 160))} |`)
    }
    lines.push('')
  }

  lines.push('## Extending the server\n')
  lines.push('Add-ons register into the same namespace and server through these hooks:\n')
  lines.push('| Hook | Type | Purpose |')
  lines.push('| --- | --- | --- |')
  lines.push('| [`fluent_booking/mcp_loaded`](/hooks/actions/miscellaneous#fluentbookingmcploaded) | action | Fires after the core abilities register — the place to register your own. |')
  lines.push('| [`fluent_booking/mcp_tool_classes`](/hooks/filters/miscellaneous#fluentbookingmcptoolclasses) | filter | Add a class to a toolset so it inherits that toolset\'s on/off switch and context budget. |')
  lines.push('| [`fluent_booking/mcp_ability_names`](/hooks/filters/miscellaneous#fluentbookingmcpabilitynames) | filter | Ability names exposed as tools on the server. |')
  lines.push('| [`fluent_booking/mcp_prompt_names`](/hooks/filters/miscellaneous#fluentbookingmcppromptnames) | filter | Ability names exposed as prompts. |')
  lines.push('')
  lines.push('A class added through `fluent_booking/mcp_tool_classes` must expose a static `definitions()` returning `ability name => definition`, in the same shape as the core tool classes.\n')

  lines.push('## Calling an ability\n')
  lines.push('```bash')
  lines.push(`curl -X POST https://your-site.com/wp-json/${meta.namespace}/${meta.route} \\`)
  lines.push('  --user "admin:xxxx xxxx xxxx xxxx xxxx xxxx" \\')
  lines.push('  -H "Content-Type: application/json" \\')
  lines.push("  -d '{\"jsonrpc\":\"2.0\",\"id\":1,\"method\":\"tools/list\",\"params\":{}}'")
  lines.push('```\n')

  return lines.join('\n')
}

function emitMcpAbilityPage(ability) {
  const lines = []
  lines.push(frontmatter({
    title: ability.label || ability.name,
    description: truncate(ability.description || `MCP ability ${ability.name}.`, 180),
    outline: false,
  }))
  lines.push(`# \`${ability.name}\`\n`)
  if (ability.description) lines.push(`${ability.description}\n`)

  lines.push('## Ability\n')
  lines.push(`- **Kind:** ${ability.isPrompt ? 'Prompt' : 'Tool'}`)
  lines.push(`- **Toolset:** \`${ability.toolset}\``)
  lines.push(`- **Edition:** ${renderEditionLabel([ability.sourceId])}`)
  lines.push(`- **Mode:** ${renderMcpAnnotations(ability)}`)
  if (ability.permission) {
    lines.push(`- **Permission callback:** \`${ability.permission.class || ability.class}::${ability.permission.method}()\``)
    lines.push(
      `- **Requires:** ${
        ability.requiredSets && ability.requiredSets.length
          ? `one of ${ability.requiredSets.map((set) => `\`${set}\``).join(', ')} — see [Permissions](/platform/permissions)`
          : 'MCP enabled and an authenticated application password; each tool scopes its own query to what the caller may see'
      }`,
    )
  }
  if (ability.execute) {
    lines.push(`- **Handler:** \`${ability.execute.class || ability.class}::${ability.execute.method}()\``)
  }
  lines.push(`- **Source:** \`${displaySourcePath(ability.file)}:${ability.line}\``)
  lines.push('')

  if (ability.schema.properties.length) {
    lines.push('## Input schema\n')
    lines.push('| Parameter | Type | Required | Description |')
    lines.push('| --- | --- | --- | --- |')
    for (const prop of ability.schema.properties) {
      const type = prop.itemsType ? `${prop.type || 'array'}<${prop.itemsType}>` : prop.type || '—'
      const enumNote = prop.enum && prop.enum.length ? ` One of: ${prop.enum.map((v) => `\`${v}\``).join(', ')}.` : ''
      lines.push(`| \`${prop.name}\` | \`${type}\` | ${prop.required ? 'Yes' : 'No'} | ${escapeMd((prop.description || '') + enumNote)} |`)
    }
    lines.push('')
  } else {
    lines.push('## Input schema\n')
    lines.push('This ability takes no parameters.\n')
  }

  lines.push('## Example call\n')
  const exampleArgs = {}
  for (const prop of ability.schema.properties.filter((p) => p.required)) {
    exampleArgs[prop.name] = prop.type === 'integer' ? 1 : prop.type === 'boolean' ? true : prop.type === 'array' ? [] : 'value'
  }
  lines.push('```json')
  lines.push(JSON.stringify({
    jsonrpc: '2.0',
    id: 1,
    method: ability.isPrompt ? 'prompts/get' : 'tools/call',
    params: ability.isPrompt ? { name: ability.name } : { name: ability.name, arguments: exampleArgs },
  }, null, 2))
  lines.push('```\n')

  return lines.join('\n')
}

function truncate(value, max) {
  const text = String(value || '').replace(/\s+/g, ' ').trim()
  return text.length > max ? `${text.slice(0, max - 1).trimEnd()}…` : text
}

function emitMiscellaneousCategory(type) {
  return {
    slug: 'miscellaneous',
    title: 'Miscellaneous',
    description: `Hooks that did not match a more specific ${type} category.`,
    matchers: [],
  }
}

function main() {
  console.log('FluentBooking docs generator starting…')
  ensureDir(docsRoot)
  ensureDir(openapiRoot)
  ensureDir(generatedRoot)
  cleanGeneratedDocs()

  // Build PHP indexes
  const classIndex = buildClassIndex()
  const tableSchemas = parseTableSchemas()
  const models = parseModels(classIndex, tableSchemas)

  // Models + schema
  writeFile(join(docsRoot, 'database', 'schema.md'), renderSchemaPage(models))
  writeFile(join(docsRoot, 'database', 'models.md'), renderModelsIndex(models))
  writeFile(join(docsRoot, 'database', 'relationships.md'), renderRelationshipsDoc(models))
  writeFile(join(docsRoot, 'database', 'query-builder.md'), renderQueryBuilderDoc())
  for (const model of models) {
    writeFile(join(docsRoot, 'database', 'models', `${model.slug}.md`), renderModelDoc(model))
  }

  // Hooks
  const hookCalls = extractHookCalls()
  const summary = summarizeHooks(hookCalls)

  const actionCategoriesWithMisc = [...ACTION_CATEGORIES, emitMiscellaneousCategory('action')]
  const filterCategoriesWithMisc = [...FILTER_CATEGORIES, emitMiscellaneousCategory('filter')]

  writeFile(
    join(docsRoot, 'hooks', 'actions', 'index.md'),
    emitHooksOverview({ type: 'action', calls: hookCalls.filter((c) => c.type === 'action'), allByName: summary.byNameAction, categories: actionCategoriesWithMisc }),
  )
  writeFile(
    join(docsRoot, 'hooks', 'filters', 'index.md'),
    emitHooksOverview({ type: 'filter', calls: hookCalls.filter((c) => c.type === 'filter'), allByName: summary.byNameFilter, categories: filterCategoriesWithMisc }),
  )

  for (const cat of actionCategoriesWithMisc) {
    writeFile(
      join(docsRoot, 'hooks', 'actions', `${cat.slug}.md`),
      emitHookCategoryDoc({ type: 'action', slug: cat.slug, category: cat, calls: hookCalls, allByName: summary.byNameAction }),
    )
  }
  for (const cat of filterCategoriesWithMisc) {
    writeFile(
      join(docsRoot, 'hooks', 'filters', `${cat.slug}.md`),
      emitHookCategoryDoc({ type: 'filter', slug: cat.slug, category: cat, calls: hookCalls, allByName: summary.byNameFilter }),
    )
  }

  // Hooks index
  writeFile(join(docsRoot, 'hooks', 'index.md'), `${frontmatter({ title: 'Developer Hooks', description: 'Action and filter hook reference for FluentBooking.' })}# Developer Hooks

FluentBooking emits hundreds of action and filter hooks across the booking lifecycle, calendars, availability, payments, and integrations. The hook reference is generated directly from \`do_action()\` and \`apply_filters()\` call sites in the FluentBooking core and Pro source trees.

- **[Action Hooks](/hooks/actions/)** — event hooks (fire-and-forget).
- **[Filter Hooks](/hooks/filters/)** — value-transforming hooks (return modified value).
- **[Helpers](/helpers/)** — shared helper class reference.
`)

  // REST API
  const routes = parseRoutes()
  const grouped = groupRoutes(routes)

  writeFile(join(docsRoot, 'rest-api', 'index.md'), emitRestApiIndex(routes, grouped))

  const moduleOrderMap = {}
  for (const slug of REST_MODULE_ORDER) {
    const list = grouped.get(slug)
    if (!list || !list.length) continue
    writeFile(join(docsRoot, 'rest-api', `${slug}.md`), emitModulePage(slug, list))
    const slugOrder = []
    for (const r of list) {
      const opSlug = slugifyOperation(r)
      slugOrder.push(opSlug)
      writeFile(join(docsRoot, 'rest-api', 'operations', slug, `${opSlug}.md`), emitOperationPage(slug, r))
      const spec = emitOpenApiSpec(slug, r, models)
      writeFile(join(openapiRoot, slug, `${opSlug}.json`), JSON.stringify(spec, null, 2) + '\n')
    }
    moduleOrderMap[slug] = slugOrder
  }

  writeFile(join(generatedRoot, 'restapi-module-order.json'), JSON.stringify(moduleOrderMap, null, 2) + '\n')

  // MCP server — abilities live outside the route stack, so they are read from
  // each tool class's definitions() array.
  writeFile(join(docsRoot, 'helpers', 'service-api.md'), emitHelperApiIndex(parseHelperClasses()))

  const mcpMeta = parseMcpServerMeta(SOURCE_CONFIGS.find((c) => c.id === 'core').root)
  const abilities = parseMcpAbilities()
  const abilityGates = parseMcpGates()
  for (const ability of abilities) {
    ability.requiredSets = ability.permission ? abilityGates.get(ability.permission.method) || [] : []
  }
  writeFile(join(docsRoot, 'mcp', 'index.md'), emitMcpIndex(abilities, mcpMeta))
  for (const ability of abilities) {
    writeFile(join(docsRoot, 'mcp', 'abilities', `${ability.slug}.md`), emitMcpAbilityPage(ability))
  }
  // Platform surfaces: registered through WordPress APIs, so invisible to both
  // the route parser and the hook scanner.
  const shortcodes = parseShortcodes()
  const ajax = parseAjaxActions()
  const blocks = parseBlocks()
  const smartcodes = parseSmartcodes()
  const permissions = parsePermissionSets()
  const policies = parsePolicies(routes)
  const tasks = parseScheduledTasks()
  const eventConfig = parseEventConfiguration()

  writeFile(join(docsRoot, 'platform', 'index.md'), emitPlatformIndex({ shortcodes, ajax, blocks, smartcodes, permissions, policies, tasks, eventConfig }))
  writeFile(join(docsRoot, 'platform', 'shortcodes.md'), emitShortcodesPage(shortcodes, ajax))
  writeFile(join(docsRoot, 'platform', 'blocks.md'), emitBlocksPage(blocks))
  writeFile(join(docsRoot, 'platform', 'smartcodes.md'), emitSmartcodesPage(smartcodes))
  writeFile(join(docsRoot, 'platform', 'permissions.md'), emitPermissionsPage(permissions, policies, abilityGates, abilities))
  writeFile(join(docsRoot, 'platform', 'scheduled-tasks.md'), emitScheduledTasksPage(tasks))
  writeFile(join(docsRoot, 'platform', 'event-configuration.md'), emitEventConfigurationPage(eventConfig))

  writeFile(
    join(generatedRoot, 'mcp-abilities.json'),
    JSON.stringify(abilities.map((a) => ({ name: a.name, slug: a.slug, toolset: a.toolset, source: a.sourceId, prompt: a.isPrompt })), null, 2) + '\n',
  )

  updateHomeStats({
    models: models.length,
    routes: routes.length,
    hooks: summary.byNameAction.size + summary.byNameFilter.size,
    openapiSpecs: Object.values(moduleOrderMap).reduce((total, list) => total + list.length, 0),
    mcpAbilities: abilities.length,
  })

  console.log(
    `Generated docs for ${models.length} models, ${
      summary.byNameAction.size + summary.byNameFilter.size
    } unique hooks (${hookCalls.length} call sites), ${routes.length} routes, ${abilities.length} MCP abilities, ${
      shortcodes.length
    } shortcodes, ${blocks.length} blocks, and ${smartcodes.groups.reduce((total, g) => total + g.codes.length, 0)} smartcodes.`,
  )
}

main()
