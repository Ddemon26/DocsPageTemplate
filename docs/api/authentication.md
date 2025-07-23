# API Authentication

Learn how to authenticate with the Your Project Name API to access protected resources.

## Overview

The Your Project Name API uses API keys for authentication. This secure method ensures that only authorized applications can access your data and perform operations on your behalf.

## Authentication Methods

### API Key Authentication (Recommended)

API keys are the primary authentication method for the Your Project Name API. They provide secure, token-based access to your resources.

### OAuth 2.0 (Coming Soon)

OAuth 2.0 support is planned for future releases, enabling more granular permission control and third-party integrations.

## Getting Your API Key

### Step 1: Access the Dashboard

1. Visit the [Your Project Name Dashboard](https://dashboard.yourproject.com)
2. Sign in to your account or create a new one
3. Complete email verification if prompted

### Step 2: Generate API Key

1. Navigate to **Settings** → **API Keys**
2. Click **"Create New API Key"**
3. Enter a descriptive name (e.g., "Production App", "Development")
4. Select the required permissions/scopes
5. Click **"Generate Key"**

⚠️ **Important**: Copy and store your API key immediately. It will only be displayed once for security reasons.

## Using Your API Key

### HTTP Header Authentication

Include your API key in the `Authorization` header:

```http
GET /api/v1/users HTTP/1.1
Host: https://api.yourproject.com
Authorization: Bearer YOUR_API_KEY_HERE
Content-Type: application/json
```

### Code Examples

**JavaScript/Node.js:**
```javascript
const apiKey = process.env.Your Project Name_API_KEY;

const response = await fetch('https://api.yourproject.com/v1/users', {
    method: 'GET',
    headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
    }
});

const data = await response.json();
console.log(data);
```

**Python:**
```python
import os
import requests

api_key = os.getenv('Your Project Name_API_KEY')
headers = {
    'Authorization': f'Bearer {api_key}',
    'Content-Type': 'application/json'
}

response = requests.get('https://api.yourproject.com/v1/users', headers=headers)
data = response.json()
print(data)
```

**cURL:**
```bash
curl -X GET \
  https://api.yourproject.com/v1/users \
  -H 'Authorization: Bearer YOUR_API_KEY_HERE' \
  -H 'Content-Type: application/json'
```

**PHP:**
```php
<?php
$apiKey = getenv('Your Project Name_API_KEY');
$headers = [
    'Authorization: Bearer ' . $apiKey,
    'Content-Type: application/json'
];

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, 'https://api.yourproject.com/v1/users');
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$response = curl_exec($ch);
$data = json_decode($response, true);
curl_close($ch);
?>
```

## API Key Permissions

API keys support granular permissions to follow the principle of least privilege:

| Permission | Description | Allowed Operations |
|------------|-------------|-------------------|
| `read` | Read-only access | GET requests only |
| `write` | Create and update | GET, POST, PUT, PATCH |
| `delete` | Delete resources | All HTTP methods |
| `admin` | Full access | All operations + admin functions |

### Permission Examples

**Read-only API key:**
```javascript
// ✅ Allowed operations
await fetch('https://api.yourproject.com/v1/users');           // GET
await fetch('https://api.yourproject.com/v1/projects');        // GET

// ❌ Forbidden operations
await fetch('https://api.yourproject.com/v1/users', {          // POST
    method: 'POST',
    body: JSON.stringify({name: 'John'})
});
```

**Write-enabled API key:**
```javascript
// ✅ Allowed operations
await fetch('https://api.yourproject.com/v1/users');           // GET
await fetch('https://api.yourproject.com/v1/users', {          // POST
    method: 'POST',
    body: JSON.stringify({name: 'John'})
});

// ❌ Forbidden operations
await fetch('https://api.yourproject.com/v1/users/123', {      // DELETE
    method: 'DELETE'
});
```

## Security Best Practices

### 1. Environment Variables

Never hardcode API keys in your source code:

```javascript
// ✅ Secure - using environment variables
const apiKey = process.env.Your Project Name_API_KEY;

// ❌ Insecure - hardcoded key
const apiKey = 'sk-1234567890abcdef';
```

### 2. Key Rotation

Regularly rotate your API keys:

1. Generate a new API key with the same permissions
2. Update your applications to use the new key
3. Test thoroughly in a staging environment
4. Deploy to production
5. Revoke the old API key

### 3. Monitoring and Alerts

Monitor your API usage:

- Set up alerts for unusual activity patterns
- Review API access logs regularly
- Monitor rate limit usage
- Track failed authentication attempts

### 4. Network Security

- Use HTTPS for all API requests
- Implement IP whitelisting when possible
- Use VPN or private networks for sensitive operations

## Error Handling

### Common Error Responses

**Invalid API Key (401):**
```json
{
    "error": {
        "code": "INVALID_API_KEY",
        "message": "The provided API key is invalid or has been revoked",
        "details": "Please check your API key and try again"
    }
}
```

**Insufficient Permissions (403):**
```json
{
    "error": {
        "code": "INSUFFICIENT_PERMISSIONS",
        "message": "Your API key does not have permission to perform this action",
        "required_permission": "write",
        "current_permissions": ["read"]
    }
}
```

**Rate Limit Exceeded (429):**
```json
{
    "error": {
        "code": "RATE_LIMIT_EXCEEDED",
        "message": "API rate limit exceeded",
        "retry_after": 60,
        "limit": 1000,
        "remaining": 0,
        "reset": 1640995200
    }
}
```

### Error Handling Example

```javascript
async function makeApiRequest(endpoint) {
    try {
        const response = await fetch(`https://api.yourproject.com${endpoint}`, {
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            const error = await response.json();
            
            switch (response.status) {
                case 401:
                    throw new Error('Invalid API key. Please check your credentials.');
                case 403:
                    throw new Error(`Insufficient permissions: ${error.error.message}`);
                case 429:
                    throw new Error(`Rate limit exceeded. Retry after ${error.error.retry_after} seconds.`);
                default:
                    throw new Error(`API error: ${error.error.message}`);
            }
        }

        return await response.json();
    } catch (error) {
        console.error('API request failed:', error.message);
        throw error;
    }
}
```

## Testing Your Authentication

### Health Check Endpoint

Test your API key with the health check endpoint:

```http
GET /api/v1/auth/verify
Authorization: Bearer YOUR_API_KEY_HERE
```

**Successful Response:**
```json
{
    "success": true,
    "data": {
        "authenticated": true,
        "key_id": "key_abc123",
        "permissions": ["read", "write"],
        "rate_limit": {
            "limit": 1000,
            "remaining": 999,
            "reset": 1640995200
        },
        "user": {
            "id": "user_123",
            "email": "user@example.com"
        }
    }
}
```

### Test Script

```javascript
async function testAuthentication() {
    const apiKey = process.env.Your Project Name_API_KEY;
    
    if (!apiKey) {
        console.error('❌ API key not found in environment variables');
        return;
    }

    try {
        const response = await fetch('https://api.yourproject.com/v1/auth/verify', {
            headers: {
                'Authorization': `Bearer ${apiKey}`
            }
        });

        if (response.ok) {
            const data = await response.json();
            console.log('✅ Authentication successful!');
            console.log(`   Key ID: ${data.data.key_id}`);
            console.log(`   Permissions: ${data.data.permissions.join(', ')}`);
            console.log(`   Rate limit: ${data.data.rate_limit.remaining}/${data.data.rate_limit.limit}`);
        } else {
            const error = await response.json();
            console.error('❌ Authentication failed:', error.error.message);
        }
    } catch (error) {
        console.error('❌ Request failed:', error.message);
    }
}

