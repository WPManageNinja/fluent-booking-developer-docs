---
title: Integrations Filters
description: Filters consumed by integration handlers (Twilio, Google, Outlook, FluentForm, FluentBoards, FluentCRM, webhooks).
---

# Integrations Filters

Filters consumed by integration handlers (Twilio, Google, Outlook, FluentForm, FluentBoards, FluentCRM, webhooks).

27 unique filter hooks currently map to this category, across 31 call sites.

## Hook Inventory

| Hook | Edition | Call Sites | First Source |
| --- | --- | --- | --- |
| [`fluent_booking/before_send_integration_data_twilio`](#fluentbookingbeforesendintegrationdatatwilio) | <span class="pro-badge">PRO</span> | 1 | `fluent-booking-pro/app/Services/Integrations/Twilio/Bootstrap.php:136` |
| [`fluent_booking/crm_booking_prefill_data`](#fluentbookingcrmbookingprefilldata) | Core | 1 | `fluent-booking/app/Services/Integrations/FluentCRM/CrmContactService.php:94` |
| [`fluent_booking/crm_meeting_data`](#fluentbookingcrmmeetingdata) | Core | 1 | `fluent-booking/app/Services/Integrations/FluentCRM/FluentCrmInit.php:95` |
| [`fluent_booking/crm_meetings_limit`](#fluentbookingcrmmeetingslimit) | Core | 1 | `fluent-booking/app/Services/Integrations/FluentCRM/FluentCrmInit.php:69` |
| [`fluent_booking/crm_meetings_response`](#fluentbookingcrmmeetingsresponse) | Core | 1 | `fluent-booking/app/Services/Integrations/FluentCRM/FluentCrmInit.php:98` |
| [`fluent_booking/crm_trigger_calendar_options`](#fluentbookingcrmtriggercalendaroptions) | Core | 4 | `fluent-booking/app/Services/Integrations/FluentCRM/BookingCompletedTrigger.php:25` |
| [`fluent_booking/ff_editor_calendar_options`](#fluentbookingffeditorcalendaroptions) | Core | 1 | `fluent-booking/app/Services/Integrations/FluentForms/BookingElement.php:253` |
| [`fluent_booking/fluent_board_config_field_options`](#fluentbookingfluentboardconfigfieldoptions) | Core | 1 | `fluent-booking/app/Services/Integrations/FluentBoards/Bootstrap.php:253` |
| [`fluent_booking/get_available_form_integrations`](#fluentbookinggetavailableformintegrations) | Core | 1 | `fluent-booking/app/Services/Integrations/CalendarIntegrationService.php:177` |
| [`fluent_booking/get_integration_config_field_options_`](#fluentbookinggetintegrationconfigfieldoptions) | Core | 1 | `fluent-booking/app/Http/Controllers/CalendarIntegrationController.php:149` |
| [`fluent_booking/get_integration_defaults_`](#fluentbookinggetintegrationdefaults) | Core | 1 | `fluent-booking/app/Services/Integrations/CalendarIntegrationService.php:42` |
| [`fluent_booking/get_integration_field_settings_`](#fluentbookinggetintegrationfieldsettings) | <span class="pro-badge">PRO</span> | 1 | `fluent-booking-pro/app/Http/Controllers/IntegrationSettingsController.php:21` |
| [`fluent_booking/get_integration_merge_fields_`](#fluentbookinggetintegrationmergefields) | Core | 2 | `fluent-booking/app/Http/Controllers/CalendarIntegrationController.php:130` |
| [`fluent_booking/get_integration_settings_`](#fluentbookinggetintegrationsettings) | <span class="pro-badge">PRO</span> | 1 | `fluent-booking-pro/app/Http/Controllers/IntegrationSettingsController.php:19` |
| [`fluent_booking/get_integration_settings_fields_`](#fluentbookinggetintegrationsettingsfields) | Core | 1 | `fluent-booking/app/Services/Integrations/CalendarIntegrationService.php:54` |
| [`fluent_booking/get_integration_values_`](#fluentbookinggetintegrationvalues) | Core | 1 | `fluent-booking/app/Services/Integrations/CalendarIntegrationService.php:36` |
| [`fluent_booking/get_payment_connect_info_`](#fluentbookinggetpaymentconnectinfo) | <span class="pro-badge">PRO</span> | 1 | `fluent-booking-pro/app/Hooks/Handlers/GlobalPaymentHandler.php:100` |
| [`fluent_booking/get_payment_settings_disconnect_`](#fluentbookinggetpaymentsettingsdisconnect) | <span class="pro-badge">PRO</span> | 1 | `fluent-booking-pro/app/Hooks/Handlers/GlobalPaymentHandler.php:105` |
| [`fluent_booking/google_additional_setting_fields`](#fluentbookinggoogleadditionalsettingfields) | <span class="pro-badge">PRO</span> | 1 | `fluent-booking-pro/app/Services/Integrations/Calendars/Google/Bootstrap.php:980` |
| [`fluent_booking/google_event_data`](#fluentbookinggoogleeventdata) | <span class="pro-badge">PRO</span> | 1 | `fluent-booking-pro/app/Services/Integrations/Calendars/Google/Bootstrap.php:423` |
| [`fluent_booking/outlook_additional_setting_fields`](#fluentbookingoutlookadditionalsettingfields) | <span class="pro-badge">PRO</span> | 1 | `fluent-booking-pro/app/Services/Integrations/Calendars/Outlook/Bootstrap.php:919` |
| [`fluent_booking/outlook_app_credentials`](#fluentbookingoutlookappcredentials) | <span class="pro-badge">PRO</span> | 1 | `fluent-booking-pro/app/Services/Integrations/Calendars/Outlook/OutlookHelper.php:13` |
| [`fluent_booking/outlook_app_redirect_url`](#fluentbookingoutlookappredirecturl) | <span class="pro-badge">PRO</span> | 1 | `fluent-booking-pro/app/Services/Integrations/Calendars/Outlook/OutlookHelper.php:142` |
| [`fluent_booking/outlook_event_data`](#fluentbookingoutlookeventdata) | <span class="pro-badge">PRO</span> | 1 | `fluent-booking-pro/app/Services/Integrations/Calendars/Outlook/Bootstrap.php:480` |
| [`fluent_booking/outlook_refresh_token_url`](#fluentbookingoutlookrefreshtokenurl) | <span class="pro-badge">PRO</span> | 1 | `fluent-booking-pro/app/Services/Integrations/Calendars/Outlook/Client.php:28` |
| [`fluent_booking/outlook_revoke_url`](#fluentbookingoutlookrevokeurl) | <span class="pro-badge">PRO</span> | 1 | `fluent-booking-pro/app/Services/Integrations/Calendars/Outlook/Client.php:27` |
| [`fluent_booking/outlook_token_url`](#fluentbookingoutlooktokenurl) | <span class="pro-badge">PRO</span> | 1 | `fluent-booking-pro/app/Services/Integrations/Calendars/Outlook/Client.php:26` |

<a id="fluentbookingbeforesendintegrationdatatwilio"></a>

## `fluent_booking/before_send_integration_data_twilio`

- **Type:** filter
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1

**Source locations**

- `fluent-booking-pro/app/Services/Integrations/Twilio/Bootstrap.php:136`

**Example**

```php
add_filter('fluent_booking/before_send_integration_data_twilio', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingcrmbookingprefilldata"></a>

## `fluent_booking/crm_booking_prefill_data`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Services/Integrations/FluentCRM/CrmContactService.php:94`

**Example**

```php
add_filter('fluent_booking/crm_booking_prefill_data', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingcrmmeetingdata"></a>

## `fluent_booking/crm_meeting_data`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Services/Integrations/FluentCRM/FluentCrmInit.php:95`

**Example**

```php
add_filter('fluent_booking/crm_meeting_data', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingcrmmeetingslimit"></a>

## `fluent_booking/crm_meetings_limit`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Services/Integrations/FluentCRM/FluentCrmInit.php:69`

**Example**

```php
add_filter('fluent_booking/crm_meetings_limit', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingcrmmeetingsresponse"></a>

## `fluent_booking/crm_meetings_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Services/Integrations/FluentCRM/FluentCrmInit.php:98`

**Example**

```php
add_filter('fluent_booking/crm_meetings_response', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingcrmtriggercalendaroptions"></a>

## `fluent_booking/crm_trigger_calendar_options`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 4

**Source locations**

- `fluent-booking/app/Services/Integrations/FluentCRM/BookingCompletedTrigger.php:25`
- `fluent-booking/app/Services/Integrations/FluentCRM/BookingRescheduledTrigger.php:25`
- `fluent-booking/app/Services/Integrations/FluentCRM/CancelBookingTrigger.php:27`
- `fluent-booking/app/Services/Integrations/FluentCRM/NewBookingTrigger.php:25`

**Example**

```php
add_filter('fluent_booking/crm_trigger_calendar_options', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingffeditorcalendaroptions"></a>

## `fluent_booking/ff_editor_calendar_options`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Services/Integrations/FluentForms/BookingElement.php:253`

**Example**

```php
add_filter('fluent_booking/ff_editor_calendar_options', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingfluentboardconfigfieldoptions"></a>

## `fluent_booking/fluent_board_config_field_options`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Services/Integrations/FluentBoards/Bootstrap.php:253`

**Example**

```php
add_filter('fluent_booking/fluent_board_config_field_options', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookinggetavailableformintegrations"></a>

## `fluent_booking/get_available_form_integrations`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Services/Integrations/CalendarIntegrationService.php:177`

**Example**

```php
add_filter('fluent_booking/get_available_form_integrations', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookinggetintegrationconfigfieldoptions"></a>

## `fluent_booking/get_integration_config_field_options_`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Http/Controllers/CalendarIntegrationController.php:149`

**Example**

```php
add_filter('fluent_booking/get_integration_config_field_options_', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookinggetintegrationdefaults"></a>

## `fluent_booking/get_integration_defaults_`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Services/Integrations/CalendarIntegrationService.php:42`

**Example**

```php
add_filter('fluent_booking/get_integration_defaults_', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookinggetintegrationfieldsettings"></a>

## `fluent_booking/get_integration_field_settings_`

- **Type:** filter
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1

**Source locations**

- `fluent-booking-pro/app/Http/Controllers/IntegrationSettingsController.php:21`

**Example**

```php
add_filter('fluent_booking/get_integration_field_settings_', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookinggetintegrationmergefields"></a>

## `fluent_booking/get_integration_merge_fields_`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 2

**Source locations**

- `fluent-booking/app/Http/Controllers/CalendarIntegrationController.php:130`
- `fluent-booking/app/Services/Integrations/CalendarIntegrationService.php:38`

**Example**

```php
add_filter('fluent_booking/get_integration_merge_fields_', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookinggetintegrationsettings"></a>

## `fluent_booking/get_integration_settings_`

- **Type:** filter
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1

**Source locations**

- `fluent-booking-pro/app/Http/Controllers/IntegrationSettingsController.php:19`

**Example**

```php
add_filter('fluent_booking/get_integration_settings_', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookinggetintegrationsettingsfields"></a>

## `fluent_booking/get_integration_settings_fields_`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Services/Integrations/CalendarIntegrationService.php:54`

**Example**

```php
add_filter('fluent_booking/get_integration_settings_fields_', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookinggetintegrationvalues"></a>

## `fluent_booking/get_integration_values_`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Services/Integrations/CalendarIntegrationService.php:36`

**Example**

```php
add_filter('fluent_booking/get_integration_values_', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookinggetpaymentconnectinfo"></a>

## `fluent_booking/get_payment_connect_info_`

- **Type:** filter
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1

**Source locations**

- `fluent-booking-pro/app/Hooks/Handlers/GlobalPaymentHandler.php:100`

**Example**

```php
add_filter('fluent_booking/get_payment_connect_info_', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookinggetpaymentsettingsdisconnect"></a>

## `fluent_booking/get_payment_settings_disconnect_`

- **Type:** filter
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1

**Source locations**

- `fluent-booking-pro/app/Hooks/Handlers/GlobalPaymentHandler.php:105`

**Example**

```php
add_filter('fluent_booking/get_payment_settings_disconnect_', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookinggoogleadditionalsettingfields"></a>

## `fluent_booking/google_additional_setting_fields`

- **Type:** filter
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1

**Source locations**

- `fluent-booking-pro/app/Services/Integrations/Calendars/Google/Bootstrap.php:980`

**Example**

```php
add_filter('fluent_booking/google_additional_setting_fields', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookinggoogleeventdata"></a>

## `fluent_booking/google_event_data`

- **Type:** filter
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1

**Source locations**

- `fluent-booking-pro/app/Services/Integrations/Calendars/Google/Bootstrap.php:423`

**Example**

```php
add_filter('fluent_booking/google_event_data', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingoutlookadditionalsettingfields"></a>

## `fluent_booking/outlook_additional_setting_fields`

- **Type:** filter
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1

**Source locations**

- `fluent-booking-pro/app/Services/Integrations/Calendars/Outlook/Bootstrap.php:919`

**Example**

```php
add_filter('fluent_booking/outlook_additional_setting_fields', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingoutlookappcredentials"></a>

## `fluent_booking/outlook_app_credentials`

- **Type:** filter
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1

**Source locations**

- `fluent-booking-pro/app/Services/Integrations/Calendars/Outlook/OutlookHelper.php:13`

**Example**

```php
add_filter('fluent_booking/outlook_app_credentials', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingoutlookappredirecturl"></a>

## `fluent_booking/outlook_app_redirect_url`

- **Type:** filter
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1

**Source locations**

- `fluent-booking-pro/app/Services/Integrations/Calendars/Outlook/OutlookHelper.php:142`

**Example**

```php
add_filter('fluent_booking/outlook_app_redirect_url', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingoutlookeventdata"></a>

## `fluent_booking/outlook_event_data`

- **Type:** filter
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1

**Source locations**

- `fluent-booking-pro/app/Services/Integrations/Calendars/Outlook/Bootstrap.php:480`

**Example**

```php
add_filter('fluent_booking/outlook_event_data', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingoutlookrefreshtokenurl"></a>

## `fluent_booking/outlook_refresh_token_url`

- **Type:** filter
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1

**Source locations**

- `fluent-booking-pro/app/Services/Integrations/Calendars/Outlook/Client.php:28`

**Example**

```php
add_filter('fluent_booking/outlook_refresh_token_url', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingoutlookrevokeurl"></a>

## `fluent_booking/outlook_revoke_url`

- **Type:** filter
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1

**Source locations**

- `fluent-booking-pro/app/Services/Integrations/Calendars/Outlook/Client.php:27`

**Example**

```php
add_filter('fluent_booking/outlook_revoke_url', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingoutlooktokenurl"></a>

## `fluent_booking/outlook_token_url`

- **Type:** filter
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1

**Source locations**

- `fluent-booking-pro/app/Services/Integrations/Calendars/Outlook/Client.php:26`

**Example**

```php
add_filter('fluent_booking/outlook_token_url', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```
