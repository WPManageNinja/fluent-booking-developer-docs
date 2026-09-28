---
title: Get available slots
description: Bookable times for an event type, keyed by date in the requested timezone. Pass start_time instead of a range to check one specific slot. Uses the same engine as the public bookin…
outline: false
---

# `fluent-booking/get-available-slots`

Bookable times for an event type, keyed by date in the requested timezone. Pass start_time instead of a range to check one specific slot. Uses the same engine as the public booking page.

## Ability

- **Kind:** Tool
- **Toolset:** `core`
- **Edition:** Core
- **Mode:** read-only
- **Permission callback:** `PermissionGate::readGate()`
- **Requires:** MCP enabled and an authenticated application password; each tool scopes its own query to what the caller may see
- **Handler:** `SlotTools::getSlots()`
- **Source:** `fluent-booking/app/Modules/MCP/Tools/SlotTools.php:24`

## Input schema

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `event_id` | `integer` | Yes | The event type to check. |
| `from` | `string` | No | First date to check, Y-m-d. Defaults to today. |
| `to` | `string` | No | Last date to check, Y-m-d. Defaults to 14 days out; 62 days maximum. |
| `start_time` | `string` | No | Check one slot instead of a range: Y-m-d H:i:s in the given timezone. |
| `timezone` | `string` | No | IANA timezone the times are returned in. Defaults to the site timezone. |
| `duration` | `integer` | No | Minutes, for events that offer several durations. Defaults to the event default. |
| `host_id` | `integer` | No | Restrict to one host on a team event. |

## Example call

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "fluent-booking/get-available-slots",
    "arguments": {
      "event_id": 1
    }
  }
}
```
