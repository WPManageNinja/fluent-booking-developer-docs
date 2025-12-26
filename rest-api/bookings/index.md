# Bookings

The Bookings API allows you to create and manage calendar event bookings. Bookings are created by attendees when they schedule time with a calendar event.

## List Bookings

Retrieve all bookings.

### Endpoint

```http
GET /bookings
```

### Query Parameters

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `event_id` | integer | No | Filter by event ID |
| `calendar_id` | integer | No | Filter by calendar ID |
| `status` | string | No | Filter by booking status |

### Response

Returns an array of bookings.

```json
{
    "bookings": [
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
            "message": "Looking forward to our meeting",
            "start_time": "2025-01-15 10:00:00",
            "end_time": "2025-01-15 10:30:00",
            "duration": 30,
            "location_details": {
                "type": "phone_guest",
                "value": "+1234567890"
            },
            "created_at": "2025-01-10T08:30:00+00:00",
            "updated_at": "2025-01-10T08:30:00+00:00"
        }
    ],
    "total": 1
}
```

### Booking Status Values

| Status | Description |
| :--- | :--- |
| `scheduled` | Booking is confirmed and scheduled |
| `pending` | Booking is awaiting approval |
| `cancelled` | Booking has been cancelled |
| `completed` | Booking has been completed |
| `rejected` | Booking request was rejected |

## Get Event for Booking

Retrieve event details for creating a booking. This endpoint provides the necessary information to display booking availability.

### Endpoint

```http
GET /bookings/event/{event_id}
```

### URL Parameters

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `event_id` | integer | Yes | The event ID |

### Query Parameters

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `date` | string | No | Date to check availability (YYYY-MM-DD) |
| `timezone` | string | No | Timezone for availability (e.g., "America/New_York") |

### Response

Returns event details with available time slots.

```json
{
    "event": {
        "id": 2,
        "title": "30 Minute Consultation",
        "description": "Quick consultation call",
        "duration": 30,
        "color_schema": "#0099ff",
        "location_settings": [
            {
                "type": "phone_guest",
                "title": "Attendee Phone Number"
            }
        ],
        "booking_fields": [
            {
                "name": "name",
                "label": "Your Name",
                "type": "text",
                "required": true
            },
            {
                "name": "email",
                "label": "Your Email",
                "type": "email",
                "required": true
            }
        ]
    },
    "available_slots": [
        {
            "date": "2025-01-15",
            "slots": [
                "09:00",
                "09:30",
                "10:00",
                "10:30",
                "11:00"
            ]
        }
    ]
}
```

## Create Booking

Create a new booking for an event.

### Endpoint

```http
POST /bookings/create/{event_id}
```

### URL Parameters

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `event_id` | integer | Yes | The event ID |

### Request Body

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `first_name` | string | Yes | Attendee's first name |
| `last_name` | string | Yes | Attendee's last name |
| `email` | string | Yes | Attendee's email address |
| `phone` | string | No | Attendee's phone number |
| `message` | string | No | Meeting notes or message |
| `start_time` | string | Yes | Booking start time (Y-m-d H:i:s in UTC or with timezone) |
| `timezone` | string | Yes | Attendee's timezone |
| `location_type` | string | No | Selected location type |
| `location_details` | object | No | Location-specific details |
| `additional_guests` | array | No | Array of additional guest emails |
| `custom_fields` | object | No | Custom field values |

### Example Request

```json
{
    "first_name": "John",
    "last_name": "Doe",
    "email": "john.doe@example.com",
    "phone": "+1234567890",
    "message": "Looking forward to discussing the project",
    "start_time": "2025-01-15 10:00:00",
    "timezone": "America/New_York",
    "location_type": "phone_guest",
    "location_details": {
        "phone": "+1234567890"
    },
    "additional_guests": ["jane.smith@example.com"]
}
```

### Response

Returns the created booking object with confirmation details.

```json
{
    "message": "Booking created successfully",
    "booking": {
        "id": 1,
        "event_id": 2,
        "booking_hash": "abc123def456",
        "status": "scheduled",
        "first_name": "John",
        "last_name": "Doe",
        "email": "john.doe@example.com",
        "start_time": "2025-01-15 10:00:00",
        "end_time": "2025-01-15 10:30:00",
        "timezone": "America/New_York",
        "confirmation_url": "https://yoursite.com/?fluent-booking=confirmation&hash=abc123def456",
        "reschedule_url": "https://yoursite.com/?fluent-booking=reschedule&hash=abc123def456",
        "cancel_url": "https://yoursite.com/?fluent-booking=cancel&hash=abc123def456"
    }
}
```

## Related Resources

- [Schedules](/rest-api/schedules/)
- [Calendar Events](/rest-api/calendars/events)
