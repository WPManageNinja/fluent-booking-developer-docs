---
title: Schedules API
description: Schedule management endpoints used by the admin app.
---

# Schedules API

Schedule management endpoints used by the admin app.

## Authentication

These routes are registered with: `MeetingPolicy`.

## Endpoints

| Method | Path | Edition | Operation | Controller |
| --- | --- | --- | --- | --- |
| `GET` | `/schedules` | Core | [Index](/rest-api/operations/schedules/index) | `SchedulesController@index` |
| `GET` | `/schedules/export` | Core | [Export](/rest-api/operations/schedules/export) | `SchedulesController@export` |
| `GET` | `/schedules/{id}` | Core | [Get Booking](/rest-api/operations/schedules/get-booking) | `SchedulesController@getBooking` |
| `DELETE` | `/schedules/{id}` | Core | [Delete Booking](/rest-api/operations/schedules/delete-booking) | `SchedulesController@deleteBooking` |
| `PUT` | `/schedules/{id}` | Core | [Patch Booking](/rest-api/operations/schedules/patch-booking) | `SchedulesController@patchBooking` |
| `GET` | `/schedules/{id}/activities` | Core | [Get Booking Activities](/rest-api/operations/schedules/get-booking-activities) | `SchedulesController@getBookingActivities` |
| `GET` | `/schedules/{id}/meta-info` | Core | [Get Booking Meta Info](/rest-api/operations/schedules/get-booking-meta-info) | `SchedulesController@getBookingMetaInfo` |
| `POST` | `/schedules/{id}/send-confirmation-email` | Core | [Send Confirmation Email](/rest-api/operations/schedules/send-confirmation-email) | `SchedulesController@sendConfirmationEmail` |
| `GET` | `/schedules/group-bookings/{group_id}/attendees` | Core | [Get Group Attendees](/rest-api/operations/schedules/get-group-attendees) | `SchedulesController@getGroupAttendees` |
