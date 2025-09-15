import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    dir: "./tests",
    globals: true,
    environment: "node",
    coverage: {
      reporter: ["text", "json", "html"],
    },
    outputFile: {
      text: "tests/coverage/coverage.txt",
      json: "tests/coverage/coverage-final.json",
      html: "tests/coverage/index.html",
    },
  },
});
