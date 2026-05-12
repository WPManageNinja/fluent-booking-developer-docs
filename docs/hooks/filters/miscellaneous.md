---
title: Miscellaneous Filters
description: Hooks that did not match a more specific filter category.
---

# Miscellaneous Filters

Hooks that did not match a more specific filter category.

69 unique filter hooks currently map to this category, across 79 call sites.

## Hook Inventory

| Hook | Edition | Call Sites | First Source |
| --- | --- | --- | --- |
| [`fluent_boards/login_header`](#fluentboardsloginheader) | <span class="pro-badge">PRO</span> | 1 | `fluent-booking-pro/app/Hooks/Handlers/FrontendRenderer.php:303` |
| [`fluent_booking/custom_fields_types`](#fluentbookingcustomfieldstypes) | Core | 1 | `fluent-booking/app/Services/Helper.php:1603` |
| [`fluent_booking/get_client_field_settings_`](#fluentbookinggetclientfieldsettings) | Core | 1 | `fluent-booking/app/Http/Controllers/IntegrationController.php:14` |
| [`fluent_booking/get_client_settings_`](#fluentbookinggetclientsettings) | Core | 1 | `fluent-booking/app/Http/Controllers/IntegrationController.php:13` |
| [`fluent_booking/global_modules`](#fluentbookingglobalmodules) | Core | 1 | `fluent-booking/app/Services/GlobalModules/GlobalModules.php:36` |
| [`fluent_booking/global_notification_active_types`](#fluentbookingglobalnotificationactivetypes) | Core | 1 | `fluent-booking/app/Hooks/Handlers/GlobalNotificationHandler.php:83` |
| [`fluent_booking/global_notification_feed_`](#fluentbookingglobalnotificationfeed) | Core | 1 | `fluent-booking/app/Services/Integrations/CalendarIntegrationService.php:171` |
| [`fluent_booking/global_notification_types`](#fluentbookingglobalnotificationtypes) | Core | 1 | `fluent-booking/app/Services/Integrations/CalendarIntegrationService.php:145` |
| [`fluent_booking/has_all_calendar_access`](#fluentbookinghasallcalendaraccess) | Core | 1 | `fluent-booking/app/Services/PermissionManager.php:34` |
| [`fluent_booking/has_calendar_access`](#fluentbookinghascalendaraccess) | Core | 1 | `fluent-booking/app/Services/PermissionManager.php:102` |
| [`fluent_booking/host_view_page_vars`](#fluentbookinghostviewpagevars) | Core | 1 | `fluent-booking/app/Services/LandingPage/LandingPageHandler.php:183` |
| [`fluent_booking/i18n_date_time_config`](#fluentbookingi18ndatetimeconfig) | Core | 1 | `fluent-booking/app/Services/DateTimeHelper.php:408` |
| [`fluent_booking/initialize_booking_data`](#fluentbookinginitializebookingdata) | Core | 2 | `fluent-booking/app/Hooks/Handlers/FrontEndHandler.php:845` |
| [`fluent_booking/is_new`](#fluentbookingisnew) | Core | 1 | `fluent-booking/app/Hooks/Handlers/AdminMenuHandler.php:445` |
| [`fluent_booking/is_rtl`](#fluentbookingisrtl) | Core | 1 | `fluent-booking/app/Services/Helper.php:2288` |
| [`fluent_booking/local_booked_events`](#fluentbookinglocalbookedevents) | Core | 1 | `fluent-booking/app/Services/TimeSlotService.php:292` |
| [`fluent_booking/location_details_html`](#fluentbookinglocationdetailshtml) | Core | 1 | `fluent-booking/app/Models/Booking.php:473` |
| [`fluent_booking/location_details_text`](#fluentbookinglocationdetailstext) | Core | 1 | `fluent-booking/app/Models/Booking.php:499` |
| [`fluent_booking/location_icon_heading_html`](#fluentbookinglocationiconheadinghtml) | Core | 1 | `fluent-booking/app/Services/LocationService.php:73` |
| [`fluent_booking/meeting_bookmarks`](#fluentbookingmeetingbookmarks) | Core | 1 | `fluent-booking/app/Models/Booking.php:1287` |
| [`fluent_booking/meeting_durations_schema`](#fluentbookingmeetingdurationsschema) | Core | 1 | `fluent-booking/app/Services/Helper.php:1251` |
| [`fluent_booking/meeting_multi_durations_schema`](#fluentbookingmeetingmultidurationsschema) | Core | 1 | `fluent-booking/app/Services/Helper.php:1277` |
| [`fluent_booking/notifying_async_`](#fluentbookingnotifyingasync) | Core | 1 | `fluent-booking/app/Hooks/Handlers/GlobalNotificationHandler.php:113` |
| [`fluent_booking/override_select_times_schema`](#fluentbookingoverrideselecttimesschema) | Core | 1 | `fluent-booking/app/Services/Helper.php:1550` |
| [`fluent_booking/payment_booking_field`](#fluentbookingpaymentbookingfield) | Core | 1 | `fluent-booking/app/Services/BookingFieldService.php:229` |
| [`fluent_booking/payment_receipt_html`](#fluentbookingpaymentreceipthtml) | Core | 2 | `fluent-booking/app/Hooks/Handlers/FrontEndHandler.php:416` |
| [`fluent_booking/process_paypal_ipn_data`](#fluentbookingprocesspaypalipndata) | <span class="pro-badge">PRO</span> | 1 | `fluent-booking-pro/app/Services/Integrations/PaymentMethods/Paypal/API/IPN.php:54` |
| [`fluent_booking/public_ajax_ratelimit`](#fluentbookingpublicajaxratelimit) | Core | 1 | `fluent-booking/app/Hooks/Handlers/FrontEndHandler.php:1199` |
| [`fluent_booking/public_event_settings_keys`](#fluentbookingpubliceventsettingskeys) | Core | 1 | `fluent-booking/app/Hooks/Handlers/FrontEndHandler.php:1120` |
| [`fluent_booking/public_event_vars`](#fluentbookingpubliceventvars) | Core | 1 | `fluent-booking/app/Hooks/Handlers/FrontEndHandler.php:1063` |
| [`fluent_booking/recurring_default_occurrence`](#fluentbookingrecurringdefaultoccurrence) | <span class="pro-badge">PRO</span> | 1 | `fluent-booking-pro/app/Hooks/Handlers/RecurringEventHandler.php:131` |
| [`fluent_booking/remote_booked_events`](#fluentbookingremotebookedevents) | Core | 1 | `fluent-booking/app/Services/TimeSlotService.php:294` |
| [`fluent_booking/remote_calendar_connection_feeds`](#fluentbookingremotecalendarconnectionfeeds) | <span class="pro-badge">PRO</span> | 1 | `fluent-booking-pro/app/Http/Controllers/IntegrationSettingsController.php:96` |
| [`fluent_booking/remote_calendar_providers`](#fluentbookingremotecalendarproviders) | <span class="pro-badge">PRO</span> | 1 | `fluent-booking-pro/app/Http/Controllers/IntegrationSettingsController.php:95` |
| [`fluent_booking/save_event_booking_field_`](#fluentbookingsaveeventbookingfield) | Core | 1 | `fluent-booking/app/Http/Controllers/CalendarController.php:898` |
| [`fluent_booking/save_integration_settings_`](#fluentbookingsaveintegrationsettings) | Core | 1 | `fluent-booking/app/Services/Integrations/CalendarIntegrationService.php:120` |
| [`fluent_booking/save_integration_value_`](#fluentbookingsaveintegrationvalue) | Core | 1 | `fluent-booking/app/Services/Integrations/CalendarIntegrationService.php:92` |
| [`fluent_booking/schedule_custom_field_data`](#fluentbookingschedulecustomfielddata) | Core | 2 | `fluent-booking/app/Hooks/Handlers/FrontEndHandler.php:808` |
| [`fluent_booking/schedule_receipt_data`](#fluentbookingschedulereceiptdata) | Core | 1 | `fluent-booking/app/Services/BookingService.php:431` |
| [`fluent_booking/schedule_validation_rules_data`](#fluentbookingschedulevalidationrulesdata) | Core | 2 | `fluent-booking/app/Hooks/Handlers/FrontEndHandler.php:793` |
| [`fluent_booking/settings_menu_items`](#fluentbookingsettingsmenuitems) | Core | 1 | `fluent-booking/app/Hooks/Handlers/AdminMenuHandler.php:489` |
| [`fluent_booking/skip_no_conflict`](#fluentbookingskipnoconflict) | Core | 2 | `fluent-booking/app/Hooks/Handlers/AdminMenuHandler.php:198` |
| [`fluent_booking/slot_intervals_schema`](#fluentbookingslotintervalsschema) | Core | 1 | `fluent-booking/app/Services/Helper.php:1418` |
| [`fluent_booking/slot_slug`](#fluentbookingslotslug) | Core | 1 | `fluent-booking/app/Services/Helper.php:952` |
| [`fluent_booking/supported_featured`](#fluentbookingsupportedfeatured) | Core | 1 | `fluent-booking/app/Hooks/Handlers/AdminMenuHandler.php:399` |
| [`fluent_booking/total_payment_widget`](#fluentbookingtotalpaymentwidget) | Core | 1 | `fluent-booking/app/Http/Controllers/ReportController.php:66` |
| [`fluent_booking/update_advanced_settings_validation_rule`](#fluentbookingupdateadvancedsettingsvalidationrule) | <span class="pro-badge">PRO</span> | 1 | `fluent-booking-pro/app/Http/Controllers/CalendarController.php:68` |
| [`fluent_booking/update_coupon_data`](#fluentbookingupdatecoupondata) | <span class="pro-badge">PRO</span> | 1 | `fluent-booking-pro/app/Modules/Coupon/Http/Controllers/CouponController.php:115` |
| [`fluent_booking/update_event_details_validation_rule`](#fluentbookingupdateeventdetailsvalidationrule) | Core | 1 | `fluent-booking/app/Http/Controllers/CalendarController.php:579` |
| [`fluent_booking/update_recurring_settings_validation_rule`](#fluentbookingupdaterecurringsettingsvalidationrule) | <span class="pro-badge">PRO</span> | 1 | `fluent-booking-pro/app/Http/Controllers/CalendarController.php:157` |
| [`fluent_booking/upload_folder_name`](#fluentbookinguploadfoldername) | Core | 2 | `fluent-booking/app/Services/Libs/FileSystem.php:28` |
| [`fluent_booking/user_ip`](#fluentbookinguserip) | Core | 1 | `fluent-booking/app/Services/Helper.php:1001` |
| [`fluent_booking/user_search_meta_query_arguments`](#fluentbookingusersearchmetaqueryarguments) | Core | 1 | `fluent-booking/app/Http/Controllers/AdminController.php:55` |
| [`fluent_booking/validate_coupon_data`](#fluentbookingvalidatecoupondata) | <span class="pro-badge">PRO</span> | 2 | `fluent-booking-pro/app/Modules/Coupon/CouponModule.php:69` |
| [`fluent_booking/verfied_email_senders`](#fluentbookingverfiedemailsenders) | Core | 1 | `fluent-booking/app/Services/Helper.php:2235` |
| [`fluent_booking/verify_calendar_api`](#fluentbookingverifycalendarapi) | Core | 1 | `fluent-booking/app/Http/Policies/CalendarPolicy.php:27` |
| [`fluent_booking/verify_save_caldav_credential_`](#fluentbookingverifysavecaldavcredential) | <span class="pro-badge">PRO</span> | 1 | `fluent-booking-pro/app/Http/Controllers/IntegrationSettingsController.php:163` |
| [`fluent_booking/week_select_times_schema`](#fluentbookingweekselecttimesschema) | Core | 1 | `fluent-booking/app/Services/Helper.php:1541` |
| [`fluent_booking/weekly_schedule_schema`](#fluentbookingweeklyscheduleschema) | Core | 1 | `fluent-booking/app/Services/Helper.php:1559` |
| [`fluent_booking/will_parse_redirect_url_value`](#fluentbookingwillparseredirecturlvalue) | Core | 1 | `fluent-booking/app/Models/Booking.php:896` |
| [`fluent_booking/will_refresh_woo_cart`](#fluentbookingwillrefreshwoocart) | <span class="pro-badge">PRO</span> | 1 | `fluent-booking-pro/app/Services/Integrations/Woo/Bootstrap.php:42` |
| [`fluent_booking/zero_decimal_currencies`](#fluentbookingzerodecimalcurrencies) | Core | 1 | `fluent-booking/app/Services/CurrenciesHelper.php:414` |
| [`fluent_booking/zoom_meeting_data`](#fluentbookingzoommeetingdata) | <span class="pro-badge">PRO</span> | 1 | `fluent-booking-pro/app/Services/Integrations/ZoomMeeting/Bootstrap.php:130` |
| [`fluent_calendar/global_booking_vars`](#fluentcalendarglobalbookingvars) | Core | 1 | `fluent-booking/app/Hooks/Handlers/FrontEndHandler.php:697` |
| [`fluent_calender/auto_booking_fluent_crm_sync`](#fluentcalenderautobookingfluentcrmsync) | Core | 1 | `fluent-booking/app/Models/Booking.php:85` |
| [`fluent_sl/api_request_query_params`](#fluentslapirequestqueryparams) | <span class="pro-badge">PRO</span> | 1 | `fluent-booking-pro/app/Services/PluginManager/PluginUpdater.php:234` |
| [`fluent_sl/updater_payload_`](#fluentslupdaterpayload) | <span class="pro-badge">PRO</span> | 1 | `fluent-booking-pro/app/Services/PluginManager/PluginUpdater.php:251` |
| [`fluentcrm_funnel_will_process_`](#fluentcrmfunnelwillprocess) | Core | 4 | `fluent-booking/app/Services/Integrations/FluentCRM/BookingCompletedTrigger.php:103` |
| [`fluentform/rendering_field_html_`](#fluentformrenderingfieldhtml) | Core | 1 | `fluent-booking/app/Services/Integrations/FluentForms/BookingElement.php:192` |

<a id="fluentboardsloginheader"></a>

## `fluent_boards/login_header`

- **Type:** filter
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1

**Source locations**

- `fluent-booking-pro/app/Hooks/Handlers/FrontendRenderer.php:303`

**Example**

```php
add_filter('fluent_boards/login_header', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingcustomfieldstypes"></a>

## `fluent_booking/custom_fields_types`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Services/Helper.php:1603`

**Example**

```php
add_filter('fluent_booking/custom_fields_types', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookinggetclientfieldsettings"></a>

## `fluent_booking/get_client_field_settings_`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Http/Controllers/IntegrationController.php:14`

**Example**

```php
add_filter('fluent_booking/get_client_field_settings_', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookinggetclientsettings"></a>

## `fluent_booking/get_client_settings_`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Http/Controllers/IntegrationController.php:13`

**Example**

```php
add_filter('fluent_booking/get_client_settings_', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingglobalmodules"></a>

## `fluent_booking/global_modules`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Services/GlobalModules/GlobalModules.php:36`

**Example**

```php
add_filter('fluent_booking/global_modules', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingglobalnotificationactivetypes"></a>

## `fluent_booking/global_notification_active_types`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Hooks/Handlers/GlobalNotificationHandler.php:83`

**Example**

```php
add_filter('fluent_booking/global_notification_active_types', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingglobalnotificationfeed"></a>

## `fluent_booking/global_notification_feed_`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Services/Integrations/CalendarIntegrationService.php:171`

**Example**

```php
add_filter('fluent_booking/global_notification_feed_', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingglobalnotificationtypes"></a>

## `fluent_booking/global_notification_types`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Services/Integrations/CalendarIntegrationService.php:145`

**Example**

```php
add_filter('fluent_booking/global_notification_types', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookinghasallcalendaraccess"></a>

## `fluent_booking/has_all_calendar_access`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Services/PermissionManager.php:34`

**Example**

```php
add_filter('fluent_booking/has_all_calendar_access', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookinghascalendaraccess"></a>

## `fluent_booking/has_calendar_access`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Services/PermissionManager.php:102`

**Example**

```php
add_filter('fluent_booking/has_calendar_access', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookinghostviewpagevars"></a>

## `fluent_booking/host_view_page_vars`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Services/LandingPage/LandingPageHandler.php:183`

**Example**

```php
add_filter('fluent_booking/host_view_page_vars', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingi18ndatetimeconfig"></a>

## `fluent_booking/i18n_date_time_config`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Services/DateTimeHelper.php:408`

**Example**

```php
add_filter('fluent_booking/i18n_date_time_config', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookinginitializebookingdata"></a>

## `fluent_booking/initialize_booking_data`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 2

**Source locations**

- `fluent-booking/app/Hooks/Handlers/FrontEndHandler.php:845`
- `fluent-booking/app/Http/Controllers/BookingController.php:156`

**Example**

```php
add_filter('fluent_booking/initialize_booking_data', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingisnew"></a>

## `fluent_booking/is_new`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Hooks/Handlers/AdminMenuHandler.php:445`

**Example**

```php
add_filter('fluent_booking/is_new', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingisrtl"></a>

## `fluent_booking/is_rtl`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Services/Helper.php:2288`

**Example**

```php
add_filter('fluent_booking/is_rtl', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookinglocalbookedevents"></a>

## `fluent_booking/local_booked_events`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Services/TimeSlotService.php:292`

**Example**

```php
add_filter('fluent_booking/local_booked_events', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookinglocationdetailshtml"></a>

## `fluent_booking/location_details_html`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Models/Booking.php:473`

**Example**

```php
add_filter('fluent_booking/location_details_html', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookinglocationdetailstext"></a>

## `fluent_booking/location_details_text`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Models/Booking.php:499`

**Example**

```php
add_filter('fluent_booking/location_details_text', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookinglocationiconheadinghtml"></a>

## `fluent_booking/location_icon_heading_html`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Services/LocationService.php:73`

**Example**

```php
add_filter('fluent_booking/location_icon_heading_html', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingmeetingbookmarks"></a>

## `fluent_booking/meeting_bookmarks`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Models/Booking.php:1287`

**Example**

```php
add_filter('fluent_booking/meeting_bookmarks', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingmeetingdurationsschema"></a>

## `fluent_booking/meeting_durations_schema`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Services/Helper.php:1251`

**Example**

```php
add_filter('fluent_booking/meeting_durations_schema', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingmeetingmultidurationsschema"></a>

## `fluent_booking/meeting_multi_durations_schema`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Services/Helper.php:1277`

**Example**

```php
add_filter('fluent_booking/meeting_multi_durations_schema', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingnotifyingasync"></a>

## `fluent_booking/notifying_async_`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Hooks/Handlers/GlobalNotificationHandler.php:113`

**Example**

```php
add_filter('fluent_booking/notifying_async_', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingoverrideselecttimesschema"></a>

## `fluent_booking/override_select_times_schema`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Services/Helper.php:1550`

**Example**

```php
add_filter('fluent_booking/override_select_times_schema', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingpaymentbookingfield"></a>

## `fluent_booking/payment_booking_field`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Services/BookingFieldService.php:229`

**Example**

```php
add_filter('fluent_booking/payment_booking_field', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingpaymentreceipthtml"></a>

## `fluent_booking/payment_receipt_html`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 2

**Source locations**

- `fluent-booking/app/Hooks/Handlers/FrontEndHandler.php:416`
- `fluent-booking/app/Services/EditorShortCodeParser.php:365`

**Example**

```php
add_filter('fluent_booking/payment_receipt_html', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingprocesspaypalipndata"></a>

## `fluent_booking/process_paypal_ipn_data`

- **Type:** filter
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1

**Source locations**

- `fluent-booking-pro/app/Services/Integrations/PaymentMethods/Paypal/API/IPN.php:54`

**Example**

```php
add_filter('fluent_booking/process_paypal_ipn_data', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingpublicajaxratelimit"></a>

## `fluent_booking/public_ajax_ratelimit`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Hooks/Handlers/FrontEndHandler.php:1199`

**Example**

```php
add_filter('fluent_booking/public_ajax_ratelimit', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingpubliceventsettingskeys"></a>

## `fluent_booking/public_event_settings_keys`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Hooks/Handlers/FrontEndHandler.php:1120`

**Example**

```php
add_filter('fluent_booking/public_event_settings_keys', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingpubliceventvars"></a>

## `fluent_booking/public_event_vars`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Hooks/Handlers/FrontEndHandler.php:1063`

**Example**

```php
add_filter('fluent_booking/public_event_vars', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingrecurringdefaultoccurrence"></a>

## `fluent_booking/recurring_default_occurrence`

- **Type:** filter
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1

**Source locations**

- `fluent-booking-pro/app/Hooks/Handlers/RecurringEventHandler.php:131`

**Example**

```php
add_filter('fluent_booking/recurring_default_occurrence', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingremotebookedevents"></a>

## `fluent_booking/remote_booked_events`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Services/TimeSlotService.php:294`

**Example**

```php
add_filter('fluent_booking/remote_booked_events', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingremotecalendarconnectionfeeds"></a>

## `fluent_booking/remote_calendar_connection_feeds`

- **Type:** filter
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1

**Source locations**

- `fluent-booking-pro/app/Http/Controllers/IntegrationSettingsController.php:96`

**Example**

```php
add_filter('fluent_booking/remote_calendar_connection_feeds', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingremotecalendarproviders"></a>

## `fluent_booking/remote_calendar_providers`

- **Type:** filter
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1

**Source locations**

- `fluent-booking-pro/app/Http/Controllers/IntegrationSettingsController.php:95`

**Example**

```php
add_filter('fluent_booking/remote_calendar_providers', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingsaveeventbookingfield"></a>

## `fluent_booking/save_event_booking_field_`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Http/Controllers/CalendarController.php:898`

**Example**

```php
add_filter('fluent_booking/save_event_booking_field_', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingsaveintegrationsettings"></a>

## `fluent_booking/save_integration_settings_`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Services/Integrations/CalendarIntegrationService.php:120`

**Example**

```php
add_filter('fluent_booking/save_integration_settings_', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingsaveintegrationvalue"></a>

## `fluent_booking/save_integration_value_`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Services/Integrations/CalendarIntegrationService.php:92`

**Example**

```php
add_filter('fluent_booking/save_integration_value_', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingschedulecustomfielddata"></a>

## `fluent_booking/schedule_custom_field_data`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 2

**Source locations**

- `fluent-booking/app/Hooks/Handlers/FrontEndHandler.php:808`
- `fluent-booking/app/Http/Controllers/BookingController.php:140`

**Example**

```php
add_filter('fluent_booking/schedule_custom_field_data', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingschedulereceiptdata"></a>

## `fluent_booking/schedule_receipt_data`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Services/BookingService.php:431`

**Example**

```php
add_filter('fluent_booking/schedule_receipt_data', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingschedulevalidationrulesdata"></a>

## `fluent_booking/schedule_validation_rules_data`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 2

**Source locations**

- `fluent-booking/app/Hooks/Handlers/FrontEndHandler.php:793`
- `fluent-booking/app/Http/Controllers/BookingController.php:123`

**Example**

```php
add_filter('fluent_booking/schedule_validation_rules_data', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingsettingsmenuitems"></a>

## `fluent_booking/settings_menu_items`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Hooks/Handlers/AdminMenuHandler.php:489`

**Example**

```php
add_filter('fluent_booking/settings_menu_items', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingskipnoconflict"></a>

## `fluent_booking/skip_no_conflict`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 2

**Source locations**

- `fluent-booking/app/Hooks/Handlers/AdminMenuHandler.php:198`
- `fluent-booking/app/Hooks/Handlers/AdminMenuHandler.php:239`

**Example**

```php
add_filter('fluent_booking/skip_no_conflict', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingslotintervalsschema"></a>

## `fluent_booking/slot_intervals_schema`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Services/Helper.php:1418`

**Example**

```php
add_filter('fluent_booking/slot_intervals_schema', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingslotslug"></a>

## `fluent_booking/slot_slug`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Services/Helper.php:952`

**Example**

```php
add_filter('fluent_booking/slot_slug', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingsupportedfeatured"></a>

## `fluent_booking/supported_featured`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Hooks/Handlers/AdminMenuHandler.php:399`

**Example**

```php
add_filter('fluent_booking/supported_featured', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingtotalpaymentwidget"></a>

## `fluent_booking/total_payment_widget`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Http/Controllers/ReportController.php:66`

**Example**

```php
add_filter('fluent_booking/total_payment_widget', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingupdateadvancedsettingsvalidationrule"></a>

## `fluent_booking/update_advanced_settings_validation_rule`

- **Type:** filter
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1

**Source locations**

- `fluent-booking-pro/app/Http/Controllers/CalendarController.php:68`

**Example**

```php
add_filter('fluent_booking/update_advanced_settings_validation_rule', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingupdatecoupondata"></a>

## `fluent_booking/update_coupon_data`

- **Type:** filter
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1

**Source locations**

- `fluent-booking-pro/app/Modules/Coupon/Http/Controllers/CouponController.php:115`

**Example**

```php
add_filter('fluent_booking/update_coupon_data', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingupdateeventdetailsvalidationrule"></a>

## `fluent_booking/update_event_details_validation_rule`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Http/Controllers/CalendarController.php:579`

**Example**

```php
add_filter('fluent_booking/update_event_details_validation_rule', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingupdaterecurringsettingsvalidationrule"></a>

## `fluent_booking/update_recurring_settings_validation_rule`

- **Type:** filter
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1

**Source locations**

- `fluent-booking-pro/app/Http/Controllers/CalendarController.php:157`

**Example**

```php
add_filter('fluent_booking/update_recurring_settings_validation_rule', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookinguploadfoldername"></a>

## `fluent_booking/upload_folder_name`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 2

**Source locations**

- `fluent-booking/app/Services/Libs/FileSystem.php:28`
- `fluent-booking/app/Services/Libs/FileSystem.php:116`

**Example**

```php
add_filter('fluent_booking/upload_folder_name', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookinguserip"></a>

## `fluent_booking/user_ip`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Services/Helper.php:1001`

**Example**

```php
add_filter('fluent_booking/user_ip', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingusersearchmetaqueryarguments"></a>

## `fluent_booking/user_search_meta_query_arguments`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Http/Controllers/AdminController.php:55`

**Example**

```php
add_filter('fluent_booking/user_search_meta_query_arguments', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingvalidatecoupondata"></a>

## `fluent_booking/validate_coupon_data`

- **Type:** filter
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 2

**Source locations**

- `fluent-booking-pro/app/Modules/Coupon/CouponModule.php:69`
- `fluent-booking-pro/app/Modules/Coupon/CouponModule.php:140`

**Example**

```php
add_filter('fluent_booking/validate_coupon_data', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingverfiedemailsenders"></a>

## `fluent_booking/verfied_email_senders`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Services/Helper.php:2235`

**Example**

```php
add_filter('fluent_booking/verfied_email_senders', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingverifycalendarapi"></a>

## `fluent_booking/verify_calendar_api`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Http/Policies/CalendarPolicy.php:27`

**Example**

```php
add_filter('fluent_booking/verify_calendar_api', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingverifysavecaldavcredential"></a>

## `fluent_booking/verify_save_caldav_credential_`

- **Type:** filter
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1

**Source locations**

- `fluent-booking-pro/app/Http/Controllers/IntegrationSettingsController.php:163`

**Example**

```php
add_filter('fluent_booking/verify_save_caldav_credential_', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingweekselecttimesschema"></a>

## `fluent_booking/week_select_times_schema`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Services/Helper.php:1541`

**Example**

```php
add_filter('fluent_booking/week_select_times_schema', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingweeklyscheduleschema"></a>

## `fluent_booking/weekly_schedule_schema`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Services/Helper.php:1559`

**Example**

```php
add_filter('fluent_booking/weekly_schedule_schema', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingwillparseredirecturlvalue"></a>

## `fluent_booking/will_parse_redirect_url_value`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Models/Booking.php:896`

**Example**

```php
add_filter('fluent_booking/will_parse_redirect_url_value', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingwillrefreshwoocart"></a>

## `fluent_booking/will_refresh_woo_cart`

- **Type:** filter
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1

**Source locations**

- `fluent-booking-pro/app/Services/Integrations/Woo/Bootstrap.php:42`

**Example**

```php
add_filter('fluent_booking/will_refresh_woo_cart', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingzerodecimalcurrencies"></a>

## `fluent_booking/zero_decimal_currencies`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Services/CurrenciesHelper.php:414`

**Example**

```php
add_filter('fluent_booking/zero_decimal_currencies', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingzoommeetingdata"></a>

## `fluent_booking/zoom_meeting_data`

- **Type:** filter
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1

**Source locations**

- `fluent-booking-pro/app/Services/Integrations/ZoomMeeting/Bootstrap.php:130`

**Example**

```php
add_filter('fluent_booking/zoom_meeting_data', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentcalendarglobalbookingvars"></a>

## `fluent_calendar/global_booking_vars`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Hooks/Handlers/FrontEndHandler.php:697`

**Example**

```php
add_filter('fluent_calendar/global_booking_vars', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentcalenderautobookingfluentcrmsync"></a>

## `fluent_calender/auto_booking_fluent_crm_sync`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Models/Booking.php:85`

**Example**

```php
add_filter('fluent_calender/auto_booking_fluent_crm_sync', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentslapirequestqueryparams"></a>

## `fluent_sl/api_request_query_params`

- **Type:** filter
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1

**Source locations**

- `fluent-booking-pro/app/Services/PluginManager/PluginUpdater.php:234`

**Example**

```php
add_filter('fluent_sl/api_request_query_params', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentslupdaterpayload"></a>

## `fluent_sl/updater_payload_`

- **Type:** filter
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1

**Source locations**

- `fluent-booking-pro/app/Services/PluginManager/PluginUpdater.php:251`

**Example**

```php
add_filter('fluent_sl/updater_payload_', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentcrmfunnelwillprocess"></a>

## `fluentcrm_funnel_will_process_`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 4

**Source locations**

- `fluent-booking/app/Services/Integrations/FluentCRM/BookingCompletedTrigger.php:103`
- `fluent-booking/app/Services/Integrations/FluentCRM/BookingRescheduledTrigger.php:103`
- `fluent-booking/app/Services/Integrations/FluentCRM/CancelBookingTrigger.php:105`
- `fluent-booking/app/Services/Integrations/FluentCRM/NewBookingTrigger.php:103`

**Example**

```php
add_filter('fluentcrm_funnel_will_process_', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentformrenderingfieldhtml"></a>

## `fluentform/rendering_field_html_`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Services/Integrations/FluentForms/BookingElement.php:192`

**Example**

```php
add_filter('fluentform/rendering_field_html_', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```
