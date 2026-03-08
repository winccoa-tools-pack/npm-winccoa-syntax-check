import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Gets the absolute path to the test fixtures directory.
 */
export function getFixturesPath(): string {
    return path.resolve(__dirname, '..', 'fixtures');
}

/**
 * Gets the absolute path to a test project fixture.
 * @param projectName Name of the test project (e.g., 'runnable', 'sub-proj')
 */
export function getTestProjectPath(projectName: string): string {
    return path.join(getFixturesPath(), 'projects', projectName);
}

/**
 * Gets the config file path for a test project.
 * @param projectName Name of the test project
 */
export function getTestProjectConfigPath(projectName: string): string {
    return path.join(getTestProjectPath(projectName), 'config', 'config');
}

/**
 * Gets the panels directory path for a test project.
 * @param projectName Name of the test project
 */
export function getTestProjectPanelsPath(projectName: string): string {
    return path.join(getTestProjectPath(projectName), 'panels');
}

/**
 * Gets the scripts directory path for a test project.
 * @param projectName Name of the test project
 */
export function getTestProjectScriptsPath(projectName: string): string {
    return path.join(getTestProjectPath(projectName), 'scripts');
}

// Self-test for helpers
test('getFixturesPath: returns valid path', () => {
    const fixturesPath = getFixturesPath();
    assert.ok(fixturesPath.includes('fixtures'));
});

test('getTestProjectConfigPath: returns config path', () => {
    const configPath = getTestProjectConfigPath('runnable');
    assert.ok(configPath.includes('runnable'));
    assert.ok(configPath.endsWith(path.join('config', 'config')));
});
