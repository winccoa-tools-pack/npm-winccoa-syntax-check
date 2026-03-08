/**
 * Utility Functions
 * Core utility functions
 */

// export * from './winccoa-components';

/**
 * Keywords in stderr that indicate syntax/integrity errors.
 * These are WinCC OA log level markers.
 */
export const STDERR_ERROR_KEYWORDS = ['WARNING', 'SEVERE', 'FATAL'] as const;

/**
 * Patterns to exclude from error detection (false positives).
 * These are known non-error messages that may appear in stderr.
 */
const STDERR_EXCLUDE_PATTERNS = [
    // Qt platform messages - any line containing ", Qt," is a Qt log line
    /,\s*Qt,/i,
    /\tQt,/i,
    // Qt platform messages (OpenGL context, etc.)
    /does not support.*Context/i,
    // Qt plugin messages
    /This plugin does not support/i,
    // Platform-specific Qt warnings that aren't actual errors
    /createPlatformOpenGLContext/i,
    /OpenGL/i,
    // WinCC OA installation lookup warning (not a syntax error)
    /could not find registered WinCC_OA installation/i,
];

/**
 * Check if stderr output contains any error keywords.
 * Checks for WARNING, SEVERE, FATAL in WinCC OA log format (case-insensitive).
 * Excludes known false positives like Qt platform messages.
 *
 * @param stderr - The stderr output to check
 * @returns true if any error keywords are found
 *
 * @example
 * ```ts
 * containsStderrErrors('WCCOAui, SEVERE, Panel not found'); // true
 * containsStderrErrors('Panel loaded successfully'); // false
 * containsStderrErrors('Qt, This plugin does not support...'); // false
 * ```
 */
export function containsStderrErrors(stderr: string): boolean {
    // Process line by line to check for errors while filtering false positives
    const lines = stderr.split('\n');

    for (const line of lines) {
        // Skip lines that match exclusion patterns
        if (STDERR_EXCLUDE_PATTERNS.some((pattern) => pattern.test(line))) {
            continue;
        }

        // Check for error keywords in this line
        const upperLine = line.toUpperCase();
        if (STDERR_ERROR_KEYWORDS.some((keyword) => upperLine.includes(keyword))) {
            return true;
        }
    }

    return false;
}
