---
title: Availability Schedules API
description: Standalone (reusable) availability schedules used across events.
---

# Availability Schedules API

Standalone (reusable) availability schedules used across events.

## Authentication

These routes are registered with: `AvailabilityPolicy`.

## Endpoints

| Method | Path | Edition | Operation | Controller |
| --- | --- | --- | --- | --- |
| `GET` | `/availability` | Core | [Index](/rest-api/operations/availability/index) | `AvailabilityController@index` |
| `POST` | `/availability` | Core | [Create Schedule](/rest-api/operations/availability/create-schedule) | `AvailabilityController@createSchedule` |
| `GET` | `/availability/{schedule_id}` | Core | [Get Schedule](/rest-api/operations/availability/get-schedule) | `AvailabilityController@getSchedule` |
| `GET` | `/availability/{schedule_id}/usages` | Core | [Get Availability Usages](/rest-api/operations/availability/get-availability-usages) | `AvailabilityController@getAvailabilityUsages` |
| `POST` | `/availability/{schedule_id}` | Core | [Update Schedule](/rest-api/operations/availability/update-schedule) | `AvailabilityController@updateSchedule` |
| `POST` | `/availability/{schedule_id}/update-title` | Core | [Update Schedule Title](/rest-api/operations/availability/update-schedule-title) | `AvailabilityController@updateScheduleTitle` |
| `POST` | `/availability/{schedule_id}/update-status` | Core | [Update Default Status](/rest-api/operations/availability/update-default-status) | `AvailabilityController@updateDefaultStatus` |
| `POST` | `/availability/{schedule_id}/clone` | Core | [Clone Schedule](/rest-api/operations/availability/clone-schedule) | `AvailabilityController@cloneSchedule` |
| `DELETE` | `/availability/{schedule_id}` | Core | [Delete Schedule](/rest-api/operations/availability/delete-schedule) | `AvailabilityController@deleteSchedule` |
