# Calendar Events

Manage booking events within a calendar. Events represent the bookable time slots or appointments that users can schedule.

## Get Event

Retrieve details for a specific calendar event (slot).

### Endpoint

```http
GET /calendars/{id}/events/{event_id}
```

### URL Parameters

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `id` | integer | Yes | The calendar ID |
| `event_id` | integer | Yes | The event ID |

### Query Parameters

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `with[]` | array\<string\> | No | Include additional payloads. Supported values: `calendar`, `smart_codes`, `settings_menu`, `calendar_event_lists`. |

### Response

Returns an event object with settings normalized to the calendar host’s timezone. Optional collections are returned when requested via `with[]`.

```json
{
    "calendar_event": {
        "id": 2,
        "hash": "bd009d55f750026d3879cde67a7feebb",
        "user_id": 1,
        "calendar_id": 1,
        "duration": 30,
        "title": "30 Minute Meeting",
        "slug": "30min",
        "description": "Quick 30-minute consultation",
        "public_url": "https://affiliate.test/?fluent-booking=calendar&host=misbah&event=30min",
        "status": "active",
        "event_type": "single",
        "color_schema": "#0099ff",
        "max_book_per_slot": 1,
        "is_display_spots": false,
        "location_settings": [
            {
                "type": "phone_guest",
                "title": "Attendee Phone Number"
            }
        ],
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
            }
        },
        "author_profile": {
            "ID": 1,
            "name": "John Doe",
            "avatar": "https://example.com/avatar.jpg"
        }
    }
}
```

```json
// Additional keys when requested through with[]
{
    "calendar": { "...": "Calendar profile data" },
    "smart_codes": { "...": "Editor shortcode outputs" },
    "settings_menu": [ "...": "Admin menu entries" ],
    "calendar_event_lists": [ "...": "Other slots grouped by calendar" ]
}
```

## Get Availability Options

Retrieve available schedule presets and helper data for configuring event availability.

### Endpoint

```http
GET /calendars/{id}/events/{event_id}/availability
```

### Response

```json
{
    "schedule_options": {
        "range_types": [
            "range_days",
            "date_range"
        ],
        "...": "Additional availability configuration metadata"
    },
    "available_schedules": [
        {
            "id": 4,
            "title": "Default Host Availability"
        }
    ]
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

| Field | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `title` | string | Yes | Event title displayed on booking pages. |
| `duration` | integer | Yes | Event length in minutes (minimum 5). |
| `status` | string | Yes | `active` or `draft`. |
| `event_type` | string | Yes | Event type identifier (e.g., `single`, `group`). |
| `description` | string | No | Event description (HTML allowed; sanitized server-side). |
| `color_schema` | string | No | Hex color code (default `#0099ff`). |
| `location_type` | string | No | Location type (e.g., `zoom`, `phone`). |
| `location_settings` | array\<object\> | Conditional | Each item must include `type`. For `custom` provide `title`; for `in_person_organizer` provide `title` and `description` (the address); for `phone_organizer` provide `host_phone_number`. |
| `max_book_per_slot` | integer | Conditional | Required for `group` events; defaults to `1` otherwise. |
| `is_display_spots` | boolean | Conditional | Required for `group` events. |
| `settings` | object | Yes | Scheduling configuration (see below). |

#### `settings` object

| Field | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `schedule_type` | string | Yes | Scheduling mode. Most commonly `weekly_schedules`. |
| `weekly_schedules` | array\<object\> | Conditional | Required when `schedule_type` is `weekly_schedules`. Provide blocks in the calendar timezone. |
| `date_overrides` | array\<object\> | No | Specific date overrides. |
| `range_type` | string | No | Availability range mode (`range_days` by default). |
| `range_days` | integer | No | Number of days bookable when using `range_days` (default `60`). |
| `range_date_between` | array\<string\> | No | Start/end dates for `date_range`. |
| `schedule_conditions` | array\<object\> | No | Advanced notice and lead time conditions. |
| `buffer_time_before` | string | No | Minutes before each event. |
| `buffer_time_after` | string | No | Minutes after each event. |
| `slot_interval` | string | No | Interval override between slots. |
| `team_members` | array\<integer\> | No | Required for team calendars; include host user IDs. |

Availability defaults to the host’s primary schedule. Use the Update Event Availability endpoint to switch to a custom schedule after creation.

#### Example Request

```bash
curl -X POST "https://yoursite.com/wp-json/fluent-booking/v2/calendars/1/events" \
  -u "username:application_password" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "30 Minute Consultation",
    "duration": 30,
    "status": "active",
    "event_type": "single",
    "description": "Quick 1:1 consult",
    "color_schema": "#0099ff",
    "location_type": "zoom",
    "location_settings": [
      {
        "type": "zoom"
      }
    ],
    "settings": {
      "schedule_type": "weekly_schedules",
      "weekly_schedules": [
        {
          "day": "monday",
          "from": "09:00",
          "to": "17:00"
        }
      ],
      "buffer_time_before": "0",
      "buffer_time_after": "0"
    }
  }'
```

