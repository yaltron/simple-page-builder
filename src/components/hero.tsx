
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Play, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MorphingBlob } from "@/components/morphing-blob"
import { FloatingDecoField } from "@/components/floating-deco"
import { GradientMesh } from "@/components/gradient-mesh"
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
    <section className="relative min-h-screen flex items-center overflow-hidden bg-cream pt-20">
      {/* Animated gradient mesh */}
      <GradientMesh
        blendMode="multiply"
        items={[
          {
            color: "rose",
            size: 820,
            minOpacity: 0.1,
            maxOpacity: 0.18,
            driftRange: 90,
            driftDuration: 22,
            pulseDuration: 10,
            top: "-200px",
            left: "-180px",
          },
          {
            color: "teal",
            size: 720,
            minOpacity: 0.08,
            maxOpacity: 0.15,
            driftRange: 80,
            driftDuration: 26,
            pulseDuration: 12,
            delay: -6,
            top: "20%",
            right: "-200px",
          },
          {
            color: "gold",
            size: 640,
            minOpacity: 0.08,
            maxOpacity: 0.14,
            driftRange: 70,
            driftDuration: 30,
            pulseDuration: 9,
            delay: -12,
            bottom: "-220px",
            left: "30%",
          },
          {
            color: "rose-light",
            size: 760,
            minOpacity: 0.1,
            maxOpacity: 0.18,
            driftRange: 100,
            driftDuration: 24,
            pulseDuration: 11,
            delay: -3,
            bottom: "-180px",
            right: "10%",
          },
        ]}
      />
      <FloatingDecoField
        items={[
          { shape: "hollow-circle", color: "rose", size: 32, top: "12%", left: "8%", floatDuration: 7, rotateDuration: 22, delay: 0 },
          { shape: "plus", color: "gold", size: 18, top: "22%", left: "42%", floatDuration: 6, rotateDuration: 18, delay: -2 },
          { shape: "dashed-ring", color: "teal", size: 44, top: "70%", left: "12%", floatDuration: 9, rotateDuration: 25, delay: -4 },
          { shape: "square", color: "rose", size: 22, top: "35%", left: "28%", floatDuration: 8, rotateDuration: 20, delay: -1 },
          { shape: "lines", color: "gold", size: 26, top: "82%", left: "55%", floatDuration: 7, rotateDuration: 16, delay: -3 },
          { shape: "hollow-circle", color: "teal", size: 18, top: "55%", left: "48%", floatDuration: 6, rotateDuration: 19, delay: -5 },
          { shape: "plus", color: "rose", size: 20, top: "8%", right: "12%", floatDuration: 8, rotateDuration: 21, delay: -2 },
          { shape: "dashed-ring", color: "gold", size: 36, top: "65%", right: "8%", floatDuration: 10, rotateDuration: 24, delay: -6 },
          { shape: "square", color: "teal", size: 16, top: "40%", right: "20%", floatDuration: 7, rotateDuration: 17, delay: -1 },
        ]}
      />
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Noise texture overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
        {/* Decorative blob */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.4, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-rose-light/30 rounded-full blur-3xl"
        />

        {/* Morphing rose blobs */}
        <MorphingBlob
          color="var(--rose)"
          size={650}
          opacity={0.1}
          duration={26}
          driftX={60}
          driftY={40}
          style={{ top: "-180px", left: "-200px" }}
        />
        <MorphingBlob
          color="var(--rose-light)"
          size={520}
          opacity={0.12}
          duration={32}
          delay={-8}
          driftX={-50}
          driftY={50}
          style={{ bottom: "-220px", right: "-180px" }}
        />
        <MorphingBlob
          color="var(--rose)"
          size={420}
          opacity={0.06}
          duration={36}
          delay={-14}
          driftX={70}
          driftY={-40}
          style={{ top: "30%", right: "-160px" }}
        />

        {/* Floating particles */}

        {[...Array(36)].map((_, i) => {
          // Deterministic pseudo-random for SSR stability
          const rand = (seed: number) => {
            const x = Math.sin(seed * 9301 + 49297) * 233280
            return x - Math.floor(x)
          }

          const shapeType = i % 4 // 0: dot, 1: circle, 2: ring, 3: triangle
          const colorKey = i % 3 // rose / teal / gold
          // Depth: 0 (far) -> 1 (near)
          const depth = rand(i + 1)
          const size = 4 + depth * 22 // 4px (far) -> 26px (near)
          const opacity = 0.08 + depth * 0.07 // 0.08 -> 0.15
          const left = rand(i + 11) * 100
          const top = rand(i + 23) * 100
          const duration = 14 + rand(i + 31) * 22 // 14s - 36s
          const delay = rand(i + 41) * -duration // negative for staggered start
          const driftX = (rand(i + 53) - 0.5) * 220
          const driftY = (rand(i + 67) - 0.5) * 220
          const rotateDir = i % 2 === 0 ? 1 : -1
          const rotateAmount = (60 + rand(i + 79) * 240) * rotateDir

          const colorVar =
            colorKey === 0 ? "var(--rose)" : colorKey === 1 ? "var(--teal)" : "var(--gold)"

          // Build shape element based on type
          let shape: React.ReactNode
          const baseStyle: React.CSSProperties = {
            width: size,
            height: size,
            opacity,
          }

          if (shapeType === 0) {
            // Solid dot
            shape = (
              <div
                style={{ ...baseStyle, background: colorVar, borderRadius: "50%" }}
              />
            )
          } else if (shapeType === 1) {
            // Soft blurred circle
            shape = (
              <div
                style={{
                  ...baseStyle,
                  background: colorVar,
                  borderRadius: "50%",
                  filter: `blur(${1 + depth * 2}px)`,
                }}
              />
            )
          } else if (shapeType === 2) {
            // Ring (outlined circle)
            shape = (
              <div
                style={{
                  ...baseStyle,
                  border: `${Math.max(1, size * 0.12)}px solid ${colorVar}`,
                  borderRadius: "50%",
                  background: "transparent",
                }}
              />
            )
          } else {
            // Triangle via SVG
            shape = (
              <svg
                width={size}
                height={size}
                viewBox="0 0 10 10"
                style={{ opacity, display: "block" }}
                aria-hidden="true"
              >
                <polygon points="5,1 9,9 1,9" fill={colorVar} />
              </svg>
            )
          }

          return (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${left}%`,
                top: `${top}%`,
                willChange: "transform",
              }}
              animate={{
                x: [0, driftX, 0],
                y: [0, driftY, 0],
                rotate: [0, rotateAmount, 0],
              }}
              transition={{
                duration,
                delay,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
            >
              {shape}
            </motion.div>
          )
        })}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid lg:grid-cols-5 gap-12 items-center">
          {/* Left content - 60% */}
          <div className="lg:col-span-3 space-y-8">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-teal" />
              </span>
              <span className="text-sm font-medium text-plum">Shubhashree IVF Clinic</span>
            </motion.div>

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

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-muted-foreground"
        >
          <span className="text-sm">Scroll to explore</span>
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.div>
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
