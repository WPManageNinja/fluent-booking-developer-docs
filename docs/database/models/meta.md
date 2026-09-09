---
title: Meta Model
description: ORM reference for Meta in FluentBooking.
---

# Meta Model

Polymorphic key/value metadata table used by FluentBooking entities (calendars, events, availability, webhooks). Columns: `object_type`, `object_id`, `key`, `value`.

## Class

- **Source:** `fluent-booking/app/Models/Meta.php`
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

## Relationships

| Method | Type | Target |
| --- | --- | --- |
| `calendar_event()` | `belongsTo` | `CalendarSlot` |

## Public Methods

| Method | Signature |
| --- | --- |
| `setValueAttribute()` | `$value` |
| `getValueAttribute()` | `$value` |
| `calendar_event()` | `—` |
