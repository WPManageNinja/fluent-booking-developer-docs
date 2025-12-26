# Resources

## Pagination

List endpoints support pagination to help manage large datasets. You can control pagination using the following query parameters:

| Parameter | Type | Description | Default |
| :--- | :--- | :--- | :--- |
| `page` | integer | The page number to retrieve. | `1` |
| `per_page` | integer | The number of items to return per page. | `10` |

### Example Request

```http
GET /wp-json/fluent-booking/v2/calendars?page=2&per_page=20
```

## User Profile (xprofile)

Many endpoints return user information. When available, the user profile is typically included in the `xprofile` field.

### Structure

```json
{
    "user_id": 1,
    "total_points": 6425,
    "is_verified": 1,
    "status": "active",
    "display_name": "User Name",
    "username": "username",
    "avatar": "https://example.com/avatar.jpg",
    "created_at": "2024-03-05 16:37:02",
    "short_description": "User description",
    "meta": {
        "website": "https://example.com",
        "cover_photo": "https://example.com/cover.jpg",
        "social_links": {
            "twitter": "@handle",
            "youtube": "@handle",
            "linkedin": "handle",
            "fb": "handle",
            "instagram": "handle"
        },
        "badge_slug": ["badge1", "badge2"]
    },
    "badge": null
}
```
