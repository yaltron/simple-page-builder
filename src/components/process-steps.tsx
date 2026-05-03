import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ClipboardList, UserCheck, CalendarCheck, CheckCircle2, type LucideIcon } from "lucide-react"

type Step = {
  icon: LucideIcon
  number: string
  title: string
  description: string
}

const steps: Step[] = [
  {
    icon: ClipboardList,
    number: "01",
    title: "Select Your Service",
    description: "Choose the type of consultation you need based on your concerns and goals.",
  },
  {
    icon: UserCheck,
    number: "02",
    title: "Pick Your Specialist",
    description: "Browse experts and select the doctor that suits your preferences.",
  },
  {
    icon: CalendarCheck,
    number: "03",
    title: "Choose Date & Time",
    description: "Pick available slots and book a time that works best for your schedule.",
  },
  {
    icon: CheckCircle2,
    number: "04",
    title: "Confirm & Attend",
    description: "Complete the booking & join your appointment with a heart of confidence.",
  },
]

// SVG path connecting step centers in a smooth wave
const PATH_D =
  "M 150 60 C 300 60, 300 180, 450 180 S 600 90, 750 90 S 900 180, 1050 180"

// Vertical offsets (px) for each step on desktop — matches SVG y positions
const STEP_OFFSETS_LG = [0, 120, 30, 120]

// When each step's highlight fires (seconds after section enters)
const STEP_DELAYS = [0, 0.8, 1.6, 2.4]

export function ProcessSteps() {
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const [runId, setRunId] = useState(0) // bump to replay animations
  const [active, setActive] = useState(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(true)
            setRunId((n) => n + 1)
          } else {
            setActive(false)
          }
        })
      },
      { threshold: 0.25 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="process" className="py-20 bg-pink-soft/40 overflow-hidden">
      <div ref={sectionRef} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-brand-pink uppercase tracking-wider text-xs font-semibold mb-3">
          ✦ How It Works
        </p>
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-16">
          A Simple Guide to Your <span className="text-brand-pink">Fertility Journey</span>
        </h2>

        <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-14 gap-x-6">
          {/* Animated SVG path (desktop only) */}
          <svg
            key={`svg-${runId}`}
            className="hidden lg:block absolute left-0 right-0 top-16 h-60 w-full pointer-events-none -z-0"
            viewBox="0 0 1200 240"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="processProgress" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#1BA0DC" />
                <stop offset="100%" stopColor="#E6007E" />
              </linearGradient>
            </defs>

            {/* Faint dashed base line */}
            <path
              d={PATH_D}
              stroke="rgba(230, 0, 126, 0.15)"
              strokeWidth="2.5"
              strokeDasharray="8 6"
              strokeLinecap="round"
              fill="none"
            />

            {/* Progress fill (gradient) — animated via stroke-dashoffset */}
            <path
              d={PATH_D}
              stroke="url(#processProgress)"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
              pathLength={1}
              strokeDasharray="1 1"
              style={{
                strokeDashoffset: active ? 0 : 1,
                transition: "stroke-dashoffset 2.5s ease-in-out",
              }}
            />

            {/* Travelling glowing dot */}
            {active && (
              <circle r="6" fill="#E6007E" style={{ filter: "drop-shadow(0 0 8px #E6007E)" }}>
                <animateMotion dur="2.5s" repeatCount="1" fill="freeze" path={PATH_D} />
              </circle>
            )}
          </svg>

          {steps.map((step, i) => {
            const Icon = step.icon
            const lgOffset = STEP_OFFSETS_LG[i]
            const delay = STEP_DELAYS[i]
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 28 }}
                animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
                transition={{ duration: 0.7, delay: i * 0.14, ease: "easeOut" }}
                className="relative z-10 flex flex-col items-center"
                style={{ ["--lg-offset" as never]: `${lgOffset}px` }}
              >
                <div
                  className="flex flex-col items-center"
                  style={{ transform: `translateY(var(--lg-offset, 0px))` }}
                >
                  <div className="relative mb-5">
                    {/* Pulse glow ring on arrival */}
                    <AnimatePresence>
                      {active && (
                        <motion.span
                          key={`pulse-${runId}-${i}`}
                          className="absolute inset-0 rounded-full"
                          style={{ boxShadow: "0 0 0 0 #E6007E", border: "2px solid #E6007E" }}
                          initial={{ scale: 1, opacity: 0 }}
                          animate={{ scale: [1, 1.25, 1], opacity: [0, 0.5, 0] }}
                          transition={{ duration: 0.6, ease: "easeOut", delay }}
                        />
                      )}
                    </AnimatePresence>

                    <div className="h-28 w-28 rounded-full gradient-brand grid place-items-center text-white shadow-[0_15px_30px_-10px_oklch(0.62_0.27_357/0.5)] card-hover">
                      <Icon className="h-11 w-11" strokeWidth={1.8} />
                    </div>

                    {/* Number badge with flash on arrival */}
                    <motion.span
                      key={`badge-${runId}-${i}`}
                      className="absolute -top-1 -right-1 h-9 w-9 rounded-full border-2 border-brand-pink grid place-items-center font-extrabold text-xs shadow-md"
                      initial={{ backgroundColor: "#ffffff", color: "#E6007E" }}
                      animate={
                        active
                          ? {
                              backgroundColor: ["#ffffff", "#E6007E", "#ffffff"],
                              color: ["#E6007E", "#ffffff", "#E6007E"],
                            }
                          : { backgroundColor: "#ffffff", color: "#E6007E" }
                      }
                      transition={{ duration: 0.4, delay, ease: "easeOut" }}
                    >
                      {step.number}
                    </motion.span>
                  </div>

                  <motion.h3
                    key={`title-${runId}-${i}`}
                    className="font-bold text-lg mb-2"
                    initial={{ color: "#1A1535" }}
                    animate={
                      active
                        ? { color: ["#1A1535", "#E6007E", "#1A1535"] }
                        : { color: "#1A1535" }
                    }
                    transition={{ duration: 0.5, delay, ease: "easeOut" }}
                  >
                    {step.title}
                  </motion.h3>
                  <p className="text-sm text-muted-foreground max-w-[220px] mx-auto">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
