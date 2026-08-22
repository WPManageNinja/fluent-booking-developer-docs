---
title: Miscellaneous Actions
description: Hooks that did not match a more specific action category.
---

# Miscellaneous Actions

Hooks that did not match a more specific action category.

11 unique action hooks currently map to this category, across 17 call sites.

## Hook Inventory

| Hook | Edition | Call Sites | First Source |
| --- | --- | --- | --- |
| [`fluent_booking/after_disconnect_remote_calendar`](#fluentbookingafterdisconnectremotecalendar) | <span class="pro-badge">PRO</span> | 1 | `fluent-booking-pro/app/Http/Controllers/IntegrationSettingsController.php:173` |
| [`fluent_booking/availability_schedules_query`](#fluentbookingavailabilityschedulesquery) | Core | 1 | `fluent-booking/app/Http/Controllers/AvailabilityController.php:38` |
| [`fluent_booking/bookings_query`](#fluentbookingbookingsquery) | Core | 1 | `fluent-booking/app/Http/Controllers/BookingController.php:363` |
| [`fluent_booking/calendar`](#fluentbookingcalendar) | Core | 2 | `fluent-booking/app/Http/Controllers/CalendarController.php:87` |
| [`fluent_booking/calendar_slot`](#fluentbookingcalendarslot) | Core | 2 | `fluent-booking/app/Http/Controllers/CalendarController.php:79` |
| [`fluent_booking/format_booking_schedule`](#fluentbookingformatbookingschedule) | Core | 1 | `fluent-booking/app/Http/Controllers/SchedulesController.php:732` |
| [`fluent_booking/landing_page_event`](#fluentbookinglandingpageevent) | Core | 1 | `fluent-booking/app/Services/LandingPage/LandingPageHandler.php:155` |
| [`fluent_booking/pre_after_booking_`](#fluentbookingpreafterbooking) | Core + <span class="pro-badge">PRO</span> | 5 | `fluent-booking/app/Http/Controllers/SchedulesController.php:321` |
| [`fluent_booking/processed_event`](#fluentbookingprocessedevent) | Core | 1 | `fluent-booking/app/Services/CalendarEventService.php:22` |
| [`fluent_booking/schedules_query`](#fluentbookingschedulesquery) | Core | 1 | `fluent-booking/app/Http/Controllers/SchedulesController.php:166` |
| [`fluent_booking/update_verification_failed`](#fluentbookingupdateverificationfailed) | <span class="pro-badge">PRO</span> | 1 | `fluent-booking-pro/app/Services/PluginManager/UpdateVerifier.php:443` |

<a id="fluentbookingafterdisconnectremotecalendar"></a>

## `fluent_booking/after_disconnect_remote_calendar`

- **Type:** action
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1

**Source locations**

- `fluent-booking-pro/app/Http/Controllers/IntegrationSettingsController.php:173`

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

- `fluent-booking/app/Http/Controllers/BookingController.php:363`

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

- `fluent-booking/app/Http/Controllers/CalendarController.php:87`
- `fluent-booking/app/Http/Controllers/CalendarController.php:395`

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

- `fluent-booking/app/Http/Controllers/CalendarController.php:79`
- `fluent-booking/app/Http/Controllers/CalendarController.php:314`

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

- `fluent-booking/app/Http/Controllers/SchedulesController.php:732`

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

<a id="fluentbookingpreafterbooking"></a>

## `fluent_booking/pre_after_booking_`

- **Type:** action
- **Edition:** Core + <span class="pro-badge">PRO</span>
- **Call sites:** 5

**Source locations**

- `fluent-booking/app/Http/Controllers/SchedulesController.php:321`
- `fluent-booking/app/Services/BookingService.php:72`
- `fluent-booking/app/Services/Integrations/FluentCart/Bootstrap.php:308`
- `fluent-booking-pro/app/Services/Integrations/PaymentMethods/BasePaymentMethod.php:417`
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
