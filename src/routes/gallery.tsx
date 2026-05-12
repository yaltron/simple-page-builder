import { useState } from "react"
import { createFileRoute } from "@tanstack/react-router"
import { motion, AnimatePresence } from "framer-motion"
import { Search, X, ChevronLeft, ChevronRight, Play } from "lucide-react"
import { PageLayout, Section, SectionHeading, BRAND } from "@/components/page-layout"

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Subhashree IVF" },
      { name: "description", content: "A look inside Subhashree IVF — our clinic, team, patients and events." },
      { property: "og:title", content: "Gallery — Subhashree IVF" },
      { property: "og:description", content: "Photos from our clinic, team and patient events." },
    ],
  }),
  component: GalleryPage,
})

type Cat = "All" | "Clinic" | "Team" | "Patients" | "Events"
const cats: Cat[] = ["All", "Clinic", "Team", "Patients", "Events"]

const images: { src: string; cat: Exclude<Cat, "All">; h: number }[] = [
  { src: "https://placehold.co/600x800/FFE4EF/C2185B?text=Clinic+1", cat: "Clinic", h: 360 },
  { src: "https://placehold.co/600x500/EAF7FD/C2185B?text=Team+1", cat: "Team", h: 260 },
  { src: "https://placehold.co/600x700/FFF1F7/C2185B?text=Patient+1", cat: "Patients", h: 320 },
  { src: "https://placehold.co/600x600/FFE4EF/C2185B?text=Event+1", cat: "Events", h: 280 },
  { src: "https://placehold.co/600x800/EAF7FD/C2185B?text=Clinic+2", cat: "Clinic", h: 380 },
  { src: "https://placehold.co/600x550/FFF1F7/C2185B?text=Team+2", cat: "Team", h: 280 },
  { src: "https://placehold.co/600x720/FFE4EF/C2185B?text=Patient+2", cat: "Patients", h: 340 },
  { src: "https://placehold.co/600x500/EAF7FD/C2185B?text=Event+2", cat: "Events", h: 240 },
  { src: "https://placehold.co/600x780/FFF1F7/C2185B?text=Clinic+3", cat: "Clinic", h: 360 },
  { src: "https://placehold.co/600x560/FFE4EF/C2185B?text=Team+3", cat: "Team", h: 270 },
  { src: "https://placehold.co/600x680/EAF7FD/C2185B?text=Patient+3", cat: "Patients", h: 320 },
  { src: "https://placehold.co/600x600/FFF1F7/C2185B?text=Event+3", cat: "Events", h: 290 },
]

function GalleryPage() {
  const [active, setActive] = useState<Cat>("All")
  const [lightbox, setLightbox] = useState<number | null>(null)
  const filtered = active === "All" ? images : images.filter((i) => i.cat === active)

  const next = () => setLightbox((i) => (i === null ? null : (i + 1) % filtered.length))
  const prev = () => setLightbox((i) => (i === null ? null : (i - 1 + filtered.length) % filtered.length))

  return (
    <PageLayout title="Gallery" breadcrumb="Gallery">
      <Section bg="white">
        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {cats.map((c) => {
            const isActive = active === c
            return (
              <button
                key={c}
                onClick={() => setActive(c)}
                className="px-5 py-2 rounded-full font-semibold text-sm transition-all"
                style={{
                  background: isActive ? BRAND.pink : "white",
                  color: isActive ? "white" : BRAND.pink,
                  border: `1px solid ${BRAND.pink}`,
                }}
              >
                {c}
              </button>
            )
          })}
        </div>

        {/* Masonry grid via CSS columns */}
        <div style={{ columnCount: 3, columnGap: 16 }} className="max-md:!columns-2 max-sm:!columns-1">
          <AnimatePresence mode="popLayout">
            {filtered.map((img, i) => (
              <motion.div
                key={img.src}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35 }}
                className="mb-4 break-inside-avoid relative group cursor-pointer rounded-xl overflow-hidden"
                onClick={() => setLightbox(i)}
              >
                <img src={img.src} alt="" loading="lazy" className="w-full transition-transform duration-300 group-hover:scale-[1.03]" style={{ height: img.h, objectFit: "cover" }} />
                <div className="absolute inset-0 flex items-center justify-center transition-opacity opacity-0 group-hover:opacity-100" style={{ background: "rgba(230,0,126,0.15)" }}>
                  <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center">
                    <Search className="w-6 h-6" style={{ color: BRAND.pink }} />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </Section>

      {/* Virtual tour CTA */}
      <section style={{ padding: "60px 5%", background: `linear-gradient(135deg, ${BRAND.pinkSoft} 0%, ${BRAND.blueSoft} 100%)` }}>
        <div className="max-w-3xl mx-auto text-center">
          <SectionHeading>Take a Virtual Tour of Our Clinic</SectionHeading>
          <p className="mb-8" style={{ color: BRAND.navLink, marginTop: -20 }}>Explore our facilities from the comfort of your home.</p>
          <button className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-white font-bold transition-transform hover:scale-105" style={{ background: `linear-gradient(90deg, ${BRAND.pink}, ${BRAND.pinkDark})` }}>
            <Play className="w-4 h-4 fill-current" /> Watch Tour Video
          </button>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000000] flex items-center justify-center p-4"
            style={{ background: "rgba(0,0,0,0.9)" }}
            onClick={() => setLightbox(null)}
          >
            <button onClick={(e) => { e.stopPropagation(); setLightbox(null) }} className="absolute top-5 right-5 text-white p-2"><X className="w-8 h-8" /></button>
            <button onClick={(e) => { e.stopPropagation(); prev() }} className="absolute left-5 text-white p-3 rounded-full bg-white/10 hover:bg-white/20"><ChevronLeft className="w-6 h-6" /></button>
            <img src={filtered[lightbox].src} alt="" className="max-h-[85vh] max-w-[90vw] rounded-xl" onClick={(e) => e.stopPropagation()} />
            <button onClick={(e) => { e.stopPropagation(); next() }} className="absolute right-5 text-white p-3 rounded-full bg-white/10 hover:bg-white/20"><ChevronRight className="w-6 h-6" /></button>
          </motion.div>
        )}
      </AnimatePresence>
    </PageLayout>
  )
}
