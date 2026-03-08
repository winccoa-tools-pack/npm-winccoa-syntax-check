/**
 * This is a deliberately broken .ctl file for testing purposes.
 * It contains duplicate function definitions which should trigger syntax errors.
 */

halloWorld() {
    console.log("Hello, World!");
}

halloWorld() {
    console.log("Hello, World!");
}