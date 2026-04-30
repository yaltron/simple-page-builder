"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { Phone } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CTABanner() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="contact" ref={ref} className="py-20 lg:py-24 bg-gradient-to-r from-rose to-rose-dark relative overflow-hidden">
      {/* Background decorative shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/4 w-40 h-40 bg-white/5 rounded-full blur-2xl" />
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
            <Button 
              size="lg"
              className="bg-white text-rose hover:bg-white/90 rounded-full px-8 text-base"
            >
              Book Free Consultation
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="rounded-full px-8 text-base border-white/30 text-white hover:bg-white/10 hover:text-white"
            >
              <Phone className="w-4 h-4 mr-2" />
              Call: +977-9800-000000
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
