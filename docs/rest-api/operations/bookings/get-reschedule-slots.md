---
title: Get Reschedule Slots
description: Get Reschedule Slots for the FluentBooking Bookings API.
outline: false
aside: false
---

## Endpoint

- **Method:** `GET`
- **Path:** `/bookings/reschedule/{event_id}/{id}/slots`
- **Edition:** Core
- **Controller:** `BookingController@getRescheduleSlots`
- **Route source:** `fluent-booking/app/Http/Routes/api.php:69`
- **Policy:** `CalendarEventPolicy`

<OAOperation operationId="getRescheduleSlots" specUrl="/openapi/public/bookings/get-reschedule-slots.json" />