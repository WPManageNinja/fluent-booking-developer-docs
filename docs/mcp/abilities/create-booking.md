---
title: Create booking
description: Book a slot on an attendee's behalf. Availability is re-checked at execute time and everyone is emailed as they would be for a self-service booking. Call with dry_run first, then…
outline: false
---

# `fluent-booking/create-booking`

Book a slot on an attendee's behalf. Availability is re-checked at execute time and everyone is emailed as they would be for a self-service booking. Call with dry_run first, then pass back the confirm_token AND the same parameters.

## Ability

- **Kind:** Tool
- **Toolset:** `core`
- **Edition:** Core
- **Mode:** destructive
- **Permission callback:** `PermissionGate::bookingWriteGate()`
- **Requires:** one of `manage_own_calendar`, `manage_all_bookings`, `manage_all_data` — see [Permissions](/platform/permissions)
- **Handler:** `BookingWriteTools::createBooking()`
- **Source:** `fluent-booking/app/Modules/MCP/Tools/BookingWriteTools.php:45`

## Input schema

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `event_id` | `integer` | Yes | The event type to book. Required. |
| `start_time` | `string` | Yes | Local wall-clock start, Y-m-d H:i:s, read in the timezone parameter. No offset or Z suffix. Required. |
| `timezone` | `string` | No | IANA timezone the attendee is booking in. Defaults to the site timezone. |
| `name` | `string` | Yes | Attendee full name. Required. |
| `email` | `string` | Yes | Attendee email. Required. |
| `phone` | `string` | No |  |
| `message` | `string` | No | The attendee's note, shown to the host. |
| `internal_note` | `string` | No | Host-only note. Never shown to the attendee. |
| `duration` | `integer` | No | Minutes, when the event type offers a choice. Defaults to its default duration. |
| `host_id` | `integer` | No | Pin a specific host. Round-robin events pick one automatically when this is omitted. |
| `location_type` | `string` | No | Only when the event type offers several. get-event-types lists them. |
| `location_description` | `string` | No | Required for phone_guest and in_person_guest: the attendee's number or address. |
| `custom_fields` | `object` | No | Answers to the event type's booking fields, keyed by field name. |
| `guests` | `array` | No | Additional guests. Email strings, or {name, email} objects — group events seat each guest separately and need a name. |
| `send_notifications` | `boolean` | No | Default true. Set false to create the booking without notifying anyone — email or SMS; reminders are still scheduled. |
| `dry_run` | `boolean` | No | Preview the booking and get a confirm_token without creating anything. |
| `confirm_token` | `string` | No | The token from the dry run. Required to actually create the booking. |
| `idempotency_key` | `string` | No | A unique key, so a retry after a timeout returns the first result rather than booking twice. |

## Example call

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "fluent-booking/create-booking",
    "arguments": {
      "event_id": 1,
      "start_time": "value",
      "name": "value",
      "email": "value"
    }
  }
}
```
