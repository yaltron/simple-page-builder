import { useEffect, useState } from "react"
import { createFileRoute } from "@tanstack/react-router"
import { Save, Plus, Trash2, ArrowUp, ArrowDown, ExternalLink } from "lucide-react"
import { AdminShell, AdminLoading } from "@/components/admin/admin-shell"
import { ImageUpload } from "@/components/admin/image-upload"
import { ColorPicker } from "@/components/admin/color-picker"
import { useAdminAuth } from "@/lib/use-admin-auth"
import { supabase } from "@/integrations/supabase/client"
import { toast } from "sonner"

export const Route = createFileRoute("/admin/homepage/")({
  component: AdminHomepagePage,
})

type Tab = "hero" | "sections" | "about"

function AdminHomepagePage() {
  const { loading, isAdmin } = useAdminAuth()
  const [tab, setTab] = useState<Tab>("hero")

  if (loading || !isAdmin) return <AdminLoading />

  return (
    <AdminShell title="Homepage & About" breadcrumb="Admin / Homepage">
      <div className="flex gap-1 mb-5 border-b">
        {[
          { k: "hero", l: "Hero" },
          { k: "sections", l: "Section Content" },
          { k: "about", l: "About" },
        ].map((t) => (
          <button
            key={t.k}
            onClick={() => setTab(t.k as Tab)}
            className="px-4 py-2 text-sm font-semibold border-b-2 transition-colors"
            style={{
              borderColor: tab === t.k ? "#E6007E" : "transparent",
              color: tab === t.k ? "#E6007E" : "#475569",
            }}
          >
            {t.l}
          </button>
        ))}
      </div>

      {tab === "hero" && <HeroEditor />}
      {tab === "sections" && <SectionsEditor />}
      {tab === "about" && <AboutEditor />}
    </AdminShell>
  )
}

