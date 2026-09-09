---
title: Availability Actions
description: Action hooks for availability-schedule creation, updates, cloning, and deletion.
---

# Availability Actions

Action hooks for availability-schedule creation, updates, cloning, and deletion.

8 unique action hooks currently map to this category, across 11 call sites.

## Hook Inventory

| Hook | Edition | Call Sites | First Source |
| --- | --- | --- | --- |
| [`fluent_booking/after_creating_schedule`](#fluentbookingaftercreatingschedule) | Core | 1 | `fluent-booking/app/Http/Controllers/BookingController.php:253` |
| [`fluent_booking/after_delete_availability_schedule`](#fluentbookingafterdeleteavailabilityschedule) | Core | 2 | `fluent-booking/app/Hooks/Handlers/CleanupHandlers/CalenderCleaner.php:86` |
| [`fluent_booking/avaibility_schedule_updated`](#fluentbookingavaibilityscheduleupdated) | Core | 1 | `fluent-booking/app/Http/Controllers/AvailabilityController.php:192` |
| [`fluent_booking/availability_schedule_cloned`](#fluentbookingavailabilityschedulecloned) | Core | 1 | `fluent-booking/app/Http/Controllers/AvailabilityController.php:164` |
| [`fluent_booking/availability_schedule_created`](#fluentbookingavailabilityschedulecreated) | Core | 1 | `fluent-booking/app/Http/Controllers/AvailabilityController.php:138` |
| [`fluent_booking/availability_schedules`](#fluentbookingavailabilityschedules) | Core | 1 | `fluent-booking/app/Http/Controllers/AvailabilityController.php:42` |
| [`fluent_booking/before_creating_schedule`](#fluentbookingbeforecreatingschedule) | Core | 2 | `fluent-booking/app/Hooks/Handlers/FrontEndHandler.php:878` |
| [`fluent_booking/before_delete_availability_schedule`](#fluentbookingbeforedeleteavailabilityschedule) | Core | 2 | `fluent-booking/app/Hooks/Handlers/CleanupHandlers/CalenderCleaner.php:84` |

<a id="fluentbookingaftercreatingschedule"></a>

## `fluent_booking/after_creating_schedule`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Http/Controllers/BookingController.php:253`

**Example**

```php
add_action('fluent_booking/after_creating_schedule', function (...$args) {
    // Your custom logic here.
}, 10, count($args ?? []));
```

<a id="fluentbookingafterdeleteavailabilityschedule"></a>

## `fluent_booking/after_delete_availability_schedule`

- **Type:** action
- **Edition:** Core
- **Call sites:** 2

**Source locations**

- `fluent-booking/app/Hooks/Handlers/CleanupHandlers/CalenderCleaner.php:86`
- `fluent-booking/app/Http/Controllers/AvailabilityController.php:279`

**Example**

```php
add_action('fluent_booking/after_delete_availability_schedule', function (...$args) {
    // Your custom logic here.
}, 10, count($args ?? []));
```

<a id="fluentbookingavaibilityscheduleupdated"></a>

## `fluent_booking/avaibility_schedule_updated`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Http/Controllers/AvailabilityController.php:192`

**Example**

```php
add_action('fluent_booking/avaibility_schedule_updated', function (...$args) {
    // Your custom logic here.
}, 10, count($args ?? []));
```

<a id="fluentbookingavailabilityschedulecloned"></a>

## `fluent_booking/availability_schedule_cloned`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Http/Controllers/AvailabilityController.php:164`

**Example**

```php
add_action('fluent_booking/availability_schedule_cloned', function (...$args) {
    // Your custom logic here.
}, 10, count($args ?? []));
```

<a id="fluentbookingavailabilityschedulecreated"></a>

## `fluent_booking/availability_schedule_created`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Http/Controllers/AvailabilityController.php:138`

**Example**

```php
add_action('fluent_booking/availability_schedule_created', function (...$args) {
    // Your custom logic here.
}, 10, count($args ?? []));
```

<a id="fluentbookingavailabilityschedules"></a>

## `fluent_booking/availability_schedules`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Http/Controllers/AvailabilityController.php:42`

**Example**

```php
add_action('fluent_booking/availability_schedules', function (...$args) {
    // Your custom logic here.
}, 10, count($args ?? []));
```

<a id="fluentbookingbeforecreatingschedule"></a>

## `fluent_booking/before_creating_schedule`

- **Type:** action
- **Edition:** Core
- **Call sites:** 2

**Source locations**

- `fluent-booking/app/Hooks/Handlers/FrontEndHandler.php:878`
- `fluent-booking/app/Http/Controllers/BookingController.php:248`

**Example**

```php
add_action('fluent_booking/before_creating_schedule', function (...$args) {
    // Your custom logic here.
}, 10, count($args ?? []));
```

<a id="fluentbookingbeforedeleteavailabilityschedule"></a>

## `fluent_booking/before_delete_availability_schedule`

- **Type:** action
- **Edition:** Core
- **Call sites:** 2

**Source locations**

- `fluent-booking/app/Hooks/Handlers/CleanupHandlers/CalenderCleaner.php:84`
- `fluent-booking/app/Http/Controllers/AvailabilityController.php:275`

**Example**

```php
add_action('fluent_booking/before_delete_availability_schedule', function (...$args) {
    // Your custom logic here.
}, 10, count($args ?? []));
```
