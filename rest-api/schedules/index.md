# Schedules

The Schedules API allows you to manage and view booked appointments. Schedules represent confirmed bookings with full details and management capabilities.

## List Schedules

Retrieve all scheduled bookings with pagination.

### Endpoint

```http
GET /schedules
```

### Query Parameters

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `page` | integer | No | Page number (default: 1) |
| `per_page` | integer | No | Items per page (default: 15) |
| `status` | string | No | Filter by status: `scheduled`, `pending`, `cancelled`, `completed` |
| `event_id` | integer | No | Filter by event ID |
| `calendar_id` | integer | No | Filter by calendar ID |
| `search` | string | No | Search by attendee name or email |
| `date_from` | string | No | Filter from date (YYYY-MM-DD) |
| `date_to` | string | No | Filter to date (YYYY-MM-DD) |

### Response

Returns paginated list of scheduled bookings with calendar event information.

```json
{
    "schedules": {
        "current_page": 1,
        "data": [
            {
                "id": 1,
                "event_id": 2,
                "calendar_id": 1,
                "person_user_id": null,
                "event_type": "single",
                "status": "scheduled",
                "booking_hash": "abc123def456",
                "first_name": "John",
                "last_name": "Doe",
                "email": "john.doe@example.com",
                "phone": "+1234567890",
                "message": "Project discussion",
                "start_time": "2025-01-15 10:00:00",
                "end_time": "2025-01-15 10:30:00",
                "duration": 30,
                "timezone": "America/New_York",
                "location_details": {
                    "type": "phone_guest",
                    "value": "+1234567890"
                },
                "created_at": "2025-01-10T08:30:00+00:00",
                "updated_at": "2025-01-10T08:30:00+00:00",
                "event": {
                    "id": 2,
                    "title": "30 Minute Consultation",
                    "slug": "30min",
                    "color_schema": "#0099ff"
                },
                "calendar": {
                    "id": 1,
                    "title": "Jane Smith",
                    "slug": "jane-smith"
                }
            }
        ],
        "total": 1,
        "per_page": 15,
        "current_page": 1,
        "last_page": 1
    },
    "timezone": "UTC",
    "calendar_event_lists": [
        {
            "id": 1,
            "title": "Jane Smith",
            "options": [
                {
                    "id": 2,
                    "title": "30 Minute Consultation"
                }
            ]
        }
    ]
}
```

## Get Schedule Details

Retrieve full details for a specific scheduled booking.

### Endpoint

```http
GET /schedules/{id}
```

### URL Parameters

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `id` | integer | Yes | The schedule/booking ID |

### Response

Returns complete booking details with attendee information and event settings.

```json
{
    "booking": {
        "id": 1,
        "event_id": 2,
        "calendar_id": 1,
        "booking_hash": "abc123def456",
        "status": "scheduled",
        "first_name": "John",
        "last_name": "Doe",
        "email": "john.doe@example.com",
        "phone": "+1234567890",
        "message": "Project discussion",
        "start_time": "2025-01-15 10:00:00",
        "end_time": "2025-01-15 10:30:00",
        "timezone": "America/New_York",
        "location_details": {
            "type": "phone_guest",
            "value": "+1234567890",
            "display": "Call attendee at +1234567890"
        },
        "additional_fields": {
            "company": "Acme Corp",
            "role": "Product Manager"
        },
        "guests": [
            {
                "email": "jane.smith@example.com",
                "name": "Jane Smith"
            }
        ],
        "event": {
            "id": 2,
            "title": "30 Minute Consultation",
            "description": "Quick consultation call",
            "duration": 30
        },
        "calendar": {
            "id": 1,
            "title": "Jane Smith",
            "user_id": 1
        },
        "host": {
            "id": 1,
            "name": "Jane Smith",
            "email": "jane@example.com",
            "timezone": "UTC"
        }
    }
}
```

## Update Schedule

Update a scheduled booking.

### Endpoint

```http
PUT /schedules/{id}
```

### URL Parameters

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `id` | integer | Yes | The schedule/booking ID |

### Request Body

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `status` | string | No | Update status: `scheduled`, `cancelled`, `completed` |
| `first_name` | string | No | Update attendee first name |
| `last_name` | string | No | Update attendee last name |
| `email` | string | No | Update attendee email |
| `phone` | string | No | Update phone number |
| `message` | string | No | Update message/notes |
| `start_time` | string | No | Reschedule to new time |
| `location_details` | object | No | Update location details |

### Example Request

```json
{
    "status": "completed",
    "message": "Meeting was very productive"
}
```

### Response

Returns the updated booking object.

## Delete Schedule

Delete (cancel) a scheduled booking.

### Endpoint

```http
DELETE /schedules/{id}
```

### URL Parameters

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `id` | integer | Yes | The schedule/booking ID |

### Request Body

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `cancellation_reason` | string | No | Reason for cancellation |

### Response

```json
{
    "message": "Booking cancelled successfully"
}
```

## Get Schedule Slot

Retrieve availability slot information for a booking.

### Endpoint

```http
GET /schedules/{id}/slot
```

### URL Parameters

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `id` | integer | Yes | The schedule/booking ID |

### Response

Returns slot availability and timing information.

## Get Booking Activities

Retrieve activity log for a booking (changes, emails sent, etc.).

### Endpoint

```http
GET /schedules/{id}/activities
```

### URL Parameters

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `id` | integer | Yes | The schedule/booking ID |

### Response

Returns array of activity log entries.

```json
{
    "activities": [
        {
            "id": 1,
            "booking_id": 1,
            "type": "booking_created",
            "description": "Booking created by John Doe",
            "created_at": "2025-01-10T08:30:00+00:00"
        },
        {
            "id": 2,
            "booking_id": 1,
            "type": "email_sent",
            "description": "Confirmation email sent to john.doe@example.com",
            "created_at": "2025-01-10T08:30:15+00:00"
        }
    ]
}
```

## Get Booking Meta Info

Retrieve additional metadata for a booking.

### Endpoint

```http
GET /schedules/{id}/meta-info
```

### URL Parameters

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `id` | integer | Yes | The schedule/booking ID |

### Response

Returns booking metadata including custom fields and internal data.

## Send Confirmation Email

Manually send confirmation email for a booking.

### Endpoint

```http
POST /schedules/{id}/send-confirmation-email
```

### URL Parameters

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `id` | integer | Yes | The schedule/booking ID |

### Response

```json
{
    "message": "Confirmation email sent successfully"
}
```

## Get Group Booking Attendees

Retrieve all attendees for a group booking.

### Endpoint

```http
GET /schedules/group-bookings/{group_id}/attendees
```

### URL Parameters

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `group_id` | integer | Yes | The group booking ID |

### Response

Returns array of attendees in the group booking.

```json
{
    "attendees": [
        {
            "id": 1,
            "first_name": "John",
            "last_name": "Doe",
            "email": "john.doe@example.com",
            "status": "confirmed"
        },
        {
            "id": 2,
            "first_name": "Jane",
            "last_name": "Smith",
            "email": "jane.smith@example.com",
            "status": "confirmed"
        }
    ],
    "total_attendees": 2,
    "max_attendees": 10
}
```

## Related Resources

- [Bookings](/rest-api/bookings/)
- [Calendar Events](/rest-api/calendars/events)
- [Transactions](/rest-api/schedules/transactions)
