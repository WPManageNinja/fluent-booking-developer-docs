---
title: Get booking context
description: Call this first. Returns who you are, what you may do, the site timezone and current time, valid enum values for every filter, headline counts, and small reference lists of hosts,…
outline: false
---

# `fluent-booking/get-booking-context`

Call this first. Returns who you are, what you may do, the site timezone and current time, valid enum values for every filter, headline counts, and small reference lists of hosts, calendars and event types.

## Ability

- **Kind:** Tool
- **Toolset:** `core`
- **Edition:** Core
- **Mode:** read-only, idempotent
- **Permission callback:** `PermissionGate::readGate()`
- **Handler:** `ContextTools::getContext()`
- **Source:** `fluent-booking/app/Modules/MCP/Tools/ContextTools.php:155`

## Input schema

This ability takes no parameters.

## Example call

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "fluent-booking/get-booking-context",
    "arguments": {}
  }
}
```
