# Calendars & Events Action Hooks

These hooks are triggered when managing calendars and their associated events/slots.

## fluent_booking/before_create_calendar

Fires before a new calendar is created.

**Parameters:**
- `$data` (array) - The data being used to create the calendar.
- `$controller` (object) - The CalendarController instance.

**Example Usage:**
```php
add_action('fluent_booking/before_create_calendar', function($data, $controller) {
    // Validate or modify data before calendar creation
}, 10, 2);
```

**Location:** `app/Http/Controllers/CalendarController.php`

---

## fluent_booking/after_create_calendar

Fires after a new calendar has been successfully created.

**Parameters:**
- `$calendar` (object) - The newly created calendar object.

**Example Usage:**
```php
add_action('fluent_booking/after_create_calendar', function($calendar) {
    // Perform actions after a calendar is created
}, 10, 1);
```

**Location:** `app/Http/Controllers/CalendarController.php`, `app/Services/CalendarService.php`

---

## fluent_booking/after_update_calendar

Fires after a calendar's details have been updated.

**Parameters:**
- `$calendar` (object) - The updated calendar object.
- `$data` (array) - The data used to update the calendar.

**Example Usage:**
```php
add_action('fluent_booking/after_update_calendar', function($calendar, $data) {
    // Sync updates with external systems
}, 10, 2);
```

**Location:** `app/Http/Controllers/CalendarController.php`

---

## fluent_booking/before_delete_calendar

Fires before a calendar is deleted.

**Parameters:**
- `$calendar` (object) - The calendar object being deleted.

**Example Usage:**
```php
add_action('fluent_booking/before_delete_calendar', function($calendar) {
    // Cleanup associated data before deletion
    $calendar_id = $calendar->id;
}, 10, 1);
```

**Location:** `app/Http/Controllers/CalendarController.php`

---

## fluent_booking/after_delete_calendar

Fires after a calendar has been deleted.

**Parameters:**
- `$id` (int) - The ID of the deleted calendar.

**Example Usage:**
```php
add_action('fluent_booking/after_delete_calendar', function($id) {
    // Log the deletion
}, 10, 1);
```

**Location:** `app/Http/Controllers/CalendarController.php`

---

## fluent_booking/before_create_event

Fires before a new event is created within a calendar.

**Parameters:**
- `$calendar` (object) - The calendar object where the event is being created.
- `$slotData` (array) - The data being used to create the event.

**Example Usage:**
```php
add_action('fluent_booking/before_create_event', function($calendar, $slotData) {
    // Modify event data before creation
}, 10, 2);
```

**Location:** `app/Http/Controllers/CalendarController.php`

---

## fluent_booking/after_create_event

Fires after a new event has been created.

**Parameters:**
- `$calendar` (object) - The calendar object associated with the event.
- `$createdSlot` (object) - The newly created event/slot object.

**Example Usage:**
```php
add_action('fluent_booking/after_create_event', function($calendar, $createdSlot) {
    // Custom logic after event creation
}, 10, 2);
```

**Location:** `app/Http/Controllers/CalendarController.php`

---

## fluent_booking/after_update_event_details

Fires after an event's details have been updated.

**Parameters:**
- `$event` (object) - The updated event/slot object.

**Example Usage:**
```php
add_action('fluent_booking/after_update_event_details', function($event) {
    // Handle event updates
    $event_id = $event->id;
    $calendar_id = $event->calendar_id;
}, 10, 1);
```

**Location:** `app/Http/Controllers/CalendarController.php`

---

## fluent_booking/before_delete_calendar_event

Fires before an event is deleted.

**Parameters:**
- `$calendarEvent` (object) - The calendar event/slot object being deleted.
- `$calendar` (object) - The calendar object the event belongs to.

**Example Usage:**
```php
add_action('fluent_booking/before_delete_calendar_event', function($calendarEvent, $calendar) {
    // Pre-deletion checks or cleanup
    $event_id = $calendarEvent->id;
}, 10, 2);
```

