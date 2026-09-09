---
title: Service API Index
description: Complete, source-parsed method index for the FluentBooking helper and service classes.
---

# Service API Index

Every public method on the helper and service classes integrators call directly, parsed from the plugin source. The [Helper Class Reference](/helpers/helper-class) groups the most useful ones with notes; this page is the complete list.

## Classes

| Class | Methods | Purpose |
| --- | --- | --- |
| [`Helper`](#helper) | 66 | Catch-all static service: meta access, URL builders, settings, encryption, sanitization, and lookups. |
| [`DateTimeHelper`](#datetimehelper) | 25 | Timezone-aware datetime conversion, formatting, and slot math. |
| [`LocationService`](#locationservice) | 5 | Meeting location types, their settings shape, and their rendered output. |
| [`PermissionManager`](#permissionmanager) | 12 | Capability checks for hosts, admins, and the REST policies. |
| [`BookingFieldService`](#bookingfieldservice) | 12 | Booking-form field definitions, validation, and stored answers. |
| [`EditorShortCodeParser`](#editorshortcodeparser) | 1 | Smartcode parsing used by email templates and landing pages. |

## Helper

`FluentBooking\App\Services\Helper` — `fluent-booking/app/Services/Helper.php`

| Method | Signature | Line |
| --- | --- | --- |
| `isCalendarSlugAvailable` | `static isCalendarSlugAvailable($slug, $checkDb = true, $exceptId = false)` | 619 |
| `isEventSlugAvailable` | `static isEventSlugAvailable($slug, $checkDb = true, $calendarId = null, $exceptId = null)` | 651 |
| `getAppBaseUrl` | `static getAppBaseUrl($extension = '')` | 687 |
| `getAdminBookingUrl` | `static getAdminBookingUrl($bookingId)` | 692 |
| `getUpgradeUrl` | `static getUpgradeUrl($content = 'upgrade_page', $overrides = [])` | 712 |
| `getNextBookingGroup` | `static getNextBookingGroup()` | 735 |
| `getNextIndex` | `static getNextIndex()` | 746 |
| `getGlobalPaymentSettings` | `static getGlobalPaymentSettings()` | 755 |
| `isPaymentEnabled` | `static isPaymentEnabled($calendarEvent = null)` | 768 |
| `isPaymentConfigured` | `static isPaymentConfigured($method = 'stripe')` | 791 |
| `fluentbookingSanitizer` | `static fluentbookingSanitizer($input, $attribute = null, $fields = [])` | 805 |
| `getMeta` | `static getMeta($group, $objectId, $key, $withModel = false)` | 834 |
| `updateMeta` | `static updateMeta($group, $objectId, $key, $value)` | 852 |
| `deleteMeta` | `static deleteMeta($group, $objectId, $key)` | 870 |
| `getBookingMeta` | `static getBookingMeta($eventId, $metaKey, $withModel = false)` | 878 |
| `updateBookingMeta` | `static updateBookingMeta($eventId, $metaKey, $value)` | 891 |
| `getUserDisplayName` | `static getUserDisplayName($userId = null)` | 908 |
| `getDisplayNameFromUser` | `static getDisplayNameFromUser($user)` | 923 |
| `getUserEmail` | `static getUserEmail($userId = null)` | 943 |
| `excerpt` | `static excerpt($text, $max_length = 160)` | 956 |
| `generateSlotSlug` | `static generateSlotSlug($default, $calendar)` | 972 |
| `getIp` | `static getIp($defalt = '127.0.0.1')` | 989 |
| `isValidPhoneNumber` | `static isValidPhoneNumber($phone)` | 1047 |
| `fcal_sanitize_html` | `static fcal_sanitize_html($html)` | 1156 |
| `fcal_backend_sanitizer` | `static fcal_backend_sanitizer($inputs, $sanitizeMap = [])` | 1226 |
| `fcalImplodeRecursive` | `static fcalImplodeRecursive($glue, array $array)` | 1256 |
| `getEventColors` | `static getEventColors()` | 1274 |
| `getMeetingDurations` | `static getMeetingDurations()` | 1312 |
| `getMeetingMultiDurations` | `static getMeetingMultiDurations()` | 1338 |
| `getDurationLookup` | `static getDurationLookup($multiDuration = false)` | 1396 |
| `formatDuration` | `static formatDuration($totalMinutes)` | 1408 |
| `getBufferTimes` | `static getBufferTimes()` | 1433 |
| `getSlotIntervals` | `static getSlotIntervals()` | 1479 |
| `getBookingStatusChangingTimes` | `static getBookingStatusChangingTimes()` | 1533 |
| `getBookingPeriodOptions` | `static getBookingPeriodOptions()` | 1591 |
| `getWeekSelectTimes` | `static getWeekSelectTimes()` | 1602 |
| `getOverrideSelectTimes` | `static getOverrideSelectTimes()` | 1611 |
| `getWeeklyScheduleSchema` | `static getWeeklyScheduleSchema()` | 1620 |
| `getCustomFieldTypes` | `static getCustomFieldTypes()` | 1664 |
| `getDefaultTermsAndConditions` | `static getDefaultTermsAndConditions()` | 1726 |
| `getDefaultEmailNotificationSettings` | `static getDefaultEmailNotificationSettings()` | 1733 |
| `getAddToCalendarHtml` | `static getAddToCalendarHtml($assetUrl = '')` | 1855 |
| `getConfirmAndRejectButton` | `static getConfirmAndRejectButton($assetUrl = '')` | 1864 |
| `getIframeHtml` | `static getIframeHtml()` | 1873 |
| `getEditorShortCodes` | `static getEditorShortCodes($calendarEvent = null, $isHtmlSupported = false, $iframeHtml = '')` | 1880 |
| `encryptKey` | `static encryptKey($value)` | 2077 |
| `decryptKey` | `static decryptKey($raw_value)` | 2107 |
| `debugLog` | `static debugLog($data)` | 2148 |
| `getGlobalSettings` | `static getGlobalSettings($settingsKey = null)` | 2155 |
| `getGlobalAdminSetting` | `static getGlobalAdminSetting($key = null, $default = null)` | 2230 |
| `getDefaultTimeFormat` | `static getDefaultTimeFormat()` | 2252 |
| `getDefaultBookingFilters` | `static getDefaultBookingFilters()` | 2265 |
| `getDefaultPaginations` | `static getDefaultPaginations()` | 2275 |
| `getVerifiedSenders` | `static getVerifiedSenders()` | 2285 |
| `getBookingReceiptLandingBaseUrl` | `static getBookingReceiptLandingBaseUrl()` | 2301 |
| `getGlobalModuleSettings` | `static getGlobalModuleSettings($cached = true)` | 2306 |
| `updateGlobalModuleSettings` | `static updateGlobalModuleSettings($settings = [])` | 2323 |
| `isModuleEnabled` | `static isModuleEnabled($module)` | 2334 |
| `fluentbooking_is_rtl` | `static fluentbooking_is_rtl()` | 2344 |
| `fluentBookingUserAvatar` | `static fluentBookingUserAvatar($id_or_email, $args)` | 2354 |
| `getPrefSettings` | `static getPrefSettings($cached = true)` | 2362 |
| `getPrefSettins` | `static getPrefSettins($cached = true)` | 2395 |
| `getFeatures` | `static getFeatures()` | 2400 |
| `getActiveThemeName` | `static getActiveThemeName()` | 2411 |
| `checkRateLimit` | `static checkRateLimit($action, $limit, $window = 60)` | 2431 |
| `dbTransaction` | `static dbTransaction($callback)` | 2469 |

## DateTimeHelper

`FluentBooking\App\Services\DateTimeHelper` — `fluent-booking/app/Services/DateTimeHelper.php`

| Method | Signature | Line |
| --- | --- | --- |
| `getTimeZones` | `static getTimeZones($grouped = false)` | 7 |
| `getFlatGroupedTimeZones` | `static getFlatGroupedTimeZones()` | 30 |
| `getTimeZone` | `static getTimeZone()` | 56 |
| `guessTimeZone` | `static guessTimeZone()` | 66 |
| `getValidatedTimeZone` | `static getValidatedTimeZone($requestedTimeZone)` | 77 |
| `convertToUtc` | `static convertToUtc($dateTime, $timezone, $format = 'Y-m-d H:i:s')` | 92 |
| `convertFromUtc` | `static convertFromUtc($dateTime, $timezone, $format = 'Y-m-d H:i:s')` | 101 |
| `convertToTimeZone` | `static convertToTimeZone($dateTime, $fromTimeZone, $toTimeZone, $format = 'Y-m-d H:i:s', $date = null)` | 113 |
| `getDateWithoutDST` | `static getDateWithoutDST($timezone)` | 131 |
| `convertToIso` | `static convertToIso($dateTime, $fromTimeZone = 'UTC')` | 139 |
| `convertFromIso` | `static convertFromIso($dateTime, $toTimeZone = 'UTC')` | 147 |
| `getIsoDurationInMinutes` | `static getIsoDurationInMinutes($duration)` | 155 |
| `getTimestamp` | `static getTimestamp($timezone = 'UTC')` | 166 |
| `formatToLocale` | `static formatToLocale($dateTime, $for = 'date')` | 175 |
| `getFormattedDate` | `static getFormattedDate($date, $from = '', $to = 'Y-m-d')` | 189 |
| `getAvailableDateFormats` | `static getAvailableDateFormats()` | 199 |
| `getFormattedEventTime` | `static getFormattedEventTime($eventTime)` | 224 |
| `convertPhpDateToDayJSFormay` | `static convertPhpDateToDayJSFormay($phpFormat)` | 237 |
| `getDateFormatter` | `static getDateFormatter($isDayJs = false)` | 317 |
| `getTimeFormatter` | `static getTimeFormatter($isDayJs = false)` | 327 |
| `getTodayDate` | `static getTodayDate($timezone = 'UTC', $format = 'Y-m-d')` | 337 |
| `getDayDifference` | `static getDayDifference($dateTime, $fromTimeZone, $toTimeZone, $refDate = 'now')` | 344 |
| `getDaylightSavingTime` | `static getDaylightSavingTime($timezone)` | 362 |
| `isDaylightSavingActive` | `static isDaylightSavingActive($dateTime, $timezone)` | 379 |
| `getI18nDateTimeConfig` | `static getI18nDateTimeConfig()` | 398 |

## LocationService

`FluentBooking\App\Services\LocationService` — `fluent-booking/app/Services/LocationService.php`

| Method | Signature | Line |
| --- | --- | --- |
| `getLocationIconHeadingHtml` | `static getLocationIconHeadingHtml($details = [], $calendarEvent = null)` | 11 |
| `getBookingLocationUrl` | `static getBookingLocationUrl(Booking $booking)` | 77 |
| `getLocationDetails` | `static getLocationDetails($calendarEvent, $userInput = [], $allInput = [])` | 92 |
| `getLocationsConfig` | `static getLocationsConfig()` | 184 |
| `getLocationOptions` | `static getLocationOptions($calendarEvent, $keyed = false)` | 189 |

## PermissionManager

`FluentBooking\App\Services\PermissionManager` — `fluent-booking/app/Services/PermissionManager.php`

| Method | Signature | Line |
| --- | --- | --- |
| `allPermissionSets` | `static allPermissionSets()` | 12 |
| `hasAllCalendarAccess` | `static hasAllCalendarAccess($readAccess = false)` | 26 |
| `canReadCalendar` | `static canReadCalendar($calendarId)` | 37 |
| `canUpdateCalendarEvent` | `static canUpdateCalendarEvent($slotId)` | 60 |
| `canWriteCalendar` | `static canWriteCalendar($calendarId)` | 79 |
| `hasCalendarAccess` | `static hasCalendarAccess($calendar)` | 98 |
| `currentUserHasAnyPermission` | `static currentUserHasAnyPermission()` | 105 |
| `userCan` | `static userCan($permissions)` | 114 |
| `getUserPermissions` | `static getUserPermissions($user = null, $formatted = false)` | 141 |
| `getMetaPermissions` | `static getMetaPermissions($userId = null)` | 204 |
| `getMenuPermission` | `static getMenuPermission()` | 226 |
| `userCanSeeAllBookings` | `static userCanSeeAllBookings()` | 256 |

## BookingFieldService

`FluentBooking\App\Services\BookingFieldService` — `fluent-booking/app/Services/BookingFieldService.php`

| Method | Signature | Line |
| --- | --- | --- |
| `getCustomFieldsData` | `static getCustomFieldsData($postedData, CalendarSlot $slot)` | 12 |
| `getBookingFields` | `static getBookingFields(CalendarSlot $calendarSlot, $cached = false)` | 67 |
| `getBookingFieldLabels` | `static getBookingFieldLabels(CalendarSlot $calendarSlot, $enabledOnly = false)` | 251 |
| `generateFieldName` | `static generateFieldName($calendarEvent, $fieldLabel)` | 267 |
| `maybeGenerateFieldName` | `static maybeGenerateFieldName($calendarEvent, $fieldValue)` | 286 |
| `getFormattedCustomBookingData` | `static getFormattedCustomBookingData(Booking $booking, $htmlSupport = true, $isPublic = false)` | 299 |
| `getCustomFields` | `static getCustomFields($calendarEvent, $withConfig = false)` | 338 |
| `getBookingFieldByName` | `static getBookingFieldByName($calendarEvent, $name)` | 362 |
| `hasPhoneNumberField` | `static hasPhoneNumberField($fields)` | 375 |
| `getUploadedFiles` | `static getUploadedFiles($fieldValue, $htmlSupport = true)` | 397 |
| `validateDateFields` | `static validateDateFields($customFieldsData, $calendarEvent)` | 415 |
| `sanitizeBookingFields` | `static sanitizeBookingFields($bookingFields, $calendarEvent = null)` | 445 |

## EditorShortCodeParser

`FluentBooking\App\Services\EditorShortCodeParser` — `fluent-booking/app/Services/EditorShortCodeParser.php`

| Method | Signature | Line |
| --- | --- | --- |
| `parse` | `static parse($parsable, $booking, $requireHtml = true)` | 24 |
