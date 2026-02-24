# Transactions <Badge type="tip" text="Pro" />

Transaction data in FluentBooking is accessible as part of the booking metadata.

> [!NOTE]
> There are no standalone transaction endpoints in the REST API. Transaction and payment information is included when retrieving booking details through the [Schedules API](/rest-api/schedules/).

## Viewing Transaction Data

Transaction information is available through the booking meta-info endpoint:

```http
GET /schedules/{id}/meta-info
```

When the `with` parameter includes `all_data`, the response will include payment order and transaction data associated with the booking.

Payment status can be updated on a booking using the schedule update endpoint with `column` set to `payment_status`:

```http
PUT /schedules/{id}
```

```json
{
    "column": "payment_status",
    "value": "paid"
}
```

## Related Resources

- [Schedules](/rest-api/schedules/)
- [Payments](/rest-api/payments/)
