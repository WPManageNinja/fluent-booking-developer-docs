# 🪝 Webhook Model <Badge type="tip" text="Pro" />

The `Webhook` model manages outgoing integration feeds. These are used to send booking data to external apps like Zapier or custom endpoints when specific events occur.

## Attributes

| Attribute | Type | Description |
|-----------|------|-------------|
| `id` | bigint | Primary key |
| `object_id` | bigint | Reference to the [CalendarSlot](calendar-slot) ID |
| `key` | varchar | Fixed as `webhook_feeds` |
| `value` | longtext | JSON configuration of the webhook (URL, events) |

## Usage Examples

### Creating a new webhook feed
```php
use FluentBookingPro\App\Models\Webhook;

Webhook::store($calendarSlotId, [
    'url' => 'https://api.example.com/webhook',
    'status' => 'active',
    'events' => ['booking.scheduled', 'booking.cancelled']
]);
```
