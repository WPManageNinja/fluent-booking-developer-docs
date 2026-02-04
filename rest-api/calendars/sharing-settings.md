# Calendar Sharing Settings

Configure landing page and sharing settings for calendars. Sharing settings determine how calendar events are displayed on public-facing pages. This endpoint also manages the host's profile information (name, timezone, avatar, etc.).

## Get Sharing Settings

Retrieve the sharing/landing page settings for a calendar.

### Endpoint

```http
GET /calendars/{id}/sharing-settings
```

### URL Parameters

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `id` | integer | Yes | The calendar ID |

### Response

Returns sharing settings and the public share URL.

```json
{
    "settings": {
        "enabled": "yes",
        "enabled_slots": [],
        "show_type": "all"
    },
    "share_url": "https://yoursite.com/?fluent-booking=calendar&host=john-doe"
}
```

### Settings Fields

| Field | Type | Description |
| :--- | :--- | :--- |
| `enabled` | string | Whether sharing is enabled: `yes` or `no` |
| `enabled_slots` | array | Array of event IDs to show (empty = show all) |
| `show_type` | string | Display type: `all` (show all events) or `selected` (show only enabled_slots) |

## Update Sharing Settings

Update the calendar's host profile and landing page settings.

### Endpoint

```http
POST /calendars/{id}/sharing-settings
```

### URL Parameters

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `id` | integer | Yes | The calendar ID |

### Request Body

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `calendar_data` | object | No | Host profile data |
| `calendar_data.title` | string | Conditional | Host/calendar name (required if `calendar_data` is provided) |
| `calendar_data.timezone` | string | No | Host timezone (IANA identifier) |
| `calendar_data.description` | string | No | Calendar description (HTML allowed, sanitized) |
| `calendar_data.calendar_avatar` | string | No | Profile photo URL (must be valid URL) |
| `calendar_data.featured_image` | string | No | Featured image URL (must be valid URL) |
| `calendar_data.phone` | string | No | Host phone number |
| `landing_page_settings` | object | No | Landing page display settings |

### Example Request

```json
{
    "calendar_data": {
        "title": "Jane Smith",
        "timezone": "America/New_York",
        "description": "Schedule a meeting with me",
        "calendar_avatar": "https://example.com/avatar.jpg",
        "featured_image": "https://example.com/banner.jpg",
        "phone": "+1234567890"
    },
    "landing_page_settings": {
        "enabled": "yes",
        "show_type": "selected",
        "enabled_slots": [1, 2, 5]
    }
}
```

### Response

```json
{
    "message": "Landing Page settings has been updated"
}
```

> [!NOTE]
> When updating `calendar_data.timezone`, the system automatically adjusts all event schedules associated with this calendar to the new timezone.

## Related Resources

- [Calendars](/rest-api/calendars/)
- [Calendar Events](/rest-api/calendars/events)
