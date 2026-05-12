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
        const keyMatch = line.match(/^KEY\s+`([^`]+)`\s+\(([^)]+)\)/i) || line.match(/^UNIQUE\s+KEY\s+`([^`]+)`\s+\(([^)]+)\)/i)
        if (keyMatch) {
          indexes.push({ name: keyMatch[1], columns: keyMatch[2].split(',').map((s) => s.replace(/`/g, '').trim()) })
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
  return methods.slice(0, 30)
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
  const action = route.action || 'op'
  // CamelCase → kebab-case
  return action.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()
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
        const lines = content.split('\n')
        for (let i = 0; i < lines.length; i++) {
          const line = lines[i]
          // do_action / do_action_ref_array
          const actionRe = /do_action(?:_ref_array)?\s*\(\s*['"]([^'"]+)['"]/g
          let m
          while ((m = actionRe.exec(line))) {
            calls.push({ name: m[1], type: 'action', file, line: i + 1, sourceId: cfg.id })
          }
          const filterRe = /apply_filters(?:_ref_array)?\s*\(\s*['"]([^'"]+)['"]/g
          while ((m = filterRe.exec(line))) {
            calls.push({ name: m[1], type: 'filter', file, line: i + 1, sourceId: cfg.id })
          }
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
        lines.push(`- \`${idx.name}\` on (${idx.columns.map((c) => `\`${c}\``).join(', ')})`)
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
    lines.push('## Public Methods (sample)\n')
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
  return map
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
  return `${route.action}`
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
    openapiRoot,
  ]
  for (const d of dirsToClean) {
    if (existsSync(d)) rmSync(d, { recursive: true, force: true })
    ensureDir(d)
  }
  // Single-file outputs we'll overwrite (don't delete manually-curated guides/helpers/etc).
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

  console.log(
    `Generated docs for ${models.length} models, ${
      summary.byNameAction.size + summary.byNameFilter.size
    } unique hooks (${hookCalls.length} call sites), and ${routes.length} routes.`,
  )
}

main()
