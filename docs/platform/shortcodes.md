---
title: Shortcodes & AJAX
description: Source-verified shortcode and AJAX endpoint reference for FluentBooking.
---

# Shortcodes & AJAX

Shortcodes are registered in the front-end handlers with `add_shortcode()`; the attribute defaults below are the ones `shortcode_atts()` applies, so an attribute missing from a shortcode falls back to the value shown.

## Shortcodes

| Shortcode | Edition | Attributes | Handler |
| --- | --- | --- | --- |
| [`[fluent_booking]`](#fluentbooking) | Core | `id`, `theme`, `disable_author`, `hash` | `FrontEndHandler@handleBookingShortcode` |
| [`[fluent_booking_calendar]`](#fluentbookingcalendar) | Core | `calendar_id`, `event_ids`, `title`, `description`, `logo`, `hide_info` | `FrontEndHandler@handleCalendarShortcode` |
| [`[fluent_booking_lists]`](#fluentbookinglists) | Core | `title`, `filter`, `pagination`, `period`, `calendar_ids`, `no_bookings`, `per_page` | `FrontEndHandler@handleBookingListsShortcode` |
| [`[fluent_booking_panel]`](#fluentbookingpanel) | <span class="pro-badge">PRO</span> | — | `FrontendRenderer@renderFrontendShortcode` |
| [`[fluent_booking_receipt]`](#fluentbookingreceipt) | Core | — | `FrontEndHandler@handleReceiptShortcode` |
| [`[fluent_booking_team]`](#fluentbookingteam) | Core | `event_ids`, `title`, `description`, `logo_url` | `FrontEndHandler@handleTeamShortcode` |

<a id="fluentbooking"></a>

## `[fluent_booking]`

- **Edition:** Core
- **Handler:** `FrontEndHandler@handleBookingShortcode`
- **Source:** `fluent-booking/app/Hooks/Handlers/FrontEndHandler.php:28`

| Attribute | Default |
| --- | --- |
| `id` | `0` |
| `theme` | `light` |
| `disable_author` | `no` |
| `hash` | `""` |

```text
[fluent_booking id="12" theme="light"]
```

<a id="fluentbookingcalendar"></a>

## `[fluent_booking_calendar]`

- **Edition:** Core
- **Handler:** `FrontEndHandler@handleCalendarShortcode`
- **Source:** `fluent-booking/app/Hooks/Handlers/FrontEndHandler.php:32`

| Attribute | Default |
| --- | --- |
| `calendar_id` | `""` |
| `event_ids` | `""` |
| `title` | `""` |
| `description` | `""` |
| `logo` | `""` |
| `hide_info` | `false` |

```text
[fluent_booking_calendar calendar_id="12" event_ids="12"]
```

<a id="fluentbookinglists"></a>

## `[fluent_booking_lists]`

- **Edition:** Core
- **Handler:** `FrontEndHandler@handleBookingListsShortcode`
- **Source:** `fluent-booking/app/Hooks/Handlers/FrontEndHandler.php:34`

| Attribute | Default |
| --- | --- |
| `title` | `My Bookings` |
| `filter` | `show` |
| `pagination` | `show` |
| `period` | `all` |
| `calendar_ids` | `all` |
| `no_bookings` | `No bookings found` |
| `per_page` | `10` |

```text
[fluent_booking_lists title="My Bookings" filter="show"]
```

<a id="fluentbookingpanel"></a>

## `[fluent_booking_panel]`

- **Edition:** <span class="pro-badge">PRO</span>
- **Handler:** `FrontendRenderer@renderFrontendShortcode`
- **Source:** `fluent-booking-pro/app/Hooks/Handlers/FrontendRenderer.php:79`

This shortcode takes no attributes.

<a id="fluentbookingreceipt"></a>

## `[fluent_booking_receipt]`

- **Edition:** Core
- **Handler:** `FrontEndHandler@handleReceiptShortcode`
- **Source:** `fluent-booking/app/Hooks/Handlers/FrontEndHandler.php:36`

This shortcode takes no attributes.

<a id="fluentbookingteam"></a>

## `[fluent_booking_team]`

- **Edition:** Core
- **Handler:** `FrontEndHandler@handleTeamShortcode`
- **Source:** `fluent-booking/app/Hooks/Handlers/FrontEndHandler.php:30`

| Attribute | Default |
| --- | --- |
| `event_ids` | `""` |
| `title` | `""` |
| `description` | `""` |
| `logo_url` | `""` |

```text
[fluent_booking_team event_ids="12" title="value"]
```

## AJAX actions

The public booking form posts to `admin-ajax.php`. An action listed as reachable by guests is registered for `wp_ajax_nopriv_` as well — it is how an unauthenticated visitor books.

| Action | Guests | Edition | Handler | Source |
| --- | --- | --- | --- | --- |
| `fcal_cancel_meeting` | Yes | Core | `FrontEndHandler@ajaxHandleCancelMeeting` | `fluent-booking/app/Hooks/Handlers/FrontEndHandler.php:41` |
| `fluent_booking_apply_bulk_coupons` | Yes | <span class="pro-badge">PRO</span> | `CouponModule@ajaxApplyBulkCoupons` | `fluent-booking-pro/app/Modules/Coupon/CouponModule.php:46` |
| `fluent_booking_apply_coupon` | Yes | <span class="pro-badge">PRO</span> | `CouponModule@ajaxApplyCoupon` | `fluent-booking-pro/app/Modules/Coupon/CouponModule.php:43` |
| `fluent_booking_file_delete` | Yes | <span class="pro-badge">PRO</span> | `UploadHandler@handleFileDelete` | `fluent-booking-pro/app/Hooks/Handlers/UploadHandler.php:27` |
| `fluent_booking_file_upload` | Yes | <span class="pro-badge">PRO</span> | `UploadHandler@handleFileUpload` | `fluent-booking-pro/app/Hooks/Handlers/UploadHandler.php:25` |
| `fluent_booking_g_auth` | No | <span class="pro-badge">PRO</span> | `Bootstrap@handleAuthCallback` | `fluent-booking-pro/app/Services/Integrations/Calendars/Google/Bootstrap.php:30` |
| `fluent_booking_outlook_auth` | No | <span class="pro-badge">PRO</span> | `Bootstrap@handleAuthCallback` | `fluent-booking-pro/app/Services/Integrations/Calendars/Outlook/Bootstrap.php:32` |
| `fluent_cal_confirm_stripe_payment` | Yes | <span class="pro-badge">PRO</span> | `Stripe@confirmStripePayment` | `fluent-booking-pro/app/Services/Integrations/PaymentMethods/Stripe/Stripe.php:36` |
| `fluent_cal_get_available_dates` | Yes | Core | `FrontEndHandler@ajaxGetAvailableDates` | `fluent-booking/app/Hooks/Handlers/FrontEndHandler.php:44` |
| `fluent_cal_schedule_meeting` | Yes | Core | `FrontEndHandler@ajaxScheduleMeeting` | `fluent-booking/app/Hooks/Handlers/FrontEndHandler.php:38` |
| `get_calendar_events` | No | Core | `ElementorIntegration@ajaxGetCalendarEvents` | `fluent-booking/app/Services/Integrations/Elementor/ElementorIntegration.php:22` |
| `get_event_hash` | No | Core | `ElementorIntegration@ajaxGetEventHash` | `fluent-booking/app/Services/Integrations/Elementor/ElementorIntegration.php:24` |
