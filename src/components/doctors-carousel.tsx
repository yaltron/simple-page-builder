import { useEffect, useRef, useState, useCallback } from "react"
import { motion, AnimatePresence, useInView, type PanInfo } from "framer-motion"
import { ArrowRight, ArrowLeft, Phone, Calendar, User, Sparkles } from "lucide-react"
import { Link } from "@tanstack/react-router"
import { useHomepageSection } from "@/lib/use-cms-content"
import { useDoctors, type CMSDoctor } from "@/lib/use-doctors"

const DOCTORS_HEADING_DEFAULTS = {
  heading: "Experienced IVF Specialists Providing Compassionate Fertility Care",
  heading_color: "#C2185B",
}

const AUTOPLAY_MS = 5000

export function DoctorsCarousel() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const cms = useHomepageSection("doctors_heading", DOCTORS_HEADING_DEFAULTS)
  const { doctors } = useDoctors()
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const [progress, setProgress] = useState(0)

  const total = doctors.length
  const go = useCallback(
    (dir: 1 | -1) => setActive((i) => (i + dir + total) % total),
    [total],
  )
  const goTo = (i: number) => setActive(((i % total) + total) % total)

  // autoplay + progress bar
  useEffect(() => {
    if (paused || total < 2) return
    setProgress(0)
    const start = performance.now()
    let raf = 0
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / AUTOPLAY_MS)
      setProgress(p)
      if (p >= 1) {
        setActive((i) => (i + 1) % total)
      } else {
        raf = requestAnimationFrame(tick)
      }
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [active, paused, total])

  // keyboard nav
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1)
      if (e.key === "ArrowLeft") go(-1)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [go])

  if (total === 0) return null

  const current = doctors[active]
  const sideOrder = (offset: number) =>
    doctors[(active + offset + total) % total]

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -60) go(1)
    else if (info.offset.x > 60) go(-1)
  }

  return (
    <section
      id="team"
      ref={ref}
      className="relative pt-10 pb-20 lg:pb-32 overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at top left, #FFE4F1 0%, transparent 55%), radial-gradient(ellipse at bottom right, #EDE7FF 0%, transparent 55%), linear-gradient(180deg, #FFF7FB 0%, #FFF1F7 100%)",
      }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Animated background blobs */}
      <motion.div
        aria-hidden
        className="absolute -top-32 -left-32 w-[480px] h-[480px] rounded-full blur-3xl opacity-40"
        style={{ background: "radial-gradient(circle, #FFB6D5 0%, transparent 70%)" }}
        animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="absolute -bottom-40 -right-32 w-[520px] h-[520px] rounded-full blur-3xl opacity-40"
        style={{ background: "radial-gradient(circle, #D4C5FF 0%, transparent 70%)" }}
        animate={{ x: [0, -50, 0], y: [0, -20, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="absolute top-1/3 right-1/4 w-[280px] h-[280px] rounded-full blur-3xl opacity-30"
        style={{ background: "radial-gradient(circle, #FFD9B8 0%, transparent 70%)" }}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12 space-y-3"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/60 backdrop-blur-sm border border-rose-200/50 text-xs font-semibold tracking-wide uppercase text-rose-600">
            <Sparkles className="w-3.5 h-3.5" /> Our Specialists
          </div>
          <h2
            className="font-serif text-3xl lg:text-4xl font-bold"
            style={{ color: cms.heading_color }}
          >
            {cms.heading}
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_1fr] gap-8 lg:gap-12 items-center">
          {/* LEFT — active card + slider */}
          <div className="relative">
            <motion.div
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={onDragEnd}
              className="relative h-[520px] sm:h-[600px] lg:h-[650px] flex items-center justify-center select-none cursor-grab active:cursor-grabbing"
            >
              {/* Glow */}
              <motion.div
                key={`glow-${active}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 0.5, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0 m-auto w-[80%] h-[80%] rounded-[40px] blur-3xl"
                style={{
                  background:
                    "linear-gradient(135deg, #FF8FB8 0%, #B79CFF 50%, #FFB78A 100%)",
                }}
              />

              {/* Stacked cards */}
              <div className="relative w-full h-full flex items-center justify-center">
                {/* Left peek */}
                {total > 2 && (
                  <SideCard
                    key={`l-${sideOrder(-1).id}`}
                    doctor={sideOrder(-1)}
                    side="left"
                    onClick={() => go(-1)}
                  />
                )}

                {/* Active */}
                <AnimatePresence mode="popLayout">
                  <motion.div
                    key={current.id}
                    initial={{ opacity: 0, scale: 0.9, y: 30 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -20 }}
                    transition={{ type: "spring", stiffness: 180, damping: 22 }}
                    className="relative z-10 w-[280px] sm:w-[360px] lg:w-[440px] h-[460px] sm:h-[560px] lg:h-[640px] rounded-[36px] overflow-hidden shadow-[0_30px_80px_-20px_rgba(194,24,91,0.35)] border border-white/60 group"
                  >
                    <ParallaxImage src={current.image} alt={current.name} />
                    {/* Glass bottom label */}
                    <div className="absolute inset-x-4 bottom-4 rounded-2xl p-4 backdrop-blur-xl bg-white/40 border border-white/60 shadow-lg">
                      <p className="font-serif text-lg font-bold text-plum truncate">
                        {current.name}
                      </p>
                      {current.title && (
                        <p className="text-xs text-rose-600 font-semibold uppercase tracking-wide truncate">
                          {current.title}
                        </p>
                      )}
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Right peek */}
                {total > 1 && (
                  <SideCard
                    key={`r-${sideOrder(1).id}`}
                    doctor={sideOrder(1)}
                    side="right"
                    onClick={() => go(1)}
                  />
                )}
              </div>
            </motion.div>

            {/* Arrows */}
            <div className="mt-6 flex items-center justify-between">
              <div className="flex gap-3">
                <NavBtn label="Previous" onClick={() => go(-1)}>
                  <ArrowLeft className="w-4 h-4" />
                </NavBtn>
                <NavBtn label="Next" onClick={() => go(1)}>
                  <ArrowRight className="w-4 h-4" />
                </NavBtn>
              </div>

              {/* Dot indicators */}
              <div className="flex gap-2">
                {doctors.map((d, i) => (
                  <button
                    key={d.id}
                    aria-label={`Go to ${d.name}`}
                    onClick={() => goTo(i)}
                    className="group/dot p-1.5"
                  >
                    <span
                      className={`block h-1.5 rounded-full transition-all duration-500 ${
                        i === active
                          ? "w-8 bg-rose-500"
                          : "w-1.5 bg-rose-300 group-hover/dot:bg-rose-400"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Progress bar */}
            <div className="mt-3 h-0.5 w-full bg-rose-100 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-rose-400 to-fuchsia-500"
                style={{ width: `${progress * 100}%` }}
                transition={{ ease: "linear" }}
              />
            </div>
          </div>

          {/* RIGHT — details */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-[32px] p-6 sm:p-8 lg:p-10 backdrop-blur-xl bg-white/55 border border-white/70 shadow-[0_20px_60px_-20px_rgba(194,24,91,0.2)]"
              >
                <p className="text-xs font-bold tracking-[0.2em] uppercase text-rose-500 mb-3">
                  Meet Your Specialist
                </p>
                <h3 className="font-serif text-3xl lg:text-4xl font-bold text-plum leading-tight mb-2">
                  {current.name}
                </h3>
                {current.title && (
                  <p className="text-base font-semibold text-rose-600 mb-2">
                    {current.title}
                  </p>
                )}
                {current.qualifications && (
                  <p className="text-sm text-plum/70 mb-1">
                    {current.qualifications}
                  </p>
                )}
                {current.experience_years ? (
                  <p className="text-sm font-semibold text-plum/80 mb-5">
                    {current.experience_years}+ Years of Experience
                  </p>
                ) : (
                  <div className="mb-5" />
                )}

                {current.bio && (
                  <p className="text-[15px] leading-relaxed text-plum/80 mb-6 line-clamp-5">
                    {current.bio}
                  </p>
                )}

                {current.specialties && current.specialties.length > 0 && (
                  <div className="mb-7">
                    <p className="text-xs font-bold uppercase tracking-wider text-plum/60 mb-3">
                      Expertise
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {current.specialties.slice(0, 6).map((s, i) => (
                        <motion.span
                          key={s}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 + i * 0.05 }}
                          className="px-3 py-1.5 text-xs font-semibold rounded-full bg-white/70 border border-rose-200/60 text-plum backdrop-blur-sm"
                        >
                          {s}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex flex-wrap gap-3">
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-bold text-white shadow-lg shadow-rose-500/30 hover:shadow-rose-500/50 hover:-translate-y-0.5 transition-all"
                    style={{
                      background:
                        "linear-gradient(90deg, #E6007E 0%, #C2185B 100%)",
                    }}
                  >
                    <Calendar className="w-4 h-4" /> Consult Now
                  </Link>
                  <Link
                    to="/team"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-bold bg-white/70 border border-plum/15 text-plum hover:bg-white transition-all"
                  >
                    <User className="w-4 h-4" /> View Profile
                  </Link>
                  <button
                    onClick={() =>
                      window.dispatchEvent(new CustomEvent("open-call-popover"))
                    }
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-bold bg-white/70 border border-plum/15 text-plum hover:bg-white transition-all"
                  >
                    <Phone className="w-4 h-4" /> Request Callback
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}

function ParallaxImage({ src, alt }: { src: string | null; alt: string }) {
  const [t, setT] = useState({ x: 0, y: 0 })
  return (
    <div
      className="absolute inset-0 overflow-hidden bg-gradient-to-br from-rose-100 to-fuchsia-100"
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect()
        setT({
          x: ((e.clientX - r.left) / r.width - 0.5) * 16,
          y: ((e.clientY - r.top) / r.height - 0.5) * 16,
        })
      }}
      onMouseLeave={() => setT({ x: 0, y: 0 })}
    >
      {src && (
        <motion.img
          src={src}
          alt={alt}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover"
          animate={{ x: t.x, y: t.y, scale: 1.06 }}
          transition={{ type: "spring", stiffness: 80, damping: 18 }}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
    </div>
  )
}

function SideCard({
  doctor,
  side,
  onClick,
}: {
  doctor: CMSDoctor
  side: "left" | "right"
  onClick: () => void
}) {
  const isLeft = side === "left"
  return (
    <motion.button
      layout
      onClick={onClick}
      aria-label={`Show ${doctor.name}`}
      initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
      animate={{ opacity: 0.85, x: 0 }}
      whileHover={{ scale: 1.05, opacity: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 24 }}
      className={`hidden md:block absolute top-1/2 -translate-y-1/2 ${
        isLeft ? "left-0" : "right-0"
      } w-[140px] lg:w-[170px] h-[260px] lg:h-[320px] rounded-[28px] overflow-hidden shadow-xl border border-white/60 z-0`}
    >
      {doctor.image && (
        <img
          src={doctor.image}
          alt={doctor.name}
          loading="lazy"
          className="w-full h-full object-cover"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      <div className="absolute inset-x-2 bottom-2 rounded-xl px-2 py-1.5 backdrop-blur-md bg-white/40 border border-white/50">
        <p className="text-[11px] font-bold text-plum truncate">{doctor.name}</p>
      </div>
    </motion.button>
  )
}

function NavBtn({
  children,
  onClick,
  label,
}: {
  children: React.ReactNode
  onClick: () => void
  label: string
}) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className="w-11 h-11 rounded-full bg-white/70 backdrop-blur-md border border-white/80 shadow-md text-plum hover:bg-white hover:scale-105 active:scale-95 transition-all flex items-center justify-center"
    >
      {children}
    </button>
  )
}
