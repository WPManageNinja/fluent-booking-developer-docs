# 📅 Booking Model

The `Booking` model represents a scheduled appointment or booking in Fluent Booking. It contains all the essential information about a booking including customer details, timing, status, and payment information.

## Attributes

| Attribute | Type | Description |
|-----------|------|-------------|
| `id` | int | Primary key |
| `hash` | string | Unique public hash for the booking URL |
| `calendar_id` | int | Associated calendar ID |
| `event_id` | int | Associated event/slot ID |
| `person_user_id` | int | WordPress user ID of the person who booked (if logged in) |
| `person_time_zone` | string | Timezone of the person |
| `first_name` | string | First name of the attendee |
| `last_name` | string | Last name of the attendee |
| `email` | string | Email address of the attendee |
| `phone` | string | Phone number |
| `status` | string | `scheduled`, `cancelled`, `completed`, `pending` |
| `start_time` | datetime | Start time in UTC |
| `end_time` | datetime | End time in UTC |
| `payment_status` | string | `pending`, `paid`, `refunded`, `failed` |
| `event_type` | string | `single`, `group`, `round_robin`, `collective` |

## Methods

### `getFullBookingDateTimeText($timeZone = 'UTC')`
Returns a formatted string representing the booking date and time range.

### `cancelMeeting($reason = '', $cancelledByType = 'guest')`
Cancels the meeting, updates status, and logs the reason.

### `rejectMeeting($reason = '', $rejectByUserId = null)`
Rejects a pending booking request.

### `getMeta($key, $default = '')` / `updateMeta($key, $value)`
Manage booking-specific metadata stored in `fcal_booking_meta`.

### `getConfirmationUrl()`
Returns the public confirmation URL (Receipt landing page).

### `getRescheduleUrl()` / `getCancelUrl()`
Returns the public URLs for rescheduling or cancelling.

### `getAdminViewUrl()`
Returns the internal WordPress admin URL to view the booking.

### `canCancel()` / `canReschedule()`
Check if the booking is currently eligible for cancellation/rescheduling based on event settings.

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

### `booking_meta`
Has many [BookingMeta](booking-meta) records.

### `booking_activities`
Has many [BookingActivity](booking-activity) records.

### `hosts`
Belongs to many [User](user) hosts via `fcal_booking_hosts`.

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
