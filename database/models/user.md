# 👥 User Model

The `User` model extends WordPress's user functionality for Fluent Booking, providing additional methods and relationships specific to the booking system.

## Attributes

As this model interacts with the WordPress users table, it includes standard WP_User fields plus Fluent Booking specific logic.

| Attribute | Type | Description |
|-----------|------|-------------|
| `ID` | int | Primary key (WordPress User ID) |
| `user_login` | string | User login name |
| `display_name` | string | User display name |
| `user_email` | string | User email address |
| `created_at` | datetime | Creation timestamp |

## Usage

This model provides a fluent way to access booking-related data for any WordPress user.

### Accessing Attributes
```php
$user = \FluentBooking\App\Models\User::find(1);
echo $user->display_name;
echo $user->full_name; // Uses custom accessor
```

## Methods

### `getMeta($key, $default = null)`
Retrieve a piece of metadata for the user.

### `updateMeta($key, $value)`
Update or create a piece of user metadata.

### `isHost()`
Check if the user has the necessary permissions to host calendars.

## Relations

### `calendars`
Has many [Calendar](calendar) records.

```php
$calendars = $user->calendars;
```

### `bookings`
Has many [Booking](booking) records as a customer.

```php
$bookings = $user->bookings;
```

### `staff`
Has one [Staff](staff) profile record.

```php
$staffProfile = $user->staff;
```

## Usage Examples

### Retrieving Users with Data
```php
use FluentBooking\App\Models\User;

// Get user with their calendars
$user = User::with('calendars')->find(1);

foreach ($user->calendars as $calendar) {
    echo $calendar->title;
}
```

### Checking host status
```php
$user = User::find($userId);
if ($user->isHost()) {
    // Show hosting dashboard
}
```
