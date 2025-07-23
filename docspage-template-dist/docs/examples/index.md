# Code Examples

Practical examples and code snippets for Your Project Name.

## Getting Started Examples

### Basic Setup

```JavaScript
// Initialize Your Project Name
const Your Project Name = require('Your Project Name');

const client = new Your Project Name({
    apiKey: process.env.API_KEY,
    baseUrl: 'https://api.yourproject.com'
});

console.log('Your Project Name initialized successfully!');
```

### Configuration Example

```JavaScript
const config = {
    // Basic settings
    apiKey: 'your-api-key',
    environment: 'production',
    
    // Advanced options
    timeout: 30000,
    retries: 3,
    debug: false,
    
    // Custom settings
    customOption: 'value'
};

const client = new Your Project Name(config);
```

## Common Use Cases

### Example 1: Basic Operation

```JavaScript
async function basicExample() {
    try {
        // Perform a basic operation
        const result = await client.performAction({
            data: 'example-data',
            options: {
                format: 'json'
            }
        });
        
        console.log('Success:', result);
        return result;
    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
}

// Usage
basicExample()
    .then(result => console.log('Operation completed'))
    .catch(error => console.error('Operation failed'));
```

### Example 2: Working with Resources

```JavaScript
async function resourceExample() {
    // Create a new resource
    const newResource = await client.resources.create({
        name: 'My Resource',
        type: 'example',
        properties: {
            key1: 'value1',
            key2: 'value2'
        }
    });
    
    console.log('Created resource:', newResource.id);
    
    // Get the resource
    const resource = await client.resources.get(newResource.id);
    console.log('Retrieved resource:', resource);
    
    // Update the resource
    const updatedResource = await client.resources.update(newResource.id, {
        name: 'Updated Resource Name'
    });
    
    console.log('Updated resource:', updatedResource);
    
    // List all resources
    const resources = await client.resources.list({
        limit: 10,
        filter: 'active'
    });
    
    console.log(`Found ${resources.data.length} resources`);
    
    return newResource.id;
}
```

### Example 3: Error Handling

```JavaScript
async function errorHandlingExample() {
    try {
        const result = await client.riskyOperation();
        return result;
    } catch (error) {
        // Handle specific error types
        if (error.code === 'RATE_LIMIT_EXCEEDED') {
            console.log('Rate limit exceeded, waiting...');
            await new Promise(resolve => setTimeout(resolve, 60000));
            return errorHandlingExample(); // Retry
        }
        
        if (error.code === 'UNAUTHORIZED') {
            console.error('Invalid API key');
            throw new Error('Authentication failed');
        }
        
        if (error.code === 'NOT_FOUND') {
            console.log('Resource not found, creating new one...');
            return await client.resources.create({name: 'Default'});
        }
        
        // Re-throw unknown errors
        throw error;
    }
}
```

## Advanced Examples

### Example 4: Batch Processing

```JavaScript
async function batchProcessingExample() {
    const items = ['item1', 'item2', 'item3', 'item4', 'item5'];
    const batchSize = 2;
    const results = [];
    
    // Process items in batches
    for (let i = 0; i < items.length; i += batchSize) {
        const batch = items.slice(i, i + batchSize);
        
        console.log(`Processing batch ${Math.floor(i/batchSize) + 1}...`);
        
        const batchPromises = batch.map(item => 
            client.processItem(item)
        );
        
        const batchResults = await Promise.all(batchPromises);
        results.push(...batchResults);
        
        // Optional: Add delay between batches
        if (i + batchSize < items.length) {
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    }
    
    console.log(`Processed ${results.length} items`);
    return results;
}
```

### Example 5: Streaming Data

```JavaScript
async function streamingExample() {
    const stream = client.createStream({
        type: 'realtime',
        filters: ['important']
    });
    
    stream.on('data', (data) => {
        console.log('Received data:', data);
        
        // Process the data
        processStreamData(data);
    });
    
    stream.on('error', (error) => {
        console.error('Stream error:', error);
        
        // Attempt to reconnect
        setTimeout(() => {
            console.log('Reconnecting...');
            streamingExample();
        }, 5000);
    });
    
    stream.on('end', () => {
        console.log('Stream ended');
    });
    
    // Start the stream
    stream.start();
    
    return stream;
}

function processStreamData(data) {
    // Your data processing logic here
    console.log(`Processing: ${data.id}`);
}
```

### Example 6: Custom Middleware

