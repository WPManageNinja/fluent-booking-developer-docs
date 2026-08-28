---
title: Admin & Settings Actions
description: Action hooks fired around admin app rendering, settings persistence, and configuration updates.
---

# Admin & Settings Actions

Action hooks fired around admin app rendering, settings persistence, and configuration updates.

5 unique action hooks currently map to this category, across 5 call sites.

## Hook Inventory

| Hook | Edition | Call Sites | First Source |
| --- | --- | --- | --- |
| [`action_scheduler_pre_theme_init`](#actionschedulerprethemeinit) | Core | 1 | `fluent-booking/boot/action_scheduler_loader.php:38` |
| [`fluent_booking/admin_app_rendering`](#fluentbookingadminapprendering) | Core | 1 | `fluent-booking/app/Hooks/Handlers/AdminMenuHandler.php:198` |
| [`fluent_booking/after_update_advanced_settings`](#fluentbookingafterupdateadvancedsettings) | <span class="pro-badge">PRO</span> | 1 | `fluent-booking-pro/app/Http/Controllers/CalendarController.php:167` |
| [`fluent_booking/loaded`](#fluentbookingloaded) | Core | 1 | `fluent-booking/boot/app.php:25` |
| [`fluent_booking/save_client_settings_`](#fluentbookingsaveclientsettings) | Core | 1 | `fluent-booking/app/Http/Controllers/IntegrationController.php:35` |

<a id="actionschedulerprethemeinit"></a>

## `action_scheduler_pre_theme_init`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/boot/action_scheduler_loader.php:38`

**Example**

```php
add_action('action_scheduler_pre_theme_init', function (...$args) {
    // Your custom logic here.
}, 10, count($args ?? []));
```

<a id="fluentbookingadminapprendering"></a>

## `fluent_booking/admin_app_rendering`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Hooks/Handlers/AdminMenuHandler.php:198`

**Example**

```php
add_action('fluent_booking/admin_app_rendering', function (...$args) {
    // Your custom logic here.
}, 10, count($args ?? []));
```

<a id="fluentbookingafterupdateadvancedsettings"></a>

## `fluent_booking/after_update_advanced_settings`

- **Type:** action
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1

**Source locations**

- `fluent-booking-pro/app/Http/Controllers/CalendarController.php:167`

**Example**

```php
add_action('fluent_booking/after_update_advanced_settings', function (...$args) {
    // Your custom logic here.
}, 10, count($args ?? []));
```

<a id="fluentbookingloaded"></a>

## `fluent_booking/loaded`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/boot/app.php:25`

**Example**

```php
add_action('fluent_booking/loaded', function (...$args) {
    // Your custom logic here.
}, 10, count($args ?? []));
```

<a id="fluentbookingsaveclientsettings"></a>

## `fluent_booking/save_client_settings_`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Http/Controllers/IntegrationController.php:35`

**Example**

```php
add_action('fluent_booking/save_client_settings_', function (...$args) {
    // Your custom logic here.
}, 10, count($args ?? []));
```
