# REST API Documentation Changes

All changes were made to align the VitePress developer documentation with the actual PHP controller implementations.

---

## 1. `rest-api/reports/index.md`

- **Get Reports query params**: Changed `date_from`/`date_to`/`calendar_id`/`event_id` to `startTime`/`endTime`
- **Get Reports response**: Changed from `{ reports, date_range }` to `{ overview, latest_books, next_meetings }`
- **Graph Reports params**: Changed to `date_range` array instead of reusing reports params
- **Graph Reports response**: Changed from `{ graph_data }` to `{ booked_stats, completed_stats, cancelled_stats }`
- **Activities**: Changed from paginated response with query params to flat array limited to 100 entries (no pagination)
- **Removed**: Activity Types reference table (speculative)

## 2. `rest-api/settings/index.md`

- **General settings params**: Changed from `date_format`/`time_format`/`default_timezone`/`booking_confirmation` to `emailing`/`administration`/`timeFormat`
- **General settings response**: Added proper response structure with `emailing`, `administration`, `time_format`, `emailingFields`, `all_countries`
- **Payment settings**: Changed to use `payments` wrapper object with `currency`/`is_active`/`number_format`/`currency_position`
- **Theme settings**: Changed from object with `primary_color`/`button_style`/`font_family` to single `theme` string
- **Install plugin param**: Changed `plugin_slug` to `plugin_id`, added allowed values list
- **Install plugin response**: Changed from `{ message, status }` to `{ message }` only
- **Global modules param**: Changed `modules` to `settings`
- **Added**: Proper response structures and examples for all endpoints (Settings Menu, Global Modules, Pages, Addons Settings)

## 3. `rest-api/admin/index.md`

- **Remaining hosts**: Added `search` and `selected_id` query parameters
- **Remaining hosts response**: Added proper fields: `id`, `label`, `avatar`, `disabled`
- **Remaining hosts**: Documented `is_own` field for users without `list_users` capability
- **Other hosts**: Documented `id` as string type, added response example
- **Added**: Notes about capability requirements

## 4. `rest-api/availability/index.md`

- **List schedules**: Added `filters[author]` query parameter
- **Create schedule params**: Changed from requiring `timezone`/`weekly_schedules`/`date_overrides`/`default` to only requiring `title` with optional `timezone`
- **Update schedule**: Changed to use nested `schedule.settings.*` structure
- **Update title response**: Changed from `{ message, schedule }` to `{ message, title }`
- **Update default status**: Changed to have no body params (always sets default to true)
- **Update status message**: Changed from "Schedule status updated successfully" to "Status has been updated successfully"
- **Clone schedule**: Removed `title` param, documented "(Clone)" suffix behavior
- **Clone message**: Changed from "Schedule cloned successfully" to "Schedule has been cloned successfully"
- **Delete message**: Changed from "Schedule deleted successfully" to "Schedule Availability has been deleted successfully"
- **Schedule usages**: Added `calendar` relation in response

## 5. `rest-api/calendars/sharing-settings.md`

- **Request body**: Changed from flat `enabled`/`show_type`/`enabled_slots` to `calendar_data` object and `landing_page_settings` object
- **Response**: Changed from `{ message, settings, share_url }` to `{ message }` only
- **Response message**: Changed from "Sharing settings updated successfully" to "Landing Page settings has been updated"
- **Added**: Note about timezone changes affecting event schedules

## 6. `rest-api/calendars/event-booking-fields.md`

- **Request param**: Changed `fields` to `booking_fields`
- **Response**: Changed from "Returns the updated fields array" to `{ message: "Fields has been updated" }`

## 7. `rest-api/calendars/event-notifications.md`

- **Save response**: Changed from "Returns the updated notifications object" to `{ message: "Notifications has been saved" }`
- **Clone param**: Changed `source_event_id` to `from_event_id`
- **Clone message**: Changed from "Email notifications cloned successfully" to "The Notification has been cloned successfully"

## 8. `rest-api/calendars/index.md`

- **Search params**: Changed `search` to `query[search]` and `calendarType` to `query[calendarType]`
- **Added**: `with[]` query parameter for `calendar_event_lists`
- **Fixed**: Removed duplicate closing code fence (formatting issue)

## 9. `rest-api/events/index.md`

- **Added**: `event_hash` query parameter documentation (fallback identifier)

## 10. `rest-api/calendars/event-settings.md`

- **Update details params**: Changed `title`/`duration` from optional to required, added `status` (required), added `max_book_per_slot`/`is_display_spots` (conditional for group events), added `multi_duration.*` params
- **Update limits**: Restructured all params under `settings.*` wrapper; added `schedule_conditions`, `buffer_time_before`, `buffer_time_after`, `slot_interval`, `lock_timezone`
- **Event order response**: Changed from `{ message }` to `{ calendar, message }`
- **Event order message**: Changed from "Event order updated successfully" to "Event order has been updated"
- **Added**: Cross-reference note to Calendar Events page, response examples for all endpoints

## 11. `rest-api/calendars/event-availability.md`

- **Removed**: `buffer_time_before` and `buffer_time_after` params (those belong to Event Limits endpoint)
- **Added**: `date_overrides`, `range_date_between` (corrected to array type), `common_schedule`, `hosts_schedules`, `availability_type`, `availability_id`
- **Added**: Note about buffer times being on a separate endpoint
- **Added**: Response example with `{ message, event }`

