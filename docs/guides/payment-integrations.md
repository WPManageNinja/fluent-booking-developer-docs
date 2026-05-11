---
title: Payment Integrations
description: Built-in payment gateways and how to add a custom gateway in FluentBooking Pro.
---

# Payment Integrations <span class="pro-badge">PRO</span>

FluentBooking Pro supports paid bookings via two native gateways and one offline option. Configure them under **FluentBooking → Settings → Payments**.

## Built-in Methods

| Method | Source | Notes |
| --- | --- | --- |
| Stripe | `app/Services/Integrations/PaymentMethods/Stripe/Stripe.php` | Connect-based account flow; one-time charges; refunds from the admin. |
| PayPal | `app/Services/Integrations/PaymentMethods/Paypal/Paypal.php` | Standard PayPal Checkout with IPN. |
| Offline | `app/Services/Integrations/PaymentMethods/Offline/Offline.php` | Manual / pay-later. |

Stripe and PayPal are registered automatically inside `GlobalPaymentHandler` via `(new Stripe())->register()` and `(new Paypal())->register()`.

## Event-Level Settings

Each calendar event can override the global payment defaults:

- Enable/disable payments
- Price + currency
- Refund policy
- Allowed payment methods (subset of the globally connected gateways)

The admin REST endpoints live under `/calendars/{id}/events/{event_id}/payment-settings`.

## Booking + Payment Flow

1. Attendee selects a slot on a paid event.
2. FluentBooking creates a **draft order** before the booking is finalized (`fluent_booking/create_draft_order` filter, `fluent_booking/after_draft_order_created` action).
3. Attendee is redirected to (or processed inline with) the gateway.
4. On success, the gateway's IPN/webhook fires `fluent_booking/payment/status_changed` and `fluent_booking/payment/status_changed_<gateway>`.
5. When status becomes `paid`, the booking is confirmed (`fluent_booking/payment/update_payment_status_paid`).
6. Failures keep the booking pending and the order updated.

## Registering a Custom Gateway

The plugin emits `do_action('fluent_booking/register_payment_methods')` (no args). Your custom gateway extends `BasePaymentMethod` and registers itself by calling `register()` inside the action handler.

```php
use FluentBookingPro\App\Services\Integrations\PaymentMethods\BasePaymentMethod;

class MyGateway extends BasePaymentMethod
{
    public function __construct()
    {
        parent::__construct(
            __('My Gateway', 'my-plugin'),
            'mygateway',          // slug used throughout hook names
            '#3b82f6'              // brand color
        );
    }

    public function getGlobalFields()
    {
        // Admin "Global Payment Settings" form for this gateway
        return [/* field definitions */];
    }

    public function makePayment($order, $booking, $paymentArgs)
    {
        // Called from action fluent_booking/payment/pay_order_with_<slug>
        // Return ['redirect_url' => '...'] for redirect-style gateways,
        // or process inline and call $this->updatePaymentStatus() on success.
    }

    public function onPaymentEventTriggered()
    {
        // Called from action fluent_booking/payment/ipn_endpoint_<slug>
    }

    public function refundPayment($transaction, $amount = null)
    {
        // Called from action fluent_booking/refund_payment_<slug>
    }
}

add_action('fluent_booking/register_payment_methods', function () {
    (new MyGateway())->register();
});
```

`BasePaymentMethod::init()` (called from `register()`) wires the gateway into the standard hook surface:

- `fluent_booking/payment/get_global_payment_settings_<slug>` (filter) — admin settings fields
- `fluent_booking/payment/get_global_payment_methods` (filter) — registers the gateway in the global gateway list
- `fluent_booking/payment/payment_settings_update_<slug>` (action) — saves admin settings
- `fluent_booking/payment/pay_order_with_<slug>` (action, 3 args) — runs the charge
- `fluent_booking/refund_payment_<slug>` (action, 2 args) — refunds
- `fluent_booking/payment/ipn_endpoint_<slug>` (action) — handles IPN callback
- `fluent_booking/payment/status_changed_<slug>` (action, 3 args) — gateway status transition
- `fluent_booking/payment/get_all_methods` (filter) — exposes the gateway to the booking form
- `fluent_booking/booking_data` (filter) — annotates incoming booking data with the chosen payment method

Read `app/Services/Integrations/PaymentMethods/BasePaymentMethod.php` for the full surface area before subclassing.

## Currency

Add currencies / symbols via the two global filters:

```php
add_filter('fluent_booking/accepted_currencies', function ($currencies) {
    $currencies['XYZ'] = 'XYZ Coin';
    return $currencies;
});

add_filter('fluent_booking/global_currency_symbols', function ($symbols) {
    $symbols['XYZ'] = 'XYZ';
    return $symbols;
});
```

## Coupons

Coupons hook into the order pipeline before charge. Defaults can be filtered:

```php
add_filter('fluent_booking/default_coupon_data', function ($data) {
    $data['stackable'] = 'no';
    return $data;
});
```

See [Action Hooks → Coupons](/hooks/actions/coupons) for the lifecycle hooks.

## Useful Hooks

Action hooks under [Action Hooks → Payments & Orders](/hooks/actions/payments-and-orders):

- `fluent_booking/after_draft_order_created`
- `fluent_booking/after_order_items_created`
- `fluent_booking/payment/status_changed`
- `fluent_booking/payment/update_payment_status_paid`
- `fluent_booking/refund_payment_<slug>`
- `fluent_booking/transaction_updated`

Filter hooks under [Filter Hooks → Payments & Advanced](/hooks/filters/payments-and-advanced):

- `fluent_booking/payment/get_payment_settings`
- `fluent_booking/payment/get_all_methods`
- `fluent_booking/create_draft_order`
- `fluent_booking/create_draft_transactions`

## Refunds

Issue refunds from the admin booking detail page. The plugin records the refund as a new row in `fcal_transactions` and fires `fluent_booking/refund_payment_<slug>`. Hook that action to trigger downstream cleanup (revoke licenses, notify CRM, etc.).
