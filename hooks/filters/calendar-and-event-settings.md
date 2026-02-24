# Calendar & Event Settings Filter Hooks

These filters allow you to customize the configuration and data of calendars and events.

## fluent_booking/calendar_event_options

Filters the default configuration options for new calendar events.

**Parameters:**
- `$options` (array) - Default event options.
- `$calendar_id` (int) - The ID of the calendar.

**Return:** (array) Modified options.

---

## fluent_booking/create_calendar_validation_rule

Filters the validation rules when creating a new calendar.

**Parameters:**
- `$rules` (array) - Default validation rules.

**Return:** (array) Modified rules.

**Example Usage:**
```php
add_filter('fluent_booking/create_calendar_validation_rule', function($rules) {
    $rules['title'] = 'required|min:5'; // Enforce minimum title length
    return $rules;
});
```

---

## fluent_booking/create_calendar_event_validation_rule

Filters the validation rules when creating a new calendar event (slot).

**Parameters:**
- `$rules` (array) - Default validation rules.

**Return:** (array) Modified rules.

---

## fluent_booking/create_calendar_event_data

Filters the data being used to create a new calendar event.

**Parameters:**
- `$data` (array) - Initial event data.
- `$calendar` (object) - The calendar object where the event is being created.

**Return:** (array) Modified data.

---

## fluent_booking/calendar_options_by_title

Filters the list of calendars when searched or sorted by title.

**Parameters:**
- `$calendars` (array) - List of calendars.

**Return:** (array) Modified list.

---

## fluent_booking/calendar_setting_menu_items

Filters the sidebar navigation menu items in the calendar settings view.

**Parameters:**
- `$menu_items` (array) - Default menu items.
- `$calendar` (object) - The calendar object.

**Return:** (array) Modified menu items.

**Example Usage:**
```php
add_filter('fluent_booking/calendar_setting_menu_items', function($menu_items, $calendar) {
    $menu_items[] = [
        'key' => 'custom_settings',
        'label' => 'Extension Settings',
        'path' => 'custom-path'
    ];
    return $menu_items;
}, 10, 2);
```

---

## fluent_booking/calendar_event_setting_menu_items

Filters the sidebar navigation menu items in the event/slot settings view.

**Parameters:**
- `$menu_items` (array) - Default menu items.
- `$event` (object) - The calendar event (slot) object.

**Return:** (array) Modified menu items.

---

## fluent_booking/get_calendar_event_settings

Filters the settings data for a calendar event when loaded in the admin editor.

**Parameters:**
- `$eventSettings` (array) - The event settings data.
- `$calendarEvent` (object) - The calendar event/slot object.
- `$calendar` (object) - The parent calendar object.

**Return:** (array) Modified event settings.

**Location:** `app/Http/Controllers/CalendarController.php`

---

## fluent_booking/update_event_details_validation_rule

Filters the validation rules when updating an event's details.

**Parameters:**
- `$rules` (array) - Default validation rules.

**Return:** (array) Modified rules.

**Location:** `app/Http/Controllers/CalendarController.php`

---

## fluent_booking/event_colors

Filters the available color options for calendar events.

**Parameters:**
- `$colors` (array) - Array of color options, each with `label` and `value` keys.

**Return:** (array) Modified color options.

**Location:** `app/Services/Helper.php`

---

## fluent_booking/event_short_description

Filters the short description text of a calendar event (used in previews/listings).

**Parameters:**
- `$description` (string) - The truncated description text.
- `$calendarSlot` (object) - The calendar event/slot object.

**Return:** (string) Modified description.

**Location:** `app/Models/CalendarSlot.php`

---

## fluent_booking/event_short_description_length

Filters the maximum character length for event short descriptions.

**Parameters:**
- `$maxLength` (int) - The maximum length (default: 160).
- `$calendarSlot` (object) - The calendar event/slot object.

**Return:** (int) Modified length.

**Location:** `app/Models/CalendarSlot.php`

---

## fluent_booking/get_location_fields

Filters the available location field types for calendar events.

**Parameters:**
- `$fields` (array) - Array of location field types (e.g., `conferencing`, `in_person`, `phone`).

**Return:** (array) Modified location fields.

**Location:** `app/Models/CalendarSlot.php`

---

## fluent_booking/save_event_booking_field_{fieldType}

Dynamic filter that fires when saving a specific type of booking field. The `{fieldType}` is the field type (e.g., `text`, `select`, `textarea`).

**Parameters:**
- `$formattedField` (array) - The formatted field data.
- `$value` (array) - The raw field value from the request.
- `$calendarEvent` (object) - The calendar event object.

**Return:** (array) Modified field data.

**Location:** `app/Http/Controllers/CalendarController.php`

---

## fluent_booking/editor_shortcodes_groups

Filters the available shortcode/placeholder groups in the notification editor.

**Parameters:**
- `$groups` (array) - The shortcode groups with their available placeholders.
- `$calendarEvent` (object) - The calendar event object.
- `$isHtmlSupported` (bool) - Whether HTML is supported in the current context.

**Return:** (array) Modified shortcode groups.

**Location:** `app/Services/Helper.php`
