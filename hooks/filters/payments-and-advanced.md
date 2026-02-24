# Payments & Advanced Filter Hooks <Badge type="tip" text="Pro" />

These filters allow you to customize payment-related functionality and advanced system behavior.

## fluent_booking/accepted_currencies

Filters the list of supported currencies for payments.

**Parameters:**
- `$currencies` (array) - List of currencies with their symbols and decimal settings.

**Return:** (array) Modified list of currencies.

**Example Usage:**
```php
add_filter('fluent_booking/accepted_currencies', function($currencies) {
    // Add a custom currency
    $currencies['MYR'] = [
        'title' => 'Malaysian Ringgit',
        'symbol' => 'RM',
        'decimal_sep' => '.',
        'thousand_sep' => ',',
        'precision' => 2
    ];
    return $currencies;
});
```

**Location:** `app/Services/CurrenciesHelper.php`

---

## fluent_booking/payment/get_all_methods <Badge type="tip" text="Pro" />

Filters the list of all available payment methods.

**Parameters:**
- `$methods` (array) - Array of payment methods (default: empty array).

**Return:** (array) Modified methods list.

**Example Usage:**
```php
add_filter('fluent_booking/payment/get_all_methods', function($methods) {
    // Add or remove payment methods
    return $methods;
});
```

**Location:** `fluent-booking-pro/app/Hooks/Handlers/GlobalPaymentHandler.php`

---

## fluent_booking/payment/get_global_payment_methods <Badge type="tip" text="Pro" />

Filters the list of globally configured payment methods.

**Parameters:**
- `$methods` (array) - Array of global payment methods (default: empty array).

**Return:** (array) Modified methods list.

**Location:** `fluent-booking-pro/app/Hooks/Handlers/GlobalPaymentHandler.php`

---

## fluent_booking/payment/get_global_payment_settings_{method} <Badge type="tip" text="Pro" />

Dynamic filter to retrieve global payment settings for a specific payment method. The `{method}` is the payment method key (e.g., `stripe`, `paypal`).

**Parameters:**
- `$settings` (array) - The payment method settings (default: empty array).

**Return:** (array) Modified settings.

**Location:** `fluent-booking-pro/app/Hooks/Handlers/GlobalPaymentHandler.php`

---

## fluent_booking/get_payment_connect_info_{method} <Badge type="tip" text="Pro" />

Dynamic filter to retrieve connection information for a specific payment method. The `{method}` is the payment method key.

**Parameters:**
- `$connectInfo` (array) - Connection information (default: empty array).

**Return:** (array) Modified connection info.

**Location:** `fluent-booking-pro/app/Hooks/Handlers/GlobalPaymentHandler.php`

---

## fluent_booking/get_payment_settings_disconnect_{method} <Badge type="tip" text="Pro" />

Dynamic filter to process disconnection data for a specific payment method. The `{method}` is the payment method key.

**Parameters:**
- `$disconnectData` (array) - Disconnect data including `mode`.

**Return:** (array) Modified disconnect data.

**Location:** `fluent-booking-pro/app/Hooks/Handlers/GlobalPaymentHandler.php`

---

## fluent_booking/payment/get_payment_settings <Badge type="tip" text="Pro" />

Filters the payment settings for a specific calendar event.

**Parameters:**
- `$data` (array) - The payment settings data.
- `$calendarEvent` (object) - The calendar event object.

**Return:** (array) Modified payment settings.

**Location:** `fluent-booking-pro/app/Http/Controllers/PaymentMethodController.php`

---

## fluent_booking/payment/payment_settings_before_update_{slug} <Badge type="tip" text="Pro" />

Dynamic filter that fires before a payment method's settings are saved. The `{slug}` is the payment method slug (e.g., `stripe`, `paypal`).

**Parameters:**
- `$settings` (array) - The payment method settings to be saved.

**Return:** (array) Modified settings.

**Location:** `fluent-booking-pro/app/Services/Integrations/PaymentMethods/BasePaymentMethod.php`

---

## fluent_booking/payment_coupon_field <Badge type="tip" text="Pro" />

Filters the coupon input field configuration in the payment form.

**Parameters:**
- `$field` (array) - The coupon field configuration (default: empty array).
- `$exist` (bool) - Whether a coupon exists for the event.

**Return:** (array) Modified field configuration.

**Location:** `fluent-booking-pro/app/Services/Integrations/PaymentMethods/PaymentHelper.php`

