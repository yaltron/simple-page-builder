
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { FloatingDecoField } from "@/components/floating-deco"
import stepAppointment from "@/assets/step-appointment.jpg"
import stepAssessment from "@/assets/step-assessment.jpg"
import stepTreatment from "@/assets/step-treatment.jpg"
import stepSupport from "@/assets/step-support.jpg"

const steps = [
  {
    number: "01",
    title: "Book Your Appointment",
    description: "Schedule a consultation with our fertility specialists. We offer both in-person and virtual consultations for your convenience.",
    image: stepAppointment,
    imagePosition: "right",
  },
  {
    number: "02",
    title: "Get Checked & Know Your Options",
    description: "Undergo comprehensive fertility assessments. Our team will explain all available treatment options tailored to your unique situation.",
    image: stepAssessment,
    imagePosition: "left",
  },
  {
    number: "03",
    title: "Start Your Treatment",
    description: "Begin your personalized fertility treatment with our experienced team. We use the latest techniques and technologies for optimal results.",
    image: stepTreatment,
    imagePosition: "right",
  },
  {
    number: "04",
    title: "Stay Supported Every Step",
    description: "Receive continuous support throughout your journey. Our counselors and medical team are with you from consultation to conception and beyond.",
    image: stepSupport,
    imagePosition: "left",
  },
]

function ProcessStep({ 
  step, 
  index 
}: { 
  step: typeof steps[0]
  index: number 
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const isImageRight = step.imagePosition === "right"

  return (
    <div ref={ref} className="relative">
      {/* Connecting line */}
      {index < steps.length - 1 && (
        <div className="absolute left-1/2 top-full h-20 w-px border-l-2 border-dashed border-rose/30 hidden lg:block" />
      )}

      <div className={`grid lg:grid-cols-2 gap-8 lg:gap-16 items-center`}>
        {/* Content */}
        <motion.div
          initial={{ opacity: 0, x: isImageRight ? -50 : 50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className={`space-y-5 ${isImageRight ? "lg:order-1" : "lg:order-2"}`}
        >
          {/* Number badge + title row */}
          <div className="flex items-center gap-5">
            <div className="relative flex-shrink-0">
              <div className="absolute inset-0 rounded-full bg-rose/10 blur-md" aria-hidden="true" />
              <div className="relative w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-gradient-to-br from-rose to-rose-dark text-white flex items-center justify-center shadow-lg shadow-rose/20">
                <span className="font-serif text-2xl lg:text-3xl font-bold">
                  {step.number}
                </span>
              </div>
            </div>
            <div className="h-px flex-1 bg-gradient-to-r from-rose/40 to-transparent" />
          </div>

          <h3 className="font-serif text-2xl lg:text-3xl font-bold text-plum">
            {step.title}
          </h3>
          <p className="text-muted-foreground leading-relaxed max-w-md">
            {step.description}
          </p>
        </motion.div>

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: isImageRight ? 50 : -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={isImageRight ? "lg:order-2" : "lg:order-1"}
        >
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <img
              src={step.image}
              alt={step.title}
              className="w-full h-auto object-cover"
              loading="lazy"
            />
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export function ProcessSteps() {
  const headerRef = useRef(null)
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" })

  return (
    <section className="py-20 lg:py-32 bg-white relative overflow-hidden">
      <FloatingDecoField
        items={[
          { shape: "plus", color: "rose", size: 22, top: "8%", left: "6%", floatDuration: 7, rotateDuration: 20, delay: 0 },
          { shape: "dashed-ring", color: "teal", size: 50, top: "30%", right: "5%", floatDuration: 9, rotateDuration: 24, delay: -3 },
          { shape: "hollow-circle", color: "gold", size: 28, top: "60%", left: "4%", floatDuration: 8, rotateDuration: 22, delay: -2 },
          { shape: "square", color: "rose", size: 18, top: "85%", right: "12%", floatDuration: 6, rotateDuration: 18, delay: -4 },
          { shape: "lines", color: "teal", size: 24, top: "45%", left: "48%", floatDuration: 7, rotateDuration: 19, delay: -1 },
          { shape: "plus", color: "gold", size: 16, top: "78%", left: "32%", floatDuration: 8, rotateDuration: 21, delay: -5 },
        ]}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16 lg:mb-24"
        >
          <span className="text-sm font-medium uppercase tracking-wider text-rose">
            How We Work
          </span>
          <h2 className="font-serif text-3xl lg:text-4xl font-bold text-plum mt-4 text-balance">
            Guiding You Through Every Step with Compassion & Care
          </h2>
        </motion.div>

        {/* Steps */}
        <div className="space-y-20 lg:space-y-32">
          {steps.map((step, index) => (
            <ProcessStep key={step.number} step={step} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
