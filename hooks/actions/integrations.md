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

Fires when settings for a specific integration are saved. <Badge type="tip" text="Pro" />

**Parameters:**
- `$settings` (array) - The settings being saved.
- `$hostId` (int) - The host user ID.

**Example Usage:**
```php
add_action('fluent_booking/save_integration_settings_zoom', function($settings, $hostId) {
    // Perform actions when Zoom settings are updated
}, 10, 2);
```

> [!NOTE]
> In the free plugin, this same hook name is used as a **filter** (via `apply_filters`) in `CalendarIntegrationService.php` with parameters `$data` and `$integrationId`. In the Pro plugin, it is called as an **action** (via `do_action`) with `$settings` and `$hostId`.

---

## fluent_booking/disconnect_integration_{key}

Fires when a specific integration is disconnected. <Badge type="tip" text="Pro" />

**Parameters:**
- `$hostId` (int) - The host user ID whose integration is being disconnected.

**Example Usage:**
```php
add_action('fluent_booking/disconnect_integration_google_calendar', function($hostId) {
    // Cleanup tasks when Google Calendar is disconnected
}, 10, 1);
```

---

## fluent_booking/disconnect_general_integration_feed_{key}

Fires when a general integration feed is disconnected. <Badge type="tip" text="Pro" />

**Parameters:**
- `$calendar` (object) - The calendar object associated with the integration being disconnected.

**Example Usage:**
```php
add_action('fluent_booking/disconnect_general_integration_feed_webhook', function($calendar) {
    // Handle webhook feed disconnection
    $calendar_id = $calendar->id;
}, 10, 1);
```

---

## fluent_boards/task_added_from_fluent_booking

Fires when a task is added to Fluent Boards via a Fluent Booking integration.

**Parameters:**
- `$task` (object) - The newly created task object.
- `$booking` (object) - The source booking object.
- `$calendarEvent` (object) - The associated calendar event/slot object.
- `$feed` (array) - The integration feed configuration.

**Example Usage:**
```php
add_action('fluent_boards/task_added_from_fluent_booking', function($task, $booking, $calendarEvent, $feed) {
    // Logic after a task is created from a booking
}, 10, 4);
```

**Location:** `app/Services/Integrations/FluentBoards/Bootstrap.php`
