# Calendars & Events Action Hooks

These hooks are triggered when managing calendars and their associated events/slots.

## fluent_booking/before_create_calendar

Fires before a new calendar is created.

**Parameters:**
- `$data` (array) - The data being used to create the calendar.

**Example Usage:**
```php
add_action('fluent_booking/before_create_calendar', function($data) {
    // Validate or modify data before calendar creation
}, 10, 1);
```

**Location:** `app/Http/Controllers/CalendarController.php`

---

## fluent_booking/after_create_calendar

Fires after a new calendar has been successfully created.

**Parameters:**
- `$calendar` (object) - The newly created calendar object.
- `$data` (array) - The data used to create the calendar.

**Example Usage:**
```php
add_action('fluent_booking/after_create_calendar', function($calendar, $data) {
    // Perform actions after a calendar is created
}, 10, 2);
```

**Location:** `app/Http/Controllers/CalendarController.php`

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
- `$id` (int) - The ID of the calendar being deleted.

**Example Usage:**
```php
add_action('fluent_booking/before_delete_calendar', function($id) {
    // Cleanup associated data before deletion
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
- `$data` (array) - The data being used to create the event.
- `$calendar` (object) - The calendar object where the event is being created.

**Example Usage:**
```php
add_action('fluent_booking/before_create_event', function($data, $calendar) {
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
- `$calendarSlot` (object) - The updated event/slot object.
- `$data` (array) - The data used to update the event.

**Example Usage:**
```php
add_action('fluent_booking/after_update_event_details', function($calendarSlot, $data) {
    // Handle event updates
}, 10, 2);
```

**Location:** `app/Http/Controllers/CalendarController.php`

---

## fluent_booking/before_delete_calendar_event

Fires before an event is deleted.

**Parameters:**
- `$id` (int) - The ID of the event being deleted.

**Example Usage:**
```php
add_action('fluent_booking/before_delete_calendar_event', function($id) {
    // Pre-deletion checks or cleanup
}, 10, 1);
```

---

## fluent_booking/after_delete_calendar_event

Fires after an event has been deleted.

**Parameters:**
- `$id` (int) - The ID of the deleted event.

**Example Usage:**
```php
add_action('fluent_booking/after_delete_calendar_event', function($id) {
    // Post-deletion logs
}, 10, 1);
```

---

## fluent_booking/after_create_calendar_slot

Fires after a specific calendar slot is created.

**Parameters:**
- `$calendar` (object) - The calendar object.
- `$createdSlot` (object) - The newly created slot object.

**Example Usage:**
```php
add_action('fluent_booking/after_create_calendar_slot', function($calendar, $createdSlot) {
    // Custom slot creation logic
}, 10, 2);
```
