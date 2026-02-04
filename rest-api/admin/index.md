# Admin

The Admin API provides endpoints for managing hosts and users within Fluent Booking.

## Get All Hosts

Retrieve all calendar hosts/owners. Delegates to `Calendar::getAllHosts()`.

### Endpoint

```http
GET /admin/all-hosts
```

### Response

Returns array of all hosts with their calendar information.

```json
{
    "hosts": [
        {
            "id": 1,
            "name": "Jane Smith",
            "label": "jane (jane@example.com)",
            "avatar": "https://example.com/avatar.jpg",
            "calendar_id": 1,
            "deleted_user": false
        }
    ]
}
```

## Get Remaining Hosts

Retrieve WordPress users who can be assigned as hosts. Users who already have a calendar are marked as `disabled`.

### Endpoint

```http
GET /admin/remaining-hosts
```

### Query Parameters

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `search` | string | No | Search users by name, email, or display name |
| `selected_id` | integer | No | Ensure this user ID is included in results even if not matched by search |

### Response

Returns array of available hosts. If the current user cannot `list_users`, only their own user is returned.

```json
{
    "hosts": [
        {
            "id": 2,
            "label": "Jane Smith (jane@example.com)",
            "avatar": "https://example.com/avatar.jpg",
            "disabled": false
        },
        {
            "id": 3,
            "label": "John Doe (john@example.com)",
            "avatar": "https://example.com/avatar2.jpg",
            "disabled": true
        }
    ]
}
```

### Host Fields

| Field | Type | Description |
| :--- | :--- | :--- |
| `id` | integer | WordPress user ID |
| `label` | string | Display name with email in parentheses |
| `avatar` | string | Avatar URL |
| `disabled` | boolean | `true` if user already has a calendar |

> [!NOTE]
> When the current user lacks the `list_users` capability, the response returns only their own user with an additional `is_own: true` field.

## Get Other Hosts

Retrieve calendar hosts excluding the current user. Only returns users who have an existing `simple` type calendar.

### Endpoint

```http
GET /admin/other-hosts
```

### Response

Returns array of other hosts in the system.

```json
{
    "hosts": [
        {
            "id": "2",
            "label": "Jane Smith"
        }
    ]
}
```

### Host Fields

| Field | Type | Description |
| :--- | :--- | :--- |
| `id` | string | User ID (returned as string) |
| `label` | string | User's full name (or "Deleted User" if account was removed) |

> [!NOTE]
> If the current user cannot `list_users`, an empty hosts array is returned.

## Related Resources

- [Calendars](/rest-api/calendars/)
- [Settings](/rest-api/settings/)
