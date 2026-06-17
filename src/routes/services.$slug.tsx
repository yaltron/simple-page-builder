import { useEffect, useState } from "react"
import { createFileRoute, Link, notFound } from "@tanstack/react-router"
import { motion } from "framer-motion"
import * as Icons from "lucide-react"
import { ArrowRight, Heart, Check, Phone, MessageCircle } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { BRAND } from "@/components/page-layout"
import { supabase } from "@/integrations/supabase/client"

export const Route = createFileRoute("/services/$slug")({
  head: ({ params }) => ({
    meta: [
      { title: `Service - Shubhashree IVF` },
      { property: "og:title", content: `Service - Shubhashree IVF` },
      { property: "og:url", content: `https://subhashree-ui.lovable.app/services/${params.slug}` },
    ],
    links: [{ rel: "canonical", href: `https://subhashree-ui.lovable.app/services/${params.slug}` }],
  }),
  component: ServiceDetailPage,
})

function pickIcon(name?: string | null) {
  const I = (Icons as any)[name || ""] as React.ComponentType<{ className?: string; style?: any }> | undefined
  return I || Heart
}

function ServiceDetailPage() {
  const { slug } = Route.useParams()
  const [service, setService] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFoundState, setNotFoundState] = useState(false)

  useEffect(() => {
    let cancel = false
    ;(async () => {
      setLoading(true)
      const { data } = await supabase.from("services").select("*").eq("slug", slug).eq("status", "published").maybeSingle()
      if (cancel) return
      if (!data) {
        setNotFoundState(true)
      } else {
        setService(data)
        if (data.meta_title || data.title) document.title = `${data.meta_title || data.title} - Shubhashree IVF`
        if (data.meta_description) {
          let m = document.querySelector('meta[name="description"]')
          if (!m) { m = document.createElement("meta"); m.setAttribute("name", "description"); document.head.appendChild(m) }
          m.setAttribute("content", data.meta_description)
        }
      }
      setLoading(false)
    })()
    return () => { cancel = true }
  }, [slug])

  if (loading) return <main className="min-h-screen flex items-center justify-center text-muted-foreground">Loading…</main>
  if (notFoundState || !service) {
    return (
      <main>
        <Navbar />
        <section style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 16, padding: 40 }}>
          <h1 className="font-serif text-3xl font-bold" style={{ color: BRAND.heading }}>Service not found</h1>
          <Link to="/services" className="px-5 py-2 rounded-full text-white font-semibold" style={{ background: BRAND.pink }}>Back to services</Link>
        </section>
        <Footer />
      </main>
    )
  }

  const Icon = pickIcon(service.icon)
  const heading = service.page_heading || service.title
  const heroImg = service.hero_image_url || service.featured_image

  return (
    <main>
      <Navbar />

      <section
        style={{
          height: 240,
          background: "linear-gradient(135deg, #FFF1F7 0%, #fff 50%, #EAF7FD 100%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "0 5%",
        }}
      >
        <Icon className="w-[60px] h-[60px] mb-2" style={{ color: "#8B0F50" }} />
        <h1 style={{ fontFamily: "'Playfair Display', serif", color: "#8B0F50", fontSize: "clamp(28px, 4vw, 36px)", fontWeight: 700, margin: 0 }}>
          {service.title}
        </h1>
        <div style={{ color: BRAND.navLink, marginTop: 10, fontSize: 13 }}>
          <Link to="/" style={{ color: BRAND.navLink }}>Home</Link>
          <span style={{ margin: "0 8px", opacity: 0.6 }}>›</span>
          <Link to="/services" style={{ color: BRAND.navLink }}>Services</Link>
          <span style={{ margin: "0 8px", opacity: 0.6 }}>›</span>
          <span style={{ color: "#8B0F50" }}>{service.title}</span>
        </div>
      </section>

      <section style={{ padding: "60px 5%", background: "white" }}>
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[60fr_40fr] gap-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h2 className="font-serif font-bold" style={{ color: "#8B0F50", fontSize: "1.8rem", marginBottom: 12 }}>{heading}</h2>
            {service.page_subtext && <p style={{ color: BRAND.navLink, fontSize: 16, lineHeight: 1.7 }}>{service.page_subtext}</p>}

            {service.key_points && service.key_points.length > 0 && (
              <>
                <hr style={{ margin: "28px 0", border: 0, borderTop: `1px solid ${BRAND.border}` }} />
                <h3 className="font-serif font-bold" style={{ color: "#8B0F50", fontSize: "1.3rem", marginBottom: 14 }}>What to Expect</h3>
                <ul className="space-y-3 mb-6">
                  {service.key_points.map((kp: string, i: number) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center" style={{ background: "#8B0F50" }}>
                        <Check className="w-3.5 h-3.5 text-white" />
                      </span>
                      <span style={{ color: BRAND.plum, lineHeight: 1.6 }}>{kp}</span>
                    </li>
                  ))}
                </ul>
              </>
            )}

            {service.full_content && (
              <>
                <hr style={{ margin: "28px 0", border: 0, borderTop: `1px solid ${BRAND.border}` }} />
                <div
                  className="prose prose-sm sm:prose max-w-none"
                  style={{ color: BRAND.plum }}
                  dangerouslySetInnerHTML={{ __html: service.full_content }}
                />
              </>
            )}

            <div className="mt-8">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-white font-bold"
                style={{ background: "#8B0F50" }}
              >
                Book a Consultation for {service.title} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>

          <motion.aside initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="space-y-6">
            {heroImg && (
              <img
                src={heroImg}
                alt={service.hero_image_alt || service.title}
                style={{ width: "100%", height: "auto", borderRadius: 20, boxShadow: "0 8px 40px rgba(139,15,80,0.12)", display: "block" }}
              />
            )}
            <div style={{ background: "#FFF1F7", borderRadius: 16, padding: 24 }}>
              <h3 className="font-serif font-bold mb-4" style={{ color: "#8B0F50", fontSize: "1.2rem" }}>Have Questions?</h3>
              <a href="tel:+9779861141699" className="flex items-center gap-3 mb-3 font-semibold" style={{ color: BRAND.plum }}>
                <Phone className="w-5 h-5" style={{ color: "#8B0F50" }} /> +977 9861141699
              </a>
              <a
                href="https://wa.me/9779861141699"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-full font-semibold mb-3"
                style={{ background: "#25D366", color: "white" }}
              >
                <MessageCircle className="w-4 h-4" /> WhatsApp
              </a>
              <Link
                to="/contact"
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-full text-white font-bold"
                style={{ background: "#8B0F50" }}
              >
                Book Consultation
              </Link>
            </div>
          </motion.aside>
        </div>
      </section>

      <Footer />
    </main>
  )
}
