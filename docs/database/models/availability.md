---
title: Availability Model
description: ORM reference for Availability in FluentBooking.
---

# Availability Model

Availability schedule defining recurring weekly hours and date overrides. Stored in `fcal_meta` with `object_type='availability'` — the weekly schedule lives in the serialized `value` column.

## Class

- **Source:** `fluent-booking/app/Models/Availability.php`
- **Table:** `fcal_meta`
- **Primary key:** `id`
- **Extends:** `Model`

## Attributes

| Column | Type | Nullable | Default | Description |
| --- | --- | --- | --- | --- |
| `id` | `BIGINT UNSIGNED NOT NULL PRIMARY KEY` | Yes | `—` | Primary key for the row. |
| `object_type` | `VARCHAR(50)` | No | `—` | Polymorphic object type for the meta row. |
| `object_id` | `BIGINT` | Yes | `—` | Polymorphic object ID for the meta row. |
| `key` | `VARCHAR(192)` | No | `—` | Meta key. |
| `value` | `LONGTEXT` | Yes | `—` | Meta value (often JSON-encoded). |
| `created_at` | `TIMESTAMP` | Yes | `—` | Creation timestamp maintained by the ORM. |
| `updated_at` | `TIMESTAMP` | Yes | `—` | Update timestamp maintained by the ORM. |

## Public Methods

| Method | Signature |
| --- | --- |
| `setValueAttribute()` | `$value` |
| `getValueAttribute()` | `$value` |
| `getAuthor()` | `—` |
