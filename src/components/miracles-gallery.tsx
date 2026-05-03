import { useRef, useEffect, useState } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const photoPool = [
  "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=800",
  "https://images.unsplash.com/photo-1560328055-e938bb2ed50a?w=800",
  "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800",
  "https://images.unsplash.com/photo-1531983412531-1f49a365ffed?w=800",
]

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

function useCountUp(target: number, duration: number, start: boolean) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!start) return
    let raf = 0
    const t0 = performance.now()
    const tick = (now: number) => {
      const p = Math.min((now - t0) / (duration * 1000), 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setValue(Math.round(target * eased))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [start, target, duration])
  return value
}

function RotatingCell({ offset }: { offset: number }) {
  const [idx, setIdx] = useState(offset % photoPool.length)
  useEffect(() => {
    // each cell swaps every 12s (4 cells * 3s) but staggered by offset*3s
    const interval = setInterval(() => {
      setIdx((i) => (i + 1) % photoPool.length)
    }, 12000)
    const t = setTimeout(() => {
      setIdx((i) => (i + 1) % photoPool.length)
    }, offset * 3000 + 3000)
    return () => {
      clearInterval(interval)
      clearTimeout(t)
    }
  }, [offset])

  return (
    <div className="relative w-full h-full overflow-hidden">
      <AnimatePresence mode="sync">
        <motion.img
          key={idx}
          src={photoPool[idx]}
          alt=""
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
      </AnimatePresence>
    </div>
  )
}

export function MiraclesGallery() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const count = useCountUp(5000, 2, isInView)

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{
        minHeight: 620,
        paddingTop: 80,
        paddingBottom: 80,
        background:
          "linear-gradient(120deg, #FFF1F7 0%, #ffffff 50%, #EAF7FD 100%)",
      }}
    >
      <style>{`
        @keyframes dotFloat {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-14px); }
        }
      `}</style>

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
        <div className="grid lg:grid-cols-5 gap-12 items-center min-h-[460px]">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="font-serif text-6xl lg:text-7xl font-bold text-rose">
              {count.toLocaleString()}+
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

          <div className="lg:col-span-3 flex justify-end items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, ease: "easeOut" }}
              style={{
                width: 560,
                height: 560,
                maxWidth: "100%",
                WebkitMaskImage: `url('/shubhashree-01.png')`,
                maskImage: `url('/shubhashree-01.png')`,
                WebkitMaskRepeat: "no-repeat",
                maskRepeat: "no-repeat",
                WebkitMaskPosition: "center",
                maskPosition: "center",
                WebkitMaskSize: "contain",
                maskSize: "contain",
                filter: "drop-shadow(0 0 50px rgba(230, 0, 126, 0.20))",
              }}
            >
              <div className="grid grid-cols-2 grid-rows-2 w-full h-full">
                {[0, 1, 2, 3].map((i) => (
                  <RotatingCell key={i} offset={i} />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
