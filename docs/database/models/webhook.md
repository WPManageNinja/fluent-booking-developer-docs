---
title: Webhook Model
description: ORM reference for Webhook in FluentBooking.
---

# Webhook Model

<span class="pro-badge">PRO</span>

Outbound webhook configuration (Pro). Defines event triggers, target URL, headers, and authentication.

## Class

- **Source:** `fluent-booking-pro/app/Models/Webhook.php`
- **Primary key:** `id`
- **Extends:** `Meta`

## Fillable Attributes

- `key`
- `value`
- `object_type`
- `object_id`

## Public Methods

| Method | Signature |
| --- | --- |
| `store()` | `$slot_id, $data` |
