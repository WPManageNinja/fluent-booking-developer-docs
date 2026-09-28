---
title: Manage availability
description: Create, rename, edit, clone, set as default or delete an availability schedule. dry_run previews any action and changes nothing. update replaces the whole weekly grid and delete r…
outline: false
---

# `fluent-booking/manage-availability`

Create, rename, edit, clone, set as default or delete an availability schedule. dry_run previews any action and changes nothing. update replaces the whole weekly grid and delete removes the schedule, so both need a confirm_token from a dry run; delete also refuses a schedule still in use.

## Ability

- **Kind:** Tool
- **Toolset:** `scheduling`
- **Edition:** Core
- **Mode:** destructive
- **Permission callback:** `PermissionGate::scheduleWriteGate()`
- **Requires:** one of `manage_own_calendar`, `manage_other_calendars`, `manage_other_availabilities`, `manage_all_data` — see [Permissions](/platform/permissions)
- **Handler:** `SchedulingTools::manageAvailability()`
- **Source:** `fluent-booking/app/Modules/MCP/Tools/SchedulingTools.php:73`

## Input schema

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `action` | `string` | Yes |  One of: `create`, `update`, `rename`, `clone`, `set_default`, `delete`. |
| `schedule_id` | `integer` | No | Required for everything except create. |
| `title` | `string` | No | Required for create and rename. |
| `timezone` | `string` | No | IANA zone the weekly hours and overrides are expressed in. Defaults to the schedule's own. |
| `weekly_schedules` | `object` | No | update only. Keyed sun..sat, each {enabled, slots:[{start,end}]} in 24h HH:MM. Replaces the whole grid. |
| `date_overrides` | `object` | No | update only. Keyed by date, each Y-m-d mapping to [{start,end}] in 24h HH:MM. Replaces all existing overrides; dates in the past are dropped. |
| `dry_run` | `boolean` | No | Preview any action without changing anything. |
| `confirm_token` | `string` | No | From a dry run. Required for update and delete. |
| `idempotency_key` | `string` | No | Your own id for this change. Retrying with the same key replays the first result instead of repeating the change. |

## Example call

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "fluent-booking/manage-availability",
    "arguments": {
      "action": "value"
    }
  }
}
```
