---
title: Reports API
description: Analytics, exports, and reporting endpoints (Pro features included).
---

# Reports API

Analytics, exports, and reporting endpoints (Pro features included).

## Authentication

These routes are registered with: `UserPolicy`.

## Endpoints

| Method | Path | Edition | Operation | Controller |
| --- | --- | --- | --- | --- |
| `GET` | `/reports` | Core | [Get Reports](/rest-api/operations/reports/get-reports) | `ReportController@getReports` |
| `GET` | `/reports/graph-reports` | Core | [Get Graph Reports](/rest-api/operations/reports/get-graph-reports) | `ReportController@getGraphReports` |
| `GET` | `/reports/activities` | Core | [Get Activities](/rest-api/operations/reports/get-activities) | `ReportController@getActivities` |
