
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Check, Play } from "lucide-react"
import { Button } from "@/components/ui/button"

const reasons = [
  "Couples who cannot conceive naturally",
  "Couples with recurrent pregnancy losses",
  "Couples carrying genetic disorders",
  "Men with fertility issues",
  "Women with ovarian problems",
  "Cancer patients preserving fertility",
]

export function WhenToVisit() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-20 lg:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 min-h-[600px]">
          {/* Left side - Rose gradient */}
          <div className="bg-gradient-to-br from-rose to-rose-dark p-8 lg:p-16 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <span className="text-sm font-medium uppercase tracking-wider text-rose-light">
                When to Visit
              </span>
              <h2 className="font-serif text-3xl lg:text-4xl font-bold text-white">
                Signs You Should See a Fertility Specialist
              </h2>

              {/* Checklist */}
              <div className="space-y-4 pt-4">
                {reasons.map((reason, index) => (
                  <motion.div
                    key={reason}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-white/90">{reason}</span>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="pt-6"
              >
                <Button 
                  size="lg"
                  className="bg-white text-rose hover:bg-white/90 rounded-full px-8"
                >
                  Book an Appointment
                </Button>
              </motion.div>
            </motion.div>
          </div>

          {/* Right side - Image grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="p-4 lg:p-8 bg-cream"
          >
            <div className="grid grid-cols-2 gap-4 h-full">
              <div className="space-y-4">
                <div className="rounded-2xl overflow-hidden h-48 lg:h-64">
                  <img
                    src="https://placehold.co/300x300/FFE4EC/C2185B?text=Care"
                    alt="Compassionate care"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden h-32 lg:h-40">
                  <img
                    src="https://placehold.co/300x200/E0F2F1/00897B?text=Consult"
                    alt="Consultation"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="rounded-2xl overflow-hidden h-32 lg:h-40">
                  <img
                    src="https://placehold.co/300x200/FFF8E1/F9A825?text=Hope"
                    alt="Hope for families"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Video thumbnail */}
                <div className="rounded-2xl overflow-hidden h-48 lg:h-64 relative group cursor-pointer">
                  <img
                    src="https://placehold.co/300x300/FFE4EC/C2185B?text=Video"
                    alt="Watch our video"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                      <Play className="w-6 h-6 text-rose fill-rose ml-1" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
