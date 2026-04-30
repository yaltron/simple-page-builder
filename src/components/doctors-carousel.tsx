import { useRef, useState } from "react"
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
    bio: "20+ years pioneering IVF in Nepal. Compassionate care for every couple.",
    specializations: ["IVF & ICSI", "Reproductive Surgery", "Fertility Counseling"],
  },
  {
    name: "Dr. Anita Rana",
    specialty: "Reproductive Endocrinologist",
    image: doctor2,
    bio: "Hormonal disorder expert helping restore natural fertility cycles.",
    specializations: ["PCOS Management", "Endocrine Disorders", "Ovulation Induction"],
  },
  {
    name: "Dr. Rajesh Shrestha",
    specialty: "Senior Embryologist",
    image: doctor3,
    bio: "Lab director with cutting-edge embryo culture expertise.",
    specializations: ["Embryo Culture", "Cryopreservation", "Genetic Screening"],
  },
  {
    name: "Dr. Priya Poudel",
    specialty: "Fertility Specialist",
    image: doctor4,
    bio: "Dedicated to personalized fertility treatment plans.",
    specializations: ["IUI", "Egg Freezing", "Donor Programs"],
  },
  {
    name: "Dr. Amit KC",
    specialty: "Reproductive Medicine",
    image: doctor5,
    bio: "Specialist in male fertility and advanced reproductive techniques.",
    specializations: ["Male Infertility", "TESA/PESA", "Andrology"],
  },
  {
    name: "Dr. Sita Thapa",
    specialty: "Fertility Specialist",
    image: doctor6,
    bio: "Caring approach to high-risk and complex fertility cases.",
    specializations: ["Recurrent Loss", "High-Risk Pregnancy", "Counseling"],
  },
]

function DoctorCard({
  doctor,
  onHoverChange,
}: {
  doctor: (typeof doctors)[0]
  onHoverChange: (hovered: boolean) => void
}) {
  return (
    <div
      className="flex-shrink-0 w-[280px] h-[520px] [perspective:1200px] group"
      onMouseEnter={() => onHoverChange(true)}
      onMouseLeave={() => onHoverChange(false)}
    >
      <div className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
        {/* Front */}
        <div className="absolute inset-0 [backface-visibility:hidden] bg-gradient-to-b from-rose-light/30 to-cream rounded-3xl p-6">
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

          <p className="text-xs text-muted-foreground italic">
            Hover to see profile
          </p>
        </div>

        {/* Back */}
        <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] bg-gradient-to-br from-rose-light/40 via-cream to-teal-light/30 rounded-3xl p-6 flex flex-col">
          <h3 className="font-serif text-xl font-bold text-plum mb-1">
            {doctor.name}
          </h3>
          <p className="text-xs text-rose font-medium uppercase tracking-wide mb-3">
            {doctor.specialty}
          </p>

          <p className="text-sm text-plum/80 mb-4 leading-relaxed">
            {doctor.bio}
          </p>

          <div className="mb-4">
            <p className="text-xs font-semibold text-plum uppercase tracking-wide mb-2">
              Specializations
            </p>
            <ul className="space-y-1">
              {doctor.specializations.map((s) => (
                <li key={s} className="text-sm text-plum/80 flex items-start gap-2">
                  <span className="text-rose mt-1">•</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-auto space-y-2">
            <div className="flex gap-2">
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
      </div>
    </div>
  )
}

export function DoctorsCarousel() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [paused, setPaused] = useState(false)

  const loop = [...doctors, ...doctors]

  return (
    <section id="team" ref={ref} className="py-20 lg:py-32 bg-cream overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

      <div
        className="relative"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        }}
      >
        <div
          className="flex w-max py-4 animate-marquee gap-6"
          style={{ animationPlayState: paused ? "paused" : "running" }}
        >
          {loop.map((doctor, i) => (
            <DoctorCard
              key={`${doctor.name}-${i}`}
              doctor={doctor}
              onHoverChange={setPaused}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
