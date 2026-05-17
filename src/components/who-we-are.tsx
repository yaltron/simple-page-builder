import { motion, useScroll, useTransform } from "framer-motion"
import { useRef, useState } from "react"
import { ArrowRight, Sparkles, Heart } from "lucide-react"
import { Link } from "@tanstack/react-router"
import { MorphingBlob } from "@/components/morphing-blob"
import { useHomepageSection } from "@/lib/use-cms-content"
import miracle1 from "@/assets/miracle-1.jpg"
import miracle2 from "@/assets/miracle-2.jpg"
import miracle3 from "@/assets/miracle-3.jpg"
import miracle4 from "@/assets/miracle-4.jpg"
import miracle5 from "@/assets/miracle-5.jpg"
import miracle6 from "@/assets/miracle-6.jpg"
import testimonial1 from "@/assets/testimonial-1.jpg"
import testimonial2 from "@/assets/testimonial-2.jpg"
import testimonial3 from "@/assets/testimonial-3.jpg"
import testimonialFamily from "@/assets/testimonial-family.jpg"
import heroFamily from "@/assets/hero-family.jpg"

const DEFAULTS = {
  heading: "Moments That Matter",
  heading_color: "#E6007E",
  quote: "Where hope quietly becomes reality.",
  paragraph_1: "Stories of care, courage, and new beginnings — captured from journeys to parenthood.",
  paragraph_2: "",
  images: [] as { url: string; alt: string }[],
}

type Card = {
  src: string
  alt: string
  // Position as percentage of canvas
  top: string
  left: string
  // Size in pixels (desktop)
  w: number
  h: number
  rotate: number
  z: number
  // Parallax intensity
  depth: number
  delay: number
}

// Tight editorial collage tuned for 100% desktop zoom (~1180px container).
// Cards are pulled closer to the hero with intentional overlap.
const CARDS: Card[] = [
  // Left column — closer to center
  { src: miracle1, alt: "Newborn moment", top: "8%",  left: "8%",  w: 98,  h: 124, rotate: -4, z: 2, depth: 18, delay: 0.05 },
  { src: testimonial1, alt: "Mother and baby", top: "42%", left: "6%",  w: 116, h: 116, rotate: 3,  z: 3, depth: 30, delay: 0.12 },
  { src: miracle4, alt: "Family smile", top: "70%", left: "10%", w: 104, h: 132, rotate: -2, z: 2, depth: 24, delay: 0.18 },

  // Inner-left — overlap hero edge
  { src: testimonial2, alt: "Happy parents", top: "18%", left: "24%", w: 88,  h: 88,  rotate: 5,  z: 4, depth: 42, delay: 0.22 },
  { src: miracle2, alt: "First hold",  top: "62%", left: "26%", w: 94,  h: 116, rotate: -3, z: 3, depth: 36, delay: 0.28 },

  // Inner-right — overlap hero edge
  { src: miracle5, alt: "Joyful family", top: "16%", left: "67%", w: 94,  h: 116, rotate: -5, z: 4, depth: 40, delay: 0.24 },
  { src: testimonial3, alt: "Doctor and patient", top: "60%", left: "68%", w: 98,  h: 98,  rotate: 4,  z: 3, depth: 34, delay: 0.3 },

  // Right column — closer to center
  { src: testimonialFamily, alt: "Family together", top: "10%", left: "82%", w: 104, h: 128, rotate: 3,  z: 2, depth: 22, delay: 0.1 },
  { src: miracle3, alt: "Tiny hand",    top: "44%", left: "85%", w: 100, h: 100, rotate: -2, z: 3, depth: 28, delay: 0.16 },
  { src: miracle6, alt: "Baby joy",     top: "72%", left: "81%", w: 104, h: 132, rotate: 2,  z: 2, depth: 22, delay: 0.2 },
]

const FALLBACKS = [
  heroFamily, miracle1, testimonial1, miracle4, testimonial2, miracle2,
  miracle5, testimonial3, testimonialFamily, miracle3, miracle6,
]

