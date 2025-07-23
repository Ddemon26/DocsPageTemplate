# Your Project Name Documentation

A brief description of what your project does and why it's useful

> **This is a DocsPage Template** - A modern, responsive documentation template that you can drop into any project to create beautiful documentation sites. Built with vanilla JavaScript and designed to work seamlessly with GitHub Pages.

## ✨ Template Features

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

## 🚀 Using This Template

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

### 2. Configure Your Project

Edit `template.config.json` with your project details:

```json
{
  "variables": {
    "PROJECT_NAME": "Your Project Name",
    "PROJECT_DESCRIPTION": "A brief description of what your project does and why it's useful",
    "PROJECT_LOGO": "🚀",
    "SITE_TITLE": "Your Project Documentation",
    "GITHUB_URL": "https://github.com/yourusername/yourproject",
    "AUTHOR_NAME": "Your Name",
    "PRIMARY_COLOR": "#007acc"
  }
}
```

### 3. Run Setup

```bash
node setup.js
```

This will replace all template variables throughout your files with your actual project information.

### 4. Add Your Content

Replace the placeholder files in `docs/` with your actual documentation:

```
docs/
├── introduction.md          # Your project overview
├── installation.md          # How to install/setup
├── quick-start.md          # Getting started guide
├── guides/                 # User guides
│   ├── basic-usage.md
│   ├── configuration.md
│   └── advanced-features.md
├── api/                    # API documentation
│   ├── overview.md
│   ├── authentication.md
│   └── endpoints.md
├── examples/               # Code examples
│   └── index.md
└── community/              # Community docs
    ├── contributing.md
    └── support.md
```

### 5. Update Navigation

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
  }
]
```

### 6. Deploy

**GitHub Pages:**
1. Push to GitHub
2. Go to Settings → Pages
3. Select "Deploy from a branch" → "main" → "/ (root)"
4. Your site will be live at `https://yourusername.github.io/repository-name/`

**Other Options:**
- **Netlify**: Connect your repo and deploy automatically
- **Vercel**: Import your repository and deploy
- **Traditional hosting**: Upload all files to your web server

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
