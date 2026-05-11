---
title: Payments API
description: Payment gateways, transactions, orders, and coupon administration (Pro).
---

# Payments API

Payment gateways, transactions, orders, and coupon administration (Pro).

## Authentication

These routes are registered with: `CalendarPolicy`, `MeetingPolicy`, `SettingsPolicy`.

## Endpoints

| Method | Path | Edition | Operation | Controller |
| --- | --- | --- | --- | --- |
| `GET` | `/calendars/{id}/events/{event_id}/payment-settings` | Core | [Get Event Payment Settings](/rest-api/operations/payments/get-event-payment-settings) | `CalendarController@getEventPaymentSettings` |
| `PUT` | `/schedules/{id}/transactions/{transaction_id}` | <span class="pro-badge">PRO</span> | [Update Transaction](/rest-api/operations/payments/update-transaction) | `TransactionController@updateTransaction` |
| `GET` | `/calendars/{id}/events/{event_id}/payment-settings` | <span class="pro-badge">PRO</span> | [Get Payment Settings](/rest-api/operations/payments/get-payment-settings) | `PaymentMethodController@getPaymentSettings` |
| `POST` | `/calendars/{id}/events/{event_id}/payment-settings` | <span class="pro-badge">PRO</span> | [Update Payment Settings](/rest-api/operations/payments/update-payment-settings) | `PaymentMethodController@updatePaymentSettings` |
| `GET` | `/integrations/settings/payment-methods/all` | <span class="pro-badge">PRO</span> | [Index](/rest-api/operations/payments/index) | `PaymentMethodController@index` |
| `POST` | `/integrations/settings/payment-methods` | <span class="pro-badge">PRO</span> | [Store](/rest-api/operations/payments/store) | `PaymentMethodController@store` |
| `GET` | `/integrations/settings/payment-methods` | <span class="pro-badge">PRO</span> | [Get Settings](/rest-api/operations/payments/get-settings) | `PaymentMethodController@getSettings` |
| `GET` | `/integrations/settings/payment-methods/connect/info` | <span class="pro-badge">PRO</span> | [Connect Info](/rest-api/operations/payments/connect-info) | `PaymentMethodController@connectInfo` |
| `POST` | `/integrations/settings/payment-methods/disconnect` | <span class="pro-badge">PRO</span> | [Disconnect](/rest-api/operations/payments/disconnect) | `PaymentMethodController@disconnect` |
| `GET` | `/integrations/settings/payment-methods/currencies` | <span class="pro-badge">PRO</span> | [Currencies](/rest-api/operations/payments/currencies) | `PaymentMethodController@currencies` |
| `GET` | `/integrations/options/woo-products` | <span class="pro-badge">PRO</span> | [Get Woo Products](/rest-api/operations/payments/get-woo-products) | `PaymentMethodController@getWooProducts` |
