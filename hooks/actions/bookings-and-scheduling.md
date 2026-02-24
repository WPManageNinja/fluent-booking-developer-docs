# Bookings & Scheduling Action Hooks

These hooks are triggered during the lifecycle of a booking, from initial scheduling to completion or cancellation.

## fluent_booking/after_booking_scheduled

Fires after a booking is successfully scheduled and saved to the database.

**Parameters:**
- `$booking` (object) - The booking model object.
- `$calendarEvent` (object) - The associated calendar event/slot object.
- `$bookingData` (array) - The raw booking data used to create the booking.

**Example Usage:**
```php
add_action('fluent_booking/after_booking_scheduled', function($booking, $calendarEvent, $bookingData) {
    // Custom logic after a booking is scheduled
    $bookingId = $booking->id;
    $eventTitle = $calendarEvent->title;

    // Example: Update external CRM or system
}, 10, 3);
```

**Location:** `app/Services/BookingService.php`

> [!NOTE]
> This hook is dynamically generated from the pattern `fluent_booking/after_booking_{status}`, where `{status}` is the booking status (e.g., `scheduled`, `pending`). The same parameters apply to all status variants.

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

Fires when a booking is marked as completed (automatically by the scheduler after the meeting end time passes).

**Parameters:**
- `$booking` (object) - The booking model object.
- `$calendar_event` (object) - The associated calendar event object.

**Example Usage:**
```php
add_action('fluent_booking/booking_schedule_completed', function($booking, $calendar_event) {
    // Trigger follow-up actions
}, 10, 2);
```

**Location:** `app/Hooks/Scheduler/FiveMinuteScheduler.php`

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

**Location:** `app/Models/Booking.php`

---

## fluent_booking/booking_schedule_auto_cancelled

Fires when a booking is automatically cancelled by the system (e.g., due to payment failure or timeout).

**Parameters:**
- `$booking` (object) - The booking model object.

**Example Usage:**
```php
add_action('fluent_booking/booking_schedule_auto_cancelled', function($booking) {
    // Handle auto-cancellation
    $calendar_event = $booking->calendar_event;
}, 10, 1);
```

**Location:** `app/Hooks/Scheduler/FiveMinuteScheduler.php`

---

## fluent_booking/before_creating_schedule

Fires before a booking schedule is created in the database.

**Parameters:**
- `$bookingData` (array) - The processed booking data being used to create the schedule.
- `$postedData` (array) - The raw posted data from the request.
- `$calendarEvent` (object) - The associated calendar event/slot object.

**Example Usage:**
```php
add_action('fluent_booking/before_creating_schedule', function($bookingData, $postedData, $calendarEvent) {
    // Validate data before creation
}, 10, 3);
```

**Location:** `app/Http/Controllers/BookingController.php`, `app/Hooks/Handlers/FrontEndHandler.php`

---

## fluent_booking/after_creating_schedule

Fires after a booking schedule has been created.

**Parameters:**
- `$booking` (object) - The newly created booking object.
- `$postedData` (array) - The raw posted data from the request.
- `$calendarEvent` (object) - The associated calendar event/slot object.

**Example Usage:**
```php
add_action('fluent_booking/after_creating_schedule', function($booking, $postedData, $calendarEvent) {
    // Perform actions after schedule creation
}, 10, 3);
```

**Location:** `app/Http/Controllers/BookingController.php`

---

## fluent_booking/after_delete_booking

Fires after a booking is deleted from the database.

**Parameters:**
- `$bookingId` (int) - The booking ID (when deleted via the Schedules API).

**Example Usage:**
```php
add_action('fluent_booking/after_delete_booking', function($bookingId) {
    // Cleanup external data associated with the booking
}, 10, 1);
```

**Location:** `app/Http/Controllers/SchedulesController.php`, `app/Hooks/Handlers/CleanupHandlers/CalenderEventCleaner.php`

---

## fluent_booking/log_booking_activity

Fires when an activity is logged for a booking.

**Parameters:**
- `$activity_data` (array) - Data about the activity being logged. Contains keys: `booking_id` (int), `type` (string), `status` (string), `title` (string), `description` (string).

**Example Usage:**
```php
add_action('fluent_booking/log_booking_activity', function($activity_data) {
    // Capture activity logs for external analysis
    $booking_id = $activity_data['booking_id'];
    $title = $activity_data['title'];
}, 10, 1);
```

---

## fluent_booking/log_booking_note

Fires when an internal note is added to a booking.

**Parameters:**
- `$note_data` (array) - Data about the note being added. Contains keys: `booking_id` (int), `title` (string), `description` (string), `type` (string), and optionally `status` (string).

**Example Usage:**
```php
add_action('fluent_booking/log_booking_note', function($note_data) {
    // Sync notes with external CRM
    $booking_id = $note_data['booking_id'];
    $title = $note_data['title'];
}, 10, 1);
```
