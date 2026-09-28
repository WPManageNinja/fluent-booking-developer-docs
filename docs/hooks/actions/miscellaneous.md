---
title: Miscellaneous Actions
description: Hooks that did not match a more specific action category.
---

# Miscellaneous Actions

Hooks that did not match a more specific action category.

16 unique action hooks currently map to this category, across 24 call sites.

## Hook Inventory

| Hook | Edition | Call Sites | First Source |
| --- | --- | --- | --- |
| [`fluent_booking/after_disconnect_remote_calendar`](#fluentbookingafterdisconnectremotecalendar) | <span class="pro-badge">PRO</span> | 1 | `fluent-booking-pro/app/Http/Controllers/IntegrationSettingsController.php:213` |
| [`fluent_booking/availability_schedules_query`](#fluentbookingavailabilityschedulesquery) | Core | 1 | `fluent-booking/app/Http/Controllers/AvailabilityController.php:38` |
| [`fluent_booking/bookings_query`](#fluentbookingbookingsquery) | Core | 1 | `fluent-booking/app/Http/Controllers/BookingController.php:382` |
| [`fluent_booking/calendar`](#fluentbookingcalendar) | Core | 2 | `fluent-booking/app/Http/Controllers/CalendarController.php:88` |
| [`fluent_booking/calendar_slot`](#fluentbookingcalendarslot) | Core | 2 | `fluent-booking/app/Http/Controllers/CalendarController.php:80` |
| [`fluent_booking/format_booking_schedule`](#fluentbookingformatbookingschedule) | Core | 1 | `fluent-booking/app/Http/Controllers/SchedulesController.php:749` |
| [`fluent_booking/landing_page_event`](#fluentbookinglandingpageevent) | Core | 1 | `fluent-booking/app/Services/LandingPage/LandingPageHandler.php:155` |
| [`fluent_booking/mcp_ability_registration_failed`](#fluentbookingmcpabilityregistrationfailed) | Core | 1 | `fluent-booking/app/Modules/MCP/AbilitiesRegistrar.php:194` |
| [`fluent_booking/mcp_loaded`](#fluentbookingmcploaded) | Core | 1 | `fluent-booking/app/Modules/MCP/MCPInit.php:86` |
| [`fluent_booking/mcp_write_exception`](#fluentbookingmcpwriteexception) | Core | 1 | `fluent-booking/app/Modules/MCP/Support/BookingWriter.php:1141` |
| [`fluent_booking/pre_after_booking_`](#fluentbookingpreafterbooking) | Core + <span class="pro-badge">PRO</span> | 7 | `fluent-booking/app/Http/Controllers/SchedulesController.php:336` |
| [`fluent_booking/processed_event`](#fluentbookingprocessedevent) | Core | 1 | `fluent-booking/app/Services/CalendarEventService.php:22` |
| [`fluent_booking/schedules_query`](#fluentbookingschedulesquery) | Core | 1 | `fluent-booking/app/Http/Controllers/SchedulesController.php:166` |
| [`fluent_booking/update_verification_failed`](#fluentbookingupdateverificationfailed) | <span class="pro-badge">PRO</span> | 1 | `fluent-booking-pro/app/Services/PluginManager/UpdateVerifier.php:443` |
| [`fluent_toolkit/do_auto_install`](#fluenttoolkitdoautoinstall) | Core | 1 | `fluent-booking/app/Http/Controllers/McpController.php:110` |
| [`fluent_toolkit/toolkit_installing`](#fluenttoolkittoolkitinstalling) | <span class="pro-badge">PRO</span> | 1 | `fluent-booking-pro/app/Modules/MCP/ToolkitInstaller.php:33` |

<a id="fluentbookingafterdisconnectremotecalendar"></a>

## `fluent_booking/after_disconnect_remote_calendar`

- **Type:** action
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1

**Source locations**

- `fluent-booking-pro/app/Http/Controllers/IntegrationSettingsController.php:213`

**Example**

```php
add_action('fluent_booking/after_disconnect_remote_calendar', function (...$args) {
    // Your custom logic here.
}, 10, count($args ?? []));
```

<a id="fluentbookingavailabilityschedulesquery"></a>

## `fluent_booking/availability_schedules_query`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Http/Controllers/AvailabilityController.php:38`

**Example**

```php
add_action('fluent_booking/availability_schedules_query', function (...$args) {
    // Your custom logic here.
}, 10, count($args ?? []));
```

<a id="fluentbookingbookingsquery"></a>

## `fluent_booking/bookings_query`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Http/Controllers/BookingController.php:382`

**Example**

```php
add_action('fluent_booking/bookings_query', function (...$args) {
    // Your custom logic here.
}, 10, count($args ?? []));
```

<a id="fluentbookingcalendar"></a>

## `fluent_booking/calendar`

- **Type:** action
- **Edition:** Core
- **Call sites:** 2

**Source locations**

- `fluent-booking/app/Http/Controllers/CalendarController.php:88`
- `fluent-booking/app/Http/Controllers/CalendarController.php:482`

**Example**

```php
add_action('fluent_booking/calendar', function (...$args) {
    // Your custom logic here.
}, 10, count($args ?? []));
```

<a id="fluentbookingcalendarslot"></a>

## `fluent_booking/calendar_slot`

- **Type:** action
- **Edition:** Core
- **Call sites:** 2

**Source locations**

- `fluent-booking/app/Http/Controllers/CalendarController.php:80`
- `fluent-booking/app/Http/Controllers/CalendarController.php:385`

**Example**

```php
add_action('fluent_booking/calendar_slot', function (...$args) {
    // Your custom logic here.
}, 10, count($args ?? []));
```

<a id="fluentbookingformatbookingschedule"></a>

## `fluent_booking/format_booking_schedule`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Http/Controllers/SchedulesController.php:749`

**Example**

```php
add_action('fluent_booking/format_booking_schedule', function (...$args) {
    // Your custom logic here.
}, 10, count($args ?? []));
```

<a id="fluentbookinglandingpageevent"></a>

## `fluent_booking/landing_page_event`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Services/LandingPage/LandingPageHandler.php:155`

**Example**

```php
add_action('fluent_booking/landing_page_event', function (...$args) {
    // Your custom logic here.
}, 10, count($args ?? []));
```

<a id="fluentbookingmcpabilityregistrationfailed"></a>

## `fluent_booking/mcp_ability_registration_failed`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Modules/MCP/AbilitiesRegistrar.php:194`

**Example**

```php
add_action('fluent_booking/mcp_ability_registration_failed', function (...$args) {
    // Your custom logic here.
}, 10, count($args ?? []));
```

<a id="fluentbookingmcploaded"></a>

## `fluent_booking/mcp_loaded`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Modules/MCP/MCPInit.php:86`

**Example**

```php
add_action('fluent_booking/mcp_loaded', function (...$args) {
    // Your custom logic here.
}, 10, count($args ?? []));
```

<a id="fluentbookingmcpwriteexception"></a>

## `fluent_booking/mcp_write_exception`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Modules/MCP/Support/BookingWriter.php:1141`

**Example**

```php
add_action('fluent_booking/mcp_write_exception', function (...$args) {
    // Your custom logic here.
}, 10, count($args ?? []));
```

<a id="fluentbookingpreafterbooking"></a>

## `fluent_booking/pre_after_booking_`

- **Type:** action
- **Edition:** Core + <span class="pro-badge">PRO</span>
- **Call sites:** 7

**Source locations**

- `fluent-booking/app/Http/Controllers/SchedulesController.php:336`
- `fluent-booking/app/Modules/MCP/Support/BookingWriter.php:689`
- `fluent-booking/app/Services/BookingService.php:75`
- `fluent-booking/app/Services/Integrations/FluentCart/Bootstrap.php:382`
- `fluent-booking/app/Services/Integrations/FluentForms/FluentFormInit.php:665`
- `fluent-booking-pro/app/Services/Integrations/PaymentMethods/BasePaymentMethod.php:519`
- `fluent-booking-pro/app/Services/Integrations/Woo/Bootstrap.php:255`

**Example**

```php
add_action('fluent_booking/pre_after_booking_', function (...$args) {
    // Your custom logic here.
}, 10, count($args ?? []));
```

<a id="fluentbookingprocessedevent"></a>

## `fluent_booking/processed_event`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Services/CalendarEventService.php:22`

**Example**

```php
add_action('fluent_booking/processed_event', function (...$args) {
    // Your custom logic here.
}, 10, count($args ?? []));
```

<a id="fluentbookingschedulesquery"></a>

## `fluent_booking/schedules_query`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Http/Controllers/SchedulesController.php:166`

**Example**

```php
add_action('fluent_booking/schedules_query', function (...$args) {
    // Your custom logic here.
}, 10, count($args ?? []));
```

<a id="fluentbookingupdateverificationfailed"></a>

## `fluent_booking/update_verification_failed`

- **Type:** action
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1

**Source locations**

- `fluent-booking-pro/app/Services/PluginManager/UpdateVerifier.php:443`

**Example**

```php
add_action('fluent_booking/update_verification_failed', function (...$args) {
    // Your custom logic here.
}, 10, count($args ?? []));
```

<a id="fluenttoolkitdoautoinstall"></a>

## `fluent_toolkit/do_auto_install`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Http/Controllers/McpController.php:110`

**Example**

```php
add_action('fluent_toolkit/do_auto_install', function (...$args) {
    // Your custom logic here.
}, 10, count($args ?? []));
```

<a id="fluenttoolkittoolkitinstalling"></a>

## `fluent_toolkit/toolkit_installing`

- **Type:** action
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1

**Source locations**

- `fluent-booking-pro/app/Modules/MCP/ToolkitInstaller.php:33`

**Example**

```php
add_action('fluent_toolkit/toolkit_installing', function (...$args) {
    // Your custom logic here.
}, 10, count($args ?? []));
```
