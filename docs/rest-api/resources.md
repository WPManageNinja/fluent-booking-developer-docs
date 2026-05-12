---
title: API Resources
description: Common resource shapes returned by the FluentBooking REST API.
---

# API Resources

This page lists the common JSON shapes returned across multiple endpoints. Each module reference page shows the response specific to its operations.

## Calendar

```json
{
  "id": 1,
  "title": "Sales Calendar",
  "slug": "sales",
  "description": "...",
  "user_id": 1,
  "type": "user",
  "status": "active",
  "settings": { "...": "..." },
  "created_at": "2026-01-01 12:00:00",
  "updated_at": "2026-01-01 12:00:00"
}
```

## Calendar Event (Slot)

```json
{
  "id": 10,
  "calendar_id": 1,
  "title": "15 Minute Consultation",
  "slug": "15-min",
  "duration": 15,
  "duration_type": "minutes",
  "event_type": "single",
  "status": "active",
  "settings": { "...": "..." }
}
```

## Booking

```json
{
  "id": 100,
  "hash": "ab12cd34...",
  "calendar_id": 1,
  "event_id": 10,
  "person_user_id": 5,
  "host_user_id": 1,
  "first_name": "Ada",
  "last_name": "Lovelace",
  "email": "ada@example.com",
  "start_time": "2026-01-01 14:00:00",
  "end_time": "2026-01-01 14:15:00",
  "slot_minutes": 15,
  "status": "scheduled",
  "payment_status": null,
  "person_time_zone": "Europe/London"
}
```

## Availability Schedule

`Availability` is stored in `fcal_meta` with `object_type='availability'`. The columns are polymorphic-meta columns (`id`, `object_type`, `object_id`, `key`, `value`); the recurring weekly schedule lives in the serialized `value`.

```json
{
  "id": 1,
  "object_type": "availability",
  "object_id": 1,
  "key": "default",
  "value": {
    "title": "Default schedule",
    "timezone": "UTC",
    "is_default": 1,
    "schedule": {
      "monday":    [{ "start_time": "09:00", "end_time": "17:00" }],
      "tuesday":   [{ "start_time": "09:00", "end_time": "17:00" }]
    }
  }
}
```

The exact shape of `value` is set by the admin UI when an availability is created — treat it as an opaque payload and let the model accessors handle (de)serialization.

## Booking Meta

`fcal_booking_meta` rows are key/value pairs attached to a booking. Columns: `id`, `booking_id`, `meta_key`, `value`.

```json
{
  "id": 500,
  "booking_id": 100,
  "meta_key": "custom_field_company",
  "value": "ACME Corp"
}
```

Booking field answers, location data, and integration payloads are stored here. Use `Helper::getBookingMeta($bookingId, $metaKey)` to read.

## Paginated Response

List endpoints return paginated payloads:

```json
{
  "data": [/* …items… */],
  "total": 124,
  "per_page": 20,
  "current_page": 1,
  "last_page": 7,
  "from": 1,
  "to": 20
}
```

Use `?page=N&per_page=M` to navigate. The maximum `per_page` is configurable via the `fluent_booking/booking_per_page_options` filter.

## Timestamps & Timezones

- Database columns (`start_time`, `end_time`, `created_at`, `updated_at`) are stored in **UTC** (`Y-m-d H:i:s`).
- Booking responses include `person_time_zone` so clients can render the attendee's local time.
- Calendar settings expose the host timezone separately.

Always treat stored values as UTC unless the response field name explicitly says otherwise.

## Hash IDs

Bookings expose a public `hash` value used for permalinks and reschedule/cancellation flows. Prefer `hash` over the numeric `id` in customer-facing URLs to keep IDs non-enumerable.
