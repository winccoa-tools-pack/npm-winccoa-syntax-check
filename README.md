# WinCC OA Syntax Check Tool

A lightweight developer tool for SIMATIC WinCC Open Architecture projects, providing syntax checking for panels and scripts.
This package is part of the modular winccoa-tools-pack ecosystem, which delivers modern development tooling,
reusable libraries, and VS Code extensions for WinCC OA engineers.
[github.com](https://github.com/winccoa-tools-pack)

## ✨ Features

- **Syntax checking for panels and scripts**  
  Run WinCC OA's built-in syntax checker on your project to catch errors before deployment.

- **CI/CD ready**  
  Exit code 0 on success, non-zero on errors - perfect for pipeline integration.

- **Cross-platform support**  
  Works on Windows and Linux (headless mode with `-platform minimal`).

- **Multiple check modes**  
  Check all, panels only, or scripts only - with optional integrity checking.

## 📦 Installation

```shell
npm install @winccoa-tools-pack/npm-winccoa-syntax-check
```

Or globally:

```shell
npm install -g @winccoa-tools-pack/npm-winccoa-syntax-check
```

## 🖥 Usage (CLI)

```shell
# Check all panels and scripts
winccoa-syntax-check -v 3.20 -c /path/to/project/config/config

# Check only panels with integrity check
winccoa-syntax-check -v 3.20 -c ./config/config -m panels -i

# Check only scripts in a specific directory
winccoa-syntax-check -v 3.20 -c ./config/config -m scripts -s libs/

# Options:
#   -v, --version <ver>   WinCC OA version (e.g. 3.20)  [required]
#   -c, --config <path>   WinCC OA project config file  [required]
#   -m, --mode <mode>     Check mode: all, scripts, panels (default: all)
#   -i, --integrity       Add integrity check
#   -s, --scripts <path>  Start path for scripts
#   -p, --panels <path>   Start path for panels
#   -t, --timeout <ms>    Process timeout in milliseconds (default: 60000)
```

## ⚠️ Important Notes

- **Requires WinCC OA 3.19+** with UI manager installed.
- The `-syntax` option only works with `-config`, not `-proj` (WinCC OA limitation).
- On Linux, the tool uses `-platform minimal` for headless execution.

## 🧩 Usage (API)

```typescript
import { checkSyntax, checkPanels, checkScripts, SyntaxCheckMode } from "@winccoa-tools-pack/npm-winccoa-syntax-check";

// Full syntax check
const result = await checkSyntax({
  version: "3.20",
  configPath: "/path/to/project/config/config",
  mode: SyntaxCheckMode.ALL,
  integrity: true,
});

if (!result.success) {
  throw new Error(`Syntax check failed (exit ${result.exitCode}): ${result.stderr}`);
}

// Convenience wrappers
const panelsResult = await checkPanels({
  version: "3.20",
  configPath: "./config/config",
  panelsPath: "mySubDir/",
});

const scriptsResult = await checkScripts({
  version: "3.20",
  configPath: "./config/config",
  scriptsPath: "libs/",
});
```

## 🩺 Troubleshooting

- **Non-zero exit code**: Inspect `stderr` and ensure `--version` matches your WinCC OA installation.
- **Timeouts**: Increase `--timeout` / `timeout` for large projects.
- **Syntax errors not detected**: Ensure `-config` points to a valid WinCC OA project config file.

## 📚 Ecosystem Integration

This package is designed for seamless use with:

- **VS Code extensions for WinCC OA development**  
  Our open source community provides multiple VS Code tools that enhance the engineering workflow for WinCC OA developers.

- **Node.js libraries**  
  Works side-by-side with other libraries in the winccoa-tools-pack suite (project management, core utilities, testing, etc.).

- **CI/CD automation**  
  Ideal for pipelines needing validation of WinCC OA projects.

## 📦 Development

```bash
# Install dependencies
npm install

# Build the library
npm run build

# Run tests
npm test

# Lint code
npm run lint
```

## 🏆 Recognition

Special thanks to all our [contributors](https://github.com/orgs/winccoa-tools-pack/people) who make this project possible!

### Key Contributors

- **Martin Pokorny** ([@mPokornyETM](https://github.com/mPokornyETM)) - Creator & Lead Developer
- And many more amazing contributors!

---

## 📜 License

This project is licensed under the **MIT License** - see the [LICENSE](https://github.com/winccoa-tools-pack/.github/blob/main/LICENSE) file for details.

---

## ⚠️ Disclaimer

**WinCC OA** and **Siemens** are trademarks of Siemens AG.
This project is not affiliated with, endorsed by, or sponsored by Siemens AG.
This is a community-driven open source project created to enhance the development experience for WinCC OA developers.

---

## 🎉 Thank You

Thank you for using WinCC OA tools package! We're excited to be part of your development journey.

Happy Coding! 🚀

---

## Quick Links

[📦 VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=mPokornyETM.wincc-oa-projects)

Made with ❤️ for and by the WinCC OA community
