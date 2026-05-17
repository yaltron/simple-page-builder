import { motion, useScroll, useTransform } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { ArrowRight, Sparkles, Heart, Users, Award, Play } from "lucide-react"
import { Link } from "@tanstack/react-router"
import { MorphingBlob } from "@/components/morphing-blob"
import { useHomepageSection } from "@/lib/use-cms-content"
import whoClinic from "@/assets/who-clinic.jpg"
import whoLab from "@/assets/who-lab.jpg"
import whoTeam from "@/assets/who-team.jpg"

const DEFAULTS = {
  heading: "Inside Shubhashree IVF",
  heading_color: "#E6007E",
  quote: "Every heartbeat begins with hope.",
  paragraph_1: "Care beyond treatment.",
  paragraph_2: "Science guided by compassion.",
  images: [
    { url: "", alt: "Our modern clinic" },
    { url: "", alt: "Advanced laboratory" },
    { url: "", alt: "Our caring team" },
  ],
  video_url: "",
}

const FEATURED_VIDEO =
  "https://cdn.coverr.co/videos/coverr-a-doctor-talking-to-a-patient-1583/1080p.mp4"

const stats = [
  { icon: Heart, value: 5000, suffix: "+", label: "Happy Families" },
  { icon: Users, value: 12, suffix: "+", label: "Years of Care" },
  { icon: Award, value: 70, suffix: "%", label: "Success Rate" },
]

function useCountUp(target: number, inView: boolean, duration = 1600) {
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!inView) return
    let raf = 0
    const start = performance.now()
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration)
      const eased = 1 - Math.pow(1 - p, 3)
      setN(Math.round(target * eased))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, target, duration])
  return n
}

const fade = (delay = 0, y = 40) => ({
  initial: { opacity: 0, y },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] as const },
})

