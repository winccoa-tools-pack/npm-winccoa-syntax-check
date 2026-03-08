# Development Vision - WinCC OA Syntax Check Tool

## 🎯 Vision Statement

Provide a simple, CI/CD-ready syntax checking tool for WinCC OA projects via CLI and TypeScript API.

---

## 🌟 Core Objectives

1. **Static Analysis** - Run WinCC OA syntax checks on panels and scripts
2. **CI/CD Ready** - Exit code 0 on success, non-zero on errors
3. **Cross-Platform** - Support Windows and Linux (headless)
4. **Simple API** - Minimal, focused TypeScript API and CLI

---

## 🏗️ Architecture Principles

### Design Principles

#### 1. **Platform Agnostic**

- Support Windows and Linux
- Use `-platform minimal` for headless environments

#### 2. **Functional & Composable**

- Simple functions with clear inputs/outputs
- Leverage existing `npm-winccoa-core` utilities

#### 3. **Performance First**

- Configurable timeout for long-running checks
- Efficient process spawning and output capture

#### 4. **Type Safety**

- Strong TypeScript types
- No `any` types in public APIs
- Comprehensive type exports
- Runtime validation where needed

#### 5. **Testability**

- Unit tests for all functions
- Integration tests for workflows
- Mock-friendly architecture
- Platform-specific test strategies

---

## 📦 Package Structure

### Module Organization

```text
src/
├── index.ts          # Main exports
├── api.ts            # Public API functions (checkSyntax, checkPanels, checkScripts)
├── cli.ts            # CLI entry point
├── syntax-checker.ts # Core syntax checker implementation
├── types.ts          # TypeScript types and interfaces
├── types/
│   └── index.ts      # Type exports
└── utils/
    └── index.ts      # Utility functions
```

### CLI Usage

```bash
winccoa-syntax-check [options]

Options:
  -c, --config <path>    WinCC OA project config file [required]
  -m, --mode <mode>      all | scripts | panels (default: all)
  -i, --integrity        Add integrity check (+)
  -s, --scripts <path>   Start path for scripts
  -p, --panels <path>    Start path for panels
  -t, --timeout <ms>     Timeout in milliseconds (default: 60000)
  -h, --help             Show help
```

### TypeScript API

```typescript
import { checkSyntax, checkPanels, checkScripts } from '@winccoa-tools-pack/npm-winccoa-syntax-check';

// Full syntax check
const result = await checkSyntax({
    configPath: '/path/to/project/config/config',
    mode: 'all',
    integrity: true,
});

// Convenience wrappers
await checkPanels({ configPath: '...', panelsPath: 'panels/' });
await checkScripts({ configPath: '...', scriptsPath: 'scripts/' });
```

---

## 🔧 Technology Stack

### Core Technologies

- **Language**: TypeScript 5.x
- **Runtime**: Node.js 20+ (LTS)
- **Package Manager**: npm
- **Build Tool**: TypeScript Compiler (tsc)

### Testing

- **Framework**: node:test (native Node.js)
- **Assertion**: node:assert
- **Mocking**: Manual mocks / test doubles

### Code Quality

- **Linter**: ESLint with TypeScript rules
- **Formatter**: Prettier (optional)
- **Type Checking**: TypeScript strict mode
- **Pre-commit**: Husky + lint-staged (optional)

### Documentation

- **API Docs**: TSDoc + TypeDoc
- **Guides**: Markdown in `/docs`
- **Examples**: Code samples in docs

### CI/CD

- **Platform**: GitHub Actions
- **Triggers**: PR checks, release automation
- **Deployment**: npm registry (public)

---

## 🎨 API Design Philosophy

### Core Principles

1. **Single Responsibility** - One tool, one job: syntax checking
2. **Minimal Dependencies** - Leverage `@winccoa-tools-pack/npm-winccoa-core`
3. **Exit Code Convention** - `0` = success, `!= 0` = failure (CI/CD friendly)
4. **No Log Parsing** - Leave detailed log analysis to dedicated tools

### Key Technical Decisions

- Use `-config` (not `-proj`) as WinCC OA requires this for syntax checking
- Add `-platform minimal` for headless Linux support
- Redirect output via `-log +stderr` for capture

