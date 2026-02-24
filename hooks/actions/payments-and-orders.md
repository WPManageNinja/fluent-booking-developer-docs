# Payments & Orders Action Hooks <Badge type="tip" text="Pro" />

These hooks are triggered during the payment process and order management (available in the Pro version).

## fluent_booking/after_draft_order_created

Fires after a draft order is created for a booking.

**Parameters:**
- `$order` (object) - The draft order object.
- `$booking` (object) - The associated booking model.
- `$calendarSlot` (object) - The calendar event/slot object.
- `$bookingData` (array) - The raw booking data.

**Example Usage:**
```php
add_action('fluent_booking/after_draft_order_created', function($order, $booking, $calendarSlot, $bookingData) {
    // Modify order or perform side effects for draft orders
}, 10, 4);
```

**Location:** `fluent-booking-pro/app/Services/Integrations/PaymentMethods/BasePaymentMethod.php`

---

## fluent_booking/after_order_items_created

Fires after line items are added to a booking order.

**Parameters:**
- `$order` (object) - The order object.
- `$booking` (object) - The associated booking model.
- `$calendarSlot` (object) - The calendar event/slot object.
- `$bookingData` (array) - The raw booking data.

**Example Usage:**
```php
add_action('fluent_booking/after_order_items_created', function($order, $booking, $calendarSlot, $bookingData) {
    // Custom logic for order items
}, 10, 4);
```

**Location:** `fluent-booking-pro/app/Services/OrderHelper.php`

---

## fluent_booking/payment/status_changed

Fires when the status of a payment/order changes.

**Parameters:**
- `$order` (object) - The order object.
- `$booking` (object) - The associated booking model.
- `$status` (string) - The new status value.

**Example Usage:**
```php
add_action('fluent_booking/payment/status_changed', function($order, $booking, $status) {
    // Handle status transitions (e.g., pending to paid)
}, 10, 3);
```

**Location:** `app/Http/Controllers/SchedulesController.php`, `fluent-booking-pro/app/Services/Integrations/PaymentMethods/BasePaymentMethod.php`

---

## fluent_booking/payment/update_payment_status_paid

Fires specifically when an order status is updated to 'paid'.

**Parameters:**
- `$booking` (object) - The associated booking model.

**Example Usage:**
```php
add_action('fluent_booking/payment/update_payment_status_paid', function($booking) {
    // Trigger post-payment actions (e.g., granting access, sending receipt)
    $order = $booking->payment_order;
}, 10, 1);
```

> [!NOTE]
> This hook is dynamically generated from the pattern `fluent_booking/payment/update_payment_status_{status}`. The same parameter applies to all status variants (e.g., `_paid`, `_refunded`).

**Location:** `app/Http/Controllers/SchedulesController.php`, `fluent-booking-pro/app/Services/Integrations/PaymentMethods/BasePaymentMethod.php`

---

## fluent_booking/after_delete_order

Fires after an order is deleted.

**Parameters:**
- `$order` (object) - The order object being deleted.
- `$booking` (object) - The associated booking model.

**Example Usage:**
```php
add_action('fluent_booking/after_delete_order', function($order, $booking) {
    // Post-deletion tasks for orders
    $order_id = $order->id;
}, 10, 2);
```

**Location:** `app/Hooks/Handlers/CleanupHandlers/BookingCleaner.php`

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
- `$booking` (object) - The booking model associated with the refund.
- `$calendar_event` (object) - The associated calendar event/slot object.

**Example Usage:**
```php
add_action('fluent_booking/refund_payment_stripe', function($booking, $calendar_event) {
    // Custom logic for Stripe refunds
    $order = $booking->payment_order;
}, 10, 2);
```

**Location:** `app/Http/Controllers/SchedulesController.php`
