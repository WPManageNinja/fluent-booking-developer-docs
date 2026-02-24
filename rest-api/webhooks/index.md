# Webhooks & SMS <Badge type="tip" text="Pro" />

Webhooks and SMS notifications in FluentBooking are managed through per-event integrations, not standalone API endpoints.

> [!NOTE]
> There are no standalone `/webhooks` or `/sms` route prefixes in the REST API. Webhook and SMS notifications are configured as event-level integrations through the [Event Integrations API](/rest-api/calendars/event-integrations).

## Configuring Webhooks

Webhooks are set up as event integrations. Use the Event Integrations endpoints to manage them:

- **List integrations:** `GET /calendars/{id}/events/{event_id}/integrations`
- **Create/update integration:** `POST /calendars/{id}/events/{event_id}/integrations/{integration_id}`
- **Delete integration:** `DELETE /calendars/{id}/events/{event_id}/integrations/{integration_id}`

See [Event Integrations](/rest-api/calendars/event-integrations) for full details.

## Related Resources

- [Event Integrations](/rest-api/calendars/event-integrations)
- [Integrations](/rest-api/integrations/)
- [Event Email Notifications](/rest-api/calendars/event-notifications)
