# Calendar Events

Manage booking events within a calendar. Events represent the bookable time slots or appointments that users can schedule.

## Get Event

Retrieve details for a specific calendar event.

### Endpoint

```http
GET /calendars/{id}/events/{event_id}
```

###URL Parameters

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `id` | integer | Yes | The calendar ID |
| `event_id` | integer | Yes | The event ID |

### Response

Returns complete event details including settings, availability schedules, and location configurations.

```json
{
    "calendar_event": {
        "id": 2,
        "hash": "bd009d55f750026d3879cde67a7feebb",
        "user_id": "1",
        "calendar_id": "1",
        "duration": "30",
        "title": "30 Minute Meeting",
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
            },
            "date_overrides": [],
            "range_type": "range_days",
            "range_days": 60,
            "schedule_conditions": {
                "value": 4,
                "unit": "hours"
            },
            "buffer_time_before": "0",
            "buffer_time_after": "0",
            "location_fields": {
                "conferencing": {
                    "label": "Conferencing",
                    "options": {
                        "google_meet": {
                            "title": "Google Meet (Connect Google Meet First)",
                            "disabled": false,
                            "location_type": "conferencing"
                        }
                    }
                },
                "phone": {
                    "label": "Phone",
                    "options": {
                        "phone_guest": {
                            "title": "Attendee Phone Number"
                        }
                    }
                }
            },
            "booking_frequency": {
                "enabled": false,
                "limits": [
                    {
                        "unit": "per_day",
                        "value": 5
                    }
                ]
            }
        }
    }
}
```

## Create Event

Create a new booking event for a calendar.

### Endpoint

```http
POST /calendars/{id}/events
```

### URL Parameters

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `id` | integer | Yes | The calendar ID |

### Request Body

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `title` | string | Yes | Event title |
| `slug` | string | No | URL-friendly slug |
| `duration` | integer | Yes | Duration in minutes |
| `description` | string | No | Event description |
| `color_schema` | string | No | Hex color code (e.g., "#0099ff") |
| `status` | string | No | Event status: `active` or `inactive` |

### Response

Returns the created event object.

## Update Event

Update an existing event.

### Endpoint

```http
PUT /calendars/{id}/events/{event_id}
```

### URL Parameters

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `id` | integer | Yes | The calendar ID |
| `event_id` | integer | Yes | The event ID |

### Request Body

Same parameters as Create Event.

## Delete Event

Delete a calendar event.

### Endpoint

```http
DELETE /calendars/{id}/events/{event_id}
```

### URL Parameters

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `id` | integer | Yes | The calendar ID |
| `event_id` | integer | Yes | The event ID |

### Response

```json
{
    "message": "Event has been deleted successfully"
}
```

## Clone Event

Create a copy of an existing event. ##

Endpoint

```http
POST /calendars/{id}/clone-event/{event_id}
```

### URL Parameters

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `id` | integer | Yes | The calendar ID |
| `event_id` | integer | Yes | The event ID to clone |

### Response

Returns the newly created (cloned) event object.

## Get Event Schema

Retrieve the schema/template for creating a new event.

### Endpoint

```http
GET /calendars/{id}/event-schema
```

### URL Parameters

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `id` | integer | Yes | The calendar ID |

### Response

Returns a template object with default values and available options for event creation, including location fields and available conferencing options.

```json
{
    "slot": {
        "title": "",
        "status": "active",
        "description": "",
        "duration": "30",
        "color_schema": "#0099ff",
        "calendar": {
            "id": 1,
            "title": "John Doe",
            "slug": "john-doe"
        },
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
            },
            "range_type": "range_days",
            "range_days": 60,
            "location_fields": {
                "conferencing": {
                    "label": "Conferencing",
                    "options": {
                        "google_meet": {
                            "title": "Google Meet (Connect Google Meet First)"
                        },
                        "zoom_meeting": {
                            "title": "Zoom Video (Connect Zoom Account First)"
                        }
                    }
                }
            }
        }
    }
}
```

## Related Resources

- [Event Availability](/rest-api/calendars/event-availability)
- [Event Booking Fields](/rest-api/calendars/event-booking-fields)
- [Event Email Notifications](/rest-api/calendars/event-notifications)
