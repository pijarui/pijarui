import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  sourcemap: true,
  clean: true,
  // React & Tailwind disediakan oleh aplikasi konsumen, bukan di-bundle ulang.
  external: ["react", "react-dom", "tailwindcss"],
  treeshake: true,
});
