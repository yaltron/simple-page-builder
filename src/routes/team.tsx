import { useEffect, useState } from "react"
import { createFileRoute, Link } from "@tanstack/react-router"
import { motion } from "framer-motion"
import { Calendar, Stethoscope, HeartHandshake, FlaskConical, Briefcase } from "lucide-react"
import { PageLayout, PageCTABanner, Section, SectionHeading, BRAND } from "@/components/page-layout"
import { supabase } from "@/integrations/supabase/client"

export const Route = createFileRoute("/team")({
  head: () => ({
    meta: [
      { title: "Our Team — Subhashree IVF" },
      { name: "description", content: "Meet our expert fertility specialists, embryologists, nurses and support team dedicated to your journey." },
      { property: "og:title", content: "Our Team — Subhashree IVF" },
      { property: "og:description", content: "Expert specialists committed to your fertility journey." },
    ],
  }),
  component: TeamPage,
})

const support = [
  { icon: Stethoscope, title: "Nurses", desc: "Dedicated fertility nurses guiding you at every visit." },
  { icon: HeartHandshake, title: "Counsellors", desc: "Emotional support specialists for couples and individuals." },
  { icon: FlaskConical, title: "Lab Technicians", desc: "Skilled embryology and andrology lab professionals." },
  { icon: Briefcase, title: "Admin Staff", desc: "Friendly coordinators handling appointments and paperwork." },
]

function TeamPage() {
  const [doctors, setDoctors] = useState<any[]>([])
  useEffect(() => {
    supabase.from("doctors").select("*").eq("status", "published").order("display_order").then(({ data }) => setDoctors(data || []))
  }, [])

  return (
    <PageLayout title="Our Team" breadcrumb="Our Team">
      <Section bg="white">
        <SectionHeading>Meet Our Specialists</SectionHeading>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctors.map((d, i) => (
            <motion.div
              key={d.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: (i % 3) * 0.08 }}
              className="rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1.5"
              style={{
                background: i % 2 === 0
                  ? "linear-gradient(135deg, #FFF1F7 0%, #fcd4e8 100%)"
                  : "linear-gradient(135deg, #EAF7FD 0%, #F5DCF0 100%)",
                border: "1px solid rgba(230,0,126,0.12)",
              }}
            >
              <div className="aspect-[4/5] overflow-hidden bg-gray-100">
                {d.image && <img src={d.image} alt={d.name} className="w-full h-full object-cover" />}
              </div>
              <div className="p-6">
                <h3 className="font-serif text-xl font-bold mb-1" style={{ color: BRAND.heading }}>{d.name}</h3>
                {d.title && <p className="text-sm font-semibold mb-2" style={{ color: BRAND.pink }}>{d.title}</p>}
                {d.qualifications && <p className="text-sm mb-1" style={{ color: BRAND.navLink }}>{d.qualifications}</p>}
                {d.experience_years ? <p className="text-xs font-semibold mb-4" style={{ color: BRAND.plum }}>{d.experience_years}+ Years of experience</p> : <div className="mb-4" />}
                <Link to="/contact" className="w-full py-2.5 text-white text-sm font-bold rounded-full inline-flex items-center justify-center gap-2 transition-transform hover:scale-[1.02]" style={{ background: `linear-gradient(90deg, ${BRAND.pink}, ${BRAND.pinkDark})` }}>
                  <Calendar className="w-4 h-4" /> Book Consultation
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section bg={BRAND.pinkSoft}>
        <SectionHeading>Our Support Team</SectionHeading>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {support.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="bg-white rounded-2xl p-6 text-center transition-transform hover:-translate-y-1"
              style={{ border: "1px solid rgba(230,0,126,0.12)" }}
            >
              <div className="w-12 h-12 rounded-full mx-auto flex items-center justify-center mb-4" style={{ background: BRAND.pinkSoft }}>
                <s.icon className="w-6 h-6" style={{ color: BRAND.pink }} />
              </div>
              <h4 className="font-bold mb-1" style={{ color: BRAND.plum }}>{s.title}</h4>
              <p className="text-sm" style={{ color: BRAND.navLink }}>{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      <PageCTABanner />
    </PageLayout>
  )
}
