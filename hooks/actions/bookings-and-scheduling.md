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

---

## fluent_booking/before_booking

Fires before a booking record is created in the database.

**Parameters:**
- `$bookingData` (array) - The processed booking data about to be inserted.
- `$calendarSlot` (object) - The calendar event/slot object.

**Example Usage:**
```php
add_action('fluent_booking/before_booking', function($bookingData, $calendarSlot) {
    // Validate or modify booking data before insertion
    $email = $bookingData['email'];
}, 10, 2);
```

**Location:** `app/Services/BookingService.php`

---

## fluent_booking/pre_after_booking_{status}

Fires immediately after a booking status is set, before the main `after_booking_{status}` hook. This pre-hook is used for early actions such as remote calendar sync and location setup.

**Parameters:**
- `$booking` (object) - The booking model object.
- `$calendarSlot` (object) - The associated calendar event/slot object.
- `$bookingData` (array) - The raw booking data.

**Example Usage:**
```php
add_action('fluent_booking/pre_after_booking_scheduled', function($booking, $calendarSlot, $bookingData) {
    // Early actions before main booking hooks fire (e.g., remote calendar sync)
}, 10, 3);
```

> [!NOTE]
> This hook is dynamically generated from the pattern `fluent_booking/pre_after_booking_{status}`. It fires before the corresponding `fluent_booking/after_booking_{status}` hook.

**Location:** `app/Services/BookingService.php`, `app/Http/Controllers/SchedulesController.php`

---

## fluent_booking/after_booking_meta_update

Fires after booking meta data (custom fields) has been saved.

**Parameters:**
- `$booking` (object) - The booking model object.
- `$bookingData` (array) - The full booking data.
- `$customFieldsData` (array) - The custom form fields data.
- `$calendarSlot` (object) - The associated calendar event/slot object.

**Example Usage:**
```php
add_action('fluent_booking/after_booking_meta_update', function($booking, $bookingData, $customFieldsData, $calendarSlot) {
    // Sync custom field data with external systems
    $bookingId = $booking->id;
}, 10, 4);
```

**Location:** `app/Services/BookingService.php`

---

## fluent_booking/before_patch_booking_schedule

Fires before a booking schedule field is patched/updated.

**Parameters:**
- `$booking` (object) - The booking model object.
- `$data` (array) - The patch data containing `column` and `value`.

**Example Usage:**
```php
add_action('fluent_booking/before_patch_booking_schedule', function($booking, $data) {
    // Validate before patching a booking field
    $column = $data['column'];
    $value = $data['value'];
}, 10, 2);
```

**Location:** `app/Http/Controllers/SchedulesController.php`

---

## fluent_booking/after_patch_booking_schedule

Fires after a booking schedule field has been patched/updated.

**Parameters:**
- `$booking` (object) - The updated booking model object.
- `$oldBooking` (object) - A copy of the booking before the update.

**Example Usage:**
```php
add_action('fluent_booking/after_patch_booking_schedule', function($booking, $oldBooking) {
    // React to booking field changes
    $newStatus = $booking->status;
    $oldStatus = $oldBooking->status;
}, 10, 2);
```

**Location:** `app/Http/Controllers/SchedulesController.php`

---

## fluent_booking/after_patch_booking_{column}

Dynamic hook that fires after a specific booking column has been patched. The `{column}` is the name of the updated field (e.g., `status`, `start_time`).

**Parameters:**
- `$booking` (object) - The updated booking model object.
- `$calendarEvent` (object) - The associated calendar event object.
- `$oldValue` (mixed) - The previous value of the column before the update.

**Example Usage:**
```php
add_action('fluent_booking/after_patch_booking_status', function($booking, $calendarEvent, $oldValue) {
    // React to a specific booking status change
    $newStatus = $booking->status;
    $previousStatus = $oldValue;
}, 10, 3);
```

**Location:** `app/Http/Controllers/SchedulesController.php`

---

## fluent_booking/before_delete_booking

Fires before a booking is deleted from the database.

**Parameters:**
- `$booking` (object) - The booking model object about to be deleted.

**Example Usage:**
```php
add_action('fluent_booking/before_delete_booking', function($booking) {
    // Cleanup related data before deletion
    $bookingId = $booking->id;
}, 10, 1);
```

**Location:** `app/Http/Controllers/SchedulesController.php`, `app/Hooks/Handlers/CleanupHandlers/CalenderEventCleaner.php`

---

## fluent_booking/starting_scheduling_ajax

Fires at the beginning of the frontend scheduling AJAX request, before validation.

**Parameters:**
- `$postedData` (array) - The raw posted data from the scheduling form.

**Example Usage:**
```php
add_action('fluent_booking/starting_scheduling_ajax', function($postedData) {
    // Early validation or logging for scheduling requests
}, 10, 1);
```

**Location:** `app/Hooks/Handlers/FrontEndHandler.php`

---

## fluent_booking/schedules_query

Fires when the schedules list query is being built, allowing modification by reference.

**Parameters:**
- `&$query` (object) - The Eloquent query builder instance (passed by reference).

**Example Usage:**
```php
add_action('fluent_booking/schedules_query', function(&$query) {
    // Modify the schedules query (e.g., add custom filters)
    $query->where('status', 'scheduled');
});
```

> [!NOTE]
> This hook uses `do_action_ref_array`, so the query is passed by reference and can be modified directly.

**Location:** `app/Http/Controllers/SchedulesController.php`

---

## fluent_booking/booking_schedule

Fires when a single booking schedule is loaded for detail view, allowing modification by reference.

**Parameters:**
- `&$booking` (object) - The booking model object (passed by reference).

**Example Usage:**
```php
add_action('fluent_booking/booking_schedule', function(&$booking) {
    // Add custom data to the booking object
    $booking->custom_data = 'value';
});
```

> [!NOTE]
> This hook uses `do_action_ref_array`, so the booking is passed by reference and can be modified directly.

**Location:** `app/Http/Controllers/SchedulesController.php`

---

## fluent_booking/format_booking_schedule

Fires when a booking schedule is being formatted for display, allowing modification by reference.

**Parameters:**
- `&$booking` (object) - The booking model object (passed by reference).

**Example Usage:**
```php
add_action('fluent_booking/format_booking_schedule', function(&$booking) {
    // Add or modify formatted booking data
});
```

> [!NOTE]
> This hook uses `do_action_ref_array`, so the booking is passed by reference and can be modified directly.

**Location:** `app/Http/Controllers/SchedulesController.php`

---

## fluent_booking/bookings_query

Fires when the bookings list query is being built (used in the admin bookings list), allowing modification by reference.

**Parameters:**
- `&$bookingQuery` (object) - The Eloquent query builder instance (passed by reference).

**Example Usage:**
```php
add_action('fluent_booking/bookings_query', function(&$bookingQuery) {
    // Modify the bookings query (e.g., filter by custom criteria)
});
```

> [!NOTE]
> This hook uses `do_action_ref_array`, so the query is passed by reference and can be modified directly.

**Location:** `app/Http/Controllers/BookingController.php`

---

## fluent_booking/before_delete_order

Fires before an order is deleted during booking cleanup.

**Parameters:**
- `$order` (object) - The order object about to be deleted.
- `$booking` (object) - The associated booking model.

**Example Usage:**
```php
add_action('fluent_booking/before_delete_order', function($order, $booking) {
    // Cleanup related payment data before order deletion
    $orderId = $order->id;
}, 10, 2);
```

**Location:** `app/Hooks/Handlers/CleanupHandlers/BookingCleaner.php`
