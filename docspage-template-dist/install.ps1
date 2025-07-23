# DocsPage Template Installation Script

Write-Host "🚀 DocsPage Template Installation" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""

# Check Node.js
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js found: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js is required but not installed" -ForegroundColor Red
    Write-Host "Please install Node.js from https://nodejs.org/" -ForegroundColor Yellow
    exit 1
}

Write-Host ""

# Run initialization
Write-Host "🔧 Starting interactive setup..." -ForegroundColor Yellow
node init-template.js

Write-Host ""
Write-Host "🔄 Applying configuration..." -ForegroundColor Yellow
node setup.js

Write-Host ""
Write-Host "✅ Installation complete!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Next steps:" -ForegroundColor Cyan
Write-Host "   1. Update docs/navigation.json"
Write-Host "   2. Replace placeholder content in docs/"
Write-Host "   3. Test: npm run serve"
Write-Host "   4. Deploy to your platform"
Write-Host ""
Write-Host "🎉 Happy documenting!" -ForegroundColor Magenta
