import { useRef, type ReactNode, type MouseEvent } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

interface MagneticProps {
  children: ReactNode
  /** Distance from the element edge that begins attracting the cursor (px) */
  range?: number
  /** Maximum displacement (px) — fraction of the offset to apply */
  strength?: number
  className?: string
}

/**
 * Wraps any element to make it "magnetic" — when the mouse comes within
 * `range` px of the element's bounding box, it slides toward the cursor
 * with a Framer Motion spring.
 */
export function Magnetic({
  children,
  range = 60,
  strength = 0.4,
  className,
}: MagneticProps) {
  const ref = useRef<HTMLDivElement | null>(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { damping: 18, stiffness: 220, mass: 0.4 })
  const springY = useSpring(y, { damping: 18, stiffness: 220, mass: 0.4 })

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = e.clientX - cx
    const dy = e.clientY - cy

    // Distance to the closest edge of the bounding box
    const halfW = rect.width / 2
    const halfH = rect.height / 2
    const edgeDx = Math.max(0, Math.abs(dx) - halfW)
    const edgeDy = Math.max(0, Math.abs(dy) - halfH)
    const edgeDist = Math.hypot(edgeDx, edgeDy)

    if (edgeDist > range) {
      x.set(0)
      y.set(0)
      return
    }

    // Falloff: 1 at the edge of the box, 0 at `range` away
    const falloff = 1 - edgeDist / range
    x.set(dx * strength * falloff)
    y.set(dy * strength * falloff)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY, display: "inline-block" }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
