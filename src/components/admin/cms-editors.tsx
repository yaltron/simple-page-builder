import { useEffect, useState } from "react"
import { Save, Plus, Trash2, ArrowUp, ArrowDown, ExternalLink, Pencil, X, FileDown } from "lucide-react"
import { ImageUpload } from "@/components/admin/image-upload"
import { ColorPicker } from "@/components/admin/color-picker"
import { MomentsGalleryEditor } from "@/components/admin/moments-gallery-editor"
import { supabase } from "@/integrations/supabase/client"
import { toast } from "sonner"

// ─────────────────────────────────────────────────────────
// Shared helpers
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

function SectionCard({
  title,
  onSave,
  saving,
  saveLabel,
  children,
}: {
  title: string
  onSave: () => void
  saving: boolean
  saveLabel?: string
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
          <Save className="w-4 h-4" /> {saving ? "Saving…" : (saveLabel ?? "Save Section")}
        </button>
      </div>
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

export function HeroEditor() {
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
        <Field label="Highlight word(s) - these appear in pink" hint="Must be a substring of the headline (e.g. 'Your Life').">
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
            {(data.slides || []).length === 0 && <div className="text-xs text-muted-foreground">No slides yet - add one above.</div>}
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
// ABOUT - story / mission-vision / values / why-choose-us / cta-banner
// ─────────────────────────────────────────────────────────
const STORY_DEFAULTS = {
  heading: "Our Story",
  heading_color: "#C2185B",
  paragraph_1: "",
  paragraph_2: "",
  images: [] as { url: string; alt: string }[],
}
const MV_DEFAULTS = {
  mission_title: "",
  mission_text: "",
  vision_title: "",
  vision_text: "",
  mission_icon: "Target",
  vision_icon: "Eye",
}
const VALUES_DEFAULTS = {
  heading: "Our Values",
  heading_color: "#C2185B",
  items: [] as { icon: string; title: string; description: string }[],
}
const WHY_DEFAULTS = {
  heading: "Why Choose Us",
  heading_color: "#C2185B",
  cards: [] as { icon: string; title: string; description: string }[],
}
const CTA_DEFAULTS = {
  heading: "Ready to Start Your Journey?",
  subtext: "Take the first step towards parenthood. Our compassionate team is here for you.",
  button_text: "Book Consultation",
  button_url: "/contact",
}

export function StoryEditor() {
  const story = useSection("about_content", "story_images", STORY_DEFAULTS)

  // Ensure exactly 3 image slots for clarity (1: left top, 2: left bottom, 3: right tall)
  const images = [0, 1, 2].map((i) => story.data.images[i] || { url: "", alt: "" })
  const setImage = (i: number, patch: Partial<{ url: string; alt: string }>) => {
    const next = [...images]
    next[i] = { ...next[i], ...patch }
    story.setData({ ...story.data, images: next })
  }
  const slotLabels = ["Image 1 (left top)", "Image 2 (left bottom)", "Image 3 (right tall)"]

  return (
    <div className="bg-white rounded-xl border p-5 space-y-4">
      <h3 className="font-bold">Our Story</h3>
      <Field label="Section heading">
        <input value={story.data.heading || ""} onChange={(e) => story.setData({ ...story.data, heading: e.target.value })} className="w-full px-3 py-2 border rounded-lg" />
      </Field>
      <Field label="Heading color">
        <ColorPicker value={story.data.heading_color || "#C2185B"} onChange={(c) => story.setData({ ...story.data, heading_color: c })} />
      </Field>
      <Field label="Paragraph 1">
        <textarea rows={3} value={story.data.paragraph_1} onChange={(e) => story.setData({ ...story.data, paragraph_1: e.target.value })} className="w-full px-3 py-2 border rounded-lg" />
      </Field>
      <Field label="Paragraph 2">
        <textarea rows={3} value={story.data.paragraph_2} onChange={(e) => story.setData({ ...story.data, paragraph_2: e.target.value })} className="w-full px-3 py-2 border rounded-lg" />
      </Field>
      <div className="space-y-3">
        {images.map((img, i) => (
          <div key={i} className="p-3 border rounded-lg space-y-2">
            <div className="text-xs font-semibold text-muted-foreground">{slotLabels[i]}</div>
            <ImageUpload value={img.url} onChange={(url) => setImage(i, { url: url || "" })} folder="about" />
            <input value={img.alt} onChange={(e) => setImage(i, { alt: e.target.value })} placeholder="Alt text (for SEO & accessibility)" className="w-full px-3 py-2 border rounded-lg text-sm" />
          </div>
        ))}
      </div>
      <div className="flex justify-end">
        <button onClick={story.save} disabled={story.saving} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white font-semibold disabled:opacity-50" style={{ background: "#E6007E" }}>
          <Save className="w-4 h-4" /> Save Story
        </button>
      </div>
    </div>
  )
}

export function MissionVisionEditor() {
  const mv = useSection("about_content", "mission_vision", MV_DEFAULTS)
  return (
    <div className="bg-white rounded-xl border p-5 space-y-4">
      <h3 className="font-bold">Mission & Vision</h3>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-3">
          <Field label="Mission heading">
            <input value={mv.data.mission_title} onChange={(e) => mv.setData({ ...mv.data, mission_title: e.target.value })} className="w-full px-3 py-2 border rounded-lg" />
          </Field>
          <Field label="Mission text">
            <textarea rows={4} value={mv.data.mission_text} onChange={(e) => mv.setData({ ...mv.data, mission_text: e.target.value })} className="w-full px-3 py-2 border rounded-lg" />
          </Field>
          <Field label="Mission icon (lucide name)" hint="e.g. Target, Heart, Compass">
            <input value={mv.data.mission_icon || "Target"} onChange={(e) => mv.setData({ ...mv.data, mission_icon: e.target.value })} className="w-full px-3 py-2 border rounded-lg" />
          </Field>
        </div>
        <div className="space-y-3">
          <Field label="Vision heading">
            <input value={mv.data.vision_title} onChange={(e) => mv.setData({ ...mv.data, vision_title: e.target.value })} className="w-full px-3 py-2 border rounded-lg" />
          </Field>
          <Field label="Vision text">
            <textarea rows={4} value={mv.data.vision_text} onChange={(e) => mv.setData({ ...mv.data, vision_text: e.target.value })} className="w-full px-3 py-2 border rounded-lg" />
          </Field>
          <Field label="Vision icon (lucide name)" hint="e.g. Eye, Telescope, Star">
            <input value={mv.data.vision_icon || "Eye"} onChange={(e) => mv.setData({ ...mv.data, vision_icon: e.target.value })} className="w-full px-3 py-2 border rounded-lg" />
          </Field>
        </div>
      </div>
      <div className="flex justify-end">
        <button onClick={mv.save} disabled={mv.saving} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white font-semibold disabled:opacity-50" style={{ background: "#E6007E" }}>
          <Save className="w-4 h-4" /> Save Mission & Vision
        </button>
      </div>
    </div>
  )
}

function CardListEditor({
  title,
  items,
  onChange,
}: {
  title: string
  items: { icon: string; title: string; description: string }[]
  onChange: (next: { icon: string; title: string; description: string }[]) => void
}) {
  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir
    if (j < 0 || j >= items.length) return
    const next = [...items]
    ;[next[i], next[j]] = [next[j], next[i]]
    onChange(next)
  }
  return (
    <div className="space-y-3">
      <div className="flex items-center">
        <div className="text-xs font-semibold text-muted-foreground">{title}</div>
        <button onClick={() => onChange([...items, { icon: "Sparkles", title: "", description: "" }])} className="ml-auto text-xs px-2 py-1 rounded border inline-flex items-center gap-1">
          <Plus className="w-3 h-3" /> Add card
        </button>
      </div>
      {items.map((v, i) => (
        <div key={i} className="border rounded-lg p-3 grid md:grid-cols-[36px_160px_1fr_2fr_auto] gap-3 items-start">
          <div className="flex flex-col gap-1">
            <button onClick={() => move(i, -1)} className="p-1 rounded hover:bg-gray-100"><ArrowUp className="w-3 h-3" /></button>
            <button onClick={() => move(i, 1)} className="p-1 rounded hover:bg-gray-100"><ArrowDown className="w-3 h-3" /></button>
          </div>
          <Field label="Icon (lucide name)">
            <input value={v.icon} onChange={(e) => { const next = [...items]; next[i] = { ...next[i], icon: e.target.value }; onChange(next) }} placeholder="Sparkles" className="w-full px-2 py-1.5 border rounded text-sm" />
          </Field>
          <Field label="Title">
            <input value={v.title} onChange={(e) => { const next = [...items]; next[i] = { ...next[i], title: e.target.value }; onChange(next) }} className="w-full px-2 py-1.5 border rounded text-sm" />
          </Field>
          <Field label="Description">
            <textarea rows={2} value={v.description} onChange={(e) => { const next = [...items]; next[i] = { ...next[i], description: e.target.value }; onChange(next) }} className="w-full px-2 py-1.5 border rounded text-sm" />
          </Field>
          <button onClick={() => onChange(items.filter((_, j) => j !== i))} className="p-1.5 rounded hover:bg-red-50 text-red-600 mt-5"><Trash2 className="w-4 h-4" /></button>
        </div>
      ))}
      {items.length === 0 && <div className="text-xs text-muted-foreground">No cards yet.</div>}
      <div className="text-[11px] text-muted-foreground">
        Icon names use the lucide-react library. Examples: <code>HeartHandshake</code>, <code>ShieldCheck</code>, <code>Sparkles</code>, <code>Award</code>, <code>Star</code>.
      </div>
    </div>
  )
}

export function ValuesEditor() {
  const vals = useSection("about_content", "values", VALUES_DEFAULTS)
  return (
    <div className="bg-white rounded-xl border p-5 space-y-4">
      <h3 className="font-bold">Our Values</h3>
      <Field label="Section heading">
        <input value={vals.data.heading || ""} onChange={(e) => vals.setData({ ...vals.data, heading: e.target.value })} className="w-full px-3 py-2 border rounded-lg" />
      </Field>
      <Field label="Heading color">
        <ColorPicker value={vals.data.heading_color || "#C2185B"} onChange={(c) => vals.setData({ ...vals.data, heading_color: c })} />
      </Field>
      <CardListEditor title="Values" items={vals.data.items || []} onChange={(items) => vals.setData({ ...vals.data, items })} />
      <div className="flex justify-end">
        <button onClick={vals.save} disabled={vals.saving} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white font-semibold disabled:opacity-50" style={{ background: "#E6007E" }}>
          <Save className="w-4 h-4" /> Save Values
        </button>
      </div>
    </div>
  )
}

export function WhyChooseUsEditor() {
  const why = useSection("about_content", "why_choose_us", WHY_DEFAULTS)
  return (
    <div className="bg-white rounded-xl border p-5 space-y-4">
      <h3 className="font-bold">Why Choose Us</h3>
      <Field label="Section heading">
        <input value={why.data.heading || ""} onChange={(e) => why.setData({ ...why.data, heading: e.target.value })} className="w-full px-3 py-2 border rounded-lg" />
      </Field>
      <Field label="Heading color">
        <ColorPicker value={why.data.heading_color || "#C2185B"} onChange={(c) => why.setData({ ...why.data, heading_color: c })} />
      </Field>
      <CardListEditor title="Cards" items={why.data.cards || []} onChange={(cards) => why.setData({ ...why.data, cards })} />
      <div className="flex justify-end">
        <button onClick={why.save} disabled={why.saving} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white font-semibold disabled:opacity-50" style={{ background: "#E6007E" }}>
          <Save className="w-4 h-4" /> Save
        </button>
      </div>
    </div>
  )
}

export function AboutCtaBannerEditor() {
  const cta = useSection("about_content", "cta_banner", CTA_DEFAULTS)
  return (
    <div className="bg-white rounded-xl border p-5 space-y-4">
      <h3 className="font-bold">About Page — CTA Banner</h3>
      <Field label="Heading">
        <input value={cta.data.heading || ""} onChange={(e) => cta.setData({ ...cta.data, heading: e.target.value })} className="w-full px-3 py-2 border rounded-lg" />
      </Field>
      <Field label="Subtext">
        <textarea rows={3} value={cta.data.subtext || ""} onChange={(e) => cta.setData({ ...cta.data, subtext: e.target.value })} className="w-full px-3 py-2 border rounded-lg" />
      </Field>
      <div className="grid md:grid-cols-2 gap-4">
        <Field label="Button text">
          <input value={cta.data.button_text || ""} onChange={(e) => cta.setData({ ...cta.data, button_text: e.target.value })} className="w-full px-3 py-2 border rounded-lg" />
        </Field>
        <Field label="Button URL">
          <input value={cta.data.button_url || ""} onChange={(e) => cta.setData({ ...cta.data, button_url: e.target.value })} placeholder="/contact" className="w-full px-3 py-2 border rounded-lg" />
        </Field>
      </div>
      <div className="flex justify-end">
        <button onClick={cta.save} disabled={cta.saving} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white font-semibold disabled:opacity-50" style={{ background: "#E6007E" }}>
          <Save className="w-4 h-4" /> Save
        </button>
      </div>
    </div>
  )
}


// ─────────────────────────────────────────────────────────
// SECTION CONTENT helpers (storytelling slots)
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
  slots: {} as Partial<Record<SlotKey, GalleryItem>>,
}
const WHEN_DEFAULTS = {
  heading: "Signs You Should See a Fertility Specialist",
  heading_color: "#C2185B",
  subtext: "",
  button_text: "Book an Appointment",
  button_url: "/contact",
  video_url: "",
  video_autoplay: false,
  images: [
    { url: "", alt: "" },
    { url: "", alt: "" },
    { url: "", alt: "" },
    { url: "", alt: "" },
  ],
}
const VIRTUAL_TOUR_DEFAULTS = {
  heading: "Take a Virtual Tour of Our Clinic",
  subtext: "Explore our facilities from the comfort of your home.",
  button_text: "Watch Tour Video",
  video_url: "",
  autoplay: false,
  is_active: true,
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

export function WhoWeAreEditor() {
  const who = useSection("homepage_content", "who_we_are", WHO_DEFAULTS)

  return (
    <SectionCard title="Storytelling Gallery - Moments That Matter" onSave={who.save} saving={who.saving} saveLabel="Save Gallery Settings">

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

      <hr className="my-4" />
      <div className="text-sm font-semibold text-gray-800 mb-3">Storytelling Gallery - Moments That Matter</div>
      <MomentsGalleryEditor />

    </SectionCard>
  )
}

type ChecklistItem = { id: string; text: string; order_index: number; is_active: boolean }

export function WhenToVisitEditor() {
  const when = useSection("homepage_content", "when_to_visit", WHEN_DEFAULTS)
  const [items, setItems] = useState<ChecklistItem[]>([])
  const [itemsLoaded, setItemsLoaded] = useState(false)
  const [savingItems, setSavingItems] = useState(false)

  const loadItems = async () => {
    const { data } = await supabase.from("when_to_visit_items").select("*").order("order_index", { ascending: true })
    setItems((data as any) || [])
    setItemsLoaded(true)
  }
  useEffect(() => { loadItems() }, [])

  const updateWhenImg = (i: number, patch: Partial<{ url: string; alt: string }>) => {
    const next = [...(when.data.images || [])]
    while (next.length < 4) next.push({ url: "", alt: "" })
    next[i] = { ...next[i], ...patch }
    when.setData({ ...when.data, images: next })
  }

  const addItem = async () => {
    const order = items.length > 0 ? Math.max(...items.map(i => i.order_index)) + 1 : 1
    const { data, error } = await supabase.from("when_to_visit_items").insert({ text: "", order_index: order, is_active: true }).select().single()
    if (error) return toast.error(error.message)
    setItems([...items, data as any])
  }
  const updateItem = (id: string, patch: Partial<ChecklistItem>) => {
    setItems(items.map(it => it.id === id ? { ...it, ...patch } : it))
  }
  const deleteItem = async (id: string) => {
    if (!confirm("Delete this item?")) return
    const { error } = await supabase.from("when_to_visit_items").delete().eq("id", id)
    if (error) return toast.error(error.message)
    setItems(items.filter(it => it.id !== id))
  }
  const moveItem = (i: number, dir: -1 | 1) => {
    const j = i + dir
    if (j < 0 || j >= items.length) return
    const next = [...items]
    ;[next[i], next[j]] = [next[j], next[i]]
    setItems(next.map((it, idx) => ({ ...it, order_index: idx + 1 })))
  }
  const saveChecklist = async () => {
    setSavingItems(true)
    for (const it of items) {
      await supabase.from("when_to_visit_items").update({ text: it.text, order_index: it.order_index, is_active: it.is_active }).eq("id", it.id)
    }
    setSavingItems(false)
    toast.success("✅ Checklist saved")
  }

  const images = (when.data.images && when.data.images.length >= 4) ? when.data.images : [...(when.data.images || []), ...Array(4 - (when.data.images?.length || 0)).fill({ url: "", alt: "" })]

  return (
    <div className="space-y-5">
      {/* Section settings */}
      <SectionCard title="Section Settings" onSave={when.save} saving={when.saving} saveLabel="Save Section Settings">
        <Field label="Heading">
          <input value={when.data.heading} onChange={(e) => when.setData({ ...when.data, heading: e.target.value })} className="w-full px-3 py-2 border rounded-lg" />
        </Field>
        <Field label="Heading color">
          <ColorPicker value={when.data.heading_color} onChange={(c) => when.setData({ ...when.data, heading_color: c })} />
        </Field>
        <Field label="Subtext (optional)">
          <textarea rows={2} value={when.data.subtext || ""} onChange={(e) => when.setData({ ...when.data, subtext: e.target.value })} className="w-full px-3 py-2 border rounded-lg" />
        </Field>
        <div className="grid md:grid-cols-2 gap-3">
          <Field label="Button text">
            <input value={when.data.button_text || ""} onChange={(e) => when.setData({ ...when.data, button_text: e.target.value })} className="w-full px-3 py-2 border rounded-lg" />
          </Field>
          <Field label="Button URL">
            <input value={when.data.button_url || ""} onChange={(e) => when.setData({ ...when.data, button_url: e.target.value })} placeholder="/contact" className="w-full px-3 py-2 border rounded-lg" />
          </Field>
        </div>
      </SectionCard>

      {/* Checklist items */}
      <div className="bg-white rounded-xl border p-5 space-y-4">
        <div className="flex items-center">
          <h3 className="font-bold">Checklist Items</h3>
          <button onClick={addItem} className="ml-auto text-xs px-3 py-1.5 rounded border inline-flex items-center gap-1"><Plus className="w-3 h-3" /> Add New Item</button>
        </div>
        {!itemsLoaded ? <div className="text-sm text-muted-foreground">Loading…</div> : (
          <div className="space-y-2">
            {items.map((it, i) => (
              <div key={it.id} className="flex items-center gap-2 p-2 border rounded-lg">
                <div className="flex flex-col">
                  <button onClick={() => moveItem(i, -1)} className="p-0.5 hover:bg-gray-100 rounded"><ArrowUp className="w-3 h-3" /></button>
                  <button onClick={() => moveItem(i, 1)} className="p-0.5 hover:bg-gray-100 rounded"><ArrowDown className="w-3 h-3" /></button>
                </div>
                <input
                  value={it.text}
                  onChange={(e) => updateItem(it.id, { text: e.target.value })}
                  className="flex-1 px-3 py-2 border rounded-lg text-sm"
                />
                <label className="inline-flex items-center gap-1.5 text-xs whitespace-nowrap">
                  <input type="checkbox" checked={it.is_active} onChange={(e) => updateItem(it.id, { is_active: e.target.checked })} />
                  Active
                </label>
                <button onClick={() => deleteItem(it.id)} className="p-1.5 hover:bg-red-50 text-red-600 rounded"><Trash2 className="w-4 h-4" /></button>
              </div>
            ))}
            {items.length === 0 && <div className="text-xs text-muted-foreground">No items yet.</div>}
          </div>
        )}
        <div className="flex justify-end">
          <button onClick={saveChecklist} disabled={savingItems} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white font-semibold disabled:opacity-50" style={{ background: "#E6007E" }}>
            <Save className="w-4 h-4" /> {savingItems ? "Saving…" : "Save Checklist"}
          </button>
        </div>
      </div>

      {/* Images */}
      <SectionCard title="Images (4)" onSave={when.save} saving={when.saving} saveLabel="Save Images">
        <div className="grid md:grid-cols-2 gap-3">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="border rounded-lg p-3 space-y-2">
              <div className="text-xs font-semibold text-muted-foreground">Image {i + 1}</div>
              <ImageUpload value={images[i]?.url || ""} onChange={(url) => updateWhenImg(i, { url: url || "" })} folder="homepage" />
              <input value={images[i]?.alt || ""} onChange={(e) => updateWhenImg(i, { alt: e.target.value })} placeholder="Alt text" className="w-full px-2 py-1.5 border rounded text-sm" />
            </div>
          ))}
        </div>
      </SectionCard>

      {/* Video */}
      <SectionCard title="Video" onSave={when.save} saving={when.saving} saveLabel="Save Video">
        <Field label="Video URL" hint="YouTube or Vimeo link">
          <input value={when.data.video_url || ""} onChange={(e) => when.setData({ ...when.data, video_url: e.target.value })} placeholder="https://www.youtube.com/watch?v=…" className="w-full px-3 py-2 border rounded-lg" />
        </Field>
        <label className="inline-flex items-center gap-2 text-sm">
          <input type="checkbox" checked={!!when.data.video_autoplay} onChange={(e) => when.setData({ ...when.data, video_autoplay: e.target.checked })} />
          Autoplay video (muted)
        </label>
      </SectionCard>
    </div>
  )
}

