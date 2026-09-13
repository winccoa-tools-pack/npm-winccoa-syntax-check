import test from 'node:test';
import assert from 'node:assert/strict';

import { buildSyntaxCheckArgs } from '../../src/syntax-checker';
import { isProcessRunningAsRoot } from '../../src/utils';
import { SyntaxCheckMode } from '../../src/types';

test('isProcessRunningAsRoot: true only for uid 0', () => {
    assert.equal(isProcessRunningAsRoot(() => 0), true);
    assert.equal(isProcessRunningAsRoot(() => 1000), false);
    assert.equal(isProcessRunningAsRoot(() => undefined), false);
});

test('buildSyntaxCheckArgs: adds -runas-os-root when running as root', () => {
    const args = buildSyntaxCheckArgs(
        {
            version: '3.21',
            configPath: '/workspace/config/config',
            mode: SyntaxCheckMode.ALL,
        },
        true,
    );

    assert.ok(args.includes('-runas-os-root'));
    assert.deepEqual(args.slice(0, 4), ['-config', '/workspace/config/config', '-syntax', 'all']);
});

test('buildSyntaxCheckArgs: omits -runas-os-root when not root', () => {
    const args = buildSyntaxCheckArgs(
        {
            version: '3.21',
            configPath: '/workspace/config/config',
        },
        false,
    );

    assert.equal(args.includes('-runas-os-root'), false);
});

test('buildSyntaxCheckArgs: runAsOsRoot true forces flag', () => {
    const args = buildSyntaxCheckArgs(
        {
            version: '3.21',
            configPath: '/workspace/config/config',
            runAsOsRoot: true,
        },
        false,
    );

    assert.ok(args.includes('-runas-os-root'));
});

test('buildSyntaxCheckArgs: runAsOsRoot false suppresses flag even as root', () => {
    const args = buildSyntaxCheckArgs(
        {
            version: '3.21',
            configPath: '/workspace/config/config',
            runAsOsRoot: false,
        },
        true,
    );

    assert.equal(args.includes('-runas-os-root'), false);
});
