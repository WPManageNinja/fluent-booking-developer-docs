---
title: Scheduled Tasks
description: Source-verified reference for the FluentBooking recurring background tasks.
---

# Scheduled Tasks

FluentBooking schedules its recurring work with Action Scheduler under the `fluent-booking` group. Both hooks are plain WordPress actions, so you can hook them to run your own work on the same cadence, or fire one manually to test.

| Hook | Interval | Handler |
| --- | --- | --- |
| [`fluent_booking_five_minutes_tasks`](#fluentbookingfiveminutestasks) | Every 5 minutes | `FiveMinuteScheduler::handle()` |
| [`fluent_booking/daily_tasks`](#fluentbookingdailytasks) | Daily | `DailyScheduler::handleDailyTasks()` |

<a id="fluentbookingfiveminutestasks"></a>

## `fluent_booking_five_minutes_tasks`

- **Interval:** Every 5 minutes (`60 * 5` seconds)
- **Handler:** `FiveMinuteScheduler::handle()`
- **Source:** `fluent-booking/app/Hooks/Scheduler/FiveMinuteScheduler.php:14`

**Each run**

- `maybeAutoCancelBooking()`
- `maybeAutoCompleteBookings()`
- `maybeAutoCancelPastBookings()`
- `maybeAutoDeleteReservations()`
- `maybeAutoExpireCalendarEvents()`
- `maybeAutoExpireCalendars()`

```php
add_action('fluent_booking_five_minutes_tasks', function () {
    // Runs on the same schedule, after FluentBooking's own handler.
}, 20);
```

<a id="fluentbookingdailytasks"></a>

## `fluent_booking/daily_tasks`

- **Interval:** Daily (`60 * 60 * 24` seconds)
- **Handler:** `DailyScheduler::handleDailyTasks()`
- **Source:** `fluent-booking/app/Hooks/Scheduler/DailyScheduler.php:17`

**Each run**

- `maybeSendUsageData()`
- `WriteGuard::purgeExpired()`
- `SummaryReportService::maybeSendSummary()`

```php
add_action('fluent_booking/daily_tasks', function () {
    // Runs on the same schedule, after FluentBooking's own handler.
}, 20);
```
