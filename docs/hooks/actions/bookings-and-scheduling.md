---
title: Bookings & Scheduling Actions
description: Action hooks fired through the booking lifecycle — creation, confirmation, rescheduling, cancellation, and notes.
---

# Bookings & Scheduling Actions

Action hooks fired through the booking lifecycle — creation, confirmation, rescheduling, cancellation, and notes.

22 unique action hooks currently map to this category, across 116 call sites.

## Hook Inventory

| Hook | Edition | Call Sites | First Source |
| --- | --- | --- | --- |
| [`fluent_booking/after_booking_`](#fluentbookingafterbooking) | Core + <span class="pro-badge">PRO</span> | 5 | `fluent-booking/app/Http/Controllers/SchedulesController.php:325` |
| [`fluent_booking/after_booking_meta_update`](#fluentbookingafterbookingmetaupdate) | Core | 1 | `fluent-booking/app/Services/BookingService.php:275` |
| [`fluent_booking/after_booking_rescheduled`](#fluentbookingafterbookingrescheduled) | Core | 1 | `fluent-booking/app/Hooks/Handlers/FrontEndHandler.php:528` |
| [`fluent_booking/after_booking_scheduled`](#fluentbookingafterbookingscheduled) | Core + <span class="pro-badge">PRO</span> | 5 | `fluent-booking/app/Services/Integrations/FluentCart/Bootstrap.php:441` |
| [`fluent_booking/after_delete_booking`](#fluentbookingafterdeletebooking) | Core | 2 | `fluent-booking/app/Hooks/Handlers/CleanupHandlers/CalenderEventCleaner.php:33` |
| [`fluent_booking/after_patch_booking_`](#fluentbookingafterpatchbooking) | Core | 1 | `fluent-booking/app/Http/Controllers/SchedulesController.php:330` |
| [`fluent_booking/after_patch_booking_schedule`](#fluentbookingafterpatchbookingschedule) | Core | 1 | `fluent-booking/app/Http/Controllers/SchedulesController.php:328` |
| [`fluent_booking/before_booking`](#fluentbookingbeforebooking) | Core | 1 | `fluent-booking/app/Services/BookingService.php:57` |
| [`fluent_booking/before_delete_booking`](#fluentbookingbeforedeletebooking) | Core | 2 | `fluent-booking/app/Hooks/Handlers/CleanupHandlers/CalenderEventCleaner.php:31` |
| [`fluent_booking/before_patch_booking_schedule`](#fluentbookingbeforepatchbookingschedule) | Core | 1 | `fluent-booking/app/Http/Controllers/SchedulesController.php:206` |
| [`fluent_booking/booking_schedule`](#fluentbookingbookingschedule) | Core | 1 | `fluent-booking/app/Http/Controllers/SchedulesController.php:349` |
| [`fluent_booking/booking_schedule_`](#fluentbookingbookingschedule) | Core | 2 | `fluent-booking/app/Http/Controllers/SchedulesController.php:319` |
| [`fluent_booking/booking_schedule_auto_cancelled`](#fluentbookingbookingscheduleautocancelled) | Core | 2 | `fluent-booking/app/Hooks/Scheduler/FiveMinuteScheduler.php:74` |
| [`fluent_booking/booking_schedule_cancelled`](#fluentbookingbookingschedulecancelled) | Core | 2 | `fluent-booking/app/Models/Booking.php:733` |
| [`fluent_booking/booking_schedule_completed`](#fluentbookingbookingschedulecompleted) | Core | 1 | `fluent-booking/app/Hooks/Scheduler/FiveMinuteScheduler.php:46` |
| [`fluent_booking/booking_schedule_rejected`](#fluentbookingbookingschedulerejected) | Core | 1 | `fluent-booking/app/Models/Booking.php:769` |
| [`fluent_booking/log_booking_activity`](#fluentbookinglogbookingactivity) | Core + <span class="pro-badge">PRO</span> | 69 | `fluent-booking/app/Hooks/Handlers/FrontEndHandler.php:519` |
| [`fluent_booking/log_booking_note`](#fluentbookinglogbookingnote) | Core + <span class="pro-badge">PRO</span> | 10 | `fluent-booking/app/Http/Controllers/IntegrationManagerController.php:230` |
| [`fluent_booking/pre_after_booking_scheduled`](#fluentbookingpreafterbookingscheduled) | Core + <span class="pro-badge">PRO</span> | 5 | `fluent-booking/app/Services/Integrations/FluentCart/Bootstrap.php:437` |
| [`fluent_booking/saving_addons`](#fluentbookingsavingaddons) | Core | 1 | `fluent-booking/app/Http/Controllers/SettingsController.php:254` |
| [`fluent_booking/short_code_render`](#fluentbookingshortcoderender) | Core | 1 | `fluent-booking/app/Views/public/calendar.php:19` |
| [`fluent_booking/starting_scheduling_ajax`](#fluentbookingstartingschedulingajax) | Core | 1 | `fluent-booking/app/Hooks/Handlers/FrontEndHandler.php:736` |

<a id="fluentbookingafterbooking"></a>

## `fluent_booking/after_booking_`

- **Type:** action
- **Edition:** Core + <span class="pro-badge">PRO</span>
- **Call sites:** 5

**Source locations**

- `fluent-booking/app/Http/Controllers/SchedulesController.php:325`
- `fluent-booking/app/Services/BookingService.php:81`
- `fluent-booking/app/Services/Integrations/FluentCart/Bootstrap.php:310`
- `fluent-booking-pro/app/Services/Integrations/PaymentMethods/BasePaymentMethod.php:421`
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

- `fluent-booking/app/Services/BookingService.php:275`

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

- `fluent-booking/app/Hooks/Handlers/FrontEndHandler.php:528`

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

- `fluent-booking/app/Services/Integrations/FluentCart/Bootstrap.php:441`
- `fluent-booking-pro/app/Services/Integrations/PaymentMethods/BasePaymentMethod.php:466`
- `fluent-booking-pro/app/Services/Integrations/PaymentMethods/Offline/Offline.php:84`
- `fluent-booking-pro/app/Services/Integrations/PaymentMethods/Offline/Offline.php:174`
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
- **Call sites:** 2

**Source locations**

- `fluent-booking/app/Hooks/Handlers/CleanupHandlers/CalenderEventCleaner.php:33`
- `fluent-booking/app/Http/Controllers/SchedulesController.php:370`

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
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Http/Controllers/SchedulesController.php:330`

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

- `fluent-booking/app/Http/Controllers/SchedulesController.php:328`

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
- **Call sites:** 2

**Source locations**

- `fluent-booking/app/Hooks/Handlers/CleanupHandlers/CalenderEventCleaner.php:31`
- `fluent-booking/app/Http/Controllers/SchedulesController.php:366`

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

- `fluent-booking/app/Http/Controllers/SchedulesController.php:349`

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
- **Call sites:** 2

**Source locations**

- `fluent-booking/app/Http/Controllers/SchedulesController.php:319`
- `fluent-booking/app/Http/Controllers/SchedulesController.php:708`

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

- `fluent-booking/app/Hooks/Scheduler/FiveMinuteScheduler.php:74`
- `fluent-booking/app/Hooks/Scheduler/FiveMinuteScheduler.php:105`

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

- `fluent-booking/app/Models/Booking.php:733`
- `fluent-booking/app/Models/Booking.php:746`

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

- `fluent-booking/app/Hooks/Scheduler/FiveMinuteScheduler.php:46`

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

- `fluent-booking/app/Models/Booking.php:769`

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
- **Call sites:** 69

**Source locations**

- `fluent-booking/app/Hooks/Handlers/FrontEndHandler.php:519`
- `fluent-booking/app/Http/Controllers/SchedulesController.php:253`
- `fluent-booking/app/Http/Controllers/SchedulesController.php:258`
- `fluent-booking/app/Http/Controllers/SchedulesController.php:302`
- `fluent-booking/app/Http/Controllers/SchedulesController.php:306`
- `fluent-booking/app/Services/Integrations/FluentCart/Bootstrap.php:175`
- `fluent-booking/app/Services/Integrations/FluentCart/Bootstrap.php:257`
- `fluent-booking/app/Services/Integrations/FluentCart/Bootstrap.php:284`
- `fluent-booking/app/Services/Integrations/FluentCart/Bootstrap.php:444`
- `fluent-booking-pro/app/Http/Controllers/TransactionController.php:41`
- _… and 59 more_

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
- `fluent-booking-pro/app/Services/Integrations/Twilio/Bootstrap.php:249`
- `fluent-booking-pro/app/Services/Integrations/Twilio/Bootstrap.php:270`
- `fluent-booking-pro/app/Services/Integrations/Twilio/Bootstrap.php:310`
- `fluent-booking-pro/app/Services/Integrations/Twilio/Bootstrap.php:330`
- `fluent-booking-pro/app/Services/Integrations/Twilio/Bootstrap.php:401`
- `fluent-booking-pro/app/Services/Integrations/Twilio/Bootstrap.php:424`
- `fluent-booking-pro/app/Services/Integrations/Twilio/Bootstrap.php:484`
- `fluent-booking-pro/app/Services/Integrations/Twilio/Bootstrap.php:507`

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

- `fluent-booking/app/Services/Integrations/FluentCart/Bootstrap.php:437`
- `fluent-booking-pro/app/Services/Integrations/PaymentMethods/BasePaymentMethod.php:462`
- `fluent-booking-pro/app/Services/Integrations/PaymentMethods/Offline/Offline.php:80`
- `fluent-booking-pro/app/Services/Integrations/PaymentMethods/Offline/Offline.php:170`
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

- `fluent-booking/app/Http/Controllers/SettingsController.php:254`

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

- `fluent-booking/app/Views/public/calendar.php:19`

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

- `fluent-booking/app/Hooks/Handlers/FrontEndHandler.php:736`

**Example**

```php
add_action('fluent_booking/starting_scheduling_ajax', function (...$args) {
    // Your custom logic here.
}, 10, count($args ?? []));
```
