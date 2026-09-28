---
title: Reschedule Booking
description: Reschedule Booking for the FluentBooking Bookings API.
outline: false
aside: false
---

## Endpoint

- **Method:** `POST`
- **Path:** `/bookings/reschedule/{event_id}/{id}`
- **Edition:** Core
- **Controller:** `BookingController@rescheduleBooking`
- **Route source:** `fluent-booking/app/Http/Routes/api.php:70`
- **Policy:** `CalendarEventPolicy`

<OAOperation operationId="rescheduleBooking" specUrl="/openapi/public/bookings/reschedule-booking.json" />