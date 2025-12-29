# Availability Action Hooks

These hooks are triggered during the management of availability schedules.

## fluent_booking/availability_schedule_created

Fires after a new availability schedule is created.

**Parameters:**
- `$schedule` (object) - The newly created availability schedule object.
- `$data` (array) - The data used to create the schedule.

**Example Usage:**
```php
add_action('fluent_booking/availability_schedule_created', function($schedule, $data) {
    // Perform actions after a schedule is created
}, 10, 2);
```

**Location:** `app/Http/Controllers/AvailabilityController.php`

---

## fluent_booking/availability_schedule_cloned

Fires after an availability schedule has been cloned.

**Parameters:**
- `$new_schedule` (object) - The newly cloned schedule object.
- `$old_schedule` (object) - The original schedule object that was cloned.

**Example Usage:**
```php
add_action('fluent_booking/availability_schedule_cloned', function($new_schedule, $old_schedule) {
    // Logic for cloned schedules
}, 10, 2);
```

**Location:** `app/Http/Controllers/AvailabilityController.php`

---

## fluent_booking/avaibility_schedule_updated

Fires after an availability schedule is updated. 

> [!NOTE]
> Please note the spelling in the hook name: `avaibility_schedule_updated` (missing 'l').

**Parameters:**
- `$schedule` (object) - The updated availability schedule object.
- `$scheduleData` (array) - The new configuration data for the schedule.

**Example Usage:**
```php
add_action('fluent_booking/avaibility_schedule_updated', function($schedule, $scheduleData) {
    // Custom logic when schedule is updated
}, 10, 2);
```

**Location:** `app/Http/Controllers/AvailabilityController.php`

---

## fluent_booking/before_delete_availability_schedule

Fires before an availability schedule is deleted.

**Parameters:**
- `$id` (int) - The ID of the schedule being deleted.

**Example Usage:**
```php
add_action('fluent_booking/before_delete_availability_schedule', function($id) {
    // Pre-deletion checks
}, 10, 1);
```

**Location:** `app/Http/Controllers/AvailabilityController.php`

---

## fluent_booking/after_delete_availability_schedule

Fires after an availability schedule is deleted.

**Parameters:**
- `$id` (int) - The ID of the deleted schedule.

**Example Usage:**
```php
add_action('fluent_booking/after_delete_availability_schedule', function($id) {
    // Cleanup tasks after deletion
}, 10, 1);
```

**Location:** `app/Http/Controllers/AvailabilityController.php`

---

## fluent_booking/availability_schedules

Fires when availability schedules are being loaded or managed.

**Parameters:**
- `$schedules` (array) - Array of availability schedules.

**Example Usage:**
```php
add_action('fluent_booking/availability_schedules', function($schedules) {
    // Custom logic for availability schedules
}, 10, 1);
```
