import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Star, Quote } from "lucide-react"
import { useTestimonials } from "@/lib/use-testimonials"
import fallbackImg from "@/assets/testimonial-family.jpg"

export function StoriesTestimonials() {
  const { items } = useTestimonials()
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused || items.length <= 1) return
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % items.length)
    }, 3000)
    return () => clearInterval(t)
  }, [paused, items.length])

  useEffect(() => {
    if (index >= items.length) setIndex(0)
  }, [items.length, index])

  if (items.length === 0) return null

  const active = items[index] ?? items[0]
  const activeImage = active?.image || fallbackImg

  return (
    <section
      id="testimonials"
      className="py-24 bg-pink-soft overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="reveal text-3xl sm:text-4xl font-extrabold text-[#1A1535] text-balance">
            Stories of Hope & <span className="text-brand-pink">Happiness</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-5 gap-10 items-center">
          {/* Left: image 40% */}
          <div className="lg:col-span-2">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/5] shadow-[0_30px_60px_-30px_rgba(230,0,126,0.45)] bg-pink-soft">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImage}
                  src={activeImage}
                  alt={active?.name || "Patient story"}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </AnimatePresence>
            </div>
          </div>

          {/* Right: scrolling testimonial 60% */}
          <div className="lg:col-span-3">
            <div className="relative h-[340px] sm:h-[300px] overflow-hidden">
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={active?.id}
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  exit={{ y: "-100%", opacity: 0 }}
                  transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
                  className="absolute inset-0"
                >
                  <div className="relative bg-white rounded-2xl p-6 sm:p-8 border border-[#F2DCE8] shadow-[0_10px_30px_-15px_rgba(230,0,126,0.2)] h-full flex flex-col">
                    <Quote className="absolute top-4 right-4 h-8 w-8 text-brand-pink/20" />
                    <div className="flex gap-1 mb-3">
                      {Array.from({ length: active?.rating ?? 5 }).map((_, j) => (
                        <Star
                          key={j}
                          className="h-4 w-4 fill-brand-pink text-brand-pink"
                          style={{ color: "oklch(0.62 0.27 357)" }}
                        />
                      ))}
                    </div>
                    {active?.story && (
                      <p className="text-[#1A1535]/90 leading-relaxed mb-3 flex-1 overflow-hidden">
                        {active.story}
                      </p>
                    )}
                    <p className="text-sm font-semibold text-brand-pink">
                      — {active?.name}
                      {active?.location ? `, ${active.location}` : ""}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Dots */}
            {items.length > 1 && (
              <div className="flex gap-2 justify-center mt-6">
                {items.map((t, i) => (
                  <button
                    key={t.id}
                    aria-label={`Show testimonial ${i + 1}`}
                    onClick={() => setIndex(i)}
                    className="h-2.5 w-2.5 rounded-full transition-all"
                    style={{
                      background:
                        i === index ? "#E6007E" : "rgba(230,0,126,0.25)",
                      transform: i === index ? "scale(1.2)" : "scale(1)",
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
