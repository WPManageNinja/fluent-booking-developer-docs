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

Fires when a task is added to Fluent Boards via a FluentBooking integration.

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

---

## fluent_crm/contact_added_by_fluent_booking

Fires when a contact is added or updated in FluentCRM via a FluentBooking integration.

**Parameters:**
- `$subscriber` (object) - The FluentCRM subscriber/contact object.
- `$booking` (object) - The source booking object.
- `$calendarEvent` (object) - The associated calendar event/slot object.
- `$feed` (array) - The integration feed configuration.

**Example Usage:**
```php
add_action('fluent_crm/contact_added_by_fluent_booking', function($subscriber, $booking, $calendarEvent, $feed) {
    // Logic after a CRM contact is synced from a booking
    $subscriberId = $subscriber->id;
}, 10, 4);
```

**Location:** `app/Services/Integrations/FluentCRM/Bootstrap.php`

---

## fluent_booking/save_client_settings_{settingsKey}

Fires when client-side integration settings are saved for a specific key.

**Parameters:**
- `$settings` (array) - The settings data being saved.

**Example Usage:**
```php
add_action('fluent_booking/save_client_settings_twilio', function($settings) {
    // Handle Twilio settings being saved
}, 10, 1);
```

**Location:** `app/Http/Controllers/IntegrationController.php`

---

## fluent_booking/after_disconnect_remote_calendar <Badge type="tip" text="Pro" />

Fires after a remote calendar connection is disconnected.

**Parameters:**
- `$metaId` (int) - The ID of the calendar meta record that was disconnected.
- `$calendar` (object) - The calendar object associated with the disconnected remote calendar.

**Example Usage:**
```php
add_action('fluent_booking/after_disconnect_remote_calendar', function($metaId, $calendar) {
    // Cleanup after remote calendar disconnection
    $calendarId = $calendar->id;
}, 10, 2);
```

**Location:** `fluent-booking-pro/app/Http/Controllers/IntegrationSettingsController.php`

---

## fluent_calendar/patch_calendar_config_settings_{object_type} <Badge type="tip" text="Pro" />

Dynamic hook that fires when remote calendar conflict check settings are updated. The `{object_type}` is the calendar provider type (e.g., `google_calendar`, `outlook_calendar`).

**Parameters:**
- `$conflictCheckIds` (array) - The conflict check calendar IDs.
- `$meta` (object) - The calendar meta record.
- `$calendar` (object) - The calendar object.

**Example Usage:**
```php
add_action('fluent_calendar/patch_calendar_config_settings_google_calendar', function($conflictCheckIds, $meta, $calendar) {
    // React to Google Calendar conflict settings update
}, 10, 3);
```

**Location:** `fluent-booking-pro/app/Http/Controllers/IntegrationSettingsController.php`

---

## fluent_calendar/patch_calendar_additional_settings_{object_type} <Badge type="tip" text="Pro" />

Dynamic hook that fires when remote calendar additional settings are updated. The `{object_type}` is the calendar provider type.

**Parameters:**
- `$additionalSettings` (array) - The additional settings data.
- `$meta` (object) - The calendar meta record.
- `$calendar` (object) - The calendar object.

**Example Usage:**
```php
add_action('fluent_calendar/patch_calendar_additional_settings_google_calendar', function($additionalSettings, $meta, $calendar) {
    // React to Google Calendar additional settings update
}, 10, 3);
```

**Location:** `fluent-booking-pro/app/Http/Controllers/IntegrationSettingsController.php`

---

## fluent_calendar/disconnect_remote_calendar_{object_type} <Badge type="tip" text="Pro" />

Dynamic hook that fires when a specific type of remote calendar is disconnected. The `{object_type}` is the calendar provider type (e.g., `google_calendar`, `outlook_calendar`).

**Parameters:**
- `$meta` (object) - The calendar meta record being disconnected.
- `$calendar` (object) - The calendar object.

