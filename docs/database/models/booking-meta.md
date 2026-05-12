---
title: BookingMeta Model
description: ORM reference for BookingMeta in FluentBooking.
---

# BookingMeta Model

Key/value metadata attached to bookings (booking field answers, location details, custom data). Columns: `booking_id`, `meta_key`, `value`.

## Class

- **Source:** `fluent-booking/app/Models/BookingMeta.php`
- **Table:** `fcal_booking_meta`
- **Primary key:** `id`
- **Extends:** `Model`

## Attributes

| Column | Type | Nullable | Default | Description |
| --- | --- | --- | --- | --- |
| `id` | `BIGINT UNSIGNED NOT NULL PRIMARY KEY` | Yes | `—` | Primary key for the row. |
| `booking_id` | `BIGINT` | Yes | `—` | Foreign key to a related record. |
| `meta_key` | `VARCHAR(192)` | No | `—` | Meta Key stored for this record. |
| `value` | `LONGTEXT` | Yes | `—` | Meta value (often JSON-encoded). |
| `created_at` | `TIMESTAMP` | Yes | `—` | Creation timestamp maintained by the ORM. |
| `updated_at` | `TIMESTAMP` | Yes | `—` | Update timestamp maintained by the ORM. |

## Relationships

| Method | Type | Target |
| --- | --- | --- |
| `booking()` | `belongsTo` | `Booking` |

## Public Methods (sample)

| Method | Signature |
| --- | --- |
| `setValueAttribute()` | `$value` |
| `getValueAttribute()` | `$value` |
| `booking()` | `—` |
