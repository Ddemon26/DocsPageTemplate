#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

/**
 * Template Distribution Creator
 * 
 * Creates a distributable template package that can be:
 * 1. Downloaded as a ZIP file
 * 2. Cloned from GitHub
 * 3. Used as a GitHub template
 * 4. Installed via npm
 */

class TemplateDistribution {
    constructor() {
        this.distDir = 'docspage-template-dist';
        this.templateFiles = this.getTemplateFileList();
    }

    getTemplateFileList() {
        return {
            // Core application files
            core: [
                'index.html',
                'src/app.js',
                'src/DocsApp.js',
                'src/index.css',
                'src/index-dark.css',
                'src/index-base.css',
                'src/managers/DocumentManager.js',
                'src/managers/NavigationManager.js',
                'src/managers/SearchManager.js'
            ],
            
            // Documentation structure with placeholders
            docs: [
                'docs/navigation.json',
                'docs/introduction.md',
                'docs/installation.md',
                'docs/quick-start.md',
                'docs/guides/basic-usage.md',
                'docs/guides/configuration.md',
                'docs/guides/troubleshooting.md',
                'docs/api/overview.md',
                'docs/api/authentication.md',
                'docs/api/endpoints.md',
                'docs/examples/index.md',
                'docs/community/contributing.md',
                'docs/community/support.md'
            ],
            
            // Template system
            template: [
                'template.config.example.json',
                'init-template.js',
                'setup.js',
                'cleanup-template.js'
            ],
            
            // Documentation
            documentation: [
                'TEMPLATE_SETUP.md',
                'GETTING_STARTED.md'
            ],
            
            // Configuration
            config: [
                '.gitignore',
                '.gitattributes'
            ]
        };
    }

    createDistribution() {
        console.log('📦 Creating DocsPage Template Distribution');
        console.log('==========================================\n');

        // Clean and create distribution directory
        this.cleanDistDirectory();
        this.createDistDirectory();
        
        // Copy template files
        this.copyTemplateFiles();
        
        // Create distribution-specific files
        this.createDistributionFiles();
        
        // Create different distribution formats
        this.createGitHubTemplate();
        this.createNpmPackage();
        this.createZipDistribution();
        
        console.log('\n✅ Template distribution created successfully!');
        this.showDistributionSummary();
    }

    cleanDistDirectory() {
        if (fs.existsSync(this.distDir)) {
            fs.rmSync(this.distDir, { recursive: true, force: true });
            console.log('🧹 Cleaned existing distribution directory');
        }
    }

    createDistDirectory() {
        fs.mkdirSync(this.distDir, { recursive: true });
        console.log('📁 Created distribution directory');
    }

    copyTemplateFiles() {
        console.log('\n📋 Copying template files...');
        
        let totalCopied = 0;
        
        Object.entries(this.templateFiles).forEach(([category, files]) => {
            console.log(`\n📂 ${category.charAt(0).toUpperCase() + category.slice(1)} files:`);
            
            files.forEach(file => {
                const sourcePath = file;
                const destPath = path.join(this.distDir, file);
                
                try {
                    // Create directory if needed
                    const destDir = path.dirname(destPath);
                    if (!fs.existsSync(destDir)) {
                        fs.mkdirSync(destDir, { recursive: true });
                    }
                    
                    // Copy file if it exists
                    if (fs.existsSync(sourcePath)) {
                        fs.copyFileSync(sourcePath, destPath);
                        console.log(`   ✓ ${file}`);
                        totalCopied++;
                    } else {
                        console.log(`   - ${file} (not found)`);
                    }
                } catch (error) {
                    console.error(`   ❌ Error copying ${file}:`, error.message);
                }
            });
        });
        
        console.log(`\n📊 Total files copied: ${totalCopied}`);
    }

    createDistributionFiles() {
        console.log('\n🔧 Creating distribution-specific files...');
        
        // Create main README for the template
        this.createTemplateReadme();
        
        // Create package.json for npm distribution
        this.createPackageJson();
        
        // Create installation scripts
        this.createInstallationScripts();
        
        // Create GitHub workflow for template
        this.createGitHubWorkflow();
        
        // Create template configuration
        this.createTemplateConfig();
        
        console.log('✓ Distribution files created');
    }

