# Basic Usage

Learn the fundamentals of using and maintaining your documentation site.

## Writing Documentation

### Creating New Pages

1. Create a new `.md` file in the `docs/` directory or subdirectory
2. Add the page to `docs/navigation.json`
3. Write your content using Markdown syntax

Example file structure:
```
docs/
├── introduction.md
├── guides/
│   ├── basic-usage.md
│   └── tutorial.md
└── api/
    └── reference.md
```

### Markdown Syntax

#### Headers
```markdown
# H1 Header
## H2 Header
### H3 Header
```

#### Text Formatting
```markdown
**Bold text**
*Italic text*
`Inline code`
~~Strikethrough~~
```

#### Lists
```markdown
- Unordered list item
- Another item
  - Nested item

1. Ordered list item
2. Another item
   1. Nested item
```

#### Links and Images
```markdown
[Link text](https://example.com)
[Internal link](../other-page.md)
![Image alt text](path/to/image.png)
```

#### Code Blocks
````markdown
```javascript
function example() {
    console.log("Hello, World!");
}
```
````

#### Tables
```markdown
| Column 1 | Column 2 | Column 3 |
|----------|----------|----------|
| Row 1    | Data     | More     |
| Row 2    | Data     | More     |
```

#### Blockquotes
```markdown
> This is a blockquote
> It can span multiple lines
```

## Navigation Management

### Adding New Sections

Edit `docs/navigation.json` to add new sections:

```json
{
  "title": "New Section",
  "items": [
    {
      "title": "Page Title",
      "path": "docs/section/page.md"
    }
  ]
}
```

### Organizing Content

Best practices for organizing your documentation:

1. **Group related topics** into sections
2. **Use descriptive titles** for pages and sections
3. **Keep paths simple** and consistent
4. **Order items logically** from basic to advanced

### Navigation Structure Example

```json
[
  {
    "title": "Getting Started",
    "items": [
      { "title": "Introduction", "path": "docs/introduction.md" },
      { "title": "Quick Start", "path": "docs/quick-start.md" }
    ]
  },
  {
    "title": "User Guide",
    "items": [
      { "title": "Basic Usage", "path": "docs/guides/basic-usage.md" },
      { "title": "Advanced Topics", "path": "docs/guides/advanced-features.md" }
    ]
  }
]
```

## Content Best Practices

### Writing Style

- **Be clear and concise** - Get to the point quickly
- **Use active voice** - "Click the button" vs "The button should be clicked"
- **Include examples** - Show, don't just tell
- **Structure content** with headers and lists
- **Link to related content** to help users navigate

### Code Examples

Always include working code examples:

```javascript
// Good: Complete, runnable example
const config = {
    theme: 'dark',
    language: 'en'
};

function initializeApp(config) {
    console.log(`Initializing with theme: ${config.theme}`);
    return true;
}

initializeApp(config);
```

### Screenshots and Images

- Use clear, high-resolution images
- Include alt text for accessibility
- Keep file sizes reasonable
- Store images in a dedicated folder like `docs/images/`

## Search Optimization

The built-in search indexes:
- Page titles
- Section names
- File paths

To improve searchability:
- Use descriptive page titles
- Include key terms in section headers
- Use consistent terminology throughout

## Maintenance

### Regular Updates

- **Review content** regularly for accuracy
- **Update links** when pages are moved or renamed
- **Check for broken links** periodically
- **Update navigation** when adding or removing pages

### Version Control

Use Git to track changes:

```bash
# Add new documentation
git add docs/
git commit -m "Add new user guide section"

# Update existing content
git add docs/guides/basic-usage.md
git commit -m "Update basic usage examples"

# Push to GitHub Pages
git push origin main
```

## Next Steps

- Learn about [Advanced Features](advanced-features.md)
- Check out the [API Reference](../api/overview.md)
- Explore customization options