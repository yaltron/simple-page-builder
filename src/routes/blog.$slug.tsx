import { createFileRoute, Link, notFound } from "@tanstack/react-router"
import { motion } from "framer-motion"
import { ArrowLeft, Calendar, Clock, Facebook, Twitter, Linkedin, Link2, MessageCircle } from "lucide-react"
import { toast } from "sonner"
import { PageLayout, PageCTABanner, Section, BRAND } from "@/components/page-layout"
import { createServerFn } from "@tanstack/react-start"

const fetchPost = createServerFn({ method: "GET" })
  .inputValidator((data: { slug: string }) => data)
  .handler(async ({ data }) => {
    const { createClient } = await import("@supabase/supabase-js")
    const sb = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_PUBLISHABLE_KEY!)
    const { data: post } = await sb
      .from("blogs")
      .select("id,title,slug,excerpt,content,featured_image,featured_image_alt,author,category,published_at,updated_at,reading_time,meta_title,meta_description,focus_keyword")
      .eq("slug", data.slug)
      .eq("status", "published")
      .maybeSingle()
    if (!post) throw notFound()
    const { data: related } = await sb
      .from("blogs")
      .select("id,title,slug,excerpt,featured_image,featured_image_alt,category,published_at,reading_time")
      .eq("status", "published")
      .neq("id", post.id)
      .eq("category", post.category || "")
      .order("published_at", { ascending: false })
      .limit(3)
    return { post, related: related || [] }
  })

const BASE_URL = "https://subhashree-ui.lovable.app"

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => fetchPost({ data: { slug: params.slug } }),
  head: ({ loaderData }) => {
    const p: any = loaderData
    if (!p) return { meta: [] }
    const title = p.meta_title || `${p.title} — Subhashree IVF`
    const desc = p.meta_description || p.excerpt || "Read the full article on Subhashree IVF."
    const url = `${BASE_URL}/blog/${p.slug}`
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        ...(p.focus_keyword ? [{ name: "keywords", content: p.focus_keyword }] : []),
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        ...(p.featured_image ? [{ property: "og:image", content: p.featured_image }, { name: "twitter:image", content: p.featured_image }] : []),
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: desc },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: p.title,
            image: p.featured_image,
            author: { "@type": "Person", name: p.author || "Subhashree IVF" },
            datePublished: p.published_at,
            dateModified: p.updated_at,
            description: desc,
            keywords: p.focus_keyword,
          }),
        },
      ],
    }
  },
  errorComponent: () => (
    <PageLayout title="Post not found" breadcrumb="Blog">
      <Section bg="white">
        <div className="max-w-xl mx-auto text-center py-10">
          <p className="text-muted-foreground mb-6">This article isn't available.</p>
          <Link to="/blog" className="inline-flex items-center gap-2 font-semibold" style={{ color: BRAND.pink }}><ArrowLeft className="w-4 h-4" /> Back to blog</Link>
        </div>
      </Section>
    </PageLayout>
  ),
  notFoundComponent: () => (
    <PageLayout title="Post not found" breadcrumb="Blog">
      <Section bg="white"><div className="text-center py-10"><Link to="/blog" style={{ color: BRAND.pink }}>← Back to blog</Link></div></Section>
    </PageLayout>
  ),
  component: BlogPostPage,
})

function BlogPostPage() {
  const p = Route.useLoaderData() as any
  const fmtDate = p.published_at ? new Date(p.published_at).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : ""

  return (
    <PageLayout title={p.title} breadcrumb="Blog">
      <Section bg="white">
        <div className="max-w-3xl mx-auto">
          <Link to="/blog" className="inline-flex items-center gap-2 mb-6 font-semibold" style={{ color: BRAND.pink }}>
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            {p.featured_image && (
              <div className="rounded-2xl overflow-hidden mb-8 aspect-[16/9]" style={{ background: BRAND.pinkSoft }}>
                <img src={p.featured_image} alt={p.featured_image_alt || p.title} className="w-full h-full object-cover" />
              </div>
            )}
            <div className="flex items-center gap-4 text-sm mb-6 flex-wrap" style={{ color: BRAND.navLink }}>
              {p.category && <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: BRAND.pinkSoft, color: BRAND.pink }}>{p.category}</span>}
              {fmtDate && <span className="inline-flex items-center gap-1"><Calendar className="w-4 h-4" /> {fmtDate}</span>}
              {p.reading_time && <span className="inline-flex items-center gap-1"><Clock className="w-4 h-4" /> {p.reading_time} min read</span>}
              {p.author && <span>by {p.author}</span>}
            </div>
            <article className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-[color:var(--heading)] [--heading:#2D0A1E] prose-a:text-[#E6007E] prose-img:rounded-xl" dangerouslySetInnerHTML={{ __html: p.content || "" }} />
          </motion.div>
        </div>
      </Section>
      <PageCTABanner />
    </PageLayout>
  )
}
