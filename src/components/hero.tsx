import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Play } from "lucide-react"
import { Link } from "@tanstack/react-router"
import { Button } from "@/components/ui/button"
import { Magnetic } from "@/components/magnetic"
import { VideoModal } from "@/components/video-modal"
import { useHomepageSection, toEmbedUrl } from "@/lib/use-cms-content"

const DEFAULT_HERO = {
  headline: "Bringing Happiness Into Your Life",
  headline_highlight: "Your Life",
  subheadline:
    "With over 12 years of excellence and 5,000+ successful treatments, Subhashree IVF & Fertility Centre has been transforming dreams of parenthood into beautiful realities for families across Nepal and beyond.",
  cta_primary_text: "Book Consultation",
  cta_primary_url: "/contact",
  cta_secondary_text: "Watch Our Story",
  story_video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  story_video_thumbnail: "",
  story_video_thumbnail_alt: "Our story",
  slides: [
    "https://images.unsplash.com/photo-1609220136736-443140cffec6?w=800&q=90&fit=crop",
    "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&q=90&fit=crop",
    "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=800&q=90&fit=crop",
    "https://images.unsplash.com/photo-1531983412531-1f49a365ffed?w=800&q=90&fit=crop",
    "https://images.unsplash.com/photo-1491013516836-7db643ee125a?w=800&q=90&fit=crop",
  ] as string[],
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
        className="relative flex items-center overflow-hidden"
        style={{
          paddingTop: 40,
          paddingBottom: 40,
          background: "linear-gradient(to right, #FFE4EF 0%, #FFF5F9 25%, #FFFAFC 50%, #ffffff 100%)",
        }}
      >
        {/* Floating decoratives — z-0, pointer-events-none */}
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
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full" style={{ zIndex: 1 }}>
          <div className="grid lg:grid-cols-5 gap-12 items-center">
            <div className="lg:col-span-3 space-y-8">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-balance"
                style={{ color: "#8B0F50" }}
              >
                {renderHeadline(hero.headline, hero.headline_highlight)}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-lg text-muted-foreground max-w-xl leading-relaxed"
              >
                {hero.subheadline}
              </motion.p>

              <div className="flex flex-wrap gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-rose to-rose-dark hover:from-rose-dark hover:to-rose text-white rounded-full px-8 text-base"
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
                    className="rounded-full px-8 text-base border-plum/20 text-plum hover:bg-white/15 hover:border-plum/40 transition-[background,border-color] duration-[250ms] ease-[ease]"
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
              className="lg:col-span-2 relative"
            >
              <HeroSlideshow slides={hero.slides && hero.slides.length ? hero.slides : DEFAULT_HERO.slides} />
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

  useEffect(() => {
    if (slides.length <= 1) return
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length)
    }, 3000)
    return () => clearInterval(id)
  }, [slides.length])

  return (
    <div className="relative">
      <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl aspect-[4/5] bg-rose-light/20">
        <AnimatePresence>
          <motion.img
            key={index}
            src={slides[index]}
            alt="Subhashree IVF"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>
      </div>
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
    </div>
  )
}
