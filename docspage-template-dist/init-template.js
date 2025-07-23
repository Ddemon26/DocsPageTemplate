#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

class TemplateInitializer {
    constructor() {
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        this.config = {};
        this.projectTypes = {
            'web-app': 'Web Application',
            'library': 'Library/Package',
            'api': 'API/Backend Service',
            'cli': 'Command Line Tool',
            'mobile': 'Mobile Application',
            'desktop': 'Desktop Application',
            'other': 'Other'
        };
    }

    async askQuestion(question, defaultValue = '') {
        return new Promise((resolve) => {
            const prompt = defaultValue ? `${question} (${defaultValue}): ` : `${question}: `;
            this.rl.question(prompt, (answer) => {
                resolve(answer.trim() || defaultValue);
            });
        });
    }

    async selectProjectType() {
        console.log('\n📋 Project Type Selection:');
        console.log('Choose the type that best describes your project:\n');
        
        const types = Object.entries(this.projectTypes);
        types.forEach(([key, value], index) => {
            console.log(`   ${index + 1}. ${value}`);
        });
        
        const selection = await this.askQuestion('\nSelect project type (1-7)', '1');
        const selectedIndex = parseInt(selection) - 1;
        const selectedKey = types[selectedIndex] ? types[selectedIndex][0] : 'other';
        
        return selectedKey;
    }

    getProjectTypeDefaults(projectType) {
        const defaults = {
            'web-app': {
                MAIN_LANGUAGE: 'JavaScript',
                PACKAGE_MANAGER: 'npm',
                RUNTIME_REQUIREMENT: 'Node.js 16+',
                INSTALL_COMMAND: 'npm install',
                RUN_COMMAND: 'npm start',
                MIN_MEMORY: '2GB',
                MIN_STORAGE: '500MB'
            },
            'library': {
                MAIN_LANGUAGE: 'JavaScript',
                PACKAGE_MANAGER: 'npm',
                RUNTIME_REQUIREMENT: 'Node.js 14+',
                INSTALL_COMMAND: 'npm install {{PACKAGE_NAME}}',
                RUN_COMMAND: 'import { {{PROJECT_NAME}} } from "{{PACKAGE_NAME}}"',
                MIN_MEMORY: '1GB',
                MIN_STORAGE: '100MB'
            },
            'api': {
                MAIN_LANGUAGE: 'JavaScript',
                PACKAGE_MANAGER: 'npm',
                RUNTIME_REQUIREMENT: 'Node.js 16+',
                INSTALL_COMMAND: 'npm install',
                RUN_COMMAND: 'npm run start:prod',
                MIN_MEMORY: '4GB',
                MIN_STORAGE: '1GB'
            },
            'cli': {
                MAIN_LANGUAGE: 'JavaScript',
                PACKAGE_MANAGER: 'npm',
                RUNTIME_REQUIREMENT: 'Node.js 14+',
                INSTALL_COMMAND: 'npm install -g {{PACKAGE_NAME}}',
                RUN_COMMAND: '{{CLI_COMMAND}}',
                MIN_MEMORY: '1GB',
                MIN_STORAGE: '200MB'
            },
            'mobile': {
                MAIN_LANGUAGE: 'React Native',
                PACKAGE_MANAGER: 'npm',
                RUNTIME_REQUIREMENT: 'Node.js 16+, React Native CLI',
                INSTALL_COMMAND: 'npm install',
                RUN_COMMAND: 'npx react-native run-android',
                MIN_MEMORY: '8GB',
                MIN_STORAGE: '5GB'
            },
            'desktop': {
                MAIN_LANGUAGE: 'Electron',
                PACKAGE_MANAGER: 'npm',
                RUNTIME_REQUIREMENT: 'Node.js 16+',
                INSTALL_COMMAND: 'npm install',
                RUN_COMMAND: 'npm run electron',
                MIN_MEMORY: '4GB',
                MIN_STORAGE: '2GB'
            },
            'other': {
                MAIN_LANGUAGE: 'JavaScript',
                PACKAGE_MANAGER: 'npm',
                RUNTIME_REQUIREMENT: 'Node.js 16+',
                INSTALL_COMMAND: 'npm install',
                RUN_COMMAND: 'npm start',
                MIN_MEMORY: '2GB',
                MIN_STORAGE: '500MB'
            }
        };
        
        return defaults[projectType] || defaults['other'];
    }

