# DocsPage Template Setup Guide

This comprehensive guide will help you set up the DocsPage template for your project and customize it to match your needs.

## Prerequisites

- Basic knowledge of Markdown
- A text editor or IDE  
- Node.js 14+ (for running the setup scripts)
- Git (for version control and deployment)

## Quick Start (5 minutes)

1. **Get the template** - Use GitHub template, npm install, or direct download
2. **Initialize your project** - Run `node init-template.js` (interactive setup)
3. **Apply configuration** - Execute `node setup.js`
4. **Update navigation** - Modify `docs/navigation.json`
5. **Add content** - Replace placeholder docs with your content
6. **Deploy** - Push to GitHub Pages or your hosting platform

## Installation Methods

### Method 1: GitHub Template (Recommended)

1. **Click "Use this template"** on the repository page
2. **Create your new repository**
3. **Clone locally:**
   ```bash
   git clone https://github.com/yourusername/your-repo.git
   cd your-repo
   ```

### Method 2: npm Installation

```bash
npm install docspage-template
cd node_modules/docspage-template
npm run init
```

### Method 3: Direct Download

1. **Download ZIP** from GitHub
2. **Extract** to your project folder
3. **Initialize git** (if needed): `git init`

### Method 4: Add to Existing Project

```bash
# Clone template
git clone https://github.com/docspage/template.git temp-docs
cd temp-docs

# Configure
node init-template.js
node setup.js

# Copy to your project
cp -r * ../your-project/
cd ../your-project
rm -rf temp-docs
```

## Detailed Setup

### 1. Project Configuration

**Option A: Interactive Setup (Recommended)**

Run the interactive initialization script:

```bash
node init-template.js
```

This will guide you through setting up your project with questions and automatically create the `template.config.json` file.

**Option B: Manual Configuration**

Edit `template.config.json` with your project details. This file contains all the variables that will be replaced throughout your documentation:

```json
{
  "variables": {
    "PROJECT_NAME": "My Awesome Project",
    "PROJECT_DESCRIPTION": "A revolutionary tool that changes everything",
    "PROJECT_LOGO": "Logo",
    "PROJECT_LOGO_TEXT": "Awesome Project",
    "SITE_TITLE": "My Awesome Project Documentation",
    "GITHUB_URL": "https://github.com/myusername/my-project",
    "GITHUB_USERNAME": "myusername",
    "GITHUB_REPO": "my-project",
    "PROJECT_URL": "https://myproject.com",
    "API_BASE_URL": "https://api.myproject.com",
    "PRIMARY_COLOR": "#007acc",
    "SECONDARY_COLOR": "#f8f9fa",
    "AUTHOR_NAME": "Your Name",
    "AUTHOR_EMAIL": "your.email@example.com",
    "LICENSE": "MIT",
    "VERSION": "1.0.0",
    "INSTALL_COMMAND": "npm install my-project",
    "RUN_COMMAND": "npx my-project",
    "MAIN_LANGUAGE": "JavaScript",
    "RUNTIME_REQUIREMENT": "Node.js 16+"
  }
}
```

**Key Variables Explained:**
- `PROJECT_NAME` - Your project's name (used in titles and text)
- `PROJECT_DESCRIPTION` - Brief description of what your project does
- `PROJECT_LOGO` - Text or symbol logo for your project
- `SITE_TITLE` - HTML title for your documentation site
- `GITHUB_URL` - Full URL to your GitHub repository
- `PRIMARY_COLOR` - Main brand color (used in CSS)
- `INSTALL_COMMAND` - How users install your project
- `MAIN_LANGUAGE` - Primary programming language for code examples

### 2. Run Setup Script

The setup script will replace all template variables in your files:

```bash
node setup.js
```

This will update:
- HTML title and branding
- CSS color variables
- Markdown content placeholders
- Links and references

### 3. Update Navigation Structure

Edit `docs/navigation.json` to match your documentation:

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

### 4. Add Your Documentation Content

Replace the placeholder content in the `docs/` folder:

- `docs/introduction.md` - Project overview and introduction
- `docs/installation.md` - Installation instructions
- `docs/quick-start.md` - Quick start guide
- `docs/guides/` - User guides and tutorials
- `docs/api/` - API documentation

### 5. Customize Styling (Optional)

Update CSS variables in `src/index-base.css`:

```css
:root {
    --primary-color: #your-brand-color;
    --secondary-color: #your-secondary-color;
    /* Other customizations */
}
```

### 6. Deploy Your Documentation

#### GitHub Pages
1. Push your code to GitHub
2. Go to repository Settings > Pages
3. Select "Deploy from a branch" > "main" > "/ (root)"
4. Your site will be available at `https://yourusername.github.io/repository-name/`

#### Other Hosting Options
- **Netlify**: Connect your GitHub repo and deploy
- **Vercel**: Import your repository and deploy
- **Traditional hosting**: Upload all files to your web server

## File Structure

```
your-project/
├── docs/                    # Documentation content
│   ├── navigation.json      # Site navigation structure
│   ├── introduction.md      # Project introduction
│   ├── installation.md      # Installation guide
│   ├── quick-start.md       # Quick start tutorial
│   ├── guides/             # User guides
│   │   ├── basic-usage.md
│   │   └── advanced-features.md
│   └── api/                # API documentation
│       ├── overview.md
│       └── authentication.md
├── src/                    # Application source
│   ├── app.js             # Main application
│   ├── DocsApp.js         # Core app logic
│   ├── managers/          # Feature managers
│   ├── index.css          # Light theme
│   ├── index-dark.css     # Dark theme
│   └── index-base.css     # Base styles
├── index.html             # Main HTML file
├── template.config.json   # Template configuration
├── setup.js              # Setup script
└── README.md             # Project README
```

## Customization Options

### Branding
- Update logo and project name in `template.config.json`
- Modify colors using CSS variables
- Add custom favicon

### Navigation
- Edit `docs/navigation.json` for menu structure
- Supports nested categories and sections
- Automatic breadcrumb generation

### Styling
- Light/dark theme support built-in
- Responsive design for all devices
- Customizable via CSS variables

### Features
- Full-text search across all documentation
- Syntax highlighting for code blocks
- Table of contents generation
- Copy-to-clipboard for code examples

## Tips for Success

1. **Keep navigation simple** - Don't create too many nested levels
2. **Use descriptive titles** - Help users find what they need quickly
3. **Include code examples** - Show, don't just tell
4. **Test on mobile** - Ensure your docs work on all devices
5. **Update regularly** - Keep documentation current with your project

## Getting Help

- Check the [GitHub repository](https://github.com/your-template-repo) for issues and discussions
- Review the example documentation files for formatting ideas
- Test your setup locally before deploying

## Next Steps

After setup is complete:

1. Write your project's introduction
2. Document installation and setup procedures
3. Create user guides and tutorials
4. Add API documentation if applicable
5. Set up automated deployment
6. Share your documentation with users!

Happy documenting! 📚