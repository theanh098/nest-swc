import swc from "unplugin-swc";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    root: "./",
    include: ["test/e2e/**/*.e2e.spec.ts"],
    alias: {
      "@root": "./src"
    }
  },
  plugins: [
    swc.vite({
      module: { type: "es6" }
    })
  ]
});