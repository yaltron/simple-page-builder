import { ClientOnly, createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { WhoWeAre } from "@/components/who-we-are";
import { Services } from "@/components/services";
import { ProcessSteps } from "@/components/process-steps";
import { WhenToVisit } from "@/components/when-to-visit";

import { DoctorsCarousel } from "@/components/doctors-carousel";
import { Stats } from "@/components/stats";
import { MiraclesGallery } from "@/components/miracles-gallery";
import { WhyUs } from "@/components/why-us";
import { StoriesTestimonials } from "@/components/stories-testimonials";
import { useReveal } from "@/hooks/use-reveal";
import { FAQ } from "@/components/faq";
import { CTABanner } from "@/components/cta-banner";
import { Footer } from "@/components/footer";

export const Route = createFileRoute("/")({
  component: HomePage,
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
        <Stats />
        <MiraclesGallery />
        <WhyUs />
        <StoriesTestimonials />
        <FAQ />
        <CTABanner />
        <Footer />
      </main>
    </ClientOnly>
  );
}
