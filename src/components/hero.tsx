import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Play } from "lucide-react"
import { Link } from "@tanstack/react-router"
import { Button } from "@/components/ui/button"
import { Magnetic } from "@/components/magnetic"
import { VideoModal } from "@/components/video-modal"
import { useHomepageSection, toEmbedUrl } from "@/lib/use-cms-content"

const DEFAULT_HERO = {
  headline: "",
  headline_highlight: "Your Life",
  subheadline:
    "With over 12 years of excellence and 5,000+ successful treatments, Subhashree IVF & Fertility Centre has been transforming dreams of parenthood into beautiful realities for families across Nepal and beyond.",
  cta_primary_text: "Book Consultation",
  cta_primary_url: "/contact",
  cta_secondary_text: "Watch Our Story",
  story_video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  story_video_thumbnail: "",
  story_video_thumbnail_alt: "Our story",
  slides: [] as string[],
}

function renderHeadline(text: string, highlight: string) {
  if (!highlight || !text.includes(highlight)) {
    return <>{text}</>
  }
  const [before, ...rest] = text.split(highlight)
  return (
    <>
      {before}
      <span style={{ color: "#8B0F50" }}>{highlight}</span>
      {rest.join(highlight)}
    </>
  )
}

export function Hero() {
  const hero = useHomepageSection("hero", DEFAULT_HERO)
  const [videoOpen, setVideoOpen] = useState(false)
  const isExternal = hero.cta_primary_url?.startsWith("http")

  return (
    <>
      <section
        className="hero-section relative flex items-center overflow-hidden py-6 sm:py-8 md:py-10"
        style={{
          background: "linear-gradient(to right, #FFE4EF 0%, #FFF5F9 25%, #FFFAFC 50%, #ffffff 100%)",
        }}
      >
        {/* Floating decoratives - z-0, pointer-events-none */}
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none", overflow: "hidden" }}>
          <div style={{ position: "absolute", width: 300, height: 300, border: "1.5px solid rgba(230,0,126,0.08)", borderRadius: "50%", top: -60, left: -80, animation: "hero-rotate 30s linear infinite" }} />
          <div style={{ position: "absolute", width: 180, height: 180, border: "1px solid rgba(230,0,126,0.06)", borderRadius: "50%", bottom: "20%", right: "10%", animation: "hero-float 8s ease-in-out infinite" }} />
          <div style={{ position: "absolute", width: 12, height: 12, background: "rgba(230,0,126,0.10)", borderRadius: "50%", top: "30%", left: "12%", animation: "hero-float 6s ease-in-out infinite", animationDelay: "1s" }} />
          <div style={{ position: "absolute", width: 7, height: 7, background: "rgba(27,160,220,0.09)", borderRadius: "50%", top: "60%", left: "35%", animation: "hero-float 9s ease-in-out infinite", animationDelay: "2s" }} />
          <div style={{ position: "absolute", width: 14, height: 14, background: "rgba(230,0,126,0.07)", top: "20%", right: "35%", animation: "hero-square-float 7s ease-in-out infinite", animationDelay: "0.5s" }} />
          <div style={{ position: "absolute", top: "75%", left: "18%", width: 18, height: 18, animation: "hero-rotate 20s linear infinite" }}>
            <span style={{ position: "absolute", top: "50%", left: 0, right: 0, height: 2, marginTop: -1, background: "rgba(230,0,126,0.07)" }} />
            <span style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: 2, marginLeft: -1, background: "rgba(230,0,126,0.07)" }} />
          </div>
          <div style={{ position: "absolute", width: 120, height: 120, border: "1.5px dashed rgba(27,160,220,0.07)", borderRadius: "50%", top: "15%", right: "8%", animation: "hero-rotate-rev 25s linear infinite" }} />
          <div style={{ position: "absolute", width: 400, height: 400, background: "radial-gradient(circle, rgba(230,0,126,0.05) 0%, transparent 70%)", borderRadius: "50%", bottom: -100, left: -100, animation: "hero-blob-pulse 4s ease-in-out infinite alternate" }} />

          {/* 9. Medium diamond */}
          <div style={{ position: "absolute", width: 20, height: 20, background: "rgba(230,0,126,0.07)", top: "45%", left: "5%", transform: "rotate(45deg)", animation: "hero-square-float 11s ease-in-out infinite", animationDelay: "1.5s" }} />
          {/* 10. Hollow square */}
          <div style={{ position: "absolute", width: 40, height: 40, border: "1.5px solid rgba(27,160,220,0.07)", top: "10%", left: "40%", transform: "rotate(15deg)", animation: "hero-float 13s ease-in-out infinite", animationDelay: "3s" }} />
          {/* 11. Tiny dot cluster */}
          <div style={{ position: "absolute", top: "80%", left: "45%", display: "flex", gap: 10, animation: "hero-float 7s ease-in-out infinite", animationDelay: "0.8s" }}>
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: "rgba(230,0,126,0.08)" }} />
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: "rgba(230,0,126,0.08)" }} />
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: "rgba(230,0,126,0.08)" }} />
          </div>
          {/* 12. Large dashed circle */}
          <div style={{ position: "absolute", width: 220, height: 220, border: "1px dashed rgba(230,0,126,0.06)", borderRadius: "50%", top: "40%", left: -60, animation: "hero-rotate 35s linear infinite" }} />
          {/* 13. Small triangle outline */}
          <div style={{ position: "absolute", top: "25%", right: "28%", width: 0, height: 0, borderLeft: "10px solid transparent", borderRight: "10px solid transparent", borderBottom: "18px solid rgba(27,160,220,0.07)", animation: "hero-float 9s ease-in-out infinite", animationDelay: "2s" }} />
          {/* 14. Horizontal line pair (// shape) */}
          <div style={{ position: "absolute", top: "65%", right: "15%", width: 30, height: 20, animation: "hero-float 10s ease-in-out infinite", animationDelay: "1s" }}>
            <span style={{ position: "absolute", top: 4, left: 0, width: 30, height: 2, background: "rgba(230,0,126,0.07)", transform: "rotate(60deg)", transformOrigin: "0 50%" }} />
            <span style={{ position: "absolute", top: 4, left: 10, width: 30, height: 2, background: "rgba(230,0,126,0.07)", transform: "rotate(60deg)", transformOrigin: "0 50%" }} />
          </div>
          {/* 15. Soft gradient orb (right side) */}
          <div style={{ position: "absolute", width: 280, height: 280, background: "radial-gradient(circle, rgba(27,160,220,0.05) 0%, transparent 70%)", borderRadius: "50%", top: "10%", right: -60, animation: "hero-blob-pulse 6s ease-in-out infinite alternate" }} />
          {/* 16. Small cross */}
          <div style={{ position: "absolute", bottom: "30%", right: "32%", width: 20, height: 20, animation: "hero-rotate 18s linear infinite" }}>
            <span style={{ position: "absolute", top: 9, left: 0, width: 20, height: 2, background: "rgba(230,0,126,0.08)" }} />
            <span style={{ position: "absolute", top: 0, left: 9, width: 2, height: 20, background: "rgba(230,0,126,0.08)" }} />
          </div>
        </div>
        <div className="hero-container relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full" style={{ zIndex: 1 }}>
          <div className="hero-grid grid lg:grid-cols-5 gap-6 sm:gap-8 lg:gap-12 items-center">
            <div className="hero-left lg:col-span-3 space-y-4 sm:space-y-6 lg:space-y-8">
              {hero.headline ? (
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="font-serif font-bold leading-tight text-balance"
                  style={{ color: "#8B0F50", fontSize: "clamp(1.875rem, 5.5vw, 3.75rem)" }}
                >
                  {renderHeadline(hero.headline, hero.headline_highlight)}
                </motion.h1>
              ) : (
                <div
                  aria-hidden="true"
                  style={{
                    height: "clamp(4.5rem, 13vw, 9rem)",
                    background: "rgba(139,15,80,0.08)",
                    borderRadius: 8,
                  }}
                />
              )}

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-base sm:text-lg text-muted-foreground max-w-xl leading-relaxed"
              >
                {hero.subheadline}
              </motion.p>

              <div className="flex flex-wrap gap-3 sm:gap-4">
                <Button
                  asChild
                  size="lg"
                  className="text-white rounded-full px-6 sm:px-8 text-sm sm:text-base"
                  style={{ background: "#8B0F50" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "#6D0A3E")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "#8B0F50")}
                >
                  {isExternal ? (
                    <a href={hero.cta_primary_url}>{hero.cta_primary_text}</a>
                  ) : (
                    <Link to={hero.cta_primary_url || "/contact"}>{hero.cta_primary_text}</Link>
                  )}
                </Button>
                {hero.cta_secondary_text && (
                  <Button
                    type="button"
                    onClick={() => setVideoOpen(true)}
                    size="lg"
                    variant="outline"
                    className="rounded-full px-6 sm:px-8 text-sm sm:text-base border-plum/20 text-plum hover:bg-white/15 hover:border-plum/40 transition-[background,border-color] duration-[250ms] ease-[ease]"
                  >
                    <Play className="w-4 h-4 mr-2 fill-current" />
                    {hero.cta_secondary_text}
                  </Button>
                )}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="hero-right lg:col-span-2 relative"
            >
              <HeroSlideshow slides={hero.slides || []} />
            </motion.div>
          </div>
        </div>
      </section>
      <VideoModal
        open={videoOpen}
        onClose={() => setVideoOpen(false)}
        src={toEmbedUrl(hero.story_video_url)}
        title={hero.cta_secondary_text || "Our Story"}
      />
    </>
  )
}

