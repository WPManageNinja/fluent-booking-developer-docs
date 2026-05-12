---
title: Model Model
description: ORM reference for Model in FluentBooking.
---

# Model Model

Shared base ORM class extended by every FluentBooking model. Sets up timestamps, casts, and the booted-trait pipeline.

## Class

- **Source:** `fluent-booking/app/Models/Model.php`
- **Primary key:** `id`
- **Extends:** `BaseModel`

## Query Scopes

| Scope | Parameters |
| --- | --- |
| `Latest` | `$query, $field = 'created_at'` |
| `Newest` | `$query, $field = 'created_at'` |

## Public Methods (sample)

| Method | Signature |
| --- | --- |
| `getPerPage()` | `—` |
| `freshTimestamp()` | `—` |
| `getTimezone()` | `—` |
