# Error Handling

The API uses standard HTTP status codes to indicate the success or failure of a request. In case of an error, the response body will contain a JSON object describing the error.

## Error Response Format

```json
{
    "code": "error_code",
    "message": "Human-readable error message.",
    "data": {
        "status": 404, // HTTP Status Code
        "wpfluent": {
            "env": "dev",
            "method": "GET",
            "request_url": "https://yoursite.com/wp-json/fluent-booking/v2/endpoint",
            "route_params": [],
            "query_params": [],
            "body_params": []
        }
    }
}
```

## Common Error Codes

| Code | Description |
| :--- | :--- |
| `rest_no_route` | No route was found matching the URL and request method. |
| `rest_forbidden` | You do not have permission to access this resource. |
| `rest_missing_callback_param` | A required parameter is missing. |

## Example

```json
{
    "code": "rest_no_route",
    "message": "No route was found matching the URL and request method.",
    "data": {
        "status": 404,
        "wpfluent": {
            "env": "dev",
            "method": "GET",
            "request_url": "https://yoursite.com/wp-json/fluent-booking/v2/calendars",
            "route_params": [],
            "query_params": [],
            "body_params": []
        }
    }
}
```
