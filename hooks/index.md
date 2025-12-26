# Developer Hooks

Fluent Booking provides a rich set of action and filter hooks that allow you to extend the functionality of the plugin. Hooks allow you to execute custom code at specific points in the execution flow or modify data before it is saved or displayed.

## Hook Types

### [Action Hooks](/hooks/actions/)
Action hooks allow you to execute custom code at specific points. They are perfect for triggering side effects, sending notifications, or logging events.

### [Filter Hooks](/hooks/filters/)
Filter hooks allow you to modify data, settings, and behavior. They are used to customize functionality and modify output.

## How to use Hooks

To use a hook, you can use the WordPress standard `add_action()` or `add_filter()` functions.

### Example Action
```php
add_action('fluent_booking/booking_scheduled', function($booking, $calendar_event) {
    // Execute custom logic when a booking is scheduled
}, 10, 2);
```

### Example Filter
```php
add_filter('fluent_booking/booking_fields', function($fields, $calendar_event) {
    // Modify booking fields
    return $fields;
}, 10, 2);
```
