# 📄 BookingActivity Model

The `BookingActivity` model logs every significant event related to a booking, such as status changes, customer notes, or internal updates.

## Attributes

| Attribute | Type | Description |
|-----------|------|-------------|
| `id` | bigint | Primary key |
| `booking_id` | bigint | Reference to the associated booking |
| `created_by` | bigint | WordPress User ID of the person who created the log |
| `type` | varchar | `activity`, `note`, `email_log`, `payment_log` |
| `title` | varchar | Human-readable title of the activity |
| `description` | longtext | Detailed log description |
| `status` | varchar | `open`, `failed`, `success` |

## Relations

### `booking`
Belongs to a [Booking](booking) record.

## Usage Examples

### Fetching Activity for a Booking
```php
use FluentBooking\App\Models\Booking;

$activities = Booking::find(123)->booking_activities;
foreach ($activities as $activity) {
    echo $activity->title;
}
```

### Adding a Custom Note
```php
use FluentBooking\App\Models\BookingActivity;

BookingActivity::create([
    'booking_id' => 123,
    'title' => 'Admin Note',
    'description' => 'Customer called to confirm attendance.',
    'type' => 'note'
]);
```
