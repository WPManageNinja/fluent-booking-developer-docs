---
title: Diagnose availability
description: Explain why an event type is or is not offering slots. Returns every rule that can remove slots with its configured value, and attributes each empty date to the specific rule resp…
outline: false
---

# `fluent-booking/diagnose-availability`

Explain why an event type is or is not offering slots. Returns every rule that can remove slots with its configured value, and attributes each empty date to the specific rule responsible.

## Ability

- **Kind:** Tool
- **Toolset:** `core`
- **Edition:** Core
- **Mode:** read-only
- **Permission callback:** `PermissionGate::readGate()`
- **Handler:** `SlotTools::diagnose()`
- **Source:** `fluent-booking/app/Modules/MCP/Tools/SlotTools.php:73`

## Input schema

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `event_id` | `integer` | Yes | The event type to investigate. |
| `from` | `string` | No | First date to investigate, Y-m-d. Defaults to today. |
| `to` | `string` | No | Last date to investigate, Y-m-d. Defaults to 14 days out; 62 days maximum. |
| `timezone` | `string` | No | IANA timezone the dates are interpreted in. |
| `host_id` | `integer` | No | Investigate one host on a team event. |

## Example call

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "fluent-booking/diagnose-availability",
    "arguments": {
      "event_id": 1
    }
  }
}
```
