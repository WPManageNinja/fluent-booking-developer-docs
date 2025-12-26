# Bookings & Scheduling Action Hooks

These hooks are triggered during the lifecycle of a booking, from initial scheduling to completion or cancellation.

## fluent_booking/after_booking_scheduled

Fires after a booking is successfully scheduled and saved to the database.

**Parameters:**
- `$booking` (object) - The booking model object.
- `$calendar_event` (object) - The associated calendar event object.

**Example Usage:**
```php
add_action('fluent_booking/after_booking_scheduled', function($booking, $calendar_event) {
    // Custom logic after a booking is scheduled
    $booking_id = $booking->id;
    $event_title = $calendar_event->title;
    
    // Example: Update external CRM or system
}, 10, 2);
```

**Location:** `app/Services/BookingService.php`

---

## fluent_booking/after_booking_rescheduled

Fires after a booking has been rescheduled to a new time.

**Parameters:**
- `$existingBooking` (object) - The updated booking object with the new schedule.
- `$previousBooking` (object) - A copy of the booking object before the reschedule.
- `$calendarEvent` (object) - The associated calendar event object.

**Example Usage:**
```php
add_action('fluent_booking/after_booking_rescheduled', function($existingBooking, $previousBooking, $calendarEvent) {
    // New start time
    $new_time = $existingBooking->start_time;
    // Old start time
    $old_time = $previousBooking->start_time;
}, 10, 3);
```

**Location:** `app/Hooks/Handlers/FrontEndHandler.php`

---

## fluent_booking/booking_schedule_cancelled

Fires when a booking schedule is cancelled by either the host or the attendee.

**Parameters:**
- `$booking` (object) - The booking model object.
- `$calendar_event` (object) - The associated calendar event object.

**Example Usage:**
```php
add_action('fluent_booking/booking_schedule_cancelled', function($booking, $calendar_event) {
    // Perform actions when a booking is cancelled
}, 10, 2);
```

**Location:** `app/Models/Booking.php`

---

## fluent_booking/booking_schedule_completed

Fires when a booking is marked as completed.

**Parameters:**
- `$booking` (object) - The booking model object.
- `$calendar_event` (object) - The associated calendar event object.

**Example Usage:**
```php
add_action('fluent_booking/booking_schedule_completed', function($booking, $calendar_event) {
    // Trigger follow-up actions
}, 10, 2);
```

**Location:** `app/Hooks/Handlers/GlobalNotificationHandler.php`

---

## fluent_booking/booking_schedule_rejected

Fires when a booking request is rejected (typically for bookings requiring host approval).

**Parameters:**
- `$booking` (object) - The booking model object.
- `$calendar_event` (object) - The associated calendar event object.

**Example Usage:**
```php
add_action('fluent_booking/booking_schedule_rejected', function($booking, $calendar_event) {
    // Handle rejected booking
}, 10, 2);
```

**Location:** `app/Hooks/Handlers/GlobalNotificationHandler.php`

---

## fluent_booking/booking_schedule_auto_cancelled

Fires when a booking is automatically cancelled by the system (e.g., due to payment failure or timeout).

**Parameters:**
- `$booking` (object) - The booking model object.
- `$calendar_event` (object) - The associated calendar event object.

**Example Usage:**
```php
add_action('fluent_booking/booking_schedule_auto_cancelled', function($booking, $calendar_event) {
    // Handle auto-cancellation
}, 10, 2);
```

**Location:** `app/Models/Booking.php`

---

## fluent_booking/before_creating_schedule

Fires before a booking schedule is created in the database.

**Parameters:**
- `$data` (array) - The data being used to create the schedule.
- `$calendar_event` (object) - The associated calendar event object.

**Example Usage:**
```php
add_action('fluent_booking/before_creating_schedule', function($data, $calendar_event) {
    // Modify or validate data before creation
}, 10, 2);
```

---

## fluent_booking/after_creating_schedule

Fires after a booking schedule has been created.

**Parameters:**
- `$schedule` (object) - The newly created schedule object.
- `$calendar_event` (object) - The associated calendar event object.

**Example Usage:**
```php
add_action('fluent_booking/after_creating_schedule', function($schedule, $calendar_event) {
    // Perform actions after schedule creation
}, 10, 2);
```

---

## fluent_booking/after_delete_booking

Fires after a booking is deleted from the database.

**Parameters:**
- `$booking_id` (int) - The ID of the deleted booking.

**Example Usage:**
```php
add_action('fluent_booking/after_delete_booking', function($booking_id) {
    // Cleanup external data associated with the booking
}, 10, 1);
```

**Location:** `app/Models/Booking.php`

---

## fluent_booking/log_booking_activity

Fires when an activity is logged for a booking.

**Parameters:**
- `$booking_id` (int) - The booking ID.
- `$activity_data` (array) - Data about the activity being logged.

**Example Usage:**
```php
add_action('fluent_booking/log_booking_activity', function($booking_id, $activity_data) {
    // Capture activity logs for external analysis
}, 10, 2);
```

---

## fluent_booking/log_booking_note

Fires when a internal note is added to a booking.

**Parameters:**
- `$booking_id` (int) - The booking ID.
- `$note_data` (array) - Data about the note being added.

**Example Usage:**
```php
add_action('fluent_booking/log_booking_note', function($booking_id, $note_data) {
    // Sync notes with external CRM
}, 10, 2);
```
