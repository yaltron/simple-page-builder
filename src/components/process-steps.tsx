"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

const steps = [
  {
    number: "01",
    title: "Book Your Appointment",
    description: "Schedule a consultation with our fertility specialists. We offer both in-person and virtual consultations for your convenience.",
    image: "https://placehold.co/400x300/FFE4EC/C2185B?text=Appointment",
    imagePosition: "right",
  },
  {
    number: "02",
    title: "Get Checked & Know Your Options",
    description: "Undergo comprehensive fertility assessments. Our team will explain all available treatment options tailored to your unique situation.",
    image: "https://placehold.co/400x300/E0F2F1/00897B?text=Assessment",
    imagePosition: "left",
  },
  {
    number: "03",
    title: "Start Your Treatment",
    description: "Begin your personalized fertility treatment with our experienced team. We use the latest techniques and technologies for optimal results.",
    image: "https://placehold.co/400x300/FFF8E1/F9A825?text=Treatment",
    imagePosition: "right",
  },
  {
    number: "04",
    title: "Stay Supported Every Step",
    description: "Receive continuous support throughout your journey. Our counselors and medical team are with you from consultation to conception and beyond.",
    image: "https://placehold.co/400x300/FFE4EC/C2185B?text=Support",
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

      <div className={`grid lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
        isImageRight ? "" : "lg:flex-row-reverse"
      }`}>
        {/* Content */}
        <motion.div
          initial={{ opacity: 0, x: isImageRight ? -50 : 50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className={`space-y-4 ${isImageRight ? "lg:order-1" : "lg:order-2"}`}
        >
          <span className="font-serif text-7xl lg:text-8xl font-bold text-rose/20">
            {step.number}
          </span>
          <h3 className="font-serif text-2xl lg:text-3xl font-bold text-plum -mt-12 relative">
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
    <section className="py-20 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
