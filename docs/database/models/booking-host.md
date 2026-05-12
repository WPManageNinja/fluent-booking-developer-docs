---
title: BookingHost Model
description: ORM reference for BookingHost in FluentBooking.
---

# BookingHost Model

Pivot rows linking bookings to their host users in multi-host (team / collective / round-robin) scheduling.

## Class

- **Source:** `fluent-booking/app/Models/BookingHost.php`
- **Table:** `fcal_booking_hosts`
- **Primary key:** `id`
- **Extends:** `Model`

## Attributes

| Column | Type | Nullable | Default | Description |
| --- | --- | --- | --- | --- |
| `id` | `BIGINT(20) UNSIGNED NOT NULL PRIMARY KEY` | Yes | `—` | Primary key for the row. |
| `booking_id` | `BIGINT(20) UNSIGNED` | No | `—` | Foreign key to a related record. |
| `user_id` | `BIGINT(20) UNSIGNED` | No | `—` | WordPress user ID associated with the row. |
| `status` | `VARCHAR(20)` | No | `confirmed` | Lifecycle status (`scheduled`, `cancelled`, `completed`, `rejected`, `pending`). |
| `created_at` | `TIMESTAMP` | Yes | `—` | Creation timestamp maintained by the ORM. |
| `updated_at` | `TIMESTAMP` | Yes | `—` | Update timestamp maintained by the ORM. |

## Relationships

| Method | Type | Target |
| --- | --- | --- |
| `booking()` | `belongsTo` | `Booking` |

## Public Methods (sample)

| Method | Signature |
| --- | --- |
| `booking()` | `—` |
