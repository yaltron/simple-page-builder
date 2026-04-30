
import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const doctors = [
  {
    name: "Dr. Subhashree Devi",
    specialty: "Chief Fertility Specialist",
    image: "https://placehold.co/280x350/FFE4EC/C2185B?text=Dr.+Subhashree",
  },
  {
    name: "Dr. Anita Rana",
    specialty: "Reproductive Endocrinologist",
    image: "https://placehold.co/280x350/E0F2F1/00897B?text=Dr.+Anita",
  },
  {
    name: "Dr. Rajesh Shrestha",
    specialty: "Senior Embryologist",
    image: "https://placehold.co/280x350/FFF8E1/F9A825?text=Dr.+Rajesh",
  },
  {
    name: "Dr. Priya Poudel",
    specialty: "Fertility Specialist",
    image: "https://placehold.co/280x350/FFE4EC/C2185B?text=Dr.+Priya",
  },
  {
    name: "Dr. Amit KC",
    specialty: "Reproductive Medicine",
    image: "https://placehold.co/280x350/E0F2F1/00897B?text=Dr.+Amit",
  },
  {
    name: "Dr. Sita Thapa",
    specialty: "Fertility Specialist",
    image: "https://placehold.co/280x350/FFF8E1/F9A825?text=Dr.+Sita",
  },
]

export function DoctorsCarousel() {
  const ref = useRef(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const el = scrollRef.current
      const scrollAmount = 304 // card width (280) + gap (24)
      const start = el.scrollLeft
      const target = direction === "left" ? start - scrollAmount : start + scrollAmount
      const distance = target - start
      const duration = 600
      let startTime: number | null = null

      const easeInOutCubic = (t: number) =>
        t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2

      const step = (timestamp: number) => {
        if (startTime === null) startTime = timestamp
        const elapsed = timestamp - startTime
        const progress = Math.min(elapsed / duration, 1)
        el.scrollLeft = start + distance * easeInOutCubic(progress)
        if (progress < 1) {
          requestAnimationFrame(step)
        } else {
          checkScroll()
        }
      }
      requestAnimationFrame(step)
    }
  }

  return (
    <section id="team" ref={ref} className="py-20 lg:py-32 bg-cream overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <span className="text-sm font-medium uppercase tracking-wider text-rose">
              Our Team
            </span>
            <h2 className="font-serif text-3xl lg:text-4xl font-bold text-plum">
              World-Class Doctors, Dedicated to Your Care
            </h2>
          </motion.div>

          {/* Navigation buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex gap-2"
          >
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className="w-12 h-12 rounded-full border border-plum/20 flex items-center justify-center text-plum hover:bg-plum hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className="w-12 h-12 rounded-full border border-plum/20 flex items-center justify-center text-plum hover:bg-plum hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </motion.div>
        </div>

        {/* Carousel */}
        <div
          ref={scrollRef}
          onScroll={checkScroll}
          className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4 snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {doctors.map((doctor, index) => (
            <motion.div
              key={doctor.name}
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex-shrink-0 w-[280px] snap-start"
            >
              <div className="bg-gradient-to-b from-rose-light/30 to-cream rounded-3xl p-6 h-full">
                {/* Image */}
                <div className="rounded-2xl overflow-hidden mb-6">
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-full h-[280px] object-cover"
                  />
                </div>

                {/* Info */}
                <h3 className="font-serif text-xl font-bold text-plum mb-1">
                  {doctor.name}
                </h3>
                <p className="text-sm text-rose font-medium uppercase tracking-wide mb-4">
                  {doctor.specialty}
                </p>

                {/* Buttons */}
                <div className="flex gap-2 mb-3">
                  <Button 
                    size="sm" 
                    className="flex-1 bg-rose hover:bg-rose-dark text-white rounded-full text-xs"
                  >
                    Consult Now
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="flex-1 rounded-full text-xs border-plum/20"
                  >
                    Call Back
                  </Button>
                </div>

                <a 
                  href="#" 
                  className="inline-flex items-center gap-1 text-sm text-rose font-medium hover:gap-2 transition-all"
                >
                  View Profile
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
