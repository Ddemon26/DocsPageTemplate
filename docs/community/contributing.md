# Contributing to Dream

Thank you for your interest in contributing to the Dream programming language! This guide will help you get started.

## Ways to Contribute

### 🐛 Report Bugs
Help us improve Dream by reporting bugs you encounter.

**Before reporting:**
- Search existing issues to avoid duplicates
- Test with the latest version of Dream
- Gather relevant system information

**When reporting:**
- Use a clear, descriptive title
- Provide steps to reproduce the issue
- Include code samples and error messages
- Specify your environment (OS, Dream version, etc.)

### 💡 Suggest Features
We welcome feature suggestions and improvements.

**Feature requests should include:**
- Clear description of the proposed feature
- Use cases and examples
- Potential implementation considerations
- Discussion of alternatives

### 📝 Improve Documentation
Help make Dream more accessible by improving documentation.

**Documentation contributions:**
- Fix typos and grammar errors
- Add missing information
- Create tutorials and examples
- Improve code comments

### 💻 Code Contributions
Contribute directly to the Dream language implementation.

**Getting started:**
1. Fork the Dream repository
2. Set up your development environment
3. Find an issue labeled "good first issue"
4. Create a feature branch
5. Make your changes
6. Write tests
7. Submit a pull request

## Development Setup

### Prerequisites
- Git
- C++ compiler (GCC 9+ or Clang 10+)
- CMake 3.15+
- Python 3.8+ (for build scripts)

### Building Dream
```bash
git clone https://github.com/dreamlang/dream.git
cd dream
mkdir build && cd build
cmake ..
make -j$(nproc)
```

### Running Tests
```bash
# Run all tests
make test

# Run specific test suite
./tests/unit_tests
./tests/integration_tests
```

## Coding Standards

### Style Guidelines
- Follow the existing code style
- Use meaningful variable and function names
- Add comments for complex logic
- Keep functions focused and small

### Commit Messages
Use clear, descriptive commit messages:
```
feat: add support for async/await syntax
fix: resolve memory leak in parser
docs: update installation instructions
test: add unit tests for lexer
```

### Pull Request Process

1. **Create a branch**: Use descriptive branch names
   ```bash
   git checkout -b feature/async-await
   git checkout -b fix/parser-memory-leak
   ```

2. **Make changes**: Follow coding standards and write tests

3. **Test thoroughly**: Ensure all tests pass
   ```bash
   make test
   ```

4. **Submit PR**: Include a clear description of changes

5. **Code review**: Address feedback from maintainers

6. **Merge**: Once approved, your changes will be merged

## Community Guidelines

### Code of Conduct
All contributors must follow our Code of Conduct:
- Be respectful and inclusive
- Welcome newcomers
- Focus on constructive feedback
- Respect different viewpoints

### Communication
- Use GitHub issues for bug reports and feature requests
- Join our Discord for real-time discussions
- Be patient and helpful with newcomers

## Recognition

Contributors are recognized in:
- Release notes
- Contributors file
- Community showcases
- Annual contributor awards

## Getting Help

Need help contributing? Reach out through:
- GitHub Discussions
- Discord #contributors channel
- Email: contribute@dreamlang.org

Thank you for helping make Dream better! 🚀