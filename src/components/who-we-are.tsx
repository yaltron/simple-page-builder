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

export type SlotKey =
  | "center_hero"
  | "left_card_1"
  | "left_card_2"
  | "right_card_1"
  | "right_card_2"
  | "far_left_floating_1"
  | "far_left_floating_2"
  | "far_left_floating_3"
  | "far_right_floating_1"
  | "far_right_floating_2"
  | "far_right_floating_3"

export type GalleryItem = {
  enabled?: boolean
  type?: GalleryCardType
  url?: string
  thumbnail?: string
  alt?: string
  caption?: string
  overlay_kicker?: string
  overlay_text?: string
  glow_color?: string
  overlay_opacity?: number // 0-100
  autoplay?: boolean
  muted?: boolean
  loop?: boolean
  quote?: string
  author?: string
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
  glow_intensity: number
  background_style: "soft" | "cream" | "white" | "dark"
  cta_text: string
  cta_url: string
  section_spacing: number
  card_radius: number
  floating_enabled: boolean
  animation_speed: number
  hover_style: "lift" | "tilt" | "zoom" | "none"
  slots: Partial<Record<SlotKey, GalleryItem>>
}

// ─────────────────────────────────────────────────────────
// Slot configuration — fixed layout positions
// ─────────────────────────────────────────────────────────
type SlotConfig = {
  key: SlotKey
  label: string
  top: string
  left: string
  width: number
  height: number
  defaultGlow: string
  defaultRotate: number
}

export const SLOT_CONFIG: SlotConfig[] = [
  { key: "center_hero",          label: "Center Hero Image",   top: "50%", left: "50%", width: 290, height: 360, defaultGlow: "#E6007E", defaultRotate: 0 },
  { key: "left_card_1",          label: "Left Card 1",         top: "10%", left: "20%", width: 110, height: 140, defaultGlow: "#E6007E", defaultRotate: -4 },
  { key: "left_card_2",          label: "Left Card 2",         top: "68%", left: "22%", width: 110, height: 140, defaultGlow: "#A78BFA", defaultRotate: 3 },
  { key: "right_card_1",         label: "Right Card 1",        top: "12%", left: "70%", width: 120, height: 100, defaultGlow: "#A78BFA", defaultRotate: -3 },
  { key: "right_card_2",         label: "Right Card 2",        top: "68%", left: "72%", width: 110, height: 140, defaultGlow: "#E6007E", defaultRotate: 4 },
  { key: "far_left_floating_1",  label: "Far Left Floating 1", top: "4%",  left: "3%",  width: 94,  height: 94,  defaultGlow: "#FDBA74", defaultRotate: -5 },
  { key: "far_left_floating_2",  label: "Far Left Floating 2", top: "44%", left: "1%",  width: 94,  height: 94,  defaultGlow: "#A78BFA", defaultRotate: 5 },
  { key: "far_left_floating_3",  label: "Far Left Floating 3", top: "84%", left: "5%",  width: 94,  height: 94,  defaultGlow: "#E6007E", defaultRotate: -3 },
  { key: "far_right_floating_1", label: "Far Right Floating 1", top: "6%",  left: "88%", width: 94,  height: 94,  defaultGlow: "#A78BFA", defaultRotate: 4 },
  { key: "far_right_floating_2", label: "Far Right Floating 2", top: "46%", left: "92%", width: 94,  height: 94,  defaultGlow: "#FDBA74", defaultRotate: -4 },
  { key: "far_right_floating_3", label: "Far Right Floating 3", top: "84%", left: "88%", width: 94,  height: 94,  defaultGlow: "#E6007E", defaultRotate: 3 },
]

// ─────────────────────────────────────────────────────────
// Defaults — populate slots with sample content
// ─────────────────────────────────────────────────────────
const DEFAULT_SLOTS: Record<SlotKey, GalleryItem> = {
  center_hero:          { type: "image", url: heroFamily,        alt: "A moment of hope",   overlay_kicker: "A new beginning", overlay_text: "Every journey holds hope.", overlay_opacity: 0 },
  left_card_1:          { type: "image", url: miracle1,          alt: "Newborn moment" },
  left_card_2:          { type: "image", url: miracle4,          alt: "Family smile" },
  right_card_1:         { type: "image", url: miracle5,          alt: "Joyful family" },
  right_card_2:         { type: "image", url: miracle6,          alt: "Baby joy" },
  far_left_floating_1:  { type: "image", url: testimonial1,      alt: "Mother and baby" },
  far_left_floating_2:  { type: "image", url: testimonial2,      alt: "Happy parents" },
  far_left_floating_3:  { type: "image", url: miracle3,          alt: "Tiny hand" },
  far_right_floating_1: { type: "image", url: testimonial3,      alt: "Doctor and patient" },
  far_right_floating_2: { type: "image", url: testimonialFamily, alt: "Family together" },
  far_right_floating_3: { type: "image", url: miracle2,          alt: "First hold" },
}

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
  slots: DEFAULT_SLOTS,
}

