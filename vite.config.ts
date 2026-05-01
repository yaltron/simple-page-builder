import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import tailwindcss from "@tailwindcss/vite";
import * as path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig(() => ({
  server: {
    port: 8080,
    host: true,
    allowedHosts: true as const,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    noExternal: [
      "@tanstack/react-router",
      "@tanstack/react-router-devtools",
    ],
  },
  ssr: {
    noExternal: [
      "react",
      "react-dom",
      "react/jsx-runtime",
      "react/jsx-dev-runtime",
      "react-dom/server",
      "@tanstack/react-router",
      "@tanstack/react-router-devtools",
    ],
  },
  // Opt the SSR ("server") environment into Vite's dependency optimizer.
  // The TanStack Start plugin only adds React (which ships CJS-only in v19)
  // to the SSR optimizeDeps include list when `noDiscovery: false` is set
  // on the server environment. Without this, the SSR module runner tries to
  // execute React's CommonJS index.js as ESM and crashes with
  // "ReferenceError: module is not defined".
  environments: {
    server: {
      optimizeDeps: {
        noDiscovery: false,
      },
    },
  },
  plugins: [tailwindcss(), tanstackStart()],
}));
