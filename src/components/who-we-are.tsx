import { motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { Link } from "@tanstack/react-router"
import { MorphingBlob } from "@/components/morphing-blob"
import { useHomepageSection } from "@/lib/use-cms-content"
import { useMomentsGallery } from "@/lib/use-moments-gallery"

// ─────────────────────────────────────────────────────────
// CMS section settings (kept compatible with existing homepage_sections row)
// ─────────────────────────────────────────────────────────
type WhoWeAreCMS = {
  enabled?: boolean
  gradient_enabled?: boolean
  gradient_from?: string
  gradient_to?: string
  background_style?: "soft" | "cream" | "white" | "dark"
  card_radius?: number
  section_spacing?: number
}

const DEFAULTS: WhoWeAreCMS = {
  enabled: true,
  gradient_enabled: true,
  gradient_from: "#E6007E",
  gradient_to: "#A78BFA",
  background_style: "soft",
  card_radius: 16,
  section_spacing: 80,
}

const BG_MAP: Record<NonNullable<WhoWeAreCMS["background_style"]>, string> = {
  soft: "linear-gradient(180deg, #fff 0%, #fff7fb 10%, #fdf4ff 50%, #fff5ee 90%, #fff 100%)",
  cream: "linear-gradient(180deg, #fff 0%, #fffaf3 20%, #fef3e7 60%, #fff 100%)",
  white: "#ffffff",
  dark: "linear-gradient(180deg, #0f0a14 0%, #1a1020 50%, #0f0a14 100%)",
}

// ─────────────────────────────────────────────────────────
// Carousel - shows N cards at a time, auto-advances, infinite loop
// ─────────────────────────────────────────────────────────
function GalleryCarousel({ radius }: { radius: number }) {
  const { items } = useMomentsGallery()
  const [perView, setPerView] = useState(3)
  const [index, setIndex] = useState(0)

  // Responsive cards-per-view
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth
      if (w < 768) setPerView(1)
      else if (w < 1024) setPerView(2)
      else setPerView(3)
    }
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])

  const total = items.length
  const pages = total > 0 ? Math.max(1, total - perView + 1) : 0

  // Reset index if it falls out of range when items/perView change
  useEffect(() => {
    if (index >= pages) setIndex(0)
  }, [pages, index])

  // Auto-advance every 3s, infinite loop
  useEffect(() => {
    if (pages <= 1) return
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % pages)
    }, 3000)
    return () => clearInterval(id)
  }, [pages])

  if (total === 0) return null

  const slidePct = 100 / perView
  const translatePct = index * slidePct

  return (
    <div className="w-full">
      <div className="overflow-hidden" style={{ borderRadius: radius }}>
        <div
          className="flex"
          style={{
            transform: `translateX(-${translatePct}%)`,
            transition: "transform 600ms cubic-bezier(0.45, 0, 0.15, 1)",
          }}
        >
          {items.map((item) => (
            <div
              key={item.id}
              className="shrink-0 px-2"
              style={{ flex: `0 0 ${slidePct}%` }}
            >
              <div
                className="relative overflow-hidden border border-white/70 aspect-[3/4] sm:aspect-[4/5] group"
                style={{
                  borderRadius: radius,
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
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dot indicators */}
      {pages > 1 && (
        <div className="flex justify-center gap-2 mt-5">
          {Array.from({ length: pages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              className="transition-all duration-300 rounded-full"
              style={{
                width: i === index ? 24 : 8,
                height: 8,
                background:
                  i === index
                    ? "linear-gradient(90deg, #E6007E, #A78BFA)"
                    : "rgba(230,0,126,0.25)",
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}

// ─────────────────────────────────────────────────────────
// Main section
// ─────────────────────────────────────────────────────────
export function WhoWeAre() {
  const ref = useRef<HTMLElement>(null)
  const cms = useHomepageSection<WhoWeAreCMS>("who_we_are", DEFAULTS)
  const { items: momentsItems } = useMomentsGallery()

  if (cms.enabled === false) return null

  const py = cms.section_spacing || 80
  const isDark = cms.background_style === "dark"
  const hasImages = momentsItems.length > 0
  const radius = cms.card_radius ?? 16

  return (
    <section
      id="about"
      ref={ref}
      className="relative overflow-hidden py-12 sm:py-16 md:py-20"
      style={{ background: BG_MAP[cms.background_style || "soft"], ['--section-py' as never]: `${py}px` }}
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
        <MorphingBlob color={cms.gradient_from || "#E6007E"} size={620} opacity={0.08} duration={32} driftX={-40} driftY={30} style={{ top: "-180px", right: "-200px" }} />
        <MorphingBlob color={cms.gradient_to || "#A78BFA"} size={540} opacity={0.10} duration={38} delay={-12} driftX={50} driftY={-40} style={{ bottom: "-180px", left: "-160px" }} />
      </div>

      <div className="relative">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-10 md:gap-[60px] px-4 sm:px-6 md:px-[8%] py-12 md:py-[70px]">
          {hasImages && (
            <motion.div
              initial={{ x: -40, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="w-full md:w-[60%] relative"
            >
              <GalleryCarousel radius={radius} />
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
              className="font-serif italic"
              style={{
                color: "#E6007E",
                fontSize: "24px",
                fontWeight: 300,
                lineHeight: 1.3,
              }}
            >
              &ldquo;The trust you have shown in us over the years is our greatest inspiration to turn hope into reality.&rdquo;
            </h2>
            <Link
              to="/success-stories"
              className="inline-flex items-center mt-6 px-7 py-3 rounded-full text-white font-medium shadow-[0_10px_30px_-10px_rgba(230,0,126,0.5)] hover:shadow-[0_14px_36px_-10px_rgba(230,0,126,0.65)] hover:-translate-y-0.5 transition-all duration-300"
              style={{ background: "linear-gradient(90deg, #E6007E, #A78BFA)" }}
            >
              Explore Stories
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
