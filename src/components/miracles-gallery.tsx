import { useRef, useEffect, useState } from "react"
import { motion, useInView } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import miracleMask from "@/assets/miracle-mask.jpg"

const dots = [
  { size: 12, color: "#E6007E", top: "10%", left: "85%", dur: 5, delay: 0 },
  { size: 8,  color: "#1BA0DC", top: "75%", left: "5%",  dur: 7, delay: 1 },
  { size: 16, color: "#E6007E", top: "55%", left: "95%", dur: 6, delay: 0.5 },
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

function MaskCell({ src }: { src: string }) {
  const [current, setCurrent] = useState(src)
  const [prev, setPrev] = useState<string | null>(null)
  const [fadingIn, setFadingIn] = useState(true)

  useEffect(() => {
    if (src === current) return
    setPrev(current)
    setCurrent(src)
    setFadingIn(false)
    requestAnimationFrame(() => requestAnimationFrame(() => setFadingIn(true)))
    const t = setTimeout(() => setPrev(null), 700)
    return () => clearTimeout(t)
  }, [src])

  return (
    <div style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden", background: "#1A1535" }}>
      {prev && (
        <img
          src={prev}
          alt=""
          style={{
            position: "absolute", inset: 0, width: "100%", height: "100%",
            objectFit: "cover",
            filter: "saturate(1.15) contrast(1.05)",
          }}
        />
      )}
      <img
        src={current}
        alt="Miracle baby"
        loading="lazy"
        style={{
          position: "absolute", inset: 0, width: "100%", height: "100%",
          objectFit: "cover",
          opacity: fadingIn ? 1 : 0,
          transition: "opacity 0.6s ease",
          filter: "saturate(1.15) contrast(1.05)",
        }}
      />
    </div>
  )
}

export function MiraclesGallery() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const count = useCountUp(5000, 2, isInView)

  const [photos, setPhotos] = useState<string[]>(initialPhotos)

  useEffect(() => {
    if (!isInView) return
    const interval = setInterval(() => {
      setPhotos((curr) => {
        const idx = Math.floor(Math.random() * 4)
        const candidates = swapPool.filter((p) => !curr.includes(p))
        const pool = candidates.length ? candidates : swapPool
        const next = pool[Math.floor(Math.random() * pool.length)]
        const updated = [...curr]
        updated[idx] = next
        return updated
      })
    }, 3000)
    return () => clearInterval(interval)
  }, [isInView])

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{
        minHeight: 640,
        padding: "80px 0 80px 8%",
        background:
          "linear-gradient(120deg, #FFF1F7 0%, #ffffff 55%, #EAF7FD 100%)",
      }}
    >
      <style>{`
        @keyframes dotFloat { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-12px);} }
      `}</style>

      <div className="relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[480px]">
          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="space-y-6 max-w-xl"
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

          {/* RIGHT — logo mask collage */}
          <div className="relative flex justify-end items-center" style={{ minHeight: 560 }}>
            {dots.map((d, i) => (
              <span
                key={i}
                aria-hidden
                style={{
                  position: "absolute",
                  top: d.top, left: d.left,
                  width: d.size, height: d.size,
                  borderRadius: "50%",
                  background: d.color,
                  zIndex: 1,
                  animation: `dotFloat ${d.dur}s ease-in-out ${d.delay}s infinite`,
                }}
              />
            ))}

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, ease: "easeOut" }}
              style={{
                filter: "drop-shadow(0 0 40px rgba(230,0,126,0.30))",
              }}
            >
              <div
                style={{
                  width: 560,
                  height: 560,
                  WebkitMaskImage: "url('/shubhashree-01.png')",
                  maskImage: "url('/shubhashree-01.png')",
                  WebkitMaskSize: "contain",
                  maskSize: "contain",
                  WebkitMaskRepeat: "no-repeat",
                  maskRepeat: "no-repeat",
                  WebkitMaskPosition: "center",
                  maskPosition: "center",
                  background: "#1A1535",
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gridTemplateRows: "1fr 1fr",
                  gap: 0,
                }}
              >
                {photos.map((p, i) => (
                  <MaskCell key={i} src={p} />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
