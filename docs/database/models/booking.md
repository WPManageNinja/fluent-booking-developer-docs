---
title: Booking Model
description: ORM reference for Booking in FluentBooking.
---

# Booking Model

Represents an individual booking (appointment) created when an attendee schedules time on a calendar.

## Class

- **Source:** `fluent-booking/app/Models/Booking.php`
- **Table:** `fcal_bookings`
- **Primary key:** `id`
- **Extends:** `Model`

## Attributes

| Column | Type | Nullable | Default | Description |
| --- | --- | --- | --- | --- |
| `id` | `BIGINT(20) UNSIGNED NOT NULL PRIMARY KEY` | Yes | `—` | Primary key for the row. |
| `hash` | `VARCHAR(192)` | Yes | `—` | Random hash used as a public, non-enumerable booking identifier. |
| `calendar_id` | `BIGINT(20) UNSIGNED` | No | `—` | Foreign key to `fcal_calendars`. |
| `event_id` | `BIGINT(20) UNSIGNED` | No | `—` | Foreign key to `fcal_calendar_events` (the CalendarSlot model). |
| `group_id` | `BIGINT(20) UNSIGNED` | Yes | `—` | Shared group ID for bookings created together (group / collective). |
| `fcrm_id` | `BIGINT(20) UNSIGNED` | Yes | `—` | Optional FluentCRM contact ID for the booker. |
| `parent_id` | `BIGINT(20) UNSIGNED` | Yes | `—` | Parent row used for rescheduled or grouped bookings. |
| `host_user_id` | `BIGINT(20) UNSIGNED` | Yes | `—` | WordPress user ID of the host that owns the booking. |
| `person_user_id` | `BIGINT(20) UNSIGNED` | Yes | `—` | WordPress user ID of the attendee, if they were logged in. |
| `person_contact_id` | `BIGINT(20) UNSIGNED` | Yes | `—` | FluentCRM contact ID for the attendee, when available. |
| `person_time_zone` | `VARCHAR(100)` | Yes | `—` | IANA timezone of the attendee at the time of booking. |
| `start_time` | `TIMESTAMP` | Yes | `—` | Booking start time in UTC. |
| `end_time` | `TIMESTAMP` | Yes | `—` | Booking end time in UTC. |
| `slot_minutes` | `INT(11) UNSIGNED` | No | `—` | Length of the booked slot in minutes. |
| `first_name` | `VARCHAR(192)` | Yes | `—` | Attendee first name. |
| `last_name` | `VARCHAR(192)` | Yes | `—` | Attendee last name. |
| `email` | `VARCHAR(192)` | Yes | `—` | Attendee email address. |
| `message` | `TEXT` | Yes | `—` | Free-form message submitted by the attendee. |
| `internal_note` | `TEXT` | Yes | `—` | Internal note visible only to hosts and admins. |
| `phone` | `VARCHAR(100)` | Yes | `—` | Attendee phone number (when collected). |
| `country` | `VARCHAR(100)` | Yes | `—` | Attendee country code (when collected). |
| `ip_address` | `VARCHAR(192)` | Yes | `—` | IP address recorded when the booking was created. |
| `browser` | `VARCHAR(192)` | Yes | `—` | Browser detected when the booking was created. |
| `device` | `VARCHAR(192)` | Yes | `—` | Device detected when the booking was created. |
| `other_info` | `LONGTEXT` | Yes | `—` | Serialized custom-field answers and miscellaneous attendee data. |
| `location_details` | `LONGTEXT` | Yes | `—` | Serialized location data (Zoom link, address, custom location). |
| `cancelled_by` | `BIGINT(20) UNSIGNED` | Yes | `—` | User ID of the person who cancelled the booking, if any. |
| `status` | `VARCHAR(20)` | No | `scheduled` | Lifecycle status (`scheduled`, `cancelled`, `completed`, `rejected`, `pending`). |
| `source` | `VARCHAR(20)` | No | `web` | How the booking was created (`web`, `api`, etc.). |
| `booking_type` | `VARCHAR(20)` | No | `scheduling` | Internal booking subtype. |
| `event_type` | `VARCHAR(20)` | No | `single` | `single` or `group` event. |
| `payment_status` | `VARCHAR(20)` | Yes | `—` | Payment lifecycle status (`pending`, `paid`, `refunded`). |
| `payment_method` | `VARCHAR(20)` | Yes | `—` | Selected payment method slug. |
| `source_url` | `TEXT` | Yes | `—` | Referring URL where the booking originated. |
| `source_id` | `BIGINT(20) UNSIGNED` | Yes | `—` | Generic foreign key for the source record (form ID, etc.). |
| `utm_source` | `VARCHAR(192)` | Yes | `` | Marketing UTM source value. |
| `utm_medium` | `VARCHAR(192)` | Yes | `` | Marketing UTM medium value. |
| `utm_campaign` | `VARCHAR(192)` | Yes | `` | Marketing UTM campaign value. |
| `utm_term` | `VARCHAR(192)` | Yes | `` | Marketing UTM term value. |
| `utm_content` | `VARCHAR(192)` | Yes | `` | Marketing UTM content value. |
| `created_at` | `TIMESTAMP` | Yes | `—` | Creation timestamp maintained by the ORM. |
| `updated_at` | `TIMESTAMP` | Yes | `—` | Update timestamp maintained by the ORM. |