export function VirtualTourEditor() {
  const tour = useSection("homepage_content", "virtual_tour", VIRTUAL_TOUR_DEFAULTS)
  return (
    <SectionCard title="Virtual Tour" onSave={async () => { await tour.save(); toast.success("✅ Virtual tour updated") }} saving={tour.saving} saveLabel="Save Virtual Tour Settings">
      <label className="inline-flex items-center gap-2 text-sm font-medium">
        <input type="checkbox" checked={tour.data.is_active !== false} onChange={(e) => tour.setData({ ...tour.data, is_active: e.target.checked })} />
        Section visible on Gallery page
      </label>
      <Field label="Heading">
        <input value={tour.data.heading} onChange={(e) => tour.setData({ ...tour.data, heading: e.target.value })} className="w-full px-3 py-2 border rounded-lg" />
      </Field>
      <Field label="Subtext (optional)">
        <textarea rows={2} value={tour.data.subtext || ""} onChange={(e) => tour.setData({ ...tour.data, subtext: e.target.value })} className="w-full px-3 py-2 border rounded-lg" />
      </Field>
      <Field label="Button text">
        <input value={tour.data.button_text} onChange={(e) => tour.setData({ ...tour.data, button_text: e.target.value })} className="w-full px-3 py-2 border rounded-lg" />
      </Field>
      <Field label="YouTube or Vimeo URL" hint="Paste the full video URL">
        <input value={tour.data.video_url} onChange={(e) => tour.setData({ ...tour.data, video_url: e.target.value })} placeholder="https://youtube.com/..." className="w-full px-3 py-2 border rounded-lg" />
      </Field>
      <label className="inline-flex items-center gap-2 text-sm">
        <input type="checkbox" checked={!!tour.data.autoplay} onChange={(e) => tour.setData({ ...tour.data, autoplay: e.target.checked })} />
        Autoplay video when opened (muted)
      </label>
    </SectionCard>
  )
}

