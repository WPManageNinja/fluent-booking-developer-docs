# Event Availability

Manage availability schedules and settings for calendar events. Availability determines when users can book time slots.

## Get Event Availability

Retrieve availability settings for a specific event.

### Endpoint

```http
GET /calendars/{id}/events/{event_id}/availability
```

### URL Parameters

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `id` | integer | Yes | The calendar ID |
| `event_id` | integer | Yes | The event ID |

### Response

Returns available schedule options and current availability settings.

```json
{
    "schedule_options": {
        "John Doe": [
            {
                "label": "Weekly Hours",
                "value": 1,
                "default": true
            }
        ],
        "Jane Smith": [
            {
                "label": "Custom Schedule",
                "value": 8,
                "default": true
            }
        ]
    },
    "available_schedules": [
        {
            "id": 1,
            "object_id": "1",
            "title": "Weekly Hours",
            "settings": {
                "default": true,
                "timezone": "UTC",
                "date_overrides": [],
                "weekly_schedules": {
                    "mon": {
                        "enabled": true,
                        "slots": [
                            {
                                "start": "09:00",
                                "end": "17:00"
                            }
                        ]
                    },
                    "tue": {
                        "enabled": true,
                        "slots": [
                            {
                                "start": "09:00",
                                "end": "17:00"
                            }
                        ]
                    },
                    "wed": {
                        "enabled": true,
                        "slots": [
                            {
                                "start": "09:00",
                                "end": "17:00"
                            }
                        ]
                    },
                    "thu": {
                        "enabled": true,
                        "slots": [
                            {
                                "start": "09:00",
                                "end": "17:00"
                            }
                        ]
                    },
                    "fri": {
                        "enabled": true,
                        "slots": [
                            {
                                "start": "09:00",
                                "end": "17:00"
                            }
                        ]
                    },
                    "sat": {
                        "enabled": false,
                        "slots": []
                    },
                    "sun": {
                        "enabled": false,
                        "slots": []
                    }
                }
            }
        }
    ]
}
```

## Update Event Availability

Update the availability schedule for an event.

### Endpoint

```http
POST /calendars/{id}/events/{event_id}/availability
```

### URL Parameters

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `id` | integer | Yes | The calendar ID |
| `event_id` | integer | Yes | The event ID |

### Request Body

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `schedule_type` | string | Yes | Schedule type: `weekly_schedules` or `custom_schedule` |
| `weekly_schedules` | object | No | Weekly availability (if schedule_type is `weekly_schedules`) |
| `range_type` | string | No | Range type: `range_days` or `range_date_between` |
| `range_days` | integer | No | Number of days in advance bookings are allowed |
| `buffer_time_before` | string | No | Buffer time before event (in minutes) |
| `buffer_time_after` | string | No | Buffer time after event (in minutes) |

### Example weekly_schedules Object

```json
{
    "mon": {
        "enabled": true,
        "slots": [
            {
                "start": "09:00",
                "end": "12:00"
            },
            {
                "start": "14:00",
                "end": "17:00"
            }
        ]
    },
    "tue": {
        "enabled": true,
        "slots": [
            {
                "start": "09:00",
                "end": "17:00"
            }
        ]
    }
}
```

### Response

Returns the updated availability settings.

## Related Resources

- [Calendar Events](/rest-api/calendars/events)
- [Event Settings](/rest-api/calendars/event-settings)
