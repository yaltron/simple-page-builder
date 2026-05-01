import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Packages that ship CommonJS or browser-only entry points and therefore must
// be pre-bundled into ESM for the SSR/server environment. Without this the
// server runtime tries to evaluate raw CJS (`module.exports = ...`) which
// crashes with `ReferenceError: module is not defined` and surfaces as the
// recurring "Internal Server Error" on refresh and on the published site.
const SSR_BUNDLE = [
  "react",
  "react-dom",
  "react/jsx-runtime",
  "react/jsx-dev-runtime",
  "react-dom/server",
  "framer-motion",
];

export default defineConfig({
  vite: {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
      dedupe: [
        "react",
        "react-dom",
        "@tanstack/react-start",
        "@tanstack/react-router",
      ],
    },
    optimizeDeps: {
      include: ["framer-motion"],
    },
    // Vite 7 environment-aware config. TanStack Start's plugin only injects
    // its SSR pre-bundle list when the server environment has explicitly
    // opted into dependency optimization via `noDiscovery: false`. Setting
    // it here turns that on and keeps React/Router/Framer Motion stable
    // across cold refreshes and production renders.
    environments: {
      ssr: {
        resolve: {
          noExternal: SSR_BUNDLE,
        },
        optimizeDeps: {
          noDiscovery: false,
          include: SSR_BUNDLE,
        },
      },
    },
    server: {
      host: true,
      port: 8080,
      strictPort: true,
    },
  },
});

// Republish trigger: force fresh build for SSR fix deployment.

