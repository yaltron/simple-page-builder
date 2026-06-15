import { createFileRoute, Link, notFound } from "@tanstack/react-router"
import * as Icons from "lucide-react"
import { Sparkles } from "lucide-react"
import { useEffect, useState } from "react"
import { PageLayout } from "@/components/page-layout"
import { supabase } from "@/integrations/supabase/client"
import type { TrustFeature } from "@/lib/use-trust-features"

export const Route = createFileRoute("/why-us/$slug")({
  head: ({ params }) => ({
    meta: [
      { title: `Why Choose Us | ${params.slug}` },
      { property: "og:url", content: `https://subhashree-ui.lovable.app/why-us/${params.slug}` },
    ],
    links: [{ rel: "canonical", href: `https://subhashree-ui.lovable.app/why-us/${params.slug}` }],
  }),
  component: WhyUsDetailPage,
  errorComponent: ({ error }) => <div className="p-10 text-center">{error.message}</div>,
  notFoundComponent: () => <div className="p-10 text-center">Not found</div>,
})

function pickIcon(name?: string | null) {
  const I = (Icons as any)[name || ""] as React.ComponentType<{ className?: string; strokeWidth?: number }> | undefined
  return I || Sparkles
}

function WhyUsDetailPage() {
  const { slug } = Route.useParams()
  const [feature, setFeature] = useState<TrustFeature | null>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    ;(async () => {
      const { data } = await supabase
        .from("trust_features" as any)
        .select("*")
        .eq("slug", slug)
        .eq("is_active", true)
        .maybeSingle()
      setFeature(((data as unknown) as TrustFeature) || null)
      setLoaded(true)
    })()
  }, [slug])

  if (!loaded) {
    return (
      <PageLayout title="Loading…" breadcrumb="Why Choose Us">
        <div className="py-20 text-center text-muted-foreground">Loading…</div>
      </PageLayout>
    )
  }

  if (!feature) {
    return (
      <PageLayout title="Not Found" breadcrumb="Why Choose Us">
        <div className="py-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Feature not found</h2>
          <Link to="/" className="text-[#8B0F50] underline">Back to home</Link>
        </div>
      </PageLayout>
    )
  }

  const Icon = pickIcon(feature.icon)

  return (
    <PageLayout title={feature.page_heading || feature.title} breadcrumb={feature.title}>
      <section style={{ background: "linear-gradient(180deg, #FFF1F7 0%, #ffffff 100%)", padding: "70px 5%" }}>
        <div className="max-w-3xl mx-auto text-center">
          <div className="mx-auto mb-6 w-20 h-20 rounded-full flex items-center justify-center text-white shadow-lg" style={{ background: feature.icon_bg_color || "#8B0F50" }}>
            <Icon className="w-9 h-9" strokeWidth={1.8} />
          </div>
          <h1 className="font-serif font-bold mb-3" style={{ color: "#8B0F50", fontSize: "clamp(28px, 4.5vw, 44px)" }}>
            {feature.page_heading || feature.title}
          </h1>
          {feature.page_subtext && (
            <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">{feature.page_subtext}</p>
          )}
        </div>
      </section>

      <section style={{ background: "#fff", padding: "60px 5%" }}>
        <div
          className="max-w-3xl mx-auto blog-content"
          dangerouslySetInnerHTML={{ __html: feature.full_content || "" }}
        />
      </section>

      <section style={{ background: "#8B0F50", padding: "70px 5%", color: "#fff", textAlign: "center" }}>
        <h2 className="font-serif font-bold mb-3" style={{ fontSize: "clamp(24px, 3.5vw, 36px)" }}>
          Ready to Experience the Difference?
        </h2>
        <p className="opacity-90 max-w-xl mx-auto mb-7">Our compassionate team is here for you at every step.</p>
        <Link
          to="/contact"
          className="inline-block px-8 py-3 rounded-full font-bold transition-transform hover:scale-105"
          style={{ background: "#fff", color: "#8B0F50" }}
        >
          Book Consultation
        </Link>
      </section>
    </PageLayout>
  )
}
