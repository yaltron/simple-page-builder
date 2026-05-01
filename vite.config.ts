import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  tanstackStart: {},
  vite: {
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom", "@tanstack/react-start", "@tanstack/react-router"],
  },
  ssr: {
    noExternal: ["framer-motion"],
    optimizeDeps: {
      include: ["framer-motion"],
    },
  },
  server: {
    host: "::",
    port: 8080,
    strictPort: true,
  },
  },
});
