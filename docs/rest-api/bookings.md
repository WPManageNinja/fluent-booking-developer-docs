---
title: Bookings API
description: Booking CRUD, listing, search, and patch endpoints.
---

# Bookings API

Booking CRUD, listing, search, and patch endpoints.

## Authentication

These routes are registered with: `CalendarEventPolicy`.

## Endpoints

| Method | Path | Edition | Operation | Controller |
| --- | --- | --- | --- | --- |
| `GET` | `/bookings` | Core | [Get Bookings](/rest-api/operations/bookings/get-bookings) | `BookingController@getBookings` |
| `GET` | `/bookings/event/{event_id}` | Core | [Get Event](/rest-api/operations/bookings/get-event) | `BookingController@getEvent` |
| `GET` | `/bookings/slots/{event_id}` | Core | [Get Slots](/rest-api/operations/bookings/get-slots) | `BookingController@getSlots` |
| `POST` | `/bookings/create/{event_id}` | Core | [Create Booking](/rest-api/operations/bookings/create-booking) | `BookingController@createBooking` |
