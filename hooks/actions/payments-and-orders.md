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

---

## fluent_booking/register_payment_methods

Fires during payment system initialization, allowing third-party payment methods to be registered.

**Example Usage:**
```php
add_action('fluent_booking/register_payment_methods', function() {
    // Register a custom payment method
});
```

**Location:** `fluent-booking-pro/app/Hooks/Handlers/GlobalPaymentHandler.php`

---

## fluent_booking/payment/ipn_endpoint_{paymentMethod}

Dynamic hook that fires when an IPN (Instant Payment Notification) endpoint is hit for a specific payment method. The `{paymentMethod}` is the payment gateway identifier (e.g., `stripe`, `paypal`).

**Example Usage:**
```php
add_action('fluent_booking/payment/ipn_endpoint_stripe', function() {
    // Handle Stripe IPN/webhook callback
});
```

**Location:** `fluent-booking-pro/app/Hooks/Handlers/GlobalPaymentHandler.php`

---

## fluent_booking/payment/pay_order_with_{paymentMethod}

Dynamic hook that fires to process a payment with a specific payment method. The `{paymentMethod}` is the payment gateway identifier.

**Parameters:**
- `$booking` (object) - The booking model object.
- `$calendarSlot` (object) - The calendar event/slot object.
- `$order` (object) - The order object.

**Example Usage:**
```php
add_action('fluent_booking/payment/pay_order_with_stripe', function($booking, $calendarSlot, $order) {
    // Process the Stripe payment
}, 10, 3);
```

**Location:** `fluent-booking-pro/app/Services/Integrations/PaymentMethods/BasePaymentMethod.php`

---

## fluent_booking/payment/payment_settings_update_{method}

Dynamic hook that fires when payment method settings are updated. The `{method}` is the payment gateway identifier.

**Parameters:**
- `$data` (array) - The settings data being saved.

**Example Usage:**
```php
add_action('fluent_booking/payment/payment_settings_update_stripe', function($data) {
    // React to Stripe settings being updated
}, 10, 1);
```

**Location:** `fluent-booking-pro/app/Http/Controllers/PaymentMethodController.php`

---

## fluent_booking/payment/status_changed_{paymentMethod}

Dynamic hook that fires when a payment status changes for a specific payment method. The `{paymentMethod}` is the payment gateway identifier.

**Parameters:**
- `$order` (object) - The order object.
- `$booking` (object) - The associated booking model.
- `$transactionData` (array) - The transaction data including the new status.

**Example Usage:**
```php
add_action('fluent_booking/payment/status_changed_stripe', function($order, $booking, $transactionData) {
    // Handle Stripe-specific payment status change
    $status = $transactionData['status'];
}, 10, 3);
```

**Location:** `fluent-booking-pro/app/Http/Controllers/TransactionController.php`

---

## fluent-booking/before_render_payment_method_{slug}

Dynamic hook that fires before a payment method UI is rendered on the booking form. The `{slug}` is the payment method slug (e.g., `stripe`, `paypal`, `offline`).

> [!NOTE]
> Note the hook prefix uses a hyphen (`fluent-booking`) instead of the usual slash (`fluent_booking`).

**Parameters:**
- `$method` (array) - The payment method configuration array.

**Example Usage:**
```php
add_action('fluent-booking/before_render_payment_method_stripe', function($method) {
    // Add custom content before the Stripe payment method renders
}, 10, 1);
```

**Location:** `fluent-booking-pro/app/Services/Integrations/PaymentMethods/Stripe/Stripe.php`, `fluent-booking-pro/app/Services/Integrations/PaymentMethods/Paypal/Paypal.php`, `fluent-booking-pro/app/Services/Integrations/PaymentMethods/Offline/Offline.php`

---

## fluent_booking/payment_receipt/after_content

Fires after the payment receipt content is rendered.

**Parameters:**
- `$order` (object) - The order object.
- `$receiptSettings` (array) - The receipt display settings.

**Example Usage:**
```php
add_action('fluent_booking/payment_receipt/after_content', function($order, $receiptSettings) {
    // Add custom content to the payment receipt
    echo '<p>Custom receipt note</p>';
}, 10, 2);
```

**Location:** `fluent-booking-pro/app/Services/ReceiptHelper.php`

---

## fluent_booking/ipn_paypal_action_web_accept

Fires when a PayPal IPN `web_accept` action is received and processed.

**Parameters:**
- `$encodedDataArray` (array) - The encoded PayPal IPN data.
- `$bookingId` (int) - The booking ID.
- `$booking` (object) - The booking model object.

**Example Usage:**
```php
add_action('fluent_booking/ipn_paypal_action_web_accept', function($encodedDataArray, $bookingId, $booking) {
    // Custom logic for PayPal IPN web_accept events
}, 10, 3);
```

**Location:** `fluent-booking-pro/app/Services/Integrations/PaymentMethods/Paypal/API/IPN.php`

