---
title: Code Snippets
description: Drop-in code examples for common FluentBooking customizations.
---

# Code Snippets

Snippets ready to drop into a custom plugin or your theme's `functions.php`. Every hook referenced is verified against the current FluentBooking source — see [Action Hooks](/hooks/actions/) and [Filter Hooks](/hooks/filters/) for the full inventory.

## Sync new bookings to a custom CRM

```php
add_action('fluent_booking/after_booking_scheduled', function ($booking, $calendarEvent) {
    // $booking       => FluentBooking\App\Models\Booking
    // $calendarEvent => FluentBooking\App\Models\CalendarSlot
    wp_remote_post('https://example.com/api/leads', [
        'headers' => ['Content-Type' => 'application/json'],
        'body'    => wp_json_encode([
            'email'    => $booking->email,
            'name'     => trim($booking->first_name . ' ' . $booking->last_name),
            'start'    => $booking->start_time,
            'event'    => $calendarEvent->title,
            'calendar' => $calendarEvent->calendar->title ?? '',
        ]),
    ]);
}, 10, 2);
```

`do_action('fluent_booking/after_booking_scheduled', $booking, $calendarEvent, $booking)` is fired across Pro payment flows and FluentCart bookings. Register your callback with `10, 2` — only the first two args are stable.

## Reject bookings outside business hours

`fluent_booking/booking_data` fires before persistence with four args: `($bookingData, $calendarSlot, $customFieldsData, $rawData)`.

```php
add_filter('fluent_booking/booking_data', function ($bookingData, $calendarSlot, $customFieldsData, $rawData) {
    $hour = (int) wp_date('G', strtotime($bookingData['start_time']));
    if ($hour < 9 || $hour >= 18) {
        wp_send_json([
            'message' => 'Bookings are only available between 9 AM and 6 PM.',
        ], 422);
    }
    return $bookingData;
}, 10, 4);
```

## Add a custom column to the bookings export CSV

```php
// Add the new column header / data per row
add_filter('fluent_booking/booking_export_row', function ($row, $booking) {
    $row['company'] = \FluentBooking\App\Services\Helper::getBookingMeta($booking->id, 'custom_field_company');
    return $row;
}, 10, 2);

// Optionally tweak the assembled rows (and inspect the booking collection)
add_filter('fluent_booking/booking_export_columns', function ($rows, $bookings) {
    // $rows is the assembled list, $bookings is the original collection
    return $rows;
}, 10, 2);
```

## Hide a calendar from a dropdown

`fluent_booking/calendar_options_by_title` filters a list shaped as `[ [ 'id' => 1, 'title' => 'Sales', 'options' => [ ['id' => 10, 'title' => '15 Min'], ... ] ], ... ]`. The items are plain arrays — there is no `slug` field, so filter by `id` or `title`.

```php
add_filter('fluent_booking/calendar_options_by_title', function ($calendars) {
    return array_values(array_filter($calendars, function ($calendar) {
        return $calendar['title'] !== 'Internal Calendar';
    }));
});
```

## Cancel a booking programmatically

Use the model method — there is no `BookingService::cancelBooking()` helper.

```php
use FluentBooking\App\Models\Booking;

$booking = Booking::find(123);
if ($booking) {
    $booking->cancelMeeting(
        'Cancelled by automation',
        'system',                    // $cancelledByType: 'guest', 'host', or 'system'
        get_current_user_id() ?: null // $cancelledByUserId
    );
}
```

To reject a pending booking, use `$booking->rejectMeeting($reason, $rejectByUserId)`.

## Send a Slack notification when a booking is cancelled

```php
add_action('fluent_booking/booking_schedule_cancelled', function ($booking, $calendarEvent) {
    wp_remote_post('https://hooks.slack.com/services/...', [
        'headers' => ['Content-Type' => 'application/json'],
        'body'    => wp_json_encode([
            'text' => sprintf(
                'Booking #%d cancelled — %s with %s',
                $booking->id,
                $booking->start_time,
                $booking->email
            ),
        ]),
    ]);
}, 10, 2);
```

## Customize available slots

`fluent_booking/available_slots_for_view` fires with five args: `($availableSpots, $calendarEvent, $calendar, $timeZone, $duration)`.

```php
add_filter('fluent_booking/available_slots_for_view', function ($slots, $calendarEvent, $calendar, $timeZone, $duration) {
    // Drop Monday slots for this event
    return array_filter($slots, function ($slot) {
        $dayOfWeek = (int) wp_date('N', strtotime($slot['start_time'] ?? ''));
        return $dayOfWeek !== 1;
    });
}, 10, 5);
```

## Add shortcodes to the editor's smart-code panel

`fluent_booking/editor_shortcodes_groups` fires with three args: `($groups, $calendarEvent, $isHtmlSupported)`. Each group keys to `{ title, key, shortcodes }`.

```php
add_filter('fluent_booking/editor_shortcodes_groups', function ($groups, $calendarEvent, $isHtmlSupported) {
    $groups['custom'] = [
        'title'      => 'Custom',
        'key'        => 'custom',
        'shortcodes' => [
            '{{custom.reference_id}}' => 'Internal Reference ID',
        ],
    ];
    return $groups;
}, 10, 3);
```

Adding a smart-code entry exposes it in the editor's side panel. To make the shortcode actually expand inside an email/redirect URL, your callback also needs to map the value when `EditorShortCodeParser::parse()` runs — typically via a separate integration or by feeding the value into the booking meta before the parser executes. There is no public "parse_shortcodes" filter in the current source; rely on `EditorShortCodeParser::parse($content, $booking, $requireHtml)` or override the email body before send through `fluent_booking/booking_data` and email-related hooks.

## Lookup helpers

```php
use FluentBooking\App\Services\Helper;

Helper::getBookingMeta($bookingId, 'custom_field_company');
Helper::getAdminBookingUrl($bookingId);
Helper::getGlobalSettings('default_timezone');
Helper::isPaymentEnabled($calendarEvent);
```

See [Helpers](/helpers/) for the full surface.
