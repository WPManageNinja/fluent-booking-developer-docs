---
title: Delete Feed
description: Delete Feed for the FluentBooking Webhooks & SMS API.
outline: false
aside: false
---

## Endpoint

- **Method:** `DELETE`
- **Path:** `/calendars/{id}/events/{event_id}/webhooks/{webhook_id}`
- **Edition:** Pro
- **Controller:** `WebhookController@deleteFeed`
- **Route source:** `fluent-booking-pro/app/Http/Routes/api.php:63`
- **Policy:** `CalendarPolicy`

<OAOperation operationId="deleteFeed" specUrl="/openapi/public/webhooks/delete-feed.json" />