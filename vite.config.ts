import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  tanstackStart: {
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
  vite: {
    environments: {
      ssr: {
        resolve: {
          noExternal: [
            "react",
            "react-dom",
            "react/jsx-runtime",
            "react/jsx-dev-runtime",
            "react-dom/server",
            "framer-motion",
            "@tanstack/react-start",
            "@tanstack/react-router",
            "@tanstack/react-router-devtools",
          ],
        },
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
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
      dedupe: ["react", "react-dom", "@tanstack/react-start", "@tanstack/react-router"],
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
