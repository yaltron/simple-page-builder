import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRoute,
  Link,
} from "@tanstack/react-router";
import type { ReactNode } from "react";
import { FloatingButtons } from "@/components/floating-buttons";
import { CustomCursor } from "@/components/custom-cursor";
import appCss from "@/styles.css?url";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#C2185B" },
      {
        title:
          "Subhashree IVF & Fertility Centre | Where Dreams of Parenthood Begin",
      },
      {
        name: "description",
        content:
          "Nepal's leading IVF centre with 12+ years of excellence, 5,000+ successful treatments, and 75% success rate. Comprehensive fertility care in Kathmandu.",
      },
      {
        name: "keywords",
        content:
          "IVF, fertility, Nepal, Kathmandu, infertility treatment, ICSI, embryo freezing",
      },
      {
        property: "og:title",
        content: "Subhashree IVF & Fertility Centre",
      },
      {
        property: "og:description",
        content:
          "Nepal's leading IVF centre with 12+ years of excellence and 5,000+ successful treatments.",
      },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Nunito:wght@400;500;600;700&display=swap",
      },
    ],
  }),
  shellComponent: RootDocument,
  notFoundComponent: () => (
    <div className="min-h-screen flex items-center justify-center bg-cream p-6">
      <div className="max-w-md text-center space-y-4">
        <h1 className="font-serif text-5xl font-bold text-rose">404</h1>
        <p className="text-plum text-lg">Page not found</p>
        <Link
          to="/"
          className="inline-block bg-rose hover:bg-rose-dark text-white rounded-full px-6 py-2 transition-colors"
        >
          Back home
        </Link>
      </div>
    </div>
  ),
});

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="bg-background scroll-smooth">
      <head>
        <HeadContent />
      </head>
      <body className="font-sans antialiased">
        {children}
        <FloatingButtons />
        <CustomCursor />
        <Scripts />
      </body>
    </html>
  );
}
