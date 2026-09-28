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
  mcp: '#2653C7',
  platform: '#1a41a8',
  'getting-started': '#2653C7',
};

// Section labels for subtitle line
const SECTION_LABELS = {
  mcp: 'MCP Server',
  platform: 'Platform',
  'rest-api': 'REST API',
  'rest-api/calendars': 'REST API / Calendars',
  'rest-api/events': 'REST API / Events',
  'rest-api/event-availability': 'REST API / Event Availability',
  'rest-api/event-booking-fields': 'REST API / Booking Fields',
  'rest-api/event-notifications': 'REST API / Notifications',
  'rest-api/event-integrations': 'REST API / Event Integrations',
  'rest-api/event-settings': 'REST API / Event Settings',
  'rest-api/sharing-settings': 'REST API / Sharing',
  'rest-api/bookings': 'REST API / Bookings',
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
  guides: 'Guides',
  helpers: 'Helpers',
};

const pages = [
  // Homepage
  { path: 'index', title: 'FluentBooking', subtitle: 'Developer Docs', description: 'REST API, Hooks, Database Models & More' },
  // Getting Started
  { path: 'getting-started', title: 'Getting Started', description: 'Setup, Architecture, Booking Workflow & Quick Start' },
  // REST API (flat module layout matching new sidebar)
  { path: 'rest-api/index', title: 'REST API Overview', description: 'Authentication, Endpoints & Scheduling Resources' },
  { path: 'rest-api/error-handling', title: 'Error Handling', description: 'HTTP Status Codes & Error Response Formats' },
  { path: 'rest-api/resources', title: 'Resources', description: 'API Resource Types & Data Structures' },
  { path: 'rest-api/calendars', title: 'Calendars', description: 'Manage Scheduling Calendars & Hosts' },
  { path: 'rest-api/events', title: 'Events', description: 'Bookable Event Types & Slot Configuration' },
  { path: 'rest-api/event-availability', title: 'Event Availability', description: 'Per-Event Availability Rules' },
  { path: 'rest-api/event-booking-fields', title: 'Booking Fields', description: 'Per-Event Custom Booking Form Fields' },
  { path: 'rest-api/event-notifications', title: 'Email Notifications', description: 'Per-Event Email Notification Templates' },
  { path: 'rest-api/event-integrations', title: 'Event Integrations', description: 'Third-Party Connections per Event' },
  { path: 'rest-api/event-settings', title: 'Event Settings', description: 'Per-Event Details, Limits & Configuration' },
  { path: 'rest-api/sharing-settings', title: 'Sharing & Landing', description: 'Public Landing-Page Configuration' },
  { path: 'rest-api/bookings', title: 'Bookings', description: 'Create, Read & Manage Bookings' },
  { path: 'rest-api/schedules', title: 'Schedules', description: 'Schedule Management Endpoints' },
  { path: 'rest-api/availability', title: 'Availability Schedules', description: 'Reusable Availability Schedules' },
  { path: 'rest-api/settings', title: 'Settings', description: 'Plugin Settings & Configuration' },
  { path: 'rest-api/admin', title: 'Admin & Hosts', description: 'Admin Operations & Host Management' },
  { path: 'rest-api/reports', title: 'Reports', description: 'Analytics & Booking Statistics' },
  { path: 'rest-api/integrations', title: 'Integrations', description: 'Global Integration Settings' },
  { path: 'rest-api/webhooks', title: 'Webhooks & SMS', description: 'Outbound Data & SMS Notifications' },
  { path: 'rest-api/payments', title: 'Payments', description: 'Stripe, PayPal & Payment Processing' },
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
  { path: 'database/models/staff', title: 'Staff Model', description: 'Host & Staff User Wrapper' },
  { path: 'database/models/model', title: 'Base Model', description: 'Shared ORM Base Class' },
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
  { path: 'hooks/actions/miscellaneous', title: 'Miscellaneous Actions', description: 'Other Action Hooks' },
  { path: 'hooks/filters/index', title: 'Filter Hooks', description: 'Data Modification Hooks for Customization' },
  { path: 'hooks/filters/booking-configuration', title: 'Booking Configuration', description: 'Booking Data & Validation Filters' },
  { path: 'hooks/filters/calendar-and-event-settings', title: 'Calendar & Event Settings', description: 'Calendar Configuration Filters' },
  { path: 'hooks/filters/availability-and-slots', title: 'Availability & Slots', description: 'Time Slot & Availability Filters' },
  { path: 'hooks/filters/display-and-templates', title: 'Display & Templates', description: 'Frontend Display & Template Filters' },
  { path: 'hooks/filters/admin-and-configuration', title: 'Admin & Configuration', description: 'Admin Panel Configuration Filters' },
  { path: 'hooks/filters/payments-and-advanced', title: 'Payments & Advanced', description: 'Payment & Advanced Feature Filters' },
  { path: 'hooks/filters/integrations', title: 'Integration Filters', description: 'Third-Party Integration Data Filters' },
  { path: 'hooks/filters/miscellaneous', title: 'Miscellaneous Filters', description: 'Other Filter Hooks' },
  // Helpers
  { path: 'helpers/index', title: 'Helpers', description: 'Shared Service Classes & Static Helpers' },
  { path: 'helpers/helper-class', title: 'Helper Class Reference', description: 'Catalog of Static Helper Methods' },
  { path: 'helpers/service-api', title: 'Service API Index', description: 'Every Public Method on the Helper Services' },
  // MCP
  { path: 'mcp/index', title: 'MCP Server', description: 'AI Agent Abilities, Toolsets & Permissions' },
  // Platform
  { path: 'platform/index', title: 'Platform', description: 'Shortcodes, Blocks, Smartcodes, Permissions & Tasks' },
  { path: 'platform/shortcodes', title: 'Shortcodes & AJAX', description: 'Front-End Embedding & AJAX Endpoints' },
  { path: 'platform/blocks', title: 'Blocks', description: 'Gutenberg Blocks & Their Attributes' },
  { path: 'platform/smartcodes', title: 'Smartcodes', description: 'Template Placeholders for Emails & Pages' },
  { path: 'platform/permissions', title: 'Permissions', description: 'Permission Sets, REST Policies & MCP Gates' },
  { path: 'platform/scheduled-tasks', title: 'Scheduled Tasks', description: 'Recurring Background Work & Its Hooks' },
  { path: 'platform/event-configuration', title: 'Event Configuration', description: 'Location Types, Booking Fields & Field Types' },
  // Guides
  { path: 'guides/index', title: 'Guides', description: 'Practical Recipes for Extending FluentBooking' },
  { path: 'guides/code-snippets', title: 'Code Snippets', description: 'Drop-in Examples for Common Customizations' },
  { path: 'guides/theme-compatibility', title: 'Theme Compatibility', description: 'Make Booking Pages Render Correctly' },
  { path: 'guides/custom-booking-fields', title: 'Custom Booking Fields', description: 'Add Custom Fields to the Booking Form' },
  { path: 'guides/meta-settings-api', title: 'Meta Settings API', description: 'Store Custom Data on Calendars & Events' },
  { path: 'guides/incoming-webhooks', title: 'Incoming Webhooks', description: 'Trigger Bookings From External Services' },
  { path: 'guides/payment-integrations', title: 'Payment Integrations', description: 'Stripe, PayPal & Custom Gateways' },
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
