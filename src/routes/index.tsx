import { ClientOnly, createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { WhoWeAre } from "@/components/who-we-are";
import { Services } from "@/components/services";
import { ProcessSteps } from "@/components/process-steps";
import { WhenToVisit } from "@/components/when-to-visit";

import { DoctorsCarousel } from "@/components/doctors-carousel";

import { WhyUs } from "@/components/why-us";
import { StoriesTestimonials } from "@/components/stories-testimonials";
import { useReveal } from "@/hooks/use-reveal";
import { FAQ } from "@/components/faq";
import { BlogPreview } from "@/components/blog-preview";
import { CTABanner } from "@/components/cta-banner";
import { Footer } from "@/components/footer";

const HOME_TITLE = "Shubhashree IVF Clinic | Fertility & IVF Treatment in Kathmandu, Nepal";
const HOME_DESC = "Shubhashree IVF Clinic in Soltimode, Kathmandu offers IVF, IUI, ICSI and fertility diagnostics with experienced gynecologists and embryologists. Call +977-9861141699.";
const HOME_URL = "https://shubhashreeivf.com/";
const OG_IMAGE = "https://shubhashreeivf.com/og-image.jpg";

export const Route = createFileRoute("/")({
  component: HomePage,
  head: () => ({
    meta: [
      { title: HOME_TITLE },
      { name: "description", content: HOME_DESC },
      { property: "og:title", content: HOME_TITLE },
      { property: "og:description", content: HOME_DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: HOME_URL },
      { property: "og:image", content: OG_IMAGE },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: HOME_TITLE },
      { name: "twitter:description", content: HOME_DESC },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: HOME_URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "MedicalClinic",
          name: "Shubhashree IVF Clinic",
          url: "https://shubhashreeivf.com/",
          telephone: "+977-9861141699",
          email: "subhashreeivfclinic@gmail.com",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Soltimode",
            addressLocality: "Kathmandu",
            postalCode: "44600",
            addressCountry: "NP",
          },
          openingHours: "Su-Fr 09:00-17:00",
          medicalSpecialty: "Reproductive Endocrinology",
        }),
      },
    ],
  }),
});

function HomePage() {
  useReveal();
  return (
    <ClientOnly fallback={<main className="min-h-screen bg-background" aria-busy="true" />}>
      <main>
        <Navbar />
        <Hero />
        <WhoWeAre />
        <Services />
        <ProcessSteps />
        <WhenToVisit />
        
        <DoctorsCarousel />
        <WhyUs />
        <StoriesTestimonials />
        <BlogPreview />
        <FAQ />
        <CTABanner />
        <Footer />
      </main>
    </ClientOnly>
  );
}
