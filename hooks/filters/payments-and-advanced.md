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

## fluent_booking/payment_methods

Filters the list of available payment methods.

**Parameters:**
- `$methods` (array) - List of payment method objects/configurations.

**Return:** (array) Modified methods list.

---

## fluent_booking/coupon_validation

Filters the validation result when a coupon is applied to a booking.

**Parameters:**
- `$result` (array) - Validation result (error or success).
- `$coupon` (object) - The coupon object being validated.
- `$booking` (object) - The associated booking object.

**Return:** (array) Modified validation result.

**Example Usage:**
```php
add_filter('fluent_booking/coupon_validation', function($result, $coupon, $booking) {
    // Add additional validation logic for coupons
    return $result;
}, 10, 3);
```

---

## fluent_booking/backend_sanitized_values

Filters values before they are saved to the database in certain backend components.

**Parameters:**
- `$values` (array) - The values being saved.
- `$component` (string) - The component name.

**Return:** (array) Sanitized values.
