import { useEffect, useMemo, useState } from "react"
import { createFileRoute } from "@tanstack/react-router"
import { AnimatePresence, motion } from "framer-motion"
import { Plus, Minus } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { supabase } from "@/integrations/supabase/client"

export const Route = createFileRoute("/faqs")({
  component: FAQsPage,
  loader: async () => {
    const { data } = await supabase
      .from("faqs")
      .select("*")
      .eq("is_active", true)
      .order("category")
      .order("order_index")
    return { faqs: data || [] }
  },
  head: ({ loaderData }) => {
    const faqs = loaderData?.faqs || []
    const stripHtml = (s: string) => s.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim()
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((f: any) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: stripHtml(f.answer) },
      })),
    }
    return {
      meta: [
        { title: "FAQs | Subhashree IVF & Fertility Centre" },
        {
          name: "description",
          content:
            "Answers to common questions about IVF, ICSI, costs, preparation and after-treatment care at Subhashree IVF, Kathmandu.",
        },
        { property: "og:title", content: "FAQs | Subhashree IVF" },
        {
          property: "og:description",
          content: "Common fertility, IVF and ICSI questions answered by our specialists.",
        },
        { property: "og:url", content: "https://subhashree-ui.lovable.app/faqs" },
      ],
      links: [{ rel: "canonical", href: "https://subhashree-ui.lovable.app/faqs" }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify(jsonLd),
        },
      ],
    }
  },
})

type FAQ = {
  id: string
  question: string
  answer: string
  category: string
  order_index: number
}

function FAQsPage() {
  const { faqs } = Route.useLoaderData() as { faqs: FAQ[] }
  const [active, setActive] = useState<string>("All")
  const [open, setOpen] = useState<string | null>(null)
  const [list, setList] = useState<FAQ[]>(faqs)

  // Realtime: refresh list if admin edits
  useEffect(() => {
    setList(faqs)
  }, [faqs])

  const categories = useMemo(() => {
    const s = Array.from(new Set(list.map((f) => f.category)))
    return ["All", ...s]
  }, [list])

  const filtered = useMemo(
    () => (active === "All" ? list : list.filter((f) => f.category === active)),
    [list, active],
  )

  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <Navbar />
      <main className="flex-1 pt-24 pb-20">
        <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <h1 className="font-serif text-3xl lg:text-5xl font-bold text-plum">
              Answers to Your Fertility Questions
            </h1>
            <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
              Browse common questions about IVF, ICSI, costs and preparation.
            </p>
          </motion.div>

          {/* Category pills */}
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {categories.map((c) => {
              const isOn = c === active
              return (
                <button
                  key={c}
                  onClick={() => {
                    setActive(c)
                    setOpen(null)
                  }}
                  className="px-4 py-2 rounded-full text-sm font-medium transition-colors"
                  style={{
                    background: isOn ? "#E6007E" : "white",
                    color: isOn ? "white" : "#7A2050",
                    border: isOn ? "none" : "1px solid rgba(122,32,80,0.2)",
                  }}
                >
                  {c}
                </button>
              )
            })}
          </div>

          {/* Accordion */}
          <div className="bg-white rounded-2xl px-6 lg:px-8 shadow-sm">
            {filtered.map((f, idx) => {
              const isOpen = open === f.id
              return (
                <motion.div
                  key={f.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: idx * 0.04 }}
                  className="border-b border-plum/10 last:border-b-0"
                >
                  <button
                    onClick={() => setOpen(isOpen ? null : f.id)}
                    className="w-full py-6 flex items-center justify-between text-left group"
                  >
                    <span className="font-serif text-lg font-semibold text-plum pr-8 group-hover:text-rose transition-colors">
                      {f.question}
                    </span>
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-rose/10 flex items-center justify-center text-rose group-hover:bg-rose group-hover:text-white transition-colors">
                      {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </span>
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div
                          className="pb-6 text-muted-foreground leading-relaxed pr-12 prose prose-sm max-w-none prose-a:text-rose"
                          dangerouslySetInnerHTML={{ __html: f.answer }}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )
            })}
            {filtered.length === 0 && (
              <div className="py-12 text-center text-muted-foreground">No FAQs in this category yet.</div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
