import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { ArrowRight, Baby, TrendingUp, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import miracle1 from "@/assets/miracle-1.jpg"
import miracle2 from "@/assets/miracle-2.jpg"
import miracle3 from "@/assets/miracle-3.jpg"
import miracle4 from "@/assets/miracle-4.jpg"
import miracle5 from "@/assets/miracle-5.jpg"
import miracle6 from "@/assets/miracle-6.jpg"

const images = [miracle1, miracle2, miracle3, miracle4, miracle5, miracle6]

const dots = [
  { top: "8%", left: "6%", size: 12, color: "rgba(230,0,126,0.12)", dur: 9, delay: 0 },
  { top: "22%", left: "92%", size: 8, color: "rgba(27,160,220,0.10)", dur: 11, delay: 1.5 },
  { top: "40%", left: "3%", size: 16, color: "rgba(27,160,220,0.10)", dur: 13, delay: 0.8 },
  { top: "70%", left: "45%", size: 6, color: "rgba(230,0,126,0.12)", dur: 10, delay: 2 },
  { top: "85%", left: "88%", size: 14, color: "rgba(230,0,126,0.12)", dur: 12, delay: 0.4 },
  { top: "55%", left: "96%", size: 10, color: "rgba(27,160,220,0.10)", dur: 8, delay: 3 },
  { top: "15%", left: "55%", size: 7, color: "rgba(27,160,220,0.10)", dur: 14, delay: 1.2 },
  { top: "92%", left: "15%", size: 18, color: "rgba(230,0,126,0.12)", dur: 9, delay: 2.5 },
]

const pills = [
  { Icon: Baby, num: "5,000+", label: "Babies Born", delay: 0 },
  { Icon: TrendingUp, num: "75%", label: "Success Rate", delay: 0.8 },
  { Icon: Heart, num: "12+", label: "Years of Care", delay: 1.6 },
]

export function MiraclesGallery() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section
      ref={ref}
      className="relative py-20 lg:py-32 overflow-hidden"
      style={{
        background:
          "linear-gradient(120deg, #FFF1F7 0%, #ffffff 50%, #EAF7FD 100%)",
      }}
    >
      <style>{`
        @keyframes pillBob {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-5px); }
        }
        @keyframes dotFloat {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-14px); }
        }
      `}</style>

      {/* Floating background dots */}
      <div aria-hidden className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        {dots.map((d, i) => (
          <span
            key={i}
            style={{
              position: "absolute",
              top: d.top,
              left: d.left,
              width: d.size,
              height: d.size,
              borderRadius: "50%",
              background: d.color,
              animation: `dotFloat ${d.dur}s ease-in-out ${d.delay}s infinite`,
            }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" style={{ zIndex: 10 }}>
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

            {/* Floating stat pills */}
            <div className="flex flex-col gap-2.5" style={{ marginTop: 28 }}>
              {pills.map((p, i) => {
                const Icon = p.Icon
                return (
                  <motion.div
                    key={p.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                    className="inline-flex items-center self-start bg-white rounded-full"
                    style={{
                      gap: 10,
                      border: "1px solid rgba(230,0,126,0.15)",
                      padding: "10px 18px",
                      boxShadow: "0 4px 20px rgba(230,0,126,0.10)",
                      animation: `pillBob 3s ease-in-out ${p.delay}s infinite`,
                    }}
                  >
                    <span
                      className="inline-flex items-center justify-center rounded-full"
                      style={{
                        width: 32,
                        height: 32,
                        background: "#FFF1F7",
                        color: "#E6007E",
                        flexShrink: 0,
                      }}
                    >
                      <Icon className="w-4 h-4" />
                    </span>
                    <span style={{ fontWeight: 700, color: "#1A1535", fontSize: 15 }}>
                      {p.num}
                    </span>
                    <span style={{ color: "#6B6B8A", fontSize: 12 }}>{p.label}</span>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>

          {/* Right side - Logo-masked gallery with rotating ring */}
          <div className="lg:col-span-3 flex justify-end">
            <div
              className="relative"
              style={{ width: 520, height: 520, maxWidth: "100%" }}
            >
              {/* Rotating gradient ring */}
              <motion.div
                aria-hidden
                className="absolute rounded-full"
                style={{
                  top: -24,
                  left: -24,
                  right: -24,
                  bottom: -24,
                  background:
                    "conic-gradient(#E6007E, #1BA0DC, #E6007E)",
                  padding: 3,
                  opacity: 0.7,
                  zIndex: 0,
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              >
                <div
                  className="w-full h-full rounded-full"
                  style={{ background: "transparent" }}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.8, ease: "easeOut" }}
                style={{
                  position: "relative",
                  zIndex: 10,
                  width: "100%",
                  height: "100%",
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
      </div>
    </section>
  )
}
