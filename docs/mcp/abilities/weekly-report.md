---
title: Weekly report
description: A week's booking numbers, with the comparison and the caveats that make them trustworthy.
outline: false
---

# `fluent-booking/weekly-report`

A week's booking numbers, with the comparison and the caveats that make them trustworthy.

## Ability

- **Kind:** Prompt
- **Toolset:** `core`
- **Edition:** Core
- **Mode:** write
- **Permission callback:** `PermissionGate::readGate()`
- **Handler:** `BookingPrompts::weeklyReport()`
- **Source:** `fluent-booking/app/Modules/MCP/Prompts/BookingPrompts.php:81`

## Input schema

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `from` | `string` | No | Y-m-d, start of the period. Defaults to the last 7 days. |
| `to` | `string` | No |  |

## Example call

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "prompts/get",
  "params": {
    "name": "fluent-booking/weekly-report"
  }
}
```
