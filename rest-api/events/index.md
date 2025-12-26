# Events

The Events API provides direct access to calendar events without calendar context.

## Get Event

Retrieve a specific event by ID.

### Endpoint

```http
GET /events/{event_id}
```

### URL Parameters

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `event_id` | integer | Yes | The event ID |

### Response

Returns complete event details.

```json
{
    "calendar_event": {
        "id": 2,
        "hash": "bd009d55f750026d3879cde67a7feebb",
        "user_id": "1",
        "calendar_id": "1",
        "duration": "30",
        "title": "30 Minute Consultation",
        "slug": "30min",
        "description": "",
        "settings": {
            "schedule_type": "weekly_schedules",
            "weekly_schedules": {
                "mon": {
                    "enabled": true,
                    "slots": [
                        {
                            "start": "09:00",
                            "end": "17:00"
                        }
                    ]
                }
            }
        },
        "availability_type": "existing_schedule",
        "availability_id": "1",
        "status": "active",
        "type": "paid",
        "color_schema": "#0099ff",
        "location_settings": [
            {
                "type": "phone_guest",  
                "title": "Attendee Phone Number"
            }
        ],
        "event_type": "single"
    }
}
```

## Related Resources

- [Calendar Events](/rest-api/calendars/events)
- [Bookings](/rest-api/bookings/)
