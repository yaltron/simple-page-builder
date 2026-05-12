import { useState } from "react"
import { createFileRoute, Link } from "@tanstack/react-router"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, Microscope, Snowflake, Dna, Users, Stethoscope, Activity, Pill, ArrowRight, ChevronDown, Clock, TrendingUp } from "lucide-react"
import { PageLayout, PageCTABanner, Section, SectionHeading, BRAND } from "@/components/page-layout"
import { ProcessSteps } from "@/components/process-steps"

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Our Services — Subhashree IVF" },
      { name: "description", content: "IVF, ICSI, embryo freezing, genetic testing, donor programmes and more — comprehensive fertility care under one roof." },
      { property: "og:title", content: "Our Services — Subhashree IVF" },
      { property: "og:description", content: "Comprehensive fertility services tailored for you." },
    ],
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
  "linear-gradient(135deg, #fcd4e8 0%, #FFF1F7 100%)",
  "linear-gradient(135deg, #EAF7FD 0%, #c2e8f8 100%)",
]

const services = [
  { icon: Heart, title: "IVF Treatment", short: "Advanced in-vitro fertilization with personalised protocols.", long: "Our flagship IVF programme combines world-class embryology with individualised stimulation protocols to maximise success while keeping the journey as gentle as possible.", rate: "75% success", duration: "4–6 weeks" },
  { icon: Microscope, title: "ICSI Procedure", short: "Intracytoplasmic sperm injection for male factor infertility.", long: "ICSI bypasses sperm barriers by injecting a single sperm directly into the egg — ideal for low sperm count, motility or morphology concerns.", rate: "70% success", duration: "4–6 weeks" },
  { icon: Snowflake, title: "Embryo Freezing", short: "State-of-the-art cryopreservation for the future.", long: "Vitrification freezes embryos in seconds, preserving viability for years. A safe option for medical, professional or personal reasons.", rate: "95% survival", duration: "1–2 days" },
  { icon: Dna, title: "Genetic Testing (PGT)", short: "Preimplantation genetic testing for healthy embryo selection.", long: "PGT screens embryos for chromosomal abnormalities and inherited conditions before transfer, increasing implantation success.", rate: "Higher implantation", duration: "1–2 weeks" },
  { icon: Users, title: "Donor Egg Programme", short: "Carefully screened donors with full medical and counselling support.", long: "Our donor programme follows the strictest ethical and medical standards, with comprehensive screening and ongoing emotional support.", rate: "65% success", duration: "8–10 weeks" },
  { icon: Stethoscope, title: "Infertility Diagnosis", short: "Thorough diagnostic evaluations for both partners.", long: "A complete fertility workup including hormonal panels, imaging and semen analysis to identify the right treatment path.", rate: "Personalised plan", duration: "2–3 visits" },
  { icon: Activity, title: "Laparoscopy", short: "Minimally invasive surgery to treat fertility-related conditions.", long: "Laparoscopy diagnoses and treats endometriosis, fibroids, blocked tubes and adhesions through small incisions for faster recovery.", rate: "Day-care procedure", duration: "1 day" },
  { icon: Pill, title: "Hormonal Therapy", short: "Targeted treatment to restore reproductive balance.", long: "Personalised hormonal protocols address ovulation disorders, PCOS, thyroid concerns and other endocrine factors affecting fertility.", rate: "Tailored to you", duration: "3–6 months" },
]

function ServicesPage() {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <PageLayout title="Our Services" breadcrumb="Services">
      <Section bg="white">
        <SectionHeading>Comprehensive Fertility Care</SectionHeading>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => {
            const isOpen = open === i
            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: (i % 3) * 0.08 }}
                className="rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1.5"
                style={{ background: cardGradients[i % cardGradients.length], border: "1px solid rgba(230,0,126,0.12)" }}
              >
                <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center mb-5">
                  <s.icon className="w-7 h-7" style={{ color: BRAND.pink }} />
                </div>
                <h3 className="font-serif text-xl font-semibold mb-3" style={{ color: BRAND.plum }}>{s.title}</h3>
                <p className="text-sm leading-relaxed mb-4" style={{ color: BRAND.navLink }}>{s.short}</p>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="inline-flex items-center gap-1 text-sm font-semibold transition-all"
                  style={{ color: BRAND.pink }}
                >
                  {isOpen ? "Show less" : "Learn more"}
                  <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4 mt-4 border-t" style={{ borderColor: "rgba(230,0,126,0.15)" }}>
                        <p className="text-sm mb-4" style={{ color: BRAND.navLink, lineHeight: 1.7 }}>{s.long}</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          <span className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full bg-white" style={{ color: BRAND.pink }}>
                            <TrendingUp className="w-3 h-3" /> {s.rate}
                          </span>
                          <span className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full bg-white" style={{ color: BRAND.heading }}>
                            <Clock className="w-3 h-3" /> {s.duration}
                          </span>
                        </div>
                        <Link to="/contact" className="inline-flex items-center gap-1 text-sm font-bold text-white px-4 py-2 rounded-full" style={{ background: BRAND.pink }}>
                          Book for this Service <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </Section>

      <ProcessSteps />

      <PageCTABanner />
    </PageLayout>
  )
}
