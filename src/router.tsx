import { createRouter as createTanStackRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export function createRouter() {
  const router = createTanStackRouter({
    routeTree,
    scrollRestoration: true,
    defaultPreload: "intent",
    defaultErrorComponent: ({ error }) => (
      <div className="min-h-screen flex items-center justify-center bg-cream p-6">
        <div className="max-w-md text-center space-y-3">
          <h1 className="font-serif text-2xl font-bold text-plum">
            Something went wrong
          </h1>
          <p className="text-muted-foreground text-sm">{error.message}</p>
        </div>
      </div>
    ),
  });
  return router;
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof createRouter>;
  }
}
