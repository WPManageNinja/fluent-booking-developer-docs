---
title: Database Models
description: Overview of every model FluentBooking exposes.
---

# Database Models

FluentBooking exposes 15 ORM models built on the WPFluent framework (Laravel-inspired Eloquent). Models extend a shared `Model` base class and live under `FluentBooking\App\Models` (core) and `FluentBookingPro\App\Models` (Pro).

## Model Catalog

| Model | Edition | Table | Description |
| --- | --- | --- | --- |
| [Booking](/database/models/booking) | Core | `fcal_bookings` | Represents an individual booking (appointment) created when an attendee schedules time on a calendar. |
| [Calendar](/database/models/calendar) | Core | `fcal_calendars` | Top-level scheduling container that owns event types, availability, and bookings for a host or resource. |
| [CalendarSlot](/database/models/calendar-slot) | Core | `fcal_calendar_events` | Bookable event type within a calendar (for example, a 15-minute consultation), with its configuration and availability rules. Internally referred to as a "slot" and stored in the `fcal_calendar_events` table. |
| [Availability](/database/models/availability) | Core | `fcal_meta` | Availability schedule defining recurring weekly hours and date overrides. Stored in `fcal_meta` with `object_type='availability'` — the weekly schedule lives in the serialized `value` column. |
| [BookingActivity](/database/models/booking-activity) | Core | `fcal_booking_activity` | Activity stream entries tied to a booking — status changes, notes, and audit log lines. |
| [BookingHost](/database/models/booking-host) | Core | `fcal_booking_hosts` | Pivot rows linking bookings to their host users in multi-host (team / collective / round-robin) scheduling. |
| [BookingMeta](/database/models/booking-meta) | Core | `fcal_booking_meta` | Key/value metadata attached to bookings (booking field answers, location details, custom data). Columns: `booking_id`, `meta_key`, `value`. |
| [Meta](/database/models/meta) | Core | `fcal_meta` | Polymorphic key/value metadata table used by FluentBooking entities (calendars, events, availability, webhooks). Columns: `object_type`, `object_id`, `key`, `value`. |
| [Staff](/database/models/staff) | Core | — | Lightweight representation of a host/staff user — wraps WP user data with FluentBooking-specific helpers. |
| [User](/database/models/user) | Core | `users` | Extended WordPress user model exposing FluentBooking-specific relations such as calendars and bookings. |
| [Model](/database/models/model) | Core | — | Shared base ORM class extended by every FluentBooking model. Sets up timestamps, casts, and the booted-trait pipeline. |
| [Order](/database/models/order) | <span class="pro-badge">PRO</span> | `fcal_orders` | Payment order created when a paid event is booked (Pro). Tracks total, currency, and order status. |
| [OrderItems](/database/models/order-items) | <span class="pro-badge">PRO</span> | `fcal_order_items` | Line items belonging to a payment order (Pro). One row per bookable item (event, addon, coupon). |
| [Transactions](/database/models/transactions) | <span class="pro-badge">PRO</span> | `fcal_transactions` | Transaction records persisted for each payment gateway response (Pro). Includes successful, refunded, and failed attempts. |
| [Webhook](/database/models/webhook) | <span class="pro-badge">PRO</span> | — | Outbound webhook configuration (Pro). Defines event triggers, target URL, headers, and authentication. |