### Response

```json
{
    "message": "New Event Type has been created successfully",
    "slot": {
        "id": 15,
        "calendar_id": 1,
        "title": "30 Minute Consultation",
        "duration": 30,
        "status": "active",
        "...": "Additional slot fields"
    }
}
```

## Update Event Details

Update descriptive fields, location data, and presentation settings for an event.

### Endpoint

```http
POST /calendars/{id}/events/{event_id}/details
```

### Request Body

| Field | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `title` | string | Yes | Updated event title. |
| `duration` | integer | Yes | Event duration in minutes. |
| `status` | string | Yes | `active` or `draft`. |
| `description` | string | No | HTML description (sanitized). |
| `color_schema` | string | No | Hex color. |
| `location_settings` | array\<object\> | Conditional | Same requirements as Create Event. |
| `max_book_per_slot` | integer | Conditional | Required for `group` events. |
| `is_display_spots` | boolean | Conditional | Required for `group` events. |
| `multi_duration.enabled` | boolean | Conditional | Provide when configuring multiple durations. |
| `multi_duration.default_duration` | integer | Conditional | Required if `multi_duration.enabled` is `true`. |
| `multi_duration.available_durations` | array\<integer\> | Conditional | Required if `multi_duration.enabled` is `true`. |

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

## Update Event Availability

Adjust availability, override schedules, and attach shared availability pools.

### Endpoint

```http
POST /calendars/{id}/events/{event_id}/availability
```

### Request Body

| Field | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `schedule_type` | string | Yes | Scheduling mode (e.g., `weekly_schedules`). |
| `weekly_schedules` | array\<object\> | Conditional | Required for `weekly_schedules`. Provide slots in the calendar timezone. |
| `date_overrides` | array\<object\> | No | Date-specific overrides. |
| `range_type` | string | No | `range_days` or `date_range`. |
| `range_days` | integer | No | Number of days available when using `range_days`. |
| `range_date_between` | array\<string\> | No | Two-element array for `date_range`. |
| `common_schedule` | boolean | No | When `true`, reuse a shared host schedule for team events. |
| `hosts_schedules` | object | Conditional | Map of host IDs to availability IDs. Required for team events when `common_schedule` is `false`. |
| `availability_type` | string | No | `existing_schedule` or `custom`. |
| `availability_id` | integer | No | Availability record ID when using `existing_schedule`. |

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

## Update Event Limits

Configure booking limits, buffers, and frequency controls.

### Endpoint

```http
POST /calendars/{id}/events/{event_id}/limits
```

### Request Body

Send a `settings` object with the following keys:

| Field | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `settings.schedule_conditions` | array\<object\> | No | Lead time, cancellation windows, and related limits. |
| `settings.buffer_time_before` | string | No | Minutes before each slot. |
| `settings.buffer_time_after` | string | No | Minutes after each slot. |
| `settings.slot_interval` | string | No | Override interval between slots. |
| `settings.booking_frequency.enabled` | boolean | No | Toggle booking frequency limits. |
| `settings.booking_frequency.limits` | array\<object\> | Conditional | Frequency limits when enabled. |
| `settings.booking_duration.enabled` | boolean | No | Toggle maximum cumulative duration. |
| `settings.booking_duration.limits` | array\<object\> | Conditional | Duration limits when enabled. |
| `settings.lock_timezone.enabled` | boolean | No | Prevent attendees from changing timezone. |
| `settings.lock_timezone.timezone` | string | Conditional | Required when lock timezone is enabled. |

### Response

```json
{
    "message": "Data has been updated",
    "event": {
        "id": 15,
        "settings": {
            "buffer_time_before": "0",
            "buffer_time_after": "0",
            "...": "Updated limit settings"
        }
    }
}
```

## Update Event Status

Toggle an event between draft and active states.

### Endpoint

```http
PUT /calendars/{id}/events/{event_id}
```

### Request Body

| Field | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `status` | string | Yes | `active` or `draft`. |

### Response

```json
{
    "message": "Data has been updated"
}
```

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
    "message": "Calendar Event has been deleted"
}
```

## Clone Event

Create a copy of an existing event, optionally duplicating it into another calendar.

### Endpoint

```http
POST /calendars/{id}/clone-event/{event_id}
```

### Request Body

| Field | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `new_calendar_id` | integer | No | Destination calendar ID. Defaults to the current calendar. |

### Response

```json
{
    "message": "The Event Type has been cloned successfully",
    "slot": {
        "id": 37,
        "calendar_id": 1,
        "title": "30 Minute Meeting (clone)",
        "...": "Cloned event fields"
    }
}
```

## Get Event Schema

Retrieve the template used when initializing a new event.

### Endpoint

```http
GET /calendars/{id}/event-schema
```

### URL Parameters

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `id` | integer | Yes | The calendar ID |

### Response

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
