---
title: Coupons Actions
description: Action hooks fired during coupon lifecycle events (Pro).
---

# Coupons Actions

Action hooks fired during coupon lifecycle events (Pro).

5 unique action hooks currently map to this category, across 5 call sites.

## Hook Inventory

| Hook | Edition | Call Sites | First Source |
| --- | --- | --- | --- |
| [`fluent_booking/after_delete_coupon`](#fluentbookingafterdeletecoupon) | <span class="pro-badge">PRO</span> | 1 | `fluent-booking-pro/app/Modules/Coupon/Http/Controllers/CouponController.php:140` |
| [`fluent_booking/before_delete_coupon`](#fluentbookingbeforedeletecoupon) | <span class="pro-badge">PRO</span> | 1 | `fluent-booking-pro/app/Modules/Coupon/Http/Controllers/CouponController.php:136` |
| [`fluent_booking/coupon_created`](#fluentbookingcouponcreated) | <span class="pro-badge">PRO</span> | 1 | `fluent-booking-pro/app/Modules/Coupon/Http/Controllers/CouponController.php:79` |
| [`fluent_booking/coupon_status_changed`](#fluentbookingcouponstatuschanged) | <span class="pro-badge">PRO</span> | 1 | `fluent-booking-pro/app/Modules/Coupon/CouponModel.php:114` |
| [`fluent_booking/coupon_updated`](#fluentbookingcouponupdated) | <span class="pro-badge">PRO</span> | 1 | `fluent-booking-pro/app/Modules/Coupon/Http/Controllers/CouponController.php:123` |

<a id="fluentbookingafterdeletecoupon"></a>

## `fluent_booking/after_delete_coupon`

- **Type:** action
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1

**Source locations**

- `fluent-booking-pro/app/Modules/Coupon/Http/Controllers/CouponController.php:140`

**Example**

```php
add_action('fluent_booking/after_delete_coupon', function (...$args) {
    // Your custom logic here.
}, 10, count($args ?? []));
```

<a id="fluentbookingbeforedeletecoupon"></a>

## `fluent_booking/before_delete_coupon`

- **Type:** action
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1

**Source locations**

- `fluent-booking-pro/app/Modules/Coupon/Http/Controllers/CouponController.php:136`

**Example**

```php
add_action('fluent_booking/before_delete_coupon', function (...$args) {
    // Your custom logic here.
}, 10, count($args ?? []));
```

<a id="fluentbookingcouponcreated"></a>

## `fluent_booking/coupon_created`

- **Type:** action
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1

**Source locations**

- `fluent-booking-pro/app/Modules/Coupon/Http/Controllers/CouponController.php:79`

**Example**

```php
add_action('fluent_booking/coupon_created', function (...$args) {
    // Your custom logic here.
}, 10, count($args ?? []));
```

<a id="fluentbookingcouponstatuschanged"></a>

## `fluent_booking/coupon_status_changed`

- **Type:** action
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1

**Source locations**

- `fluent-booking-pro/app/Modules/Coupon/CouponModel.php:114`

**Example**

```php
add_action('fluent_booking/coupon_status_changed', function (...$args) {
    // Your custom logic here.
}, 10, count($args ?? []));
```

<a id="fluentbookingcouponupdated"></a>

## `fluent_booking/coupon_updated`

- **Type:** action
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1

**Source locations**

- `fluent-booking-pro/app/Modules/Coupon/Http/Controllers/CouponController.php:123`

**Example**

```php
add_action('fluent_booking/coupon_updated', function (...$args) {
    // Your custom logic here.
}, 10, count($args ?? []));
```
