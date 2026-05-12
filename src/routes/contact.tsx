import { useState } from "react"
import { createFileRoute } from "@tanstack/react-router"
import { motion } from "framer-motion"
import { MapPin, Phone, Mail, Clock, ArrowRight, ExternalLink } from "lucide-react"
import { toast } from "sonner"
import { PageLayout, PageCTABanner, Section, BRAND } from "@/components/page-layout"

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — Subhashree IVF" },
      { name: "description", content: "Get in touch with Subhashree IVF in Kathmandu — phone, email, address and clinic hours." },
      { property: "og:title", content: "Contact Us — Subhashree IVF" },
      { property: "og:description", content: "Reach out — we'd love to hear from you." },
    ],
  }),
  component: ContactPage,
})

const info = [
  { icon: MapPin, label: "Address", value: "Kathmandu, Nepal" },
  { icon: Phone, label: "Phone", value: "+977 9861141699" },
  { icon: Mail, label: "Email", value: "Shubhashreeivf@gmail.com" },
  { icon: Clock, label: "Hours", value: "Sun–Fri: 8:00 AM – 6:00 PM" },
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
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "", message: "" })
  const [errors, setErrors] = useState<Record<string, boolean>>({})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const errs: Record<string, boolean> = {}
    ;(["name", "email", "phone", "message"] as const).forEach(k => { if (!form[k].trim()) errs[k] = true })
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = true
    setErrors(errs)
    if (Object.keys(errs).length) return
    toast.success("Message sent! We'll be in touch soon.")
    setForm({ name: "", email: "", phone: "", service: "", message: "" })
  }

  const fieldStyle = (k: string): React.CSSProperties => ({
    ...inputStyle,
    borderColor: errors[k] ? "#dc2626" : "rgba(230,0,126,0.2)",
  })

  return (
    <PageLayout title="Contact Us" breadcrumb="Contact Us">
      <Section bg="white">
        <div className="grid lg:grid-cols-2 gap-10">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-serif text-3xl lg:text-4xl font-bold mb-2" style={{ color: BRAND.heading }}>Get In Touch</h2>
            <p className="mb-6" style={{ color: BRAND.navLink }}>We'll respond within 24 hours.</p>
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div>
                <input style={fieldStyle("name")} placeholder="Your Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                {errors.name && <p style={{ color: "#dc2626", fontSize: 12, marginTop: 4 }}>Name is required</p>}
              </div>
              <div>
                <input type="email" style={fieldStyle("email")} placeholder="Email Address" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                {errors.email && <p style={{ color: "#dc2626", fontSize: 12, marginTop: 4 }}>Valid email is required</p>}
              </div>
              <div>
                <input type="tel" style={fieldStyle("phone")} placeholder="Phone Number" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                {errors.phone && <p style={{ color: "#dc2626", fontSize: 12, marginTop: 4 }}>Phone is required</p>}
              </div>
              <select style={inputStyle} value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })}>
                <option value="">Select a Service</option>
                <option>IVF Treatment</option>
                <option>ICSI Procedure</option>
                <option>Embryo Freezing</option>
                <option>Genetic Testing (PGT)</option>
                <option>Donor Egg Programme</option>
                <option>Infertility Diagnosis</option>
                <option>Other</option>
              </select>
              <div>
                <textarea rows={5} style={fieldStyle("message")} placeholder="Your Message" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
                {errors.message && <p style={{ color: "#dc2626", fontSize: 12, marginTop: 4 }}>Message is required</p>}
              </div>
              <button type="submit" className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-full text-white font-bold transition-transform hover:scale-[1.02]" style={{ background: `linear-gradient(90deg, ${BRAND.pink}, ${BRAND.pinkDark})` }}>
                Send Message <ArrowRight className="w-4 h-4" />
              </button>
            </form>
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

      {/* Map */}
      <Section bg="white">
        <div className="rounded-2xl overflow-hidden flex items-center justify-center" style={{ height: 380, background: BRAND.blueSoft }}>
          <div className="text-center">
            <MapPin className="w-16 h-16 mx-auto mb-4" style={{ color: BRAND.pink }} />
            <div className="font-serif text-2xl font-bold mb-2" style={{ color: BRAND.heading }}>Find Us in Kathmandu</div>
            <a className="inline-flex items-center gap-2 mt-2 font-semibold cursor-pointer" style={{ color: BRAND.pink }}>
              View on Google Maps <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </Section>

      <PageCTABanner secondary="Prefer to call? +977 9861141699" />
    </PageLayout>
  )
}