function FloatingCard({
  card,
  scrollY,
  src,
}: {
  card: Card
  scrollY: ReturnType<typeof useScroll>["scrollYProgress"]
  src: string
}) {
  const y = useTransform(scrollY, [0, 1], [card.depth, -card.depth])

  return (
    <motion.div
      className="absolute hidden md:block"
      style={{
        top: card.top,
        left: card.left,
        width: card.w,
        height: card.h,
        zIndex: card.z,
        y,
      }}
      initial={{ opacity: 0, y: 40, scale: 0.9, rotate: card.rotate }}
      whileInView={{ opacity: 1, scale: 1, rotate: card.rotate }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay: card.delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{
          duration: 9 + (card.delay * 10),
          repeat: Infinity,
          ease: "easeInOut",
          delay: card.delay,
        }}
        whileHover={{ scale: 1.04, rotate: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }}
        className="relative w-full h-full group cursor-pointer"
        style={{ willChange: "transform" }}
      >
        {/* Soft glow */}
        <div
          aria-hidden
          className="absolute -inset-3 rounded-[28px] blur-2xl opacity-60 group-hover:opacity-90 transition-opacity duration-500"
          style={{
            background:
              "radial-gradient(circle, rgba(230,0,126,0.25), rgba(167,139,250,0.18) 50%, transparent 75%)",
          }}
        />
        <div
          className="relative w-full h-full rounded-[24px] overflow-hidden border border-white/70"
          style={{
            boxShadow:
              "0 20px 50px -20px rgba(230,0,126,0.30), 0 8px 24px -10px rgba(167,139,250,0.25), inset 0 1px 0 rgba(255,255,255,0.6)",
          }}
        >
          <img
            src={src}
            alt={card.alt}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
      </motion.div>
    </motion.div>
  )
}

