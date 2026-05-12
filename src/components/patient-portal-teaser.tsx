import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Lock } from "lucide-react"
import { toast } from "sonner"
import { Section, BRAND } from "@/components/page-layout"
import { fetchSettings } from "@/lib/site-settings"

type Cfg = { is_active: boolean; title: string; description: string; cta_text: string }
const DEFAULTS: Cfg = {
  is_active: false,
  title: "Patient Portal — Coming Soon",
  description: "Access your reports, appointments and treatment journey securely online.",
  cta_text: "Notify Me",
}

export function PatientPortalTeaser() {
  const [cfg, setCfg] = useState<Cfg | null>(null)
  const [email, setEmail] = useState("")

  useEffect(() => {
    let cancelled = false
    fetchSettings<Cfg>("patient_portal", DEFAULTS).then((v) => {
      if (cancelled) return
      if (v.is_active) setCfg(v)
    }).catch(() => {})
    return () => { cancelled = true }
  }, [])

  if (!cfg) return null

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.includes("@")) return toast.error("Enter a valid email")
    toast.success("Thanks! We'll notify you when the portal launches.")
    setEmail("")
  }

  return (
    <Section bg={BRAND.pinkSoft}>
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-3xl mx-auto text-center bg-white rounded-3xl p-8 md:p-12 border" style={{ borderColor: BRAND.border }}>
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full mb-4" style={{ background: BRAND.pink, color: "white" }}>
          <Lock className="w-6 h-6" />
        </div>
        <h2 className="font-serif text-2xl md:text-3xl font-bold mb-3" style={{ color: BRAND.heading }}>{cfg.title}</h2>
        <p className="mb-6" style={{ color: BRAND.navLink }}>{cfg.description}</p>
        <form onSubmit={submit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" className="flex-1 px-4 py-2.5 border rounded-full" />
          <button className="px-5 py-2.5 rounded-full text-white font-bold whitespace-nowrap" style={{ background: BRAND.pink }}>{cfg.cta_text || "Notify Me"}</button>
        </form>
      </motion.div>
    </Section>
  )
}