function HeroSlideshow({ slides }: { slides: string[] }) {
  const [index, setIndex] = useState(0)
  const [readySet, setReadySet] = useState<Set<string>>(new Set())

  // Preload each slide URL; mark ready when loaded
  useEffect(() => {
    let cancelled = false
    slides.forEach((src) => {
      if (!src || readySet.has(src)) return
      const img = new Image()
      img.onload = () => {
        if (cancelled) return
        setReadySet((prev) => {
          if (prev.has(src)) return prev
          const next = new Set(prev)
          next.add(src)
          return next
        })
      }
      img.src = src
    })
    return () => { cancelled = true }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slides.join("|")])

  // Auto-advance only when multiple slides
  useEffect(() => {
    if (slides.length <= 1) return
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length)
    }, 3000)
    return () => clearInterval(id)
  }, [slides.length])

  const placeholderBg = "linear-gradient(135deg, #FFE4EF 0%, #FFF5F9 50%, #EAF7FD 100%)"
  const currentSrc = slides[index]
  const showImage = currentSrc && readySet.has(currentSrc)

  return (
    <div className="relative">
      <div
        className="relative z-10 rounded-3xl overflow-hidden shadow-2xl aspect-[4/5] max-w-[320px] sm:max-w-sm md:max-w-md mx-auto lg:max-w-none"
        style={{ background: placeholderBg }}
      >
        {showImage && (
          <img
            key={currentSrc}
            src={currentSrc}
            alt="Shubhashree IVF fertility clinic in Kathmandu - caring fertility treatment"
            width={800}
            height={1000}
            fetchPriority={index === 0 ? "high" : "auto"}
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              opacity: 1,
              transition: "opacity 0.5s ease",
              animation: "hero-fade-in 0.5s ease forwards",
            }}
          />
        )}
      </div>
      {slides.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              className="w-2.5 h-2.5 rounded-full transition-colors"
              style={{
                backgroundColor: i === index ? "#E6007E" : "rgba(230,0,126,0.25)",
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}
