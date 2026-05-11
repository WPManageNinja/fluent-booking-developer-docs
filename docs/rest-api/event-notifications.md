---
title: Event Email Notifications API
description: Per-event email notification templates and configuration.
---

# Event Email Notifications API

Per-event email notification templates and configuration.

## Authentication

These routes are registered with: `CalendarPolicy`.

## Endpoints

| Method | Path | Edition | Operation | Controller |
| --- | --- | --- | --- | --- |
| `GET` | `/calendars/{id}/events/{event_id}/email-notifications` | Core | [Get Event Email Notifications](/rest-api/operations/event-notifications/get-event-email-notifications) | `CalendarController@getEventEmailNotifications` |
| `POST` | `/calendars/{id}/events/{event_id}/email-notifications` | Core | [Save Event Email Notifications](/rest-api/operations/event-notifications/save-event-email-notifications) | `CalendarController@saveEventEmailNotifications` |
| `POST` | `/calendars/{id}/events/{event_id}/email-notifications/clone` | Core | [Clone Event Email Notification](/rest-api/operations/event-notifications/clone-event-email-notification) | `CalendarController@cloneEventEmailNotification` |
