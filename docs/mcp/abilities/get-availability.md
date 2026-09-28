---
title: Get availability
description: Availability schedules — the weekly hours and date overrides an event type draws on. Lists them, or returns one in full when schedule_id is given. Hours are returned in the schedu…
outline: false
---

# `fluent-booking/get-availability`

Availability schedules — the weekly hours and date overrides an event type draws on. Lists them, or returns one in full when schedule_id is given. Hours are returned in the schedule's own timezone unless you ask for another.

## Ability

- **Kind:** Tool
- **Toolset:** `scheduling`
- **Edition:** Core
- **Mode:** read-only
- **Permission callback:** `PermissionGate::readGate()`
- **Requires:** MCP enabled and an authenticated application password; each tool scopes its own query to what the caller may see
- **Handler:** `SchedulingTools::getAvailability()`
- **Source:** `fluent-booking/app/Modules/MCP/Tools/SchedulingTools.php:45`

## Input schema

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `schedule_id` | `integer` | No | Return this one schedule in full instead of the list. |
| `host_id` | `integer` | No | Only schedules belonging to this host. |
| `timezone` | `string` | No | Express the weekly hours in this IANA zone. Defaults to each schedule's own. |

## Example call

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "fluent-booking/get-availability",
    "arguments": {}
  }
}
```
