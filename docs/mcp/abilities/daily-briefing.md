---
title: Daily briefing
description: "Summarise a day's schedule: what is booked, what needs a decision, and what changed."
outline: false
---

# `fluent-booking/daily-briefing`

Summarise a day's schedule: what is booked, what needs a decision, and what changed.

## Ability

- **Kind:** Prompt
- **Toolset:** `core`
- **Edition:** Core
- **Mode:** write
- **Permission callback:** `PermissionGate::readGate()`
- **Handler:** `BookingPrompts::dailyBriefing()`
- **Source:** `fluent-booking/app/Modules/MCP/Prompts/BookingPrompts.php:32`

## Input schema

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `date` | `string` | No | Y-m-d. Defaults to today. |
| `host_id` | `integer` | No | Brief for one host only. |
| `timezone` | `string` | No | IANA zone to report times in. |

## Example call

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "prompts/get",
  "params": {
    "name": "fluent-booking/daily-briefing"
  }
}
```
