import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Fluent Booking Developer Docs",
  description: "Complete developer guide for Fluent Booking",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Getting Started', link: '/getting-started' },
      { text: 'REST API', link: '/rest-api/' }
    ],

    sidebar: [
      {
        text: 'Getting Started',
        items: [
          { text: 'Introduction', link: '/getting-started' }
        ]
      },
      {
        text: 'REST API',
        items: [
          { text: 'Overview', link: '/rest-api/' },
          { text: 'Authentication', link: '/rest-api/authentication' },
          { text: 'Error Handling', link: '/rest-api/error-handling' },
          { text: 'Resources', link: '/rest-api/resources' }
        ]
      },
      {
        text: 'Calendars',
        items: [
          { text: 'Overview', link: '/rest-api/calendars/' },
          { text: 'Events', link: '/rest-api/calendars/events' },
          { text: 'Event Availability', link: '/rest-api/calendars/event-availability' },
          { text: 'Event Booking Fields', link: '/rest-api/calendars/event-booking-fields' },
          { text: 'Event Email Notifications', link: '/rest-api/calendars/event-notifications' },
          { text: 'Event Integrations', link: '/rest-api/calendars/event-integrations' },
          { text: 'Event Settings', link: '/rest-api/calendars/event-settings' },
          { text: 'Sharing Settings', link: '/rest-api/calendars/sharing-settings' }
        ]
      },
      {
        text: 'Bookings',
        items: [
          { text: 'Overview', link: '/rest-api/bookings/' }
        ]
      },
      {
        text: 'Schedules',
        items: [
          { text: 'Overview', link: '/rest-api/schedules/' },
          { text: 'Transactions (Pro)', link: '/rest-api/schedules/transactions' }
        ]
      },
      {
        text: 'Availability',
        items: [
          { text: 'Overview', link: '/rest-api/availability/' }
        ]
      },
      {
        text: 'Settings',
        items: [
          { text: 'Overview', link: '/rest-api/settings/' }
        ]
      },
      {
        text: 'Admin',
        items: [
          { text: 'Overview', link: '/rest-api/admin/' }
        ]
      },
      {
        text: 'Reports',
        items: [
          { text: 'Overview', link: '/rest-api/reports/' }
        ]
      },
      {
        text: 'Events API',
        items: [
          { text: 'Overview', link: '/rest-api/events/' }
        ]
      },
      {
        text: 'Integrations',
        items: [
          { text: 'Overview', link: '/rest-api/integrations/' }
        ]
      },
      {
        text: 'Webhooks & SMS (Pro)',
        items: [
          { text: 'Overview', link: '/rest-api/webhooks/' }
        ]
      },
      {
        text: 'Payments (Pro)',
        items: [
          { text: 'Overview', link: '/rest-api/payments/' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/fluent-booking' }
    ]
  }
})
