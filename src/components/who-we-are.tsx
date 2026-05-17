import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { ArrowRight, Sparkles, Heart, Users, Award } from "lucide-react"
import { Link } from "@tanstack/react-router"
import { MorphingBlob } from "@/components/morphing-blob"
import { useHomepageSection } from "@/lib/use-cms-content"
import whoClinic from "@/assets/who-clinic.jpg"
import whoLab from "@/assets/who-lab.jpg"
import whoTeam from "@/assets/who-team.jpg"

const DEFAULTS = {
  heading: "Inside Shubhashree IVF",
  heading_color: "#E6007E",
  quote: "Moments of hope, science, and smiles — captured inside our clinic.",
  paragraph_1: "Every journey begins with hope.",
  paragraph_2: "Where science meets compassion — helping families grow with care.",
  images: [
    { url: "", alt: "Our modern clinic" },
    { url: "", alt: "Advanced laboratory" },
    { url: "", alt: "Our caring team" },
  ],
}

const stats = [
  { icon: Heart, value: "5,000+", label: "Happy Families" },
  { icon: Users, value: "12+", label: "Years of Care" },
  { icon: Award, value: "70%", label: "Success Rate" },
]

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
})

export function WhoWeAre() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const cms = useHomepageSection("who_we_are", DEFAULTS)
  const img1 = cms.images?.[0]?.url || whoClinic
  const img2 = cms.images?.[1]?.url || whoLab
  const img3 = cms.images?.[2]?.url || whoTeam
  const alt1 = cms.images?.[0]?.alt || "Our modern clinic"
  const alt2 = cms.images?.[1]?.alt || "Advanced embryology lab"
  const alt3 = cms.images?.[2]?.alt || "Our caring team"

  return (
    <section
      id="about"
      ref={ref}
      className="relative py-20 lg:py-32 overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #fff7fb 0%, #fdf4ff 35%, #fff5ee 100%)",
      }}
    >
      {/* Floating decorative blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <MorphingBlob color="#E6007E" size={520} opacity={0.07} duration={30} driftX={-40} driftY={30} style={{ top: "-160px", right: "-180px" }} />
        <MorphingBlob color="#A78BFA" size={460} opacity={0.09} duration={36} delay={-12} driftX={50} driftY={-40} style={{ bottom: "-160px", left: "-140px" }} />
        <MorphingBlob color="#FDBA74" size={380} opacity={0.06} duration={42} delay={-20} driftX={-30} driftY={50} style={{ top: "45%", left: "35%" }} />
      </div>

      {/* Soft particles */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full"
            style={{
              background: i % 2 ? "#E6007E" : "#A78BFA",
              opacity: 0.35,
              top: `${15 + i * 13}%`,
              left: `${10 + i * 14}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{ duration: 4 + i, repeat: Infinity, delay: i * 0.4 }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div {...fade(0)} className="max-w-2xl mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/70 backdrop-blur-sm border border-pink-100 mb-5">
            <Sparkles className="w-3.5 h-3.5" style={{ color: cms.heading_color }} />
            <span className="text-xs font-medium tracking-wide uppercase" style={{ color: cms.heading_color }}>
              Our World
            </span>
          </div>
          <h2
            className="font-serif text-4xl lg:text-5xl font-bold leading-tight mb-4"
            style={{
              backgroundImage: "linear-gradient(135deg, #E6007E 0%, #C2006A 40%, #A78BFA 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {cms.heading}
          </h2>
          <p className="font-serif italic text-lg lg:text-xl text-muted-foreground leading-relaxed">
            &ldquo;{cms.quote}&rdquo;
          </p>
        </motion.div>

        {/* Asymmetric gallery grid */}
        <div className="grid grid-cols-12 auto-rows-[120px] gap-4 lg:gap-5">
          {/* Featured large image */}
          <motion.div
            {...fade(0.05)}
            whileHover={{ y: -4 }}
            className="col-span-12 md:col-span-7 row-span-4 relative rounded-[28px] overflow-hidden shadow-xl group cursor-pointer"
          >
            <img src={img1} alt={alt1} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <div className="text-xs uppercase tracking-widest opacity-80 mb-1">Featured</div>
              <div className="font-serif text-2xl lg:text-3xl font-semibold">A space designed for hope</div>
            </div>
            <div className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <ArrowRight className="w-4 h-4 text-white" />
            </div>
          </motion.div>

          {/* Quote card */}
          <motion.div
            {...fade(0.1)}
            className="col-span-6 md:col-span-5 row-span-2 relative rounded-[28px] p-6 lg:p-8 overflow-hidden"
            style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.9), rgba(253,244,255,0.85))",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(230,0,126,0.12)",
              boxShadow: "0 10px 40px -20px rgba(230,0,126,0.25)",
            }}
          >
            <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full" style={{ background: "radial-gradient(circle, rgba(230,0,126,0.15), transparent)" }} />
            <Heart className="w-6 h-6 mb-3" style={{ color: "#E6007E" }} />
            <p className="font-serif text-lg lg:text-xl italic leading-snug text-plum">
              &ldquo;{cms.paragraph_1}&rdquo;
            </p>
            <div className="mt-4 text-xs uppercase tracking-widest text-muted-foreground">— Our promise</div>
          </motion.div>

          {/* Portrait lab image */}
          <motion.div
            {...fade(0.15)}
            whileHover={{ y: -4 }}
            className="col-span-6 md:col-span-2 row-span-2 relative rounded-[28px] overflow-hidden shadow-lg group cursor-pointer"
          >
            <img src={img2} alt={alt2} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 to-transparent" />
            <div className="absolute bottom-3 left-3 right-3 text-white text-xs font-medium">Embryology Lab</div>
          </motion.div>

          {/* Stats card */}
          <motion.div
            {...fade(0.2)}
            className="col-span-12 md:col-span-3 row-span-2 relative rounded-[28px] p-5 lg:p-6 overflow-hidden"
            style={{
              background: "linear-gradient(160deg, #E6007E 0%, #C2006A 60%, #A78BFA 100%)",
              boxShadow: "0 15px 40px -15px rgba(230,0,126,0.45)",
            }}
          >
            <div className="absolute inset-0 opacity-20" style={{ background: "radial-gradient(circle at 30% 20%, white, transparent 60%)" }} />
            <div className="relative h-full flex flex-col justify-between text-white">
              <div className="text-xs uppercase tracking-widest opacity-80">By the numbers</div>
              <div className="space-y-2">
                {stats.map((s) => (
                  <div key={s.label} className="flex items-baseline gap-2">
                    <s.icon className="w-3.5 h-3.5 opacity-80" />
                    <span className="font-serif text-xl lg:text-2xl font-bold">{s.value}</span>
                    <span className="text-[11px] opacity-85">{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Team image */}
          <motion.div
            {...fade(0.25)}
            whileHover={{ y: -4 }}
            className="col-span-12 md:col-span-6 row-span-3 relative rounded-[28px] overflow-hidden shadow-xl group cursor-pointer"
          >
            <img src={img3} alt={alt3} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-br from-pink-900/40 via-transparent to-purple-900/30" />
            <div className="absolute bottom-5 left-5 right-5">
              <div className="inline-block px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[11px] font-semibold uppercase tracking-wider" style={{ color: "#E6007E" }}>
                Our Specialists
              </div>
              <div className="mt-2 font-serif text-xl text-white font-semibold">Compassion in every step</div>
            </div>
          </motion.div>

          {/* Closing CTA card */}
          <motion.div
            {...fade(0.3)}
            className="col-span-12 md:col-span-6 row-span-3 relative rounded-[28px] p-6 lg:p-8 overflow-hidden flex flex-col justify-between"
            style={{
              background: "linear-gradient(135deg, #fff5f9 0%, #fef3ec 100%)",
              border: "1px solid rgba(230,0,126,0.12)",
              boxShadow: "0 10px 40px -20px rgba(167,139,250,0.3)",
            }}
          >
            <div className="absolute -bottom-12 -right-12 w-48 h-48 rounded-full" style={{ background: "radial-gradient(circle, rgba(167,139,250,0.18), transparent)" }} />
            <div className="relative">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-pink-100 mb-4">
                <Sparkles className="w-3 h-3" style={{ color: "#E6007E" }} />
                <span className="text-[11px] uppercase tracking-widest font-medium" style={{ color: "#E6007E" }}>Why us</span>
              </div>
              <p className="font-serif text-2xl lg:text-3xl leading-snug text-plum font-medium">
                {cms.paragraph_2}
              </p>
            </div>
            <div className="relative flex items-center justify-between mt-6">
              <div className="flex -space-x-2">
                {[img3, img1, img2].map((src, i) => (
                  <div key={i} className="w-9 h-9 rounded-full border-2 border-white overflow-hidden shadow-sm">
                    <img src={src} alt="" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-sm font-medium group transition-transform hover:scale-105"
                style={{ background: "linear-gradient(135deg, #E6007E, #C2006A)" }}
              >
                Discover More
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