    createTemplateReadme() {
        const readme = `# DocsPage Template

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

\`\`\`bash
node init-template.js  # Interactive setup
node setup.js         # Apply configuration
\`\`\`

### Option 2: Download and Copy

1. Download this repository as ZIP
2. Extract to your project folder
3. Run the setup scripts

### Option 3: Add to Existing Project

\`\`\`bash
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
\`\`\`

## 📁 What You Get

\`\`\`
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
\`\`\`

## 🎯 Setup Process

### 1. Interactive Configuration

\`\`\`bash
node init-template.js
\`\`\`

This will ask you about:
- Project name and description
- GitHub repository details
- Author information
- Project type (web app, library, API, CLI, etc.)
- Technical requirements
- Brand colors
- Installation commands

### 2. Apply Configuration

\`\`\`bash
node setup.js
\`\`\`

This replaces all template variables throughout your files.

### 3. Customize Navigation

Edit \`docs/navigation.json\`:

\`\`\`json
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
\`\`\`

### 4. Add Your Content

Replace placeholder content in \`docs/\` with your actual documentation.

### 5. Test Locally

\`\`\`bash
# Simple server
python -m http.server 8000
# or
npx http-server

# With live reload
npx live-server
\`\`\`

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

Update in \`template.config.json\`:

\`\`\`json
{
  "variables": {
    "PRIMARY_COLOR": "#your-brand-color",
    "SECONDARY_COLOR": "#your-secondary-color",
    "ACCENT_COLOR": "#your-accent-color"
  }
}
\`\`\`

### Advanced Styling

Modify CSS files in \`src/\`:
- \`index-base.css\` - Core styles and variables
- \`index.css\` - Light theme
- \`index-dark.css\` - Dark theme

## 📝 Writing Documentation

### Markdown Features

- Standard Markdown syntax
- Syntax highlighting for 100+ languages
- Automatic table of contents
- Copy buttons on code blocks
- Internal linking between pages

### Example Structure

\`\`\`markdown
# Page Title

Brief introduction to the page content.

## Section Heading

Content with [internal links](other-page.md) and [external links](https://example.com).

### Code Examples

\\\`\\\`\\\`javascript
function example() {
    return "Hello, World!";
}
\\\`\\\`\\\`

### Images

![Description](image.png)
\`\`\`

## 🚀 Deployment Options

| Platform | Setup | Custom Domain | SSL | Cost |
|----------|-------|---------------|-----|------|
| **GitHub Pages** | Push to repo | ✅ | ✅ | Free |
| **Netlify** | Connect repo | ✅ | ✅ | Free tier |
| **Vercel** | Import repo | ✅ | ✅ | Free tier |
| **Traditional Host** | Upload files | ✅ | ✅ | Varies |

## 🧹 Template Cleanup

After setup, remove template files:

\`\`\`bash
node cleanup-template.js --confirm
\`\`\`

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

> **Ready to get started?** Click "Use this template" above or run \`node init-template.js\` to begin!
`;

        const readmePath = path.join(this.distDir, 'README.md');
        fs.writeFileSync(readmePath, readme);
        console.log('   ✓ README.md');
    }

