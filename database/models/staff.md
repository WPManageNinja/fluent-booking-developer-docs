# 👨‍💼 Staff Model

The `Staff` model represents the internal profile of a booking host. It extends the polymorphic `Meta` model with a fixed `object_type` of `staff`.

## Attributes

| Attribute | Type | Description |
|-----------|------|-------------|
| `id` | bigint | Primary key |
| `object_id` | bigint | Reference to WordPress User ID |
| `value` | longtext | Serialized/JSON staff settings (e.g., bio, designation) |

## Relations

### `user`
Belongs to a WordPress [User](user).

## Usage Examples

### Fetching a host's bio
```php
use FluentBooking\App\Models\User;

$staff = User::find(5)->staff;
echo $staff->value['bio'];
```
