import { createFileRoute, Link } from "@tanstack/react-router"
import { motion } from "framer-motion"
import * as Icons from "lucide-react"
import { Target, Eye, Sparkles, HeartHandshake, ShieldCheck, Award } from "lucide-react"
import { PageLayout, Section, BRAND } from "@/components/page-layout"
import whoClinic from "@/assets/who-clinic.jpg"
import whoTeam from "@/assets/who-team.jpg"
import { useAboutSection } from "@/lib/use-cms-content"

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Shubhashree IVF Clinic | Fertility Experts in Kathmandu" },
      { name: "description", content: "Learn about Shubhashree IVF Clinic in Kathmandu - our mission, ethical approach, and experienced fertility specialists. Caring fertility care in Nepal." },
      { property: "og:title", content: "About Shubhashree IVF Clinic | Fertility Experts in Kathmandu" },
      { property: "og:description", content: "Learn about Shubhashree IVF Clinic in Kathmandu - our mission, ethical approach, and experienced fertility specialists." },
      { property: "og:url", content: "https://subhashree-ui.lovable.app/about" },
    ],
    links: [{ rel: "canonical", href: "https://subhashree-ui.lovable.app/about" }],
  }),
  component: AboutPage,
})

type Card = { icon: string; title: string; description: string }

const DEFAULT_STORY = {
  heading: "Our Story",
  heading_color: "#C2185B",
  paragraph_1:
    "Founded over 12 years ago, Subhashree IVF & Fertility Centre has grown into Nepal's most trusted name in reproductive medicine. From our first clinic to today's full-service centre of excellence, our mission has remained the same - bringing happiness into your life.",
  paragraph_2:
    "With more than 5,000 successful treatments and a dedicated team of specialists, embryologists and counsellors, we have built a reputation founded on outcomes, transparency and compassionate care for every couple who walks through our doors.",
  images: [
    { url: whoClinic, alt: "Shubhashree IVF Clinic building and reception in Kathmandu" },
    { url: whoTeam, alt: "Our fertility specialist team at Shubhashree IVF Clinic, Kathmandu" },
    { url: whoClinic, alt: "Shubhashree IVF Clinic facilities" },
  ] as { url: string; alt: string }[],
}

const DEFAULT_MV = {
  mission_title: "Our Mission",
  mission_text:
    "To empower every couple on their path to parenthood through advanced fertility care, transparent guidance and compassionate emotional support - at a cost accessible to all.",
  vision_title: "Our Vision",
  vision_text:
    "To be South Asia's most trusted fertility centre, recognised for medical excellence, ethical practice and the joy we bring to families.",
  mission_icon: "Target",
  vision_icon: "Eye",
}

const DEFAULT_WHY = {
  heading: "Why Choose Us",
  heading_color: "#C2185B",
  cards: [
    { icon: "HeartHandshake", title: "Personalised Plans", description: "Treatment plans tailored to your unique journey." },
    { icon: "Sparkles", title: "Emotional Support", description: "Counselling and compassion at every step." },
    { icon: "Award", title: "Affordable Care", description: "World-class fertility care accessible to all." },
  ] as Card[],
}

const DEFAULT_VALUES = {
  heading: "Our Values",
  heading_color: "#C2185B",
  items: [
    { icon: "HeartHandshake", title: "Compassion", description: "Every patient is treated with empathy, dignity and unwavering support." },
    { icon: "ShieldCheck", title: "Excellence", description: "World-class technology and protocols, refined over more than a decade." },
    { icon: "Sparkles", title: "Hope", description: "We believe in the dream of every family - and work tirelessly to honour it." },
  ] as Card[],
}

const DEFAULT_CTA = {
  heading: "Ready to Start Your Journey?",
  subtext: "Take the first step towards parenthood. Our compassionate team is here for you.",
  button_text: "Book Consultation",
  button_url: "/contact",
}

function IconByName({ name, className, style }: { name: string; className?: string; style?: React.CSSProperties }) {
  const Cmp = (Icons as any)[name] || Sparkles
  return <Cmp className={className} style={style} />
}

function Heading({ children, color }: { children: React.ReactNode; color?: string }) {
  return (
    <h2
      style={{
        fontFamily: "'Playfair Display', serif",
        color: color || BRAND.heading,
        fontSize: "clamp(26px, 3.5vw, 38px)",
        fontWeight: 700,
        textAlign: "center",
        marginBottom: 36,
      }}
    >
      {children}
    </h2>
  )
}

function resolveImage(url: string) {
  if (url?.includes("who-clinic")) return whoClinic
  if (url?.includes("who-team")) return whoTeam
  return url
}