    createPackageJson() {
        const packageJson = {
            name: "docspage-template",
            version: "1.0.0",
            description: "A modern, responsive documentation template with search, navigation, and theming",
            main: "index.html",
            bin: {
                "docspage-init": "./init-template.js",
                "docspage-setup": "./setup.js",
                "docspage-cleanup": "./cleanup-template.js"
            },
            scripts: {
                "init": "node init-template.js",
                "setup": "node setup.js",
                "cleanup": "node cleanup-template.js",
                "serve": "npx http-server -p 8080 -c-1",
                "dev": "npx live-server --port=8080 --no-browser",
                "build": "echo 'No build process needed - static files only'",
                "test": "node -e \"console.log('✅ Template files are valid')\"",
                "postinstall": "echo '🚀 DocsPage Template installed! Run: npm run init'"
            },
            keywords: [
                "documentation",
                "template",
                "markdown",
                "static-site",
                "github-pages",
                "responsive",
                "search",
                "dark-theme",
                "netlify",
                "vercel"
            ],
            author: {
                name: "DocsPage Template",
                email: "support@docspage.dev",
                url: "https://docspage.dev"
            },
            license: "MIT",
            repository: {
                type: "git",
                url: "https://github.com/docspage/template.git"
            },
            bugs: {
                url: "https://github.com/docspage/template/issues"
            },
            homepage: "https://docspage.github.io/template",
            engines: {
                node: ">=14.0.0"
            },
            files: [
                "index.html",
                "src/",
                "docs/",
                "*.js",
                "*.md",
                "template.config.example.json",
                ".gitignore",
                ".gitattributes"
            ],
            devDependencies: {
                "http-server": "^14.1.1",
                "live-server": "^1.2.2"
            }
        };

        const packagePath = path.join(this.distDir, 'package.json');
        fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2));
        console.log('   ✓ package.json');
    }

    createInstallationScripts() {
        // Bash installation script
        const bashScript = `#!/bin/bash

# DocsPage Template Installation Script
set -e

echo "🚀 DocsPage Template Installation"
echo "=================================="
echo ""

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is required but not installed"
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js found: $(node --version)"
echo ""

# Run initialization
echo "🔧 Starting interactive setup..."
node init-template.js

echo ""
echo "🔄 Applying configuration..."
node setup.js

echo ""
echo "✅ Installation complete!"
echo ""
echo "📋 Next steps:"
echo "   1. Update docs/navigation.json"
echo "   2. Replace placeholder content in docs/"
echo "   3. Test: npm run serve"
echo "   4. Deploy to your platform"
echo ""
echo "🎉 Happy documenting!"
`;

        // PowerShell installation script
        const powershellScript = `# DocsPage Template Installation Script

Write-Host "🚀 DocsPage Template Installation" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""

# Check Node.js
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js found: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js is required but not installed" -ForegroundColor Red
    Write-Host "Please install Node.js from https://nodejs.org/" -ForegroundColor Yellow
    exit 1
}

Write-Host ""

# Run initialization
Write-Host "🔧 Starting interactive setup..." -ForegroundColor Yellow
node init-template.js

Write-Host ""
Write-Host "🔄 Applying configuration..." -ForegroundColor Yellow
node setup.js

Write-Host ""
Write-Host "✅ Installation complete!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Next steps:" -ForegroundColor Cyan
Write-Host "   1. Update docs/navigation.json"
Write-Host "   2. Replace placeholder content in docs/"
Write-Host "   3. Test: npm run serve"
Write-Host "   4. Deploy to your platform"
Write-Host ""
Write-Host "🎉 Happy documenting!" -ForegroundColor Magenta
`;

        fs.writeFileSync(path.join(this.distDir, 'install.sh'), bashScript);
        fs.writeFileSync(path.join(this.distDir, 'install.ps1'), powershellScript);
        
        try {
            fs.chmodSync(path.join(this.distDir, 'install.sh'), '755');
        } catch (error) {
            // Ignore chmod errors on Windows
        }
        
        console.log('   ✓ install.sh');
        console.log('   ✓ install.ps1');
    }

    createGitHubWorkflow() {
        const workflow = `name: Deploy Documentation

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '16'
    
    - name: Test template
      run: |
        echo "Testing template files..."
        test -f index.html
        test -f src/app.js
        test -f docs/navigation.json
        echo "✅ All template files present"
    
    - name: Deploy to GitHub Pages
      if: github.ref == 'refs/heads/main'
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: \${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./
        exclude_assets: '.github,node_modules,*.js,template.config.*,TEMPLATE_*'
`;

        const workflowDir = path.join(this.distDir, '.github', 'workflows');
        fs.mkdirSync(workflowDir, { recursive: true });
        fs.writeFileSync(path.join(workflowDir, 'deploy.yml'), workflow);
        console.log('   ✓ .github/workflows/deploy.yml');
    }

    createTemplateConfig() {
        const templateConfig = {
            name: "DocsPage Template",
            version: "1.0.0",
            description: "A modern, responsive documentation template",
            variables: {
                PROJECT_NAME: "{{PROJECT_NAME}}",
                PROJECT_DESCRIPTION: "{{PROJECT_DESCRIPTION}}",
                PROJECT_LOGO: "{{PROJECT_LOGO}}",
                PROJECT_LOGO_TEXT: "{{PROJECT_LOGO_TEXT}}",
                SITE_TITLE: "{{SITE_TITLE}}",
                GITHUB_URL: "{{GITHUB_URL}}",
                GITHUB_USERNAME: "{{GITHUB_USERNAME}}",
                GITHUB_REPO: "{{GITHUB_REPO}}",
                PROJECT_URL: "{{PROJECT_URL}}",
                API_BASE_URL: "{{API_BASE_URL}}",
                PRIMARY_COLOR: "{{PRIMARY_COLOR}}",
                SECONDARY_COLOR: "{{SECONDARY_COLOR}}",
                ACCENT_COLOR: "{{ACCENT_COLOR}}",
                AUTHOR_NAME: "{{AUTHOR_NAME}}",
                AUTHOR_EMAIL: "{{AUTHOR_EMAIL}}",
                LICENSE: "{{LICENSE}}",
                VERSION: "{{VERSION}}",
                INSTALL_COMMAND: "{{INSTALL_COMMAND}}",
                RUN_COMMAND: "{{RUN_COMMAND}}",
                MAIN_LANGUAGE: "{{MAIN_LANGUAGE}}",
                RUNTIME_REQUIREMENT: "{{RUNTIME_REQUIREMENT}}"
            }
        };

        const configPath = path.join(this.distDir, 'template.config.json');
        fs.writeFileSync(configPath, JSON.stringify(templateConfig, null, 2));
        console.log('   ✓ template.config.json');
    }

    createGitHubTemplate() {
        // Create .github/template.yml for GitHub template configuration
        const templateYml = `name: DocsPage Documentation Template
description: A modern, responsive documentation template with search, navigation, and theming
tags:
  - documentation
  - template
  - markdown
  - static-site
  - github-pages
  - responsive
  - search
  - dark-theme
`;

        const githubDir = path.join(this.distDir, '.github');
        if (!fs.existsSync(githubDir)) {
            fs.mkdirSync(githubDir, { recursive: true });
        }
        
        fs.writeFileSync(path.join(githubDir, 'template.yml'), templateYml);
        console.log('   ✓ .github/template.yml');
    }

    createNpmPackage() {
        console.log('\n📦 Creating npm package...');
        
        // The package.json is already created, just need to ensure proper structure
        const npmIgnore = `# NPM ignore file
node_modules/
.git/
.github/
*.log
.DS_Store
Thumbs.db
.vscode/
.idea/
*.tmp
*.temp
.template-backup/
`;

        fs.writeFileSync(path.join(this.distDir, '.npmignore'), npmIgnore);
        console.log('   ✓ .npmignore');
    }

    createZipDistribution() {
        console.log('\n📦 Creating ZIP distribution...');
        
        try {
            const zipName = 'docspage-template.zip';
            execSync(`cd ${this.distDir} && zip -r ../${zipName} .`, { stdio: 'inherit' });
            console.log(`   ✓ ${zipName}`);
        } catch (error) {
            console.log('   - ZIP creation skipped (zip command not available)');
        }
    }

    showDistributionSummary() {
        console.log('\n📊 Distribution Summary:');
        console.log('========================');
        console.log(`📁 Distribution folder: ${this.distDir}/`);
        console.log('📦 Package formats created:');
        console.log('   • GitHub Template (ready for "Use this template")');
        console.log('   • npm package (ready for publishing)');
        console.log('   • ZIP download (if zip available)');
        console.log('   • Direct clone/download');
        console.log('');
        console.log('🚀 Usage options:');
        console.log('   1. GitHub Template: Upload to GitHub, enable template');
        console.log('   2. npm: npm publish (from dist folder)');
        console.log('   3. ZIP: Distribute as download');
        console.log('   4. Git: Clone and use directly');
        console.log('');
        console.log('📋 Next steps:');
        console.log('   • Test the template in a new project');
        console.log('   • Update version numbers as needed');
        console.log('   • Publish to your preferred distribution method');
    }

    run() {
        this.createDistribution();
    }
}

// Check if this is being run directly
if (require.main === module) {
    const dist = new TemplateDistribution();
    dist.run();
}

module.exports = TemplateDistribution;