import { motion } from "framer-motion"
import { useRef, type CSSProperties } from "react"
import { Quote } from "lucide-react"
import { MorphingBlob } from "@/components/morphing-blob"
import { useHomepageSection } from "@/lib/use-cms-content"
import { useMomentsGallery, type SpanClass } from "@/lib/use-moments-gallery"
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

export type QuoteStyle = "gradient" | "pink" | "plum" | "rose"

export type StorytellingGalleryCMS = {
  enabled: boolean
  heading: string
  heading_color: string
  subtitle: string
  subtitle_color: string
  quote_text: string
  quote_style: QuoteStyle
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
// Span class → grid placement
// ─────────────────────────────────────────────────────────
const SPAN_STYLE: Record<SpanClass, CSSProperties> = {
  normal: {},
  wide: { gridColumn: "span 2" },
  wider: { gridColumn: "span 3" },
  high: { gridRow: "span 2" },
}

// ─────────────────────────────────────────────────────────
// CMS-driven moments grid
// ─────────────────────────────────────────────────────────
function MomentsGrid({ radius }: { radius: number }) {
  const { items } = useMomentsGallery()
  if (items.length === 0) return null

  return (
    <div
      className="w-full"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(6, 1fr)",
        gridAutoRows: "minmax(110px, auto)",
        gap: 12,
      }}
    >
      {items.map((item, i) => {
        const span = (SPAN_STYLE[item.span_class] ?? {}) as CSSProperties
        const isHigh = item.span_class === "high"
        return (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: (i % 8) * 0.05, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -4, scale: 1.02 }}
            className="relative overflow-hidden group cursor-pointer border border-white/70"
            style={{
              ...span,
              borderRadius: radius,
              minHeight: isHigh ? 232 : 110,
              boxShadow:
                "0 16px 40px -20px rgba(230,0,126,0.30), 0 6px 18px -10px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.6)",
            }}
          >
            <img
              src={item.image_url}
              alt={item.image_alt || ""}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-110"
            />
          </motion.div>
        )
      })}
    </div>
  )
}

// ─────────────────────────────────────────────────────────
// Main section
// ─────────────────────────────────────────────────────────
export function WhoWeAre() {
  const ref = useRef<HTMLElement>(null)
  const cms = useHomepageSection<StorytellingGalleryCMS>("who_we_are", DEFAULTS)
  const { items: momentsItems } = useMomentsGallery()

  if (cms.enabled === false) return null

  const headingStyle: CSSProperties = cms.gradient_enabled
    ? {
        backgroundImage: `linear-gradient(135deg, ${cms.gradient_from} 0%, ${cms.gradient_to} 100%)`,
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        WebkitTextFillColor: "transparent",
      }
    : { color: cms.heading_color }

  const py = cms.section_spacing || 80
  const isDark = cms.background_style === "dark"
  const hasImages = momentsItems.length > 0

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
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-10 md:gap-[60px] px-4 sm:px-6 md:px-[8%] py-12 md:py-[70px] md:min-h-[540px]">
          {hasImages && (
            <motion.div
              initial={{ x: -40, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="w-full md:w-[60%] relative"
            >
              <MomentsGrid radius={cms.card_radius} />
            </motion.div>
          )}

          <motion.div
            initial={{ x: 40, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className={`${hasImages ? "w-full md:w-[40%]" : "w-full"} flex flex-col justify-center items-start`}
          >
            <h2
              className="font-serif italic font-bold"
              style={{
                ...headingStyle,
                fontSize: "clamp(1.6rem, 3vw, 2.6rem)",
                lineHeight: 1.3,
              }}
            >
              &ldquo;The trust you have shown in us over the years is our greatest inspiration to turn hope into reality.&rdquo;
            </h2>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

