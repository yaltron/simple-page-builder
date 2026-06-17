import { useState, useEffect, useRef } from "react"
import { createPortal } from "react-dom"
import { motion, AnimatePresence } from "framer-motion"
import { Phone, Menu, X, Calendar, ChevronDown, Copy, Check, Hospital, Video } from "lucide-react"
import { Link, useLocation, useNavigate } from "@tanstack/react-router"
import { toast } from "sonner"
import { supabase } from "@/integrations/supabase/client"
const logo = "/logo.png"

const SERVICE_OPTIONS = [
  "IVF Treatment",
  "ICSI Procedure",
  "Embryo Freezing",
  "Genetic Testing (PGT)",
  "Donor Egg Programme",
  "Infertility Diagnosis",
  "General Consultation",
  "Other",
] as const

const TIME_OPTIONS = [
  { value: "Morning 8-11am", label: "Morning (8am - 11am)" },
  { value: "Afternoon 11am-2pm", label: "Afternoon (11am - 2pm)" },
  { value: "Evening 2-5pm", label: "Evening (2pm - 5pm)" },
] as const

function getMinDate() {
  const d = new Date(); d.setDate(d.getDate() + 1)
  return d.toISOString().split("T")[0]
}
function getMaxDate() {
  const d = new Date(); d.setMonth(d.getMonth() + 3)
  return d.toISOString().split("T")[0]
}

const COLORS = {
  magenta: "#E6007E",
  magentaDark: "#C4006A",
  cta: "#8B0F50",
  ctaDark: "#6D0A3E",
  blue: "#1BA0DC",
  pinkSoft: "#FFF1F7",
  blueSoft: "#EAF7FD",
  plum: "#2D0A1E",
  navLink: "#7A2050",
}

const navLinks = [
  { name: "About Us", to: "/about" },
  { name: "Services", to: "/services" },
  { name: "Our Team", to: "/team" },
  { name: "Success Stories", to: "/success-stories" },
  { name: "Blogs and News", to: "/blog" },
  { name: "Gallery", to: "/gallery" },
  { name: "Contact Us", to: "/contact" },
] as const

