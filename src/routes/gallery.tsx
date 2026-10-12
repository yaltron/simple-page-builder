import { useEffect, useMemo, useRef, useState } from "react"
import { createFileRoute } from "@tanstack/react-router"
import { motion, AnimatePresence } from "framer-motion"
import { Search, X, ChevronLeft, ChevronRight, Play } from "lucide-react"
import { PageLayout, Section, SectionHeading, BRAND } from "@/components/page-layout"
import { VideoModal } from "@/components/video-modal"
import { supabase } from "@/integrations/supabase/client"
import { toYouTubeEmbed } from "@/lib/youtube"
import { getYouTubeEmbedUrl } from "@/lib/youtube-id"
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
      { property: "og:url", content: "https://shubhashreeivf.com/gallery" },
    ],
    links: [{ rel: "canonical", href: "https://shubhashreeivf.com/gallery" }],
  }),
  component: GalleryPage,
})

const cats = ["All", "Clinic", "Team", "Patients", "Events", "Videos"] as const

// Serve Supabase Storage images through the render-image transform so
// gallery grid loads WebP at reasonable dimensions instead of full-res PNGs.
function getOptimizedUrl(url: string | null | undefined): string {
  if (!url) return ""
  if (url.includes("supabase.co") && url.includes("/storage/v1/object/public/")) {
    const rendered = url.replace("/storage/v1/object/public/", "/storage/v1/render/image/public/")
    const sep = rendered.includes("?") ? "&" : "?"
    return `${rendered}${sep}width=800&quality=75&format=webp`
  }
  return url
}



