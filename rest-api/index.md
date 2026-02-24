# REST API Overview

The Fluent Booking REST API allows you to interact with the scheduling system programmatically. It follows standard RESTful principles and is designed to be intuitive for developers familiar with the WordPress REST API.

## Base URL

All API requests should be made to the following base URL:

```bash
https://yoursite.com/wp-json/fluent-booking/v2/
```

> [!TIP]
> Always ensure you are using the `v2` namespace for the most up-to-date features and stable schema.

## Key Features

### 🔐 Secure Authentication
All REST API endpoints require authentication. We recommend using **Basic Authentication** (with Application Passwords) for development and server-to-server integrations.

### 📦 JSON Format
The API accepts and returns data in **JSON** format. Ensure you include the `Content-Type: application/json` header in your POST and PUT requests.

### 🛠️ Standard HTTP Verbs
We use standard HTTP methods to map actions to resources:
- `GET`: Retrieve data (calendars, bookings, events).
- `POST`: Create new records.
- `PUT / PATCH`: Update existing records.
- `DELETE`: Remove records.

## Common Architecture

### Resource Enveloping
Responses are generally returned as JSON objects. Collections of items are usually returned within a `data` key, often accompanied by meta-information like pagination.

```json
{
  "data": [
    { "id": 1, "title": "Discovery Call" },
    { "id": 2, "title": "Monthly Sync" }
  ],
  "total": 24,
  "per_page": 10,
  "current_page": 1
}
```

### Global Query Parameters
Most `GET` endpoints support standardized query parameters for filtering and organizing data:

- **`search`**: Search for resources by name or email.
- **`status`**: Filter by record status (e.g., `scheduled`, `cancelled`).
- **`per_page`**: Control the number of results per request.
- **`page`**: Specify the page number for paginated results.
- **`sort_by`**: Field name to sort the results.
- **`sort_type`**: Direction of sorting (`asc` or `desc`).

## Error Handling

The API uses standard HTTP status codes to indicate success or failure:

- `200 OK`: Request was successful.
- `201 Created`: Resource was successfully created.
- `400 Bad Request`: Validation error or missing parameters.
- `401 Unauthorized`: Authentication failed or missing.
- `403 Forbidden`: Insufficient permissions to access the resource.
- `404 Not Found`: Resource does not exist.

---

## Next Steps

1. Review the [Authentication Guide](/rest-api/authentication) to setup your first request.
2. Explore [Calendars API](/rest-api/calendars/) to manage your scheduling hosts.
3. Learn how to [Manage Bookings](/rest-api/bookings/) via the API.
