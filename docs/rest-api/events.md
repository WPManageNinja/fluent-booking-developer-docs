---
title: Events API
description: Calendar event types — bookable slots configured per calendar.
---

# Events API

Calendar event types — bookable slots configured per calendar.

## Authentication

These routes are registered with: `CalendarPolicy`, `CalendarEventPolicy`.

## Endpoints

| Method | Path | Edition | Operation | Controller |
| --- | --- | --- | --- | --- |
| `GET` | `/calendars/{id}/events/{event_id}` | Core | [Calendar Get Event](/rest-api/operations/events/calendar-get-event) | `CalendarController@getEvent` |
| `PUT` | `/calendars/{id}/events/{event_id}` | Core | [Patch Calendar Event](/rest-api/operations/events/patch-calendar-event) | `CalendarController@patchCalendarEvent` |
| `DELETE` | `/calendars/{id}/events/{event_id}` | Core | [Delete Calendar Event](/rest-api/operations/events/delete-calendar-event) | `CalendarController@deleteCalendarEvent` |
| `GET` | `/events/{event_id}` | Core | [Event Get Event](/rest-api/operations/events/event-get-event) | `EventController@getEvent` |
