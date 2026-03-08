import { UIComponent } from '@winccoa-tools-pack/npm-winccoa-core/types/components/implementations/UIComponent';
import { SyntaxCheckMode, SyntaxCheckOptions, SyntaxCheckResult } from './types';
import { containsStderrErrors } from './utils';

/**
 * Default timeout for syntax check processes (60 seconds).
 */
const DEFAULT_TIMEOUT = 60_000;

/**
 * Core syntax checker class for WinCC OA projects.
 *
 * Uses the WinCC OA UI manager (`WCCOAui`) with the `-syntax` flag to perform
 * static analysis on panels and scripts.
 *
 * **Important:** The `-syntax` option only works with `-config <path>`.
 * The `-proj` option has no effect (WinCC OA limitation).
 *
 * @example
 * ```ts
 * const checker = new SyntaxChecker();
 * const result = await checker.check({
 *     version: '3.20',
 *     configPath: '/path/to/project/config/config',
 *     mode: SyntaxCheckMode.ALL,
 *     integrity: true,
 * });
 * ```
 */
export class SyntaxChecker {
    private ui: UIComponent;

    constructor() {
        this.ui = new UIComponent();
    }

    /**
     * Build the argument list for the UI manager process.
     *
     * @param options - Syntax check options
     * @returns Array of CLI arguments
     */
    private buildArgs(options: SyntaxCheckOptions): string[] {
        const args: string[] = [];

        // Project config path (required for -syntax)
        args.push('-config', options.configPath);

        // Build syntax mode string
        const mode = options.mode ?? SyntaxCheckMode.ALL;
        const integritySuffix = options.integrity ? '+' : '';
        args.push('-syntax', `${mode}${integritySuffix}`);

        // Add scripts path if provided
        if (options.scriptsPath) {
            args.push('-s', options.scriptsPath);
        }

        // Add panels path if provided
        if (options.panelsPath) {
            args.push('-p', options.panelsPath);
        }

        // Do not connect to WCCILevent
        args.push('-n');

        // Redirect log to stderr for capture
        args.push('-log', '+stderr');

        // Platform minimal for headless Linux support
        args.push('-platform', 'minimal');

        return args;
    }

    /**
     * Run a syntax check using the WinCC OA UI manager.
     *
     * @param options - Syntax check options (version, configPath, etc.)
     * @returns Syntax check result including exit code and captured output
     */
    async check(options: SyntaxCheckOptions): Promise<SyntaxCheckResult> {
        const timeout = options.timeout ?? DEFAULT_TIMEOUT;
        const mode = options.mode ?? SyntaxCheckMode.ALL;
        const integrity = options.integrity ?? false;

        // Set the WinCC OA version so that getPath() locates the correct executable
        this.ui.setVersion(options.version);

        const args = this.buildArgs(options);

        const exitCode = await this.ui.start(args, { timeout });

        const stderr = this.ui.stdErr;

        // Check if stderr contains any error keywords
        const hasStderrErrors = containsStderrErrors(stderr);

        // Check if syntax check passed
        // Success requires exit code 0 AND no error keywords in stderr
        const success = exitCode === 0 && !hasStderrErrors;

        return {
            success,
            exitCode,
            stdout: this.ui.stdOut,
            stderr,
            mode,
            integrity,
            hasStderrErrors,
        };
    }
}
