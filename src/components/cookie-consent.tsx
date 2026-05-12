import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { fetchSettings } from "@/lib/site-settings"

type Cfg = { is_active: boolean; message: string; policy_url: string }
const DEFAULTS: Cfg = { is_active: false, message: "", policy_url: "" }

export function CookieConsent() {
  const [cfg, setCfg] = useState<Cfg | null>(null)
  const [show, setShow] = useState(false)

  useEffect(() => {
    try {
      if (typeof localStorage !== "undefined" && localStorage.getItem("cookie_consent") === "accepted") return
    } catch { return }
    let cancelled = false
    fetchSettings<Cfg>("cookie_consent", DEFAULTS).then((v) => {
      if (cancelled) return
      if (v.is_active && v.message) { setCfg(v); setShow(true) }
    }).catch(() => {})
    return () => { cancelled = true }
  }, [])

  const accept = () => {
    try { localStorage.setItem("cookie_consent", "accepted") } catch {}
    setShow(false)
  }

  return (
    <AnimatePresence>
      {show && cfg && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:bottom-6 md:max-w-md bg-white rounded-2xl shadow-2xl border p-5"
          style={{ zIndex: 99999, borderColor: "#F2DCE8" }}
        >
          <p className="text-sm mb-3" style={{ color: "#2D0A1E" }}>
            {cfg.message}{" "}
            {cfg.policy_url && (
              <a href={cfg.policy_url} className="underline font-semibold" style={{ color: "#E6007E" }}>
                Learn more
              </a>
            )}
          </p>
          <div className="flex gap-2 justify-end">
            <button onClick={accept} className="px-4 py-2 rounded-full text-white text-sm font-bold" style={{ background: "#E6007E" }}>
              Accept
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