---

## 🚀 Development Workflow

### Feature Development Cycle

1. **Plan**
    - Review migration plan
    - Identify source files
    - Define scope and tasks

2. **Branch**
    - Create feature branch from `develop`
    - Name: `feature/component-types`, `feat/project-detection`

3. **Implement**
    - Write implementation
    - Add comprehensive tests
    - Update types and exports

4. **Test**
    - Run unit tests locally
    - Verify cross-platform compatibility
    - Check coverage

5. **Document**
    - Add TSDoc comments
    - Update migration plan
    - Add usage examples

6. **Review**
    - Create PR to `develop`
    - CI/CD runs checks
    - Address review feedback

7. **Merge**
    - Squash or merge commit
    - Delete feature branch
    - Update tracking documents

### Release Workflow

1. **Prepare Release**
    - Merge all features to `develop`
    - Update version in `package.json`
    - Update CHANGELOG.md

2. **Create Release PR**
    - Open PR from `develop` → `main`
    - Label as `release`
    - Review changes

3. **Merge & Deploy**
    - Merge to `main`
    - CI/CD publishes to npm
    - Creates GitHub release
    - Tags version

4. **Post-Release**
    - Merge `main` → `develop`
    - Announce release
    - Update dependent projects

---

## 📊 Quality Metrics

### Code Quality

- **Linting**: Zero errors, minimal warnings
- **Complexity**: Keep cyclomatic complexity <10

### Performance

- **Cold Start**: <100ms for simple operations
- **Cached Operations**: <10ms
- **Memory**: Efficient caching, no memory leaks
- **File I/O**: Batch operations, minimize reads

### Documentation

- **API Coverage**: 100% of public APIs documented
- **Examples**: At least one example per major feature
- **Guides**: Setup, usage, troubleshooting
- **Changelog**: Maintained with every release

---

## 🛠️ Tooling & Scripts

### npm Scripts

- `npm run build` - Build TypeScript to dist/
- `npm run test` - Run linting and unit tests
- `npm run test:unit` - Run unit tests only
- `npm run test:integration` - Run integration tests (requires WinCC OA)
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues

---

## 🌍 Cross-Platform Considerations

### Windows

- Native WinCC OA installation
- Standard execution

### Linux

- Requires `-platform minimal` for headless execution
- WinCC OA UI component must be installed

### macOS

- Not officially supported by WinCC OA

---

## 🎯 Future Roadmap

### v0.1.0 - Initial Release

- ✅ Project setup from template
- 📋 Core syntax checker implementation
- 📋 CLI with all options
- 📋 TypeScript API
- 📋 Unit tests
- 📋 Integration tests

### v0.2.0 - Enhancements

- 📋 Improved error reporting
- 📋 JSON output format option
- 📋 Watch mode for development

---

## 🤝 Contribution Guidelines

### Code Standards

- Follow TypeScript best practices
- Write tests for all new code
- Document public APIs with TSDoc
- Keep functions small and focused

### Commit Messages

- Use conventional commits format
- Be descriptive but concise
- Reference issues/PRs when applicable

### Pull Requests

- One feature/fix per PR
- Include tests and documentation
- Ensure CI/CD passes
- Respond to review feedback

---

## 📚 Learning Resources

### TypeScript

- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [TypeScript Deep Dive](https://basarat.gitbook.io/typescript/)

### Node.js Testing

- [Node.js Test Runner](https://nodejs.org/api/test.html)
- [Testing Best Practices](https://github.com/goldbergyoni/nodebestpractices#testing)

### WinCC OA

- [Official WinCC OA Documentation](https://www.siemens.com/winccoa)
- WinCC OA 3.19+ required for syntax checking
- `-syntax` command line option reference

---

**Last Updated**: March 6, 2026  
**Vision Status**: Active Development  
**Target Release**: v0.1.0 (Q1 2026)

---

## 🎉 Thank You

Thank you for using WinCC OA tools package!
We're excited to be part of your development journey. **Happy Coding! 🚀**

---

## Quick Links

• [📦 VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=mPokornyETM.wincc-oa-tools-pack)

---

<center>Made with ❤️ for and by the WinCC OA community</center>
