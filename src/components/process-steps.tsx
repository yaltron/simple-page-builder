import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ClipboardList, UserCheck, CalendarCheck, CheckCircle2, type LucideIcon } from "lucide-react"
import { Link } from "@tanstack/react-router"
import { useHomepageSection } from "@/lib/use-cms-content"

const PROCESS_DEFAULTS = {
  heading: "A Simple Guide to Your",
  heading_highlight: "Fertility Journey",
  heading_color: "#E6007E",
}

type Step = {
  icon: LucideIcon
  number: string
  title: string
  description: string
  to: "/services" | "/team" | "/contact"
}

const steps: Step[] = [
  {
    icon: ClipboardList,
    number: "01",
    title: "Select Your Service",
    description: "Choose the type of consultation you need based on your concerns and goals.",
    to: "/services",
  },
  {
    icon: UserCheck,
    number: "02",
    title: "Pick Your Specialist",
    description: "Browse experts and select the doctor that suits your preferences.",
    to: "/team",
  },
  {
    icon: CalendarCheck,
    number: "03",
    title: "Choose Date & Time",
    description: "Pick available slots and book a time that works best for your schedule.",
    to: "/contact",
  },
  {
    icon: CheckCircle2,
    number: "04",
    title: "Confirm & Attend",
    description: "Complete the booking & join your appointment with a heart of confidence.",
    to: "/contact",
  },
]

const STEP_OFFSETS_LG = [0, 120, 30, 120]
const STEP_DELAYS = [0, 0.8, 1.6, 2.4]

export function ProcessSteps() {
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const [runId, setRunId] = useState(0)
  const [active, setActive] = useState(false)
  const [isLg, setIsLg] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)")
    const update = () => setIsLg(mq.matches)
    update()
    mq.addEventListener("change", update)
    return () => mq.removeEventListener("change", update)
  }, [])

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
    <section id="process" className="pt-20 pb-[80px] bg-pink-soft/40 overflow-visible">
      <div ref={sectionRef} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-16">
          A Simple Guide to Your <span className="text-brand-pink">Fertility Journey</span>
        </h2>

        <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-14 gap-x-6">
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
                className="group relative z-10 flex flex-col items-center overflow-visible"
                style={{ ["--lg-offset" as never]: `${lgOffset}px` }}
              >
                <Link
                  to={step.to}
                  className="flex flex-col items-center w-full min-h-[320px] relative overflow-visible cursor-pointer"
                  style={{ transform: isLg ? `translateY(${lgOffset}px)` : undefined }}
                >
                  <div className="relative mb-5">
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

                    <div className="step-circle h-28 w-28 rounded-full gradient-brand grid place-items-center text-white">
                      <span className="step-icon inline-flex transition-transform duration-[400ms] ease-out group-hover:scale-[1.15] group-hover:-rotate-[8deg]">
                        <Icon className="h-11 w-11" strokeWidth={1.8} />
                      </span>
                    </div>

                    <motion.span
                      key={`badge-${runId}-${i}`}
                      className="step-badge absolute -top-1 -right-1 h-9 w-9 rounded-full border-2 border-brand-pink grid place-items-center font-extrabold text-xs shadow-md"
                      initial={{ backgroundColor: "#ffffff", color: "#E6007E" }}
                      animate={
                        active
                          ? { backgroundColor: ["#ffffff", "#E6007E", "#ffffff"], color: ["#E6007E", "#ffffff", "#E6007E"] }
                          : { backgroundColor: "#ffffff", color: "#E6007E" }
                      }
                      transition={{ duration: 0.4, delay, ease: "easeOut" }}
                    >
                      {step.number}
                    </motion.span>
                  </div>

                  <motion.h3
                    key={`title-${runId}-${i}`}
                    className="step-title font-bold text-lg mb-2 transition-colors duration-300"
                    initial={{ color: "#1A1535" }}
                    animate={active ? { color: ["#1A1535", "#E6007E", "#1A1535"] } : { color: "#1A1535" }}
                    transition={{ duration: 0.5, delay, ease: "easeOut" }}
                  >
                    {step.title}
                  </motion.h3>
                  <p className="text-sm text-muted-foreground max-w-[220px] mx-auto">
                    {step.description}
                  </p>
                  <span className="mt-3 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: "#E6007E" }}>
                    Visit page →
                  </span>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
