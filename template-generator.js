#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * DocsPage Template Generator
 * 
 * This script creates a complete documentation template package
 * that can be easily dropped into any project.
 */

class TemplateGenerator {
    constructor() {
        this.templateFiles = [
            // Core application files
            'index.html',
            'src/app.js',
            'src/DocsApp.js',
            'src/index.css',
            'src/index-dark.css',
            'src/index-base.css',
            'src/managers/DocumentManager.js',
            'src/managers/NavigationManager.js',
            'src/managers/SearchManager.js',
            
            // Documentation structure
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
            'docs/community/support.md',
            
            // Template system
            'template.config.json',
            'template.config.example.json',
            'init-template.js',
            'setup.js',
            'cleanup-template.js',
            
            // Documentation
            'README.md',
            'TEMPLATE_SETUP.md',
            'GETTING_STARTED.md',
            
            // Configuration
            '.gitignore',
            '.gitattributes',
            'LICENSE'
        ];
    }

    createTemplatePackage() {
        console.log('📦 Creating DocsPage Template Package');
        console.log('=====================================\n');

        const packageDir = 'docspage-template';
        
        // Create package directory
        if (!fs.existsSync(packageDir)) {
            fs.mkdirSync(packageDir, { recursive: true });
        }

        // Copy all template files
        this.copyTemplateFiles(packageDir);
        
        // Create package.json for the template
        this.createPackageJson(packageDir);
        
        // Create installation script
        this.createInstallScript(packageDir);
        
        // Create README for the template package
        this.createTemplateReadme(packageDir);

        console.log(`\n✅ Template package created in: ${packageDir}/`);
        console.log('\n📋 Package contents:');
        console.log('   • Complete documentation template');
        console.log('   • Interactive setup scripts');
        console.log('   • Example configurations');
        console.log('   • Comprehensive documentation');
        console.log('\n🚀 To use this template:');
        console.log(`   1. Copy the ${packageDir}/ folder to your project`);
        console.log('   2. Run: node init-template.js');
        console.log('   3. Run: node setup.js');
        console.log('   4. Customize your documentation');
    }

    copyTemplateFiles(packageDir) {
        console.log('📁 Copying template files...\n');
        
        let copiedFiles = 0;
        
        this.templateFiles.forEach(file => {
            const sourcePath = file;
            const destPath = path.join(packageDir, file);
            
            try {
                // Create directory if it doesn't exist
                const destDir = path.dirname(destPath);
                if (!fs.existsSync(destDir)) {
                    fs.mkdirSync(destDir, { recursive: true });
                }
                
                // Copy file if it exists
                if (fs.existsSync(sourcePath)) {
                    fs.copyFileSync(sourcePath, destPath);
                    console.log(`✓ Copied ${file}`);
                    copiedFiles++;
                } else {
                    console.log(`- Skipped ${file} (not found)`);
                }
            } catch (error) {
                console.error(`❌ Error copying ${file}:`, error.message);
            }
        });
        
        console.log(`\n📊 Copied ${copiedFiles} files`);
    }

