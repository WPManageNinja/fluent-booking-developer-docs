---
title: Settings API
description: Plugin-wide settings — general, branding, dashboard, email, and global configuration.
---

# Settings API

Plugin-wide settings — general, branding, dashboard, email, and global configuration.

## Authentication

These routes are registered with: `SettingsPolicy`.

## Endpoints

| Method | Path | Edition | Operation | Controller |
| --- | --- | --- | --- | --- |
| `GET` | `/settings/general` | Core | [Get General Settings](/rest-api/operations/settings/get-general-settings) | `SettingsController@getGeneralSettings` |
| `POST` | `/settings/general` | Core | [Update General Settings](/rest-api/operations/settings/update-general-settings) | `SettingsController@updateGeneralSettings` |
| `POST` | `/settings/payment` | Core | [Update Payment Settings](/rest-api/operations/settings/update-payment-settings) | `SettingsController@updatePaymentSettings` |
| `POST` | `/settings/theme` | Core | [Update Theme Settings](/rest-api/operations/settings/update-theme-settings) | `SettingsController@updateThemeSettings` |
| `GET` | `/settings/menu` | Core | [Get Settings Menu](/rest-api/operations/settings/get-settings-menu) | `SettingsController@getSettingsMenu` |
| `GET` | `/settings/global-modules` | Core | [Get Global Modules](/rest-api/operations/settings/get-global-modules) | `SettingsController@getGlobalModules` |
| `POST` | `/settings/global-modules` | Core | [Update Global Modules](/rest-api/operations/settings/update-global-modules) | `SettingsController@updateGlobalModules` |
| `GET` | `/settings/pages` | Core | [Get Pages](/rest-api/operations/settings/get-pages) | `SettingsController@getPages` |
| `POST` | `/settings/addons-settings` | Core | [Save Addons Settings](/rest-api/operations/settings/save-addons-settings) | `SettingsController@saveAddonsSettings` |
| `POST` | `/settings/install-plugin` | Core | [Install Plugin](/rest-api/operations/settings/install-plugin) | `SettingsController@installPlugin` |
| `GET` | `/settings/team` | <span class="pro-badge">PRO</span> | [Get Team Members](/rest-api/operations/settings/get-team-members) | `TeamController@getTeamMembers` |
| `POST` | `/settings/team` | <span class="pro-badge">PRO</span> | [Update Member Permission](/rest-api/operations/settings/update-member-permission) | `TeamController@updateMemberPermission` |
| `DELETE` | `/settings/team/{id}` | <span class="pro-badge">PRO</span> | [Delete Member](/rest-api/operations/settings/delete-member) | `TeamController@deleteMember` |
| `GET` | `/settings/license` | <span class="pro-badge">PRO</span> | [Get Status](/rest-api/operations/settings/get-status) | `LicenseController@getStatus` |
| `POST` | `/settings/license` | <span class="pro-badge">PRO</span> | [Save License](/rest-api/operations/settings/save-license) | `LicenseController@saveLicense` |
| `DELETE` | `/settings/license` | <span class="pro-badge">PRO</span> | [Deactivate License](/rest-api/operations/settings/deactivate-license) | `LicenseController@deactivateLicense` |
