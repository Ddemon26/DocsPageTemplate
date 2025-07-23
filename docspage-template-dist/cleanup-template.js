#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Template Cleanup Script
 * 
 * This script removes template-specific files after you've set up your documentation.
 * Run this after you've completed the template setup and are ready to finalize your project.
 */

class TemplateCleanup {
    constructor() {
        this.filesToRemove = [
            'template.config.json',
            'template.config.example.json',
            'setup.js',
            'cleanup-template.js', // This script itself
            'TEMPLATE_SETUP.md'
        ];
        
        this.foldersToCheck = [
            '.template-backup'
        ];
    }

    confirmCleanup() {
        console.log('🧹 DocsPage Template Cleanup');
        console.log('=============================\n');
        
        console.log('This will remove the following template files:');
        this.filesToRemove.forEach(file => {
            if (fs.existsSync(file)) {
                console.log(`   ✓ ${file}`);
            } else {
                console.log(`   - ${file} (not found)`);
            }
        });
        
        console.log('\nThis will also remove backup folders if they exist:');
        this.foldersToCheck.forEach(folder => {
            if (fs.existsSync(folder)) {
                console.log(`   ✓ ${folder}/`);
            } else {
                console.log(`   - ${folder}/ (not found)`);
            }
        });
        
        console.log('\n⚠️  Warning: This action cannot be undone!');
        console.log('Make sure you have completed the template setup before proceeding.\n');
        
        // In a real interactive environment, you'd use readline
        // For now, we'll just proceed with a warning
        console.log('To proceed with cleanup, run: node cleanup-template.js --confirm');
        
        if (!process.argv.includes('--confirm')) {
            console.log('\n💡 Add --confirm flag to actually perform the cleanup.');
            return false;
        }
        
        return true;
    }

    removeFile(filePath) {
        try {
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
                console.log(`✓ Removed ${filePath}`);
                return true;
            } else {
                console.log(`- ${filePath} (not found)`);
                return false;
            }
        } catch (error) {
            console.error(`❌ Error removing ${filePath}:`, error.message);
            return false;
        }
    }

    removeFolder(folderPath) {
        try {
            if (fs.existsSync(folderPath)) {
                fs.rmSync(folderPath, { recursive: true, force: true });
                console.log(`✓ Removed ${folderPath}/`);
                return true;
            } else {
                console.log(`- ${folderPath}/ (not found)`);
                return false;
            }
        } catch (error) {
            console.error(`❌ Error removing ${folderPath}/:`, error.message);
            return false;
        }
    }

    updateGitignore() {
        const gitignorePath = '.gitignore';
        
        try {
            let gitignoreContent = '';
            if (fs.existsSync(gitignorePath)) {
                gitignoreContent = fs.readFileSync(gitignorePath, 'utf8');
            }
            
            // Remove template-specific entries
            const templateEntries = [
                'template.config.json',
                'template.config.example.json',
                'setup.js',
                'cleanup-template.js',
                '.template-backup/',
                'TEMPLATE_SETUP.md'
            ];
            
            let updated = false;
            templateEntries.forEach(entry => {
                if (gitignoreContent.includes(entry)) {
                    gitignoreContent = gitignoreContent.replace(new RegExp(`^${entry}.*$`, 'gm'), '');
                    updated = true;
                }
            });
            
            if (updated) {
                // Clean up empty lines
                gitignoreContent = gitignoreContent.replace(/\n\s*\n\s*\n/g, '\n\n');
                fs.writeFileSync(gitignorePath, gitignoreContent);
                console.log('✓ Updated .gitignore');
            }
        } catch (error) {
            console.log('- Could not update .gitignore:', error.message);
        }
    }

    createFinalReadme() {
        // Update README to remove template-specific content
        const readmePath = 'README.md';
        
        try {
            if (fs.existsSync(readmePath)) {
                let content = fs.readFileSync(readmePath, 'utf8');
                
                // Remove template-specific sections
                const templateSections = [
                    /> \*\*This is a DocsPage Template\*\*.*?\n\n/s,
                    /## ✨ Template Features[\s\S]*?## 🚀 Using This Template/,
                    /## 🚀 Using This Template[\s\S]*?## 📁 Project Structure/
                ];
                
                templateSections.forEach(section => {
                    content = content.replace(section, '');
                });
                
                // Clean up the content
                content = content.replace(/\n\n\n+/g, '\n\n');
                
                fs.writeFileSync(readmePath, content);
                console.log('✓ Cleaned up README.md');
            }
        } catch (error) {
            console.log('- Could not update README.md:', error.message);
        }
    }

    run() {
        if (!this.confirmCleanup()) {
            return;
        }
        
        console.log('\n🧹 Starting cleanup...\n');
        
        let removedFiles = 0;
        let removedFolders = 0;
        
        // Remove files
        this.filesToRemove.forEach(file => {
            if (this.removeFile(file)) {
                removedFiles++;
            }
        });
        
        // Remove folders
        this.foldersToCheck.forEach(folder => {
            if (this.removeFolder(folder)) {
                removedFolders++;
            }
        });
        
        // Update .gitignore
        this.updateGitignore();
        
        // Clean up README
        this.createFinalReadme();
        
        console.log('\n📊 Cleanup Summary:');
        console.log(`   Files removed: ${removedFiles}`);
        console.log(`   Folders removed: ${removedFolders}`);
        
        console.log('\n✅ Template cleanup complete!');
        console.log('\n📋 Your documentation is now ready:');
        console.log('   • Template files have been removed');
        console.log('   • README.md has been cleaned up');
        console.log('   • .gitignore has been updated');
        console.log('\n🎉 Your documentation site is ready to use!');
    }
}

// Check if this is being run directly
if (require.main === module) {
    const cleanup = new TemplateCleanup();
    cleanup.run();
}

module.exports = TemplateCleanup;