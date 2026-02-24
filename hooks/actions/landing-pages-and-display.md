# Landing Pages & Display Action Hooks

These hooks allow you to inject content or logic into the frontend booking interface and landing pages.

## fluent_booking/before_calendar_event_landing_page

Fires at the start of the calendar event landing page rendering.

**Parameters:**
- `$calendar_event` (object) - The calendar event/slot object being displayed.

**Example Usage:**
```php
add_action('fluent_booking/before_calendar_event_landing_page', function($calendar_event) {
    // Add custom content or logic before the landing page content
    $event_title = $calendar_event->title;
}, 10, 1);
```

**Location:** `app/Views/landing/booking.php`

---

## fluent_booking/after_calendar_event_landing_page

Fires after the main content of the calendar event landing page.

**Parameters:**
- `$calendar_event` (object) - The calendar event/slot object being displayed.

**Example Usage:**
```php
add_action('fluent_booking/after_calendar_event_landing_page', function($calendar_event) {
    // Add custom content or tracking scripts after the booking form
}, 10, 1);
```

**Location:** `app/Views/landing/booking.php`

---

## fluent_booking/landing_page_route_{route}

Dynamic hook for custom landing page routes.

**Parameters:**
- `$request` (object) - The current request object.

**Example Usage:**
```php
add_action('fluent_booking/landing_page_route_custom_page', function($request) {
    // Handle custom routing for landing pages
}, 10, 1);
```

**Location:** `app/Services/LandingPage/LandingPageHandler.php`

---

## fluent_booking/author_landing_head

Fires within the `<head>` section of the author/host landing page.

**Parameters:**
- `$calendar_event` (object) - The calendar event/slot object being displayed.

**Example Usage:**
```php
add_action('fluent_booking/author_landing_head', function($calendar_event) {
    // Inject custom CSS or meta tags for the host page
    echo '<style>.host-bio { color: blue; }</style>';
}, 10, 1);
```

**Location:** `app/Views/landing/booking.php`

---

## fluent_booking/author_landing_footer

Fires before the `</body>` tag of the author/host landing page.

**Parameters:**
- `$calendar_event` (object) - The calendar event/slot object being displayed.

**Example Usage:**
```php
add_action('fluent_booking/author_landing_footer', function($calendar_event) {
    // Inject custom scripts for the host page
}, 10, 1);
```

**Location:** `app/Views/landing/booking.php`

---

## fluent_booking/booking_confirmation_footer

Fires at the bottom of the booking confirmation page.

**Parameters:**
- `$booking` (object) - The booking model object.

**Example Usage:**
```php
add_action('fluent_booking/booking_confirmation_footer', function($booking) {
    // Add custom links or conversion tracking on confirmation page
    $booking_id = $booking->id;
}, 10, 1);
```

**Location:** `app/Views/public/booking_confirmation.php`

---

## fluent_booking/front_head

Fires within the `<head>` section of common public booking pages.

**Example Usage:**
```php
add_action('fluent_booking/front_head', function() {
    // Global styles for booking interface
});
```

---

## fluent_booking/front_footer

Fires before the `</body>` tag of common public booking pages.

**Example Usage:**
```php
add_action('fluent_booking/front_footer', function() {
    // Global scripts for booking interface
});
```

---

## fluent_booking/main_landing

Fires at the main landing page of Fluent Booking.

**Example Usage:**
```php
add_action('fluent_booking/main_landing', function() {
    // Custom logic for main landing page
});
```

---

## fluent_booking/main_landing_footer

Fires at the footer of the main landing page.

**Example Usage:**
```php
add_action('fluent_booking/main_landing_footer', function() {
    // Custom footer content for main landing
});
```
