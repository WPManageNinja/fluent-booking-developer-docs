---
title: Display & Templates Filters
description: Filters affecting front-end templates, html output, landing pages, and receipt rendering.
---

# Display & Templates Filters

Filters affecting front-end templates, html output, landing pages, and receipt rendering.

11 unique filter hooks currently map to this category, across 11 call sites.

## Hook Inventory

| Hook | Edition | Call Sites | First Source |
| --- | --- | --- | --- |
| [`fluent_booking/add_to_calendar_html`](#fluentbookingaddtocalendarhtml) | Core | 1 | `fluent-booking/app/Services/Helper.php:1861` |
| [`fluent_booking/allowed_html_tags`](#fluentbookingallowedhtmltags) | Core | 1 | `fluent-booking/app/Services/Helper.php:1213` |
| [`fluent_booking/author_photo`](#fluentbookingauthorphoto) | Core | 1 | `fluent-booking/app/Services/Helper.php:2359` |
| [`fluent_booking/confirm_and_reject_button_html`](#fluentbookingconfirmandrejectbuttonhtml) | Core | 1 | `fluent-booking/app/Services/Helper.php:1870` |
| [`fluent_booking/get_iframe_html`](#fluentbookinggetiframehtml) | Core | 1 | `fluent-booking/app/Services/Helper.php:1877` |
| [`fluent_booking/get_location_fields`](#fluentbookinggetlocationfields) | Core | 1 | `fluent-booking/app/Models/CalendarSlot.php:730` |
| [`fluent_booking/payment_receipt/pre_render_footer`](#fluentbookingpaymentreceiptprerenderfooter) | <span class="pro-badge">PRO</span> | 1 | `fluent-booking-pro/app/Services/ReceiptHelper.php:89` |
| [`fluent_booking/payment_receipt/pre_render_header`](#fluentbookingpaymentreceiptprerenderheader) | <span class="pro-badge">PRO</span> | 1 | `fluent-booking-pro/app/Services/ReceiptHelper.php:75` |
| [`fluent_booking/payment_receipt/pre_render_item_details`](#fluentbookingpaymentreceiptprerenderitemdetails) | <span class="pro-badge">PRO</span> | 1 | `fluent-booking-pro/app/Services/ReceiptHelper.php:124` |
| [`fluent_booking/payment_receipt/pre_render_payment_info`](#fluentbookingpaymentreceiptprerenderpaymentinfo) | <span class="pro-badge">PRO</span> | 1 | `fluent-booking-pro/app/Services/ReceiptHelper.php:103` |
| [`fluent_booking/payment_receipt/pre_render_submission_details`](#fluentbookingpaymentreceiptprerendersubmissiondetails) | <span class="pro-badge">PRO</span> | 1 | `fluent-booking-pro/app/Services/ReceiptHelper.php:147` |

<a id="fluentbookingaddtocalendarhtml"></a>

## `fluent_booking/add_to_calendar_html`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Services/Helper.php:1861`

**Example**

```php
add_filter('fluent_booking/add_to_calendar_html', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingallowedhtmltags"></a>

## `fluent_booking/allowed_html_tags`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Services/Helper.php:1213`

**Example**

```php
add_filter('fluent_booking/allowed_html_tags', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingauthorphoto"></a>

## `fluent_booking/author_photo`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Services/Helper.php:2359`

**Example**

```php
add_filter('fluent_booking/author_photo', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingconfirmandrejectbuttonhtml"></a>

## `fluent_booking/confirm_and_reject_button_html`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Services/Helper.php:1870`

**Example**

```php
add_filter('fluent_booking/confirm_and_reject_button_html', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookinggetiframehtml"></a>

## `fluent_booking/get_iframe_html`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Services/Helper.php:1877`

**Example**

```php
add_filter('fluent_booking/get_iframe_html', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookinggetlocationfields"></a>

## `fluent_booking/get_location_fields`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Models/CalendarSlot.php:730`

**Example**

```php
add_filter('fluent_booking/get_location_fields', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingpaymentreceiptprerenderfooter"></a>

## `fluent_booking/payment_receipt/pre_render_footer`

- **Type:** filter
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1

**Source locations**

- `fluent-booking-pro/app/Services/ReceiptHelper.php:89`

**Example**

```php
add_filter('fluent_booking/payment_receipt/pre_render_footer', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingpaymentreceiptprerenderheader"></a>

## `fluent_booking/payment_receipt/pre_render_header`

- **Type:** filter
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1

**Source locations**

- `fluent-booking-pro/app/Services/ReceiptHelper.php:75`

**Example**

```php
add_filter('fluent_booking/payment_receipt/pre_render_header', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingpaymentreceiptprerenderitemdetails"></a>

## `fluent_booking/payment_receipt/pre_render_item_details`

- **Type:** filter
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1

**Source locations**

- `fluent-booking-pro/app/Services/ReceiptHelper.php:124`

**Example**

```php
add_filter('fluent_booking/payment_receipt/pre_render_item_details', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingpaymentreceiptprerenderpaymentinfo"></a>

## `fluent_booking/payment_receipt/pre_render_payment_info`

- **Type:** filter
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1

**Source locations**

- `fluent-booking-pro/app/Services/ReceiptHelper.php:103`

**Example**

```php
add_filter('fluent_booking/payment_receipt/pre_render_payment_info', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingpaymentreceiptprerendersubmissiondetails"></a>

## `fluent_booking/payment_receipt/pre_render_submission_details`

- **Type:** filter
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1

**Source locations**

- `fluent-booking-pro/app/Services/ReceiptHelper.php:147`

**Example**

```php
add_filter('fluent_booking/payment_receipt/pre_render_submission_details', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```
