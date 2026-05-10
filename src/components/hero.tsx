
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Play, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Magnetic } from "@/components/magnetic"
import heroFamily from "@/assets/hero-family.jpg"

const slides = [
  heroFamily,
  "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800",
  "https://images.unsplash.com/photo-1609220136736-443140cffec6?w=800",
  "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800",
  "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=800",
]


export function Hero() {
  return (
    <section className="relative flex items-center overflow-hidden bg-cream" style={{ paddingTop: 40, paddingBottom: 40 }}>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-5 gap-12 items-center">
          {/* Left content - 60% */}
          <div className="lg:col-span-3 space-y-8">
            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-plum leading-tight text-balance"
            >
              Bringing Happiness Into{" "}
              <span className="text-rose">Your Life</span>
            </motion.h1>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-plum leading-tight text-balance"
            >
              Bringing Happiness Into{" "}
              <span className="text-rose">Your Life</span>
            </motion.h1>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-muted-foreground max-w-xl leading-relaxed"
            >
              With over 12 years of excellence and 5,000+ successful treatments, 
              Shubhashree IVF & Fertility Centre has been transforming dreams of 
              parenthood into beautiful realities for families across Nepal and beyond.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <Magnetic>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-rose to-rose-dark hover:from-rose-dark hover:to-rose text-white rounded-full px-8 text-base"
                >
                  Book Free Consultation
                </Button>
              </Magnetic>
              <Magnetic>
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full px-8 text-base border-plum/20 text-plum hover:bg-plum/5"
                >
                  <Play className="w-4 h-4 mr-2 fill-current" />
                  Watch Our Story
                </Button>
              </Magnetic>
            </motion.div>

          </div>

          {/* Right side - 40% */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="lg:col-span-2 relative"
          >
            <HeroSlideshow />
          </motion.div>
        </div>
      </div>

    </section>
  )
}

function HeroSlideshow() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length)
    }, 3000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="relative">
      <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl aspect-[4/5] bg-rose-light/20">
        <AnimatePresence>
          <motion.img
            key={index}
            src={slides[index]}
            alt="Shubhashree IVF"
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
