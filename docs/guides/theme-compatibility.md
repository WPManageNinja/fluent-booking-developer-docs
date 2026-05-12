---
title: Theme Compatibility
description: Make sure FluentBooking pages render correctly with your WordPress theme.
---

# Theme Compatibility

FluentBooking renders the public booking flow (calendar landing, event landing, booking confirmation) using its own templates. Most themes work out of the box, but a few common patterns conflict.

## How FluentBooking Renders Public Pages

The plugin detects requests for booking, calendar, and event landing URLs and routes them through its own template chain. The public bundle is enqueued as `fluent-booking-public` (plus per-feature handles like `fluent-booking-team`, `fluent-booking-calendar`, `fluent-booking-phone-field`).

The public landing page vars are filterable for theme integration:

```php
add_filter('fluent_booking/event_landing_page_vars', function ($data, $calendar, $calendarEvent, $existingBooking) {
    // $data is the array of vars handed to the public bundle
    // Mutate $data here to alter what the booking widget sees.
    return $data;
}, 10, 4);
```

## Common Conflicts

### Theme always renders a sidebar / off-canvas menu

If your theme always wraps content in a sidebar wrapper, the booking widget may render inside an unexpected container.

**Fix:** Remove the theme's wrapping action from the booking landing page using the WordPress `template_redirect` hook combined with a request inspection (e.g., check `$_GET['fluent-calendar']` or your landing-page slug).

### Theme overrides FluentBooking CSS

Theme styles can override the booking widget styles when enqueued later. Boost FluentBooking-related styles' priority:

```php
add_action('wp_enqueue_scripts', function () {
    wp_enqueue_style(
        'fluent-booking-overrides',
        plugin_dir_url(__FILE__) . 'overrides.css',
        ['fluent-booking-public'],
        '1.0'
    );
}, 999);
```

### Page builder container widths (Elementor, Bricks, etc.)

Some page builders wrap content in fixed-width containers. The booking widget needs at least 360 px of width to render the calendar.

**Fix:** Use the page builder's "Full Width" template, or place the booking shortcode inside a 100%-width section.

## Filtering the Public Layout

For deeper control, use the matching action / filter hooks documented in [Action Hooks → Landing Pages & Display](/hooks/actions/landing-pages-and-display) and [Filter Hooks → Display & Templates](/hooks/filters/display-and-templates).

A few hooks worth knowing:

| Hook | Type | Purpose |
| --- | --- | --- |
| `fluent_booking/event_landing_page_vars` | filter, 4 args | Edit the data array passed into the event landing page. |
| `fluent_booking/booking_confirmation_page_vars` | filter | Edit the booking confirmation page vars. |
| `fluent_booking/before_calendar_event_landing_page` | action | Fires just before the event landing page renders. |
| `fluent_booking/after_calendar_event_landing_page` | action | Fires just after. |
| `fluent_booking/main_landing_head` / `main_landing_footer` | action | Inject markup into the head/footer of the main landing page. |
| `fluent_booking/author_landing_head` / `author_landing_footer` | action | Same, for the author/team landing pages. |
| `fluent_booking/booking_confirmation_footer` | action | Fires at the bottom of the booking confirmation page. |

## Headless / Decoupled Sites

For headless WordPress (Next.js, Astro, etc.), drive the booking flow via the REST API. See the [REST API Overview](/rest-api/) for endpoint reference and authentication setup.

## Smoke-Test Checklist

1. Visit a calendar landing URL on the front end.
2. Open DevTools → Console — check for theme-injected JS errors.
3. Confirm the booking widget renders at full width.
4. Confirm the date picker is clickable (theme overlays sometimes intercept clicks).
5. Submit a test booking and verify the confirmation page renders.

If any step fails, isolate the conflicting theme component using the snippets above.
