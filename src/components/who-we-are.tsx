import { motion, useScroll, useTransform } from "framer-motion"
import { useRef, useState, type CSSProperties } from "react"
import { ArrowRight, Heart, Quote } from "lucide-react"
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

// ─────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────
export type GalleryCardType = "image" | "video" | "testimonial" | "quote"
export type GalleryCardSize = "hero" | "medium" | "small" | "portrait" | "landscape"
export type GalleryCardPosition =
  | "top-left"
  | "center-left"
  | "center"
  | "right-top"
  | "floating-right"
  | "bottom-left"
  | "bottom-right"
  | "auto"

export type GalleryItem = {
  enabled?: boolean
  type?: GalleryCardType
  url?: string
  thumbnail?: string
  alt?: string
  caption?: string
  overlay_kicker?: string
  overlay_text?: string
  size?: GalleryCardSize
  position?: GalleryCardPosition
  glow_color?: string
  overlay_opacity?: number // 0-100
  // video
  autoplay?: boolean
  muted?: boolean
  loop?: boolean
  // quote / testimonial
  quote?: string
  author?: string
  // rotation (-8..8)
  rotate?: number
}

export type StorytellingGalleryCMS = {
  enabled: boolean
  heading: string
  heading_color: string
  subtitle: string
  subtitle_color: string
  gradient_enabled: boolean
  gradient_from: string
  gradient_to: string
  glow_color: string
  glow_intensity: number // 0-100
  background_style: "soft" | "cream" | "white" | "dark"
  cta_text: string
  cta_url: string
  section_spacing: number // px
  card_radius: number // px
  floating_enabled: boolean
  animation_speed: number // 0.5..2 — lower is faster
  hover_style: "lift" | "tilt" | "zoom" | "none"
  items: GalleryItem[]
}

// ─────────────────────────────────────────────────────────
// Defaults — ship a beautiful section even with no CMS data
// ─────────────────────────────────────────────────────────
const DEFAULT_ITEMS: GalleryItem[] = [
  { type: "image", url: heroFamily,        alt: "A moment of hope",      size: "hero",      position: "center",         overlay_kicker: "A new beginning", overlay_text: "Every journey holds hope.", glow_color: "#E6007E", overlay_opacity: 55 },
  { type: "image", url: miracle1,          alt: "Newborn moment",        size: "portrait",  position: "top-left",       glow_color: "#E6007E", rotate: -4 },
  { type: "image", url: testimonial1,      alt: "Mother and baby",       size: "small",     position: "center-left",    glow_color: "#A78BFA", rotate: 3 },
  { type: "image", url: miracle4,          alt: "Family smile",          size: "portrait",  position: "bottom-left",    glow_color: "#E6007E", rotate: -2 },
  { type: "image", url: miracle5,          alt: "Joyful family",         size: "medium",    position: "right-top",      glow_color: "#A78BFA", rotate: -5 },
  { type: "image", url: testimonial3,      alt: "Doctor and patient",    size: "small",     position: "floating-right", glow_color: "#FDBA74", rotate: 4 },
  { type: "image", url: miracle6,          alt: "Baby joy",              size: "portrait",  position: "bottom-right",   glow_color: "#E6007E", rotate: 2 },
  { type: "image", url: testimonialFamily, alt: "Family together",       size: "auto",     position: "auto",           glow_color: "#A78BFA", rotate: 3 },
  { type: "image", url: miracle3,          alt: "Tiny hand",             size: "auto",     position: "auto",           glow_color: "#FDBA74", rotate: -2 },
  { type: "image", url: testimonial2,      alt: "Happy parents",         size: "auto",     position: "auto",           glow_color: "#E6007E", rotate: 5 },
  { type: "image", url: miracle2,          alt: "First hold",            size: "auto",     position: "auto",           glow_color: "#A78BFA", rotate: -3 },
]

const DEFAULTS: StorytellingGalleryCMS = {
  enabled: true,
  heading: "Moments That Matter",
  heading_color: "#E6007E",
  subtitle: "Where hope quietly becomes reality.",
  subtitle_color: "",
  gradient_enabled: true,
  gradient_from: "#E6007E",
  gradient_to: "#A78BFA",
  glow_color: "#E6007E",
  glow_intensity: 60,
  background_style: "soft",
  cta_text: "Explore Stories",
  cta_url: "/success-stories",
  section_spacing: 80,
  card_radius: 24,
  floating_enabled: true,
  animation_speed: 1,
  hover_style: "lift",
  items: DEFAULT_ITEMS,
}

