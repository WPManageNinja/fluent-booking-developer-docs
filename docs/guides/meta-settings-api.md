---
title: Meta Settings API
description: Store custom data on calendars, events, and bookings via the FluentBooking meta helpers.
---

# Meta Settings API

FluentBooking persists arbitrary key/value data in two tables:

| Table | Columns | Used For |
| --- | --- | --- |
| `fcal_meta` | `object_type`, `object_id`, `key`, `value` | Polymorphic meta for calendars, calendar events, availability schedules, Pro webhooks. |
| `fcal_booking_meta` | `booking_id`, `meta_key`, `value` | Booking-specific meta (booking-form answers, location payload). |

Use `FluentBooking\App\Services\Helper` to read and write these tables — model classes do not expose `getMeta()` instance methods.

## Calendar / Event / Polymorphic Meta

```php
use FluentBooking\App\Services\Helper;

// Read (returns the stored value, or null)
$color = Helper::getMeta('calendar', $calendarId, 'custom_branding_color');

// Read and return the Meta model row instead of the raw value
$row = Helper::getMeta('calendar', $calendarId, 'custom_branding_color', true);

// Write (creates the row if absent, updates if present)
Helper::updateMeta('calendar', $calendarId, 'custom_branding_color', '#2653C7');

// Delete
Helper::deleteMeta('calendar', $calendarId, 'custom_branding_color');
```

The first argument (`$group`) is the `object_type` discriminator. Common values:

| `$group` | Purpose |
| --- | --- |
| `calendar` | Per-calendar meta. |
| `calendar_event` | Per-event-type meta. |
| `availability` | Availability schedule rows (the schedule body itself). |
| `webhook` | Pro webhook configs (`Webhook` model is a subclass of `Meta`). |

Values are stored serialized through `maybe_serialize()`, so arrays and objects round-trip safely:

```php
Helper::updateMeta('calendar_event', $eventId, 'integration_payload', [
    'webhook_url' => 'https://example.com/hook',
    'headers'     => ['Authorization' => 'Bearer ...'],
]);

$payload = Helper::getMeta('calendar_event', $eventId, 'integration_payload'); // array
```

## Booking Meta

Bookings use their own table for performance. The API is similar:

```php
use FluentBooking\App\Services\Helper;

// Read
$company = Helper::getBookingMeta($bookingId, 'custom_field_company');

// Write
Helper::updateBookingMeta($bookingId, 'custom_field_company', 'ACME Corp');
```

There is no public `deleteBookingMeta` helper — delete via the model when needed:

```php
use FluentBooking\App\Models\BookingMeta;

BookingMeta::where('booking_id', $bookingId)
    ->where('meta_key', 'custom_field_company')
    ->delete();
```

## Iterating All Meta on a Booking

The `Booking` model exposes the `booking_meta()` relationship:

```php
use FluentBooking\App\Models\Booking;

$booking = Booking::with('booking_meta')->find($bookingId);
foreach ($booking->booking_meta as $row) {
    // $row->meta_key, $row->value
}
```

For calendars and events, eager-load `metas()` and `event_metas()`:

```php
$calendar = \FluentBooking\App\Models\Calendar::with('metas')->find($calendarId);
$event    = \FluentBooking\App\Models\CalendarSlot::with('event_metas')->find($eventId);
```

## Plugin-Wide Settings

For settings that apply to the whole plugin (not a per-record), use the settings helpers instead of the meta API:

```php
use FluentBooking\App\Services\Helper;

$value = Helper::getGlobalSettings('default_timezone');
$features = Helper::getFeatures();
$adminSetting = Helper::getGlobalAdminSetting('some_admin_key');
```

These read from the `fluent_booking_settings` / `fluent_booking_admin_settings` options, not from `fcal_meta`.

## Performance Notes

- Reads inside loops trigger one query per call. Eager-load relationships when iterating.
- Booking metas are indexed by `booking_id`; per-booking lookups are fast.
- Avoid storing megabyte payloads in `value` — prefer a dedicated table when the column would store more than ~64KB regularly.
