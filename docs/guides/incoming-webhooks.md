---
title: Webhooks
description: How outgoing webhooks fire from FluentBooking Pro and how to customize them.
---

# Webhooks <span class="pro-badge">PRO</span>

FluentBooking Pro ships an **outgoing webhook** system: per-event feeds that POST booking data to external URLs when configured booking events fire (created, cancelled, rescheduled, completed, rejected).

> FluentBooking Pro does **not** ship an inbound webhook receiver. To create bookings from external systems, use the [REST API](/rest-api/).

## Configuring a Webhook Feed

Configure feeds from the **Webhooks** tab on a calendar event in the admin:

- **Webhook URL** — the remote endpoint that will receive the POST.
- **Method** — `POST` (default), `PUT`, `PATCH`, etc.
- **Headers** — optional headers (auth tokens, content-type overrides).
- **Event Triggers** — one or more of: `after_booking_scheduled`, `booking_schedule_cancelled`, `booking_schedule_completed`, `after_booking_rescheduled`, `booking_schedule_rejected`.
- **Request Body** — `all_data` (full booking + event payload) or `selected_fields` (only the keys you map).
- **Enabled** — toggle.

Feed rows are persisted in `fcal_meta` with `object_type='calendar_event'` and `key='webhook_feeds'`.

## How Webhooks Fire

`FluentBookingPro\App\Services\Integrations\Webhook\WebhookIntegration` hooks into the booking lifecycle:

| Booking Action | Hook Used | Trigger Slug |
| --- | --- | --- |
| Booking confirmed | `fluent_booking/after_booking_scheduled` | `after_booking_scheduled` |
| Booking cancelled | `fluent_booking/booking_schedule_cancelled` | `booking_schedule_cancelled` |
| Booking completed | `fluent_booking/booking_schedule_completed` | `booking_schedule_completed` |
| Booking rescheduled | `fluent_booking/after_booking_rescheduled` | `after_booking_rescheduled` |
| Booking rejected | `fluent_booking/booking_schedule_rejected` | `booking_schedule_rejected` |

When any of these fires, every enabled webhook feed whose `event_triggers` array includes the matching slug is queued via Action Scheduler (`fluent_booking/run_webhook`). The actual HTTP call happens asynchronously in `WebhookIntegration::runWebhook($webhookId, $bookingId)`.

## Payload Shape

With `request_body = 'all_data'`, the POST body looks like:

```json
{
  "booking": {
    "id": 100,
    "hash": "ab12cd34...",
    "calendar_id": 1,
    "event_id": 10,
    "start_time": "2026-01-15 14:00:00",
    "end_time": "2026-01-15 14:15:00",
    "status": "scheduled",
    "email": "ada@example.com",
    "first_name": "Ada",
    "last_name": "Lovelace",
    "person_time_zone": "Europe/London",
    "custom_fields": { "...": "..." },
    "reschedule_reason": "Conflict",
    "cancellation_reason": "Postponed"
  },
  "calendar_event": { "...": "..." }
}
```

With `request_body = 'selected_fields'`, the body contains only the mapped keys you configured in the admin.

## Filtering the Outgoing Request

`fluent_booking/booking_webhook_request` lets you mutate the full `wp_remote_request()` argument array before the HTTP call:

```php
add_filter('fluent_booking/booking_webhook_request', function ($args, $booking, $webHook) {
    // Inject a signature header
    $args['headers']['X-FB-Signature'] = hash_hmac(
        'sha256',
        $args['body'],
        'YOUR_WEBHOOK_SECRET'
    );
    return $args;
}, 10, 3);
```

Receives 3 args: `($args, $booking, $webHook)`.

## Re-Sending a Failed Webhook

Failed webhooks are not automatically retried by default. Inspect the booking activity log (`fcal_booking_activity`) for the failure entry. You can re-enqueue manually:

```php
as_enqueue_async_action('fluent_booking/run_webhook', [$webhookId, $bookingId], 'fluent-booking');
```

## Custom Shortcodes in URL/Headers

The webhook URL and selected-fields body support <span v-pre>`{{guest.first_name}}`</span>, <span v-pre>`{{booking.event_name}}`</span>, etc. — the same shortcodes used in email notifications. These are rendered by `EditorShortCodeParser::parse()`.

## Related Hooks

| Hook | Type | Args |
| --- | --- | --- |
| `fluent_booking/booking_webhook_request` | filter | `($args, $booking, $webHook)` |
| `fluent_booking/run_webhook` | action | `($webhookId, $bookingId)` — fired async |
| `fluent_booking/after_booking_scheduled` | action | `($booking, $calendarEvent)` |
| `fluent_booking/booking_schedule_cancelled` | action | `($booking, $calendarEvent)` |
| `fluent_booking/after_booking_rescheduled` | action | `($booking, $previousBooking, $calendarEvent)` |
| `fluent_booking/booking_schedule_completed` | action | `($booking, $calendarEvent)` |
| `fluent_booking/booking_schedule_rejected` | action | `($booking, $calendarEvent)` |

See [Action Hooks → Bookings & Scheduling](/hooks/actions/bookings-and-scheduling) and [Action Hooks → Integrations](/hooks/actions/integrations) for the full catalog.
