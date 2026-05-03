import { useRef, useEffect, useState } from "react"
import { motion, useInView } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const initialPhotos = [
  "https://images.unsplash.com/photo-1492725764893-90b379c2b6e7?w=600",
  "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=600",
  "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=600",
  "https://images.unsplash.com/photo-1491013516836-7db643ee125a?w=600",
]

const swapPool = [
  "https://images.unsplash.com/photo-1531983412531-1f49a365ffed?w=600",
  "https://images.unsplash.com/photo-1560328055-e938bb2ed50a?w=600",
  "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=600",
  "https://images.unsplash.com/photo-1518895312237-a9e23508077d?w=600",
]

type CardCfg = {
  w: number; h: number; rotate: number; top: number; left: number; floatDur: number; delay: number;
}

const cards: CardCfg[] = [
  { w: 220, h: 260, rotate: -4, top: 0,   left: 0,   floatDur: 4, delay: 0 },
  { w: 180, h: 220, rotate: 3,  top: 40,  left: 230, floatDur: 5, delay: 0.15 },
  { w: 200, h: 240, rotate: 2,  top: 240, left: 20,  floatDur: 6, delay: 0.3 },
  { w: 170, h: 200, rotate: -3, top: 280, left: 240, floatDur: 7, delay: 0.45 },
]

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

function FloatingCard({
  cfg, src, index, inView,
}: { cfg: CardCfg; src: string; index: number; inView: boolean }) {
  const [current, setCurrent] = useState(src)
  const [prev, setPrev] = useState<string | null>(null)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    if (src === current) return
    setPrev(current)
    setCurrent(src)
    setFading(true)
    const t = setTimeout(() => { setFading(false); setPrev(null) }, 750)
    return () => clearTimeout(t)
  }, [src])

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: cfg.delay, ease: "easeOut" }}
      style={{
        position: "absolute",
        top: cfg.top,
        left: cfg.left,
        width: cfg.w,
        height: cfg.h,
        transform: `rotate(${cfg.rotate}deg)`,
        animation: inView ? `cardFloat${index} ${cfg.floatDur}s ease-in-out ${cfg.delay + 0.6}s infinite` : undefined,
        zIndex: 2 + index,
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: 20,
          overflow: "hidden",
          border: "3px solid white",
          boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
          position: "relative",
          background: "#eee",
        }}
      >
        {prev && (
          <img
            src={prev}
            alt=""
            style={{
              position: "absolute", inset: 0, width: "100%", height: "100%",
              objectFit: "cover", opacity: fading ? 0 : 1,
              transition: "opacity 0.7s ease",
            }}
          />
        )}
        <img
          src={current}
          alt="Miracle baby"
          loading="lazy"
          style={{
            position: "absolute", inset: 0, width: "100%", height: "100%",
            objectFit: "cover", opacity: fading ? 1 : 1,
            transition: "opacity 0.7s ease",
          }}
        />
      </div>
    </motion.div>
  )
}

export function MiraclesGallery() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const count = useCountUp(5000, 2, isInView)

  const [photos, setPhotos] = useState<string[]>(initialPhotos)

  // Auto-rotate one random card every 3s
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
        padding: "80px 8%",
        background:
          "linear-gradient(120deg, #FFF1F7 0%, #ffffff 55%, #EAF7FD 100%)",
      }}
    >
      <style>{`
        @keyframes cardFloat0 { 0%,100%{transform:rotate(-4deg) translateY(0);} 50%{transform:rotate(-4deg) translateY(-8px);} }
        @keyframes cardFloat1 { 0%,100%{transform:rotate(3deg) translateY(0);}  50%{transform:rotate(3deg) translateY(-8px);} }
        @keyframes cardFloat2 { 0%,100%{transform:rotate(2deg) translateY(0);}  50%{transform:rotate(2deg) translateY(-8px);} }
        @keyframes cardFloat3 { 0%,100%{transform:rotate(-3deg) translateY(0);} 50%{transform:rotate(-3deg) translateY(-8px);} }
        @keyframes dotFloat { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-12px);} }
      `}</style>

      <div className="relative max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[480px]">
          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="space-y-6"
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

          {/* RIGHT — floating cards */}
          <div className="relative" style={{ height: 540 }}>
            {/* Soft blob */}
            <div
              aria-hidden
              style={{
                position: "absolute",
                width: 400, height: 400,
                top: "50%", left: "50%",
                transform: "translate(-50%, -50%)",
                background: "linear-gradient(135deg, #FFF1F7, #EAF7FD)",
                borderRadius: "50%",
                opacity: 0.8,
                zIndex: 0,
              }}
            />
            {/* Brand dots */}
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

            {/* Card stack wrapper */}
            <div style={{ position: "relative", width: 410, height: 500, margin: "0 auto" }}>
              {cards.map((cfg, i) => (
                <FloatingCard
                  key={i}
                  cfg={cfg}
                  src={photos[i]}
                  index={i}
                  inView={isInView}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
