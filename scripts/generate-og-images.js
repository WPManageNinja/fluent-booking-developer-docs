import sharp from 'sharp';
import { readFileSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outputDir = resolve(__dirname, '../public/images/og');
const logoPath = resolve(__dirname, '../public/images/fluentbooking-og.png');

const WIDTH = 1200;
const HEIGHT = 630;

// Section colors
const ACCENTS = {
  index: '#2653C7',
  'rest-api': '#2653C7',
  database: '#1a41a8',
  hooks: '#455689',
  'getting-started': '#2653C7',
};

// Section labels for subtitle line
const SECTION_LABELS = {
  'rest-api': 'REST API',
  'rest-api/calendars': 'REST API / Calendars',
  'rest-api/bookings': 'REST API / Bookings',
  'rest-api/events': 'REST API / Events',
  'rest-api/schedules': 'REST API / Schedules',
  'rest-api/availability': 'REST API / Availability',
  'rest-api/settings': 'REST API / Settings',
  'rest-api/admin': 'REST API / Admin',
  'rest-api/reports': 'REST API / Reports',
  'rest-api/integrations': 'REST API / Integrations',
  'rest-api/webhooks': 'REST API / Webhooks',
  'rest-api/payments': 'REST API / Payments',
  database: 'Database',
  'database/models': 'Database / Models',
  'hooks/actions': 'Action Hooks',
  'hooks/filters': 'Filter Hooks',
  hooks: 'Developer Hooks',
};

const pages = [
  // Homepage
  { path: 'index', title: 'FluentBooking', subtitle: 'Developer Docs', description: 'REST API, Hooks, Database Models & More' },
  // Getting Started
  { path: 'getting-started', title: 'Getting Started', description: 'Setup, Architecture, Booking Workflow & Quick Start' },
  // REST API
  { path: 'rest-api/index', title: 'REST API Overview', description: 'Authentication, Endpoints & Scheduling Resources' },
  { path: 'rest-api/authentication', title: 'Authentication', description: 'Secure API Access with Application Passwords' },
  { path: 'rest-api/error-handling', title: 'Error Handling', description: 'HTTP Status Codes & Error Response Formats' },
  { path: 'rest-api/resources', title: 'Resources', description: 'API Resource Types & Data Structures' },
  { path: 'rest-api/bookings/index', title: 'Bookings', description: 'Create & Manage Calendar Bookings' },
  { path: 'rest-api/calendars/index', title: 'Calendars', description: 'Manage Scheduling Hosts & Calendar Settings' },
  { path: 'rest-api/calendars/events', title: 'Calendar Events', description: 'Bookable Event Types & Slot Configuration' },
  { path: 'rest-api/calendars/event-availability', title: 'Event Availability', description: 'Manage Available Time Slots for Events' },
  { path: 'rest-api/calendars/event-settings', title: 'Event Settings', description: 'Configure Event Rules & Behavior' },
  { path: 'rest-api/calendars/event-notifications', title: 'Email Notifications', description: 'Configure Automated Booking Notifications' },
  { path: 'rest-api/calendars/event-booking-fields', title: 'Booking Fields', description: 'Custom Form Fields for the Booking Process' },
  { path: 'rest-api/calendars/event-integrations', title: 'Event Integrations', description: 'Third-Party Service Connections per Event' },
  { path: 'rest-api/calendars/sharing-settings', title: 'Sharing Settings', description: 'Landing Page & Public Calendar Configuration' },
  { path: 'rest-api/events/index', title: 'Events', description: 'Direct Event Access & Management' },
  { path: 'rest-api/availability/index', title: 'Availability Schedules', description: 'Global & Event-Specific Availability Rules' },
  { path: 'rest-api/schedules/index', title: 'Schedules', description: 'Manage Booking Schedules & Time Slots' },
  { path: 'rest-api/schedules/transactions', title: 'Transactions', description: 'Payment Transaction Records & History' },
  { path: 'rest-api/payments/index', title: 'Payments', description: 'Stripe, PayPal & Payment Processing' },
  { path: 'rest-api/webhooks/index', title: 'Webhooks & SMS', description: 'Outbound Data & SMS Notifications' },
  { path: 'rest-api/reports/index', title: 'Reports', description: 'Analytics & Booking Statistics' },
  { path: 'rest-api/admin/index', title: 'Admin', description: 'Admin Operations & Host Management' },
  { path: 'rest-api/integrations/index', title: 'Integrations', description: 'Global Integration Settings' },
  { path: 'rest-api/settings/index', title: 'Settings', description: 'Plugin Settings & Configuration' },
  // Database
  { path: 'database/schema', title: 'Database Schema', description: 'Table Structures, Indexes & Relationships' },
  { path: 'database/models', title: 'Database Models', description: 'ActiveRecord Models for FluentBooking Data' },
  { path: 'database/relationships', title: 'Model Relationships', description: 'HasMany, BelongsTo & Polymorphic Relations' },
  { path: 'database/query-builder', title: 'Query Builder', description: 'Fluent Database Queries & Raw Access' },
  { path: 'database/models/availability', title: 'Availability Model', description: 'Schedule Availability Rules & Overrides' },
  { path: 'database/models/booking-activity', title: 'BookingActivity Model', description: 'Booking Event Logs & Audit Trail' },
  { path: 'database/models/booking-host', title: 'BookingHost Model', description: 'Multi-Host Assignment & Team Scheduling' },
  { path: 'database/models/booking-meta', title: 'BookingMeta Model', description: 'Booking Custom Fields & Metadata' },
  { path: 'database/models/booking', title: 'Booking Model', description: 'Core Appointment & Scheduling Records' },
  { path: 'database/models/calendar', title: 'Calendar Model', description: 'Top-Level Scheduling Container' },
  { path: 'database/models/calendar-slot', title: 'CalendarSlot Model', description: 'Bookable Event Type Configuration' },
  { path: 'database/models/meta', title: 'Meta Model', description: 'Polymorphic Metadata Storage' },
  { path: 'database/models/order', title: 'Order Model', description: 'Payment Orders for Paid Bookings' },
  { path: 'database/models/order-items', title: 'OrderItems Model', description: 'Line Items within Payment Orders' },
  { path: 'database/models/transactions', title: 'Transactions Model', description: 'Payment Gateway Responses & Audit' },
  { path: 'database/models/user', title: 'User Model', description: 'WordPress User Integration' },
  { path: 'database/models/webhook', title: 'Webhook Model', description: 'Outbound Webhook Configuration' },
  // Hooks
  { path: 'hooks/index', title: 'Developer Hooks', description: 'Actions & Filters for Extending FluentBooking' },
  { path: 'hooks/actions/index', title: 'Action Hooks', description: 'Event-Driven Hooks for Custom Logic' },
  { path: 'hooks/actions/bookings-and-scheduling', title: 'Bookings & Scheduling', description: 'Booking Lifecycle Action Hooks' },
  { path: 'hooks/actions/calendars-and-events', title: 'Calendars & Events', description: 'Calendar & Event Management Hooks' },
  { path: 'hooks/actions/availability', title: 'Availability', description: 'Schedule Availability Action Hooks' },
  { path: 'hooks/actions/integrations', title: 'Integrations', description: 'Third-Party Integration Action Hooks' },
  { path: 'hooks/actions/landing-pages-and-display', title: 'Landing Pages & Display', description: 'Frontend Rendering Action Hooks' },
  { path: 'hooks/actions/admin-and-settings', title: 'Admin & Settings', description: 'Admin Dashboard Action Hooks' },
  { path: 'hooks/actions/payments-and-orders', title: 'Payments & Orders', description: 'Payment Processing Action Hooks' },
  { path: 'hooks/actions/coupons', title: 'Coupons', description: 'Coupon & Discount Action Hooks' },
  { path: 'hooks/filters/index', title: 'Filter Hooks', description: 'Data Modification Hooks for Customization' },
  { path: 'hooks/filters/booking-configuration', title: 'Booking Configuration', description: 'Booking Data & Validation Filters' },
  { path: 'hooks/filters/calendar-and-event-settings', title: 'Calendar & Event Settings', description: 'Calendar Configuration Filters' },
  { path: 'hooks/filters/availability-and-slots', title: 'Availability & Slots', description: 'Time Slot & Availability Filters' },
  { path: 'hooks/filters/display-and-templates', title: 'Display & Templates', description: 'Frontend Display & Template Filters' },
  { path: 'hooks/filters/admin-and-configuration', title: 'Admin & Configuration', description: 'Admin Panel Configuration Filters' },
  { path: 'hooks/filters/payments-and-advanced', title: 'Payments & Advanced', description: 'Payment & Advanced Feature Filters' },
  { path: 'hooks/filters/integrations', title: 'Integration Filters', description: 'Third-Party Integration Data Filters' },
];

function getSection(path) {
  if (path === 'home' || path === 'getting-started') return path;
  const top = path.split('/')[0];
  return top;
}

function getSectionLabel(path) {
  if (path === 'index') return 'Developer Docs';
  if (path === 'getting-started') return 'FluentBooking Developer Docs';

  // Try progressively shorter prefixes
  const parts = path.split('/');
  for (let i = parts.length - 1; i >= 1; i--) {
    const prefix = parts.slice(0, i).join('/');
    if (SECTION_LABELS[prefix]) return SECTION_LABELS[prefix];
  }
  return 'FluentBooking Developer Docs';
}

function esc(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function createSvg({ title, subtitle, description, accent }) {
  // Calculate font size based on title length
  let titleSize = 72;
  if (title.length > 28) titleSize = 52;
  else if (title.length > 20) titleSize = 60;

  return `<svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0f1117"/>
      <stop offset="100%" stop-color="#1a1d2e"/>
    </linearGradient>
    <linearGradient id="accent" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="${accent}"/>
      <stop offset="100%" stop-color="#455689"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#bg)"/>

  <!-- Accent bar at top -->
  <rect width="${WIDTH}" height="6" fill="url(#accent)"/>

  <!-- Grid dots pattern -->
  ${Array.from({ length: 12 }, (_, row) =>
    Array.from({ length: 20 }, (_, col) =>
      `<circle cx="${col * 65 + 30}" cy="${row * 58 + 30}" r="1.2" fill="#ffffff" opacity="0.06"/>`
    ).join('')
  ).join('')}

  <!-- Code bracket decorations -->
  <text x="950" y="180" font-family="monospace" font-size="200" fill="${accent}" opacity="0.07">{</text>
  <text x="1020" y="520" font-family="monospace" font-size="200" fill="${accent}" opacity="0.05">}</text>

  <!-- Subtitle / section -->
  <text x="80" y="260" font-family="Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif" font-size="24" font-weight="500" fill="#8892b0" letter-spacing="2">${esc(subtitle.toUpperCase())}</text>

  <!-- Title -->
  <text x="80" y="${titleSize === 72 ? 340 : 335}" font-family="Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif" font-size="${titleSize}" font-weight="700" fill="#e6e9f0">${esc(title)}</text>

  <!-- Description -->
  <text x="80" y="400" font-family="Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif" font-size="26" font-weight="400" fill="#8892b0">${esc(description)}</text>

  <!-- Bottom accent line -->
  <rect x="80" y="460" width="120" height="4" rx="2" fill="${accent}"/>

  <!-- Domain -->
  <text x="80" y="560" font-family="monospace" font-size="20" fill="#555e7e">developers.fluentbooking.com</text>
</svg>`;
}

async function generate() {
  // Resize logo once
  const logoBuffer = readFileSync(logoPath);
  const logo = await sharp(logoBuffer).resize(80, 80).png().toBuffer();

  let count = 0;
  for (const page of pages) {
    const section = getSection(page.path);
    const accent = ACCENTS[section] || '#2653C7';
    const subtitle = page.subtitle || getSectionLabel(page.path);

    const svg = createSvg({ title: page.title, subtitle, description: page.description, accent });
    const base = sharp(Buffer.from(svg)).png();

    const output = await base
      .composite([{ input: logo, top: 50, left: 80 }])
      .toBuffer();

    // Build output path: home.png, rest-api/index.png, rest-api/calendars/events.png, etc.
    const outPath = resolve(outputDir, page.path + '.png');
    mkdirSync(dirname(outPath), { recursive: true });
    await sharp(output).toFile(outPath);
    count++;
  }
  console.log(`Generated ${count} OG images.`);
}

generate().catch(console.error);
