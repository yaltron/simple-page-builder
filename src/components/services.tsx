
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { 
  Heart, 
  Microscope, 
  Snowflake, 
  Dna, 
  Users, 
  Stethoscope,
  ArrowRight 
} from "lucide-react"

const services = [
  {
    icon: Heart,
    title: "IVF Treatment",
    description: "Advanced in-vitro fertilization with personalized protocols for optimal success rates.",
    color: "from-rose-light/40 to-rose-light/10",
  },
  {
    icon: Microscope,
    title: "ICSI Procedure",
    description: "Intracytoplasmic sperm injection for male factor infertility with precision technology.",
    color: "from-teal-light/40 to-teal-light/10",
  },
  {
    icon: Snowflake,
    title: "Embryo Freezing",
    description: "State-of-the-art cryopreservation to preserve your fertility for the future.",
    color: "from-gold-light/60 to-gold-light/20",
  },
  {
    icon: Dna,
    title: "Genetic Testing (PGT)",
    description: "Preimplantation genetic testing to ensure healthy embryo selection.",
    color: "from-rose-light/40 to-rose-light/10",
  },
  {
    icon: Users,
    title: "Donor Egg Programme",
    description: "Comprehensive donor egg program with carefully screened donors.",
    color: "from-teal-light/40 to-teal-light/10",
  },
  {
    icon: Stethoscope,
    title: "Infertility Diagnosis",
    description: "Thorough diagnostic evaluations to identify the root cause of infertility.",
    color: "from-gold-light/60 to-gold-light/20",
  },
]

export function Services() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="services" ref={ref} className="py-20 lg:py-32 bg-plum">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-sm font-medium uppercase tracking-wider text-rose-light">
            What We Offer
          </span>
          <h2 className="font-serif text-3xl lg:text-4xl font-bold text-white mt-4">
            Comprehensive Fertility Care, Tailored for You
          </h2>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative"
            >
              <div 
                className={`relative bg-gradient-to-br ${service.color} rounded-2xl p-6 lg:p-8 h-full
                  transition-all duration-300 hover:-translate-y-2 hover:shadow-xl
                  before:absolute before:top-0 before:left-0 before:right-0 before:h-1 
                  before:bg-rose before:rounded-t-2xl before:scale-x-0 before:origin-left
                  before:transition-transform before:duration-300 group-hover:before:scale-x-100`}
              >
                {/* Icon */}
                <div className="w-14 h-14 rounded-full bg-white/80 flex items-center justify-center mb-6">
                  <service.icon className="w-7 h-7 text-rose" />
                </div>

                {/* Content */}
                <h3 className="font-serif text-xl font-semibold text-plum mb-3">
                  {service.title}
                </h3>
                <p className="text-plum/70 text-sm leading-relaxed mb-4">
                  {service.description}
                </p>

                {/* Link */}
                <a 
                  href="#" 
                  className="inline-flex items-center gap-1 text-sm font-medium text-rose 
                    transition-all duration-300 group-hover:gap-2"
                >
                  Learn more
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
