import { useEffect } from "react"
import { supabase } from "@/integrations/supabase/client"

declare global {
  interface Window { dataLayer?: any[]; Tawk_API?: any; Tawk_LoadStart?: Date }
}

export function AnalyticsScripts() {
  useEffect(() => {
    ;(async () => {
      const { data } = await supabase.from("site_settings").select("value").eq("key", "analytics").maybeSingle()
      const v: any = data?.value || {}

      // GA4
      if (v.ga4_id && !document.getElementById("ga4-src")) {
        const s = document.createElement("script")
        s.id = "ga4-src"; s.async = true
        s.src = `https://www.googletagmanager.com/gtag/js?id=${v.ga4_id}`
        document.head.appendChild(s)
        const inline = document.createElement("script")
        inline.id = "ga4-init"
        inline.innerHTML = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${v.ga4_id}');`
        document.head.appendChild(inline)
      }

      // Tawk.to
      if (v.tawk_property_id && v.tawk_widget_id && !document.getElementById("tawk-src")) {
        window.Tawk_API = window.Tawk_API || {}
        window.Tawk_LoadStart = new Date()
        const s = document.createElement("script")
        s.id = "tawk-src"; s.async = true
        s.src = `https://embed.tawk.to/${v.tawk_property_id}/${v.tawk_widget_id}`
        s.charset = "UTF-8"
        s.setAttribute("crossorigin", "*")
        document.body.appendChild(s)
      }
    })()
  }, [])

  return null
}
