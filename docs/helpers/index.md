---
title: Helpers
description: Overview of FluentBooking helper services.
---

# Helpers

FluentBooking exposes several static service classes used across the plugin. The most useful for integrators are listed below.

## `FluentBooking\App\Services\Helper`

General-purpose static helpers: meta access, URL builders, encryption, sanitization, settings, and lookups for editor data.

```php
use FluentBooking\App\Services\Helper;

Helper::getMeta('calendar', $calendarId, 'custom_key');
Helper::updateMeta('calendar', $calendarId, 'custom_key', $value);
Helper::getBookingMeta($bookingId, 'custom_field_company');
Helper::getAppBaseUrl();
Helper::getAdminBookingUrl($bookingId);
Helper::getGlobalSettings('default_timezone');
Helper::getIp();
```

See [Helper Class Reference](/helpers/helper-class) for the full method catalog.

## `FluentBooking\App\Services\DateTimeHelper`

Timezone-aware datetime conversion and formatting.

```php
use FluentBooking\App\Services\DateTimeHelper;

$utc       = DateTimeHelper::convertToUtc($localTime, $timezone);
$local     = DateTimeHelper::convertFromUtc($utcTime, $timezone);
$converted = DateTimeHelper::convertToTimeZone($dateTime, $fromTz, $toTz);
$readable  = DateTimeHelper::formatToLocale($dateTime, 'date');     // or 'time' / 'date_time'
$tz        = DateTimeHelper::getTimeZone();
```

## `FluentBooking\App\Services\LocationService`

Resolves and renders booking locations (in-person, Zoom, Google Meet, custom).

```php
use FluentBooking\App\Services\LocationService;

// Resolve location config for a calendar event
$details = LocationService::getLocationDetails($calendarEvent, $userInput = [], $allInput = []);

// Build the public booking URL for the location
$url     = LocationService::getBookingLocationUrl($booking);

// All locations available for a calendar event
$options = LocationService::getLocationOptions($calendarEvent, $keyed = false);
```

## `FluentBooking\App\Services\PermissionManager`

Centralizes capability checks. Policy classes route through this service.

```php
use FluentBooking\App\Services\PermissionManager;

PermissionManager::userCan(['fcal_manage_bookings']);
PermissionManager::canReadCalendar($calendarId);
PermissionManager::canWriteCalendar($calendarId);
PermissionManager::hasAllCalendarAccess($readAccess = false);
PermissionManager::userCanSeeAllBookings();
```

## `FluentBooking\App\Services\BookingFieldService`

Parses and renders the booking-form field schema configured per event.

```php
use FluentBooking\App\Services\BookingFieldService;

$fields  = BookingFieldService::getBookingFields($calendarSlot);
$labels  = BookingFieldService::getBookingFieldLabels($calendarSlot, $enabledOnly = true);
$rows    = BookingFieldService::getFormattedCustomBookingData($booking, $htmlSupport = true);
$parsed  = BookingFieldService::getCustomFieldsData($postedData, $calendarSlot);
```

## `FluentBooking\App\Services\EditorShortCodeParser`

Renders <span v-pre>`{{guest.first_name}}`</span> / <span v-pre>`{{booking.event_name}}`</span> style shortcodes against a booking. Used by email notifications, redirect URLs, and webhook payloads.

```php
use FluentBooking\App\Services\EditorShortCodeParser;

$parsed = EditorShortCodeParser::parse($template, $booking, $requireHtml = true);
```

The catalog of supported shortcodes is built by `Helper::getEditorShortCodes($calendarEvent, $isHtmlSupported)`.

## Next

- [Helper Class Reference](/helpers/helper-class) — the most-used methods, grouped with notes.
- [Service API Index](/helpers/service-api) — every public method on these classes, parsed from source.
