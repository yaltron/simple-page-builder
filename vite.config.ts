// @ts-nocheck
import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [tanstackStart(), react(), tailwindcss(), tsconfigPaths()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    noExternal: [
      "react",
      "react-dom",
      "react/jsx-runtime",
      "react/jsx-dev-runtime",
      "react-dom/server",
      "@tanstack/react-router",
      "@tanstack/react-router-devtools",
      "@tanstack/react-start",
      "@tanstack/react-start/client",
      "@tanstack/react-start/server",
    ],
    dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime"],
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
      "@tanstack/react-start",
      "@tanstack/react-start/client",
      "@tanstack/react-start/server",
    ],
  },
  server: {
    host: "::",
    port: 8080,
    strictPort: true,
  },
});
