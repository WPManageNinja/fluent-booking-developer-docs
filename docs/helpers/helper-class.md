---
title: Helper Class Reference
description: Catalog of static methods on FluentBooking\App\Services\Helper.
---

# Helper Class Reference

`FluentBooking\App\Services\Helper` is the catch-all static service used across controllers, services, and hooks. Every method listed below is verified against the current source.

> Source: `fluent-booking/app/Services/Helper.php`

## Meta Access

Polymorphic meta storage in `fcal_meta` (`object_type`, `object_id`, `key`, `value`). Used for calendars, calendar events, availability, and Pro webhooks.

| Method | Signature | Notes |
| --- | --- | --- |
| `getMeta` | `getMeta($group, $objectId, $key, $withModel = false)` | Returns the stored value (or the `Meta` model when `$withModel = true`). |
| `updateMeta` | `updateMeta($group, $objectId, $key, $value)` | Creates or updates the meta row. |
| `deleteMeta` | `deleteMeta($group, $objectId, $key)` | Deletes the matching meta row. |

Booking-form answers live in a dedicated table (`fcal_booking_meta`) with `booking_id`, `meta_key`, and `value`:

| Method | Signature |
| --- | --- |
| `getBookingMeta` | `getBookingMeta($bookingId, $metaKey, $withModel = false)` |
| `updateBookingMeta` | `updateBookingMeta($bookingId, $metaKey, $value)` |

## URL Builders

| Method | Purpose |
| --- | --- |
| `getAppBaseUrl($extension = '')` | Returns the admin app base URL. |
| `getAdminBookingUrl($bookingId)` | Deep link to a booking inside the admin app. |
| `getUpgradeUrl()` | Pro upgrade landing URL. |
| `getBookingReceiptLandingBaseUrl()` | Base URL used for payment receipt landing pages. |

## Settings

| Method | Purpose |
| --- | --- |
| `getGlobalSettings($settingsKey = null)` | Reads the plugin's global settings option. Pass a key to fetch a single value. |
| `getGlobalAdminSetting($key = null, $default = null)` | Reads the admin-area settings (separate option). |
| `getGlobalModuleSettings($cached = true)` | Returns the per-module feature flags. |
| `updateGlobalModuleSettings($settings = [])` | Persists module feature flags. |
| `isModuleEnabled($module)` | True when the named module is enabled. |
| `getPrefSettings($cached = true)` | Returns user preferences. |
| `getFeatures()` | Returns the feature flag matrix. |

## Encryption

Symmetric encryption used for integration credentials.

| Method | Signature |
| --- | --- |
| `encryptKey($value)` | Encrypts and returns the cipher text. |
| `decryptKey($raw_value)` | Decrypts back to plain text. |

## Slug & Identifier Helpers

| Method | Purpose |
| --- | --- |
| `isCalendarSlugAvailable($slug, $checkDb = true, $exceptId = false)` | Validates a calendar slug. |
| `isEventSlugAvailable($slug, $checkDb = true, $calendarId = null, $exceptId = null)` | Validates an event slug. |
| `generateSlotSlug($default, $calendar)` | Generates a unique event slug for a calendar. |
| `getNextBookingGroup()` | Returns the next `group_id` for grouped bookings. |
| `getNextIndex()` | Returns the next sequential index. |

## User Display

| Method | Purpose |
| --- | --- |
| `getUserDisplayName($userId = null)` | Returns the WP display name for the given user (defaults to current). |
| `getDisplayNameFromUser($user)` | Same, but accepts a `WP_User` instance. |
| `getUserEmail($userId = null)` | Returns the user's email. |
| `fluentBookingUserAvatar($id_or_email, $args)` | Renders an avatar HTML string. |

## Sanitization

| Method | Purpose |
| --- | --- |
| `fluentbookingSanitizer($input, $attribute = null, $fields = [])` | Field-level sanitizer used by request handlers. |
| `fcal_sanitize_html($html)` | Whitelists allowed HTML for FluentBooking rendering. |
| `fcal_backend_sanitizer($inputs, $sanitizeMap = [])` | Bulk sanitizer driven by a field map. |

## Editor & Shortcodes

| Method | Purpose |
| --- | --- |
| `getCustomFieldTypes()` | Returns the catalog of booking-form field types. Filterable via `fluent_booking/custom_fields_types`. |
| `getEditorShortCodes($calendarEvent = null, $isHtmlSupported = false, $iframeHtml = '')` | Returns the grouped shortcode catalog used in the editor side panel. |
| `getDefaultTermsAndConditions()` | Default terms-and-conditions text. |
| `getDefaultEmailNotificationSettings()` | Default email notification matrix. |
| `getAddToCalendarHtml($assetUrl = '')` | HTML block with add-to-calendar buttons. |
| `getConfirmAndRejectButton($assetUrl = '')` | HTML for host confirm/reject buttons in emails. |
| `getIframeHtml()` | Returns the iframe embed snippet for the booking page. |

## Booking Configuration

| Method | Purpose |
| --- | --- |
| `getMeetingDurations()` | Default meeting durations. |
| `getMeetingMultiDurations()` | Multi-duration option list. |
| `getDurationLookup($multiDuration = false)` | Map of duration value → label. |
| `formatDuration($totalMinutes)` | Returns "1 hour 30 minutes" style text. |
| `getBufferTimes()` | Buffer-time option list. |
| `getSlotIntervals()` | Slot interval options. |
| `getBookingStatusChangingTimes()` | Allowed reschedule/cancel cutoff options. |
| `getBookingPeriodOptions()` | Booking-period dropdown options. |
| `getWeekSelectTimes()` | Weekly schedule time picker options. |
| `getOverrideSelectTimes()` | Override schedule time picker options. |
| `getWeeklyScheduleSchema()` | Default weekly schedule schema. |
| `getDefaultBookingFilters()` | Default booking list filters. |
| `getDefaultPaginations()` | Default per-page values. |
| `getDefaultTimeFormat()` | Returns the configured time format. |
| `getEventColors()` | Event color palette. |

## Payments (Pro contexts)

| Method | Purpose |
| --- | --- |
| `getGlobalPaymentSettings()` | Returns the global payment configuration. |
| `isPaymentEnabled($calendarEvent = null)` | True if payments are enabled for the (optional) event. |
| `isPaymentConfigured($method = 'stripe')` | True if the given gateway is connected. |

## Misc

| Method | Purpose |
| --- | --- |
| `getIp($default = '127.0.0.1')` | Returns the current request IP. |
| `getVerifiedSenders()` | Returns the verified sender email list. |
| `getActiveThemeName()` | WordPress active theme name. |
| `fluentbooking_is_rtl()` | True for RTL locales. |
| `excerpt($text, $max_length = 160)` | Truncates text safely. |
| `fcalImplodeRecursive($glue, array $array)` | Recursive implode. |
| `debugLog($data)` | Writes data to the debug log when `WP_DEBUG` is enabled. |

## Notes

- Do not call meta helpers before plugin bootstrap finishes.
- Method names not listed here may exist but are internal; treat anything outside this catalog as private and subject to change.
- Pro adds `FluentBookingPro\App\Services\Helper` with Pro-specific helpers — inspect that file directly when working with Pro features.
