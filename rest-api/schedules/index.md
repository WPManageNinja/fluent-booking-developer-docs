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
| `search` | string | No | Search by attendee name or email |
| `filters[event]` | integer | No | Filter by event ID |
| `filters[author]` | integer\|string | No | Filter by calendar ID, `me` for current user, or `all` |
| `filters[event_type]` | string | No | Filter by event type (e.g., `single`, `group`) |
| `filters[period]` | string | No | Time period: `upcoming`, `past`, `today`, `cancelled` (default: `upcoming`) |
| `filters[range]` | array | No | Custom date range filter |

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

### Query Parameters

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `with[]` | array | No | Include additional data. Pass `all_data` to include activities, meta info, and payment data |

### Response

Returns complete booking details with attendee information and event settings.

```json
{
    "schedule": {
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
            "value": "+1234567890"
        }
    }
}
```

## Update Schedule

Update a field on a scheduled booking. Updates are applied one field at a time using the `column` and `value` parameters.

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
| `column` | string | Yes | Field to update. Valid values: `status`, `payment_status`, `internal_note`, `email`, `phone`, `first_name`, `last_name` |
| `value` | string | Yes | New value for the field |
| `cancel_reason` | string | Conditional | Required when setting `column=status` and `value=cancelled` |
| `reject_reason` | string | Conditional | Required when setting `column=status` and `value=rejected` |
| `refund_payment` | string | No | Set to `yes` to refund payment when cancelling/rejecting |
| `update_all` | boolean | No | Update all attendees in a multi-guest booking |

### Valid Status Values

| Value | Description |
| :--- | :--- |
| `scheduled` | Confirm/approve the booking |
| `completed` | Mark as completed |
| `cancelled` | Cancel the booking (requires `cancel_reason`) |
| `rejected` | Reject the booking (requires `reject_reason`) |
| `no_show` | Mark attendee as no-show |

### Valid Payment Status Values

| Value | Description |
| :--- | :--- |
| `pending` | Payment is pending |
| `paid` | Payment completed |

### Example Requests

**Cancel a booking:**

```json
{
    "column": "status",
    "value": "cancelled",
    "cancel_reason": "Schedule conflict"
}
```

**Update internal note:**

```json
{
    "column": "internal_note",
    "value": "Discussed project requirements"
}
```

**Mark payment as paid:**

```json
{
    "column": "payment_status",
    "value": "paid"
}
```

### Response

The response message varies depending on the column and value:

- For `status` set to `cancelled` or `rejected`: `"The booking has been cancelled"` / `"The booking has been rejected"`
- For other column updates: `"{Column} has been updated"` (e.g., `"Status has been updated"`, `"Email has been updated"`)

```json
{
    "message": "Status has been updated"
}
```

## Delete Schedule

Permanently delete a booking record.

### Endpoint

```http
DELETE /schedules/{id}
```

### URL Parameters

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `id` | integer | Yes | The schedule/booking ID |

### Response

```json
{
    "message": "Booking Deleted Successfully!"
}
```

> [!WARNING]
> This permanently deletes the booking. For multi-guest bookings, all attendees in the group are also deleted. To cancel a booking while preserving the record, use the Update Schedule endpoint with `column=status` and `value=cancelled` instead.

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

### Query Parameters

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `with` | string | No | Pass `all_data` to include activities, payment order, and transaction data |

### Response

Returns booking metadata including activities, sidebar content, and payment information.

```json
{
    "activities": [
        {
            "id": 1,
            "booking_id": 1,
            "type": "booking_created",
            "description": "Booking created by John Doe",
            "created_at": "2025-01-10T08:30:00+00:00"
        }
    ],
    "sidebar_contents": [],
    "payment_order": null,
    "main_body_contents": []
}
```

| Field | Type | Description |
| :--- | :--- | :--- |
| `activities` | array | Activity log entries for the booking |
| `sidebar_contents` | array | Additional sidebar content (e.g., CRM profile if FluentCRM is active) |
| `payment_order` | object\|null | Payment order with items and transaction data (if applicable) |
| `main_body_contents` | array | Additional metadata content from integrations |

## Send Confirmation Email

Manually resend a confirmation email for a booking.

### Endpoint

```http
POST /schedules/{id}/send-confirmation-email
```

### URL Parameters

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `id` | integer | Yes | The schedule/booking ID |

### Query Parameters

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `email_to` | string | No | Recipient: `guest` (default) or `host` |

### Response

```json
{
    "message": "Notification sent successfully"
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

### Query Parameters

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `search` | string | No | Search attendees by name or email |

### Response

Returns a paginated list of attendees in the group booking.

```json
{
    "attendees": {
        "current_page": 1,
        "data": [
            {
                "id": 5,
                "event_id": 2,
                "group_id": 1,
                "first_name": "John",
                "last_name": "Doe",
                "email": "john.doe@example.com",
                "status": "scheduled"
            }
        ],
        "total": 1,
        "per_page": 15,
        "current_page": 1,
        "last_page": 1
    }
}
```

## Related Resources

- [Bookings](/rest-api/bookings/)
- [Calendar Events](/rest-api/calendars/events)
- [Transactions](/rest-api/schedules/transactions)
