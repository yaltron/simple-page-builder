import { useEffect, useState, useRef } from "react"
import { createFileRoute } from "@tanstack/react-router"
import { motion } from "framer-motion"
import { Briefcase, MapPin, Clock, GraduationCap, Heart, Award, Users, X } from "lucide-react"
import { toast } from "sonner"
import { PageLayout, Section, SectionHeading, BRAND } from "@/components/page-layout"
import { supabase } from "@/integrations/supabase/client"

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title: "Careers — Subhashree IVF" },
      { name: "description", content: "Join the Subhashree IVF team — current openings and how to apply." },
      { property: "og:title", content: "Careers — Subhashree IVF" },
      { property: "og:description", content: "Build your career at Nepal's leading fertility centre." },
    ],
  }),
  component: CareersPage,
})

const perks = [
  { icon: Heart, title: "Meaningful Work", desc: "Help families build their dreams of parenthood every day." },
  { icon: GraduationCap, title: "Continuous Learning", desc: "Training programs, conferences, and career development." },
  { icon: Award, title: "Recognition", desc: "We celebrate excellence and reward outstanding contributions." },
  { icon: Users, title: "Caring Team", desc: "Work alongside compassionate colleagues in a supportive culture." },
]

type Listing = {
  id: string
  title: string
  department: string | null
  type: string | null
  location: string | null
  experience: string | null
  description: string | null
  requirements: string | null
  deadline: string | null
}

