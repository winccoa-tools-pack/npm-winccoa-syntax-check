import test from 'node:test';
import assert from 'node:assert/strict';

import { containsStderrErrors, STDERR_ERROR_KEYWORDS } from '../../src/utils';

test('containsStderrErrors: returns false for empty string', () => {
    assert.equal(containsStderrErrors(''), false);
});

test('containsStderrErrors: returns false for clean output', () => {
    const clean = 'Panel loaded successfully\nAll scripts compiled\nDone';
    assert.equal(containsStderrErrors(clean), false);
});

test('containsStderrErrors: detects WARNING keyword', () => {
    const stderr = 'WCCOAui, WARNING, Variable not used: myVar';
    assert.equal(containsStderrErrors(stderr), true);
});

test('containsStderrErrors: detects SEVERE keyword', () => {
    const stderr = 'WCCOAui, SEVERE, Panel not found: test.pnl';
    assert.equal(containsStderrErrors(stderr), true);
});

test('containsStderrErrors: detects FATAL keyword', () => {
    const stderr = 'WCCOAui, FATAL, Cannot start manager';
    assert.equal(containsStderrErrors(stderr), true);
});

test('containsStderrErrors: is case-insensitive', () => {
    assert.equal(containsStderrErrors('warning: something'), true);
    assert.equal(containsStderrErrors('severe error'), true);
    assert.equal(containsStderrErrors('Fatal Error'), true);
});

test('containsStderrErrors: detects keywords in middle of text', () => {
    const stderr = 'Line 42: WARNING in script.ctl - undefined variable';
    assert.equal(containsStderrErrors(stderr), true);
});

test('STDERR_ERROR_KEYWORDS: contains expected keywords', () => {
    assert.ok(STDERR_ERROR_KEYWORDS.includes('WARNING'));
    assert.ok(STDERR_ERROR_KEYWORDS.includes('SEVERE'));
    assert.ok(STDERR_ERROR_KEYWORDS.includes('FATAL'));
    assert.equal(STDERR_ERROR_KEYWORDS.length, 3);
});

test('containsStderrErrors: ignores Qt platform messages', () => {
    const qtMessage =
        '(1), 2026.03.07 18:11:28.802, Qt, This plugin does not support createPlatformOpenGLContext!';
    assert.equal(containsStderrErrors(qtMessage), false);
});

test('containsStderrErrors: ignores Qt messages but catches real errors', () => {
    const mixed = `(1), 2026.03.07 18:11:28.802, Qt, This plugin does not support createPlatformOpenGLContext!
WCCOAui (0), 2026.03.07 18:11:29.712, WinCC_OA, WARNING, Variable not used`;
    assert.equal(containsStderrErrors(mixed), true);
});

test('containsStderrErrors: returns false for only Qt messages', () => {
    const qtOnly = `Qt, This plugin does not support something
createPlatformOpenGLContext warning`;
    assert.equal(containsStderrErrors(qtOnly), false);
});

