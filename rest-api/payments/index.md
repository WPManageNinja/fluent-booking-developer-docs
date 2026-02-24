# Payments <Badge type="tip" text="Pro" />

Payment configuration in FluentBooking is managed through the Settings API and per-event payment settings.

> [!NOTE]
> There is no standalone `/payments` route prefix. Global payment settings are updated via the [Settings API](/rest-api/settings/), and per-event payment configuration is accessed through the Calendars API.

## Get Event Payment Settings

Retrieve payment configuration and gateway status for a specific event.

### Endpoint

```http
GET /calendars/{id}/events/{event_id}/payment-settings
```

### URL Parameters

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `id` | integer | Yes | The calendar ID |
| `event_id` | integer | Yes | The event ID |

### Response

Returns payment settings for the event along with gateway configuration status.

```json
{
    "settings": {
        "...": "Event-specific payment settings"
    },
    "config": {
        "native_enabled": true,
        "stripe_configured": true,
        "paypal_configured": false,
        "offline_configured": false,
        "native_config_link": "https://yoursite.com/wp-admin/admin.php?page=fluent-booking#/settings/payment-methods/stripe",
        "woo_config_link": "https://yoursite.com/wp-admin/admin.php?page=fluent-booking#/settings/configure-integrations/global-modules",
        "has_cart": false,
        "has_woo": true,
        "woo_enabled": false
    }
}
```

## Update Global Payment Settings

Update payment gateway configuration globally.

### Endpoint

```http
POST /settings/payment
```

See the [Settings API](/rest-api/settings/) for details.

## Related Resources

- [Settings](/rest-api/settings/)
- [Calendar Events](/rest-api/calendars/events)
- [Transactions](/rest-api/schedules/transactions)
