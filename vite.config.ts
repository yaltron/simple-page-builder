import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// React / framer-motion need to be pre-bundled into ESM for the SSR
// environment so the dev SSR runner does not crash on CJS entry points.
const SSR_OPTIMIZE_INCLUDE = [
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
    // Vite 7 environment-aware config. The published Cloudflare Worker has no
    // runtime module resolution, so EVERY server dependency must be bundled
    // into the SSR output. Setting `noExternal: true` for the ssr environment
    // forces full bundling and fixes the production
    // `Error: No such module "h3-v2"` crash that surfaces as
    // "Internal server error" on the live site.
    //
    // `noDiscovery: false` keeps TanStack Start's React/jsx-runtime
    // pre-bundling active so dev SSR refreshes stay stable.
    environments: {
      ssr: {
        resolve: {
          noExternal: true,
        },
        optimizeDeps: {
          noDiscovery: false,
          include: SSR_OPTIMIZE_INCLUDE,
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
