import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Calendar,
  Phone,
  ChevronDown,
  Menu,
  X,
  Copy,
  Check,
  Hospital,
  Video,
  Facebook,
  Instagram,
  Youtube,
} from "lucide-react"
import logo from "@/assets/logo.png"

const COLORS = {
  pink: "#E6007E",
  pinkDark: "#C4006A",
  blue: "#1BA0DC",
  pinkSoft: "#FFF1F7",
  blueSoft: "#EAF7FD",
  textDark: "#2D0A1E",
  textMid: "#7A2050",
  white: "#FFFFFF",
}

const navLinks = [
  { name: "About Us", href: "#about" },
  { name: "Services", href: "#services", hasMega: true },
  { name: "Our Team", href: "#team" },
  { name: "Success Stories", href: "#stories" },
  { name: "Blog & News", href: "#blog" },
  { name: "International Patient", href: "#international" },
  { name: "Clinic", href: "#clinic" },
  { name: "Contact Us", href: "#contact" },
]

const services = [
  { icon: "🧬", name: "IVF", desc: "Advanced In-Vitro Fertilization", bg: "#FFF1F7" },
  { icon: "🔬", name: "ICSI", desc: "Intracytoplasmic Sperm Injection", bg: "#EAF7FD" },
  { icon: "❄️", name: "Embryo Freezing", desc: "Cryopreservation services", bg: "#FFF1F7" },
  { icon: "🧪", name: "Genetic Testing (PGT)", desc: "Pre-implantation testing", bg: "#EAF7FD" },
  { icon: "🥚", name: "Donor Egg Programme", desc: "Trusted donor matching", bg: "#FFF1F7" },
  { icon: "👨", name: "Male Infertility", desc: "Comprehensive male care", bg: "#EAF7FD" },
  { icon: "🌱", name: "Fertility Preservation", desc: "Plan for the future", bg: "#FFF1F7" },
  { icon: "🩺", name: "Laparoscopy", desc: "Minimally invasive surgery", bg: "#EAF7FD" },
  { icon: "💊", name: "Hormonal Therapy", desc: "Personalized treatments", bg: "#FFF1F7" },
]

const phones = [
  { label: "Reception", number: "+977-01-4567890" },
  { label: "Emergency", number: "+977-9800-123456" },
  { label: "WhatsApp", number: "+977-9800-654321" },
]

function LotusFallback() {
  return (
    <div className="flex items-center gap-2">
      <svg viewBox="0 0 100 100" className="w-9 h-9" fill={COLORS.pink}>
        <path d="M50 15c-5 10-5 25 0 35 5-10 5-25 0-35z" />
        <path d="M35 25c0 15 10 30 15 35-10-5-20-20-15-35z" />
        <path d="M65 25c0 15-10 30-15 35 10-5 20-20 15-35z" />
        <path d="M20 40c5 12 20 22 30 25-12 0-28-10-30-25z" />
        <path d="M80 40c-5 12-20 22-30 25 12 0 28-10 30-25z" />
      </svg>
      <span className="font-bold text-lg" style={{ color: COLORS.pink }}>
        Subhashree IVF
      </span>
    </div>
  )
}

