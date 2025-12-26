# Event Settings & Configuration

Additional event configuration endpoints for managing event details, limits, and advanced settings.

## Update Event Details

Update basic event information.

### Endpoint

```http
POST /calendars/{id}/events/{event_id}/details
```

### URL Parameters

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `id` | integer | Yes | The calendar ID |
| `event_id` | integer | Yes | The event ID |

### Request Body

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `title` | string | No | Event title |
| `description` | string | No | Event description |
| `duration` | integer | No | Duration in minutes |
| `color_schema` | string | No | Color hex code |
| `location_type` | string | No | Location type |
| `location_settings` | array | No | Location configuration |

### Response

Returns the updated event object.

## Update Event Limits

Configure booking frequency and duration limits.

### Endpoint

```http
POST /calendars/{id}/events/{event_id}/limits
```

### URL Parameters

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `id` | integer | Yes | The calendar ID |
| `event_id` | integer | Yes | The event ID |

### Request Body

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `booking_frequency` | object | No | Booking frequency limits |
| `booking_duration` | object | No | Booking duration limits |

### Example Request

```json
{
    "booking_frequency": {
        "enabled": true,
        "limits": [
            {
                "unit": "per_day",
                "value": 5
            },
            {
                "unit": "per_week",
                "value": 10
            }
        ]
    },
    "booking_duration": {
        "enabled": true,
        "limits": [
            {
                "unit": "per_day",
                "value": 120
            }
        ]
    }
}
```

### Limit Units

| Unit | Description |
| :--- | :--- |
| `per_day` | Per calendar day |
| `per_week` | Per week |
| `per_month` | Per month |

### Response

Returns the updated limits configuration.

## Save Event Order

Reorder events within a calendar.

### Endpoint

```http
POST /calendars/{id}/event-order
```

### URL Parameters

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `id` | integer | Yes | The calendar ID |

### Request Body

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `event_order` | array | Yes | Array of event IDs in desired order |

### Example Request

```json
{
    "event_order": [5, 2, 1, 3]
}
```

### Response

```json
{
    "message": "Event order updated successfully"
}
```

## Related Resources

- [Calendar Events](/rest-api/calendars/events)
- [Event Availability](/rest-api/calendars/event-availability)
