# Integration Filter Hooks <Badge type="tip" text="Pro" />

These filters allow you to customize calendar integrations, video conferencing, SMS, webhooks, and other third-party service connections.

## fluent_booking/integrations_menu_items <Badge type="tip" text="Pro" />

Filters the menu items shown in the integrations settings page.

**Parameters:**
- `$menuItems` (array) - Array of integration menu items.

**Return:** (array) Modified menu items.

**Location:** `fluent-booking-pro/app/Http/Controllers/IntegrationSettingsController.php`

---

## fluent_booking/remote_calendar_providers <Badge type="tip" text="Pro" />

Filters the list of available remote calendar providers (e.g., Google Calendar, Outlook).

**Parameters:**
- `$providers` (array) - Array of provider configurations (default: empty array).
- `$userId` (int) - The host user ID.
- `$calendar` (object) - The calendar object.

**Return:** (array) Modified providers list.

**Location:** `fluent-booking-pro/app/Http/Controllers/IntegrationSettingsController.php`

---

## fluent_booking/remote_calendar_connection_feeds <Badge type="tip" text="Pro" />

Filters the remote calendar connection feeds for a specific user and calendar.

**Parameters:**
- `$feeds` (array) - Array of connection feeds (default: empty array).
- `$userId` (int) - The host user ID.
- `$calendar` (object) - The calendar object.

**Return:** (array) Modified connection feeds.

**Location:** `fluent-booking-pro/app/Http/Controllers/IntegrationSettingsController.php`

---

## fluent_booking/get_integration_settings_{settingsKey} <Badge type="tip" text="Pro" />

Dynamic filter to retrieve integration settings for a specific integration. The `{settingsKey}` is the integration identifier.

**Parameters:**
- `$hostId` (int) - The host user ID.
- `$settings` (array) - The settings data (default: empty array).

**Return:** (array) Modified settings.

**Location:** `fluent-booking-pro/app/Http/Controllers/IntegrationSettingsController.php`

---

## fluent_booking/get_integration_field_settings_{settingsKey} <Badge type="tip" text="Pro" />

Dynamic filter to retrieve field-level settings for a specific integration. The `{settingsKey}` is the integration identifier.

**Parameters:**
- `$hostId` (int) - The host user ID.
- `$fieldSettings` (array) - The field settings data (default: empty array).

**Return:** (array) Modified field settings.

**Location:** `fluent-booking-pro/app/Http/Controllers/IntegrationSettingsController.php`

---

## fluent_booking/get_general_integration_feed_{settingsKey} <Badge type="tip" text="Pro" />

Dynamic filter to retrieve the general integration feed for a specific integration. The `{settingsKey}` is the integration identifier.

**Parameters:**
- `$feed` (array) - The integration feed data (default: empty array).
- `$calendar` (object) - The calendar object.

**Return:** (array) Modified feed data.

**Location:** `fluent-booking-pro/app/Http/Controllers/IntegrationSettingsController.php`

---

## fluent_booking/verify_save_caldav_credential_{driverKey} <Badge type="tip" text="Pro" />

Dynamic filter to verify and process CalDAV credentials before saving. The `{driverKey}` is the CalDAV driver identifier.

**Parameters:**
- `$result` (array) - The verification result.
- `$settings` (array) - The CalDAV settings from the request.
- `$userId` (int) - The host user ID.

**Return:** (array) Modified verification result.

**Location:** `fluent-booking-pro/app/Http/Controllers/IntegrationSettingsController.php`

---

## Google Calendar

### fluent_booking/google_event_data <Badge type="tip" text="Pro" />

Filters the event data sent to Google Calendar when creating or updating an event.

**Parameters:**
- `$data` (array) - The Google Calendar event data including `summary`, `description`, `start`, `end`, `attendees`, `reminders`, etc.
- `$booking` (object) - The booking object.
- `$queryArgs` (array) - Additional query arguments for the API call.

**Return:** (array) Modified event data.

**Example Usage:**
```php
add_filter('fluent_booking/google_event_data', function($data, $booking, $queryArgs) {
    $data['description'] .= "\n\nCustom note: Booking ID #" . $booking->id;
    return $data;
}, 10, 3);
```

**Location:** `fluent-booking-pro/app/Services/Integrations/Calendars/Google/Bootstrap.php`

---

### fluent_booking/google_additional_setting_fields <Badge type="tip" text="Pro" />

Filters the additional settings fields displayed for the Google Calendar integration.

**Parameters:**
- `$fields` (array) - Array of settings field configurations.

**Return:** (array) Modified fields.

**Location:** `fluent-booking-pro/app/Services/Integrations/Calendars/Google/Bootstrap.php`

---

## Outlook Calendar

### fluent_booking/outlook_app_credentials <Badge type="tip" text="Pro" />

Filters the Outlook application credentials (client ID and secret).

**Parameters:**
- `$credentials` (array) - Array with `client_id` and `client_secret` keys.

**Return:** (array) Modified credentials.

**Location:** `fluent-booking-pro/app/Services/Integrations/Calendars/Outlook/OutlookHelper.php`

---

### fluent_booking/outlook_app_redirect_url <Badge type="tip" text="Pro" />

Filters the OAuth redirect URL for Outlook calendar integration.

**Parameters:**
- `$redirectUrl` (string) - The redirect URL.

