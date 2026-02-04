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
            "...": "Additional booking fields"
        }
    ]
}
```

### Overview Widget Fields

| Field | Type | Description |
| :--- | :--- | :--- |
| `title` | string | Widget title |
| `period` | string | Period identifier (e.g., `all`, `completed`, `cancelled`) |
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

Returns time-series data for booked, completed, and cancelled bookings.

```json
{
    "booked_stats": [
        {
            "label": "Jan 01",
            "count": 5
        },
        {
            "label": "Jan 08",
            "count": 8
        }
    ],
    "completed_stats": [
        {
            "label": "Jan 01",
            "count": 3
        },
        {
            "label": "Jan 08",
            "count": 6
        }
    ],
    "cancelled_stats": [
        {
            "label": "Jan 01",
            "count": 1
        },
        {
            "label": "Jan 08",
            "count": 0
        }
    ]
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
            "type": "booking_created",
            "description": "New booking created for 30 Minute Consultation",
            "created_at": "2025-01-15T10:30:00+00:00"
        },
        {
            "id": 2,
            "booking_id": 1,
            "type": "email_sent",
            "description": "Confirmation email sent to john@example.com",
            "created_at": "2025-01-15T10:30:15+00:00"
        }
    ]
}
```

> [!NOTE]
> Activities are limited to the most recent 100 entries. There is no pagination or filtering support for this endpoint.

## Related Resources

- [Schedules](/rest-api/schedules/)
- [Bookings](/rest-api/bookings/)
