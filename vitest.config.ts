import { defineConfig } from "vitest/config";
import { resolve } from "path";

export default defineConfig({
    resolve: {
        alias: {
            "#src": resolve(__dirname, "src"),
            "#test": resolve(__dirname, "test")
        }
    },
    test: {
        globals: true,
        environment: "node",
        clearMocks: true,
        restoreMocks: true,
        mockReset: true,
        testTimeout: 5000,
        hookTimeout: 5000,
        setupFiles: ["./test/setup.ts"],
        exclude: ["node_modules", "dist", "coverage"],
        coverage: {
            provider: "v8",
            reporter: ["text", "json", "html"],
            exclude: ["node_modules/**", "dist/**", "test/**", "**/application.ts"],
            thresholds: { lines: 100, functions: 100, branches: 100, statements: 100 }
        }
    }
});
