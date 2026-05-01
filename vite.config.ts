import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import tailwindcss from "@tailwindcss/vite";
import * as path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig(({ command }) => ({
  server: {
    port: 8080,
    host: true,
    allowedHosts: true,
  },
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
    ],
  },
  ssr:
    command === "build"
      ? {
          noExternal: [
            "react",
            "react-dom",
            "react/jsx-runtime",
            "react/jsx-dev-runtime",
            "react-dom/server",
            "@tanstack/react-router",
            "@tanstack/react-router-devtools",
          ],
        }
      : undefined,
  plugins: [tailwindcss(), tanstackStart()],
}));
