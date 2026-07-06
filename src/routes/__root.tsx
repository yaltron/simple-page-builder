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
      { property: "og:site_name", content: "Shubhashree IVF Clinic" },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "https://shubhashreeivf.com/og-image.jpg" },
      { name: "twitter:image", content: "https://shubhashreeivf.com/og-image.jpg" },
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
        <noscript>
          <h1>Shubhashree IVF Clinic</h1>
          <p>Fertility and IVF treatment center in Soltimode, Kathmandu 44600, Nepal. Services: IVF, IUI, ICSI, fertility diagnostics and counseling. Phone: +977-1-5312007, +977-9861141699. Email: subhashreeivfclinic@gmail.com. Open Sunday to Friday, 9:00 AM to 5:00 PM.</p>
        </noscript>
        <ScrollToTop />
        {children}
        <Toaster position="top-center" richColors closeButton />
        <ClientOnly fallback={null}>
          <FloatingButtons />
          <PopupBanner />
        </ClientOnly>
        <Scripts />
      </body>
    </html>
  );
}