export function WhoWeAre() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const cms = useHomepageSection("who_we_are", DEFAULTS)
  const cmsImgs = cms.images || []
  const heroSrc = cmsImgs[0]?.url || heroFamily
  const heroAlt = cmsImgs[0]?.alt || "A moment of hope"

  const getSrc = (i: number) => cmsImgs[i + 1]?.url || FALLBACKS[i] || CARDS[i].src

  // Subtle hero parallax
  const heroY = useTransform(scrollYProgress, [0, 1], [-20, 20])
  const heroScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.02, 1, 1.02])

  const [hovered, setHovered] = useState(false)

  return (
    <section
      id="about"
      ref={ref}
      className="relative py-16 lg:py-24 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #fff 0%, #fff7fb 10%, #fdf4ff 50%, #fff5ee 90%, #fff 100%)",
      }}
    >
      {/* Fades */}
      <div aria-hidden className="absolute top-0 inset-x-0 h-32 pointer-events-none"
        style={{ background: "linear-gradient(180deg, rgba(255,255,255,1), rgba(255,255,255,0))" }} />
      <div aria-hidden className="absolute bottom-0 inset-x-0 h-32 pointer-events-none"
        style={{ background: "linear-gradient(0deg, rgba(255,255,255,1), rgba(255,255,255,0))" }} />

      {/* Ambient blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <MorphingBlob color="#E6007E" size={620} opacity={0.08} duration={32} driftX={-40} driftY={30} style={{ top: "-180px", right: "-200px" }} />
        <MorphingBlob color="#A78BFA" size={540} opacity={0.10} duration={38} delay={-12} driftX={50} driftY={-40} style={{ bottom: "-180px", left: "-160px" }} />
        <MorphingBlob color="#FDBA74" size={420} opacity={0.07} duration={42} delay={-20} driftX={-30} driftY={50} style={{ top: "45%", left: "50%" }} />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {Array.from({ length: 14 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: 3 + (i % 3) * 2,
              height: 3 + (i % 3) * 2,
              background: i % 2 ? "rgba(230,0,126,0.45)" : "rgba(167,139,250,0.45)",
              boxShadow: i % 2 ? "0 0 12px rgba(230,0,126,0.55)" : "0 0 12px rgba(167,139,250,0.55)",
              top: `${5 + i * 6.5}%`,
              left: `${4 + ((i * 11) % 92)}%`,
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0.15, 0.7, 0.15],
            }}
            transition={{ duration: 6 + (i % 5), repeat: Infinity, delay: i * 0.35, ease: "easeInOut" }}
          />
        ))}
      </div>

      <div className="max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header — minimal */}
        <div className="text-center max-w-2xl mx-auto mb-10 lg:mb-14 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-pink-100 mb-5 shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5" style={{ color: cms.heading_color }} />
            <span className="text-[11px] font-semibold tracking-[0.2em] uppercase" style={{ color: cms.heading_color }}>
              Our Story Wall
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-[2rem] lg:text-[3rem] leading-[1.05] font-bold tracking-tight"
            style={{
              backgroundImage: "linear-gradient(135deg, #E6007E 0%, #C2006A 40%, #A78BFA 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {cms.heading}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 font-serif italic text-base lg:text-lg text-muted-foreground leading-snug"
          >
            &ldquo;{cms.quote}&rdquo;
          </motion.p>
        </div>

        {/* Floating collage canvas */}
        <div className="relative w-full mx-auto" style={{ height: "clamp(480px, 44vw, 540px)" }}>
          {/* Decorative center halo */}
          <div
            aria-hidden
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl pointer-events-none"
            style={{
              width: "min(620px, 60%)",
              height: "min(620px, 60%)",
              background:
                "radial-gradient(circle, rgba(230,0,126,0.18), rgba(167,139,250,0.12) 45%, transparent 70%)",
            }}
          />

          {/* HERO center card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            onHoverStart={() => setHovered(true)}
            onHoverEnd={() => setHovered(false)}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
            style={{
              width: "min(340px, 70%)",
              height: "clamp(320px, 36vw, 420px)",
            }}
          >
            <motion.div style={{ y: heroY, scale: heroScale }} className="relative w-full h-full">
              {/* Glow */}
              <div
                aria-hidden
                className="absolute -inset-6 rounded-[40px] blur-3xl"
                style={{
                  background:
                    "radial-gradient(circle, rgba(230,0,126,0.35), rgba(167,139,250,0.22) 50%, transparent 75%)",
                  opacity: hovered ? 1 : 0.75,
                  transition: "opacity 600ms ease",
                }}
              />
              <div
                className="relative w-full h-full rounded-[32px] overflow-hidden border border-white/70 group"
                style={{
                  boxShadow:
                    "0 40px 90px -30px rgba(230,0,126,0.45), 0 20px 50px -15px rgba(167,139,250,0.35), inset 0 1px 0 rgba(255,255,255,0.6)",
                }}
              >
                <img
                  src={heroSrc}
                  alt={heroAlt}
                  loading="eager"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1400ms] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                {/* Glass caption */}
                <div className="absolute bottom-5 left-5 right-5">
                  <div
                    className="rounded-2xl px-5 py-4 border border-white/30"
                    style={{
                      background: "rgba(255,255,255,0.16)",
                      WebkitBackdropFilter: "blur(14px)",
                      backdropFilter: "blur(14px)",
                    }}
                  >
                    <div className="flex items-center gap-2 text-white/90 text-[10px] uppercase tracking-[0.3em] mb-1">
                      <Heart className="w-3 h-3 fill-white" />
                      A new beginning
                    </div>
                    <div className="font-serif text-white text-xl lg:text-2xl leading-snug">
                      Every journey holds hope.
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Floating cards (desktop) */}
          {CARDS.map((c, i) => (
            <FloatingCard key={i} card={c} scrollY={scrollYProgress} src={getSrc(i)} />
          ))}

          {/* Mobile elegant stack */}
          <div className="md:hidden absolute inset-0 flex flex-col items-center justify-start pt-[60%] gap-5 px-2">
            {[0, 1, 2, 3].map((i) => {
              const c = CARDS[i]
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30, rotate: i % 2 ? -2 : 2 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="w-[78%] aspect-[4/5] rounded-[24px] overflow-hidden border border-white/70"
                  style={{
                    transform: `rotate(${i % 2 ? -2 : 2}deg)`,
                    boxShadow: "0 20px 50px -20px rgba(230,0,126,0.30)",
                    marginLeft: i % 2 ? "-15%" : "15%",
                  }}
                >
                  <img src={getSrc(i)} alt={c.alt} loading="lazy" className="w-full h-full object-cover" />
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Bottom subtext + CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 lg:mt-14 text-center max-w-xl mx-auto relative z-10"
        >
          {cms.paragraph_1 && (
            <p className="text-base lg:text-lg text-muted-foreground leading-relaxed mb-7">
              {cms.paragraph_1}
            </p>
          )}
          <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.98 }} className="inline-block">
            <Link
              to="/success-stories"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-white text-sm font-semibold group"
              style={{
                background: "linear-gradient(135deg, #E6007E, #C2006A)",
                boxShadow: "0 14px 36px -10px rgba(230,0,126,0.55)",
              }}
            >
              Explore Stories
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
