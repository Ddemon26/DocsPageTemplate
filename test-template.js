#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Template Testing Script
 * 
 * Tests the template system to ensure all components work correctly
 */

class TemplateTester {
    constructor() {
        this.testResults = {
            passed: 0,
            failed: 0,
            warnings: 0,
            tests: []
        };
    }

    test(name, testFn) {
        try {
            const result = testFn();
            if (result === true) {
                this.testResults.passed++;
                this.testResults.tests.push({ name, status: 'PASS', message: '' });
                console.log(`✅ ${name}`);
            } else if (result && result.warning) {
                this.testResults.warnings++;
                this.testResults.tests.push({ name, status: 'WARN', message: result.message });
                console.log(`⚠️  ${name}: ${result.message}`);
            } else {
                this.testResults.failed++;
                this.testResults.tests.push({ name, status: 'FAIL', message: result.message || 'Test failed' });
                console.log(`❌ ${name}: ${result.message || 'Test failed'}`);
            }
        } catch (error) {
            this.testResults.failed++;
            this.testResults.tests.push({ name, status: 'FAIL', message: error.message });
            console.log(`❌ ${name}: ${error.message}`);
        }
    }

    runTests() {
        console.log('🧪 DocsPage Template Testing');
        console.log('=============================\n');

        // Test core files
        console.log('📁 Core Files:');
        this.test('index.html exists', () => fs.existsSync('index.html'));
        this.test('src/app.js exists', () => fs.existsSync('src/app.js'));
        this.test('src/DocsApp.js exists', () => fs.existsSync('src/DocsApp.js'));
        this.test('docs/navigation.json exists', () => fs.existsSync('docs/navigation.json'));

        // Test CSS files
        console.log('\n🎨 Styling:');
        this.test('Base CSS exists', () => fs.existsSync('src/index-base.css'));
        this.test('Light theme CSS exists', () => fs.existsSync('src/index.css'));
        this.test('Dark theme CSS exists', () => fs.existsSync('src/index-dark.css'));

        // Test managers
        console.log('\n📦 Managers:');
        this.test('DocumentManager exists', () => fs.existsSync('src/managers/DocumentManager.js'));
        this.test('NavigationManager exists', () => fs.existsSync('src/managers/NavigationManager.js'));
        this.test('SearchManager exists', () => fs.existsSync('src/managers/SearchManager.js'));

        // Test documentation structure
        console.log('\n📚 Documentation:');
        this.test('Introduction doc exists', () => fs.existsSync('docs/introduction.md'));
        this.test('Installation doc exists', () => fs.existsSync('docs/installation.md'));
        this.test('Quick start doc exists', () => fs.existsSync('docs/quick-start.md'));
        this.test('Guides folder exists', () => fs.existsSync('docs/guides'));
        this.test('API folder exists', () => fs.existsSync('docs/api'));
        this.test('Examples folder exists', () => fs.existsSync('docs/examples'));

        // Test template system
        console.log('\n🔧 Template System:');
        this.test('init-template.js exists', () => fs.existsSync('init-template.js'));
        this.test('setup.js exists', () => fs.existsSync('setup.js'));
        this.test('cleanup-template.js exists', () => fs.existsSync('cleanup-template.js'));
        this.test('template.config.example.json exists', () => fs.existsSync('template.config.example.json'));

        // Test configuration files
        console.log('\n⚙️  Configuration:');
        this.test('Navigation JSON is valid', () => this.testNavigationJson());
        this.test('Template config example is valid', () => this.testTemplateConfig());
        this.test('HTML file has template variables', () => this.testHtmlTemplateVars());

        // Test documentation content
        console.log('\n📝 Content:');
        this.test('Documentation has template variables', () => this.testDocumentationVars());
        this.test('CSS has color variables', () => this.testCssVariables());

        // Test scripts
        console.log('\n🚀 Scripts:');
        this.test('Init script is executable', () => this.testScriptExecutable('init-template.js'));
        this.test('Setup script is executable', () => this.testScriptExecutable('setup.js'));
        this.test('Cleanup script is executable', () => this.testScriptExecutable('cleanup-template.js'));

        // Show results
        this.showResults();
    }

    testNavigationJson() {
        try {
            const content = fs.readFileSync('docs/navigation.json', 'utf8');
            const nav = JSON.parse(content);
            
            if (!Array.isArray(nav)) {
                return { message: 'Navigation should be an array' };
            }
            
            if (nav.length === 0) {
                return { warning: true, message: 'Navigation is empty' };
            }
            
            // Check structure
            for (const section of nav) {
                if (!section.title || !section.items) {
                    return { message: 'Navigation sections must have title and items' };
                }
                
                for (const item of section.items) {
                    if (!item.title) {
                        return { message: 'Navigation items must have title' };
                    }
                    
                    if (item.path && !fs.existsSync(item.path)) {
                        return { warning: true, message: `Navigation references missing file: ${item.path}` };
                    }
                }
            }
            
            return true;
        } catch (error) {
            return { message: `Invalid navigation JSON: ${error.message}` };
        }
    }

