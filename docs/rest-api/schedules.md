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
| `GET` | `/schedules/crm-contact-prefill` | Core | [Get Crm Contact Prefill](/rest-api/operations/schedules/get-crm-contact-prefill) | `SchedulesController@getCrmContactPrefill` |
| `GET` | `/schedules/crm-contact-search` | Core | [Search Crm Contacts](/rest-api/operations/schedules/search-crm-contacts) | `SchedulesController@searchCrmContacts` |
| `GET` | `/schedules/{id}` | Core | [Get Booking](/rest-api/operations/schedules/get-booking) | `SchedulesController@getBooking` |
| `DELETE` | `/schedules/{id}` | Core | [Delete Booking](/rest-api/operations/schedules/delete-booking) | `SchedulesController@deleteBooking` |
| `PUT` | `/schedules/{id}` | Core | [Patch Booking](/rest-api/operations/schedules/patch-booking) | `SchedulesController@patchBooking` |
| `GET` | `/schedules/{id}/activities` | Core | [Get Booking Activities](/rest-api/operations/schedules/get-booking-activities) | `SchedulesController@getBookingActivities` |
| `GET` | `/schedules/{id}/meta-info` | Core | [Get Booking Meta Info](/rest-api/operations/schedules/get-booking-meta-info) | `SchedulesController@getBookingMetaInfo` |
| `GET` | `/schedules/{id}/crm-contact` | Core | [Get Crm Contact](/rest-api/operations/schedules/get-crm-contact) | `SchedulesController@getCrmContact` |
| `GET` | `/schedules/{id}/crm-options` | Core | [Get Crm Options](/rest-api/operations/schedules/get-crm-options) | `SchedulesController@getCrmOptions` |
| `POST` | `/schedules/{id}/crm-contact/tags` | Core | [Update Crm Tags](/rest-api/operations/schedules/update-crm-tags) | `SchedulesController@updateCrmTags` |
| `POST` | `/schedules/{id}/crm-contact/lists` | Core | [Update Crm Lists](/rest-api/operations/schedules/update-crm-lists) | `SchedulesController@updateCrmLists` |
| `POST` | `/schedules/{id}/send-confirmation-email` | Core | [Send Confirmation Email](/rest-api/operations/schedules/send-confirmation-email) | `SchedulesController@sendConfirmationEmail` |
| `GET` | `/schedules/group-bookings/{group_id}/attendees` | Core | [Get Group Attendees](/rest-api/operations/schedules/get-group-attendees) | `SchedulesController@getGroupAttendees` |
