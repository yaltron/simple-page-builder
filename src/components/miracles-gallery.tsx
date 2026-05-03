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

          {/* Right side - Silhouette-masked gallery */}
          <div className="lg:col-span-3 flex justify-center">
            {/* Inline SVG defs for the clip path */}
            <svg width="0" height="0" className="absolute" aria-hidden="true">
              <defs>
                <clipPath id="pregnant-silhouette" clipPathUnits="userSpaceOnUse">
                  <path d="M 180,10 C 210,10 240,25 250,55 C 258,80 245,108 235,125 C 225,142 210,148 208,162 C 205,178 215,192 218,208 C 224,235 220,265 210,288 C 196,318 170,335 155,360 C 135,392 128,430 132,465 C 137,505 158,538 185,560 C 215,585 255,592 290,585 C 330,577 365,555 382,522 C 400,487 395,445 385,412 C 372,372 345,345 332,310 C 318,272 320,232 330,198 C 342,158 368,132 372,98 C 378,58 358,22 325,10 C 300,2 270,5 250,10 C 235,14 215,18 200,14 C 193,12 186,10 180,10 Z" />
                </clipPath>
              </defs>
            </svg>

            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6 }}
              style={{
                width: 400,
                height: 620,
                background: "#FFF1F7",
                clipPath: "url(#pregnant-silhouette)",
                WebkitClipPath: "url(#pregnant-silhouette)",
                filter: "drop-shadow(0 0 40px rgba(230, 0, 126, 0.15))",
              }}
              className="relative max-w-full"
            >
              <div className="grid grid-cols-2 grid-rows-3 gap-1 w-full h-full">
                {images.map((src, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.15 }}
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
