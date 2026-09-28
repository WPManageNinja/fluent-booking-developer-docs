---
title: Manage booking
description: "Act on an existing booking: reschedule, cancel, confirm, reject, complete, mark no-show, edit attendee details, or resend the confirmation email. reschedule, cancel and reject are…"
outline: false
---

# `fluent-booking/manage-booking`

Act on an existing booking: reschedule, cancel, confirm, reject, complete, mark no-show, edit attendee details, or resend the confirmation email. reschedule, cancel and reject are destructive — call with dry_run first, then pass the returned confirm_token.

## Ability

- **Kind:** Tool
- **Toolset:** `core`
- **Edition:** Core
- **Mode:** destructive
- **Permission callback:** `PermissionGate::bookingWriteGate()`
- **Requires:** one of `manage_own_calendar`, `manage_all_bookings`, `manage_all_data` — see [Permissions](/platform/permissions)
- **Handler:** `BookingWriteTools::manageBooking()`
- **Source:** `fluent-booking/app/Modules/MCP/Tools/BookingWriteTools.php:139`

## Input schema

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `booking_id` | `integer` | Yes | The booking to act on. Required. |
| `action` | `string` | Yes | reschedule needs start_time (and timezone). cancel and reject take an optional reason shown to the attendee. update_details needs fields. resend_email takes recipient. Required. One of: `reschedule`, `cancel`, `confirm`, `reject`, `complete`, `no_show`, `update_details`, `resend_email`. |
| `start_time` | `string` | No | reschedule only. Local wall-clock start, Y-m-d H:i:s, read in the timezone parameter. |
| `timezone` | `string` | No | IANA timezone for start_time and for the *_local times in the response. |
| `host_id` | `integer` | No | reschedule only. Pin a host on a round-robin event. |
| `reason` | `string` | No | Why. Stored on the booking and included in the cancellation, rejection or reschedule email. |
| `fields` | `object` | No | update_details only. Any of: first_name, last_name, email, phone, internal_note. |
| `recipient` | `string` | No | resend_email only. Who to send the confirmation to. Defaults to guest. One of: `guest`, `host`. |
| `refund_payment` | `boolean` | No | cancel and reject only. Refund through the original gateway. Default false — money never moves as a side effect. |
| `send_notifications` | `boolean` | No | Default true. Set false to make the change without notifying anyone — email or SMS; reminders are still scheduled. |
| `dry_run` | `boolean` | No | Preview the change and get a confirm_token without applying it. |
| `confirm_token` | `string` | No | The token from the dry run. Required for reschedule, cancel and reject. |
| `idempotency_key` | `string` | No | Pass a unique key so a retry after a timeout returns the first result instead of acting twice. |

## Example call

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "fluent-booking/manage-booking",
    "arguments": {
      "booking_id": 1,
      "action": "value"
    }
  }
}
```
