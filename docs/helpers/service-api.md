---
title: Service API Index
description: Complete, source-parsed method index for the FluentBooking helper and service classes.
---

# Service API Index

Every public method on the helper and service classes integrators call directly, parsed from the plugin source. The [Helper Class Reference](/helpers/helper-class) groups the most useful ones with notes; this page is the complete list.

## Classes

| Class | Methods | Purpose |
| --- | --- | --- |
| [`Helper`](#helper) | 71 | Catch-all static service: meta access, URL builders, settings, encryption, sanitization, and lookups. |
| [`DateTimeHelper`](#datetimehelper) | 25 | Timezone-aware datetime conversion, formatting, and slot math. |
| [`LocationService`](#locationservice) | 6 | Meeting location types, their settings shape, and their rendered output. |
| [`PermissionManager`](#permissionmanager) | 16 | Capability checks for hosts, admins, and the REST policies. |
| [`BookingFieldService`](#bookingfieldservice) | 12 | Booking-form field definitions, validation, and stored answers. |
| [`EditorShortCodeParser`](#editorshortcodeparser) | 1 | Smartcode parsing used by email templates and landing pages. |

## Helper

`FluentBooking\App\Services\Helper` — `fluent-booking/app/Services/Helper.php`

| Method | Signature | Line |
| --- | --- | --- |
| `flushRuntimeCache` | `static flushRuntimeCache()` | 35 |
| `isCalendarSlugAvailable` | `static isCalendarSlugAvailable($slug, $checkDb = true, $exceptId = false)` | 647 |
| `isEventSlugAvailable` | `static isEventSlugAvailable($slug, $checkDb = true, $calendarId = null, $exceptId = null)` | 679 |
| `getAppBaseUrl` | `static getAppBaseUrl($extension = '')` | 715 |
| `getAdminBookingUrl` | `static getAdminBookingUrl($bookingId)` | 720 |
| `getUpgradeUrl` | `static getUpgradeUrl($content = 'upgrade_page', $overrides = [])` | 740 |
| `getNextBookingGroup` | `static getNextBookingGroup()` | 763 |
| `getNextIndex` | `static getNextIndex()` | 774 |
| `getGlobalPaymentSettings` | `static getGlobalPaymentSettings()` | 783 |
| `isPaymentEnabled` | `static isPaymentEnabled($calendarEvent = null)` | 796 |
| `isPaymentConfigured` | `static isPaymentConfigured($method = 'stripe')` | 819 |
| `fluentbookingSanitizer` | `static fluentbookingSanitizer($input, $attribute = null, $fields = [])` | 833 |
| `getMeta` | `static getMeta($group, $objectId, $key, $withModel = false)` | 862 |
| `updateMeta` | `static updateMeta($group, $objectId, $key, $value)` | 880 |
| `deleteMeta` | `static deleteMeta($group, $objectId, $key)` | 898 |
| `getBookingMeta` | `static getBookingMeta($eventId, $metaKey, $withModel = false)` | 906 |
| `updateBookingMeta` | `static updateBookingMeta($eventId, $metaKey, $value)` | 919 |
| `getUserDisplayName` | `static getUserDisplayName($userId = null)` | 936 |
| `getDisplayNameFromUser` | `static getDisplayNameFromUser($user)` | 951 |
| `getUserEmail` | `static getUserEmail($userId = null)` | 971 |
| `excerpt` | `static excerpt($text, $max_length = 160)` | 984 |
| `generateSlotSlug` | `static generateSlotSlug($default, $calendar)` | 1000 |
| `getIp` | `static getIp($defalt = '127.0.0.1')` | 1017 |
| `resolveClientIp` | `static resolveClientIp($serverData)` | 1048 |
| `isValidPhoneNumber` | `static isValidPhoneNumber($phone)` | 1076 |
| `fcal_sanitize_html` | `static fcal_sanitize_html($html)` | 1185 |
| `fcal_backend_sanitizer` | `static fcal_backend_sanitizer($inputs, $sanitizeMap = [])` | 1250 |
| `fcalImplodeRecursive` | `static fcalImplodeRecursive($glue, array $array)` | 1280 |
| `getEventColors` | `static getEventColors()` | 1298 |
| `getMeetingDurations` | `static getMeetingDurations()` | 1336 |
| `getMeetingMultiDurations` | `static getMeetingMultiDurations()` | 1362 |
| `getDurationLookup` | `static getDurationLookup($multiDuration = false)` | 1420 |
| `formatDuration` | `static formatDuration($totalMinutes)` | 1432 |
| `getBufferTimes` | `static getBufferTimes()` | 1457 |
| `getSlotIntervals` | `static getSlotIntervals()` | 1503 |
| `getBookingStatusChangingTimes` | `static getBookingStatusChangingTimes()` | 1557 |
| `getBookingPeriodOptions` | `static getBookingPeriodOptions()` | 1615 |
| `getWeekSelectTimes` | `static getWeekSelectTimes()` | 1626 |
| `getOverrideSelectTimes` | `static getOverrideSelectTimes()` | 1635 |
| `getWeeklyScheduleSchema` | `static getWeeklyScheduleSchema()` | 1644 |
| `getCustomFieldTypes` | `static getCustomFieldTypes()` | 1688 |
| `getDefaultTermsAndConditions` | `static getDefaultTermsAndConditions()` | 1750 |
| `getDefaultEmailNotificationSettings` | `static getDefaultEmailNotificationSettings()` | 1757 |
| `getAddToCalendarHtml` | `static getAddToCalendarHtml($assetUrl = '')` | 1879 |
| `getConfirmAndRejectButton` | `static getConfirmAndRejectButton($assetUrl = '')` | 1888 |
| `getIframeHtml` | `static getIframeHtml()` | 1897 |
| `getEditorShortCodes` | `static getEditorShortCodes($calendarEvent = null, $isHtmlSupported = false, $iframeHtml = '')` | 1904 |
| `encryptKey` | `static encryptKey($value)` | 2102 |
| `decryptKey` | `static decryptKey($raw_value)` | 2132 |
| `debugLog` | `static debugLog($data)` | 2173 |
| `getGlobalSettings` | `static getGlobalSettings($settingsKey = null)` | 2180 |
| `getGlobalAdminSetting` | `static getGlobalAdminSetting($key = null, $default = null)` | 2255 |
| `getDefaultTimeFormat` | `static getDefaultTimeFormat()` | 2280 |
| `getDefaultBookingFilters` | `static getDefaultBookingFilters()` | 2294 |
| `getDefaultPaginations` | `static getDefaultPaginations()` | 2304 |
| `getVerifiedSenders` | `static getVerifiedSenders()` | 2314 |
| `getBookingReceiptLandingBaseUrl` | `static getBookingReceiptLandingBaseUrl()` | 2330 |
| `getGlobalModuleSettings` | `static getGlobalModuleSettings($cached = true)` | 2335 |
| `updateGlobalModuleSettings` | `static updateGlobalModuleSettings($settings = [])` | 2352 |
| `isModuleEnabled` | `static isModuleEnabled($module)` | 2363 |
| `fluentbooking_is_rtl` | `static fluentbooking_is_rtl()` | 2373 |
| `fluentBookingUserAvatar` | `static fluentBookingUserAvatar($id_or_email, $args)` | 2383 |
| `getPrefSettings` | `static getPrefSettings($cached = true)` | 2391 |
| `getPrefSettins` | `static getPrefSettins($cached = true)` | 2422 |
| `getFeatures` | `static getFeatures()` | 2427 |
| `getActiveThemeName` | `static getActiveThemeName()` | 2438 |
| `lockSlot` | `static lockSlot($event, $startTimeUtc, $endTimeUtc, $waitSeconds = 5)` | 2468 |
| `releaseSlotLocksAfterInsert` | `static releaseSlotLocksAfterInsert($locks)` | 2491 |
| `lockRoundRobinSlot` | `static lockRoundRobinSlot($event, $startTimeUtc, $endTimeUtc)` | 2529 |
| `checkRateLimit` | `static checkRateLimit($action, $limit, $window = 60, $perIp = true)` | 2544 |
| `dbTransaction` | `static dbTransaction($callback)` | 2582 |

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
| `isSuperUser` | `static isSuperUser($context = null)` | 44 |
| `hasAllCalendarAccess` | `static hasAllCalendarAccess($readAccess = false)` | 53 |
| `canReadCalendar` | `static canReadCalendar($calendarId)` | 66 |
| `canUpdateCalendarEvent` | `static canUpdateCalendarEvent($slotId)` | 89 |
| `canWriteCalendar` | `static canWriteCalendar($calendarId)` | 108 |
| `canAssignHosts` | `static canAssignHosts($memberIds, $allowedIds)` | 136 |
| `assignableHostIds` | `static assignableHostIds()` | 166 |
| `hasCalendarAccess` | `static hasCalendarAccess($calendar)` | 173 |
| `currentUserHasAnyPermission` | `static currentUserHasAnyPermission()` | 180 |
| `userCan` | `static userCan($permissions)` | 189 |
| `canManageOtherHosts` | `static canManageOtherHosts()` | 221 |
| `getUserPermissions` | `static getUserPermissions($user = null, $formatted = false)` | 226 |
| `getMetaPermissions` | `static getMetaPermissions($userId = null)` | 349 |
| `getMenuPermission` | `static getMenuPermission()` | 371 |
| `userCanSeeAllBookings` | `static userCanSeeAllBookings()` | 407 |

## BookingFieldService

`FluentBooking\App\Services\BookingFieldService` — `fluent-booking/app/Services/BookingFieldService.php`

| Method | Signature | Line |
| --- | --- | --- |
| `getCustomFieldsData` | `static getCustomFieldsData($postedData, CalendarSlot $slot, $mappedKeys = null)` | 16 |
| `getBookingFields` | `static getBookingFields(CalendarSlot $calendarSlot, $cached = false)` | 86 |
| `getBookingFieldLabels` | `static getBookingFieldLabels(CalendarSlot $calendarSlot, $enabledOnly = false)` | 268 |
| `generateFieldName` | `static generateFieldName($calendarEvent, $fieldLabel)` | 284 |
| `maybeGenerateFieldName` | `static maybeGenerateFieldName($calendarEvent, $fieldValue)` | 303 |
| `getFormattedCustomBookingData` | `static getFormattedCustomBookingData(Booking $booking, $htmlSupport = true, $isPublic = false)` | 316 |
| `getCustomFields` | `static getCustomFields($calendarEvent, $withConfig = false)` | 360 |
| `getBookingFieldByName` | `static getBookingFieldByName($calendarEvent, $name)` | 384 |
| `hasPhoneNumberField` | `static hasPhoneNumberField($fields)` | 397 |
| `getUploadedFiles` | `static getUploadedFiles($fieldValue, $htmlSupport = true)` | 419 |
| `validateDateFields` | `static validateDateFields($customFieldsData, $calendarEvent)` | 437 |
| `sanitizeBookingFields` | `static sanitizeBookingFields($bookingFields, $calendarEvent = null)` | 467 |

## EditorShortCodeParser

`FluentBooking\App\Services\EditorShortCodeParser` — `fluent-booking/app/Services/EditorShortCodeParser.php`

| Method | Signature | Line |
| --- | --- | --- |
| `parse` | `static parse($parsable, $booking, $requireHtml = true)` | 24 |
