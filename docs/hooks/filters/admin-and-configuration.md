---
title: Admin & Configuration Filters
description: Filters affecting admin UI, menu items, dashboard widgets, and global defaults.
---

# Admin & Configuration Filters

Filters affecting admin UI, menu items, dashboard widgets, and global defaults.

23 unique filter hooks currently map to this category, across 25 call sites.

## Hook Inventory

| Hook | Edition | Call Sites | First Source |
| --- | --- | --- | --- |
| [`fluent_booking/admin_base_url`](#fluentbookingadminbaseurl) | Core | 1 | `fluent-booking/app/Services/Helper.php:689` |
| [`fluent_booking/admin_menu_items`](#fluentbookingadminmenuitems) | Core | 1 | `fluent-booking/app/Hooks/Handlers/AdminMenuHandler.php:149` |
| [`fluent_booking/admin_portal_vars`](#fluentbookingadminportalvars) | Core | 1 | `fluent-booking/app/Hooks/Handlers/AdminMenuHandler.php:153` |
| [`fluent_booking/admin_vars`](#fluentbookingadminvars) | Core | 1 | `fluent-booking/app/Hooks/Handlers/AdminMenuHandler.php:351` |
| [`fluent_booking/asset_listed_slugs`](#fluentbookingassetlistedslugs) | Core | 2 | `fluent-booking/app/Hooks/Handlers/AdminMenuHandler.php:208` |
| [`fluent_booking/backend_sanitized_values`](#fluentbookingbackendsanitizedvalues) | Core | 1 | `fluent-booking/app/Services/Helper.php:1245` |
| [`fluent_booking/dashboard_notices`](#fluentbookingdashboardnotices) | Core | 1 | `fluent-booking/app/Hooks/Handlers/AdminMenuHandler.php:394` |
| [`fluent_booking/dashboard_widgets`](#fluentbookingdashboardwidgets) | Core | 1 | `fluent-booking/app/Http/Controllers/ReportController.php:94` |
| [`fluent_booking/data_export_limit`](#fluentbookingdataexportlimit) | Core | 1 | `fluent-booking/app/Http/Controllers/SchedulesController.php:59` |
| [`fluent_booking/default_booking_filters`](#fluentbookingdefaultbookingfilters) | Core | 1 | `fluent-booking/app/Services/Helper.php:2267` |
| [`fluent_booking/default_coupon_data`](#fluentbookingdefaultcoupondata) | <span class="pro-badge">PRO</span> | 1 | `fluent-booking-pro/app/Modules/Coupon/CouponService.php:11` |
| [`fluent_booking/default_currency_settings`](#fluentbookingdefaultcurrencysettings) | Core | 1 | `fluent-booking/app/Services/CurrenciesHelper.php:13` |
| [`fluent_booking/default_email_notification_settings`](#fluentbookingdefaultemailnotificationsettings) | Core | 1 | `fluent-booking/app/Services/Helper.php:1741` |
| [`fluent_booking/default_paginations`](#fluentbookingdefaultpaginations) | Core | 1 | `fluent-booking/app/Services/Helper.php:2277` |
| [`fluent_booking/default_sms_notification_settings`](#fluentbookingdefaultsmsnotificationsettings) | <span class="pro-badge">PRO</span> | 1 | `fluent-booking-pro/app/Services/Integrations/Twilio/TwilioHelper.php:124` |
| [`fluent_booking/default_terms_and_conditions`](#fluentbookingdefaulttermsandconditions) | Core | 1 | `fluent-booking/app/Services/Helper.php:1730` |
| [`fluent_booking/editor_shortcodes_groups`](#fluentbookingeditorshortcodesgroups) | Core | 1 | `fluent-booking/app/Services/Helper.php:2074` |
| [`fluent_booking/general_settings`](#fluentbookinggeneralsettings) | Core | 1 | `fluent-booking/app/Http/Controllers/SettingsController.php:92` |
| [`fluent_booking/get_features`](#fluentbookinggetfeatures) | Core | 1 | `fluent-booking/app/Services/Helper.php:2402` |
| [`fluent_booking/get_general_integration_feed_`](#fluentbookinggetgeneralintegrationfeed) | <span class="pro-badge">PRO</span> | 1 | `fluent-booking-pro/app/Http/Controllers/IntegrationSettingsController.php:228` |
| [`fluent_booking/integrations_menu_items`](#fluentbookingintegrationsmenuitems) | <span class="pro-badge">PRO</span> | 1 | `fluent-booking-pro/app/Http/Controllers/IntegrationSettingsController.php:41` |
| [`fluent_booking/no_permission_message`](#fluentbookingnopermissionmessage) | <span class="pro-badge">PRO</span> | 2 | `fluent-booking-pro/app/Hooks/Handlers/FrontendRenderer.php:92` |
| [`fluent_cart/admin_base_url`](#fluentcartadminbaseurl) | Core | 1 | `fluent-booking/app/Services/Integrations/FluentCart/CustomerProfileService.php:69` |

<a id="fluentbookingadminbaseurl"></a>

## `fluent_booking/admin_base_url`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Services/Helper.php:689`

**Example**

```php
add_filter('fluent_booking/admin_base_url', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingadminmenuitems"></a>

## `fluent_booking/admin_menu_items`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Hooks/Handlers/AdminMenuHandler.php:149`

**Example**

```php
add_filter('fluent_booking/admin_menu_items', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingadminportalvars"></a>

## `fluent_booking/admin_portal_vars`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Hooks/Handlers/AdminMenuHandler.php:153`

**Example**

```php
add_filter('fluent_booking/admin_portal_vars', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingadminvars"></a>

## `fluent_booking/admin_vars`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Hooks/Handlers/AdminMenuHandler.php:351`

**Example**

```php
add_filter('fluent_booking/admin_vars', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingassetlistedslugs"></a>

## `fluent_booking/asset_listed_slugs`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 2

**Source locations**

- `fluent-booking/app/Hooks/Handlers/AdminMenuHandler.php:208`
- `fluent-booking/app/Hooks/Handlers/AdminMenuHandler.php:249`

**Example**

```php
add_filter('fluent_booking/asset_listed_slugs', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingbackendsanitizedvalues"></a>

## `fluent_booking/backend_sanitized_values`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Services/Helper.php:1245`

**Example**

```php
add_filter('fluent_booking/backend_sanitized_values', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingdashboardnotices"></a>

## `fluent_booking/dashboard_notices`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Hooks/Handlers/AdminMenuHandler.php:394`

**Example**

```php
add_filter('fluent_booking/dashboard_notices', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingdashboardwidgets"></a>

## `fluent_booking/dashboard_widgets`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Http/Controllers/ReportController.php:94`

**Example**

```php
add_filter('fluent_booking/dashboard_widgets', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingdataexportlimit"></a>

## `fluent_booking/data_export_limit`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Http/Controllers/SchedulesController.php:59`

**Example**

```php
add_filter('fluent_booking/data_export_limit', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingdefaultbookingfilters"></a>

## `fluent_booking/default_booking_filters`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Services/Helper.php:2267`

**Example**

```php
add_filter('fluent_booking/default_booking_filters', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingdefaultcoupondata"></a>

## `fluent_booking/default_coupon_data`

- **Type:** filter
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1

**Source locations**

- `fluent-booking-pro/app/Modules/Coupon/CouponService.php:11`

**Example**

```php
add_filter('fluent_booking/default_coupon_data', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingdefaultcurrencysettings"></a>

## `fluent_booking/default_currency_settings`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Services/CurrenciesHelper.php:13`

**Example**

```php
add_filter('fluent_booking/default_currency_settings', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingdefaultemailnotificationsettings"></a>

## `fluent_booking/default_email_notification_settings`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Services/Helper.php:1741`

**Example**

```php
add_filter('fluent_booking/default_email_notification_settings', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingdefaultpaginations"></a>

## `fluent_booking/default_paginations`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Services/Helper.php:2277`

**Example**

```php
add_filter('fluent_booking/default_paginations', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingdefaultsmsnotificationsettings"></a>

## `fluent_booking/default_sms_notification_settings`

- **Type:** filter
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1

**Source locations**

- `fluent-booking-pro/app/Services/Integrations/Twilio/TwilioHelper.php:124`

**Example**

```php
add_filter('fluent_booking/default_sms_notification_settings', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingdefaulttermsandconditions"></a>

## `fluent_booking/default_terms_and_conditions`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Services/Helper.php:1730`

**Example**

```php
add_filter('fluent_booking/default_terms_and_conditions', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingeditorshortcodesgroups"></a>

## `fluent_booking/editor_shortcodes_groups`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Services/Helper.php:2074`

**Example**

```php
add_filter('fluent_booking/editor_shortcodes_groups', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookinggeneralsettings"></a>

## `fluent_booking/general_settings`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Http/Controllers/SettingsController.php:92`

**Example**

```php
add_filter('fluent_booking/general_settings', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookinggetfeatures"></a>

## `fluent_booking/get_features`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Services/Helper.php:2402`

**Example**

```php
add_filter('fluent_booking/get_features', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookinggetgeneralintegrationfeed"></a>

## `fluent_booking/get_general_integration_feed_`

- **Type:** filter
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1

**Source locations**

- `fluent-booking-pro/app/Http/Controllers/IntegrationSettingsController.php:228`

**Example**

```php
add_filter('fluent_booking/get_general_integration_feed_', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingintegrationsmenuitems"></a>

## `fluent_booking/integrations_menu_items`

- **Type:** filter
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1

**Source locations**

- `fluent-booking-pro/app/Http/Controllers/IntegrationSettingsController.php:41`

**Example**

```php
add_filter('fluent_booking/integrations_menu_items', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingnopermissionmessage"></a>

## `fluent_booking/no_permission_message`

- **Type:** filter
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 2

**Source locations**

- `fluent-booking-pro/app/Hooks/Handlers/FrontendRenderer.php:92`
- `fluent-booking-pro/app/Hooks/Handlers/FrontendRenderer.php:123`

**Example**

```php
add_filter('fluent_booking/no_permission_message', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentcartadminbaseurl"></a>

## `fluent_cart/admin_base_url`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Services/Integrations/FluentCart/CustomerProfileService.php:69`

**Example**

```php
add_filter('fluent_cart/admin_base_url', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```
