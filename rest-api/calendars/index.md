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
| `calendar_type` | string | No | Filter by calendar type (e.g., "booking") |

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
                "events": [
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

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `title` | string | Yes | Calendar title |
| `slug` | string | No | URL-friendly slug (auto-generated if not provided) |
| `description` | string | No | Calendar description |
| `status` | string | No | Calendar status: `active` or `inactive` (default: `active`) |
| `type` | string | No | Calendar type (default: `simple`) |

### Response

Returns the created calendar object.

## Update Calendar

Update an existing calendar.

### Endpoint

```http
POST /calendars/{id}
```

### URL Parameters

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `id` | integer | Yes | The calendar ID |

### Request Body

Same parameters as Create Calendar.

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
    "message": "Calendar has been deleted successfully"
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
    "available": true,
    "message": "Slug is available"
}
```

## Related Resources

- [Calendar Events](/rest-api/calendars/events)
- [Event Settings](/rest-api/calendars/event-settings)
- [Event Integrations](/rest-api/calendars/event-integrations)
