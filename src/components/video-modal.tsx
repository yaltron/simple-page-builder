import { AnimatePresence, motion } from "framer-motion"
import { X } from "lucide-react"
import { useEffect } from "react"
import { toYouTubeEmbed } from "@/lib/youtube"

export function VideoModal({
  open,
  onClose,
  src = "https://www.youtube.com/embed/dQw4w9WgXcQ",
  title = "Our Story",
}: {
  open: boolean
  onClose: () => void
  src?: string
  title?: string
}) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose()
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [open, onClose])

  const embedSrc = toYouTubeEmbed(src) ?? src

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.85)", zIndex: 1000000 }}
          onClick={onClose}
        >
          <button
            onClick={(e) => { e.stopPropagation(); onClose() }}
            className="absolute top-5 right-5 text-white p-2"
            aria-label="Close video"
          >
            <X className="w-8 h-8" />
          </button>
          <div
            className="relative w-full max-w-4xl aspect-video rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={embedSrc}
              title={title}
              width="100%"
              height="100%"
              frameBorder={0}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
              loading="lazy"
              className="w-full h-full border-0"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
