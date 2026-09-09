---
title: Manage event type
description: Create, edit, duplicate, activate, deactivate or delete an event type. dry_run previews any action and changes nothing. Edits are sectioned the same way the admin saves them, so s…
outline: false
---

# `fluent-booking/manage-event-type`

Create, edit, duplicate, activate, deactivate or delete an event type. dry_run previews any action and changes nothing. Edits are sectioned the same way the admin saves them, so send only the section you are changing; keys you leave out keep their current values, except weekly_schedules and date_overrides, which are replaced whole. update on the availability and limits sections needs a confirm_token, as does delete, which also refuses while ANY booking exists — past or cancelled included, since all of them are deleted with the event type — unless you pass force.

## Ability

- **Kind:** Tool
- **Toolset:** `scheduling`
- **Edition:** Core
- **Mode:** destructive
- **Permission callback:** `PermissionGate::scheduleWriteGate()`
- **Handler:** `SchedulingTools::manageEventType()`
- **Source:** `fluent-booking/app/Modules/MCP/Tools/SchedulingTools.php:131`

## Input schema

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `action` | `string` | Yes |  One of: `create`, `update`, `duplicate`, `activate`, `deactivate`, `delete`. |
| `event_id` | `integer` | No | Required for everything except create. |
| `calendar_id` | `integer` | No | Required for create; the calendar the event type belongs to. |
| `section` | `string` | No | update only. Which group of settings the fields belong to. One of: `details`, `availability`, `limits`, `booking_fields`. |
| `fields` | `object` | No | The settings to write. For create: title, duration, event_type, status, location_settings. For update: whatever that section accepts — call get-event-types with event_id to see the current values first. |
| `force` | `boolean` | No | delete only. Delete even though bookings exist. Every booking on the event type goes with it — past, cancelled and upcoming — plus their activity history and payment records. |
| `dry_run` | `boolean` | No | Preview any action without changing anything. |
| `confirm_token` | `string` | No | From a dry run. Required for delete and for update on the availability and limits sections. |
| `idempotency_key` | `string` | No | Your own id for this change. Retrying with the same key replays the first result instead of repeating the change. |

## Example call

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "fluent-booking/manage-event-type",
    "arguments": {
      "action": "value"
    }
  }
}
```
