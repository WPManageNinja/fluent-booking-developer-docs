# Admin & Settings Action Hooks

These hooks are triggered during administrative tasks and plugin lifecycle events.

## fluent_booking/admin_app_rendering

Fires when the main Fluent Booking admin application is about to render.

**Example Usage:**
```php
add_action('fluent_booking/admin_app_rendering', function() {
    // Perform checks or setup before the admin dashboard loads
});
```

---

## fluent_booking/loaded

Fires after the Fluent Booking plugin has been fully loaded.

**Parameters:**
- `$app` (object) - The FluentBooking application instance.

**Example Usage:**
```php
add_action('fluent_booking/loaded', function($app) {
    // Plugin-specific initialization logic
}, 10, 1);
```

**Location:** `boot/app.php`

---

## fluent_booking/after_update_advanced_settings

Fires after the advanced global settings are updated. <Badge type="tip" text="Pro" />

**Parameters:**
- `$event` (object) - The calendar event/slot object whose advanced settings were updated.

**Example Usage:**
```php
add_action('fluent_booking/after_update_advanced_settings', function($event) {
    // React to advanced settings changes
    $event_id = $event->id;
}, 10, 1);
```

**Location:** `fluent-booking-pro/app/Http/Controllers/CalendarController.php`

---

## fluent_booking/saving_addons

Fires when addon modules are being enabled or disabled.

**Parameters:**
- `$settings` (array) - The new addon settings being saved.
- `$prefSettings` (array) - The previous addon settings before the update.

**Example Usage:**
```php
add_action('fluent_booking/saving_addons', function($settings, $prefSettings) {
    // Custom logic when addons are updated
}, 10, 2);
```

**Location:** `app/Http/Controllers/SettingsController.php`