**Example Usage:**
```php
add_action('fluent_calendar/disconnect_remote_calendar_google_calendar', function($meta, $calendar) {
    // Handle Google Calendar disconnection
}, 10, 2);
```

**Location:** `fluent-booking-pro/app/Http/Controllers/IntegrationSettingsController.php`

---

## fluent_booking/create_remote_calendar_event_{driver} <Badge type="tip" text="Pro" />

Dynamic hook that fires to create an event on a remote calendar. The `{driver}` is the calendar provider (e.g., `google_calendar`, `outlook_calendar`).

**Parameters:**
- `$config` (array) - The remote calendar configuration.
- `$booking` (object) - The booking model object.

**Example Usage:**
```php
add_action('fluent_booking/create_remote_calendar_event_google_calendar', function($config, $booking) {
    // Custom logic when creating an event on Google Calendar
}, 10, 2);
```

**Location:** `fluent-booking-pro/app/Services/Integrations/Calendars/RemoteCalendarsInit.php`

---

## fluent_booking/cancel_remote_calendar_event_{driver} <Badge type="tip" text="Pro" />

Dynamic hook that fires to cancel an event on a remote calendar. The `{driver}` is the calendar provider.

**Parameters:**
- `$config` (array) - The remote calendar configuration.
- `$booking` (object) - The booking model object.

**Example Usage:**
```php
add_action('fluent_booking/cancel_remote_calendar_event_google_calendar', function($config, $booking) {
    // Custom logic when cancelling a Google Calendar event
}, 10, 2);
```

**Location:** `fluent-booking-pro/app/Services/Integrations/Calendars/RemoteCalendarsInit.php`

---

## fluent_booking/delete_remote_calendar_event_{driver} <Badge type="tip" text="Pro" />

Dynamic hook that fires to delete an event from a remote calendar. The `{driver}` is the calendar provider.

**Parameters:**
- `$config` (array) - The remote calendar configuration.
- `$booking` (object) - The booking model object.

**Example Usage:**
```php
add_action('fluent_booking/delete_remote_calendar_event_google_calendar', function($config, $booking) {
    // Custom logic when deleting a Google Calendar event
}, 10, 2);
```

**Location:** `fluent-booking-pro/app/Services/Integrations/Calendars/RemoteCalendarsInit.php`

---

## fluent_booking/patch_remote_calendar_event_{driver} <Badge type="tip" text="Pro" />

Dynamic hook that fires to update/patch an event on a remote calendar (e.g., after reschedule or attendee email change). The `{driver}` is the calendar provider.

**Parameters:**
- `$config` (array) - The remote calendar configuration.
- `$booking` (object) - The booking model object.
- `$updateData` (array) - The data being updated (e.g., `start`/`end` times, or `email`/`old_email`).

**Example Usage:**
```php
add_action('fluent_booking/patch_remote_calendar_event_google_calendar', function($config, $booking, $updateData) {
    // Custom logic when updating a Google Calendar event
}, 10, 3);
```

**Location:** `fluent-booking-pro/app/Services/Integrations/Calendars/RemoteCalendarsInit.php`

---

## fluent_booking/refresh_remote_calendar_group_members_{driver} <Badge type="tip" text="Pro" />

Dynamic hook that fires to refresh group booking members on a remote calendar event. The `{driver}` is the calendar provider.

**Parameters:**
- `$config` (array) - The remote calendar configuration.
- `$booking` (object) - The booking model object.
- `$groupBookings` (object) - Collection of all group booking members.
- `$isReschedule` (bool) - Whether this is triggered by a reschedule operation.

**Example Usage:**
```php
add_action('fluent_booking/refresh_remote_calendar_group_members_google_calendar', function($config, $booking, $groupBookings, $isReschedule) {
    // Handle group member refresh on Google Calendar
}, 10, 4);
```

**Location:** `fluent-booking-pro/app/Services/Integrations/Calendars/RemoteCalendarsInit.php`