// ─────────────────────────────────────────────────────────
// Mapping helpers
// ─────────────────────────────────────────────────────────
const SIZE_MAP: Record<GalleryCardSize, { w: number; h: number }> = {
  hero:      { w: 290, h: 360 },
  medium:    { w: 116, h: 140 },
  small:     { w: 94,  h: 94 },
  portrait:  { w: 100, h: 130 },
  landscape: { w: 140, h: 100 },
}

const POSITION_MAP: Record<Exclude<GalleryCardPosition, "auto">, { top: string; left: string }> = {
  "top-left":       { top: "8%",  left: "8%" },
  "center-left":    { top: "42%", left: "6%" },
  "bottom-left":    { top: "70%", left: "10%" },
  "right-top":      { top: "10%", left: "82%" },
  "floating-right": { top: "44%", left: "85%" },
  "bottom-right":   { top: "72%", left: "81%" },
  "center":         { top: "50%", left: "50%" },
}

const AUTO_SLOTS: { top: string; left: string }[] = [
  { top: "18%", left: "24%" },
  { top: "62%", left: "26%" },
  { top: "16%", left: "67%" },
  { top: "60%", left: "68%" },
  { top: "30%", left: "14%" },
  { top: "80%", left: "60%" },
]

const BG_MAP: Record<StorytellingGalleryCMS["background_style"], string> = {
  soft:  "linear-gradient(180deg, #fff 0%, #fff7fb 10%, #fdf4ff 50%, #fff5ee 90%, #fff 100%)",
  cream: "linear-gradient(180deg, #fff 0%, #fffaf3 20%, #fef3e7 60%, #fff 100%)",
  white: "#ffffff",
  dark:  "linear-gradient(180deg, #0f0a14 0%, #1a1020 50%, #0f0a14 100%)",
}

