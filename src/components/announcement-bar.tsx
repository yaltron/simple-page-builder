import { useEffect, useState } from "react"
import { X } from "lucide-react"
import { fetchSettings } from "@/lib/site-settings"

type Cfg = {
  is_active: boolean
  message: string
  link_text: string
  link_url: string
  background_color: string
  text_color: string
}

const DEFAULTS: Cfg = {
  is_active: false,
  message: "",
  link_text: "",
  link_url: "",
  background_color: "#E6007E",
  text_color: "#FFFFFF",
}

export function AnnouncementBar() {
  const [cfg, setCfg] = useState<Cfg | null>(null)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    try {
      if (typeof sessionStorage !== "undefined" && sessionStorage.getItem("ann_bar_dismissed") === "1") {
        setDismissed(true)
      }
    } catch {}
    let cancelled = false
    fetchSettings<Cfg>("announcement_bar", DEFAULTS)
      .then((v) => { if (!cancelled) setCfg(v) })
      .catch(() => { if (!cancelled) setCfg(DEFAULTS) })
    return () => { cancelled = true }
  }, [])

  if (!cfg || !cfg.is_active || dismissed || !cfg.message) return null

  const dismiss = () => {
    try { sessionStorage.setItem("ann_bar_dismissed", "1") } catch {}
    setDismissed(true)
  }

  return (
    <div style={{ background: cfg.background_color || "#E6007E", color: cfg.text_color || "#fff" }} className="w-full text-sm">
      <div className="max-w-7xl mx-auto flex items-center gap-3 px-4 py-2">
        <p className="flex-1 text-center font-medium">
          {cfg.message}
          {cfg.link_url && cfg.link_text && (
            <a href={cfg.link_url} className="underline ml-2 font-bold">{cfg.link_text}</a>
          )}
        </p>
        <button onClick={dismiss} aria-label="Dismiss announcement" className="opacity-80 hover:opacity-100">
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
