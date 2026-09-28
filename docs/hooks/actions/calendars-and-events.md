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
| [`fluent_booking/after_create_calendar`](#fluentbookingaftercreatecalendar) | Core | 2 | `fluent-booking/app/Http/Controllers/CalendarController.php:351` |
| [`fluent_booking/after_create_calendar_slot`](#fluentbookingaftercreatecalendarslot) | Core | 1 | `fluent-booking/app/Http/Controllers/CalendarController.php:353` |
| [`fluent_booking/after_create_event`](#fluentbookingaftercreateevent) | Core | 1 | `fluent-booking/app/Http/Controllers/CalendarController.php:657` |
| [`fluent_booking/after_delete_calendar`](#fluentbookingafterdeletecalendar) | Core | 1 | `fluent-booking/app/Http/Controllers/CalendarController.php:1119` |
| [`fluent_booking/after_delete_calendar_event`](#fluentbookingafterdeletecalendarevent) | Core | 2 | `fluent-booking/app/Hooks/Handlers/CleanupHandlers/CalenderCleaner.php:37` |
| [`fluent_booking/after_update_calendar`](#fluentbookingafterupdatecalendar) | Core | 1 | `fluent-booking/app/Http/Controllers/CalendarController.php:478` |
| [`fluent_booking/after_update_event_details`](#fluentbookingafterupdateeventdetails) | Core | 1 | `fluent-booking/app/Http/Controllers/CalendarController.php:735` |
| [`fluent_booking/before_create_calendar`](#fluentbookingbeforecreatecalendar) | Core | 1 | `fluent-booking/app/Http/Controllers/CalendarController.php:203` |
| [`fluent_booking/before_create_event`](#fluentbookingbeforecreateevent) | Core | 1 | `fluent-booking/app/Http/Controllers/CalendarController.php:653` |
| [`fluent_booking/before_delete_calendar`](#fluentbookingbeforedeletecalendar) | Core | 1 | `fluent-booking/app/Http/Controllers/CalendarController.php:1115` |
| [`fluent_booking/before_delete_calendar_event`](#fluentbookingbeforedeletecalendarevent) | Core | 2 | `fluent-booking/app/Hooks/Handlers/CleanupHandlers/CalenderCleaner.php:35` |
| [`fluent_booking/before_get_all_calendars`](#fluentbookingbeforegetallcalendars) | Core | 1 | `fluent-booking/app/Http/Controllers/CalendarController.php:25` |
| [`fluent_booking/before_update_calendar`](#fluentbookingbeforeupdatecalendar) | Core | 1 | `fluent-booking/app/Http/Controllers/CalendarController.php:474` |

<a id="fluentbookingaftercreatecalendar"></a>

## `fluent_booking/after_create_calendar`

- **Type:** action
- **Edition:** Core
- **Call sites:** 2

**Source locations**

- `fluent-booking/app/Http/Controllers/CalendarController.php:351`
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

- `fluent-booking/app/Http/Controllers/CalendarController.php:353`

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

- `fluent-booking/app/Http/Controllers/CalendarController.php:657`

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

- `fluent-booking/app/Http/Controllers/CalendarController.php:1119`

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

- `fluent-booking/app/Hooks/Handlers/CleanupHandlers/CalenderCleaner.php:37`
- `fluent-booking/app/Http/Controllers/CalendarController.php:1091`

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

- `fluent-booking/app/Http/Controllers/CalendarController.php:478`

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

- `fluent-booking/app/Http/Controllers/CalendarController.php:735`

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

- `fluent-booking/app/Http/Controllers/CalendarController.php:203`

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

- `fluent-booking/app/Http/Controllers/CalendarController.php:653`

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

- `fluent-booking/app/Http/Controllers/CalendarController.php:1115`

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

- `fluent-booking/app/Hooks/Handlers/CleanupHandlers/CalenderCleaner.php:35`
- `fluent-booking/app/Http/Controllers/CalendarController.php:1087`

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

- `fluent-booking/app/Http/Controllers/CalendarController.php:25`

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

- `fluent-booking/app/Http/Controllers/CalendarController.php:474`

**Example**

```php
add_action('fluent_booking/before_update_calendar', function (...$args) {
    // Your custom logic here.
}, 10, count($args ?? []));
```
