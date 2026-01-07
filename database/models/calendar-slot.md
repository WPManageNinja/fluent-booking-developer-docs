# ⚡ CalendarSlot Model

The `CalendarSlot` model (also referred to as an "Event Type") defines the rules for specific appointment types, such as duration, location, and availability.

## Attributes

| Attribute | Type | Description |
|-----------|------|-------------|
| `id` | bigint | Primary key |
| `hash` | varchar | Unique identification hash |
| `user_id` | bigint | Creator's WordPress user ID |
| `calendar_id` | bigint | Parent calendar ID |
| `duration` | int | Event duration in minutes |
| `title` | varchar | Event name (e.g., "30 Min Consultation") |
| `slug` | varchar | Event URL slug |
| `media_id` | bigint | Featured image media ID |
| `description` | longtext | Event description |
| `settings` | longtext | JSON for notifications, ranges, and conditions |
| `availability_type` | varchar | `existing_schedule` / `custom` |
| `availability_id` | bigint | ID for existing schedule availability |
| `status` | varchar | `active` / `inactive` / `draft` / `expired` |
| `type` | varchar | Payment type (`free` / `paid`) |
| `event_type` | varchar | `single`, `group`, `single_event`, `group_event`, `round_robin`, `collective`, `single_event`, `group_event` |
| `location_type` | varchar | e.g., `google_meet`, `zoom_meeting`, `in_person` |
| `location_heading` | text | Custom heading for location field |
| `location_settings` | longtext | Serialized configuration for multiple locations |
| `is_display_spots` | boolean | Whether to show remaining spots for group bookings |
| `max_book_per_slot` | int | Max guests allowed per time slot |

## Methods

### `getPublicUrl()`
Returns the public booking URL for this specific event type.

### `isOneToOne()` / `isGroup()` / `isTeamEvent()`
Check the event type category.

### `isRoundRobin()` / `isCollective()`
Specific checks for Pro team-based event types.

### `isRecurringEvent()`
Check if this event type supports recurring appointments.

### `getMeta($key, $default = null)` / `updateMeta($key, $value)`
Manage event-specific metadata.

### `isConfirmationEnabled()`
Check if bookings for this slot require manual host approval.

### `getBookingFields()`
Returns the custom form fields defined for this event type.

### `getNotifications()`
Retrieve the configured email notification settings.

### `getDuration($requestedDuration = null)`
Returns the actual duration. Supports multi-duration lookups.

### `getDescription()`
Returns a formatted description or default text if empty.

### `getSlotInterval()`
Returns the interval between bookable slots (defaults to duration).

### `getMaxBookableDateTime($startDate)`
Calculates the maximum date a guest can book based on range settings.

### `getHostIds()`
Returns an array of WordPress User IDs assigned to this slot.

### `getLocationFields()`
Returns available location options for editing.

### `getAuthorProfiles($public = true)`
Returns an array of profiles for all hosts (team members) assigned to this event.

## Relations

### `calendar`
Returns the parent [Calendar](calendar) model.

### `bookings`
Has many [Booking](booking) records for this slot.

### `user`
Belongs to the [User](user) who created the slot.

### `event_metas`
Has many [Meta](meta) records associated with this event.

## Usage Examples

### Getting the booking URL
```php
use FluentBooking\App\Models\CalendarSlot;

$slot = CalendarSlot::find(5);
echo $slot->getPublicUrl();
```

### Checking for Manual Confirmation
```php
if ($slot->isConfirmationEnabled()) {
    // Notify admin that approval is required
}
```
