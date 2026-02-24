# Settings

The Settings API allows you to manage global plugin settings and configurations.

## Get General Settings

Retrieve general plugin settings including emailing configuration and country data.

### Endpoint

```http
GET /settings/general
```

### Response

Returns general settings, emailing field definitions, and country data. The response structure is determined by the stored `_fluent_booking_settings` option and extended via the `fluent_booking/general_settings` filter.

```json
{
    "emailing": {
        "from_name": "Your Site",
        "from_email": "noreply@example.com",
        "reply_to_name": "",
        "reply_to_email": "",
        "use_host_name": "no",
        "use_host_email_on_reply": "no",
        "attach_ics_on_confirmation": "no",
        "email_footer": ""
    },
    "administration": {
        "...": "Administration settings"
    },
    "time_format": "12",
    "emailingFields": {
        "from_name": {
            "type": "input-text",
            "label": "From Name",
            "...": "Field definition"
        },
        "...": "Additional field definitions"
    },
    "all_countries": [
        {
            "code": "US",
            "name": "United States"
        }
    ]
}
```

## Update General Settings

Update general plugin settings.

### Endpoint

```http
POST /settings/general
```

### Request Body

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `emailing` | object | No | Email settings object containing `from_name`, `from_email`, `reply_to_name`, `reply_to_email`, `use_host_name`, `use_host_email_on_reply`, `attach_ics_on_confirmation`, `email_footer` |
| `administration` | object | No | Administration settings object |
| `timeFormat` | string | No | Time format preference (e.g., `"12"` or `"24"`) |

### Example Request

```json
{
    "emailing": {
        "from_name": "My Company",
        "from_email": "bookings@example.com",
        "reply_to_name": "",
        "reply_to_email": "",
        "use_host_name": "yes",
        "use_host_email_on_reply": "yes",
        "attach_ics_on_confirmation": "yes",
        "email_footer": "<p>Thank you for booking with us.</p>"
    },
    "administration": {},
    "timeFormat": "12"
}
```

### Response

```json
{
    "message": "Settings updated successfully",
    "settings": {
        "emailing": {
            "from_name": "My Company",
            "from_email": "bookings@example.com",
            "...": "Sanitized email settings"
        },
        "administration": {},
        "time_format": "12"
    }
}
```

## Update Payment Settings

Update global payment configuration.

### Endpoint

```http
POST /settings/payment
```

### Request Body

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `payments` | object | Yes | Payment settings object |
| `payments.currency` | string | No | Currency code (default: `"USD"`) |
| `payments.is_active` | string | No | Enable payments: `"yes"` or `"no"` (default: `"no"`) |
| `payments.number_format` | string | No | Number format: `"comma_separated"` or `"dot_separated"` (default: `"comma_separated"`) |
| `payments.currency_position` | string | No | Currency symbol position: `"left"` or `"right"` (default: `"left"`) |

### Example Request

```json
{
    "payments": {
        "currency": "USD",
        "is_active": "yes",
        "number_format": "comma_separated",
        "currency_position": "left"
    }
}
```

### Response

```json
{
    "message": "Settings updated successfully"
}
```

## Update Theme Settings

Update the visual theme for the booking interface.

### Endpoint

```http
POST /settings/theme
```

### Request Body

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `theme` | string | Yes | Theme identifier string |

### Example Request

```json
{
    "theme": "developer"
}
```

### Response

```json
{
    "message": "Settings updated successfully"
}
```

## Get Settings Menu

Retrieve settings navigation menu structure.

### Endpoint

```http
GET /settings/menu
```

### Response

Returns the settings menu items.

```json
{
    "menu_items": [
        {
            "...": "Menu item definitions"
        }
    ]
}
```

## Get Global Modules

Retrieve available global modules/addons and their status.

### Endpoint

```http
GET /settings/global-modules
```

### Response

```json
{
    "settings": {
        "module_key": "yes"
    },
    "modules": {
        "module_key": {
            "title": "Module Name",
            "description": "Module description",
            "...": "Module definition"
        }
    },
    "featureModules": {
        "frontend": {
            "render_type": "standalone",
            "slug": "projects"
        },
        "panel_url": "https://yoursite.com/wp-admin/admin.php?page=fluent-booking"
    }
}
```

## Update Global Modules

Enable or disable global modules.

### Endpoint

```http
POST /settings/global-modules
```

### Request Body

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `settings` | object | Yes | Module enable/disable map. Keys are module identifiers, values are `"yes"` or `"no"` |

### Example Request

```json
{
    "settings": {
        "sms": "yes",
        "woo": "no"
    }
}
```

### Response

```json
{
    "message": "Settings updated successfully"
}
```

## Get Pages

Retrieve WordPress pages for integration.

### Endpoint

```http
GET /settings/pages
```

### Response

```json
{
    "pages": [
        {
            "id": 1,
            "name": "sample-page",
            "title": "Sample Page"
        }
    ]
}
```

## Save Addons Settings <Badge type="tip" text="Pro" />

Save addon-specific settings (frontend rendering preferences, etc.).

### Endpoint

```http
POST /settings/addons-settings
```

### Request Body

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `settings` | object | Yes | Addon configuration object |

### Response

```json
{
    "message": "Settings are saved",
    "featureModules": {
        "...": "Updated feature module settings"
    }
}
```

## Install Plugin

Install a companion plugin from the allowed list.

### Endpoint

```http
POST /settings/install-plugin
```

### Request Body

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `plugin_id` | string | Yes | Plugin identifier. Allowed values: `fluent-smtp`, `fluent-booking`, `fluentform`, `fluent-crm`, `fluent-boards`, `fluent-cart` |

### Response

```json
{
    "message": "Plugin has been installed Successfully"
}
```

> [!NOTE]
> The authenticated user must have the `install_plugins` WordPress capability. Only plugins from the allowed list can be installed through this endpoint.

## Related Resources

- [Admin](/rest-api/admin/)
