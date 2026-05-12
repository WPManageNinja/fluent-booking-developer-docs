---
title: Query Builder
description: Using the WPFluent query builder against FluentBooking models.
---
# Query Builder

FluentBooking models inherit the WPFluent query builder, a Laravel-inspired API. Use it for all read/write access — direct `$wpdb` queries bypass model casts, events, and relationships.

## Basics

```php
use FluentBooking\App\Models\Booking;
use FluentBooking\App\Models\Calendar;
use FluentBooking\App\Models\CalendarSlot;

// Find by primary key
$booking = Booking::find(123);

// Conditional query
$upcoming = Booking::where('status', 'scheduled')
    ->where('start_time', '>=', current_time('mysql'))
    ->orderBy('start_time')
    ->get();

// Eager load relationships
$calendar = Calendar::with(['events', 'bookings'])->find(1);
```

## Filtering bookings

```php
$bookings = Booking::where('calendar_id', $calendarId)
    ->whereIn('status', ['scheduled', 'completed'])
    ->whereBetween('start_time', [$from, $to])
    ->orderBy('start_time', 'desc')
    ->paginate(20);
```

## Inserting and updating

```php
$booking = Booking::create([
    'calendar_id' => $calendarId,
    'event_id'    => $eventId,
    'first_name'  => 'Ada',
    'last_name'   => 'Lovelace',
    'email'       => 'ada@example.com',
    'start_time'  => $start,
    'end_time'    => $end,
    'status'      => 'scheduled',
]);

$booking->update(['status' => 'completed']);
```

## Scopes

Scopes registered as `scope*` methods on a model are callable directly. See each model page for the list of available scopes.

## Raw access

When you need raw SQL, prefer:

```php
use FluentBooking\App\Models\Booking;

$rows = Booking::query()
    ->selectRaw('DATE(start_time) AS day, COUNT(*) AS total')
    ->groupBy('day')
    ->get();
```

Avoid `$wpdb->prepare()` against the FluentBooking tables unless you are doing something the query builder cannot model. Direct queries skip relationship resolution, casts, and event hooks.

## Pagination

```php
$paginator = Booking::where('status', 'scheduled')->paginate($perPage, ['*'], 'page', $page);
```

`paginate()` returns a paginator object with `data`, `total`, `per_page`, `current_page`, and `last_page` shaped for the REST API response.
