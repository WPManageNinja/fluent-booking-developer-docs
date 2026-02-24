# Admin & Configuration Filter Hooks

These filters allow you to customize the admin dashboard, permissions, and global plugin configuration.

## fluent_booking/admin_menu_items

Filters the list of menu items in the Fluent Booking admin sidebar.

**Parameters:**
- `$menuItems` (array) - List of menu items.

**Return:** (array) Modified menu items.

**Example Usage:**
```php
add_filter('fluent_booking/admin_menu_items', function($menuItems) {
    $menuItems[] = [
        'key' => 'custom_addon',
        'label' => 'Custom Addon',
        'path' => 'custom-addon-url'
    ];
    return $menuItems;
});
```

**Location:** `app/Hooks/Handlers/AdminMenuHandler.php`

---

## fluent_booking/admin_vars

Filters the JavaScript global variables injected into the Fluent Booking admin dashboard.

**Parameters:**
- `$vars` (array) - Array of admin variables including `slug`, `nonce`, `rest`, `asset_url`, `event_colors`, `meeting_durations`, `timezones`, `features`, `has_pro`, `trans`, etc.

**Return:** (array) Modified variables.

**Location:** `app/Hooks/Handlers/AdminMenuHandler.php`

---

## fluent_booking/admin_portal_vars

Filters the variables passed to the standalone host portal.

**Parameters:**
- `$vars` (array) - Portal variables including `name`, `slug`, `menuItems`, `settings`, `baseUrl`, `logo`, `dark_logo`.

**Return:** (array) Modified variables.

**Location:** `app/Hooks/Handlers/AdminMenuHandler.php`

---

## fluent_booking/dashboard_widgets

Filters the list of widgets displayed on the Fluent Booking overview dashboard.

**Parameters:**
- `$widgets` (array) - Default dashboard widgets.

**Return:** (array) Modified widgets.

**Location:** `app/Http/Controllers/ReportController.php`

---

## fluent_booking/dashboard_notices

Filters the informative notices shown at the top of the admin dashboard.

**Parameters:**
- `$notices` (array) - List of notices (default: empty array).

**Return:** (array) Modified notices.

**Location:** `app/Hooks/Handlers/AdminMenuHandler.php`

---

## fluent_booking/custom_fields_types

Filters the available types of custom fields for the booking form.

**Parameters:**
- `$fieldTypes` (array) - Default field types, each with `value` and `label` keys (e.g., `email`, `text`, `textarea`, `number`, `select`, etc.).

**Return:** (array) Modified field types.

**Location:** `app/Services/Helper.php`

---

## fluent_booking/available_date_formats

Filters the list of available date and time formats supported by the plugin.

**Parameters:**
- `$formats` (array) - Associative array of date format strings to display labels (e.g., `'m/d/Y' => 'm/d/Y - (Ex: 05/20/2024)'`).

**Return:** (array) Modified formats.

**Location:** `app/Services/DateTimeHelper.php`

---

## fluent_booking/has_all_calendar_access

Filters whether the current user has full access to all calendars (admin-level access).

**Parameters:**
- `$hasAccess` (bool) - Whether the user has access (default: `current_user_can('manage_options')`).

**Return:** (bool) Modified access flag.

**Example Usage:**
```php
add_filter('fluent_booking/has_all_calendar_access', function($hasAccess) {
    // Grant full calendar access to editors
    if (current_user_can('edit_others_posts')) {
        return true;
    }
    return $hasAccess;
});
```

**Location:** `app/Services/PermissionManager.php`

---

## fluent_booking/has_calendar_access

Filters whether the current user has access to a specific calendar.

**Parameters:**
- `$hasAccess` (bool) - Whether the user has access.
- `$calendar` (object) - The calendar object.

**Return:** (bool) Modified access flag.

**Location:** `app/Services/PermissionManager.php`

---

## fluent_booking/verify_calendar_api

Filters the API-level permission check for calendar operations.

**Parameters:**
- `$hasPermission` (bool) - Whether the user has permission (default: `current_user_can('manage_options')`).
- `$request` (object) - The REST API request object.

**Return:** (bool) Modified permission flag.

**Location:** `app/Http/Policies/CalendarPolicy.php`

---

## fluent_booking/general_settings

Filters the general plugin settings retrieved from the database.

**Parameters:**
- `$settings` (array) - The general settings array.

**Return:** (array) Modified settings.

**Location:** `app/Http/Controllers/SettingsController.php`

---

## fluent_booking/admin_base_url

Filters the base URL for Fluent Booking admin pages.