    testTemplateConfig() {
        try {
            const content = fs.readFileSync('template.config.example.json', 'utf8');
            const config = JSON.parse(content);
            
            if (!config.variables) {
                return { message: 'Template config must have variables section' };
            }
            
            const requiredVars = ['PROJECT_NAME', 'PROJECT_DESCRIPTION', 'GITHUB_URL', 'AUTHOR_NAME'];
            for (const varName of requiredVars) {
                if (!config.variables[varName]) {
                    return { message: `Template config missing required variable: ${varName}` };
                }
            }
            
            return true;
        } catch (error) {
            return { message: `Invalid template config: ${error.message}` };
        }
    }

    testHtmlTemplateVars() {
        try {
            const content = fs.readFileSync('index.html', 'utf8');
            const templateVars = content.match(/\{\{[A-Z_]+\}\}/g);
            
            if (!templateVars || templateVars.length === 0) {
                return { warning: true, message: 'No template variables found in HTML' };
            }
            
            return true;
        } catch (error) {
            return { message: `Error reading HTML file: ${error.message}` };
        }
    }

    testDocumentationVars() {
        try {
            const docFiles = [
                'docs/introduction.md',
                'docs/installation.md',
                'docs/quick-start.md'
            ];
            
            let hasTemplateVars = false;
            
            for (const file of docFiles) {
                if (fs.existsSync(file)) {
                    const content = fs.readFileSync(file, 'utf8');
                    if (content.includes('{{') && content.includes('}}')) {
                        hasTemplateVars = true;
                        break;
                    }
                }
            }
            
            if (!hasTemplateVars) {
                return { warning: true, message: 'No template variables found in documentation' };
            }
            
            return true;
        } catch (error) {
            return { message: `Error checking documentation: ${error.message}` };
        }
    }

    testCssVariables() {
        try {
            const cssFile = 'src/index-base.css';
            if (!fs.existsSync(cssFile)) {
                return { message: 'Base CSS file not found' };
            }
            
            const content = fs.readFileSync(cssFile, 'utf8');
            
            // Check for CSS custom properties
            if (!content.includes('--primary-color') && !content.includes('{{PRIMARY_COLOR}}')) {
                return { warning: true, message: 'No color variables found in CSS' };
            }
            
            return true;
        } catch (error) {
            return { message: `Error checking CSS: ${error.message}` };
        }
    }

    testScriptExecutable(scriptPath) {
        try {
            if (!fs.existsSync(scriptPath)) {
                return { message: `Script not found: ${scriptPath}` };
            }
            
            const content = fs.readFileSync(scriptPath, 'utf8');
            
            // Check for shebang
            if (!content.startsWith('#!/usr/bin/env node')) {
                return { warning: true, message: `Script missing shebang: ${scriptPath}` };
            }
            
            // Check for basic Node.js syntax
            if (!content.includes('require(') && !content.includes('import ')) {
                return { warning: true, message: `Script may not be valid Node.js: ${scriptPath}` };
            }
            
            return true;
        } catch (error) {
            return { message: `Error checking script: ${error.message}` };
        }
    }

    showResults() {
        console.log('\n📊 Test Results:');
        console.log('================');
        console.log(`✅ Passed: ${this.testResults.passed}`);
        console.log(`❌ Failed: ${this.testResults.failed}`);
        console.log(`⚠️  Warnings: ${this.testResults.warnings}`);
        
        const total = this.testResults.passed + this.testResults.failed + this.testResults.warnings;
        const successRate = Math.round((this.testResults.passed / total) * 100);
        
        console.log(`\n📈 Success Rate: ${successRate}%`);
        
        if (this.testResults.failed > 0) {
            console.log('\n❌ Failed Tests:');
            this.testResults.tests
                .filter(test => test.status === 'FAIL')
                .forEach(test => {
                    console.log(`   • ${test.name}: ${test.message}`);
                });
        }
        
        if (this.testResults.warnings > 0) {
            console.log('\n⚠️  Warnings:');
            this.testResults.tests
                .filter(test => test.status === 'WARN')
                .forEach(test => {
                    console.log(`   • ${test.name}: ${test.message}`);
                });
        }
        
        console.log('\n' + (this.testResults.failed === 0 ? '🎉 All tests passed!' : '🔧 Some tests need attention.'));
        
        if (this.testResults.failed === 0 && this.testResults.warnings === 0) {
            console.log('\n✅ Template is ready for distribution!');
        } else if (this.testResults.failed === 0) {
            console.log('\n✅ Template is functional with minor warnings.');
        } else {
            console.log('\n❌ Template has issues that should be fixed before distribution.');
        }
    }

    run() {
        this.runTests();
        return this.testResults.failed === 0;
    }
}

// Check if this is being run directly
if (require.main === module) {
    const tester = new TemplateTester();
    const success = tester.run();
    process.exit(success ? 0 : 1);
}

module.exports = TemplateTester;