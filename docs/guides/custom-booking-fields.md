---
title: Custom Booking Fields
description: How FluentBooking booking-form fields work and how to extend them.
---

# Custom Booking Fields

FluentBooking ships with a configurable booking-form builder. For every event you can add fields from the built-in field-type catalog, mark them required, and persist the submitted values into `fcal_booking_meta`.

## Built-in Field Types

`FluentBooking\App\Services\Helper::getCustomFieldTypes()` returns the catalog of selectable field types. Each entry is a `{ value, label }` pair:

```php
// Source: app/Services/Helper.php
return apply_filters('fluent_booking/custom_fields_types', [
    ['value' => 'email',                 'label' => 'Email'],
    ['value' => 'text',                  'label' => 'Text'],
    ['value' => 'textarea',              'label' => 'Textarea'],
    ['value' => 'number',                'label' => 'Number'],
    ['value' => 'phone',                 'label' => 'Phone'],
    ['value' => 'radio',                 'label' => 'Radio'],
    ['value' => 'dropdown',              'label' => 'Select'],
    ['value' => 'multi-select',          'label' => 'Multi Select'],
    ['value' => 'checkbox',              'label' => 'Checkbox'],
    ['value' => 'checkbox-group',        'label' => 'Checkbox Group'],
    ['value' => 'date',                  'label' => 'Date'],
    ['value' => 'file',                  'label' => 'File'],
    ['value' => 'hidden',                'label' => 'Hidden'],
    ['value' => 'terms-and-conditions',  'label' => 'Terms & Conditions'],
]);
```

For most cases you do not need to extend this list — the **Booking Fields** tab on each event lets you add any of the above types with full configuration.

## Adding a Type Entry

The `fluent_booking/custom_fields_types` filter only controls which entries appear in the field-type dropdown of the field editor. Rendering, validation, persistence, and reading the value are handled by the plugin only for the built-in types. Adding a new entry exposes the option in the editor but does **not** automatically provide a renderer for it.

```php
add_filter('fluent_booking/custom_fields_types', function ($types) {
    $types[] = [
        'value' => 'custom_signature',
        'label' => 'E-Signature',
    ];
    return $types;
});
```

If you add a new type slug, you also need to ship the front-end JS/CSS that renders and validates the field, and a server-side handler that persists the submitted value into `fcal_booking_meta`. This is a non-trivial integration; for most use cases stick to the built-in types.

## Reading Submitted Values

Booking-form answers are saved as rows in `fcal_booking_meta` (`booking_id`, `meta_key`, `value`). Read them with the helper:

```php
use FluentBooking\App\Services\Helper;

$value = Helper::getBookingMeta($bookingId, 'your_field_name');
```

Or eager-load the relationship:

```php
use FluentBooking\App\Models\Booking;

$booking = Booking::with('booking_meta')->find($bookingId);
foreach ($booking->booking_meta as $row) {
    // $row->meta_key, $row->value
}
```

## Formatted Custom-Field Data

For a single booking, the plugin already builds the human-readable representation of custom fields via:

```php
use FluentBooking\App\Services\BookingFieldService;

$rows = BookingFieldService::getFormattedCustomBookingData($booking, $htmlSupport = true, $isPublic = false);
```

Use this in custom templates or webhooks instead of re-implementing the format.

## Hook Surface

| Hook | Type | Purpose |
| --- | --- | --- |
| `fluent_booking/custom_fields_types` | filter | Edit the dropdown of selectable field types (returns `array<{value, label}>`). |
| `fluent_booking/booking_fields` | filter | Modify the resolved list of fields for an event right before they are sent to the booking form (`($fields, $calendarSlot)`). |
| `fluent_booking/booking_data` | filter | Filter the booking payload before persistence (`($bookingData, $calendarSlot, $customFieldsData, $rawData)`). |

For the full hook catalog, see [Filter Hooks → Booking Configuration](/hooks/filters/booking-configuration).