**Parameters:**
- `$url` (string) - The admin URL (default: `admin_url('admin.php?page=fluent-booking#/' . $extension)`).
- `$extension` (string) - The URL path extension/suffix.

**Return:** (string) Modified URL.

**Location:** `app/Services/Helper.php`

---

## fluent_booking/slot_slug

Filters a generated slug value for calendar slots.

**Parameters:**
- `$default` (string) - The processed slug value.
- `$original` (string) - The original slug string.

**Return:** (string) Modified slug.

**Location:** `app/Services/Helper.php`

---

## fluent_booking/user_ip

Filters the detected IP address of the current user.

**Parameters:**
- `$ipAddress` (string) - The detected IP address.
- `$args` (array) - Additional arguments (default: empty array).

**Return:** (string) Modified IP address.

**Location:** `app/Services/Helper.php`

---

## fluent_booking/get_features

Filters the feature flags indicating which companion plugins are active.

**Parameters:**
- `$features` (array) - Associative array of boolean feature flags (e.g., `has_fluentcrm`, `has_fluentsmtp`, `has_fluentform`, `has_fluentboards`, `has_fluentcart`).

**Return:** (array) Modified feature flags.

**Location:** `app/Services/Helper.php`

---

## fluent_booking/global_modules

Filters the list of available global modules/integrations.

**Parameters:**
- `$modules` (array) - Array of module configurations with details like `title`, `description`, `logo`, `enabled` status.

**Return:** (array) Modified modules list.

**Location:** `app/Services/GlobalModules/GlobalModules.php`

---

## fluent_booking/upload_folder_name

Filters the name of the upload directory used by the plugin.

**Parameters:**
- `$folderName` (string) - The folder name (default: `'fluent-booking'`).

**Return:** (string) Modified folder name.

**Location:** `app/Services/Libs/FileSystem.php`

---

## fluent_booking/default_terms_and_conditions

Filters the default terms and conditions HTML content.

**Parameters:**
- `$termsAndConditions` (string) - The HTML string with terms and privacy policy links.

**Return:** (string) Modified terms and conditions.

**Location:** `app/Services/Helper.php`

---

## fluent_booking/default_email_notification_settings

Filters the default email notification template settings.

**Parameters:**
- `$settings` (array) - Array of notification settings keyed by type (e.g., `booking_conf_attendee`, `booking_conf_host`, `reminder_to_attendee`, etc.), each containing subject, body, and enabled status.

**Return:** (array) Modified notification settings.

**Location:** `app/Services/Helper.php`

---

## fluent_booking/verfied_email_senders

Filters the list of verified email sender addresses.

**Parameters:**
- `$verifiedSenders` (array) - Array of verified email senders.

**Return:** (array) Modified senders list.

::: info
Note: The filter name contains a typo (`verfied` instead of `verified`). This is intentional for backward compatibility.
:::

**Location:** `app/Services/Helper.php`

---

## fluent_booking/booking_receipt_landing_base_url

Filters the base URL for booking receipt/confirmation landing pages.

**Parameters:**
- `$baseUrl` (string) - The base URL (default: `site_url('/')`).

**Return:** (string) Modified base URL.

**Location:** `app/Services/Helper.php`

---

## fluent_booking/default_paginations

Filters the default pagination sizes for various admin list views.

**Parameters:**
- `$paginations` (array) - Default pagination values (e.g., `['bookings' => 10, 'calendars' => 10, 'coupons' => 10, 'availabilities' => 10]`).

**Return:** (array) Modified pagination values.

**Location:** `app/Services/Helper.php`

---

## fluent_booking/booking_per_page_options

Filters the available "per page" options for the booking list.

**Parameters:**
- `$options` (array) - Array of page size options (default: `[5, 10, 15, 20, 50, 100]`).

**Return:** (array) Modified options.

**Location:** `app/Hooks/Handlers/FrontEndHandler.php`

---

## fluent_booking/total_payment_widget

Filters the total payment widget data on the dashboard.

**Parameters:**
- `$totalPaymentWidget` (array) - The payment widget data (default: empty array).
- `$paymentWidget` (array) - The raw payment widget data.

**Return:** (array) Modified widget data.

**Location:** `app/Http/Controllers/ReportController.php`

---

## fluent_booking/no_permission_message <Badge type="tip" text="Pro" />

Filters the message displayed when a user lacks permission to view bookings.

**Parameters:**
- `$message` (string) - The no-permission message.

**Return:** (string) Modified message.

**Location:** `fluent-booking-pro/app/Hooks/Handlers/FrontendRenderer.php`
