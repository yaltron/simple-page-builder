import { useEffect, useMemo, useState } from "react"
import { createFileRoute, Link } from "@tanstack/react-router"
import { motion } from "framer-motion"
import { Calendar, Clock, ArrowRight, Mail } from "lucide-react"
import { toast } from "sonner"
import { PageLayout, Section, SectionHeading, BRAND } from "@/components/page-layout"
import { supabase } from "@/integrations/supabase/client"

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blogs and News — Subhashree IVF" },
      { name: "description", content: "Fertility insights, treatment guides and clinic news from Nepal's leading IVF centre." },
      { property: "og:title", content: "Blogs and News — Subhashree IVF" },
      { property: "og:description", content: "Expert fertility insights and clinic updates." },
    ],
  }),
  component: BlogPage,
})

const PAGE_SIZE = 6

function BlogPage() {
  const [posts, setPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [cat, setCat] = useState<string>("All")
  const [page, setPage] = useState(1)
  const [email, setEmail] = useState("")

  useEffect(() => {
    ;(async () => {
      const { data } = await supabase
        .from("blogs")
        .select("id,title,slug,excerpt,featured_image,featured_image_alt,category,author,published_at,reading_time")
        .eq("status", "published")
        .order("published_at", { ascending: false })
      setPosts(data || [])
      setLoading(false)
    })()
  }, [])

  const categories = useMemo(() => ["All", ...Array.from(new Set(posts.map((p) => p.category).filter(Boolean)))], [posts])
  const filtered = cat === "All" ? posts : posts.filter((p) => p.category === cat)
  const featured = filtered[0]
  const rest = filtered.slice(1)
  const totalPages = Math.max(1, Math.ceil(rest.length / PAGE_SIZE))
  const pageItems = rest.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const fmtDate = (d: string | null) => d ? new Date(d).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : ""

  const subscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.includes("@")) return toast.error("Enter a valid email")
    toast.success("Subscribed!"); setEmail("")
  }

  return (
    <PageLayout title="Blogs and News" breadcrumb="Blogs and News">
      {loading ? (
        <Section bg="white"><div className="text-center text-muted-foreground py-12">Loading posts…</div></Section>
      ) : posts.length === 0 ? (
        <Section bg="white"><div className="text-center text-muted-foreground py-12">No posts published yet.</div></Section>
      ) : (
        <>
          {featured && (
            <section style={{ padding: "60px 5%", background: "white" }}>
              <div className="max-w-7xl mx-auto">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="grid lg:grid-cols-2 gap-8 items-center rounded-2xl overflow-hidden" style={{ background: BRAND.pinkSoft }}>
                  <div className="aspect-[16/10] overflow-hidden">
                    <img src={featured.featured_image || `https://placehold.co/1200x750/FFE4EF/C2185B?text=Featured`} alt={featured.featured_image_alt || featured.title} className="w-full h-full object-cover" loading="eager" />
                  </div>
                  <div className="p-8">
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-3" style={{ background: BRAND.pink, color: "white" }}>{featured.category || "Featured"}</span>
                    <h2 className="font-serif text-3xl font-bold mb-3" style={{ color: BRAND.heading }}>{featured.title}</h2>
                    <p className="mb-4" style={{ color: BRAND.navLink }}>{featured.excerpt}</p>
                    <div className="flex items-center gap-4 text-sm mb-5" style={{ color: BRAND.navLink }}>
                      <span className="inline-flex items-center gap-1"><Calendar className="w-4 h-4" />{fmtDate(featured.published_at)}</span>
                      <span className="inline-flex items-center gap-1"><Clock className="w-4 h-4" />{featured.reading_time || 5} min</span>
                    </div>
                    <Link to="/blog/$slug" params={{ slug: featured.slug }} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-white font-bold" style={{ background: `linear-gradient(90deg, ${BRAND.pink}, ${BRAND.pinkDark})` }}>Read Article <ArrowRight className="w-4 h-4" /></Link>
                  </div>
                </motion.div>
              </div>
            </section>
          )}

          <Section bg={BRAND.pinkSoft}>
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {categories.map((c) => (
                <button key={c} onClick={() => { setCat(c); setPage(1) }} className="px-4 py-1.5 rounded-full text-sm font-semibold" style={{ background: cat === c ? BRAND.pink : "white", color: cat === c ? "white" : BRAND.pink, border: `1px solid ${BRAND.pink}` }}>{c}</button>
              ))}
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {pageItems.map((p) => (
                <motion.article key={p.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white rounded-2xl overflow-hidden border hover:-translate-y-1 transition-transform" style={{ borderColor: "rgba(230,0,126,0.12)" }}>
                  <div className="aspect-[16/10] overflow-hidden">
                    <img src={p.featured_image || `https://placehold.co/800x520/FFE4EF/C2185B?text=Article`} alt={p.featured_image_alt || p.title} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                  <div className="p-5">
                    <span className="inline-block text-xs font-bold mb-2" style={{ color: BRAND.pink }}>{p.category}</span>
                    <h3 className="font-serif text-lg font-bold mb-2 line-clamp-2" style={{ color: BRAND.heading }}>{p.title}</h3>
                    <p className="text-sm mb-3 line-clamp-2" style={{ color: BRAND.navLink }}>{p.excerpt}</p>
                    <div className="flex items-center justify-between text-xs" style={{ color: BRAND.navLink }}>
                      <span className="inline-flex items-center gap-1"><Calendar className="w-3 h-3" />{fmtDate(p.published_at)}</span>
                      <Link to="/blog/$slug" params={{ slug: p.slug }} className="font-bold inline-flex items-center gap-1" style={{ color: BRAND.pink }}>Read <ArrowRight className="w-3 h-3" /></Link>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-8">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button key={i} onClick={() => setPage(i + 1)} className="w-9 h-9 rounded-full text-sm font-semibold" style={{ background: page === i + 1 ? BRAND.pink : "white", color: page === i + 1 ? "white" : BRAND.pink, border: `1px solid ${BRAND.pink}` }}>{i + 1}</button>
                ))}
              </div>
            )}
          </Section>
        </>
      )}

      <Section bg="white">
        <div className="max-w-xl mx-auto text-center">
          <SectionHeading>Stay Updated</SectionHeading>
          <p className="mb-6" style={{ color: BRAND.navLink, marginTop: -16 }}>Get fertility tips and clinic news in your inbox.</p>
          <form onSubmit={subscribe} className="flex gap-2">
            <div className="flex-1 relative">
              <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" className="w-full pl-9 pr-3 py-2.5 border rounded-full" />
            </div>
            <button className="px-5 py-2.5 rounded-full text-white font-bold" style={{ background: `linear-gradient(90deg, ${BRAND.pink}, ${BRAND.pinkDark})` }}>Subscribe</button>
          </form>
        </div>
      </Section>
    </PageLayout>
  )
}
