# Bookings

The Bookings API allows you to create and manage calendar event bookings. Bookings are created by attendees when they schedule time with a calendar event.

## List Bookings

Retrieve bookings for the currently authenticated user.

### Endpoint

```http
GET /bookings
```

### Query Parameters

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `per_page` | integer | No | Number of bookings per page (default: 10) |
| `period` | string | No | Filter by period: `all`, `upcoming`, `past` (default: `all`) |
| `calendar_ids[]` | array | No | Filter by calendar IDs. Pass `all` to include all calendars |

### Response

Returns an array of bookings for the authenticated user.

```json
{
    "bookings": [
        {
            "id": 1,
            "person_time_zone": "America/New_York",
            "status": "Scheduled",
            "payment_status": "paid",
            "booking_title": "30 Minute Consultation with Jane Smith",
            "author_name": "Jane Smith",
            "booking_date": "January 15, 2025",
            "booking_time": "10:00 AM - 10:30 AM"
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

Retrieve event details and available time slots for creating a booking.

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
| `start_date` | string | No | Start date to check availability (YYYY-MM-DD) |
| `timezone` | string | No | Timezone for availability (e.g., "America/New_York") |
| `duration` | integer | No | Duration override in minutes |
| `host_id` | integer | No | Specific host user ID (for team events) |

### Response

Returns event details with available time slots.

```json
{
    "calendar_event": {
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
        ]
    },
    "available_slots": {
        "2025-01-15": [
            "09:00",
            "09:30",
            "10:00",
            "10:30",
            "11:00"
        ]
    }
}
```

## Create Booking

Create a new booking for an event. This is a public endpoint that does not require authentication.

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
| `name` | string | Yes | Attendee's name |
| `email` | string | Yes | Attendee's email address (must be valid) |
| `timezone` | string | Yes | Attendee's timezone (IANA identifier) |
| `event_time` | string | Yes | Selected date and time for the booking |
| `message` | string | No | Meeting notes or message |
| `location_type` | string | No | Selected location type |
| `location_description` | string | Conditional | Phone number or address (required when event requires phone/address) |
| `guests` | array | No | Additional guests. For multi-guest events: array of `{name, email}` objects. Otherwise: array of email strings |
| `custom_fields` | object | No | Custom field values matching the event's booking fields |
| `duration` | integer | No | Duration override in minutes (if multi-duration is enabled) |
| `source` | string | No | Source of booking (e.g., `web`, `admin`) |
| `host_user_id` | integer | No | Specific host for team events |

### Example Request

```bash
curl -X POST "https://yoursite.com/wp-json/fluent-booking/v2/bookings/create/2" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john.doe@example.com",
    "timezone": "America/New_York",
    "event_time": "2025-01-15 10:00:00",
    "message": "Looking forward to discussing the project",
    "location_type": "phone_guest",
    "location_description": "+1234567890",
    "guests": ["jane.smith@example.com"]
  }'
```

### Response

Returns the created booking object with confirmation details.

```json
{
    "message": "Booking has been created",
    "booking": {
        "id": 1,
        "event_id": 2,
        "status": "scheduled",
        "first_name": "John",
        "last_name": "Doe",
        "email": "john.doe@example.com",
        "start_time": "2025-01-15 10:00:00",
        "end_time": "2025-01-15 10:30:00"
    }
}
```

## Get Time Slots

Retrieve available time slots for a specific event. This is a simpler alternative to the Get Event for Booking endpoint when you only need slot availability.

### Endpoint

```http
GET /bookings/slots/{event_id}
```

### URL Parameters

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `event_id` | integer | Yes | The event ID |

### Query Parameters

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `start_date` | string | No | Start date to check availability (YYYY-MM-DD HH:mm:ss). Defaults to current time |
| `timezone` | string | No | Timezone for availability (default: `"UTC"`) |

### Response

```json
{
    "available_slots": {
        "2025-01-15": [
            "09:00",
            "09:30",
            "10:00"
        ]
    },
    "timezone": "America/New_York",
    "max_lookup_date": "2025-03-15"
}
```

## Related Resources

- [Schedules](/rest-api/schedules/)
- [Calendar Events](/rest-api/calendars/events)