const phones = [
  { label: "Reception", number: "+977 9861141699" },
  { label: "Emergency", number: "+977 9861141699" },
  { label: "WhatsApp", number: "+977 9861141699" },
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
  const location = useLocation()
  const navigate = useNavigate()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [bookOpen, setBookOpen] = useState(false)
  const [callOpen, setCallOpen] = useState(false)
  const [logoFailed, setLogoFailed] = useState(false)
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null)
  const [bookForm, setBookForm] = useState({
    full_name: "", phone: "", email: "",
    preferred_date: "", preferred_time: "",
    service: "", message: "",
  })
  const [bookSubmitting, setBookSubmitting] = useState(false)

  const bookRef = useRef<HTMLDivElement>(null)
  const callRef = useRef<HTMLDivElement>(null)
  const bookBtnRef = useRef<HTMLButtonElement>(null)
  const callBtnRef = useRef<HTMLButtonElement>(null)
  const bookPanelRef = useRef<HTMLDivElement>(null)
  const callPanelRef = useRef<HTMLDivElement>(null)
  const [bookPos, setBookPos] = useState<{ top: number; right: number }>({ top: 0, right: 0 })
  const [callPos, setCallPos] = useState<{ top: number; right: number }>({ top: 0, right: 0 })

  const computePos = (btn: HTMLElement | null) => {
    if (!btn) return { top: 0, right: 0 }
    const r = btn.getBoundingClientRect()
    return { top: r.bottom + 8, right: window.innerWidth - r.right }
  }

  useEffect(() => {
    if (!bookOpen && !callOpen) return
    const update = () => {
      if (bookOpen) setBookPos(computePos(bookBtnRef.current))
      if (callOpen) setCallPos(computePos(callBtnRef.current))
    }
    update()
    window.addEventListener("scroll", update, { passive: true })
    window.addEventListener("resize", update)
    return () => {
      window.removeEventListener("scroll", update)
      window.removeEventListener("resize", update)
    }
  }, [bookOpen, callOpen])

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const t = e.target as Node
      if (bookOpen && bookRef.current && !bookRef.current.contains(t) && !(bookPanelRef.current && bookPanelRef.current.contains(t))) setBookOpen(false)
      if (callOpen && callRef.current && !callRef.current.contains(t) && !(callPanelRef.current && callPanelRef.current.contains(t))) setCallOpen(false)
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

  useEffect(() => {
    const openBook = () => { setCallOpen(false); setBookOpen(true); setBookPos(computePos(bookBtnRef.current)) }
    const openCall = () => { setBookOpen(false); setCallOpen(true); setCallPos(computePos(callBtnRef.current)) }
    window.addEventListener("open-book-popover", openBook)
    window.addEventListener("open-call-popover", openCall)
    return () => {
      window.removeEventListener("open-book-popover", openBook)
      window.removeEventListener("open-call-popover", openCall)
    }
  }, [])

  const copy = (txt: string, idx: number) => {
    navigator.clipboard?.writeText(txt)
    setCopiedIdx(idx)
    toast.success("Copied!")
    setTimeout(() => setCopiedIdx(null), 1500)
  }

  const submitBooking = async (e: React.FormEvent) => {
    e.preventDefault()
    if (bookSubmitting) return
    // Disallow Sundays
    if (bookForm.preferred_date) {
      const d = new Date(bookForm.preferred_date + "T00:00:00")
      if (d.getDay() === 0) {
        toast.error("Clinic is closed on Sundays. Please pick another date.")
        return
      }
    }
    setBookSubmitting(true)
    const { error } = await supabase.from("appointments").insert({
      full_name: bookForm.full_name.trim(),
      phone: bookForm.phone.trim(),
      email: bookForm.email.trim() || null,
      preferred_date: bookForm.preferred_date,
      preferred_time: bookForm.preferred_time,
      service: bookForm.service || null,
      consultation_type: "In-Clinic",
      message: bookForm.message.trim() || null,
    })
    setBookSubmitting(false)
    if (error) {
      toast.error("Could not submit. Please try again.")
      return
    }
    toast.success("Appointment requested! We will confirm via phone within 24 hours.")
    setBookForm({ full_name: "", phone: "", email: "", preferred_date: "", preferred_time: "", service: "", message: "" })
    setTimeout(() => setBookOpen(false), 2000)
  }

  const row1Height = isScrolled ? 54 : 68
  const logoScale = isScrolled ? 0.88 : 1

  const Logo = (
    <Link to="/" className="flex items-center" style={{ transform: `scale(${logoScale})`, transformOrigin: "left center", transition: "transform 0.35s ease", alignItems: "center" }}>
      {!logoFailed ? (
        <img
          src={logo}
          alt="Shubhashree IVF Clinic Kathmandu logo"
          className="nav-logo crisp-logo"
          style={{ height: 60, width: "auto", maxWidth: 220, objectFit: "contain", objectPosition: "left center", display: "block" }}
          onError={() => setLogoFailed(true)}
        />
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
        id="navbar"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 w-full"
        style={{
          zIndex: 99999,
          isolation: "isolate",
          transform: "translateZ(0)",
          willChange: "transform",
          boxShadow: isScrolled ? "0 4px 24px rgba(230,0,126,0.10)" : "none",
          background: isScrolled ? "rgba(255,241,247,0.85)" : COLORS.pinkSoft,
          backdropFilter: isScrolled ? "blur(16px)" : "none",
          WebkitBackdropFilter: isScrolled ? "blur(16px)" : "none",
          transition: "box-shadow 0.35s ease, background 0.35s ease",
        }}
      >
        {/* ROW 1 */}
        <div
          className="min-h-[58px] md:min-h-[64px] pt-1.5 md:pt-2 pb-1"
          style={{
            transition: "min-height 0.35s ease",
          }}
        >
          <div className="max-w-7xl mx-auto h-full px-3 sm:px-6 lg:px-8 flex items-center justify-between gap-2">
            {Logo}

            {/* Desktop CTAs */}
            <div className="nav-cta-row hidden md:flex items-center gap-3">
              {/* Book */}
              <div className="relative" ref={bookRef}>
                <button
                  ref={bookBtnRef}
                  onClick={() => {
                    setCallOpen(false)
                    setBookOpen(v => {
                      const next = !v
                      if (next) setBookPos(computePos(bookBtnRef.current))
                      return next
                    })
                  }}
                  className="nav-cta-btn flex items-center gap-2 px-5 py-2.5 rounded-full text-white font-bold text-sm transition-all"
                  style={{ background: COLORS.cta }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = COLORS.ctaDark; (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)" }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = COLORS.cta; (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)" }}
                >
                  <Calendar className="w-4 h-4" />
                  Book Appointment
                  <ChevronDown className={`w-4 h-4 transition-transform ${bookOpen ? "rotate-180" : ""}`} />
                </button>
                {typeof document !== "undefined" && createPortal(
                  <AnimatePresence>
                    {bookOpen && (
                      <motion.div
                        ref={bookPanelRef}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.25 }}
                        className="p-5"
                        style={{
                          position: "fixed",
                          top: bookPos.top,
                          right: bookPos.right,
                          left: "auto",
                          width: 380,
                          maxHeight: "calc(100vh - 100px)",
                          overflowY: "auto",
                          background: "#fff",
                          borderRadius: 20,
                          borderTop: `3px solid ${COLORS.magenta}`,
                          boxShadow: "0 16px 60px rgba(230,0,126,0.15)",
                          zIndex: 999999,
                        }}
                      >
                        <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, color: COLORS.plum }} className="font-bold">
                          Book a Consultation
                        </h3>
                        

                        <div className="mt-4 grid grid-cols-2 gap-2">
                          <button
                            type="button"
                            onClick={() => { setBookOpen(false); navigate({ to: "/contact" }) }}
                            className="text-left p-3 rounded-xl hover:scale-[1.02] transition-transform"
                            style={{ background: COLORS.pinkSoft }}
                          >
                            <div style={{ color: COLORS.magenta }}><Hospital className="w-5 h-5" /></div>
                            <div className="font-semibold text-sm mt-2" style={{ color: COLORS.plum }}>Visit In-Clinic</div>
                            <div className="inline-block mt-2 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-green-100 text-green-700">Available Today</div>
                          </button>
                          <button
                            type="button"
                            onClick={() => { setBookOpen(false); navigate({ to: "/contact" }) }}
                            className="text-left p-3 rounded-xl hover:scale-[1.02] transition-transform"
                            style={{ background: COLORS.pinkSoft }}
                          >
                            <div style={{ color: COLORS.magenta }}><Video className="w-5 h-5" /></div>
                            <div className="font-semibold text-sm mt-2" style={{ color: COLORS.plum }}>Online Consultation</div>
                            <div className="inline-block mt-2 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-100 text-blue-700">Video Call</div>
                          </button>
                        </div>

                        <form onSubmit={submitBooking}>
                          <div className="mt-4 space-y-2">
                            <input type="text" required placeholder="Full Name *" value={bookForm.full_name} onChange={e => setBookForm({ ...bookForm, full_name: e.target.value })} className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 outline-none transition-colors" onFocus={e => (e.currentTarget.style.borderColor = COLORS.magenta)} onBlur={e => (e.currentTarget.style.borderColor = "#e5e7eb")} />
                            <input type="tel" required placeholder="Phone *" value={bookForm.phone} onChange={e => setBookForm({ ...bookForm, phone: e.target.value })} className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 outline-none" onFocus={e => (e.currentTarget.style.borderColor = COLORS.magenta)} onBlur={e => (e.currentTarget.style.borderColor = "#e5e7eb")} />
                            <input type="email" placeholder="Email (optional)" value={bookForm.email} onChange={e => setBookForm({ ...bookForm, email: e.target.value })} className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 outline-none" onFocus={e => (e.currentTarget.style.borderColor = COLORS.magenta)} onBlur={e => (e.currentTarget.style.borderColor = "#e5e7eb")} />
                            <input type="date" required min={getMinDate()} max={getMaxDate()} value={bookForm.preferred_date} onChange={e => setBookForm({ ...bookForm, preferred_date: e.target.value })} className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 outline-none" onFocus={e => (e.currentTarget.style.borderColor = COLORS.magenta)} onBlur={e => (e.currentTarget.style.borderColor = "#e5e7eb")} />
                            <select required value={bookForm.preferred_time} onChange={e => setBookForm({ ...bookForm, preferred_time: e.target.value })} className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 outline-none bg-white" onFocus={e => (e.currentTarget.style.borderColor = COLORS.magenta)} onBlur={e => (e.currentTarget.style.borderColor = "#e5e7eb")}>
                              <option value="">Preferred Time *</option>
                              {TIME_OPTIONS.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                            </select>
                            <select value={bookForm.service} onChange={e => setBookForm({ ...bookForm, service: e.target.value })} className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 outline-none bg-white" onFocus={e => (e.currentTarget.style.borderColor = COLORS.magenta)} onBlur={e => (e.currentTarget.style.borderColor = "#e5e7eb")}>
                              <option value="">Service Interested In (optional)</option>
                              {SERVICE_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                            <textarea placeholder="Any specific concerns?" value={bookForm.message} onChange={e => setBookForm({ ...bookForm, message: e.target.value })} rows={2} className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 outline-none resize-none" onFocus={e => (e.currentTarget.style.borderColor = COLORS.magenta)} onBlur={e => (e.currentTarget.style.borderColor = "#e5e7eb")} />
                          </div>

                          <button
                            type="submit"
                            disabled={bookSubmitting}
                            className="w-full mt-4 py-3 text-white font-bold text-sm transition-transform hover:scale-[1.02] disabled:opacity-60"
                            style={{ background: "#B5005F", borderRadius: 50 }}
                            onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.background = "#8C0049")}
                            onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.background = "#B5005F")}
                          >
                            {bookSubmitting ? "Submitting…" : "Confirm Appointment →"}
                          </button>
                        </form>
                      </motion.div>
                    )}
                  </AnimatePresence>,
                  document.body
                )}
              </div>

              {/* Call */}
              <a
                href="tel:015312007"
                className="nav-cta-btn flex items-center gap-2 px-5 py-2.5 rounded-full text-white font-bold text-sm transition-colors"
                style={{ background: COLORS.cta }}
                onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.background = COLORS.ctaDark)}
                onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.background = COLORS.cta)}
              >
                <Phone className="w-4 h-4" />
                Call Us
              </a>
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
          className="nav-row2 hidden md:block relative"
          style={{
            height: 72,
            paddingBottom: 24,
          }}
        >
          <div className="h-full flex items-center" style={{ width: "100%", paddingLeft: "5%", paddingRight: "5%" }}>
            <div className="flex items-center w-full" style={{ justifyContent: "space-evenly" }}>
              {navLinks.map((link) => {
                const isActive = location.pathname === link.to
                return (
                  <Link
                    key={link.name}
                    to={link.to}
                    className="nav-row2-link relative px-3 py-1 group"
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
                  </Link>
                )
              })}
            </div>
          </div>
        </div>

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
              style={{ zIndex: 99998 }}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
              className="fixed top-0 right-0 bottom-0 bg-white md:hidden flex flex-col"
              style={{ width: "min(340px, 90vw)", zIndex: 99999 }}
            >
              <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: COLORS.pinkSoft }}>
                <img src={logo} alt="Shubhashree IVF Clinic Kathmandu logo" style={{ width: 130 }} onError={(e) => ((e.currentTarget.style.display = "none"))} />
                <button onClick={() => setIsMobileOpen(false)} aria-label="Close menu" style={{ color: COLORS.plum }}>
                  <X className="w-6 h-6" />
                </button>
              </div>

              <nav className="flex-1 overflow-y-auto px-2 py-2">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                  >
                    <Link
                      to={link.to}
                      onClick={() => setIsMobileOpen(false)}
                      className="flex items-center px-4 font-semibold border-b"
                      style={{
                        height: 52,
                        color: COLORS.navLink,
                        borderColor: COLORS.pinkSoft,
                        fontSize: 15,
                      }}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="p-4 space-y-3 border-t" style={{ borderColor: COLORS.pinkSoft }}>
                <Link
                  to="/contact"
                  onClick={() => setIsMobileOpen(false)}
                  className="w-full py-3 text-white font-bold flex items-center justify-center gap-2"
                  style={{ background: COLORS.magenta, borderRadius: 50 }}
                >
                  📅 Book Appointment
                </Link>
                <a
                  href="tel:015312007"
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
      <div className="md:hidden h-[64px]" />
    </>
  )
}
