---
title: Event Availability API
description: Availability rules attached to a specific calendar event.
---

# Event Availability API

Availability rules attached to a specific calendar event.

## Authentication

These routes are registered with: `CalendarPolicy`.

## Endpoints

| Method | Path | Edition | Operation | Controller |
| --- | --- | --- | --- | --- |
| `GET` | `/calendars/{id}/events/{event_id}/availability` | Core | [Get Availability Settings](/rest-api/operations/event-availability/get-availability-settings) | `CalendarController@getAvailabilitySettings` |
| `POST` | `/calendars/{id}/events/{event_id}/availability` | Core | [Update Event Availability](/rest-api/operations/event-availability/update-event-availability) | `CalendarController@updateEventAvailability` |
| `GET` | `/calendars/{id}/events/{event_id}/event-available-slots` | <span class="pro-badge">PRO</span> | [Get Event Available Slots](/rest-api/operations/event-availability/get-event-available-slots) | `SingleEventController@getEventAvailableSlots` |
| `POST` | `/calendars/{id}/events/{event_id}/event-availability` | <span class="pro-badge">PRO</span> | [Update Event Availability](/rest-api/operations/event-availability/update-event-availability) | `SingleEventController@updateEventAvailability` |
