# VISION DRAFT - WinCC OA Syntax Check Tool

## Overview

This npm package provides syntax checking for WinCC OA projects via CLI and TypeScript API.
Similar to `npm-winccoa-ui-pnl-xml`, this is a simple tool focused on one task.

## Core Functionality

Run WinCC OA UI component with `-syntax` option to perform static analysis on panels and scripts.

### WinCC OA Syntax Options

From WinCC OA help:

```text
-syntax all[+][-s path][-p path]  ... check panels and scripts (+ adds integrity check)
      | scripts[+] [-s path]      ... check only scripts, optionally start with path
      | panels[+] [-p path]       ... check only panels, optionally start with path
```

### Implementation Example

```typescript
const args = [
    '-config',
    currentProject.getConfigPath(),
    '-syntax',
    'panels+',
    '-p',
    relativePanelPath,
    '-n',
    '-log',
    '+stderr',
    '-platform',
    'minimal',
];

const exitCode = await uiComponent.start(args, {
    timeout: timeoutMs,
    checkStdout: false,
});
```

## Important Notes

### Configuration

- **Must use `-config`**: The `-syntax` option works only with `-config <projPath/config/config>`.
  The `-proj` option has no effect (WinCC OA bug).

### Cross-Platform Support

- Add `-platform minimal` argument for Linux environments without display.

### Exit Code Strategy

- Exit code `0` = success (CI/CD ready)
- Exit code `!= 0` = syntax errors found

### stderr Analysis

- Check stderr for WARNING, SEVERE, FATAL messages
- **Note**: Full log parser will be a separate npm tool (not part of this package)

## Requirements

- WinCC OA 3.19 or higher
- WinCC OA UI manager must be installed

## Use Cases

- CI/CD pipeline integration for static analysis
- Pre-commit validation of WinCC OA code
- Automated quality checks in development workflow
