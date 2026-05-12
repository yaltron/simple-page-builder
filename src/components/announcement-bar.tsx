import { useEffect, useState } from "react"
import { X } from "lucide-react"
import { supabase } from "@/integrations/supabase/client"

type Cfg = {
  is_active?: boolean
  message?: string
  link_text?: string
  link_url?: string
  background_color?: string
  text_color?: string
}

export function AnnouncementBar() {
  const [cfg, setCfg] = useState<Cfg | null>(null)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem("ann_bar_dismissed") === "1") setDismissed(true)
    ;(async () => {
      const { data } = await supabase.from("site_settings").select("value").eq("key", "announcement_bar").maybeSingle()
      if (data?.value) setCfg(data.value as Cfg)
    })()
  }, [])

  if (!cfg?.is_active || dismissed || !cfg.message) return null

  const dismiss = () => {
    sessionStorage.setItem("ann_bar_dismissed", "1")
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
