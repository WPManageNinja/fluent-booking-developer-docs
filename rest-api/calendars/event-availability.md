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
| `schedule_type` | string | Yes | Scheduling mode (e.g., `weekly_schedules`) |
| `weekly_schedules` | object | Conditional | Required when `schedule_type` is `weekly_schedules`. Provide slots in the calendar host's timezone |
| `date_overrides` | array | No | Date-specific overrides |
| `range_type` | string | No | Availability range mode: `range_days` or `date_range` |
| `range_days` | integer | No | Number of days bookable when using `range_days` (default `60`) |
| `range_date_between` | array | No | Two-element array `[start_date, end_date]` for `date_range` |
| `common_schedule` | boolean | No | When `true`, reuse a shared host schedule for team events |
| `hosts_schedules` | object | Conditional | Map of host user IDs to availability IDs. Required for team events when `common_schedule` is `false` |
| `availability_type` | string | No | `existing_schedule` or `custom` |
| `availability_id` | integer | No | Availability schedule ID when using `existing_schedule` |

> [!NOTE]
> Buffer times (`buffer_time_before`, `buffer_time_after`, `slot_interval`) are managed separately through the [Event Limits](/rest-api/calendars/event-settings#update-event-limits) endpoint.

### Example Request

```json
{
    "schedule_type": "weekly_schedules",
    "weekly_schedules": {
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
    },
    "range_type": "range_days",
    "range_days": 60,
    "availability_type": "custom"
}
```

### Response

```json
{
    "message": "Data has been updated",
    "event": {
        "id": 15,
        "settings": {
            "schedule_type": "weekly_schedules",
            "...": "Updated availability settings"
        }
    }
}
```

## Related Resources

- [Calendar Events](/rest-api/calendars/events)
- [Event Settings](/rest-api/calendars/event-settings)
