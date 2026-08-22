---
title: Booking Configuration Filters
description: Filters that shape booking data, fields, exports, and confirmation/rescheduling responses.
---

# Booking Configuration Filters

Filters that shape booking data, fields, exports, and confirmation/rescheduling responses.

22 unique filter hooks currently map to this category, across 22 call sites.

## Hook Inventory

| Hook | Edition | Call Sites | First Source |
| --- | --- | --- | --- |
| [`fluent_booking/after_booking_data`](#fluentbookingafterbookingdata) | Core | 1 | `fluent-booking/app/Services/BookingService.php:69` |
| [`fluent_booking/booked_events`](#fluentbookingbookedevents) | Core | 1 | `fluent-booking/app/Services/TimeSlotService.php:302` |
| [`fluent_booking/booking_confirmation_page_title`](#fluentbookingbookingconfirmationpagetitle) | Core | 1 | `fluent-booking/app/Services/LandingPage/LandingPageHandler.php:236` |
| [`fluent_booking/booking_confirmation_page_vars`](#fluentbookingbookingconfirmationpagevars) | Core | 1 | `fluent-booking/app/Services/LandingPage/LandingPageHandler.php:344` |
| [`fluent_booking/booking_confirmation_response`](#fluentbookingbookingconfirmationresponse) | Core | 1 | `fluent-booking/app/Hooks/Handlers/FrontEndHandler.php:957` |
| [`fluent_booking/booking_data`](#fluentbookingbookingdata) | Core | 1 | `fluent-booking/app/Services/BookingService.php:38` |
| [`fluent_booking/booking_export_columns`](#fluentbookingbookingexportcolumns) | Core | 1 | `fluent-booking/app/Http/Controllers/SchedulesController.php:90` |
| [`fluent_booking/booking_export_row`](#fluentbookingbookingexportrow) | Core | 1 | `fluent-booking/app/Http/Controllers/SchedulesController.php:87` |
| [`fluent_booking/booking_fields`](#fluentbookingbookingfields) | Core | 1 | `fluent-booking/app/Services/BookingFieldService.php:245` |
| [`fluent_booking/booking_meeting_title`](#fluentbookingbookingmeetingtitle) | Core | 1 | `fluent-booking/app/Models/Booking.php:811` |
| [`fluent_booking/booking_meta_info_main_meta`](#fluentbookingbookingmetainfomainmeta) | Core | 1 | `fluent-booking/app/Http/Controllers/SchedulesController.php:498` |
| [`fluent_booking/booking_meta_info_main_meta_`](#fluentbookingbookingmetainfomainmeta) | Core | 1 | `fluent-booking/app/Http/Controllers/SchedulesController.php:499` |
| [`fluent_booking/booking_per_page_options`](#fluentbookingbookingperpageoptions) | Core | 1 | `fluent-booking/app/Hooks/Handlers/FrontEndHandler.php:388` |
| [`fluent_booking/booking_period_options`](#fluentbookingbookingperiodoptions) | Core | 1 | `fluent-booking/app/Services/Helper.php:1593` |
| [`fluent_booking/booking_receipt_landing_base_url`](#fluentbookingbookingreceiptlandingbaseurl) | Core | 1 | `fluent-booking/app/Services/Helper.php:2303` |
| [`fluent_booking/booking_rescheduled_response`](#fluentbookingbookingrescheduledresponse) | Core | 1 | `fluent-booking/app/Hooks/Handlers/FrontEndHandler.php:539` |
| [`fluent_booking/booking_status_changing_times_schema`](#fluentbookingbookingstatuschangingtimesschema) | Core | 1 | `fluent-booking/app/Services/Helper.php:1535` |
| [`fluent_booking/booking_webhook_request`](#fluentbookingbookingwebhookrequest) | <span class="pro-badge">PRO</span> | 1 | `fluent-booking-pro/app/Services/Integrations/Webhook/WebhookIntegration.php:139` |
| [`fluent_booking/buffer_times_schema`](#fluentbookingbuffertimesschema) | Core | 1 | `fluent-booking/app/Services/Helper.php:1435` |
| [`fluent_booking/exporting_booking_data_csv`](#fluentbookingexportingbookingdatacsv) | Core | 1 | `fluent-booking/app/Hooks/Handlers/DataExporter.php:116` |
| [`fluent_booking/file_upload_validation_rules_data`](#fluentbookingfileuploadvalidationrulesdata) | <span class="pro-badge">PRO</span> | 1 | `fluent-booking-pro/app/Hooks/Handlers/UploadHandler.php:94` |
| [`fluent_booking/payment_coupon_field`](#fluentbookingpaymentcouponfield) | <span class="pro-badge">PRO</span> | 1 | `fluent-booking-pro/app/Services/Integrations/PaymentMethods/PaymentHelper.php:180` |

<a id="fluentbookingafterbookingdata"></a>

## `fluent_booking/after_booking_data`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Services/BookingService.php:69`

**Example**

```php
add_filter('fluent_booking/after_booking_data', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingbookedevents"></a>

## `fluent_booking/booked_events`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Services/TimeSlotService.php:302`

**Example**

```php
add_filter('fluent_booking/booked_events', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingbookingconfirmationpagetitle"></a>

## `fluent_booking/booking_confirmation_page_title`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Services/LandingPage/LandingPageHandler.php:236`

**Example**

```php
add_filter('fluent_booking/booking_confirmation_page_title', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingbookingconfirmationpagevars"></a>

## `fluent_booking/booking_confirmation_page_vars`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Services/LandingPage/LandingPageHandler.php:344`

**Example**

```php
add_filter('fluent_booking/booking_confirmation_page_vars', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingbookingconfirmationresponse"></a>

## `fluent_booking/booking_confirmation_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Hooks/Handlers/FrontEndHandler.php:957`

**Example**

```php
add_filter('fluent_booking/booking_confirmation_response', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingbookingdata"></a>

## `fluent_booking/booking_data`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Services/BookingService.php:38`

**Example**

```php
add_filter('fluent_booking/booking_data', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingbookingexportcolumns"></a>

## `fluent_booking/booking_export_columns`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Http/Controllers/SchedulesController.php:90`

**Example**

```php
add_filter('fluent_booking/booking_export_columns', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingbookingexportrow"></a>

## `fluent_booking/booking_export_row`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Http/Controllers/SchedulesController.php:87`

**Example**

```php
add_filter('fluent_booking/booking_export_row', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingbookingfields"></a>

## `fluent_booking/booking_fields`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Services/BookingFieldService.php:245`

**Example**

```php
add_filter('fluent_booking/booking_fields', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingbookingmeetingtitle"></a>

## `fluent_booking/booking_meeting_title`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Models/Booking.php:811`

**Example**

```php
add_filter('fluent_booking/booking_meeting_title', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingbookingmetainfomainmeta"></a>

## `fluent_booking/booking_meta_info_main_meta`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Http/Controllers/SchedulesController.php:498`

**Example**

```php
add_filter('fluent_booking/booking_meta_info_main_meta', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingbookingmetainfomainmeta"></a>

## `fluent_booking/booking_meta_info_main_meta_`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Http/Controllers/SchedulesController.php:499`

**Example**

```php
add_filter('fluent_booking/booking_meta_info_main_meta_', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingbookingperpageoptions"></a>

## `fluent_booking/booking_per_page_options`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Hooks/Handlers/FrontEndHandler.php:388`

**Example**

```php
add_filter('fluent_booking/booking_per_page_options', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingbookingperiodoptions"></a>

## `fluent_booking/booking_period_options`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Services/Helper.php:1593`

**Example**

```php
add_filter('fluent_booking/booking_period_options', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingbookingreceiptlandingbaseurl"></a>

## `fluent_booking/booking_receipt_landing_base_url`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Services/Helper.php:2303`

**Example**

```php
add_filter('fluent_booking/booking_receipt_landing_base_url', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingbookingrescheduledresponse"></a>

## `fluent_booking/booking_rescheduled_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Hooks/Handlers/FrontEndHandler.php:539`

**Example**

```php
add_filter('fluent_booking/booking_rescheduled_response', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingbookingstatuschangingtimesschema"></a>

## `fluent_booking/booking_status_changing_times_schema`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Services/Helper.php:1535`

**Example**

```php
add_filter('fluent_booking/booking_status_changing_times_schema', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingbookingwebhookrequest"></a>

## `fluent_booking/booking_webhook_request`

- **Type:** filter
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1

**Source locations**

- `fluent-booking-pro/app/Services/Integrations/Webhook/WebhookIntegration.php:139`

**Example**

```php
add_filter('fluent_booking/booking_webhook_request', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingbuffertimesschema"></a>

## `fluent_booking/buffer_times_schema`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Services/Helper.php:1435`

**Example**

```php
add_filter('fluent_booking/buffer_times_schema', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingexportingbookingdatacsv"></a>

## `fluent_booking/exporting_booking_data_csv`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Hooks/Handlers/DataExporter.php:116`

**Example**

```php
add_filter('fluent_booking/exporting_booking_data_csv', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingfileuploadvalidationrulesdata"></a>

## `fluent_booking/file_upload_validation_rules_data`

- **Type:** filter
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1

**Source locations**

- `fluent-booking-pro/app/Hooks/Handlers/UploadHandler.php:94`

**Example**

```php
add_filter('fluent_booking/file_upload_validation_rules_data', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingpaymentcouponfield"></a>

## `fluent_booking/payment_coupon_field`

- **Type:** filter
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1

**Source locations**

- `fluent-booking-pro/app/Services/Integrations/PaymentMethods/PaymentHelper.php:180`

**Example**

```php
add_filter('fluent_booking/payment_coupon_field', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```
