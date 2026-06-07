import {
  ClientOnly,
  HeadContent,
  Outlet,
  Scripts,
  createRootRoute,
} from "@tanstack/react-router";
import type { ReactNode } from "react";
import { FloatingButtons } from "@/components/floating-buttons";
import ScrollToTop from "@/components/scroll-to-top";
import { PopupBanner } from "@/components/popup-banner";

import { CustomCursor } from "@/components/custom-cursor";
import { NotFoundPage } from "@/components/not-found-page";
import { Toaster } from "sonner";
import appCss from "@/styles.css?url";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#C2185B" },
      {
        name: "keywords",
        content:
          "IVF, fertility, Nepal, Kathmandu, infertility treatment, ICSI, embryo freezing",
      },
      { property: "og:site_name", content: "Shubhashree IVF & Fertility Centre" },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/2763929e-3781-4f77-96d6-089915beb33e/id-preview-0338afa5--21c28b4a-1c9f-40e2-a587-0b34d8e11f6f.lovable.app-1777588428747.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/2763929e-3781-4f77-96d6-089915beb33e/id-preview-0338afa5--21c28b4a-1c9f-40e2-a587-0b34d8e11f6f.lovable.app-1777588428747.png" },
      { name: "twitter:card", content: "summary_large_image" },
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
        href: "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap",
      },
    ],
  }),
  shellComponent: RootDocument,
  notFoundComponent: () => <NotFoundPage />,
});

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="bg-background scroll-smooth">
      <head>
        <HeadContent />
      </head>
      <body className="font-sans antialiased">
        <ScrollToTop />
        {children}
        <Toaster position="top-center" richColors closeButton />
        <ClientOnly fallback={null}>
          <CustomCursor />
          <FloatingButtons />
          <PopupBanner />
          
        </ClientOnly>
        <Scripts />
      </body>
    </html>
  );
}
