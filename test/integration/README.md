# Integration Tests

Integration tests require WinCC OA 3.19+ installed on the system.

## Prerequisites

1. **WinCC OA Installation**: Version 3.19 or higher must be installed
2. **Registered Project**: A WinCC OA project must be registered with the system

## Running Tests

### With Automatic Skip (Default)

Tests will automatically skip if no registered project is detected:

```bash
npm run test:integration
```

### With a Registered Project

Set the `WINCCOA_TEST_CONFIG` environment variable to point to a registered project's config file:

```powershell
# PowerShell
$env:WINCCOA_TEST_CONFIG = "C:/WinCC_OA_Proj/DemoApplication_3.20/config/config"
npm run test:integration
```

```bash
# Bash
export WINCCOA_TEST_CONFIG="/path/to/project/config/config"
npm run test:integration
```

### Specifying WinCC OA Version

Set `WINCCOA_VERSION` to specify which version to use (default: 3.20):

```powershell
$env:WINCCOA_VERSION = "3.20"
npm run test:integration
```

## Test Fixtures

Test fixtures are located in `test/fixtures/projects/runnable/`:

- `panels/valid.pnl` - Valid panel (should pass syntax check)
- `panels/broken.pnl` - Broken panel (should fail syntax check)
- `scripts/libs/valid.ctl` - Valid CTRL script (should pass)
- `scripts/libs/broken.ctl` - Script with duplicate function (should fail)

**Note**: For the fixture files to be tested, the fixture project must be registered with WinCC OA, OR you must copy the fixture files to an already registered project and set `WINCCOA_TEST_CONFIG` accordingly.

## Test Behavior

- Tests that require project registration will **skip** (not fail) if no registered project is configured
- A warning message is displayed indicating how to configure a project
- CLI tests (e.g., `--help`) run without requiring project registration
