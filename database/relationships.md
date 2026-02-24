# Model Relationships

FluentBooking database tables are interconnected via primary and foreign key relationships. Our ORM makes managing these relationships effortless.

## Relationship Types

- **One-to-Many (HasMany)**: A Calendar has many Events. A Booking has many BookingMeta records.
- **Many-to-Many (BelongsToMany)**: A Booking has many Hosts (via `fcal_booking_hosts` pivot table).
- **Inverse One-to-Many (BelongsTo)**: A CalendarSlot belongs to a Calendar. An Order belongs to a Booking.
- **One-to-One (HasOne)**: An Order has one Transaction.

## Core Model Relationships

| Parent Model | Relation | Type | Child Model | Foreign Key |
|-------------|----------|------|-------------|-------------|
| **Calendar** | `events` / `slots` | HasMany | CalendarSlot | `calendar_id` |
| **Calendar** | `bookings` | HasMany | Booking | `calendar_id` |
| **Calendar** | `user` | BelongsTo | User | `user_id` |
| **Calendar** | `availabilities` | HasMany | Availability | `object_id` (user_id) |
| **Calendar** | `metas` | HasMany | Meta | `object_id` (where object_type = 'Calendar') |
| **CalendarSlot** | `calendar` | BelongsTo | Calendar | `calendar_id` |
| **CalendarSlot** | `bookings` | HasMany | Booking | `event_id` |
| **CalendarSlot** | `user` | BelongsTo | User | `user_id` |
| **CalendarSlot** | `event_metas` | HasMany | Meta | `object_id` (where object_type in calendar_event, integration) |
| **Booking** | `calendar` | BelongsTo | Calendar | `calendar_id` |
| **Booking** | `slot` / `calendar_event` | BelongsTo | CalendarSlot | `event_id` |
| **Booking** | `user` | BelongsTo | User | `host_user_id` |
| **Booking** | `hosts` | BelongsToMany | User | via `fcal_booking_hosts` pivot |
| **Booking** | `booking_meta` | HasMany | BookingMeta | `booking_id` |
| **Booking** | `booking_activities` | HasMany | BookingActivity | `booking_id` |
| **Booking** | `payment_order` | HasOne | Order | `parent_id` (Pro) |
| **User** | `calendars` | HasMany | Calendar | `user_id` |
| **BookingActivity** | `booking` | BelongsTo | Booking | `booking_id` |
| **BookingHost** | `booking` | BelongsTo | Booking | `booking_id` |
| **BookingMeta** | `booking` | BelongsTo | Booking | `booking_id` |
| **Order** | `booking` | BelongsTo | Booking | `parent_id` (Pro) |
| **Order** | `transaction` | HasOne | Transactions | `object_id` (Pro) |
| **Order** | `items` | HasMany | OrderItems | `order_id` (Pro) |
| **Order** | `discounts` | HasMany | OrderItems | `order_id` (where type = 'discount') (Pro) |

## Relationship Best Practices

### 1. Use Eager Loading
Avoid "N+1" query problems by using the `with()` method to load relationships in a single batch.

```php
// Good: Loads 10 bookings and their calendars in 2 queries
$bookings = Booking::with('calendar')->limit(10)->get();

foreach ($bookings as $booking) {
    echo $booking->calendar->title;
}
```

### 2. Relationship Constraints
You can filter a query based on the existence or properties of a relationship.

```php
// Get all calendars that have at least one active booking
$calendars = Calendar::has('bookings')->get();

// Get bookings for a specific event slug
$bookings = Booking::whereHas('calendar_event', function($query) {
    $query->where('slug', '15-min-meeting');
})->get();
```

## Performance Considerations

1. **Index Foreign Keys**: All relationship columns (like `calendar_id`, `event_id`, `user_id`) are indexed in the `fcal_` tables to ensure rapid joins.
2. **Select Specific Columns**: When eager loading, you can specify exactly which columns to retrieve to save memory.
   ```php
   $bookings = Booking::with('calendar:id,title,slug')->get();
   ```
3. **Lazy Loading Caution**: Accessing `$booking->calendar` without eager loading triggers a separate database query for every instance. Use this only for single-record views.
