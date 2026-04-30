import { useEffect, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

/**
 * Soft rose cursor follower with spring lag. Expands and shifts to a
 * rose-tinted blend when hovering over interactive elements.
 *
 * Auto-hides on touch / coarse-pointer devices.
 */
export function CustomCursor() {
  const [enabled, setEnabled] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  // Spring config for the lagging follower
  const springConfig = { damping: 22, stiffness: 280, mass: 0.5 }
  const x = useSpring(mouseX, springConfig)
  const y = useSpring(mouseY, springConfig)

  useEffect(() => {
    // Only run on devices with a fine pointer (real mouse)
    if (typeof window === "undefined") return
    const fine = window.matchMedia("(pointer: fine)").matches
    if (!fine) return
    setEnabled(true)

    const handleMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      if (!isVisible) setIsVisible(true)

      // Determine if pointer is over an interactive element
      const target = e.target as HTMLElement | null
      if (!target) return
      const interactive = target.closest(
        'button, a, [role="button"], [data-cursor="hover"], input, select, textarea, label[for]'
      )
      setIsHovering(Boolean(interactive))
    }

    const handleLeave = () => setIsVisible(false)
    const handleEnter = () => setIsVisible(true)

    window.addEventListener("mousemove", handleMove)
    document.addEventListener("mouseleave", handleLeave)
    document.addEventListener("mouseenter", handleEnter)

    return () => {
      window.removeEventListener("mousemove", handleMove)
      document.removeEventListener("mouseleave", handleLeave)
      document.removeEventListener("mouseenter", handleEnter)
    }
  }, [mouseX, mouseY, isVisible])

  if (!enabled) return null

  const baseSize = 20
  const hoverSize = 40
  const size = isHovering ? hoverSize : baseSize

  return (
    <motion.div
      aria-hidden="true"
      className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full"
      style={{
        x,
        y,
        translateX: "-50%",
        translateY: "-50%",
        width: size,
        height: size,
        background: isHovering
          ? "color-mix(in oklab, var(--rose) 30%, transparent)"
          : "var(--rose)",
        mixBlendMode: isHovering ? "difference" : "normal",
        opacity: isVisible ? (isHovering ? 1 : 0.6) : 0,
        transition:
          "width 200ms ease, height 200ms ease, background 200ms ease, opacity 200ms ease, mix-blend-mode 0ms",
      }}
    />
  )
}
