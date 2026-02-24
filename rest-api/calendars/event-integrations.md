# Event Integrations

Manage third-party integrations for calendar events. Integrations allow you to connect events with external services like email marketing platforms.

## List Event Integrations

Retrieve all integrations configured for an event.

### Endpoint

```http
GET /calendars/{id}/events/{event_id}/integrations
```

### URL Parameters

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `id` | integer | Yes | The calendar ID |
| `event_id` | integer | Yes | The event ID |

### Response

Returns integration feeds and available integrations.

```json
{
    "feeds": [],
    "available_integrations": [],
    "smart_codes": {
        "texts": {
            "guest": {
                "title": "Attendee Data",
                "key": "guest",
                "shortcodes": {
                    "{{guest.first_name}}": "Guest First Name",
                    "{{guest.last_name}}": "Guest Last Name",
                    "{{guest.full_name}}": "Guest Full Name",
                    "{{guest.email}}": "Guest Email"
                }
            },
            "booking": {
                "title": "Booking Data",
                "key": "booking",
                "shortcodes": {
                    "{{booking.event_name}}": "Event Name",
                    "{{booking.description}}": "Event Description"
                }
            }
        }
    }
}
```

## Get Single Integration

Retrieve details for a specific integration.

### Endpoint

```http
GET /calendars/{id}/events/{event_id}/integrations/{integration_id}
```

### URL Parameters

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `id` | integer | Yes | The calendar ID |
| `event_id` | integer | Yes | The event ID |
| `integration_id` | integer | Yes | The integration ID |

### Response

Returns integration configuration details.

## Create/Update Integration

Create or update an integration for an event.

### Endpoint

```http
POST /calendars/{id}/events/{event_id}/integrations/{integration_id}
```

### URL Parameters

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `id` | integer | Yes | The calendar ID |
| `event_id` | integer | Yes | The event ID |
| `integration_id` | integer | Yes | The integration ID |

### Request Body

Integration-specific configuration (varies by integration type).

### Response

Returns the updated integration object.

## Delete Integration

Remove an integration from an event.

### Endpoint

```http
DELETE /calendars/{id}/events/{event_id}/integrations/{integration_id}
```

### URL Parameters

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `id` | integer | Yes | The calendar ID |
| `event_id` | integer | Yes | The event ID |
| `integration_id` | integer | Yes | The integration ID |

### Response

```json
{
    "message": "Successfully deleted the Integration."
}
```

## Clone Event Integrations

Copy integrations from another event.

### Endpoint

```http
POST /calendars/{id}/events/{event_id}/integrations/clone
```

### URL Parameters

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `id` | integer | Yes | The calendar ID |
| `event_id` | integer | Yes | The target event ID |

### Request Body

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `from_event_id` | integer | Yes | The event ID to copy integrations from |

### Response

```json
{
    "message": "Integrations have been successfully cloned."
}
```

## Get Integration Merge Fields

Get available merge fields for an integration.

### Endpoint

```http
GET /calendars/{id}/events/{event_id}/integrations/{integration_id}/merge-fields
```

### URL Parameters

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `id` | integer | Yes | The calendar ID |
| `event_id` | integer | Yes | The event ID |
| `integration_id` | integer | Yes | The integration ID |

### Query Parameters

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `integration_name` | string | Yes | The integration identifier (e.g., `fluentcrm`, `mailchimp`) |
| `list_id` | string | No | The list/audience ID to get merge fields for |

### Response

```json
{
    "merge_fields": {
        "...": "Integration-specific merge field definitions"
    }
}
```

## Get Integration Config Options

Get configuration field options for an integration.

### Endpoint

```http
GET /calendars/{id}/events/{event_id}/integrations/{integration_id}/config-field-options
```

### URL Parameters

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `id` | integer | Yes | The calendar ID |
| `event_id` | integer | Yes | The event ID |
| `integration_id` | integer | Yes | The integration ID |

### Query Parameters

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `integration_name` | string | Yes | The integration identifier |
| `settings` | object | No | Current integration settings for context |

### Response

```json
{
    "field_options": {
        "...": "Integration-specific configuration options"
    }
}
```

## Related Resources

- [Calendar Events](/rest-api/calendars/events)
