#!/usr/bin/env node

import { SyntaxChecker } from './syntax-checker';
import { SyntaxCheckMode } from './types';
import type { SyntaxCheckOptions } from './types';

/**
 * CLI exit codes.
 */
const EXIT_OK = 0;
const EXIT_USAGE = 1;
const EXIT_SYNTAX_ERROR = 2;

/**
 * Print usage information to stderr.
 */
function printUsage(): void {
    const bin = 'winccoa-syntax-check';
    process.stderr.write(
        [
            '',
            `Usage: ${bin} [options]`,
            '',
            'Options:',
            '  -v, --version <ver>   WinCC OA version (e.g. 3.20)  [required]',
            '  -c, --config <path>   WinCC OA project config file  [required]',
            '  -m, --mode <mode>     Check mode: all, scripts, panels (default: all)',
            '  -i, --integrity       Add integrity check',
            '  -s, --scripts <path>  Start path for scripts',
            '  -p, --panels <path>   Start path for panels',
            '  -t, --timeout <ms>    Process timeout in milliseconds (default: 60000)',
            '  -h, --help            Show this help message',
            '',
            'Examples:',
            `  ${bin} -v 3.20 -c /path/to/project/config/config`,
            `  ${bin} -v 3.20 -c ./config/config -m panels -i`,
            `  ${bin} -v 3.20 -c ./config/config -m scripts -s libs/`,
            '',
        ].join('\n'),
    );
}

/**
 * Minimal argument parser.
 * Returns the parsed CLI options or null when the input is invalid.
 */
interface ParsedArgs {
    version: string;
    configPath: string;
    mode: SyntaxCheckMode;
    integrity: boolean;
    scriptsPath?: string;
    panelsPath?: string;
    timeout?: number;
}

function parseArgs(argv: string[]): ParsedArgs | null {
    // Strip node + script path
    const args = argv.slice(2);

    if (args.length === 0 || args.includes('-h') || args.includes('--help')) {
        return null;
    }

    let version = '';
    let configPath = '';
    let mode: SyntaxCheckMode = SyntaxCheckMode.ALL;
    let integrity = false;
    let scriptsPath: string | undefined;
    let panelsPath: string | undefined;
    let timeout: number | undefined;

    // Parse flags
    let i = 0;
    while (i < args.length) {
        const flag = args[i];
        switch (flag) {
            case '-v':
            case '--version':
                version = args[++i] ?? '';
                break;
            case '-c':
            case '--config':
                configPath = args[++i] ?? '';
                break;
            case '-m':
            case '--mode': {
                const modeArg = args[++i] ?? '';
                if (modeArg === 'all') {
                    mode = SyntaxCheckMode.ALL;
                } else if (modeArg === 'scripts') {
                    mode = SyntaxCheckMode.SCRIPTS;
                } else if (modeArg === 'panels') {
                    mode = SyntaxCheckMode.PANELS;
                } else {
                    process.stderr.write(
                        `Error: Invalid mode "${modeArg}". Expected "all", "scripts", or "panels".\n`,
                    );
                    return null;
                }
                break;
            }
            case '-i':
            case '--integrity':
                integrity = true;
                break;
            case '-s':
            case '--scripts':
                scriptsPath = args[++i] ?? '';
                break;
            case '-p':
            case '--panels':
                panelsPath = args[++i] ?? '';
                break;
            case '-t':
            case '--timeout': {
                const raw = args[++i] ?? '';
                const parsed = Number(raw);
                if (isNaN(parsed) || parsed <= 0) {
                    process.stderr.write(`Error: Invalid timeout value "${raw}".\n`);
                    return null;
                }
                timeout = parsed;
                break;
            }
            default:
                process.stderr.write(`Error: Unknown option "${flag}".\n`);
                return null;
        }
        i++;
    }

    if (!version) {
        process.stderr.write('Error: WinCC OA version is required (-v / --version).\n');
        return null;
    }

    if (!configPath) {
        process.stderr.write('Error: Project config path is required (-c / --config).\n');
        return null;
    }

    return { version, configPath, mode, integrity, scriptsPath, panelsPath, timeout };
}

/**
 * Main CLI entry point.
 */
async function main(): Promise<void> {
    const parsed = parseArgs(process.argv);

    if (!parsed) {
        printUsage();
        process.exitCode = EXIT_USAGE;
        return;
    }

    const options: SyntaxCheckOptions = {
        version: parsed.version,
        configPath: parsed.configPath,
        mode: parsed.mode,
        integrity: parsed.integrity,
        scriptsPath: parsed.scriptsPath,
        panelsPath: parsed.panelsPath,
        timeout: parsed.timeout,
    };

    const modeLabel = parsed.mode.toUpperCase();
    const integrityLabel = parsed.integrity ? ' (with integrity check)' : '';

    process.stderr.write(`Running syntax check: ${modeLabel}${integrityLabel}\n`);

    try {
        const checker = new SyntaxChecker();
        const result = await checker.check(options);

        if (result.stdout) {
            process.stdout.write(result.stdout);
        }
        if (result.stderr) {
            process.stderr.write(result.stderr);
        }

        if (result.success) {
            process.stderr.write('Syntax check passed.\n');
            process.exitCode = EXIT_OK;
        } else {
            process.stderr.write(`Syntax check failed with exit code ${result.exitCode}.\n`);
            process.exitCode = EXIT_SYNTAX_ERROR;
        }
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : String(err);
        process.stderr.write(`Error: ${message}\n`);
        process.exitCode = EXIT_SYNTAX_ERROR;
    }
}

// Auto-run only when invoked directly (not when imported for testing)
const isDirectRun =
    process.argv[1] &&
    (process.argv[1].endsWith('cli.js') ||
        process.argv[1].endsWith('cli.ts') ||
        process.argv[1].endsWith('cli.cjs') ||
        process.argv[1].endsWith('cli.mjs'));

if (isDirectRun) {
    main();
}

// Export for testing
export { parseArgs, printUsage, main };
