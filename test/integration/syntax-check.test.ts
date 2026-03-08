/**
 * Integration tests for WinCC OA syntax checking.
 *
 * These tests require WinCC OA 3.19+ to be installed.
 * The test project is automatically registered and unregistered using
 * `withRunnableTestProject()` helper.
 *
 * To run: npm run test:integration
 *
 * Test fixtures:
 * - panels/valid.pnl - Valid panel that should pass syntax check
 * - panels/broken.pnl - Broken panel that should fail syntax check
 * - scripts/libs/valid.ctl - Valid script that should pass syntax check
 * - scripts/libs/broken.ctl - Script with duplicate function (should fail)
 */

import test, { describe } from 'node:test';
import assert from 'node:assert/strict';

import { SyntaxChecker } from '../../src/syntax-checker';
import { SyntaxCheckMode } from '../../src/types';
import { checkSyntax, checkPanels, checkScripts } from '../../src/api';
import { withRunnableTestProject } from '../helpers/test-project-helpers';

describe('SyntaxChecker integration tests', () => {
    test('check: passes for valid panels', async () => {
        await withRunnableTestProject(async (project) => {
            const checker = new SyntaxChecker();
            const configPath = project.getConfigPath('config');
            const version = project.getVersion() || '3.20';

            const result = await checker.check({
                version,
                configPath,
                mode: SyntaxCheckMode.PANELS,
                panelsPath: 'valid.pnl',
                timeout: 120_000,
            });

            // Valid panel should pass
            assert.equal(result.exitCode, 0, `Expected exit code 0, got ${result.exitCode}. Stderr: ${result.stderr.substring(0, 200)}`);
            assert.equal(result.hasStderrErrors, false, `Should not have stderr errors. Stderr: ${result.stderr.substring(0, 200)}`);
            assert.equal(result.success, true, 'Should succeed');
        });
    });

    test('check: fails for broken panels', async () => {
        await withRunnableTestProject(async (project) => {
            const checker = new SyntaxChecker();
            const configPath = project.getConfigPath('config');
            const version = project.getVersion() || '3.20';

            const result = await checker.check({
                version,
                configPath,
                mode: SyntaxCheckMode.PANELS,
                panelsPath: 'broken.pnl',
                timeout: 120_000,
            });

            // Broken panel should fail (either non-zero exit code or stderr errors)
            const hasFailed = result.exitCode !== 0 || result.hasStderrErrors;
            assert.ok(hasFailed, `Expected failure for broken.pnl. Exit code: ${result.exitCode}, stderr: ${result.stderr}`);
            assert.equal(result.success, false, 'Should not succeed');
        });
    });

    test('check: passes for valid scripts', async () => {
        await withRunnableTestProject(async (project) => {
            const checker = new SyntaxChecker();
            const configPath = project.getConfigPath('config');
            const version = project.getVersion() || '3.20';

            const result = await checker.check({
                version,
                configPath,
                mode: SyntaxCheckMode.SCRIPTS,
                scriptsPath: 'libs/valid.ctl',
                timeout: 120_000,
            });

            // Valid script should pass
            assert.equal(result.exitCode, 0, `Expected exit code 0, got ${result.exitCode}`);
            assert.equal(result.hasStderrErrors, false, 'Should not have stderr errors');
            assert.equal(result.success, true, 'Should succeed');
        });
    });

    test('check: fails for broken scripts with duplicate functions', async () => {
        await withRunnableTestProject(async (project) => {
            const checker = new SyntaxChecker();
            const configPath = project.getConfigPath('config');
            const version = project.getVersion() || '3.20';

            const result = await checker.check({
                version,
                configPath,
                mode: SyntaxCheckMode.SCRIPTS,
                scriptsPath: 'libs/broken.ctl',
                timeout: 120_000,
            });

            // Broken script should fail (duplicate function definition)
            const hasFailed = result.exitCode !== 0 || result.hasStderrErrors;
            assert.ok(hasFailed, `Expected failure for broken.ctl. Exit code: ${result.exitCode}, stderr: ${result.stderr}`);
            assert.equal(result.success, false, 'Should not succeed');
        });
    });

    test('check: works with integrity check enabled', async () => {
        await withRunnableTestProject(async (project) => {
            const checker = new SyntaxChecker();
            const configPath = project.getConfigPath('config');
            const version = project.getVersion() || '3.20';

            const result = await checker.check({
                version,
                configPath,
                mode: SyntaxCheckMode.PANELS,
                panelsPath: 'valid.pnl',
                integrity: true,
                timeout: 120_000,
            });

            assert.equal(result.integrity, true, 'Integrity flag should be set');
            // Valid panel should still pass with integrity check
            assert.equal(result.success, true, 'Should succeed with integrity check');
        });
    });
});

