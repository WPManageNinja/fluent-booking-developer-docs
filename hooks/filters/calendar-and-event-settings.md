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
- `$calendar` (object) - The calendar object where event is being created.

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
