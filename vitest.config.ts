import swc from "unplugin-swc";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    root: "./",
    include: [`test/${process.env.TEST_DIR || '"{e2e,unit}"'}/**/*.spec.ts`],
    alias: {
      "@root": "./src"
    },
    sequence: {
      concurrent: true
    },
    env: {
      POSTGRES_USER: "postgres",
      POSTGRES_DB: "swc_test_db",
      POSTGRES_PASSWORD: "test"
    }
  },
  plugins: [
    swc.vite({
      module: { type: "es6" }
    })
  ]
});
