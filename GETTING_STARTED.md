# Getting Started with DocsPage Template

Welcome! This template helps you create beautiful documentation for any project in just a few minutes.

## 🚀 Quick Start (5 minutes)

### 1. Configure Your Project
Edit `template.config.json`:

```json
{
  "variables": {
    "PROJECT_NAME": "My Awesome Project",
    "PROJECT_DESCRIPTION": "What your project does",
    "GITHUB_URL": "https://github.com/yourusername/yourproject",
    "AUTHOR_NAME": "Your Name",
    "PRIMARY_COLOR": "#007acc"
  }
}
```

### 2. Run Setup
```bash
node setup.js
```

### 3. Update Navigation
Edit `docs/navigation.json` to match your docs structure.

### 4. Add Your Content
Replace the placeholder files in `docs/` with your actual documentation.

### 5. Test Locally
```bash
# Option 1: Simple file server
python -m http.server 8000

# Option 2: With live reload
npx live-server
```

### 6. Deploy
Push to GitHub and enable GitHub Pages, or deploy to Netlify/Vercel.

## 📁 What You Get

- **Responsive documentation site** that works on all devices
- **Search functionality** across all your docs
- **Dark/light theme toggle** for better reading experience
- **Automatic table of contents** generated from your headings
- **Syntax highlighting** for code blocks in 100+ languages
- **Copy buttons** on all code examples
- **SEO optimized** with proper meta tags

## 🎯 Perfect For

- ✅ API documentation
- ✅ Software libraries and frameworks
- ✅ Product documentation
- ✅ Technical guides and tutorials
- ✅ Open source projects
- ✅ Internal team documentation

## 🔧 Customization

The template is highly customizable:

- **Colors**: Update in `template.config.json`
- **Logo**: Change `PROJECT_LOGO` and `PROJECT_LOGO_TEXT`
- **Navigation**: Edit `docs/navigation.json`
- **Styling**: Modify CSS files in `src/`
- **Content**: All docs are in Markdown format

## 📚 Documentation Structure

```
docs/
├── introduction.md     # Project overview
├── installation.md     # How to install
├── quick-start.md      # Getting started guide
├── guides/            # User guides
├── api/               # API documentation
├── examples/          # Code examples
└── community/         # Community resources
```

## 🎉 Next Steps

1. **Read the full setup guide**: [TEMPLATE_SETUP.md](TEMPLATE_SETUP.md)
2. **Explore the example content** to understand the structure
3. **Join our community** for help and inspiration
4. **Star the repository** if you find it useful!

## 💡 Tips

- Keep your navigation simple and logical
- Include plenty of code examples
- Write clear, concise explanations
- Test your documentation with real users
- Update docs alongside your code changes

## 🆘 Need Help?

- 📖 [Full Setup Guide](TEMPLATE_SETUP.md)
- 🐛 [Report Issues](https://github.com/docspage/template/issues)
- 💬 [Ask Questions](https://github.com/docspage/template/discussions)

---

**Happy documenting!** 🎉