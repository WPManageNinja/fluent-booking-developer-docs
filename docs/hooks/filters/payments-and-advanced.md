---
title: Payments & Advanced Filters
description: Filters for payment processing, currency handling, gateway settings, and stripe/paypal-specific behavior.
---

# Payments & Advanced Filters

Filters for payment processing, currency handling, gateway settings, and stripe/paypal-specific behavior.

16 unique filter hooks currently map to this category, across 18 call sites.

## Hook Inventory

| Hook | Edition | Call Sites | First Source |
| --- | --- | --- | --- |
| [`fluent_booking_form_disable_stripe_connect`](#fluentbookingformdisablestripeconnect) | <span class="pro-badge">PRO</span> | 1 | `fluent-booking-pro/app/Services/Integrations/PaymentMethods/Stripe/StripeSettings.php:25` |
| [`fluent_booking_global_checkout_mode`](#fluentbookingglobalcheckoutmode) | <span class="pro-badge">PRO</span> | 1 | `fluent-booking-pro/app/Services/Integrations/PaymentMethods/Stripe/Stripe.php:131` |
| [`fluent_booking_stripe_idempotency_key`](#fluentbookingstripeidempotencykey) | <span class="pro-badge">PRO</span> | 1 | `fluent-booking-pro/app/Services/Integrations/PaymentMethods/Stripe/API/ApiRequest.php:115` |
| [`fluent_booking_stripe_request_body`](#fluentbookingstriperequestbody) | <span class="pro-badge">PRO</span> | 1 | `fluent-booking-pro/app/Services/Integrations/PaymentMethods/Stripe/API/ApiRequest.php:123` |
| [`fluent_booking/accepted_currencies`](#fluentbookingacceptedcurrencies) | Core | 1 | `fluent-booking/app/Services/CurrenciesHelper.php:73` |
| [`fluent_booking/create_coupon_data`](#fluentbookingcreatecoupondata) | <span class="pro-badge">PRO</span> | 1 | `fluent-booking-pro/app/Modules/Coupon/Http/Controllers/CouponController.php:75` |
| [`fluent_booking/create_draft_order`](#fluentbookingcreatedraftorder) | <span class="pro-badge">PRO</span> | 1 | `fluent-booking-pro/app/Services/OrderHelper.php:46` |
| [`fluent_booking/create_draft_transactions`](#fluentbookingcreatedrafttransactions) | <span class="pro-badge">PRO</span> | 1 | `fluent-booking-pro/app/Services/OrderHelper.php:103` |
| [`fluent_booking/global_currency_settings`](#fluentbookingglobalcurrencysettings) | Core | 1 | `fluent-booking/app/Services/CurrenciesHelper.php:37` |
| [`fluent_booking/global_currency_symbols`](#fluentbookingglobalcurrencysymbols) | Core | 1 | `fluent-booking/app/Services/CurrenciesHelper.php:246` |
| [`fluent_booking/payment/get_all_methods`](#fluentbookingpaymentgetallmethods) | Core + <span class="pro-badge">PRO</span> | 2 | `fluent-booking/app/Hooks/Handlers/AdminMenuHandler.php:395` |
| [`fluent_booking/payment/get_global_payment_methods`](#fluentbookingpaymentgetglobalpaymentmethods) | <span class="pro-badge">PRO</span> | 1 | `fluent-booking-pro/app/Hooks/Handlers/GlobalPaymentHandler.php:115` |
| [`fluent_booking/payment/get_global_payment_settings_`](#fluentbookingpaymentgetglobalpaymentsettings) | <span class="pro-badge">PRO</span> | 1 | `fluent-booking-pro/app/Hooks/Handlers/GlobalPaymentHandler.php:110` |
| [`fluent_booking/payment/get_payment_settings`](#fluentbookingpaymentgetpaymentsettings) | Core + <span class="pro-badge">PRO</span> | 2 | `fluent-booking/app/Http/Controllers/CalendarController.php:949` |
| [`fluent_booking/payment/payment_settings_before_update_`](#fluentbookingpaymentpaymentsettingsbeforeupdate) | <span class="pro-badge">PRO</span> | 1 | `fluent-booking-pro/app/Services/Integrations/PaymentMethods/BasePaymentMethod.php:281` |
| [`fluent-booking/payment/stripe_checkout_session_args`](#fluentbookingpaymentstripecheckoutsessionargs) | <span class="pro-badge">PRO</span> | 1 | `fluent-booking-pro/app/Services/Integrations/PaymentMethods/Stripe/Stripe.php:489` |

<a id="fluentbookingformdisablestripeconnect"></a>

## `fluent_booking_form_disable_stripe_connect`

- **Type:** filter
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1

**Source locations**

- `fluent-booking-pro/app/Services/Integrations/PaymentMethods/Stripe/StripeSettings.php:25`

**Example**

```php
add_filter('fluent_booking_form_disable_stripe_connect', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingglobalcheckoutmode"></a>

## `fluent_booking_global_checkout_mode`

- **Type:** filter
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1

**Source locations**

- `fluent-booking-pro/app/Services/Integrations/PaymentMethods/Stripe/Stripe.php:131`

**Example**

```php
add_filter('fluent_booking_global_checkout_mode', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingstripeidempotencykey"></a>

## `fluent_booking_stripe_idempotency_key`

- **Type:** filter
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1

**Source locations**

- `fluent-booking-pro/app/Services/Integrations/PaymentMethods/Stripe/API/ApiRequest.php:115`

**Example**

```php
add_filter('fluent_booking_stripe_idempotency_key', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingstriperequestbody"></a>

## `fluent_booking_stripe_request_body`

- **Type:** filter
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1

**Source locations**

- `fluent-booking-pro/app/Services/Integrations/PaymentMethods/Stripe/API/ApiRequest.php:123`

**Example**

```php
add_filter('fluent_booking_stripe_request_body', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingacceptedcurrencies"></a>

## `fluent_booking/accepted_currencies`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Services/CurrenciesHelper.php:73`

**Example**

```php
add_filter('fluent_booking/accepted_currencies', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingcreatecoupondata"></a>

## `fluent_booking/create_coupon_data`

- **Type:** filter
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1

**Source locations**

- `fluent-booking-pro/app/Modules/Coupon/Http/Controllers/CouponController.php:75`

**Example**

```php
add_filter('fluent_booking/create_coupon_data', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingcreatedraftorder"></a>

## `fluent_booking/create_draft_order`

- **Type:** filter
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1

**Source locations**

- `fluent-booking-pro/app/Services/OrderHelper.php:46`

**Example**

```php
add_filter('fluent_booking/create_draft_order', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingcreatedrafttransactions"></a>

## `fluent_booking/create_draft_transactions`

- **Type:** filter
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1

**Source locations**

- `fluent-booking-pro/app/Services/OrderHelper.php:103`

**Example**

```php
add_filter('fluent_booking/create_draft_transactions', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingglobalcurrencysettings"></a>

## `fluent_booking/global_currency_settings`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Services/CurrenciesHelper.php:37`

**Example**

```php
add_filter('fluent_booking/global_currency_settings', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingglobalcurrencysymbols"></a>

## `fluent_booking/global_currency_symbols`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Services/CurrenciesHelper.php:246`

**Example**

```php
add_filter('fluent_booking/global_currency_symbols', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingpaymentgetallmethods"></a>

## `fluent_booking/payment/get_all_methods`

- **Type:** filter
- **Edition:** Core + <span class="pro-badge">PRO</span>
- **Call sites:** 2

**Source locations**

- `fluent-booking/app/Hooks/Handlers/AdminMenuHandler.php:395`
- `fluent-booking-pro/app/Hooks/Handlers/GlobalPaymentHandler.php:127`

**Example**

```php
add_filter('fluent_booking/payment/get_all_methods', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingpaymentgetglobalpaymentmethods"></a>

## `fluent_booking/payment/get_global_payment_methods`

- **Type:** filter
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1

**Source locations**

- `fluent-booking-pro/app/Hooks/Handlers/GlobalPaymentHandler.php:115`

**Example**

```php
add_filter('fluent_booking/payment/get_global_payment_methods', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingpaymentgetglobalpaymentsettings"></a>

## `fluent_booking/payment/get_global_payment_settings_`

- **Type:** filter
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1

**Source locations**

- `fluent-booking-pro/app/Hooks/Handlers/GlobalPaymentHandler.php:110`

**Example**

```php
add_filter('fluent_booking/payment/get_global_payment_settings_', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingpaymentgetpaymentsettings"></a>

## `fluent_booking/payment/get_payment_settings`

- **Type:** filter
- **Edition:** Core + <span class="pro-badge">PRO</span>
- **Call sites:** 2

**Source locations**

- `fluent-booking/app/Http/Controllers/CalendarController.php:949`
- `fluent-booking-pro/app/Http/Controllers/PaymentMethodController.php:113`

**Example**

```php
add_filter('fluent_booking/payment/get_payment_settings', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingpaymentpaymentsettingsbeforeupdate"></a>

## `fluent_booking/payment/payment_settings_before_update_`

- **Type:** filter
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1

**Source locations**

- `fluent-booking-pro/app/Services/Integrations/PaymentMethods/BasePaymentMethod.php:281`

**Example**

```php
add_filter('fluent_booking/payment/payment_settings_before_update_', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```

<a id="fluentbookingpaymentstripecheckoutsessionargs"></a>

## `fluent-booking/payment/stripe_checkout_session_args`

- **Type:** filter
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1

**Source locations**

- `fluent-booking-pro/app/Services/Integrations/PaymentMethods/Stripe/Stripe.php:489`

**Example**

```php
add_filter('fluent-booking/payment/stripe_checkout_session_args', function ($value, ...$rest) {
    return $value;
}, 10, 1 + count($rest ?? []));
```
