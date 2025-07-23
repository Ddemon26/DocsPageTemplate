# Quick Start

Get up and running with Your Project Name in just a few minutes.

## Prerequisites

- A GitHub account
- Basic knowledge of Markdown
- A web browser

## Setup Steps

### 1. Fork or Clone

Start by forking this repository or cloning it to your local machine:

```bash
git clone https://github.com/yourusername/your-docs-repo.git
cd your-docs-repo
```

### 2. Add Your Content

Create your Markdown files in the `docs/` directory:

```
docs/
├── introduction.md
├── quick-start.md
├── guides/
│   ├── basic-usage.md
│   └── advanced-features.md
└── api/
    ├── overview.md
    └── authentication.md
```

### 3. Update Navigation

Edit `docs/navigation.json` to reflect your documentation structure:

```json
[
  {
    "title": "Your Section",
    "items": [
      {
        "title": "Your Page",
        "path": "docs/your-page.md"
      }
    ]
  }
]
```

### 4. Deploy to GitHub Pages

1. Push your changes to GitHub
2. Go to your repository settings
3. Navigate to "Pages" section
4. Select "Deploy from a branch"
5. Choose "main" branch and "/ (root)" folder
6. Click "Save"

Your documentation will be available at `https://yourusername.github.io/your-repo-name/`

## Writing Documentation

### Markdown Basics

Use standard Markdown syntax for your documentation:

```markdown
# Main Title
## Section Title
### Subsection

**Bold text** and *italic text*

- Bullet point 1
- Bullet point 2

1. Numbered list item 1
2. Numbered list item 2

[Link text](https://example.com)

`inline code`

```code block```
```

### Code Blocks

Code blocks are automatically enhanced with copy buttons:

```python
def hello_world():
    print("Hello, World!")
    return True
```

### Links

You can link to other documentation pages using relative paths:

- [Introduction](introduction.md)
- [Installation Guide](installation.md)

## Customization

### Themes

The site supports both light and dark themes. Users can toggle between them using the theme button in the top-right corner.

### Styling

Modify the CSS files in the `src/` directory to customize the appearance:

- `src/index.css` - Light theme styles
- `src/index-dark.css` - Dark theme styles
- `src/index-base.css` - Base styles shared by both themes

### Search

The search functionality automatically indexes all your documentation pages based on the navigation structure.

## Next Steps

- Learn about [Installation](installation.md) options
- Explore [Basic Usage](guides/basic-usage.md) patterns
- Check out the [API Reference](api/overview.md)