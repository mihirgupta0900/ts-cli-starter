import { defineConfig } from "tsup"

export default defineConfig({
  entry: ["src/index.ts"],
  // TODO: add cjs?
  format: ["esm"],
})
