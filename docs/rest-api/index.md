---
title: REST API Overview
description: Source-verified REST API reference for FluentBooking.
---

# FluentBooking REST API

This reference covers 129 routes registered in the FluentBooking core and Pro route files.

## Base URL

`https://your-site.com/wp-json/fluent-booking/v2`

## Authentication

- **Admin and settings routes:** use WordPress Application Passwords (`username:application_password` via Basic auth) or a WordPress nonce in the `X-WP-Nonce` header.
- **Portal routes:** browser clients use cookie authentication with an `X-WP-Nonce` header; server-to-server integrations can use Application Passwords.
- **Method override:** the FluentBooking frontend sends PUT, PATCH, and DELETE requests as POST requests with an `X-HTTP-Method-Override` header.

## Modules

| Module | Edition | Routes | Description |
| --- | --- | --- | --- |
| [Calendars](/rest-api/calendars) | Core | 10 | Calendar CRUD, ordering, sharing-page configuration, and event-type lifecycle for each calendar. |
| [Events](/rest-api/events) | Core | 4 | Calendar event types — bookable slots configured per calendar. |
| [Event Availability](/rest-api/event-availability) | Core + <span class="pro-badge">PRO</span> | 4 | Availability rules attached to a specific calendar event. |
| [Event Booking Fields](/rest-api/event-booking-fields) | Core | 2 | Custom booking-form fields configured per calendar event. |
| [Event Email Notifications](/rest-api/event-notifications) | Core | 3 | Per-event email notification templates and configuration. |
| [Event Integrations](/rest-api/event-integrations) | Core | 8 | Per-event integration configuration (CRM, automation feeds, custom integrations). |
| [Event Settings](/rest-api/event-settings) | Core + <span class="pro-badge">PRO</span> | 5 | Per-event details, limits, and configuration endpoints. |
| [Sharing & Landing](/rest-api/sharing-settings) | Core | 2 | Public calendar landing-page configuration and sharing settings. |
| [Bookings](/rest-api/bookings) | Core | 4 | Booking CRUD, listing, search, and patch endpoints. |
| [Schedules](/rest-api/schedules) | Core | 15 | Schedule management endpoints used by the admin app. |
| [Availability Schedules](/rest-api/availability) | Core | 9 | Standalone (reusable) availability schedules used across events. |
| [Settings](/rest-api/settings) | Core + <span class="pro-badge">PRO</span> | 19 | Plugin-wide settings — general, branding, dashboard, email, and global configuration. |
| [Admin & Hosts](/rest-api/admin) | Core | 3 | Admin operations including host management, dashboard, and impersonation. |
| [Reports](/rest-api/reports) | Core | 3 | Analytics, exports, and reporting endpoints (Pro features included). |
| [Integrations](/rest-api/integrations) | Core + <span class="pro-badge">PRO</span> | 9 | Global integration configuration (Zoom, Google, Outlook, Apple, FluentCRM, webhooks). |
| [Calendar Integrations](/rest-api/calendar-integrations) | <span class="pro-badge">PRO</span> | 11 | Calendar-level integration endpoints — remote calendar connections (Google, Outlook, Apple, CalDAV), Zoom user connections, and general integration feeds. |
| [Webhooks & SMS](/rest-api/webhooks) | <span class="pro-badge">PRO</span> | 7 | Outbound webhook configuration and SMS notification endpoints (Pro). |
| [Payments](/rest-api/payments) | Core + <span class="pro-badge">PRO</span> | 11 | Payment gateways, transactions, orders, and coupon administration (Pro). |
