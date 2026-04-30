
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

const partners = [
  "Medical Council",
  "ISO Certified",
  "Health Ministry",
  "ESHRE Member",
  "ASRM Affiliate",
  "WHO Standards",
  "ICMART Member",
  "Quality Assured",
]

export function PartnerLogos() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <section ref={ref} className="py-16 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center text-sm font-medium uppercase tracking-wider text-muted-foreground mb-8"
        >
          Trusted By & Accredited With
        </motion.h3>

        {/* Marquee container */}
        <div className="relative">
          {/* Gradient overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10" />

          {/* Scrolling content */}
          <div className="flex overflow-hidden">
            <div className="flex animate-marquee">
              {[...partners, ...partners].map((partner, index) => (
                <div
                  key={`${partner}-${index}`}
                  className="flex-shrink-0 mx-8 flex items-center justify-center"
                >
                  <div className="w-40 h-16 bg-muted/50 rounded-lg flex items-center justify-center">
                    <span className="text-sm font-medium text-muted-foreground">
                      {partner}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
