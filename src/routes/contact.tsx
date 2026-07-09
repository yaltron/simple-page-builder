import { useState } from "react"
import { createFileRoute } from "@tanstack/react-router"
import { motion } from "framer-motion"
import { MapPin, Phone, Mail, Clock, ExternalLink } from "lucide-react"
import { toast } from "sonner"
import { PageLayout, Section, BRAND } from "@/components/page-layout"
import { supabase } from "@/integrations/supabase/client"

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Shubhashree IVF Clinic, Kathmandu | Book a Consultation" },
      { name: "description", content: "Contact Shubhashree IVF Clinic in Soalteemode, Kathmandu. Call +977 986-1141699 or book a fertility consultation online today." },
      { property: "og:title", content: "Contact Shubhashree IVF Clinic, Kathmandu | Book a Consultation" },
      { property: "og:description", content: "Contact Shubhashree IVF Clinic in Soalteemode, Kathmandu. Call +977 986-1141699 or book a fertility consultation online today." },
      { property: "og:url", content: "https://shubhashreeivf.com/contact" },
    ],
    links: [{ rel: "canonical", href: "https://shubhashreeivf.com/contact" }],
  }),
  component: ContactPage,
})

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

function getMinDate() {
  const d = new Date(); d.setDate(d.getDate() + 1)
  return d.toISOString().split("T")[0]
}
function getMaxDate() {
  const d = new Date(); d.setMonth(d.getMonth() + 3)
  return d.toISOString().split("T")[0]
}

const info = [
  { icon: MapPin, label: "Address", value: "Soalteemode, Kathmandu, Nepal" },
  { icon: Phone, label: "Phone", value: "+977 9861141699" },
  { icon: Mail, label: "Email", value: "shubhashreeivf@gmail.com" },
  { icon: Clock, label: "Hours", value: "Sun-Fri: 8:00 AM - 6:00 PM" },
]

const inputStyle: React.CSSProperties = {
  border: "1.5px solid rgba(230,0,126,0.2)",
  borderRadius: 12,
  padding: "12px 16px",
  width: "100%",
  outline: "none",
  background: "white",
  color: BRAND.plum,
  fontSize: 14,
}

function ContactPage() {
  const [form, setForm] = useState({
    full_name: "", phone: "", email: "",
    preferred_date: "", preferred_time: "",
    consultation_type: "In-Clinic",
    service: "", message: "",
  })
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

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
      email: form.email.trim() || null,
      preferred_date: form.preferred_date,
      preferred_time: form.preferred_time,
      consultation_type: form.consultation_type,
      service: form.service || null,
      message: form.message.trim() || null,
    })
    setSubmitting(false)
    if (error) {
      toast.error("Could not submit. Please try again.")
      return
    }
    setSuccess(true)
    setForm({ full_name: "", phone: "", email: "", preferred_date: "", preferred_time: "", consultation_type: "In-Clinic", service: "", message: "" })
  }

  return (
    <PageLayout title="Contact Us" breadcrumb="Contact Us">
      <Section bg="white">
        <div className="grid lg:grid-cols-[55fr_45fr] gap-10">
          {/* Booking form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-serif text-3xl lg:text-4xl font-bold mb-6" style={{ color: BRAND.heading }}>Book an Appointment</h2>

            {success ? (
              <div className="rounded-2xl p-8 text-center" style={{ background: BRAND.pinkSoft, border: `1px solid ${BRAND.border}` }}>
                <div className="font-serif text-2xl font-bold mb-3" style={{ color: BRAND.heading }}>Thank you!</div>
                <p style={{ color: BRAND.navLink }}>
                  Your appointment request has been received. We will confirm via phone within 24 hours.
                </p>
                <button onClick={() => setSuccess(false)} className="mt-5 px-6 py-2 rounded-full text-white font-semibold" style={{ background: "#B5005F" }}>
                  Book Another
                </button>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-3" noValidate>
                <input style={inputStyle} placeholder="Full Name *" required value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} />
                <input type="tel" style={inputStyle} placeholder="Phone *" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                <input type="email" style={inputStyle} placeholder="Email (optional)" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                <div className="grid sm:grid-cols-2 gap-3">
                  <input type="date" style={inputStyle} required min={getMinDate()} max={getMaxDate()} value={form.preferred_date} onChange={(e) => setForm({ ...form, preferred_date: e.target.value })} />
                  <select style={inputStyle} required value={form.preferred_time} onChange={(e) => setForm({ ...form, preferred_time: e.target.value })}>
                    <option value="">Preferred Time *</option>
                    {TIME_OPTIONS.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                  </select>
                </div>
                <select style={inputStyle} value={form.consultation_type} onChange={(e) => setForm({ ...form, consultation_type: e.target.value })}>
                  <option value="In-Clinic">In-Clinic Consultation</option>
                  <option value="Video Call">Video Call</option>
                </select>
                <textarea rows={4} style={inputStyle} placeholder="Your Message (optional)" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 rounded-full text-white font-bold transition-colors disabled:opacity-60"
                  style={{ background: "#8B0F50" }}
                  onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.background = "#6D0A3E")}
                  onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.background = "#8B0F50")}
                >
                  {submitting ? "Submitting…" : "Confirm"}
                </button>
              </form>
            )}
          </motion.div>

          {/* Info cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            {info.map((c) => (
              <div key={c.label} className="bg-white rounded-xl p-5 flex items-start gap-4 transition-transform hover:-translate-y-1" style={{ border: "1px solid rgba(230,0,126,0.15)" }}>
                <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: BRAND.pinkSoft }}>
                  <c.icon className="w-5 h-5" style={{ color: BRAND.pink }} />
                </div>
                <div>
                  <div className="font-bold mb-1" style={{ color: BRAND.heading }}>{c.label}</div>
                  <div style={{ color: BRAND.navLink }}>{c.value}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </Section>

      <Section bg="white">
        <div className="rounded-2xl overflow-hidden relative" style={{ height: 420, border: "1px solid rgba(230,0,126,0.15)" }}>
          <iframe
            title="Shubhashree IVF Clinic location"
            src="https://www.google.com/maps?q=Shubhashree+IVF+Clinic&ll=27.6970864,85.2941404&z=15&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
          <a
            href="https://maps.app.goo.gl/uBT758S7LyZYjHJz5"
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-4 right-4 inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold bg-white shadow-lg"
            style={{ color: BRAND.pink }}
          >
            View on Google Maps <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </Section>
    </PageLayout>
  )
}
