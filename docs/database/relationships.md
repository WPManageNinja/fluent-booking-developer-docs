---
title: Model Relationships
description: Cross-model relationships exposed by FluentBooking ORM models.
---

# Model Relationships

FluentBooking models use the standard WPFluent relationship helpers — `belongsTo`, `hasMany`, `hasOne`, `belongsToMany`, and morph variants. The table below is parsed directly from each model class so it stays in sync with the source.

| Model | Method | Type | Target |
| --- | --- | --- | --- |
| [Booking](/database/models/booking) | `calendar()` | `belongsTo` | `Calendar` |
| [Booking](/database/models/booking) | `slot()` | `belongsTo` | `CalendarSlot` |
| [Booking](/database/models/booking) | `calendar_event()` | `belongsTo` | `CalendarSlot` |
| [Booking](/database/models/booking) | `booking_meta()` | `hasMany` | `BookingMeta` |
| [Booking](/database/models/booking) | `booking_activities()` | `hasMany` | `BookingActivity` |
| [Booking](/database/models/booking) | `user()` | `belongsTo` | `User` |
| [Booking](/database/models/booking) | `hosts()` | `belongsToMany` | `$class` |
| [Booking](/database/models/booking) | `bookingHosts()` | `hasMany` | `BookingHost` |
| [Booking](/database/models/booking) | `payment_order()` | `hasOne` | `Order` |
| [Calendar](/database/models/calendar) | `slots()` | `hasMany` | `CalendarSlot` |
| [Calendar](/database/models/calendar) | `events()` | `hasMany` | `CalendarSlot` |
| [Calendar](/database/models/calendar) | `user()` | `belongsTo` | `User` |
| [Calendar](/database/models/calendar) | `bookings()` | `hasMany` | `Booking` |
| [Calendar](/database/models/calendar) | `availabilities()` | `hasMany` | `Availability` |
| [Calendar](/database/models/calendar) | `metas()` | `hasMany` | `Meta` |
| [CalendarSlot](/database/models/calendar-slot) | `calendar()` | `belongsTo` | `Calendar` |
| [CalendarSlot](/database/models/calendar-slot) | `bookings()` | `hasMany` | `Booking` |
| [CalendarSlot](/database/models/calendar-slot) | `user()` | `belongsTo` | `User` |
| [CalendarSlot](/database/models/calendar-slot) | `event_metas()` | `hasMany` | `Meta` |
| [BookingActivity](/database/models/booking-activity) | `booking()` | `belongsTo` | `Booking` |
| [BookingHost](/database/models/booking-host) | `booking()` | `belongsTo` | `Booking` |
| [BookingMeta](/database/models/booking-meta) | `booking()` | `belongsTo` | `Booking` |
| [Meta](/database/models/meta) | `calendar_event()` | `belongsTo` | `CalendarSlot` |
| [Staff](/database/models/staff) | `user()` | `belongsTo` | `User` |
| [User](/database/models/user) | `calendars()` | `hasMany` | `Calendar` |
| [User](/database/models/user) | `bookings()` | `belongsToMany` | `CalendarSlot` |
| [User](/database/models/user) | `staff()` | `hasOne` | `Staff` |
| [User](/database/models/user) | `metas()` | `hasMany` | `Meta` |
| [Order](/database/models/order) | `items()` | `hasMany` | `OrderItems` |
| [Order](/database/models/order) | `discounts()` | `hasMany` | `OrderItems` |
| [Order](/database/models/order) | `transaction()` | `hasOne` | `Transactions` |
| [Order](/database/models/order) | `booking()` | `belongsTo` | `Booking` |
