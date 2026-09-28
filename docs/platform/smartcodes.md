---
title: Smartcodes
description: Source-verified smartcode reference for FluentBooking email and template contexts.
---

# Smartcodes

Smartcodes are the <code v-pre>{{group.key}}</code> placeholders email templates, landing pages, and notification bodies are written with. 59 are declared in `Helper::getEditorShortCodes()`; a few more are derived per event at runtime.

Codes marked **HTML only** are offered exclusively in contexts that accept markup — a plain-text email body does not get them. The `##code##` form is used where a value has to survive being placed in an `href`.

## Groups

| Group | Key | Codes |
| --- | --- | --- |
| [Attendee Data](#guest) | `guest` | 9 |
| [Booking Data](#booking) | `booking` | 34 |
| [Host Data](#host) | `host` | 3 |
| [Other](#other) | `other` | 7 |
| [Payment Data](#payment) | `payment` | 6 |

<a id="guest"></a>

## Attendee Data

| Smartcode | Description | HTML only |
| --- | --- | --- |
| <code v-pre>{{guest.first_name}}</code> | Guest First Name | No |
| <code v-pre>{{guest.last_name}}</code> | Guest Last Name | No |
| <code v-pre>{{guest.full_name}}</code> | Guest Full Name | No |
| <code v-pre>{{guest.email}}</code> | Guest Email | No |
| <code v-pre>{{guest.note}}</code> | Guest Note | No |
| <code v-pre>{{booking.phone}}</code> | Guest Main Phone Number (if provided) | No |
| <code v-pre>{{guest.timezone}}</code> | Guest Timezone | No |
| <code v-pre>{{guest.total_guest}}</code> | Total Guest Count | No |
| <code v-pre>{{guest.form_data_html}}</code> | Guest Form Submitted Data (HTML) | Yes |

<a id="booking"></a>

## Booking Data

| Smartcode | Description | HTML only |
| --- | --- | --- |
| <code v-pre>{{booking.event_name}}</code> | Event Name | No |
| <code v-pre>{{booking.description}}</code> | Event Description | No |
| <code v-pre>{{booking.booking_title}}</code> | Booking Title | No |
| <code v-pre>{{booking.additional_guests}}</code> | Additional Guests | No |
| <code v-pre>{{booking.full_start_end_guest_timezone}}</code> | Full Start Date Time (with guest timezone) | No |
| <code v-pre>{{booking.full_start_end_host_timezone}}</code> | Full Start Date Time (with host timezone) | No |
| <code v-pre>{{booking.full_start_and_end_guest_timezone}}</code> | Full Start & End Date Time (with guest timezone) | No |
| <code v-pre>{{booking.full_start_and_end_host_timezone}}</code> | Full Start & End Date Time (with host timezone) | No |
| <code v-pre>{{booking.all_bookings_short_times_guest_timezone}}</code> | All Bookings Short Times (with guest timezone) | No |
| <code v-pre>{{booking.all_bookings_short_times_host_timezone}}</code> | All Bookings Short Times (with host timezone) | No |
| <code v-pre>{{booking.all_bookings_full_times_guest_timezone}}</code> | All Bookings Full Times (with guest timezone) | No |
| <code v-pre>{{booking.all_bookings_full_times_host_timezone}}</code> | All Bookings Full Times (with host timezone) | No |
| <code v-pre>{{booking.start_date_time}}</code> | Event Date Time (UTC) | No |
| <code v-pre>{{booking.start_date_time_for_attendee}}</code> | Event Date Time (with attendee timezone) | No |
| <code v-pre>{{booking.start_date_time_for_host}}</code> | Event Date Time (with host timezone) | No |
| <code v-pre>{{booking.start_date_time_for_attendee.format.Y-m-d}}</code> | Event Date Time (with attendee timezone) (Ex: 2024-05-20) | No |
| <code v-pre>{{booking.start_date_time_for_host.format.Y-m-d}}</code> | Event Date Time (with host timezone) (Ex: 2024-05-20) | No |
| <code v-pre>{{booking.location_details_text}}</code> | Event Location Details | No |
| <code v-pre>{{booking.cancel_reason}}</code> | Event Cancel Reason | No |
| <code v-pre>{{booking.start_time_human_format}}</code> | Event Start Time (ex: 2 hours from now) | No |
| <code v-pre>##booking.cancelation_url##</code> | Booking Cancellation URL | No |
| <code v-pre>##booking.reschedule_url##</code> | Booking Reschedule URL | No |
| <code v-pre>##booking.admin_booking_url##</code> | Booking Details Admin URL | No |
| <code v-pre>{{booking.source_url}}</code> | Source URL | No |
| <code v-pre>{{booking.utm_source}}</code> | UTM Source | No |
| <code v-pre>{{booking.utm_medium}}</code> | UTM Medium | No |
| <code v-pre>{{booking.utm_campaign}}</code> | UTM Campaign | No |
| <code v-pre>{{booking.utm_term}}</code> | UTM Term | No |
| <code v-pre>{{booking.utm_content}}</code> | UTM Content | No |
| <code v-pre>{{booking.booking_hash}}</code> | Unique Booking Hash | No |
| <code v-pre>{{booking.reschedule_reason}}</code> | Event Reschedule Reason | No |
| <code v-pre>{{booking.previous_meeting_date_time_host_timezone}}</code> | Previous Meeting Date & Time (with host timezone) | No |
| <code v-pre>{{booking.previous_meeting_date_time_guest_timezone}}</code> | Previous Meeting Date & Time (with guest timezone) | No |
| <code v-pre>{{booking.location_details_html}}</code> | Event Location Details (HTML) | Yes |

<a id="host"></a>

## Host Data

| Smartcode | Description | HTML only |
| --- | --- | --- |
| <code v-pre>{{host.name}}</code> | Host Name | No |
| <code v-pre>{{host.email}}</code> | Host Email | No |
| <code v-pre>{{host.timezone}}</code> | Host Timezone | No |

<a id="other"></a>

## Other

| Smartcode | Description | HTML only |
| --- | --- | --- |
| <code v-pre>{{event.id}}</code> | Event ID | No |
| <code v-pre>{{calendar.id}}</code> | Calendar ID | No |
| <code v-pre>{{event.title}}</code> | Event Title | No |
| <code v-pre>{{calendar.title}}</code> | Calendar Title | No |
| <code v-pre>{{calendar.description}}</code> | Calendar Description | No |
| <code v-pre>{{add_booking_to_calendar}}</code> | Add Booking to Calendar | No |
| <code v-pre>{{event.calendar_id}}</code> | Calendar ID | Yes |

<a id="payment"></a>

## Payment Data

| Smartcode | Description | HTML only |
| --- | --- | --- |
| <code v-pre>{{payment.payment_total}}</code> | Payment Total | No |
| <code v-pre>{{payment.payment_status}}</code> | Payment Status | No |
| <code v-pre>{{payment.payment_method}}</code> | Payment Method | No |
| <code v-pre>{{payment.currency}}</code> | Currency | No |
| <code v-pre>{{payment.payment_date}}</code> | Payment Date | No |
| <code v-pre>{{payment.receipt_html}}</code> | Payment Receipt (HTML) | Yes |

## Per-event codes

These are added to the list when an event is in context, so they depend on that event's configuration:

| Pattern | Notes |
| --- | --- |
| <code v-pre>{{booking.custom.&lt;field_key&gt;}}</code> | One per custom booking field on the event; date fields also get a `.format.Y-m-d` variant. |
| <code v-pre>{{team_member.&lt;n&gt;.name}} / {{team_member.&lt;n&gt;.email}}</code> | One pair per extra host on a multi-host event, numbered from 1. |

## Adding your own

The whole group map passes through [`fluent_booking/editor_shortcodes_groups`](/hooks/filters/miscellaneous#fluentbookingeditorshortcodesgroups), so an add-on can append a group or extra codes:

::: v-pre
```php
add_filter('fluent_booking/editor_shortcodes_groups', function ($groups, $calendarEvent, $isHtmlSupported) {
    $groups['my_addon'] = [
        'title'      => 'My Add-on',
        'key'        => 'my_addon',
        'shortcodes' => [
            '{{my_addon.reference}}' => 'Internal reference',
        ],
    ];

    return $groups;
}, 10, 3);
```
:::

Parsed from `fluent-booking/app/Services/Helper.php:1882`.
