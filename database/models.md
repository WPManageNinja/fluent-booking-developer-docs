# Database Models

Fluent Booking ORM provides a beautiful, simple ActiveRecord implementation for working with database tables. Each database table has a corresponding "Model" which is used to interact with that table. Models allow you to query for data in db tables, as well as insert new records into the table.

> [!NOTE]
> Fluent Booking offers helper functions and methods to interact with its database, so you may use those instead of Models directly. We are documenting these for internal usage and high-level 3rd-party developer integrations.

## Built-in Fluent Booking Models

All the built-in database models are available at:
- `fluent-booking/app/Models/` (Core version)
- `fluent-booking-pro/app/Models/` (Pro version)

In this article, we will use `FluentBooking\App\Models\Booking` as a primary example.

## Retrieving Models

Each Eloquent model acts as a powerful query builder allowing you to fluently query the database table associated with the model.

```php
use FluentBooking\App\Models\Booking;

// Retrieve all bookings
$bookings = Booking::all();

foreach ($bookings as $booking) {
    echo $booking->first_name;
}
```

### Adding Additional Constraints

Since each model serves as a query builder, you may also add constraints to queries and then use the `get` method to retrieve the results:

```php
$bookings = Booking::where('status', 'scheduled')
               ->orderBy('start_time', 'desc')
               ->take(10)
               ->get();
```

## Retrieving Single Models / Aggregates

You may also use the `find` and `first` methods to retrieve single records:

```php
// Retrieve a model by its primary key...
$booking = Booking::find(1);

// Retrieve the first model matching the query constraints...
$booking = Booking::where('status', 'scheduled')->first();
```

### Retrieving Aggregates

You may also use the `count`, `sum`, `max`, and other aggregate methods:

```php
$count = Booking::where('status', 'scheduled')->count();

$totalPaid = Booking::where('payment_status', 'paid')->sum('total_paid');
```

## Inserting & Updating Models

### Inserts

To create a new record in the database, instantiate a new model instance and set attributes on the model:

```php
use FluentBooking\App\Models\Booking;

$booking = new Booking;
$booking->calendar_id = 1;
$booking->email = 'customer@example.com';
$booking->status = 'scheduled';
$booking->save();
```

### Updates

The `save` method may also be used to update models that already exist in the database:

```php
$booking = Booking::find(1);
$booking->status = 'completed';
$booking->save();
```

## Accessing Attributes

You can access the attributes of a model as if they were properties on the object:

```php
$booking = Booking::find(1);
$firstName = $booking->first_name;
```

## Deleting Models

To delete a model, call the `delete` method on a model instance:

```php
$booking = Booking::find(1);
$booking->delete();
```

### Deleting Models By Query

You can also run a delete statement on a set of models:

```php
Booking::where('status', 'cancelled')->delete();
```

## Query Scopes

Scopes allow you to define common sets of constraints that you may easily re-use throughout your application. For example, to filter by status:

```php
$scheduledBookings = Booking::ofStatus('scheduled')->get();
```

## Relationships

Relationships are defined as methods on your model classes. Since relationships also serve as powerful query builders, defining relationships as methods provides powerful method chaining and querying capabilities.

```php
$booking = Booking::find(1);

// Access the calendar relationship
$calendar = $booking->calendar;

// Access meta information
$meta = $booking->bookingMeta;
```

## Available Models

### Core Models
The primary models for scheduling and account management.
- [Booking Model](/database/models/booking) - Main booking management
- [Calendar Model](/database/models/calendar) - Calendar and landing page configuration
- [CalendarSlot Model](/database/models/calendar-slot) - Individual event types/slots
- [User Model](/database/models/user) - WordPress user associations

### System & Activity Models
Internal models for availability, logs, and multi-host logic.
- [Availability Model](/database/models/availability) - Availability rules and overrides
- [BookingActivity Model](/database/models/booking-activity) - Audit logs for all booking actions
- [BookingHost Model](/database/models/booking-host) - Pivot for managing multiple hosts
- [BookingMeta Model](/database/models/booking-meta) - Specific metadata for bookings
- [Staff Model](/database/models/staff) - Host profile management
- [Meta Model](/database/models/meta) - Generic polymorphic metadata system

### Pro Plugin Models <Badge type="tip" text="Pro" />
Advanced models available in the Pro version.
- [Order Model](/database/models/order) - Payment order tracking
- [Transactions Model](/database/models/transactions) - Payment processing logs
- [Webhook Model](/database/models/webhook) - Outgoing integration feeds

## Model Usage Examples

### Activity Logging
```php
$booking = Booking::find(1);
$booking->bookingActivity()->create([
    'status' => 'note',
    'description' => 'Customer called to confirm'
]);
```

### Meta Management
```php
$booking = Booking::find(1);
$booking->updateMeta('internal_note', 'Follow up next week');
$note = $booking->getMeta('internal_note');
```
