---
title: Calendar & Event Settings Filters
description: Filters affecting calendar / event creation, validation, options, and sharing settings.
---

# Calendar & Event Settings Filters

Filters affecting calendar / event creation, validation, options, and sharing settings.

17 unique filter hooks currently map to this category, across 18 call sites.

## Hook Inventory

| Hook | Edition | Call Sites | First Source |
| --- | --- | --- | --- |
| [`fluent_booking/auto_create_calendar`](#fluentbookingautocreatecalendar) | Core | 1 | `fluent-booking/app/Hooks/Handlers/AdminMenuHandler.php:454` |
| [`fluent_booking/calendar_event_options`](#fluentbookingcalendareventoptions) | Core | 1 | `fluent-booking/app/Services/CalendarService.php:363` |
| [`fluent_booking/calendar_event_setting_menu_items`](#fluentbookingcalendareventsettingmenuitems) | Core | 1 | `fluent-booking/app/Hooks/Handlers/AdminMenuHandler.php:633` |
| [`fluent_booking/calendar_options_by_title`](#fluentbookingcalendaroptionsbytitle) | Core | 1 | `fluent-booking/app/Services/CalendarService.php:447` |
| [`fluent_booking/calendar_setting_menu_items`](#fluentbookingcalendarsettingmenuitems) | Core | 1 | `fluent-booking/app/Hooks/Handlers/AdminMenuHandler.php:807` |
| [`fluent_booking/calendar/sharing_settings`](#fluentbookingcalendarsharingsettings) | Core | 1 | `fluent-booking/app/Services/LandingPage/LandingPageHelper.php:23` |
| [`fluent_booking/create_calendar_event_data`](#fluentbookingcreatecalendareventdata) | Core | 2 | `fluent-booking/app/Http/Controllers/CalendarController.php:272` |
| [`fluent_booking/create_calendar_event_validation_rule`](#fluentbookingcreatecalendareventvalidationrule) | Core | 1 | `fluent-booking/app/Http/Controllers/CalendarController.php:481` |
| [`fluent_booking/create_calendar_validation_rule`](#fluentbookingcreatecalendarvalidationrule) | Core | 1 | `fluent-booking/app/Http/Controllers/CalendarController.php:145` |
| [`fluent_booking/event_colors`](#fluentbookingeventcolors) | Core | 1 | `fluent-booking/app/Services/Helper.php:1213` |
| [`fluent_booking/event_landing_page_vars`](#fluentbookingeventlandingpagevars) | Core | 1 | `fluent-booking/app/Services/LandingPage/LandingPageHandler.php:276` |
| [`fluent_booking/event_payment_settings_defaults`](#fluentbookingeventpaymentsettingsdefaults) | Core | 1 | `fluent-booking/app/Models/CalendarSlot.php:1149` |
| [`fluent_booking/event_short_description`](#fluentbookingeventshortdescription) | Core | 1 | `fluent-booking/app/Models/CalendarSlot.php:98` |
| [`fluent_booking/event_short_description_length`](#fluentbookingeventshortdescriptionlength) | Core | 1 | `fluent-booking/app/Models/CalendarSlot.php:94` |
| [`fluent_booking/exporting_calendar_data_json`](#fluentbookingexportingcalendardatajson) | Core | 1 | `fluent-booking/app/Hooks/Handlers/DataExporter.php:168` |
| [`fluent_booking/get_calendar_event_settings`](#fluentbookinggetcalendareventsettings) | Core | 1 | `fluent-booking/app/Http/Controllers/CalendarController.php:400` |
| [`fluent_booking/get_event_payment_settings`](#fluentbookinggeteventpaymentsettings) | Core | 1 | `fluent-booking/app/Models/CalendarSlot.php:1157` |

<a id="fluentbookingautocreatecalendar"></a>

## `fluent_booking/auto_create_calendar`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Hooks/Handlers/AdminMenuHandler.php:454`

**Example**

```php
add_filter('fluent_booking/auto_create_calendar', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingcalendareventoptions"></a>

## `fluent_booking/calendar_event_options`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Services/CalendarService.php:363`

**Example**

```php
add_filter('fluent_booking/calendar_event_options', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingcalendareventsettingmenuitems"></a>

## `fluent_booking/calendar_event_setting_menu_items`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Hooks/Handlers/AdminMenuHandler.php:633`

**Example**

```php
add_filter('fluent_booking/calendar_event_setting_menu_items', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingcalendaroptionsbytitle"></a>

## `fluent_booking/calendar_options_by_title`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Services/CalendarService.php:447`

**Example**

```php
add_filter('fluent_booking/calendar_options_by_title', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingcalendarsettingmenuitems"></a>

## `fluent_booking/calendar_setting_menu_items`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Hooks/Handlers/AdminMenuHandler.php:807`

**Example**

```php
add_filter('fluent_booking/calendar_setting_menu_items', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingcalendarsharingsettings"></a>

## `fluent_booking/calendar/sharing_settings`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Services/LandingPage/LandingPageHelper.php:23`

**Example**

```php
add_filter('fluent_booking/calendar/sharing_settings', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingcreatecalendareventdata"></a>

## `fluent_booking/create_calendar_event_data`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 2

**Source locations**

- `fluent-booking/app/Http/Controllers/CalendarController.php:272`
- `fluent-booking/app/Http/Controllers/CalendarController.php:521`

**Example**

```php
add_filter('fluent_booking/create_calendar_event_data', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingcreatecalendareventvalidationrule"></a>

## `fluent_booking/create_calendar_event_validation_rule`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Http/Controllers/CalendarController.php:481`

**Example**

```php
add_filter('fluent_booking/create_calendar_event_validation_rule', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingcreatecalendarvalidationrule"></a>

## `fluent_booking/create_calendar_validation_rule`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Http/Controllers/CalendarController.php:145`

**Example**

```php
add_filter('fluent_booking/create_calendar_validation_rule', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingeventcolors"></a>

## `fluent_booking/event_colors`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Services/Helper.php:1213`

**Example**

```php
add_filter('fluent_booking/event_colors', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingeventlandingpagevars"></a>

## `fluent_booking/event_landing_page_vars`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Services/LandingPage/LandingPageHandler.php:276`

**Example**

```php
add_filter('fluent_booking/event_landing_page_vars', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingeventpaymentsettingsdefaults"></a>

## `fluent_booking/event_payment_settings_defaults`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Models/CalendarSlot.php:1149`

**Example**

```php
add_filter('fluent_booking/event_payment_settings_defaults', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingeventshortdescription"></a>

## `fluent_booking/event_short_description`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Models/CalendarSlot.php:98`

**Example**

```php
add_filter('fluent_booking/event_short_description', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingeventshortdescriptionlength"></a>

## `fluent_booking/event_short_description_length`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Models/CalendarSlot.php:94`

**Example**

```php
add_filter('fluent_booking/event_short_description_length', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingexportingcalendardatajson"></a>

## `fluent_booking/exporting_calendar_data_json`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Hooks/Handlers/DataExporter.php:168`

**Example**

```php
add_filter('fluent_booking/exporting_calendar_data_json', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookinggetcalendareventsettings"></a>

## `fluent_booking/get_calendar_event_settings`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Http/Controllers/CalendarController.php:400`

**Example**

```php
add_filter('fluent_booking/get_calendar_event_settings', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookinggeteventpaymentsettings"></a>

## `fluent_booking/get_event_payment_settings`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Models/CalendarSlot.php:1157`

**Example**

```php
add_filter('fluent_booking/get_event_payment_settings', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```
