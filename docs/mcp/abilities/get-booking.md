---
title: Get booking
description: Full detail for one booking by id or hash, including attendee contact details, location, status history and cancellation reason. Use include to add form answers, guests, hosts or…
outline: false
---

# `fluent-booking/get-booking`

Full detail for one booking by id or hash, including attendee contact details, location, status history and cancellation reason. Use include to add form answers, guests, hosts or the activity timeline.

## Ability

- **Kind:** Tool
- **Toolset:** `core`
- **Edition:** Core
- **Mode:** read-only
- **Permission callback:** `PermissionGate::readGate()`
- **Handler:** `BookingTools::getBooking()`
- **Source:** `fluent-booking/app/Modules/MCP/Tools/BookingTools.php:115`

## Input schema

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `booking_id` | `integer` | No |  |
| `hash` | `string` | No | The booking hash, as an alternative to booking_id. |
| `include` | `array<string>` | No | Extra sections to load. Each one costs an additional query. |
| `timezone` | `string` | No | IANA timezone for the *_local times in the response. |

## Example call

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "fluent-booking/get-booking",
    "arguments": {}
  }
}
```
