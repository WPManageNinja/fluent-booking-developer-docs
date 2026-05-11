---
title: Order Model
description: ORM reference for Order in FluentBooking.
---

# Order Model

<span class="pro-badge">PRO</span>

Payment order created when a paid event is booked (Pro). Tracks total, currency, and order status.

## Class

- **Source:** `fluent-booking-pro/app/Models/Order.php`
- **Table:** `fcal_orders`
- **Primary key:** `id`
- **Extends:** `Model`

## Attributes

| Column | Type | Nullable | Default | Description |
| --- | --- | --- | --- | --- |
| `id` | `BIGINT UNSIGNED NOT NULL PRIMARY KEY` | Yes | `—` | Primary key for the row. |
| `status` | `VARCHAR(20)` | No | `draft` | Lifecycle status (`scheduled`, `cancelled`, `completed`, `rejected`, `pending`). |
| `parent_id` | `BIGINT UNSIGNED` | No | `—` | Parent row used for rescheduled or grouped bookings. |
| `order_number` | `VARCHAR(255)` | No | `` | Order Number stored for this record. |
| `type` | `VARCHAR(20)` | No | `sale` | Subtype discriminator. |
| `customer_id` | `BIGINT UNSIGNED` | No | `—` | Foreign key to a related record. |
| `payment_method` | `VARCHAR(100)` | No | `—` | Selected payment method slug. |
| `payment_mode` | `VARCHAR(100)` | No | `—` | Payment Mode stored for this record. |
| `payment_method_type` | `VARCHAR(100)` | No | `—` | Payment Method Type stored for this record. |
| `payment_method_title` | `VARCHAR(100)` | No | `—` | Payment Method Title stored for this record. |
| `currency` | `VARCHAR(10)` | No | `—` | Currency stored for this record. |
| `subtotal` | `DECIMAL(18,9)` | No | `0.000000000` | Subtotal stored for this record. |
| `discount_tax` | `DECIMAL(18,9)` | No | `0.000000000` | Discount Tax stored for this record. |
| `discount_total` | `DECIMAL(18,9)` | No | `0.000000000` | Discount Total stored for this record. |
| `shipping_tax` | `DECIMAL(18,9)` | No | `0.000000000` | Shipping Tax stored for this record. |
| `shipping_total` | `DECIMAL(18,9)` | No | `0.000000000` | Shipping Total stored for this record. |
| `tax_total` | `DECIMAL(18,9)` | No | `0.000000000` | Tax Total stored for this record. |
| `total_amount` | `DECIMAL(18,9)` | No | `0.000000000` | Total Amount stored for this record. |
| `total_paid` | `DECIMAL(18,9)` | No | `0.000000000` | Total Paid stored for this record. |
| `rate` | `DECIMAL(18,9)` | No | `1.000000000` | Rate stored for this record. |
| `note` | `TEXT` | No | `—` | Note stored for this record. |
| `ip_address` | `TEXT` | No | `—` | IP address recorded when the booking was created. |
| `completed_at` | `DATETIME` | Yes | `—` | Timestamp column. |
| `refunded_at` | `DATETIME` | Yes | `—` | Timestamp column. |
| `uuid` | `VARCHAR(100)` | No | `—` | Uuid stored for this record. |
| `created_at` | `TIMESTAMP` | Yes | `—` | Creation timestamp maintained by the ORM. |
| `updated_at` | `TIMESTAMP` | Yes | `—` | Update timestamp maintained by the ORM. |

## Relationships

| Method | Type | Target |
| --- | --- | --- |
| `items()` | `hasMany` | `OrderItems` |
| `discounts()` | `hasMany` | `OrderItems` |
| `transaction()` | `hasOne` | `Transactions` |
| `booking()` | `belongsTo` | `Booking` |

## Public Methods (sample)

| Method | Signature |
| --- | --- |
| `items()` | `—` |
| `discounts()` | `—` |
| `transaction()` | `—` |
| `booking()` | `—` |
