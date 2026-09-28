---
title: Get payments
description: Booking orders and their transactions. Lists orders with filters, or returns one order in full with its transactions and the booking it belongs to when order_id is given. Transact…
outline: false
---

# `fluent-booking/get-payments`

Booking orders and their transactions. Lists orders with filters, or returns one order in full with its transactions and the booking it belongs to when order_id is given. Transactions come back as {items, total} and say so when an order has more than the 50 they return. Read only — refunds are not available through MCP.

## Ability

- **Kind:** Tool
- **Toolset:** `payments`
- **Edition:** <span class="pro-badge">PRO</span>
- **Mode:** read-only
- **Permission callback:** `PermissionGate::readGate()`
- **Requires:** MCP enabled and an authenticated application password; each tool scopes its own query to what the caller may see
- **Handler:** `PaymentTools::getPayments()`
- **Source:** `fluent-booking-pro/app/Modules/MCP/PaymentTools.php:60`

## Input schema

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `order_id` | `integer` | No | Return this one order in full instead of the list. |
| `booking_id` | `integer` | No | Orders belonging to one booking. |
| `status` | `array<string>` | No | Filter by order status, e.g. paid, draft, refunded. |
| `payment_method` | `string` | No | e.g. stripe, paypal, offline. |
| `from` | `string` | No | Orders created on or after this date, Y-m-d. |
| `to` | `string` | No | Orders created on or before this date, Y-m-d. |
| `timezone` | `string` | No | IANA timezone for the *_local times in the response. Defaults to the site timezone. |
| `page` | `integer` | No |  |
| `per_page` | `integer` | No |  |

## Example call

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "fluent-booking/get-payments",
    "arguments": {}
  }
}
```
