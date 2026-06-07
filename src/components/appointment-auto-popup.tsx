import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { useRouterState } from "@tanstack/react-router"
import { AnimatePresence, motion } from "framer-motion"
import { X } from "lucide-react"
import { toast } from "sonner"
import { supabase } from "@/integrations/supabase/client"

const SERVICE_OPTIONS = [
  "IVF Treatment",
  "ICSI Procedure",
  "Embryo Freezing",
  "Genetic Testing (PGT)",
  "Donor Egg Programme",
  "Infertility Diagnosis",
  "General Consultation",
  "Other",
]

const TIME_OPTIONS = [
  { value: "Morning 8-11am", label: "Morning (8am - 11am)" },
  { value: "Afternoon 11am-2pm", label: "Afternoon (11am - 2pm)" },
  { value: "Evening 2-5pm", label: "Evening (2pm - 5pm)" },
]

const SESSION_KEY = "appointment_popup_shown"

function getMinDate() {
  const d = new Date(); d.setDate(d.getDate() + 1)
  return d.toISOString().split("T")[0]
}
function getMaxDate() {
  const d = new Date(); d.setMonth(d.getMonth() + 3)
  return d.toISOString().split("T")[0]
}

export function AppointmentAutoPopup() {
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  const [open, setOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [form, setForm] = useState({
    full_name: "", phone: "", preferred_date: "", preferred_time: "",
    service: "", message: "",
  })

  const blocked = pathname.startsWith("/admin") || pathname === "/contact"

  useEffect(() => {
    if (blocked) return
    if (sessionStorage.getItem(SESSION_KEY)) return
    const t = setTimeout(() => {
      setOpen(true)
      sessionStorage.setItem(SESSION_KEY, "true")
    }, 5000)
    return () => clearTimeout(t)
  }, [blocked])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false) }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [open])

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (submitting) return
    if (!form.full_name.trim() || !form.phone.trim() || !form.preferred_date || !form.preferred_time) {
      toast.error("Please fill all required fields")
      return
    }
    if (form.preferred_date) {
      const d = new Date(form.preferred_date + "T00:00:00")
      if (d.getDay() === 0) {
        toast.error("Clinic is closed on Sundays. Please pick another date.")
        return
      }
    }
    setSubmitting(true)
    const { error } = await supabase.from("appointments").insert({
      full_name: form.full_name.trim(),
      phone: form.phone.trim(),
      preferred_date: form.preferred_date,
      preferred_time: form.preferred_time,
      consultation_type: "In-Clinic",
      service: form.service || null,
      message: form.message.trim() || null,
    })
    setSubmitting(false)
    if (error) { toast.error("Could not submit. Please try again."); return }
    setSuccess(true)
    setTimeout(() => setOpen(false), 2500)
  }

  if (typeof document === "undefined") return null

  const fieldStyle: React.CSSProperties = {
    width: "100%",
    padding: "10px 14px",
    border: "1.5px solid rgba(230,0,126,0.2)",
    borderRadius: 12,
    fontSize: 14,
    outline: "none",
    background: "white",
  }

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          onClick={() => setOpen(false)}
          style={{
            position: "fixed", inset: 0, background: "rgba(0,0,0,0.55)",
            zIndex: 999999, display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.85, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
            style={{
              background: "white",
              borderRadius: 24,
              maxWidth: 460,
              width: "90vw",
              maxHeight: "90vh",
              overflowY: "auto",
              WebkitOverflowScrolling: "touch",
              boxShadow: "0 24px 80px rgba(0,0,0,0.2)",
              position: "relative",
            }}
          >
            {/* Header */}
            <div style={{

              background: "linear-gradient(135deg, #E6007E, #B5005F)",
              padding: "24px 28px",
              borderRadius: "24px 24px 0 0",
              position: "relative",
            }}>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close"
                style={{
                  position: "absolute", top: 16, right: 16,
                  background: "transparent", border: "none", color: "white",
                  fontSize: 20, cursor: "pointer", lineHeight: 1,
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = "0.7")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = "1")}
              >
                <X className="w-5 h-5" />
              </button>
              <h3 style={{ fontFamily: "'Playfair Display', serif", color: "white", fontSize: 20, fontWeight: 700, margin: 0 }}>
                Book Your Appointment
              </h3>
            </div>

            {/* Body */}
            <div style={{ padding: "24px 28px" }}>
              {success ? (
                <div className="text-center py-6">
                  <div style={{ fontSize: 40 }}>✅</div>
                  <p className="mt-3 font-semibold" style={{ color: "#2D0A1E" }}>
                    Thank you! We will confirm your appointment within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={submit} className="space-y-3">
                  <div>
                    <label style={labelStyle}>Full Name *</label>
                    <input style={fieldStyle} placeholder="Your full name" required value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} />
                  </div>
                  <div>
                    <label style={labelStyle}>Phone *</label>
                    <input type="tel" style={fieldStyle} placeholder="Phone number" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                  </div>
                  <div>
                    <label style={labelStyle}>Preferred Date *</label>
                    <input
                      type="date"
                      required
                      min={getMinDate()}
                      max={getMaxDate()}
                      value={form.preferred_date}
                      onChange={(e) => setForm({ ...form, preferred_date: e.target.value })}
                      style={{
                        ...fieldStyle,
                        WebkitAppearance: "none",
                        appearance: "none",
                        minHeight: 44,
                        display: "block",
                        position: "relative",
                        cursor: "pointer",
                      }}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Preferred Time *</label>
                    <select style={fieldStyle} required value={form.preferred_time} onChange={(e) => setForm({ ...form, preferred_time: e.target.value })}>
                      <option value="">Select a time slot</option>
                      {TIME_OPTIONS.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                    </select>
                  </div>
                  <select style={fieldStyle} value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })}>
                    <option value="">Service Interested In (optional)</option>
                    {SERVICE_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                  <textarea rows={3} style={fieldStyle} placeholder="Your Message (optional)" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />

                  <button
                    type="submit"
                    disabled={submitting}
                    style={{
                      width: "100%",
                      padding: "12px",
                      borderRadius: 50,
                      background: "#E6007E",
                      color: "white",
                      fontWeight: 700,
                      border: "none",
                      cursor: submitting ? "not-allowed" : "pointer",
                      opacity: submitting ? 0.6 : 1,
                      transition: "background 0.2s",
                    }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "#C4006A")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "#E6007E")}
                  >
                    {submitting ? "Submitting…" : "Book Appointment →"}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}
