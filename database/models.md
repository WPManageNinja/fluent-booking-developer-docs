# Database Models

Fluent Booking leverages a structured Model system, similar to Eloquent, to interact with the database.

## Booking Model
`FluentBooking\App\Models\Booking`

Represents a single scheduled event.

```php
use FluentBooking\App\Models\Booking;

// Find a booking by ID
$booking = Booking::find(12345);

// Get bookings for a specific calendar
$bookings = Booking::where('calendar_id', 1)->get();
```

## Calendar Model
`FluentBooking\App\Models\Calendar`

Represents a host's calendar configuration.

## Availability Model
`FluentBooking\App\Models\Availability`

Handles availability rules.

> [!NOTE]
> Full model documentation is coming soon.
