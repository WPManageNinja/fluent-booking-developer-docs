# Event Booking Fields

Manage custom form fields that are displayed during the booking process. Booking fields collect information from attendees.

## Get Event Booking Fields

Retrieve the form fields configured for an event.

### Endpoint

```http
GET /calendars/{id}/events/{event_id}/booking-fields
```

### URL Parameters

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `id` | integer | Yes | The calendar ID |
| `event_id` | integer | Yes | The event ID |

### Response

Returns an array of form fields with their configurations.

```json
{
    "fields": [
        {
            "index": 1,
            "type": "text",
            "name": "name",
            "label": "Your Name",
            "required": true,
            "enabled": true,
            "system_defined": true,
            "disable_alter": true,
            "is_visible": true,
            "placeholder": "Your Name",
            "help_text": ""
        },
        {
            "index": 2,
            "type": "email",
            "name": "email",
            "label": "Your Email",
            "required": true,
            "enabled": true,
            "system_defined": true,
            "disable_alter": true,
            "is_visible": true,
            "placeholder": "Your Email",
            "help_text": ""
        },
        {
            "index": 3,
            "type": "textarea",
            "name": "message",
            "label": "What is this meeting about?",
            "required": false,
            "enabled": true,
            "system_defined": true,
            "help_text": ""
        },
        {
            "index": 6,
            "type": "multi-guests",
            "name": "guests",
            "label": "Additional Guests",
            "limit": 10,
            "required": false,
            "enabled": false,
            "system_defined": true
        },
        {
            "index": 8,
            "type": "phone",
            "name": "phone_number",
            "label": "Your Phone Number",
            "required": true,
            "enabled": true,
            "system_defined": true,
            "is_sms_number": true,
            "help_text": ""
        },
        {
            "index": 20,
            "type": "payment",
            "name": "payment_method",
            "enabled": true,
            "system_defined": true,
            "payment_items": [
                {
                    "title": "Booking Fee",
                    "value": "100"
                }
            ],
            "label": "Payment Summary"
        }
    ]
}
```

## Field Types

The following field types are available:

| Type | Description |
| :--- | :--- |
| `text` | Single line text input |
| `email` | Email address input |
| `phone` | Phone number input |
| `textarea` | Multi-line text input |
| `multi-guests` | Allow attendees to invite additional guests |
| `payment` | Payment information (Pro feature) |

## System-Defined Fields

Some fields are system-defined and cannot be fully modified:

- **name**: Attendee's name (always required)
- **email**: Attendee's email (always required)
- **message**: Meeting notes/description
- **cancellation_reason**: Reason for cancellation (shown during cancellation)
- **rescheduling_reason**: Reason for rescheduling (shown during rescheduling)
- **guests**: Additional guest emails
- **phone_number**: Attendee's phone number
- **payment_method**: Payment details (Pro only)

## Update Event Booking Fields

Update the form fields for an event.

### Endpoint

```http
POST /calendars/{id}/events/{event_id}/booking-fields
```

### URL Parameters

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `id` | integer | Yes | The calendar ID |
| `event_id` | integer | Yes | The event ID |

### Request Body

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `booking_fields` | array | Yes | Array of field objects |

### Example Request

```json
{
    "booking_fields": [
        {
            "index": 1,
            "type": "text",
            "name": "name",
            "label": "Your Full Name",
            "required": true,
            "enabled": true,
            "placeholder": "Enter your name"
        },
        {
            "index": 2,
            "type": "email",
            "name": "email",
            "label": "Email Address",
            "required": true,
            "enabled": true
        },
        {
            "index": 100,
            "type": "text",
            "name": "company",
            "label": "Company Name",
            "required": false,
            "enabled": true,
            "system_defined": false
        }
    ]
}
```

### Response

```json
{
    "message": "Fields has been updated"
}
```

## Related Resources

- [Calendar Events](/rest-api/calendars/events)
