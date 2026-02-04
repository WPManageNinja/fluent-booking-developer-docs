# Event Settings & Configuration

Additional event configuration endpoints for managing event details, limits, and advanced settings.

> [!NOTE]
> The Update Event Details and Update Event Limits endpoints are also documented in [Calendar Events](/rest-api/calendars/events) with full request body specifications.

## Update Event Details

Update descriptive fields, location data, and presentation settings for an event.

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
| `title` | string | Yes | Event title |
| `duration` | integer | Yes | Duration in minutes |
| `status` | string | Yes | `active` or `draft` |
| `description` | string | No | Event description (HTML allowed, sanitized server-side) |
| `color_schema` | string | No | Color hex code |
| `location_settings` | array | Conditional | Location configuration (same format as Create Event) |
| `max_book_per_slot` | integer | Conditional | Required for `group` events |
| `is_display_spots` | boolean | Conditional | Required for `group` events |
| `multi_duration.enabled` | boolean | No | Enable multiple duration options |
| `multi_duration.default_duration` | integer | Conditional | Required if `multi_duration.enabled` is `true` |
| `multi_duration.available_durations` | array | Conditional | Required if `multi_duration.enabled` is `true` |

### Response

```json
{
    "message": "Data has been updated",
    "event": {
        "id": 15,
        "...": "Updated event fields"
    }
}
```

## Update Event Limits

Configure booking limits, buffers, and frequency controls.

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

Send a `settings` object with the following keys:

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `settings.schedule_conditions` | array | No | Lead time, cancellation windows, and related limits |
| `settings.buffer_time_before` | string | No | Minutes before each slot (default: `"0"`) |
| `settings.buffer_time_after` | string | No | Minutes after each slot (default: `"0"`) |
| `settings.slot_interval` | string | No | Override interval between slots |
| `settings.booking_frequency.enabled` | boolean | No | Toggle booking frequency limits |
| `settings.booking_frequency.limits` | array | Conditional | Frequency limits when enabled |
| `settings.booking_duration.enabled` | boolean | No | Toggle maximum cumulative duration |
| `settings.booking_duration.limits` | array | Conditional | Duration limits when enabled |
| `settings.lock_timezone.enabled` | boolean | No | Prevent attendees from changing timezone |
| `settings.lock_timezone.timezone` | string | Conditional | Required when lock timezone is enabled |

### Example Request

```json
{
    "settings": {
        "schedule_conditions": {
            "value": 4,
            "unit": "hours"
        },
        "buffer_time_before": "10",
        "buffer_time_after": "5",
        "slot_interval": "15",
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
        },
        "lock_timezone": {
            "enabled": false,
            "timezone": ""
        }
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

```json
{
    "message": "Data has been updated",
    "event": {
        "id": 15,
        "settings": {
            "buffer_time_before": "10",
            "buffer_time_after": "5",
            "...": "Updated limit settings"
        }
    }
}
```

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
    "calendar": {
        "id": 1,
        "...": "Calendar object"
    },
    "message": "Event order has been updated"
}
```

## Related Resources

- [Calendar Events](/rest-api/calendars/events)
- [Event Availability](/rest-api/calendars/event-availability)
