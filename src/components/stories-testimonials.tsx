import { Star, Quote } from "lucide-react"
import testimonialImg from "@/assets/testimonial-family.jpg"

const items = [
  { name: "Victoria Mukrjul", text: "After a long journey filled with doubts, this clinic gave us renewed hope and direction. Their dedication, expertise, and warmth made every consultation reassuring — we finally welcomed our little one." },
  { name: "Aarav & Meera", text: "We walked in with worries, but they guided us with patience and care. Today the joy in our home is beyond words." },
  { name: "Pooja Kumar", text: "The personalized treatment plan made all the difference. We are truly grateful for this beautiful chapter in our lives." },
]

export function StoriesTestimonials() {
  return (
    <section id="testimonials" className="py-24 bg-pink-soft overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: heading + image */}
          <div>
            <p className="reveal text-brand-pink uppercase tracking-wider text-xs font-semibold mb-3">
              ✦ Testimonials
            </p>
            <h2 className="reveal text-3xl sm:text-4xl font-extrabold text-[#1A1535] text-balance mb-8">
              Stories of Hope & <span className="text-brand-pink">Happiness</span>
            </h2>
            <div className="reveal relative rounded-3xl overflow-hidden shadow-[0_30px_60px_-30px_rgba(230,0,126,0.45)]">
              <img
                src={testimonialImg}
                alt="Happy family with their newborn baby"
                width={1024}
                height={1024}
                loading="lazy"
                className="w-full h-auto object-cover"
              />
              <div className="pointer-events-none absolute -bottom-10 -right-10 h-40 w-40 rounded-full gradient-brand opacity-20 blur-2xl" />
            </div>
          </div>

          {/* Right: testimonial cards */}
          <div className="flex flex-col gap-6">
            {items.map((t, i) => (
              <div
                key={t.name}
                className="reveal card-hover relative bg-white rounded-2xl p-6 sm:p-7 border border-[#F2DCE8] shadow-[0_10px_30px_-15px_rgba(230,0,126,0.2)]"
                style={{ transitionDelay: `${i * 140}ms` }}
              >
                <Quote className="absolute top-4 right-4 h-8 w-8 text-brand-pink/20" />
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-brand-pink text-brand-pink" style={{ color: "oklch(0.62 0.27 357)" }} />
                  ))}
                </div>
                <p className="text-[#1A1535]/90 leading-relaxed mb-3">{t.text}</p>
                <p className="text-sm font-semibold text-brand-pink">— {t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
