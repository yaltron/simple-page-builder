
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Check, Play } from "lucide-react"
import { Link } from "@tanstack/react-router"
import { Button } from "@/components/ui/button"
import { FloatingDecoField } from "@/components/floating-deco"
import { VideoModal } from "@/components/video-modal"
import { useHomepageSection } from "@/lib/use-cms-content"
import visitCare from "@/assets/visit-care.jpg"
import visitConsult from "@/assets/hero-consultation.jpg"
import visitHope from "@/assets/visit-hope.jpg"
import visitVideo from "@/assets/visit-video.jpg"

const reasons = [
  "Couples who cannot conceive naturally",
  "Couples with recurrent pregnancy losses",
  "Couples carrying genetic disorders",
  "Men with fertility issues",
  "Women with ovarian problems",
  "Cancer patients preserving fertility",
]

const DEFAULTS = {
  heading: "Signs You Should See a Fertility Specialist",
  heading_color: "#C2185B",
  video_url: "",
  images: [
    { url: "", alt: "Compassionate care" },
    { url: "", alt: "Consultation" },
    { url: "", alt: "Hope for families" },
    { url: "", alt: "Watch our video" },
  ],
}

function extractVideoEmbed(url: string): { provider: "youtube" | "vimeo"; id: string } | null {
  if (!url) return null
  try {
    const u = new URL(url)
    const host = u.hostname.replace(/^www\./, "")
    if (host === "youtube.com" || host === "m.youtube.com") {
      const id = u.searchParams.get("v")
      if (id) return { provider: "youtube", id }
      const m = u.pathname.match(/^\/embed\/([\w-]+)/)
      if (m) return { provider: "youtube", id: m[1] }
    }
    if (host === "youtu.be") {
      const id = u.pathname.slice(1).split("/")[0]
      if (id) return { provider: "youtube", id }
    }
    if (host === "vimeo.com") {
      const id = u.pathname.split("/").filter(Boolean).pop()
      if (id && /^\d+$/.test(id)) return { provider: "vimeo", id }
    }
    if (host === "player.vimeo.com") {
      const m = u.pathname.match(/\/video\/(\d+)/)
      if (m) return { provider: "vimeo", id: m[1] }
    }
  } catch {}
  return null
}

export function WhenToVisit() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [videoOpen, setVideoOpen] = useState(false)
  const cms = useHomepageSection("when_to_visit", DEFAULTS)
  const i1 = cms.images?.[0]?.url || visitCare
  const i2 = cms.images?.[1]?.url || visitConsult
  const i3 = cms.images?.[2]?.url || visitHope
  const i4 = cms.images?.[3]?.url || visitVideo
  const a1 = cms.images?.[0]?.alt || "Compassionate care"
  const a2 = cms.images?.[1]?.alt || "Consultation"
  const a3 = cms.images?.[2]?.alt || "Hope for families"
  const a4 = cms.images?.[3]?.alt || "Watch our video"
  const embed = extractVideoEmbed(cms.video_url || "")

  return (
    <section ref={ref} className="pt-20 lg:pt-32 pb-10 overflow-hidden relative">
      <FloatingDecoField
        items={[
          { shape: "hollow-circle", color: "teal", size: 36, top: "10%", left: "5%", floatDuration: 8, rotateDuration: 22, delay: 0 },
          { shape: "plus", color: "rose", size: 18, top: "20%", right: "8%", floatDuration: 7, rotateDuration: 19, delay: -2 },
          { shape: "dashed-ring", color: "gold", size: 42, top: "75%", left: "10%", floatDuration: 9, rotateDuration: 24, delay: -4 },
          { shape: "square", color: "teal", size: 20, top: "55%", right: "5%", floatDuration: 6, rotateDuration: 18, delay: -1 },
          { shape: "lines", color: "rose", size: 24, top: "82%", right: "20%", floatDuration: 7, rotateDuration: 20, delay: -3 },
        ]}
      />
      <div className="max-w-7xl mx-auto relative">
        <div className="grid lg:grid-cols-2 min-h-[600px]">
          {/* Left side - Rose gradient */}
          <div className="bg-gradient-to-br from-rose-light/50 via-cream to-gold-light/40 p-8 lg:p-16 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <h2 className="font-serif text-3xl lg:text-4xl font-bold" style={{ color: cms.heading_color }}>
                {cms.heading}
              </h2>

              {/* Checklist */}
              <div className="space-y-4 pt-4">
                {reasons.map((reason, index) => (
                  <motion.div
                    key={reason}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-6 h-6 rounded-full bg-rose/15 flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-rose" />
                    </div>
                    <span className="text-plum/80">{reason}</span>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="pt-6"
              >
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-rose to-rose-dark text-white hover:from-rose-dark hover:to-rose rounded-full px-8"
                >
                  <Link to="/contact">Book an Appointment</Link>
                </Button>
              </motion.div>
            </motion.div>
          </div>

          {/* Right side - Image grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="p-4 lg:p-8 bg-cream"
          >
            <div className="grid grid-cols-2 gap-4 h-full">
              <div className="space-y-4">
                <div className="rounded-2xl overflow-hidden h-48 lg:h-64">
                  <img src={i1} alt={a1} className="w-full h-full object-cover" loading="lazy" />
                </div>
                <div className="rounded-2xl overflow-hidden h-32 lg:h-40">
                  <img src={i2} alt={a2} className="w-full h-full object-cover" loading="lazy" />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="rounded-2xl overflow-hidden h-32 lg:h-40">
                  <img src={i3} alt={a3} className="w-full h-full object-cover" loading="lazy" />
                </div>
                {/* Video thumbnail */}
                <button
                  type="button"
                  onClick={() => setVideoOpen(true)}
                  className="rounded-2xl overflow-hidden h-48 lg:h-64 relative group cursor-pointer block w-full"
                >
                  <img src={i4} alt={a4} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy" />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                      <Play className="w-6 h-6 text-rose fill-rose ml-1" />
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <VideoModal open={videoOpen} onClose={() => setVideoOpen(false)} />
    </section>
  )
}
