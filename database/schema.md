# Database Schema

The FluentBooking database is designed for high performance, maintaining a clean separation between core scheduling data, host availability, and extensibility via metadata.

## Core Entity Relationships

The following diagram illustrates the primary relationships between the core entity tables in FluentBooking.

![FluentBooking Database Schema](/images/fluent-booking-database-design.png)

## Schema Overview

The FluentBooking schema is built around these core concepts:

- **Calendars & Events**: Top-level containers for scheduling rules and specific appointment types.
- **Bookings**: The central ledger for all scheduled appointments, including customer data and status.
- **Availability & Rules**: Stored in a polymorphic meta system to allow for both global and event-specific overrides.
- **Multi-Host Management**: Pivot-based assignment for team scheduling, round-robin, and collective events.
- **Activity & Auditing**: Detailed logs for every state change or notification event related to a booking.
- **Pro Extensions**: Additional tables for Orders and Transactions to handle paid scheduling.

## Key Design Principles

1. **JSON Configuration**: Complex settings for events and calendars are stored as JSON for maximum flexibility without schema changes.
2. **Polymorphic Meta**: We use a unified `fcal_meta` table for various object types (Calendars, Events) to keep the core schema lean.
3. **Audit Trail**: Every significant booking event is logged in `fcal_booking_activity` for debugging and customer support.
4. **Performance Indexing**: Strategic composite indexes are placed on time-based columns (`start_time`, `end_time`) and foreign keys for rapid availability lookups.
5. **UUID / Hash Security**: Public identifiers are used for booking hashes and calendar slugs to prevent ID enumeration.

## Database Tables

All tables are prefixed with `fcal_` (or your custom WordPress prefix).

### `fcal_calendars`
The master table for calendars.
- `id`: Primary key
- `hash`: Unique public identifier
- `user_id`: Owner's WP User ID
- `account_id`: Associated integration account ID
- `parent_id`: Parent calendar ID (teams)
- `title`: Calendar name
- `slug`: Public URL slug
- `media_id`: Featured image ID
- `description`: Calendar description
- `settings`: (Serialized) Additional configurations
- `status`: `active`, `inactive` or `expired`
- `type`: `simple` (individual), `team`, or `event`
- `event_type`: Primary event category
- `account_type`: `free` / `pro`
- `visibility`: `public` / `admin`
- `author_timezone`: Host's default timezone
- `max_book_per_slot`: Default guests limit per calendar
- `created_at`: Record creation timestamp
- `updated_at`: Record last update timestamp

### `fcal_calendar_events`
Represents bookable event types (Slots).
- `id`: Primary key
- `hash`: Unique public identifier
- `user_id`: Creator's WP User ID
- `calendar_id`: Parent calendar ID
- `duration`: Length of event in minutes
- `title`: Event name
- `slug`: Event public slug
- `media_id`: Featured image ID
- `description`: Event description
- `settings`: (Serialized) Additional configurations stored. Examples include buffer times, available date ranges, date_overrides, booking limits, etc.
- `availability_type`: `existing_schedule` / `custom`
- `availability_id`: ID for existing schedule availability
- `status`: `active` / `inactive` / `draft` / `expired`
- `type`: `free` / `paid`
- `color_schema`: Display color
- `location_type`: Primary location type
- `location_heading`: Custom label for location
- `location_settings`: (Serialized) Multi-location config
- `event_type`: `single`, `group`, `single_event`, `group_event`, `round_robin`, `collective`
- `is_display_spots`: Show/hide remaining spots of group event
- `max_book_per_slot`: Max guests limit of group event
- `created_at`: Record creation timestamp
- `updated_at`: Record last update timestamp

### `fcal_bookings`
Stores all appointment records.
- `id`: Primary key
- `hash`: Public meeting identifier
- `calendar_id`: Related calendar ID
- `event_id`: Related event ID
- `group_id`: Group ID for multi-seat bookings
- `parent_id`: Parent ID for repeating bookings
- `host_user_id`: Assigned primary host
- `person_user_id`: Attendee WP User ID (if logged in)
- `person_contact_id`: CRM contact ID
- `fcrm_id`: FluentCRM subscriber ID
- `person_time_zone`: Attendee's timezone
- `start_time`: UTC start
- `end_time`: UTC end
- `slot_minutes`: Booking duration
- `first_name`, `last_name`, `email`, `phone`: Attendee info
- `message`: Meeting notes for user
- `internal_note`: Internal notes for admin
- `country`: Attendee's country
- `ip_address`: Attendee's IP address
- `browser`: Attendee's browser info
- `device`: Attendee's device info
- `other_info`: (Serialized) Custom form field data
- `location_details`: (Serialized) Selected booking location info
- `cancelled_by`: WP User ID who cancelled the booking
- `status`: `scheduled`, `pending`, `cancelled`, `completed`, `rejected`, `rescheduled`, `reserved`, `no_show`
- `source`: `web` / `admin` / `integration`
- `booking_type`: `scheduling`, `event`
- `event_type`: `single`, `group`, `round_robin`, `collective`, etc.
- `payment_status`: `pending`, `paid`, `partially-paid`, `partially-refunded`
- `payment_method`: `stripe`, `paypal`, `offline`, etc.
- `source_url`: URL of the page where the booking was made
- `source_id`: ID of the source (form, post, etc.)
- `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`: Tracking params
- `created_at`: Record creation timestamp
- `updated_at`: Record last update timestamp

### `fcal_booking_meta`
Polymorphic key-value storage for specific booking data (e.g., custom fields).
- `id`: Primary key
- `booking_id`: Foreign key
- `meta_key`: Meta key
- `value`: (Serialized) Meta value
- `created_at`: Record creation timestamp
- `updated_at`: Record last update timestamp

