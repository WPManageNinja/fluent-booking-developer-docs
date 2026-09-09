---
title: Integrations API
description: Global integration configuration (Zoom, Google, Outlook, Apple, FluentCRM, webhooks).
---

# Integrations API

Global integration configuration (Zoom, Google, Outlook, Apple, FluentCRM, webhooks).

## Authentication

These routes are registered with: `SettingsPolicy`.

## Endpoints

| Method | Path | Edition | Operation | Controller |
| --- | --- | --- | --- | --- |
| `GET` | `/integrations` | Core | [Integration Index](/rest-api/operations/integrations/integration-index) | `IntegrationController@index` |
| `POST` | `/integrations` | Core | [Integration Update](/rest-api/operations/integrations/integration-update) | `IntegrationController@update` |
| `GET` | `/integrations/{host_id}/settings` | <span class="pro-badge">PRO</span> | [Integration Settings Index](/rest-api/operations/integrations/integration-settings-index) | `IntegrationSettingsController@index` |
| `POST` | `/integrations/{host_id}/settings` | <span class="pro-badge">PRO</span> | [Integration Settings Update](/rest-api/operations/integrations/integration-settings-update) | `IntegrationSettingsController@update` |
| `POST` | `/integrations/{host_id}/disconnect` | <span class="pro-badge">PRO</span> | [Revoke](/rest-api/operations/integrations/revoke) | `IntegrationSettingsController@revoke` |
| `GET` | `/integrations/menu` | <span class="pro-badge">PRO</span> | [Get Integrations Menu](/rest-api/operations/integrations/get-integrations-menu) | `IntegrationSettingsController@getIntegrationsMenu` |
| `GET` | `/integrations/zoom/connected-users` | <span class="pro-badge">PRO</span> | [Get](/rest-api/operations/integrations/get) | `ZoomController@get` |
| `POST` | `/integrations/zoom/save-user-account` | <span class="pro-badge">PRO</span> | [Save](/rest-api/operations/integrations/save) | `ZoomController@save` |
| `POST` | `/integrations/zoom/disconnect` | <span class="pro-badge">PRO</span> | [Disconnect By Connect Id](/rest-api/operations/integrations/disconnect-by-connect-id) | `ZoomController@disconnectByConnectId` |
