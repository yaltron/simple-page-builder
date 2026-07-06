import { useEffect, useState } from "react"
import { createFileRoute, Link } from "@tanstack/react-router"
import { motion } from "framer-motion"
import * as Icons from "lucide-react"
import { ArrowRight, Heart } from "lucide-react"
import { PageLayout, PageCTABanner, Section, SectionHeading, BRAND } from "@/components/page-layout"
import { ProcessSteps } from "@/components/process-steps"
import { FertilityStages } from "@/components/fertility-stages"
import { supabase } from "@/integrations/supabase/client"

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: "Fertility Treatment Services | Shubhashree IVF, Kathmandu" },
      { name: "description", content: "IVF, ICSI, IUI, embryo freezing, genetic testing and donor programmes at Shubhashree IVF Clinic, Kathmandu - comprehensive fertility care under one roof." },
      { property: "og:title", content: "Fertility Treatment Services | Shubhashree IVF, Kathmandu" },
      { property: "og:description", content: "Comprehensive fertility services tailored for you at Shubhashree IVF Clinic, Kathmandu." },
      { property: "og:url", content: "https://shubhashreeivf.com/services" },
    ],
    links: [{ rel: "canonical", href: "https://shubhashreeivf.com/services" }],
  }),
  component: ServicesPage,
})

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

function ServicesPage() {
  const [services, setServices] = useState<any[]>([])

  useEffect(() => {
    supabase.from("services").select("*").eq("status", "published").order("display_order").then(({ data }) => setServices(data || []))
  }, [])

  return (
    <PageLayout title="Our Services" breadcrumb="Services">
      <Section bg="white">
        <SectionHeading>Comprehensive Fertility Care</SectionHeading>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => {
            const Icon = pickIcon(s.icon)
            return (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: (i % 3) * 0.08 }}
                className="rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1.5 flex flex-col"
                style={{ background: cardGradients[i % cardGradients.length], border: "1px solid rgba(230,0,126,0.12)" }}
              >
                <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center mb-5">
                  <Icon className="w-7 h-7" style={{ color: BRAND.pink }} />
                </div>
                <h3 className="font-serif text-xl font-semibold mb-3" style={{ color: BRAND.plum }}>{s.title}</h3>
                {s.short_description && <p className="text-sm leading-relaxed mb-4 flex-1" style={{ color: BRAND.navLink }}>{s.short_description}</p>}
                {s.slug && (
                  <Link
                    to="/services/$slug"
                    params={{ slug: s.slug }}
                    className="inline-flex items-center gap-1 text-sm font-semibold mt-auto"
                    style={{ color: BRAND.pink }}
                  >
                    Learn More <ArrowRight className="w-4 h-4" />
                  </Link>
                )}
              </motion.div>
            )
          })}
        </div>
      </Section>

      <FertilityStages />

      <ProcessSteps />

      <PageCTABanner />
    </PageLayout>
  )
}
