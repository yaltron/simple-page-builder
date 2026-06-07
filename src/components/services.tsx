import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import { Link } from "@tanstack/react-router"
import * as Icons from "lucide-react"
import { Heart, ArrowRight } from "lucide-react"
import { useHomepageSection } from "@/lib/use-cms-content"
import { supabase } from "@/integrations/supabase/client"

const SERVICES_HEADING_DEFAULTS = {
  heading: "Comprehensive Fertility Care, Tailored for You",
  heading_color: "#C2185B",
}

const cardGradients = [
  "linear-gradient(135deg, #FFF1F7 0%, #fcd4e8 100%)",
  "linear-gradient(135deg, #EAF7FD 0%, #F5DCF0 100%)",
  "linear-gradient(135deg, #fcd4e8 0%, #EAF7FD 100%)",
  "linear-gradient(135deg, #c2e8f8 0%, #FFF1F7 100%)",
  "linear-gradient(135deg, #FFF1F7 0%, #c2e8f8 100%)",
  "linear-gradient(135deg, #EAF7FD 0%, #fcd4e8 100%)",
]

function pickIcon(name?: string | null) {
  const I = (Icons as any)[name || ""] as React.ComponentType<{ className?: string; style?: any }> | undefined
  return I || Heart
}

export function Services() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const cms = useHomepageSection("services_heading", SERVICES_HEADING_DEFAULTS)
  const [services, setServices] = useState<any[]>([])

  useEffect(() => {
    supabase
      .from("services")
      .select("*")
      .eq("status", "published")
      .order("display_order")
      .then(({ data }) => setServices(data || []))
  }, [])

  return (
    <section id="services" ref={ref} className="py-10 sm:py-12 md:py-14" style={{ background: "linear-gradient(135deg, #EAF7FD, #FFF1F7)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-8 md:mb-10"
        >
          <h2
            className="mt-2"
            style={{
              color: cms.heading_color,
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700,
              fontStyle: "normal",
              fontSize: "clamp(1.625rem, 4vw, 2.25rem)",
              lineHeight: 1.2,
            }}
          >
            {cms.heading}
          </h2>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
          {services.map((service, index) => {
            const Icon = pickIcon(service.icon)
            return (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative"
            >
              <div
                className="relative rounded-2xl p-5 sm:p-6 lg:p-7 h-full transition-all duration-300 group-hover:-translate-y-1.5"
                style={{
                  background: cardGradients[index % cardGradients.length],
                  border: "1px solid rgba(230, 0, 126, 0.12)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(230, 0, 126, 0.35)"
                  e.currentTarget.style.boxShadow = "0 12px 40px rgba(230, 0, 126, 0.12)"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(230, 0, 126, 0.12)"
                  e.currentTarget.style.boxShadow = "none"
                }}
              >
                {/* Icon */}
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white flex items-center justify-center mb-4 sm:mb-5">
                  <Icon className="w-6 h-6 sm:w-7 sm:h-7" style={{ color: "#E6007E" }} />
                </div>

                {/* Content */}
                <h3 className="font-serif text-lg sm:text-xl font-semibold mb-2 sm:mb-3" style={{ color: "#1A1535" }}>
                  {service.title}
                </h3>
                <p className="text-sm leading-relaxed mb-3 sm:mb-4" style={{ color: "#6B6B8A" }}>
                  {service.short_description}
                </p>

                {/* Link */}
                <Link
                  to="/services"
                  className="inline-flex items-center gap-1 text-sm font-medium transition-all duration-300 group-hover:gap-2"
                  style={{ color: "#E6007E" }}
                >
                  Explore our fertility services
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
