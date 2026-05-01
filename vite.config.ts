import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  tanstackStart: {
    resolve: {
      noExternal: ["@tanstack/react-router", "@tanstack/react-router-devtools"],
    },
    environments: {
      ssr: {
        optimizeDeps: {
          noDiscovery: false,
          include: [
            "react",
            "react-dom",
            "react/jsx-runtime",
            "react/jsx-dev-runtime",
            "react-dom/server",
            "framer-motion",
          ],
        },
      },
    },
  },
  vite: {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
      dedupe: ["react", "react-dom", "@tanstack/react-start", "@tanstack/react-router"],
    },
    ssr: {
      noExternal: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        "react/jsx-dev-runtime",
        "react-dom/server",
        "framer-motion",
        "@tanstack/react-router",
        "@tanstack/react-router-devtools",
      ],
    },
    optimizeDeps: {
      include: ["framer-motion"],
    },
    server: {
      host: true,
      port: 8080,
      strictPort: true,
    },
  },
});
