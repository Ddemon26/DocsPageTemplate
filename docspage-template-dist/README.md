# DocsPage Template

> **A modern, responsive documentation template that you can drop into any project to create beautiful documentation sites.**

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Ready-brightgreen)](https://pages.github.com/)
[![Netlify](https://img.shields.io/badge/Netlify-Ready-00C7B7)](https://netlify.com/)
[![Vercel](https://img.shields.io/badge/Vercel-Ready-000000)](https://vercel.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## ✨ Features

- 📱 **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- 🔍 **Full-Text Search** - Find content instantly across all documentation
- 🌙 **Dark/Light Themes** - Toggle between themes with system preference detection
- 📚 **Smart Navigation** - Hierarchical navigation with breadcrumbs
- 🎨 **Customizable Branding** - Easy to brand with your project colors and logo
- ⚡ **Fast Rendering** - Markdown rendering with syntax highlighting
- 📖 **Auto Table of Contents** - Generated automatically from headings
- 🔗 **Deep Linking** - Direct links to any section
- 🚀 **Zero Build Process** - Just HTML, CSS, and JavaScript
- 📄 **Deploy Ready** - GitHub Pages, Netlify, Vercel compatible

## 🚀 Quick Start

### Option 1: Use as GitHub Template (Recommended)

1. Click **"Use this template"** button above
2. Create your new repository
3. Clone it locally
4. Run the setup:

```bash
node init-template.js  # Interactive setup
node setup.js         # Apply configuration
```

### Option 2: Download and Copy

1. Download this repository as ZIP
2. Extract to your project folder
3. Run the setup scripts

### Option 3: Add to Existing Project

```bash
# Clone into your project
git clone https://github.com/docspage/template.git docs-template
cd docs-template

# Run setup
node init-template.js
node setup.js

# Copy files to your project root
cp -r * ../
cd ..
rm -rf docs-template
```

## 📁 What You Get

```
your-project/
├── 📄 index.html              # Main documentation app
├── ⚙️ template.config.json    # Your project configuration
├── 🔧 init-template.js       # Interactive setup script
├── 🔧 setup.js               # Configuration processor
├── 🧹 cleanup-template.js    # Template cleanup tool
├── 📁 docs/                  # Your documentation content
│   ├── 🧭 navigation.json    # Site navigation structure
│   ├── 📝 introduction.md    # Project introduction
│   ├── 🔧 installation.md    # Installation guide
│   ├── ⚡ quick-start.md     # Quick start tutorial
│   ├── 📚 guides/           # User guides
│   ├── 🔌 api/              # API documentation
│   ├── 💡 examples/         # Code examples
│   └── 🤝 community/        # Community resources
└── 📁 src/                   # Application source code
    ├── 🎯 app.js            # Main application logic
    ├── 🧠 DocsApp.js        # Core documentation engine
    ├── 📦 managers/         # Feature managers
    └── 🎨 *.css             # Styling (base, light, dark)
```

## 🎯 Setup Process

### 1. Interactive Configuration

```bash
node init-template.js
```

This will ask you about:
- Project name and description
- GitHub repository details
- Author information
- Project type (web app, library, API, CLI, etc.)
- Technical requirements
- Brand colors
- Installation commands

### 2. Apply Configuration

```bash
node setup.js
```

This replaces all template variables throughout your files.

### 3. Customize Navigation

Edit `docs/navigation.json`:

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
  }
]
```

### 4. Add Your Content

Replace placeholder content in `docs/` with your actual documentation.

### 5. Test Locally

```bash
# Simple server
python -m http.server 8000
# or
npx http-server

# With live reload
npx live-server
```

### 6. Deploy

**GitHub Pages:**
1. Push to GitHub
2. Settings → Pages → Deploy from branch → main → / (root)

**Netlify/Vercel:**
1. Connect your repository
2. Deploy (no build process needed)

## 🎨 Customization

### Project Types

The template adapts to different project types:

- 🌐 **Web Application** - Frontend apps, SPAs
- 📦 **Library/Package** - npm packages, SDKs
- 🔌 **API/Backend** - REST APIs, microservices
- ⚡ **CLI Tool** - Command line utilities
- 📱 **Mobile App** - React Native, Flutter
- 🖥️ **Desktop App** - Electron, native apps

### Brand Colors

Update in `template.config.json`:

```json
{
  "variables": {
    "PRIMARY_COLOR": "#your-brand-color",
    "SECONDARY_COLOR": "#your-secondary-color",
    "ACCENT_COLOR": "#your-accent-color"
  }
}
```

### Advanced Styling

Modify CSS files in `src/`:
- `index-base.css` - Core styles and variables
- `index.css` - Light theme
- `index-dark.css` - Dark theme

## 📝 Writing Documentation

### Markdown Features

- Standard Markdown syntax
- Syntax highlighting for 100+ languages
- Automatic table of contents
- Copy buttons on code blocks
- Internal linking between pages

### Example Structure

```markdown
# Page Title

Brief introduction to the page content.

## Section Heading

Content with [internal links](other-page.md) and [external links](https://example.com).

### Code Examples

\`\`\`javascript
function example() {
    return "Hello, World!";
}
\`\`\`

### Images

![Description](image.png)
```

## 🚀 Deployment Options

| Platform | Setup | Custom Domain | SSL | Cost |
|----------|-------|---------------|-----|------|
| **GitHub Pages** | Push to repo | ✅ | ✅ | Free |
| **Netlify** | Connect repo | ✅ | ✅ | Free tier |
| **Vercel** | Import repo | ✅ | ✅ | Free tier |
| **Traditional Host** | Upload files | ✅ | ✅ | Varies |

## 🧹 Template Cleanup

After setup, remove template files:

```bash
node cleanup-template.js --confirm
```

This removes:
- Template configuration files
- Setup scripts
- Template-specific documentation
- Backup folders

## 🤝 Contributing

Help improve this template:

1. Fork the repository
2. Create a feature branch
3. Make your improvements
4. Submit a pull request

## 📄 License

MIT License - use this template for any project, commercial or personal.

## 🆘 Support

- 📖 **[Setup Guide](TEMPLATE_SETUP.md)** - Detailed instructions
- 🐛 **[Issues](https://github.com/docspage/template/issues)** - Report bugs
- 💬 **[Discussions](https://github.com/docspage/template/discussions)** - Ask questions
- 📧 **[Email](mailto:support@docspage.dev)** - Direct support

---

**Made with ❤️ for the developer community**

*Turn any project into beautiful documentation in minutes, not hours.*

> **Ready to get started?** Click "Use this template" above or run `node init-template.js` to begin!