    async collectProjectInfo() {
        console.log('🚀 DocsPage Template Initialization');
        console.log('====================================\n');
        console.log('Let\'s set up your documentation project!\n');

        // Project type selection
        const projectType = await this.selectProjectType();
        const typeDefaults = this.getProjectTypeDefaults(projectType);

        // Basic project info
        this.config.PROJECT_NAME = await this.askQuestion('Project name', 'My Awesome Project');
        this.config.PROJECT_DESCRIPTION = await this.askQuestion('Project description', 'A brief description of what your project does and why it\'s useful');
        this.config.AUTHOR_NAME = await this.askQuestion('Author name', 'Your Name');
        this.config.AUTHOR_EMAIL = await this.askQuestion('Author email', 'your.email@example.com');

        // GitHub info
        this.config.GITHUB_USERNAME = await this.askQuestion('GitHub username', 'yourusername');
        this.config.GITHUB_REPO = await this.askQuestion('GitHub repository name', this.config.PROJECT_NAME.toLowerCase().replace(/\s+/g, '-'));
        this.config.GITHUB_URL = `https://github.com/${this.config.GITHUB_USERNAME}/${this.config.GITHUB_REPO}`;

        // Package name (for libraries/CLI tools)
        if (projectType === 'library' || projectType === 'cli') {
            this.config.PACKAGE_NAME = await this.askQuestion('Package name (for npm/pip)', `@${this.config.GITHUB_USERNAME}/${this.config.GITHUB_REPO}`);
        }

        // CLI command (for CLI tools)
        if (projectType === 'cli') {
            this.config.CLI_COMMAND = await this.askQuestion('CLI command name', this.config.GITHUB_REPO);
        }

        // Project details
        this.config.PROJECT_LOGO = await this.askQuestion('Project logo (emoji or text)', this.getProjectEmoji(projectType));
        this.config.PROJECT_LOGO_TEXT = await this.askQuestion('Logo text', this.config.PROJECT_NAME);
        this.config.SITE_TITLE = await this.askQuestion('Site title', `${this.config.PROJECT_NAME} Documentation`);
        this.config.VERSION = await this.askQuestion('Initial version', '1.0.0');
        this.config.LICENSE = await this.askQuestion('License', 'MIT');

        // Technical details with type-specific defaults
        this.config.MAIN_LANGUAGE = await this.askQuestion('Main programming language', typeDefaults.MAIN_LANGUAGE);
        this.config.PACKAGE_MANAGER = await this.askQuestion('Package manager', typeDefaults.PACKAGE_MANAGER);
        this.config.RUNTIME_REQUIREMENT = await this.askQuestion('Runtime requirement', typeDefaults.RUNTIME_REQUIREMENT);

        // URLs
        this.config.PROJECT_URL = await this.askQuestion('Project website URL (optional)', `https://${this.config.GITHUB_USERNAME}.github.io/${this.config.GITHUB_REPO}`);
        this.config.API_BASE_URL = await this.askQuestion('API base URL (optional)', `https://api.${this.config.GITHUB_REPO}.com`);

        // Installation commands with smart defaults
        let defaultInstallCmd = typeDefaults.INSTALL_COMMAND;
        if (this.config.PACKAGE_NAME) {
            defaultInstallCmd = defaultInstallCmd.replace('{{PACKAGE_NAME}}', this.config.PACKAGE_NAME);
        }
        this.config.INSTALL_COMMAND = await this.askQuestion('Install command', defaultInstallCmd);
        
        let defaultRunCmd = typeDefaults.RUN_COMMAND;
        if (this.config.CLI_COMMAND) {
            defaultRunCmd = defaultRunCmd.replace('{{CLI_COMMAND}}', this.config.CLI_COMMAND);
        }
        this.config.RUN_COMMAND = await this.askQuestion('Run command', defaultRunCmd);

        // System requirements
        this.config.MIN_MEMORY = await this.askQuestion('Minimum memory requirement', typeDefaults.MIN_MEMORY);
        this.config.MIN_STORAGE = await this.askQuestion('Minimum storage requirement', typeDefaults.MIN_STORAGE);

        // Colors
        this.config.PRIMARY_COLOR = await this.askQuestion('Primary brand color (hex)', '#007acc');
        this.config.SECONDARY_COLOR = await this.askQuestion('Secondary color (hex)', '#f8f9fa');
        this.config.ACCENT_COLOR = await this.askQuestion('Accent color (hex)', '#28a745');

        // Additional URLs
        this.config.DASHBOARD_URL = await this.askQuestion('Dashboard URL (optional)', `https://dashboard.${this.config.GITHUB_REPO}.com`);
        
        // Store project type for template customization
        this.config.PROJECT_TYPE = projectType;
    }

