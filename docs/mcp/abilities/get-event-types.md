---
title: Get event types
description: "List bookable event types, or pass event_id for one event's full configuration: durations, location, availability, booking limits, buffers and questions."
outline: false
---

# `fluent-booking/get-event-types`

List bookable event types, or pass event_id for one event's full configuration: durations, location, availability, booking limits, buffers and questions.

## Ability

- **Kind:** Tool
- **Toolset:** `core`
- **Edition:** Core
- **Mode:** read-only
- **Permission callback:** `PermissionGate::readGate()`
- **Requires:** MCP enabled and an authenticated application password; each tool scopes its own query to what the caller may see
- **Handler:** `EventTypeTools::getEventTypes()`
- **Source:** `fluent-booking/app/Modules/MCP/Tools/EventTypeTools.php:26`

## Input schema

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `event_id` | `integer` | No | Return this one event type in full instead of a list. |
| `calendar_id` | `integer` | No |  |
| `host_id` | `integer` | No | The host who OWNS the event type. Note this is not the same as list-bookings' host_id, which matches the host on a booking. |
| `event_type` | `string` | No |  |
| `status` | `string` | No |  One of: `active`, `draft`. |
| `search` | `string` | No |  |
| `page` | `integer` | No |  |
| `per_page` | `integer` | No |  |

## Example call

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "fluent-booking/get-event-types",
    "arguments": {}
  }
}
```
