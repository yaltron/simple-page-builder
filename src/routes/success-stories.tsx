import { useEffect, useRef, useState } from "react"
import { createFileRoute } from "@tanstack/react-router"
import { motion, useInView } from "framer-motion"
import { Star, Quote, Play } from "lucide-react"
import { PageLayout, PageCTABanner, Section, SectionHeading, BRAND } from "@/components/page-layout"
import { VideoModal } from "@/components/video-modal"

export const Route = createFileRoute("/success-stories")({
  head: () => ({
    meta: [
      { title: "Success Stories — Subhashree IVF" },
      { name: "description", content: "Real families, real journeys. Read how Subhashree IVF has helped over 5,000 couples become parents." },
      { property: "og:title", content: "Success Stories — Subhashree IVF" },
      { property: "og:description", content: "5,000+ families. Real stories of hope and joy." },
    ],
  }),
  component: StoriesPage,
})

const stats = [
  { value: 5000, suffix: "+", label: "Happy Families" },
  { value: 75, suffix: "%", label: "Success Rate" },
  { value: 12, suffix: "+", label: "Years of Care" },
]

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-50px" })
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!inView) return
    const dur = 1800
    const step = 30
    let cur = 0
    const id = setInterval(() => {
      cur += value / (dur / step)
      if (cur >= value) { setN(value); clearInterval(id) } else setN(Math.floor(cur))
    }, step)
    return () => clearInterval(id)
  }, [inView, value])
  return <span ref={ref}>{n.toLocaleString()}{suffix}</span>
}

const stories = [
  { name: "Sita & Ramesh", location: "Kathmandu", text: "After 7 years of waiting, we finally held our baby. Subhashree IVF gave us hope when we had none left.", img: "https://placehold.co/600x600/FFE4EF/C2185B?text=Family+1" },
  { name: "Priya & Anil", location: "Pokhara", text: "The team treated us like family. Every step was explained and we never felt alone in the journey.", img: "https://placehold.co/600x600/EAF7FD/C2185B?text=Family+2" },
  { name: "Mira & Suraj", location: "Biratnagar", text: "Twin miracles after our second IVF cycle. Words can't describe our gratitude to Dr. Subhashree.", img: "https://placehold.co/600x600/FFF1F7/C2185B?text=Family+3" },
  { name: "Anjali & Bikram", location: "Lalitpur", text: "Affordable, transparent and compassionate. Our daughter is our greatest blessing.", img: "https://placehold.co/600x600/FFE4EF/C2185B?text=Family+4" },
  { name: "Sangita & Rajesh", location: "Butwal", text: "We travelled across the country and they made it worth every step. Truly the best IVF centre in Nepal.", img: "https://placehold.co/600x600/EAF7FD/C2185B?text=Family+5" },
  { name: "Kabita & Dipesh", location: "Bhaktapur", text: "From counselling to lab work, every detail was handled with care. We are forever grateful.", img: "https://placehold.co/600x600/FFF1F7/C2185B?text=Family+6" },
]

const videos = [
  { name: "Sita & Ramesh", img: "https://placehold.co/640x360/FFE4EF/C2185B?text=Story+1" },
  { name: "Priya & Anil", img: "https://placehold.co/640x360/EAF7FD/C2185B?text=Story+2" },
  { name: "Mira & Suraj", img: "https://placehold.co/640x360/FFF1F7/C2185B?text=Story+3" },
]

function StoriesPage() {
  const [video, setVideo] = useState<string | null>(null)
  return (
    <PageLayout title="Success Stories" breadcrumb="Success Stories">
      {/* Stats bar */}
      <section style={{ padding: "60px 5%", background: `linear-gradient(135deg, ${BRAND.pink} 0%, ${BRAND.pinkDark} 100%)`, color: "white" }}>
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8 text-center">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="font-serif text-5xl lg:text-6xl font-bold"><Counter value={s.value} suffix={s.suffix} /></div>
              <div className="mt-2 text-lg opacity-90">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Stories grid */}
      <Section bg="white">
        <SectionHeading>Real Families, Real Joy</SectionHeading>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: (i % 3) * 0.08 }}
              className="rounded-2xl overflow-hidden p-6 transition-all hover:-translate-y-1.5"
              style={{ background: i % 2 === 0 ? BRAND.pinkSoft : "white", border: "1px solid rgba(230,0,126,0.15)" }}
            >
              <div className="rounded-2xl overflow-hidden mb-5 aspect-[4/3]">
                <img src={s.img} alt={s.name} className="w-full h-full object-cover" />
              </div>
              <Quote className="w-10 h-10 mb-3" style={{ color: BRAND.pink }} />
              <p className="font-serif italic text-lg mb-4" style={{ color: BRAND.plum, lineHeight: 1.6 }}>"{s.text}"</p>
              <div className="font-bold" style={{ color: BRAND.heading }}>{s.name}</div>
              <div className="text-sm mb-3" style={{ color: BRAND.navLink }}>{s.location}</div>
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, k) => (
                  <Star key={k} className="w-4 h-4 fill-current" style={{ color: "#F9A825" }} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Video testimonials */}
      <Section bg={BRAND.pinkSoft}>
        <SectionHeading>Video Testimonials</SectionHeading>
        <div className="grid md:grid-cols-3 gap-6">
          {videos.map((v, i) => (
            <motion.div
              key={v.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="rounded-2xl overflow-hidden bg-white transition-transform hover:-translate-y-1"
              style={{ border: "1px solid rgba(230,0,126,0.12)" }}
            >
              <div className="relative aspect-video group cursor-pointer" onClick={() => setVideo("https://www.youtube.com/embed/dQw4w9WgXcQ")}>
                <img src={v.img} alt={v.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center transition-transform group-hover:scale-110" style={{ background: BRAND.pink }}>
                    <Play className="w-7 h-7 text-white fill-current" />
                  </div>
                </div>
              </div>
              <div className="p-5 text-center">
                <div className="font-bold mb-1" style={{ color: BRAND.plum }}>{v.name}</div>
                <button onClick={() => setVideo("https://www.youtube.com/embed/dQw4w9WgXcQ")} className="text-sm font-semibold" style={{ color: BRAND.pink }}>Watch Story →</button>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      <PageCTABanner />
      <VideoModal open={video !== null} onClose={() => setVideo(null)} src={video ?? undefined} title="Success Story" />
    </PageLayout>
  )
}