function TiltCard({
  children,
  className,
  intensity = 8,
  ...rest
}: {
  children: React.ReactNode
  className?: string
  intensity?: number
  [key: string]: any
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [t, setT] = useState({ rx: 0, ry: 0 })
  return (
    <motion.div
      ref={ref}
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect()
        const x = (e.clientX - r.left) / r.width - 0.5
        const y = (e.clientY - r.top) / r.height - 0.5
        setT({ rx: -y * intensity, ry: x * intensity })
      }}
      onMouseLeave={() => setT({ rx: 0, ry: 0 })}
      style={{
        transform: `perspective(1000px) rotateX(${t.rx}deg) rotateY(${t.ry}deg)`,
        transformStyle: "preserve-3d",
        transition: "transform 0.4s cubic-bezier(0.22,1,0.36,1)",
      }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

export function WhoWeAre() {
  const ref = useRef<HTMLElement>(null)
  const [statsInView, setStatsInView] = useState(false)
  const [videoHover, setVideoHover] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })
  const parallaxY1 = useTransform(scrollYProgress, [0, 1], [40, -40])
  const parallaxY2 = useTransform(scrollYProgress, [0, 1], [-30, 50])

  const cms = useHomepageSection("who_we_are", DEFAULTS)
  const img1 = cms.images?.[0]?.url || whoClinic
  const img2 = cms.images?.[1]?.url || whoLab
  const img3 = cms.images?.[2]?.url || whoTeam
  const alt1 = cms.images?.[0]?.alt || "Our modern clinic"
  const alt2 = cms.images?.[1]?.alt || "Advanced embryology lab"
  const alt3 = cms.images?.[2]?.alt || "Our caring team"
  const videoSrc = cms.video_url || FEATURED_VIDEO

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    if (videoHover) v.play().catch(() => {})
    else {
      v.pause()
      v.currentTime = 0
    }
  }, [videoHover])

  const families = useCountUp(stats[0].value, statsInView)
  const years = useCountUp(stats[1].value, statsInView)
  const success = useCountUp(stats[2].value, statsInView)
  const counts = [families, years, success]

  return (
    <section
      id="about"
      ref={ref}
      className="relative py-24 lg:py-36 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #fff 0%, #fff7fb 12%, #fdf4ff 50%, #fff5ee 88%, #fff 100%)",
      }}
    >
      {/* Top blur fade separator */}
      <div
        aria-hidden
        className="absolute top-0 inset-x-0 h-32 pointer-events-none"
        style={{
          background: "linear-gradient(180deg, rgba(255,255,255,1), rgba(255,255,255,0))",
        }}
      />

      {/* Floating decorative blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <MorphingBlob color="#E6007E" size={620} opacity={0.09} duration={30} driftX={-40} driftY={30} style={{ top: "-180px", right: "-200px" }} />
        <MorphingBlob color="#A78BFA" size={540} opacity={0.11} duration={36} delay={-12} driftX={50} driftY={-40} style={{ bottom: "-180px", left: "-160px" }} />
        <MorphingBlob color="#FDBA74" size={420} opacity={0.08} duration={42} delay={-20} driftX={-30} driftY={50} style={{ top: "40%", left: "55%" }} />
        <MorphingBlob color="#F9A8D4" size={360} opacity={0.07} duration={38} delay={-8} driftX={40} driftY={-30} style={{ top: "10%", left: "20%" }} />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: 4 + (i % 3) * 2,
              height: 4 + (i % 3) * 2,
              background: i % 2 ? "rgba(230,0,126,0.4)" : "rgba(167,139,250,0.4)",
              boxShadow: i % 2 ? "0 0 12px rgba(230,0,126,0.5)" : "0 0 12px rgba(167,139,250,0.5)",
              top: `${8 + i * 9}%`,
              left: `${5 + i * 9.5}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.7, 0.2],
            }}
            transition={{ duration: 5 + (i % 4), repeat: Infinity, delay: i * 0.3 }}
          />
        ))}
      </div>

      <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-10 relative">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14 lg:mb-20">
          <motion.div {...fade(0)} className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-pink-100 mb-5 shadow-sm">
              <Sparkles className="w-3.5 h-3.5" style={{ color: cms.heading_color }} />
              <span className="text-[11px] font-semibold tracking-[0.2em] uppercase" style={{ color: cms.heading_color }}>
                Inside Our World
              </span>
            </div>
            <h2
              className="font-serif text-[2.5rem] lg:text-[4rem] leading-[1.05] font-bold tracking-tight"
              style={{
                backgroundImage: "linear-gradient(135deg, #E6007E 0%, #C2006A 40%, #A78BFA 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {cms.heading}
            </h2>
          </motion.div>
          <motion.p
            {...fade(0.15)}
            className="font-serif italic text-lg lg:text-2xl text-muted-foreground leading-snug max-w-md lg:text-right"
          >
            &ldquo;{cms.quote}&rdquo;
          </motion.p>
        </div>

        {/* Editorial layered grid */}
        <div className="grid grid-cols-12 gap-4 lg:gap-6 relative">
          {/* HERO — Featured video card (large, cinematic) */}
          <motion.div
            {...fade(0.05, 60)}
            style={{ y: parallaxY1 }}
            className="col-span-12 lg:col-span-8 relative"
          >
            <TiltCard
              intensity={5}
              className="relative rounded-[32px] overflow-hidden group cursor-pointer h-[460px] lg:h-[600px]"
              onMouseEnter={() => setVideoHover(true)}
              onMouseLeave={() => setVideoHover(false)}
            >
              <div
                className="absolute inset-0 rounded-[32px] pointer-events-none"
                style={{
                  boxShadow:
                    "0 30px 80px -30px rgba(230,0,126,0.45), 0 10px 40px -10px rgba(167,139,250,0.3), inset 0 1px 0 rgba(255,255,255,0.4)",
                }}
              />
              <img
                src={img1}
                alt={alt1}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-110"
              />
              <video
                ref={videoRef}
                src={videoSrc}
                muted
                loop
                playsInline
                preload="none"
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
                style={{ opacity: videoHover ? 1 : 0 }}
              />
              {/* Cinematic overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-black/20" />
              <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.35) 100%)" }} />

              {/* Play button — glassmorphism */}
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500"
                style={{
                  opacity: videoHover ? 0 : 1,
                  transform: `translate(-50%, -50%) scale(${videoHover ? 0.6 : 1})`,
                }}
              >
                <div className="relative">
                  <div className="absolute inset-0 rounded-full animate-ping" style={{ background: "rgba(255,255,255,0.3)" }} />
                  <div
                    className="relative w-20 h-20 rounded-full flex items-center justify-center border border-white/40"
                    style={{
                      background: "rgba(255,255,255,0.18)",
                      WebkitBackdropFilter: "blur(16px)",
                      backdropFilter: "blur(16px)",
                      boxShadow: "0 20px 50px -10px rgba(0,0,0,0.4)",
                    }}
                  >
                    <Play className="w-7 h-7 text-white fill-white ml-1" />
                  </div>
                </div>
              </div>

              {/* Bottom caption */}
              <div className="absolute bottom-7 left-7 right-7 text-white flex items-end justify-between gap-4">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.3em] opacity-80 mb-2">Featured film</div>
                  <div className="font-serif text-2xl lg:text-4xl font-semibold leading-tight">A space designed for hope</div>
                </div>
                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border border-white/30" style={{ background: "rgba(255,255,255,0.12)", WebkitBackdropFilter: "blur(10px)", backdropFilter: "blur(10px)" }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse" />
                  Live tour
                </div>
              </div>
            </TiltCard>
          </motion.div>

          {/* TALL — Portrait lab */}
          <motion.div
            {...fade(0.12, 60)}
            style={{ y: parallaxY2 }}
            className="col-span-6 lg:col-span-4 relative"
          >
            <TiltCard
              intensity={6}
              className="relative rounded-[32px] overflow-hidden group cursor-pointer h-[460px] lg:h-[600px]"
            >
              <div
                className="absolute inset-0 rounded-[32px] pointer-events-none z-10"
                style={{ boxShadow: "0 25px 70px -25px rgba(167,139,250,0.5), inset 0 1px 0 rgba(255,255,255,0.4)" }}
              />
              <img src={img2} alt={alt2} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-950/75 via-purple-900/15 to-transparent" />
              <div className="absolute top-6 left-6 right-6 flex justify-between items-start text-white">
                <div className="px-3 py-1 rounded-full text-[10px] uppercase tracking-[0.25em] font-semibold border border-white/30" style={{ background: "rgba(255,255,255,0.15)", WebkitBackdropFilter: "blur(10px)", backdropFilter: "blur(10px)" }}>
                  Embryology
                </div>
              </div>
              <div className="absolute bottom-7 left-7 right-7 text-white">
                <div className="font-serif text-2xl lg:text-3xl font-semibold leading-tight">Where life begins</div>
                <div className="text-xs opacity-80 mt-2 tracking-wide">ISO-certified laboratory</div>
              </div>
            </TiltCard>
          </motion.div>

          {/* QUOTE — Glass card */}
          <motion.div
            {...fade(0.18, 50)}
            className="col-span-12 sm:col-span-6 lg:col-span-4 relative"
          >
            <div
              className="relative rounded-[32px] p-7 lg:p-9 h-full min-h-[260px] overflow-hidden flex flex-col justify-between"
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.85), rgba(253,244,255,0.7))",
                WebkitBackdropFilter: "blur(20px)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(230,0,126,0.15)",
                boxShadow: "0 20px 60px -25px rgba(230,0,126,0.3), inset 0 1px 0 rgba(255,255,255,0.6)",
              }}
            >
              <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full blur-2xl" style={{ background: "radial-gradient(circle, rgba(230,0,126,0.25), transparent 70%)" }} />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full blur-2xl" style={{ background: "radial-gradient(circle, rgba(167,139,250,0.2), transparent 70%)" }} />
              <Heart className="w-7 h-7 relative" style={{ color: "#E6007E" }} />
              <p className="font-serif text-xl lg:text-2xl italic leading-snug text-plum relative">
                &ldquo;{cms.paragraph_1}&rdquo;
              </p>
              <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground relative">— Our promise</div>
            </div>
          </motion.div>

          {/* STATS — Premium gradient */}
          <motion.div
            {...fade(0.22, 50)}
            onViewportEnter={() => setStatsInView(true)}
            className="col-span-12 sm:col-span-6 lg:col-span-4 relative"
          >
            <div
              className="relative rounded-[32px] p-7 lg:p-9 h-full min-h-[260px] overflow-hidden"
              style={{
                background: "linear-gradient(140deg, #E6007E 0%, #C2006A 50%, #A78BFA 100%)",
                boxShadow: "0 25px 70px -20px rgba(230,0,126,0.5), inset 0 1px 0 rgba(255,255,255,0.25)",
              }}
            >
              <div className="absolute inset-0 opacity-30" style={{ background: "radial-gradient(circle at 20% 20%, white, transparent 55%)" }} />
              <div className="absolute -bottom-20 -right-20 w-60 h-60 rounded-full blur-2xl" style={{ background: "radial-gradient(circle, rgba(255,255,255,0.3), transparent 70%)" }} />
              <div className="relative h-full flex flex-col justify-between text-white gap-6">
                <div className="text-[10px] uppercase tracking-[0.3em] opacity-90">By the numbers</div>
                <div className="space-y-3">
                  {stats.map((s, i) => (
                    <div key={s.label} className="flex items-baseline gap-3">
                      <s.icon className="w-4 h-4 opacity-85" />
                      <span className="font-serif text-2xl lg:text-3xl font-bold tracking-tight tabular-nums">
                        {counts[i].toLocaleString()}{s.suffix}
                      </span>
                      <span className="text-[11px] opacity-90 tracking-wide">{s.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* CTA / Closing */}
          <motion.div
            {...fade(0.28, 50)}
            className="col-span-12 lg:col-span-4 relative"
          >
            <div
              className="relative rounded-[32px] p-7 lg:p-9 h-full min-h-[260px] overflow-hidden flex flex-col justify-between"
              style={{
                background: "linear-gradient(135deg, #fff5f9 0%, #fef3ec 100%)",
                border: "1px solid rgba(230,0,126,0.15)",
                boxShadow: "0 20px 60px -25px rgba(167,139,250,0.35), inset 0 1px 0 rgba(255,255,255,0.7)",
              }}
            >
              <div className="absolute -bottom-16 -right-16 w-56 h-56 rounded-full blur-2xl" style={{ background: "radial-gradient(circle, rgba(167,139,250,0.3), transparent 70%)" }} />
              <div className="relative">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 border border-pink-100 mb-4 shadow-sm">
                  <Sparkles className="w-3 h-3" style={{ color: "#E6007E" }} />
                  <span className="text-[10px] uppercase tracking-[0.3em] font-semibold" style={{ color: "#E6007E" }}>Why us</span>
                </div>
                <p className="font-serif text-2xl lg:text-3xl leading-snug text-plum font-medium">
                  {cms.paragraph_2}
                </p>
              </div>
              <div className="relative flex items-center justify-between mt-6 gap-3">
                <div className="flex -space-x-2.5">
                  {[img3, img1, img2].map((src, i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white overflow-hidden shadow-md">
                      <img src={src} alt="" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
                <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    to="/about"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-white text-sm font-semibold group"
                    style={{
                      background: "linear-gradient(135deg, #E6007E, #C2006A)",
                      boxShadow: "0 10px 30px -10px rgba(230,0,126,0.6)",
                    }}
                  >
                    Discover More
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Ultra-wide cinematic team strip */}
          <motion.div
            {...fade(0.32, 60)}
            className="col-span-12 lg:col-span-8 relative"
          >
            <TiltCard
              intensity={3}
              className="relative rounded-[32px] overflow-hidden group cursor-pointer h-[280px] lg:h-[340px]"
            >
              <div className="absolute inset-0 rounded-[32px] pointer-events-none z-10" style={{ boxShadow: "0 25px 70px -25px rgba(230,0,126,0.4), inset 0 1px 0 rgba(255,255,255,0.4)" }} />
              <img src={img3} alt={alt3} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-r from-pink-950/60 via-transparent to-purple-950/40" />
              <div className="absolute inset-0 flex items-center px-8 lg:px-14">
                <div className="text-white max-w-md">
                  <div className="inline-block px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[10px] font-bold uppercase tracking-[0.25em] mb-4" style={{ color: "#E6007E" }}>
                    Our Specialists
                  </div>
                  <div className="font-serif text-3xl lg:text-5xl font-semibold leading-tight">Compassion in every step</div>
                  <div className="mt-3 text-sm opacity-90 italic font-serif">Science guided by warmth.</div>
                </div>
              </div>
            </TiltCard>
          </motion.div>

          {/* Floating overlap card — happy moment */}
          <motion.div
            {...fade(0.38, 60)}
            style={{ y: parallaxY1 }}
            className="col-span-12 lg:col-span-4 relative lg:-mt-16 z-10"
          >
            <TiltCard
              intensity={7}
              className="relative rounded-[32px] overflow-hidden group cursor-pointer h-[280px] lg:h-[400px]"
            >
              <div className="absolute inset-0 rounded-[32px] pointer-events-none z-10" style={{ boxShadow: "0 30px 80px -25px rgba(230,0,126,0.45), inset 0 1px 0 rgba(255,255,255,0.4)" }} />
              <img src={img1} alt="Happy moment" loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-rose-950/70 via-rose-900/10 to-transparent" />
              <div className="absolute top-5 right-5 w-11 h-11 rounded-full flex items-center justify-center border border-white/40" style={{ background: "rgba(255,255,255,0.18)", WebkitBackdropFilter: "blur(12px)", backdropFilter: "blur(12px)" }}>
                <Heart className="w-4 h-4 text-white fill-white" />
              </div>
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <div className="text-[10px] uppercase tracking-[0.3em] opacity-85 mb-1">A new chapter</div>
                <div className="font-serif text-xl lg:text-2xl font-semibold leading-tight">Helping families grow</div>
              </div>
            </TiltCard>
          </motion.div>
        </div>
      </div>

      {/* Bottom blur fade separator */}
      <div
        aria-hidden
        className="absolute bottom-0 inset-x-0 h-32 pointer-events-none"
        style={{ background: "linear-gradient(0deg, rgba(255,255,255,1), rgba(255,255,255,0))" }}
      />
    </section>
  )
}
