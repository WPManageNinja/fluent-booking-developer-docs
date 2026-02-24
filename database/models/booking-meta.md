# 📋 BookingMeta Model

The `BookingMeta` model stores key-value data specifically for bookings, such as custom form field responses or integration-specific tokens.

## Attributes

| Attribute | Type | Description |
|-----------|------|-------------|
| `id` | bigint | Primary key |
| `booking_id` | bigint | Reference to the booking |
| `meta_key` | varchar | Unique key name |
| `value` | longtext | Meta value (auto-serialized/unserialized) |
| `created_at` | timestamp | Record creation time |
| `updated_at` | timestamp | Record last update time |

## Relations

### `booking`
Belongs to a [Booking](booking).

## Usage Examples

### Accessing Custom Field Data
```php
use FluentBooking\App\Models\Booking;

$company = Booking::find(123)->getMeta('company_name');
```
