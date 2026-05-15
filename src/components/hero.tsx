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
      <span className="text-rose">{highlight}</span>
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
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-5 gap-12 items-center">
            <div className="lg:col-span-3 space-y-8">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-plum leading-tight text-balance"
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

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-wrap gap-4"
              >
                <Magnetic>
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
                </Magnetic>
                {hero.cta_secondary_text && (
                  <Magnetic>
                    <Button
                      type="button"
                      onClick={() => setVideoOpen(true)}
                      size="lg"
                      variant="outline"
                      className="rounded-full px-8 text-base border-plum/20 text-plum hover:bg-plum/5"
                    >
                      <Play className="w-4 h-4 mr-2 fill-current" />
                      {hero.cta_secondary_text}
                    </Button>
                  </Magnetic>
                )}
              </motion.div>
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
