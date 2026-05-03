import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import miracle1 from "@/assets/miracle-1.jpg"
import miracle2 from "@/assets/miracle-2.jpg"
import miracle3 from "@/assets/miracle-3.jpg"
import miracle4 from "@/assets/miracle-4.jpg"
import miracle5 from "@/assets/miracle-5.jpg"
import miracle6 from "@/assets/miracle-6.jpg"

const images = [miracle1, miracle2, miracle3, miracle4, miracle5, miracle6]

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
              Every baby born at Shubhashree IVF is a miracle we celebrate.
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

          {/* Right side - Logo-masked gallery */}
          <div className="lg:col-span-3 flex justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, ease: "easeOut" }}
              style={{
                width: 520,
                height: 520,
                maxWidth: "100%",
                WebkitMaskImage: `url('/shubhashree-01.png')`,
                maskImage: `url('/shubhashree-01.png')`,
                WebkitMaskRepeat: "no-repeat",
                maskRepeat: "no-repeat",
                WebkitMaskPosition: "center",
                maskPosition: "center",
                WebkitMaskSize: "contain",
                maskSize: "contain",
                filter: "drop-shadow(0 0 30px rgba(230, 0, 126, 0.25))",
              }}
              className="relative"
            >
              <div className="grid grid-cols-2 grid-rows-3 w-full h-full">
                {images.map((src, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.4, delay: 0.8 + index * 0.2 }}
                    className="overflow-hidden"
                  >
                    <img
                      src={src}
                      alt={`Success story ${index + 1}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
