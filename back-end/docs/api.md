# GetHired REST API

Base URL: `http://localhost:3000`

## Root

### `GET /`

Returns API information and confirms that the NestJS server is available.

```json
{
  "success": true,
  "message": "GetHired API is running.",
  "data": {
    "project": "GetHired",
    "description": "Placement and Job Application Tracker",
    "endpoints": {
      "applications": "/applications",
      "dashboard": "/dashboard/stats"
    }
  }
}
```

## Applications

### `POST /applications`

Creates an application. `companyName` and `jobRole` are required. The status defaults to `Applied`.

```json
{
  "companyName": "Google",
  "jobRole": "Software Engineering Intern",
  "deadlineDate": "2026-06-30",
  "location": "Bengaluru",
  "resumeVersion": "Resume_v2.pdf",
  "packageOffered": "30K per month",
  "isDreamCompany": true
}
```

### `GET /applications`

Returns applications ordered by newest created first.

Optional queries:

| Query | Example | Purpose |
| --- | --- | --- |
| `status` | `/applications?status=Interview` | Filter by a valid status |
| `search` | `/applications?search=remote` | Search company, job role, or location |
| both | `/applications?status=Applied&search=google` | Search within one status |

### `GET /applications/:id`

Returns a single application. Responds with HTTP `404` when the id is not found.

### `PUT /applications/:id`

Updates supplied fields for an existing application. Responds with HTTP `404` when the id is not found.

```json
{
  "status": "Interview",
  "notes": "Technical interview scheduled."
}
```

### `DELETE /applications/:id`

Deletes one application and returns:

```json
{
  "success": true,
  "message": "Application deleted successfully."
}
```

## Dashboard

### `GET /dashboard/stats`

Returns totals for all statuses, dream companies, and the nearest five future application deadlines.

```json
{
  "total": 3,
  "applied": 1,
  "shortlisted": 0,
  "interview": 1,
  "offer": 1,
  "rejected": 0,
  "dreamCompanies": 2,
  "upcomingDeadlines": []
}
```
