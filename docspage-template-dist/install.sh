#!/bin/bash

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
