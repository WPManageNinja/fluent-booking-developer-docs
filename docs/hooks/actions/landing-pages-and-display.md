---
title: Landing Pages & Display Actions
description: Action hooks fired around landing page rendering, booking confirmation pages, and front-end markup.
---

# Landing Pages & Display Actions

Action hooks fired around landing page rendering, booking confirmation pages, and front-end markup.

12 unique action hooks currently map to this category, across 12 call sites.

## Hook Inventory

| Hook | Edition | Call Sites | First Source |
| --- | --- | --- | --- |
| [`fluent_booking/after_calendar_event_landing_page`](#fluentbookingaftercalendareventlandingpage) | Core | 1 | `fluent-booking/app/Views/landing/booking.php:68` |
| [`fluent_booking/author_landing_footer`](#fluentbookingauthorlandingfooter) | Core | 1 | `fluent-booking/app/Views/landing/booking.php:84` |
| [`fluent_booking/author_landing_head`](#fluentbookingauthorlandinghead) | Core | 1 | `fluent-booking/app/Views/landing/booking.php:58` |
| [`fluent_booking/before_calendar_event_landing_page`](#fluentbookingbeforecalendareventlandingpage) | Core | 1 | `fluent-booking/app/Views/landing/booking.php:63` |
| [`fluent_booking/booking_confirmation_footer`](#fluentbookingbookingconfirmationfooter) | Core | 1 | `fluent-booking/app/Views/public/booking_confirmation.php:118` |
| [`fluent_booking/booking_details_header`](#fluentbookingbookingdetailsheader) | Core | 1 | `fluent-booking/app/Views/public/booking_confirmation.php:21` |
| [`fluent_booking/front_footer`](#fluentbookingfrontfooter) | <span class="pro-badge">PRO</span> | 1 | `fluent-booking-pro/app/Views/front-app.php:141` |
| [`fluent_booking/front_head`](#fluentbookingfronthead) | <span class="pro-badge">PRO</span> | 1 | `fluent-booking-pro/app/Views/front-app.php:130` |
| [`fluent_booking/landing_page_route_`](#fluentbookinglandingpageroute) | Core | 1 | `fluent-booking/app/Services/LandingPage/LandingPageHandler.php:67` |
| [`fluent_booking/main_landing`](#fluentbookingmainlanding) | Core | 1 | `fluent-booking/app/Views/landing/author_landing.php:84` |
| [`fluent_booking/main_landing_footer`](#fluentbookingmainlandingfooter) | Core | 1 | `fluent-booking/app/Views/landing/author_landing.php:106` |
| [`fluent_booking/payment_receipt/after_content`](#fluentbookingpaymentreceiptaftercontent) | <span class="pro-badge">PRO</span> | 1 | `fluent-booking-pro/app/Services/ReceiptHelper.php:68` |

<a id="fluentbookingaftercalendareventlandingpage"></a>

## `fluent_booking/after_calendar_event_landing_page`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Views/landing/booking.php:68`

**Example**

```php
add_action('fluent_booking/after_calendar_event_landing_page', function (...$args) {
    // Your custom logic here.
}, 10, count($args ?? []));
```

<a id="fluentbookingauthorlandingfooter"></a>

## `fluent_booking/author_landing_footer`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Views/landing/booking.php:84`

**Example**

```php
add_action('fluent_booking/author_landing_footer', function (...$args) {
    // Your custom logic here.
}, 10, count($args ?? []));
```

<a id="fluentbookingauthorlandinghead"></a>

## `fluent_booking/author_landing_head`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Views/landing/booking.php:58`

**Example**

```php
add_action('fluent_booking/author_landing_head', function (...$args) {
    // Your custom logic here.
}, 10, count($args ?? []));
```

<a id="fluentbookingbeforecalendareventlandingpage"></a>

## `fluent_booking/before_calendar_event_landing_page`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Views/landing/booking.php:63`

**Example**

```php
add_action('fluent_booking/before_calendar_event_landing_page', function (...$args) {
    // Your custom logic here.
}, 10, count($args ?? []));
```

<a id="fluentbookingbookingconfirmationfooter"></a>

## `fluent_booking/booking_confirmation_footer`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Views/public/booking_confirmation.php:118`

**Example**

```php
add_action('fluent_booking/booking_confirmation_footer', function (...$args) {
    // Your custom logic here.
}, 10, count($args ?? []));
```

<a id="fluentbookingbookingdetailsheader"></a>

## `fluent_booking/booking_details_header`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Views/public/booking_confirmation.php:21`

**Example**

```php
add_action('fluent_booking/booking_details_header', function (...$args) {
    // Your custom logic here.
}, 10, count($args ?? []));
```

<a id="fluentbookingfrontfooter"></a>

## `fluent_booking/front_footer`

- **Type:** action
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1

**Source locations**

- `fluent-booking-pro/app/Views/front-app.php:141`

**Example**

```php
add_action('fluent_booking/front_footer', function (...$args) {
    // Your custom logic here.
}, 10, count($args ?? []));
```

<a id="fluentbookingfronthead"></a>

## `fluent_booking/front_head`

- **Type:** action
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1

**Source locations**

- `fluent-booking-pro/app/Views/front-app.php:130`

**Example**

```php
add_action('fluent_booking/front_head', function (...$args) {
    // Your custom logic here.
}, 10, count($args ?? []));
```

<a id="fluentbookinglandingpageroute"></a>

## `fluent_booking/landing_page_route_`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Services/LandingPage/LandingPageHandler.php:67`

**Example**

```php
add_action('fluent_booking/landing_page_route_', function (...$args) {
    // Your custom logic here.
}, 10, count($args ?? []));
```

<a id="fluentbookingmainlanding"></a>

## `fluent_booking/main_landing`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Views/landing/author_landing.php:84`

**Example**

```php
add_action('fluent_booking/main_landing', function (...$args) {
    // Your custom logic here.
}, 10, count($args ?? []));
```

<a id="fluentbookingmainlandingfooter"></a>

## `fluent_booking/main_landing_footer`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Views/landing/author_landing.php:106`

**Example**

```php
add_action('fluent_booking/main_landing_footer', function (...$args) {
    // Your custom logic here.
}, 10, count($args ?? []));
```

<a id="fluentbookingpaymentreceiptaftercontent"></a>

## `fluent_booking/payment_receipt/after_content`

- **Type:** action
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1

**Source locations**

- `fluent-booking-pro/app/Services/ReceiptHelper.php:68`

**Example**

```php
add_action('fluent_booking/payment_receipt/after_content', function (...$args) {
    // Your custom logic here.
}, 10, count($args ?? []));
```
