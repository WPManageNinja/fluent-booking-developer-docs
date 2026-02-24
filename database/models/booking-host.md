# 🔗 BookingHost Model

The `BookingHost` model serves as a pivot table for many-to-many relationships between bookings and hosts. It manages multi-host assignments and their individual confirmation statuses.

## Attributes

| Attribute | Type | Description |
|-----------|------|-------------|
| `id` | bigint | Primary key |
| `booking_id` | bigint | Reference to the booking |
| `user_id` | bigint | WordPress User ID of the host |
| `status` | varchar | `confirmed`, `pending`, `declined` |
| `created_at` | timestamp | Record creation time |
| `updated_at` | timestamp | Record last update time |

## Relations

### `booking`
Belongs to a [Booking](booking).

### `host`
Belongs to a [User](user) (the host).

## Usage Examples

### Checking if a host is confirmed
```php
use FluentBooking\App\Models\BookingHost;

$assignment = BookingHost::where('booking_id', 123)
    ->where('user_id', 5)
    ->first();

if ($assignment->status == 'confirmed') {
    // Show on host's agenda
}
```
