# Reports

The Reports API provides analytics and activity data for bookings and calendars.

## Get Reports

Retrieve booking reports and statistics.

### Endpoint

```http
GET /reports
```

### Query Parameters

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `date_from` | string | No | Start date (YYYY-MM-DD) |
| `date_to` | string | No | End date (YYYY-MM-DD) |
| `calendar_id` | integer | No | Filter by calendar |
| `event_id` | integer | No | Filter by event |

### Response

Returns booking statistics and metrics.

```json
{
    "reports": {
        "total_bookings": 150,
        "confirmed_bookings": 120,
        "pending_bookings": 15,
        "cancelled_bookings": 15,
        "total_revenue": 15000.00,
        "average_booking_value": 100.00,
        "popular_events": [
            {
                "event_id": 2,
                "title": "30 Minute Consultation",
                "bookings_count": 85
            }
        ],
        "bookings_by_status": {
            "scheduled": 120,
            "pending": 15,
            "cancelled": 15
        },
        "bookings_by_date": [
            {
                "date": "2025-01-15",
                "count": 12
            }
        ]
    },
    "date_range": {
        "from": "2025-01-01",
        "to": "2025-01-31"
    }
}
```

## Get Graph Reports

Retrieve data formatted for graphical visualization.

### Endpoint

```http
GET /reports/graph-reports
```

### Query Parameters

Same as Get Reports endpoint.

### Response

Returns data optimized for charts and graphs.

```json
{
    "graph_data": {
        "labels": ["Week 1", "Week 2", "Week 3", "Week 4"],
        "datasets": [
            {
                "label": "Bookings",
                "data": [25, 30, 28, 35]
            },
            {
                "label": "Revenue",
                "data": [2500, 3000, 2800, 3500]
            }
        ]
    }
}
```

## Get Activities

Retrieve activity logs and recent actions.

### Endpoint

```http
GET /reports/activities
```

### Query Parameters

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `page` | integer | No | Page number |
| `per_page` | integer | No | Items per page (max 50) |
| `type` | string | No | Activity type filter |

### Response

Returns paginated activity log.

```json
{
    "activities": {
        "current_page": 1,
        "data": [
            {
                "id": 1,
                "type": "booking_created",
                "description": "New booking created for 30 Minute Consultation",
                "user_name": "John Doe",
                "created_at": "2025-01-15T10:30:00+00:00"
            },
            {
                "id": 2,
                "type": "booking_cancelled",
                "description": "Booking cancelled by attendee",
                "user_name": "Jane Smith",
                "created_at": "2025-01-15T09:15:00+00:00"
            }
        ],
        "total": 150,
        "per_page": 15
    }
}
```

### Activity Types

| Type | Description |
| :--- | :--- |
| `booking_created` | New booking created |
| `booking_updated` | Booking modified |
| `booking_cancelled` | Booking cancelled |
| `booking_rescheduled` | Booking rescheduled |
| `payment_received` | Payment processed |
| `email_sent` | Email notification sent |

## Related Resources

- [Schedules](/rest-api/schedules/)
- [Bookings](/rest-api/bookings/)
