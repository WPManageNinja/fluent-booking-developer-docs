---
title: Event Booking Fields API
description: Custom booking-form fields configured per calendar event.
---

# Event Booking Fields API

Custom booking-form fields configured per calendar event.

## Authentication

These routes are registered with: `CalendarPolicy`.

## Endpoints

| Method | Path | Edition | Operation | Controller |
| --- | --- | --- | --- | --- |
| `GET` | `/calendars/{id}/events/{event_id}/booking-fields` | Core | [Get Event Booking Fields](/rest-api/operations/event-booking-fields/get-event-booking-fields) | `CalendarController@getEventBookingFields` |
| `POST` | `/calendars/{id}/events/{event_id}/booking-fields` | Core | [Save Event Booking Fields](/rest-api/operations/event-booking-fields/save-event-booking-fields) | `CalendarController@saveEventBookingFields` |