**Location:** `app/Http/Controllers/CalendarController.php`, `app/Hooks/Handlers/CleanupHandlers/CalenderCleaner.php`

---

## fluent_booking/after_delete_calendar_event

Fires after an event has been deleted.

**Parameters:**
- `$calendarEventId` (int) - The event ID (when deleted directly via the API).
- `$calendar` (object) - The calendar object the event belonged to.

**Example Usage:**
```php
add_action('fluent_booking/after_delete_calendar_event', function($calendarEventId, $calendar) {
    // Post-deletion logs
}, 10, 2);
```

**Location:** `app/Http/Controllers/CalendarController.php`, `app/Hooks/Handlers/CleanupHandlers/CalenderCleaner.php`

---

## fluent_booking/after_create_calendar_slot

Fires after a specific calendar slot is created.

**Parameters:**
- `$slot` (object) - The newly created slot object.
- `$calendar` (object) - The calendar object.

**Example Usage:**
```php
add_action('fluent_booking/after_create_calendar_slot', function($slot, $calendar) {
    // Custom slot creation logic
}, 10, 2);
```

**Location:** `app/Http/Controllers/CalendarController.php`

---

## fluent_booking/before_get_all_calendars

Fires before the list of all calendars is retrieved.

**Parameters:**
- `$request` (object) - The current request object.

**Example Usage:**
```php
add_action('fluent_booking/before_get_all_calendars', function($request) {
    // Perform checks or logging before calendar list is fetched
}, 10, 1);
```

**Location:** `app/Http/Controllers/CalendarController.php`

---

## fluent_booking/before_update_calendar

Fires before a calendar is updated, allowing modification by reference.

**Parameters:**
- `&$calendar` (object) - The calendar model object (passed by reference).
- `$data` (array) - The update data from the request.

**Example Usage:**
```php
add_action('fluent_booking/before_update_calendar', function(&$calendar, $data) {
    // Modify the calendar object before it is updated
});
```

> [!NOTE]
> This hook uses `do_action_ref_array`, so the calendar is passed by reference and can be modified directly.

**Location:** `app/Http/Controllers/CalendarController.php`

---

## fluent_booking/calendar

Fires when a calendar object is being processed for API response, allowing modification by reference.

**Parameters:**
- `&$calendar` (object) - The calendar model object (passed by reference).
- `$context` (string) - The context of the operation: `'lists'` when loading calendar lists, `'update'` after a calendar update.

**Example Usage:**
```php
add_action('fluent_booking/calendar', function(&$calendar, $context) {
    if ($context === 'lists') {
        // Add custom data when listing calendars
        $calendar->custom_field = 'value';
    }
});
```

> [!NOTE]
> This hook uses `do_action_ref_array`, so the calendar is passed by reference and can be modified directly.

**Location:** `app/Http/Controllers/CalendarController.php`

---

## fluent_booking/calendar_slot

Fires when a calendar slot/event is being processed for API response, allowing modification by reference.

**Parameters:**
- `&$slot` (object) - The calendar slot/event object (passed by reference).

**Example Usage:**
```php
add_action('fluent_booking/calendar_slot', function(&$slot) {
    // Add or modify slot data before API response
});
```

> [!NOTE]
> This hook uses `do_action_ref_array`, so the slot is passed by reference and can be modified directly.

**Location:** `app/Http/Controllers/CalendarController.php`

---

## fluent_booking/processed_event

Fires after a calendar event has been processed (locations resolved, etc.) for public display, allowing modification by reference.

**Parameters:**
- `&$calendarEvent` (object) - The processed calendar event object (passed by reference).

**Example Usage:**
```php
add_action('fluent_booking/processed_event', function(&$calendarEvent) {
    // Modify the event before it is displayed on the frontend
});
```

> [!NOTE]
> This hook uses `do_action_ref_array`, so the event is passed by reference and can be modified directly.

**Location:** `app/Services/CalendarEventService.php`
