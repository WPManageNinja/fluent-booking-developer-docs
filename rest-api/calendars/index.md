# Calendars

The Calendars API allows you to manage calendar resources and their associated events. Calendars serve as containers for booking events and can be configured with various settings.

## List Calendars

Retrieve a paginated list of all calendars with their associated events and settings.

### Endpoint

```http
GET /calendars
```

### Query Parameters

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `page` | integer | No | Page number for pagination (default: 1) |
| `per_page` | integer | No | Number of items per page (default: 15) |
| `search` | string | No | Search by calendar events title |
| `calendarType` | string | No | Filter by calendar type (e.g., "booking") |

### Response

Returns a paginated collection of calendars with their events and related data.

```json
{
    "message": "Calendars have been fetched",
    "calendars": {
        "current_page": 1,
        "data": [
            {
                "id": 1,
                "hash": "6e89f7bb638d505d7f5c6254f6295f7b",
                "user_id": "1",
                "title": "hasan Misbah",
                "slug": "misbah",
                "description": "",
                "status": "active",
                "type": "simple",
                "event_type": "scheduling",
                "author_timezone": "UTC",
                "created_at": "2024-07-03T04:16:50+00:00",
                "updated_at": "2025-05-26T22:41:28+00:00",
                "slots": [
                    {
                        "id": 2,
                        "calendar_id": 1,
                        "parent_id": null,
                        "user_id": "1",
                        "title": "30 Minute Meeting",
                        "slug": "30min",
                        "description": "Quick 30-minute consultation",
                        "duration": 30,
                        "duration_unit": "minutes",
                        "status": "active",
                        "type": "paid",
                        "color_schema": "#0099ff",
                        "location_type": "",
                        "location_settings": [
                            {
                                "type": "phone_guest",
                                "title": "Attendee Phone Number",
                                "display_on_booking": ""
                            }
                        ],
                        "event_type": "single",
                        "max_book_per_slot": "1",
                        "created_at": "2025-05-28T03:36:51+00:00",
                        "updated_at": "2025-05-28T03:37:04+00:00",
                        "public_url": "https://affiliate.test/?fluent-booking=calendar&host=misbah&event=30min",
                        "price_total": 100
                    }
                ],
                "user": {
                    "ID": 1,
                    "user_login": "admin",
                    "display_name": "admin",
                    "full_name": "Cameran Goff"
                }
            }
        ],
        "total": 1,
        "per_page": 15,
        "current_page": 1,
        "last_page": 1
    }
}
```

### Example Request

```bash
curl -X GET "https://yoursite.com/wp-json/fluent-booking/v2/calendars" \
  -u "username:application_password" \
  -H "Content-Type: application/json"
```

## Get Single Calendar

Retrieve a specific calendar by ID with full details.

### Endpoint

```http
GET /calendars/{id}
```

### URL Parameters

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `id` | integer | Yes | The calendar ID |

### Response

Returns a single calendar object with all associated data.

## Create Calendar

Create a new calendar.

### Endpoint

```http
POST /calendars
```

### Request Body

The payload must contain a `calendar` object

| Field | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `calendar` | object | Yes | Primary calendar data. |
| `calendar.author_timezone` | string | Yes | Host timezone (IANA identifier). Defaults to `UTC` if empty. |
| `calendar.type` | string | No | Calendar type. Defaults to `simple` (host calendar). |
| `calendar.title` | string | Conditional | Required when creating a team/`type` ≠ `simple` calendar; used to generate the slug. |
| `calendar.user_id` | integer | Conditional | Target host user. Only honored when the authenticated user has `manage_all_data` and `invite_team_members` capabilities. |
| `calendar.slug` | string | No | Preferred slug. Must be unique; a suffix is appended if unavailable. |
| `calendar.slot` | object | Yes | Event slot configuration created along with the calendar (see below). |

#### `calendar.slot` object

