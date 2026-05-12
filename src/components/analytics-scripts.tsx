import { useEffect } from "react"
import { fetchSettings } from "@/lib/site-settings"

declare global {
  interface Window { dataLayer?: any[]; Tawk_API?: any; Tawk_LoadStart?: Date }
}

type Cfg = { ga4_id: string; tawk_property_id: string; tawk_widget_id: string }
const DEFAULTS: Cfg = { ga4_id: "", tawk_property_id: "", tawk_widget_id: "" }

const isValidId = (v: unknown): v is string =>
  typeof v === "string" && v.trim().length > 0 && /^[\w.-]+$/.test(v.trim())

function injectGa4(id: string) {
  try {
    if (document.getElementById("ga4-src")) return
    const s = document.createElement("script")
    s.id = "ga4-src"
    s.async = true
    s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`
    s.onerror = () => { try { s.remove() } catch {} }
    document.head.appendChild(s)
    const inline = document.createElement("script")
    inline.id = "ga4-init"
    inline.text = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${id}');`
    document.head.appendChild(inline)
  } catch {}
}

function injectTawk(propertyId: string, widgetId: string) {
  try {
    if (document.getElementById("tawk-src")) return
    window.Tawk_API = window.Tawk_API || {}
    window.Tawk_LoadStart = new Date()
    const s = document.createElement("script")
    s.id = "tawk-src"
    s.async = true
    s.src = `https://embed.tawk.to/${encodeURIComponent(propertyId)}/${encodeURIComponent(widgetId)}`
    s.charset = "UTF-8"
    s.setAttribute("crossorigin", "*")
    s.onerror = () => { try { s.remove() } catch {} }
    document.body.appendChild(s)
  } catch {}
}

export function AnalyticsScripts() {
  useEffect(() => {
    let cancelled = false
    fetchSettings<Cfg>("analytics", DEFAULTS).then((v) => {
      if (cancelled) return
      if (isValidId(v.ga4_id)) injectGa4(v.ga4_id.trim())
      if (isValidId(v.tawk_property_id) && isValidId(v.tawk_widget_id)) {
        injectTawk(v.tawk_property_id.trim(), v.tawk_widget_id.trim())
      }
    }).catch(() => {})
    return () => { cancelled = true }
  }, [])

  return null
}
