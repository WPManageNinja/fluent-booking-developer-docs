---
title: Sharing & Landing API
description: Public calendar landing-page configuration and sharing settings.
---

# Sharing & Landing API

Public calendar landing-page configuration and sharing settings.

## Authentication

These routes are registered with: `CalendarPolicy`.

## Endpoints

| Method | Path | Edition | Operation | Controller |
| --- | --- | --- | --- | --- |
| `GET` | `/calendars/{id}/sharing-settings` | Core | [Get Sharing Settings](/rest-api/operations/sharing-settings/get-sharing-settings) | `CalendarController@getSharingSettings` |
| `POST` | `/calendars/{id}/sharing-settings` | Core | [Save Sharing Settings](/rest-api/operations/sharing-settings/save-sharing-settings) | `CalendarController@saveSharingSettings` |
