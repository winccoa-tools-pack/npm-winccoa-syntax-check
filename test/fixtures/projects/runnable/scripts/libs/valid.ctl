/**
 * A simple script to demonstrate a valid .ctl file.
 */

class Console {
    public static log(const string &message) {
        // Simulate console.log behavior
        DebugTN(message);
    }
};

helloWorld() {
    Console::log("Hello, World!");
}