# Availability Schedules

The Availability API allows you to manage when hosts are available for bookings. Availability schedules define weekly time slots, date overrides, and timezone settings.

## List Availability Schedules

Retrieve all availability schedules.

### Endpoint

```http
GET /availability
```

### Query Parameters

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `filters[author]` | integer\|string | No | Filter by user ID, `me` for current user, or `all` for all users |

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

Create a new availability schedule. The schedule is initialized with a default weekly schedule schema. Weekly schedules and date overrides are configured after creation using the Update endpoint.

### Endpoint

```http
POST /availability
```

### Request Body

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `title` | string | Yes | Schedule title (must be unique per host) |
| `timezone` | string | No | Timezone (e.g., "America/New_York"). Falls back to the host's calendar timezone, then `"UTC"` |

### Example Request

```json
{
    "title": "Business Hours",
    "timezone": "America/New_York"
}
```

### Response

The create endpoint returns the raw schedule record. Note: the `key` field contains the title, `object_id` contains the host user ID, and `value` contains the settings. This differs from the [List](#list-availability-schedules) and [Get](#get-availability-schedule) endpoints which return formatted fields (`title`, `host_name`, `settings`).

```json
{
    "schedule": {
        "id": 3,
        "object_type": "availability",
        "object_id": 1,
        "key": "Business Hours",
        "value": {
            "default": false,
            "timezone": "America/New_York",
            "date_overrides": [],
            "weekly_schedules": {
                "mon": { "enabled": true, "slots": [{ "start": "09:00", "end": "17:00" }] },
                "tue": { "enabled": true, "slots": [{ "start": "09:00", "end": "17:00" }] },
                "wed": { "enabled": true, "slots": [{ "start": "09:00", "end": "17:00" }] },
                "thu": { "enabled": true, "slots": [{ "start": "09:00", "end": "17:00" }] },
                "fri": { "enabled": true, "slots": [{ "start": "09:00", "end": "17:00" }] },
                "sat": { "enabled": false, "slots": [] },
                "sun": { "enabled": false, "slots": [] }
            }
        },
        "created_at": "2025-01-15T10:00:00+00:00",
        "updated_at": "2025-01-15T10:00:00+00:00"
    },
    "message": "Schedule has been created successfully"
}
```

> [!NOTE]
> The first schedule created for a host is automatically set as the default. Subsequent schedules have `default` set to `false`. If a schedule with the same title already exists for the host, a 422 error is returned.

## Update Availability Schedule

Update the weekly schedules, date overrides, and timezone for an existing availability schedule.

### Endpoint

```http
POST /availability/{schedule_id}
```

### URL Parameters

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `schedule_id` | integer | Yes | The schedule ID |

### Request Body

All schedule data must be nested under `schedule.settings`:

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `schedule.settings.timezone` | string | No | Timezone (defaults to current schedule timezone) |
| `schedule.settings.weekly_schedules` | object | No | Weekly availability configuration |
| `schedule.settings.date_overrides` | array | No | Specific date overrides |

### Example Request

```json
{
    "schedule": {
        "settings": {
            "timezone": "America/New_York",
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
                }
            ]
        }
    }
}
```

### Response

Returns the raw schedule record (same format as [Create](#create-availability-schedule) response with `key`, `object_id`, `value` fields).

```json
{
    "message": "Schedule has been updated successfully",
    "schedule": {
        "id": 1,
        "object_type": "availability",
        "object_id": 1,
        "key": "Weekly Hours",
        "value": {
            "...": "Updated settings"
        },
        "created_at": "2024-01-15T10:00:00+00:00",
        "updated_at": "2025-02-24T11:45:30+00:00"
    }
}
```

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
| `title` | string | Yes | New schedule title (must be unique per host) |

### Example Request

```json
{
    "title": "Updated Office Hours"
}
```

### Response

```json
{
    "message": "Schedule title has been updated successfully",
    "title": "Updated Office Hours"
}
```

## Update Default Status

Mark a schedule as the default for its host. This always sets the schedule as default and removes default status from any other schedule for the same host.

### Endpoint

```http
POST /availability/{schedule_id}/update-status
```

### URL Parameters

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `schedule_id` | integer | Yes | The schedule ID |

### Request Body

No body parameters required. This endpoint always sets the targeted schedule as the default.

### Response

```json
{
    "message": "Status has been updated successfully"
}
```

## Clone Availability Schedule

Create a copy of an existing availability schedule. The cloned schedule has "(Clone)" appended to the title and is never set as default.

### Endpoint

```http
POST /availability/{schedule_id}/clone
```

### URL Parameters

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `schedule_id` | integer | Yes | The schedule ID to clone |

### Response

Returns the raw schedule record (same format as [Create](#create-availability-schedule) response).

```json
{
    "schedule": {
        "id": 3,
        "object_type": "availability",
        "object_id": 1,
        "key": "Weekly Hours (Clone)",
        "value": {
            "default": false,
            "timezone": "UTC",
            "date_overrides": [],
            "weekly_schedules": {
                "mon": { "enabled": true, "slots": [{ "start": "09:00", "end": "17:00" }] },
                "tue": { "enabled": true, "slots": [{ "start": "09:00", "end": "17:00" }] },
                "wed": { "enabled": true, "slots": [{ "start": "09:00", "end": "17:00" }] },
                "thu": { "enabled": true, "slots": [{ "start": "09:00", "end": "17:00" }] },
                "fri": { "enabled": true, "slots": [{ "start": "09:00", "end": "17:00" }] },
                "sat": { "enabled": false, "slots": [] },
                "sun": { "enabled": false, "slots": [] }
            }
        },
        "created_at": "2025-01-15T10:00:00+00:00",
        "updated_at": "2025-01-15T10:00:00+00:00"
    },
    "message": "Schedule has been cloned successfully"
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
    "message": "Schedule Availability has been deleted successfully"
}
```

> [!WARNING]
> You cannot delete a schedule that is currently being used by calendar events. Remove the schedule from all events first. Default schedules also cannot be deleted if the host has an active calendar.

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
                "availability_id": "1",
                "calendar": {
                    "id": 1,
                    "title": "Jane Smith",
                    "...": "Calendar fields"
                }
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
