import { useEffect, useRef, useState } from "react"
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

export function ProcessSteps() {
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true)
            obs.disconnect()
          }
        })
      },
      { threshold: 0.15 }
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
          {/* Snake connector (desktop only) */}
          <svg
            className="hidden lg:block absolute left-0 right-0 top-16 h-40 -z-0 w-full pointer-events-none"
            viewBox="0 0 1200 160"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M 130 30 C 320 30, 320 130, 510 130 S 700 30, 890 30 S 1070 130, 1070 130"
              stroke="oklch(0.62 0.27 357)"
              strokeWidth="2.5"
              strokeDasharray="2 10"
              strokeLinecap="round"
              fill="none"
              opacity="0.55"
            />
          </svg>

          {steps.map((step, i) => {
            const Icon = step.icon
            const offset = i % 2 === 1 ? "lg:translate-y-24" : "lg:translate-y-0"
            return (
              <div
                key={step.number}
                className={`reveal ${inView ? "in-view" : ""} relative z-10 flex flex-col items-center ${offset}`}
                style={{ transitionDelay: `${i * 140}ms` }}
              >
                <div className="relative mb-5">
                  <span className="absolute inset-0 rounded-full border-2 border-brand-pink/20 animate-pulse-ring" />
                  <div className="h-28 w-28 rounded-full gradient-brand grid place-items-center text-white shadow-[0_15px_30px_-10px_oklch(0.62_0.27_357/0.5)] card-hover">
                    <Icon className="h-11 w-11" strokeWidth={1.8} />
                  </div>
                  <span className="absolute -top-1 -right-1 h-9 w-9 rounded-full bg-white border-2 border-brand-pink grid place-items-center text-brand-pink font-extrabold text-xs shadow-md">
                    {step.number}
                  </span>
                </div>
                <h3 className="font-bold text-lg mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground max-w-[220px] mx-auto">
                  {step.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