const BG_MAP: Record<StorytellingGalleryCMS["background_style"], string> = {
  soft:  "linear-gradient(180deg, #fff 0%, #fff7fb 10%, #fdf4ff 50%, #fff5ee 90%, #fff 100%)",
  cream: "linear-gradient(180deg, #fff 0%, #fffaf3 20%, #fef3e7 60%, #fff 100%)",
  white: "#ffffff",
  dark:  "linear-gradient(180deg, #0f0a14 0%, #1a1020 50%, #0f0a14 100%)",
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
// Floating slot card
// ─────────────────────────────────────────────────────────
function SlotCard({
  config,
  item,
  index,
  scrollY,
  cms,
}: {
  config: SlotConfig
  item: GalleryItem
  index: number
  scrollY: ReturnType<typeof useScroll>["scrollYProgress"]
  cms: StorytellingGalleryCMS
}) {
  const depth = 18 + (index % 4) * 5
  const delay = 0.05 + (index % 7) * 0.04
  const rotate = item.rotate ?? config.defaultRotate
  const glow = item.glow_color || config.defaultGlow || cms.glow_color
  const overlayOpacity = (item.overlay_opacity ?? 0) / 100
  const radius = cms.card_radius
  const speedMult = Math.max(0.4, cms.animation_speed || 1)

  const y = useTransform(scrollY, [0, 1], [depth, -depth])

  const hoverProps =
    cms.hover_style === "none" ? {} :
    cms.hover_style === "tilt" ? { rotate: 0 } :
    cms.hover_style === "zoom" ? { scale: 1.06 } :
    { scale: 1.04, y: -4 }

  return (
    <motion.div
      className="absolute hidden md:block -translate-x-1/2 -translate-y-1/2"
      style={{ top: config.top, left: config.left, width: config.width, height: config.height, zIndex: 2 + (index % 3), y }}
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
// Main section
// ─────────────────────────────────────────────────────────
export function WhoWeAre() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const cms = useHomepageSection<StorytellingGalleryCMS>("who_we_are", DEFAULTS)

  if (cms.enabled === false) return null

  const slots = cms.slots || {}
  const heroCfg = SLOT_CONFIG[0]
  const hero = slots[heroCfg.key] ?? DEFAULT_SLOTS.center_hero
  const others = SLOT_CONFIG.slice(1)

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
  const heroGlow = hero.glow_color || cms.glow_color || "#E6007E"
  const glowAlpha = Math.min(100, Math.max(0, cms.glow_intensity ?? 60)) / 100
  const isDark = cms.background_style === "dark"

  return (
    <section
      id="about"
      ref={ref}
      className="relative overflow-hidden py-12 sm:py-16 md:py-20"
      style={{ background: BG_MAP[cms.background_style] || BG_MAP.soft, ['--section-py' as never]: `${py}px` }}
    >
      {!isDark && (
        <>
          <div aria-hidden className="absolute top-0 inset-x-0 h-32 pointer-events-none"
            style={{ background: "linear-gradient(180deg, rgba(255,255,255,1), rgba(255,255,255,0))" }} />
          <div aria-hidden className="absolute bottom-0 inset-x-0 h-32 pointer-events-none"
            style={{ background: "linear-gradient(0deg, rgba(255,255,255,1), rgba(255,255,255,0))" }} />
        </>
      )}

      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <MorphingBlob color={cms.gradient_from} size={620} opacity={0.08} duration={32} driftX={-40} driftY={30} style={{ top: "-180px", right: "-200px" }} />
        <MorphingBlob color={cms.gradient_to}   size={540} opacity={0.10} duration={38} delay={-12} driftX={50} driftY={-40} style={{ bottom: "-180px", left: "-160px" }} />
      </div>

      <div className="relative">
        {/* Two-column split — stacks text-first on mobile */}
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-10 md:gap-[60px] px-4 sm:px-6 md:px-[8%] py-12 md:py-[70px] md:min-h-[540px]">
          {/* LEFT 55% — Floating image collage */}
          <motion.div
            initial={{ x: -40, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="w-full md:w-[55%] relative"
          >
            <div className="relative w-full" style={{ height: "clamp(420px, 44vw, 540px)" }}>
              <div
                aria-hidden
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl pointer-events-none"
                style={{
                  width: "min(620px, 60%)",
                  height: "min(620px, 60%)",
                  background: `radial-gradient(circle, ${heroGlow}${Math.round(glowAlpha * 40).toString(16).padStart(2, "0")}, transparent 70%)`,
                }}
              />

              {hero && hero.enabled !== false && (
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

              {others.map((cfg, i) => {
                const item = slots[cfg.key]
                if (!item || item.enabled === false) return null
                if (!item.url && item.type !== "quote" && item.type !== "testimonial") return null
                return <SlotCard key={cfg.key} config={cfg} item={item} index={i} scrollY={scrollYProgress} cms={cms} />
              })}
            </div>
          </motion.div>

          {/* RIGHT 45% — Text content */}
          <motion.div
            initial={{ x: 40, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="w-full md:w-[45%] flex flex-col justify-center items-start"
          >
            <h2
              className="font-serif italic font-bold"
              style={{
                ...headingStyle,
                fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
                lineHeight: 1.3,
                marginBottom: 20,
              }}
            >
              &ldquo;{cms.heading}&rdquo;
            </h2>
            {cms.subtitle && (
              <p
                className="font-serif italic"
                style={{
                  fontSize: 17,
                  color: "#7A2050",
                  lineHeight: 1.7,
                  paddingLeft: 18,
                  borderLeft: "3px solid #E6007E",
                  marginBottom: 32,
                }}
              >
                {cms.subtitle}
              </p>
            )}
            {cms.cta_text && (
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
            )}
          </motion.div>
        </div>

      </div>

    </section>
  )
}
