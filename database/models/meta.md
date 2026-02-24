# 🏷️ Meta Model

The `Meta` model is a polymorphic table used to store metadata for various entities in Fluent Booking, including Calendars, Events, and Users.

## Attributes

| Attribute | Type | Description |
|-----------|------|-------------|
| `id` | bigint | Primary key |
| `object_type` | varchar | e.g., `Calendar`, `calendar_event`, `user_meta` |
| `object_id` | bigint | ID of the related object |
| `key` | varchar | Meta key name |
| `value` | longtext | Meta value (auto-serialized/unserialized) |
| `created_at` | timestamp | Record creation time |
| `updated_at` | timestamp | Record last update time |

## Usage Examples

### Generic Meta Retrieval
```php
use FluentBooking\App\Models\Meta;

$settings = Meta::where('object_type', 'Calendar')
    ->where('object_id', 1)
    ->where('key', 'event_order')
    ->first();
```
