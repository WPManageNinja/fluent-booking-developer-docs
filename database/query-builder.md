# Query Builder

#To use the Query Builder, you can access the database connection through the `App` facade:

```php
use FluentBooking\App\App;

$db = App::getInstance('db');
```

Alternatively, if you are within a controller or service that has access to the `$app` instance, you can use `$app->make('db')`.
The Fluent Booking Query Builder provides a convenient, fluent interface for creating and running database queries. It can be used to perform most database operations in your application and works on all supported database systems.

## Introduction

Fluent Booking provides two main ways to interact with your data: **Database Models** (ActiveRecord) and the **Query Builder** (Direct Database Access).

### Model vs. Query Builder

| Feature | Database Models | Query Builder |
|---------|-----------------|---------------|
| **Syntax** | `Booking::where(...)` | `App::getInstance('db')->table('fcal_bookings')` |
| **Return Type** | Model Object / Collection | StdClass Object / Array |
| **Logic** | Supports Relations & Scopes | Raw Performance & Joins |
| **Best For** | Business Logic, CRUD | Complex Reporting, Performance |

### Example Comparison

#### Using Models (Recommended)
```php
use FluentBooking\App\Models\Booking;

$bookings = Booking::with('calendar')
    ->applyComputedStatus('upcoming')
    ->get();
```

#### Using Query Builder (Direct)
```php
$bookings = App::getInstance('db')->table('fcal_bookings')
    ->join('fcal_calendars', 'fcal_bookings.calendar_id', '=', 'fcal_calendars.id')
    ->where('fcal_bookings.status', 'scheduled')
    ->get();
```

---

## Retrieving Results

### Retrieving All Rows from a Table
The `get` method returns an array of results where each result is a standard PHP object (StdClass).

```php
$bookings = App::getInstance('db')->table('fcal_bookings')->get();
```

### Retrieving a Single Row / Column
```php
// Get a single row
$booking = App::getInstance('db')->table('fcal_bookings')->where('id', 1)->first();

// Get a single value from a row
$email = App::getInstance('db')->table('fcal_bookings')->where('id', 1)->value('email');

// Get a single row by ID
$booking = App::getInstance('db')->table('fcal_bookings')->find(5);
```

### Retrieving a List of Column Values
```php
$emails = App::getInstance('db')->table('fcal_bookings')->pluck('email');

// With custom keys (e.g., ID as key)
$emails = App::getInstance('db')->table('fcal_bookings')->pluck('email', 'id');
```

### Aggregates
The query builder provides variety of aggregate methods:

```php
$count = App::getInstance('db')->table('fcal_bookings')->count();
$maxPrice = App::getInstance('db')->table('fcal_orders')->max('total_paid');
$avgDuration = App::getInstance('db')->table('fcal_calendar_events')->avg('duration');
```

### Determining If Records Exist
Instead of counting records, you can use `exists` or `doesntExist`:

```php
if (App::getInstance('db')->table('fcal_bookings')->where('status', 'pending')->exists()) {
    // There are pending bookings
}
```

## Selects

Specify which columns you want to retrieve:

```php
$bookings = App::getInstance('db')->table('fcal_bookings')
    ->select(['first_name', 'email', 'status'])
    ->get();
```

## Where Clauses

### Simple Where Clauses
```php
$bookings = App::getInstance('db')->table('fcal_bookings')
    ->where('status', '=', 'scheduled')
    ->get();

// Short syntax for equality
$bookings = App::getInstance('db')->table('fcal_bookings')->where('calendar_id', 10)->get();
```

### Additional Where Clauses
- `whereIn('column', [1, 2, 3])`
- `whereNull('column')` / `whereNotNull('column')`
- `whereBetween('column', [$start, $end])`
- `whereDate('column', '2024-01-01')`

### Parameter Grouping
Group constraints within parenthesis for complex logic:

```php
App::getInstance('db')->table('fcal_bookings')
    ->where('status', '=', 'cancelled')
    ->where(function ($query) {
        $query->where('email', 'LIKE', '%@gmail.com')
              ->orWhere('phone', '!=', '');
    })
    ->get();
```

## Joins

```php
$bookings = App::getInstance('db')->table('fcal_bookings')
    ->join('fcal_calendars', 'fcal_bookings.calendar_id', '=', 'fcal_calendars.id')
    ->select(['fcal_bookings.*', 'fcal_calendars.title as calendar_name'])
    ->get();
```

## Inserts & Updates

### Inserts
```php
$id = App::getInstance('db')->table('fcal_bookings')->insertGetId([
    'calendar_id' => 1,
    'email' => 'john@example.com',
    'status' => 'scheduled'
]);
```

### Updates
```php
App::getInstance('db')->table('fcal_bookings')
    ->where('id', 1)
    ->update(['status' => 'completed']);
```

### Deletes
```php
App::getInstance('db')->table('fcal_bookings')->where('status', 'cancelled')->delete();
```

## Fluent Booking Specific Query Examples

### Host Performance and Revenue
```php
$calendarStats = App::getInstance('db')->table('fcal_calendars')
    ->leftJoin('fcal_bookings', 'fcal_calendars.id', '=', 'fcal_bookings.calendar_id')
    ->leftJoin('fcal_orders', 'fcal_bookings.id', '=', 'fcal_orders.parent_id')
    ->select([
        'fcal_calendars.id',
        'fcal_calendars.title',
        App::getInstance('db')->raw('COUNT(fcal_orders.id) as total_paid_bookings'),
        App::getInstance('db')->raw('SUM(fcal_orders.total_paid) as total_revenue')
    ])
    ->where('fcal_orders.status', 'completed')
    ->groupBy('fcal_calendars.id')
    ->get();
```

### Meta and Activity Queries
```php
// Get count of failed email logs per booking
$failedLogs = App::getInstance('db')->table('fcal_booking_activity')
    ->where('type', 'email_log')
    ->where('status', 'failed')
    ->select(['booking_id', App::getInstance('db')->raw('count(*) as failure_count')])
    ->groupBy('booking_id')
    ->get();
```
