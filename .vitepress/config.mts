/// <reference types="node" />

import { defineConfig } from 'vitepress'
import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  statSync,
  writeFileSync,
} from 'fs'
import { dirname, join, relative } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const projectRoot = join(__dirname, '..')
const generatedDir = join(projectRoot, '.generated')
const moduleOrderPath = join(generatedDir, 'restapi-module-order.json')

const MODULE_ORDER: Record<string, string[]> = existsSync(moduleOrderPath)
  ? JSON.parse(readFileSync(moduleOrderPath, 'utf8'))
  : {}

const databaseSidebar = [
  {
    text: 'Overview',
    items: [
      { text: 'Schema', link: '/database/schema' },
      { text: 'Models Overview', link: '/database/models' },
      { text: 'Query Builder', link: '/database/query-builder' },
      { text: 'Relationships', link: '/database/relationships' },
    ],
  },
  {
    text: 'Core Models',
    items: [
      { text: 'Calendar', link: '/database/models/calendar' },
      { text: 'CalendarSlot', link: '/database/models/calendar-slot' },
      { text: 'Booking', link: '/database/models/booking' },
      { text: 'Availability', link: '/database/models/availability' },
    ],
  },
  {
    text: 'Booking System',
    items: [
      { text: 'BookingActivity', link: '/database/models/booking-activity' },
      { text: 'BookingHost', link: '/database/models/booking-host' },
      { text: 'BookingMeta', link: '/database/models/booking-meta' },
      { text: 'Staff', link: '/database/models/staff' },
      { text: 'Meta', link: '/database/models/meta' },
    ],
  },
  {
    text: 'People',
    items: [
      { text: 'User', link: '/database/models/user' },
    ],
  },
  {
    text: 'Pro Models',
    items: [
      { text: 'Order', link: '/database/models/order' },
      { text: 'OrderItems', link: '/database/models/order-items' },
      { text: 'Transactions', link: '/database/models/transactions' },
      { text: 'Webhook', link: '/database/models/webhook' },
    ],
  },
  {
    text: 'Framework',
    items: [
      { text: 'Model', link: '/database/models/model' },
    ],
  },
]

const actionHookPages = [
  { text: 'Bookings & Scheduling', link: '/hooks/actions/bookings-and-scheduling' },
  { text: 'Calendars & Events', link: '/hooks/actions/calendars-and-events' },
  { text: 'Availability', link: '/hooks/actions/availability' },
  { text: 'Integrations', link: '/hooks/actions/integrations' },
  { text: 'Landing Pages & Display', link: '/hooks/actions/landing-pages-and-display' },
  { text: 'Admin & Settings', link: '/hooks/actions/admin-and-settings' },
  { text: 'Payments & Orders', link: '/hooks/actions/payments-and-orders' },
  { text: 'Coupons', link: '/hooks/actions/coupons' },
  { text: 'Miscellaneous', link: '/hooks/actions/miscellaneous' },
]

const filterHookPages = [
  { text: 'Booking Configuration', link: '/hooks/filters/booking-configuration' },
  { text: 'Calendar & Event Settings', link: '/hooks/filters/calendar-and-event-settings' },
  { text: 'Availability & Slots', link: '/hooks/filters/availability-and-slots' },
  { text: 'Display & Templates', link: '/hooks/filters/display-and-templates' },
  { text: 'Admin & Configuration', link: '/hooks/filters/admin-and-configuration' },
  { text: 'Payments & Advanced', link: '/hooks/filters/payments-and-advanced' },
  { text: 'Integrations', link: '/hooks/filters/integrations' },
  { text: 'Miscellaneous', link: '/hooks/filters/miscellaneous' },
]

const helperPages = [
  { text: 'Overview', link: '/helpers/' },
  { text: 'Helper Class', link: '/helpers/helper-class' },
  { text: 'Service API Index', link: '/helpers/service-api' },
]

