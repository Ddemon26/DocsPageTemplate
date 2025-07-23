# API Overview

Complete reference for the Documentation Site API and JavaScript methods.

## Core Classes

### DocsApp

The main application class that handles all documentation functionality.

```javascript
const app = new DocsApp();
```

#### Constructor

Creates a new instance of the documentation application.

**Parameters:** None

**Example:**
```javascript
const app = new DocsApp();
```

#### Properties

| Property | Type | Description |
|----------|------|-------------|
| `currentTheme` | string | Current theme ('light' or 'dark') |
| `docs` | Map | Cache of loaded documentation content |
| `navigation` | Array | Navigation structure from navigation.json |
| `searchIndex` | Array | Search index for quick lookups |

#### Methods

##### `loadDoc(path)`

Loads and renders a documentation page.

**Parameters:**
- `path` (string) - Path to the Markdown file

**Returns:** Promise

**Example:**
```javascript
await app.loadDoc('docs/introduction.md');
```

##### `loadNavigation()`

Loads the navigation structure from navigation.json.

**Returns:** Promise

**Example:**
```javascript
await app.loadNavigation();
```

##### `applyTheme()`

Applies the current theme to the interface.

**Example:**
```javascript
app.currentTheme = 'dark';
app.applyTheme();
```

## Configuration

### Navigation Structure

The navigation is defined in `docs/navigation.json`:

```json
[
  {
    "title": "Section Title",
    "items": [
      {
        "title": "Page Title",
        "path": "docs/page.md"
      }
    ]
  }
]
```

#### Navigation Item Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `title` | string | Yes | Display name for the item |
| `path` | string | Yes | Path to the Markdown file |
| `external` | boolean | No | Whether this is an external link |
| `url` | string | No | External URL (if external is true) |

### Theme Configuration

Themes are configured through CSS custom properties:

```css
:root {
    --bg-primary: #f5f5f5;
    --bg-secondary: #ffffff;
    --text-primary: #333333;
    --accent-primary: #005566;
}
```

## Events

### Custom Events

The application dispatches custom events for integration:

```javascript
// Listen for page loads
document.addEventListener('doc-loaded', (event) => {
    console.log('Loaded:', event.detail.path);
});

// Listen for theme changes
document.addEventListener('theme-changed', (event) => {
    console.log('Theme:', event.detail.theme);
});
```

### Event Types

| Event | Detail | Description |
|-------|--------|-------------|
| `doc-loaded` | `{ path, title }` | Fired when a document is loaded |
| `theme-changed` | `{ theme }` | Fired when theme is toggled |
| `search-performed` | `{ query, results }` | Fired when search is executed |

## Utilities

### Markdown Processing

The site uses marked.js for Markdown processing:

```javascript
// Parse Markdown
const html = marked.parse(markdownContent);

// Sanitize HTML
const sanitizedHtml = DOMPurify.sanitize(html);
```

### Search Functions

```javascript
// Build search index
buildSearchIndex() {
    this.searchIndex = this.navigation.flatMap(section => 
        section.items.map(item => ({
            title: item.title,
            path: item.path,
            section: section.title
        }))
    );
}

// Perform search
search(query) {
    return this.searchIndex.filter(item => 
        item.title.toLowerCase().includes(query.toLowerCase())
    );
}
```

## Customization API

### Adding Custom Renderers

Extend the Markdown renderer:

```javascript
// Custom renderer for callouts
const renderer = new marked.Renderer();
renderer.blockquote = function(quote) {
    if (quote.startsWith('<p>Info:')) {
        return `<div class="callout info">${quote}</div>`;
    }
    return `<blockquote>${quote}</blockquote>`;
};

marked.setOptions({ renderer });
```

### Plugin System

Add custom plugins:

```javascript
class DocsPlugin {
    constructor(app) {
        this.app = app;
    }
    
    init() {
        // Plugin initialization
    }
    
    beforeLoad(path) {
        // Called before document load
    }
    
    afterLoad(path, content) {
        // Called after document load
    }
}

// Register plugin
app.registerPlugin(new DocsPlugin(app));
```

## Error Handling

### Error Types

The application handles several error types:

```javascript
try {
    await app.loadDoc(path);
} catch (error) {
    if (error.name === 'NetworkError') {
        // Handle network issues
    } else if (error.name === 'ParseError') {
        // Handle Markdown parsing errors
    } else {
        // Handle other errors
    }
}
```

### Custom Error Handling

```javascript
app.onError = function(error, context) {
    console.error('Documentation error:', error);
    
    // Custom error reporting
    if (window.analytics) {
        analytics.track('documentation_error', {
            error: error.message,
            context: context
        });
    }
};
```

## Performance

### Caching Strategy

Documents are cached in memory:

```javascript
// Check cache first
if (this.docs.has(path)) {
    return this.docs.get(path);
}

// Load and cache
const content = await this.fetchDoc(path);
this.docs.set(path, content);
```

### Lazy Loading

Implement lazy loading for large sites:

```javascript
// Load navigation sections on demand
async loadSection(sectionId) {
    if (!this.loadedSections.has(sectionId)) {
        const section = await this.fetchSection(sectionId);
        this.loadedSections.set(sectionId, section);
    }
    return this.loadedSections.get(sectionId);
}
```

## Browser Support

### Compatibility

| Feature | Chrome | Firefox | Safari | Edge |
|---------|--------|---------|--------|------|
| ES6 Classes | 49+ | 45+ | 10+ | 13+ |
| Fetch API | 42+ | 39+ | 10.1+ | 14+ |
| CSS Variables | 49+ | 31+ | 9.1+ | 16+ |
| Local Storage | 4+ | 3.5+ | 4+ | 8+ |

### Polyfills

For older browser support:

```html
<!-- Fetch polyfill -->
<script src="https://polyfill.io/v3/polyfill.min.js?features=fetch"></script>

<!-- CSS Variables polyfill -->
<script src="https://cdn.jsdelivr.net/npm/css-vars-ponyfill@2"></script>
```

## Next Steps

- Learn about [Authentication](authentication.md) options
- Explore integration examples
- Check out the community plugins