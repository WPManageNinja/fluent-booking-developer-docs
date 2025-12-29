# Integrations Action Hooks

These hooks allow you to intercept and manage third-party integrations.

## fluent_booking/integration_notify_{key}

Dynamic hook that fires when a specific integration notification is triggered.

**Parameters:**
- `$feed` (array) - The integration feed configuration.
- `$booking` (object) - The booking model object.
- `$calendar_event` (object) - The associated calendar event object.

**Example Usage:**
```php
// Where 'mailchimp' is the integration key
add_action('fluent_booking/integration_notify_mailchimp', function($feed, $booking, $calendar_event) {
    // Custom logic for when Mailchimp integration is triggered
}, 10, 3);
```

**Location:** `app/Hooks/Handlers/GlobalNotificationHandler.php`

---

## fluent_booking/save_integration_settings_{key}

Fires when settings for a specific integration are saved.

**Parameters:**
- `$settings` (array) - The settings being saved.

**Example Usage:**
```php
add_action('fluent_booking/save_integration_settings_zoom', function($settings) {
    // Perform actions when Zoom settings are updated
}, 10, 1);
```

---

## fluent_booking/disconnect_integration_{key}

Fires when a specific integration is disconnected.

**Parameters:**
- `$integration_key` (string) - The key of the integration being disconnected.

**Example Usage:**
```php
add_action('fluent_booking/disconnect_integration_google_calendar', function($integration_key) {
    // Cleanup tasks when Google Calendar is disconnected
}, 10, 1);
```

---

## fluent_booking/disconnect_general_integration_feed_{key}

Fires when a general integration feed is disconnected.

**Parameters:**
- `$feed` (array) - The feed being disconnected.

**Example Usage:**
```php
add_action('fluent_booking/disconnect_general_integration_feed_webhook', function($feed) {
    // Handle webhook feed disconnection
}, 10, 1);
```

---

## fluent_boards/task_added_from_fluent_booking

Fires when a task is added to Fluent Boards via a Fluent Booking integration.

**Parameters:**
- `$task` (object) - The newly created task object.
- `$booking` (object) - The source booking object.

**Example Usage:**
```php
add_action('fluent_boards/task_added_from_fluent_booking', function($task, $booking) {
    // Logic after a task is created from a booking
}, 10, 2);
```
