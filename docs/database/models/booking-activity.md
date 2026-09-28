---
title: BookingActivity Model
description: ORM reference for BookingActivity in FluentBooking.
---

# BookingActivity Model

Activity stream entries tied to a booking — status changes, notes, and audit log lines.

## Class

- **Source:** `fluent-booking/app/Models/BookingActivity.php`
- **Table:** `fcal_booking_activity`
- **Primary key:** `id`
- **Extends:** `Model`

## Attributes

| Column | Type | Nullable | Default | Description |
| --- | --- | --- | --- | --- |
| `id` | `BIGINT UNSIGNED NOT NULL PRIMARY KEY` | Yes | `—` | Primary key for the row. |
| `booking_id` | `BIGINT UNSIGNED` | No | `—` | Foreign key to a related record. |
| `parent_id` | `BIGINT UNSIGNED` | Yes | `—` | Parent row used for rescheduled or grouped bookings. |
| `created_by` | `BIGINT UNSIGNED` | Yes | `—` | Created By stored for this record. |
| `status` | `VARCHAR(50)` | Yes | `open` | Lifecycle status (`scheduled`, `cancelled`, `completed`, `rejected`, `pending`). |
| `type` | `VARCHAR(50)` | Yes | `activity` | Subtype discriminator. |
| `title` | `VARCHAR(192)` | Yes | `—` | Human-readable title stored for the record. |
| `description` | `LONGTEXT` | Yes | `—` | Description text stored for the record. |
| `created_at` | `TIMESTAMP` | Yes | `—` | Creation timestamp maintained by the ORM. |
| `updated_at` | `TIMESTAMP` | Yes | `—` | Update timestamp maintained by the ORM. |

## Relationships

| Method | Type | Target |
| --- | --- | --- |
| `booking()` | `belongsTo` | `Booking` |

## Query Scopes

| Scope | Parameters |
| --- | --- |
| `Notes` | `$query` |

## Public Methods

| Method | Signature |
| --- | --- |
| `booking()` | `—` |
