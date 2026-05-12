import { useRef, useEffect, useState } from "react"
import { motion, useInView } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Link } from "@tanstack/react-router"
import { Button } from "@/components/ui/button"
import { useHomepageSection } from "@/lib/use-cms-content"

const DEFAULT_MIRACLES = {
  count: 5000,
  count_suffix: "+",
  heading: "Miracles & Counting",
  description:
    "Every baby born at Subhashree IVF is a miracle we celebrate. These are the faces of hope, the smiles of joy, and the beginning of beautiful family stories.",
  cta_text: "Your Miracle Awaits",
  cta_url: "/success-stories",
}


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


export function MiraclesGallery() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const m = useHomepageSection("miracles", DEFAULT_MIRACLES)
  const count = useCountUp(Number(m.count) || 0, 2, isInView)
  const isExternal = m.cta_url?.startsWith("http")

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
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="space-y-6 max-w-xl"
          >
            <div className="font-serif text-6xl lg:text-7xl font-bold text-rose">
              {count.toLocaleString()}{m.count_suffix || ""}
            </div>
            <h2 className="font-serif text-3xl lg:text-4xl font-bold text-plum">
              {m.heading}
            </h2>
            <p className="text-plum/70 leading-relaxed">
              {m.description}
            </p>
            <Button
              asChild
              size="lg"
              className="bg-rose hover:bg-rose-dark text-white rounded-full px-8"
            >
              {isExternal ? (
                <a href={m.cta_url}>
                  {m.cta_text}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              ) : (
                <Link to={m.cta_url || "/success-stories"}>
                  {m.cta_text}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              )}
            </Button>
          </motion.div>

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
              style={{ filter: "drop-shadow(0 0 25px rgba(230,0,126,0.20))" }}
            >
              <div
                aria-label="Shubhashree IVF logo silhouette"
                style={{
                  width: 500,
                  height: 500,
                  position: "relative",
                  WebkitMaskImage: "url('/shubhashree-01.png')",
                  maskImage: "url('/shubhashree-01.png')",
                  WebkitMaskSize: "contain",
                  maskSize: "contain",
                  WebkitMaskRepeat: "no-repeat",
                  maskRepeat: "no-repeat",
                  WebkitMaskPosition: "center",
                  maskPosition: "center",
                  background: "rgba(230, 0, 126, 0.12)",
                }}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
