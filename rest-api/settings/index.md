# Settings

The Settings API allows you to manage global plugin settings and configurations.

## Get General Settings

Retrieve general plugin settings.

### Endpoint

```http
GET /settings/general
```

### Response

Returns general settings configuration.

```json
{
    "settings": {
        "date_format": "F j, Y",
        "time_format": "g:i a",
        "default_timezone": "UTC",
        "booking_confirmation": "auto",
        "calendar_type": "google",
        "week_starts_on": "monday"
    }
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
| `date_format` | string | No | PHP date format |
| `time_format` | string | No | PHP time format |
| `default_timezone` | string | No | Default timezone |
| `booking_confirmation` | string | No | Confirmation mode: `auto`, `manual` |

### Response

Returns updated settings.

## Update Payment Settings

Update payment configuration.

### Endpoint

```http
POST /settings/payment
```

### Request Body

Payment gateway configuration (varies by gateway).

## Update Theme Settings

Update visual theme settings.

### Endpoint

```http
POST /settings/theme
```

### Request Body

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `primary_color` | string | No | Primary color hex code |
| `button_style` | string | No | Button style |
| `font_family` | string | No | Font family |

## Get Settings Menu

Retrieve settings menu structure.

### Endpoint

```http
GET /settings/menu
```

### Response

Returns settings navigation menu structure.

## Get Global Modules

Retrieve available global modules/addons.

### Endpoint

```http
GET /settings/global-modules
```

### Response

Returns list of available modules and their status.

## Update Global Modules

Enable or disable global modules.

### Endpoint

```http
POST /settings/global-modules
```

### Request Body

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `modules` | object | Yes | Module enable/disable configuration |

## Get Pages

Retrieve WordPress pages for integration.

### Endpoint

```http
GET /settings/pages
```

### Response

Returns list of WordPress pages.

## Save Addons Settings

Save addon-specific settings.

### Endpoint

```http
POST /settings/addons-settings
```

### Request Body

Addon-specific configuration.

## Install Plugin

Trigger plugin installation (for integrations).

### Endpoint

```http
POST /settings/install-plugin
```

### Request Body

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `plugin_slug` | string | Yes | Plugin slug to install |

### Response

```json
{
    "message": "Plugin installed successfully",
    "status": "success"
}
```

## Related Resources

- [Admin](/rest-api/admin/)
