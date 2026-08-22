---
title: Event Integrations API
description: Per-event integration configuration (CRM, automation feeds, custom integrations).
---

# Event Integrations API

Per-event integration configuration (CRM, automation feeds, custom integrations).

## Endpoints

| Method | Path | Edition | Operation | Controller |
| --- | --- | --- | --- | --- |
| `GET` | `/calendars/{id}/events/{event_id}/integrations` | Core | [Index](/rest-api/operations/event-integrations/index) | `CalendarIntegrationController@index` |
| `POST` | `/calendars/{id}/events/{event_id}/integrations/clone` | Core | [Clone Integrations](/rest-api/operations/event-integrations/clone-integrations) | `CalendarIntegrationController@cloneIntegrations` |
| `GET` | `/calendars/{id}/events/{event_id}/integrations/{integration_id}` | Core | [Find](/rest-api/operations/event-integrations/find) | `CalendarIntegrationController@find` |
| `POST` | `/calendars/{id}/events/{event_id}/integrations/{integration_id}` | Core | [Update](/rest-api/operations/event-integrations/update) | `CalendarIntegrationController@update` |
| `DELETE` | `/calendars/{id}/events/{event_id}/integrations/{integration_id}` | Core | [Delete](/rest-api/operations/event-integrations/delete) | `CalendarIntegrationController@delete` |
| `GET` | `/calendars/{id}/events/{event_id}/integrations/{integration_id}/merge-fields` | Core | [Integration List Component](/rest-api/operations/event-integrations/integration-list-component) | `CalendarIntegrationController@integrationListComponent` |
| `GET` | `/calendars/{id}/events/{event_id}/integrations/{integration_id}/config-field-options` | Core | [Get Config Field Options](/rest-api/operations/event-integrations/get-config-field-options) | `CalendarIntegrationController@getConfigFieldOptions` |
| `POST` | `/calendars/{id}/events/{event_id}/integrations/{integration_id}/crm-taxonomy` | Core | [Create Crm Taxonomy](/rest-api/operations/event-integrations/create-crm-taxonomy) | `CalendarIntegrationController@createCrmTaxonomy` |
