---
title: Troubleshoot an event type
description: Work out why an event type is showing no slots, or the wrong ones, and say what to change.
outline: false
---

# `fluent-booking/troubleshoot-event`

Work out why an event type is showing no slots, or the wrong ones, and say what to change.

## Ability

- **Kind:** Prompt
- **Toolset:** `core`
- **Edition:** Core
- **Mode:** write
- **Permission callback:** `PermissionGate::readGate()`
- **Requires:** MCP enabled and an authenticated application password; each tool scopes its own query to what the caller may see
- **Handler:** `BookingPrompts::troubleshootEvent()`
- **Source:** `fluent-booking/app/Modules/MCP/Prompts/BookingPrompts.php:50`

## Input schema

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `event_id` | `integer` | Yes | The event type to investigate. |
| `complaint` | `string` | No | What the operator or attendee actually reported, in their own words. |
| `from` | `string` | No |  |
| `to` | `string` | No |  |

## Example call

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "prompts/get",
  "params": {
    "name": "fluent-booking/troubleshoot-event"
  }
}
```
