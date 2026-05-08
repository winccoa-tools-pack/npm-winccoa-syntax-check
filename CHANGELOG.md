# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed

- Repository automation and template sync improvements.
- CI/test tooling updates.

### Documentation

- Align README CLI/API examples with actual tool behavior (`-syntax` requires `-config`, headless `-platform minimal`).

## [0.1.0] - 2026-02-28

### Added

- `SyntaxChecker` wrapping WinCC OA `WCCOAui -syntax`.
- CLI `winccoa-syntax-check` for checking panels, scripts, or both.
- TypeScript API convenience functions `checkSyntax()`, `checkPanels()`, `checkScripts()`.
- Stderr parsing utilities to detect syntax errors even when exit code is 0.
