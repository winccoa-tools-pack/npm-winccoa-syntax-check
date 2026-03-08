/**
 * WinCC OA Syntax Check Tool
 *
 * Provides syntax checking for WinCC OA projects using the WCCOAui manager
 * with the -syntax flag for static analysis of panels and scripts.
 */

// Types
export { SyntaxCheckMode, SyntaxCheckOptions, SyntaxCheckResult } from './types';

// Core syntax checker
export { SyntaxChecker } from './syntax-checker';

// Convenience API
export { checkSyntax, checkPanels, checkScripts } from './api';

// Utilities
export { containsStderrErrors, STDERR_ERROR_KEYWORDS } from './utils';
