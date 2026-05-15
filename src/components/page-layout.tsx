import type { ReactNode } from "react"
import { ClientOnly, Link } from "@tanstack/react-router"
import { motion } from "framer-motion"
import { Phone } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useReveal } from "@/hooks/use-reveal"

export const BRAND = {
  pink: "#E6007E",
  pinkDark: "#B5005F",
  heading: "#C2185B",
  pinkSoft: "#FFF1F7",
  blueSoft: "#EAF7FD",
  plum: "#2D0A1E",
  navLink: "#7A2050",
  border: "#F2DCE8",
}

export function PageHero({ title, breadcrumb }: { title: string; breadcrumb: string }) {
  return (
    <section
      style={{
        height: 220,
        background:
          "linear-gradient(135deg, #FFE4EF 0%, #FFF5F9 50%, #EAF7FD 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "0 5%",
      }}
    >
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          fontFamily: "'Playfair Display', serif",
          color: BRAND.heading,
          fontSize: "clamp(32px, 5vw, 52px)",
          fontWeight: 700,
          margin: 0,
        }}
      >
        {title}
      </motion.h1>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        style={{ color: BRAND.navLink, marginTop: 12, fontSize: 14, fontWeight: 500 }}
      >
        <Link to="/" style={{ color: BRAND.navLink }}>
          Home
        </Link>{" "}
        <span style={{ margin: "0 8px", opacity: 0.6 }}>›</span>
        <span style={{ color: BRAND.pink }}>{breadcrumb}</span>
      </motion.div>
    </section>
  )
}

export function PageCTABanner({
  title = "Ready to Start Your Journey?",
  subtitle = "Take the first step towards parenthood. Our compassionate team is here for you.",
  secondary,
}: {
  title?: string
  subtitle?: string
  secondary?: string
}) {
  return (
    <section
      style={{
        padding: "60px 8%",
        background: `linear-gradient(135deg, ${BRAND.pink} 0%, ${BRAND.pinkDark} 100%)`,
        color: "white",
        textAlign: "center",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
      >
        <h2
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(28px, 4vw, 42px)",
            fontWeight: 700,
            marginBottom: 14,
          }}
        >
          {title}
        </h2>
        <p style={{ opacity: 0.92, maxWidth: 620, margin: "0 auto 28px", fontSize: 16 }}>
          {subtitle}
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/contact"
            className="px-7 py-3 rounded-full font-bold transition-transform hover:scale-105"
            style={{ background: "white", color: BRAND.pink }}
          >
            Book Consultation
          </Link>
          <a
            href="tel:+9779861141699"
            className="px-7 py-3 rounded-full font-bold border-2 border-white text-white transition-colors hover:bg-white/10 inline-flex items-center gap-2"
          >
            <Phone className="w-4 h-4" /> Call: +977 9861141699
          </a>
        </div>
        {secondary && (
          <p style={{ marginTop: 18, opacity: 0.88, fontSize: 14 }}>{secondary}</p>
        )}
      </motion.div>
    </section>
  )
}

export function PageLayout({
  title,
  breadcrumb,
  children,
}: {
  title: string
  breadcrumb: string
  children: ReactNode
}) {
  useReveal()
  return (
    <ClientOnly fallback={<main className="min-h-screen bg-background" aria-busy="true" />}>
      <main>
        <Navbar />
        <PageHero title={title} breadcrumb={breadcrumb} />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {children}
        </motion.div>
        <Footer />
      </main>
    </ClientOnly>
  )
}

/* Shared visual primitives */

export function SectionHeading({ children, align = "center" }: { children: ReactNode; align?: "center" | "left" }) {
  return (
    <h2
      style={{
        fontFamily: "'Playfair Display', serif",
        color: BRAND.heading,
        fontSize: "clamp(26px, 3.5vw, 38px)",
        fontWeight: 700,
        textAlign: align,
        marginBottom: 36,
      }}
    >
      {children}
    </h2>
  )
}

export function Section({
  children,
  bg = "white",
  id,
}: {
  children: ReactNode
  bg?: string
  id?: string
}) {
  return (
    <section id={id} style={{ background: bg, padding: "60px 5%" }}>
      <div className="max-w-7xl mx-auto">{children}</div>
    </section>
  )
}
