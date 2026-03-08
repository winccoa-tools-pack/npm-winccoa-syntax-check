import test from 'node:test';
import assert from 'node:assert/strict';

import { parseArgs } from '../../src/cli';
import { SyntaxCheckMode } from '../../src/types';

test('parseArgs: returns null for --help', () => {
    const parsed = parseArgs(['node', 'cli.ts', '--help']);
    assert.equal(parsed, null);
});

test('parseArgs: parses valid syntax check options', () => {
    const parsed = parseArgs([
        'node',
        'cli.ts',
        '--version',
        '3.20',
        '--config',
        'config/config',
        '--mode',
        'panels',
        '--integrity',
        '--panels',
        'myDir/',
        '--timeout',
        '120000',
    ]);

    assert.ok(parsed);
    assert.equal(parsed.version, '3.20');
    assert.equal(parsed.configPath, 'config/config');
    assert.equal(parsed.mode, SyntaxCheckMode.PANELS);
    assert.equal(parsed.integrity, true);
    assert.equal(parsed.panelsPath, 'myDir/');
    assert.equal(parsed.timeout, 120000);
});

test('parseArgs: uses default mode ALL', () => {
    const parsed = parseArgs([
        'node',
        'cli.ts',
        '-v',
        '3.20',
        '-c',
        'config/config',
    ]);

    assert.ok(parsed);
    assert.equal(parsed.mode, SyntaxCheckMode.ALL);
    assert.equal(parsed.integrity, false);
});

test('parseArgs: rejects missing config path', () => {
    const originalWrite = process.stderr.write.bind(process.stderr);
    let stderr = '';
    (process.stderr.write as unknown as (chunk: string) => boolean) = (chunk: string) => {
        stderr += chunk;
        return true;
    };

    try {
        const parsed = parseArgs([
            'node',
            'cli.ts',
            '-v',
            '3.20',
        ]);

        assert.equal(parsed, null);
        assert.match(stderr, /config.*required/i);
    } finally {
        process.stderr.write = originalWrite;
    }
});

test('parseArgs: rejects invalid timeout values', () => {
    const originalWrite = process.stderr.write.bind(process.stderr);
    let stderr = '';
    (process.stderr.write as unknown as (chunk: string) => boolean) = (chunk: string) => {
        stderr += chunk;
        return true;
    };

    try {
        const parsed = parseArgs([
            'node',
            'cli.ts',
            '-v',
            '3.20',
            '-c',
            'config/config',
            '--timeout',
            'not-a-number',
        ]);

        assert.equal(parsed, null);
        assert.match(stderr, /Invalid timeout value/);
    } finally {
        process.stderr.write = originalWrite;
    }
});

test('parseArgs: rejects invalid mode', () => {
    const originalWrite = process.stderr.write.bind(process.stderr);
    let stderr = '';
    (process.stderr.write as unknown as (chunk: string) => boolean) = (chunk: string) => {
        stderr += chunk;
        return true;
    };

    try {
        const parsed = parseArgs([
            'node',
            'cli.ts',
            '-v',
            '3.20',
            '-c',
            'config/config',
            '-m',
            'invalid-mode',
        ]);

        assert.equal(parsed, null);
        assert.match(stderr, /Invalid mode/);
    } finally {
        process.stderr.write = originalWrite;
    }
});
