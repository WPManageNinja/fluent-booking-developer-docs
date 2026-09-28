---
title: Calendars API
description: Calendar CRUD, ordering, sharing-page configuration, and event-type lifecycle for each calendar.
---

# Calendars API

Calendar CRUD, ordering, sharing-page configuration, and event-type lifecycle for each calendar.

## Authentication

These routes are registered with: `CalendarPolicy`.

## Endpoints

| Method | Path | Edition | Operation | Controller |
| --- | --- | --- | --- | --- |
| `GET` | `/calendars` | Core | [Get All Calendars](/rest-api/operations/calendars/get-all-calendars) | `CalendarController@getAllCalendars` |
| `POST` | `/calendars` | Core | [Create Calendar](/rest-api/operations/calendars/create-calendar) | `CalendarController@createCalendar` |
| `POST` | `/calendars/check-slug` | Core | [Check Slug](/rest-api/operations/calendars/check-slug) | `CalendarController@checkSlug` |
| `GET` | `/calendars/location-fields` | Core | [Get New Event Location Fields](/rest-api/operations/calendars/get-new-event-location-fields) | `CalendarController@getNewEventLocationFields` |
| `GET` | `/calendars/{id}` | Core | [Get Calendar](/rest-api/operations/calendars/get-calendar) | `CalendarController@getCalendar` |
| `POST` | `/calendars/{id}` | Core | [Update Calendar](/rest-api/operations/calendars/update-calendar) | `CalendarController@updateCalendar` |
| `DELETE` | `/calendars/{id}` | Core | [Delete Calendar](/rest-api/operations/calendars/delete-calendar) | `CalendarController@deleteCalendar` |
| `POST` | `/calendars/{id}/events` | Core | [Create Calendar Event](/rest-api/operations/calendars/create-calendar-event) | `CalendarController@createCalendarEvent` |
| `GET` | `/calendars/{id}/event-schema` | Core | [Get Event Schema](/rest-api/operations/calendars/get-event-schema) | `CalendarController@getEventSchema` |
| `POST` | `/calendars/{id}/event-order` | Core | [Save Calendar Event Order](/rest-api/operations/calendars/save-calendar-event-order) | `CalendarController@saveCalendarEventOrder` |
| `POST` | `/calendars/{id}/clone-event/{event_id}` | Core | [Clone Calendar Event](/rest-api/operations/calendars/clone-calendar-event) | `CalendarController@cloneCalendarEvent` |
