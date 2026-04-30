
import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import doctor1 from "@/assets/doctor-1.jpg"
import doctor2 from "@/assets/doctor-2.jpg"
import doctor3 from "@/assets/doctor-3.jpg"
import doctor4 from "@/assets/doctor-4.jpg"
import doctor5 from "@/assets/doctor-5.jpg"
import doctor6 from "@/assets/doctor-6.jpg"

const doctors = [
  {
    name: "Dr. Shubhashree Devi",
    specialty: "Chief Fertility Specialist",
    image: doctor1,
  },
  {
    name: "Dr. Anita Rana",
    specialty: "Reproductive Endocrinologist",
    image: doctor2,
  },
  {
    name: "Dr. Rajesh Shrestha",
    specialty: "Senior Embryologist",
    image: doctor3,
  },
  {
    name: "Dr. Priya Poudel",
    specialty: "Fertility Specialist",
    image: doctor4,
  },
  {
    name: "Dr. Amit KC",
    specialty: "Reproductive Medicine",
    image: doctor5,
  },
  {
    name: "Dr. Sita Thapa",
    specialty: "Fertility Specialist",
    image: doctor6,
  },
]

function DoctorCard({ doctor }: { doctor: (typeof doctors)[0] }) {
  return (
    <div className="flex-shrink-0 w-[280px]">
      <div className="bg-gradient-to-b from-rose-light/30 to-cream rounded-3xl p-6 h-full">
        <div className="rounded-2xl overflow-hidden mb-6">
          <img
            src={doctor.image}
            alt={doctor.name}
            className="w-full h-[280px] object-cover"
            loading="lazy"
          />
        </div>

        <h3 className="font-serif text-xl font-bold text-plum mb-1">
          {doctor.name}
        </h3>
        <p className="text-sm text-rose font-medium uppercase tracking-wide mb-4">
          {doctor.specialty}
        </p>

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
    </div>
  )
}

export function DoctorsCarousel() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  // Duplicate the list for a seamless infinite loop
  const loop = [...doctors, ...doctors]

  return (
    <section id="team" ref={ref} className="py-20 lg:py-32 bg-cream overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-12 space-y-4"
        >
          <span className="text-sm font-medium uppercase tracking-wider text-rose">
            Our Team
          </span>
          <h2 className="font-serif text-3xl lg:text-4xl font-bold text-plum">
            World-Class Doctors, Dedicated to Your Care
          </h2>
        </motion.div>
      </div>

      {/* Auto-scrolling marquee */}
      <div
        className="relative"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        }}
      >
        <div className="flex w-max py-4 animate-marquee hover:[animation-play-state:paused] gap-6">
          {loop.map((doctor, i) => (
            <DoctorCard key={`${doctor.name}-${i}`} doctor={doctor} />
          ))}
        </div>
      </div>
    </section>
  )
}