// Run the test
testAuthentication();
```

## Troubleshooting

### Common Issues

**"Invalid API Key" Error:**
- Verify the API key is copied correctly (no extra spaces)
- Check that the key hasn't been revoked in the dashboard
- Ensure you're using the correct API base URL

**"Insufficient Permissions" Error:**
- Review your API key's permissions in the dashboard
- Generate a new key with the required permissions
- Contact support if you need access to restricted endpoints

**Rate Limiting Issues:**
- Implement exponential backoff in your retry logic
- Cache API responses when possible
- Consider upgrading your plan for higher rate limits
- Distribute requests across multiple API keys if allowed

**Network/Connection Issues:**
- Verify your internet connection
- Check if your firewall allows outbound HTTPS connections
- Test with a simple cURL command first

### Getting Help

If you're still having issues:

1. Check the [API Status Page](https://yourproject.com/status)
2. Review our [troubleshooting guide](../guides/troubleshooting.md)
3. Search [existing issues](https://github.com/yourusername/yourproject/issues)
4. Join our [community chat](../community/chat.md)
5. [Contact support](mailto:your.email@example.com)

## Next Steps

- **[API Overview](overview.md)** - Learn about available endpoints
- **[Rate Limiting](overview.md#rate-limiting)** - Understand API limits
- **[SDKs and Libraries](../guides/sdks.md)** - Use official client libraries
- **[Examples](../examples/)** - See real-world usage examples

---

*Keep your API keys secure and never share them publicly. For additional security questions, contact [your.email@example.com](mailto:your.email@example.com).*