export function ProcessStepsEditor() {
  const process = useSection("homepage_content", "process", PROCESS_DEFAULTS)
  return (
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
  )
}

export function ServicesHeadingEditor() {
  const services = useSection("homepage_content", "services_heading", SERVICES_HEADING_DEFAULTS)
  return (
    <SectionCard title="Services Heading" onSave={services.save} saving={services.saving}>
      <Field label="Heading">
        <input value={services.data.heading} onChange={(e) => services.setData({ ...services.data, heading: e.target.value })} className="w-full px-3 py-2 border rounded-lg" />
      </Field>
      <Field label="Heading color">
        <ColorPicker value={services.data.heading_color} onChange={(c) => services.setData({ ...services.data, heading_color: c })} />
      </Field>
    </SectionCard>
  )
}

export function DoctorsHeadingEditor() {
  const doctors = useSection("homepage_content", "doctors_heading", DOCTORS_HEADING_DEFAULTS)
  return (
    <SectionCard title="Doctors Section Heading" onSave={doctors.save} saving={doctors.saving}>
      <Field label="Heading">
        <input value={doctors.data.heading} onChange={(e) => doctors.setData({ ...doctors.data, heading: e.target.value })} className="w-full px-3 py-2 border rounded-lg" />
      </Field>
      <Field label="Heading color">
        <ColorPicker value={doctors.data.heading_color} onChange={(c) => doctors.setData({ ...doctors.data, heading_color: c })} />
      </Field>
    </SectionCard>
  )
}

