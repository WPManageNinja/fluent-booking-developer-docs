---
title: CalendarSlot Model
description: ORM reference for CalendarSlot in FluentBooking.
---

# CalendarSlot Model

Bookable event type within a calendar (for example, a 15-minute consultation), with its configuration and availability rules. Internally referred to as a "slot" and stored in the `fcal_calendar_events` table.

## Class

- **Source:** `fluent-booking/app/Models/CalendarSlot.php`
- **Table:** `fcal_calendar_events`
- **Primary key:** `id`
- **Extends:** `Model`

## Attributes

| Column | Type | Nullable | Default | Description |
| --- | --- | --- | --- | --- |
| `id` | `BIGINT(20) UNSIGNED NOT NULL PRIMARY KEY` | Yes | `—` | Primary key for the row. |
| `hash` | `VARCHAR(192)` | Yes | `—` | Random hash used as a public, non-enumerable booking identifier. |
| `user_id` | `BIGINT(20) UNSIGNED` | No | `—` | WordPress user ID associated with the row. |
| `calendar_id` | `BIGINT(20) UNSIGNED` | No | `—` | Foreign key to `fcal_calendars`. |
| `duration` | `INT(11) UNSIGNED` | No | `—` | Event length in minutes. |
| `title` | `VARCHAR(192)` | No | `—` | Human-readable title stored for the record. |
| `slug` | `VARCHAR(192)` | No | `—` | Sanitized slug or public identifier. |
| `media_id` | `BIGINT(20) UNSIGNED` | Yes | `—` | Foreign key to a related record. |
| `description` | `LONGTEXT` | Yes | `—` | Description text stored for the record. |
| `settings` | `LONGTEXT` | Yes | `—` | Serialized settings payload. |
| `availability_type` | `VARCHAR(192)` | Yes | `custom` | Availability Type stored for this record. |
| `availability_id` | `BIGINT(20) UNSIGNED` | Yes | `—` | Foreign key to a related record. |
| `status` | `VARCHAR(20)` | No | `active` | Lifecycle status (`scheduled`, `cancelled`, `completed`, `rejected`, `pending`). |
| `type` | `VARCHAR(20)` | No | `free` | Subtype discriminator. |
| `color_schema` | `VARCHAR(100)` | No | `default` | Color Schema stored for this record. |
| `location_type` | `VARCHAR(100)` | No | `` | Location Type stored for this record. |
| `location_heading` | `TEXT` | Yes | `—` | Location Heading stored for this record. |
| `location_settings` | `LONGTEXT` | Yes | `—` | Location Settings stored for this record. |
| `event_type` | `VARCHAR(20)` | No | `single` | `single` or `group` event. |
| `is_display_spots` | `BOOLEAN` | No | `0` | Is Display Spots stored for this record. |
| `max_book_per_slot` | `INT(10) UNSIGNED` | No | `1` | Max Book Per Slot stored for this record. |
| `created_at` | `TIMESTAMP` | Yes | `—` | Creation timestamp maintained by the ORM. |
| `updated_at` | `TIMESTAMP` | Yes | `—` | Update timestamp maintained by the ORM. |

## Relationships

| Method | Type | Target |
| --- | --- | --- |
| `calendar()` | `belongsTo` | `Calendar` |
| `bookings()` | `hasMany` | `Booking` |
| `user()` | `belongsTo` | `User` |
| `event_metas()` | `hasMany` | `Meta` |

## Public Methods (sample)

| Method | Signature |
| --- | --- |
| `setSettingsAttribute()` | `$settings` |
| `getSettingsAttribute()` | `$settings` |
| `setLocationSettingsAttribute()` | `$locationSettings` |
| `getLocationSettingsAttribute()` | `$locationSettings` |
| `getShortDescriptionAttribute()` | `—` |
| `calendar()` | `—` |
| `bookings()` | `—` |
| `user()` | `—` |
| `event_metas()` | `—` |
| `isOneToOne()` | `—` |
| `isGroup()` | `—` |
| `isSingleEvent()` | `—` |
| `isGroupEvent()` | `—` |
| `isRoundRobin()` | `—` |
| `isCollective()` | `—` |
| `isTeamEvent()` | `—` |
| `isOneOffEvent()` | `—` |
| `isMultiHostEvent()` | `—` |
| `isMultiHostsEvent()` | `—` |
| `isMultiGuestEvent()` | `—` |
| `isRecurringEvent()` | `—` |
| `isProEvent()` | `—` |
| `isMultiBooking()` | `—` |
| `allowMultiBooking()` | `—` |
| `multiBookingLimit()` | `—` |
| `getAuthorProfile()` | `$public = true, $userID = null` |
| `getAuthorProfiles()` | `$public = true` |
| `getRecurringConfig()` | `—` |
| `isLocationFieldRequired()` | `—` |
| `isPhoneRequired()` | `—` |
