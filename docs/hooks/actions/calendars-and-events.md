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
| [`fluent_booking/after_create_calendar`](#fluentbookingaftercreatecalendar) | Core | 2 | `fluent-booking/app/Http/Controllers/CalendarController.php:305` |
| [`fluent_booking/after_create_calendar_slot`](#fluentbookingaftercreatecalendarslot) | Core | 1 | `fluent-booking/app/Http/Controllers/CalendarController.php:307` |
| [`fluent_booking/after_create_event`](#fluentbookingaftercreateevent) | Core | 1 | `fluent-booking/app/Http/Controllers/CalendarController.php:575` |
| [`fluent_booking/after_delete_calendar`](#fluentbookingafterdeletecalendar) | Core | 1 | `fluent-booking/app/Http/Controllers/CalendarController.php:1072` |
| [`fluent_booking/after_delete_calendar_event`](#fluentbookingafterdeletecalendarevent) | Core | 2 | `fluent-booking/app/Hooks/Handlers/CleanupHandlers/CalenderCleaner.php:36` |
| [`fluent_booking/after_update_calendar`](#fluentbookingafterupdatecalendar) | Core | 1 | `fluent-booking/app/Http/Controllers/CalendarController.php:416` |
| [`fluent_booking/after_update_event_details`](#fluentbookingafterupdateeventdetails) | Core | 1 | `fluent-booking/app/Http/Controllers/CalendarController.php:653` |
| [`fluent_booking/before_create_calendar`](#fluentbookingbeforecreatecalendar) | Core | 1 | `fluent-booking/app/Http/Controllers/CalendarController.php:157` |
| [`fluent_booking/before_create_event`](#fluentbookingbeforecreateevent) | Core | 1 | `fluent-booking/app/Http/Controllers/CalendarController.php:571` |
| [`fluent_booking/before_delete_calendar`](#fluentbookingbeforedeletecalendar) | Core | 1 | `fluent-booking/app/Http/Controllers/CalendarController.php:1068` |
| [`fluent_booking/before_delete_calendar_event`](#fluentbookingbeforedeletecalendarevent) | Core | 2 | `fluent-booking/app/Hooks/Handlers/CleanupHandlers/CalenderCleaner.php:34` |
| [`fluent_booking/before_get_all_calendars`](#fluentbookingbeforegetallcalendars) | Core | 1 | `fluent-booking/app/Http/Controllers/CalendarController.php:25` |
| [`fluent_booking/before_update_calendar`](#fluentbookingbeforeupdatecalendar) | Core | 1 | `fluent-booking/app/Http/Controllers/CalendarController.php:412` |

<a id="fluentbookingaftercreatecalendar"></a>

## `fluent_booking/after_create_calendar`

- **Type:** action
- **Edition:** Core
- **Call sites:** 2

**Source locations**

- `fluent-booking/app/Http/Controllers/CalendarController.php:305`
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

- `fluent-booking/app/Http/Controllers/CalendarController.php:307`

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

- `fluent-booking/app/Http/Controllers/CalendarController.php:575`

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

- `fluent-booking/app/Http/Controllers/CalendarController.php:1072`

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
- `fluent-booking/app/Http/Controllers/CalendarController.php:1044`

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

- `fluent-booking/app/Http/Controllers/CalendarController.php:416`

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

- `fluent-booking/app/Http/Controllers/CalendarController.php:653`

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

- `fluent-booking/app/Http/Controllers/CalendarController.php:157`

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

- `fluent-booking/app/Http/Controllers/CalendarController.php:571`

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

- `fluent-booking/app/Http/Controllers/CalendarController.php:1068`

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
- `fluent-booking/app/Http/Controllers/CalendarController.php:1040`

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

- `fluent-booking/app/Http/Controllers/CalendarController.php:412`

**Example**

```php
add_action('fluent_booking/before_update_calendar', function (...$args) {
    // Your custom logic here.
}, 10, count($args ?? []));
```
