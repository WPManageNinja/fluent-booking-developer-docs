---
title: Webhooks & SMS API
description: Outbound webhook configuration and SMS notification endpoints (Pro).
---

# Webhooks & SMS API

Outbound webhook configuration and SMS notification endpoints (Pro).

## Authentication

These routes are registered with: `CalendarPolicy`.

## Endpoints

| Method | Path | Edition | Operation | Controller |
| --- | --- | --- | --- | --- |
| `GET` | `/calendars/{id}/events/{event_id}/sms-notifications` | <span class="pro-badge">PRO</span> | [Get Slot Sms Notifications](/rest-api/operations/webhooks/get-slot-sms-notifications) | `TwilioController@getSlotSmsNotifications` |
| `POST` | `/calendars/{id}/events/{event_id}/sms-notifications` | <span class="pro-badge">PRO</span> | [Save Slot Sms Notifications](/rest-api/operations/webhooks/save-slot-sms-notifications) | `TwilioController@saveSlotSmsNotifications` |
| `POST` | `/calendars/{id}/events/{event_id}/sms-notifications/clone` | <span class="pro-badge">PRO</span> | [Clone Slot Sms Notifications](/rest-api/operations/webhooks/clone-slot-sms-notifications) | `TwilioController@cloneSlotSmsNotifications` |
| `GET` | `/calendars/{id}/events/{event_id}/webhooks` | <span class="pro-badge">PRO</span> | [Get Feeds](/rest-api/operations/webhooks/get-feeds) | `WebhookController@getFeeds` |
| `POST` | `/calendars/{id}/events/{event_id}/webhooks` | <span class="pro-badge">PRO</span> | [Save Feed](/rest-api/operations/webhooks/save-feed) | `WebhookController@saveFeed` |
| `POST` | `/calendars/{id}/events/{event_id}/webhooks/clone` | <span class="pro-badge">PRO</span> | [Clone Feeds](/rest-api/operations/webhooks/clone-feeds) | `WebhookController@cloneFeeds` |
| `DELETE` | `/calendars/{id}/events/{event_id}/webhooks/{webhook_id}` | <span class="pro-badge">PRO</span> | [Delete Feed](/rest-api/operations/webhooks/delete-feed) | `WebhookController@deleteFeed` |
