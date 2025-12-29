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
- `$booked_events` (array) - List of booked events representing busy times.
- `$event` (object) - The calendar event being booked.

**Return:** (array) Modified list of busy events.