    getProjectEmoji(projectType) {
        const emojis = {
            'web-app': '🌐',
            'library': '📦',
            'api': '🔌',
            'cli': '⚡',
            'mobile': '📱',
            'desktop': '🖥️',
            'other': '🚀'
        };
        return emojis[projectType] || '🚀';
    }

    createConfigFile() {
        const configTemplate = {
            name: "DocsPage Template",
            version: "1.0.0",
            description: "A modern, responsive documentation template with search, navigation, and theming",
            author: "Template Author",
            variables: this.config,
            placeholders: {
                docs: {
                    "introduction.md": "Project introduction and overview - explain what your project does and why it's useful",
                    "installation.md": "Installation and setup instructions for your project across different platforms",
                    "quick-start.md": "Quick start guide to get users up and running in minutes",
                    "api/overview.md": "API documentation overview and getting started with your API",
                    "api/authentication.md": "API authentication methods, examples, and security best practices",
                    "api/endpoints.md": "Detailed API endpoint documentation with request/response examples",
                    "guides/basic-usage.md": "Basic usage patterns, examples, and common workflows",
                    "guides/configuration.md": "Configuration options, settings, and customization guide",
                    "guides/advanced-features.md": "Advanced features, power-user tips, and complex use cases",
                    "guides/troubleshooting.md": "Common issues, solutions, and debugging guide",
                    "examples/index.md": "Code examples, sample projects, and implementation patterns",
                    "community/contributing.md": "How to contribute to the project, development setup, and guidelines",
                    "community/support.md": "Support channels, community resources, and getting help"
                }
            },
            setup: {
                steps: [
                    "1. Run 'node init-template.js' to configure your project (you just did this!)",
                    "2. Run 'node setup.js' to apply variables to all files",
                    "3. Update docs/navigation.json with your documentation structure",
                    "4. Replace placeholder content in docs/ folder with your actual documentation",
                    "5. Test locally by opening index.html in your browser or using a local server",
                    "6. Deploy to GitHub Pages, Netlify, Vercel, or your preferred hosting platform"
                ]
            },
            files_to_process: [
                "index.html",
                "README.md",
                "docs/**/*.md",
                "src/**/*.js",
                "src/**/*.css"
            ]
        };

        fs.writeFileSync('template.config.json', JSON.stringify(configTemplate, null, 2));
        console.log('\n✅ Created template.config.json with your settings!');
    }

    showSummary() {
        console.log('\n📋 Configuration Summary:');
        console.log(`   Project: ${this.config.PROJECT_NAME}`);
        console.log(`   Description: ${this.config.PROJECT_DESCRIPTION}`);
        console.log(`   Author: ${this.config.AUTHOR_NAME}`);
        console.log(`   GitHub: ${this.config.GITHUB_URL}`);
        console.log(`   Language: ${this.config.MAIN_LANGUAGE}`);
        console.log(`   Package Manager: ${this.config.PACKAGE_MANAGER}`);
        console.log('');
    }

    showNextSteps() {
        console.log('🎉 Template initialization complete!');
        console.log('\n📋 Next steps:');
        console.log('   1. Run "node setup.js" to apply your configuration to all files');
        console.log('   2. Update docs/navigation.json with your documentation structure');
        console.log('   3. Replace placeholder content in docs/ folder with your actual documentation');
        console.log('   4. Test locally: open index.html in your browser or run a local server');
        console.log('      • Python: python -m http.server 8000');
        console.log('      • Node.js: npx http-server');
        console.log('      • Live reload: npx live-server');
        console.log('   5. Deploy to GitHub Pages, Netlify, Vercel, or your hosting platform');
        console.log('   6. Optional: Clean up template files with "node cleanup-template.js --confirm"');
        console.log('\n💡 Pro tip: Check out TEMPLATE_SETUP.md for detailed instructions!');
    }

    async run() {
        try {
            await this.collectProjectInfo();
            this.createConfigFile();
            this.showSummary();
            this.showNextSteps();
        } catch (error) {
            console.error('❌ Error during initialization:', error.message);
        } finally {
            this.rl.close();
        }
    }
}

// Check if this is being run directly
if (require.main === module) {
    const initializer = new TemplateInitializer();
    initializer.run();
}

module.exports = TemplateInitializer;