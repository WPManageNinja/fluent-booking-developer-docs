# Payments & Orders Action Hooks <Badge type="tip" text="Pro" />

These hooks are triggered during the payment process and order management (available in the Pro version).

## fluent_booking/after_draft_order_created

Fires after a draft order is created for a booking.

**Parameters:**
- `$order` (object) - The draft order object.
- `$booking` (object) - The associated booking model.

**Example Usage:**
```php
add_action('fluent_booking/after_draft_order_created', function($order, $booking) {
    // Modify order or perform side effects for draft orders
}, 10, 2);
```

---

## fluent_booking/after_order_items_created

Fires after line items are added to a booking order.

**Parameters:**
- `$order` (object) - The order object.
- `$items` (array) - List of items added to the order.

**Example Usage:**
```php
add_action('fluent_booking/after_order_items_created', function($order, $items) {
    // Custom logic for order items
}, 10, 2);
```

---

## fluent_booking/payment/status_changed

Fires when the status of a payment/order changes.

**Parameters:**
- `$order` (object) - The order object.
- `$previousStatus` (string) - The previous status of the order.

**Example Usage:**
```php
add_action('fluent_booking/payment/status_changed', function($order, $previousStatus) {
    // Handle status transitions (e.g., pending to paid)
    $new_status = $order->status;
}, 10, 2);
```

---

## fluent_booking/payment/update_payment_status_paid

Fires specifically when an order status is updated to 'paid'.

**Parameters:**
- `$order` (object) - The paid order object.
- `$booking` (object) - The associated booking model.

**Example Usage:**
```php
add_action('fluent_booking/payment/update_payment_status_paid', function($order, $booking) {
    // Trigger post-payment actions (e.g., granting access, sending receipt)
}, 10, 2);
```

---

## fluent_booking/after_delete_order

Fires after an order is deleted.

**Parameters:**
- `$id` (int) - The ID of the deleted order.

**Example Usage:**
```php
add_action('fluent_booking/after_delete_order', function($id) {
    // Post-deletion tasks for orders
}, 10, 1);
```

---

## fluent_booking/transaction_updated

Fires after a payment transaction record is updated.

**Parameters:**
- `$transaction` (object) - The updated transaction object.

**Example Usage:**
```php
add_action('fluent_booking/transaction_updated', function($transaction) {
    // Handle transaction updates
}, 10, 1);
```

---

## fluent_booking/refund_payment_{method}

Dynamic hook that fires when a refund is triggered for a specific payment method.

**Parameters:**
- `$order` (object) - The order being refunded.
- `$refund_data` (array) - Data about the refund.

**Example Usage:**
```php
add_action('fluent_booking/refund_payment_stripe', function($order, $refund_data) {
    // Custom logic for Stripe refunds
}, 10, 2);
```
