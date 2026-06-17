import { useEffect, useMemo, useState } from "react"
import { createFileRoute } from "@tanstack/react-router"
import { motion, AnimatePresence } from "framer-motion"
import { Search, X, ChevronLeft, ChevronRight, Play } from "lucide-react"
import { PageLayout, Section, SectionHeading, BRAND } from "@/components/page-layout"
import { VideoModal } from "@/components/video-modal"
import { supabase } from "@/integrations/supabase/client"
import { toYouTubeEmbed } from "@/lib/youtube"
import { useHomepageSection } from "@/lib/use-cms-content"

const TOUR_DEFAULTS = {
  heading: "Take a Virtual Tour of Our Clinic",
  subtext: "Explore our facilities from the comfort of your home.",
  button_text: "Watch Tour Video",
  video_url: "",
  autoplay: false,
  is_active: true,
}

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Photo & Video Gallery | Shubhashree IVF, Kathmandu" },
      { name: "description", content: "Explore the Shubhashree IVF Clinic, Kathmandu - photos and videos of our facilities, fertility team, happy patients and events." },
      { property: "og:title", content: "Photo & Video Gallery | Shubhashree IVF, Kathmandu" },
      { property: "og:description", content: "Photos and videos from our clinic, fertility team and patient events at Shubhashree IVF, Kathmandu." },
      { property: "og:url", content: "https://subhashree-ui.lovable.app/gallery" },
    ],
    links: [{ rel: "canonical", href: "https://subhashree-ui.lovable.app/gallery" }],
  }),
  component: GalleryPage,
})

const cats = ["All", "Clinic", "Team", "Patients", "Events", "Videos"] as const


