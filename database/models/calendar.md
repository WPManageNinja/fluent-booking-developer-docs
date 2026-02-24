# 📅 Calendar Model

The `Calendar` model is the top-level container for scheduling settings, availability, and events. It often represents a single host, a team, or a specific resource.

## Attributes

| Attribute | Type | Description |
|-----------|------|-------------|
| `id` | bigint | Primary key |
| `hash` | varchar | Unique identification hash |
| `user_id` | bigint | Owner's WordPress user ID |
| `account_id` | bigint | Associated integration account ID (Optional) |
| `parent_id` | bigint | Parent calendar ID (for teams/resources) |
| `title` | varchar | Calendar name |
| `slug` | varchar | Unique URL slug for the calendar landing page |
| `media_id` | bigint | Featured image media ID |
| `description` | text | Calendar description |
| `settings` | longtext | JSON configuration for landing page and defaults |
| `status` | varchar | `active`, `inactive` or `expired` |
| `type` | varchar | `simple` (individual), `team`, or `event` |
| `event_type` | varchar | Primary event category |
| `author_timezone` | varchar | Default timezone for the calendar host |
| `account_type` | varchar | `free` / `pro` |
| `visibility` | varchar | `public` / `admin` |
| `max_book_per_slot` | int | Default limit of guests per time slot |
| `created_at` | timestamp | Record creation time |
| `updated_at` | timestamp | Record last update time |

## Methods

### `isHostCalendar()` / `isTeamCalendar()` / `isEventCalendar()`
Check the primary role/type of the calendar.

### `getLandingPageUrl($isForce = false)`
Returns the public URL for the calendar's landing page.

### `getAuthorPhoto()`
Returns the URL for the host's profile photo.

### `getMeta($key, $default = null)` / `updateMeta($key, $value)`
Manage calendar-specific metadata stored in `fcal_meta`.

### `getAuthorProfile($public = true)`
Returns an array of author details (name, avatar, etc.).

### `updateEventOrder($eventId)`
Updates the display order of events within this calendar.

### `static getAllHosts()`
Static helper to retrieve a list of all individual hosts.

## Relations

### `slots` / `events`
Has many [CalendarSlot](calendar-slot) event types.

### `bookings`
Has many [Booking](booking) records across all slots.

### `user`
Belongs to a [User](user) (the owner).

### `availabilities`
Has many [Availability](availability) records.

### `metas`
Has many [Meta](meta) records associated with this calendar.

## Usage Examples

### Fetching a host's landing page
```php
use FluentBooking\App\Models\Calendar;

$calendar = Calendar::where('user_id', $userId)->where('type', 'simple')->first();
if ($calendar) {
    echo $calendar->getLandingPageUrl();
}
```

### Checking calendar type
```php
if ($calendar->isTeamCalendar()) {
    // Show team management options
}
```
