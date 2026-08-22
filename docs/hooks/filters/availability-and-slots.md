---
title: Availability & Slots Filters
description: Filters affecting availability schedules, slot computation, and fallback timezone behavior.
---

# Availability & Slots Filters

Filters affecting availability schedules, slot computation, and fallback timezone behavior.

4 unique filter hooks currently map to this category, across 6 call sites.

## Hook Inventory

| Hook | Edition | Call Sites | First Source |
| --- | --- | --- | --- |
| [`fluent_booking/availability_schedule_options`](#fluentbookingavailabilityscheduleoptions) | Core | 1 | `fluent-booking/app/Services/AvailabilityService.php:152` |
| [`fluent_booking/available_date_formats`](#fluentbookingavailabledateformats) | Core | 1 | `fluent-booking/app/Services/DateTimeHelper.php:201` |
| [`fluent_booking/available_slots_for_view`](#fluentbookingavailableslotsforview) | Core + <span class="pro-badge">PRO</span> | 3 | `fluent-booking/app/Hooks/Handlers/FrontEndHandler.php:1031` |
| [`fluent_booking/fallback_timezone`](#fluentbookingfallbacktimezone) | Core | 1 | `fluent-booking/app/Services/DateTimeHelper.php:85` |

<a id="fluentbookingavailabilityscheduleoptions"></a>

## `fluent_booking/availability_schedule_options`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Services/AvailabilityService.php:152`

**Example**

```php
add_filter('fluent_booking/availability_schedule_options', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingavailabledateformats"></a>

## `fluent_booking/available_date_formats`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Services/DateTimeHelper.php:201`

**Example**

```php
add_filter('fluent_booking/available_date_formats', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingavailableslotsforview"></a>

## `fluent_booking/available_slots_for_view`

- **Type:** filter
- **Edition:** Core + <span class="pro-badge">PRO</span>
- **Call sites:** 3

**Source locations**

- `fluent-booking/app/Hooks/Handlers/FrontEndHandler.php:1031`
- `fluent-booking/app/Http/Controllers/BookingController.php:327`
- `fluent-booking-pro/app/Modules/SingleEvent/SingleEventController.php:109`

**Example**

```php
add_filter('fluent_booking/available_slots_for_view', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingfallbacktimezone"></a>

## `fluent_booking/fallback_timezone`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Services/DateTimeHelper.php:85`

**Example**

```php
add_filter('fluent_booking/fallback_timezone', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```
