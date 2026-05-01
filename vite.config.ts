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
  plugins: [
    tailwindcss(),
    tanstackStart({
      // Enable Vite's optimizeDeps for the server environment so React's
      // CJS-only build (react@19) is converted to ESM before SSR loads it.
      // Without this, the Vite SSR module runner tries to evaluate React's
      // CommonJS index.js as ESM and crashes with "module is not defined".
      optimizeDeps: { noDiscovery: false },
    }),
  ],
}));
