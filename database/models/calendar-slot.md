# ⚡ CalendarSlot Model

The `CalendarSlot` model (also referred to as an "Event Type") defines the rules for specific appointment types, such as duration, location, and availability.

## Attributes

| Attribute | Type | Description |
|-----------|------|-------------|
| `id` | bigint | Primary key |
| `calendar_id` | bigint | Parent calendar ID |
| `title` | varchar | Event name (e.g., "30 Min Consultation") |
| `slug` | varchar | Event URL slug |
| `duration` | int | Event duration in minutes |
| `settings` | longtext | JSON for notifications, integrations, etc. |
| `status` | varchar | active/inactive |
| `event_type` | varchar | `single`, `group`, `round_robin`, `collective`, `single_event`, `group_event` |
| `location_type` | varchar | e.g., `google_meet`, `zoom_meeting`, `in_person` |

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

### `getAvailableDurations()`
Returns an array of supported durations if multi-duration is enabled.

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
