---
title: Bookings & Scheduling Actions
description: Action hooks fired through the booking lifecycle — creation, confirmation, rescheduling, cancellation, and notes.
---

# Bookings & Scheduling Actions

Action hooks fired through the booking lifecycle — creation, confirmation, rescheduling, cancellation, and notes.

22 unique action hooks currently map to this category, across 127 call sites.

## Hook Inventory

| Hook | Edition | Call Sites | First Source |
| --- | --- | --- | --- |
| [`fluent_booking/after_booking_`](#fluentbookingafterbooking) | Core + <span class="pro-badge">PRO</span> | 7 | `fluent-booking/app/Http/Controllers/SchedulesController.php:340` |
| [`fluent_booking/after_booking_meta_update`](#fluentbookingafterbookingmetaupdate) | Core | 1 | `fluent-booking/app/Services/BookingService.php:295` |
| [`fluent_booking/after_booking_rescheduled`](#fluentbookingafterbookingrescheduled) | Core | 1 | `fluent-booking/app/Services/RescheduleService.php:110` |
| [`fluent_booking/after_booking_scheduled`](#fluentbookingafterbookingscheduled) | Core + <span class="pro-badge">PRO</span> | 5 | `fluent-booking/app/Services/Integrations/FluentCart/Bootstrap.php:515` |
| [`fluent_booking/after_delete_booking`](#fluentbookingafterdeletebooking) | Core | 3 | `fluent-booking/app/Hooks/Handlers/CleanupHandlers/CalenderCleaner.php:81` |
| [`fluent_booking/after_patch_booking_`](#fluentbookingafterpatchbooking) | Core | 2 | `fluent-booking/app/Http/Controllers/SchedulesController.php:345` |
| [`fluent_booking/after_patch_booking_schedule`](#fluentbookingafterpatchbookingschedule) | Core | 1 | `fluent-booking/app/Http/Controllers/SchedulesController.php:343` |
| [`fluent_booking/before_booking`](#fluentbookingbeforebooking) | Core | 1 | `fluent-booking/app/Services/BookingService.php:57` |
| [`fluent_booking/before_delete_booking`](#fluentbookingbeforedeletebooking) | Core | 3 | `fluent-booking/app/Hooks/Handlers/CleanupHandlers/CalenderCleaner.php:79` |
| [`fluent_booking/before_patch_booking_schedule`](#fluentbookingbeforepatchbookingschedule) | Core | 1 | `fluent-booking/app/Http/Controllers/SchedulesController.php:206` |
| [`fluent_booking/booking_schedule`](#fluentbookingbookingschedule) | Core | 1 | `fluent-booking/app/Http/Controllers/SchedulesController.php:364` |
| [`fluent_booking/booking_schedule_`](#fluentbookingbookingschedule) | Core | 3 | `fluent-booking/app/Http/Controllers/SchedulesController.php:334` |
| [`fluent_booking/booking_schedule_auto_cancelled`](#fluentbookingbookingscheduleautocancelled) | Core | 2 | `fluent-booking/app/Hooks/Scheduler/FiveMinuteScheduler.php:80` |
| [`fluent_booking/booking_schedule_cancelled`](#fluentbookingbookingschedulecancelled) | Core | 2 | `fluent-booking/app/Models/Booking.php:745` |
| [`fluent_booking/booking_schedule_completed`](#fluentbookingbookingschedulecompleted) | Core | 1 | `fluent-booking/app/Hooks/Scheduler/FiveMinuteScheduler.php:48` |
| [`fluent_booking/booking_schedule_rejected`](#fluentbookingbookingschedulerejected) | Core | 1 | `fluent-booking/app/Models/Booking.php:781` |
| [`fluent_booking/log_booking_activity`](#fluentbookinglogbookingactivity) | Core + <span class="pro-badge">PRO</span> | 74 | `fluent-booking/app/Http/Controllers/SchedulesController.php:262` |
| [`fluent_booking/log_booking_note`](#fluentbookinglogbookingnote) | Core + <span class="pro-badge">PRO</span> | 10 | `fluent-booking/app/Http/Controllers/IntegrationManagerController.php:230` |
| [`fluent_booking/pre_after_booking_scheduled`](#fluentbookingpreafterbookingscheduled) | Core + <span class="pro-badge">PRO</span> | 5 | `fluent-booking/app/Services/Integrations/FluentCart/Bootstrap.php:511` |
| [`fluent_booking/saving_addons`](#fluentbookingsavingaddons) | Core | 1 | `fluent-booking/app/Http/Controllers/SettingsController.php:256` |
| [`fluent_booking/short_code_render`](#fluentbookingshortcoderender) | Core | 1 | `fluent-booking/app/Views/public/calendar.php:21` |
| [`fluent_booking/starting_scheduling_ajax`](#fluentbookingstartingschedulingajax) | Core | 1 | `fluent-booking/app/Hooks/Handlers/FrontEndHandler.php:598` |

<a id="fluentbookingafterbooking"></a>

## `fluent_booking/after_booking_`

- **Type:** action
- **Edition:** Core + <span class="pro-badge">PRO</span>
- **Call sites:** 7

**Source locations**

- `fluent-booking/app/Http/Controllers/SchedulesController.php:340`
- `fluent-booking/app/Modules/MCP/Support/BookingWriter.php:693`
- `fluent-booking/app/Services/BookingService.php:84`
- `fluent-booking/app/Services/Integrations/FluentCart/Bootstrap.php:384`
- `fluent-booking/app/Services/Integrations/FluentForms/FluentFormInit.php:669`
- `fluent-booking-pro/app/Services/Integrations/PaymentMethods/BasePaymentMethod.php:523`
- `fluent-booking-pro/app/Services/Integrations/Woo/Bootstrap.php:257`

**Example**

```php
add_action('fluent_booking/after_booking_', function (...$args) {
    // Your custom logic here.
}, 10, count($args ?? []));
```

<a id="fluentbookingafterbookingmetaupdate"></a>

## `fluent_booking/after_booking_meta_update`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Services/BookingService.php:295`

**Example**

```php
add_action('fluent_booking/after_booking_meta_update', function (...$args) {
    // Your custom logic here.
}, 10, count($args ?? []));
```

<a id="fluentbookingafterbookingrescheduled"></a>

## `fluent_booking/after_booking_rescheduled`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Services/RescheduleService.php:110`

**Example**

```php
add_action('fluent_booking/after_booking_rescheduled', function (...$args) {
    // Your custom logic here.
}, 10, count($args ?? []));
```

<a id="fluentbookingafterbookingscheduled"></a>

## `fluent_booking/after_booking_scheduled`

- **Type:** action
- **Edition:** Core + <span class="pro-badge">PRO</span>
- **Call sites:** 5

**Source locations**

- `fluent-booking/app/Services/Integrations/FluentCart/Bootstrap.php:515`
- `fluent-booking-pro/app/Services/Integrations/PaymentMethods/BasePaymentMethod.php:568`
- `fluent-booking-pro/app/Services/Integrations/PaymentMethods/Offline/Offline.php:84`
- `fluent-booking-pro/app/Services/Integrations/PaymentMethods/Offline/Offline.php:176`
- `fluent-booking-pro/app/Services/Integrations/Woo/Bootstrap.php:413`

**Example**

```php
add_action('fluent_booking/after_booking_scheduled', function (...$args) {
    // Your custom logic here.
}, 10, count($args ?? []));
```

<a id="fluentbookingafterdeletebooking"></a>

## `fluent_booking/after_delete_booking`

- **Type:** action
- **Edition:** Core
- **Call sites:** 3

**Source locations**

- `fluent-booking/app/Hooks/Handlers/CleanupHandlers/CalenderCleaner.php:81`
- `fluent-booking/app/Hooks/Handlers/CleanupHandlers/CalenderEventCleaner.php:33`
- `fluent-booking/app/Http/Controllers/SchedulesController.php:385`

**Example**

```php
add_action('fluent_booking/after_delete_booking', function (...$args) {
    // Your custom logic here.
}, 10, count($args ?? []));
```

<a id="fluentbookingafterpatchbooking"></a>

## `fluent_booking/after_patch_booking_`

- **Type:** action
- **Edition:** Core
- **Call sites:** 2

**Source locations**

- `fluent-booking/app/Http/Controllers/SchedulesController.php:345`
- `fluent-booking/app/Modules/MCP/Support/BookingWriter.php:894`

**Example**

```php
add_action('fluent_booking/after_patch_booking_', function (...$args) {
    // Your custom logic here.
}, 10, count($args ?? []));
```

<a id="fluentbookingafterpatchbookingschedule"></a>

## `fluent_booking/after_patch_booking_schedule`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Http/Controllers/SchedulesController.php:343`

**Example**

```php
add_action('fluent_booking/after_patch_booking_schedule', function (...$args) {
    // Your custom logic here.
}, 10, count($args ?? []));
```

<a id="fluentbookingbeforebooking"></a>

## `fluent_booking/before_booking`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Services/BookingService.php:57`

**Example**

```php
add_action('fluent_booking/before_booking', function (...$args) {
    // Your custom logic here.
}, 10, count($args ?? []));
```

<a id="fluentbookingbeforedeletebooking"></a>

## `fluent_booking/before_delete_booking`

- **Type:** action
- **Edition:** Core
- **Call sites:** 3

**Source locations**

- `fluent-booking/app/Hooks/Handlers/CleanupHandlers/CalenderCleaner.php:79`
- `fluent-booking/app/Hooks/Handlers/CleanupHandlers/CalenderEventCleaner.php:31`
- `fluent-booking/app/Http/Controllers/SchedulesController.php:381`

**Example**

```php
add_action('fluent_booking/before_delete_booking', function (...$args) {
    // Your custom logic here.
}, 10, count($args ?? []));
```

<a id="fluentbookingbeforepatchbookingschedule"></a>

## `fluent_booking/before_patch_booking_schedule`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Http/Controllers/SchedulesController.php:206`

**Example**

```php
add_action('fluent_booking/before_patch_booking_schedule', function (...$args) {
    // Your custom logic here.
}, 10, count($args ?? []));
```

<a id="fluentbookingbookingschedule"></a>

## `fluent_booking/booking_schedule`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Http/Controllers/SchedulesController.php:364`

**Example**

```php
add_action('fluent_booking/booking_schedule', function (...$args) {
    // Your custom logic here.
}, 10, count($args ?? []));
```

<a id="fluentbookingbookingschedule"></a>

## `fluent_booking/booking_schedule_`

- **Type:** action
- **Edition:** Core
- **Call sites:** 3

**Source locations**

- `fluent-booking/app/Http/Controllers/SchedulesController.php:334`
- `fluent-booking/app/Http/Controllers/SchedulesController.php:725`
- `fluent-booking/app/Modules/MCP/Support/BookingWriter.php:687`

**Example**

```php
add_action('fluent_booking/booking_schedule_', function (...$args) {
    // Your custom logic here.
}, 10, count($args ?? []));
```

<a id="fluentbookingbookingscheduleautocancelled"></a>

## `fluent_booking/booking_schedule_auto_cancelled`

- **Type:** action
- **Edition:** Core
- **Call sites:** 2

**Source locations**

- `fluent-booking/app/Hooks/Scheduler/FiveMinuteScheduler.php:80`
- `fluent-booking/app/Hooks/Scheduler/FiveMinuteScheduler.php:115`

**Example**

```php
add_action('fluent_booking/booking_schedule_auto_cancelled', function (...$args) {
    // Your custom logic here.
}, 10, count($args ?? []));
```

<a id="fluentbookingbookingschedulecancelled"></a>

## `fluent_booking/booking_schedule_cancelled`

- **Type:** action
- **Edition:** Core
- **Call sites:** 2

**Source locations**

- `fluent-booking/app/Models/Booking.php:745`
- `fluent-booking/app/Models/Booking.php:758`

**Example**

```php
add_action('fluent_booking/booking_schedule_cancelled', function (...$args) {
    // Your custom logic here.
}, 10, count($args ?? []));
```

<a id="fluentbookingbookingschedulecompleted"></a>

## `fluent_booking/booking_schedule_completed`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Hooks/Scheduler/FiveMinuteScheduler.php:48`

**Example**

```php
add_action('fluent_booking/booking_schedule_completed', function (...$args) {
    // Your custom logic here.
}, 10, count($args ?? []));
```

<a id="fluentbookingbookingschedulerejected"></a>

## `fluent_booking/booking_schedule_rejected`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Models/Booking.php:781`

**Example**

```php
add_action('fluent_booking/booking_schedule_rejected', function (...$args) {
    // Your custom logic here.
}, 10, count($args ?? []));
```

<a id="fluentbookinglogbookingactivity"></a>

## `fluent_booking/log_booking_activity`

- **Type:** action
- **Edition:** Core + <span class="pro-badge">PRO</span>
- **Call sites:** 74

**Source locations**

- `fluent-booking/app/Http/Controllers/SchedulesController.php:262`
- `fluent-booking/app/Http/Controllers/SchedulesController.php:267`
- `fluent-booking/app/Http/Controllers/SchedulesController.php:317`
- `fluent-booking/app/Http/Controllers/SchedulesController.php:321`
- `fluent-booking/app/Modules/MCP/Support/BookingWriter.php:672`
- `fluent-booking/app/Modules/MCP/Support/BookingWriter.php:1363`
- `fluent-booking/app/Services/Integrations/FluentCart/Bootstrap.php:197`
- `fluent-booking/app/Services/Integrations/FluentCart/Bootstrap.php:316`
- `fluent-booking/app/Services/Integrations/FluentCart/Bootstrap.php:331`
- `fluent-booking/app/Services/Integrations/FluentCart/Bootstrap.php:358`
- _… and 64 more_

**Example**

```php
add_action('fluent_booking/log_booking_activity', function (...$args) {
    // Your custom logic here.
}, 10, count($args ?? []));
```

<a id="fluentbookinglogbookingnote"></a>

## `fluent_booking/log_booking_note`

- **Type:** action
- **Edition:** Core + <span class="pro-badge">PRO</span>
- **Call sites:** 10

**Source locations**

- `fluent-booking/app/Http/Controllers/IntegrationManagerController.php:230`
- `fluent-booking/app/Services/EmailNotificationService.php:458`
- `fluent-booking-pro/app/Services/Integrations/Twilio/Bootstrap.php:281`
- `fluent-booking-pro/app/Services/Integrations/Twilio/Bootstrap.php:302`
- `fluent-booking-pro/app/Services/Integrations/Twilio/Bootstrap.php:342`
- `fluent-booking-pro/app/Services/Integrations/Twilio/Bootstrap.php:362`
- `fluent-booking-pro/app/Services/Integrations/Twilio/Bootstrap.php:437`
- `fluent-booking-pro/app/Services/Integrations/Twilio/Bootstrap.php:460`
- `fluent-booking-pro/app/Services/Integrations/Twilio/Bootstrap.php:528`
- `fluent-booking-pro/app/Services/Integrations/Twilio/Bootstrap.php:551`

**Example**

```php
add_action('fluent_booking/log_booking_note', function (...$args) {
    // Your custom logic here.
}, 10, count($args ?? []));
```

<a id="fluentbookingpreafterbookingscheduled"></a>

## `fluent_booking/pre_after_booking_scheduled`

- **Type:** action
- **Edition:** Core + <span class="pro-badge">PRO</span>
- **Call sites:** 5

**Source locations**

- `fluent-booking/app/Services/Integrations/FluentCart/Bootstrap.php:511`
- `fluent-booking-pro/app/Services/Integrations/PaymentMethods/BasePaymentMethod.php:564`
- `fluent-booking-pro/app/Services/Integrations/PaymentMethods/Offline/Offline.php:80`
- `fluent-booking-pro/app/Services/Integrations/PaymentMethods/Offline/Offline.php:172`
- `fluent-booking-pro/app/Services/Integrations/Woo/Bootstrap.php:409`

**Example**

```php
add_action('fluent_booking/pre_after_booking_scheduled', function (...$args) {
    // Your custom logic here.
}, 10, count($args ?? []));
```

<a id="fluentbookingsavingaddons"></a>

## `fluent_booking/saving_addons`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Http/Controllers/SettingsController.php:256`

**Example**

```php
add_action('fluent_booking/saving_addons', function (...$args) {
    // Your custom logic here.
}, 10, count($args ?? []));
```

<a id="fluentbookingshortcoderender"></a>

## `fluent_booking/short_code_render`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Views/public/calendar.php:21`

**Example**

```php
add_action('fluent_booking/short_code_render', function (...$args) {
    // Your custom logic here.
}, 10, count($args ?? []));
```

<a id="fluentbookingstartingschedulingajax"></a>

## `fluent_booking/starting_scheduling_ajax`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Hooks/Handlers/FrontEndHandler.php:598`

**Example**

```php
add_action('fluent_booking/starting_scheduling_ajax', function (...$args) {
    // Your custom logic here.
}, 10, count($args ?? []));
```
