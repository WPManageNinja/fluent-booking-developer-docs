# Query Builder

Fluent Booking includes a powerful, fluent query builder that helps you interact with the database using an expressive and safe syntax. This builder abstracts away the complexity of writing raw SQL queries while protecting your application from SQL injection attacks.

To use the query builder, you can import the `Query` class:

```php
use FluentBooking\Framework\Database\Query;
```

## Retrieving Results

### Retrieving All Rows from a Table
You can access the query builder using the `table` method. The `get` method returns an array of results where each result is an object.

```php
$bookings = Query::table('fcal_bookings')->get();

foreach ($bookings as $booking) {
    echo $booking->first_name;
}
```

### Retrieving a Single Row
If you just need to retrieve a single row from the database table, you may use the `first` method. This method returns a single standard object:

```php
$booking = Query::table('fcal_bookings')->where('first_name', 'John')->first();

echo $booking->email;
```

### Retrieving a Single Column
If you would like to retrieve an array containing the values of a single column, you may use the `pluck` method:

```php
$emails = Query::table('fcal_bookings')->pluck('email');

foreach ($emails as $email) {
    echo $email;
}
```

You may also specify a custom key column for the returned array:

```php
$emails = Query::table('fcal_bookings')->pluck('email', 'id');
```

### Retrieving by ID
If you need to retrieve a single row by its `id` column, you may use the `find` method:

```php
$booking = Query::table('fcal_bookings')->find(5);
```

### Retrieving a Single Value
If you only need a single value from the first row of a query, you may use the `value` method:

```php
$email = Query::table('fcal_bookings')->where('id', 1)->value('email');
```

### Aggregates
The query builder also provides a variety of aggregate methods such as `count`, `max`, `min`, `avg`, and `sum`.

```php
$count = Query::table('fcal_bookings')->count();

$maxDuration = Query::table('fcal_calendar_slots')->max('duration');
```

## Selects

You may not always want to select all columns from a database table. Using the `select` method, you can specify a custom select clause for the query:

```php
$bookings = Query::table('fcal_bookings')
    ->select(['first_name', 'email', 'status'])
    ->get();
```

## Where Clauses

### Simple Where Clauses
You may use the `where` method on a query builder instance to add `WHERE` clauses to the query. The most basic call to `where` requires 3 arguments: the name of the column, the operator, and the value.

```php
$bookings = Query::table('fcal_bookings')
    ->where('status', '=', 'scheduled')
    ->get();
```

If you want to verify that a column is equal to a given value, you may pass the value as the second argument:

```php
$bookings = Query::table('fcal_bookings')
    ->where('calendar_id', 10)
    ->get();
```

### Additional Where Clauses

**whereIn**
The `whereIn` method verifies that a given column's value is contained within the given array:

```php
$bookings = Query::table('fcal_bookings')
    ->whereIn('status', ['cancelled', 'completed'])
    ->get();
```

**whereNull / whereNotNull**
The `whereNull` method verifies that the value of the given column is `NULL`:

```php
$bookings = Query::table('fcal_bookings')
    ->whereNull('payment_method')
    ->get();
```

**whereBetween**
The `whereBetween` method verifies that a column's value is between two values:

```php
$bookings = Query::table('fcal_bookings')
    ->whereBetween('start_time', ['2024-01-01', '2024-01-31'])
    ->get();
```

## Ordering, Grouping & Limit

### Ordering
The `orderBy` method allows you to sort the result of the query by a given column. The first argument is the column, and the second is the direction (`asc` or `desc`):

```php
$bookings = Query::table('fcal_bookings')
    ->orderBy('created_at', 'desc')
    ->get();
```

### Limit & Offset
You may use the `skip` and `take` methods to limit the number of results returned from the query or to skip a given number of results in the query:

```php
$bookings = Query::table('fcal_bookings')
    ->skip(10)
    ->take(5)
    ->get();
```

## Joins
The query builder may also be used to write join statements. To perform a basic "inner join", you may use the `join` method on a query builder instance:

```php
$bookings = Query::table('fcal_bookings')
    ->join('fcal_calendars', 'fcal_bookings.calendar_id', '=', 'fcal_calendars.id')
    ->select(['fcal_bookings.*', 'fcal_calendars.title as calendar_name'])
    ->get();
```

## Pagination
The query builder provides a simple way to paginate database results.

### `paginate`
The `paginate` method automatically takes care of setting the proper limit and offset based on the current page.

```php
$bookings = Query::table('fcal_bookings')->paginate(15);

foreach ($bookings as $booking) {
    echo $booking->title;
}

// Render pagination links
echo $bookings->links();
```