### `fcal_booking_activity`
Detailed audit log for all booking actions.
- `id`: Primary key
- `booking_id`: Related booking
- `parent_id`: Parent activity ID (nested)
- `created_by`: WP User ID of actor
- `status`: Status of action (`open`, `failed`, `success`, `closed`)
- `type`: `info`, `success`, `error`, `note`, `email_log`, etc.
- `title`, `description`: Log details
- `created_at`: Record creation timestamp
- `updated_at`: Record last update timestamp

### `fcal_booking_hosts`
Pivot table linking multiple hosts to a single booking.
- `id`: Primary key
- `booking_id`: Related booking
- `user_id`: Assigned host's WP User ID
- `status`: `confirmed`, `pending`, `declined`
- `created_at`: Record creation timestamp
- `updated_at`: Record last update timestamp

### `fcal_meta`
Polymorphic storage for various objects.
- `id`: Primary key
- `object_type`: `Calendar`, `calendar_event`, `availability`, `user_meta`, `integration`, etc.
- `object_id`: Related ID
- `key`: Meta key
- `value`: (Serialized) Meta value
- `created_at`: Record creation timestamp
- `updated_at`: Record last update timestamp

### `fcal_orders` <Badge type="tip" text="Pro" />
Financial orders table for paid bookings.

- `id`: BIGINT UNSIGNED, Primary key, Auto-increment
- `status`: VARCHAR(20), Order status — `draft`, `pending`, `completed`, `failed`, `refunded`, `cancelled`
- `parent_id`: BIGINT UNSIGNED, Related booking ID
- `order_number`: VARCHAR(255), Order display/reference number
- `type`: VARCHAR(20), Order type — `sale`, `refund`, `subscription` (default `'sale'`)
- `customer_id`: BIGINT UNSIGNED, Related customer WP User ID
- `payment_method`: VARCHAR(100), Payment gateway key (e.g., `stripe`, `paypal`, `offline`)
- `payment_mode`: VARCHAR(100), Payment environment — `test` / `live`
- `payment_method_type`: VARCHAR(100), Further method details (e.g., `card`, `bank_transfer`)
- `payment_method_title`: VARCHAR(100), Human-readable payment method label
- `currency`: VARCHAR(10), ISO currency code
- `subtotal`: DECIMAL(18,9), Order subtotal before discounts/tax
- `discount_tax`: DECIMAL(18,9), Discount tax amount
- `discount_total`: DECIMAL(18,9), Discount pre-tax
- `shipping_tax`: DECIMAL(18,9), Shipping tax
- `shipping_total`: DECIMAL(18,9), Shipping cost
- `tax_total`: DECIMAL(18,9), Total tax amount
- `total_amount`: DECIMAL(18,9), Final order total (after all fees/discounts)
- `total_paid`: DECIMAL(18,9), Amount paid towards this order
- `rate`: DECIMAL(18,9), Conversion rate if multi-currency (default 1)
- `note`: TEXT, Public order note
- `ip_address`: TEXT, Payer IP address
- `completed_at`: DATETIME, When marked completed (nullable)
- `refunded_at`: DATETIME, When refunded (nullable)
- `uuid`: VARCHAR(100), Unique identifier (for external integrations)
- `created_at`: TIMESTAMP, Created at
- `updated_at`: TIMESTAMP, Last updated at

**Indexes**:
- `type` (order type)
- `order_number` (191 length), for quick lookup
- `customer_id` (customer reference)

### `fcal_order_items` <Badge type="tip" text="Pro" />
Detailed line items for financial orders.
- `id`: Primary key
- `order_id`: Parent order ID
- `booking_id`: Associated booking ID
- `item_name`: Display title
- `type`: `single`, `discount`, `tax`
- `quantity`, `item_price`, `item_total`: Financial data
- `rate`: Currency conversion rate
- `line_meta`: (Serialized) Additional item metadata
- `created_at`: Record creation timestamp
- `updated_at`: Record last update timestamp

### `fcal_transactions` <Badge type="tip" text="Pro" />
Gateway-specific transaction logs.

- `id`: BIGINT(20) UNSIGNED, Primary key, Auto-increment
- `object_id`: BIGINT UNSIGNED, Related order ID (not null, default `0`)
- `object_type`: VARCHAR(100), Object type (not null, default `''`)
- `transaction_type`: VARCHAR(255), Transaction type — `one_time`, `subscription`, `refund` (default `'one_time'`)
- `subscription_id`: INT(11), Related subscription ID (nullable)
- `card_last_4`: INT(4), Card last 4 digits (nullable)
- `card_brand`: VARCHAR(255), Card brand (nullable)
- `vendor_charge_id`: VARCHAR(192), Gateway reference ID (not null, default `''`)
- `payment_method`: VARCHAR(100), Payment gateway/method (not null, default `''`)
- `payment_method_type`: VARCHAR(100), Further payment method details (not null, default `''`)
- `status`: VARCHAR(20), Payment status — `succeeded`, `failed`, `pending`, `refunded` (not null, default `''`)
- `total`: DECIMAL(18,9), Total transaction amount (not null, default `0.000000000`)
- `rate`: DECIMAL(10,5), Currency conversion rate (not null, default `1.00000`)
- `uuid`: VARCHAR(100), Unique identifier (not null, default `''`)
- `meta`: JSON, Additional metadata (nullable)
- `created_at`: TIMESTAMP, Created at (nullable)
- `updated_at`: TIMESTAMP, Last updated at (nullable)

**Indexes**:
- `vendor_charge_id` (first 64 chars), for gateway lookups
- `payment_method`
- `status`
- `object_id`
