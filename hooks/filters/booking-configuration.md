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
- `$data` (array) - The booking data.
- `$calendar_event` (object) - The associated calendar event object.

**Return:** (array) Modified booking data.

**Example Usage:**
```php
add_filter('fluent_booking/booking_data', function($data, $calendar_event) {
    // Modify booking data based on event settings
    return $data;
}, 10, 2);
```

---

## fluent_booking/booking_confirmation_response

Filters the JSON response returned to the browser after a successful booking.

**Parameters:**
- `$response` (array) - The default response data.
- `$booking` (object) - The newly created booking object.
- `$calendar_event` (object) - The associated calendar event object.

**Return:** (array) Modified response data.

**Example Usage:**
```php
add_filter('fluent_booking/booking_confirmation_response', function($response, $booking, $calendar_event) {
    // Add custom data to the confirmation response
    $response['custom_message'] = 'Thank you for booking with us!';
    return $response;
}, 10, 3);
```

---

## fluent_booking/booking_rescheduled_response

Filters the JSON response after a booking is successfully rescheduled.

**Parameters:**
- `$response` (array) - The reschedule response data.
- `$booking` (object) - The updated booking object.
- `$calendar_event` (object) - The associated calendar event object.

**Return:** (array) Modified response data.

**Example Usage:**
```php
add_filter('fluent_booking/booking_rescheduled_response', function($response, $booking, $calendar_event) {
    $response['redirect_url'] = 'https://example.com/custom-reschedule-thank-you';
    return $response;
}, 10, 3);
```

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
- `$title` (string) - The generated title.
- `$booking` (object) - The booking object.
- `$calendar_event` (object) - The associated calendar event object.

**Return:** (string) Modified title.

**Example Usage:**
```php
add_filter('fluent_booking/booking_meeting_title', function($title, $booking, $calendar_event) {
    return 'Project Sync: ' . $booking->first_name;
}, 10, 3);
```
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
- `$booking` (object) - The booking object.
- `$calendar_event` (object) - The associated calendar event object.

**Return:** (string) Modified HTML.
