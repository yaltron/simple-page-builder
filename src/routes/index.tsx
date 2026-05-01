import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-cream">
      <div className="text-center">
        <h1 className="font-serif text-4xl font-bold text-plum">
          Subhashree IVF
        </h1>
        <p className="text-muted-foreground mt-2">Loading preview…</p>
      </div>
    </main>
  );
}
