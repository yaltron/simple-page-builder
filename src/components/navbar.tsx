import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Phone, Menu, X, Calendar, ChevronDown, Copy, Check, Hospital, Video } from "lucide-react"
import { Link } from "@tanstack/react-router"
import logo from "@/assets/logo.png"

const COLORS = {
  magenta: "#E6007E",
  magentaDark: "#C4006A",
  blue: "#1BA0DC",
  pinkSoft: "#FFF1F7",
  blueSoft: "#EAF7FD",
  plum: "#2D0A1E",
  navLink: "#7A2050",
}

const navLinks = [
  { name: "About Us", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Our Team", href: "#team" },
  { name: "Success Stories", href: "#testimonials" },
  { name: "Blog & News", href: "#blog" },
  { name: "International Patient", href: "#international" },
  { name: "Clinic", href: "#clinic" },
  { name: "Contact Us", href: "#contact" },
]

const phones = [
  { label: "Reception", number: "+977-01-1234567" },
  { label: "Emergency", number: "+977-9800-123456" },
  { label: "WhatsApp", number: "+977-9800-654321" },
]

function LotusIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="currentColor">
      <path d="M50 15c-5 10-5 25 0 35 5-10 5-25 0-35z" />
      <path d="M35 25c0 15 10 30 15 35-10-5-20-20-15-35z" />
      <path d="M65 25c0 15-10 30-15 35 10-5 20-20 15-35z" />
      <path d="M20 40c5 12 20 22 30 25-12 0-28-10-30-25z" />
      <path d="M80 40c-5 12-20 22-30 25 12 0 28-10 30-25z" />
      <path d="M50 65c-8 0-15 5-20 15 10-5 15-10 20-10s10 5 20 10c-5-10-12-15-20-15z" />
    </svg>
  )
}

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const [bookOpen, setBookOpen] = useState(false)
  const [callOpen, setCallOpen] = useState(false)
  const [logoFailed, setLogoFailed] = useState(false)
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null)

  const bookRef = useRef<HTMLDivElement>(null)
  const callRef = useRef<HTMLDivElement>(null)
  const bookBtnRef = useRef<HTMLButtonElement>(null)
  const callBtnRef = useRef<HTMLButtonElement>(null)
  const bookPanelRef = useRef<HTMLDivElement>(null)
  const callPanelRef = useRef<HTMLDivElement>(null)
  const [bookPos, setBookPos] = useState<{ top: number; right: number }>({ top: 0, right: 0 })
  const [callPos, setCallPos] = useState<{ top: number; right: number }>({ top: 0, right: 0 })

  useEffect(() => {
    const update = () => {
      if (bookOpen && bookBtnRef.current) {
        const r = bookBtnRef.current.getBoundingClientRect()
        setBookPos({ top: r.bottom + 8, right: window.innerWidth - r.right })
      }
      if (callOpen && callBtnRef.current) {
        const r = callBtnRef.current.getBoundingClientRect()
        setCallPos({ top: r.bottom + 8, right: window.innerWidth - r.right })
      }
    }
    update()
    window.addEventListener("scroll", update, true)
    window.addEventListener("resize", update)
    return () => {
      window.removeEventListener("scroll", update, true)
      window.removeEventListener("resize", update)
    }
  }, [bookOpen, callOpen])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60)
      const sections = navLinks.map(l => l.href.replace("#", ""))
      for (const s of [...sections].reverse()) {
        const el = document.getElementById(s)
        if (el && el.getBoundingClientRect().top <= 150) {
          setActiveSection(s)
          break
        }
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (bookOpen && bookRef.current && !bookRef.current.contains(e.target as Node)) setBookOpen(false)
      if (callOpen && callRef.current && !callRef.current.contains(e.target as Node)) setCallOpen(false)
    }
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setBookOpen(false); setCallOpen(false); setIsMobileOpen(false) }
    }
    document.addEventListener("mousedown", onClick)
    document.addEventListener("keydown", onEsc)
    return () => {
      document.removeEventListener("mousedown", onClick)
      document.removeEventListener("keydown", onEsc)
    }
  }, [bookOpen, callOpen])

  const copy = (txt: string, idx: number) => {
    navigator.clipboard?.writeText(txt)
    setCopiedIdx(idx)
    setTimeout(() => setCopiedIdx(null), 1500)
  }

  const row1Height = isScrolled ? 54 : 68
  const logoScale = isScrolled ? 0.88 : 1

  const Logo = (
    <Link to="/" className="flex items-center gap-2" style={{ transform: `scale(${logoScale})`, transformOrigin: "left center", transition: "transform 0.35s ease" }}>
      {!logoFailed ? (
        <img src={logo} alt="Subhashree IVF" style={{ width: 160, height: "auto" }} onError={() => setLogoFailed(true)} />
      ) : (
        <span className="flex items-center gap-2" style={{ color: COLORS.magenta }}>
          <LotusIcon className="w-8 h-8" />
          <span className="font-bold text-lg">Subhashree IVF</span>
        </span>
      )}
    </Link>
  )

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 w-full"
        style={{
          zIndex: 1000,
          isolation: "isolate",
          boxShadow: isScrolled ? "0 4px 24px rgba(230,0,126,0.10)" : "none",
          transition: "box-shadow 0.35s ease",
        }}
      >
        {/* ROW 1 */}
        <div
          style={{
            height: row1Height,
            background: isScrolled ? "rgba(255,241,247,0.85)" : COLORS.pinkSoft,
            backdropFilter: isScrolled ? "blur(16px)" : "none",
            WebkitBackdropFilter: isScrolled ? "blur(16px)" : "none",
            transition: "height 0.35s ease, background 0.35s ease",
          }}
        >
          <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
            {Logo}

            {/* Desktop CTAs */}
            <div className="hidden md:flex items-center gap-3">
              {/* Book */}
              <div className="relative" ref={bookRef}>
                <button
                  onClick={() => { setBookOpen(v => !v); setCallOpen(false) }}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full text-white font-bold text-sm transition-all"
                  style={{ background: COLORS.magenta }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = COLORS.magentaDark; (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)" }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = COLORS.magenta; (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)" }}
                >
                  <Calendar className="w-4 h-4" />
                  Book Appointment
                  <ChevronDown className={`w-4 h-4 transition-transform ${bookOpen ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {bookOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.25 }}
                      className="absolute right-0 mt-3 p-5"
                      style={{
                        width: 360,
                        background: "#fff",
                        borderRadius: 20,
                        borderTop: `3px solid ${COLORS.magenta}`,
                        boxShadow: "0 16px 60px rgba(230,0,126,0.15)",
                        zIndex: 9999,
                      }}
                    >
                      <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, color: COLORS.plum }} className="font-bold">
                        Book a Consultation
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">Free first consultation — no obligation</p>

                      <div className="grid grid-cols-2 gap-3 mt-4">
                        {[
                          { icon: <Hospital className="w-5 h-5" />, title: "Visit In-Clinic", bg: COLORS.pinkSoft },
                          { icon: <Video className="w-5 h-5" />, title: "Video Consult", bg: COLORS.blueSoft },
                        ].map((opt) => (
                          <button key={opt.title} className="text-left p-3 rounded-xl hover:scale-[1.02] transition-transform" style={{ background: opt.bg }}>
                            <div style={{ color: COLORS.magenta }}>{opt.icon}</div>
                            <div className="font-semibold text-sm mt-2" style={{ color: COLORS.plum }}>{opt.title}</div>
                            <div className="inline-block mt-2 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-green-100 text-green-700">Available Today</div>
                          </button>
                        ))}
                      </div>

                      <div className="mt-4 space-y-2">
                        <input type="text" placeholder="Your Name" className="w-full px-4 py-2.5 text-sm rounded-lg border border-gray-200 outline-none transition-colors" style={{ borderColor: undefined }} onFocus={e => (e.currentTarget.style.borderColor = COLORS.magenta)} onBlur={e => (e.currentTarget.style.borderColor = "#e5e7eb")} />
                        <input type="tel" placeholder="Phone Number" className="w-full px-4 py-2.5 text-sm rounded-lg border border-gray-200 outline-none" onFocus={e => (e.currentTarget.style.borderColor = COLORS.magenta)} onBlur={e => (e.currentTarget.style.borderColor = "#e5e7eb")} />
                      </div>

                      <button
                        className="w-full mt-4 py-3 text-white font-bold text-sm transition-transform hover:scale-[1.02]"
                        style={{ background: `linear-gradient(90deg, ${COLORS.magenta}, ${COLORS.blue})`, borderRadius: 50 }}
                      >
                        Confirm Appointment →
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Call */}
              <div className="relative" ref={callRef}>
                <button
                  onClick={() => { setCallOpen(v => !v); setBookOpen(false) }}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full text-white font-bold text-sm transition-colors"
                  style={{ background: COLORS.plum }}
                  onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.background = COLORS.magenta)}
                  onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.background = COLORS.plum)}
                >
                  <Phone className="w-4 h-4" />
                  Call Us
                </button>
                <AnimatePresence>
                  {callOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.25 }}
                      className="absolute right-0 mt-3 p-4"
                      style={{
                        width: 270,
                        background: "#fff",
                        borderRadius: 16,
                        borderTop: `3px solid ${COLORS.plum}`,
                        boxShadow: "0 16px 60px rgba(45,10,30,0.15)",
                        zIndex: 9999,
                      }}
                    >
                      <div className="space-y-2">
                        {phones.map((p, i) => (
                          <div key={p.label} className="flex items-center justify-between gap-2">
                            <div>
                              <div className="text-[11px] font-semibold uppercase tracking-wide" style={{ color: COLORS.navLink }}>{p.label}</div>
                              <div className="text-sm font-semibold" style={{ color: COLORS.plum }}>{p.number}</div>
                            </div>
                            <button
                              onClick={() => copy(p.number, i)}
                              className="p-2 rounded-lg transition-colors"
                              style={{ background: copiedIdx === i ? COLORS.magenta : COLORS.pinkSoft, color: copiedIdx === i ? "#fff" : COLORS.plum }}
                              onMouseEnter={e => { if (copiedIdx !== i) { (e.currentTarget as HTMLButtonElement).style.background = COLORS.magenta; (e.currentTarget as HTMLButtonElement).style.color = "#fff" } }}
                              onMouseLeave={e => { if (copiedIdx !== i) { (e.currentTarget as HTMLButtonElement).style.background = COLORS.pinkSoft; (e.currentTarget as HTMLButtonElement).style.color = COLORS.plum } }}
                              aria-label={`Copy ${p.label}`}
                            >
                              {copiedIdx === i ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                            </button>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setIsMobileOpen(v => !v)}
              className="md:hidden p-2"
              style={{ color: COLORS.magenta }}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                {isMobileOpen ? (
                  <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <X className="w-7 h-7" />
                  </motion.span>
                ) : (
                  <motion.span key="m" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <Menu className="w-7 h-7" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* ROW 2 */}
        <div
          className="hidden md:block relative"
          style={{
            height: 72,
            paddingBottom: 24,
            background: isScrolled ? "rgba(255,241,247,0.85)" : COLORS.pinkSoft,
            backdropFilter: isScrolled ? "blur(16px)" : "none",
            WebkitBackdropFilter: isScrolled ? "blur(16px)" : "none",
            transition: "background 0.35s ease",
          }}
        >
          <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center">
            <div className="flex items-center justify-between w-full">
              {navLinks.map((link, idx) => {
                const isActive = activeSection === link.href.replace("#", "")
                return (
                  <div key={link.name} className="flex items-center">
                    <a
                      href={link.href}
                      className="relative px-3 py-1 group"
                      style={{
                        color: isActive ? COLORS.magenta : COLORS.navLink,
                        fontWeight: 600,
                        fontSize: 17,
                        transition: "color 0.2s ease",
                      }}
                      onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = COLORS.magenta)}
                      onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = isActive ? COLORS.magenta : COLORS.navLink)}
                    >
                      {link.name}
                      <span
                        className="absolute left-3 right-3 -bottom-0.5 h-[2px] origin-left transition-transform duration-300 group-hover:scale-x-100"
                        style={{
                          background: COLORS.magenta,
                          transform: isActive ? "scaleX(1)" : "scaleX(0)",
                        }}
                      />
                    </a>
                    {idx < navLinks.length - 1 && (
                      <span style={{ color: COLORS.navLink, opacity: 0.4 }}>|</span>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
          {/* Gradient bottom border */}
          <div
            className="absolute bottom-0 left-0 right-0"
            style={{ height: 2.5, background: `linear-gradient(90deg, ${COLORS.magenta}, ${COLORS.blue})` }}
          />
        </div>

        {/* Mobile gradient line under row 1 */}
        <div
          className="md:hidden"
          style={{ height: 2.5, background: `linear-gradient(90deg, ${COLORS.magenta}, ${COLORS.blue})` }}
        />
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileOpen(false)}
              className="fixed inset-0 bg-black/50 md:hidden"
              style={{ zIndex: 1001 }}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
              className="fixed top-0 right-0 bottom-0 bg-white md:hidden flex flex-col"
              style={{ width: "min(340px, 90vw)", zIndex: 1002 }}
            >
              <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: COLORS.pinkSoft }}>
                <img src={logo} alt="Subhashree IVF" style={{ width: 130 }} onError={(e) => ((e.currentTarget.style.display = "none"))} />
                <button onClick={() => setIsMobileOpen(false)} aria-label="Close menu" style={{ color: COLORS.plum }}>
                  <X className="w-6 h-6" />
                </button>
              </div>

              <nav className="flex-1 overflow-y-auto px-2 py-2">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileOpen(false)}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className="flex items-center px-4 font-semibold border-b"
                    style={{
                      height: 52,
                      color: COLORS.navLink,
                      borderColor: COLORS.pinkSoft,
                      fontSize: 15,
                    }}
                  >
                    {link.name}
                  </motion.a>
                ))}
              </nav>

              <div className="p-4 space-y-3 border-t" style={{ borderColor: COLORS.pinkSoft }}>
                <button
                  className="w-full py-3 text-white font-bold flex items-center justify-center gap-2"
                  style={{ background: COLORS.magenta, borderRadius: 50 }}
                >
                  📅 Book Appointment
                </button>
                <a
                  href="tel:+9779800123456"
                  className="w-full py-3 font-bold flex items-center justify-center gap-2 border-2"
                  style={{ borderColor: COLORS.plum, color: COLORS.plum, borderRadius: 50 }}
                >
                  📞 Call Us
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Spacer to offset fixed navbar height */}
      <div style={{ height: isScrolled ? 128 : 142 }} className="hidden md:block" />
      <div style={{ height: 70 }} className="md:hidden" />
    </>
  )
}
