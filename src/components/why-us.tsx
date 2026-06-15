import * as Icons from "lucide-react"
import { Sparkles, ArrowRight } from "lucide-react"
import { Link } from "@tanstack/react-router"
import { useTrustFeatures } from "@/lib/use-trust-features"

function pickIcon(name?: string | null) {
  const I = (Icons as any)[name || ""] as React.ComponentType<{ className?: string; strokeWidth?: number }> | undefined
  return I || Sparkles
}

export function WhyUs() {
  const { items } = useTrustFeatures()

  if (items.length === 0) return null

  return (
    <section className="relative py-12 sm:py-16 lg:py-24 overflow-hidden gradient-brand-band">
      <div className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full bg-white/15 blur-3xl animate-float-slow" />
      <div className="pointer-events-none absolute -bottom-32 -right-20 h-96 w-96 rounded-full bg-white/10 blur-3xl animate-float-slower" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="reveal font-extrabold text-white text-balance mb-8 sm:mb-12 lg:mb-14" style={{ fontSize: "clamp(1.625rem, 4vw, 2.25rem)" }}>
          Why Families Trust Us
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch mx-auto">
          {items.map((it, i) => {
            const Icon = pickIcon(it.icon)
            return (
              <Link
                key={it.id}
                to="/why-us/$slug"
                params={{ slug: it.slug }}
                className="reveal why-card group bg-white/95 backdrop-blur rounded-2xl p-6 text-left border border-transparent shadow-[0_15px_40px_-20px_rgba(0,0,0,0.25)] no-underline block"
                style={{ transitionDelay: `${i * 120}ms`, cursor: "pointer" }}
              >
                <div className="why-card-icon h-14 w-14 rounded-xl grid place-items-center text-white mb-4 shadow-md" style={{ background: it.icon_bg_color || "#8B0F50" }}>
                  <Icon className="h-7 w-7" strokeWidth={1.8} />
                </div>
                <h3 className="font-bold text-lg text-[#1A1535] mb-2">{it.title}</h3>
                <p className="text-sm text-[#6B6B8A] leading-relaxed">{it.short_description}</p>
                <span
                  className="mt-3 inline-flex items-center gap-1 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ color: "#8B0F50" }}
                >
                  Learn more <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