function GalleryPage() {
  const [items, setItems] = useState<any[]>([])
  const [active, setActive] = useState<string>("All")
  const [lightbox, setLightbox] = useState<number | null>(null)
  const [video, setVideo] = useState<string | null>(null)
  const [tourOpen, setTourOpen] = useState(false)
  const tour = useHomepageSection("virtual_tour", TOUR_DEFAULTS)

  useEffect(() => {
    supabase.from("gallery_items").select("*").eq("status", "published").order("display_order").then(({ data }) => setItems(data || []))
  }, [])

  const filtered = useMemo(() => {
    if (active === "All") return items
    if (active === "Videos") return items.filter((i) => i.media_type === "video")
    return items.filter((i) => i.category === active)
  }, [items, active])

  const next = () => setLightbox((i) => (i === null ? null : (i + 1) % filtered.length))
  const prev = () => setLightbox((i) => (i === null ? null : (i - 1 + filtered.length) % filtered.length))

  return (
    <PageLayout title="Gallery" breadcrumb="Gallery">
      <Section bg="white">
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {cats.map((c) => {
            const isActive = active === c
            return (
              <button
                key={c}
                onClick={() => setActive(c)}
                className="px-5 py-2 rounded-full font-semibold text-sm transition-all"
                style={{ background: isActive ? BRAND.pink : "white", color: isActive ? "white" : BRAND.pink, border: `1px solid ${BRAND.pink}` }}
              >{c}</button>
            )
          })}
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">No items in this category yet.</div>
        ) : (
          <div style={{ columnCount: 3, columnGap: 16 }} className="max-md:!columns-2 max-sm:!columns-1">
            <AnimatePresence mode="popLayout">
              {filtered.map((img, i) => {
                const isVideo = img.media_type === "video"
                return (
                  <motion.div
                    key={img.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.35 }}
                    className="mb-4 break-inside-avoid relative group cursor-pointer rounded-xl overflow-hidden"
                    onClick={() => isVideo ? setVideo(img.video_url || img.url) : setLightbox(i)}
                  >
                    <img src={img.thumbnail || img.url} alt={img.title || ""} loading="lazy" className="w-full transition-transform duration-300 group-hover:scale-[1.03]" style={{ objectFit: "cover" }} />
                    {isVideo ? (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div
                          className="rounded-full flex items-center justify-center transition-all duration-[250ms]"
                          style={{
                            width: 60,
                            height: 60,
                            background: "rgba(255,255,255,0.92)",
                            boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
                          }}
                          onMouseEnter={(e) => {
                            const el = e.currentTarget
                            el.style.background = "#ffffff"
                            el.style.transform = "scale(1.12)"
                            el.style.boxShadow = "0 0 0 8px rgba(230,0,126,0.15)"
                          }}
                          onMouseLeave={(e) => {
                            const el = e.currentTarget
                            el.style.background = "rgba(255,255,255,0.92)"
                            el.style.transform = "scale(1)"
                            el.style.boxShadow = "0 4px 20px rgba(0,0,0,0.2)"
                          }}
                        >
                          <span style={{ color: "#E6007E", fontSize: 22, lineHeight: 1, marginLeft: 3 }}>▶</span>
                        </div>
                      </div>
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center transition-opacity opacity-0 group-hover:opacity-100" style={{ background: "rgba(230,0,126,0.15)" }}>
                        <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center">
                          <Search className="w-6 h-6" style={{ color: BRAND.pink }} />
                        </div>
                      </div>
                    )}
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>
        )}
      </Section>

      {tour.is_active !== false && (
        <section style={{ padding: "60px 5%", background: `linear-gradient(135deg, ${BRAND.pinkSoft} 0%, ${BRAND.blueSoft} 100%)` }}>
          <div className="max-w-3xl mx-auto text-center">
            <SectionHeading>{tour.heading}</SectionHeading>
            {tour.subtext && <p className="mb-8" style={{ color: BRAND.navLink, marginTop: -20 }}>{tour.subtext}</p>}
            <button onClick={() => setTourOpen(true)} className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-white font-bold transition-transform hover:scale-105" style={{ background: `linear-gradient(90deg, ${BRAND.pink}, ${BRAND.pinkDark})` }}>
              <Play className="w-4 h-4 fill-current" /> {tour.button_text}
            </button>
          </div>
        </section>
      )}

      <AnimatePresence>
        {lightbox !== null && filtered[lightbox] && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[1000000] flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.9)" }} onClick={() => setLightbox(null)}>
            <button aria-label="Close image viewer" onClick={(e) => { e.stopPropagation(); setLightbox(null) }} className="absolute top-5 right-5 text-white p-2"><X className="w-8 h-8" /></button>
            <button aria-label="Previous image" onClick={(e) => { e.stopPropagation(); prev() }} className="absolute left-5 text-white p-3 rounded-full bg-white/10 hover:bg-white/20"><ChevronLeft className="w-6 h-6" /></button>
            <img src={filtered[lightbox].url} alt={filtered[lightbox].title || ""} className="max-h-[85vh] max-w-[90vw] rounded-xl" onClick={(e) => e.stopPropagation()} />
            <button aria-label="Next image" onClick={(e) => { e.stopPropagation(); next() }} className="absolute right-5 text-white p-3 rounded-full bg-white/10 hover:bg-white/20"><ChevronRight className="w-6 h-6" /></button>
          </motion.div>
        )}
      </AnimatePresence>

      <VideoModal
        open={tourOpen}
        onClose={() => setTourOpen(false)}
        title="Virtual Clinic Tour"
        src={(() => {
          if (!tour.video_url) return undefined
          const embed = toYouTubeEmbed(tour.video_url) ?? tour.video_url
          const sep = embed.includes("?") ? "&" : "?"
          return tour.autoplay ? `${embed}${sep}autoplay=1&mute=1` : `${embed}${sep}autoplay=0`
        })()}
      />
      <VideoModal open={video !== null} onClose={() => setVideo(null)} src={video ? (toYouTubeEmbed(video) ?? video) : undefined} title="Gallery Video" />
    </PageLayout>
  )
}
