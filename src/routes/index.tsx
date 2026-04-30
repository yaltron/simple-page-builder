import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Zap, Shield } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Lumen — Build beautifully, ship fast" },
      {
        name: "description",
        content: "Lumen is a minimal toolkit for makers who care about craft. Launch your idea in days, not months.",
      },
    ],
  }),
});

function Index() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="container mx-auto flex items-center justify-between px-6 py-6">
        <div className="flex items-center gap-2 font-semibold">
          <div className="h-7 w-7 rounded-lg bg-[image:var(--gradient-hero)]" />
          Lumen
        </div>
        <nav className="hidden gap-8 text-sm text-muted-foreground sm:flex">
          <a href="#features" className="hover:text-foreground transition-colors">Features</a>
          <a href="#pricing" className="hover:text-foreground transition-colors">Pricing</a>
          <a href="#about" className="hover:text-foreground transition-colors">About</a>
        </nav>
        <Button size="sm">Get started</Button>
      </header>

      <section className="container mx-auto px-6 pt-16 pb-24 text-center">
        <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground">
          <Sparkles className="h-3 w-3" /> Now in public beta
        </div>
        <h1 className="mx-auto mt-6 max-w-3xl text-5xl font-bold tracking-tight sm:text-6xl">
          Build beautifully,{" "}
          <span className="bg-[image:var(--gradient-hero)] bg-clip-text text-transparent">
            ship fast
          </span>
          .
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
          A minimal toolkit for makers who care about craft. Launch your idea in days, not months.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Button size="lg" className="shadow-[var(--shadow-glow)]">
            Start free <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
          <Button size="lg" variant="outline">Live demo</Button>
        </div>
      </section>

      <section id="features" className="container mx-auto grid gap-6 px-6 pb-24 sm:grid-cols-3">
        {[
          { icon: Zap, title: "Lightning fast", desc: "Optimized from the first paint to the last interaction." },
          { icon: Shield, title: "Secure by default", desc: "Best practices baked in so you can focus on the product." },
          { icon: Sparkles, title: "Delightful details", desc: "Thoughtful design that makes your app feel premium." },
        ].map(({ icon: Icon, title, desc }) => (
          <div key={title} className="rounded-2xl border border-border bg-card p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[image:var(--gradient-hero)] text-primary-foreground">
              <Icon className="h-5 w-5" />
            </div>
            <h3 className="mt-4 font-semibold">{title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
          </div>
        ))}
      </section>

      <footer className="border-t border-border">
        <div className="container mx-auto flex flex-col items-center justify-between gap-2 px-6 py-6 text-sm text-muted-foreground sm:flex-row">
          <p>© 2026 Lumen. All rights reserved.</p>
          <p>Crafted with care.</p>
        </div>
      </footer>
    </main>
  );
}
