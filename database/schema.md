# Database Schema

Fluent Booking creates several custom database tables to manage bookings, calendars, and availability. All tables are prefixed with `fcal_` (Fluent Calendar).

## Table Structure

### `fcal_calendars`
Stores the calendar/host configurations.
- `id`: Primary Key
- `user_id`: WordPress User ID of the host
- `title`: Name of the calendar
- `status`: Active/Inactive status

### `fcal_bookings`
The central table for all scheduled bookings.
- `id`: Primary Key
- `calendar_id`: Helper ID
- `event_id`: Helper ID for the slot type
- `start_time`: Booking start timestamp
- `end_time`: Booking end timestamp
- `status`: `scheduled`, `cancelled`, `completed`, `pending`

### `fcal_calendar_slots`
Definitions for event types (e.g., "15 Min Meeting", "Consultation").

### `fcal_availability`
Stores availability rules and overrides.

> [!NOTE]
> This documentation is a placeholder and will be expanded with full schema details in future updates.
