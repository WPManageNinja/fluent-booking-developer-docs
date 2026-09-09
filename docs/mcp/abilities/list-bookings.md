---
title: List bookings
description: List bookings with filters. Returns a compact row per booking; attendee emails are masked unless include_pii is set. Use get-booking for one booking in full.
outline: false
---

# `fluent-booking/list-bookings`

List bookings with filters. Returns a compact row per booking; attendee emails are masked unless include_pii is set. Use get-booking for one booking in full.

## Ability

- **Kind:** Tool
- **Toolset:** `core`
- **Edition:** Core
- **Mode:** read-only
- **Permission callback:** `PermissionGate::readGate()`
- **Handler:** `BookingTools::listBookings()`
- **Source:** `fluent-booking/app/Modules/MCP/Tools/BookingTools.php:41`

## Input schema

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `period` | `string` | No | Computed bucket. Defaults to upcoming. |
| `status` | `array<string>` | No | Filter by raw status values instead of a period bucket. |
| `calendar_id` | `integer` | No |  |
| `event_id` | `integer` | No |  |
| `event_type` | `string` | No |  |
| `host_id` | `integer` | No |  |
| `email` | `string` | No | Exact attendee email match. |
| `search` | `string` | No | Free-text search across attendee name, email and phone. |
| `from` | `string` | No | Start of the booking date range, Y-m-d. |
| `to` | `string` | No | End of the booking date range, Y-m-d. |
| `timezone` | `string` | No | IANA timezone for the *_local times in the response. Defaults to the site timezone. |
| `group_bookings` | `boolean` | No | Collapse group bookings to one row, matching the admin list. Default true. |
| `include_pii` | `boolean` | No | Return unmasked attendee emails. Requires read access to all bookings. |
| `page` | `integer` | No |  |
| `per_page` | `integer` | No |  |

## Example call

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "fluent-booking/list-bookings",
    "arguments": {}
  }
}
```
