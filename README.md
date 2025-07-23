# DocsPage Template

> **A modern, responsive documentation template that you can drop into any project to create beautiful documentation sites.**

[![GitHub Template](https://img.shields.io/badge/GitHub-Use%20Template-brightgreen)](https://github.com/docspage/template/generate)
[![npm](https://img.shields.io/npm/v/docspage-template)](https://www.npmjs.com/package/docspage-template)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Built with vanilla JavaScript and designed to work seamlessly with GitHub Pages, Netlify, Vercel, and any static hosting platform.

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
- 🎯 **Project Type Aware** - Adapts to web apps, libraries, APIs, CLI tools, and more

## 🚀 Quick Start

### Option 1: Use as GitHub Template (Recommended)

1. **Click "Use this template"** button above
2. **Create your new repository**
3. **Clone it locally**
4. **Run the interactive setup:**

```bash
node init-template.js  # Interactive configuration
node setup.js         # Apply your settings
```

### Option 2: npm Installation

```bash
npm install docspage-template
cd node_modules/docspage-template
npm run init  # Interactive setup
npm run setup # Apply configuration
```

### Option 3: Direct Download

1. **Download** this repository as ZIP
2. **Extract** to your project folder
3. **Run setup scripts**

### Option 4: Add to Existing Project

```bash
# Clone into your project
git clone https://github.com/docspage/template.git docs-template
cd docs-template

# Configure for your project
node init-template.js
node setup.js

# Copy to your project root
cp -r * ../
cd .. && rm -rf docs-template
```

## 🎯 Interactive Setup

The `init-template.js` script provides an intelligent setup experience:

### Project Type Detection
Choose from optimized configurations:
- 🌐 **Web Application** - Frontend apps, SPAs
- 📦 **Library/Package** - npm packages, SDKs  
- 🔌 **API/Backend** - REST APIs, microservices
- ⚡ **CLI Tool** - Command line utilities
- 📱 **Mobile App** - React Native, Flutter
- 🖥️ **Desktop App** - Electron, native apps

### Smart Defaults
Based on your project type, get intelligent defaults for:
- Installation commands
- Runtime requirements
- Memory and storage needs
- Package manager preferences
- Code examples and snippets

### Complete Configuration
The setup covers everything:
- Project branding and colors
- GitHub repository details
- Technical specifications
- Documentation structure
- Deployment settings

## 📋 What You Get

After setup, your project will have:

```
your-project/
├── 📄 index.html              # Main documentation app
├── ⚙️ template.config.json    # Your project configuration  
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

## 🔧 Customization

### Navigation Structure

Edit `docs/navigation.json` for your site structure:

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
        "title": "API Reference",
        "items": [
          {
            "title": "Authentication",
            "path": "docs/api/auth.md"
          }
        ]
      }
    ]
  }
]
```

### Brand Colors & Styling

Colors are automatically applied from your configuration:

```json
{
  "variables": {
    "PRIMARY_COLOR": "#007acc",
    "SECONDARY_COLOR": "#f8f9fa", 
    "ACCENT_COLOR": "#28a745"
  }
}
```

For advanced styling, modify CSS files in `src/`:
- `index-base.css` - Core styles and CSS variables
- `index.css` - Light theme overrides  
- `index-dark.css` - Dark theme overrides

## 🚀 Deployment

### GitHub Pages (Free & Easy)

1. **Push to GitHub**
2. **Repository Settings → Pages**
3. **Source: "Deploy from a branch" → "main" → "/ (root)"**
4. **Your site: `https://username.github.io/repository-name/`**

### Other Platforms

| Platform | Setup | Custom Domain | SSL | Cost |
|----------|-------|---------------|-----|------|
| **Netlify** | Connect repo | ✅ | ✅ | Free tier |
| **Vercel** | Import repo | ✅ | ✅ | Free tier |
| **Traditional** | Upload files | ✅ | ✅ | Varies |

## 📁 Project Structure

```
your-docs/
├── docs/                    # 📝 Your documentation content
│   ├── navigation.json      # 🧭 Site navigation structure
│   ├── introduction.md      # 👋 Project introduction
│   ├── installation.md      # 🔧 Setup instructions
│   ├── quick-start.md       # ⚡ Quick start guide
│   ├── guides/             # 📚 User guides
│   └── api/                # 🔌 API documentation
├── src/                    # ⚙️ Application source code
│   ├── app.js              # 🎯 Main application entry
│   ├── DocsApp.js          # 🧠 Core application logic
│   ├── managers/           # 📦 Feature managers
│   ├── index.css           # 🎨 Light theme styles
│   ├── index-dark.css      # 🌙 Dark theme styles
│   └── index-base.css      # 🎨 Base styles
├── index.html              # 🏠 Main HTML file
├── template.config.json    # ⚙️ Template configuration
├── setup.js               # 🔧 Setup script
└── README.md              # 📖 This file
```

## 🎨 Customization

### Branding & Colors

Update your brand colors in `template.config.json`:

```json
{
  "variables": {
    "PRIMARY_COLOR": "#your-brand-color",
    "SECONDARY_COLOR": "#your-secondary-color",
    "PROJECT_LOGO": "🎯",
    "PROJECT_LOGO_TEXT": "Your Brand"
  }
}
```

### Advanced Styling

Modify CSS files in `src/`:
- `index-base.css` - Core styles and CSS variables
- `index.css` - Light theme overrides
- `index-dark.css` - Dark theme overrides

### Navigation Structure

The navigation supports nested categories:

```json
[
  {
    "title": "Getting Started",
    "items": [
      {
        "title": "Introduction",
        "path": "docs/introduction.md"
      }
    ]
  },
  {
    "title": "Advanced",
    "items": [
      {
        "title": "Configuration",
        "path": "docs/advanced/config.md"
      }
    ]
  }
]
```

## 📝 Writing Documentation

### Markdown Support

Write your docs in standard Markdown with enhanced features:

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
```

### Code Blocks

Code blocks automatically get copy buttons and syntax highlighting:

```python
def calculate_total(items):
    return sum(item.price for item in items)
```

### Images and Assets

Place images in `docs/` and reference them:

```markdown
![Architecture Diagram](architecture.png)
```

## 🚀 Deployment Options

### GitHub Pages (Free)

1. Push your code to GitHub
2. Repository Settings → Pages
3. Source: "Deploy from a branch"
4. Branch: "main", Folder: "/ (root)"
5. Save and wait for deployment

### Netlify (Free)

1. Connect your GitHub repository
2. Build command: (leave empty)
3. Publish directory: (leave empty)
4. Deploy

### Vercel (Free)

1. Import your GitHub repository
2. Framework preset: "Other"
3. No build configuration needed
4. Deploy

### Traditional Hosting

Upload all files to your web server. The site is completely static and works anywhere.

## 🧹 Template Cleanup (Optional)

After you've completed setup and customization, you can remove template-specific files:

```bash
# Review what will be removed
node cleanup-template.js

# Confirm and remove template files
node cleanup-template.js --confirm
```

This removes:
- `template.config.json` and `template.config.example.json`
- `setup.js` and `cleanup-template.js`
- `TEMPLATE_SETUP.md`
- `.template-backup/` folder
- Template-specific content from README.md

## 🛠️ Development

### Local Development

For the best experience, use a local server:

```bash
# Python 3
python -m http.server 8000

# Node.js
npx http-server

# PHP
php -S localhost:8000
```

Then visit `http://localhost:8000`

### File Watching

For automatic reloading during development, use:

```bash
npx live-server
```

## 🤝 Contributing

This template is open source! Contributions welcome:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

MIT License - use this template for any project, commercial or personal.

## 🆘 Support

- 📖 Check the [Setup Guide](TEMPLATE_SETUP.md) for detailed instructions
- 🐛 [Report issues](https://github.com/yourusername/yourproject/issues) on GitHub
- 💬 [Start a discussion](https://github.com/yourusername/yourproject/discussions) for questions

## 🎯 Template Features Summary

This template provides everything you need for professional documentation:

### 📱 User Experience
- Fully responsive design that works on all devices
- Fast search across all documentation pages
- Dark/light theme toggle with system preference detection
- Smooth navigation with breadcrumbs and table of contents
- Copy-to-clipboard buttons on all code blocks

### 🛠️ Developer Experience
- Zero build process - just HTML, CSS, and JavaScript
- Markdown-based content with enhanced features
- Automatic syntax highlighting for 100+ languages
- Template variable system for easy customization
- One-command setup and deployment

### 🚀 Deployment Ready
- GitHub Pages compatible out of the box
- Works with Netlify, Vercel, and traditional hosting
- SEO optimized with proper meta tags
- Fast loading with optimized assets

## 📚 Template Structure

```
docspage-template/
├── 📄 index.html              # Main application entry point
├── ⚙️ template.config.json    # Your project configuration
├── 🔧 setup.js               # Template setup script
├── 🧹 cleanup-template.js    # Template cleanup script
├── 📖 TEMPLATE_SETUP.md      # Detailed setup guide
├── 📝 README.md              # This file
├── 📁 docs/                  # Your documentation content
│   ├── 🧭 navigation.json    # Site navigation structure
│   ├── 👋 introduction.md    # Project introduction
│   ├── 🔧 installation.md    # Installation guide
│   ├── ⚡ quick-start.md     # Quick start tutorial
│   ├── 📚 guides/           # User guides
│   ├── 🔌 api/              # API documentation
│   ├── 💡 examples/         # Code examples
│   └── 🤝 community/        # Community resources
└── 📁 src/                   # Application source code
    ├── 🎯 app.js            # Main application logic
    ├── 🧠 DocsApp.js        # Core documentation app
    ├── 📦 managers/         # Feature managers
    └── 🎨 *.css             # Styling (base, light, dark themes)
```

## 🔄 Template Workflow

1. **Get Template** → Copy or clone this repository
2. **Configure** → Edit `template.config.json` with your details
3. **Setup** → Run `node setup.js` to apply your configuration
4. **Customize** → Update navigation and replace placeholder content
5. **Test** → Open `index.html` locally or use a development server
6. **Deploy** → Push to GitHub Pages or your hosting platform
7. **Cleanup** → Optionally remove template files with cleanup script

## 🎨 Customization Options

### Colors and Branding
- Update `PRIMARY_COLOR` and `SECONDARY_COLOR` in config
- Modify CSS variables in `src/index-base.css`
- Replace logo and project name throughout

### Navigation Structure
- Edit `docs/navigation.json` for menu structure
- Supports unlimited nesting levels
- Automatic breadcrumb generation

### Content Organization
- Organize docs in logical folders (`guides/`, `api/`, etc.)
- Use descriptive filenames and clear headings
- Include code examples and practical use cases

## 🌟 Best Practices

### Content Writing
- Start with a clear introduction explaining what your project does
- Include installation instructions for all major platforms
- Provide working code examples that users can copy-paste
- Write troubleshooting guides for common issues
- Keep navigation simple and intuitive

### Maintenance
- Update documentation alongside code changes
- Test all links and examples regularly
- Gather feedback from users and improve accordingly
- Keep the template updated with latest features

## 🤝 Contributing to the Template

Found a bug or have a feature request for the template itself?

- 🐛 [Report issues](https://github.com/docspage/template/issues)
- 💡 [Suggest features](https://github.com/docspage/template/discussions)
- 🔧 [Submit pull requests](https://github.com/docspage/template/pulls)

## 📄 License

This template is open source under the MIT License. Use it for any project, commercial or personal.

---

**Made with ❤️ for the developer community**

*Turn any project into beautiful documentation in minutes, not hours.*

> **Ready to get started?** Edit `template.config.json` and run `node setup.js` to begin!
