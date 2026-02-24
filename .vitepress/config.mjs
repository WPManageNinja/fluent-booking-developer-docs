import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "FluentBooking Developer Docs",
  description: "Complete developer documentation for FluentBooking — REST API, database models, action hooks, and filter hooks for the WordPress scheduling plugin.",
  sitemap: {
    hostname: 'https://developers.fluentbooking.com'
  },
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
  ],
  transformPageData(pageData) {
    const hostname = 'https://developers.fluentbooking.com'
    // Build the page key: "rest-api/calendars/events", "database/models/booking", etc.
    const pageKey = pageData.relativePath.replace(/index\.md$/, 'index').replace(/\.md$/, '')

    // Canonical URL (strip trailing "index")
    const canonicalPath = pageKey.replace(/\/index$/, '').replace(/^index$/, '')
    const canonicalUrl = `${hostname}/${canonicalPath}`

    // Per-page OG image: /images/og/{pageKey}.png, fallback to home
    const ogImage = `${hostname}/images/og/${pageKey}.png`

    pageData.frontmatter.head ??= []
    pageData.frontmatter.head.push(
      ['link', { rel: 'canonical', href: canonicalUrl }],
      ['meta', { property: 'og:url', content: canonicalUrl }],
      ['meta', { property: 'og:image', content: ogImage }],
      ['meta', { name: 'twitter:image', content: ogImage }],
    )
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    siteTitle: 'Dev Docs',
    logo: {
        light: '/images/logo-light.svg',
        dark: '/images/logo-dark.svg'
    },
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Getting Started', link: '/getting-started' },
      {
        text: 'Database',
        items: [
          { text: 'Database Schema', link: '/database/schema' },
          { text: 'Database Models', link: '/database/models' },
          { text: 'Model Relationships', link: '/database/relationships' },
          { text: 'Query Builder', link: '/database/query-builder' }
        ]
      },
      {
        text: 'Developer Hooks',
        items: [
          { text: 'Action Hooks', link: '/hooks/actions/' },
          { text: 'Filter Hooks', link: '/hooks/filters/' }
        ]
      },
      { text: 'Rest API', link: '/rest-api/' }
    ],

    sidebar: {
    '/database/': [
        {
          text: 'Database Documentation',
          items: [
            {
              text: 'Database',
              items: [
                { text: 'Database Schema', link: '/database/schema' },
                { text: 'Database Models', link: '/database/models' },
                { text: 'Model Relationships', link: '/database/relationships' },
                { text: 'Query Builder', link: '/database/query-builder' }
              ]
            },
            {
              text: 'Core Models',
              items: [
                { text: 'Booking', link: '/database/models/booking' },
                { text: 'Calendar', link: '/database/models/calendar' },
                { text: 'CalendarSlot', link: '/database/models/calendar-slot' },
                { text: 'User', link: '/database/models/user' }
              ]
            },
            {
              text: 'System Models',
              items: [
                { text: 'Availability', link: '/database/models/availability' },
                { text: 'BookingActivity', link: '/database/models/booking-activity' },
                { text: 'BookingHost', link: '/database/models/booking-host' },
                { text: 'BookingMeta', link: '/database/models/booking-meta' },
                { text: 'Meta', link: '/database/models/meta' }
              ]
            },
            {
              text: 'Pro Plugin Models',
              items: [
                { text: 'Order', link: '/database/models/order' },
                { text: 'Transactions', link: '/database/models/transactions' },
                { text: 'Webhook', link: '/database/models/webhook' }
              ]
            }
          ]
        }
      ],
      '/rest-api/': [
        {
          text: 'REST API Documentation',
          items: [
            {
              text: 'Getting Started',
              link: '/rest-api/',
              items: [
                { text: 'Authentication', link: '/rest-api/authentication' },
                { text: 'Error Handling', link: '/rest-api/error-handling' },
                { text: 'Resources', link: '/rest-api/resources' }
              ]
            },
            {
              text: 'Calendars & Events',
              link: '/rest-api/calendars/',
              items: [
                { text: 'Events', link: '/rest-api/calendars/events' },
                { text: 'Event Availability', link: '/rest-api/calendars/event-availability' },
                { text: 'Event Booking Fields', link: '/rest-api/calendars/event-booking-fields' },
                { text: 'Event Notifications', link: '/rest-api/calendars/event-notifications' },
                { text: 'Event Integrations', link: '/rest-api/calendars/event-integrations' },
                { text: 'Event Settings', link: '/rest-api/calendars/event-settings' },
                { text: 'Direct Event Access', link: '/rest-api/events/' },
                { text: 'Sharing & Landing Pages', link: '/rest-api/calendars/sharing-settings' }
              ]
            },
            {
              text: 'Bookings & Scheduling',
              link: '/rest-api/bookings/',
              items: [
                { text: 'Schedules', link: '/rest-api/schedules/' },
                { text: 'Availability Schedules', link: '/rest-api/availability/' },
                { text: 'Transactions', link: '/rest-api/schedules/transactions' }
              ]
            },
            {
              text: 'Administration',
              link: '/rest-api/settings/',
              items: [
                { text: 'Admin & Hosts', link: '/rest-api/admin/' },
                { text: 'Reports & Analytics', link: '/rest-api/reports/' }
              ]
            },
            {
              text: 'Integrations & Extensions',
              link: '/rest-api/integrations/',
              items: [
                { text: 'Webhooks & SMS', link: '/rest-api/webhooks/' },
                { text: 'Payments', link: '/rest-api/payments/' }
              ]
            }
          ]
        }
      ],
      '/getting-started': [
        {
          text: 'Getting Started',
          items: [
            { text: 'Overview', link: '/getting-started' },
            { text: 'REST API Overview', link: '/rest-api/' },
            { text: 'Developer Hooks', link: '/hooks/' }
          ]
        }
      ],
      '/hooks/': [
        {
          text: 'Developer Hooks',
          items: [
            {
              text: 'Action Hooks',
              link: '/hooks/actions/',
              items: [
                { text: 'Overview', link: '/hooks/actions/' },
                { text: 'Bookings & Scheduling', link: '/hooks/actions/bookings-and-scheduling' },
                { text: 'Calendars & Events', link: '/hooks/actions/calendars-and-events' },
                { text: 'Availability', link: '/hooks/actions/availability' },
                { text: 'Integrations', link: '/hooks/actions/integrations' },
                { text: 'Landing Pages & Display', link: '/hooks/actions/landing-pages-and-display' },
                { text: 'Admin & Settings', link: '/hooks/actions/admin-and-settings' },
                { text: 'Payments & Orders', link: '/hooks/actions/payments-and-orders' }
              ]
            },
            {
              text: 'Filter Hooks',
              link: '/hooks/filters/',
              items: [
                { text: 'Overview', link: '/hooks/filters/' },
                { text: 'Booking Configuration', link: '/hooks/filters/booking-configuration' },
                { text: 'Calendar & Event Settings', link: '/hooks/filters/calendar-and-event-settings' },
                { text: 'Availability & Slots', link: '/hooks/filters/availability-and-slots' },
                { text: 'Display & Templates', link: '/hooks/filters/display-and-templates' },
                { text: 'Admin & Configuration', link: '/hooks/filters/admin-and-configuration' },
                { text: 'Payments & Advanced', link: '/hooks/filters/payments-and-advanced' },
                { text: 'Integrations', link: '/hooks/filters/integrations' }
              ]
            }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/WPManageNinja/fluent-booking' }
    ],

    footer: {
        message: '<a href="https://fluentbooking.com/">FluentBooking</a> · <a href="https://fluentbooking.com/docs/">User Docs</a> · <a href="https://fluentbooking.com/blog/">Blog</a> · <a href="https://wpmanageninja.com/support-tickets/">Support</a> · <a href="https://github.com/WPManageNinja/fluent-booking">GitHub</a>',
        copyright: 'Copyright © 2026 FluentBooking'
    },

    search: {
        provider: 'local'
    }
  }
})
