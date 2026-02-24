# Event Email Notifications

Configure automated email notifications for booking events. Notifications are sent to attendees and hosts at various stages of the booking lifecycle.

## Get Event Email Notifications

Retrieve all email notification templates configured for an event.

### Endpoint

```http
GET /calendars/{id}/events/{event_id}/email-notifications
```

### URL Parameters

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `id` | integer | Yes | The calendar ID |
| `event_id` | integer | Yes | The event ID |

### Response

Returns all notification templates with their settings.

```json
{
    "notifications": {
        "booking_confirmed": {
            "enabled": true,
            "title": "Booking Confirmed (email to Attendee)",
            "email": {
                "subject": "Confirmed: {{booking.event_name}} at {{booking.start_date_time_for_attendee}}",
                "body": "<p>Your booking has been confirmed...</p>"
            }
        },
        "booking_confirmed_host": {
            "enabled": true,
            "is_host": true,
            "title": "Booking Confirmed (email to Organizer)",
            "email": {
                "additional_recipients": "",
                "subject": "New Booking: {{guest.full_name}} @ {{booking.start_date_time_for_host}}",
                "body": "<p>You have a new booking...</p>"
            }
        }
    }
}
```

## Notification Types

The following notification types are available:

| Type | Recipient | Description |
| :--- | :--- | :--- |
| `booking_confirmed` | Attendee | Sent when booking is confirmed |
| `booking_confirmed_host` | Organizer | Sent to host when booking is confirmed |
| `cancelled_by_attendee` | Organizer | Sent when attendee cancels |
| `cancelled_by_host` | Attendee | Sent when host cancels |
| `rescheduled_by_attendee` | Organizer | Sent when attendee reschedules |
| `rescheduled_by_host` | Attendee | Sent when host reschedules |
| `booking_request_host` | Organizer | Booking approval request (if approval required) |
| `booking_request_attendee` | Attendee | Booking submission confirmation |
| `booking_reminder` | Attendee | Reminder before meeting |
| `booking_approved` | Attendee | Sent when booking is approved |
| `booking_rejected` | Attendee | Sent when booking is rejected |

## Email Template Smart Codes

Use these placeholders in email templates:

### Attendee Data
- <code v-pre>{{guest.first_name}}</code> - Guest first name
- <code v-pre>{{guest.last_name}}</code> - Guest last name
- <code v-pre>{{guest.full_name}}</code> - Guest full name
- <code v-pre>{{guest.email}}</code> - Guest email
- <code v-pre>{{guest.note}}</code> - Guest note
- <code v-pre>{{booking.phone}}</code> - Guest phone number
- <code v-pre>{{guest.timezone}}</code> - Guest timezone

### Booking Data
- <code v-pre>{{booking.event_name}}</code> - Event name
- <code v-pre>{{booking.description}}</code> - Event description
- <code v-pre>{{booking.booking_title}}</code> - Booking title
- <code v-pre>{{booking.full_start_end_guest_timezone}}</code> - Full start date/time with guest timezone
- <code v-pre>{{booking.full_start_end_host_timezone}}</code> - Full start date/time with host timezone
- <code v-pre>{{booking.location_details_text}}</code> - Event location details
- <code v-pre>{{booking.cancel_reason}}</code> - Cancellation reason
- <code v-pre>{{booking.reschedule_reason}}</code> - Reschedule reason
- <code v-pre>##booking.cancelation_url##</code> - Booking cancellation URL
- <code v-pre>##booking.reschedule_url##</code> - Booking reschedule URL
- <code v-pre>##booking.admin_booking_url##</code> - Admin booking details URL

### Host Data
- <code v-pre>{{host.name}}</code> - Host name
- <code v-pre>{{host.email}}</code> - Host email
- <code v-pre>{{host.timezone}}</code> - Host timezone

### Other
- <code v-pre>{{event.title}}</code> - Event title
- <code v-pre>{{calendar.title}}</code> - Calendar title
- <code v-pre>{{add_booking_to_calendar}}</code> - Add to calendar links

## Update Event Email Notifications

Update email notification templates for an event.

### Endpoint

```http
POST /calendars/{id}/events/{event_id}/email-notifications
```

### URL Parameters

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `id` | integer | Yes | The calendar ID |
| `event_id` | integer | Yes | The event ID |

### Request Body

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `notifications` | object | Yes | Object containing notification configurations |

### Example Request

```json
{
    "notifications": {
        "booking_confirmed": {
            "enabled": true,
            "email": {
                "subject": "Booking Confirmed: {{booking.event_name}}",
                "body": "<p>Hi {{guest.first_name}},</p><p>Your booking is confirmed for {{booking.full_start_end_guest_timezone}}.</p>"
            }
        },
        "booking_reminder": {
            "enabled": true,
            "email": {
                "subject": "Reminder: Meeting in 1 hour",
                "body": "<p>This is a reminder about your upcoming meeting.</p>"
            }
        }
    }
}
```

### Response

```json
{
    "message": "Notifications have been saved"
}
```

## Clone Event Email Notifications

Copy email notification templates from another event.

### Endpoint

```http
POST /calendars/{id}/events/{event_id}/email-notifications/clone
```

### URL Parameters

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `id` | integer | Yes | The calendar ID |
| `event_id` | integer | Yes | The target event ID |

### Request Body

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `from_event_id` | integer | Yes | The event ID to copy notifications from |

### Response

```json
{
    "message": "The Notification has been cloned successfully",
    "notifications": {
        ...
    }
}
```

## Related Resources

- [Calendar Events](/rest-api/calendars/events)