| Field | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `title` | string | Yes | Event title used in booking pages. |
| `duration` | integer | Yes | Event length in minutes (minimum 5). |
| `description` | string | No | Event description. Supports HTML; sanitized server-side. |
| `event_type` | string | Yes | Event type identifier (matches UI event types). |
| `status` | string | No | Slot status; `active` or `draft`. Defaults to `active`. |
| `color_schema` | string | No | Hex color used for the slot badge. Defaults to `#0099ff`. |
| `availability_type` | string | Yes | Availability source. Accepts `existing_schedule` or `custom`. |
| `location_type` | string | No | Location type (e.g., `zoom`, `phone`, `in_person`). |
| `location_heading` | string | No | Custom heading shown above the location instructions. |
| `location_settings` | array\<object\> | Conditional | Location-specific settings. Each item must contain `type`; when `type` = `phone_organizer`, `host_phone_number` is required. |
| `settings.schedule_type` | string | Yes | Scheduling mode (e.g., `weekly_schedules`). |
| `settings.weekly_schedules` | array\<object\> | Conditional | Required when `settings.schedule_type` is `weekly_schedules`. Provide weekly availability blocks; see availability docs for the structure. |
| `settings.team_members` | array\<integer\> | Conditional | Required when creating a team calendar (`calendar.type` ≠ `simple`). Must include the host’s user ID. |

Additional slot settings are accepted but sanitized against the default schema.

#### Example Request

```bash
curl -X POST "https://yoursite.com/wp-json/fluent-booking/v2/calendars" \
  -u "username:application_password" \
  -H "Content-Type: application/json" \
  -d '{
    "calendar": {
      "author_timezone": "America/New_York",
      "type": "team",
      "title": "Sales Consultation",
      "user_id": 12,
      "slot": {
        "title": "30 Minute Consultation",
        "duration": 30,
        "event_type": "single",
        "availability_type": "custom",
        "status": "active",
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
          "team_members": [12, 23]
        }
      }
    }
  }'
```
```

### Response

Returns the created calendar, its initial slot, and a redirect URL for managing the slot.

```json
{
  "calendar": {
    "id": 42,
    "slug": "sales-consultation",
    "user_id": 12,
    "title": "Sales Consultation",
    "type": "team",
    "author_timezone": "America/New_York",
    "...": "Additional calendar fields"
  },
  "slot": {
    "id": 105,
    "calendar_id": 42,
    "title": "30 Minute Consultation",
    "duration": 30,
    "status": "active",
    "...": "Additional slot fields"
  },
  "redirect_url": "https://yoursite.com/wp-admin/admin.php?page=fluent-booking#/calendars/42/slot-settings/105"
}
```

## Update Calendar

Update an existing calendar's description and basic fields.

### Endpoint

```http
POST /calendars/{id}
```

### URL Parameters

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `id` | integer | Yes | The calendar ID |

### Request Body

| Field         | Type   | Required | Description                                     |
|---------------|--------|----------|-------------------------------------------------|
| `description` | string | No       | The new description for the calendar (HTML allowed, sanitized server-side) |

### Response

Returns the updated calendar object and a status message.

```json
{
  "calendar": {
    "id": 42,
    "slug": "sales-consultation",
    "user_id": 12,
    "title": "Sales Consultation",
    "type": "team",
    "author_timezone": "America/New_York",
    "description": "Updated description",
    "...": "Additional calendar fields"
  },
  "message": "Calendar has been updated successfully"
}
```

**Note:**  
Only the description is guaranteed to be updated via this endpoint. Additional calendar fields (such as `title` and `timezone`) may be updated under special endpoints (see [Sharing Settings](#) for extra profile fields).


## Delete Calendar

Delete a calendar and all associated events.

### Endpoint

```http
DELETE /calendars/{id}
```

### URL Parameters

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `id` | integer | Yes | The calendar ID |

### Response

```json
{
    "message": "Calendar Deleted Successfully!"
}
```

## Check Slug Availability

Validate if a calendar slug is available.

### Endpoint

```http
POST /calendars/check-slug
```

### Request Body

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `slug` | string | Yes | The slug to validate |

### Response

```json
{
    "status": true,
    "message": "The provided slug is available"
}
```

## Related Resources

- [Calendar Events](/rest-api/calendars/events)
- [Event Settings](/rest-api/calendars/event-settings)
- [Event Integrations](/rest-api/calendars/event-integrations)
