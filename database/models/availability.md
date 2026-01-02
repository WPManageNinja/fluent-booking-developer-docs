# 🗓️ Availability Model

The `Availability` model stores schedule rules and date overrides. It is internally stored in the `fcal_meta` table with `object_type = 'availability'`.

## Attributes

| Attribute | Type | Description |
|-----------|------|-------------|
| `id` | bigint | Primary key |
| `object_id` | bigint | Reference ID (usually User ID) |
| `key` | string | Typically stores the schedule name |
| `value` | longtext | Serialized/JSON availability rules |

## Methods

### `getAuthor()`
Returns an array of author details (name, avatar) for the owner of this availability.

## Relations

### `calendar`
Typically associated with calendars that use this shared availability.

## Usage Examples

### Retrieving a Host's Availability
```php
use FluentBooking\App\Models\Availability;

$availability = Availability::where('object_id', $userId)->first();
$rules = $availability->value; // Returns the unserialized schedule array
```
