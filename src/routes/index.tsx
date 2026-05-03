import { ClientOnly, createFileRoute } from "@tanstack/react-router";
import { StickyNavbar } from "@/components/sticky-navbar";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  return (
    <ClientOnly fallback={<main className="min-h-screen bg-background" aria-busy="true" />}>
      <main>
        <StickyNavbar />
        <section
          className="min-h-screen flex items-center justify-center"
          style={{
            background: "linear-gradient(135deg, #FFF1F7 0%, #EAF7FD 100%)",
          }}
        >
          <h1 className="text-5xl font-light text-gray-300">Hero Section</h1>
        </section>
      </main>
    </ClientOnly>
  );
}
