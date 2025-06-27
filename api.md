# QUBIT_HIRE API Documentation

This document outlines the API endpoints available in the QUBIT_HIRE platform.

## Base URL

```
https://api.smarthr.example.com/v1
```

## Authentication

All API requests require authentication using JWT Bearer tokens.

### Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/login` | User login |
| POST | `/auth/logout` | User logout |
| POST | `/auth/refresh` | Refresh access token |
| POST | `/auth/reset-password` | Request password reset |

#### Request: Login

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

#### Response: Login

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "usr_123456",
    "name": "John Doe",
    "email": "user@example.com",
    "role": "hr_manager"
  }
}
```

## Users

Manage users with various roles (HR Manager, Recruiter, Interviewer, etc.)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/users` | List all users |
| GET | `/users/{id}` | Get user details |
| POST | `/users` | Create a new user |
| PUT | `/users/{id}` | Update a user |
| DELETE | `/users/{id}` | Delete a user |
| GET | `/users/{id}/permissions` | Get user permissions |

### Query Parameters

- `page`: Page number for pagination
- `limit`: Number of records per page
- `role`: Filter by role
- `department`: Filter by department

## Employees

Manage employee records.

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/employees` | List all employees |
| GET | `/employees/{id}` | Get employee details |
| POST | `/employees` | Create a new employee |
| PUT | `/employees/{id}` | Update an employee |
| DELETE | `/employees/{id}` | Delete an employee |
| GET | `/employees/{id}/documents` | Get employee documents |
| POST | `/employees/{id}/documents` | Upload employee document |
| GET | `/employees/departments` | List all departments |

## Applicants

Manage job applicants and their application process.

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/applicants` | List all applicants |
| GET | `/applicants/{id}` | Get applicant details |
| POST | `/applicants` | Create a new applicant |
| PUT | `/applicants/{id}` | Update an applicant |
| DELETE | `/applicants/{id}` | Delete an applicant |
| GET | `/applicants/{id}/resume` | Get applicant resume |
| POST | `/applicants/{id}/resume` | Upload applicant resume |
| GET | `/applicants/{id}/status` | Get application status |
| PUT | `/applicants/{id}/status` | Update application status |
| GET | `/applicants/sources` | List applicant sources |

### Applicant Status Values

- `applied`
- `screening`
- `interview_scheduled`
- `interview_completed`
- `assessment`
- `offer_pending`
- `offer_sent`
- `hired`
- `rejected`
- `withdrawn`

## Jobs / Vacancies

Manage job listings and vacancies.

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/jobs` | List all jobs |
| GET | `/jobs/{id}` | Get job details |
| POST | `/jobs` | Create a new job |
| PUT | `/jobs/{id}` | Update a job |
| DELETE | `/jobs/{id}` | Delete a job |
| GET | `/jobs/{id}/applicants` | Get applicants for a job |
| POST | `/jobs/{id}/publish` | Publish a job |
| POST | `/jobs/{id}/unpublish` | Unpublish a job |
| GET | `/jobs/categories` | List job categories |
| GET | `/jobs/types` | List job types (full-time, part-time, etc.) |

### Job Types

- `full_time`
- `part_time`
- `contract`
- `internship`
- `temporary`

### Job Locations

- `on_site`
- `remote`
- `hybrid`

## Interviews

Manage interview scheduling and feedback.

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/interviews` | List all interviews |
| GET | `/interviews/{id}` | Get interview details |
| POST | `/interviews` | Schedule a new interview |
| PUT | `/interviews/{id}` | Update an interview |
| DELETE | `/interviews/{id}` | Cancel an interview |
| POST | `/interviews/{id}/feedback` | Submit interview feedback |
| GET | `/interviews/{id}/feedback` | Get interview feedback |
| GET | `/interviews/slots` | Get available interview slots |

## Tasks

Manage HR team tasks and activities.

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/tasks` | List all tasks |
| GET | `/tasks/{id}` | Get task details |
| POST | `/tasks` | Create a new task |
| PUT | `/tasks/{id}` | Update a task |
| DELETE | `/tasks/{id}` | Delete a task |
| PUT | `/tasks/{id}/assign` | Assign task to user |
| PUT | `/tasks/{id}/complete` | Mark task as complete |
| GET | `/tasks/types` | List task types |

### Task Types

- `screening`
- `interview`
- `assessment`
- `offer`
- `onboarding`
- `general`

## Analytics

Get recruitment analytics and reports.

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/analytics/dashboard` | Get dashboard analytics |
| GET | `/analytics/applications` | Get application statistics |
| GET | `/analytics/hiring` | Get hiring statistics |
| GET | `/analytics/sources` | Get applicant sources statistics |
| GET | `/analytics/departments` | Get department statistics |
| GET | `/analytics/time-to-hire` | Get time-to-hire statistics |
| GET | `/analytics/cost-per-hire` | Get cost-per-hire statistics |
| GET | `/analytics/custom` | Get custom analytics (with parameters) |

### Sample Response: Dashboard Analytics

```json
{
  "total_applications": 1534,
  "total_shortlisted": 869,
  "total_hired": 236,
  "total_rejected": 429,
  "application_trend": [
    {"date": "2023-01-01", "count": 120},
    {"date": "2023-01-02", "count": 98},
    // ...
  ],
  "application_by_department": [
    {"department": "Engineering", "count": 350},
    {"department": "Marketing", "count": 200},
    {"department": "Sales", "count": 300},
    {"department": "Support", "count": 150}
  ],
  "application_sources": [
    {"source": "Job Boards", "count": 350},
    {"source": "Employee Referrals", "count": 200},
    {"source": "Social Media", "count": 300},
    {"source": "Agencies", "count": 150}
  ]
}
```

## Error Responses

All endpoints use standard HTTP status codes and return error details in the response body.

### Example Error Response

```json
{
  "error": {
    "code": "validation_error",
    "message": "Invalid input data",
    "details": [
      {
        "field": "email",
        "message": "Must be a valid email address"
      }
    ]
  }
}
```

## Pagination

All list endpoints support pagination with the following parameters:

- `page`: Page number (default: 1)
- `limit`: Items per page (default: 20, max: 100)

### Pagination Response Format

```json
{
  "data": [...],
  "pagination": {
    "total": 1534,
    "page": 1,
    "limit": 20,
    "pages": 77
  }
}
``` 