```JavaScript
// Custom middleware for logging
function loggingMiddleware(request, next) {
    console.log(`Making request to: ${request.url}`);
    const startTime = Date.now();
    
    return next(request).then(response => {
        const duration = Date.now() - startTime;
        console.log(`Request completed in ${duration}ms`);
        return response;
    });
}

// Custom middleware for retry logic
function retryMiddleware(request, next) {
    const maxRetries = 3;
    let attempts = 0;
    
    async function attemptRequest() {
        try {
            return await next(request);
        } catch (error) {
            attempts++;
            
            if (attempts < maxRetries && error.code === 'NETWORK_ERROR') {
                console.log(`Retry attempt ${attempts}/${maxRetries}`);
                await new Promise(resolve => setTimeout(resolve, 1000 * attempts));
                return attemptRequest();
            }
            
            throw error;
        }
    }
    
    return attemptRequest();
}

// Use middleware
const client = new Your Project Name({
    apiKey: 'your-api-key',
    middleware: [loggingMiddleware, retryMiddleware]
});
```

## Integration Examples

### Express.js Integration

```javascript
const express = require('express');
const Your Project Name = require('Your Project Name');

const app = express();
const client = new Your Project Name({
    apiKey: process.env.API_KEY
});

app.use(express.json());

// Endpoint to create resource
app.post('/api/resources', async (req, res) => {
    try {
        const resource = await client.resources.create(req.body);
        res.json(resource);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Endpoint to get resource
app.get('/api/resources/:id', async (req, res) => {
    try {
        const resource = await client.resources.get(req.params.id);
        res.json(resource);
    } catch (error) {
        if (error.code === 'NOT_FOUND') {
            res.status(404).json({ error: 'Resource not found' });
        } else {
            res.status(500).json({ error: error.message });
        }
    }
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
```

### React Integration

```jsx
import React, { useState, useEffect } from 'react';
import Your Project Name from 'Your Project Name';

const client = new Your Project Name({
    apiKey: process.env.REACT_APP_API_KEY
});

function ResourceList() {
    const [resources, setResources] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        async function fetchResources() {
            try {
                const result = await client.resources.list();
                setResources(result.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        
        fetchResources();
    }, []);
    
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    
    return (
        <div>
            <h2>Resources</h2>
            <ul>
                {resources.map(resource => (
                    <li key={resource.id}>
                        {resource.name} - {resource.type}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ResourceList;
```

## Testing Examples

### Unit Tests

```javascript
const Your Project Name = require('Your Project Name');

describe('Your Project Name Client', () => {
    let client;
    
    beforeEach(() => {
        client = new Your Project Name({
            apiKey: 'test-api-key',
            baseUrl: 'http://localhost:3000'
        });
    });
    
    test('should create resource', async () => {
        const mockResource = {
            id: 'test-id',
            name: 'Test Resource'
        };
        
        // Mock the API call
        jest.spyOn(client.resources, 'create')
            .mockResolvedValue(mockResource);
        
        const result = await client.resources.create({
            name: 'Test Resource'
        });
        
        expect(result).toEqual(mockResource);
        expect(client.resources.create).toHaveBeenCalledWith({
            name: 'Test Resource'
        });
    });
});
```

## Best Practices

### 1. Environment Configuration

```JavaScript
// Use environment variables for configuration
const config = {
    apiKey: process.env.Your Project Name_API_KEY,
    environment: process.env.NODE_ENV || 'development',
    debug: process.env.NODE_ENV === 'development'
};

// Validate required configuration
if (!config.apiKey) {
    throw new Error('API key is required');
}
```

### 2. Connection Pooling

```JavaScript
// Reuse client instances
const clientPool = new Map();

function getClient(apiKey) {
    if (!clientPool.has(apiKey)) {
        clientPool.set(apiKey, new Your Project Name({ apiKey }));
    }
    return clientPool.get(apiKey);
}
```

### 3. Graceful Shutdown

```JavaScript
process.on('SIGTERM', async () => {
    console.log('Shutting down gracefully...');
    
    // Close client connections
    await client.close();
    
    process.exit(0);
});
```

## More Examples

For more examples and tutorials:

- [GitHub Repository](https://github.com/yourusername/yourproject/tree/main/examples)
- [Community Examples](https://github.com/yourusername/yourproject/discussions/categories/examples)
- [API Reference](../api/overview.md)
- [User Guide](../guides/basic-usage.md)

---

*Have an example to share? [Contribute to our documentation](../community/contributing.md)!*