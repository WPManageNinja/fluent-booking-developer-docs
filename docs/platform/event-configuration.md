---
title: Event Configuration
description: Source-verified location types, system booking fields, and custom field types for FluentBooking events.
---

# Event Configuration

The vocabularies an event type is configured with. These keys travel as plain strings through the [REST API](/rest-api/), the [MCP abilities](/mcp/), and the `location_settings` / booking-field columns, so this is the list to check a value against.

## Location types

`location_type` on an event's `location_settings`. Conferencing types are declared by the free plugin but disabled there — FluentBooking Pro enables them through `fluent_booking/get_location_fields`.

| Group | Type | Label | Requires Pro |
| --- | --- | --- | --- |
| Conferencing | `google_meet` | Google Meet (Pro) | Yes |
| Conferencing | `ms_teams` | MS Teams (Pro) | Yes |
| Conferencing | `zoom_meeting` | Zoom Video (Pro) | Yes |
| In Person | `in_person_guest` | In Person (Attendee Address) | No |
| In Person | `in_person_organizer` | In Person (Organizer Address) | No |
| Phone | `phone_guest` | Attendee Phone Number | No |
| Phone | `phone_organizer` | Organizer Phone Number | No |
| Online | `online_meeting` | Online Meeting | No |
| Other | `custom` | Custom | No |

## System booking fields

Every event starts with these fields on its booking form. They cannot be deleted; a field marked not editable cannot be relabelled or made optional either.

| Field | Type | Label | Required | Editable |
| --- | --- | --- | --- | --- |
| `name` | `text` | Your Name | Yes | No |
| `email` | `email` | Your Email | Yes | No |
| `message` | `textarea` | What is this meeting about? | No | Yes |
| `cancellation_reason` | `textarea` | Reason for cancellation | Yes | Yes |
| `rescheduling_reason` | `textarea` | Reason for reschedule | Yes | Yes |

## Custom field types

The types an operator can add to a booking form, filterable through `fluent_booking/custom_fields_types`. See the [custom booking fields guide](/guides/custom-booking-fields) for the shape of a field entry and how to read submitted values.

| Type | Label |
| --- | --- |
| `email` | Email |
| `text` | Text |
| `textarea` | Textarea |
| `number` | Number |
| `phone` | Phone |
| `radio` | Radio |
| `dropdown` | Select |
| `multi-select` | Multi Select |
| `checkbox` | Checkbox |
| `checkbox-group` | Checkbox Group |
| `date` | Date |
| `file` | File |
| `hidden` | Hidden |
| `terms-and-conditions` | Terms & Conditions |
