import { createFileRoute } from "@tanstack/react-router"
import { motion } from "framer-motion"
import * as Icons from "lucide-react"
import { Target, Eye, Award, HeartHandshake, Sparkles, ShieldCheck } from "lucide-react"
import { PageLayout, PageCTABanner, Section, SectionHeading, BRAND } from "@/components/page-layout"
import whoClinic from "@/assets/who-clinic.jpg"
import whoTeam from "@/assets/who-team.jpg"
import { useAboutSection } from "@/lib/use-cms-content"

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us - Subhashree IVF & Fertility Centre" },
      { name: "description", content: "12+ years of trusted fertility care in Nepal. Learn about our mission, values, and commitment to helping families." },
      { property: "og:title", content: "About Subhashree IVF" },
      { property: "og:description", content: "Nepal's trusted fertility centre - our story, mission and values." },
      { property: "og:url", content: "https://subhashree-ui.lovable.app/about" },
    ],
    links: [{ rel: "canonical", href: "https://subhashree-ui.lovable.app/about" }],
  }),
  component: AboutPage,
})

const whyChoose = [
  { icon: ShieldCheck, label: "ISO Certified Lab" },
  { icon: HeartHandshake, label: "Personalised Plans" },
  { icon: Sparkles, label: "Emotional Support" },
  { icon: Award, label: "Affordable Care" },
]

const DEFAULT_STORY = {
  paragraph_1:
    "Founded over 12 years ago, Subhashree IVF & Fertility Centre has grown into Nepal's most trusted name in reproductive medicine. From our first clinic to today's full-service centre of excellence, our mission has remained the same - bringing happiness into your life.",
  paragraph_2:
    "With more than 5,000 successful treatments and a dedicated team of specialists, embryologists and counsellors, we have built a reputation founded on outcomes, transparency and compassionate care for every couple who walks through our doors.",
  images: [
    { url: whoClinic, alt: "Our clinic" },
    { url: whoTeam, alt: "Our team" },
  ] as { url: string; alt: string }[],
}

const DEFAULT_MV = {
  mission_title: "Our Mission",
  mission_text:
    "To empower every couple on their path to parenthood through advanced fertility care, transparent guidance and compassionate emotional support - at a cost accessible to all.",
  vision_title: "Our Vision",
  vision_text:
    "To be South Asia's most trusted fertility centre, recognised for medical excellence, ethical practice and the joy we bring to families.",
}

const DEFAULT_VALUES = {
  items: [
    { icon: "HeartHandshake", title: "Compassion", description: "Every patient is treated with empathy, dignity and unwavering support." },
    { icon: "ShieldCheck", title: "Excellence", description: "World-class technology and protocols, refined over more than a decade." },
    { icon: "Sparkles", title: "Hope", description: "We believe in the dream of every family - and work tirelessly to honour it." },
  ],
}

function IconByName({ name, className, style }: { name: string; className?: string; style?: React.CSSProperties }) {
  const Cmp = (Icons as any)[name] || Sparkles
  return <Cmp className={className} style={style} />
}

function resolveImage(url: string) {
  // Old seed used /src/assets/* paths - fall back to bundled imports
  if (url?.includes("who-clinic")) return whoClinic
  if (url?.includes("who-team")) return whoTeam
  return url
}

function AboutPage() {
  const story = useAboutSection("story_images", DEFAULT_STORY)
  const mv = useAboutSection("mission_vision", DEFAULT_MV)
  const valuesRow = useAboutSection("values", DEFAULT_VALUES)
  const images = (story.images && story.images.length ? story.images : DEFAULT_STORY.images).slice(0, 3)
  const values = valuesRow.items && valuesRow.items.length ? valuesRow.items : DEFAULT_VALUES.items

  return (
    <PageLayout title="About Us" breadcrumb="About Us">
      {/* Section 1 - Our Story */}
      <Section bg="white">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <SectionHeading align="left">Our Story</SectionHeading>
            <p style={{ color: BRAND.navLink, lineHeight: 1.8, marginBottom: 16 }}>{story.paragraph_1}</p>
            <p style={{ color: BRAND.navLink, lineHeight: 1.8 }}>{story.paragraph_2}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 gap-4"
          >
            <div className="space-y-4">
              {images[0] && (
                <div className="rounded-2xl overflow-hidden h-56 shadow-lg">
                  <img src={resolveImage(images[0].url)} alt={images[0].alt} className="w-full h-full object-cover" />
                </div>
              )}
              {images[2] && (
                <div className="rounded-2xl overflow-hidden h-56 shadow-lg">
                  <img src={resolveImage(images[2].url)} alt={images[2].alt} className="w-full h-full object-cover" />
                </div>
              )}
            </div>
            <div className="pt-10">
              {images[1] && (
                <div className="rounded-2xl overflow-hidden h-72 shadow-lg">
                  <img src={resolveImage(images[1].url)} alt={images[1].alt} className="w-full h-full object-cover" />
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </Section>

      {/* Section 2 - Mission & Vision */}
      <Section bg="white">
        <SectionHeading>Our Mission & Vision</SectionHeading>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            { Icon: Target, title: mv.mission_title, bg: BRAND.pinkSoft, text: mv.mission_text },
            { Icon: Eye, title: mv.vision_title, bg: BRAND.blueSoft, text: mv.vision_text },
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
                <c.Icon className="w-7 h-7" style={{ color: BRAND.pink }} />
              </div>
              <h3 className="font-serif text-2xl font-bold mb-3" style={{ color: BRAND.heading }}>{c.title}</h3>
              <p style={{ color: BRAND.navLink, lineHeight: 1.7 }}>{c.text}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Section 3 - Why Choose Us */}
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

      {/* Section 4 - Our Values */}
      <Section bg="white">
        <SectionHeading>Our Values</SectionHeading>
        <div className="grid md:grid-cols-3 gap-6">
          {values.map((v: any, i: number) => (
            <motion.div
              key={v.title + i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-2xl p-7 text-center transition-transform hover:-translate-y-1.5"
              style={{ background: i % 2 === 0 ? BRAND.pinkSoft : BRAND.blueSoft, border: "1px solid rgba(230,0,126,0.12)" }}
            >
              <div className="w-16 h-16 rounded-full mx-auto mb-5 flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${BRAND.pink}, ${BRAND.pinkDark})` }}>
                <IconByName name={v.icon || "Sparkles"} className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-serif text-xl font-bold mb-2" style={{ color: BRAND.heading }}>{v.title}</h3>
              <p style={{ color: BRAND.navLink, lineHeight: 1.7 }}>{v.description || v.desc}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      <PageCTABanner />
    </PageLayout>
  )
}
