class DocsApp {
    constructor() {
        this.currentTheme = localStorage.getItem('theme') || 'light';
        this.docs = new Map();
        this.navigation = [];
        this.searchIndex = [];
        
        this.initializeApp();
    }
    
    async initializeApp() {
        this.applyTheme();
        await this.loadNavigation();
        this.setupEventListeners();
        this.handleInitialRoute();
    }
    
    async loadNavigation() {
        try {
            // Try to load navigation from docs/navigation.json
            const response = await fetch('docs/navigation.json');
            if (response.ok) {
                this.navigation = await response.json();
            } else {
                // Fallback: scan for markdown files
                await this.scanForMarkdownFiles();
            }
            
            this.renderNavigation();
            this.buildSearchIndex();
        } catch (error) {
            console.error('Failed to load navigation:', error);
            await this.scanForMarkdownFiles();
            this.renderNavigation();
        }
    }
    
    async scanForMarkdownFiles() {
        // Dream Programming Language navigation structure
        this.navigation = [
            {
                title: "Getting Started",
                items: [
                    { title: "Introduction", path: "docs/introduction.md" },
                    { title: "Installation", path: "docs/installation.md" },
                    { title: "Quick Start", path: "docs/quick-start.md" }
                ]
            },
            {
                title: "Language Reference",
                items: [
                    { title: "Lexical Analysis", path: "docs/lexical.md" },
                    { title: "Source Text", path: "docs/lexical.md#source-text" },
                    { title: "Character Set", path: "docs/lexical.md#character-set" },
                    { title: "End of File", path: "docs/lexical.md#end-of-file" },
                    { title: "End of Line", path: "docs/lexical.md#end-of-line" },
                    { title: "White Space", path: "docs/lexical.md#white-space" },
                    { title: "Comments", path: "docs/lexical.md#comments" },
                    { title: "Tokens", path: "docs/lexical.md#tokens" },
                    { title: "Identifiers", path: "docs/lexical.md#identifiers" },
                    { title: "String Literals", path: "docs/lexical.md#string-literals" },
                    { title: "Wysiwyg Strings", path: "docs/lexical.md#wysiwyg-strings" },
                    { title: "Double Quoted Strings", path: "docs/lexical.md#double-quoted-strings" },
                    { title: "Delimited Strings", path: "docs/lexical.md#delimited-strings" },
                    { title: "Token Strings", path: "docs/lexical.md#token-strings" },
                    { title: "Hex Strings", path: "docs/lexical.md#hex-strings" },
                    { title: "String Postfix", path: "docs/lexical.md#string-postfix" },
                    { title: "Character Literals", path: "docs/lexical.md#character-literals" },
                    { title: "Integer Literals", path: "docs/lexical.md#integer-literals" },
                    { title: "Floating Point Literals", path: "docs/lexical.md#floating-point-literals" },
                    { title: "Keywords", path: "docs/lexical.md#keywords" },
                    { title: "Special Tokens", path: "docs/lexical.md#special-tokens" },
                    { title: "Special Token Sequences", path: "docs/lexical.md#special-token-sequences" }
                ]
            },
            {
                title: "API Reference",
                items: [
                    { title: "Overview", path: "docs/api/overview.md" },
                    { title: "Authentication", path: "docs/api/authentication.md" },
                    { title: "API Keys", path: "docs/api/auth/api-keys.md" }
                ]
            },
            {
                title: "Guides",
                items: [
                    { title: "Basic Usage", path: "docs/guides/basic-usage.md" },
                    { title: "Advanced Features", path: "docs/guides/advanced-features.md" }
                ]
            },
            {
                title: "Examples",
                items: [
                    { title: "Hello World (.dr)", path: "docs/other-page.md" }
                ]
            }
        ];
    }
    
