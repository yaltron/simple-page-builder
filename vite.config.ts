import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import tailwindcss from "@tailwindcss/vite";
import * as path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const reactDeps = [
  "react",
  "react/jsx-runtime",
  "react/jsx-dev-runtime",
  "react-dom",
  "react-dom/server",
];

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
      ...reactDeps,
      "@tanstack/react-router",
      "@tanstack/react-router-devtools",
    ],
  },
  environments: {
    server: {
      optimizeDeps: {
        include: reactDeps,
      },
      resolve: {
        noExternal: [...reactDeps, "@tanstack/react-router", "@tanstack/react-router-devtools"],
      },
    },
    client: {
      optimizeDeps: {
        include: reactDeps,
      },
    },
  },
  plugins: [tailwindcss(), tanstackStart()],
}));
