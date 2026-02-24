# Availability Action Hooks

These hooks are triggered during the management of availability schedules.

## fluent_booking/availability_schedule_created

Fires after a new availability schedule is created.

**Parameters:**
- `$schedule` (object) - The newly created availability schedule object.

**Example Usage:**
```php
add_action('fluent_booking/availability_schedule_created', function($schedule) {
    // Perform actions after a schedule is created
    $title = $schedule->key;
    $settings = $schedule->value;
}, 10, 1);
```

**Location:** `app/Http/Controllers/AvailabilityController.php`

---

## fluent_booking/availability_schedule_cloned

Fires after an availability schedule has been cloned.

**Parameters:**
- `$clonedSchedule` (object) - The newly cloned schedule object.

**Example Usage:**
```php
add_action('fluent_booking/availability_schedule_cloned', function($clonedSchedule) {
    // Logic for cloned schedules
    $title = $clonedSchedule->key; // e.g., "Weekly Hours (Clone)"
}, 10, 1);
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
- `$schedule` (object) - The availability schedule object being deleted.
- `$calendar` (object|null) - The calendar object (when triggered during calendar cleanup). Not present when triggered via the Availability API directly.

**Example Usage:**
```php
add_action('fluent_booking/before_delete_availability_schedule', function($schedule, $calendar = null) {
    // Pre-deletion checks
    $schedule_id = $schedule->id;
}, 10, 2);
```

**Location:** `app/Http/Controllers/AvailabilityController.php`, `app/Hooks/Handlers/CleanupHandlers/CalenderCleaner.php`

---

## fluent_booking/after_delete_availability_schedule

Fires after an availability schedule is deleted.

**Parameters:**
- `$scheduleId` (int) - The schedule ID (when deleted via the Availability API).

**Example Usage:**
```php
add_action('fluent_booking/after_delete_availability_schedule', function($scheduleId) {
    // Cleanup tasks after deletion
}, 10, 1);
```

**Location:** `app/Http/Controllers/AvailabilityController.php`, `app/Hooks/Handlers/CleanupHandlers/CalenderCleaner.php`

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

---

## fluent_booking/availability_schedules_query

Fires when the availability schedules query is being built, allowing modification by reference.

**Parameters:**
- `&$query` (object) - The Eloquent query builder instance (passed by reference).

**Example Usage:**
```php
add_action('fluent_booking/availability_schedules_query', function(&$query) {
    // Modify the availability schedules query (e.g., add custom filters)
    $query->where('object_id', get_current_user_id());
});
```

> [!NOTE]
> This hook uses `do_action_ref_array`, so the query is passed by reference and can be modified directly.

**Location:** `app/Http/Controllers/AvailabilityController.php`
