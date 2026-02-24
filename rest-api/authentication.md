# Authentication

All admin REST API endpoints require authentication. FluentBooking uses **Application Passwords** (Basic Authentication) to authenticate requests.

> [!NOTE]
> The public-facing booking form uses WordPress AJAX endpoints (`wp_ajax_nopriv_*`), not the REST API. The REST API endpoints documented here are intended for server-to-server integrations and admin use, and all require authentication.

## Setup

1. Go to **Users > Profile** in your WordPress dashboard.
2. Scroll to the **Application Passwords** section.
3. Enter a name for the new application password (e.g., "FluentBooking API").
4. Click **Add New Application Password**.
5. Copy the generated password.

## Usage

Include the `Authorization` header in your HTTP requests. The value should be `Basic ` followed by the Base64 encoded string of your `username:password`.

### Header Format

```http
Authorization: Basic <base64_encoded_credentials>
```

### Example

If your username is `admin` and your application password is `abcd 1234 efgh 5678`:

1. Combine them: `admin:abcd 1234 efgh 5678`
2. Base64 encode the string: `YWRtaW46YWJjZCAxMjM0IGVmZ2ggNTY3OA==`
3. Use in header:

```http
Authorization: Basic YWRtaW46YWJjZCAxMjM0IGVmZ2ggNTY3OA==
```

> [!IMPORTANT]
> Never share your Application Passwords or commit them to version control.
