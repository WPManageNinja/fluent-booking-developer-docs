# Transactions (Pro)

Manage payment transactions for bookings. This feature is only available in Fluent Booking Pro.

## Update Transaction

Update a payment transaction associated with a booking.

### Endpoint

```http
PUT /schedules/{id}/transactions/{transaction_id}
```

### URL Parameters

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `id` | integer | Yes | The schedule/booking ID |
| `transaction_id` | integer | Yes | The transaction ID |

### Request Body

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `status` | string | No | Transaction status: `paid`, `pending`, `refunded`, `failed` |
| `payment_method` | string | No | Payment method used |
| `amount` | number | No | Transaction amount |
| `currency` | string | No | Currency code (e.g., "USD") |
| `transaction_ref` | string | No | External transaction reference |
| `notes` | string | No | Internal notes about the transaction |

### Example Request

```json
{
    "status": "paid",
    "transaction_ref": "ch_1234567890",
    "notes": "Payment processed successfully via Stripe"
}
```

### Response

Returns the updated transaction object.

```json
{
    "message": "Transaction updated successfully",
    "transaction": {
        "id": 1,
        "booking_id": 1,
        "status": "paid",
        "payment_method": "stripe",
        "amount": 100.00,
        "currency": "USD",
        "transaction_ref": "ch_1234567890",
        "notes": "Payment processed successfully via Stripe",
        "created_at": "2025-01-10T08:30:00+00:00",
        "updated_at": "2025-01-10T09:00:00+00:00"
    }
}
```

## Transaction Status Values

| Status | Description |
| :--- | :--- |
| `pending` | Payment is pending |
| `paid` | Payment completed successfully |
| `refunded` | Payment was refunded |
| `failed` | Payment failed |
| `cancelled` | Payment was cancelled |

## Supported Payment Methods

The following payment methods may be available depending on your configuration:

- `stripe` - Stripe payments
- `paypal` - PayPal payments
- `woocommerce` - WooCommerce integration
- `offline` - Offline/manual payment
- `free` - Free booking (no payment required)

## Related Resources

- [Schedules](/rest-api/schedules/)
- [Payment Settings](/rest-api/calendars/event-settings)
