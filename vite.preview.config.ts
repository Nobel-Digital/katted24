// Local preview ONLY — renders the components against localData/*.json fixtures
// with plain Vite, no Yext account needed. Production builds use vite.config.js +
// `pages build`; this file is never part of the deployed pipeline.
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  root: path.resolve(__dirname, "preview"),
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@data": path.resolve(__dirname, "localData"),
    },
  },
  server: {
    port: 5173,
    open: true,
    fs: { allow: [path.resolve(__dirname)] },
  },
});
