
import { useRef } from "react"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MorphingBlob } from "@/components/morphing-blob"
import { Magnetic } from "@/components/magnetic"

export function CTABanner() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="contact" ref={ref} className="py-20 lg:py-24 bg-gradient-to-r from-rose to-rose-dark relative overflow-hidden">
      {/* Morphing white blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <MorphingBlob
          color="#ffffff"
          size={550}
          opacity={0.1}
          duration={26}
          driftX={50}
          driftY={40}
          style={{ top: "-180px", left: "-160px" }}
        />
        <MorphingBlob
          color="#ffffff"
          size={620}
          opacity={0.08}
          duration={32}
          delay={-9}
          driftX={-60}
          driftY={50}
          style={{ bottom: "-220px", right: "-180px" }}
        />
        <MorphingBlob
          color="#ffffff"
          size={400}
          opacity={0.06}
          duration={38}
          delay={-16}
          driftX={40}
          driftY={-50}
          style={{ top: "30%", left: "40%" }}
        />
      </div>


      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <h2 className="font-serif text-3xl lg:text-5xl font-bold text-white text-balance">
            Ready to Start Your Journey to Parenthood?
          </h2>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Take the first step towards building your family. Our compassionate team 
            is here to guide you through every step of your fertility journey.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <Magnetic>
              <Button
                size="lg"
                className="bg-white text-rose hover:bg-white/90 rounded-full px-8 text-base"
              >
                Book Free Consultation
              </Button>
            </Magnetic>
            <Magnetic>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full px-8 text-base border-white/30 text-white hover:bg-white/10 hover:text-white"
              >
                <Phone className="w-4 h-4 mr-2" />
                Call: +977-9800-000000
              </Button>
            </Magnetic>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
