---
title: Integrations Actions
description: Action hooks fired by third-party integrations (Google, Outlook, Zoom, FluentCRM, FluentBoards, Twilio, remote calendars).
---

# Integrations Actions

Action hooks fired by third-party integrations (Google, Outlook, Zoom, FluentCRM, FluentBoards, Twilio, remote calendars).

16 unique action hooks currently map to this category, across 28 call sites.

## Hook Inventory

| Hook | Edition | Call Sites | First Source |
| --- | --- | --- | --- |
| [`fluent_boards/task_added_from_fluent_booking`](#fluentboardstaskaddedfromfluentbooking) | Core | 1 | `fluent-booking/app/Services/Integrations/FluentBoards/Bootstrap.php:438` |
| [`fluent_boards/task_assignee_changed`](#fluentboardstaskassigneechanged) | Core | 1 | `fluent-booking/app/Services/Integrations/FluentBoards/Bootstrap.php:455` |
| [`fluent_booking/cancel_remote_calendar_event_`](#fluentbookingcancelremotecalendarevent) | <span class="pro-badge">PRO</span> | 1 | `fluent-booking-pro/app/Services/Integrations/Calendars/RemoteCalendarsInit.php:92` |
| [`fluent_booking/create_remote_calendar_event_`](#fluentbookingcreateremotecalendarevent) | <span class="pro-badge">PRO</span> | 3 | `fluent-booking-pro/app/Services/Integrations/Calendars/RemoteCalendarsInit.php:63` |
| [`fluent_booking/delete_remote_calendar_event_`](#fluentbookingdeleteremotecalendarevent) | <span class="pro-badge">PRO</span> | 3 | `fluent-booking-pro/app/Services/Integrations/Calendars/RemoteCalendarsInit.php:116` |
| [`fluent_booking/disconnect_general_integration_feed_`](#fluentbookingdisconnectgeneralintegrationfeed) | <span class="pro-badge">PRO</span> | 1 | `fluent-booking-pro/app/Http/Controllers/IntegrationSettingsController.php:244` |
| [`fluent_booking/disconnect_integration_`](#fluentbookingdisconnectintegration) | <span class="pro-badge">PRO</span> | 1 | `fluent-booking-pro/app/Http/Controllers/IntegrationSettingsController.php:83` |
| [`fluent_booking/integration_notify_`](#fluentbookingintegrationnotify) | Core | 2 | `fluent-booking/app/Hooks/Handlers/GlobalNotificationHandler.php:43` |
| [`fluent_booking/patch_remote_calendar_event_`](#fluentbookingpatchremotecalendarevent) | <span class="pro-badge">PRO</span> | 2 | `fluent-booking-pro/app/Services/Integrations/Calendars/RemoteCalendarsInit.php:146` |
| [`fluent_booking/refresh_remote_calendar_group_members_`](#fluentbookingrefreshremotecalendargroupmembers) | <span class="pro-badge">PRO</span> | 4 | `fluent-booking-pro/app/Services/Integrations/Calendars/RemoteCalendarsInit.php:58` |
| [`fluent_booking/save_integration_settings_`](#fluentbookingsaveintegrationsettings) | <span class="pro-badge">PRO</span> | 1 | `fluent-booking-pro/app/Http/Controllers/IntegrationSettingsController.php:69` |
| [`fluent_calendar/disconnect_remote_calendar_`](#fluentcalendardisconnectremotecalendar) | <span class="pro-badge">PRO</span> | 1 | `fluent-booking-pro/app/Http/Controllers/IntegrationSettingsController.php:172` |
| [`fluent_calendar/patch_calendar_additional_settings_`](#fluentcalendarpatchcalendaradditionalsettings) | <span class="pro-badge">PRO</span> | 1 | `fluent-booking-pro/app/Http/Controllers/IntegrationSettingsController.php:140` |
| [`fluent_calendar/patch_calendar_config_settings_`](#fluentcalendarpatchcalendarconfigsettings) | <span class="pro-badge">PRO</span> | 1 | `fluent-booking-pro/app/Http/Controllers/IntegrationSettingsController.php:119` |
| [`fluent_crm/contact_added_by_fluent_booking`](#fluentcrmcontactaddedbyfluentbooking) | Core | 2 | `fluent-booking/app/Services/Integrations/FluentCRM/Bootstrap.php:400` |
| [`fluentform/log_data`](#fluentformlogdata) | Core | 3 | `fluent-booking/app/Services/Integrations/FluentForms/FluentFormInit.php:282` |

<a id="fluentboardstaskaddedfromfluentbooking"></a>

## `fluent_boards/task_added_from_fluent_booking`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Services/Integrations/FluentBoards/Bootstrap.php:438`

**Example**

```php
add_action('fluent_boards/task_added_from_fluent_booking', function (...$args) {
    // Your custom logic here.
}, 10, count($args ?? []));
```

<a id="fluentboardstaskassigneechanged"></a>

## `fluent_boards/task_assignee_changed`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Services/Integrations/FluentBoards/Bootstrap.php:455`

**Example**

```php
add_action('fluent_boards/task_assignee_changed', function (...$args) {
    // Your custom logic here.
}, 10, count($args ?? []));
```

<a id="fluentbookingcancelremotecalendarevent"></a>

## `fluent_booking/cancel_remote_calendar_event_`

- **Type:** action
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1

**Source locations**

- `fluent-booking-pro/app/Services/Integrations/Calendars/RemoteCalendarsInit.php:92`

**Example**

```php
add_action('fluent_booking/cancel_remote_calendar_event_', function (...$args) {
    // Your custom logic here.
}, 10, count($args ?? []));
```

<a id="fluentbookingcreateremotecalendarevent"></a>

## `fluent_booking/create_remote_calendar_event_`

- **Type:** action
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 3

**Source locations**

- `fluent-booking-pro/app/Services/Integrations/Calendars/RemoteCalendarsInit.php:63`
- `fluent-booking-pro/app/Services/Integrations/Calendars/RemoteCalendarsInit.php:131`
- `fluent-booking-pro/app/Services/Integrations/Calendars/RemoteCalendarsInit.php:142`

**Example**

```php
add_action('fluent_booking/create_remote_calendar_event_', function (...$args) {
    // Your custom logic here.
}, 10, count($args ?? []));
```

<a id="fluentbookingdeleteremotecalendarevent"></a>

## `fluent_booking/delete_remote_calendar_event_`

- **Type:** action
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 3

**Source locations**

- `fluent-booking-pro/app/Services/Integrations/Calendars/RemoteCalendarsInit.php:116`
- `fluent-booking-pro/app/Services/Integrations/Calendars/RemoteCalendarsInit.php:138`
- `fluent-booking-pro/app/Services/Integrations/Calendars/RemoteCalendarsInit.php:174`

**Example**

```php
add_action('fluent_booking/delete_remote_calendar_event_', function (...$args) {
    // Your custom logic here.
}, 10, count($args ?? []));
```

<a id="fluentbookingdisconnectgeneralintegrationfeed"></a>

## `fluent_booking/disconnect_general_integration_feed_`

- **Type:** action
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1

**Source locations**

- `fluent-booking-pro/app/Http/Controllers/IntegrationSettingsController.php:244`

**Example**

```php
add_action('fluent_booking/disconnect_general_integration_feed_', function (...$args) {
    // Your custom logic here.
}, 10, count($args ?? []));
```

<a id="fluentbookingdisconnectintegration"></a>

## `fluent_booking/disconnect_integration_`

- **Type:** action
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1

**Source locations**

- `fluent-booking-pro/app/Http/Controllers/IntegrationSettingsController.php:83`

**Example**

```php
add_action('fluent_booking/disconnect_integration_', function (...$args) {
    // Your custom logic here.
}, 10, count($args ?? []));
```

<a id="fluentbookingintegrationnotify"></a>

## `fluent_booking/integration_notify_`

- **Type:** action
- **Edition:** Core
- **Call sites:** 2

**Source locations**

- `fluent-booking/app/Hooks/Handlers/GlobalNotificationHandler.php:43`
- `fluent-booking/app/Hooks/Handlers/GlobalNotificationHandler.php:124`

**Example**

```php
add_action('fluent_booking/integration_notify_', function (...$args) {
    // Your custom logic here.
}, 10, count($args ?? []));
```

<a id="fluentbookingpatchremotecalendarevent"></a>

## `fluent_booking/patch_remote_calendar_event_`

- **Type:** action
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 2

**Source locations**

- `fluent-booking-pro/app/Services/Integrations/Calendars/RemoteCalendarsInit.php:146`
- `fluent-booking-pro/app/Services/Integrations/Calendars/RemoteCalendarsInit.php:160`

**Example**

```php
add_action('fluent_booking/patch_remote_calendar_event_', function (...$args) {
    // Your custom logic here.
}, 10, count($args ?? []));
```

<a id="fluentbookingrefreshremotecalendargroupmembers"></a>

## `fluent_booking/refresh_remote_calendar_group_members_`

- **Type:** action
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 4

**Source locations**

- `fluent-booking-pro/app/Services/Integrations/Calendars/RemoteCalendarsInit.php:58`
- `fluent-booking-pro/app/Services/Integrations/Calendars/RemoteCalendarsInit.php:87`
- `fluent-booking-pro/app/Services/Integrations/Calendars/RemoteCalendarsInit.php:113`
- `fluent-booking-pro/app/Services/Integrations/Calendars/RemoteCalendarsInit.php:127`

**Example**

```php
add_action('fluent_booking/refresh_remote_calendar_group_members_', function (...$args) {
    // Your custom logic here.
}, 10, count($args ?? []));
```

<a id="fluentbookingsaveintegrationsettings"></a>

## `fluent_booking/save_integration_settings_`

- **Type:** action
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1

**Source locations**

- `fluent-booking-pro/app/Http/Controllers/IntegrationSettingsController.php:69`

**Example**

```php
add_action('fluent_booking/save_integration_settings_', function (...$args) {
    // Your custom logic here.
}, 10, count($args ?? []));
```

<a id="fluentcalendardisconnectremotecalendar"></a>

## `fluent_calendar/disconnect_remote_calendar_`

- **Type:** action
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1

**Source locations**

- `fluent-booking-pro/app/Http/Controllers/IntegrationSettingsController.php:172`

**Example**

```php
add_action('fluent_calendar/disconnect_remote_calendar_', function (...$args) {
    // Your custom logic here.
}, 10, count($args ?? []));
```

<a id="fluentcalendarpatchcalendaradditionalsettings"></a>

## `fluent_calendar/patch_calendar_additional_settings_`

- **Type:** action
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1

**Source locations**

- `fluent-booking-pro/app/Http/Controllers/IntegrationSettingsController.php:140`

**Example**

```php
add_action('fluent_calendar/patch_calendar_additional_settings_', function (...$args) {
    // Your custom logic here.
}, 10, count($args ?? []));
```

<a id="fluentcalendarpatchcalendarconfigsettings"></a>

## `fluent_calendar/patch_calendar_config_settings_`

- **Type:** action
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1

**Source locations**

- `fluent-booking-pro/app/Http/Controllers/IntegrationSettingsController.php:119`

**Example**

```php
add_action('fluent_calendar/patch_calendar_config_settings_', function (...$args) {
    // Your custom logic here.
}, 10, count($args ?? []));
```

<a id="fluentcrmcontactaddedbyfluentbooking"></a>

## `fluent_crm/contact_added_by_fluent_booking`

- **Type:** action
- **Edition:** Core
- **Call sites:** 2

**Source locations**

- `fluent-booking/app/Services/Integrations/FluentCRM/Bootstrap.php:400`
- `fluent-booking/app/Services/Integrations/FluentCRM/Bootstrap.php:428`

**Example**

```php
add_action('fluent_crm/contact_added_by_fluent_booking', function (...$args) {
    // Your custom logic here.
}, 10, count($args ?? []));
```

<a id="fluentformlogdata"></a>

## `fluentform/log_data`

- **Type:** action
- **Edition:** Core
- **Call sites:** 3

**Source locations**

- `fluent-booking/app/Services/Integrations/FluentForms/FluentFormInit.php:282`
- `fluent-booking/app/Services/Integrations/FluentForms/FluentFormInit.php:350`
- `fluent-booking/app/Services/Integrations/FluentForms/FluentFormInit.php:362`

**Example**

```php
add_action('fluentform/log_data', function (...$args) {
    // Your custom logic here.
}, 10, count($args ?? []));
```
