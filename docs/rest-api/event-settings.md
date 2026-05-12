---
title: Event Settings API
description: Per-event details, limits, and configuration endpoints.
---

# Event Settings API

Per-event details, limits, and configuration endpoints.

## Authentication

These routes are registered with: `CalendarPolicy`.

## Endpoints

| Method | Path | Edition | Operation | Controller |
| --- | --- | --- | --- | --- |
| `POST` | `/calendars/{id}/events/{event_id}/details` | Core | [Update Event Details](/rest-api/operations/event-settings/update-event-details) | `CalendarController@updateEventDetails` |
| `POST` | `/calendars/{id}/events/{event_id}/limits` | Core | [Update Event Limits](/rest-api/operations/event-settings/update-event-limits) | `CalendarController@updateEventLimits` |
| `POST` | `/calendars/{id}/events/{event_id}/assignments` | <span class="pro-badge">PRO</span> | [Update Assignments](/rest-api/operations/event-settings/update-assignments) | `CalendarController@updateAssignments` |
| `POST` | `/calendars/{id}/events/{event_id}/advanced-settings` | <span class="pro-badge">PRO</span> | [Update Advanced Settings](/rest-api/operations/event-settings/update-advanced-settings) | `CalendarController@updateAdvancedSettings` |
| `POST` | `/calendars/{id}/events/{event_id}/recurring-settings` | <span class="pro-badge">PRO</span> | [Update Recurring Settings](/rest-api/operations/event-settings/update-recurring-settings) | `CalendarController@updateRecurringSettings` |
