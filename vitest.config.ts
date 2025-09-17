import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    globals: true,
    environment: "node",
    coverage: {
      all: false,
      reporter: ["text", "json", "html"],
      exclude: ["scripts/**"],
      reportsDirectory: "coverage",
    },
    reporters: [
      "default",
      ["junit", { outputFile: "coverage/junit.xml" }],
      ["json", { outputFile: "coverage/test-results.json" }],
    ],
  },
});
