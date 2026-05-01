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
        // Prevent unhandled SSR stream errors from crashing the dev process.
        const swallow = (err: unknown) => {
          // eslint-disable-next-line no-console
          console.error("[ssr-bridge] swallowed error:", err);
        };
        process.on("uncaughtException", swallow);
        process.on("unhandledRejection", swallow);

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
              // eslint-disable-next-line no-console
              console.error("[ssr-bridge] request failed:", error);
              if (!res.headersSent) {
                res.statusCode = 500;
                res.setHeader("content-type", "text/plain");
              }
              try {
                res.end(
                  `SSR error: ${(error as Error)?.message ?? String(error)}`,
                );
              } catch {}
              return;
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
        "framer-motion",
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
      "framer-motion",
    ],
  },
  server: {
    host: "::",
    port: 8080,
    strictPort: true,
  },
});