## 12. `rest-api/calendars/event-integrations.md`

- **Delete message**: Changed from "Integration deleted successfully" to "Successfully deleted the Integration."
- **Clone param**: Changed `source_event_id` to `from_event_id`
- **Clone message**: Changed from "Integrations cloned successfully" to "Integrations has been successfully cloned."
- **Merge fields**: Added `integration_name` and `list_id` query params, added response example
- **Config options**: Added `integration_name` and `settings` query params, added response example

## 13. `rest-api/bookings/index.md`

- **List bookings**: Changed description to note it's scoped to authenticated user
- **List bookings params**: Changed from `event_id`/`calendar_id`/`status` to `per_page`/`period`/`calendar_ids[]`
- **List bookings response**: Changed from raw DB fields to presentation-oriented fields (`booking_title`, `author_name`, `booking_date`, `booking_time`)
- **Get event response**: Changed root key from `event` to `calendar_event`, removed `booking_fields` from response, corrected `available_slots` to object format
- **Get event params**: Changed `date` to `start_date`, added `duration` and `host_id` params
- **Create booking params**: Changed `first_name`/`last_name` to `name`, `start_time` to `event_time`, `location_details` (object) to `location_description` (string), `additional_guests` to `guests`; added `duration`, `source`, `host_user_id`
- **Create booking message**: Changed from "Booking created successfully" to "Booking has been created"
- **Added**: Entirely new `GET /bookings/slots/{event_id}` endpoint documentation (was undocumented)

## 14. `rest-api/schedules/index.md`

- **List schedules params**: Changed from `per_page`/`status`/`event_id`/`calendar_id`/`date_from`/`date_to` to `filters[event]`/`filters[author]`/`filters[event_type]`/`filters[period]`/`filters[range]`
- **Get schedule**: Added `with[]` query parameter, changed response root key from `booking` to `schedule`, simplified response
- **Update schedule**: Rewrote to document the `column`/`value` pattern instead of direct field assignment; added `cancel_reason`, `reject_reason`, `refund_payment`, `update_all` params; added status/payment status value tables
- **Update schedule response**: Documented varying messages based on column and value
- **Delete schedule**: Changed from "cancel" semantics to actual deletion, removed `cancellation_reason` param, added WARNING about permanent deletion
- **Removed**: "Get Schedule Slot" section (`GET /schedules/{id}/slot`) — route maps to non-existent controller method
- **Meta info**: Added `with` query param, added full response example with `activities`/`sidebar_contents`/`payment_order`/`main_body_contents`
- **Send confirmation email**: Added `email_to` query param, changed message from "Confirmation email sent successfully" to "Notification sent successfully"
- **Group attendees**: Added `search` query param, changed response from flat array to paginated structure

## 15. `rest-api/integrations/index.md`

- **Complete rewrite**: Removed fabricated endpoints (`GET /integrations` list, connect, disconnect, test, per-key settings URLs)
- **Get settings**: Changed from `GET /integrations/{integration_key}/settings` to `GET /integrations?settings_key=...`; added `status` and `field_settings` to response
- **Update settings**: Changed from `POST /integrations/{integration_key}/settings` to `POST /integrations` with body params; response changed to `{ message: "Settings has been successfully saved." }`
- **Removed**: Available Integration Keys table, Integration Settings by Type reference

## 16. `rest-api/payments/index.md`

- **Complete rewrite**: Removed all fabricated endpoints (`GET/POST /payments/methods`, enable/disable/test methods, `GET/POST /payments/settings`, currencies)
- **Replaced with**: Documentation of actual `GET /calendars/{id}/events/{event_id}/payment-settings` endpoint and reference to `POST /settings/payment`

## 17. `rest-api/webhooks/index.md`

- **Complete rewrite**: Removed all fabricated endpoints (list/create/update/delete/test webhooks, SMS settings, SMS templates, SMS providers)
- **Replaced with**: Note that webhooks and SMS are managed through per-event integrations via the Event Integrations API

## 18. `rest-api/schedules/transactions.md`

- **Complete rewrite**: Removed fabricated `PUT /schedules/{id}/transactions/{transaction_id}` endpoint and all related content
- **Replaced with**: Note that transaction data is accessed via `GET /schedules/{id}/meta-info` and payment status via `PUT /schedules/{id}`

## 19. `rest-api/error-handling.md`

- **Fixed API namespace**: Changed `fluent-community` to `fluent-booking` in two example URLs
- **Fixed domain**: Changed `community.lab` to `yoursite.com` and `feeds` to `calendars` in 422 error example

---

## Summary

| Category | Files Affected |
| :--- | :--- |
| Wrong parameter names | 9 files |
| Wrong request body structure/nesting | 7 files |
| Wrong response messages | 10 files |
| Wrong/missing response shapes | 12 files |
| Missing parameters documented | 10 files |
| Fabricated endpoints removed | 4 files (integrations, payments, webhooks, transactions) |
| Missing endpoints added | 1 file (bookings — `GET /bookings/slots/{event_id}`) |
| Non-existent endpoints removed | 1 file (schedules — `GET /schedules/{id}/slot`) |
| Wrong API namespace | 1 file (error-handling) |
