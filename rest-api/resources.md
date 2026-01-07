# Resources

## Pagination

List endpoints support pagination to help manage large datasets. You can control pagination using the following query parameters:

| Parameter | Type | Description | Default |
| :--- | :--- | :--- | :--- |
| `page` | integer | The page number to retrieve. | `1` |
| `per_page` | integer | The number of items to return per page. | `10` |

### Example Request

```http
GET /wp-json/fluent-booking/v2/calendars?page=2&per_page=20
```

## Get Calendars

The Calendars resource allows you to retrieve details about all scheduling calendars, including their status, type, public URL, associated author information, and their available slots. Each calendar object includes metadata and an array of slots (event types) associated with that calendar.

### Structure

```json
{
  "calendars": {
    "data": [
      {
        "id": 1,
        "title": "Team Calendar",
        "slug": "team-calendar",
        "status": "active",
        "type": "team",
        "public_url": "https://example.com/calendar/team-calendar",
        "author_profile": {
          "ID": 10,
          "name": "Jane Doe"
        },
        "slots": [
          {
            "id": 101,
            "title": "30-Min Intro",
            "status": "active",
            "type": "free"
          }
        ]
      },
      {
        "id": 2,
        "title": "Personal Calendar",
        "slug": "personal-calendar",
        "status": "active",
        "type": "simple",
        "public_url": "https://example.com/calendar/personal-calendar",
        "author_profile": {
          "ID": 11,
          "name": "John Smith"
        },
        "slots": [
          {
            "id": 102,
            "title": "Quick Call",
            "status": "active",
            "type": "paid"
          }
        ]
      }
    ]
  }
}
```
