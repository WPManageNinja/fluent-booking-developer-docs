---
title: Miscellaneous Filters
description: Hooks that did not match a more specific filter category.
---

# Miscellaneous Filters

Hooks that did not match a more specific filter category.

88 unique filter hooks currently map to this category, across 103 call sites.

## Hook Inventory

| Hook | Edition | Call Sites | First Source |
| --- | --- | --- | --- |
| [`fluent_booking/allow_share_stats`](#fluentbookingallowsharestats) | Core | 1 | `fluent-booking/app/Hooks/Scheduler/DailyScheduler.php:61` |
| [`fluent_booking/custom_fields_types`](#fluentbookingcustomfieldstypes) | Core | 1 | `fluent-booking/app/Services/Helper.php:1668` |
| [`fluent_booking/enforce_phone_validation`](#fluentbookingenforcephonevalidation) | Core | 1 | `fluent-booking/app/Services/Helper.php:1051` |
| [`fluent_booking/get_client_field_settings_`](#fluentbookinggetclientfieldsettings) | Core | 1 | `fluent-booking/app/Http/Controllers/IntegrationController.php:14` |
| [`fluent_booking/get_client_settings_`](#fluentbookinggetclientsettings) | Core | 1 | `fluent-booking/app/Http/Controllers/IntegrationController.php:13` |
| [`fluent_booking/global_modules`](#fluentbookingglobalmodules) | Core | 1 | `fluent-booking/app/Services/GlobalModules/GlobalModules.php:36` |
| [`fluent_booking/global_notification_active_types`](#fluentbookingglobalnotificationactivetypes) | Core | 1 | `fluent-booking/app/Hooks/Handlers/GlobalNotificationHandler.php:83` |
| [`fluent_booking/global_notification_feed_`](#fluentbookingglobalnotificationfeed) | Core | 1 | `fluent-booking/app/Services/Integrations/CalendarIntegrationService.php:179` |
| [`fluent_booking/global_notification_types`](#fluentbookingglobalnotificationtypes) | Core | 1 | `fluent-booking/app/Services/Integrations/CalendarIntegrationService.php:153` |
| [`fluent_booking/has_all_calendar_access`](#fluentbookinghasallcalendaraccess) | Core | 1 | `fluent-booking/app/Services/PermissionManager.php:34` |
| [`fluent_booking/has_calendar_access`](#fluentbookinghascalendaraccess) | Core | 1 | `fluent-booking/app/Services/PermissionManager.php:123` |
| [`fluent_booking/host_view_page_vars`](#fluentbookinghostviewpagevars) | Core | 1 | `fluent-booking/app/Services/LandingPage/LandingPageHandler.php:183` |
| [`fluent_booking/i18n_date_time_config`](#fluentbookingi18ndatetimeconfig) | Core | 1 | `fluent-booking/app/Services/DateTimeHelper.php:400` |
| [`fluent_booking/initialize_booking_data`](#fluentbookinginitializebookingdata) | Core | 2 | `fluent-booking/app/Hooks/Handlers/FrontEndHandler.php:722` |
| [`fluent_booking/is_new`](#fluentbookingisnew) | Core | 1 | `fluent-booking/app/Hooks/Handlers/AdminMenuHandler.php:562` |
| [`fluent_booking/is_rtl`](#fluentbookingisrtl) | Core | 1 | `fluent-booking/app/Services/Helper.php:2354` |
| [`fluent_booking/license_grace_period_days`](#fluentbookinglicensegraceperioddays) | <span class="pro-badge">PRO</span> | 1 | `fluent-booking-pro/app/Http/Controllers/LicenseController.php:137` |
| [`fluent_booking/local_booked_events`](#fluentbookinglocalbookedevents) | Core | 1 | `fluent-booking/app/Services/TimeSlotService.php:303` |
| [`fluent_booking/location_details_html`](#fluentbookinglocationdetailshtml) | Core | 1 | `fluent-booking/app/Models/Booking.php:508` |
| [`fluent_booking/location_details_text`](#fluentbookinglocationdetailstext) | Core | 1 | `fluent-booking/app/Models/Booking.php:534` |
| [`fluent_booking/location_icon_heading_html`](#fluentbookinglocationiconheadinghtml) | Core | 1 | `fluent-booking/app/Services/LocationService.php:73` |
| [`fluent_booking/login_header`](#fluentbookingloginheader) | <span class="pro-badge">PRO</span> | 1 | `fluent-booking-pro/app/Hooks/Handlers/FrontendRenderer.php:336` |
| [`fluent_booking/max_booking_duration_minutes`](#fluentbookingmaxbookingdurationminutes) | Core | 1 | `fluent-booking/app/Services/TimeSlotService.php:281` |
| [`fluent_booking/mcp_ability_names`](#fluentbookingmcpabilitynames) | Core | 2 | `fluent-booking/app/Modules/MCP/MCPInit.php:111` |
| [`fluent_booking/mcp_booking_full`](#fluentbookingmcpbookingfull) | Core | 1 | `fluent-booking/app/Modules/MCP/Tools/BookingTools.php:264` |
| [`fluent_booking/mcp_is_local_dev`](#fluentbookingmcpislocaldev) | Core | 1 | `fluent-booking/app/Http/Controllers/McpController.php:293` |
| [`fluent_booking/mcp_prompt_names`](#fluentbookingmcppromptnames) | Core | 1 | `fluent-booking/app/Modules/MCP/MCPInit.php:124` |
| [`fluent_booking/mcp_tool_classes`](#fluentbookingmcptoolclasses) | Core | 1 | `fluent-booking/app/Modules/MCP/AbilitiesRegistrar.php:72` |
| [`fluent_booking/meeting_bookmarks`](#fluentbookingmeetingbookmarks) | Core | 1 | `fluent-booking/app/Models/Booking.php:1354` |
| [`fluent_booking/meeting_durations_schema`](#fluentbookingmeetingdurationsschema) | Core | 1 | `fluent-booking/app/Services/Helper.php:1316` |
| [`fluent_booking/meeting_multi_durations_schema`](#fluentbookingmeetingmultidurationsschema) | Core | 1 | `fluent-booking/app/Services/Helper.php:1342` |
| [`fluent_booking/notifying_async_`](#fluentbookingnotifyingasync) | Core | 1 | `fluent-booking/app/Hooks/Handlers/GlobalNotificationHandler.php:113` |
| [`fluent_booking/override_select_times_schema`](#fluentbookingoverrideselecttimesschema) | Core | 1 | `fluent-booking/app/Services/Helper.php:1615` |
| [`fluent_booking/payment_booking_field`](#fluentbookingpaymentbookingfield) | Core | 1 | `fluent-booking/app/Services/BookingFieldService.php:251` |
| [`fluent_booking/payment_receipt_html`](#fluentbookingpaymentreceipthtml) | Core | 2 | `fluent-booking/app/Hooks/Handlers/FrontEndHandler.php:413` |
| [`fluent_booking/paypal_allow_unverified_live_ipn`](#fluentbookingpaypalallowunverifiedliveipn) | <span class="pro-badge">PRO</span> | 1 | `fluent-booking-pro/app/Services/Integrations/PaymentMethods/Paypal/PaypalSettings.php:52` |
| [`fluent_booking/phone_max_digits`](#fluentbookingphonemaxdigits) | Core | 1 | `fluent-booking/app/Services/Helper.php:1068` |
| [`fluent_booking/phone_min_digits`](#fluentbookingphonemindigits) | Core | 1 | `fluent-booking/app/Services/Helper.php:1067` |
| [`fluent_booking/pro_upgrade_base_url`](#fluentbookingproupgradebaseurl) | Core | 1 | `fluent-booking/app/Services/Helper.php:715` |
| [`fluent_booking/process_paypal_ipn_data`](#fluentbookingprocesspaypalipndata) | <span class="pro-badge">PRO</span> | 1 | `fluent-booking-pro/app/Services/Integrations/PaymentMethods/Paypal/API/IPN.php:53` |
| [`fluent_booking/public_ajax_ratelimit`](#fluentbookingpublicajaxratelimit) | Core | 1 | `fluent-booking/app/Services/Helper.php:2465` |
| [`fluent_booking/public_event_settings_keys`](#fluentbookingpubliceventsettingskeys) | Core | 1 | `fluent-booking/app/Hooks/Handlers/FrontEndHandler.php:994` |
| [`fluent_booking/public_event_vars`](#fluentbookingpubliceventvars) | Core | 1 | `fluent-booking/app/Hooks/Handlers/FrontEndHandler.php:976` |
| [`fluent_booking/recurring_default_occurrence`](#fluentbookingrecurringdefaultoccurrence) | <span class="pro-badge">PRO</span> | 1 | `fluent-booking-pro/app/Hooks/Handlers/RecurringEventHandler.php:133` |
| [`fluent_booking/reject_unsafe_remote_urls`](#fluentbookingrejectunsaferemoteurls) | Core | 1 | `fluent-booking/app/Services/Integrations/Calendars/RemoteCalendarHelper.php:22` |
| [`fluent_booking/remote_booked_events`](#fluentbookingremotebookedevents) | Core | 2 | `fluent-booking/app/Modules/MCP/Support/AvailabilityDiagnostics.php:554` |
| [`fluent_booking/remote_calendar_connection_feeds`](#fluentbookingremotecalendarconnectionfeeds) | <span class="pro-badge">PRO</span> | 1 | `fluent-booking-pro/app/Http/Controllers/IntegrationSettingsController.php:136` |
| [`fluent_booking/remote_calendar_providers`](#fluentbookingremotecalendarproviders) | <span class="pro-badge">PRO</span> | 1 | `fluent-booking-pro/app/Http/Controllers/IntegrationSettingsController.php:135` |
| [`fluent_booking/save_event_booking_field_`](#fluentbookingsaveeventbookingfield) | Core | 1 | `fluent-booking/app/Services/BookingFieldService.php:517` |
| [`fluent_booking/save_integration_settings_`](#fluentbookingsaveintegrationsettings) | Core | 1 | `fluent-booking/app/Services/Integrations/CalendarIntegrationService.php:128` |
| [`fluent_booking/save_integration_value_`](#fluentbookingsaveintegrationvalue) | Core | 1 | `fluent-booking/app/Services/Integrations/CalendarIntegrationService.php:100` |
| [`fluent_booking/schedule_custom_field_data`](#fluentbookingschedulecustomfielddata) | Core | 2 | `fluent-booking/app/Hooks/Handlers/FrontEndHandler.php:685` |
| [`fluent_booking/schedule_receipt_data`](#fluentbookingschedulereceiptdata) | Core | 1 | `fluent-booking/app/Services/BookingService.php:451` |
| [`fluent_booking/schedule_validation_rules_data`](#fluentbookingschedulevalidationrulesdata) | Core | 2 | `fluent-booking/app/Hooks/Handlers/FrontEndHandler.php:670` |
| [`fluent_booking/settings_menu_items`](#fluentbookingsettingsmenuitems) | Core | 1 | `fluent-booking/app/Hooks/Handlers/AdminMenuHandler.php:606` |
| [`fluent_booking/share_stats_data`](#fluentbookingsharestatsdata) | Core | 1 | `fluent-booking/app/Hooks/Scheduler/DailyScheduler.php:90` |
| [`fluent_booking/skip_no_conflict`](#fluentbookingskipnoconflict) | Core | 2 | `fluent-booking/app/Hooks/Handlers/AdminMenuHandler.php:320` |
| [`fluent_booking/slot_intervals_schema`](#fluentbookingslotintervalsschema) | Core | 1 | `fluent-booking/app/Services/Helper.php:1483` |
| [`fluent_booking/slot_slug`](#fluentbookingslotslug) | Core | 1 | `fluent-booking/app/Services/Helper.php:986` |
| [`fluent_booking/supported_featured`](#fluentbookingsupportedfeatured) | Core | 1 | `fluent-booking/app/Hooks/Handlers/AdminMenuHandler.php:515` |
| [`fluent_booking/suppress_notifications`](#fluentbookingsuppressnotifications) | Core | 1 | `fluent-booking/app/Services/NotificationGate.php:65` |
| [`fluent_booking/total_payment_widget`](#fluentbookingtotalpaymentwidget) | Core | 1 | `fluent-booking/app/Http/Controllers/ReportController.php:67` |
| [`fluent_booking/trusted_proxies`](#fluentbookingtrustedproxies) | Core | 1 | `fluent-booking/app/Services/Helper.php:1025` |
| [`fluent_booking/update_advanced_settings_validation_rule`](#fluentbookingupdateadvancedsettingsvalidationrule) | <span class="pro-badge">PRO</span> | 1 | `fluent-booking-pro/app/Http/Controllers/CalendarController.php:115` |
| [`fluent_booking/update_coupon_data`](#fluentbookingupdatecoupondata) | <span class="pro-badge">PRO</span> | 1 | `fluent-booking-pro/app/Modules/Coupon/Http/Controllers/CouponController.php:115` |
| [`fluent_booking/update_event_details_validation_rule`](#fluentbookingupdateeventdetailsvalidationrule) | Core | 1 | `fluent-booking/app/Http/Controllers/CalendarController.php:709` |
| [`fluent_booking/update_recurring_settings_validation_rule`](#fluentbookingupdaterecurringsettingsvalidationrule) | <span class="pro-badge">PRO</span> | 1 | `fluent-booking-pro/app/Http/Controllers/CalendarController.php:204` |
| [`fluent_booking/upload_folder_name`](#fluentbookinguploadfoldername) | Core | 3 | `fluent-booking/app/Services/Libs/FileSystem.php:28` |
| [`fluent_booking/user_ip`](#fluentbookinguserip) | Core | 1 | `fluent-booking/app/Services/Helper.php:1005` |
| [`fluent_booking/user_search_meta_query_arguments`](#fluentbookingusersearchmetaqueryarguments) | Core | 2 | `fluent-booking/app/Http/Controllers/AdminController.php:37` |
| [`fluent_booking/validate_coupon_data`](#fluentbookingvalidatecoupondata) | <span class="pro-badge">PRO</span> | 2 | `fluent-booking-pro/app/Modules/Coupon/CouponModule.php:77` |
| [`fluent_booking/verfied_email_senders`](#fluentbookingverfiedemailsenders) | Core | 1 | `fluent-booking/app/Services/Helper.php:2301` |
| [`fluent_booking/verify_calendar_api`](#fluentbookingverifycalendarapi) | Core | 1 | `fluent-booking/app/Http/Policies/CalendarPolicy.php:30` |
| [`fluent_booking/verify_save_caldav_credential_`](#fluentbookingverifysavecaldavcredential) | <span class="pro-badge">PRO</span> | 1 | `fluent-booking-pro/app/Http/Controllers/IntegrationSettingsController.php:246` |
| [`fluent_booking/week_select_times_schema`](#fluentbookingweekselecttimesschema) | Core | 1 | `fluent-booking/app/Services/Helper.php:1606` |
| [`fluent_booking/weekly_schedule_schema`](#fluentbookingweeklyscheduleschema) | Core | 1 | `fluent-booking/app/Services/Helper.php:1624` |
| [`fluent_booking/will_parse_redirect_url_value`](#fluentbookingwillparseredirecturlvalue) | Core | 1 | `fluent-booking/app/Models/Booking.php:941` |
| [`fluent_booking/will_refresh_woo_cart`](#fluentbookingwillrefreshwoocart) | <span class="pro-badge">PRO</span> | 1 | `fluent-booking-pro/app/Services/Integrations/Woo/Bootstrap.php:42` |
| [`fluent_booking/zero_decimal_currencies`](#fluentbookingzerodecimalcurrencies) | Core | 1 | `fluent-booking/app/Services/CurrenciesHelper.php:415` |
| [`fluent_booking/zoom_meeting_data`](#fluentbookingzoommeetingdata) | <span class="pro-badge">PRO</span> | 1 | `fluent-booking-pro/app/Services/Integrations/ZoomMeeting/Bootstrap.php:172` |
| [`fluent_calendar/global_booking_vars`](#fluentcalendarglobalbookingvars) | Core | 1 | `fluent-booking/app/Hooks/Handlers/FrontEndHandler.php:573` |
| [`fluent_calender/auto_booking_fluent_crm_sync`](#fluentcalenderautobookingfluentcrmsync) | Core | 1 | `fluent-booking/app/Models/Booking.php:86` |
| [`fluent_sl/api_request_query_params`](#fluentslapirequestqueryparams) | <span class="pro-badge">PRO</span> | 1 | `fluent-booking-pro/app/Services/PluginManager/PluginUpdater.php:266` |
| [`fluent_sl/updater_payload_`](#fluentslupdaterpayload) | <span class="pro-badge">PRO</span> | 1 | `fluent-booking-pro/app/Services/PluginManager/PluginUpdater.php:283` |
| [`fluent_toolkit/can_auto_install`](#fluenttoolkitcanautoinstall) | Core | 2 | `fluent-booking/app/Http/Controllers/McpController.php:101` |
| [`fluentcrm_funnel_will_process_`](#fluentcrmfunnelwillprocess) | Core | 4 | `fluent-booking/app/Services/Integrations/FluentCRM/BookingCompletedTrigger.php:103` |
| [`fluentform_stripe_request_headers`](#fluentformstriperequestheaders) | <span class="pro-badge">PRO</span> | 1 | `fluent-booking-pro/app/Services/Integrations/PaymentMethods/Stripe/API/ApiRequest.php:88` |
| [`fluentform/rendering_field_html_`](#fluentformrenderingfieldhtml) | Core | 1 | `fluent-booking/app/Services/Integrations/FluentForms/BookingElement.php:189` |

<a id="fluentbookingallowsharestats"></a>

## `fluent_booking/allow_share_stats`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Hooks/Scheduler/DailyScheduler.php:61`

**Example**

```php
add_filter('fluent_booking/allow_share_stats', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingcustomfieldstypes"></a>

## `fluent_booking/custom_fields_types`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Services/Helper.php:1668`

**Example**

```php
add_filter('fluent_booking/custom_fields_types', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingenforcephonevalidation"></a>

## `fluent_booking/enforce_phone_validation`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Services/Helper.php:1051`

**Example**

```php
add_filter('fluent_booking/enforce_phone_validation', function ($value, ...$rest) {
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

- `fluent-booking/app/Services/Integrations/CalendarIntegrationService.php:179`

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

- `fluent-booking/app/Services/Integrations/CalendarIntegrationService.php:153`

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

- `fluent-booking/app/Services/PermissionManager.php:123`

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

- `fluent-booking/app/Services/DateTimeHelper.php:400`

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

- `fluent-booking/app/Hooks/Handlers/FrontEndHandler.php:722`
- `fluent-booking/app/Http/Controllers/BookingController.php:159`

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

- `fluent-booking/app/Hooks/Handlers/AdminMenuHandler.php:562`

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

- `fluent-booking/app/Services/Helper.php:2354`

**Example**

```php
add_filter('fluent_booking/is_rtl', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookinglicensegraceperioddays"></a>

## `fluent_booking/license_grace_period_days`

- **Type:** filter
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1

**Source locations**

- `fluent-booking-pro/app/Http/Controllers/LicenseController.php:137`

**Example**

```php
add_filter('fluent_booking/license_grace_period_days', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookinglocalbookedevents"></a>

## `fluent_booking/local_booked_events`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Services/TimeSlotService.php:303`

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

- `fluent-booking/app/Models/Booking.php:508`

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

- `fluent-booking/app/Models/Booking.php:534`

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

<a id="fluentbookingloginheader"></a>

## `fluent_booking/login_header`

- **Type:** filter
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1

**Source locations**

- `fluent-booking-pro/app/Hooks/Handlers/FrontendRenderer.php:336`

**Example**

```php
add_filter('fluent_booking/login_header', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingmaxbookingdurationminutes"></a>

## `fluent_booking/max_booking_duration_minutes`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Services/TimeSlotService.php:281`

**Example**

```php
add_filter('fluent_booking/max_booking_duration_minutes', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingmcpabilitynames"></a>

## `fluent_booking/mcp_ability_names`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 2

**Source locations**

- `fluent-booking/app/Modules/MCP/MCPInit.php:111`
- `fluent-booking/app/Modules/MCP/MCPInit.php:241`

**Example**

```php
add_filter('fluent_booking/mcp_ability_names', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingmcpbookingfull"></a>

## `fluent_booking/mcp_booking_full`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Modules/MCP/Tools/BookingTools.php:264`

**Example**

```php
add_filter('fluent_booking/mcp_booking_full', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingmcpislocaldev"></a>

## `fluent_booking/mcp_is_local_dev`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Http/Controllers/McpController.php:293`

**Example**

```php
add_filter('fluent_booking/mcp_is_local_dev', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingmcppromptnames"></a>

## `fluent_booking/mcp_prompt_names`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Modules/MCP/MCPInit.php:124`

**Example**

```php
add_filter('fluent_booking/mcp_prompt_names', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingmcptoolclasses"></a>

## `fluent_booking/mcp_tool_classes`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Modules/MCP/AbilitiesRegistrar.php:72`

**Example**

```php
add_filter('fluent_booking/mcp_tool_classes', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingmeetingbookmarks"></a>

## `fluent_booking/meeting_bookmarks`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Models/Booking.php:1354`

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

- `fluent-booking/app/Services/Helper.php:1316`

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

- `fluent-booking/app/Services/Helper.php:1342`

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

- `fluent-booking/app/Services/Helper.php:1615`

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

- `fluent-booking/app/Services/BookingFieldService.php:251`

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

- `fluent-booking/app/Hooks/Handlers/FrontEndHandler.php:413`
- `fluent-booking/app/Services/EditorShortCodeParser.php:427`

**Example**

```php
add_filter('fluent_booking/payment_receipt_html', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingpaypalallowunverifiedliveipn"></a>

## `fluent_booking/paypal_allow_unverified_live_ipn`

- **Type:** filter
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1

**Source locations**

- `fluent-booking-pro/app/Services/Integrations/PaymentMethods/Paypal/PaypalSettings.php:52`

**Example**

```php
add_filter('fluent_booking/paypal_allow_unverified_live_ipn', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingphonemaxdigits"></a>

## `fluent_booking/phone_max_digits`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Services/Helper.php:1068`

**Example**

```php
add_filter('fluent_booking/phone_max_digits', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingphonemindigits"></a>

## `fluent_booking/phone_min_digits`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Services/Helper.php:1067`

**Example**

```php
add_filter('fluent_booking/phone_min_digits', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingproupgradebaseurl"></a>

## `fluent_booking/pro_upgrade_base_url`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Services/Helper.php:715`

**Example**

```php
add_filter('fluent_booking/pro_upgrade_base_url', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingprocesspaypalipndata"></a>

## `fluent_booking/process_paypal_ipn_data`

- **Type:** filter
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1

**Source locations**

- `fluent-booking-pro/app/Services/Integrations/PaymentMethods/Paypal/API/IPN.php:53`

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

- `fluent-booking/app/Services/Helper.php:2465`

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

- `fluent-booking/app/Hooks/Handlers/FrontEndHandler.php:994`

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

- `fluent-booking/app/Hooks/Handlers/FrontEndHandler.php:976`

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

- `fluent-booking-pro/app/Hooks/Handlers/RecurringEventHandler.php:133`

**Example**

```php
add_filter('fluent_booking/recurring_default_occurrence', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingrejectunsaferemoteurls"></a>

## `fluent_booking/reject_unsafe_remote_urls`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Services/Integrations/Calendars/RemoteCalendarHelper.php:22`

**Example**

```php
add_filter('fluent_booking/reject_unsafe_remote_urls', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingremotebookedevents"></a>

## `fluent_booking/remote_booked_events`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 2

**Source locations**

- `fluent-booking/app/Modules/MCP/Support/AvailabilityDiagnostics.php:554`
- `fluent-booking/app/Services/TimeSlotService.php:305`

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

- `fluent-booking-pro/app/Http/Controllers/IntegrationSettingsController.php:136`

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

- `fluent-booking-pro/app/Http/Controllers/IntegrationSettingsController.php:135`

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

- `fluent-booking/app/Services/BookingFieldService.php:517`

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

- `fluent-booking/app/Services/Integrations/CalendarIntegrationService.php:128`

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

- `fluent-booking/app/Services/Integrations/CalendarIntegrationService.php:100`

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

- `fluent-booking/app/Hooks/Handlers/FrontEndHandler.php:685`
- `fluent-booking/app/Http/Controllers/BookingController.php:143`

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

- `fluent-booking/app/Services/BookingService.php:451`

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

- `fluent-booking/app/Hooks/Handlers/FrontEndHandler.php:670`
- `fluent-booking/app/Http/Controllers/BookingController.php:126`

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

- `fluent-booking/app/Hooks/Handlers/AdminMenuHandler.php:606`

**Example**

```php
add_filter('fluent_booking/settings_menu_items', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingsharestatsdata"></a>

## `fluent_booking/share_stats_data`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Hooks/Scheduler/DailyScheduler.php:90`

**Example**

```php
add_filter('fluent_booking/share_stats_data', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingskipnoconflict"></a>

## `fluent_booking/skip_no_conflict`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 2

**Source locations**

- `fluent-booking/app/Hooks/Handlers/AdminMenuHandler.php:320`
- `fluent-booking/app/Hooks/Handlers/AdminMenuHandler.php:361`

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

- `fluent-booking/app/Services/Helper.php:1483`

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

- `fluent-booking/app/Services/Helper.php:986`

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

- `fluent-booking/app/Hooks/Handlers/AdminMenuHandler.php:515`

**Example**

```php
add_filter('fluent_booking/supported_featured', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingsuppressnotifications"></a>

## `fluent_booking/suppress_notifications`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Services/NotificationGate.php:65`

**Example**

```php
add_filter('fluent_booking/suppress_notifications', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingtotalpaymentwidget"></a>

## `fluent_booking/total_payment_widget`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Http/Controllers/ReportController.php:67`

**Example**

```php
add_filter('fluent_booking/total_payment_widget', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingtrustedproxies"></a>

## `fluent_booking/trusted_proxies`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Services/Helper.php:1025`

**Example**

```php
add_filter('fluent_booking/trusted_proxies', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingupdateadvancedsettingsvalidationrule"></a>

## `fluent_booking/update_advanced_settings_validation_rule`

- **Type:** filter
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1

**Source locations**

- `fluent-booking-pro/app/Http/Controllers/CalendarController.php:115`

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

- `fluent-booking/app/Http/Controllers/CalendarController.php:709`

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

- `fluent-booking-pro/app/Http/Controllers/CalendarController.php:204`

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
- **Call sites:** 3

**Source locations**

- `fluent-booking/app/Services/Libs/FileSystem.php:28`
- `fluent-booking/app/Services/Libs/FileSystem.php:46`
- `fluent-booking/app/Services/Libs/FileSystem.php:135`

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

- `fluent-booking/app/Services/Helper.php:1005`

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
- **Call sites:** 2

**Source locations**

- `fluent-booking/app/Http/Controllers/AdminController.php:37`
- `fluent-booking/app/Http/Controllers/AdminController.php:60`

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

- `fluent-booking-pro/app/Modules/Coupon/CouponModule.php:77`
- `fluent-booking-pro/app/Modules/Coupon/CouponModule.php:169`

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

- `fluent-booking/app/Services/Helper.php:2301`

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

- `fluent-booking/app/Http/Policies/CalendarPolicy.php:30`

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

- `fluent-booking-pro/app/Http/Controllers/IntegrationSettingsController.php:246`

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

- `fluent-booking/app/Services/Helper.php:1606`

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

- `fluent-booking/app/Services/Helper.php:1624`

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

- `fluent-booking/app/Models/Booking.php:941`

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

- `fluent-booking/app/Services/CurrenciesHelper.php:415`

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

- `fluent-booking-pro/app/Services/Integrations/ZoomMeeting/Bootstrap.php:172`

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

- `fluent-booking/app/Hooks/Handlers/FrontEndHandler.php:573`

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

- `fluent-booking/app/Models/Booking.php:86`

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

- `fluent-booking-pro/app/Services/PluginManager/PluginUpdater.php:266`

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

- `fluent-booking-pro/app/Services/PluginManager/PluginUpdater.php:283`

**Example**

```php
add_filter('fluent_sl/updater_payload_', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluenttoolkitcanautoinstall"></a>

## `fluent_toolkit/can_auto_install`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 2

**Source locations**

- `fluent-booking/app/Http/Controllers/McpController.php:101`
- `fluent-booking/app/Http/Controllers/McpController.php:166`

**Example**

```php
add_filter('fluent_toolkit/can_auto_install', function ($value, ...$rest) {
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

<a id="fluentformstriperequestheaders"></a>

## `fluentform_stripe_request_headers`

- **Type:** filter
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1

**Source locations**

- `fluent-booking-pro/app/Services/Integrations/PaymentMethods/Stripe/API/ApiRequest.php:88`

**Example**

```php
add_filter('fluentform_stripe_request_headers', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentformrenderingfieldhtml"></a>

## `fluentform/rendering_field_html_`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Services/Integrations/FluentForms/BookingElement.php:189`

**Example**

```php
add_filter('fluentform/rendering_field_html_', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```
