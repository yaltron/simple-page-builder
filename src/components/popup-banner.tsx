import { useEffect, useState } from "react"
import { useRouterState } from "@tanstack/react-router"
import { AnimatePresence, motion } from "framer-motion"
import { X } from "lucide-react"
import { supabase } from "@/integrations/supabase/client"

type Banner = {
  id: string
  title: string | null
  description: string | null
  image_url: string | null
  image_alt: string | null
  button_text: string | null
  button_url: string | null
  show_after_seconds: number
  show_on_pages: string[]
  show_once_per_session: boolean
  background_color: string | null
  start_date: string | null
  end_date: string | null
}

const PAGE_KEY: Record<string, string> = {
  "/": "homepage",
  "/blog": "blog",
  "/services": "services",
  "/contact": "contact",
  "/about": "about",
  "/team": "team",
  "/success-stories": "stories",
  "/faqs": "faqs",
}

function matchesPage(pages: string[], pathname: string) {
  if (!pages || pages.length === 0) return true
  if (pages.includes("all")) return true
  const key = PAGE_KEY[pathname]
  if (key && pages.includes(key)) return true
  return pages.some((p) => p === pathname)
}

function withinDateRange(b: Banner) {
  const today = new Date().toISOString().slice(0, 10)
  if (b.start_date && today < b.start_date) return false
  if (b.end_date && today > b.end_date) return false
  return true
}

export function PopupBanner() {
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  const [banner, setBanner] = useState<Banner | null>(null)
  const [open, setOpen] = useState(false)

  // Skip on admin pages entirely
  const isAdmin = pathname.startsWith("/admin")

  useEffect(() => {
    if (isAdmin) return
    let cancelled = false
    ;(async () => {
      const { data } = await supabase
        .from("popup_banners")
        .select("*")
        .eq("is_active", true)
        .order("updated_at", { ascending: false })
        .limit(1)
        .maybeSingle()
      if (cancelled || !data) return
      const b = data as Banner
      if (!withinDateRange(b)) return
      if (!matchesPage(b.show_on_pages || ["all"], pathname)) return
      if (b.show_once_per_session && sessionStorage.getItem(`popup-seen-${b.id}`)) return
      setBanner(b)
      const t = setTimeout(() => setOpen(true), Math.max(0, (b.show_after_seconds || 0) * 1000))
      return () => clearTimeout(t)
    })()
    return () => {
      cancelled = true
    }
  }, [pathname, isAdmin])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open])

  const close = () => {
    if (banner?.show_once_per_session) {
      sessionStorage.setItem(`popup-seen-${banner.id}`, "1")
    }
    setOpen(false)
  }

  return <PopupBannerView open={open && !!banner} banner={banner} onClose={close} />
}

export function PopupBannerView({
  open,
  banner,
  onClose,
}: {
  open: boolean
  banner: Banner | null
  onClose: () => void
}) {
  return (
    <AnimatePresence>
      {open && banner && (
        <motion.div
          key="overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.6)" }}
        >
          <motion.div
            key="card"
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
            className="relative w-full max-w-[480px] rounded-[24px] overflow-hidden shadow-2xl"
            style={{ background: banner.background_color || "#FFFFFF" }}
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white/90 hover:bg-white shadow flex items-center justify-center"
            >
              <X className="w-4 h-4 text-plum" />
            </button>
            {banner.image_url && (
              <img
                src={banner.image_url}
                alt={banner.image_alt || banner.title || ""}
                className="w-full h-56 object-cover"
                style={{ borderTopLeftRadius: 24, borderTopRightRadius: 24 }}
              />
            )}
            <div className="p-6 space-y-3">
              {banner.title && (
                <h3 className="font-serif text-2xl font-bold" style={{ color: "#C2185B" }}>
                  {banner.title}
                </h3>
              )}
              {banner.description && (
                <p className="text-sm text-muted-foreground leading-relaxed">{banner.description}</p>
              )}
              {banner.button_text && banner.button_url && (
                <a
                  href={banner.button_url}
                  className="block w-full text-center mt-2 py-3 rounded-full font-semibold text-white transition-transform hover:scale-[1.02]"
                  style={{ background: "#E6007E" }}
                >
                  {banner.button_text}
                </a>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
