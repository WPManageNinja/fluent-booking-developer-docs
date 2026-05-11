---
title: Calendar Integrations API
description: Calendar-level integration endpoints — remote calendar connections (Google, Outlook, Apple, CalDAV), Zoom user connections, and general integration feeds.
---

# Calendar Integrations API

Calendar-level integration endpoints — remote calendar connections (Google, Outlook, Apple, CalDAV), Zoom user connections, and general integration feeds.

## Authentication

These routes are registered with: `CalendarPolicy`.

## Endpoints

| Method | Path | Edition | Operation | Controller |
| --- | --- | --- | --- | --- |
| `GET` | `/calendars/{id}/integrations/remote-calendars` | <span class="pro-badge">PRO</span> | [Get Remote Calendars](/rest-api/operations/calendar-integrations/get-remote-calendars) | `IntegrationSettingsController@getRemoteCalendars` |
| `POST` | `/calendars/{id}/integrations/remote-calendars/patch-conflicts` | <span class="pro-badge">PRO</span> | [Patch Remote Calendar Conflict Settings](/rest-api/operations/calendar-integrations/patch-remote-calendar-conflict-settings) | `IntegrationSettingsController@patchRemoteCalendarConflictSettings` |
| `POST` | `/calendars/{id}/integrations/remote-calendars/patch-settings` | <span class="pro-badge">PRO</span> | [Patch Remote Calendar Additional Settings](/rest-api/operations/calendar-integrations/patch-remote-calendar-additional-settings) | `IntegrationSettingsController@patchRemoteCalendarAdditionalSettings` |
| `POST` | `/calendars/{id}/integrations/remote-calendars/sync-settings` | <span class="pro-badge">PRO</span> | [Sync Creatble Remote Cal Settings](/rest-api/operations/calendar-integrations/sync-creatble-remote-cal-settings) | `IntegrationSettingsController@syncCreatbleRemoteCalSettings` |
| `POST` | `/calendars/{id}/integrations/remote-calendars/disconnect-calendar` | <span class="pro-badge">PRO</span> | [Disconnect Remote Calendar](/rest-api/operations/calendar-integrations/disconnect-remote-calendar) | `IntegrationSettingsController@disconnectRemoteCalendar` |
| `POST` | `/calendars/{id}/integrations/remote-calendars/cal-dav-auth` | <span class="pro-badge">PRO</span> | [Add Cal Dav Credential](/rest-api/operations/calendar-integrations/add-cal-dav-credential) | `IntegrationSettingsController@addCalDavCredential` |
| `GET` | `/calendars/{id}/integrations/zoom-connection` | <span class="pro-badge">PRO</span> | [Get Zoom Connection By Calendar Id](/rest-api/operations/calendar-integrations/get-zoom-connection-by-calendar-id) | `ZoomController@getZoomConnectionByCalendarId` |
| `POST` | `/calendars/{id}/integrations/zoom-connection/add` | <span class="pro-badge">PRO</span> | [Add Connection By Calendar Id](/rest-api/operations/calendar-integrations/add-connection-by-calendar-id) | `ZoomController@addConnectionByCalendarId` |
| `POST` | `/calendars/{id}/integrations/zoom-connection/disconnect` | <span class="pro-badge">PRO</span> | [Disconnect By Calendar Id](/rest-api/operations/calendar-integrations/disconnect-by-calendar-id) | `ZoomController@disconnectByCalendarId` |
| `GET` | `/calendars/{id}/integrations/general_integration_feed` | <span class="pro-badge">PRO</span> | [Get General Integration Feed](/rest-api/operations/calendar-integrations/get-general-integration-feed) | `IntegrationSettingsController@getGeneralIntegrationFeed` |
| `POST` | `/calendars/{id}/integrations/general_integration_feed/disconnect` | <span class="pro-badge">PRO</span> | [Disconnect General Integration Feed](/rest-api/operations/calendar-integrations/disconnect-general-integration-feed) | `IntegrationSettingsController@disconnectGeneralIntegrationFeed` |
