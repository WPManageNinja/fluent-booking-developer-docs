---
title: Permissions
description: Source-verified permission sets, REST policies, and MCP gates for FluentBooking.
---

# Permissions

FluentBooking does not use WordPress roles for its own authorization. It stores a list of permission sets per user (in `fcal_meta` under `_access_permissions`) and checks those; a user with `manage_options` is treated as having all of them.

## Permission sets

| Set | Grants |
| --- | --- |
| `manage_own_calendar` | Manage only own Calendar, Events, Bookings & Availability |
| `read_all_bookings` | Read Access to All Bookings |
| `manage_all_bookings` | Read & Write Access to All Bookings |
| `read_other_calendars` | Read Access of Other Users Calendars |
| `manage_other_calendars` | Manage Other Users Calendars |
| `read_and_use_other_availabilities` | Read & Use Access of All Availabilities |
| `manage_other_availabilities` | Manage All Availabilities |
| `manage_all_data` | Manage All Data and Settings |

```php
use FluentBooking\App\Services\PermissionManager;

if (PermissionManager::userCan(['manage_all_bookings', 'manage_all_data'])) {
    // Any one of the listed sets is enough.
}
```

## REST policies

Every route group declares a policy; the policy's `verifyRequest()` runs before any of its per-method checks. The sets and capabilities below are the ones each policy class actually references.

A policy with no routes is not attached to any route group — it exists for a surface that does not use it (yet). A set marked with * is referenced by a policy but is not one of the sets above, so nothing ever grants it.

| Policy | Edition | Routes | Permission sets | WordPress caps | Checks used |
| --- | --- | --- | --- | --- | --- |
| `AdminPolicy` | Core | 3 | — | — | `canManageOtherHosts()` |
| `AvailabilityPolicy` | Core | 9 | `manage_all_data`, `manage_other_availabilities`, `manage_own_calendar`, `read_and_use_other_availabilities` | — | — |
| `CalendarEventPolicy` | Core | 7 | `manage_all_bookings`, `manage_all_data`, `manage_other_calendars`, `read_other_calendars` | — | — |
| `CalendarPolicy` | Core | 49 | `invite_team_members`*, `manage_all_data`, `manage_own_calendar` | `manage_options` | `canReadCalendar()`, `canUpdateCalendarEvent()`, `canWriteCalendar()`, `currentUserHasAnyPermission()` |
| `MeetingPolicy` | Core | 20 | `manage_all_bookings`, `manage_all_data`, `manage_own_calendar`, `read_all_bookings` | `manage_options` | `userCanSeeAllBookings()` |
| `PublicPolicy` | Core | 0 | — | — | — |
| `SettingsPolicy` | Core | 25 | `manage_all_data` | — | — |
| `SuperAdminPolicy` | <span class="pro-badge">PRO</span> | 5 | — | `manage_options` | — |
| `UserPolicy` | Core | 3 | — | — | `currentUserHasAnyPermission()` |

## MCP gates

The [MCP server](/mcp/) authorizes through `PermissionGate` instead of a policy. Read abilities need only a working transport (MCP enabled, application-password auth); write abilities additionally need one of the listed sets.

| Gate | Requires one of | Abilities |
| --- | --- | --- |
| `bookingWriteGate()` | `manage_own_calendar`, `manage_all_bookings`, `manage_all_data` | [`create-booking`](/mcp/abilities/create-booking), [`manage-booking`](/mcp/abilities/manage-booking) |
| `readGate()` | transport only | [`daily-briefing`](/mcp/abilities/daily-briefing), [`diagnose-availability`](/mcp/abilities/diagnose-availability), [`get-availability`](/mcp/abilities/get-availability), [`get-available-slots`](/mcp/abilities/get-available-slots), [`get-booking`](/mcp/abilities/get-booking), [`get-booking-context`](/mcp/abilities/get-booking-context), [`get-event-types`](/mcp/abilities/get-event-types), [`get-payments`](/mcp/abilities/get-payments), [`list-bookings`](/mcp/abilities/list-bookings), [`list-reference-data`](/mcp/abilities/list-reference-data), [`query-bookings`](/mcp/abilities/query-bookings), [`troubleshoot-event`](/mcp/abilities/troubleshoot-event), [`weekly-report`](/mcp/abilities/weekly-report) |
| `scheduleWriteGate()` | `manage_own_calendar`, `manage_other_calendars`, `manage_other_availabilities`, `manage_all_data` | [`manage-availability`](/mcp/abilities/manage-availability), [`manage-event-type`](/mcp/abilities/manage-event-type) |

Parsed from `fluent-booking/app/Services/PermissionManager.php` and `app/Http/Policies/`.