**Return:** (string) Modified redirect URL.

**Location:** `fluent-booking-pro/app/Services/Integrations/Calendars/Outlook/OutlookHelper.php`

---

### fluent_booking/outlook_event_data <Badge type="tip" text="Pro" />

Filters the event data sent to Outlook Calendar when creating or updating an event.

**Parameters:**
- `$data` (array) - The Outlook Calendar event data.
- `$booking` (object) - The booking object.

**Return:** (array) Modified event data.

**Location:** `fluent-booking-pro/app/Services/Integrations/Calendars/Outlook/Bootstrap.php`

---

### fluent_booking/outlook_additional_setting_fields <Badge type="tip" text="Pro" />

Filters the additional settings fields displayed for the Outlook Calendar integration.

**Parameters:**
- `$fields` (array) - Array of settings field configurations.

**Return:** (array) Modified fields.

**Location:** `fluent-booking-pro/app/Services/Integrations/Calendars/Outlook/Bootstrap.php`

---

### fluent_booking/outlook_token_url <Badge type="tip" text="Pro" />

Filters the Outlook OAuth token URL.

**Parameters:**
- `$tokenUrl` (string) - The token endpoint URL.

**Return:** (string) Modified URL.

**Location:** `fluent-booking-pro/app/Services/Integrations/Calendars/Outlook/Client.php`

---

### fluent_booking/outlook_revoke_url <Badge type="tip" text="Pro" />

Filters the Outlook OAuth token revocation URL.

**Parameters:**
- `$revokeUrl` (string) - The revoke endpoint URL.

**Return:** (string) Modified URL.

**Location:** `fluent-booking-pro/app/Services/Integrations/Calendars/Outlook/Client.php`

---

### fluent_booking/outlook_refresh_token_url <Badge type="tip" text="Pro" />

Filters the Outlook OAuth token refresh URL.

**Parameters:**
- `$refreshTokenUrl` (string) - The refresh token endpoint URL.

**Return:** (string) Modified URL.

**Location:** `fluent-booking-pro/app/Services/Integrations/Calendars/Outlook/Client.php`

---

## Zoom

### fluent_booking/zoom_meeting_data <Badge type="tip" text="Pro" />

Filters the meeting data sent to Zoom when creating a meeting.

**Parameters:**
- `$data` (array) - The Zoom meeting data including `topic`, `start_time`, `duration`, `timezone`, `settings`, etc.
- `$booking` (object) - The booking object.
- `$calendarSlot` (object) - The calendar event/slot object.

**Return:** (array) Modified meeting data.

**Example Usage:**
```php
add_filter('fluent_booking/zoom_meeting_data', function($data, $booking, $calendarSlot) {
    $data['settings']['waiting_room'] = true;
    return $data;
}, 10, 3);
```

**Location:** `fluent-booking-pro/app/Services/Integrations/ZoomMeeting/Bootstrap.php`

---

## Twilio SMS

### fluent_booking/before_send_integration_data_twilio <Badge type="tip" text="Pro" />

Filters the SMS message body before sending via Twilio.

**Parameters:**
- `$body` (string) - The SMS message body.
- `$booking` (object) - The booking object.

**Return:** (string) Modified message body.

**Location:** `fluent-booking-pro/app/Services/Integrations/Twilio/Bootstrap.php`

---

### fluent_booking/default_sms_notification_settings <Badge type="tip" text="Pro" />

Filters the default SMS notification template settings.

**Parameters:**
- `$settings` (array) - Array of SMS notification settings with templates for different booking events.

**Return:** (array) Modified notification settings.

**Location:** `fluent-booking-pro/app/Services/Integrations/Twilio/TwilioHelper.php`

---

## Webhooks

### fluent_booking/booking_webhook_request <Badge type="tip" text="Pro" />

Filters the webhook request parameters before sending.

**Parameters:**
- `$requestArgs` (array) - The webhook request arguments including `method`, `headers`, `body`, `timeout`, `sslverify`, etc.
- `$booking` (object) - The booking object.
- `$webHook` (array) - The webhook configuration.

**Return:** (array) Modified request arguments.

**Example Usage:**
```php
add_filter('fluent_booking/booking_webhook_request', function($requestArgs, $booking, $webHook) {
    $requestArgs['headers']['X-Custom-Header'] = 'my-value';
    return $requestArgs;
}, 10, 3);
```

**Location:** `fluent-booking-pro/app/Services/Integrations/Webhook/WebhookIntegration.php`

---

## Validation

### fluent_booking/update_advanced_settings_validation_rule <Badge type="tip" text="Pro" />

Filters the validation rules when updating advanced event settings.

**Parameters:**
- `$validationConfig` (array) - Array with `rules` and `messages` keys.
- `$event` (object) - The calendar event object.

**Return:** (array) Modified validation config.

**Location:** `fluent-booking-pro/app/Http/Controllers/CalendarController.php`

---

### fluent_booking/update_recurring_settings_validation_rule <Badge type="tip" text="Pro" />

Filters the validation rules when updating recurring event settings.

**Parameters:**
- `$validationConfig` (array) - Array with `rules` and `messages` keys.
- `$event` (object) - The calendar event object.

**Return:** (array) Modified validation config.

**Location:** `fluent-booking-pro/app/Http/Controllers/CalendarController.php`
