import { useEffect, useState } from "react"
import { createFileRoute } from "@tanstack/react-router"
import { motion } from "framer-motion"
import { Star, Quote, Play } from "lucide-react"
import { PageLayout, PageCTABanner, Section, SectionHeading, BRAND } from "@/components/page-layout"
import { VideoModal } from "@/components/video-modal"
import { supabase } from "@/integrations/supabase/client"

export const Route = createFileRoute("/success-stories")({
  head: () => ({
    meta: [
      { title: "Success Stories - Subhashree IVF" },
      { name: "description", content: "Real families, real journeys. Read how Subhashree IVF has helped thousands of couples become parents." },
      { property: "og:title", content: "Success Stories - Subhashree IVF" },
      { property: "og:description", content: "Real stories of hope and joy from our families." },
      { property: "og:url", content: "https://subhashree-ui.lovable.app/success-stories" },
    ],
    links: [{ rel: "canonical", href: "https://subhashree-ui.lovable.app/success-stories" }],
  }),
  component: StoriesPage,
})

function StoriesPage() {
  const [items, setItems] = useState<any[]>([])
  const [video, setVideo] = useState<string | null>(null)

  useEffect(() => {
    supabase.from("testimonials").select("*").eq("status", "published").order("display_order").then(({ data }) => setItems(data || []))
  }, [])

  const stories = items.filter((i) => !i.video_url)
  const videos = items.filter((i) => !!i.video_url)

  return (
    <PageLayout title="Success Stories" breadcrumb="Success Stories">
      <Section bg="white">
        <SectionHeading>Real Families, Real Joy</SectionHeading>
        {stories.length === 0 ? (
          <div className="text-center py-10 text-muted-foreground">No stories published yet.</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stories.map((s, i) => (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: (i % 3) * 0.08 }}
                className="rounded-2xl overflow-hidden p-6 transition-all hover:-translate-y-1.5"
                style={{ background: i % 2 === 0 ? BRAND.pinkSoft : "white", border: "1px solid rgba(230,0,126,0.15)" }}
              >
                {s.image && (
                  <div className="rounded-2xl overflow-hidden mb-5 aspect-[4/3]">
                    <img src={s.image} alt={s.name} className="w-full h-full object-cover" />
                  </div>
                )}
                <Quote className="w-10 h-10 mb-3" style={{ color: BRAND.pink }} />
                <p className="font-serif italic text-lg mb-4" style={{ color: BRAND.plum, lineHeight: 1.6 }}>"{s.story}"</p>
                <div className="font-bold" style={{ color: BRAND.heading }}>{s.name}</div>
                {s.location && <div className="text-sm mb-3" style={{ color: BRAND.navLink }}>{s.location}</div>}
                <div className="flex gap-1">
                  {Array.from({ length: s.rating || 5 }).map((_, k) => (
                    <Star key={k} className="w-4 h-4 fill-current" style={{ color: "#F9A825" }} />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </Section>

      {videos.length > 0 && (
        <Section bg={BRAND.pinkSoft}>
          <SectionHeading>Video Testimonials</SectionHeading>
          <div className="grid md:grid-cols-3 gap-6">
            {videos.map((v, i) => (
              <motion.div
                key={v.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="rounded-2xl overflow-hidden bg-white transition-transform hover:-translate-y-1"
                style={{ border: "1px solid rgba(230,0,126,0.12)" }}
              >
                <div className="relative aspect-video group cursor-pointer" onClick={() => setVideo(v.video_url)}>
                  <img src={v.image || `https://placehold.co/640x360/FFE4EF/C2185B?text=${encodeURIComponent(v.name)}`} alt={v.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center transition-transform group-hover:scale-110" style={{ background: BRAND.pink }}>
                      <Play className="w-7 h-7 text-white fill-current" />
                    </div>
                  </div>
                </div>
                <div className="p-5 text-center">
                  <div className="font-bold mb-1" style={{ color: BRAND.plum }}>{v.name}</div>
                  <button onClick={() => setVideo(v.video_url)} className="text-sm font-semibold" style={{ color: BRAND.pink }}>Watch Story →</button>
                </div>
              </motion.div>
            ))}
          </div>
        </Section>
      )}

      <PageCTABanner />
      <VideoModal open={video !== null} onClose={() => setVideo(null)} src={video ?? undefined} title="Success Story" />
    </PageLayout>
  )
}