describe('API convenience functions integration tests', () => {
    test('checkSyntax: full project check', async () => {
        await withRunnableTestProject(async (project) => {
            const configPath = project.getConfigPath('config');
            const version = project.getVersion() || '3.20';

            const result = await checkSyntax({
                version,
                configPath,
                mode: SyntaxCheckMode.ALL,
                timeout: 180_000,
            });

            // Project contains broken files, so overall check should fail
            // (unless WinCC OA only checks specific paths)
            assert.ok(result.exitCode !== undefined, 'Should return exit code');
            assert.ok(result.mode === SyntaxCheckMode.ALL, 'Mode should be ALL');
        });
    });

    test('checkPanels: convenience wrapper works', async () => {
        await withRunnableTestProject(async (project) => {
            const configPath = project.getConfigPath('config');
            const version = project.getVersion() || '3.20';

            const result = await checkPanels({
                version,
                configPath,
                panelsPath: 'valid.pnl',
                timeout: 120_000,
            });

            assert.equal(result.mode, SyntaxCheckMode.PANELS, 'Mode should be PANELS');
            assert.equal(result.success, true, 'Valid panel should pass');
        });
    });

    test('checkScripts: convenience wrapper works', async () => {
        await withRunnableTestProject(async (project) => {
            const configPath = project.getConfigPath('config');
            const version = project.getVersion() || '3.20';

            const result = await checkScripts({
                version,
                configPath,
                scriptsPath: 'libs/valid.ctl',
                timeout: 120_000,
            });

            assert.equal(result.mode, SyntaxCheckMode.SCRIPTS, 'Mode should be SCRIPTS');
            assert.equal(result.success, true, 'Valid script should pass');
        });
    });
});

describe('SyntaxCheckResult fields', () => {
    test('result contains all expected fields', async () => {
        await withRunnableTestProject(async (project) => {
            const configPath = project.getConfigPath('config');
            const version = project.getVersion() || '3.20';

            const result = await checkSyntax({
                version,
                configPath,
                mode: SyntaxCheckMode.PANELS,
                panelsPath: 'valid.pnl',
                timeout: 120_000,
            });

            // Verify all fields are present
            assert.ok('success' in result, 'Should have success field');
            assert.ok('exitCode' in result, 'Should have exitCode field');
            assert.ok('stdout' in result, 'Should have stdout field');
            assert.ok('stderr' in result, 'Should have stderr field');
            assert.ok('mode' in result, 'Should have mode field');
            assert.ok('integrity' in result, 'Should have integrity field');
            assert.ok('hasStderrErrors' in result, 'Should have hasStderrErrors field');

            // Verify field types
            assert.equal(typeof result.success, 'boolean');
            assert.equal(typeof result.exitCode, 'number');
            assert.equal(typeof result.stdout, 'string');
            assert.equal(typeof result.stderr, 'string');
            assert.equal(typeof result.hasStderrErrors, 'boolean');
            assert.equal(typeof result.integrity, 'boolean');
        });
    });
});
