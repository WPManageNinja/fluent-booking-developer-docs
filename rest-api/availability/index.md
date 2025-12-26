# Availability Schedules

The Availability API allows you to manage when hosts are available for bookings. Availability schedules define weekly time slots, date overrides, and timezone settings.

## List Availability Schedules

Retrieve all availability schedules.

### Endpoint

```http
GET /availability
```

### Response

Returns a list of availability schedules with their settings and usage count.

```json
{
    "availabilities": {
        "data": [
            {
                "id": 1,
                "host_name": "Jane Smith",
                "host_avatar": "https://example.com/avatar.jpg",
                "title": "Weekly Hours",
                "usage_count": 2,
                "created_at": "2024-07-03 10:16:50",
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
        ],
        "total": 2,
        "per_page": 15
    }
}
```

### Response Fields

| Field | Type | Description |
| :--- | :--- | :--- |
| `id` | integer | Schedule ID |
| `host_name` | string | Name of the host this schedule belongs to |
| `host_avatar` | string | Host avatar URL |
| `title` | string | Schedule title/name |
| `usage_count` | integer | Number of events using this schedule |
| `created_at` | string | Creation timestamp |
| `settings` | object | Schedule configuration |

## Get Availability Schedule

Retrieve details for a specific availability schedule.

### Endpoint

```http
GET /availability/{schedule_id}
```

### URL Parameters

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `schedule_id` | integer | Yes | The schedule ID |

### Response

Returns complete schedule details.

```json
{
    "schedule": {
        "id": 1,
        "host_name": "Jane Smith",
        "host_avatar": "https://example.com/avatar.jpg",
        "title": "Weekly Hours",
        "created_at": "2024-07-03 10:16:50",
        "usage_count": 2,
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
                }
            }
        }
    }
}
```

## Create Availability Schedule

Create a new availability schedule.

### Endpoint

```http
POST /availability
```

### Request Body

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `title` | string | Yes | Schedule title |
| `timezone` | string | Yes | Timezone (e.g., "America/New_York", "UTC") |
| `weekly_schedules` | object | Yes | Weekly availability configuration |
| `date_overrides` | array | No | Specific date overrides |
| `default` | boolean | No | Mark as default schedule |

### Example Request

```json
{
    "title": "Business Hours",
    "timezone": "America/New_York",
    "default": true,
    "weekly_schedules": {
        "mon": {
            "enabled": true,
            "slots": [
                {
                    "start": "09:00",
                    "end": "12:00"
                },
                {
                    "start": "13:00",
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
    },
    "date_overrides": [
        {
            "date": "2025-12-25",
            "enabled": false,
            "reason": "Christmas Day - Closed"
        },
        {
            "date": "2025-07-04",
            "enabled": true,
            "slots": [
                {
                    "start": "09:00",
                    "end": "13:00"
                }
            ],
            "reason": "Independence Day - Half Day"
        }
    ]
}
```

### Response

Returns the created schedule object.

## Update Availability Schedule

Update an existing availability schedule.

### Endpoint

```http
POST /availability/{schedule_id}
```

### URL Parameters

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `schedule_id` | integer | Yes | The schedule ID |

### Request Body

Same parameters as Create Availability Schedule.

### Response

Returns the updated schedule object.

## Update Schedule Title

Update only the title of an availability schedule.

### Endpoint

```http
POST /availability/{schedule_id}/update-title
```

### URL Parameters

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `schedule_id` | integer | Yes | The schedule ID |

### Request Body

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `title` | string | Yes | New schedule title |

### Example Request

```json
{
    "title": "Updated Office Hours"
}
```

### Response

```json
{
    "message": "Schedule title updated successfully",
    "schedule": {
        "id": 1,
        "title": "Updated Office Hours"
    }
}
```

## Update Default Status

Mark a schedule as default or remove default status.

### Endpoint

```http
POST /availability/{schedule_id}/update-status
```

### URL Parameters

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `schedule_id` | integer | Yes | The schedule ID |

### Request Body

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `default` | boolean | Yes | Set as default schedule |

### Example Request

```json
{
    "default": true
}
```

### Response

```json
{
    "message": "Schedule status updated successfully"
}
```

## Clone Availability Schedule

Create a copy of an existing availability schedule.

### Endpoint

```http
POST /availability/{schedule_id}/clone
```

### URL Parameters

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `schedule_id` | integer | Yes | The schedule ID to clone |

### Request Body

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `title` | string | No | Title for the cloned schedule (defaults to "Copy of [original title]") |

### Response

Returns the newly created (cloned) schedule object.

```json
{
    "message": "Schedule cloned successfully",
    "schedule": {
        "id": 3,
        "title": "Copy of Weekly Hours",
        "settings": {
            ...
        }
    }
}
```

## Delete Availability Schedule

Delete an availability schedule.

### Endpoint

```http
DELETE /availability/{schedule_id}
```

### URL Parameters

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `schedule_id` | integer | Yes | The schedule ID |

### Response

```json
{
    "message": "Schedule deleted successfully"
}
```

> [!WARNING]
> You cannot delete a schedule that is currently being used by calendar events. Remove the schedule from all events first.

## Get Schedule Usages

Retrieve all calendar events using this availability schedule.

### Endpoint

```http
GET /availability/{schedule_id}/usages
```

### URL Parameters

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `schedule_id` | integer | Yes | The schedule ID |

### Response

Returns a paginated list of events using this schedule.

```json
{
    "usages": {
        "current_page": 1,
        "data": [
            {
                "id": 2,
                "title": "30 Minute Consultation",
                "slug": "30min",
                "calendar_id": 1,
                "duration": 30,
                "status": "active",
                "availability_type": "existing_schedule",
                "availability_id": "1"
            }
        ],
        "total": 1,
        "per_page": 15
    }
}
```

## Weekly Schedules Format

The `weekly_schedules` object uses day abbreviations as keys:

- `mon` - Monday
- `tue` - Tuesday
- `wed` - Wednesday
- `thu` - Thursday
- `fri` - Friday
- `sat` - Saturday
- `sun` - Sunday

Each day contains:
- `enabled` (boolean) - Whether the day is available
- `slots` (array) - Array of time slot objects with `start` and `end` times in 24-hour format (HH:mm)

## Date Overrides

Date overrides allow you to specify exceptions to the regular weekly schedule:

```json
{
    "date": "2025-12-25",
    "enabled": false,
    "reason": "Holiday - Office Closed"
}
```

Or with custom hours:

```json
{
    "date": "2025-07-04",
    "enabled": true,
    "slots": [
        {
            "start": "09:00",
            "end": "13:00"
        }
    ],
    "reason": "Half Day"
}
```

## Related Resources

- [Calendar Events](/rest-api/calendars/events)
- [Event Availability](/rest-api/calendars/event-availability)
