class NavigationManager {
    constructor() {
        this.navigation = [];
    }

    async load() {
        try {
            const response = await fetch('docs/navigation.json');
            if (response.ok) {
                this.navigation = await response.json();
            } else {
                this.generateDefaultNavigation();
            }
        } catch (error) {
            console.error('Failed to load navigation:', error);
            this.generateDefaultNavigation();
        }
    }

    generateDefaultNavigation() {
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
            },
            {
                title: "Community",
                items: [
                    { title: "Community Hub", path: "docs/community/index.md" },
                    { title: "Discussion Forums", path: "docs/community/forums.md" },
                    { title: "Chat & Support", path: "docs/community/chat.md" },
                    { title: "Events & Meetups", path: "docs/community/events.md" },
                    { title: "Community Guidelines", path: "docs/community/guidelines.md" },
                    { title: "Contributing", path: "docs/community/contributing.md" }
                ]
            },
            {
                title: "Resources",
                items: [
                    { title: "All Resources", path: "docs/resources/index.md" }
                ]
            },
            {
                title: "Downloads",
                items: [
                    { title: "Latest Release", path: "docs/downloads/index.md" }
                ]
            }
        ];
    }

    render(onItemClick) {
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
                    onItemClick(item.path, a);
                });
                li.appendChild(a);
                ul.appendChild(li);
            });

            sectionDiv.appendChild(ul);
            nav.appendChild(sectionDiv);
        });
    }

    updateActiveItem(activeLink) {
        document.querySelectorAll('.nav a').forEach(link => {
            link.classList.remove('active');
        });

        if (activeLink) {
            activeLink.classList.add('active');
        }
    }

    findItemByPath(path) {
        for (const section of this.navigation) {
            for (const item of section.items) {
                if (item.path === path) {
                    return { item, section };
                }
            }
        }
        return null;
    }

    getFirstItem() {
        return this.navigation.length > 0 && this.navigation[0].items.length > 0 
            ? this.navigation[0].items[0] 
            : null;
    }
}

export default NavigationManager;