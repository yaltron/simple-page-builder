
import { useRef, useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { Trophy, Baby, Users } from "lucide-react"
import { GradientMesh } from "@/components/gradient-mesh"

const stats = [
  {
    icon: Trophy,
    number: 12,
    suffix: "+",
    label: "Years",
    sublabel: "Caring for Families",
  },
  {
    icon: Baby,
    number: 5000,
    suffix: "+",
    label: "Successful",
    sublabel: "Treatments",
  },
  {
    icon: Users,
    number: 20,
    suffix: "+",
    label: "Expert",
    sublabel: "Specialists",
  },
]

function AnimatedNumber({ 
  value, 
  suffix, 
  isInView 
}: { 
  value: number
  suffix: string
  isInView: boolean 
}) {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    if (!isInView) return

    const duration = 2000
    const steps = 60
    const stepValue = value / steps
    const stepTime = duration / steps

    let current = 0
    const interval = setInterval(() => {
      current += stepValue
      if (current >= value) {
        setDisplayValue(value)
        clearInterval(interval)
      } else {
        setDisplayValue(Math.floor(current))
      }
    }, stepTime)

    return () => clearInterval(interval)
  }, [value, isInView])

  return (
    <span>
      {displayValue.toLocaleString()}{suffix}
    </span>
  )
}

export function Stats() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-20 lg:py-24 bg-gradient-to-r from-rose-dark to-rose relative overflow-hidden">
      {/* Animated gradient mesh — screen blend brightens through dark bg */}
      <GradientMesh
        blendMode="screen"
        items={[
          {
            color: "rose-light",
            size: 780,
            minOpacity: 0.12,
            maxOpacity: 0.18,
            driftRange: 90,
            driftDuration: 22,
            pulseDuration: 10,
            top: "-220px",
            left: "-180px",
          },
          {
            color: "gold",
            size: 700,
            minOpacity: 0.1,
            maxOpacity: 0.16,
            driftRange: 80,
            driftDuration: 26,
            pulseDuration: 11,
            delay: -6,
            top: "10%",
            right: "-160px",
          },
          {
            color: "white",
            size: 640,
            minOpacity: 0.08,
            maxOpacity: 0.14,
            driftRange: 70,
            driftDuration: 28,
            pulseDuration: 9,
            delay: -10,
            bottom: "-200px",
            left: "30%",
          },
          {
            color: "teal-light",
            size: 720,
            minOpacity: 0.08,
            maxOpacity: 0.15,
            driftRange: 100,
            driftDuration: 24,
            pulseDuration: 12,
            delay: -3,
            bottom: "-180px",
            right: "10%",
          },
        ]}
      />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center relative"
            >
              {/* Divider */}
              {index < stats.length - 1 && (
                <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 h-20 w-px bg-white/20" />
              )}

              <div className="flex flex-col items-center">
                <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center mb-4">
                  <stat.icon className="w-7 h-7 text-white" />
                </div>
                <div className="font-serif text-4xl lg:text-5xl font-bold text-white mb-2">
                  <AnimatedNumber 
                    value={stat.number} 
                    suffix={stat.suffix} 
                    isInView={isInView} 
                  />
                </div>
                <div className="text-white/80">
                  <span className="font-medium">{stat.label}</span>
                  <br />
                  <span className="text-sm">{stat.sublabel}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