export function CTABannerEditor() {
  const cta = useSection("homepage_content", "cta_banner", CTA_DEFAULTS)
  return (
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
  )
}

// ─────────────────────────────────────────────────────────
// CAREER - Job listings + Applications
// ─────────────────────────────────────────────────────────
type Listing = {
  id?: string
  title: string
  department: string
  type: string
  location: string
  experience: string
  description: string
  requirements: string
  is_active: boolean
  deadline: string | null
}

const emptyListing: Listing = {
  title: "", department: "", type: "Full-time", location: "Kathmandu, Nepal",
  experience: "", description: "", requirements: "",
  is_active: true, deadline: null,
}

export function JobListings() {
  const [items, setItems] = useState<any[]>([])
  const [editing, setEditing] = useState<Listing | null>(null)

  const load = async () => {
    const { data, error } = await supabase.from("career_listings").select("*").order("created_at", { ascending: false })
    if (error) toast.error(error.message)
    setItems(data || [])
  }
  useEffect(() => { load() }, [])

  const save = async () => {
    if (!editing) return
    if (!editing.title.trim()) return toast.error("Title required")
    const payload = { ...editing, deadline: editing.deadline || null }
    const { error } = editing.id
      ? await supabase.from("career_listings").update(payload).eq("id", editing.id)
      : await supabase.from("career_listings").insert(payload)
    if (error) return toast.error(error.message)
    toast.success("Saved"); setEditing(null); load()
  }

  const remove = async (id: string) => {
    if (!confirm("Delete this listing?")) return
    const { error } = await supabase.from("career_listings").delete().eq("id", id)
    if (error) return toast.error(error.message)
    toast.success("Deleted"); load()
  }

  const toggle = async (j: any) => {
    await supabase.from("career_listings").update({ is_active: !j.is_active }).eq("id", j.id)
    load()
  }

  return (
    <>
      <div className="flex items-center mb-4">
        <h2 className="text-sm text-muted-foreground">{items.length} listing(s)</h2>
        <button onClick={() => setEditing({ ...emptyListing })} className="ml-auto inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white font-semibold" style={{ background: "#E6007E" }}>
          <Plus className="w-4 h-4" /> New Listing
        </button>
      </div>

      <div className="bg-white rounded-xl border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-xs uppercase text-muted-foreground">
            <tr>
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Department</th>
              <th className="p-3 text-left">Type</th>
              <th className="p-3">Status</th>
              <th className="p-3"></th>
            </tr>
          </thead>
          <tbody>
            {items.map((j) => (
              <tr key={j.id} className="border-t">
                <td className="p-3 font-medium">{j.title}</td>
                <td className="p-3">{j.department || "-"}</td>
                <td className="p-3">{j.type || "-"}</td>
                <td className="p-3 text-center">
                  <button onClick={() => toggle(j)} className="text-[10px] px-2 py-0.5 rounded-full font-semibold" style={{ background: j.is_active ? "#dcfce7" : "#f1f5f9", color: j.is_active ? "#166534" : "#475569" }}>
                    {j.is_active ? "Active" : "Hidden"}
                  </button>
                </td>
                <td className="p-3 text-right">
                  <button onClick={() => setEditing(j)} className="p-1.5 rounded hover:bg-gray-100"><Pencil className="w-3.5 h-3.5" /></button>
                  <button onClick={() => remove(j.id)} className="p-1.5 rounded hover:bg-red-50 text-red-600"><Trash2 className="w-3.5 h-3.5" /></button>
                </td>
              </tr>
            ))}
            {items.length === 0 && <tr><td colSpan={5} className="p-10 text-center text-muted-foreground">No listings.</td></tr>}
          </tbody>
        </table>
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 bg-black/50 flex justify-end" onClick={() => setEditing(null)}>
          <div className="w-full max-w-xl bg-white h-full overflow-auto p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center mb-5">
              <h2 className="font-bold text-lg">{editing.id ? "Edit" : "New"} Listing</h2>
              <button onClick={() => setEditing(null)} className="ml-auto p-1.5 hover:bg-gray-100 rounded"><X className="w-4 h-4" /></button>
            </div>
            <div className="space-y-3">
              <Field label="Title *"><input value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} className="w-full px-3 py-2 border rounded-lg" /></Field>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Department"><input value={editing.department} onChange={(e) => setEditing({ ...editing, department: e.target.value })} className="w-full px-3 py-2 border rounded-lg" /></Field>
                <Field label="Type">
                  <select value={editing.type} onChange={(e) => setEditing({ ...editing, type: e.target.value })} className="w-full px-3 py-2 border rounded-lg bg-white">
                    <option>Full-time</option><option>Part-time</option><option>Contract</option><option>Internship</option>
                  </select>
                </Field>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Location"><input value={editing.location} onChange={(e) => setEditing({ ...editing, location: e.target.value })} className="w-full px-3 py-2 border rounded-lg" /></Field>
                <Field label="Experience"><input placeholder="e.g. 2-4 years" value={editing.experience} onChange={(e) => setEditing({ ...editing, experience: e.target.value })} className="w-full px-3 py-2 border rounded-lg" /></Field>
              </div>
              <Field label="Description"><textarea rows={4} value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })} className="w-full px-3 py-2 border rounded-lg" /></Field>
              <Field label="Requirements"><textarea rows={4} value={editing.requirements} onChange={(e) => setEditing({ ...editing, requirements: e.target.value })} className="w-full px-3 py-2 border rounded-lg" /></Field>
              <Field label="Application Deadline"><input type="date" value={editing.deadline || ""} onChange={(e) => setEditing({ ...editing, deadline: e.target.value || null })} className="w-full px-3 py-2 border rounded-lg" /></Field>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={editing.is_active} onChange={(e) => setEditing({ ...editing, is_active: e.target.checked })} />
                Active (visible on /career page)
              </label>
              <button onClick={save} className="w-full py-2.5 rounded-lg text-white font-semibold" style={{ background: "#E6007E" }}>Save</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

