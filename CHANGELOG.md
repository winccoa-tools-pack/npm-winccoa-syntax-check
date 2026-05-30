# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.2] - 2026-05-30

### Added

- Add rebase-open-prs workflow (#21)

### Fixed

- trigger dependabot release PR on merge (#43)

### Changed

- deps-dev(deps-dev): bump tsx from 4.21.0 to 4.22.3 (#50)
- bump actions/github-script from 8 to 9 (#27)
- deps-dev(deps-dev): bump flatted from 3.3.3 to 3.4.2 (#15)
- bump picomatch from 4.0.3 to 4.0.4 (#18)
- deps-dev(deps-dev): bump globals from 17.3.0 to 17.6.0 (#33)
- deps-dev(deps-dev): bump prettier in the dev-tools group (#44)
- bump @winccoa-tools-pack/npm-winccoa-core (#46)
- deps-dev(deps-dev): bump typescript-eslint from 8.56.1 to 8.59.3 (#45)
- deps-dev(deps-dev): bump prettier in the dev-tools group (#24)
- Feature/align automation with core (#42)
- fix spelling and package links in docs (#31)
- fix src README and changelog (#39)

## [1.0.1] - 2026-05-18

### Added

- Add rebase-open-prs workflow (#21)

### Fixed

- trigger dependabot release PR on merge (#43)

### Changed

- deps-dev(deps-dev): bump typescript-eslint from 8.56.1 to 8.59.3 (#45)
- deps-dev(deps-dev): bump prettier in the dev-tools group (#24)
- Feature/align automation with core (#42)
- fix spelling and package links in docs (#31)
- fix src README and changelog (#39)

## [1.0.0] - 2026-03-08

### Added

- introduce WinCC OA Syntax Check Tool

### Fixed

- enhance error detection by excluding Qt platform messages (#9)

### Changed

- bump actions/upload-artifact from 6 to 7 (#2)
- deps-dev(deps-dev): bump @types/node in the testing group (#3)
- bump minimatch and markdownlint-cli (#8)

## [0.2.0] - 2026-03-03

### Changed

- Add changelog generation and validation scripts, update workflows, and repository settings (#33)
- Add peer dependencies to package-lock.json and implement CLI tests for argument parsing (#32)
- update template
- Add actions to sync org and template files
- Update sync-template-files.yml
- Update sync-template-files.yml
- Create sync-template-files.yml
- Create sync-org-files.yml
- Update bug_report.yml
- upmerge from core npm
- bump actions/upload-artifact from 5 to 6
- add setup-gitflow and gitflow-action workflows
- Add Buy Me a Coffee funding option

## [Unreleased]

### Documentation

- Align README CLI/API examples with actual tool behavior (in-place conversion, required version).

## [0.1.0] - 2026-02-28

### Added

- Core converter `PnlXmlConverter` wrapping WinCC OA `WCCOAui` `-xmlConvert`.
- CLI `winccoa-pnl-xml` with `convert pnl-to-xml` / `convert xml-to-pnl`.
- TypeScript API convenience functions `pnlToXml()` and `xmlToPnl()`.
- Unit tests covering CLI parsing, API wrappers, and converter arguments.
