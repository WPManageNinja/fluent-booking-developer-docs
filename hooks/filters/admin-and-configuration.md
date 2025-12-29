# Admin & Configuration Filter Hooks

These filters allow you to customize the admin dashboard and global plugin configuration.

## fluent_booking/admin_menu_items

Filters the list of menu items in the Fluent Booking admin sidebar.

**Parameters:**
- `$menu_items` (array) - List of menu items.

**Return:** (array) Modified menu items.

**Example Usage:**
```php
add_filter('fluent_booking/admin_menu_items', function($menu_items) {
    $menu_items[] = [
        'key' => 'custom_addon',
        'label' => 'Custom Addon',
        'path' => 'custom-addon-url'
    ];
    return $menu_items;
});
```

**Location:** `app/Hooks/Handlers/AdminMenuHandler.php`

---

## fluent_booking/admin_vars

Filters the JavaScript global variables injected into the Fluent Booking admin dashboard.

**Parameters:**
- `$vars` (array) - Array of admin variables.

**Return:** (array) Modified variables.

---

## fluent_booking/admin_portal_vars

Filters the variables passed to the standalone host portal.

**Parameters:**
- `$vars` (array) - Portal variables.

**Return:** (array) Modified variables.

---

## fluent_booking/dashboard_widgets

Filters the list of widgets displayed on the Fluent Booking overview dashboard.

**Parameters:**
- `$widgets` (array) - Default dashboard widgets.

**Return:** (array) Modified widgets.

---

## fluent_booking/dashboard_notices

Filters the informative notices shown at the top of the admin dashboard.

**Parameters:**
- `$notices` (array) - List of notices.

**Return:** (array) Modified notices.

---

## fluent_booking/custom_fields_types

Filters the available types of custom fields for the booking form.

**Parameters:**
- `$field_types` (array) - Default field types.

**Return:** (array) Modified field types.

---

## fluent_booking/available_date_formats

Filters the list of available date and time formats supported by the plugin.

**Parameters:**
- `$formats` (array) - List of supported formats.

**Return:** (array) Modified formats.
