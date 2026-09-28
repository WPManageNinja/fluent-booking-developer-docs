---
title: List reference data
description: "The lookup lists get-booking-context leaves out on larger sites, plus the ones only configuration work needs: hosts, calendars, location providers, an event type's booking fields,…"
outline: false
---

# `fluent-booking/list-reference-data`

The lookup lists get-booking-context leaves out on larger sites, plus the ones only configuration work needs: hosts, calendars, location providers, an event type's booking fields, and availability schedules. Ask only for the kinds you need.

## Ability

- **Kind:** Tool
- **Toolset:** `scheduling`
- **Edition:** Core
- **Mode:** read-only
- **Permission callback:** `PermissionGate::readGate()`
- **Requires:** MCP enabled and an authenticated application password; each tool scopes its own query to what the caller may see
- **Handler:** `SchedulingTools::listReferenceData()`
- **Source:** `fluent-booking/app/Modules/MCP/Tools/SchedulingTools.php:182`

## Input schema

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `kinds` | `array<string>` | Yes |  |
| `event_id` | `integer` | No | Required for booking_fields; they are per event type. |

## Example call

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "fluent-booking/list-reference-data",
    "arguments": {
      "kinds": []
    }
  }
}
```
