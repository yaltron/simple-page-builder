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

const HOME_TITLE = "Best IVF Centre in Kathmandu, Nepal | Shubhashree IVF";
const HOME_DESC = "Shubhashree IVF Clinic in Kathmandu offers IVF, ICSI & IUI with high success rates and caring, ethical fertility treatment. Book your consultation today.";
const HOME_URL = "https://subhashree-ui.lovable.app/";

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
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: HOME_TITLE },
      { name: "twitter:description", content: HOME_DESC },
    ],
    links: [{ rel: "canonical", href: HOME_URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "MedicalClinic",
          name: "Shubhashree IVF Clinic",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Soalteemode",
            addressLocality: "Kathmandu",
            addressCountry: "Nepal",
          },
          telephone: "+977 986-1141699",
          email: "shubhashreeivf@gmail.com",
          url: "https://shubhashreeivf.com",
          openingHours: "Mo-Su 08:00-17:00",
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