// ─────────────────────────────────────────────────────────
// Single floating card
// ─────────────────────────────────────────────────────────
function FloatingCard({
  item,
  index,
  scrollY,
  cms,
}: {
  item: GalleryItem
  index: number
  scrollY: ReturnType<typeof useScroll>["scrollYProgress"]
  cms: StorytellingGalleryCMS
}) {
  const isHero = item.size === "hero" || item.position === "center"
  if (isHero) return null // hero is rendered separately

  const size = SIZE_MAP[item.size && item.size !== "hero" ? item.size : "medium"]
  let pos: { top: string; left: string }
  if (!item.position || item.position === "auto") {
    pos = AUTO_SLOTS[index % AUTO_SLOTS.length]
  } else {
    pos = POSITION_MAP[item.position]
  }

  const depth = 24 + (index % 4) * 6
  const delay = 0.05 + (index % 7) * 0.04
  const rotate = item.rotate ?? (index % 2 === 0 ? -3 : 3)
  const glow = item.glow_color || cms.glow_color || "#E6007E"
  const overlayOpacity = (item.overlay_opacity ?? 0) / 100
  const radius = cms.card_radius
  const speedMult = Math.max(0.4, cms.animation_speed || 1)

  const y = useTransform(scrollY, [0, 1], [depth, -depth])

  const hoverProps =
    cms.hover_style === "none"
      ? {}
      : cms.hover_style === "tilt"
      ? { rotate: 0 }
      : cms.hover_style === "zoom"
      ? { scale: 1.06 }
      : { scale: 1.04, y: -4 }

  return (
    <motion.div
      className="absolute hidden md:block"
      style={{ top: pos.top, left: pos.left, width: size.w, height: size.h, zIndex: 2 + (index % 3), y }}
      initial={{ opacity: 0, y: 40, scale: 0.9, rotate }}
      whileInView={{ opacity: 1, scale: 1, rotate }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9 * speedMult, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        animate={cms.floating_enabled ? { y: [0, -6, 0] } : undefined}
        transition={{ duration: (8 + (index % 4)) * speedMult, repeat: Infinity, ease: "easeInOut", delay }}
        whileHover={{ ...hoverProps, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }}
        className="relative w-full h-full group cursor-pointer"
        style={{ willChange: "transform" }}
      >
        {/* Glow */}
        <div
          aria-hidden
          className="absolute -inset-3 blur-2xl opacity-60 group-hover:opacity-90 transition-opacity duration-500"
          style={{
            borderRadius: radius + 8,
            background: `radial-gradient(circle, ${glow}55, ${glow}22 55%, transparent 78%)`,
          }}
        />
        <div
          className="relative w-full h-full overflow-hidden border border-white/70"
          style={{
            borderRadius: radius,
            boxShadow: `0 20px 50px -20px ${glow}55, 0 8px 24px -10px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.6)`,
          }}
        >
          <CardMedia item={item} />
          {overlayOpacity > 0 && (
            <div className="absolute inset-0" style={{ background: `rgba(0,0,0,${overlayOpacity})` }} />
          )}
          {(item.caption || item.overlay_text) && (
            <div className="absolute bottom-2 left-2 right-2 text-white text-[11px] font-medium drop-shadow">
              {item.overlay_text || item.caption}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

// ─────────────────────────────────────────────────────────
// Card content based on type
// ─────────────────────────────────────────────────────────
function CardMedia({ item }: { item: GalleryItem }) {
  const type = item.type || "image"

  if (type === "video" && item.url) {
    return (
      <video
        src={item.url}
        poster={item.thumbnail}
        autoPlay={item.autoplay ?? true}
        muted={item.muted ?? true}
        loop={item.loop ?? true}
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />
    )
  }

  if (type === "quote" || type === "testimonial") {
    return (
      <div
        className="absolute inset-0 flex flex-col justify-between p-3"
        style={{ background: "linear-gradient(135deg, #fff, #fff7fb)" }}
      >
        <Quote className="w-4 h-4 text-rose-500" />
        <div className="font-serif italic text-[12px] leading-snug text-gray-800 line-clamp-4">
          &ldquo;{item.quote || item.caption || ""}&rdquo;
        </div>
        {item.author && (
          <div className="text-[10px] uppercase tracking-wider text-gray-500">— {item.author}</div>
        )}
      </div>
    )
  }

  return (
    <img
      src={item.url || item.thumbnail || ""}
      alt={item.alt || item.caption || ""}
      loading="lazy"
      className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-110"
    />
  )
}

// ─────────────────────────────────────────────────────────
// Main section
// ─────────────────────────────────────────────────────────
export function WhoWeAre() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const cms = useHomepageSection<StorytellingGalleryCMS>("who_we_are", DEFAULTS)

  if (cms.enabled === false) return null

  const items = (cms.items && cms.items.length > 0 ? cms.items : DEFAULT_ITEMS).filter((i) => i.enabled !== false)
  const hero = items.find((i) => i.size === "hero" || i.position === "center") || items[0]
  const others = items.filter((i) => i !== hero)

  // Heading style
  const headingStyle: CSSProperties = cms.gradient_enabled
    ? {
        backgroundImage: `linear-gradient(135deg, ${cms.gradient_from} 0%, ${cms.gradient_to} 100%)`,
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        WebkitTextFillColor: "transparent",
      }
    : { color: cms.heading_color }

  const heroY = useTransform(scrollYProgress, [0, 1], [-20, 20])
  const heroScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.02, 1, 1.02])
  const [hovered, setHovered] = useState(false)

  const py = cms.section_spacing || 80
  const heroGlow = cms.glow_color || "#E6007E"
  const glowAlpha = Math.min(100, Math.max(0, cms.glow_intensity ?? 60)) / 100
  const isDark = cms.background_style === "dark"

  return (
    <section
      id="about"
      ref={ref}
      className="relative overflow-hidden"
      style={{ background: BG_MAP[cms.background_style] || BG_MAP.soft, paddingTop: py, paddingBottom: py }}
    >
      {/* Top/bottom fades */}
      {!isDark && (
        <>
          <div aria-hidden className="absolute top-0 inset-x-0 h-32 pointer-events-none"
            style={{ background: "linear-gradient(180deg, rgba(255,255,255,1), rgba(255,255,255,0))" }} />
          <div aria-hidden className="absolute bottom-0 inset-x-0 h-32 pointer-events-none"
            style={{ background: "linear-gradient(0deg, rgba(255,255,255,1), rgba(255,255,255,0))" }} />
        </>
      )}

      {/* Ambient blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <MorphingBlob color={cms.gradient_from} size={620} opacity={0.08} duration={32} driftX={-40} driftY={30} style={{ top: "-180px", right: "-200px" }} />
        <MorphingBlob color={cms.gradient_to}   size={540} opacity={0.10} duration={38} delay={-12} driftX={50} driftY={-40} style={{ bottom: "-180px", left: "-160px" }} />
      </div>

      <div className="max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-4 lg:mb-6 relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-[2rem] lg:text-[3rem] leading-[1.05] font-bold tracking-tight"
            style={headingStyle}
          >
            {cms.heading}
          </motion.h2>
          {cms.subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="mt-3 font-serif italic text-base lg:text-lg leading-snug"
              style={{ color: cms.subtitle_color || (isDark ? "rgba(255,255,255,0.75)" : undefined) }}
            >
              &ldquo;{cms.subtitle}&rdquo;
            </motion.p>
          )}
        </div>

        {/* Floating collage canvas */}
        <div className="relative w-full mx-auto" style={{ height: "clamp(480px, 44vw, 540px)" }}>
          {/* Center halo */}
          <div
            aria-hidden
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl pointer-events-none"
            style={{
              width: "min(620px, 60%)",
              height: "min(620px, 60%)",
              background: `radial-gradient(circle, ${heroGlow}${Math.round(glowAlpha * 40).toString(16).padStart(2, "0")}, transparent 70%)`,
            }}
          />

          {/* HERO center card */}
          {hero && (
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              onHoverStart={() => setHovered(true)}
              onHoverEnd={() => setHovered(false)}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
              style={{ width: "min(290px, 62%)", height: "clamp(260px, 30vw, 360px)" }}
            >
              <motion.div style={{ y: heroY, scale: heroScale }} className="relative w-full h-full">
                <div
                  aria-hidden
                  className="absolute -inset-4 blur-3xl"
                  style={{
                    borderRadius: cms.card_radius + 12,
                    background: `radial-gradient(circle, ${heroGlow}${Math.round(glowAlpha * 55).toString(16).padStart(2, "0")}, transparent 78%)`,
                    opacity: hovered ? 0.9 : 0.6,
                    transition: "opacity 600ms ease",
                  }}
                />
                <div
                  className="relative w-full h-full overflow-hidden border border-white/70 group"
                  style={{
                    borderRadius: cms.card_radius + 8,
                    boxShadow: `0 40px 90px -30px ${heroGlow}73, 0 20px 50px -15px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.6)`,
                  }}
                >
                  <CardMedia item={hero} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                  {(hero.overlay_kicker || hero.overlay_text) && (
                    <div className="absolute bottom-5 left-5 right-5">
                      <div
                        className="rounded-2xl px-5 py-4 border border-white/30"
                        style={{ background: "rgba(255,255,255,0.16)", WebkitBackdropFilter: "blur(14px)", backdropFilter: "blur(14px)" }}
                      >
                        {hero.overlay_kicker && (
                          <div className="flex items-center gap-2 text-white/90 text-[10px] uppercase tracking-[0.3em] mb-1">
                            <Heart className="w-3 h-3 fill-white" />
                            {hero.overlay_kicker}
                          </div>
                        )}
                        {hero.overlay_text && (
                          <div className="font-serif text-white text-xl lg:text-2xl leading-snug">
                            {hero.overlay_text}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Floating cards (desktop) */}
          {others.map((item, i) => (
            <FloatingCard key={i} item={item} index={i} scrollY={scrollYProgress} cms={cms} />
          ))}

          {/* Mobile stack */}
          <div className="md:hidden absolute inset-0 flex flex-col items-center justify-start pt-[60%] gap-5 px-2">
            {others.slice(0, 4).map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30, rotate: i % 2 ? -2 : 2 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="w-[78%] aspect-[4/5] overflow-hidden border border-white/70 relative"
                style={{
                  borderRadius: cms.card_radius,
                  transform: `rotate(${i % 2 ? -2 : 2}deg)`,
                  boxShadow: `0 20px 50px -20px ${item.glow_color || heroGlow}55`,
                  marginLeft: i % 2 ? "-15%" : "15%",
                }}
              >
                <CardMedia item={item} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        {cms.cta_text && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 lg:mt-14 text-center max-w-xl mx-auto relative z-10"
          >
            <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.98 }} className="inline-block">
              <a
                href={cms.cta_url || "#"}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-white text-sm font-semibold group"
                style={{
                  background: `linear-gradient(135deg, ${cms.gradient_from}, ${cms.gradient_to})`,
                  boxShadow: `0 14px 36px -10px ${cms.gradient_from}8c`,
                }}
              >
                {cms.cta_text}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