const STATUSES = ["new", "reviewing", "shortlisted", "rejected", "hired"]
const STATUS_COLORS: Record<string, { bg: string; fg: string }> = {
  new: { bg: "#fce7f3", fg: "#9d174d" },
  reviewing: { bg: "#fef3c7", fg: "#92400e" },
  shortlisted: { bg: "#dbeafe", fg: "#1e40af" },
  rejected: { bg: "#f1f5f9", fg: "#475569" },
  hired: { bg: "#dcfce7", fg: "#166534" },
}

export function CareerApplications() {
  const [items, setItems] = useState<any[]>([])
  const [filter, setFilter] = useState<string>("all")

  const load = async () => {
    const { data, error } = await supabase.from("career_applications").select("*").order("created_at", { ascending: false })
    if (error) toast.error(error.message)
    setItems(data || [])
  }
  useEffect(() => { load() }, [])

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase.from("career_applications").update({ status }).eq("id", id)
    if (error) return toast.error(error.message)
    toast.success("Updated"); load()
  }

  const viewResume = async (path: string) => {
    const { data, error } = await supabase.storage.from("resumes").createSignedUrl(path, 60 * 5)
    if (error) return toast.error(error.message)
    window.open(data.signedUrl, "_blank")
  }

  const remove = async (id: string) => {
    if (!confirm("Delete this application?")) return
    const { error } = await supabase.from("career_applications").delete().eq("id", id)
    if (error) return toast.error(error.message)
    toast.success("Deleted"); load()
  }

  const filtered = filter === "all" ? items : items.filter((i) => i.status === filter)

  return (
    <>
      <div className="flex items-center gap-3 mb-4 flex-wrap">
        <select value={filter} onChange={(e) => setFilter(e.target.value)} className="px-3 py-2 border rounded-lg bg-white text-sm">
          <option value="all">All</option>
          {STATUSES.map((s) => <option key={s}>{s}</option>)}
        </select>
        <div className="text-sm text-muted-foreground ml-auto">{filtered.length} application(s)</div>
      </div>

      <div className="bg-white rounded-xl border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-xs uppercase text-muted-foreground">
            <tr>
              <th className="p-3 text-left">Applicant</th>
              <th className="p-3 text-left">Position</th>
              <th className="p-3 text-left">Contact</th>
              <th className="p-3">Resume</th>
              <th className="p-3">Status</th>
              <th className="p-3"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((a) => {
              const c = STATUS_COLORS[a.status] || STATUS_COLORS.new
              return (
                <tr key={a.id} className="border-t align-top">
                  <td className="p-3">
                    <div className="font-medium">{a.full_name}</div>
                    <div className="text-xs text-muted-foreground">{new Date(a.created_at).toLocaleDateString()}</div>
                  </td>
                  <td className="p-3">{a.position}</td>
                  <td className="p-3 text-xs">
                    <div>{a.email}</div>
                    <div className="text-muted-foreground">{a.phone}</div>
                  </td>
                  <td className="p-3 text-center">
                    {a.resume_url ? (
                      <button onClick={() => viewResume(a.resume_url)} className="inline-flex items-center gap-1 text-xs text-pink-700 hover:underline">
                        <FileDown className="w-3.5 h-3.5" /> View
                      </button>
                    ) : "-"}
                  </td>
                  <td className="p-3 text-center">
                    <select
                      value={a.status}
                      onChange={(e) => updateStatus(a.id, e.target.value)}
                      className="text-[11px] px-2 py-1 rounded-full font-semibold border-0 outline-none"
                      style={{ background: c.bg, color: c.fg }}
                    >
                      {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </td>
                  <td className="p-3 text-right">
                    <button onClick={() => remove(a.id)} className="p-1.5 rounded hover:bg-red-50 text-red-600"><Trash2 className="w-3.5 h-3.5" /></button>
                  </td>
                </tr>
              )
            })}
            {filtered.length === 0 && <tr><td colSpan={6} className="p-10 text-center text-muted-foreground">No applications.</td></tr>}
          </tbody>
        </table>
      </div>
    </>
  )
}
