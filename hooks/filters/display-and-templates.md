# Display & Templates Filter Hooks

These filters allow you to modify the frontend display, injected scripts, and template variables.

## fluent_booking/booking_confirmation_page_vars

Filters the data passed to the booking confirmation landing page.

**Parameters:**
- `$data` (array) - Array of template variables.
- `$booking` (object) - The booking object.
- `$calendar_event` (object) - The associated calendar event object.

**Return:** (array) Modified template data.

**Example Usage:**
```php
add_filter('fluent_booking/booking_confirmation_page_vars', function($data, $booking, $calendar_event) {
    $data['site_url'] = home_url();
    $data['custom_thank_you_title'] = 'Success, ' . $booking->first_name . '!';
    return $data;
}, 10, 3);
```

**Location:** `app/Services/LandingPage/LandingPageHandler.php`

---

## fluent_booking/add_to_calendar_html

Filters the HTML output for the "Add to Calendar" button/links.

**Parameters:**
- `$html` (string) - The default button HTML.
- `$booking` (object) - The booking object.

**Return:** (string) Modified HTML.

---

## fluent_booking/confirm_and_reject_button_html

Filters the HTML for the confirm and reject buttons shown in the admin/email interface.

**Parameters:**
- `$html` (string) - The button HTML.
- `$booking` (object) - The booking object.

**Return:** (string) Modified HTML.

---

## fluent_booking/booking_confirmation_page_title

Filters the browser page title for the booking confirmation page.

**Parameters:**
- `$title` (string) - The page title.
- `$booking` (object) - The booking object.

**Return:** (string) Modified title.

---

## fluent_booking/allowed_html_tags

Filters the list of allowed HTML tags and attributes for sanitizing user-provided content in descriptions.

**Parameters:**
- `$tags` (array) - List of allowed tags.

**Return:** (array) List of allowed tags.

---

## fluent_booking/author_photo

Filters the URL of the author/host photo displayed on landing pages.

**Parameters:**
- `$photo_url` (string) - The photo URL.
- `$author_id` (int) - The host's WordPress user ID.

**Return:** (string) Modified photo URL.
