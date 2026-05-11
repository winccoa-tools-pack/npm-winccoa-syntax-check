# Source Code

This package provides WinCC OA static syntax checking via `WCCOAui -syntax`.

## Structure

- `syntax-checker.ts` — core `SyntaxChecker` implementation (spawns `WCCOAui`)
- `api.ts` — convenience functions (`checkSyntax`, `checkPanels`, `checkScripts`)
- `cli.ts` — CLI entrypoint (`winccoa-syntax-check`)
- `types.ts` / `types/` — public types (`SyntaxCheckOptions`, `SyntaxCheckResult`, `SyntaxCheckMode`)
- `utils/` — stderr parsing helpers (`containsStderrErrors`, keywords)

## Key behavior

- Uses `-config <path>` (required for `-syntax`; `-proj` is ignored by WinCC OA).
- Adds `-log +stderr` so diagnostics can be captured and surfaced in CI.
- Uses `-platform minimal` for headless usage (Linux CI).
