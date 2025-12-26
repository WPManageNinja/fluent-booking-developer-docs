# Integrations

The Integrations API allows you to connect Fluent Booking with third-party services and platforms.

## Get Available Integrations

Retrieve list of available integration providers.

### Endpoint

```http
GET /integrations
```

### Response

Returns array of available integrations with their status.

```json
{
    "integrations": [
        {
            "key": "google_calendar",
            "title": "Google Calendar",
            "description": "Sync events with Google Calendar",
            "status": "active",
            "is_configured": true,
            "logo": "https://example.com/google-logo.png"
        },
        {
            "key": "zoom",
            "title": "Zoom",
            "description": "Create Zoom meetings automatically",
            "status": "active",
            "is_configured": false,
            "logo": "https://example.com/zoom-logo.png"
        },
        {
            "key": "microsoft_teams",
            "title": "Microsoft Teams",
            "description": "Schedule Teams meetings",
            "status": "inactive",
            "is_configured": false,
            "logo": "https://example.com/teams-logo.png"
        }
    ]
}
```

## Get Integration Settings

Retrieve configuration for a specific integration.

### Endpoint

```http
GET /integrations/{integration_key}/settings
```

### URL Parameters

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `integration_key` | string | Yes | Integration identifier (e.g., "google_calendar", "zoom") |

### Response

Returns integration-specific settings and configuration.

```json
{
    "integration": {
        "key": "google_calendar",
        "title": "Google Calendar",
        "is_configured": true,
        "settings": {
            "client_id": "xxxxxxxxxxxx.apps.googleusercontent.com",
            "auto_sync": true,
            "sync_direction": "both",
            "default_calendar": "primary"
        },
        "connected_accounts": [
            {
                "id": 1,
                "email": "user@example.com",
                "calendar_name": "Primary Calendar",
                "connected_at": "2024-07-01T10:00:00+00:00"
            }
        ]
    }
}
```

## Update Integration Settings

Update configuration for an integration.

### Endpoint

```http
POST /integrations/{integration_key}/settings
```

### URL Parameters

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `integration_key` | string | Yes | Integration identifier |

### Request Body

Integration-specific configuration (varies by integration).

### Example Request (Google Calendar)

```json
{
    "client_id": "your-client-id.apps.googleusercontent.com",
    "client_secret": "your-client-secret",
    "auto_sync": true,
    "sync_direction": "both",
    "default_calendar": "primary",
    "conflict_check": true
}
```

### Response

Returns updated settings.

## Connect Integration

Initiate OAuth connection for an integration.

### Endpoint

```http
POST /integrations/{integration_key}/connect
```

### URL Parameters

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `integration_key` | string | Yes | Integration identifier |

### Response

Returns OAuth authorization URL.

```json
{
    "auth_url": "https://accounts.google.com/o/oauth2/auth?...",
    "state": "random_state_token"
}
```

## Disconnect Integration

Remove integration connection.

### Endpoint

```http
POST /integrations/{integration_key}/disconnect
```

### URL Parameters

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `integration_key` | string | Yes | Integration identifier |

### Request Body

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `account_id` | integer | No | Specific account to disconnect (if multiple) |

### Response

```json
{
    "message": "Integration disconnected successfully"
}
```

## Test Integration

Test integration connection and configuration.

### Endpoint

```http
POST /integrations/{integration_key}/test
```

### URL Parameters

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `integration_key` | string | Yes | Integration identifier |

### Response

Returns test results.

```json
{
    "status": "success",
    "message": "Connection tested successfully",
    "details": {
        "api_accessible": true,
        "permissions_valid": true,
        "sync_working": true
    }
}
```

## Available Integration Keys

| Key | Name | Type |
| :--- | :--- | :--- |
| `google_calendar` | Google Calendar | Calendar Sync |
| `outlook_calendar` | Outlook Calendar | Calendar Sync |
| `zoom` | Zoom | Video Conferencing |
| `microsoft_teams` | Microsoft Teams | Video Conferencing |
| `google_meet` | Google Meet | Video Conferencing |
| `stripe` | Stripe | Payment Gateway |
| `paypal` | PayPal | Payment Gateway |
| `mailchimp` | Mailchimp | Email Marketing |
| `activecampaign` | ActiveCampaign | Email Marketing |
| `zapier` | Zapier | Automation |
| `webhooks` | Custom Webhooks | Automation |

## Integration Settings by Type

### Calendar Integrations (Google, Outlook)
- OAuth credentials (client_id, client_secret)
- Auto-sync settings
- Conflict detection
- Default calendar selection
- Sync direction (one-way, two-way)

### Video Conferencing (Zoom, Teams, Google Meet)
- OAuth credentials
- Auto-create meeting links
- Meeting settings (waiting room, password)
- Default meeting duration

### Payment Gateways (Stripe, PayPal)
- API keys
- Webhook endpoints
- Currency settings
- Fee handling

### Email Marketing (Mailchimp, ActiveCampaign)
- API keys
- List/Tag mapping
- Field mapping
- Trigger conditions

## Related Resources

- [Event Integrations](/rest-api/calendars/event-integrations)
- [Webhooks](/rest-api/webhooks/)
- [Payment Settings](/rest-api/payments/)
