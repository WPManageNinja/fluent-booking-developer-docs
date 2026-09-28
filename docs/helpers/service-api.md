---
title: Service API Index
description: Complete, source-parsed method index for the FluentBooking helper and service classes.
---

# Service API Index

Every public method on the helper and service classes integrators call directly, parsed from the plugin source. The [Helper Class Reference](/helpers/helper-class) groups the most useful ones with notes; this page is the complete list.

## Classes

| Class | Methods | Purpose |
| --- | --- | --- |
| [`Helper`](#helper) | 68 | Catch-all static service: meta access, URL builders, settings, encryption, sanitization, and lookups. |
| [`DateTimeHelper`](#datetimehelper) | 25 | Timezone-aware datetime conversion, formatting, and slot math. |
| [`LocationService`](#locationservice) | 6 | Meeting location types, their settings shape, and their rendered output. |
| [`PermissionManager`](#permissionmanager) | 14 | Capability checks for hosts, admins, and the REST policies. |
| [`BookingFieldService`](#bookingfieldservice) | 12 | Booking-form field definitions, validation, and stored answers. |
| [`EditorShortCodeParser`](#editorshortcodeparser) | 1 | Smartcode parsing used by email templates and landing pages. |

## Helper

`FluentBooking\App\Services\Helper` — `fluent-booking/app/Services/Helper.php`

| Method | Signature | Line |
| --- | --- | --- |
| `isCalendarSlugAvailable` | `static isCalendarSlugAvailable($slug, $checkDb = true, $exceptId = false)` | 620 |
| `isEventSlugAvailable` | `static isEventSlugAvailable($slug, $checkDb = true, $calendarId = null, $exceptId = null)` | 652 |
| `getAppBaseUrl` | `static getAppBaseUrl($extension = '')` | 688 |
| `getAdminBookingUrl` | `static getAdminBookingUrl($bookingId)` | 693 |
| `getUpgradeUrl` | `static getUpgradeUrl($content = 'upgrade_page', $overrides = [])` | 713 |
| `getNextBookingGroup` | `static getNextBookingGroup()` | 736 |
| `getNextIndex` | `static getNextIndex()` | 747 |
| `getGlobalPaymentSettings` | `static getGlobalPaymentSettings()` | 756 |
| `isPaymentEnabled` | `static isPaymentEnabled($calendarEvent = null)` | 769 |
| `isPaymentConfigured` | `static isPaymentConfigured($method = 'stripe')` | 792 |
| `fluentbookingSanitizer` | `static fluentbookingSanitizer($input, $attribute = null, $fields = [])` | 806 |
| `getMeta` | `static getMeta($group, $objectId, $key, $withModel = false)` | 835 |
| `updateMeta` | `static updateMeta($group, $objectId, $key, $value)` | 853 |
| `deleteMeta` | `static deleteMeta($group, $objectId, $key)` | 871 |
| `getBookingMeta` | `static getBookingMeta($eventId, $metaKey, $withModel = false)` | 879 |
| `updateBookingMeta` | `static updateBookingMeta($eventId, $metaKey, $value)` | 892 |
| `getUserDisplayName` | `static getUserDisplayName($userId = null)` | 909 |
| `getDisplayNameFromUser` | `static getDisplayNameFromUser($user)` | 924 |
| `getUserEmail` | `static getUserEmail($userId = null)` | 944 |
| `excerpt` | `static excerpt($text, $max_length = 160)` | 957 |
| `generateSlotSlug` | `static generateSlotSlug($default, $calendar)` | 973 |
| `getIp` | `static getIp($defalt = '127.0.0.1')` | 990 |
| `resolveClientIp` | `static resolveClientIp($serverData)` | 1021 |
| `isValidPhoneNumber` | `static isValidPhoneNumber($phone)` | 1049 |
| `fcal_sanitize_html` | `static fcal_sanitize_html($html)` | 1158 |
| `fcal_backend_sanitizer` | `static fcal_backend_sanitizer($inputs, $sanitizeMap = [])` | 1228 |
| `fcalImplodeRecursive` | `static fcalImplodeRecursive($glue, array $array)` | 1258 |
| `getEventColors` | `static getEventColors()` | 1276 |
| `getMeetingDurations` | `static getMeetingDurations()` | 1314 |
| `getMeetingMultiDurations` | `static getMeetingMultiDurations()` | 1340 |
| `getDurationLookup` | `static getDurationLookup($multiDuration = false)` | 1398 |
| `formatDuration` | `static formatDuration($totalMinutes)` | 1410 |
| `getBufferTimes` | `static getBufferTimes()` | 1435 |
| `getSlotIntervals` | `static getSlotIntervals()` | 1481 |
| `getBookingStatusChangingTimes` | `static getBookingStatusChangingTimes()` | 1535 |
| `getBookingPeriodOptions` | `static getBookingPeriodOptions()` | 1593 |
| `getWeekSelectTimes` | `static getWeekSelectTimes()` | 1604 |
| `getOverrideSelectTimes` | `static getOverrideSelectTimes()` | 1613 |
| `getWeeklyScheduleSchema` | `static getWeeklyScheduleSchema()` | 1622 |
| `getCustomFieldTypes` | `static getCustomFieldTypes()` | 1666 |
| `getDefaultTermsAndConditions` | `static getDefaultTermsAndConditions()` | 1728 |
| `getDefaultEmailNotificationSettings` | `static getDefaultEmailNotificationSettings()` | 1735 |
| `getAddToCalendarHtml` | `static getAddToCalendarHtml($assetUrl = '')` | 1857 |
| `getConfirmAndRejectButton` | `static getConfirmAndRejectButton($assetUrl = '')` | 1866 |
| `getIframeHtml` | `static getIframeHtml()` | 1875 |
| `getEditorShortCodes` | `static getEditorShortCodes($calendarEvent = null, $isHtmlSupported = false, $iframeHtml = '')` | 1882 |
| `encryptKey` | `static encryptKey($value)` | 2080 |
| `decryptKey` | `static decryptKey($raw_value)` | 2110 |
| `debugLog` | `static debugLog($data)` | 2151 |
| `getGlobalSettings` | `static getGlobalSettings($settingsKey = null)` | 2158 |
| `getGlobalAdminSetting` | `static getGlobalAdminSetting($key = null, $default = null)` | 2233 |
| `getDefaultTimeFormat` | `static getDefaultTimeFormat()` | 2255 |
| `getDefaultBookingFilters` | `static getDefaultBookingFilters()` | 2268 |
| `getDefaultPaginations` | `static getDefaultPaginations()` | 2278 |
| `getVerifiedSenders` | `static getVerifiedSenders()` | 2288 |
| `getBookingReceiptLandingBaseUrl` | `static getBookingReceiptLandingBaseUrl()` | 2304 |
| `getGlobalModuleSettings` | `static getGlobalModuleSettings($cached = true)` | 2309 |
| `updateGlobalModuleSettings` | `static updateGlobalModuleSettings($settings = [])` | 2326 |
| `isModuleEnabled` | `static isModuleEnabled($module)` | 2337 |
| `fluentbooking_is_rtl` | `static fluentbooking_is_rtl()` | 2347 |
| `fluentBookingUserAvatar` | `static fluentBookingUserAvatar($id_or_email, $args)` | 2357 |
| `getPrefSettings` | `static getPrefSettings($cached = true)` | 2365 |
| `getPrefSettins` | `static getPrefSettins($cached = true)` | 2398 |
| `getFeatures` | `static getFeatures()` | 2403 |
| `getActiveThemeName` | `static getActiveThemeName()` | 2414 |
| `lockRoundRobinSlot` | `static lockRoundRobinSlot($event, $startTimeUtc, $endTimeUtc)` | 2438 |
| `checkRateLimit` | `static checkRateLimit($action, $limit, $window = 60, $perIp = true)` | 2463 |
| `dbTransaction` | `static dbTransaction($callback)` | 2501 |

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
| `sanitizePublicLocationSettings` | `static sanitizePublicLocationSettings($locationSettings)` | 230 |

## PermissionManager

`FluentBooking\App\Services\PermissionManager` — `fluent-booking/app/Services/PermissionManager.php`

| Method | Signature | Line |
| --- | --- | --- |
| `allPermissionSets` | `static allPermissionSets()` | 12 |
| `hasAllCalendarAccess` | `static hasAllCalendarAccess($readAccess = false)` | 26 |
| `canReadCalendar` | `static canReadCalendar($calendarId)` | 37 |
| `canUpdateCalendarEvent` | `static canUpdateCalendarEvent($slotId)` | 60 |
| `canWriteCalendar` | `static canWriteCalendar($calendarId)` | 79 |
| `canAssignHosts` | `static canAssignHosts($memberIds, $allowedIds)` | 107 |
| `hasCalendarAccess` | `static hasCalendarAccess($calendar)` | 119 |
| `currentUserHasAnyPermission` | `static currentUserHasAnyPermission()` | 126 |
| `userCan` | `static userCan($permissions)` | 135 |
| `canManageOtherHosts` | `static canManageOtherHosts()` | 167 |
| `getUserPermissions` | `static getUserPermissions($user = null, $formatted = false)` | 172 |
| `getMetaPermissions` | `static getMetaPermissions($userId = null)` | 235 |
| `getMenuPermission` | `static getMenuPermission()` | 257 |
| `userCanSeeAllBookings` | `static userCanSeeAllBookings()` | 287 |

## BookingFieldService

`FluentBooking\App\Services\BookingFieldService` — `fluent-booking/app/Services/BookingFieldService.php`

| Method | Signature | Line |
| --- | --- | --- |
| `getCustomFieldsData` | `static getCustomFieldsData($postedData, CalendarSlot $slot, $mappedKeys = null)` | 16 |
| `getBookingFields` | `static getBookingFields(CalendarSlot $calendarSlot, $cached = false)` | 82 |
| `getBookingFieldLabels` | `static getBookingFieldLabels(CalendarSlot $calendarSlot, $enabledOnly = false)` | 264 |
| `generateFieldName` | `static generateFieldName($calendarEvent, $fieldLabel)` | 280 |
| `maybeGenerateFieldName` | `static maybeGenerateFieldName($calendarEvent, $fieldValue)` | 299 |
| `getFormattedCustomBookingData` | `static getFormattedCustomBookingData(Booking $booking, $htmlSupport = true, $isPublic = false)` | 312 |
| `getCustomFields` | `static getCustomFields($calendarEvent, $withConfig = false)` | 356 |
| `getBookingFieldByName` | `static getBookingFieldByName($calendarEvent, $name)` | 380 |
| `hasPhoneNumberField` | `static hasPhoneNumberField($fields)` | 393 |
| `getUploadedFiles` | `static getUploadedFiles($fieldValue, $htmlSupport = true)` | 415 |
| `validateDateFields` | `static validateDateFields($customFieldsData, $calendarEvent)` | 433 |
| `sanitizeBookingFields` | `static sanitizeBookingFields($bookingFields, $calendarEvent = null)` | 463 |

## EditorShortCodeParser

`FluentBooking\App\Services\EditorShortCodeParser` — `fluent-booking/app/Services/EditorShortCodeParser.php`

| Method | Signature | Line |
| --- | --- | --- |
| `parse` | `static parse($parsable, $booking, $requireHtml = true)` | 24 |
