---
title: OrderItems Model
description: ORM reference for OrderItems in FluentBooking.
---

# OrderItems Model

<span class="pro-badge">PRO</span>

Line items belonging to a payment order (Pro). One row per bookable item (event, addon, coupon).

## Class

- **Source:** `fluent-booking-pro/app/Models/OrderItems.php`
- **Table:** `fcal_order_items`
- **Primary key:** `id`
- **Extends:** `Model`

## Attributes

| Column | Type | Nullable | Default | Description |
| --- | --- | --- | --- | --- |
| `id` | `BIGINT(20) UNSIGNED NOT NULL PRIMARY KEY` | Yes | `—` | Primary key for the row. |
| `order_id` | `BIGINT UNSIGNED` | No | `0` | Foreign key to a related record. |
| `booking_id` | `BIGINT UNSIGNED` | No | `0` | Foreign key to a related record. |
| `item_name` | `TEXT` | No | `—` | Item Name stored for this record. |
| `type` | `VARCHAR(255)` | Yes | `—` | Subtype discriminator. |
| `quantity` | `INT` | No | `0` | Quantity stored for this record. |
| `item_price` | `DECIMAL(18,9)` | No | `0.000000000` | Item Price stored for this record. |
| `item_total` | `DECIMAL(18,9)` | No | `0.000000000` | Item Total stored for this record. |
| `rate` | `DECIMAL(18,9)` | No | `1.000000000` | Rate stored for this record. |
| `line_meta` | `TEXT` | Yes | `—` | Line Meta stored for this record. |
| `created_at` | `TIMESTAMP` | Yes | `—` | Creation timestamp maintained by the ORM. |
| `updated_at` | `TIMESTAMP` | Yes | `—` | Update timestamp maintained by the ORM. |