// The MCP ability pages are generated, so the sidebar reads them off disk the
// same way the REST operation pages do.
function buildMcpSidebar() {
  const abilitiesDir = join(projectRoot, 'docs', 'mcp', 'abilities')
  const items: Array<{ text: string; link: string }> = []

  if (existsSync(abilitiesDir)) {
    for (const file of readdirSync(abilitiesDir).filter((f) => f.endsWith('.md')).sort()) {
      const slug = file.replace(/\.md$/, '')
      const raw = readFileSync(join(abilitiesDir, file), 'utf8')
      const title = raw.match(/^title:\s*(.+)$/m)?.[1]?.replace(/^["']|["']$/g, '') ?? slug
      items.push({ text: title, link: `/mcp/abilities/${slug}` })
    }
  }

  return [
    {
      text: 'MCP Server',
      items: [{ text: 'Overview', link: '/mcp/' }],
    },
    {
      text: 'Abilities',
      collapsed: false,
      items,
    },
  ]
}

function buildHooksSidebar() {
  return [
    {
      text: 'Actions',
      collapsed: true,
      items: [{ text: 'Overview', link: '/hooks/actions/' }, ...actionHookPages],
    },
    {
      text: 'Filters',
      collapsed: true,
      items: [{ text: 'Overview', link: '/hooks/filters/' }, ...filterHookPages],
    },
    {
      text: 'Helpers',
      collapsed: true,
      items: helperPages,
    },
  ]
}

const guidePages = [
  { text: 'Guides Overview', link: '/guides/' },
  { text: 'Code Snippets', link: '/guides/code-snippets' },
  { text: 'Theme Compatibility', link: '/guides/theme-compatibility' },
  { text: 'Custom Booking Fields', link: '/guides/custom-booking-fields' },
  { text: 'Meta Settings API', link: '/guides/meta-settings-api' },
  { text: 'Webhooks (Pro)', link: '/guides/incoming-webhooks' },
  { text: 'Payment Integrations (Pro)', link: '/guides/payment-integrations' },
]

function getOperationSidebarItems(moduleDir: string) {
  const opsDir = join(projectRoot, 'docs', 'rest-api', 'operations', moduleDir)
  if (!existsSync(opsDir)) {
    return []
  }

  const files = readdirSync(opsDir).filter((file) => file.endsWith('.md'))
  const order = MODULE_ORDER[moduleDir] || []

  const items = files.map((file) => {
    const slug = file.replace(/\.md$/, '')
    const content = readFileSync(join(opsDir, file), 'utf8')
    const titleMatch = content.match(/^title:\s*(.+)$/m)
    const title = titleMatch
      ? titleMatch[1].replace(/['"]/g, '').trim()
      : slug.replace(/-/g, ' ')

    return {
      text: title,
      link: `/rest-api/operations/${moduleDir}/${slug}`,
      _slug: slug,
    }
  })

  items.sort((a, b) => {
    const indexA = order.indexOf(a._slug)
    const indexB = order.indexOf(b._slug)
    const weightA = indexA === -1 ? Number.MAX_SAFE_INTEGER : indexA
    const weightB = indexB === -1 ? Number.MAX_SAFE_INTEGER : indexB

    if (weightA !== weightB) {
      return weightA - weightB
    }

    return a.text.localeCompare(b.text)
  })

  return items.map(({ _slug, ...item }) => item)
}

function buildRestApiSidebar() {
  const sections = [
    {
      group: 'Calendars & Events',
      items: [
        { text: 'Calendars', link: '/rest-api/calendars', dir: 'calendars' },
        { text: 'Events', link: '/rest-api/events', dir: 'events' },
        { text: 'Event Availability', link: '/rest-api/event-availability', dir: 'event-availability' },
        { text: 'Event Booking Fields', link: '/rest-api/event-booking-fields', dir: 'event-booking-fields' },
        { text: 'Event Notifications', link: '/rest-api/event-notifications', dir: 'event-notifications' },
        { text: 'Event Integrations', link: '/rest-api/event-integrations', dir: 'event-integrations' },
        { text: 'Event Settings', link: '/rest-api/event-settings', dir: 'event-settings' },
        { text: 'Sharing & Landing', link: '/rest-api/sharing-settings', dir: 'sharing-settings' },
      ],
    },
    {
      group: 'Bookings & Scheduling',
      items: [
        { text: 'Bookings', link: '/rest-api/bookings', dir: 'bookings' },
        { text: 'Schedules', link: '/rest-api/schedules', dir: 'schedules' },
        { text: 'Availability Schedules', link: '/rest-api/availability', dir: 'availability' },
      ],
    },
    {
      group: 'Administration',
      items: [
        { text: 'Settings', link: '/rest-api/settings', dir: 'settings' },
        { text: 'Admin & Hosts', link: '/rest-api/admin', dir: 'admin' },
        { text: 'Reports', link: '/rest-api/reports', dir: 'reports' },
      ],
    },
    {
      group: 'Extensions',
      items: [
        { text: 'Integrations', link: '/rest-api/integrations', dir: 'integrations' },
        { text: 'Calendar Integrations (Pro)', link: '/rest-api/calendar-integrations', dir: 'calendar-integrations' },
        { text: 'Webhooks & SMS (Pro)', link: '/rest-api/webhooks', dir: 'webhooks' },
        { text: 'Payments (Pro)', link: '/rest-api/payments', dir: 'payments' },
      ],
    },
  ]

  const sidebar: Array<Record<string, unknown>> = [
    {
      text: 'Getting Started',
      items: [
        { text: 'API Overview', link: '/rest-api/' },
        { text: 'Error Handling', link: '/rest-api/error-handling' },
        { text: 'Resources', link: '/rest-api/resources' },
      ],
    },
  ]

  for (const section of sections) {
    sidebar.push({
      text: section.group,
      collapsed: false,
      items: section.items.map((module) => {
        const operations = getOperationSidebarItems(module.dir)

        if (!operations.length) {
          return { text: module.text, link: module.link }
        }

        return {
          text: module.text,
          link: module.link,
          collapsed: true,
          items: operations,
        }
      }),
    })
  }

  return sidebar
}

export default defineConfig({
  srcDir: 'docs',
  title: 'FluentBooking Developer Docs',
  description:
    'Complete developer documentation for FluentBooking — REST API, database models, action hooks, and filter hooks for the WordPress scheduling plugin.',
  ignoreDeadLinks: true,
  cleanUrls: true,
  sitemap: { hostname: 'https://developers.fluentbooking.com' },
  head: [
    ['link', { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon/favicon-32x32.png' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon/favicon-16x16.png' }],
    ['link', { rel: 'apple-touch-icon', sizes: '180x180', href: '/favicon/apple-touch-icon.png' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: 'FluentBooking Developer Docs' }],
    ['meta', { property: 'og:image', content: 'https://developers.fluentbooking.com/images/og/index.png' }],
    ['meta', { property: 'og:image:width', content: '1200' }],
    ['meta', { property: 'og:image:height', content: '630' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:image', content: 'https://developers.fluentbooking.com/images/og/index.png' }],
    ['meta', { name: 'theme-color', content: '#2653C7' }],
    ['script', { type: 'module', src: 'https://cdn.jsdelivr.net/gh/fluent-docai/chat-widget@latest/chat-widget.js' }],
    [
      'script',
      { type: 'module' },
      `FluentBotChatWidget.injectWidget("019ba1e2-2c1b-7168-a6fc-216112b67978");`,
    ],
  ],
  transformPageData(pageData) {
    const hostname = 'https://developers.fluentbooking.com'
    const pageKey = pageData.relativePath.replace(/index\.md$/, 'index').replace(/\.md$/, '')
    const canonicalPath = pageKey.replace(/\/index$/, '').replace(/^index$/, '')
    const canonicalUrl = `${hostname}/${canonicalPath}`
    const ogImage = `${hostname}/images/og/${pageKey}.png`

    pageData.frontmatter.head ??= []
    pageData.frontmatter.head.push(
      ['link', { rel: 'canonical', href: canonicalUrl }],
      ['meta', { property: 'og:url', content: canonicalUrl }],
      ['meta', { property: 'og:image', content: ogImage }],
      ['meta', { name: 'twitter:image', content: ogImage }],
    )
  },
  vite: {
    publicDir: join(projectRoot, 'public'),
    assetsInclude: ['**/*.json'],
    plugins: [
      {
        name: 'fluentbooking-openapi-assets',
        configureServer(server) {
          server.middlewares.use((req, res, next) => {
            if (!req.url?.startsWith('/openapi/public/')) {
              next()
              return
            }

            const requestPath = req.url.replace('/openapi/public/', '')
            const fullPath = join(projectRoot, 'public', 'openapi', requestPath)

            if (!existsSync(fullPath)) {
              next()
              return
            }

            res.setHeader('Content-Type', 'application/json')
            res.setHeader('Access-Control-Allow-Origin', '*')
            res.end(readFileSync(fullPath, 'utf8'))
          })
        },
        closeBundle() {
          const sourceDir = join(projectRoot, 'public', 'openapi')
          const targetDir = join(__dirname, 'dist', 'openapi', 'public')

          if (!existsSync(sourceDir)) return

          const jsonFiles: string[] = []

          const copyRecursive = (source: string, target: string) => {
            const stats = statSync(source)

            if (stats.isDirectory()) {
              mkdirSync(target, { recursive: true })
              for (const entry of readdirSync(source)) {
                if (entry === 'README.md') continue
                copyRecursive(join(source, entry), join(target, entry))
              }
              return
            }

            if (!source.endsWith('.json')) return

            mkdirSync(dirname(target), { recursive: true })
            copyFileSync(source, target)
            jsonFiles.push(`/openapi/public/${relative(sourceDir, source).replace(/\\/g, '/')}`)
          }

          copyRecursive(sourceDir, targetDir)

          writeFileSync(
            join(targetDir, 'manifest.json'),
            JSON.stringify({ files: jsonFiles, generated: new Date().toISOString() }, null, 2),
          )
        },
      },
    ],
  },
  markdown: {
    config(md) {
      const originalFence = md.renderer.rules.fence
      if (!originalFence) return

      md.renderer.rules.fence = (tokens, index, options, env, renderer) => {
        const token = tokens[index]
        const info = token.info ? md.utils.unescapeAll(token.info).trim() : ''
        const language = info ? info.split(/\s+/g)[0] : ''

        if (language === 'mermaid') {
          return `<Mermaid content="${md.utils.escapeHtml(token.content)}" />`
        }

        return originalFence(tokens, index, options, env, renderer)
      }
    },
  },
  themeConfig: {
    logo: {
      light: '/images/logo-light.svg',
      dark: '/images/logo-dark.svg',
    },
    siteTitle: '',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Getting Started', link: '/getting-started' },
      {
        text: 'Database',
        items: [
          { text: 'Schema', link: '/database/schema' },
          { text: 'Models', link: '/database/models' },
          { text: 'Relationships', link: '/database/relationships' },
          { text: 'Query Builder', link: '/database/query-builder' },
        ],
      },
      {
        text: 'Hooks',
        items: [
          { text: 'Action Hooks', link: '/hooks/actions/' },
          { text: 'Filter Hooks', link: '/hooks/filters/' },
          { text: 'Helpers', link: '/helpers/' },
        ],
      },
      { text: 'REST API', link: '/rest-api/' },
      { text: 'MCP', link: '/mcp/' },
      {
        text: 'Guides',
        items: guidePages.filter((page) => !page.text.includes('Overview')),
      },
    ],
    sidebar: {
      '/database/': [
        {
          text: 'Database',
          items: databaseSidebar,
        },
      ],
      '/hooks/': buildHooksSidebar(),
      '/helpers/': buildHooksSidebar(),
      '/mcp/': buildMcpSidebar(),
      '/rest-api/': buildRestApiSidebar(),
      '/guides/': [
        {
          text: 'Guides',
          items: guidePages,
        },
      ],
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/WPManageNinja/fluent-booking-developer-docs' },
    ],
    search: { provider: 'local' },
    outline: {
      level: [2, 3],
      label: 'On this page',
    },
    editLink: {
      pattern: 'https://github.com/WPManageNinja/fluent-booking-developer-docs/edit/main/:path',
    },
    footer: {
      message:
        '<a href="https://fluentbooking.com/">FluentBooking</a> · <a href="https://fluentbooking.com/docs/">User Docs</a> · <a href="https://fluentbooking.com/blog/">Blog</a> · <a href="https://wpmanageninja.com/support-tickets/">Support</a> · <a href="https://github.com/WPManageNinja/fluent-booking-developer-docs">GitHub</a>',
      copyright: 'Copyright © 2026 FluentBooking',
    },
  },
})
