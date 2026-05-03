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

const images = [miracle1, miracle2, miracle3, miracle4, miracle5, miracle6, miracle3, miracle1, miracle5]

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
                  <path d="M 420,20 C 390,20 355,35 340,65 C 325,95 330,125 320,145 C 308,168 285,175 275,195 C 260,220 265,248 270,265 C 278,290 295,305 298,325 C 305,360 290,385 275,415 C 255,455 230,480 225,520 C 218,565 235,600 250,630 C 265,658 290,670 310,675 C 340,682 375,678 400,672 C 430,665 455,650 465,625 C 478,595 470,560 462,530 C 452,495 435,470 428,440 C 418,400 420,365 432,335 C 448,295 475,270 488,240 C 502,208 500,175 492,148 C 482,115 460,92 455,65 C 448,35 440,20 420,20 Z" />
                </clipPath>
              </defs>
            </svg>

            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6 }}
              style={{
                width: 520,
                height: 700,
                background: "#FFF1F7",
                clipPath: "url(#pregnant-silhouette)",
                WebkitClipPath: "url(#pregnant-silhouette)",
                filter: "drop-shadow(0 0 40px rgba(230, 0, 126, 0.15))",
              }}
              className="relative max-w-full"
            >
              <div className="grid grid-cols-3 grid-rows-3 gap-1 w-full h-full">
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
