# Availability & Slots Filter Hooks

These filters allow you to modify available time slots and scheduling rules.

## fluent_booking/available_slots_for_view

Filters the list of available time slots for a specific date and duration shown on the booking calendar.

**Parameters:**
- `$available_slots` (array) - Array of available time slot strings (e.g., '2025-01-01 10:00:00').
- `$calendar_event` (object) - The calendar event object.
- `$calendar` (object) - The calendar object.
- `$timezone` (string) - The requested timezone.
- `$duration` (int) - The slot duration in minutes.

**Return:** (array) Modified array of available slots.

**Example Usage:**
```php
add_filter('fluent_booking/available_slots_for_view', function($slots, $event, $calendar, $tz, $duration) {
    // Custom logic to hide slots on weekends
    return array_filter($slots, function($slot) {
        $day = date('N', strtotime($slot));
        return $day < 6; // Monday-Friday only
    });
}, 10, 5);
```

**Location:** `app/Http/Controllers/BookingController.php`

---

## fluent_booking/availability_schedules

Filters the list of availability schedules retrieved from the database.

**Parameters:**
- `$schedules` (array) - List of availability schedule objects.

**Return:** (array) Modified list of schedules.

---

## fluent_booking/availability_schedule_options

Filters the default configuration options when creating or updating an availability schedule.

**Parameters:**
- `$options` (array) - Default schedule options.

**Return:** (array) Modified options.

---

## fluent_booking/buffer_times_schema

Filters the available buffer time options (in minutes) for scheduling.

**Parameters:**
- `$buffer_times` (array) - List of buffer time options.

**Return:** (array) Modified buffer times.

---

## fluent_booking/booked_events

Filters the list of existing booked events that are used to check for conflicts.

**Parameters:**
- `$bookedEvents` (array) - List of booked events representing busy times.
- `$calendarSlot` (object) - The calendar event/slot being booked.
- `$toTimeZone` (string) - The target timezone for conversion.
- `$dateRange` (array) - The date range being checked.
- `$isDoingBooking` (bool) - Whether this is during an active booking (vs. just viewing slots).

**Return:** (array) Modified list of busy events.

**Location:** `app/Services/TimeSlotService.php`

---

## fluent_booking/local_booked_events

Filters the list of locally booked events (from the plugin's own database) used for conflict checking.

**Parameters:**
- `$bookedEvents` (array) - List of local booked events.
- `$calendarSlot` (object) - The calendar event/slot being booked.
- `$toTimeZone` (string) - The target timezone.
- `$dateRange` (array) - The date range being checked.
- `$isDoingBooking` (bool) - Whether this is during an active booking.

**Return:** (array) Modified list of booked events.

**Location:** `app/Services/TimeSlotService.php`

---

## fluent_booking/remote_booked_events

Filters the list of remote booked events (from connected calendars like Google/Outlook) used for conflict checking.

**Parameters:**
- `$remoteEvents` (array) - List of remote booked events (default: empty array).
- `$calendarSlot` (object) - The calendar event/slot being booked.
- `$toTimeZone` (string) - The target timezone.
- `$dateRange` (array) - The date range being checked.
- `$hostId` (int) - The host user ID.
- `$isDoingBooking` (bool) - Whether this is during an active booking.

**Return:** (array) Modified list of remote booked events.

**Location:** `app/Services/TimeSlotService.php`

---

## fluent_booking/meeting_durations_schema

Filters the available meeting duration options (in minutes).

**Parameters:**
- `$durations` (array) - Array of duration options, each with `value` and `label` keys.

**Return:** (array) Modified duration options.

**Location:** `app/Services/Helper.php`

---

## fluent_booking/meeting_multi_durations_schema

Filters the available multi-duration options when an event supports multiple duration choices.

**Parameters:**
- `$durations` (array) - Array of multi-duration options.

**Return:** (array) Modified duration options.

**Location:** `app/Services/Helper.php`

---

## fluent_booking/slot_intervals_schema

Filters the available slot interval options (time between slots).

**Parameters:**
- `$intervals` (array) - Array of interval options, each with `value` and `label` keys.

**Return:** (array) Modified interval options.

**Location:** `app/Services/Helper.php`

---

## fluent_booking/booking_status_changing_times_schema

Filters the available time options for automatic booking status changes (e.g., auto-cancel after X minutes).

**Parameters:**
- `$times` (array) - Array of time options.

**Return:** (array) Modified time options.

**Location:** `app/Services/Helper.php`

---

## fluent_booking/week_select_times_schema

Filters the time options available in the weekly availability time selector.

**Parameters:**
- `$times` (array) - Array of time options for the weekly schedule.

**Return:** (array) Modified time options.

**Location:** `app/Services/Helper.php`

---

## fluent_booking/override_select_times_schema

Filters the time options available in the date override time selector.

**Parameters:**
- `$times` (array) - Array of time options for date overrides.

**Return:** (array) Modified time options.

**Location:** `app/Services/Helper.php`

---

## fluent_booking/weekly_schedule_schema

Filters the default weekly schedule structure.

**Parameters:**
- `$schedule` (array) - The default weekly schedule configuration.

**Return:** (array) Modified schedule structure.

**Location:** `app/Services/Helper.php`

---

## fluent_booking/fallback_timezone

Filters the fallback timezone when a requested timezone is invalid or not recognized.

**Parameters:**
- `$fallbackTimezone` (string) - The fallback timezone string.
- `$requestedTimezone` (string) - The originally requested timezone.

**Return:** (string) Modified fallback timezone.

**Location:** `app/Services/DateTimeHelper.php`

---

## fluent_booking/i18n_date_time_config

Filters the internationalization configuration for date and time display.

**Parameters:**
- `$config` (array) - The i18n date/time configuration.

**Return:** (array) Modified configuration.

**Location:** `app/Services/DateTimeHelper.php`
