# Coupons Action Hooks <Badge type="tip" text="Pro" />

These hooks are triggered during coupon management (available in the Pro version).

## fluent_booking/coupon_created

Fires after a new coupon is created.

**Parameters:**
- `$coupon` (object) - The newly created coupon object.

**Example Usage:**
```php
add_action('fluent_booking/coupon_created', function($coupon) {
    // Perform actions after coupon creation
    $couponCode = $coupon->code;
}, 10, 1);
```

**Location:** `fluent-booking-pro/app/Modules/Coupon/Http/Controllers/CouponController.php`

---

## fluent_booking/coupon_updated

Fires after a coupon is updated.

**Parameters:**
- `$coupon` (object) - The updated coupon object.

**Example Usage:**
```php
add_action('fluent_booking/coupon_updated', function($coupon) {
    // React to coupon updates
}, 10, 1);
```

**Location:** `fluent-booking-pro/app/Modules/Coupon/Http/Controllers/CouponController.php`

---

## fluent_booking/coupon_status_changed

Fires when a coupon's status changes.

**Parameters:**
- `$coupon` (object) - The coupon object.
- `$previousStatus` (string) - The previous status value.
- `$newStatus` (string) - The new status value.

**Example Usage:**
```php
add_action('fluent_booking/coupon_status_changed', function($coupon, $previousStatus, $newStatus) {
    // Handle coupon status transitions
}, 10, 3);
```

**Location:** `fluent-booking-pro/app/Modules/Coupon/CouponModel.php`

---

## fluent_booking/before_delete_coupon

Fires before a coupon is deleted.

**Parameters:**
- `$coupon` (object) - The coupon object about to be deleted.

**Example Usage:**
```php
add_action('fluent_booking/before_delete_coupon', function($coupon) {
    // Pre-deletion cleanup
    $couponId = $coupon->id;
}, 10, 1);
```

**Location:** `fluent-booking-pro/app/Modules/Coupon/Http/Controllers/CouponController.php`

---

## fluent_booking/after_delete_coupon

Fires after a coupon is deleted.

**Parameters:**
- `$couponId` (int) - The ID of the deleted coupon.

**Example Usage:**
```php
add_action('fluent_booking/after_delete_coupon', function($couponId) {
    // Post-deletion cleanup
}, 10, 1);
```

**Location:** `fluent-booking-pro/app/Modules/Coupon/Http/Controllers/CouponController.php`
