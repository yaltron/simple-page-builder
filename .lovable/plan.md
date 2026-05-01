## Diagnosis

The internal preview shows "Internal Server Error". Pulled the current files (TanStack Start v1 + Vite 8 + React 19 + Tailwind v4) — the stack is correct and matches what Lovable expects. `package.json`, `src/router.tsx`, `src/routes/__root.tsx`, and `src/routes/index.tsx` are all present and valid.

The actual crash comes from `vite.config.ts`. The dev-server log shows on every SSR request:

```
ReferenceError: module is not defined
    at /dev-server/node_modules/.../react@19.2.5/.../react/index.js:4:3
    at ESModulesEvaluator.runInlinedModule (vite/.../module-runner.js)
```

React's published entry is CommonJS (`module.exports = ...`). Vite's SSR module runner is an ES-module evaluator, so when it tries to execute React's CJS file directly, `module` is undefined and SSR dies — producing the "Internal Server Error" page.

A previous edit added `ssr.noExternal: ["react", "react-dom", ...]` but **only when `command === "build"`**. In `dev`, React is still externalized → CJS gets loaded raw → crash. That is why the preview keeps failing no matter how many times publish is clicked or how many times the dev server is restarted.

## Fix

Apply `noExternal` for React/Router in **both** dev and build by removing the `command === "build"` gate. This forces Vite to process those packages through its dependency-optimizer (which converts CJS → ESM) instead of letting the SSR runner eval React's CJS file directly.

### File: `vite.config.ts`

Replace the conditional `resolve.noExternal` and `ssr` blocks with unconditional ones:

```ts
export default defineConfig(() => ({
  server: { port: 8080, host: true, allowedHosts: true },
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
    noExternal: [
      "@tanstack/react-router",
      "@tanstack/react-router-devtools",
    ],
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
    ],
  },
  plugins: [tailwindcss(), tanstackStart()],
}));
```

## Verification steps after the fix

1. Tail `/tmp/dev-server-logs/dev-server.log` and confirm no more `ReferenceError: module is not defined`.
2. `curl -sI http://localhost:8080/` returns 200 and HTML body renders the homepage.
3. Open the preview to visually confirm the site loads.
4. Then the user clicks Publish → Update to push the same fix to the live `mini-siter-shine.lovable.app` site.

No source files, dependencies, or routes need to change — the codebase as pushed is correct; only the Vite SSR configuration needs this one-line scope fix.