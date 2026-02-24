# Booking Configuration Filter Hooks

These filters allow you to modify booking data, custom fields, and validation rules.

## fluent_booking/booking_fields

Filters the list of input fields displayed on the booking form for a specific event.

**Parameters:**
- `$fields` (array) - Array of booking field configurations.
- `$calendar_event` (object) - The associated calendar event object.

**Return:** (array) Modified array of fields.

**Example Usage:**
```php
add_filter('fluent_booking/booking_fields', function($fields, $calendar_event) {
    // Add a custom field for a specific event
    if ($calendar_event->id === 5) {
        $fields[] = [
            'type' => 'text',
            'label' => 'Company Name',
            'name' => 'company_name',
            'required' => true
        ];
    }
    return $fields;
}, 10, 2);
```

**Location:** `app/Services/BookingFieldService.php`

---

## fluent_booking/booking_data

Filters the core data of a booking before it is processed or saved.

**Parameters:**
- `$bookingData` (array) - The processed booking data.
- `$calendarSlot` (object) - The associated calendar event/slot object.
- `$customFieldsData` (array) - The custom form fields data.
- `$data` (array) - The raw posted data from the request.

**Return:** (array|WP_Error) Modified booking data, or a `WP_Error` to abort the booking.

**Example Usage:**
```php
add_filter('fluent_booking/booking_data', function($bookingData, $calendarSlot, $customFieldsData, $data) {
    // Modify booking data based on event settings
    return $bookingData;
}, 10, 4);
```

**Location:** `app/Services/BookingService.php`

---

## fluent_booking/booking_confirmation_response

Filters the JSON response returned to the browser after a successful booking.

**Parameters:**
- `$response` (array) - The default response data containing `message`, `redirect_url`, `response_html`, and `booking_hash`.
- `$booking` (object) - The newly created booking object.

**Return:** (array) Modified response data.

**Example Usage:**
```php
add_filter('fluent_booking/booking_confirmation_response', function($response, $booking) {
    // Add custom data to the confirmation response
    $response['custom_message'] = 'Thank you for booking with us!';
    return $response;
}, 10, 2);
```

**Location:** `app/Hooks/Handlers/FrontEndHandler.php`

---

## fluent_booking/booking_rescheduled_response

Filters the JSON response after a booking is successfully rescheduled.

**Parameters:**
- `$response` (array) - The reschedule response data containing `message`, `redirect_url`, `response_html`, and `booking_hash`.
- `$booking` (object) - The updated booking object.

**Return:** (array) Modified response data.

**Example Usage:**
```php
add_filter('fluent_booking/booking_rescheduled_response', function($response, $booking) {
    $response['redirect_url'] = 'https://example.com/custom-reschedule-thank-you';
    return $response;
}, 10, 2);
```

**Location:** `app/Hooks/Handlers/FrontEndHandler.php`

---

## fluent_booking/booking_period_options

Filters the available duration options for recurring or multi-slot bookings.

**Parameters:**
- `$options` (array) - Array of available duration options.

**Return:** (array) Modified options.

---

## fluent_booking/default_booking_filters

Filters the default search/filter parameters for the booking list in the admin dashboard.

**Parameters:**
- `$filters` (array) - Default filter parameters.

**Return:** (array) Modified filters.

---

## fluent_booking/booking_meeting_title

Filters the generated title for the booking meeting (used for calendar sync and emails).

**Parameters:**
- `$title` (string) - The generated meeting title.
- `$authorName` (string) - The host/author display name.
- `$guestName` (string) - The guest/attendee display name.
- `$calendarEvent` (object) - The associated calendar event object.
- `$booking` (object) - The booking model object.

**Return:** (string) Modified title.

**Example Usage:**
```php
add_filter('fluent_booking/booking_meeting_title', function($title, $authorName, $guestName, $calendarEvent, $booking) {
    return 'Meeting: ' . $guestName . ' with ' . $authorName;
}, 10, 5);
```

**Location:** `app/Models/Booking.php`
---

## fluent_booking/meeting_bookmarks

Allows you to add or modify bookmarks associated with a booking (e.g., links to external documents or records).

**Parameters:**
- `$bookmarks` (array) - Array of bookmarks.
- `$booking` (object) - The booking object.

**Return:** (array) Modified bookmarks.

---

## fluent_booking/location_details_html

Filters the HTML output of the location details for display in emails and customer confirmation pages.

**Parameters:**
- `$html` (string) - The location details HTML.
- `$details` (array) - The location details data (type, description, etc.).

**Return:** (string) Modified HTML.

**Location:** `app/Models/Booking.php`

---

## fluent_booking/after_booking_data

Filters the booking data after the booking record has been created but before status hooks fire.

