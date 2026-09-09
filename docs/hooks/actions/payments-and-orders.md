---
title: Payments & Orders Actions
description: Action hooks fired during the payment lifecycle (Pro) — order creation, payment status transitions, refunds, and gateway IPN.
---

# Payments & Orders Actions

Action hooks fired during the payment lifecycle (Pro) — order creation, payment status transitions, refunds, and gateway IPN.

16 unique action hooks currently map to this category, across 24 call sites.

## Hook Inventory

| Hook | Edition | Call Sites | First Source |
| --- | --- | --- | --- |
| [`fluent_booking/after_delete_order`](#fluentbookingafterdeleteorder) | Core | 1 | `fluent-booking/app/Hooks/Handlers/CleanupHandlers/BookingCleaner.php:47` |
| [`fluent_booking/after_draft_order_created`](#fluentbookingafterdraftordercreated) | <span class="pro-badge">PRO</span> | 1 | `fluent-booking-pro/app/Services/Integrations/PaymentMethods/BasePaymentMethod.php:125` |
| [`fluent_booking/after_order_items_created`](#fluentbookingafterorderitemscreated) | <span class="pro-badge">PRO</span> | 1 | `fluent-booking-pro/app/Services/OrderHelper.php:65` |
| [`fluent_booking/before_delete_order`](#fluentbookingbeforedeleteorder) | Core | 1 | `fluent-booking/app/Hooks/Handlers/CleanupHandlers/BookingCleaner.php:43` |
| [`fluent_booking/ipn_paypal_action_web_accept`](#fluentbookingipnpaypalactionwebaccept) | <span class="pro-badge">PRO</span> | 1 | `fluent-booking-pro/app/Services/Integrations/PaymentMethods/Paypal/API/IPN.php:135` |
| [`fluent_booking/payment/ipn_endpoint_`](#fluentbookingpaymentipnendpoint) | <span class="pro-badge">PRO</span> | 1 | `fluent-booking-pro/app/Hooks/Handlers/GlobalPaymentHandler.php:64` |
| [`fluent_booking/payment/pay_order_with_`](#fluentbookingpaymentpayorderwith) | <span class="pro-badge">PRO</span> | 1 | `fluent-booking-pro/app/Services/Integrations/PaymentMethods/BasePaymentMethod.php:135` |
| [`fluent_booking/payment/payment_settings_update_`](#fluentbookingpaymentpaymentsettingsupdate) | <span class="pro-badge">PRO</span> | 1 | `fluent-booking-pro/app/Http/Controllers/PaymentMethodController.php:56` |
| [`fluent_booking/payment/status_changed`](#fluentbookingpaymentstatuschanged) | Core + <span class="pro-badge">PRO</span> | 4 | `fluent-booking/app/Http/Controllers/SchedulesController.php:310` |
| [`fluent_booking/payment/status_changed_`](#fluentbookingpaymentstatuschanged) | <span class="pro-badge">PRO</span> | 1 | `fluent-booking-pro/app/Http/Controllers/TransactionController.php:42` |
| [`fluent_booking/payment/update_payment_status_`](#fluentbookingpaymentupdatepaymentstatus) | <span class="pro-badge">PRO</span> | 2 | `fluent-booking-pro/app/Services/Integrations/PaymentMethods/BasePaymentMethod.php:512` |
| [`fluent_booking/payment/update_payment_status_paid`](#fluentbookingpaymentupdatepaymentstatuspaid) | Core | 2 | `fluent-booking/app/Http/Controllers/SchedulesController.php:255` |
| [`fluent_booking/refund_payment_`](#fluentbookingrefundpayment) | Core | 2 | `fluent-booking/app/Http/Controllers/SchedulesController.php:273` |
| [`fluent_booking/register_payment_methods`](#fluentbookingregisterpaymentmethods) | <span class="pro-badge">PRO</span> | 1 | `fluent-booking-pro/app/Hooks/Handlers/GlobalPaymentHandler.php:30` |
| [`fluent_booking/transaction_updated`](#fluentbookingtransactionupdated) | <span class="pro-badge">PRO</span> | 1 | `fluent-booking-pro/app/Http/Controllers/TransactionController.php:46` |
| [`fluent-booking/before_render_payment_method_`](#fluentbookingbeforerenderpaymentmethod) | <span class="pro-badge">PRO</span> | 3 | `fluent-booking-pro/app/Services/Integrations/PaymentMethods/Offline/Offline.php:224` |

<a id="fluentbookingafterdeleteorder"></a>

## `fluent_booking/after_delete_order`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Hooks/Handlers/CleanupHandlers/BookingCleaner.php:47`

**Example**

```php
add_action('fluent_booking/after_delete_order', function (...$args) {
    // Your custom logic here.
}, 10, count($args ?? []));
```

<a id="fluentbookingafterdraftordercreated"></a>

## `fluent_booking/after_draft_order_created`

- **Type:** action
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1

**Source locations**

- `fluent-booking-pro/app/Services/Integrations/PaymentMethods/BasePaymentMethod.php:125`

**Example**

```php
add_action('fluent_booking/after_draft_order_created', function (...$args) {
    // Your custom logic here.
}, 10, count($args ?? []));
```

<a id="fluentbookingafterorderitemscreated"></a>

## `fluent_booking/after_order_items_created`

- **Type:** action
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1

**Source locations**

- `fluent-booking-pro/app/Services/OrderHelper.php:65`

**Example**

```php
add_action('fluent_booking/after_order_items_created', function (...$args) {
    // Your custom logic here.
}, 10, count($args ?? []));
```

<a id="fluentbookingbeforedeleteorder"></a>

## `fluent_booking/before_delete_order`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1

**Source locations**

- `fluent-booking/app/Hooks/Handlers/CleanupHandlers/BookingCleaner.php:43`

**Example**

```php
add_action('fluent_booking/before_delete_order', function (...$args) {
    // Your custom logic here.
}, 10, count($args ?? []));
```

<a id="fluentbookingipnpaypalactionwebaccept"></a>

## `fluent_booking/ipn_paypal_action_web_accept`

- **Type:** action
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1

**Source locations**

- `fluent-booking-pro/app/Services/Integrations/PaymentMethods/Paypal/API/IPN.php:135`

**Example**

```php
add_action('fluent_booking/ipn_paypal_action_web_accept', function (...$args) {
    // Your custom logic here.
}, 10, count($args ?? []));
```

<a id="fluentbookingpaymentipnendpoint"></a>

## `fluent_booking/payment/ipn_endpoint_`

- **Type:** action
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1

**Source locations**

- `fluent-booking-pro/app/Hooks/Handlers/GlobalPaymentHandler.php:64`

**Example**

```php
add_action('fluent_booking/payment/ipn_endpoint_', function (...$args) {
    // Your custom logic here.
}, 10, count($args ?? []));
```

<a id="fluentbookingpaymentpayorderwith"></a>

## `fluent_booking/payment/pay_order_with_`

- **Type:** action
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1

**Source locations**

- `fluent-booking-pro/app/Services/Integrations/PaymentMethods/BasePaymentMethod.php:135`

**Example**

```php
add_action('fluent_booking/payment/pay_order_with_', function (...$args) {
    // Your custom logic here.
}, 10, count($args ?? []));
```

<a id="fluentbookingpaymentpaymentsettingsupdate"></a>

## `fluent_booking/payment/payment_settings_update_`

- **Type:** action
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1

**Source locations**

- `fluent-booking-pro/app/Http/Controllers/PaymentMethodController.php:56`

**Example**

```php
add_action('fluent_booking/payment/payment_settings_update_', function (...$args) {
    // Your custom logic here.
}, 10, count($args ?? []));
```

<a id="fluentbookingpaymentstatuschanged"></a>

## `fluent_booking/payment/status_changed`

- **Type:** action
- **Edition:** Core + <span class="pro-badge">PRO</span>
- **Call sites:** 4

**Source locations**

- `fluent-booking/app/Http/Controllers/SchedulesController.php:310`
- `fluent-booking-pro/app/Http/Controllers/TransactionController.php:41`
- `fluent-booking-pro/app/Services/Integrations/PaymentMethods/BasePaymentMethod.php:477`
- `fluent-booking-pro/app/Services/Integrations/PaymentMethods/BasePaymentMethod.php:656`

**Example**

```php
add_action('fluent_booking/payment/status_changed', function (...$args) {
    // Your custom logic here.
}, 10, count($args ?? []));
```

<a id="fluentbookingpaymentstatuschanged"></a>

## `fluent_booking/payment/status_changed_`

- **Type:** action
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1

**Source locations**

- `fluent-booking-pro/app/Http/Controllers/TransactionController.php:42`

**Example**

```php
add_action('fluent_booking/payment/status_changed_', function (...$args) {
    // Your custom logic here.
}, 10, count($args ?? []));
```

<a id="fluentbookingpaymentupdatepaymentstatus"></a>

## `fluent_booking/payment/update_payment_status_`

- **Type:** action
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 2

**Source locations**

- `fluent-booking-pro/app/Services/Integrations/PaymentMethods/BasePaymentMethod.php:512`
- `fluent-booking-pro/app/Services/Integrations/PaymentMethods/BasePaymentMethod.php:657`

**Example**

```php
add_action('fluent_booking/payment/update_payment_status_', function (...$args) {
    // Your custom logic here.
}, 10, count($args ?? []));
```

<a id="fluentbookingpaymentupdatepaymentstatuspaid"></a>

## `fluent_booking/payment/update_payment_status_paid`

- **Type:** action
- **Edition:** Core
- **Call sites:** 2

**Source locations**

- `fluent-booking/app/Http/Controllers/SchedulesController.php:255`
- `fluent-booking/app/Modules/MCP/Support/BookingWriter.php:754`

**Example**

```php
add_action('fluent_booking/payment/update_payment_status_paid', function (...$args) {
    // Your custom logic here.
}, 10, count($args ?? []));
```

<a id="fluentbookingrefundpayment"></a>

## `fluent_booking/refund_payment_`

- **Type:** action
- **Edition:** Core
- **Call sites:** 2

**Source locations**

- `fluent-booking/app/Http/Controllers/SchedulesController.php:273`
- `fluent-booking/app/Modules/MCP/Support/BookingWriter.php:907`

**Example**

```php
add_action('fluent_booking/refund_payment_', function (...$args) {
    // Your custom logic here.
}, 10, count($args ?? []));
```

<a id="fluentbookingregisterpaymentmethods"></a>

## `fluent_booking/register_payment_methods`

- **Type:** action
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1

**Source locations**

- `fluent-booking-pro/app/Hooks/Handlers/GlobalPaymentHandler.php:30`

**Example**

```php
add_action('fluent_booking/register_payment_methods', function (...$args) {
    // Your custom logic here.
}, 10, count($args ?? []));
```

<a id="fluentbookingtransactionupdated"></a>

## `fluent_booking/transaction_updated`

- **Type:** action
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1

**Source locations**

- `fluent-booking-pro/app/Http/Controllers/TransactionController.php:46`

**Example**

```php
add_action('fluent_booking/transaction_updated', function (...$args) {
    // Your custom logic here.
}, 10, count($args ?? []));
```

<a id="fluentbookingbeforerenderpaymentmethod"></a>

## `fluent-booking/before_render_payment_method_`

- **Type:** action
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 3

**Source locations**

- `fluent-booking-pro/app/Services/Integrations/PaymentMethods/Offline/Offline.php:224`
- `fluent-booking-pro/app/Services/Integrations/PaymentMethods/Paypal/Paypal.php:440`
- `fluent-booking-pro/app/Services/Integrations/PaymentMethods/Stripe/Stripe.php:693`

**Example**

```php
add_action('fluent-booking/before_render_payment_method_', function (...$args) {
    // Your custom logic here.
}, 10, count($args ?? []));
```
