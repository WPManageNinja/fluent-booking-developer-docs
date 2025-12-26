# Webhooks & SMS (Pro)

Webhook and SMS notification features for Fluent Booking Pro. These features allow you to send custom notifications and integrate with external systems.

## Webhooks

### List Webhooks

Retrieve all configured webhooks.

#### Endpoint

```http
GET /webhooks
```

#### Response

Returns array of webhooks.

```json
{
    "webhooks": [
        {
            "id": 1,
            "name": "Send to CRM",
            "url": "https://api.example.com/webhooks/booking",
            "events": ["booking_created", "booking_cancelled"],
            "status": "active",
            "created_at": "2024-07-01T10:00:00+00:00"
        }
    ]
}
```

### Create Webhook

Create a new webhook.

#### Endpoint

```http
POST /webhooks
```

#### Request Body

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `name` | string | Yes | Webhook name |
| `url` | string | Yes | Webhook URL |
| `events` | array | Yes | Array of event triggers |
| `headers` | object | No | Custom HTTP headers |
| `secret` | string | No | Secret key for signature verification |

#### Example Request

```json
{
    "name": "Booking Notifications",
    "url": "https://api.example.com/webhooks/bookings",
    "events": [
        "booking_created",
        "booking_updated",
        "booking_cancelled"
    ],
    "headers": {
        "Authorization": "Bearer your-token",
        "X-Custom-Header": "value"
    },
    "secret": "your-webhook-secret"
}
```

#### Response

Returns the created webhook object.

### Update Webhook

Update an existing webhook.

#### Endpoint

```http
PUT /webhooks/{webhook_id}
```

#### URL Parameters

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `webhook_id` | integer | Yes | The webhook ID |

#### Request Body

Same parameters as Create Webhook.

### Delete Webhook

Delete a webhook.

#### Endpoint

```http
DELETE /webhooks/{webhook_id}
```

#### URL Parameters

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `webhook_id` | integer | Yes | The webhook ID |

#### Response

```json
{
    "message": "Webhook deleted successfully"
}
```

### Test Webhook

Send a test payload to a webhook.

#### Endpoint

```http
POST /webhooks/{webhook_id}/test
```

#### URL Parameters

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `webhook_id` | integer | Yes | The webhook ID |

#### Response

```json
{
    "status": "success",
    "http_code": 200,
    "response_time": "150ms",
    "response_body": "OK"
}
```

### Webhook Events

Available webhook event triggers:

| Event | Description |
| :--- | :--- |
| `booking_created` | New booking created |
| `booking_updated` | Booking modified |
| `booking_cancelled` | Booking cancelled |
| `booking_rescheduled` | Booking rescheduled |
| `booking_confirmed` | Booking confirmed (if approval required) |
| `booking_rejected` | Booking rejected |
| `payment_completed` | Payment processed |
| `payment_failed` | Payment failed |

### Webhook Payload

Example webhook payload sent to your URL:

```json
{
    "event": "booking_created",
    "timestamp": "2025-01-15T10:30:00+00:00",
    "data": {
        "booking_id": 123,
        "event_id": 2,
        "event_title": "30 Minute Consultation",
        "attendee": {
            "name": "John Doe",
            "email": "john.doe@example.com",
            "phone": "+1234567890"
        },
        "start_time": "2025-01-20T14:00:00+00:00",
        "end_time": "2025-01-20T14:30:00+00:00",
        "timezone": "America/New_York",
        "status": "scheduled",
        "location": {
            "type": "phone_guest",
            "value": "+1234567890"
        }
    },
    "signature": "sha256_hmac_signature"
}
```

## SMS Notifications (Pro)

### Get SMS Settings

Retrieve SMS notification configuration.

#### Endpoint

```http
GET /sms/settings
```

#### Response

Returns SMS provider settings.

```json
{
    "settings": {
        "provider": "twilio",
        "enabled": true,
        "from_number": "+1234567890",
        "notifications": {
            "booking_confirmation": true,
            "booking_reminder": true,
            "booking_cancelled": false
        }
    }
}
```

### Update SMS Settings

Update SMS notification configuration.

#### Endpoint

```http
POST /sms/settings
```

#### Request Body

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `provider` | string | Yes | SMS provider: `twilio`, `plivo`, `nexmo` |
| `enabled` | boolean | No | Enable/disable SMS |
| `from_number` | string | No | Sender phone number |
| `account_sid` | string | No | Provider account SID |
| `auth_token` | string | No | Provider auth token |
| `notifications` | object | No | Notification settings |

#### Example Request

```json
{
    "provider": "twilio",
    "enabled": true,
    "from_number": "+1234567890",
    "account_sid": "ACxxxxxxxxxx",
    "auth_token": "your-auth-token",
    "notifications": {
        "booking_confirmation": true,
        "booking_reminder": true,
        "booking_reminder_hours": 24,
        "booking_cancelled": true
    }
}
```

### Test SMS

Send a test SMS message.

#### Endpoint

```http
POST /sms/test
```

#### Request Body

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `phone_number` | string | Yes | Test phone number |
| `message` | string | No | Custom test message |

#### Response

```json
{
    "status": "success",
    "message": "Test SMS sent successfully",
    "sid": "SMxxxxxxxxxx"
}
```

### SMS Message Templates

Get SMS message templates.

#### Endpoint

```http
GET /sms/templates
```

#### Response

Returns available SMS templates.

```json
{
    "templates": {
        "booking_confirmation": {
            "enabled": true,
            "message": "Hi <code v-pre>{{guest.first_name}}</code>, your booking for <code v-pre>{{booking.event_name}}</code> on <code v-pre>{{booking.start_time}}</code> is confirmed!"
        },
        "booking_reminder": {
            "enabled": true,
            "message": "Reminder: You have a meeting scheduled in 24 hours - <code v-pre>{{booking.event_name}}</code>"
        }
    }
}
```

### Update SMS Templates

Update SMS message templates.

#### Endpoint

```http
POST /sms/templates
```

#### Request Body

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `templates` | object | Yes | Template configurations |

### SMS Template Smart Codes

Use these placeholders in SMS templates:

- <code v-pre>{{guest.first_name}}</code> - Attendee first name
- <code v-pre>{{guest.last_name}}</code> - Attendee last name
- <code v-pre>{{guest.email}}</code> - Attendee email
- <code v-pre>{{booking.event_name}}</code> - Event name
- <code v-pre>{{booking.start_time}}</code> - Start time
- <code v-pre>{{booking.location}}</code> - Meeting location
- <code v-pre>{{host.name}}</code> - Host name

### Supported SMS Providers

| Provider | Description |
| :--- | :--- |
| `twilio` | Twilio SMS service |
| `plivo` | Plivo SMS service |
| `nexmo` | Vonage/Nexmo SMS service |

## Related Resources

- [Integrations](/rest-api/integrations/)
- [Event Email Notifications](/rest-api/calendars/event-notifications)
