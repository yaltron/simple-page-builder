import { motion } from "framer-motion"
import { Link } from "@tanstack/react-router"
import { ArrowRight } from "lucide-react"

const STAGES = [
  {
    n: "01",
    icon: "🩸",
    title: "Irregular Menstrual Cycles",
    desc: "If you have irregular or absent menstrual cycles, it may indicate an underlying fertility issue that needs attention.",
  },
  {
    n: "02",
    icon: "🤰",
    title: "Having Trouble Conceiving",
    desc: "If you have been trying to conceive for over a year without success, it may be time to seek specialist help.",
  },
  {
    n: "03",
    icon: "⏳",
    title: "Age-Related Concerns",
    desc: "If you are over 35 and have been trying to conceive for six months or more, consulting a specialist is strongly advisable.",
  },
  {
    n: "04",
    icon: "💙",
    title: "Previous Pregnancy Loss",
    desc: "If you have experienced recurrent miscarriages or pregnancy loss, our specialists can help identify the cause and guide your next steps.",
  },
  {
    n: "05",
    icon: "👨‍👩‍👧",
    title: "Family History of Infertility",
    desc: "If you have a family history of infertility or reproductive issues, early consultation can significantly improve your outcomes.",
  },
]

function StageCard({ stage, index }: { stage: typeof STAGES[number]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.55, delay: index * 0.1, ease: "easeOut" }}
      className="group relative bg-white overflow-hidden"
      style={{
        borderRadius: 20,
        padding: "32px 28px",
        border: "1px solid rgba(230,0,126,0.10)",
        boxShadow: "0 4px 24px rgba(0,0,0,0.05)",
        transition: "all 0.35s cubic-bezier(0.34,1.56,0.64,1)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-10px)"
        e.currentTarget.style.boxShadow = "0 20px 60px rgba(230,0,126,0.13)"
        e.currentTarget.style.borderColor = "rgba(230,0,126,0.30)"
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)"
        e.currentTarget.style.boxShadow = "0 4px 24px rgba(0,0,0,0.05)"
        e.currentTarget.style.borderColor = "rgba(230,0,126,0.10)"
      }}
    >
      {/* Decorative corner accent */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: 80,
          height: 80,
          background: "linear-gradient(225deg, rgba(230,0,126,0.08), transparent)",
          borderRadius: "0 20px 0 80px",
          pointerEvents: "none",
        }}
      />

      {/* Step number badge */}
      <div
        style={{
          position: "absolute",
          top: 20,
          right: 20,
          width: 32,
          height: 32,
          borderRadius: "50%",
          background: "#FFF1F7",
          border: "1.5px solid rgba(230,0,126,0.25)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 12,
          fontWeight: 700,
          color: "#E6007E",
        }}
      >
        {stage.n}
      </div>

      {/* Icon circle */}
      <div
        className="stage-icon-circle"
        style={{
          width: 72,
          height: 72,
          borderRadius: "50%",
          background: "linear-gradient(135deg, #FFF1F7, #fcd4e8)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 22,
          fontSize: 32,
          transition: "background 0.3s ease",
        }}
      >
        <span style={{ lineHeight: 1 }}>{stage.icon}</span>
      </div>

      <h3
        className="stage-title"
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 18,
          fontWeight: 700,
          color: "#2D0A1E",
          marginBottom: 12,
          transition: "color 0.3s ease",
        }}
      >
        {stage.title}
      </h3>

      <p style={{ fontSize: 14, color: "#7A2050", lineHeight: 1.7, margin: 0 }}>
        {stage.desc}
      </p>

      <Link
        to="/contact"
        className="stage-learn-more"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          color: "#E6007E",
          fontSize: 13,
          fontWeight: 700,
          marginTop: 18,
          textDecoration: "none",
          opacity: 0,
          transition: "all 0.3s ease",
        }}
      >
        Book Consultation <ArrowRight className="w-4 h-4" />
      </Link>

      <style>{`
        .group:hover .stage-icon-circle {
          background: linear-gradient(135deg, #E6007E, #B5005F) !important;
        }
        .group:hover .stage-icon-circle > span {
          filter: brightness(10);
        }
        .group:hover .stage-title {
          color: #C2185B !important;
        }
        .group:hover .stage-learn-more {
          opacity: 1 !important;
          gap: 10px !important;
        }
      `}</style>
    </motion.div>
  )
}

export function FertilityStages() {
  return (
    <section
      style={{
        background: "linear-gradient(135deg, #FFF1F7 0%, #ffffff 50%, #EAF7FD 100%)",
        padding: "80px 8%",
      }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="text-center"
          style={{ marginBottom: 52 }}
        >
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700,
              color: "#C2185B",
              fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
              marginBottom: 12,
              lineHeight: 1.2,
            }}
          >
            Which Stage of Fertility Are You In?
          </h2>
          <p style={{ color: "#7A2050", fontSize: 15, textAlign: "center", margin: 0 }}>
            Understanding your stage helps us design the right treatment plan for you.
          </p>
        </motion.div>

        {/* Row 1: 3 cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {STAGES.slice(0, 3).map((s, i) => (
            <StageCard key={s.n} stage={s} index={i} />
          ))}
        </div>

        {/* Row 2: 2 cards centered */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 mx-auto" style={{ maxWidth: "66.6667%" }}>
          {STAGES.slice(3).map((s, i) => (
            <StageCard key={s.n} stage={s} index={i + 3} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center" style={{ marginTop: 44 }}>
          <p style={{ color: "#7A2050", fontSize: 15, marginBottom: 16 }}>
            Not sure which stage you are in?
          </p>
          <Link
            to="/contact"
            style={{
              display: "inline-block",
              background: "linear-gradient(135deg, #E6007E, #B5005F)",
              color: "white",
              padding: "14px 36px",
              borderRadius: 50,
              fontWeight: 700,
              fontSize: 15,
              textDecoration: "none",
              boxShadow: "0 8px 24px rgba(230,0,126,0.3)",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)"
              e.currentTarget.style.boxShadow = "0 12px 32px rgba(230,0,126,0.4)"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)"
              e.currentTarget.style.boxShadow = "0 8px 24px rgba(230,0,126,0.3)"
            }}
          >
            Get a Free Assessment →
          </Link>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          section .mt-6.grid {
            max-width: 100% !important;
          }
        }
      `}</style>
    </section>
  )
}
