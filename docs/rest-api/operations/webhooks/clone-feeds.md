---
title: Clone Feeds
description: Clone Feeds for the FluentBooking Webhooks & SMS API.
outline: false
aside: false
---

## Endpoint

- **Method:** `POST`
- **Path:** `/calendars/{id}/events/{event_id}/webhooks/clone`
- **Edition:** Pro
- **Controller:** `WebhookController@cloneFeeds`
- **Route source:** `fluent-booking-pro/app/Http/Routes/api.php:62`
- **Policy:** `CalendarPolicy`

<OAOperation operationId="cloneFeeds" specUrl="/openapi/public/webhooks/clone-feeds.json" />