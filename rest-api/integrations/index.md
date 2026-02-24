# Integrations

The Integrations API allows you to manage global integration settings in FluentBooking. This endpoint uses a `settings_key` parameter to identify which integration's settings to retrieve or update.

> [!NOTE]
> For managing per-event integrations (e.g., connecting an event to a specific CRM list), see [Event Integrations](/rest-api/calendars/event-integrations).

## Get Integration Settings

Retrieve settings for a specific integration by its key.

### Endpoint

```http
GET /integrations
```

### Query Parameters

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `settings_key` | string | Yes | The integration identifier (e.g., `google_calendar`, `zoom`, `stripe`) |

### Response

Returns the settings for the requested integration.

```json
{
    "status": true,
    "settings": {
        "...": "Integration-specific settings"
    },
    "field_settings": {
        "...": "Integration-specific field configuration"
    }
}
```

| Field | Type | Description |
| :--- | :--- | :--- |
| `status` | boolean | Whether the integration has field settings configured |
| `settings` | object | Integration-specific settings (e.g., API keys, credentials) |
| `field_settings` | object | Integration-specific field configuration |

### Example Request

```bash
curl -X GET "https://yoursite.com/wp-json/fluent-booking/v2/integrations?settings_key=google_calendar" \
  -u "username:application_password" \
  -H "Content-Type: application/json"
```

## Update Integration Settings

Update settings for a specific integration.

### Endpoint

```http
POST /integrations
```

### Request Body

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `settings_key` | string | Yes | The integration identifier |
| `settings` | object | Yes | Integration-specific settings to save |

### Example Request

```bash
curl -X POST "https://yoursite.com/wp-json/fluent-booking/v2/integrations" \
  -u "username:application_password" \
  -H "Content-Type: application/json" \
  -d '{
    "settings_key": "google_calendar",
    "settings": {
        "client_id": "your-client-id.apps.googleusercontent.com",
        "client_secret": "your-client-secret"
    }
  }'
```

### Response

```json
{
    "message": "Settings have been successfully saved."
}
```

## Related Resources

- [Event Integrations](/rest-api/calendars/event-integrations)
- [Settings](/rest-api/settings/)
