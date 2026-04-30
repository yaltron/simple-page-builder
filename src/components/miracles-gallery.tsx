"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const images = [
  { src: "https://placehold.co/200x200/FFE4EC/C2185B?text=Baby+1", size: "small" },
  { src: "https://placehold.co/200x300/E0F2F1/00897B?text=Family+1", size: "tall" },
  { src: "https://placehold.co/200x200/FFF8E1/F9A825?text=Baby+2", size: "small" },
  { src: "https://placehold.co/300x200/FFE4EC/C2185B?text=Family+2", size: "wide" },
  { src: "https://placehold.co/200x200/E0F2F1/00897B?text=Baby+3", size: "small" },
  { src: "https://placehold.co/200x300/FFF8E1/F9A825?text=Family+3", size: "tall" },
  { src: "https://placehold.co/200x200/FFE4EC/C2185B?text=Baby+4", size: "small" },
  { src: "https://placehold.co/200x200/E0F2F1/00897B?text=Baby+5", size: "small" },
  { src: "https://placehold.co/200x200/FFF8E1/F9A825?text=Baby+6", size: "small" },
]

export function MiraclesGallery() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-20 lg:py-32 bg-plum-dark overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-5 gap-12 items-center">
          {/* Left side - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="font-serif text-6xl lg:text-7xl font-bold text-rose">
              5,000+
            </div>
            <h2 className="font-serif text-3xl lg:text-4xl font-bold text-white">
              Miracles & Counting
            </h2>
            <p className="text-white/70 leading-relaxed">
              Every baby born at Subhashree IVF is a miracle we celebrate. 
              These are the faces of hope, the smiles of joy, and the 
              beginning of beautiful family stories.
            </p>
            <Button 
              size="lg"
              className="bg-rose hover:bg-rose-dark text-white rounded-full px-8"
            >
              Your Miracle Awaits
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>

          {/* Right side - Gallery */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-3 gap-3">
              {images.map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className={`rounded-xl overflow-hidden ${
                    image.size === "tall" ? "row-span-2" : ""
                  } ${
                    image.size === "wide" ? "col-span-2" : ""
                  }`}
                >
                  <img
                    src={image.src}
                    alt={`Success story ${index + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
