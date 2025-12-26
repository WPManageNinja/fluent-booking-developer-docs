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
        collapsed: false,
        items: [
          { text: 'Introduction', link: '/getting-started' },
          { text: 'REST API Overview', link: '/rest-api/' },
          { text: 'Authentication', link: '/rest-api/authentication' },
          { text: 'Error Handling', link: '/rest-api/error-handling' },
          { text: 'Resources', link: '/rest-api/resources' }
        ]
      },
      {
        text: 'Calendars & Events',
        collapsed: false,
        items: [
          { text: 'Calendars', link: '/rest-api/calendars/' },
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
        collapsed: false,
        items: [
          { text: 'Bookings', link: '/rest-api/bookings/' },
          { text: 'Schedules', link: '/rest-api/schedules/' },
          { text: 'Availability Schedules', link: '/rest-api/availability/' },
          { text: 'Transactions', link: '/rest-api/schedules/transactions' }
        ]
      },
      {
        text: 'Administration',
        collapsed: false,
        items: [
          { text: 'Settings', link: '/rest-api/settings/' },
          { text: 'Admin & Hosts', link: '/rest-api/admin/' },
          { text: 'Reports & Analytics', link: '/rest-api/reports/' }
        ]
      },
      {
        text: 'Integrations & Extensions',
        collapsed: false,
        items: [
          { text: 'Integrations', link: '/rest-api/integrations/' },
          { text: 'Webhooks & SMS', link: '/rest-api/webhooks/' },
          { text: 'Payments', link: '/rest-api/payments/' }
        ]
      },
      {
        text: 'Hooks',
        collapsed: false,
        items: [
          { text: 'Overview', link: '/hooks/' },
          {
            text: 'Actions',
            collapsed: true,
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
            text: 'Filters',
            collapsed: true,
            items: [
              { text: 'Overview', link: '/hooks/filters/' },
              { text: 'Booking Configuration', link: '/hooks/filters/booking-configuration' },
              { text: 'Calendar & Event Settings', link: '/hooks/filters/calendar-and-event-settings' },
              { text: 'Availability & Slots', link: '/hooks/filters/availability-and-slots' },
              { text: 'Display & Templates', link: '/hooks/filters/display-and-templates' },
              { text: 'Admin & Configuration', link: '/hooks/filters/admin-and-configuration' },
              { text: 'Payments & Advanced', link: '/hooks/filters/payments-and-advanced' }
            ]
          }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/fluent-booking' }
    ]
  }
})
