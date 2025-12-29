# Getting Started

Welcome to the **Fluent Booking Developer Guide**. This documentation is designed to help you extend, customize, and integrate with the ultimate scheduling and appointment solution for WordPress.

## What is Fluent Booking?

Fluent Booking is a powerful, self-hosted scheduling solution built for WordPress. It allows users to manage multiple calendars, create various event types (slots), and handle complex availability rules—all while maintaining full control over their data and branding.

## Why Extend Fluent Booking?

Fluent Booking is built with developers in mind, offering a highly flexible architecture that can be tailored to meet unique business requirements.

### 🔧 Built for Customization
Whether you need to add custom fields to the booking form, modify availability logic, or change the frontend display, Fluent Booking provides the hooks needed to make it happen.

### 🏗️ Flexible Extension Points
With hundreds of [Action Hooks](/hooks/actions/) and [Filter Hooks](/hooks/filters/), you can intercept the booking process at almost any point—from before a schedule is created to after a payment is processed.

### 💼 Business Benefits
Extend Fluent Booking to build niche scheduling solutions, automate internal workflows, or create custom reporting dashboards for your clients.

## Fluent Booking Versions

Fluent Booking follows a modular approach, separating core scheduling functionality from advanced features like payments and deep integrations.

### Fluent Booking Core (Free)
The core plugin provides the foundation for scheduling:
- Unlimited Calendars & Events.
- Basic Notification System.
- Core REST API Access.
- Standard Availability Management.

### Fluent Booking Pro (Premium) <Badge type="tip" text="Pro" />
The Pro version unlocks advanced capabilities:
- **Payments**: Integration with Stripe, PayPal, and WooCommerce.
- **Advanced Integrations**: Zoom, Google Meet, Apple Calendar, and more.
- **Webhooks & SMS**: Send data to external services and SMS notifications.
- **Coupons & Discounts**: Manage promotional offers for paid bookings.

## Core Development Concepts

### 📊 Data Architecture
Fluent Booking uses a hierarchical data model to manage scheduling:

- **Calendars**: The top-level container (often representing a person, room, or resource).
- **Events (Slots)**: Specific types of appointments (e.g., "15 Min Consultation") associated with a calendar.
- **Bookings**: The individual records created when a user schedules time.
- **Availability**: Global or event-specific rules that define when a host is "busy" or "available".

### 🔄 Booking Workflow
Understanding the lifecycle of a booking:
1. **Selection**: Attendee selects an event type within a calendar.
2. **Availability Check**: The system calculates available slots based on host availability and existing bookings.
3. **Submission**: Attendee fills out the booking form (`fcal_bookings` created).
4. **Transition**: Booking moves through statuses: `scheduled`, `cancelled`, `completed`, or `pending` (for paid bookings).

## Directory Structure
Here is an overview of the plugin's internal organization:

```bash
fluent-booking/
├── app/
│   ├── Hooks/         # Action and Filter handlers
│   ├── Http/          # Controllers, Requests, and API Routes
│   ├── Models/        # Database Model classes (Eloquent-like)
│   └── Services/      # Core business logic and integrations
├── database/          # Migration files
└── assets/            # CSS, JS, and Frontend components
```

## Development Environment Setup

### Prerequisites
To develop with Fluent Booking, ensure your environment meets the following:
- **WordPress**: 6.0 or higher.
- **PHP**: 7.4 or higher (8.1+ recommended).
- **Fluent Booking**: Installed and activated on your local site.

### Development Tools
- **REST Client**: Insomnia or Postman for testing API endpoints.
- **Database Manager**: TablePlus or phpMyAdmin for examining the `fcal_` tables.
- **IDE**: VS Code or PHPStorm with PHP support.

### Getting Started Checklist
- [ ] Enable `WP_DEBUG` in your `wp-config.php` for error logging.
- [ ] Install and activate Fluent Booking (and Pro for payment/advanced integration dev).
- [ ] Explore the [REST API Overview](/rest-api/) to learn how to interact with data.
- [ ] Check out the [Action Hooks](/hooks/actions/) to start your first integration.

## Quick Start Guide

### 1. Database & Models
Fluent Booking uses a powerful Model system based on the Fluent Framework. You can interact with data easily using PHP:

```php
// Get all bookings for a specific calendar
$bookings = \FluentBooking\App\Models\Booking::where('calendar_id', 1)->get();

// Get a specific event slot
$slot = \FluentBooking\App\Models\CalendarSlot::find(5);
```

### 2. Developer Hooks
The easiest way to extend functionality is through hooks:

```php
// Send data to a custom API after a booking is scheduled
add_action('fluent_booking/after_booking_scheduled', function($booking, $calendar_event) {
    // Access booking details
    $email = $booking->email;
    $time = $booking->start_time;
    
    // Your custom logic here
}, 10, 2);
```

---

## Community & Support
If you have questions or need assistance:
- **📚 Learning Resources**: Check our [Rest API Guide](/rest-api/).
- **💬 Feedback**: Join our developer community or contact support via the official website.
