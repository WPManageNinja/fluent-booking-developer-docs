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

**Example Usage:**
```php
add_action('fluent_booking/loaded', function() {
    // Plugin-specific initialization logic
});
```

---

## fluent_booking/after_update_advanced_settings

Fires after the advanced global settings are updated.

**Parameters:**
- `$settings` (array) - The new advanced settings values.

**Example Usage:**
```php
add_action('fluent_booking/after_update_advanced_settings', function($settings) {
    // React to global settings changes
}, 10, 1);
```

---

## fluent_booking/saving_addons

Fires when addon modules are being enabled or disabled.

**Parameters:**
- `$active_modules` (array) - List of currently active addon modules.

**Example Usage:**
```php
add_action('fluent_booking/saving_addons', function($active_modules) {
    // Custom logic when addons are updated
}, 10, 1);
```
