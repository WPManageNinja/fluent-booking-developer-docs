---
title: Getting Started
description: Setup, architecture, and navigation guidance for FluentBooking developers.
---

# Getting Started

FluentBooking is a WordPress appointment scheduling plugin built on the WPFluent framework. This documentation site is generated directly from the checked-out FluentBooking core and Pro plugin source, so the route inventory, hook names, and model references stay aligned with the installed code.

## What This Site Covers

- **Database layer:** ORM models mapped to the `fcal_*` tables (calendars, events, bookings, availability, metadata, plus Pro tables for orders, transactions, and webhooks).
- **Hooks:** Action and filter hooks emitted across the booking lifecycle, calendars, availability, payments, and third-party integrations.
- **REST API:** Every route registered under the `fluent-booking/v2` namespace, grouped by module with per-operation reference pages.
- **Guides:** Practical recipes for common customizations — code snippets, theme compatibility, custom booking fields, and webhooks.

## Quick Links

<div class="getting-started-grid">
  <a href="/rest-api/" class="getting-started-card">
    <strong>REST API Overview</strong>
    <span>Authentication, errors, base URL, and module index.</span>
  </a>
  <a href="/database/schema" class="getting-started-card">
    <strong>Database Schema</strong>
    <span>All <code>fcal_*</code> tables with columns and indexes.</span>
  </a>
  <a href="/hooks/actions/" class="getting-started-card">
    <strong>Action Hooks</strong>
    <span>Event hooks for booking, calendar, and payment lifecycle.</span>
  </a>
  <a href="/hooks/filters/" class="getting-started-card">
    <strong>Filter Hooks</strong>
    <span>Data-shaping filters for fields, slots, and rendering.</span>
  </a>
  <a href="/guides/code-snippets" class="getting-started-card">
    <strong>Code Snippets</strong>
    <span>Drop-in examples for common customizations.</span>
  </a>
  <a href="/database/models" class="getting-started-card">
    <strong>Models Reference</strong>
    <span>Eloquent-style ORM models with relationships and scopes.</span>
  </a>
</div>

## Source of Truth

| Concern | Source |
| --- | --- |
| Core routes | `fluent-booking/app/Http/Routes/api.php` |
| Pro routes | `fluent-booking-pro/app/Http/Routes/api.php`, `fluent-booking-pro/app/Http/Routes/routes.php` |
| Controllers | `fluent-booking/app/Http/Controllers/`, plus the matching Pro controllers |
| Models | `fluent-booking/app/Models/`, `fluent-booking-pro/app/Models/` |
| Migrations | `fluent-booking/database/Migrations/` |
| Hooks | `do_action(...)` / `apply_filters(...)` calls across the core and Pro source trees |

## Editions

### FluentBooking Core (Free)

The core plugin provides the scheduling foundation:

- Unlimited calendars and event types
- Booking lifecycle (creation, confirmation, cancellation, reschedule)
- Availability schedules (recurring + date overrides)
- Email notifications
- Core REST API (`fluent-booking/v2`)

### FluentBooking Pro <span class="pro-badge">PRO</span>

The Pro add-on extends Core with:

- Payments (Stripe, PayPal, WooCommerce)
- Coupons and discounts
- Advanced integrations (Zoom, Google Meet, Outlook, Apple Calendar)
- Outbound webhooks and SMS notifications
- Multi-host / team / round-robin event types
- Reports and exports

Pro endpoints, hooks, and models are flagged with <span class="pro-badge">PRO</span> badges throughout this reference.

## Architecture at a Glance

- **REST namespace:** `fluent-booking/v2`
- **Custom tables:** all prefixed `fcal_` (e.g., `fcal_bookings`, `fcal_calendars`, `fcal_calendar_events`, `fcal_booking_meta`, `fcal_meta`)
- **Request flow:** Route → Policy → Controller → Service → Model
- **Frontend conventions:** The admin app uses `X-HTTP-Method-Override` for PUT/PATCH/DELETE; browser clients rely on cookie auth + nonce. Server-to-server calls use WordPress Application Passwords.

## Development Commands

```bash
npm install
npm run docs:dev        # local dev server
npm run docs:build      # production build
npm run generate:docs   # regenerate model/hook/route docs from PHP source
npm run generate:og     # regenerate OG images
```

## Main Sections

- [Database Schema](/database/schema)
- [Model Reference](/database/models)
- [Action Hooks](/hooks/actions/)
- [Filter Hooks](/hooks/filters/)
- [Helpers](/helpers/)
- [REST API](/rest-api/)
- [Guides](/guides/)