---

## fluent_booking/create_draft_order <Badge type="tip" text="Pro" />

Filters the order data before a draft order is created.

**Parameters:**
- `$orderData` (array) - The order data.
- `$booking` (object) - The booking object.
- `$calendarSlot` (object) - The calendar event/slot object.
- `$bookingData` (array) - The raw booking data.

**Return:** (array) Modified order data.

**Location:** `fluent-booking-pro/app/Services/OrderHelper.php`

---

## fluent_booking/create_draft_transactions <Badge type="tip" text="Pro" />

Filters the transaction data before it is saved for an order.

**Parameters:**
- `$transactionData` (array) - The transaction data.
- `$order` (object) - The order object.

**Return:** (array) Modified transaction data.

**Location:** `fluent-booking-pro/app/Services/OrderHelper.php`

---

## fluent_booking/payment_receipt/pre_render_header <Badge type="tip" text="Pro" />

Filters the header section of the payment receipt. Return non-empty HTML to override the default header.

**Parameters:**
- `$html` (string) - The header HTML (default: empty string).
- `$order` (object) - The order object.
- `$receiptSettings` (array) - The receipt settings.

**Return:** (string) Modified header HTML.

**Location:** `fluent-booking-pro/app/Services/ReceiptHelper.php`

---

## fluent_booking/payment_receipt/pre_render_footer <Badge type="tip" text="Pro" />

Filters the footer section of the payment receipt.

**Parameters:**
- `$html` (string) - The footer HTML (default: empty string).
- `$order` (object) - The order object.
- `$receiptSettings` (array) - The receipt settings.

**Return:** (string) Modified footer HTML.

**Location:** `fluent-booking-pro/app/Services/ReceiptHelper.php`

---

## fluent_booking/payment_receipt/pre_render_payment_info <Badge type="tip" text="Pro" />

Filters the payment info section of the payment receipt.

**Parameters:**
- `$html` (string) - The payment info HTML (default: empty string).
- `$order` (object) - The order object.
- `$receiptSettings` (array) - The receipt settings.

**Return:** (string) Modified payment info HTML.

**Location:** `fluent-booking-pro/app/Services/ReceiptHelper.php`

---

## fluent_booking/payment_receipt/pre_render_item_details <Badge type="tip" text="Pro" />

Filters the item details section of the payment receipt.

**Parameters:**
- `$html` (string) - The item details HTML (default: empty string).
- `$order` (object) - The order object.
- `$receiptSettings` (array) - The receipt settings.

**Return:** (string) Modified item details HTML.

**Location:** `fluent-booking-pro/app/Services/ReceiptHelper.php`

---

## fluent_booking/payment_receipt/pre_render_submission_details <Badge type="tip" text="Pro" />

Filters the submission details section of the payment receipt.

**Parameters:**
- `$html` (string) - The submission details HTML (default: empty string).
- `$order` (object) - The order object.
- `$receiptSettings` (array) - The receipt settings.

**Return:** (string) Modified submission details HTML.

**Location:** `fluent-booking-pro/app/Services/ReceiptHelper.php`

---

## fluent_booking/validate_coupon_data <Badge type="tip" text="Pro" />

Filters the validation result when a coupon code is applied to a booking.

**Parameters:**
- `$couponData` (array) - The coupon data (or error data).
- `$couponCode` (string) - The coupon code entered.
- `$eventId` (int) - The calendar event/slot ID.
- `$totalAmount` (float) - The total booking amount.
- `$otherCoupons` (array) - Other coupons already applied.

**Return:** (array) Modified coupon validation data.

**Example Usage:**
```php
add_filter('fluent_booking/validate_coupon_data', function($couponData, $couponCode, $eventId, $totalAmount, $otherCoupons) {
    // Add additional coupon validation logic
    return $couponData;
}, 10, 5);
```

**Location:** `fluent-booking-pro/app/Modules/Coupon/CouponModule.php`

---

## fluent_booking/default_coupon_data <Badge type="tip" text="Pro" />

Filters the default data structure when creating a new coupon.

**Parameters:**
- `$couponData` (array) - The default coupon data with fields like `title`, `code`, `discount_type`, `discount_amount`, `status`, etc.

**Return:** (array) Modified default coupon data.

**Location:** `fluent-booking-pro/app/Modules/Coupon/CouponService.php`

---

