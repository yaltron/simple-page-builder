import { createFileRoute, Link } from "@tanstack/react-router"
import { motion } from "framer-motion"
import { ArrowLeft, Calendar, Clock } from "lucide-react"
import { PageLayout, PageCTABanner, Section, BRAND } from "@/components/page-layout"

export const Route = createFileRoute("/blog/$slug")({
  head: ({ params }) => ({
    meta: [
      { title: `${decodeURIComponent(params.slug).replace(/-/g, " ")} — Subhashree IVF Blog` },
      { name: "description", content: "Read the full article on the Subhashree IVF blog." },
    ],
  }),
  component: BlogPostPage,
})

function BlogPostPage() {
  const { slug } = Route.useParams()
  const title = decodeURIComponent(slug)
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())

  return (
    <PageLayout title={title} breadcrumb="Blog">
      <Section bg="white">
        <div className="max-w-3xl mx-auto">
          <Link to="/blog" className="inline-flex items-center gap-2 mb-6 font-semibold" style={{ color: BRAND.pink }}>
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="rounded-2xl overflow-hidden mb-8 aspect-[16/9]" style={{ background: BRAND.pinkSoft }}>
              <img src={`https://placehold.co/1200x675/FFE4EF/C2185B?text=${encodeURIComponent(title)}`} alt={title} className="w-full h-full object-cover" />
            </div>
            <div className="flex items-center gap-4 text-sm mb-6" style={{ color: BRAND.navLink }}>
              <span className="inline-flex items-center gap-1"><Calendar className="w-4 h-4" /> 12 May 2026</span>
              <span>·</span>
              <span className="inline-flex items-center gap-1"><Clock className="w-4 h-4" /> 6 min read</span>
            </div>
            <article className="space-y-5" style={{ color: BRAND.navLink, lineHeight: 1.8, fontSize: 16 }}>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum. Cras venenatis euismod malesuada. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.</p>
              <p>Sed posuere consectetur est at lobortis. Nulla vitae elit libero, a pharetra augue. Maecenas sed diam eget risus varius blandit sit amet non magna. Donec id elit non mi porta gravida at eget metus.</p>
              <h2 className="font-serif text-2xl font-bold" style={{ color: BRAND.heading }}>Key Takeaways</h2>
              <p>Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam id dolor id nibh ultricies vehicula ut id elit. Etiam porta sem malesuada magna mollis euismod.</p>
              <p>Donec ullamcorper nulla non metus auctor fringilla. Maecenas faucibus mollis interdum. Curabitur blandit tempus porttitor. Aenean lacinia bibendum nulla sed consectetur.</p>
            </article>
          </motion.div>
        </div>
      </Section>
      <PageCTABanner />
    </PageLayout>
  )
}
