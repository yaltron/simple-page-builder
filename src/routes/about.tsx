import { createFileRoute } from "@tanstack/react-router"
import { motion } from "framer-motion"
import { Target, Eye, Check, Award, HeartHandshake, Sparkles, ShieldCheck } from "lucide-react"
import { PageLayout, PageCTABanner, Section, SectionHeading, BRAND } from "@/components/page-layout"
import whoClinic from "@/assets/who-clinic.jpg"
import whoTeam from "@/assets/who-team.jpg"

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Subhashree IVF & Fertility Centre" },
      { name: "description", content: "12+ years of trusted fertility care in Nepal. Learn about our mission, values, and commitment to helping families." },
      { property: "og:title", content: "About Subhashree IVF" },
      { property: "og:description", content: "Nepal's trusted fertility centre — our story, mission and values." },
    ],
  }),
  component: AboutPage,
})

const whyChoose = [
  { icon: ShieldCheck, label: "ISO Certified Lab" },
  { icon: HeartHandshake, label: "Personalised Plans" },
  { icon: Sparkles, label: "Emotional Support" },
  { icon: Award, label: "Affordable Care" },
]

const values = [
  { icon: HeartHandshake, title: "Compassion", desc: "Every patient is treated with empathy, dignity and unwavering support." },
  { icon: ShieldCheck, title: "Excellence", desc: "World-class technology and protocols, refined over more than a decade." },
  { icon: Sparkles, title: "Hope", desc: "We believe in the dream of every family — and work tirelessly to honour it." },
]

function AboutPage() {
  return (
    <PageLayout title="About Us" breadcrumb="About Us">
      {/* Section 1 — Our Story */}
      <Section bg="white">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <SectionHeading align="left">Our Story</SectionHeading>
            <p style={{ color: BRAND.navLink, lineHeight: 1.8, marginBottom: 16 }}>
              Founded over 12 years ago, Subhashree IVF & Fertility Centre has grown into Nepal's most trusted name in reproductive medicine. From our first clinic to today's full-service centre of excellence, our mission has remained the same — bringing happiness into your life.
            </p>
            <p style={{ color: BRAND.navLink, lineHeight: 1.8 }}>
              With more than 5,000 successful treatments and a dedicated team of specialists, embryologists and counsellors, we have built a reputation founded on outcomes, transparency and compassionate care for every couple who walks through our doors.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 gap-4"
          >
            <div className="space-y-4">
              <div className="rounded-2xl overflow-hidden h-56 shadow-lg">
                <img src={whoClinic} alt="Our clinic" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="pt-10">
              <div className="rounded-2xl overflow-hidden h-72 shadow-lg">
                <img src={whoTeam} alt="Our team" className="w-full h-full object-cover" />
              </div>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* Section 2 — Mission & Vision */}
      <Section bg="white">
        <SectionHeading>Our Mission & Vision</SectionHeading>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            { icon: Target, title: "Our Mission", bg: BRAND.pinkSoft, text: "To empower every couple on their path to parenthood through advanced fertility care, transparent guidance and compassionate emotional support — at a cost accessible to all." },
            { icon: Eye, title: "Our Vision", bg: BRAND.blueSoft, text: "To be South Asia's most trusted fertility centre, recognised for medical excellence, ethical practice and the joy we bring to families." },
          ].map((c) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-2xl p-8 transition-transform hover:-translate-y-1.5"
              style={{ background: c.bg, border: "1px solid rgba(230,0,126,0.12)" }}
            >
              <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center mb-5">
                <c.icon className="w-7 h-7" style={{ color: BRAND.pink }} />
              </div>
              <h3 className="font-serif text-2xl font-bold mb-3" style={{ color: BRAND.heading }}>{c.title}</h3>
              <p style={{ color: BRAND.navLink, lineHeight: 1.7 }}>{c.text}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Section 3 — Why Choose Us */}
      <Section bg={BRAND.pinkSoft}>
        <SectionHeading>Why Choose Us</SectionHeading>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {whyChoose.map((w, i) => (
            <motion.div
              key={w.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="bg-white rounded-2xl p-5 flex items-center gap-4 transition-transform hover:-translate-y-1"
              style={{ border: "1px solid rgba(230,0,126,0.12)" }}
            >
              <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: BRAND.pinkSoft }}>
                <w.icon className="w-6 h-6" style={{ color: BRAND.pink }} />
              </div>
              <div className="font-semibold" style={{ color: BRAND.plum }}>{w.label}</div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Section 4 — Our Values */}
      <Section bg="white">
        <SectionHeading>Our Values</SectionHeading>
        <div className="grid md:grid-cols-3 gap-6">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-2xl p-7 text-center transition-transform hover:-translate-y-1.5"
              style={{ background: i % 2 === 0 ? BRAND.pinkSoft : BRAND.blueSoft, border: "1px solid rgba(230,0,126,0.12)" }}
            >
              <div className="w-16 h-16 rounded-full mx-auto mb-5 flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${BRAND.pink}, ${BRAND.pinkDark})` }}>
                <v.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-serif text-xl font-bold mb-2" style={{ color: BRAND.heading }}>{v.title}</h3>
              <p style={{ color: BRAND.navLink, lineHeight: 1.7 }}>{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      <PageCTABanner />
    </PageLayout>
  )
}