## fluent_booking/create_coupon_data <Badge type="tip" text="Pro" />

Filters the coupon data before a new coupon is created.

**Parameters:**
- `$couponData` (array) - The coupon data to be saved.

**Return:** (array) Modified coupon data.

**Location:** `fluent-booking-pro/app/Modules/Coupon/Http/Controllers/CouponController.php`

---

## fluent_booking/update_coupon_data <Badge type="tip" text="Pro" />

Filters the coupon data before an existing coupon is updated.

**Parameters:**
- `$couponData` (array) - The coupon data to be updated.

**Return:** (array) Modified coupon data.

**Location:** `fluent-booking-pro/app/Modules/Coupon/Http/Controllers/CouponController.php`

---

## fluent_booking/backend_sanitized_values

Filters values after sanitization in backend form processing.

**Parameters:**
- `$inputs` (array) - The sanitized input values.
- `$originalValues` (array) - The original values before sanitization.

**Return:** (array) Modified sanitized values.

**Location:** `app/Services/Helper.php`

---

## fluent_booking_global_checkout_mode <Badge type="tip" text="Pro" />

Filters the Stripe checkout mode (onsite or hosted checkout).

**Parameters:**
- `$mode` (string) - The checkout mode (default: `'onsite'`).

**Return:** (string) Modified checkout mode.

**Location:** `fluent-booking-pro/app/Services/Integrations/PaymentMethods/Stripe/Stripe.php`

---

## fluent-booking/payment/stripe_checkout_session_args <Badge type="tip" text="Pro" />

Filters the Stripe checkout session arguments before sending to the Stripe API.

**Parameters:**
- `$sessionData` (array) - The Stripe checkout session data.

**Return:** (array) Modified session data.

**Location:** `fluent-booking-pro/app/Services/Integrations/PaymentMethods/Stripe/Stripe.php`

---

## fluent_booking_form_disable_stripe_connect <Badge type="tip" text="Pro" />

Filters whether Stripe Connect should be disabled.

**Parameters:**
- `$disable` (bool) - Whether to disable Stripe Connect (default: `false`).

**Return:** (bool) Modified flag.

**Location:** `fluent-booking-pro/app/Services/Integrations/PaymentMethods/Stripe/StripeSettings.php`

---

## fluent_booking_stripe_request_body <Badge type="tip" text="Pro" />

Filters the Stripe API request body before sending.

**Parameters:**
- `$request` (array) - The request body data.
- `$api` (string) - The API endpoint.

**Return:** (array) Modified request body.

**Location:** `fluent-booking-pro/app/Services/Integrations/PaymentMethods/Stripe/API/ApiRequest.php`

---

## fluent_booking_stripe_idempotency_key <Badge type="tip" text="Pro" />

Filters the idempotency key used for Stripe API requests.

**Parameters:**
- `$key` (string) - The generated idempotency key.
- `$request` (array) - The request data.

**Return:** (string) Modified idempotency key.

**Location:** `fluent-booking-pro/app/Services/Integrations/PaymentMethods/Stripe/API/ApiRequest.php`

---

## fluent_booking/process_paypal_ipn_data <Badge type="tip" text="Pro" />

Filters the PayPal IPN (Instant Payment Notification) data during processing.

**Parameters:**
- `$encodedData` (array) - The encoded PayPal IPN data.

**Return:** (array) Modified IPN data.

**Location:** `fluent-booking-pro/app/Services/Integrations/PaymentMethods/Paypal/API/IPN.php`

---

## fluent_booking/will_refresh_woo_cart <Badge type="tip" text="Pro" />

Filters whether the WooCommerce cart should be refreshed/cleared when a booking is made.

**Parameters:**
- `$willRefresh` (bool) - Whether to refresh the cart (default: `true`).
- `$booking` (object) - The booking object.
- `$wooProductId` (int) - The WooCommerce product ID.

**Return:** (bool) Modified flag.

**Location:** `fluent-booking-pro/app/Services/Integrations/Woo/Bootstrap.php`

---

## fluent_booking/file_upload_validation_rules_data <Badge type="tip" text="Pro" />

Filters the validation rules and messages for file uploads.

**Parameters:**
- `$validationConfig` (array) - Array with `rules` and `messages` keys for file upload validation.

**Return:** (array) Modified validation config.

**Location:** `fluent-booking-pro/app/Hooks/Handlers/UploadHandler.php`
