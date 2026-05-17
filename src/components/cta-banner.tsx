import { Phone } from "lucide-react"
import { Link } from "@tanstack/react-router"
import { Button } from "@/components/ui/button"
import { useHomepageSection } from "@/lib/use-cms-content"

const CTA_DEFAULTS = {
  heading: "Ready to Start Your Journey to Parenthood?",
  heading_color: "#1A1535",
  subtext:
    "Take the first step towards building your family. Our compassionate team is here to guide you through every step of your fertility journey.",
  primary_text: "Book Consultation",
  primary_url: "/contact",
  secondary_text: "Call: +977 9861141699",
  secondary_url: "tel:+9779861141699",
}

export function CTABanner() {
  const cms = useHomepageSection("cta_banner", CTA_DEFAULTS)
  const isExternal = /^(https?:|tel:|mailto:)/.test(cms.primary_url || "")
  return (
    <section
      id="contact"
      className="py-12 sm:py-16 lg:py-24 bg-gradient-to-br from-rose-light/40 via-cream to-gold-light/40 relative overflow-hidden"
    >
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-4 sm:space-y-6">
          <h2 className="font-serif font-bold text-balance leading-tight" style={{ color: cms.heading_color, fontSize: "clamp(1.75rem, 4.5vw, 3rem)" }}>
            {cms.heading}
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">{cms.subtext}</p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button
              asChild
              size="lg"
              className="bg-rose hover:bg-rose-dark text-white rounded-full px-8 text-base font-bold transition-transform hover:scale-105"
            >
              {isExternal ? (
                <a href={cms.primary_url}>{cms.primary_text}</a>
              ) : (
                <Link to={cms.primary_url}>{cms.primary_text}</Link>
              )}
            </Button>
            {cms.secondary_text && (
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full px-8 text-base border-2 border-rose text-rose bg-transparent hover:bg-rose/10 transition-transform hover:scale-105"
              >
                <a href={cms.secondary_url || "#"}>
                  <Phone className="w-4 h-4 mr-2" />
                  {cms.secondary_text}
                </a>
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