    renderNavigation() {
        const nav = document.getElementById('navigation');
        nav.innerHTML = '';
        
        this.navigation.forEach(section => {
            const sectionDiv = document.createElement('div');
            sectionDiv.className = 'nav-section';
            
            const sectionTitle = document.createElement('h3');
            sectionTitle.textContent = section.title;
            sectionDiv.appendChild(sectionTitle);
            
            const ul = document.createElement('ul');
            section.items.forEach(item => {
                const li = document.createElement('li');
                const a = document.createElement('a');
                a.href = `#${item.path}`;
                a.textContent = item.title;
                a.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.loadDoc(item.path);
                    this.updateActiveNav(a);
                });
                li.appendChild(a);
                ul.appendChild(li);
            });
            
            sectionDiv.appendChild(ul);
            nav.appendChild(sectionDiv);
        });
    }
    
    buildSearchIndex() {
        this.searchIndex = [];
        this.navigation.forEach(section => {
            section.items.forEach(item => {
                this.searchIndex.push({
                    title: item.title,
                    path: item.path,
                    section: section.title
                });
            });
        });
    }
    
    setupEventListeners() {
        const searchInput = document.getElementById('search-input');
        const searchResults = document.getElementById('search-results');
        
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            
            if (query.length === 0) {
                searchResults.style.display = 'none';
                return;
            }
            
            const results = this.searchIndex.filter(item => 
                item.title.toLowerCase().includes(query) ||
                item.section.toLowerCase().includes(query)
            );
            
            this.renderSearchResults(results, searchResults);
        });
        
        // Hide search results when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.search-container')) {
                searchResults.style.display = 'none';
            }
        });
        
        // Handle browser back/forward
        window.addEventListener('popstate', () => {
            this.handleInitialRoute();
        });
    }
    
    renderSearchResults(results, container) {
        container.innerHTML = '';
        
        if (results.length === 0) {
            const noResults = document.createElement('div');
            noResults.className = 'no-results';
            noResults.textContent = 'No results found';
            container.appendChild(noResults);
        } else {
            results.forEach(result => {
                const div = document.createElement('div');
                div.className = 'search-result';
                div.innerHTML = `<strong>${result.title}</strong><br><small>${result.section}</small>`;
                div.addEventListener('click', () => {
                    this.loadDoc(result.path);
                    container.style.display = 'none';
                    document.getElementById('search-input').value = '';
                });
                container.appendChild(div);
            });
        }
        
        container.style.display = 'block';
    }
    
    async loadDoc(path) {
        const content = document.getElementById('content');
        content.innerHTML = '<div class="loading">Loading...</div>';
        
        try {
            let docContent;
            
            // Check if already cached
            if (this.docs.has(path)) {
                docContent = this.docs.get(path);
            } else {
                const response = await fetch(path);
                if (!response.ok) {
                    throw new Error(`Failed to load ${path}: ${response.status}`);
                }
                docContent = await response.text();
                this.docs.set(path, docContent);
            }
            
            // Parse and render markdown
            const html = marked.parse(docContent);
            const sanitizedHtml = DOMPurify.sanitize(html);
            
            content.innerHTML = sanitizedHtml;
            
            // Apply Dream language syntax highlighting
            this.highlightDreamCode();
            
            // Add copy buttons to code blocks
            this.addCopyButtons();
            
            // Generate table of contents
            this.generateTableOfContents();
            
            // Update breadcrumbs
            this.updateBreadcrumbs(path);
            
            // Update URL
            history.pushState({ path }, '', `#${path}`);
            
        } catch (error) {
            console.error('Error loading document:', error);
            content.innerHTML = `
                <div class="error">
                    <h1>Error Loading Document</h1>
                    <p>Failed to load: ${path}</p>
                    <div class="error-details">${error.message}</div>
                    <button class="retry-btn" onclick="app.loadDoc('${path}')">Retry</button>
                </div>
            `;
        }
    }
    
    highlightDreamCode() {
        // Find all code blocks with Dream language
        const dreamCodeBlocks = document.querySelectorAll('code[class*="language-dream"], pre code');
        dreamCodeBlocks.forEach(block => {
            if (block.textContent.includes('dream ') || block.parentElement.className.includes('language-dream')) {
                // Add Dream language class
                block.className = 'language-dream';
                block.parentElement.className = 'language-dream';
                
                // Simple syntax highlighting for Dream
                let html = block.innerHTML;
                
                // Highlight Dream keywords
                const keywords = ['dream', 'let', 'const', 'if', 'else', 'for', 'while', 'class', 'return', 'new', 'this', 'in'];
                keywords.forEach(keyword => {
                    const regex = new RegExp(`\\b${keyword}\\b`, 'g');
                    html = html.replace(regex, `<span class="token keyword">${keyword}</span>`);
                });
                
                // Highlight strings
                html = html.replace(/"([^"]*)"/g, '<span class="token string">"$1"</span>');
                
                // Highlight comments
                html = html.replace(/\/\/([^\n]*)/g, '<span class="token comment">//$1</span>');
                
                // Highlight numbers
                html = html.replace(/\b(\d+\.?\d*)\b/g, '<span class="token number">$1</span>');
                
                // Highlight function names
                html = html.replace(/(\w+)\s*\(/g, '<span class="token function">$1</span>(');
                
                block.innerHTML = html;
            }
        });
    }
    
    addCopyButtons() {
        const codeBlocks = document.querySelectorAll('pre');
        codeBlocks.forEach(block => {
            const button = document.createElement('button');
            button.className = 'copy-btn';
            button.textContent = 'Copy';
            button.addEventListener('click', () => {
                const code = block.querySelector('code');
                const text = code ? code.textContent : block.textContent;
                navigator.clipboard.writeText(text).then(() => {
                    button.textContent = 'Copied!';
                    setTimeout(() => {
                        button.textContent = 'Copy';
                    }, 2000);
                });
            });
            block.style.position = 'relative';
            block.appendChild(button);
        });
    }
    
    generateTableOfContents() {
        const toc = document.getElementById('table-of-contents');
        const headings = document.querySelectorAll('#content h1, #content h2, #content h3, #content h4');
        
        if (headings.length === 0) {
            toc.innerHTML = '<p style="color: var(--text-muted); font-style: italic;">No headings found</p>';
            return;
        }
        
        const tocList = document.createElement('ul');
        
        headings.forEach((heading, index) => {
            const level = parseInt(heading.tagName.charAt(1));
            const id = `heading-${index}`;
            heading.id = id;
            
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = `#${id}`;
            a.textContent = heading.textContent;
            a.className = `toc-level-${level}`;
            
            a.addEventListener('click', (e) => {
                e.preventDefault();
                heading.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
            
            li.appendChild(a);
            tocList.appendChild(li);
        });
        
        toc.innerHTML = '';
        toc.appendChild(tocList);
    }
    
    updateBreadcrumbs(path) {
        const breadcrumbs = document.getElementById('breadcrumbs');
        const pathParts = path.split('/');
        const fileName = pathParts[pathParts.length - 1].replace('.md', '');
        
        // Find the current item in navigation
        let currentItem = null;
        let currentSection = null;
        
        for (const section of this.navigation) {
            for (const item of section.items) {
                if (item.path === path) {
                    currentItem = item;
                    currentSection = section;
                    break;
                }
            }
            if (currentItem) break;
        }
        
        if (currentSection && currentItem) {
            breadcrumbs.innerHTML = `
                <span>${currentSection.title}</span>
                <span class="separator">›</span>
                <span class="current">${currentItem.title}</span>
            `;
        } else {
            breadcrumbs.innerHTML = `<span class="current">${fileName}</span>`;
        }
    }
    
    updateActiveNav(activeLink) {
        // Remove active class from all links
        document.querySelectorAll('.nav a').forEach(link => {
            link.classList.remove('active');
        });
        
        // Add active class to current link
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }
    
    handleInitialRoute() {
        const hash = window.location.hash.substring(1);
        if (hash) {
            this.loadDoc(hash);
            // Find and highlight the active nav item
            const activeLink = document.querySelector(`a[href="#${hash}"]`);
            this.updateActiveNav(activeLink);
        } else {
            // Load default document
            if (this.navigation.length > 0 && this.navigation[0].items.length > 0) {
                const firstDoc = this.navigation[0].items[0];
                this.loadDoc(firstDoc.path);
                const activeLink = document.querySelector(`a[href="#${firstDoc.path}"]`);
                this.updateActiveNav(activeLink);
            }
        }
    }
    
    applyTheme() {
        const themeCSS = document.getElementById('theme-css');
        const themeToggle = document.querySelector('.theme-toggle');
        
        if (this.currentTheme === 'dark') {
            themeCSS.href = 'src/index-dark.css';
            themeToggle.textContent = '☀️';
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            themeCSS.href = 'src/index.css';
            themeToggle.textContent = '🌙';
            document.documentElement.setAttribute('data-theme', 'light');
        }
    }
}

// Theme toggle function
function toggleTheme() {
    app.currentTheme = app.currentTheme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', app.currentTheme);
    app.applyTheme();
}

// Initialize the app
const app = new DocsApp();