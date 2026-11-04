---
title: Permissions & Access Filters
description: Filters over permission sets, capability checks, team membership, and access messages.
---

# Permissions & Access Filters

Filters over permission sets, capability checks, team membership, and access messages.

9 unique filter hooks currently map to this category, across 13 call sites.

## Hook Inventory

| Hook | Edition | Call Sites | First Source |
| --- | --- | --- | --- |
| [`fluent_booking/can_manage_platform`](#fluentbookingcanmanageplatform) | Core + <span class="pro-badge">PRO</span> | 2 | `fluent-booking/app/Http/Policies/PlatformPolicy.php:34` |
| [`fluent_booking/has_all_calendar_access`](#fluentbookinghasallcalendaraccess) | Core | 1 | `fluent-booking/app/Services/PermissionManager.php:63` |
| [`fluent_booking/has_calendar_access`](#fluentbookinghascalendaraccess) | Core | 1 | `fluent-booking/app/Services/PermissionManager.php:177` |
| [`fluent_booking/is_super_user`](#fluentbookingissuperuser) | Core | 1 | `fluent-booking/app/Services/PermissionManager.php:46` |
| [`fluent_booking/menu_capability`](#fluentbookingmenucapability) | Core | 1 | `fluent-booking/app/Services/PermissionManager.php:373` |
| [`fluent_booking/no_permission_message`](#fluentbookingnopermissionmessage) | <span class="pro-badge">PRO</span> | 2 | `fluent-booking-pro/app/Hooks/Handlers/FrontendRenderer.php:96` |
| [`fluent_booking/pre_user_permissions`](#fluentbookingpreuserpermissions) | Core | 1 | `fluent-booking/app/Services/PermissionManager.php:251` |
| [`fluent_booking/team_member_user_ids`](#fluentbookingteammemberuserids) | Core + <span class="pro-badge">PRO</span> | 3 | `fluent-booking/app/Services/PermissionManager.php:168` |
| [`fluent_booking/user_permissions`](#fluentbookinguserpermissions) | Core | 1 | `fluent-booking/app/Services/PermissionManager.php:282` |

<a id="fluentbookingcanmanageplatform"></a>

## `fluent_booking/can_manage_platform`

- **Type:** filter
- **Edition:** Core + <span class="pro-badge">PRO</span>
- **Call sites:** 2

**Source locations**

- `fluent-booking/app/Http/Policies/PlatformPolicy.php:34`
- `fluent-booking-pro/app/Http/Policies/PlatformPolicy.php:26`

**Example**

```php
add_filter('fluent_booking/can_manage_platform', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookinghasallcalendaraccess"></a>

## `fluent_booking/has_all_calendar_access`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Services/PermissionManager.php:63`

**Example**

```php
add_filter('fluent_booking/has_all_calendar_access', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookinghascalendaraccess"></a>

## `fluent_booking/has_calendar_access`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Services/PermissionManager.php:177`

**Example**

```php
add_filter('fluent_booking/has_calendar_access', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingissuperuser"></a>

## `fluent_booking/is_super_user`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Services/PermissionManager.php:46`

**Example**

```php
add_filter('fluent_booking/is_super_user', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingmenucapability"></a>

## `fluent_booking/menu_capability`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Services/PermissionManager.php:373`

**Example**

```php
add_filter('fluent_booking/menu_capability', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingnopermissionmessage"></a>

## `fluent_booking/no_permission_message`

- **Type:** filter
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 2

**Source locations**

- `fluent-booking-pro/app/Hooks/Handlers/FrontendRenderer.php:96`
- `fluent-booking-pro/app/Hooks/Handlers/FrontendRenderer.php:131`

**Example**

```php
add_filter('fluent_booking/no_permission_message', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingpreuserpermissions"></a>

## `fluent_booking/pre_user_permissions`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Services/PermissionManager.php:251`

**Example**

```php
add_filter('fluent_booking/pre_user_permissions', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingteammemberuserids"></a>

## `fluent_booking/team_member_user_ids`

- **Type:** filter
- **Edition:** Core + <span class="pro-badge">PRO</span>
- **Call sites:** 3

**Source locations**

- `fluent-booking/app/Services/PermissionManager.php:168`
- `fluent-booking-pro/app/Http/Controllers/TeamController.php:28`
- `fluent-booking-pro/app/Services/TeamMembers.php:21`

**Example**

```php
add_filter('fluent_booking/team_member_user_ids', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookinguserpermissions"></a>

## `fluent_booking/user_permissions`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Services/PermissionManager.php:282`

**Example**

```php
add_filter('fluent_booking/user_permissions', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```
