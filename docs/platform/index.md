---
title: Platform
description: Shortcodes, blocks, smartcodes, capabilities, and scheduled tasks — the WordPress-level surface of FluentBooking.
---

# Platform

The surface FluentBooking exposes through WordPress itself rather than through its own router: shortcodes and AJAX endpoints on the front end, Gutenberg blocks in the editor, smartcodes in email and landing-page templates, the permission sets the REST policies enforce, and the recurring background tasks.

| Reference | Entries | What it covers |
| --- | --- | --- |
| [Shortcodes & AJAX](/platform/shortcodes) | 6 shortcodes, 12 AJAX actions | Front-end embedding and the endpoints the public booking form posts to. |
| [Blocks](/platform/blocks) | 4 | Gutenberg blocks and their attributes. |
| [Smartcodes](/platform/smartcodes) | 59 | Template placeholders for emails, landing pages, and notifications. |
| [Permissions](/platform/permissions) | 9 permission sets, 11 policies | What each REST policy and MCP gate requires. |
| [Scheduled Tasks](/platform/scheduled-tasks) | 2 | Recurring Action Scheduler hooks and what each run does. |
| [Event Configuration](/platform/event-configuration) | 9 location types, 5 system fields, 14 field types | The keys an event's locations and booking form are configured with. |
| [Spam Protection](/platform/spam-protection) | 2 captcha providers | The providers that guard the public form, and the contract a custom one implements. |
