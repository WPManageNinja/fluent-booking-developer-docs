# Reports

The Reports API provides analytics and activity data for bookings and calendars.

## Get Reports

Retrieve booking dashboard overview with statistics widgets, latest bookings, and upcoming meetings.

### Endpoint

```http
GET /reports
```

### Query Parameters

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `startTime` | string | No | Start date/time (YYYY-MM-DD HH:mm:ss). If omitted, defaults to the last 30 days |
| `endTime` | string | No | End date/time (YYYY-MM-DD HH:mm:ss). If omitted, defaults to current time |

> [!NOTE]
> Both `startTime` and `endTime` must be provided together. If either is missing, the API returns all-time statistics with the last 30 days used for comparison stats.

### Response

Returns an overview array of widget objects, latest bookings, and upcoming meetings.

```json
{
    "overview": [
        {
            "title": "Total Bookings",
            "period": "all",
            "number": 150,
            "content": "More than last month",
            "icon": "<svg>...</svg>",
            "stat": 12.5
        },
        {
            "title": "Completed Bookings",
            "period": "completed",
            "number": 120,
            "content": "More than last month",
            "icon": "<svg>...</svg>",
            "stat": 8.3
        },
        {
            "title": "Cancelled Bookings",
            "period": "cancelled",
            "number": 15,
            "content": "Less than last month",
            "icon": "<svg>...</svg>",
            "stat": -5.0
        },
        {
            "title": "Total Guests",
            "number": 95,
            "content": "Same as last month",
            "icon": "<svg>...</svg>",
            "stat": 0
        }
    ],
    "latest_books": [
        {
            "id": 1,
            "status": "scheduled",
            "first_name": "John",
            "last_name": "Doe",
            "email": "john@example.com",
            "start_time": "2025-01-15 10:00:00",
            "end_time": "2025-01-15 10:30:00",
            "...": "Additional booking fields"
        }
    ],
    "next_meetings": [
        {
            "id": 2,
            "status": "scheduled",
            "first_name": "Jane",
            "last_name": "Smith",
            "start_time": "2025-01-16 14:00:00",
            "end_time": "2025-01-16 14:30:00",
            "title": "30 Minute Consultation with Jane Smith",
            "author": {
                "name": "Host Name"
            },
            "slot": {
                "id": 2,
                "title": "30 Minute Consultation"
            },
            "booked_count": 5,
            "...": "Additional booking fields"
        }
    ]
}
```

> [!NOTE]
> The `booked_count` field is only included for multi-guest (group) bookings. It shows the total number of active attendees in the group. The `slot` field contains the associated calendar event; if the event has been deleted, `slot` will be an empty object `{}` and `author.name` will be `"unknown"`.

### Overview Widget Fields

| Field | Type | Description |
| :--- | :--- | :--- |
| `title` | string | Widget title |
| `period` | string | Period identifier (e.g., `all`, `completed`, `cancelled`). Not present on the "Total Guests" widget |
| `number` | integer | Count for the metric |
| `content` | string | Comparison message (e.g., "More than last month") |
| `icon` | string | SVG icon markup |
| `stat` | number | Percentage change compared to previous period |

## Get Graph Reports

Retrieve booking data formatted for graphical visualization.

### Endpoint

```http
GET /reports/graph-reports
```

### Query Parameters

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `date_range` | array | No | Array of two date strings: `[start_date, end_date]` in YYYY-MM-DD format |

### Example Request

```
GET /reports/graph-reports?date_range[0]=2025-01-01&date_range[1]=2025-01-31
```

### Response

Returns time-series data for booked, completed, and cancelled bookings. Each stats object is a key-value map where keys are formatted date strings and values are counts.

For daily/weekly ranges, keys use `YYYY-MM-DD` format. For monthly ranges (periods longer than ~92 days), keys use `Mon YYYY` format (e.g., `"Jan 2025"`).

```json
{
    "booked_stats": {
        "2025-01-01": 5,
        "2025-01-02": 3,
        "2025-01-03": 8
    },
    "completed_stats": {
        "2025-01-01": 3,
        "2025-01-02": 2,
        "2025-01-03": 6
    },
    "cancelled_stats": {
        "2025-01-01": 1,
        "2025-01-02": 0,
        "2025-01-03": 0
    }
}
```

## Get Activities

Retrieve recent activity logs. Returns the latest 100 activity entries (not paginated).

### Endpoint

```http
GET /reports/activities
```

### Response

Returns an array of activity log entries.

```json
{
    "activities": [
        {
            "id": 1,
            "booking_id": 1,
            "parent_id": null,
            "created_by": 1,
            "status": "closed",
            "type": "success",
            "title": "Booking Created",
            "description": "New booking created for 30 Minute Consultation",
            "created_at": "2025-01-15T10:30:00+00:00",
            "updated_at": "2025-01-15T10:30:00+00:00"
        },
        {
            "id": 2,
            "booking_id": 1,
            "parent_id": null,
            "created_by": null,
            "status": "closed",
            "type": "info",
            "title": "Email Sent",
            "description": "Confirmation email sent to john@example.com",
            "created_at": "2025-01-15T10:30:15+00:00",
            "updated_at": "2025-01-15T10:30:15+00:00"
        }
    ]
}
```

> [!NOTE]
> Activities are limited to the most recent 100 entries. There is no pagination or filtering support for this endpoint.

## Related Resources

- [Schedules](/rest-api/schedules/)
- [Bookings](/rest-api/bookings/)
