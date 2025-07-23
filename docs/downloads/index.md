# Downloads

Get the latest version of the Dream programming language and related tools.

## 🚀 Latest Release

### Dream v1.0.0 (Stable)
**Released:** January 15, 2025  
**Size:** ~45 MB

#### Windows
- [dream-1.0.0-windows-x64.exe](https://releases.dreamlang.org/v1.0.0/dream-1.0.0-windows-x64.exe) (64-bit)
- [dream-1.0.0-windows-x86.exe](https://releases.dreamlang.org/v1.0.0/dream-1.0.0-windows-x86.exe) (32-bit)

#### macOS
- [dream-1.0.0-macos-universal.pkg](https://releases.dreamlang.org/v1.0.0/dream-1.0.0-macos-universal.pkg) (Universal)
- [dream-1.0.0-macos-intel.pkg](https://releases.dreamlang.org/v1.0.0/dream-1.0.0-macos-intel.pkg) (Intel)
- [dream-1.0.0-macos-arm64.pkg](https://releases.dreamlang.org/v1.0.0/dream-1.0.0-macos-arm64.pkg) (Apple Silicon)

#### Linux
- [dream-1.0.0-linux-x64.tar.gz](https://releases.dreamlang.org/v1.0.0/dream-1.0.0-linux-x64.tar.gz) (64-bit)
- [dream-1.0.0-linux-arm64.tar.gz](https://releases.dreamlang.org/v1.0.0/dream-1.0.0-linux-arm64.tar.gz) (ARM64)

## 🔧 Development Tools

### Dream Studio IDE
**Version:** 1.0.0  
**Size:** ~120 MB

Full-featured IDE with syntax highlighting, debugging, and project management.

- [Windows Installer](https://tools.dreamlang.org/studio/dream-studio-1.0.0-setup.exe)
- [macOS Package](https://tools.dreamlang.org/studio/dream-studio-1.0.0.dmg)
- [Linux AppImage](https://tools.dreamlang.org/studio/dream-studio-1.0.0.AppImage)

### Editor Extensions
- [VS Code Extension](https://marketplace.visualstudio.com/items?itemName=dreamlang.dream-language)
- [Vim Plugin](https://github.com/dreamlang/vim-dream)
- [Emacs Package](https://github.com/dreamlang/dream-mode)

## 📦 Package Managers

### Install via Package Managers

#### Windows (Chocolatey)
```powershell
choco install dreamlang
```

#### macOS (Homebrew)
```bash
brew install dreamlang/tap/dream
```

#### Linux (Snap)
```bash
sudo snap install dreamlang
```

#### Universal (npm)
```bash
npm install -g @dreamlang/cli
```

## 🧪 Beta & Preview Releases

### Dream v1.1.0-beta.1
**Released:** January 20, 2025  
**Features:** Async/await support, improved error messages

- [Windows Beta](https://releases.dreamlang.org/beta/dream-1.1.0-beta.1-windows-x64.exe)
- [macOS Beta](https://releases.dreamlang.org/beta/dream-1.1.0-beta.1-macos-universal.pkg)
- [Linux Beta](https://releases.dreamlang.org/beta/dream-1.1.0-beta.1-linux-x64.tar.gz)

### Nightly Builds
Get the latest development builds (updated daily):
- [Nightly Downloads](https://nightly.dreamlang.org/)

## 📋 System Requirements

### Minimum Requirements
- **OS:** Windows 10, macOS 10.14, or Linux (kernel 4.4+)
- **RAM:** 2 GB
- **Storage:** 100 MB free space
- **Architecture:** x64 or ARM64

### Recommended
- **RAM:** 4 GB or more
- **Storage:** 500 MB free space
- **Network:** Internet connection for package management

## 🔐 Verification

All releases are signed and can be verified:

### GPG Signatures
```bash
# Download public key
curl -O https://releases.dreamlang.org/dreamlang-public.key
gpg --import dreamlang-public.key

# Verify signature
gpg --verify dream-1.0.0-linux-x64.tar.gz.sig dream-1.0.0-linux-x64.tar.gz
```

### Checksums
SHA256 checksums for all releases:
- [checksums.txt](https://releases.dreamlang.org/v1.0.0/checksums.txt)

## 📜 Release Notes

### What's New in v1.0.0
- **Stable API:** Production-ready language specification
- **Performance:** 40% faster compilation times
- **Standard Library:** Comprehensive built-in modules
- **Tooling:** Improved debugging and profiling tools
- **Documentation:** Complete language reference

### Previous Versions
- [v0.9.0 Release Notes](https://github.com/dreamlang/dream/releases/tag/v0.9.0)
- [v0.8.0 Release Notes](https://github.com/dreamlang/dream/releases/tag/v0.8.0)
- [All Releases](https://github.com/dreamlang/dream/releases)

## 🆘 Installation Help

Having trouble installing? Check our [Installation Guide](../installation.md) or:
- [Windows Installation Issues](../guides/windows-install.md)
- [macOS Installation Issues](../guides/macos-install.md)
- [Linux Installation Issues](../guides/linux-install.md)

## 📞 Support

Need help? Contact us:
- [GitHub Issues](https://github.com/dreamlang/dream/issues)
- [Discord Support](https://discord.gg/dreamlang)
- [Email Support](mailto:support@dreamlang.org)