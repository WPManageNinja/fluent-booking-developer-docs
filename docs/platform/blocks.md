---
title: Blocks
description: Source-verified Gutenberg block reference for FluentBooking.
---

# Blocks

FluentBooking registers its editor blocks with `register_block_type()` and renders them server-side, so the attributes below are the block's stored data and the render callback is what turns them into markup.

| Block | Edition | Attributes | Render callback |
| --- | --- | --- | --- |
| [`fluent-booking/booking-management`](#fluentbookingbookingmanagement) | Core | 7 | `fcalRenderBookingManagementBlock()` |
| [`fluent-booking/calendar`](#fluentbookingcalendar) | Core | 9 | `fcalRenderBlock()` |
| [`fluent-booking/calendar-management`](#fluentbookingcalendarmanagement) | Core | 6 | `fcalRenderCalendarManagementBlock()` |
| [`fluent-booking/team-management`](#fluentbookingteammanagement) | Core | 4 | `fcalRenderTeamManagementBlock()` |

<a id="fluentbookingbookingmanagement"></a>

## `fluent-booking/booking-management`

- **Edition:** Core
- **Render callback:** `fcalRenderBookingManagementBlock()`
- **Source:** `fluent-booking/app/Hooks/Handlers/BlockEditorHandler.php:186`

| Attribute | Type | Default |
| --- | --- | --- |
| `title` | `string` | `My Bookings` |
| `showFilter` | `boolean` | `true` |
| `showPagination` | `boolean` | `true` |
| `period` | `string` | `all` |
| `perPage` | `number` | `5` |
| `noBookingsMessage` | `string` | `No bookings found` |
| `calendarIds` | `array` | `—` |

<a id="fluentbookingcalendar"></a>

## `fluent-booking/calendar`

- **Edition:** Core
- **Render callback:** `fcalRenderBlock()`
- **Source:** `fluent-booking/app/Hooks/Handlers/BlockEditorHandler.php:89`

| Attribute | Type | Default |
| --- | --- | --- |
| `slotId` | `string` | `""` |
| `calendarId` | `string` | `""` |
| `eventHash` | `string` | `""` |
| `avatar_rounded` | `boolean` | `false` |
| `primary_color` | `string` | `#4587EC` |
| `date_round` | `string` | `4px` |
| `avatarStyle` | `string` | `8px` |
| `hideHostInfo` | `string` | `no` |
| `theme` | `string` | `light` |

<a id="fluentbookingcalendarmanagement"></a>

## `fluent-booking/calendar-management`

- **Edition:** Core
- **Render callback:** `fcalRenderCalendarManagementBlock()`
- **Source:** `fluent-booking/app/Hooks/Handlers/BlockEditorHandler.php:155`

| Attribute | Type | Default |
| --- | --- | --- |
| `title` | `string` | `""` |
| `description` | `string` | `""` |
| `headerImage` | `object` | `""` |
| `calendarId` | `string` | `""` |
| `eventIds` | `array` | `—` |
| `hideInfo` | `boolean` | `false` |

<a id="fluentbookingteammanagement"></a>

## `fluent-booking/team-management`

- **Edition:** Core
- **Render callback:** `fcalRenderTeamManagementBlock()`
- **Source:** `fluent-booking/app/Hooks/Handlers/BlockEditorHandler.php:132`

| Attribute | Type | Default |
| --- | --- | --- |
| `title` | `string` | `""` |
| `description` | `string` | `""` |
| `headerImage` | `object` | `""` |
| `hosts` | `object` | `""` |
