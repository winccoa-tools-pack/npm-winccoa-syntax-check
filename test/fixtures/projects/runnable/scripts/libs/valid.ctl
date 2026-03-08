/**
 * A simple script to demonstrate a valid .ctl file.
 */

class Console {
    static log(const string &message) {
        // Simulate console.log behavior
        DebugTN(message);
    }
};

halloWorld() {
    Console::log("Hello, World!");
}