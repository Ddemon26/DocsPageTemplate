#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

class TemplateSetup {
    constructor() {
        this.configPath = 'template.config.json';
        this.config = this.loadConfig();
        this.processedFiles = 0;
        this.skippedFiles = 0;
    }

    loadConfig() {
        try {
            const configContent = fs.readFileSync(this.configPath, 'utf8');
            return JSON.parse(configContent);
        } catch (error) {
            console.error('❌ Error loading template.config.json:', error.message);
            console.log('\n💡 Make sure template.config.json exists and contains valid JSON.');
            console.log('   You can copy template.config.example.json as a starting point.');
            process.exit(1);
        }
    }

    validateConfig() {
        const required = ['PROJECT_NAME', 'SITE_TITLE', 'GITHUB_URL', 'AUTHOR_NAME'];
        const placeholderPatterns = ['{{', '}}', 'your', 'example', 'placeholder', 'template'];
        
        const issues = [];
        const warnings = [];
        
        required.forEach(key => {
            const value = this.config.variables[key];
            if (!value) {
                issues.push(`${key}: (empty)`);
            } else if (placeholderPatterns.some(pattern => value.toLowerCase().includes(pattern))) {
                issues.push(`${key}: ${value}`);
            }
        });
        
        // Check for common mistakes
        const githubUrl = this.config.variables.GITHUB_URL;
        if (githubUrl && !githubUrl.startsWith('https://github.com/') && !githubUrl.includes('{{')) {
            warnings.push('GITHUB_URL should start with "https://github.com/"');
        }
        
        // Check color format
        const colors = ['PRIMARY_COLOR', 'SECONDARY_COLOR', 'ACCENT_COLOR'];
        colors.forEach(colorKey => {
            const color = this.config.variables[colorKey];
            if (color && !color.match(/^#[0-9A-Fa-f]{6}$/) && !color.includes('{{')) {
                warnings.push(`${colorKey} should be a valid hex color (e.g., #007acc)`);
            }
        });
        
        if (issues.length > 0) {
            console.log('⚠️  Warning: The following variables still contain placeholder values:');
            issues.forEach(issue => {
                console.log(`   ${issue}`);
            });
            console.log('\n💡 Update these in template.config.json for a better result.\n');
        }
        
        if (warnings.length > 0) {
            console.log('⚠️  Additional warnings:');
            warnings.forEach(warning => {
                console.log(`   ${warning}`);
            });
            console.log('');
        }
    }

    replaceVariables(content, variables) {
        let result = content;
        for (const [key, value] of Object.entries(variables)) {
            const regex = new RegExp(`{{${key}}}`, 'g');
            result = result.replace(regex, value);
        }
        return result;
    }

    shouldProcessFile(filePath) {
        // Skip certain files and directories
        const skipPatterns = [
            'node_modules',
            '.git',
            '.vscode',
            '.template-backup',
            'template.config.json',
            'template.config.example.json',
            'setup.js'
        ];
        
        // Skip binary files
        const binaryExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.ico', '.pdf', '.zip', '.tar', '.gz'];
        const ext = path.extname(filePath).toLowerCase();
        if (binaryExtensions.includes(ext)) {
            return false;
        }
        
        return !skipPatterns.some(pattern => filePath.includes(pattern));
    }

    processFile(filePath, variables) {
        try {
            if (!this.shouldProcessFile(filePath)) {
                this.skippedFiles++;
                return;
            }

            const content = fs.readFileSync(filePath, 'utf8');
            const processedContent = this.replaceVariables(content, variables);
            
            if (content !== processedContent) {
                fs.writeFileSync(filePath, processedContent, 'utf8');
                console.log(`✓ Updated ${filePath}`);
                this.processedFiles++;
            } else {
                this.skippedFiles++;
            }
        } catch (error) {
            console.error(`❌ Error processing ${filePath}:`, error.message);
        }
    }

    processDirectory(dirPath, variables) {
        try {
            const items = fs.readdirSync(dirPath);
            
            for (const item of items) {
                const itemPath = path.join(dirPath, item);
                const stat = fs.statSync(itemPath);
                
                if (stat.isDirectory()) {
                    // Skip certain directories
                    if (['node_modules', '.git', '.vscode'].includes(item)) {
                        continue;
                    }
                    this.processDirectory(itemPath, variables);
                } else if (stat.isFile()) {
                    // Process text files
                    const ext = path.extname(item).toLowerCase();
                    if (['.html', '.js', '.css', '.md', '.json', '.txt'].includes(ext)) {
                        this.processFile(itemPath, variables);
                    }
                }
            }
        } catch (error) {
            console.error(`❌ Error processing directory ${dirPath}:`, error.message);
        }
    }

    createBackup() {
        const backupDir = '.template-backup';
        if (!fs.existsSync(backupDir)) {
            fs.mkdirSync(backupDir);
            console.log('📁 Created backup directory');
        }
    }

    showSummary() {
        console.log('\n📊 Setup Summary:');
        console.log(`   Files processed: ${this.processedFiles}`);
        console.log(`   Files skipped: ${this.skippedFiles}`);
        
        if (this.processedFiles === 0) {
            console.log('\n💡 No files were updated. This might mean:');
            console.log('   - Template variables were already replaced');
            console.log('   - No template variables were found in the files');
            console.log('   - All variables already contain their final values');
        }
    }

    run() {
        console.log('🚀 DocsPage Template Setup');
        console.log('==========================\n');
        
        // Validate configuration
        this.validateConfig();
        
        const variables = this.config.variables;
        
        console.log('📝 Configuration:');
        console.log(`   Project: ${variables.PROJECT_NAME}`);
        console.log(`   Description: ${variables.PROJECT_DESCRIPTION}`);
        console.log(`   GitHub: ${variables.GITHUB_URL}`);
        console.log(`   Site Title: ${variables.SITE_TITLE}`);
        console.log('');
        
        // Create backup
        this.createBackup();
        
        console.log('🔄 Processing files...');
        
        // Process all files
        this.processDirectory('.', variables);
        
        // Show summary
        this.showSummary();
        
        console.log('\n✅ Template setup complete!');
        console.log('\n📋 Next steps:');
        console.log('   1. Update docs/navigation.json with your documentation structure');
        console.log('   2. Replace placeholder content in docs/ folder with your actual documentation');
        console.log('   3. Test locally: open index.html in your browser or run a local server');
        console.log('      • Python: python -m http.server 8000');
        console.log('      • Node.js: npx http-server');
        console.log('      • Live reload: npx live-server');
        console.log('   4. Deploy to GitHub Pages, Netlify, Vercel, or your hosting platform');
        console.log('   5. Optional: Clean up template files with "node cleanup-template.js --confirm"');
        console.log('\n💡 Pro tip: Run "node cleanup-template.js" to see what files can be removed after setup.');
        console.log('\n🎉 Happy documenting!');
    }
}

// Check if this is being run directly
if (require.main === module) {
    const setup = new TemplateSetup();
    setup.run();
}