function AboutPage() {
  const story = useAboutSection("story_images", DEFAULT_STORY)
  const mv = useAboutSection("mission_vision", DEFAULT_MV)
  const why = useAboutSection("why_choose_us", DEFAULT_WHY)
  const valuesRow = useAboutSection("values", DEFAULT_VALUES)
  const cta = useAboutSection("cta_banner", DEFAULT_CTA)

  const images = (story.images && story.images.length ? story.images : DEFAULT_STORY.images).slice(0, 3)
  const whyCards: Card[] = why.cards && why.cards.length ? why.cards : DEFAULT_WHY.cards
  const values: Card[] = valuesRow.items && valuesRow.items.length ? valuesRow.items : DEFAULT_VALUES.items
  const MissionIcon = ((Icons as any)[mv.mission_icon || "Target"] || Target) as typeof Target
  const VisionIcon = ((Icons as any)[mv.vision_icon || "Eye"] || Eye) as typeof Eye

  return (
    <PageLayout title="About Us" breadcrumb="About Us">
      {/* Section 1 - Our Story */}
      <Section bg="white">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                color: story.heading_color || BRAND.heading,
                fontSize: "clamp(26px, 3.5vw, 38px)",
                fontWeight: 700,
                textAlign: "left",
                marginBottom: 24,
              }}
            >
              {story.heading || "Our Story"}
            </h2>
            <p style={{ color: BRAND.navLink, lineHeight: 1.8, marginBottom: 16 }}>{story.paragraph_1}</p>
            <p style={{ color: BRAND.navLink, lineHeight: 1.8 }}>{story.paragraph_2}</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <style>{`
              .story-collage { display: flex; flex-direction: row; gap: 16px; align-items: stretch; width: 100%; }
              .story-collage-left { display: flex; flex-direction: column; gap: 16px; width: 45%; }
              .story-collage-right { width: 52%; }
              .story-collage-img-sm { width: 100%; height: 220px; object-fit: cover; border-radius: 16px; box-shadow: 0 8px 30px rgba(0,0,0,0.10); display: block; }
              .story-collage-img-tall { width: 100%; height: 460px; object-fit: cover; object-position: top center; border-radius: 16px; box-shadow: 0 8px 30px rgba(0,0,0,0.10); display: block; }
              @media (max-width: 767px) {
                .story-collage { flex-direction: column; }
                .story-collage-left, .story-collage-right { width: 100%; }
                .story-collage-img-tall { height: 220px; }
              }
            `}</style>
            <div className="story-collage">
              <div className="story-collage-left">
                {images[0]?.url && <img src={resolveImage(images[0].url)} alt={images[0].alt || ""} className="story-collage-img-sm" />}
                {images[1]?.url && <img src={resolveImage(images[1].url)} alt={images[1].alt || ""} className="story-collage-img-sm" />}
              </div>
              <div className="story-collage-right">
                {images[2]?.url && <img src={resolveImage(images[2].url)} alt={images[2].alt || ""} className="story-collage-img-tall" />}
              </div>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* Section 2 - Mission & Vision */}
      <Section bg="white">
        <Heading>Our Mission & Vision</Heading>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            { Icon: MissionIcon, title: mv.mission_title, bg: BRAND.pinkSoft, text: mv.mission_text },
            { Icon: VisionIcon, title: mv.vision_title, bg: BRAND.blueSoft, text: mv.vision_text },
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
        <Heading color={why.heading_color}>{why.heading || "Why Choose Us"}</Heading>
        <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {whyCards.map((w, i) => (
            <motion.div
              key={(w.title || "") + i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="bg-white rounded-2xl p-6 transition-transform hover:-translate-y-1"
              style={{ border: "1px solid rgba(230,0,126,0.12)" }}
            >
              <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4" style={{ background: BRAND.pinkSoft }}>
                <IconByName name={w.icon || "HeartHandshake"} className="w-6 h-6" style={{ color: BRAND.pink }} />
              </div>
              <div className="font-bold mb-2" style={{ color: BRAND.plum }}>{w.title}</div>
              {w.description && <p style={{ color: BRAND.navLink, lineHeight: 1.6, fontSize: 14 }}>{w.description}</p>}
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Section 4 - Our Values */}
      <Section bg="white">
        <Heading color={valuesRow.heading_color}>{valuesRow.heading || "Our Values"}</Heading>
        <div className="grid md:grid-cols-3 gap-6">
          {values.map((v: Card, i: number) => (
            <motion.div
              key={(v.title || "") + i}
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
              <p style={{ color: BRAND.navLink, lineHeight: 1.7 }}>{v.description}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Section 5 - CTA Banner */}
      <section
        style={{
          padding: "60px 8%",
          background: "linear-gradient(135deg, rgba(248,187,217,0.4) 0%, #FFFAF7 50%, rgba(255,248,225,0.4) 100%)",
          color: BRAND.plum,
          textAlign: "center",
        }}
      >
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.6 }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 700, marginBottom: 14, color: BRAND.heading }}>
            {cta.heading}
          </h2>
          {cta.subtext && (
            <p style={{ opacity: 0.85, maxWidth: 620, margin: "0 auto 28px", fontSize: 16, color: BRAND.plum }}>{cta.subtext}</p>
          )}
          <div className="flex flex-wrap justify-center gap-4">
            {cta.button_text && (
              cta.button_url?.startsWith("/") ? (
                <Link
                  to={cta.button_url as any}
                  className="px-7 py-3 rounded-full font-bold transition-transform hover:scale-105"
                  style={{ background: "#8B0F50", color: "white" }}
                >
                  {cta.button_text}
                </Link>
              ) : (
                <a
                  href={cta.button_url || "#"}
                  className="px-7 py-3 rounded-full font-bold transition-transform hover:scale-105"
                  style={{ background: "#8B0F50", color: "white" }}
                >
                  {cta.button_text}
                </a>
              )
            )}
          </div>
        </motion.div>
      </section>
    </PageLayout>
  )
}

// Suppress unused-import warnings for icons referenced only via dynamic IconByName
void HeartHandshake; void ShieldCheck; void Award;
