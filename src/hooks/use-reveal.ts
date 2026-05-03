import { useEffect } from "react"

export function useReveal() {
  useEffect(() => {
    const reveal = () => {
      const els = document.querySelectorAll<HTMLElement>(".reveal:not(.in-view)")
      if (!els.length) return
      if (typeof IntersectionObserver === "undefined") {
        els.forEach((el) => el.classList.add("in-view"))
        return
      }
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("in-view")
              obs.unobserve(e.target)
            }
          })
        },
        { threshold: 0.05, rootMargin: "0px 0px -5% 0px" }
      )
      els.forEach((el) => obs.observe(el))
      return obs
    }
    const obs = reveal()
    // Re-scan on later DOM additions
    const mo = new MutationObserver(() => reveal())
    mo.observe(document.body, { childList: true, subtree: true })
    // Safety fallback: ensure visible after 1.5s
    const t = setTimeout(() => {
      document.querySelectorAll(".reveal:not(.in-view)").forEach((el) => el.classList.add("in-view"))
    }, 1500)
    return () => { obs?.disconnect(); mo.disconnect(); clearTimeout(t) }
  }, [])
}
