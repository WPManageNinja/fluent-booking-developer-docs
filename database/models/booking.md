# 📅 Booking Model

The `Booking` model represents a scheduled appointment or booking in FluentBooking. It contains all the essential information about a booking including customer details, timing, status, and payment information.

## Attributes

| Attribute | Type | Description |
|-----------|------|-------------|
| `id` | bigint | Primary key |
| `hash` | varchar | Unique identification hash |
| `calendar_id` | bigint | Parent calendar ID |
| `event_id` | bigint | Parent slot/event ID |
| `group_id` | bigint | Group ID for multi-seat/group bookings |
| `parent_id` | bigint | Parent booking ID for recurring or related bookings |
| `host_user_id` | bigint | WordPress User ID of the primary host |
| `person_user_id` | bigint | WordPress User ID of the guest (if registered) |
| `person_contact_id` | bigint | CRM Contact ID (if integrated) |
| `fcrm_id` | bigint | FluentCRM subscriber ID |
| `person_time_zone` | varchar | Attendee's timezone |
| `start_time` | timestamp | Booking start time (UTC) |
| `end_time` | timestamp | Booking end time (UTC) |
| `slot_minutes` | int | Duration of the booking in minutes |
| `first_name` | varchar | Guest's first name |
| `last_name` | varchar | Guest's last name |
| `email` | varchar | Guest's email address |
| `phone` | varchar | Guest's phone number |
| `message` | text | Message provided by the guest |
| `internal_note` | text | Private note for hosts |
| `country` | varchar | Guest's country |
| `ip_address` | varchar | IP address of the guest |
| `browser` | varchar | Guest's browser information |
| `device` | varchar | Guest's device information |
| `other_info` | longtext | (Serialized) Custom form field data |
| `location_details` | longtext | (Serialized) Selected booking location info |
| `cancelled_by` | bigint | WP User ID who cancelled the booking |
| `status` | varchar | `scheduled`, `pending`, `cancelled`, `completed`, `rejected`, `rescheduled`, `reserved`, `no_show` |
| `source` | varchar | Source of the booking — `web`, `admin`, `integration` |
| `booking_type` | varchar | `scheduling`, `event` |
| `event_type` | varchar | `single`, `group`, `round_robin`, `collective`, etc. |
| `payment_status` | varchar | `pending`, `paid`, `partially-paid`, `partially-refunded` |
| `payment_method` | varchar | e.g., `stripe`, `paypal`, `offline` |
| `source_url` | text | URL of the page where the booking was made |
| `source_id` | bigint | ID of the source (form, post, etc.) |
| `utm_source` | varchar | UTM tracking source |
| `utm_medium` | varchar | UTM tracking medium |
| `utm_campaign` | varchar | UTM tracking campaign |
| `utm_term` | varchar | UTM tracking term |
| `utm_content` | varchar | UTM tracking content |
| `created_at` | timestamp | Record creation time in UTC |
| `updated_at` | timestamp | Record last update time in UTC |

## Methods

### `getFullBookingDateTimeText()`
Returns a formatted string of the booking's date and time range.

### `isMultiGuestBooking()` / `isRecurringBooking()`
Check the booking type and structure.

### `getConfirmationUrl()` / `getCancelUrl()` / `getRescheduleUrl()`
Returns the relevant public URLs for guest actions.

### `getIcsDownloadUrl()`
Returns the URL to download the ICS calendar file.

### `canCancel()` / `canReschedule()`
Check if the current user/guest is permitted to perform these actions based on settings and timing.

### `cancelMeeting($reason, $cancelledBy)`
Cancels the meeting, updates status, and triggers notifications.

### `getHostProfiles()` / `getHostsDetails()`
Returns array of profile data for assigned hosts.

### `getCustomFormData($isFormatted = true)`
Retrieves custom field values submitted during booking.

### `updateMeta($key, $value)` / `getMeta($key, $default)`
Manage metadata stored in `fcal_booking_meta`.

### `getMeetingBookmarks()`
Returns list of bookmarks or record links associated with the meeting.

### `getAdminViewUrl()`
Returns the internal WordPress admin URL to view the booking.

## Scopes

### `scopeUpcoming($query)`
Filter for bookings whose `end_time` is in the future.

### `scopePast($query)`
Filter for bookings whose `end_time` has passed.

### `scopeSearchBy($query, $search)`
Advanced search by customer name, email, or hash.

### `scopeApplyComputedStatus($query, $status)`
Applies industry-standard filters for `upcoming`, `completed`, `cancelled`, and `pending`.

## Relations

### `calendar`
Belongs to the parent [Calendar](calendar) model.

### `slot` / `calendar_event`
Belongs to the associated [CalendarSlot](calendar-slot) model.

### `payment_order` <Badge type="tip" text="Pro" />
Has one [Order](order) record (if paid appointment).

### `user`
Belongs to the primary host [User](user) (via `host_user_id`).

### `booking_meta`
Has many [BookingMeta](booking-meta) records.

### `booking_activities`
Has many [BookingActivity](booking-activity) records.

### `hosts`
Belongs to many [User](user) hosts via `fcal_booking_hosts` pivot table.

## Usage Examples

### Fetching Attendee Metadata
```php
use FluentBooking\App\Models\Booking;

$booking = Booking::find(123);
$company = $booking->getMeta('company_name');
```

### Cancelling a Meeting via API
```php
$booking = Booking::where('hash', $hash)->first();
if ($booking) {
    $booking->cancelMeeting('Cancelled by administrator');
}
```
