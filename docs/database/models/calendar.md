---
title: Calendar Model
description: ORM reference for Calendar in FluentBooking.
---

# Calendar Model

Top-level scheduling container that owns event types, availability, and bookings for a host or resource.

## Class

- **Source:** `fluent-booking/app/Models/Calendar.php`
- **Table:** `fcal_calendars`
- **Primary key:** `id`
- **Extends:** `Model`

## Attributes

| Column | Type | Nullable | Default | Description |
| --- | --- | --- | --- | --- |
| `id` | `BIGINT(20) UNSIGNED NOT NULL PRIMARY KEY` | Yes | `—` | Primary key for the row. |
| `hash` | `VARCHAR(192)` | Yes | `—` | Random hash used as a public, non-enumerable booking identifier. |
| `user_id` | `BIGINT(20) UNSIGNED` | No | `—` | WordPress user ID associated with the row. |
| `account_id` | `BIGINT(20) UNSIGNED` | Yes | `—` | Foreign key to a related record. |
| `parent_id` | `BIGINT(20) UNSIGNED` | Yes | `—` | Parent row used for rescheduled or grouped bookings. |
| `title` | `VARCHAR(192)` | No | `—` | Human-readable title stored for the record. |
| `slug` | `VARCHAR(192)` | No | `—` | Sanitized slug or public identifier. |
| `media_id` | `BIGINT(20) UNSIGNED` | Yes | `—` | Foreign key to a related record. |
| `description` | `LONGTEXT` | Yes | `—` | Description text stored for the record. |
| `settings` | `LONGTEXT` | Yes | `—` | Serialized settings payload. |
| `status` | `VARCHAR(20)` | No | `active` | Lifecycle status (`scheduled`, `cancelled`, `completed`, `rejected`, `pending`). |
| `type` | `VARCHAR(20)` | No | `simple` | Subtype discriminator. |
| `event_type` | `VARCHAR(20)` | No | `scheduling` | `single` or `group` event. |
| `account_type` | `VARCHAR(20)` | No | `free` | Account Type stored for this record. |
| `visibility` | `VARCHAR(20)` | No | `public` | Visibility stored for this record. |
| `author_timezone` | `VARCHAR(192)` | Yes | `UTC` | Author Timezone stored for this record. |
| `max_book_per_slot` | `INT(10) UNSIGNED` | No | `1` | Max Book Per Slot stored for this record. |
| `created_at` | `TIMESTAMP` | Yes | `—` | Creation timestamp maintained by the ORM. |
| `updated_at` | `TIMESTAMP` | Yes | `—` | Update timestamp maintained by the ORM. |

## Relationships

| Method | Type | Target |
| --- | --- | --- |
| `slots()` | `hasMany` | `CalendarSlot` |
| `events()` | `hasMany` | `CalendarSlot` |
| `user()` | `belongsTo` | `User` |
| `bookings()` | `hasMany` | `Booking` |
| `availabilities()` | `hasMany` | `Availability` |
| `metas()` | `hasMany` | `Meta` |

## Public Methods

| Method | Signature |
| --- | --- |
| `setSettingsAttribute()` | `$settings` |
| `getSettingsAttribute()` | `$settings` |
| `slots()` | `—` |
| `events()` | `—` |
| `user()` | `—` |
| `bookings()` | `—` |
| `availabilities()` | `—` |
| `metas()` | `—` |
| `isTeamCalendar()` | `—` |
| `isEventCalendar()` | `—` |
| `isHostCalendar()` | `—` |
| `updateEventOrder()` | `$eventId` |
| `getAuthorPhoto()` | `—` |
| `getAuthorProfile()` | `$public = true` |
| `getMeta()` | `$key, $default = null` |
| `updateMeta()` | `$key, $value` |
| `getLandingPageUrl()` | `$isForce = false` |
| `getDirty()` | `—` |
| `getAllHosts()` | `—` |