// ─────────────────────────────────────────────────────────
// Generic content fetch/save
// ─────────────────────────────────────────────────────────
function useSection<T>(table: "homepage_content" | "about_content", section: string, defaults: T) {
  const [data, setData] = useState<T>(defaults)
  const [loaded, setLoaded] = useState(false)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    ;(async () => {
      const { data: row } = await supabase.from(table).select("content").eq("section", section).maybeSingle()
      if (row?.content) setData({ ...defaults, ...(row.content as object) } as T)
      setLoaded(true)
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [table, section])

  const save = async () => {
    setSaving(true)
    const { data: existing } = await supabase.from(table).select("id").eq("section", section).maybeSingle()
    const { error } = existing
      ? await supabase.from(table).update({ content: data as any }).eq("id", existing.id)
      : await supabase.from(table).insert({ section, content: data as any })
    setSaving(false)
    if (error) toast.error(error.message)
    else toast.success("Saved")
  }

  return { data, setData, loaded, saving, save }
}

function Field({ label, children, hint }: { label: string; children: React.ReactNode; hint?: string }) {
  return (
    <label className="block">
      <div className="text-xs font-semibold text-muted-foreground mb-1">{label}</div>
      {children}
      {hint && <div className="text-[11px] text-muted-foreground mt-1">{hint}</div>}
    </label>
  )
}

function SaveBar({ onSave, saving }: { onSave: () => void; saving: boolean }) {
  return (
    <div className="sticky bottom-0 bg-white border-t -mx-6 px-6 py-3 flex justify-end mt-6">
      <button onClick={onSave} disabled={saving} className="inline-flex items-center gap-2 px-5 py-2 rounded-lg text-white font-semibold disabled:opacity-50" style={{ background: "#E6007E" }}>
        <Save className="w-4 h-4" /> {saving ? "Saving…" : "Save Changes"}
      </button>
    </div>
  )
}

// ─────────────────────────────────────────────────────────
// HERO
// ─────────────────────────────────────────────────────────
const HERO_DEFAULTS = {
  headline: "",
  headline_highlight: "",
  subheadline: "",
  cta_primary_text: "",
  cta_primary_url: "",
  cta_secondary_text: "",
  story_video_url: "",
  story_video_thumbnail: "",
  story_video_thumbnail_alt: "",
  slides: [] as string[],
}

function HeroEditor() {
  const { data, setData, loaded, saving, save } = useSection("homepage_content", "hero", HERO_DEFAULTS)
  if (!loaded) return <div className="text-sm text-muted-foreground">Loading…</div>

  const updateSlide = (i: number, url: string | null) => {
    const next = [...(data.slides || [])]
    if (url) next[i] = url
    setData({ ...data, slides: next })
  }
  const addSlide = () => setData({ ...data, slides: [...(data.slides || []), ""] })
  const removeSlide = (i: number) => setData({ ...data, slides: (data.slides || []).filter((_, j) => j !== i) })

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 bg-white rounded-xl border p-5 space-y-4">
        <Field label="Headline">
          <input value={data.headline} onChange={(e) => setData({ ...data, headline: e.target.value })} className="w-full px-3 py-2 border rounded-lg" />
        </Field>
        <Field label="Highlight word(s) — these appear in pink" hint="Must be a substring of the headline (e.g. 'Your Life').">
          <input value={data.headline_highlight} onChange={(e) => setData({ ...data, headline_highlight: e.target.value })} className="w-full px-3 py-2 border rounded-lg" />
        </Field>
        <Field label="Subheadline">
          <textarea rows={3} value={data.subheadline} onChange={(e) => setData({ ...data, subheadline: e.target.value })} className="w-full px-3 py-2 border rounded-lg" />
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Primary button text">
            <input value={data.cta_primary_text} onChange={(e) => setData({ ...data, cta_primary_text: e.target.value })} className="w-full px-3 py-2 border rounded-lg" />
          </Field>
          <Field label="Primary button URL">
            <input value={data.cta_primary_url} onChange={(e) => setData({ ...data, cta_primary_url: e.target.value })} placeholder="/contact" className="w-full px-3 py-2 border rounded-lg" />
          </Field>
        </div>
        <Field label="'Watch Our Story' button text">
          <input value={data.cta_secondary_text} onChange={(e) => setData({ ...data, cta_secondary_text: e.target.value })} className="w-full px-3 py-2 border rounded-lg" />
        </Field>
        <Field label="Story video URL" hint="YouTube or Vimeo link. Both share URLs and embed URLs work.">
          <input value={data.story_video_url} onChange={(e) => setData({ ...data, story_video_url: e.target.value })} placeholder="https://www.youtube.com/watch?v=…" className="w-full px-3 py-2 border rounded-lg" />
        </Field>
        <Field label="Video thumbnail (optional)">
          <ImageUpload value={data.story_video_thumbnail} onChange={(url) => setData({ ...data, story_video_thumbnail: url || "" })} folder="hero" />
        </Field>
        <Field label="Video thumbnail alt text">
          <input value={data.story_video_thumbnail_alt} onChange={(e) => setData({ ...data, story_video_thumbnail_alt: e.target.value })} className="w-full px-3 py-2 border rounded-lg" />
        </Field>
        <div>
          <div className="flex items-center mb-2">
            <div className="text-xs font-semibold text-muted-foreground">Right-side slideshow images</div>
            <button onClick={addSlide} className="ml-auto text-xs px-2 py-1 rounded border inline-flex items-center gap-1"><Plus className="w-3 h-3" /> Add slide</button>
          </div>
          <div className="space-y-3">
            {(data.slides || []).map((s, i) => (
              <div key={i} className="flex items-start gap-2">
                <div className="flex-1">
                  <ImageUpload value={s} onChange={(url) => updateSlide(i, url)} folder="hero" />
                </div>
                <button onClick={() => removeSlide(i)} className="p-1.5 rounded hover:bg-red-50 text-red-600"><Trash2 className="w-4 h-4" /></button>
              </div>
            ))}
            {(data.slides || []).length === 0 && <div className="text-xs text-muted-foreground">No slides yet — add one above.</div>}
          </div>
        </div>
        <SaveBar onSave={save} saving={saving} />
      </div>

      {/* Live preview */}
      <div className="lg:col-span-1">
        <div className="sticky top-4 bg-white rounded-xl border p-4">
          <div className="text-xs font-semibold text-muted-foreground mb-3">Live Preview</div>
          <div className="rounded-lg overflow-hidden p-5" style={{ background: "linear-gradient(to right, #FFE4EF, #FFFAFC)" }}>
            <h3 className="font-serif text-2xl font-bold text-plum leading-tight mb-3">
              {data.headline.split(data.headline_highlight).map((part, i, arr) => (
                <span key={i}>
                  {part}
                  {i < arr.length - 1 && <span className="text-rose">{data.headline_highlight}</span>}
                </span>
              ))}
            </h3>
            <p className="text-xs text-muted-foreground mb-4 line-clamp-4">{data.subheadline}</p>
            <div className="flex flex-col gap-2">
              <span className="px-3 py-1.5 rounded-full text-white text-xs text-center" style={{ background: "#E6007E" }}>
                {data.cta_primary_text || "Primary button"}
              </span>
              {data.cta_secondary_text && (
                <span className="px-3 py-1.5 rounded-full text-xs text-center border border-plum/30 text-plum">
                  ▶ {data.cta_secondary_text}
                </span>
              )}
            </div>
          </div>
          <a href="/" target="_blank" className="text-xs text-rose mt-3 inline-flex items-center gap-1">
            <ExternalLink className="w-3 h-3" /> Open homepage
          </a>
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────
// MIRACLES
// ─────────────────────────────────────────────────────────
const MIRACLES_DEFAULTS = {
  count: 5000,
  count_suffix: "+",
  heading: "",
  description: "",
  cta_text: "",
  cta_url: "",
}

function MiraclesEditor() {
  const { data, setData, loaded, saving, save } = useSection("homepage_content", "miracles", MIRACLES_DEFAULTS)
  if (!loaded) return <div className="text-sm text-muted-foreground">Loading…</div>
  return (
    <div className="bg-white rounded-xl border p-5 max-w-2xl space-y-4">
      <div className="grid grid-cols-3 gap-3">
        <Field label="Number">
          <input type="number" value={data.count} onChange={(e) => setData({ ...data, count: Number(e.target.value) })} className="w-full px-3 py-2 border rounded-lg" />
        </Field>
        <Field label="Suffix">
          <input value={data.count_suffix} onChange={(e) => setData({ ...data, count_suffix: e.target.value })} className="w-full px-3 py-2 border rounded-lg" />
        </Field>
      </div>
      <Field label="Heading">
        <input value={data.heading} onChange={(e) => setData({ ...data, heading: e.target.value })} className="w-full px-3 py-2 border rounded-lg" />
      </Field>
      <Field label="Description">
        <textarea rows={4} value={data.description} onChange={(e) => setData({ ...data, description: e.target.value })} className="w-full px-3 py-2 border rounded-lg" />
      </Field>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Button text">
          <input value={data.cta_text} onChange={(e) => setData({ ...data, cta_text: e.target.value })} className="w-full px-3 py-2 border rounded-lg" />
        </Field>
        <Field label="Button URL">
          <input value={data.cta_url} onChange={(e) => setData({ ...data, cta_url: e.target.value })} className="w-full px-3 py-2 border rounded-lg" />
        </Field>
      </div>
      <SaveBar onSave={save} saving={saving} />
    </div>
  )
}

// ─────────────────────────────────────────────────────────
// ABOUT
// ─────────────────────────────────────────────────────────
const STORY_DEFAULTS = {
  paragraph_1: "",
  paragraph_2: "",
  images: [] as { url: string; alt: string }[],
}
const MV_DEFAULTS = { mission_title: "", mission_text: "", vision_title: "", vision_text: "" }
const VALUES_DEFAULTS = { items: [] as { icon: string; title: string; description: string }[] }

function AboutEditor() {
  const story = useSection("about_content", "story_images", STORY_DEFAULTS)
  const mv = useSection("about_content", "mission_vision", MV_DEFAULTS)
  const vals = useSection("about_content", "values", VALUES_DEFAULTS)

  const moveImg = (i: number, dir: -1 | 1) => {
    const next = [...story.data.images]
    const j = i + dir
    if (j < 0 || j >= next.length) return
    ;[next[i], next[j]] = [next[j], next[i]]
    story.setData({ ...story.data, images: next })
  }

  return (
    <div className="space-y-6">
      {/* Story */}
      <div className="bg-white rounded-xl border p-5 space-y-4">
        <h3 className="font-bold">Story Images & Text</h3>
        <Field label="Paragraph 1">
          <textarea rows={3} value={story.data.paragraph_1} onChange={(e) => story.setData({ ...story.data, paragraph_1: e.target.value })} className="w-full px-3 py-2 border rounded-lg" />
        </Field>
        <Field label="Paragraph 2">
          <textarea rows={3} value={story.data.paragraph_2} onChange={(e) => story.setData({ ...story.data, paragraph_2: e.target.value })} className="w-full px-3 py-2 border rounded-lg" />
        </Field>
        <div>
          <div className="flex items-center mb-2">
            <div className="text-xs font-semibold text-muted-foreground">Collage images (up to 3)</div>
            {story.data.images.length < 3 && (
              <button
                onClick={() => story.setData({ ...story.data, images: [...story.data.images, { url: "", alt: "" }] })}
                className="ml-auto text-xs px-2 py-1 rounded border inline-flex items-center gap-1"
              >
                <Plus className="w-3 h-3" /> Add image
              </button>
            )}
          </div>
          <div className="space-y-3">
            {story.data.images.map((img, i) => (
              <div key={i} className="flex items-start gap-2 p-3 border rounded-lg">
                <div className="flex flex-col gap-1">
                  <button onClick={() => moveImg(i, -1)} className="p-1 rounded hover:bg-gray-100"><ArrowUp className="w-3 h-3" /></button>
                  <button onClick={() => moveImg(i, 1)} className="p-1 rounded hover:bg-gray-100"><ArrowDown className="w-3 h-3" /></button>
                </div>
                <div className="flex-1 space-y-2">
                  <ImageUpload value={img.url} onChange={(url) => {
                    const next = [...story.data.images]; next[i] = { ...next[i], url: url || "" }
                    story.setData({ ...story.data, images: next })
                  }} folder="about" />
                  <input value={img.alt} onChange={(e) => {
                    const next = [...story.data.images]; next[i] = { ...next[i], alt: e.target.value }
                    story.setData({ ...story.data, images: next })
                  }} placeholder="Alt text" className="w-full px-3 py-2 border rounded-lg text-sm" />
                </div>
                <button onClick={() => story.setData({ ...story.data, images: story.data.images.filter((_, j) => j !== i) })} className="p-1.5 rounded hover:bg-red-50 text-red-600"><Trash2 className="w-4 h-4" /></button>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-end">
          <button onClick={story.save} disabled={story.saving} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white font-semibold disabled:opacity-50" style={{ background: "#E6007E" }}>
            <Save className="w-4 h-4" /> Save Story
          </button>
        </div>
      </div>

      {/* Mission/Vision */}
      <div className="bg-white rounded-xl border p-5 space-y-4">
        <h3 className="font-bold">Mission & Vision</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <Field label="Mission title">
              <input value={mv.data.mission_title} onChange={(e) => mv.setData({ ...mv.data, mission_title: e.target.value })} className="w-full px-3 py-2 border rounded-lg" />
            </Field>
            <Field label="Mission text">
              <textarea rows={4} value={mv.data.mission_text} onChange={(e) => mv.setData({ ...mv.data, mission_text: e.target.value })} className="w-full px-3 py-2 border rounded-lg" />
            </Field>
          </div>
          <div className="space-y-3">
            <Field label="Vision title">
              <input value={mv.data.vision_title} onChange={(e) => mv.setData({ ...mv.data, vision_title: e.target.value })} className="w-full px-3 py-2 border rounded-lg" />
            </Field>
            <Field label="Vision text">
              <textarea rows={4} value={mv.data.vision_text} onChange={(e) => mv.setData({ ...mv.data, vision_text: e.target.value })} className="w-full px-3 py-2 border rounded-lg" />
            </Field>
          </div>
        </div>
        <div className="flex justify-end">
          <button onClick={mv.save} disabled={mv.saving} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white font-semibold disabled:opacity-50" style={{ background: "#E6007E" }}>
            <Save className="w-4 h-4" /> Save Mission & Vision
          </button>
        </div>
      </div>

      {/* Values */}
      <div className="bg-white rounded-xl border p-5 space-y-4">
        <div className="flex items-center">
          <h3 className="font-bold">Values</h3>
          <button onClick={() => vals.setData({ items: [...vals.data.items, { icon: "Sparkles", title: "", description: "" }] })} className="ml-auto text-xs px-2 py-1 rounded border inline-flex items-center gap-1">
            <Plus className="w-3 h-3" /> Add value
          </button>
        </div>
        <div className="space-y-3">
          {vals.data.items.map((v, i) => (
            <div key={i} className="border rounded-lg p-3 grid md:grid-cols-[140px_1fr_2fr_auto] gap-3 items-start">
              <Field label="Icon (lucide name)">
                <input value={v.icon} onChange={(e) => {
                  const next = [...vals.data.items]; next[i] = { ...next[i], icon: e.target.value }
                  vals.setData({ items: next })
                }} placeholder="Sparkles" className="w-full px-2 py-1.5 border rounded text-sm" />
              </Field>
              <Field label="Title">
                <input value={v.title} onChange={(e) => {
                  const next = [...vals.data.items]; next[i] = { ...next[i], title: e.target.value }
                  vals.setData({ items: next })
                }} className="w-full px-2 py-1.5 border rounded text-sm" />
              </Field>
              <Field label="Description">
                <textarea rows={2} value={v.description} onChange={(e) => {
                  const next = [...vals.data.items]; next[i] = { ...next[i], description: e.target.value }
                  vals.setData({ items: next })
                }} className="w-full px-2 py-1.5 border rounded text-sm" />
              </Field>
              <button onClick={() => vals.setData({ items: vals.data.items.filter((_, j) => j !== i) })} className="p-1.5 rounded hover:bg-red-50 text-red-600 mt-5"><Trash2 className="w-4 h-4" /></button>
            </div>
          ))}
          {vals.data.items.length === 0 && <div className="text-xs text-muted-foreground">No values yet.</div>}
        </div>
        <div className="text-[11px] text-muted-foreground">
          Icon names use the lucide-react library. Examples: <code>HeartHandshake</code>, <code>ShieldCheck</code>, <code>Sparkles</code>, <code>Award</code>, <code>Star</code>.
        </div>
        <div className="flex justify-end">
          <button onClick={vals.save} disabled={vals.saving} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white font-semibold disabled:opacity-50" style={{ background: "#E6007E" }}>
            <Save className="w-4 h-4" /> Save Values
          </button>
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────
// SECTION CONTENT (Process, Services, Doctors, CTA, Who We Are, When To Visit)
// ─────────────────────────────────────────────────────────
type GalleryItem = {
  enabled?: boolean
  type?: "image" | "video" | "testimonial" | "quote"
  url?: string
  thumbnail?: string
  alt?: string
  caption?: string
  overlay_kicker?: string
  overlay_text?: string
  glow_color?: string
  overlay_opacity?: number
  autoplay?: boolean
  muted?: boolean
  loop?: boolean
  quote?: string
  author?: string
  rotate?: number
}

type SlotKey =
  | "center_hero"
  | "left_card_1"
  | "left_card_2"
  | "right_card_1"
  | "right_card_2"
  | "far_left_floating_1"
  | "far_left_floating_2"
  | "far_left_floating_3"
  | "far_right_floating_1"
  | "far_right_floating_2"
  | "far_right_floating_3"

const SLOT_LIST: { key: SlotKey; label: string; isHero?: boolean }[] = [
  { key: "center_hero",          label: "Center Hero Image", isHero: true },
  { key: "left_card_1",          label: "Left Card 1" },
  { key: "left_card_2",          label: "Left Card 2" },
  { key: "right_card_1",         label: "Right Card 1" },
  { key: "right_card_2",         label: "Right Card 2" },
  { key: "far_left_floating_1",  label: "Far Left Floating 1" },
  { key: "far_left_floating_2",  label: "Far Left Floating 2" },
  { key: "far_left_floating_3",  label: "Far Left Floating 3" },
  { key: "far_right_floating_1", label: "Far Right Floating 1" },
  { key: "far_right_floating_2", label: "Far Right Floating 2" },
  { key: "far_right_floating_3", label: "Far Right Floating 3" },
]

const WHO_DEFAULTS = {
  enabled: true,
  heading: "Moments That Matter",
  heading_color: "#E6007E",
  subtitle: "Where hope quietly becomes reality.",
  subtitle_color: "",
  gradient_enabled: true,
  gradient_from: "#E6007E",
  gradient_to: "#A78BFA",
  glow_color: "#E6007E",
  glow_intensity: 60,
  background_style: "soft" as "soft" | "cream" | "white" | "dark",
  cta_text: "Explore Stories",
  cta_url: "/success-stories",
  section_spacing: 80,
  card_radius: 24,
  floating_enabled: true,
  animation_speed: 1,
  hover_style: "lift" as "lift" | "tilt" | "zoom" | "none",
  items: [] as GalleryItem[],
}
const WHEN_DEFAULTS = {
  heading: "Signs You Should See a Fertility Specialist",
  heading_color: "#C2185B",
  video_url: "",
  images: [
    { url: "", alt: "" },
    { url: "", alt: "" },
    { url: "", alt: "" },
    { url: "", alt: "" },
  ],
}
const PROCESS_DEFAULTS = {
  heading: "A Simple Guide to Your",
  heading_highlight: "Fertility Journey",
  heading_color: "#E6007E",
}
const SERVICES_HEADING_DEFAULTS = {
  heading: "Comprehensive Fertility Care, Tailored for You",
  heading_color: "#C2185B",
}
const DOCTORS_HEADING_DEFAULTS = {
  heading: "Experienced IVF Specialists Providing Compassionate Fertility Care",
  heading_color: "#C2185B",
}
const CTA_DEFAULTS = {
  heading: "Ready to Start Your Journey to Parenthood?",
  heading_color: "#1A1535",
  subtext:
    "Take the first step towards building your family. Our compassionate team is here to guide you through every step of your fertility journey.",
  primary_text: "Book Consultation",
  primary_url: "/contact",
  secondary_text: "Call: +977 9861141699",
  secondary_url: "tel:+9779861141699",
}

function SectionCard({
  title,
  onSave,
  saving,
  children,
}: {
  title: string
  onSave: () => void
  saving: boolean
  children: React.ReactNode
}) {
  return (
    <div className="bg-white rounded-xl border p-5 space-y-4">
      <h3 className="font-bold">{title}</h3>
      {children}
      <div className="flex justify-end">
        <button
          onClick={onSave}
          disabled={saving}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white font-semibold disabled:opacity-50"
          style={{ background: "#E6007E" }}
        >
          <Save className="w-4 h-4" /> {saving ? "Saving…" : "Save Section"}
        </button>
      </div>
    </div>
  )
}

function SectionsEditor() {
  const who = useSection("homepage_content", "who_we_are", WHO_DEFAULTS)
  const when = useSection("homepage_content", "when_to_visit", WHEN_DEFAULTS)
  const process = useSection("homepage_content", "process", PROCESS_DEFAULTS)
  const services = useSection("homepage_content", "services_heading", SERVICES_HEADING_DEFAULTS)
  const doctors = useSection("homepage_content", "doctors_heading", DOCTORS_HEADING_DEFAULTS)
  const cta = useSection("homepage_content", "cta_banner", CTA_DEFAULTS)

  const updateWhenImg = (i: number, patch: Partial<{ url: string; alt: string }>) => {
    const next = [...when.data.images]
    next[i] = { ...next[i], ...patch }
    when.setData({ ...when.data, images: next })
  }

  // ── Storytelling Gallery item helpers ──
  const items: GalleryItem[] = who.data.items || []
  const setItems = (next: GalleryItem[]) => who.setData({ ...who.data, items: next })
  const addItem = () =>
    setItems([
      ...items,
      { enabled: true, type: "image", size: "medium", position: "auto", glow_color: "#E6007E", overlay_opacity: 0, url: "", alt: "" },
    ])
  const removeItem = (i: number) => setItems(items.filter((_, j) => j !== i))
  const moveItem = (i: number, dir: -1 | 1) => {
    const j = i + dir
    if (j < 0 || j >= items.length) return
    const next = [...items]
    ;[next[i], next[j]] = [next[j], next[i]]
    setItems(next)
  }
  const patchItem = (i: number, patch: Partial<GalleryItem>) => {
    const next = [...items]
    next[i] = { ...next[i], ...patch }
    setItems(next)
  }

  return (
    <div className="space-y-6">
      {/* Storytelling Gallery — Moments That Matter */}
      <SectionCard title="Storytelling Gallery — Moments That Matter" onSave={who.save} saving={who.saving}>
        <div className="grid md:grid-cols-[auto_1fr_1fr] gap-3 items-end">
          <label className="inline-flex items-center gap-2 text-sm font-medium">
            <input type="checkbox" checked={who.data.enabled !== false}
              onChange={(e) => who.setData({ ...who.data, enabled: e.target.checked })} />
            Section enabled
          </label>
          <Field label="Main heading">
            <input value={who.data.heading} onChange={(e) => who.setData({ ...who.data, heading: e.target.value })} className="w-full px-3 py-2 border rounded-lg" />
          </Field>
          <Field label="Subtitle / tagline">
            <input value={who.data.subtitle} onChange={(e) => who.setData({ ...who.data, subtitle: e.target.value })} className="w-full px-3 py-2 border rounded-lg" />
          </Field>
        </div>

        <div className="grid md:grid-cols-2 gap-3 pt-2">
          <div className="space-y-3">
            <label className="inline-flex items-center gap-2 text-sm font-medium">
              <input type="checkbox" checked={who.data.gradient_enabled}
                onChange={(e) => who.setData({ ...who.data, gradient_enabled: e.target.checked })} />
              Use gradient on heading
            </label>
            {who.data.gradient_enabled ? (
              <div className="grid grid-cols-2 gap-3">
                <Field label="Gradient from">
                  <ColorPicker value={who.data.gradient_from} onChange={(c) => who.setData({ ...who.data, gradient_from: c })} />
                </Field>
                <Field label="Gradient to">
                  <ColorPicker value={who.data.gradient_to} onChange={(c) => who.setData({ ...who.data, gradient_to: c })} />
                </Field>
              </div>
            ) : (
              <Field label="Heading color">
                <ColorPicker value={who.data.heading_color} onChange={(c) => who.setData({ ...who.data, heading_color: c })} />
              </Field>
            )}
            <Field label="Subtitle color (optional)">
              <ColorPicker value={who.data.subtitle_color || "#475569"} onChange={(c) => who.setData({ ...who.data, subtitle_color: c })} />
            </Field>
          </div>
          <div className="space-y-3">
            <Field label="Background glow color">
              <ColorPicker value={who.data.glow_color} onChange={(c) => who.setData({ ...who.data, glow_color: c })} />
            </Field>
            <Field label={`Glow intensity (${who.data.glow_intensity}%)`}>
              <input type="range" min={0} max={100} value={who.data.glow_intensity}
                onChange={(e) => who.setData({ ...who.data, glow_intensity: Number(e.target.value) })}
                className="w-full" />
            </Field>
            <Field label="Section background style">
              <select value={who.data.background_style}
                onChange={(e) => who.setData({ ...who.data, background_style: e.target.value as any })}
                className="w-full px-3 py-2 border rounded-lg">
                <option value="soft">Soft pink/violet</option>
                <option value="cream">Cream</option>
                <option value="white">White</option>
                <option value="dark">Dark</option>
              </select>
            </Field>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-3 pt-2">
          <Field label="CTA button text">
            <input value={who.data.cta_text} onChange={(e) => who.setData({ ...who.data, cta_text: e.target.value })} className="w-full px-3 py-2 border rounded-lg" />
          </Field>
          <Field label="CTA button URL">
            <input value={who.data.cta_url} onChange={(e) => who.setData({ ...who.data, cta_url: e.target.value })} className="w-full px-3 py-2 border rounded-lg" />
          </Field>
        </div>

        <div className="grid md:grid-cols-4 gap-3 pt-2">
          <Field label={`Section spacing (${who.data.section_spacing}px)`}>
            <input type="range" min={40} max={200} value={who.data.section_spacing}
              onChange={(e) => who.setData({ ...who.data, section_spacing: Number(e.target.value) })} className="w-full" />
          </Field>
          <Field label={`Card radius (${who.data.card_radius}px)`}>
            <input type="range" min={0} max={48} value={who.data.card_radius}
              onChange={(e) => who.setData({ ...who.data, card_radius: Number(e.target.value) })} className="w-full" />
          </Field>
          <Field label={`Animation speed (${who.data.animation_speed}×)`}>
            <input type="range" min={0.5} max={2} step={0.1} value={who.data.animation_speed}
              onChange={(e) => who.setData({ ...who.data, animation_speed: Number(e.target.value) })} className="w-full" />
          </Field>
          <Field label="Hover style">
            <select value={who.data.hover_style}
              onChange={(e) => who.setData({ ...who.data, hover_style: e.target.value as any })}
              className="w-full px-3 py-2 border rounded-lg">
              <option value="lift">Lift</option>
              <option value="tilt">Tilt</option>
              <option value="zoom">Zoom</option>
              <option value="none">None</option>
            </select>
          </Field>
        </div>
        <label className="inline-flex items-center gap-2 text-sm font-medium pt-1">
          <input type="checkbox" checked={who.data.floating_enabled}
            onChange={(e) => who.setData({ ...who.data, floating_enabled: e.target.checked })} />
          Enable floating animation
        </label>

        {/* Media cards */}
        <div className="pt-4 border-t">
          <div className="flex items-center mb-3">
            <div>
              <div className="font-semibold">Media cards</div>
              <div className="text-xs text-muted-foreground">Add images, videos, testimonials or quote cards. Reorder with arrows.</div>
            </div>
            <button onClick={addItem} className="ml-auto text-sm px-3 py-1.5 rounded-lg border inline-flex items-center gap-1" style={{ borderColor: "#E6007E", color: "#E6007E" }}>
              <Plus className="w-4 h-4" /> Add card
            </button>
          </div>

          <div className="space-y-3">
            {items.length === 0 && (
              <div className="text-xs text-muted-foreground border rounded-lg p-4 text-center">
                No cards yet. Default sample cards will be shown on the homepage until you add some.
              </div>
            )}
            {items.map((it, i) => (
              <div key={i} className="border rounded-lg p-3 grid md:grid-cols-[28px_180px_1fr_auto] gap-3 items-start">
                <div className="flex flex-col gap-1 pt-5">
                  <button onClick={() => moveItem(i, -1)} className="p-1 rounded hover:bg-gray-100"><ArrowUp className="w-3 h-3" /></button>
                  <button onClick={() => moveItem(i, 1)} className="p-1 rounded hover:bg-gray-100"><ArrowDown className="w-3 h-3" /></button>
                </div>

                <div className="space-y-2">
                  <Field label="Type">
                    <select value={it.type || "image"} onChange={(e) => patchItem(i, { type: e.target.value as GalleryItem["type"] })} className="w-full px-2 py-1.5 border rounded text-sm">
                      <option value="image">Image</option>
                      <option value="video">Video</option>
                      <option value="testimonial">Testimonial</option>
                      <option value="quote">Quote</option>
                    </select>
                  </Field>
                  {(it.type === "image" || !it.type || it.type === "video") && (
                    <>
                      <div className="text-[11px] text-muted-foreground">{it.type === "video" ? "Video file URL" : "Image"}</div>
                      <ImageUpload value={it.url} onChange={(url) => patchItem(i, { url: url || "" })} folder="storytelling" />
                      {it.type === "video" && (
                        <div className="space-y-1">
                          <div className="text-[11px] text-muted-foreground">Thumbnail</div>
                          <ImageUpload value={it.thumbnail} onChange={(url) => patchItem(i, { thumbnail: url || "" })} folder="storytelling" />
                        </div>
                      )}
                    </>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <Field label="Size">
                      <select value={it.size || "medium"} onChange={(e) => patchItem(i, { size: e.target.value as GalleryItem["size"] })} className="w-full px-2 py-1.5 border rounded text-sm">
                        <option value="hero">Hero (center)</option>
                        <option value="medium">Medium</option>
                        <option value="small">Small</option>
                        <option value="portrait">Portrait</option>
                        <option value="landscape">Landscape</option>
                      </select>
                    </Field>
                    <Field label="Position">
                      <select value={it.position || "auto"} onChange={(e) => patchItem(i, { position: e.target.value as GalleryItem["position"] })} className="w-full px-2 py-1.5 border rounded text-sm">
                        <option value="auto">Auto layout</option>
                        <option value="center">Center (hero)</option>
                        <option value="top-left">Top left</option>
                        <option value="center-left">Center left</option>
                        <option value="bottom-left">Bottom left</option>
                        <option value="right-top">Right top</option>
                        <option value="floating-right">Floating right</option>
                        <option value="bottom-right">Bottom right</option>
                      </select>
                    </Field>
                  </div>

                  {(it.type === "image" || !it.type || it.type === "video") && (
                    <div className="grid grid-cols-2 gap-2">
                      <Field label="Caption / alt">
                        <input value={it.caption || it.alt || ""} onChange={(e) => patchItem(i, { caption: e.target.value, alt: e.target.value })} className="w-full px-2 py-1.5 border rounded text-sm" />
                      </Field>
                      <Field label="Overlay text (optional)">
                        <input value={it.overlay_text || ""} onChange={(e) => patchItem(i, { overlay_text: e.target.value })} className="w-full px-2 py-1.5 border rounded text-sm" />
                      </Field>
                    </div>
                  )}

                  {(it.size === "hero" || it.position === "center") && (
                    <Field label="Hero kicker (small uppercase label)">
                      <input value={it.overlay_kicker || ""} onChange={(e) => patchItem(i, { overlay_kicker: e.target.value })} className="w-full px-2 py-1.5 border rounded text-sm" />
                    </Field>
                  )}

                  {(it.type === "quote" || it.type === "testimonial") && (
                    <div className="grid grid-cols-2 gap-2">
                      <Field label="Quote text">
                        <textarea rows={2} value={it.quote || ""} onChange={(e) => patchItem(i, { quote: e.target.value })} className="w-full px-2 py-1.5 border rounded text-sm" />
                      </Field>
                      <Field label="Author">
                        <input value={it.author || ""} onChange={(e) => patchItem(i, { author: e.target.value })} className="w-full px-2 py-1.5 border rounded text-sm" />
                      </Field>
                    </div>
                  )}

                  <div className="grid grid-cols-3 gap-2">
                    <Field label="Glow color">
                      <ColorPicker value={it.glow_color || "#E6007E"} onChange={(c) => patchItem(i, { glow_color: c })} />
                    </Field>
                    <Field label={`Overlay opacity (${it.overlay_opacity || 0}%)`}>
                      <input type="range" min={0} max={80} value={it.overlay_opacity || 0}
                        onChange={(e) => patchItem(i, { overlay_opacity: Number(e.target.value) })} className="w-full" />
                    </Field>
                    <Field label={`Rotation (${it.rotate ?? 0}°)`}>
                      <input type="range" min={-8} max={8} value={it.rotate ?? 0}
                        onChange={(e) => patchItem(i, { rotate: Number(e.target.value) })} className="w-full" />
                    </Field>
                  </div>

                  {it.type === "video" && (
                    <div className="flex flex-wrap items-center gap-3 text-xs">
                      <label className="inline-flex items-center gap-1">
                        <input type="checkbox" checked={it.autoplay ?? true} onChange={(e) => patchItem(i, { autoplay: e.target.checked })} /> Autoplay
                      </label>
                      <label className="inline-flex items-center gap-1">
                        <input type="checkbox" checked={it.muted ?? true} onChange={(e) => patchItem(i, { muted: e.target.checked })} /> Muted
                      </label>
                      <label className="inline-flex items-center gap-1">
                        <input type="checkbox" checked={it.loop ?? true} onChange={(e) => patchItem(i, { loop: e.target.checked })} /> Loop
                      </label>
                    </div>
                  )}

                  <label className="inline-flex items-center gap-2 text-xs">
                    <input type="checkbox" checked={it.enabled !== false}
                      onChange={(e) => patchItem(i, { enabled: e.target.checked })} />
                    Card enabled
                  </label>
                </div>

                <button onClick={() => removeItem(i)} className="p-1.5 rounded hover:bg-red-50 text-red-600 mt-5"><Trash2 className="w-4 h-4" /></button>
              </div>
            ))}
          </div>
        </div>
      </SectionCard>

      {/* When To Visit */}
      <SectionCard title="When To Visit" onSave={when.save} saving={when.saving}>
        <Field label="Heading">
          <input value={when.data.heading} onChange={(e) => when.setData({ ...when.data, heading: e.target.value })} className="w-full px-3 py-2 border rounded-lg" />
        </Field>
        <Field label="Heading color">
          <ColorPicker value={when.data.heading_color} onChange={(c) => when.setData({ ...when.data, heading_color: c })} />
        </Field>
        <div>
          <div className="text-xs font-semibold text-muted-foreground mb-1">Video URL</div>
          <input
            value={when.data.video_url || ""}
            onChange={(e) => when.setData({ ...when.data, video_url: e.target.value })}
            placeholder="Paste YouTube or Vimeo URL here..."
            className="w-full"
            style={{ border: "1.5px solid rgba(230,0,126,0.2)", borderRadius: 12, padding: "11px 14px", outline: "none" }}
            onFocus={(e) => (e.currentTarget.style.borderColor = "#E6007E")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(230,0,126,0.2)")}
          />
          <div style={{ fontSize: 12, color: "#b06090", marginTop: 4 }}>Supports YouTube and Vimeo links</div>
        </div>
        <div className="grid md:grid-cols-4 gap-3">
          {when.data.images.map((img, i) => (
            <div key={i} className="border rounded-lg p-3 space-y-2">
              <div className="text-xs font-semibold text-muted-foreground">Image {i + 1}{i === 3 ? " (fallback if no video URL)" : ""}</div>
              <ImageUpload value={img.url} onChange={(url) => updateWhenImg( i, { url: url || "" })} folder="homepage" />
              <input value={img.alt} onChange={(e) => updateWhenImg( i, { alt: e.target.value })} placeholder="Alt text" className="w-full px-2 py-1.5 border rounded text-sm" />
            </div>
          ))}
        </div>
      </SectionCard>

      {/* Process */}
      <SectionCard title="Process Steps Heading" onSave={process.save} saving={process.saving}>
        <div className="grid md:grid-cols-2 gap-3">
          <Field label="Heading">
            <input value={process.data.heading} onChange={(e) => process.setData({ ...process.data, heading: e.target.value })} className="w-full px-3 py-2 border rounded-lg" />
          </Field>
          <Field label="Highlight word(s)" hint="Shown in accent color.">
            <input value={process.data.heading_highlight} onChange={(e) => process.setData({ ...process.data, heading_highlight: e.target.value })} className="w-full px-3 py-2 border rounded-lg" />
          </Field>
        </div>
        <Field label="Highlight color">
          <ColorPicker value={process.data.heading_color} onChange={(c) => process.setData({ ...process.data, heading_color: c })} />
        </Field>
      </SectionCard>

      {/* Services */}
      <SectionCard title="Services Heading" onSave={services.save} saving={services.saving}>
        <Field label="Heading">
          <input value={services.data.heading} onChange={(e) => services.setData({ ...services.data, heading: e.target.value })} className="w-full px-3 py-2 border rounded-lg" />
        </Field>
        <Field label="Heading color">
          <ColorPicker value={services.data.heading_color} onChange={(c) => services.setData({ ...services.data, heading_color: c })} />
        </Field>
      </SectionCard>

      {/* Doctors */}
      <SectionCard title="Doctors Section Heading" onSave={doctors.save} saving={doctors.saving}>
        <Field label="Heading">
          <input value={doctors.data.heading} onChange={(e) => doctors.setData({ ...doctors.data, heading: e.target.value })} className="w-full px-3 py-2 border rounded-lg" />
        </Field>
        <Field label="Heading color">
          <ColorPicker value={doctors.data.heading_color} onChange={(c) => doctors.setData({ ...doctors.data, heading_color: c })} />
        </Field>
      </SectionCard>

      {/* CTA Banner */}
      <SectionCard title="CTA Banner" onSave={cta.save} saving={cta.saving}>
        <Field label="Heading">
          <input value={cta.data.heading} onChange={(e) => cta.setData({ ...cta.data, heading: e.target.value })} className="w-full px-3 py-2 border rounded-lg" />
        </Field>
        <Field label="Heading color">
          <ColorPicker value={cta.data.heading_color} onChange={(c) => cta.setData({ ...cta.data, heading_color: c })} />
        </Field>
        <Field label="Subtext">
          <textarea rows={3} value={cta.data.subtext} onChange={(e) => cta.setData({ ...cta.data, subtext: e.target.value })} className="w-full px-3 py-2 border rounded-lg" />
        </Field>
        <div className="grid md:grid-cols-2 gap-3">
          <Field label="Primary button text">
            <input value={cta.data.primary_text} onChange={(e) => cta.setData({ ...cta.data, primary_text: e.target.value })} className="w-full px-3 py-2 border rounded-lg" />
          </Field>
          <Field label="Primary button URL" hint="Internal path like /contact, or full https:// / tel: URL.">
            <input value={cta.data.primary_url} onChange={(e) => cta.setData({ ...cta.data, primary_url: e.target.value })} className="w-full px-3 py-2 border rounded-lg" />
          </Field>
          <Field label="Secondary button text">
            <input value={cta.data.secondary_text} onChange={(e) => cta.setData({ ...cta.data, secondary_text: e.target.value })} className="w-full px-3 py-2 border rounded-lg" />
          </Field>
          <Field label="Secondary button URL">
            <input value={cta.data.secondary_url} onChange={(e) => cta.setData({ ...cta.data, secondary_url: e.target.value })} className="w-full px-3 py-2 border rounded-lg" />
          </Field>
        </div>
      </SectionCard>
    </div>
  )
}
