import { useEffect, useRef, useState, useCallback } from "react"
import { motion, AnimatePresence, useInView, type PanInfo } from "framer-motion"
import { ArrowRight, ArrowLeft, Calendar, User, Sparkles } from "lucide-react"
import { Link } from "@tanstack/react-router"
import { useHomepageSection } from "@/lib/use-cms-content"
import { useDoctors, type CMSDoctor } from "@/lib/use-doctors"

const DOCTORS_HEADING_DEFAULTS = {
  heading: "Experienced IVF Specialists Providing Compassionate Fertility Care",
  heading_color: "#8B0F50",
}

const AUTOPLAY_MS = 3200

// Premium spring - snappier, still fluid
const SPRING = { type: "spring" as const, stiffness: 340, damping: 32, mass: 0.7 }
const SPRING_SOFT = { type: "spring" as const, stiffness: 260, damping: 30, mass: 0.7 }

export function DoctorsCarousel() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const cms = useHomepageSection("doctors_heading", DOCTORS_HEADING_DEFAULTS)
  const { doctors } = useDoctors()
  const [[active, direction], setActive] = useState<[number, 1 | -1]>([0, 1])
  const [paused, setPaused] = useState(false)
  const [progress, setProgress] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth <= 640)
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])

  const total = doctors.length

  const go = useCallback(
    (dir: 1 | -1) =>
      setActive(([i]) => [(i + dir + total) % total, dir]),
    [total],
  )
  const goTo = (i: number) =>
    setActive(([prev]) => {
      const next = ((i % total) + total) % total
      const dir: 1 | -1 = next >= prev ? 1 : -1
      return [next, dir]
    })

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
        setActive(([i]) => [(i + 1) % total, 1])
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
    if (info.offset.x < -50) go(1)
    else if (info.offset.x > 50) go(-1)
  }

  const pauseOn = { onMouseEnter: () => setPaused(true), onMouseLeave: () => setPaused(false) }

  if (isMobile) {
    return (
      <section
        id="team"
        ref={ref}
        style={{
          padding: "30px 16px 50px",
          background:
            "radial-gradient(ellipse at top left, #FFE4F1 0%, transparent 55%), radial-gradient(ellipse at bottom right, #EDE7FF 0%, transparent 55%), linear-gradient(180deg, #FFF7FB 0%, #FFF1F7 100%)",
        }}
      >
        <h2
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "1.4rem",
            fontWeight: 700,
            textAlign: "center",
            padding: "0 16px",
            marginBottom: 24,
            color: cms.heading_color,
          }}
        >
          {cms.heading}
        </h2>

        <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
          <motion.div
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.18}
            onDragEnd={onDragEnd}
            style={{
              width: "100%",
              maxWidth: 360,
            }}
          >
            <AnimatePresence mode="wait" custom={direction} initial={false}>
              <motion.div
                key={current.id}
                initial={{ opacity: 0, x: direction === 1 ? 60 : -60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction === 1 ? -60 : 60 }}
                transition={{ duration: 0.35 }}
              >
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    aspectRatio: "4 / 5",
                    borderRadius: 16,
                    overflow: "hidden",
                    background: "white",
                    boxShadow: "0 4px 20px rgba(230,0,126,0.10)",
                  }}
                >
                  {current.image && (
                    <img
                      src={current.image}
                      alt={`${current.name} - fertility specialist at Shubhashree IVF Kathmandu`}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        objectPosition: "top center",
                        display: "block",
                      }}
                    />
                  )}
                  <div
                    style={{
                      position: "absolute",
                      left: 12,
                      right: 12,
                      bottom: 12,
                      padding: "10px 14px",
                      borderRadius: 16,
                      background: "rgba(255,255,255,0.55)",
                      backdropFilter: "blur(12px)",
                      WebkitBackdropFilter: "blur(12px)",
                      border: "1px solid rgba(255,255,255,0.6)",
                      boxShadow: "0 8px 24px rgba(45,10,30,0.12)",
                    }}
                  >
                    <p
                      style={{
                        fontSize: 17,
                        fontWeight: 700,
                        color: "#2D0A1E",
                        margin: 0,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {current.name}
                    </p>
                    {current.title && (
                      <p
                        style={{
                          fontSize: 11,
                          color: "#8B0F50",
                          margin: "2px 0 0",
                          fontWeight: 600,
                          textTransform: "uppercase",
                          letterSpacing: "0.06em",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {current.title}
                      </p>
                    )}
                  </div>
                </div>
                <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
                  <Link
                    to="/contact"
                    style={{
                      flex: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 6,
                      padding: "10px 8px",
                      fontSize: 13,
                      fontWeight: 700,
                      color: "white",
                      borderRadius: 999,
                      background: "linear-gradient(90deg, #E6007E 0%, #C2185B 100%)",
                    }}
                  >
                    <Calendar className="w-4 h-4" /> Consult Now
                  </Link>
                  <Link
                    to="/team/$doctorSlug"
                    params={{ doctorSlug: current.slug || "" }}
                    style={{
                      flex: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 6,
                      padding: "10px 8px",
                      fontSize: 13,
                      fontWeight: 700,
                      color: "#2D0A1E",
                      borderRadius: 999,
                      background: "white",
                      border: "1.5px solid rgba(45,10,30,0.15)",
                    }}
                  >
                    <User className="w-4 h-4" /> View Profile
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>


        {/* Arrows */}
        <div style={{ display: "flex", justifyContent: "center", gap: 16, marginTop: 20 }}>
          <button
            aria-label="Previous"
            onClick={() => go(-1)}
            style={{
              width: 44,
              height: 44,
              borderRadius: "50%",
              background: "white",
              border: "1.5px solid rgba(230,0,126,0.2)",
              color: "#E6007E",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <button
            aria-label="Next"
            onClick={() => go(1)}
            style={{
              width: 44,
              height: 44,
              borderRadius: "50%",
              background: "white",
              border: "1.5px solid rgba(230,0,126,0.2)",
              color: "#E6007E",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Dots */}
        <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 12 }}>
          {doctors.map((d, i) => (
            <button
              key={d.id}
              aria-label={`Go to ${d.name}`}
              onClick={() => goTo(i)}
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                border: "none",
                padding: 0,
                background: i === active ? "#E6007E" : "rgba(230,0,126,0.25)",
                cursor: "pointer",
              }}
            />
          ))}
        </div>
        {/* progress accessor to keep var used */}
        <span style={{ display: "none" }}>{progress}</span>
      </section>
    )
  }

  return (

    <section
      id="team"
      ref={ref}
      className="relative pt-2 lg:pt-4 pb-16 lg:pb-24 overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at top left, #FFE4F1 0%, transparent 55%), radial-gradient(ellipse at bottom right, #EDE7FF 0%, transparent 55%), linear-gradient(180deg, #FFF7FB 0%, #FFF1F7 100%)",
      }}
    >
      {/* Animated background blobs */}
      <motion.div
        aria-hidden
        className="absolute -top-32 -left-32 w-[480px] h-[480px] rounded-full blur-3xl opacity-40 pointer-events-none"
        style={{ background: "radial-gradient(circle, #FFB6D5 0%, transparent 70%)", willChange: "transform" }}
        animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="absolute -bottom-40 -right-32 w-[520px] h-[520px] rounded-full blur-3xl opacity-40 pointer-events-none"
        style={{ background: "radial-gradient(circle, #D4C5FF 0%, transparent 70%)", willChange: "transform" }}
        animate={{ x: [0, -50, 0], y: [0, -20, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="text-center max-w-3xl mx-auto mb-4 space-y-3"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/60 backdrop-blur-sm border border-rose-200/50 text-xs font-semibold tracking-wide uppercase text-rose-600">
            <Sparkles className="w-3.5 h-3.5" /> Meet our team
          </div>
          <h2
            className="font-serif text-3xl lg:text-4xl font-bold"
            style={{ color: cms.heading_color }}
          >
            {cms.heading}
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_1fr] gap-6 lg:gap-10 items-center">
          {/* LEFT - active card + slider */}
          <div className="relative">
            <motion.div
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.18}
              onDragEnd={onDragEnd}
              className="relative h-[380px] sm:h-[440px] lg:h-[480px] flex items-start justify-center select-none cursor-grab active:cursor-grabbing"
            >
              {/* Glow */}
              <motion.div
                key={`glow-${active}`}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 0.5, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 m-auto w-[75%] h-[75%] rounded-[40px] blur-3xl pointer-events-none"
                style={{
                  background:
                    "linear-gradient(135deg, #FF8FB8 0%, #B79CFF 50%, #FFB78A 100%)",
                  willChange: "transform, opacity",
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
                    onPause={pauseOn}
                  />
                )}

                {/* Active */}
                <AnimatePresence mode="popLayout" custom={direction} initial={false}>
                  <motion.div
                    key={current.id}
                    custom={direction}
                    variants={{
                      enter: (d: 1 | -1) => ({ opacity: 0, x: d === 1 ? 320 : -320, scale: 0.92 }),
                      center: { opacity: 1, x: 0, scale: 1 },
                      exit: (d: 1 | -1) => ({ opacity: 0, x: d === 1 ? -320 : 320, scale: 0.92 }),
                    }}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={SPRING}
                    {...pauseOn}
                    style={{ willChange: "transform, opacity" }}
                    className="relative z-10 w-[300px] sm:w-[380px] lg:w-[400px] h-[440px] sm:h-[520px] lg:h-[550px] rounded-[32px] overflow-hidden shadow-[0_24px_70px_-22px_rgba(194,24,91,0.4)] border border-white/60 group"
                  >
                    <ParallaxImage src={current.image} alt={current.name} />
                    {/* Glass bottom label */}
                    <div className="absolute inset-x-4 bottom-4 rounded-2xl p-3.5 backdrop-blur-xl bg-white/40 border border-white/60 shadow-lg">
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
                    onPause={pauseOn}
                  />
                )}
              </div>
            </motion.div>

            {/* Arrows */}
            <div className="mt-5 flex items-center justify-between">
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
                      className={`block h-1.5 rounded-full transition-all duration-300 ${
                        i === active
                          ? "w-8 bg-rose-500"
                          : "w-1.5 bg-rose-300 group-hover/dot:bg-rose-400"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT - details */}
          <div className="relative" {...pauseOn}>
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current.id}
                custom={direction}
                variants={{
                  enter: (d: 1 | -1) => ({ opacity: 0, x: d === 1 ? 40 : -40 }),
                  center: { opacity: 1, x: 0 },
                  exit: (d: 1 | -1) => ({ opacity: 0, x: d === 1 ? -40 : 40 }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={SPRING_SOFT}
                style={{ willChange: "transform, opacity" }}
                className="rounded-[28px] p-6 sm:p-8 lg:p-9 backdrop-blur-xl bg-white/55 border border-white/70 shadow-[0_20px_60px_-20px_rgba(194,24,91,0.2)]"
              >
                <p className="text-xs font-bold tracking-[0.2em] uppercase text-rose-500 mb-3">
                  Meet our team
                </p>
                <h3 className="font-serif text-3xl lg:text-4xl font-bold text-plum leading-tight mb-2">
                  {current.name}
                </h3>
                {current.title && (
                  <p className="text-base font-semibold mb-2" style={{ color: "#8B0F50" }}>
                    {current.title}
                  </p>
                )}
                {current.qualifications && (
                  <p className="text-sm text-plum/70 mb-1">
                    {current.qualifications}
                  </p>
                )}
                {current.experience_years ? (
                  <p className="text-sm font-semibold text-plum/80 mb-4">
                    {current.experience_years}+ Years of Experience
                  </p>
                ) : (
                  <div className="mb-4" />
                )}

                {current.bio && (
                  <p className="text-[15px] leading-relaxed text-plum/80 mb-5 line-clamp-4">
                    {current.bio}
                  </p>
                )}

                {current.specialties && current.specialties.length > 0 && (
                  <div className="mb-6">
                    <p className="text-xs font-bold uppercase tracking-wider text-plum/60 mb-3">
                      Expertise
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {current.specialties.slice(0, 6).map((s, i) => (
                        <motion.span
                          key={s}
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.05 + i * 0.03, duration: 0.25 }}
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
                      background: "#8B0F50",
                    }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.background = "#6D0A3E")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.background = "#8B0F50")}
                  >
                    <Calendar className="w-4 h-4" /> Consult Now
                  </Link>
                  <Link
                    to="/team/$doctorSlug"
                    params={{ doctorSlug: current.slug || "" }}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-bold bg-white/70 border border-plum/15 text-plum hover:bg-white transition-all"
                  >
                    <User className="w-4 h-4" /> View Profile
                  </Link>
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
          x: ((e.clientX - r.left) / r.width - 0.5) * 14,
          y: ((e.clientY - r.top) / r.height - 0.5) * 14,
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
          transition={{ type: "spring", stiffness: 140, damping: 20 }}
          style={{ willChange: "transform" }}
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
  onPause,
}: {
  doctor: CMSDoctor
  side: "left" | "right"
  onClick: () => void
  onPause: { onMouseEnter: () => void; onMouseLeave: () => void }
}) {
  const isLeft = side === "left"
  return (
    <motion.button
      layout
      onClick={onClick}
      aria-label={`Show ${doctor.name}`}
      initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
      animate={{ opacity: 0.85, x: 0 }}
      whileHover={{ scale: 1.06, opacity: 1 }}
      transition={{ type: "spring", stiffness: 320, damping: 28 }}
      {...onPause}
      style={{ willChange: "transform, opacity" }}
      className={`hidden md:block absolute top-1/2 -translate-y-1/2 ${
        isLeft ? "left-0" : "right-0"
      } w-[120px] lg:w-[150px] h-[220px] lg:h-[280px] rounded-[24px] overflow-hidden shadow-xl border border-white/60 z-0`}
    >
      {doctor.image && (
        <img
          src={doctor.image}
          alt={`${doctor.name} - fertility specialist at Shubhashree IVF Kathmandu`}
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
