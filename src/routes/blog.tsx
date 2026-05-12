import { useState } from "react"
import { createFileRoute, Link } from "@tanstack/react-router"
import { motion } from "framer-motion"
import { Calendar, Clock, ArrowRight, Mail } from "lucide-react"
import { toast } from "sonner"
import { PageLayout, Section, SectionHeading, BRAND } from "@/components/page-layout"

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

const featured = {
  title: "Understanding IVF: A Complete Guide for First-Time Patients",
  category: "Guide",
  date: "12 May 2026",
  author: "Dr. Subhashree Sharma",
  img: "https://placehold.co/1600x700/FFE4EF/C2185B?text=Featured+Article",
}

const posts = [
  { title: "Understanding IVF: A Complete Guide", cat: "Guide", date: "12 May 2026", read: "8 min", excerpt: "Everything you need to know about the IVF process — from first consultation to embryo transfer.", img: "https://placehold.co/800x520/FFE4EF/C2185B?text=Article+1" },
  { title: "How to Prepare for Your First Fertility Consultation", cat: "Tips", date: "06 May 2026", read: "5 min", excerpt: "Practical steps and questions to bring along to make the most of your first visit.", img: "https://placehold.co/800x520/EAF7FD/C2185B?text=Article+2" },
  { title: "PCOS and Fertility: What You Need to Know", cat: "Health", date: "29 Apr 2026", read: "6 min", excerpt: "How polycystic ovary syndrome affects fertility — and the treatment paths that work.", img: "https://placehold.co/800x520/FFF1F7/C2185B?text=Article+3" },
  { title: "Male Infertility: Breaking the Stigma", cat: "Awareness", date: "21 Apr 2026", read: "7 min", excerpt: "Male factor accounts for nearly half of infertility cases. Here's what to know.", img: "https://placehold.co/800x520/FFE4EF/C2185B?text=Article+4" },
  { title: "Embryo Freezing: Preserving Your Future", cat: "Guide", date: "14 Apr 2026", read: "5 min", excerpt: "Vitrification, success rates, and who benefits most from embryo cryopreservation.", img: "https://placehold.co/800x520/EAF7FD/C2185B?text=Article+5" },
  { title: "Nutrition Tips for IVF Success", cat: "Lifestyle", date: "07 Apr 2026", read: "4 min", excerpt: "Foods, supplements and habits that support a healthy IVF cycle.", img: "https://placehold.co/800x520/FFF1F7/C2185B?text=Article+6" },
]

function BlogPage() {
  const [email, setEmail] = useState("")
  return (
    <PageLayout title="Blogs and News" breadcrumb="Blogs and News">
      {(() => null)()}
      {/* Featured post */}
      <section style={{ padding: "60px 5%", background: "white" }}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative rounded-3xl overflow-hidden h-[420px] flex items-end"
            style={{ backgroundImage: `url(${featured.img})`, backgroundSize: "cover", backgroundPosition: "center" }}
          >
            <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(230,0,126,0.75) 0%, rgba(230,0,126,0.2) 70%, transparent 100%)" }} />
            <div className="relative p-8 lg:p-12 text-white max-w-2xl">
              <span className="inline-block text-xs font-bold px-3 py-1 rounded-full mb-4" style={{ background: "white", color: BRAND.pink }}>{featured.category}</span>
              <h2 className="font-serif text-3xl lg:text-5xl font-bold mb-4" style={{ lineHeight: 1.15 }}>{featured.title}</h2>
              <div className="flex items-center gap-4 text-sm mb-6 opacity-95">
                <span className="inline-flex items-center gap-1"><Calendar className="w-4 h-4" /> {featured.date}</span>
                <span>·</span>
                <span>{featured.author}</span>
              </div>
              <button className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-transform hover:scale-105" style={{ background: "white", color: BRAND.pink }}>
                Read Article <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Blog grid */}
      <Section bg="white">
        <SectionHeading>Latest Articles</SectionHeading>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((p, i) => (
            <motion.article
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: (i % 3) * 0.08 }}
              className="bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
              style={{ border: `1px solid ${BRAND.border}` }}
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img src={p.img} alt={p.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-6">
                <span className="inline-block text-xs font-bold px-3 py-1 rounded-full mb-3 text-white" style={{ background: BRAND.pink }}>{p.cat}</span>
                <h3 className="font-serif text-xl font-bold mb-2" style={{ color: BRAND.plum }}>{p.title}</h3>
                <p className="text-sm mb-4" style={{ color: BRAND.navLink, lineHeight: 1.6 }}>{p.excerpt}</p>
                <div className="flex items-center justify-between text-xs mb-4" style={{ color: BRAND.navLink }}>
                  <span className="inline-flex items-center gap-1"><Calendar className="w-3 h-3" /> {p.date}</span>
                  <span className="inline-flex items-center gap-1"><Clock className="w-3 h-3" /> {p.read}</span>
                </div>
                <a className="inline-flex items-center gap-1 text-sm font-bold cursor-pointer" style={{ color: BRAND.pink }}>
                  Read More <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </Section>

      {/* Newsletter */}
      <Section bg={BRAND.pinkSoft}>
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-14 h-14 mx-auto mb-5 rounded-full bg-white flex items-center justify-center">
            <Mail className="w-7 h-7" style={{ color: BRAND.pink }} />
          </div>
          <SectionHeading>Stay Informed</SectionHeading>
          <p className="mb-6" style={{ color: BRAND.navLink, marginTop: -16 }}>Fertility tips and clinic news, delivered straight to your inbox.</p>
          <form
            onSubmit={(e) => { e.preventDefault() }}
            className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 px-5 py-3 rounded-full outline-none bg-white"
              style={{ border: "1.5px solid rgba(230,0,126,0.2)" }}
              onFocus={(e) => (e.currentTarget.style.borderColor = BRAND.pink)}
              onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(230,0,126,0.2)")}
            />
            <button type="submit" className="px-6 py-3 rounded-full text-white font-bold transition-transform hover:scale-105" style={{ background: `linear-gradient(90deg, ${BRAND.pink}, ${BRAND.pinkDark})` }}>
              Subscribe
            </button>
          </form>
        </div>
      </Section>
    </PageLayout>
  )
}
