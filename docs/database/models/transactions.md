---
title: Transactions Model
description: ORM reference for Transactions in FluentBooking.
---

# Transactions Model

<span class="pro-badge">PRO</span>

Transaction records persisted for each payment gateway response (Pro). Includes successful, refunded, and failed attempts.

## Class

- **Source:** `fluent-booking-pro/app/Models/Transactions.php`
- **Table:** `fcal_transactions`
- **Primary key:** `id`
- **Extends:** `Model`

## Attributes

| Column | Type | Nullable | Default | Description |
| --- | --- | --- | --- | --- |
| `id` | `BIGINT(20) UNSIGNED NOT NULL PRIMARY KEY` | Yes | `—` | Primary key for the row. |
| `object_id` | `BIGINT UNSIGNED` | No | `0` | Polymorphic object ID for the meta row. |
| `object_type` | `VARCHAR(100)` | No | `` | Polymorphic object type for the meta row. |
| `transaction_type` | `varchar(255)` | Yes | `one_time` | Transaction Type stored for this record. |
| `subscription_id` | `int(11)` | Yes | `—` | Foreign key to a related record. |
| `card_last_4` | `int(4)` | Yes | `—` | Card Last 4 stored for this record. |
| `card_brand` | `varchar(255)` | Yes | `—` | Card Brand stored for this record. |
| `vendor_charge_id` | `VARCHAR(192)` | No | `` | Foreign key to a related record. |
| `payment_method` | `VARCHAR(100)` | No | `` | Selected payment method slug. |
| `payment_method_type` | `VARCHAR(100)` | No | `` | Payment Method Type stored for this record. |
| `status` | `VARCHAR(20)` | No | `` | Lifecycle status (`scheduled`, `cancelled`, `completed`, `rejected`, `pending`). |
| `total` | `DECIMAL(18,9)` | No | `0.000000000` | Total stored for this record. |
| `rate` | `DECIMAL(10,5)` | No | `1.00000` | Rate stored for this record. |
| `uuid` | `VARCHAR(100)` | No | `` | Uuid stored for this record. |
| `meta` | `json` | Yes | `—` | Serialized meta payload. |
| `created_at` | `TIMESTAMP` | Yes | `—` | Creation timestamp maintained by the ORM. |
| `updated_at` | `TIMESTAMP` | Yes | `—` | Update timestamp maintained by the ORM. |

## Public Methods

| Method | Signature |
| --- | --- |
| `getMetaAttribute()` | `$meta` |
