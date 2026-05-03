import { Microscope, FlaskConical, UserCheck, HeartHandshake } from "lucide-react"

const items = [
  { icon: Microscope, title: "Advanced Lab Technology", desc: "Our advanced laboratories and precision-monitoring ensure safe and successful treatment outcomes." },
  { icon: FlaskConical, title: "Experienced Embryologists", desc: "Skilled embryologists ensure your embryos receive the highest level of professional care." },
  { icon: UserCheck, title: "Personalized Care Protocols", desc: "Our specialists create personalized treatment plans tailored to every unique medical case." },
  { icon: HeartHandshake, title: "Compassionate Emotional Support", desc: "We guide you with compassionate support from start to a successful pregnancy confirmation." },
]

export function WhyUs() {
  return (
    <section className="relative py-24 overflow-hidden gradient-brand-band">
      {/* Floating decorative blobs */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full bg-white/15 blur-3xl animate-float-slow" />
      <div className="pointer-events-none absolute -bottom-32 -right-20 h-96 w-96 rounded-full bg-white/10 blur-3xl animate-float-slower" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <p className="reveal text-white/90 uppercase tracking-wider text-xs font-semibold mb-3">
          ✦ Why Choose Us
        </p>
        <h2 className="reveal text-3xl sm:text-4xl font-extrabold text-white text-balance mb-14">
          Why Families Trust Us
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((it, i) => {
            const Icon = it.icon
            return (
              <div
                key={it.title}
                className="reveal card-hover bg-white/95 backdrop-blur rounded-2xl p-6 text-left shadow-[0_15px_40px_-20px_rgba(0,0,0,0.25)]"
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                <div className="h-14 w-14 rounded-xl gradient-brand grid place-items-center text-white mb-4 shadow-md">
                  <Icon className="h-7 w-7" strokeWidth={1.8} />
                </div>
                <h3 className="font-bold text-lg text-[#1A1535] mb-2">{it.title}</h3>
                <p className="text-sm text-[#6B6B8A] leading-relaxed">{it.desc}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
