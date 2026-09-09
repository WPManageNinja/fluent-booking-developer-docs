# FluentBooking Developer Documentation

Official developer documentation for the FluentBooking WordPress plugin — appointment scheduling, calendar management, and booking automation.

## Quick Start

### Prerequisites

- Node.js 18+ or compatible version
- npm or pnpm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run docs:dev

# Build for production (regenerates, verifies against the plugin source, then builds)
npm run docs:build

# Verify the generated docs still match the plugin source
npm run verify:docs

# Preview production build
npm run docs:preview
```

## Documentation Structure

```
fluent-booking-developer-docs/
├── getting-started.md            # Getting Started Guide
├── rest-api/
│   ├── index.md                  # REST API Overview
│   ├── authentication.md         # Authentication Guide
│   ├── error-handling.md         # Error Handling
│   ├── resources.md              # Resources Overview
│   ├── calendars/                # Calendars & Events API
│   │   ├── index.md
│   │   ├── events.md
│   │   ├── event-availability.md
│   │   ├── event-booking-fields.md
│   │   ├── event-notifications.md
│   │   ├── event-integrations.md
│   │   ├── event-settings.md
│   │   └── sharing-settings.md
│   ├── bookings/                 # Bookings API
│   ├── schedules/                # Schedules & Transactions API
│   ├── availability/             # Availability Schedules API
│   ├── events/                   # Direct Event Access API
│   ├── settings/                 # Settings API
│   ├── admin/                    # Admin & Hosts API
│   ├── reports/                  # Reports & Analytics API
│   ├── integrations/             # Integrations API
│   ├── webhooks/                 # Webhooks & SMS API
│   └── payments/                 # Payments API
├── database/
│   ├── schema.md                 # Database Schema & Tables
│   ├── models.md                 # Models Overview
│   ├── relationships.md          # Model Relationships
│   ├── query-builder.md          # Query Builder Examples
│   └── models/                   # Individual Model Docs
│       ├── booking.md
│       ├── calendar.md
│       ├── calendar-slot.md
│       ├── user.md
│       ├── availability.md
│       ├── booking-activity.md
│       ├── booking-host.md
│       ├── booking-meta.md
│       ├── meta.md
│       ├── order.md
│       ├── transactions.md
│       ├── order-items.md
│       └── webhook.md
├── mcp/
│   ├── index.md                  # MCP server overview, toolsets, extension hooks
│   └── abilities/                # One page per MCP ability (generated)
├── helpers/
│   ├── index.md                  # Helper services overview (curated)
│   ├── helper-class.md           # Grouped Helper reference (curated)
│   └── service-api.md            # Complete method index (generated)
└── hooks/
    ├── actions/                  # Action Hooks
    │   ├── index.md
    │   ├── bookings-and-scheduling.md
    │   ├── calendars-and-events.md
    │   ├── availability.md
    │   ├── integrations.md
    │   ├── landing-pages-and-display.md
    │   ├── admin-and-settings.md
    │   └── payments-and-orders.md
    └── filters/                  # Filter Hooks
        ├── index.md
        ├── booking-configuration.md
        ├── calendar-and-event-settings.md
        ├── availability-and-slots.md
        ├── display-and-templates.md
        ├── admin-and-configuration.md
        ├── payments-and-advanced.md
        └── integrations.md
```

## Built With

- [VitePress](https://vitepress.dev/) - Static site generator
- [Vue 3](https://vuejs.org/) - Progressive JavaScript framework

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Adding New Documentation

1. Create a new `.md` file in the appropriate directory
2. Update `.vitepress/config.mjs` to add the page to navigation
3. Follow the existing documentation style and format
4. Test locally before submitting

## License

This documentation is licensed under the MIT License.

## Links

- [FluentBooking Plugin](https://fluentbooking.com/)
- [Support Forum](https://wpmanageninja.com/support-tickets/)

## Support

- Documentation Issues: [GitHub Issues](https://github.com/WPManageNinja/fluent-booking/issues)
- Plugin Support: [Support Forum](https://wpmanageninja.com/support-tickets/)
