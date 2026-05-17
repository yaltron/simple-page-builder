import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Link } from "@tanstack/react-router"
import { Button } from "@/components/ui/button"
import { useHomepageSection } from "@/lib/use-cms-content"
import { useDoctors, type CMSDoctor } from "@/lib/use-doctors"

const DOCTORS_HEADING_DEFAULTS = {
  heading: "Experienced IVF Specialists Providing Compassionate Fertility Care",
  heading_color: "#C2185B",
}

function DoctorCard({
  doctor,
  onHoverChange,
}: {
  doctor: CMSDoctor
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
          <div className="rounded-2xl overflow-hidden mb-6 bg-gray-100 h-[280px]">
            {doctor.image && (
              <img
                src={doctor.image}
                alt={doctor.name}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            )}
          </div>

          <h3 className="font-serif text-xl font-bold text-plum mb-1">
            {doctor.name}
          </h3>
          {doctor.title && (
            <p className="text-sm text-rose font-medium uppercase tracking-wide mb-4">
              {doctor.title}
            </p>
          )}
        </div>

        {/* Back */}
        <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] bg-gradient-to-br from-rose-light/40 via-cream to-teal-light/30 rounded-3xl p-6 flex flex-col">
          <h3 className="font-serif text-xl font-bold text-plum mb-1">
            {doctor.name}
          </h3>
          {doctor.title && (
            <p className="text-xs text-rose font-medium uppercase tracking-wide mb-3">
              {doctor.title}
            </p>
          )}

          {doctor.bio && (
            <p className="text-sm text-plum/80 mb-4 leading-relaxed line-clamp-4">
              {doctor.bio}
            </p>
          )}

          {doctor.specialties && doctor.specialties.length > 0 && (
            <div className="mb-4">
              <p className="text-xs font-semibold text-plum uppercase tracking-wide mb-2">
                Specializations
              </p>
              <ul className="space-y-1">
                {doctor.specialties.slice(0, 4).map((s) => (
                  <li key={s} className="text-sm text-plum/80 flex items-start gap-2">
                    <span className="text-rose mt-1">•</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-auto space-y-2">
            <div className="flex gap-2">
              <Button
                asChild
                size="sm"
                className="flex-1 bg-rose hover:bg-rose-dark text-white rounded-full text-xs"
              >
                <Link to="/contact">Consult Now</Link>
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => window.dispatchEvent(new CustomEvent("open-call-popover"))}
                className="flex-1 rounded-full text-xs border-plum/20"
              >
                Call Back
              </Button>
            </div>
            <Link
              to="/team"
              className="inline-flex items-center gap-1 text-sm text-rose font-medium hover:gap-2 transition-all"
            >
              View Profile
              <ArrowRight className="w-4 h-4" />
            </Link>
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
  const cms = useHomepageSection("doctors_heading", DOCTORS_HEADING_DEFAULTS)
  const { doctors } = useDoctors()

  if (doctors.length === 0) return null

  const loop = [...doctors, ...doctors]

  return (
    <section id="team" ref={ref} className="pt-10 pb-20 lg:pb-32 bg-cream overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-12 space-y-4"
        >
          <h2 className="font-serif text-3xl lg:text-4xl font-bold" style={{ color: cms.heading_color }}>
            {cms.heading}
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
              key={`${doctor.id}-${i}`}
              doctor={doctor}
              onHoverChange={setPaused}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
