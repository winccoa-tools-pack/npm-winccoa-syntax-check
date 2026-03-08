/**
 * Syntax check mode for WinCC OA.
 */
export enum SyntaxCheckMode {
    /** Check both panels and scripts */
    ALL = 'all',
    /** Check only scripts */
    SCRIPTS = 'scripts',
    /** Check only panels */
    PANELS = 'panels',
}

/**
 * Options for the WinCC OA syntax check process.
 */
export interface SyntaxCheckOptions {
    /**
     * WinCC OA version to use (e.g., '3.20').
     * Required to locate the correct WCCOAui executable.
     */
    version: string;

    /**
     * Path to the WinCC OA project config file.
     * Required for syntax checking.
     * Example: '/path/to/project/config/config'
     */
    configPath: string;

    /**
     * Syntax check mode: 'all', 'scripts', or 'panels'.
     * @default SyntaxCheckMode.ALL
     */
    mode?: SyntaxCheckMode;

    /**
     * Add integrity check (+ suffix in WinCC OA).
     * @default false
     */
    integrity?: boolean;

    /**
     * Start path for scripts (used with 'all' or 'scripts' mode).
     * Path is relative to the project's scripts directory.
     */
    scriptsPath?: string;

    /**
     * Start path for panels (used with 'all' or 'panels' mode).
     * Path is relative to the project's panels directory.
     */
    panelsPath?: string;

    /**
     * Timeout in milliseconds for the syntax check process.
     * @default 60000
     */
    timeout?: number;
}

/**
 * Result of a syntax check operation.
 */
export interface SyntaxCheckResult {
    /** Whether the syntax check passed (exit code 0 and no errors in stderr). */
    success: boolean;

    /** Process exit code. */
    exitCode: number;

    /** Standard output captured from the UI manager process. */
    stdout: string;

    /** Standard error output captured from the UI manager process. */
    stderr: string;

    /** The mode used for syntax checking. */
    mode: SyntaxCheckMode;

    /** Whether integrity check was enabled. */
    integrity: boolean;

    /** Whether stderr contains error keywords (WARNING, SEVERE, FATAL). */
    hasStderrErrors: boolean;
}
