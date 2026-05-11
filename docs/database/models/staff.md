---
title: Staff Model
description: ORM reference for Staff in FluentBooking.
---

# Staff Model

Lightweight representation of a host/staff user — wraps WP user data with FluentBooking-specific helpers.

## Class

- **Source:** `fluent-booking/app/Models/Staff.php`
- **Primary key:** `id`
- **Extends:** `Meta`

## Relationships

| Method | Type | Target |
| --- | --- | --- |
| `user()` | `belongsTo` | `User` |

## Public Methods (sample)

| Method | Signature |
| --- | --- |
| `user()` | `—` |
