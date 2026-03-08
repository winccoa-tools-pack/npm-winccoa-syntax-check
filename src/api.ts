import { SyntaxChecker } from './syntax-checker';
import { SyntaxCheckMode, SyntaxCheckOptions, SyntaxCheckResult } from './types';

/**
 * Shared syntax checker instance used by the convenience functions.
 */
const checker = new SyntaxChecker();

/**
 * Run a syntax check on a WinCC OA project.
 *
 * This is the main API function for performing syntax checks on panels
 * and/or scripts in a WinCC OA project.
 *
 * @param options - Syntax check options (version, configPath, etc.)
 * @returns Syntax check result
 *
 * @example
 * ```ts
 * const result = await checkSyntax({
 *     version: '3.20',
 *     configPath: '/path/to/project/config/config',
 *     mode: SyntaxCheckMode.ALL,
 *     integrity: true,
 * });
 * console.log(result.success); // true
 * ```
 */
export async function checkSyntax(options: SyntaxCheckOptions): Promise<SyntaxCheckResult> {
    return checker.check(options);
}

/**
 * Check syntax of panels in a WinCC OA project.
 *
 * This is a convenience wrapper around {@link checkSyntax}
 * with the mode pre-set to PANELS.
 *
 * @param options - Syntax check options (version, configPath, etc.)
 * @returns Syntax check result
 *
 * @example
 * ```ts
 * const result = await checkPanels({
 *     version: '3.20',
 *     configPath: '/path/to/project/config/config',
 *     panelsPath: 'mySubDir/',
 * });
 * console.log(result.success); // true
 * ```
 */
export async function checkPanels(
    options: Omit<SyntaxCheckOptions, 'mode' | 'scriptsPath'>,
): Promise<SyntaxCheckResult> {
    return checker.check({
        ...options,
        mode: SyntaxCheckMode.PANELS,
    });
}

/**
 * Check syntax of scripts in a WinCC OA project.
 *
 * This is a convenience wrapper around {@link checkSyntax}
 * with the mode pre-set to SCRIPTS.
 *
 * @param options - Syntax check options (version, configPath, etc.)
 * @returns Syntax check result
 *
 * @example
 * ```ts
 * const result = await checkScripts({
 *     version: '3.20',
 *     configPath: '/path/to/project/config/config',
 *     scriptsPath: 'libs/',
 * });
 * console.log(result.success); // true
 * ```
 */
export async function checkScripts(
    options: Omit<SyntaxCheckOptions, 'mode' | 'panelsPath'>,
): Promise<SyntaxCheckResult> {
    return checker.check({
        ...options,
        mode: SyntaxCheckMode.SCRIPTS,
    });
}
