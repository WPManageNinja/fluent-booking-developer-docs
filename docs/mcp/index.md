---
title: MCP Server
description: Source-verified reference for the FluentBooking MCP server — abilities, toolsets, and permissions.
---

# MCP Server

FluentBooking ships an MCP (Model Context Protocol) server so AI agents can read and write scheduling data through typed abilities instead of scraping the admin REST API. It is a parallel stack to the `fluent-booking/v2` controllers: abilities are registered with the WordPress Abilities API, they are not routes, and they carry no `Policy` — authorization is the MCP `PermissionGate` plus each tool's own ownership checks.

## Endpoint

- **URL:** `https://your-site.com/wp-json/fluent-booking/mcp`
- **Server id:** `fluent-booking`
- **Transport:** HTTP (`\WP\MCP\Transport\HttpTransport`)
- **Authentication:** WordPress Application Passwords (Basic auth). The server sits outside the `fluent-booking/v2` policy stack deliberately, so the v2 nonce flow does not apply.
- **Requirements:** an MCP adapter and the Abilities API must be present, and MCP must be switched on in FluentBooking → Settings → MCP for AI Agents.

## Toolsets

Abilities are grouped into toolsets an operator switches on individually — schemas an operator never uses should not cost context in every request.

| Toolset | Edition | Abilities | Description |
| --- | --- | --- | --- |
| `core` | Core | 12 | Bookings, event types, slots, context and reports. On by default. |
| `scheduling` | Core | 4 | Availability schedules — reading them and writing weekly hours and date overrides. |
| `payments` | <span class="pro-badge">PRO</span> | 1 | Orders and transactions (Pro). Read only; refunds stay in the admin. |

## Tools

| Ability | Edition | Toolset | Mode | Description |
| --- | --- | --- | --- | --- |
| [`fluent-booking/create-booking`](/mcp/abilities/create-booking) | Core | `core` | destructive | Book a slot on an attendee's behalf. Availability is re-checked at execute time and everyone is emailed as they would be for a self-service booking. Call with… |
| [`fluent-booking/diagnose-availability`](/mcp/abilities/diagnose-availability) | Core | `core` | read-only | Explain why an event type is or is not offering slots. Returns every rule that can remove slots with its configured value, and attributes each empty date to th… |
| [`fluent-booking/get-availability`](/mcp/abilities/get-availability) | Core | `scheduling` | read-only | Availability schedules — the weekly hours and date overrides an event type draws on. Lists them, or returns one in full when schedule_id is given. Hours are re… |
| [`fluent-booking/get-available-slots`](/mcp/abilities/get-available-slots) | Core | `core` | read-only | Bookable times for an event type, keyed by date in the requested timezone. Pass start_time instead of a range to check one specific slot. Uses the same engine… |
| [`fluent-booking/get-booking`](/mcp/abilities/get-booking) | Core | `core` | read-only | Full detail for one booking by id or hash, including attendee contact details, location, status history and cancellation reason. Use include to add form answer… |
| [`fluent-booking/get-booking-context`](/mcp/abilities/get-booking-context) | Core | `core` | read-only, idempotent | Call this first. Returns who you are, what you may do, the site timezone and current time, valid enum values for every filter, headline counts, and small refer… |
| [`fluent-booking/get-event-types`](/mcp/abilities/get-event-types) | Core | `core` | read-only | List bookable event types, or pass event_id for one event's full configuration: durations, location, availability, booking limits, buffers and questions. |
| [`fluent-booking/get-payments`](/mcp/abilities/get-payments) | <span class="pro-badge">PRO</span> | `payments` | read-only | Booking orders and their transactions. Lists orders with filters, or returns one order in full with its transactions and the booking it belongs to when order_i… |
| [`fluent-booking/list-bookings`](/mcp/abilities/list-bookings) | Core | `core` | read-only | List bookings with filters. Returns a compact row per booking; attendee emails are masked unless include_pii is set. Use get-booking for one booking in full. |
| [`fluent-booking/list-reference-data`](/mcp/abilities/list-reference-data) | Core | `scheduling` | read-only | The lookup lists get-booking-context leaves out on larger sites, plus the ones only configuration work needs: hosts, calendars, location providers, an event ty… |
| [`fluent-booking/manage-availability`](/mcp/abilities/manage-availability) | Core | `scheduling` | destructive | Create, rename, edit, clone, set as default or delete an availability schedule. dry_run previews any action and changes nothing. update replaces the whole week… |
| [`fluent-booking/manage-booking`](/mcp/abilities/manage-booking) | Core | `core` | destructive | Act on an existing booking: reschedule, cancel, confirm, reject, complete, mark no-show, edit attendee details, or resend the confirmation email. reschedule, c… |
| [`fluent-booking/manage-event-type`](/mcp/abilities/manage-event-type) | Core | `scheduling` | destructive | Create, edit, duplicate, activate, deactivate or delete an event type. dry_run previews any action and changes nothing. Edits are sectioned the same way the ad… |
| [`fluent-booking/query-bookings`](/mcp/abilities/query-bookings) | Core | `core` | read-only | Aggregate bookings by one or two dimensions. Answers "how many bookings per host last month", "which event types get cancelled most", "what hours do people boo… |

## Prompts

Prompts are registered as a separate argument to the server, not as tools — listed as tools they would show up in `tools/list` carrying a body of instructions.

| Prompt | Edition | Description |
| --- | --- | --- |
| [`fluent-booking/daily-briefing`](/mcp/abilities/daily-briefing) | Core | Summarise a day's schedule: what is booked, what needs a decision, and what changed. |
| [`fluent-booking/troubleshoot-event`](/mcp/abilities/troubleshoot-event) | Core | Work out why an event type is showing no slots, or the wrong ones, and say what to change. |
| [`fluent-booking/weekly-report`](/mcp/abilities/weekly-report) | Core | A week's booking numbers, with the comparison and the caveats that make them trustworthy. |

## Extending the server

Add-ons register into the same namespace and server through these hooks:

| Hook | Type | Purpose |
| --- | --- | --- |
| [`fluent_booking/mcp_loaded`](/hooks/actions/miscellaneous#fluentbookingmcploaded) | action | Fires after the core abilities register — the place to register your own. |
| [`fluent_booking/mcp_tool_classes`](/hooks/filters/miscellaneous#fluentbookingmcptoolclasses) | filter | Add a class to a toolset so it inherits that toolset's on/off switch and context budget. |
| [`fluent_booking/mcp_ability_names`](/hooks/filters/miscellaneous#fluentbookingmcpabilitynames) | filter | Ability names exposed as tools on the server. |
| [`fluent_booking/mcp_prompt_names`](/hooks/filters/miscellaneous#fluentbookingmcppromptnames) | filter | Ability names exposed as prompts. |

A class added through `fluent_booking/mcp_tool_classes` must expose a static `definitions()` returning `ability name => definition`, in the same shape as the core tool classes.

## Calling an ability

```bash
curl -X POST https://your-site.com/wp-json/fluent-booking/mcp \
  --user "admin:xxxx xxxx xxxx xxxx xxxx xxxx" \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/list","params":{}}'
```
