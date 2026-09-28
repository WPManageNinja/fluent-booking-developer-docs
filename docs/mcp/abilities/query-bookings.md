---
title: Query bookings
description: Aggregate bookings by one or two dimensions. Answers "how many bookings per host last month", "which event types get cancelled most", "what hours do people book". Returns totals o…
outline: false
---

# `fluent-booking/query-bookings`

Aggregate bookings by one or two dimensions. Answers "how many bookings per host last month", "which event types get cancelled most", "what hours do people book". Returns totals only, never booking rows.

## Ability

- **Kind:** Tool
- **Toolset:** `core`
- **Edition:** Core
- **Mode:** read-only
- **Permission callback:** `PermissionGate::readGate()`
- **Requires:** MCP enabled and an authenticated application password; each tool scopes its own query to what the caller may see
- **Handler:** `ReportTools::queryBookings()`
- **Source:** `fluent-booking/app/Modules/MCP/Tools/ReportTools.php:25`

## Input schema

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `group_by` | `array<string>` | No | One or two dimensions. Omit for a single total over the whole range. |
| `metrics` | `array<string>` | No | Defaults to count. Rates are fractions of that group's bookings, 0 to 1. |
| `date_field` | `string` | No | Which timestamp the range and the day/month/weekday/hour dimensions read. start_time is when the meeting is; created_at is when it was booked. Defaults to start_time. |
| `from` | `string` | No | Y-m-d, inclusive. Defaults to 29 days before to. |
| `to` | `string` | No | Y-m-d, inclusive. Defaults to today. Maximum span 366 days. |
| `timezone` | `string` | No | IANA zone the day, weekday and hour buckets are expressed in. Defaults to the site timezone. |
| `filters` | `object` | No | Narrow the set before grouping. Any of: status (array), event_id, calendar_id, host_id, event_type, source. |
| `having` | `object` | No | Drop small groups, e.g. {"metric":"count","op":">=","value":5}. |
| `order_by` | `string` | No | A metric or a grouped dimension. Time series default to chronological, everything else to largest first. |
| `order` | `string` | No |  One of: `asc`, `desc`. |
| `limit` | `integer` | No | Groups to return. Default 50, maximum 200. |

## Example call

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "fluent-booking/query-bookings",
    "arguments": {}
  }
}
```
