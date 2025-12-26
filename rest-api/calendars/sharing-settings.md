# Calendar Sharing Settings

Configure landing page and sharing settings for calendars. Sharing settings determine how calendar events are displayed on public-facing pages.

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

Update the sharing settings for a calendar.

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
| `enabled` | string | Yes | Enable/disable sharing: `yes` or `no` |
| `show_type` | string | No | Display type: `all` or `selected` |
| `enabled_slots` | array | No | Event IDs to show (when show_type is `selected`) |

### Example Request

```json
{
    "enabled": "yes",
    "show_type": "selected",
    "enabled_slots": [1, 2, 5]
}
```

### Response

Returns the updated settings and share URL.

```json
{
    "message": "Sharing settings updated successfully",
    "settings": {
        "enabled": "yes",
        "enabled_slots": [1, 2, 5],
        "show_type": "selected"
    },
    "share_url": "https://yoursite.com/?fluent-booking=calendar&host=john-doe"
}
```

## Related Resources

- [Calendars](/rest-api/calendars/)
- [Calendar Events](/rest-api/calendars/events)
