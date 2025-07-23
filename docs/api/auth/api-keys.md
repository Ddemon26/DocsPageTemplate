# API Key Authentication

Learn how to implement API key-based authentication for programmatic access to your documentation.

## Overview

API keys provide a simple way to authenticate requests to your documentation API. They're ideal for:

- Service-to-service authentication
- Automated documentation updates
- CI/CD pipeline integration
- Programmatic content access

## Generating API Keys

### Manual Generation

```javascript
function generateApiKey() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 32; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}
```

### Secure Generation

```javascript
// Using Web Crypto API
async function generateSecureApiKey() {
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}
```

## Implementation

### Basic API Key Validation

```javascript
class ApiKeyAuth {
    constructor() {
        this.validKeys = new Set([
            'your-api-key-1',
            'your-api-key-2'
        ]);
    }
    
    validateKey(apiKey) {
        return this.validKeys.has(apiKey);
    }
    
    authenticate(request) {
        const apiKey = request.headers['x-api-key'] || 
                      request.query.api_key;
        
        if (!apiKey) {
            throw new Error('API key required');
        }
        
        if (!this.validateKey(apiKey)) {
            throw new Error('Invalid API key');
        }
        
        return true;
    }
}
```

### Database-Backed Keys

```javascript
class DatabaseApiKeyAuth {
    constructor(database) {
        this.db = database;
    }
    
    async validateKey(apiKey) {
        const key = await this.db.query(
            'SELECT * FROM api_keys WHERE key = ? AND active = 1',
            [apiKey]
        );
        
        if (!key) return false;
        
        // Update last used timestamp
        await this.db.query(
            'UPDATE api_keys SET last_used = NOW() WHERE id = ?',
            [key.id]
        );
        
        return true;
    }
    
    async createKey(userId, name) {
        const apiKey = await this.generateSecureKey();
        
        await this.db.query(
            'INSERT INTO api_keys (user_id, name, key, created_at) VALUES (?, ?, ?, NOW())',
            [userId, name, apiKey]
        );
        
        return apiKey;
    }
    
    async revokeKey(apiKey) {
        await this.db.query(
            'UPDATE api_keys SET active = 0 WHERE key = ?',
            [apiKey]
        );
    }
}
```

## Usage Examples

### HTTP Headers

```bash
curl -H "X-API-Key: your-api-key" https://api.yourdocs.com/content
```

### Query Parameters

```bash
curl "https://api.yourdocs.com/content?api_key=your-api-key"
```

### JavaScript Fetch

```javascript
fetch('https://api.yourdocs.com/content', {
    headers: {
        'X-API-Key': 'your-api-key',
        'Content-Type': 'application/json'
    }
});
```

## Key Management

### Best Practices

- **Rotate keys regularly** - Set expiration dates
- **Use different keys** for different services
- **Monitor usage** - Track API key activity
- **Revoke unused keys** - Clean up old or unused keys
- **Secure storage** - Never commit keys to version control

### Key Rotation

```javascript
class KeyRotationManager {
    constructor(auth) {
        this.auth = auth;
        this.rotationInterval = 90 * 24 * 60 * 60 * 1000; // 90 days
    }
    
    async rotateKey(oldKey) {
        // Generate new key
        const newKey = await this.auth.generateSecureKey();
        
        // Update database
        await this.auth.db.query(
            'UPDATE api_keys SET key = ?, rotated_at = NOW() WHERE key = ?',
            [newKey, oldKey]
        );
        
        // Notify user
        await this.notifyKeyRotation(oldKey, newKey);
        
        return newKey;
    }
    
    async checkExpiredKeys() {
        const expiredKeys = await this.auth.db.query(
            'SELECT * FROM api_keys WHERE created_at < DATE_SUB(NOW(), INTERVAL 90 DAY)'
        );
        
        for (const key of expiredKeys) {
            await this.rotateKey(key.key);
        }
    }
}
```

## Rate Limiting

### Basic Rate Limiting

```javascript
class RateLimiter {
    constructor() {
        this.requests = new Map();
        this.windowMs = 60 * 1000; // 1 minute
        this.maxRequests = 100;
    }
    
    checkLimit(apiKey) {
        const now = Date.now();
        const windowStart = now - this.windowMs;
        
        if (!this.requests.has(apiKey)) {
            this.requests.set(apiKey, []);
        }
        
        const keyRequests = this.requests.get(apiKey);
        
        // Remove old requests
        const recentRequests = keyRequests.filter(time => time > windowStart);
        this.requests.set(apiKey, recentRequests);
        
        // Check limit
        if (recentRequests.length >= this.maxRequests) {
            throw new Error('Rate limit exceeded');
        }
        
        // Add current request
        recentRequests.push(now);
        
        return true;
    }
}
```

## Monitoring and Analytics

### Usage Tracking

```javascript
class ApiUsageTracker {
    constructor(database) {
        this.db = database;
    }
    
    async logRequest(apiKey, endpoint, method, statusCode) {
        await this.db.query(
            'INSERT INTO api_usage (api_key, endpoint, method, status_code, timestamp) VALUES (?, ?, ?, ?, NOW())',
            [apiKey, endpoint, method, statusCode]
        );
    }
    
    async getUsageStats(apiKey, days = 30) {
        return await this.db.query(
            'SELECT DATE(timestamp) as date, COUNT(*) as requests FROM api_usage WHERE api_key = ? AND timestamp > DATE_SUB(NOW(), INTERVAL ? DAY) GROUP BY DATE(timestamp)',
            [apiKey, days]
        );
    }
}
```

## Security Considerations

- **Never log API keys** in plain text
- **Use HTTPS only** for API key transmission
- **Implement proper error handling** - Don't leak key information
- **Monitor for suspicious activity** - Unusual usage patterns
- **Set appropriate permissions** - Limit key scope when possible

## Next Steps

- Explore [OAuth 2.0](oauth.md) for user authentication
- Review the [Authentication Overview](overview.md)
- Check the main [Authentication](../authentication.md) guide