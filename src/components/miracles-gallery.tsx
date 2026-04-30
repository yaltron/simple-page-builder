
import { useRef } from "react"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import miracle1 from "@/assets/miracle-1.jpg"
import miracle2 from "@/assets/miracle-2.jpg"
import miracle3 from "@/assets/miracle-3.jpg"
import miracle4 from "@/assets/miracle-4.jpg"
import miracle5 from "@/assets/miracle-5.jpg"
import miracle6 from "@/assets/miracle-6.jpg"

const images = [
  { src: miracle1, size: "small" },
  { src: miracle2, size: "tall" },
  { src: miracle3, size: "small" },
  { src: miracle4, size: "wide" },
  { src: miracle5, size: "small" },
  { src: miracle6, size: "tall" },
  { src: miracle3, size: "small" },
  { src: miracle1, size: "small" },
  { src: miracle5, size: "small" },
]

export function MiraclesGallery() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-20 lg:py-32 bg-gradient-to-br from-cream via-rose-light/20 to-teal-light/20 overflow-hidden">
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
            <h2 className="font-serif text-3xl lg:text-4xl font-bold text-plum">
              Miracles & Counting
            </h2>
            <p className="text-plum/70 leading-relaxed">
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
                    loading="lazy"
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
