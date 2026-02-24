# Developer Hooks Overview

FluentBooking is built on an extensible architecture, offering hundreds of WordPress **Actions** and **Filters** that allow you to customize almost every aspect of the plugin without modifying the core files.

## Action Hooks

Actions allow you to "hook" into specific events during the FluentBooking lifecycle and execute your own custom code. They are perfect for triggering side effects like:
- Syncing booking data with an external CRM.
- Triggering custom notifications or SMS.
- Logging activity to a third-party analytics service.

### Example Action Hook
```php
add_action('fluent_booking/after_booking_scheduled', function($booking, $calendar_event) {
    // Execute custom logic after a booking is successfully saved
}, 10, 2);
```

[Browse Action Hooks Reference](/hooks/actions/)

---

## Filter Hooks

Filters allow you to intercept and modify data before it is saved to the database or displayed on the frontend. They are ideal for:
- Adding custom fields to the booking form.
- Modifying availability rules on the fly.
- Changing the content of emails or confirmation messages.

### Example Filter Hook
```php
add_filter('fluent_booking/available_slots_for_view', function($slots, $event, $calendar, $tz, $duration) {
    // Dynamically remove specific slots based on your own logic
    return $slots;
}, 10, 5);
```

[Browse Filter Hooks Reference](/hooks/filters/)

## Why Extend with Hooks?

### 🔋 Batteries Included
FluentBooking provides hooks for almost everything — from UI rendering in the admin to payment processing in the background.

### 🛡️ Future-Proof
By using hooks instead of modifying plugin files, your customizations remain intact even after you update FluentBooking to the latest version.

### 🧩 Plugin Interoperability
Hooks allow other plugins to interact seamlessly with FluentBooking, enabling a rich ecosystem of integrations (like FluentCRM, Fluent Boards, etc.).

## Hook Naming Standards
Most FluentBooking hooks follow a consistent naming pattern:
- **Namespace**: All hooks are prefixed with `fluent_booking/`.
- **Timing**: Prefixes like `before_` or `after_` indicate exactly when the hook fires relative to the event.
- **Dynamic Hooks**: Some hooks include dynamic segments like `{key}` (e.g., `fluent_booking/integration_notify_{key}`).

---

## Getting Started
To start using hooks, you can add your custom functions to your theme's `functions.php` file or create a custom "glue" plugin.

1. Explore [Action Hooks](/hooks/actions/) for event-driven logic.
2. Explore [Filter Hooks](/hooks/filters/) for data-driven customizations.