function CareersPage() {
  const [listings, setListings] = useState<Listing[]>([])
  const [applying, setApplying] = useState<Listing | null>(null)

  useEffect(() => {
    supabase.from("career_listings").select("*").eq("is_active", true).order("created_at", { ascending: false })
      .then(({ data }) => setListings((data as any[]) || []))
  }, [])

  return (
    <PageLayout title="Careers" breadcrumb="Careers">
      <Section bg="white">
        <SectionHeading>Why Work With Us</SectionHeading>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {perks.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="bg-white rounded-2xl p-6 text-center transition-transform hover:-translate-y-1"
              style={{ border: "1px solid rgba(230,0,126,0.12)" }}
            >
              <div className="w-12 h-12 rounded-full mx-auto flex items-center justify-center mb-4" style={{ background: BRAND.pinkSoft }}>
                <p.icon className="w-6 h-6" style={{ color: BRAND.pink }} />
              </div>
              <h4 className="font-bold mb-1" style={{ color: BRAND.plum }}>{p.title}</h4>
              <p className="text-sm" style={{ color: BRAND.navLink }}>{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section bg={BRAND.pinkSoft}>
        <SectionHeading>Current Openings</SectionHeading>
        {listings.length === 0 ? (
          <div className="text-center py-10 rounded-2xl bg-white" style={{ color: BRAND.navLink, border: "1px solid rgba(230,0,126,0.12)" }}>
            <Briefcase className="w-10 h-10 mx-auto mb-3" style={{ color: BRAND.pink }} />
            No current openings. Please check back later or send us your CV at <a href="mailto:Shubhashreeivf@gmail.com" style={{ color: BRAND.pink, fontWeight: 600 }}>Shubhashreeivf@gmail.com</a>.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-5">
            {listings.map((j, i) => (
              <motion.div
                key={j.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="bg-white rounded-2xl p-6 transition-transform hover:-translate-y-1"
                style={{ border: "1px solid rgba(230,0,126,0.12)" }}
              >
                <h3 className="font-serif text-xl font-bold mb-2" style={{ color: BRAND.heading }}>{j.title}</h3>
                <div className="flex flex-wrap gap-3 text-xs mb-3" style={{ color: BRAND.navLink }}>
                  {j.department && <span className="inline-flex items-center gap-1"><Briefcase className="w-3 h-3" />{j.department}</span>}
                  {j.location && <span className="inline-flex items-center gap-1"><MapPin className="w-3 h-3" />{j.location}</span>}
                  {j.type && <span className="inline-flex items-center gap-1"><Clock className="w-3 h-3" />{j.type}</span>}
                  {j.experience && <span>{j.experience}</span>}
                </div>
                {j.description && <p className="text-sm mb-3" style={{ color: BRAND.plum }}>{j.description}</p>}
                {j.deadline && <p className="text-xs mb-4" style={{ color: BRAND.pink }}>Apply by: {new Date(j.deadline).toLocaleDateString()}</p>}
                <button
                  onClick={() => setApplying(j)}
                  className="px-5 py-2 rounded-full text-white text-sm font-bold transition-transform hover:scale-105"
                  style={{ background: `linear-gradient(90deg, ${BRAND.pink}, ${BRAND.pinkDark})` }}
                >
                  Apply Now
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </Section>

      {applying && <ApplyModal listing={applying} onClose={() => setApplying(null)} />}
    </PageLayout>
  )
}

function ApplyModal({ listing, onClose }: { listing: Listing; onClose: () => void }) {
  const [form, setForm] = useState({ full_name: "", email: "", phone: "", cover_letter: "", portfolio_url: "" })
  const [resume, setResume] = useState<File | null>(null)
  const [dragOver, setDragOver] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const ACCEPTED = [".pdf", ".doc", ".docx"]
  const validateFile = (file: File) => {
    const name = file.name.toLowerCase()
    if (!ACCEPTED.some(ext => name.endsWith(ext))) {
      toast.error("Please upload PDF, DOC or DOCX only")
      return false
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File too large. Maximum size is 5MB")
      return false
    }
    return true
  }

  const handleFiles = (files: FileList | null) => {
    if (!files || !files[0]) return
    if (validateFile(files[0])) setResume(files[0])
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.full_name.trim() || !form.email.trim() || !form.phone.trim()) {
      return toast.error("Name, email, and phone are required")
    }
    setSubmitting(true)
    let resume_url: string | null = null
    if (resume) {
      const uuid = crypto.randomUUID()
      const safeName = resume.name.replace(/[^a-zA-Z0-9._-]/g, "_")
      const path = `uploads/${uuid}/${safeName}`
      const { error: upErr } = await supabase.storage.from("resumes").upload(path, resume)
      if (upErr) {
        setSubmitting(false)
        return toast.error("Resume upload failed: " + upErr.message)
      }
      resume_url = path
    }
    const { error } = await supabase.from("career_applications").insert({
      career_id: listing.id,
      position: listing.title,
      full_name: form.full_name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      cover_letter: form.cover_letter.trim() || null,
      portfolio_url: form.portfolio_url.trim() || null,
      resume_url,
    })
    setSubmitting(false)
    if (error) return toast.error(error.message)
    toast.success("Application submitted! We'll be in touch.")
    onClose()
  }

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
  }

  return (
    <div className="fixed inset-0 z-[1000000] bg-black/60 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-auto p-6" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center mb-4">
          <div>
            <h2 className="font-serif text-xl font-bold" style={{ color: BRAND.heading }}>Apply for {listing.title}</h2>
            <p className="text-xs" style={{ color: BRAND.navLink }}>All fields marked * are required</p>
          </div>
          <button onClick={onClose} className="ml-auto p-1.5 hover:bg-gray-100 rounded"><X className="w-4 h-4" /></button>
        </div>
        <form onSubmit={submit} className="space-y-3">
          <input required placeholder="Full Name *" value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} className="w-full px-3 py-2.5 border rounded-lg text-sm" />
          <input required type="email" placeholder="Email *" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full px-3 py-2.5 border rounded-lg text-sm" />
          <input required type="tel" placeholder="Phone *" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full px-3 py-2.5 border rounded-lg text-sm" />
          <input placeholder="Portfolio URL (optional)" value={form.portfolio_url} onChange={(e) => setForm({ ...form, portfolio_url: e.target.value })} className="w-full px-3 py-2.5 border rounded-lg text-sm" />

          {/* CV Upload */}
          <div>
            <label className="block text-xs font-semibold mb-2" style={{ color: BRAND.navLink }}>CV / Resume</label>
            {!resume ? (
              <div
                onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
                onDragLeave={() => setDragOver(false)}
                onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFiles(e.dataTransfer.files) }}
                onClick={() => fileInputRef.current?.click()}
                className="text-center cursor-pointer transition-colors"
                style={{
                  border: dragOver ? "2px solid #E6007E" : "2px dashed rgba(230,0,126,0.35)",
                  borderRadius: 16,
                  background: dragOver ? "rgba(230,0,126,0.08)" : "#FFF1F7",
                  padding: 32,
                }}
              >
                <div style={{ fontSize: 36, color: "#E6007E", lineHeight: 1 }}>📎</div>
                <div className="font-semibold mt-3" style={{ color: BRAND.plum }}>Drag &amp; drop your CV here</div>
                <div className="text-xs my-2" style={{ color: BRAND.navLink }}>or</div>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click() }}
                  className="px-5 py-1.5 rounded-full text-sm font-semibold"
                  style={{ border: "1.5px solid #E6007E", color: "#E6007E", background: "transparent" }}
                >
                  Browse Files
                </button>
                <div className="mt-3" style={{ fontSize: 12, color: "#b06090" }}>Accepted: PDF, DOC, DOCX • Max 5MB</div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => handleFiles(e.target.files)}
                  className="hidden"
                />
              </div>
            ) : (
              <div
                className="inline-flex items-center gap-2"
                style={{
                  background: "white",
                  border: "1px solid rgba(230,0,126,0.2)",
                  borderRadius: 50,
                  padding: "8px 16px",
                }}
              >
                <span>📄</span>
                <span className="text-sm font-medium" style={{ color: BRAND.plum }}>{resume.name}</span>
                <span className="text-xs" style={{ color: BRAND.navLink }}>{formatSize(resume.size)}</span>
                <button type="button" onClick={() => setResume(null)} className="ml-1 text-sm" style={{ color: "#E6007E" }} aria-label="Remove file">✕</button>
              </div>
            )}
          </div>

          <textarea rows={4} placeholder="Cover letter (optional)" value={form.cover_letter} onChange={(e) => setForm({ ...form, cover_letter: e.target.value })} className="w-full px-3 py-2.5 border rounded-lg text-sm" />
          <button type="submit" disabled={submitting} className="w-full py-3 rounded-full text-white font-bold disabled:opacity-60" style={{ background: "#B5005F" }}>
            {submitting ? "Submitting…" : "Submit Application"}
          </button>
        </form>
      </div>
    </div>
  )
}