function GalleryPage() {
  const [items, setItems] = useState<any[]>([])
  const [podcasts, setPodcasts] = useState<any[]>([])
  const [active, setActive] = useState<string>("All")
  const [lightbox, setLightbox] = useState<number | null>(null)
  const [video, setVideo] = useState<string | null>(null)
  const [tourOpen, setTourOpen] = useState(false)
  const tour = useHomepageSection("virtual_tour", TOUR_DEFAULTS)
  const podcastScrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    supabase.from("gallery_items").select("*").eq("status", "published").order("display_order").then(({ data }) => setItems(data || []))
    supabase.from("podcasts").select("*").eq("is_active", true).order("order_index", { ascending: true }).then(({ data }) => setPodcasts(data || []))
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
        <div className="gallery-filters mb-8 md:mb-12 -mx-[5vw] px-[5vw] sm:mx-0 sm:px-0">
          <div
            className="inline-flex shrink-0 gap-1 p-1 rounded-full mx-auto"
            style={{ background: BRAND.pinkSoft, border: `1px solid ${BRAND.border}` }}
          >
            {cats.map((c) => {
              const isActive = active === c
              return (
                <button
                  key={c}
                  onClick={() => setActive(c)}
                  className="px-4 md:px-5 py-1.5 md:py-2 rounded-full text-[13px] md:text-sm font-medium tracking-wide whitespace-nowrap transition-all duration-300"
                  style={{
                    background: isActive ? BRAND.pink : "transparent",
                    color: isActive ? "white" : BRAND.navLink,
                    boxShadow: isActive ? "0 4px 14px rgba(230,0,126,0.25)" : "none",
                  }}
                >{c}</button>
              )
            })}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">No items in this category yet.</div>
        ) : (
          <>
            <style>{`
              @keyframes shimmer {
                0% { background-position: 200% 0; }
                100% { background-position: -200% 0; }
              }
              .gallery-img-wrap { position: relative; }
              .gallery-img-skeleton {
                position: absolute; inset: 0;
                background: linear-gradient(90deg, #f0e0e8 25%, #fce4ec 50%, #f0e0e8 75%);
                background-size: 200% 100%;
                animation: shimmer 1.5s infinite;
                border-radius: inherit;
                transition: opacity 0.3s ease;
              }
              .gallery-img-loaded { opacity: 0; pointer-events: none; }
              .gallery-filters { display: flex; overflow-x: auto; scrollbar-width: none; }
              .gallery-filters::-webkit-scrollbar { display: none; }
              .gallery-tile {
                box-shadow: 0 1px 2px rgba(45,10,30,0.04), 0 4px 16px rgba(45,10,30,0.06);
                transition: transform 0.45s cubic-bezier(.2,.7,.2,1), box-shadow 0.45s cubic-bezier(.2,.7,.2,1);
              }
              .gallery-tile:hover {
                transform: translateY(-4px);
                box-shadow: 0 2px 4px rgba(45,10,30,0.05), 0 16px 36px rgba(139,15,80,0.16);
              }
              .gallery-tile img { transition: transform 0.7s cubic-bezier(.2,.7,.2,1); }
              .gallery-tile:hover img { transform: scale(1.06); }
              .gallery-tile-overlay {
                background: linear-gradient(to top, rgba(45,10,30,0.72) 0%, rgba(45,10,30,0.15) 45%, rgba(45,10,30,0) 70%);
                opacity: 0; transition: opacity 0.4s ease;
              }
              .gallery-tile:hover .gallery-tile-overlay { opacity: 1; }
              .gallery-tile-caption { transform: translateY(8px); transition: transform 0.4s ease; }
              .gallery-tile:hover .gallery-tile-caption { transform: translateY(0); }
              .gallery-play {
                background: rgba(255,255,255,0.9);
                backdrop-filter: blur(6px);
                box-shadow: 0 6px 24px rgba(0,0,0,0.18);
                transition: transform 0.3s ease, box-shadow 0.3s ease;
              }
              .gallery-tile:hover .gallery-play {
                transform: scale(1.08);
                box-shadow: 0 0 0 8px rgba(255,255,255,0.25), 0 6px 24px rgba(0,0,0,0.2);
              }
              @media (hover: none) {
                .gallery-tile:hover { transform: none; }
                .gallery-tile:hover img { transform: none; }
              }
            `}</style>
            <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
              <AnimatePresence mode="popLayout">
                {filtered.map((img, i) => {
                  const isVideo = img.media_type === "video"
                  const rawSrc = img.thumbnail || img.url
                  const optimizedSrc = getOptimizedUrl(rawSrc)
                  return (
                    <motion.div
                      key={img.id}
                      layout
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.4, ease: [0.2, 0.7, 0.2, 1] }}
                      className="gallery-tile gallery-img-wrap relative aspect-[4/5] cursor-pointer rounded-xl md:rounded-2xl overflow-hidden bg-[#FFF1F7]"
                      onClick={() => isVideo ? setVideo(img.video_url || img.url) : setLightbox(i)}
                    >
                      <img
                        src={optimizedSrc}
                        alt={img.title || ""}
                        loading="lazy"
                        decoding="async"
                        onLoad={(e) => {
                          const skel = (e.currentTarget.parentElement?.querySelector(".gallery-img-skeleton")) as HTMLElement | null
                          if (skel) skel.classList.add("gallery-img-loaded")
                        }}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      <div className="gallery-img-skeleton" aria-hidden="true" />
                      <div className="gallery-tile-overlay absolute inset-0 flex items-end p-3 md:p-4">
                        <div className="gallery-tile-caption flex items-center justify-between gap-2 w-full text-white">
                          <div className="min-w-0">
                            {img.category && (
                              <div className="text-[10px] md:text-[11px] uppercase tracking-[0.14em] opacity-80">{img.category}</div>
                            )}
                            {img.title && (
                              <div className="text-sm md:text-[15px] font-medium leading-snug truncate" style={{ fontFamily: "'Playfair Display', serif" }}>{img.title}</div>
                            )}
                          </div>
                          {!isVideo && (
                            <div className="shrink-0 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                              <Search className="w-4 h-4" />
                            </div>
                          )}
                        </div>
                      </div>
                      {isVideo && (
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <div className="gallery-play rounded-full flex items-center justify-center w-12 h-12 md:w-14 md:h-14">
                            <Play className="w-5 h-5 ml-0.5" style={{ color: BRAND.pink, fill: BRAND.pink }} />
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )
                })}
              </AnimatePresence>
            </div>
          </>
        )}
      </Section>

      {podcasts.length > 0 && (
        <section style={{ padding: "60px 5%", background: "white" }}>
          <div className="max-w-7xl mx-auto">
            <SectionHeading>Take a Look at our Podcast</SectionHeading>
            <style>{`
              .podcast-strip-wrap { position: relative; }
              .podcast-strip {
                display: flex; flex-direction: row; gap: 20px;
                overflow-x: auto; scroll-behavior: smooth;
                padding-bottom: 16px;
                scrollbar-width: thin;
                scrollbar-color: rgba(139,15,80,0.3) transparent;
                -webkit-overflow-scrolling: touch;
              }
              .podcast-strip::-webkit-scrollbar { height: 8px; }
              .podcast-strip::-webkit-scrollbar-thumb { background: rgba(139,15,80,0.3); border-radius: 8px; }
              .podcast-strip::-webkit-scrollbar-thumb:hover { background: rgba(139,15,80,0.5); }
              .podcast-card {
                min-width: 280px; max-width: 280px;
                border-radius: 16px; overflow: hidden; background: white;
                box-shadow: 0 4px 20px rgba(0,0,0,0.08);
                border: 1px solid rgba(139,15,80,0.10);
                flex-shrink: 0;
                transition: transform 0.3s ease, box-shadow 0.3s ease;
              }
              .podcast-card:hover {
                transform: translateY(-6px);
                box-shadow: 0 12px 40px rgba(139,15,80,0.15);
              }
              .podcast-arrow {
                position: absolute; top: 50%; transform: translateY(-50%);
                width: 44px; height: 44px; border-radius: 50%;
                background: #8B0F50; color: white; font-size: 18px;
                border: none; cursor: pointer;
                box-shadow: 0 4px 16px rgba(139,15,80,0.3);
                display: flex; align-items: center; justify-content: center;
                z-index: 2; transition: background 0.2s;
              }
              .podcast-arrow:hover { background: #6D0A3E; }
              .podcast-arrow-left { left: -8px; }
              .podcast-arrow-right { right: -8px; }
              .podcast-title {
                font-family: 'Playfair Display', serif;
                font-size: 15px; font-weight: 700; color: #2D0A1E;
                margin: 0 0 6px 0;
                display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
              }
              .podcast-desc {
                font-size: 13px; color: #7A2050; line-height: 1.5; margin: 0;
                display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
              }
            `}</style>
            <div className="podcast-strip-wrap">
              <button
                type="button"
                aria-label="Scroll podcasts left"
                className="podcast-arrow podcast-arrow-left"
                onClick={() => podcastScrollRef.current?.scrollBy({ left: -300, behavior: "smooth" })}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div ref={podcastScrollRef} className="podcast-strip">
                {podcasts.map((p) => {
                  const embed = getYouTubeEmbedUrl(p.youtube_url)
                  return (
                    <div key={p.id} className="podcast-card">
                      <div style={{ width: "100%", height: 160, background: "#000" }}>
                        {embed ? (
                          <iframe
                            src={embed}
                            width="100%"
                            height="160"
                            frameBorder={0}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            loading="lazy"
                            title={p.title || "Podcast"}
                            style={{ display: "block", border: 0 }}
                          />
                        ) : null}
                      </div>
                      <div style={{ padding: 16 }}>
                        {p.title && <h3 className="podcast-title">{p.title}</h3>}
                        {p.description && <p className="podcast-desc">{p.description}</p>}
                      </div>
                    </div>
                  )
                })}
              </div>
              <button
                type="button"
                aria-label="Scroll podcasts right"
                className="podcast-arrow podcast-arrow-right"
                onClick={() => podcastScrollRef.current?.scrollBy({ left: 300, behavior: "smooth" })}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </section>
      )}


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
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[1000000] flex flex-col items-center justify-center p-4 backdrop-blur-sm" style={{ background: "rgba(20,5,14,0.92)" }} onClick={() => setLightbox(null)}>
            <div className="absolute top-4 left-5 text-white/70 text-sm tracking-widest">{lightbox + 1} / {filtered.length}</div>
            <button aria-label="Close image viewer" onClick={(e) => { e.stopPropagation(); setLightbox(null) }} className="absolute top-3 right-3 md:top-5 md:right-5 text-white p-2 rounded-full hover:bg-white/10 transition-colors"><X className="w-6 h-6 md:w-7 md:h-7" /></button>
            <button aria-label="Previous image" onClick={(e) => { e.stopPropagation(); prev() }} className="absolute left-2 md:left-6 z-10 text-white p-2.5 md:p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur transition-colors"><ChevronLeft className="w-5 h-5 md:w-6 md:h-6" /></button>
            <motion.img
              key={filtered[lightbox].id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              src={filtered[lightbox].url}
              alt={filtered[lightbox].title || ""}
              className="max-h-[78vh] max-w-[92vw] md:max-w-[80vw] rounded-lg shadow-2xl object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            {filtered[lightbox].title && (
              <div className="mt-4 text-center text-white/90 text-sm md:text-base px-10" style={{ fontFamily: "'Playfair Display', serif" }}>{filtered[lightbox].title}</div>
            )}
            <button aria-label="Next image" onClick={(e) => { e.stopPropagation(); next() }} className="absolute right-2 md:right-6 z-10 text-white p-2.5 md:p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur transition-colors"><ChevronRight className="w-5 h-5 md:w-6 md:h-6" /></button>
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
