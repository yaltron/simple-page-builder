
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Check, ArrowRight } from "lucide-react"
import { MorphingBlob } from "@/components/morphing-blob"
import whoClinic from "@/assets/who-clinic.jpg"
import whoLab from "@/assets/who-lab.jpg"
import whoTeam from "@/assets/who-team.jpg"

const highlights = [
  "ISO Certified Embryology Lab",
  "Personalized Treatment Plans",
  "Emotional & Psychological Support",
]

export function WhoWeAre() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="about" ref={ref} className="py-20 lg:py-32 bg-cream overflow-hidden relative">
      {/* Morphing teal blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <MorphingBlob
          color="var(--teal)"
          size={600}
          opacity={0.08}
          duration={28}
          driftX={-50}
          driftY={40}
          style={{ top: "-150px", right: "-200px" }}
        />
        <MorphingBlob
          color="var(--teal-light)"
          size={500}
          opacity={0.12}
          duration={34}
          delay={-10}
          driftX={60}
          driftY={-50}
          style={{ bottom: "-180px", left: "-160px" }}
        />
        <MorphingBlob
          color="var(--teal)"
          size={420}
          opacity={0.06}
          duration={40}
          delay={-18}
          driftX={-40}
          driftY={60}
          style={{ top: "40%", left: "30%" }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left side - Quote and Images */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="space-y-8"
          >
            {/* Quote */}
            <blockquote className="font-serif text-2xl lg:text-3xl text-plum italic leading-relaxed">
              &ldquo;Every couple is unique, and so is their journey to parenthood. 
              At Shubhashree IVF, we transform hope into life.&rdquo;
            </blockquote>

            {/* Asymmetric image grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="rounded-2xl overflow-hidden h-48">
                  <img
                    src={whoClinic}
                    alt="Our modern clinic"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden h-32">
                  <img
                    src={whoLab}
                    alt="Advanced laboratory"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
              <div className="pt-8">
                <div className="rounded-2xl overflow-hidden h-64">
                  <img
                    src={whoTeam}
                    alt="Our caring team"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right side - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <span className="text-sm font-medium uppercase tracking-wider text-rose">
                Who We Are
              </span>
              <h2 className="font-serif text-3xl lg:text-4xl font-bold text-plum">
                Turning Hope Into Happiness
              </h2>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              Shubhashree IVF & Fertility Centre is {"Nepal's"} premier fertility clinic, 
              dedicated to helping couples achieve their dream of parenthood. With 
              state-of-the-art facilities, world-class specialists, and a compassionate 
              approach to care, we have helped over 5,000 families welcome their bundles 
              of joy.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              Our team understands the emotional journey of fertility treatment. {"That's"} 
              why we combine cutting-edge medical technology with personalized care, 
              ensuring every patient feels supported, informed, and hopeful throughout 
              their journey.
            </p>

            {/* Highlights */}
            <div className="space-y-3 pt-4">
              {highlights.map((highlight, index) => (
                <motion.div
                  key={highlight}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-6 h-6 rounded-full bg-teal/10 flex items-center justify-center">
                    <Check className="w-4 h-4 text-teal" />
                  </div>
                  <span className="font-medium text-plum">{highlight}</span>
                </motion.div>
              ))}
            </div>

            {/* Link */}
            <motion.a
              href="#"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.7 }}
              className="inline-flex items-center gap-2 text-rose font-medium group mt-4"
            >
              Learn About Us
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