## Relationships

| Method | Type | Target |
| --- | --- | --- |
| `calendar()` | `belongsTo` | `Calendar` |
| `slot()` | `belongsTo` | `CalendarSlot` |
| `calendar_event()` | `belongsTo` | `CalendarSlot` |
| `booking_meta()` | `hasMany` | `BookingMeta` |
| `booking_activities()` | `hasMany` | `BookingActivity` |
| `user()` | `belongsTo` | `User` |
| `hosts()` | `belongsToMany` | `$class` |
| `payment_order()` | `hasOne` | `Order` |

## Query Scopes

| Scope | Parameters |
| --- | --- |
| `Upcoming` | `$query` |
| `Past` | `$query` |
| `ApplyDateRangeFilter` | `$query, $range` |
| `ApplyComputedStatus` | `$query, $status` |
| `ApplyBookingOrderByStatus` | `$query, $status` |
| `SearchBy` | `$query, $search` |

## Public Methods (sample)

| Method | Signature |
| --- | --- |
| `calendar()` | `—` |
| `slot()` | `—` |
| `calendar_event()` | `—` |
| `booking_meta()` | `—` |
| `booking_activities()` | `—` |
| `user()` | `—` |
| `assignNextGroupId()` | `—` |
| `getCustomFormData()` | `$isFormatted = true, $isPublic = false` |
| `getHostTotalBooking()` | `$eventId, $hostIds, $ranges` |
| `getAdditionalGuests()` | `$isHtml = false` |
| `getTotalGuestCount()` | `—` |
| `getHostEmails()` | `$excludeHostId = null` |
| `hosts()` | `—` |
| `getHostIds()` | `—` |
| `getFullBookingDateTimeText()` | `$timeZone = 'UTC', $isHtml = false` |
| `getPreviousMeetingDateTimeText()` | `$timeZone = 'UTC'` |
| `getShortBookingDateTime()` | `$timeZone = 'UTC'` |
| `getPreviousMeetingTime()` | `$timeZone = 'UTC'` |
| `getAttendeeStartTime()` | `$format = 'Y-m-d H:i:s'` |
| `getAttendeeEndTime()` | `$format = 'Y-m-d H:i:s'` |
| `getOtherBookingTimes()` | `—` |
| `getAllBookingShortTimes()` | `$timeZone = 'UTC', $withTimeZone = false` |
| `getAllBookingFullTimes()` | `$timeZone = 'UTC', $withTimeZone = false` |
| `getHostAndGuestDetailsHtml()` | `—` |
| `getLocationDetailsHtml()` | `—` |
| `getLocationAsText()` | `—` |
| `getMessage()` | `—` |
| `setLocationDetailsAttribute()` | `$locationDetails` |
| `getLocationDetailsAttribute()` | `$locationDetails` |
| `setOtherInfoAttribute()` | `$otherInfo` |
