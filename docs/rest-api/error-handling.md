---
title: Error Handling
description: HTTP status codes and error response format for the FluentBooking REST API.
---

# Error Handling

FluentBooking returns standard HTTP status codes and a consistent JSON body for non-2xx responses.

## Response Shape

```json
{
  "code": "validation_failed",
  "message": "The given data was invalid.",
  "data": {
    "status": 422,
    "errors": {
      "email": ["The email field is required."]
    }
  }
}
```

- `code` — machine-readable error slug (snake_case).
- `message` — human-readable summary, often surfaced directly in the admin UI.
- `data.status` — HTTP status code.
- `data.errors` — field-level validation errors when applicable (typically on 422).

## HTTP Status Codes

| Status | Meaning | When You See It |
| --- | --- | --- |
| `200` | OK | Standard successful response. |
| `201` | Created | A resource was created (some endpoints use 200 instead). |
| `400` | Bad Request | Malformed request body or missing required fields outside the validation layer. |
| `401` | Unauthorized | Missing or invalid credentials. See [Authentication](/rest-api/#authentication). |
| `403` | Forbidden | The authenticated user lacks the FluentBooking capability for this route. |
| `404` | Not Found | The resource (calendar, event, booking, etc.) does not exist or you cannot access it. |
| `409` | Conflict | A slug or unique identifier collision. |
| `422` | Unprocessable Entity | Request body failed validation — inspect `data.errors`. |
| `429` | Too Many Requests | Rate limit triggered by repeated booking attempts or external API calls. |
| `500` | Internal Server Error | Unhandled exception. Check the WordPress error log. |

## Validation Errors

Most write endpoints validate input using FluentBooking's `Validator`. On failure, the response contains a per-field `errors` map. Each field maps to an array of error messages so multiple rules can fail in a single response.

```json
{
  "code": "validation_failed",
  "message": "The given data was invalid.",
  "data": {
    "status": 422,
    "errors": {
      "title": ["The title field is required."],
      "duration": ["The duration must be at least 5."]
    }
  }
}
```

## Permission Errors

Policy denials return a `403` with a descriptive code:

```json
{
  "code": "rest_forbidden",
  "message": "Sorry, you are not allowed to do that.",
  "data": { "status": 403 }
}
```

If you are calling an admin endpoint with cookie auth, double-check that the user has the FluentBooking admin role and that a valid `X-WP-Nonce` header is present.

## Booking-Specific Errors

The booking endpoints add a few domain-specific error codes:

| Code | Meaning |
| --- | --- |
| `slot_no_longer_available` | The selected slot was booked by another attendee between page load and submission. |
| `event_payment_required` | The event requires payment; redirect the user to the payment flow. |
| `event_disabled` | The event was disabled by the host. |
| `outside_availability` | The selected time is outside the event's availability window. |