    createPackageJson(packageDir) {
        const packageJson = {
            name: "docspage-template",
            version: "1.0.0",
            description: "A modern, responsive documentation template with search, navigation, and theming",
            main: "index.html",
            scripts: {
                "init": "node init-template.js",
                "setup": "node setup.js",
                "cleanup": "node cleanup-template.js",
                "serve": "npx http-server -p 8080",
                "dev": "npx live-server --port=8080"
            },
            keywords: [
                "documentation",
                "template",
                "markdown",
                "static-site",
                "github-pages",
                "responsive",
                "search",
                "dark-theme"
            ],
            author: "DocsPage Template",
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
            devDependencies: {
                "http-server": "^14.1.1",
                "live-server": "^1.2.2"
            }
        };

        const packagePath = path.join(packageDir, 'package.json');
        fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2));
        console.log('✓ Created package.json');
    }

    createInstallScript(packageDir) {
        const installScript = `#!/bin/bash

# DocsPage Template Installation Script
# This script helps you set up the documentation template in your project

set -e

echo "🚀 DocsPage Template Installation"
echo "=================================="
echo ""

# Check if we're in the right directory
if [ ! -f "init-template.js" ]; then
    echo "❌ Error: This script must be run from the template directory"
    echo "Make sure you're in the docspage-template folder"
    exit 1
fi

# Check for Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Error: Node.js is required but not installed"
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js found: $(node --version)"
echo ""

# Run initialization
echo "🔧 Starting template initialization..."
node init-template.js

echo ""
echo "🔄 Applying template configuration..."
node setup.js

echo ""
echo "✅ Template installation complete!"
echo ""
echo "📋 Next steps:"
echo "   1. Update docs/navigation.json with your documentation structure"
echo "   2. Replace placeholder content in docs/ folder"
echo "   3. Test locally: npm run serve"
echo "   4. Deploy to your hosting platform"
echo ""
echo "💡 Run 'npm run cleanup' when you're done to remove template files"
echo ""
echo "🎉 Happy documenting!"
`;

        const scriptPath = path.join(packageDir, 'install.sh');
        fs.writeFileSync(scriptPath, installScript);
        
        // Make script executable (on Unix systems)
        try {
            fs.chmodSync(scriptPath, '755');
        } catch (error) {
            // Ignore chmod errors on Windows
        }
        
        console.log('✓ Created install.sh');
    }

    createTemplateReadme(packageDir) {
        const templateReadme = `# DocsPage Template

A modern, responsive documentation template that you can drop into any project to create beautiful documentation sites.

## Features

- 📱 **Responsive Design** - Works on all devices
- 🔍 **Full-Text Search** - Find content instantly
- 🌙 **Dark/Light Themes** - Toggle between themes
- 📚 **Smart Navigation** - Hierarchical navigation with breadcrumbs
- 🎨 **Customizable** - Easy to brand and customize
- ⚡ **Fast** - Zero build process, just HTML/CSS/JS
- 🚀 **Deploy Ready** - GitHub Pages, Netlify, Vercel compatible

## Quick Start

### 1. Copy Template

Copy this entire folder to your project directory.

### 2. Initialize

Run the interactive setup:

\`\`\`bash
node init-template.js
\`\`\`

### 3. Apply Configuration

\`\`\`bash
node setup.js
\`\`\`

### 4. Customize

- Update \`docs/navigation.json\` with your structure
- Replace placeholder content in \`docs/\` folder
- Customize colors and branding

### 5. Test

\`\`\`bash
npm run serve
# or
npm run dev  # with live reload
\`\`\`

### 6. Deploy

Push to GitHub and enable GitHub Pages, or deploy to Netlify/Vercel.

## Project Structure

\`\`\`
docspage-template/
├── 📄 index.html              # Main application
├── ⚙️ template.config.json    # Configuration
├── 🔧 init-template.js       # Interactive setup
├── 🔧 setup.js               # Apply configuration
├── 🧹 cleanup-template.js    # Remove template files
├── 📦 package.json           # NPM configuration
├── 🚀 install.sh             # Installation script
├── 📁 docs/                  # Documentation content
│   ├── 🧭 navigation.json    # Site navigation
│   ├── 📝 *.md              # Markdown files
│   ├── 📚 guides/           # User guides
│   ├── 🔌 api/              # API docs
│   ├── 💡 examples/         # Examples
│   └── 🤝 community/        # Community
└── 📁 src/                   # Application source
    ├── 🎯 app.js            # Main app
    ├── 🧠 DocsApp.js        # Core logic
    ├── 📦 managers/         # Feature managers
    └── 🎨 *.css             # Styling
\`\`\`

## Customization

### Colors and Branding

Update \`template.config.json\`:

\`\`\`json
{
  "variables": {
    "PROJECT_NAME": "Your Project",
    "PRIMARY_COLOR": "#your-color",
    "PROJECT_LOGO": "Logo"
  }
}
\`\`\`

### Navigation

Edit \`docs/navigation.json\`:

\`\`\`json
[
  {
    "title": "Getting Started",
    "items": [
      {
        "title": "Introduction",
        "path": "docs/introduction.md"
      }
    ]
  }
]
\`\`\`

## Deployment

### GitHub Pages

1. Push to GitHub
2. Settings → Pages
3. Source: "Deploy from a branch"
4. Branch: "main", Folder: "/ (root)"

### Netlify

1. Connect GitHub repository
2. Build command: (empty)
3. Publish directory: (empty)
4. Deploy

### Vercel

1. Import GitHub repository
2. Framework: "Other"
3. Deploy

## Scripts

- \`npm run init\` - Interactive setup
- \`npm run setup\` - Apply configuration
- \`npm run serve\` - Local development server
- \`npm run dev\` - Development with live reload
- \`npm run cleanup\` - Remove template files

## Support

- 📖 [Documentation](TEMPLATE_SETUP.md)
- 🐛 [Issues](https://github.com/docspage/template/issues)
- 💬 [Discussions](https://github.com/docspage/template/discussions)

## License

MIT License - use for any project, commercial or personal.

---

**Made with ❤️ for the developer community**

*Turn any project into beautiful documentation in minutes.*
`;

        const readmePath = path.join(packageDir, 'TEMPLATE_README.md');
        fs.writeFileSync(readmePath, templateReadme);
        console.log('✓ Created TEMPLATE_README.md');
    }

    run() {
        this.createTemplatePackage();
    }
}

// Check if this is being run directly
if (require.main === module) {
    const generator = new TemplateGenerator();
    generator.run();
}

module.exports = TemplateGenerator;