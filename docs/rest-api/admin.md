---
title: Admin & Hosts API
description: Admin operations including host management, dashboard, and impersonation.
---

# Admin & Hosts API

Admin operations including host management, dashboard, and impersonation.

## Authentication

These routes are registered with: `AdminPolicy`.

## Endpoints

| Method | Path | Edition | Operation | Controller |
| --- | --- | --- | --- | --- |
| `GET` | `/admin/remaining-hosts` | Core | [Get Remaining Hosts](/rest-api/operations/admin/get-remaining-hosts) | `AdminController@getRemainingHosts` |
| `GET` | `/admin/other-hosts` | Core | [Get Other Hosts](/rest-api/operations/admin/get-other-hosts) | `AdminController@getOtherHosts` |
| `GET` | `/admin/all-hosts` | Core | [Get All Hosts](/rest-api/operations/admin/get-all-hosts) | `AdminController@getAllHosts` |
