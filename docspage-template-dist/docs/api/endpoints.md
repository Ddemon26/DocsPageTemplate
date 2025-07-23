# API Endpoints

Complete reference for all {{PROJECT_NAME}} API endpoints.

## Base URL

All API requests should be made to:
```
{{API_BASE_URL}}
```

## Authentication

All endpoints require authentication. See [Authentication Guide](authentication.md) for details.

```bash
curl -H "Authorization: Bearer YOUR_API_KEY" \
     {{API_BASE_URL}}/endpoint
```

## Core Endpoints

### Get Status

Check API status and health.

**Endpoint:** `GET /status`

**Response:**
```json
{
  "status": "ok",
  "version": "{{VERSION}}",
  "timestamp": "2024-01-15T10:30:00Z"
}
```

**Example:**
```bash
curl {{API_BASE_URL}}/status
```

### List Resources

Get a list of available resources.

**Endpoint:** `GET /resources`

**Parameters:**
- `limit` (optional): Number of results (default: 50, max: 100)
- `offset` (optional): Pagination offset (default: 0)
- `filter` (optional): Filter criteria

**Response:**
```json
{
  "data": [
    {
      "id": "resource-1",
      "name": "Example Resource",
      "type": "example",
      "created_at": "2024-01-15T10:30:00Z"
    }
  ],
  "pagination": {
    "total": 150,
    "limit": 50,
    "offset": 0,
    "has_more": true
  }
}
```

**Example:**
```bash
curl -H "Authorization: Bearer YOUR_API_KEY" \
     "https://api.yourproject.com/resources?limit=10&filter=active"
```

### Get Resource

Retrieve a specific resource by ID.

**Endpoint:** `GET /resources/{id}`

**Parameters:**
- `id` (required): Resource identifier

**Response:**
```json
{
  "id": "resource-1",
  "name": "Example Resource",
  "type": "example",
  "properties": {
    "key": "value"
  },
  "created_at": "2024-01-15T10:30:00Z",
  "updated_at": "2024-01-15T10:30:00Z"
}
```

**Example:**
```bash
curl -H "Authorization: Bearer YOUR_API_KEY" \
     https://api.yourproject.com/resources/resource-1
```

### Create Resource

Create a new resource.

**Endpoint:** `POST /resources`

**Request Body:**
```json
{
  "name": "New Resource",
  "type": "example",
  "properties": {
    "key": "value"
  }
}
```

**Response:**
```json
{
  "id": "resource-2",
  "name": "New Resource",
  "type": "example",
  "properties": {
    "key": "value"
  },
  "created_at": "2024-01-15T10:35:00Z",
  "updated_at": "2024-01-15T10:35:00Z"
}
```

**Example:**
```bash
curl -X POST \
     -H "Authorization: Bearer YOUR_API_KEY" \
     -H "Content-Type: application/json" \
     -d '{"name":"New Resource","type":"example"}' \
     https://api.yourproject.com/resources
```

### Update Resource

Update an existing resource.

**Endpoint:** `PUT /resources/{id}`

**Parameters:**
- `id` (required): Resource identifier

**Request Body:**
```json
{
  "name": "Updated Resource",
  "properties": {
    "key": "new_value"
  }
}
```

**Response:**
```json
{
  "id": "resource-1",
  "name": "Updated Resource",
  "type": "example",
  "properties": {
    "key": "new_value"
  },
  "created_at": "2024-01-15T10:30:00Z",
  "updated_at": "2024-01-15T10:40:00Z"
}
```

**Example:**
```bash
curl -X PUT \
     -H "Authorization: Bearer YOUR_API_KEY" \
     -H "Content-Type: application/json" \
     -d '{"name":"Updated Resource"}' \
     https://api.yourproject.com/resources/resource-1
```

### Delete Resource

Delete a resource.

**Endpoint:** `DELETE /resources/{id}`

**Parameters:**
- `id` (required): Resource identifier

**Response:**
```json
{
  "message": "Resource deleted successfully",
  "id": "resource-1"
}
```

**Example:**
```bash
curl -X DELETE \
     -H "Authorization: Bearer YOUR_API_KEY" \
     https://api.yourproject.com/resources/resource-1
```

## Advanced Endpoints

### Batch Operations

Perform operations on multiple resources.

**Endpoint:** `POST /resources/batch`

**Request Body:**
```json
{
  "operation": "update",
  "resources": [
    {
      "id": "resource-1",
      "data": {"name": "Updated Name 1"}
    },
    {
      "id": "resource-2",
      "data": {"name": "Updated Name 2"}
    }
  ]
}
```

### Search

Search resources with advanced filtering.

**Endpoint:** `POST /resources/search`

**Request Body:**
```json
{
  "query": "search term",
  "filters": {
    "type": "example",
    "created_after": "2024-01-01T00:00:00Z"
  },
  "sort": {
    "field": "created_at",
    "order": "desc"
  },
  "limit": 20
}
```

## Webhooks

### Register Webhook

Register a webhook endpoint.

**Endpoint:** `POST /webhooks`

**Request Body:**
```json
{
  "url": "https://your-app.com/webhook",
  "events": ["resource.created", "resource.updated"],
  "secret": "your-webhook-secret"
}
```

### List Webhooks

**Endpoint:** `GET /webhooks`

### Delete Webhook

**Endpoint:** `DELETE /webhooks/{id}`

## Error Responses

All endpoints may return these error responses:

### 400 Bad Request
```json
{
  "error": "bad_request",
  "message": "Invalid request parameters",
  "details": {
    "field": "name",
    "issue": "required"
  }
}
```

### 401 Unauthorized
```json
{
  "error": "unauthorized",
  "message": "Invalid or missing API key"
}
```

### 403 Forbidden
```json
{
  "error": "forbidden",
  "message": "Insufficient permissions"
}
```

### 404 Not Found
```json
{
  "error": "not_found",
  "message": "Resource not found"
}
```

### 429 Too Many Requests
```json
{
  "error": "rate_limit_exceeded",
  "message": "Too many requests",
  "retry_after": 60
}
```

### 500 Internal Server Error
```json
{
  "error": "internal_error",
  "message": "An unexpected error occurred"
}
```

## Rate Limits

- **Standard**: 1000 requests per hour
- **Premium**: 5000 requests per hour
- **Enterprise**: Custom limits

Rate limit headers are included in all responses:
```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1642248000
```

## SDKs and Libraries

Official SDKs are available for:
- JavaScript/Node.js
- Python
- Go
- PHP
- Ruby

See [API Overview](overview.md) for installation instructions.

## Postman Collection

Import our Postman collection for easy testing:
[Download Collection](https://yourproject.com/postman-collection.json)

## OpenAPI Specification

Full OpenAPI 3.0 specification:
[Download OpenAPI Spec](https://yourproject.com/openapi.json)

---

*API documentation is automatically generated from our OpenAPI specification. Last updated: 1.0.0*