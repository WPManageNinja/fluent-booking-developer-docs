---
title: User Model
description: ORM reference for User in FluentBooking.
---

# User Model

Extended WordPress user model exposing FluentBooking-specific relations such as calendars and bookings.

## Class

- **Source:** `fluent-booking/app/Models/User.php`
- **Table:** `users`
- **Primary key:** `ID`
- **Extends:** `Model`

## Relationships

| Method | Type | Target |
| --- | --- | --- |
| `calendars()` | `hasMany` | `Calendar` |
| `bookings()` | `belongsToMany` | `CalendarSlot` |
| `staff()` | `hasOne` | `Staff` |
| `metas()` | `hasMany` | `Meta` |

## Public Methods (sample)

| Method | Signature |
| --- | --- |
| `calendars()` | `—` |
| `bookings()` | `—` |
| `user()` | `—` |
| `getFullNameAttribute()` | `—` |
| `staff()` | `—` |
| `metas()` | `—` |
| `getMeta()` | `$key, $default = null` |
| `updateMeta()` | `$key, $value` |
