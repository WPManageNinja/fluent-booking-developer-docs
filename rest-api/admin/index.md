# Admin

The Admin API provides endpoints for managing hosts and users within Fluent Booking.

## Get All Hosts

Retrieve all calendar hosts/owners.

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

Retrieve hosts not yet assigned to a specific context.

### Endpoint

```http
GET /admin/remaining-hosts
```

### Response

Returns array of available hosts.

## Get Other Hosts

Retrieve hosts excluding the current user.

### Endpoint

```http
GET /admin/other-hosts
```

### Response

Returns array of other hosts in the system.

## Related Resources

- [Calendars](/rest-api/calendars/)
- [Settings](/rest-api/settings/)
