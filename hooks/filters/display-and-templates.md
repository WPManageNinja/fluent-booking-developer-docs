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

**Return:** (string) Modified HTML.

**Location:** `app/Services/Helper.php`

---

## fluent_booking/confirm_and_reject_button_html

Filters the HTML for the confirm and reject buttons shown in the admin/email interface.

**Parameters:**
- `$html` (string) - The button HTML.

**Return:** (string) Modified HTML.

**Location:** `app/Services/Helper.php`

---

## fluent_booking/booking_confirmation_page_title

Filters the browser page title for the booking confirmation page.

**Parameters:**
- `$title` (string) - The page title.
- `$calendarEvent` (object) - The calendar event/slot object.
- `$authorProfile` (array) - The host/author profile data.

**Return:** (string) Modified title.

**Location:** `app/Services/LandingPage/LandingPageHandler.php`

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
- `$photoUrl` (string) - The avatar URL from `get_avatar_url()`.
- `$args` (array) - The arguments passed to the avatar function (may contain `user_id`, `size`, etc.).

**Return:** (string) Modified photo URL.

**Location:** `app/Services/Helper.php`

---

## fluent_booking/host_view_page_vars

Filters the template variables passed to the host/author landing page.

**Parameters:**
- `$data` (array) - Array of template variables.
- `$calendar` (object) - The calendar object.
- `$activeEvents` (array) - The active events for this host.
- `$authorProfile` (array) - The host's profile data.

**Return:** (array) Modified template data.

**Location:** `app/Services/LandingPage/LandingPageHandler.php`

---

## fluent_booking/event_landing_page_vars

Filters the template variables passed to the event landing page.

**Parameters:**
- `$data` (array) - Array of template variables.
- `$calendar` (object) - The calendar object.
- `$calendarEvent` (object) - The calendar event/slot object.
- `$existingBooking` (object|null) - An existing booking object if rescheduling, or null.

**Return:** (array) Modified template data.

**Location:** `app/Services/LandingPage/LandingPageHandler.php`

---

## fluent_booking/calendar/sharing_settings

Filters the sharing settings for a calendar (used for landing page URLs and embed options).

**Parameters:**
- `$settings` (array) - The sharing settings.
- `$calendar` (object) - The calendar object.
- `$scope` (string) - The sharing context/scope.

**Return:** (array) Modified sharing settings.

**Location:** `app/Services/LandingPage/LandingPageHelper.php`

---

## fluent_booking/location_icon_heading_html

Filters the HTML for the location icon and heading displayed on the booking form.

**Parameters:**
- `$html` (string) - The location heading HTML.
- `$details` (array) - The location details data.
- `$calendarEvent` (object) - The calendar event object.

**Return:** (string) Modified HTML.

**Location:** `app/Services/LocationService.php`

---

## fluent_booking/payment_receipt_html

Filters the payment receipt HTML content.

**Parameters:**
- `$html` (string) - The receipt HTML (default: empty string).
- `$bookingHash` (string) - The booking hash identifier.

**Return:** (string) Modified receipt HTML.

**Location:** `app/Hooks/Handlers/FrontEndHandler.php`

---

## fluent_booking/get_iframe_html

Filters the HTML for the booking iframe embed.

**Parameters:**
- `$html` (string) - The iframe HTML.

**Return:** (string) Modified iframe HTML.

**Location:** `app/Services/Helper.php`

---

## fluent_booking/is_rtl

Filters whether the plugin should render in right-to-left (RTL) mode.

**Parameters:**
- `$isRtl` (bool) - Whether RTL mode is active (default: WordPress `is_rtl()`).

**Return:** (bool) Modified RTL flag.

**Location:** `app/Services/Helper.php`
