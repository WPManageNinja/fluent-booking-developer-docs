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
