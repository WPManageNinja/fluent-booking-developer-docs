# Payments (Pro)

Payment gateway configuration and management for Fluent Booking Pro. Accept payments for bookings using various payment providers.

## Get Payment Methods

Retrieve all configured payment methods.

### Endpoint

```http
GET /payments/methods
```

### Response

Returns array of payment methods.

```json
{
    "payment_methods": [
        {
            "key": "stripe",
            "title": "Stripe",
            "status": "active",
            "is_configured": true,
            "logo": "https://example.com/stripe-logo.png",
            "supported_currencies": ["USD", "EUR", "GBP", "CAD"]
        },
        {
            "key": "paypal",
            "title": "PayPal",
            "status": "active",
            "is_configured": false,
            "logo": "https://example.com/paypal-logo.png",
            "supported_currencies": ["USD", "EUR", "GBP"]
        }
    ]
}
```

## Get Payment Method Settings

Retrieve configuration for a specific payment method.

### Endpoint

```http
GET /payments/methods/{method_key}
```

### URL Parameters

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `method_key` | string | Yes | Payment method identifier (e.g., "stripe", "paypal") |

### Response

Returns payment method configuration.

```json
{
    "method": {
        "key": "stripe",
        "title": "Stripe",
        "is_configured": true,
        "settings": {
            "mode": "live",
            "publishable_key": "pk_live_xxxxx",
            "secret_key": "sk_live_xxxxx",
            "webhook_secret": "whsec_xxxxx",
            "currency": "USD",
            "payment_mode": "payment",
            "collect_billing_address": true,
            "statement_descriptor": "BOOKING"
        }
    }
}
```

## Update Payment Method

Update payment method configuration.

### Endpoint

```http
POST /payments/methods/{method_key}
```

### URL Parameters

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `method_key` | string | Yes | Payment method identifier |

### Request Body (Stripe Example)

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `mode` | string | Yes | Mode: `test` or `live` |
| `publishable_key` | string | Yes | Stripe publishable key |
| `secret_key` | string | Yes | Stripe secret key |
| `webhook_secret` | string | No | Webhook signing secret |
| `currency` | string | No | Default currency (ISO code) |
| `payment_mode` | string | No | Mode: `payment` or `subscription` |

### Example Request

```json
{
    "mode": "live",
    "publishable_key": "pk_live_xxxxxxxxxx",
    "secret_key": "sk_live_xxxxxxxxxx",
    "webhook_secret": "whsec_xxxxxxxxxx",
    "currency": "USD",
    "payment_mode": "payment",
    "collect_billing_address": true,
    "statement_descriptor": "BOOKING FEE"
}
```

### Response

Returns updated settings.

## Enable Payment Method

Enable a payment method.

### Endpoint

```http
POST /payments/methods/{method_key}/enable
```

### URL Parameters

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `method_key` | string | Yes | Payment method identifier |

### Response

```json
{
    "message": "Payment method enabled successfully",
    "status": "active"
}
```

## Disable Payment Method

Disable a payment method.

### Endpoint

```http
POST /payments/methods/{method_key}/disable
```

### URL Parameters

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `method_key` | string | Yes | Payment method identifier |

### Response

```json
{
    "message": "Payment method disabled successfully",
    "status": "inactive"
}
```

## Test Payment Method

Test payment method connection and configuration.

### Endpoint

```http
POST /payments/methods/{method_key}/test
```

### URL Parameters

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `method_key` | string | Yes | Payment method identifier |

### Response

```json
{
    "status": "success",
    "message": "Payment method connection tested successfully",
    "details": {
        "api_accessible": true,
        "credentials_valid": true,
        "webhook_configured": true
    }
}
```

## Get Payment Settings

Retrieve global payment settings.

### Endpoint

```http
GET /payments/settings
```

### Response

```json
{
    "settings": {
        "enabled": true,
        "default_currency": "USD",
        "tax_enabled": false,
        "tax_rate": 0,
        "refund_policy": "Contact support for refunds",
        "receipt_enabled": true,
        "invoice_prefix": "INV-"
    }
}
```

## Update Payment Settings

Update global payment settings.

### Endpoint

```http
POST /payments/settings
```

### Request Body

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `enabled` | boolean | No | Enable/disable payments globally |
| `default_currency` | string | No | Default currency code |
| `tax_enabled` | boolean | No | Enable tax calculation |
| `tax_rate` | number | No | Tax rate percentage |
| `refund_policy` | string | No | Refund policy text |

### Response

Returns updated settings.

## Supported Payment Methods

| Method Key | Name | Type |
| :--- | :--- | :--- |
| `stripe` | Stripe | Credit Card |
| `paypal` | PayPal | PayPal Account |
| `square` | Square | Credit Card |
| `razorpay` | Razorpay | Multiple Methods |
| `mollie` | Mollie | Multiple Methods |
| `offline` | Offline Payment | Manual |

## Payment Method Configuration

### Stripe
- Publishable key
- Secret key
- Webhook secret
- Payment/Subscription mode
- Currency selection
- Billing address collection

### PayPal
- Client ID
- Client secret
- Webhook ID
- Environment (sandbox/live)
- Currency selection

### Offline Payment
- Payment instructions
- Confirmation method
- Manual approval workflow

## Currencies

Commonly supported currencies:

- **USD** - US Dollar
- **EUR** - Euro
- **GBP** - British Pound
- **CAD** - Canadian Dollar
- **AUD** - Australian Dollar
- **INR** - Indian Rupee
- **JPY** - Japanese Yen

> [!NOTE]
> Currency support varies by payment provider. Check individual provider documentation for complete currency lists.

## Related Resources

- [Transactions](/rest-api/schedules/transactions)
- [Integrations](/rest-api/integrations/)
- [Event Settings](/rest-api/calendars/event-settings)
