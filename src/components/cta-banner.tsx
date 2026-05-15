import { Phone } from "lucide-react"
import { Link } from "@tanstack/react-router"
import { Button } from "@/components/ui/button"

export function CTABanner() {
  return (
    <section
      id="contact"
      className="py-20 lg:py-24 bg-gradient-to-br from-rose-light/40 via-cream to-gold-light/40 relative overflow-hidden"
    >
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-6">
          <h2 className="font-serif text-3xl lg:text-5xl font-bold text-foreground text-balance">
            Ready to Start Your Journey to Parenthood?
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Take the first step towards building your family. Our compassionate team
            is here to guide you through every step of your fertility journey.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button
              asChild
              size="lg"
              className="bg-white text-[#B5005F] hover:bg-white/90 rounded-full px-8 text-base font-bold transition-transform hover:scale-105"
            >
              <Link to="/contact">Book Consultation</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full px-8 text-base border-2 border-white text-white bg-transparent hover:bg-white/10 transition-transform hover:scale-105"
            >
              <a href="tel:+9779861141699">
                <Phone className="w-4 h-4 mr-2" />
                Call: +977 9861141699
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