function Logo({ collapsed }: { collapsed: boolean }) {
  const [errored, setErrored] = useState(false)
  return (
    <motion.div
      animate={{ scale: collapsed ? 0.85 : 1 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="origin-left flex items-center"
    >
      {errored ? (
        <LotusFallback />
      ) : (
        <img
          src={logo}
          alt="Subhashree IVF & Fertility Centre"
          onError={() => setErrored(true)}
          style={{ width: 160, height: "auto" }}
        />
      )}
    </motion.div>
  )
}

function BookDropdown({ open, onClose }: { open: boolean; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!open) return
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose()
    }
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose()
    document.addEventListener("mousedown", onDoc)
    document.addEventListener("keydown", onKey)
    return () => {
      document.removeEventListener("mousedown", onDoc)
      document.removeEventListener("keydown", onKey)
    }
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="absolute right-0 top-full mt-2 w-[360px] rounded-[20px] overflow-hidden bg-white z-[1100]"
          style={{
            borderTop: `3px solid ${COLORS.pink}`,
            boxShadow: "0 16px 60px rgba(230,0,126,0.15)",
          }}
        >
          <div className="p-5">
            <h3
              className="text-[18px] font-bold"
              style={{ color: COLORS.textDark, fontFamily: "Playfair Display, serif" }}
            >
              Book a Consultation
            </h3>
            <p className="text-sm mt-1" style={{ color: COLORS.textMid }}>
              Free first consultation — no obligation
            </p>
            <div className="grid grid-cols-2 gap-3 mt-4">
              {[
                { icon: <Hospital className="w-5 h-5" style={{ color: COLORS.pink }} />, title: "Visit In-Clinic", bg: COLORS.pinkSoft },
                { icon: <Video className="w-5 h-5" style={{ color: COLORS.blue }} />, title: "Video Consult", bg: COLORS.blueSoft },
              ].map((c) => (
                <button
                  key={c.title}
                  className="text-left rounded-xl p-3 transition hover:scale-[1.02] focus:outline-none focus:ring-2"
                  style={{ background: c.bg, ['--tw-ring-color' as never]: COLORS.pink }}
                >
                  {c.icon}
                  <div className="font-bold mt-2 text-sm" style={{ color: COLORS.textDark }}>
                    {c.title}
                  </div>
                  <span className="inline-block mt-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-green-100 text-green-700">
                    Available Today
                  </span>
                </button>
              ))}
            </div>
            <div className="mt-4 space-y-2">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-2.5 rounded-full border-[1.5px] border-gray-200 text-sm outline-none transition"
                onFocus={(e) => (e.currentTarget.style.borderColor = COLORS.pink)}
                onBlur={(e) => (e.currentTarget.style.borderColor = "#e5e7eb")}
              />
              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full px-4 py-2.5 rounded-full border-[1.5px] border-gray-200 text-sm outline-none transition"
                onFocus={(e) => (e.currentTarget.style.borderColor = COLORS.pink)}
                onBlur={(e) => (e.currentTarget.style.borderColor = "#e5e7eb")}
              />
            </div>
            <button
              className="w-full mt-3 py-3 rounded-full text-white font-bold text-sm transition hover:scale-[1.02]"
              style={{
                background: `linear-gradient(135deg, ${COLORS.pink}, ${COLORS.pinkDark})`,
                boxShadow: "0 8px 24px -8px rgba(230,0,126,0.55)",
              }}
            >
              Confirm Appointment →
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function CallPopover({ open, onClose }: { open: boolean; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null)
  const [copied, setCopied] = useState<string | null>(null)
  useEffect(() => {
    if (!open) return
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose()
    }
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose()
    document.addEventListener("mousedown", onDoc)
    document.addEventListener("keydown", onKey)
    return () => {
      document.removeEventListener("mousedown", onDoc)
      document.removeEventListener("keydown", onKey)
    }
  }, [open, onClose])

  const copy = (n: string) => {
    navigator.clipboard?.writeText(n)
    setCopied(n)
    setTimeout(() => setCopied(null), 1500)
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
          className="absolute right-0 top-full mt-2 w-[280px] rounded-2xl bg-white z-[1100] p-3"
          style={{
            borderTop: `3px solid ${COLORS.textDark}`,
            boxShadow: "0 16px 60px rgba(45,10,30,0.18)",
          }}
        >
          {phones.map((p) => (
            <div
              key={p.label}
              className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50"
            >
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-wide" style={{ color: COLORS.textMid }}>
                  {p.label}
                </div>
                <a href={`tel:${p.number}`} className="text-sm font-bold" style={{ color: COLORS.textDark }}>
                  {p.number}
                </a>
              </div>
              <button
                onClick={() => copy(p.number)}
                className="p-2 rounded-full hover:bg-pink-50 transition"
                aria-label={`Copy ${p.label} number`}
              >
                {copied === p.number ? (
                  <Check className="w-4 h-4 text-green-600" />
                ) : (
                  <Copy className="w-4 h-4" style={{ color: COLORS.pink }} />
                )}
              </button>
            </div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function ServicesMega({ open, onEnter, onLeave }: { open: boolean; onEnter: () => void; onLeave: () => void }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          onMouseEnter={onEnter}
          onMouseLeave={onLeave}
          className="absolute left-0 right-0 top-full bg-white z-[1050] shadow-2xl"
          style={{ boxShadow: "0 20px 60px rgba(230,0,126,0.12)" }}
        >
          <div className="max-w-7xl mx-auto flex">
            <div className="w-[240px] p-6" style={{ background: COLORS.pinkSoft }}>
              <h4 className="font-bold text-lg mb-4" style={{ color: COLORS.textDark, fontFamily: "Playfair Display, serif" }}>
                Our Specialities
              </h4>
              <ul className="space-y-2.5">
                {["Fertility", "IVF & ICSI", "Genetics", "Surgery", "Wellness"].map((c) => (
                  <li key={c} className="flex items-center gap-2 text-sm font-semibold" style={{ color: COLORS.textMid }}>
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: COLORS.pink }} />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex-1 p-6">
              <div className="grid grid-cols-3 gap-3">
                {services.map((s) => (
                  <a
                    key={s.name}
                    href="#services"
                    className="rounded-xl p-3 transition hover:scale-[1.02] hover:shadow-md"
                    style={{ background: s.bg }}
                  >
                    <div className="text-2xl mb-1">{s.icon}</div>
                    <div className="font-bold text-sm" style={{ color: COLORS.textDark }}>
                      {s.name}
                    </div>
                    <div className="text-xs mt-0.5" style={{ color: COLORS.textMid }}>
                      {s.desc}
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
          <a
            href="#book"
            className="block py-3 text-center font-semibold text-sm transition hover:opacity-80"
            style={{ background: COLORS.pinkSoft, color: COLORS.pink }}
          >
            🌟 Not sure where to start? Book a Free Consultation →
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export function StickyNavbar() {
  const [scrolled, setScrolled] = useState(false)
  const [bookOpen, setBookOpen] = useState(false)
  const [callOpen, setCallOpen] = useState(false)
  const [megaOpen, setMegaOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [active, setActive] = useState("About Us")
  const megaTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const openMega = () => {
    if (megaTimer.current) clearTimeout(megaTimer.current)
    setMegaOpen(true)
  }
  const closeMega = () => {
    megaTimer.current = setTimeout(() => setMegaOpen(false), 100)
  }

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-[1000] transition-all duration-[350ms] ease-out"
        style={{
          background: scrolled ? "rgba(255,255,255,0.92)" : COLORS.white,
          backdropFilter: scrolled ? "blur(16px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(16px)" : "none",
          boxShadow: scrolled ? "0 4px 24px rgba(230,0,126,0.10)" : "none",
        }}
      >
        {/* ROW 1 */}
        <div
          className="transition-all duration-[350ms] ease-out"
          style={{ height: scrolled ? 56 : 72 }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
            <Logo collapsed={scrolled} />

            {/* Desktop CTAs */}
            <div className="hidden md:flex items-center gap-3">
              <div className="relative">
                <button
                  onClick={() => {
                    setBookOpen((v) => !v)
                    setCallOpen(false)
                  }}
                  className="flex items-center gap-2 px-5 h-12 rounded-full text-white font-bold text-sm transition-all hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-2"
                  style={{
                    background: bookOpen ? COLORS.pinkDark : COLORS.pink,
                    ['--tw-ring-color' as never]: COLORS.pink,
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = COLORS.pinkDark)}
                  onMouseLeave={(e) => (e.currentTarget.style.background = bookOpen ? COLORS.pinkDark : COLORS.pink)}
                  aria-haspopup="true"
                  aria-expanded={bookOpen}
                >
                  <Calendar className="w-4 h-4" />
                  Book Appointment
                  <ChevronDown className={`w-4 h-4 transition-transform ${bookOpen ? "rotate-180" : ""}`} />
                </button>
                <BookDropdown open={bookOpen} onClose={() => setBookOpen(false)} />
              </div>

              <div className="relative">
                <button
                  onClick={() => {
                    setCallOpen((v) => !v)
                    setBookOpen(false)
                  }}
                  className="flex items-center gap-2 px-5 h-12 rounded-full text-white font-bold text-sm transition-all hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-2"
                  style={{
                    background: callOpen ? COLORS.pink : COLORS.textDark,
                    ['--tw-ring-color' as never]: COLORS.pink,
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = COLORS.pink)}
                  onMouseLeave={(e) => (e.currentTarget.style.background = callOpen ? COLORS.pink : COLORS.textDark)}
                >
                  <Phone className="w-4 h-4" />
                  Call Us
                </button>
                <CallPopover open={callOpen} onClose={() => setCallOpen(false)} />
              </div>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden p-2"
              style={{ color: COLORS.pink }}
              aria-label="Open menu"
            >
              <Menu className="w-7 h-7" />
            </button>
          </div>
        </div>

        {/* ROW 2 */}
        <div
          className="hidden md:block relative transition-all duration-[350ms] ease-out"
          style={{
            height: scrolled ? 46 : 52,
            background: scrolled ? "rgba(255,241,247,0.7)" : COLORS.pinkSoft,
          }}
        >
          <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-center">
            <ul className="flex items-center gap-1">
              {navLinks.map((link, i) => (
                <li key={link.name} className="flex items-center">
                  <div
                    className="relative"
                    onMouseEnter={() => link.hasMega && openMega()}
                    onMouseLeave={() => link.hasMega && closeMega()}
                  >
                    <a
                      href={link.href}
                      onClick={() => setActive(link.name)}
                      className="relative inline-block px-3 py-2 text-[15px] font-semibold transition-colors group"
                      style={{
                        color: active === link.name ? COLORS.pink : COLORS.textMid,
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = COLORS.pink)}
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = active === link.name ? COLORS.pink : COLORS.textMid)
                      }
                    >
                      {link.name}
                      <span
                        className="absolute left-3 right-3 -bottom-0.5 h-[2px] origin-left transition-transform duration-300 group-hover:scale-x-100"
                        style={{
                          background: COLORS.pink,
                          transform: active === link.name ? "scaleX(1)" : "scaleX(0)",
                        }}
                      />
                    </a>
                  </div>
                  {i < navLinks.length - 1 && (
                    <span
                      className="mx-1"
                      style={{
                        height: 18,
                        width: 1,
                        background: "rgba(230,0,126,0.25)",
                        display: "inline-block",
                      }}
                    />
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Gradient bottom border */}
          <div
            className="absolute bottom-0 left-0 right-0"
            style={{
              height: 2,
              background: `linear-gradient(90deg, ${COLORS.pink}, ${COLORS.blue})`,
            }}
          />

          <ServicesMega open={megaOpen} onEnter={openMega} onLeave={closeMega} />
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-black/50 z-[1100] md:hidden"
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-white z-[1200] md:hidden flex flex-col"
            >
              <div className="flex items-center justify-between p-4 border-b">
                <Logo collapsed={false} />
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2"
                  style={{ color: COLORS.pink }}
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <nav className="flex-1 overflow-y-auto">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center h-[52px] px-5 border-b font-semibold text-[15px]"
                    style={{ color: COLORS.textMid, borderColor: "rgba(230,0,126,0.12)" }}
                  >
                    {link.name}
                  </a>
                ))}
              </nav>
              <div className="p-4 space-y-3 border-t">
                <button
                  className="w-full h-12 rounded-full text-white font-bold flex items-center justify-center gap-2"
                  style={{ background: COLORS.pink }}
                >
                  <Calendar className="w-4 h-4" /> Book Appointment
                </button>
                <a
                  href="tel:+97714567890"
                  className="w-full h-12 rounded-full font-bold flex items-center justify-center gap-2 border-2"
                  style={{ borderColor: COLORS.pink, color: COLORS.pink }}
                >
                  <Phone className="w-4 h-4" /> Call Us
                </a>
                <div className="flex items-center justify-center gap-4 pt-2">
                  {[Facebook, Instagram, Youtube].map((Icon, i) => (
                    <a
                      key={i}
                      href="#"
                      className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{ background: COLORS.pinkSoft, color: COLORS.pink }}
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