### `simplePaginate`
If you only need "Next" and "Previous" links, you may use the `simplePaginate` method:

```php
$bookings = Query::table('fcal_bookings')->simplePaginate(15);
```

## Raw Expressions
Sometimes you may need to use a raw expression in a query. You can create a raw expression using the `raw` method.

> [!WARNING]
> Raw statements will be injected into the query as strings, so you must be extremely careful to not create SQL injection vulnerabilities.

```php
$users = Query::table('fcal_bookings')
    ->select(Query::raw('count(*) as booking_count, status'))
    ->where('status', '<>', 1)
    ->groupBy('status')
    ->get();
```

### Raw Methods
- `selectRaw`
- `whereRaw / orWhereRaw`
- `havingRaw / orHavingRaw`
- `orderByRaw`
- `groupByRaw`

```php
$bookings = Query::table('fcal_bookings')
    ->whereRaw('price > IF(state = "TX", ?, 100)', [200])
    ->get();
```

## Advanced Where Clauses

### JSON Where Clauses
Fluent Booking includes support for querying JSON column types.

```php
$bookings = Query::table('fcal_bookings')
    ->where('options->language', 'en')
    ->get();

$bookings = Query::table('fcal_bookings')
    ->whereJsonContains('options->languages', 'en')
    ->get();
    
$bookings = Query::table('fcal_bookings')
    ->whereJsonLength('options->languages', '>', 1)
    ->get();
```

### Dynamic Where Clauses
You may use dynamic Where clauses to clean up your code. 

```php
// whereId(1) becomes where('id', '=', 1)
$booking = Query::table('fcal_bookings')->whereId(1)->first();

// whereStatus('completed') becomes where('status', '=', 'completed')
$bookings = Query::table('fcal_bookings')->whereStatus('completed')->get();
```

## Chunking Results
If you need to work with thousands of database records, consider using the `chunk` method. This method retrieves a small chunk of results at a time and feeds each chunk into a `Closure` for processing.

```php
Query::table('fcal_bookings')->orderBy('id')->chunk(100, function ($bookings) {
    foreach ($bookings as $booking) {
        // Process booking...
    }
});
```

The query builder also provides an `insert` method for inserting records into the database table. The `insert` method accepts an array of column names and values:

```php
Query::table('fcal_calendars')->insert([
    'user_id' => 1,
    'title'   => 'My New Calendar',
    'slug'    => 'my-new-calendar',
    'status'  => 'active',
    'created_at' => date('Y-m-d H:i:s'),
    'updated_at' => date('Y-m-d H:i:s')
]);
```

### Auto-Incrementing IDs
If the table has an auto-incrementing id, use the `insertGetId` method to insert a record and then retrieve the ID:

```php
$id = Query::table('fcal_calendars')->insertGetId([
    'title' => 'Consultation Calendar',
    'user_id' => 2
]);
```

## Updates
In addition to inserting records into the database, the query builder can also update existing records using the `update` method:

```php
Query::table('fcal_bookings')
    ->where('id', 1)
    ->update(['status' => 'completed']);
```

### Increment & Decrement
The query builder also provides convenient methods for complex update statements:

```php
Query::table('fcal_bookings')->increment('total_paid');
Query::table('fcal_bookings')->increment('total_paid', 50);
Query::table('fcal_bookings')->decrement('total_paid');
```

### Update or Insert
Sometimes you may want to update an existing record or create it if no matching record exists:

```php
Query::table('fcal_bookings')
    ->updateOrInsert(
        ['email' => 'john@example.com', 'calendar_id' => 1],
        ['status' => 'active']
    );
```

## Deletes
The query builder may also be used to remove records from the database via the `delete` method:

```php
Query::table('fcal_bookings')->where('id', 123)->delete();
```

## Conditional Clauses
Sometimes you may want to apply clauses to a query only when something else is true. The `when` method helps you write cleaner code:

```php
$role = $_GET['role'] ?? null;

$users = Query::table('fcal_bookings')
    ->when($role, function ($query, $role) {
        return $query->where('role_id', $role);
    })
    ->get();
```

## Unions
The query builder also provides a quick way to "union" two queries together:

```php
$first = Query::table('fcal_bookings')
            ->where('status', 'cancelled');

$bookings = Query::table('fcal_bookings')
            ->where('status', 'completed')
            ->union($first)
            ->get();
```

## Debugging
You can use the `dd` or `dump` methods while building a query to dump the query bindings and SQL.

```php
Query::table('fcal_bookings')->where('status', 'completed')->dd();
```

To get the raw SQL string without stopping execution:

```php
$sql = Query::table('fcal_bookings')->where('id', 1)->toSql();
```
