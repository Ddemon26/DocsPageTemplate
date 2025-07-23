# Installation

Learn how to set up and deploy your documentation site.

## Local Development

### Requirements

- Modern web browser (Chrome, Firefox, Safari, Edge)
- Local web server (optional, for testing)
- Text editor or IDE

### Quick Setup

1. **Download or clone** the documentation template
2. **Add your content** by creating Markdown files in the `docs/` folder
3. **Update navigation** in `docs/navigation.json`
4. **Open** `index.html` in your browser

### Local Server (Recommended)

For the best development experience, use a local server:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (if you have http-server installed)
npx http-server

# Using PHP
php -S localhost:8000
```

Then visit `http://localhost:8000` in your browser.

## GitHub Pages Deployment

### Automatic Deployment

1. **Create a repository** on GitHub
2. **Upload your files** to the repository
3. **Enable GitHub Pages**:
   - Go to repository Settings
   - Scroll to "Pages" section
   - Select "Deploy from a branch"
   - Choose "main" branch and "/ (root)" folder
   - Click "Save"

Your site will be available at: `https://yourusername.github.io/repository-name/`

### Custom Domain (Optional)

To use a custom domain:

1. Add a `CNAME` file to your repository root with your domain name
2. Configure your domain's DNS to point to GitHub Pages
3. Update the custom domain setting in your repository

## Other Hosting Options

### Netlify

1. Connect your GitHub repository to Netlify
2. Set build command to: (leave empty)
3. Set publish directory to: (leave empty or set to `/`)
4. Deploy

### Vercel

1. Import your GitHub repository to Vercel
2. No build configuration needed
3. Deploy

### Traditional Web Hosting

Upload all files to your web server's public directory. The site is completely static and will work on any web host.

## Configuration

### Site Title

Update the `<title>` tag in `index.html`:

```html
<title>Your Documentation Site</title>
```

### Navigation Header

Modify the navigation header in `index.html`:

```html
<h2>Your Project Name</h2>
```

### Favicon

Add a favicon by placing `favicon.ico` in the root directory and adding this to the `<head>` section:

```html
<link rel="icon" type="image/x-icon" href="/favicon.ico">
```

## Troubleshooting

### Common Issues

**Files not loading locally**
- Use a local server instead of opening `index.html` directly
- Check browser console for CORS errors

**Navigation not appearing**
- Verify `docs/navigation.json` is valid JSON
- Check file paths in navigation.json match actual files

**Markdown not rendering**
- Ensure Markdown files have `.md` extension
- Check for syntax errors in Markdown files

**Search not working**
- Verify navigation.json is properly formatted
- Check browser console for JavaScript errors

### Browser Compatibility

This documentation site works with:
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

For older browsers, some features may not work properly.

## Next Steps

- Start writing your [first documentation page](guides/basic-usage.md)
- Learn about [advanced features](guides/advanced-features.md)
- Explore the [API reference](api/overview.md)