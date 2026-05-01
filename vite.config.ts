// @ts-nocheck
import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { NodeRequest, sendNodeResponse } from "srvx/node";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
    tanstackStart(),
    react(),
    tailwindcss(),
    tsconfigPaths(),
    {
      name: "tanstack-start-dev-request-bridge",
      apply: "serve",
      configureServer(viteDevServer) {
        return () => {
          viteDevServer.middlewares.use(async (req, res, next) => {
            try {
              if (req.originalUrl) {
                req.url = req.originalUrl;
              }

              const serverEnv = viteDevServer.environments.ssr;
              const serverEntry = await serverEnv.runner.import(
                "virtual:tanstack-start-server-entry",
              );

              const webReq = new NodeRequest({ req, res });
              const webRes = await serverEntry.default.fetch(webReq);

              return sendNodeResponse(res, webRes);
            } catch (error) {
              return next(error);
            }
          });
        };
      },
    },
  ],
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
    optimizeDeps: {
      include: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        "react/jsx-dev-runtime",
        "react-dom/server",
      ],
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
  },
  server: {
    host: "::",
    port: 8080,
    strictPort: true,
  },
});
