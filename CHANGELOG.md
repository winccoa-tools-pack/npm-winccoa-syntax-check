# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Fixed

- auto-add WCCOAui `-runas-os-root` when the process runs as root (CI/Docker)

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
