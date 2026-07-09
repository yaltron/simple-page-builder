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
  const [enableTransition, setEnableTransition] = useState(true)
  const pausedRef = useRef(false)
  const resumeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

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

  // Autoplay: advance every 4s. Index can exceed total by up to `perView`
  // because we render `perView` clones of the first items after the tail —
  // when we hit that boundary we snap back to 0 with transition disabled.
  useEffect(() => {
    if (total < 2) return
    let rafId = 0
    let last = performance.now()
    const tick = (now: number) => {
      if (!pausedRef.current) {
        if (now - last >= 4000) {
          setIndex((i) => i + 1)
          last = now
        }
      } else {
        last = now
      }
      rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(rafId)
      if (resumeTimeoutRef.current) {
        clearTimeout(resumeTimeoutRef.current)
        resumeTimeoutRef.current = null
      }
    }
  }, [total])

  // Seamless wrap: when index reaches `total` (first clone position),
  // wait for the transition to end then jump back to 0 without animating.
  const handleTransitionEnd = () => {
    if (index >= total) {
      setEnableTransition(false)
      setIndex(0)
      // re-enable transition on the next frame so subsequent moves animate
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setEnableTransition(true))
      })
    } else if (index < 0) {
      setEnableTransition(false)
      setIndex(total - 1)
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setEnableTransition(true))
      })
    }
  }

  const handleMouseEnter = () => {
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current)
      resumeTimeoutRef.current = null
    }
    pausedRef.current = true
  }
  const handleMouseLeave = () => {
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current)
    resumeTimeoutRef.current = setTimeout(() => {
      pausedRef.current = false
      resumeTimeoutRef.current = null
    }, 1000)
  }

  if (total === 0) return null

  // Slides: real items + `perView` clones of the first items appended,
  // so scrolling past the end reveals the first images seamlessly before
  // the invisible snap-back on transitionend.
  const slides = perView > 0 ? items.concat(items.slice(0, perView)) : items
  const slidePct = 100 / perView
  const translatePct = index * slidePct

  return (
    <div
      className="w-full"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        willChange: "transform",
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
        perspective: 1000,
        WebkitPerspective: 1000,
      }}
    >
      <div className="overflow-hidden" style={{ borderRadius: radius }}>
        <div
          className="flex"
          onTransitionEnd={handleTransitionEnd}
          style={{
            transform: `translateX(-${translatePct}%)`,
            transition: enableTransition
              ? "transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
              : "none",
            willChange: "transform",
          }}
        >
          {slides.map((item, i) => {
            const isActive = i >= index && i < index + perView
            return (
              <div
                key={`${item.id}-${i}`}
                className="shrink-0 px-2"
                style={{
                  flex: `0 0 ${slidePct}%`,
                  opacity: isActive ? 1 : 0.6,
                  transform: isActive
                    ? "translateZ(0) scale(1)"
                    : "translateZ(0) scale(0.97)",
                  WebkitTransform: isActive
                    ? "translateZ(0) scale(1)"
                    : "translateZ(0) scale(0.97)",
                  transition: "opacity 0.4s ease, transform 0.4s ease",
                }}
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
            )
          })}
        </div>
      </div>

      {/* Dot indicators */}
      {total > 1 && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            marginTop: 20,
          }}
        >
          {items.map((_, i) => {
            const active = (((index % total) + total) % total) === i
            return (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                style={{
                  width: active ? 28 : 8,
                  height: 8,
                  borderRadius: active ? 4 : "50%",
                  background: active ? "#E6007E" : "rgba(230,0,126,0.25)",
                  boxShadow: active ? "0 2px 8px rgba(230,0,126,0.4)" : "none",
                  cursor: "pointer",
                  border: "none",
                  padding: 0,
                  transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
                }}
              />
            )
          })}
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
                color: "#8B0F50",
                fontSize: "24px",
                fontWeight: 300,
                lineHeight: 1.3,
                background: "none",
                WebkitTextFillColor: "unset",
              }}
            >
              &ldquo;The trust you have shown in us over the years is our greatest inspiration to turn hope into reality.&rdquo;
            </h2>
            <Link
              to="/success-stories"
              className="inline-flex items-center mt-6 px-7 py-3 rounded-full text-white font-medium shadow-[0_10px_30px_-10px_rgba(139,15,80,0.5)] hover:shadow-[0_14px_36px_-10px_rgba(139,15,80,0.65)] hover:-translate-y-0.5 transition-all duration-300"
              style={{ background: "#8B0F50" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.background = "#6D0A3E")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.background = "#8B0F50")}
            >
              Explore Stories
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