**Parameters:**
- `$bookingData` (array) - The booking data.
- `$booking` (object) - The newly created booking object.
- `$calendarSlot` (object) - The associated calendar event/slot object.
- `$customFieldsData` (array) - The custom form fields data.

**Return:** (array) Modified booking data.

**Location:** `app/Services/BookingService.php`

---

## fluent_booking/schedule_validation_rules_data

Filters the validation rules and messages used when creating a booking schedule.

**Parameters:**
- `$validationConfig` (array) - Array with `rules` and `messages` keys.
- `$calendarEvent` (object) - The associated calendar event object.

**Return:** (array) Modified validation config.

**Example Usage:**
```php
add_filter('fluent_booking/schedule_validation_rules_data', function($validationConfig, $calendarEvent) {
    // Add custom validation rule
    $validationConfig['rules']['phone'] = 'required';
    $validationConfig['messages']['phone.required'] = 'Phone number is required';
    return $validationConfig;
}, 10, 2);
```

**Location:** `app/Http/Controllers/BookingController.php`, `app/Hooks/Handlers/FrontEndHandler.php`

---

## fluent_booking/schedule_custom_field_data

Filters the processed custom field data for a booking.

**Parameters:**
- `$customFieldsData` (array) - The processed custom fields data.
- `$calendarEvent` (object) - The associated calendar event object.

**Return:** (array|WP_Error) Modified custom fields data, or a `WP_Error` to abort.

**Location:** `app/Http/Controllers/BookingController.php`, `app/Hooks/Handlers/FrontEndHandler.php`

---

## fluent_booking/initialize_booking_data

Filters the initial booking data array before it is passed to the booking service.

**Parameters:**
- `$bookingData` (array) - Initial booking data containing `person_time_zone`, `start_time`, `end_time`, `slot_minutes`, `source`, etc.
- `$calendarEvent` (object) - The associated calendar event object.
- `$postedData` (array) - The raw posted data from the request.

**Return:** (array) Modified initial booking data.

**Location:** `app/Http/Controllers/BookingController.php`, `app/Hooks/Handlers/FrontEndHandler.php`

---

## fluent_booking/schedule_receipt_data

Filters the data passed to the booking confirmation template.

**Parameters:**
- `$confirmationData` (array) - The confirmation template data.
- `$booking` (object) - The booking model object.

**Return:** (array) Modified confirmation data.

**Location:** `app/Services/BookingService.php`

---

## fluent_booking/location_details_text

Filters the plain text version of the location details (used where HTML is not supported).

**Parameters:**
- `$text` (string) - The plain text location details.
- `$details` (array) - The location details data.

**Return:** (string) Modified text.

**Location:** `app/Models/Booking.php`

---

## fluent_booking/booking_meta_info_main_meta

Filters the main meta information displayed for a booking in the admin view.

**Parameters:**
- `$mainBodyContents` (array) - The meta information content array.
- `$booking` (object) - The booking model object.

**Return:** (array) Modified meta content.

**Location:** `app/Http/Controllers/SchedulesController.php`

---

## fluent_booking/booking_meta_info_main_meta_{source}

Dynamic filter for booking meta information based on the booking source. The `{source}` is the booking's source value (e.g., `web`, `admin`).

**Parameters:**
- `$mainBodyContents` (array) - The meta information content array.
- `$booking` (object) - The booking model object.

**Return:** (array) Modified meta content.

**Location:** `app/Http/Controllers/SchedulesController.php`

---

## fluent_booking/public_event_vars

Filters the JavaScript variables passed to the frontend booking form for a specific event.

**Parameters:**
- `$eventVars` (array) - The event variables for the frontend.
- `$calendarEvent` (object) - The calendar event object.

**Return:** (array) Modified event variables.

**Location:** `app/Hooks/Handlers/FrontEndHandler.php`

---

## fluent_booking/public_ajax_ratelimit

Filters the rate limiting configuration for public AJAX booking requests.

**Parameters:**
- `$args` (array) - Rate limit config with keys: `limit` (int), `window` (int, seconds), `action` (string).

**Return:** (array) Modified rate limit config.

**Location:** `app/Hooks/Handlers/FrontEndHandler.php`

---

## fluent_booking/exporting_booking_data_csv

Filters the CSV data when exporting bookings.

**Parameters:**
- `$csvData` (array) - The CSV rows data.
- `$attendees` (array) - The attendee/booking objects being exported.

**Return:** (array) Modified CSV data.

**Location:** `app/Hooks/Handlers/DataExporter.php`

---

## fluent_booking/exporting_calendar_data_json

Filters the JSON data when exporting a calendar configuration.

**Parameters:**
- `$calendarData` (array) - The calendar export data.
- `$calendar` (object) - The calendar model object.

**Return:** (array) Modified export data.

**Location:** `app/Hooks/Handlers/DataExporter.php`
