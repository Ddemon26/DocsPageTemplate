# Getting Started with DocsPage Template

Welcome to DocsPage Template! This guide will help you set up beautiful documentation for your project in just a few minutes.

## What is DocsPage Template?

DocsPage Template is a modern, responsive documentation template that you can drop into any project. It's built with vanilla JavaScript and designed to work seamlessly with GitHub Pages, Netlify, Vercel, and other static hosting platforms.

### Key Features

- 📱 **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- 🔍 **Full-Text Search** - Find content instantly across all documentation
- 🌙 **Dark/Light Themes** - Toggle between themes for comfortable reading
- 📚 **Smart Navigation** - Hierarchical navigation with breadcrumbs
- 🎨 **Customizable Branding** - Easy to brand with your project colors and logo
- ⚡ **Fast Rendering** - Markdown rendering with syntax highlighting
- 📖 **Auto Table of Contents** - Generated automatically from headings
- 🔗 **Deep Linking** - Direct links to any section
- 🚀 **Zero Build Process** - Just HTML, CSS, and JavaScript
- 📄 **GitHub Pages Ready** - Deploy instantly to GitHub Pages

## Quick Setup (5 Minutes)

### 1. Get the Template

**Option A: Use as Template (Recommended)**
1. Click "Use this template" on the [DocsPage Template repository](https://github.com/docspage/template)
2. Create your new repository
3. Clone it locally

**Option B: Download & Copy**
1. Download the template ZIP file
2. Extract to your project folder
3. Initialize git if needed: `git init`

**Option C: Add to Existing Project**
1. Copy all template files to your project root
2. Merge with existing files as needed

### 2. Initialize Your Project

**Interactive Setup (Recommended):**

```bash
node init-template.js
```

This will ask you questions about your project and create a configuration file automatically.

**Manual Setup:**

Copy and edit the configuration file:

```bash
cp template.config.example.json template.config.json
# Edit template.config.json with your project details
```

### 3. Apply Configuration

```bash
node setup.js
```

This replaces all template variables throughout your files with your project information.

### 4. Update Navigation

Edit `docs/navigation.json` to match your documentation structure:

```json
[
  {
    "title": "Getting Started",
    "items": [
      {
        "title": "Introduction",
        "path": "docs/introduction.md"
      },
      {
        "title": "Installation",
        "path": "docs/installation.md"
      }
    ]
  },
  {
    "title": "User Guide",
    "items": [
      {
        "title": "Basic Usage",
        "path": "docs/guides/basic-usage.md"
      }
    ]
  }
]
```

### 5. Add Your Content

Replace the placeholder files in `docs/` with your actual documentation:

- `docs/introduction.md` - Project overview and introduction
- `docs/installation.md` - Installation and setup instructions
- `docs/quick-start.md` - Quick start guide
- `docs/guides/` - User guides and tutorials
- `docs/api/` - API documentation
- `docs/examples/` - Code examples

### 6. Test Locally

Open `index.html` in your browser or use a local server:

```bash
# Python
python -m http.server 8000

# Node.js
npx http-server

# Live reload
npx live-server
```

### 7. Deploy

**GitHub Pages:**
1. Push to GitHub
2. Repository Settings → Pages
3. Source: "Deploy from a branch" → "main" → "/ (root)"

**Other platforms:**
- **Netlify**: Connect repo and deploy
- **Vercel**: Import repository and deploy
- **Traditional hosting**: Upload all files

## Template Structure

```
docspage-template/
├── 📄 index.html              # Main application entry point
├── ⚙️ template.config.json    # Your project configuration
├── 🔧 init-template.js       # Interactive setup script
├── 🔧 setup.js               # Template setup script
├── 🧹 cleanup-template.js    # Template cleanup script
├── 📖 TEMPLATE_SETUP.md      # Detailed setup guide
├── 📝 README.md              # Project documentation
├── 📝 GETTING_STARTED.md     # This file
├── 📁 docs/                  # Your documentation content
│   ├── 🧭 navigation.json    # Site navigation structure
│   ├── 👋 introduction.md    # Project introduction
│   ├── 🔧 installation.md    # Installation guide
│   ├── ⚡ quick-start.md     # Quick start tutorial
│   ├── 📚 guides/           # User guides
│   │   ├── basic-usage.md
│   │   ├── configuration.md
│   │   └── troubleshooting.md
│   ├── 🔌 api/              # API documentation
│   │   ├── overview.md
│   │   ├── authentication.md
│   │   └── endpoints.md
│   ├── 💡 examples/         # Code examples
│   └── 🤝 community/        # Community resources
└── 📁 src/                   # Application source code
    ├── 🎯 app.js            # Main application logic
    ├── 🧠 DocsApp.js        # Core documentation app
    ├── 📦 managers/         # Feature managers
    │   ├── DocumentManager.js
    │   ├── NavigationManager.js
    │   └── SearchManager.js
    └── 🎨 *.css             # Styling (base, light, dark themes)
```

## Customization

### Colors and Branding

Update your brand colors and identity:

```json
{
  "variables": {
    "PROJECT_NAME": "My Awesome Project",
    "PROJECT_LOGO": "🚀",
    "PRIMARY_COLOR": "#007acc",
    "SECONDARY_COLOR": "#f8f9fa",
    "ACCENT_COLOR": "#28a745"
  }
}
```

### Navigation Structure

The navigation supports unlimited nesting:

```json
[
  {
    "title": "Getting Started",
    "items": [
      {
        "title": "Introduction",
        "path": "docs/introduction.md"
      },
      {
        "title": "Installation",
        "path": "docs/installation.md"
      }
    ]
  },
  {
    "title": "Advanced",
    "items": [
      {
        "title": "Configuration",
        "path": "docs/advanced/config.md"
      },
      {
        "title": "API Reference",
        "items": [
          {
            "title": "Authentication",
            "path": "docs/api/auth.md"
          },
          {
            "title": "Endpoints",
            "path": "docs/api/endpoints.md"
          }
        ]
      }
    ]
  }
]
```

### Content Organization

Best practices for organizing your documentation:

1. **Start with basics** - Introduction, installation, quick start
2. **User guides** - Step-by-step tutorials and how-tos
3. **API reference** - Technical documentation
4. **Examples** - Working code samples
5. **Community** - Contributing, support, resources

### Advanced Styling

Modify CSS files for custom styling:

- `src/index-base.css` - Core styles and CSS variables
- `src/index.css` - Light theme overrides
- `src/index-dark.css` - Dark theme overrides

## Writing Documentation

### Markdown Features

The template supports enhanced Markdown:

```markdown
# Page Title

## Section with Code

Here's a JavaScript example:

```javascript
function hello(name) {
    return `Hello, ${name}!`;
}
```

### Links and References

- [Internal link](other-page.md)
- [External link](https://example.com)
- [Section link](#section-with-code)

### Images

![Architecture Diagram](architecture.png)
```

### Code Blocks

Code blocks automatically get copy buttons and syntax highlighting for 100+ languages.

### Search Integration

All content is automatically indexed for search based on your navigation structure.

## Deployment Options

### GitHub Pages (Free)

Perfect for open source projects:

1. Push your code to GitHub
2. Repository Settings → Pages
3. Source: "Deploy from a branch"
4. Branch: "main", Folder: "/ (root)"
5. Your site will be live at `https://username.github.io/repository-name/`

### Netlify (Free)

Great for automatic deployments:

1. Connect your GitHub repository
2. Build command: (leave empty)
3. Publish directory: (leave empty)
4. Deploy automatically on every push

### Vercel (Free)

Excellent performance and CDN:

1. Import your GitHub repository
2. Framework preset: "Other"
3. No build configuration needed
4. Deploy with global CDN

### Traditional Hosting

Works anywhere:

1. Upload all files to your web server
2. Point your domain to the directory
3. No server-side processing required

## Template Cleanup

After setup is complete, you can remove template-specific files:

```bash
# Review what will be removed
node cleanup-template.js

# Confirm and remove template files
node cleanup-template.js --confirm
```

This removes:
- Template configuration files
- Setup and cleanup scripts
- Template-specific documentation
- Backup folders

## Getting Help

### Documentation

- 📖 **[Detailed Setup Guide](TEMPLATE_SETUP.md)** - Comprehensive instructions
- 📝 **[README](README.md)** - Project overview and features
- 🔧 **Template Configuration** - All available variables and options

### Community Support

- 🐛 **[Report Issues](https://github.com/docspage/template/issues)** - Found a bug?
- 💬 **[Discussions](https://github.com/docspage/template/discussions)** - Questions and ideas
- 🤝 **[Contributing](https://github.com/docspage/template/blob/main/CONTRIBUTING.md)** - Help improve the template

### Common Issues

**Template variables not replaced:**
- Make sure you ran `node setup.js` after configuration
- Check that `template.config.json` contains your actual values

**Navigation not working:**
- Verify `docs/navigation.json` syntax is correct
- Ensure file paths in navigation match actual files

**Styling issues:**
- Check CSS variables in `src/index-base.css`
- Verify color values are valid hex codes

## Best Practices

### Content Writing

1. **Clear structure** - Use consistent heading hierarchy
2. **Code examples** - Include working, copy-pasteable code
3. **Screenshots** - Add visuals for complex UI interactions
4. **Cross-references** - Link related sections together
5. **Keep it updated** - Maintain docs alongside code changes

### Organization

1. **Logical flow** - Order content from basic to advanced
2. **Consistent naming** - Use clear, descriptive file names
3. **Reasonable depth** - Don't nest navigation too deeply
4. **Search-friendly** - Use descriptive headings and content

### Maintenance

1. **Regular updates** - Keep documentation current
2. **Link checking** - Verify all links work
3. **User feedback** - Gather and act on user suggestions
4. **Performance** - Monitor site speed and optimize

## Next Steps

Now that you have the template set up:

1. **🎨 Customize** - Update colors, logo, and branding to match your project
2. **✍️ Write** - Replace placeholder content with your actual documentation
3. **🧪 Test** - Preview locally and test all features
4. **🚀 Deploy** - Share your documentation with the world
5. **📈 Improve** - Gather feedback and continuously improve

## Template Workflow

```
1. Get Template → 2. Initialize → 3. Configure → 4. Write Content → 5. Deploy
     ↓               ↓              ↓              ↓               ↓
   Clone/Copy    init-template.js  setup.js    Edit docs/     GitHub Pages
                                                              Netlify/Vercel
```

---

**Ready to create amazing documentation?** 

Run `node init-template.js` to get started, or check out the [detailed setup guide](TEMPLATE_SETUP.md) for more information.

**Made with ❤️ for the developer community**

*Turn any project into beautiful documentation in minutes, not hours.*