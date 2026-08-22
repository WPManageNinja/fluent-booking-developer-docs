---
title: Calendars & Events Actions
description: Action hooks for calendar and event-type creation, updates, deletion, and event ordering.
---

# Calendars & Events Actions

Action hooks for calendar and event-type creation, updates, deletion, and event ordering.

13 unique action hooks currently map to this category, across 16 call sites.

## Hook Inventory

| Hook | Edition | Call Sites | First Source |
| --- | --- | --- | --- |
| [`fluent_booking/after_create_calendar`](#fluentbookingaftercreatecalendar) | Core | 2 | `fluent-booking/app/Http/Controllers/CalendarController.php:280` |
| [`fluent_booking/after_create_calendar_slot`](#fluentbookingaftercreatecalendarslot) | Core | 1 | `fluent-booking/app/Http/Controllers/CalendarController.php:282` |
| [`fluent_booking/after_create_event`](#fluentbookingaftercreateevent) | Core | 1 | `fluent-booking/app/Http/Controllers/CalendarController.php:550` |
| [`fluent_booking/after_delete_calendar`](#fluentbookingafterdeletecalendar) | Core | 1 | `fluent-booking/app/Http/Controllers/CalendarController.php:997` |
| [`fluent_booking/after_delete_calendar_event`](#fluentbookingafterdeletecalendarevent) | Core | 2 | `fluent-booking/app/Hooks/Handlers/CleanupHandlers/CalenderCleaner.php:36` |
| [`fluent_booking/after_update_calendar`](#fluentbookingafterupdatecalendar) | Core | 1 | `fluent-booking/app/Http/Controllers/CalendarController.php:391` |
| [`fluent_booking/after_update_event_details`](#fluentbookingafterupdateeventdetails) | Core | 1 | `fluent-booking/app/Http/Controllers/CalendarController.php:628` |
| [`fluent_booking/before_create_calendar`](#fluentbookingbeforecreatecalendar) | Core | 1 | `fluent-booking/app/Http/Controllers/CalendarController.php:156` |
| [`fluent_booking/before_create_event`](#fluentbookingbeforecreateevent) | Core | 1 | `fluent-booking/app/Http/Controllers/CalendarController.php:546` |
| [`fluent_booking/before_delete_calendar`](#fluentbookingbeforedeletecalendar) | Core | 1 | `fluent-booking/app/Http/Controllers/CalendarController.php:993` |
| [`fluent_booking/before_delete_calendar_event`](#fluentbookingbeforedeletecalendarevent) | Core | 2 | `fluent-booking/app/Hooks/Handlers/CleanupHandlers/CalenderCleaner.php:34` |
| [`fluent_booking/before_get_all_calendars`](#fluentbookingbeforegetallcalendars) | Core | 1 | `fluent-booking/app/Http/Controllers/CalendarController.php:24` |
| [`fluent_booking/before_update_calendar`](#fluentbookingbeforeupdatecalendar) | Core | 1 | `fluent-booking/app/Http/Controllers/CalendarController.php:387` |

<a id="fluentbookingaftercreatecalendar"></a>

## `fluent_booking/after_create_calendar`

- **Type:** action
- **Edition:** Core
- **Call sites:** 2

**Source locations**

- `fluent-booking/app/Http/Controllers/CalendarController.php:280`
- `fluent-booking/app/Services/CalendarService.php:41`

**Example**

```php
add_action('fluent_booking/after_create_calendar', function (...$args) {
    // Your custom logic here.
}, 10, count($args ?? []));
```

<a id="fluentbookingaftercreatecalendarslot"></a>

## `fluent_booking/after_create_calendar_slot`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Http/Controllers/CalendarController.php:282`

**Example**

```php
add_action('fluent_booking/after_create_calendar_slot', function (...$args) {
    // Your custom logic here.
}, 10, count($args ?? []));
```

<a id="fluentbookingaftercreateevent"></a>

## `fluent_booking/after_create_event`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Http/Controllers/CalendarController.php:550`

**Example**

```php
add_action('fluent_booking/after_create_event', function (...$args) {
    // Your custom logic here.
}, 10, count($args ?? []));
```

<a id="fluentbookingafterdeletecalendar"></a>

## `fluent_booking/after_delete_calendar`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Http/Controllers/CalendarController.php:997`

**Example**

```php
add_action('fluent_booking/after_delete_calendar', function (...$args) {
    // Your custom logic here.
}, 10, count($args ?? []));
```

<a id="fluentbookingafterdeletecalendarevent"></a>

## `fluent_booking/after_delete_calendar_event`

- **Type:** action
- **Edition:** Core
- **Call sites:** 2

**Source locations**

- `fluent-booking/app/Hooks/Handlers/CleanupHandlers/CalenderCleaner.php:36`
- `fluent-booking/app/Http/Controllers/CalendarController.php:969`

**Example**

```php
add_action('fluent_booking/after_delete_calendar_event', function (...$args) {
    // Your custom logic here.
}, 10, count($args ?? []));
```

<a id="fluentbookingafterupdatecalendar"></a>

## `fluent_booking/after_update_calendar`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Http/Controllers/CalendarController.php:391`

**Example**

```php
add_action('fluent_booking/after_update_calendar', function (...$args) {
    // Your custom logic here.
}, 10, count($args ?? []));
```

<a id="fluentbookingafterupdateeventdetails"></a>

## `fluent_booking/after_update_event_details`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Http/Controllers/CalendarController.php:628`

**Example**

```php
add_action('fluent_booking/after_update_event_details', function (...$args) {
    // Your custom logic here.
}, 10, count($args ?? []));
```

<a id="fluentbookingbeforecreatecalendar"></a>

## `fluent_booking/before_create_calendar`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Http/Controllers/CalendarController.php:156`

**Example**

```php
add_action('fluent_booking/before_create_calendar', function (...$args) {
    // Your custom logic here.
}, 10, count($args ?? []));
```

<a id="fluentbookingbeforecreateevent"></a>

## `fluent_booking/before_create_event`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Http/Controllers/CalendarController.php:546`

**Example**

```php
add_action('fluent_booking/before_create_event', function (...$args) {
    // Your custom logic here.
}, 10, count($args ?? []));
```

<a id="fluentbookingbeforedeletecalendar"></a>

## `fluent_booking/before_delete_calendar`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Http/Controllers/CalendarController.php:993`

**Example**

```php
add_action('fluent_booking/before_delete_calendar', function (...$args) {
    // Your custom logic here.
}, 10, count($args ?? []));
```

<a id="fluentbookingbeforedeletecalendarevent"></a>

## `fluent_booking/before_delete_calendar_event`

- **Type:** action
- **Edition:** Core
- **Call sites:** 2

**Source locations**

- `fluent-booking/app/Hooks/Handlers/CleanupHandlers/CalenderCleaner.php:34`
- `fluent-booking/app/Http/Controllers/CalendarController.php:965`

**Example**

```php
add_action('fluent_booking/before_delete_calendar_event', function (...$args) {
    // Your custom logic here.
}, 10, count($args ?? []));
```

<a id="fluentbookingbeforegetallcalendars"></a>

## `fluent_booking/before_get_all_calendars`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Http/Controllers/CalendarController.php:24`

**Example**

```php
add_action('fluent_booking/before_get_all_calendars', function (...$args) {
    // Your custom logic here.
}, 10, count($args ?? []));
```

<a id="fluentbookingbeforeupdatecalendar"></a>

## `fluent_booking/before_update_calendar`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Http/Controllers/CalendarController.php:387`

**Example**

```php
add_action('fluent_booking/before_update_calendar', function (...$args) {
    // Your custom logic here.
}, 10, count($args ?? []));
```
