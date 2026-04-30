import { motion } from "framer-motion"
import type { CSSProperties } from "react"

interface MorphingBlobProps {
  /** CSS color value (e.g. "var(--rose)", "#fff", "rgb(255,255,255)") */
  color: string
  /** Size in pixels (400-700 recommended) */
  size?: number
  /** Opacity 0-1 (0.06-0.12 recommended) */
  opacity?: number
  /** Animation duration in seconds */
  duration?: number
  /** Animation delay (negative for staggered start) */
  delay?: number
  /** Drift distance in px on x */
  driftX?: number
  /** Drift distance in px on y */
  driftY?: number
  /** Positioning — any standard absolute style props */
  style?: CSSProperties
  /** Apply blur for soft edges */
  blur?: number
}

/**
 * A large abstract blob shape that continuously morphs its border-radius
 * and slowly drifts. Always renders unique shape sequences via varied
 * border-radius keyframes.
 */
export function MorphingBlob({
  color,
  size = 500,
  opacity = 0.1,
  duration = 22,
  delay = 0,
  driftX = 40,
  driftY = 30,
  style,
  blur = 60,
}: MorphingBlobProps) {
  // Sequence of asymmetric border-radius "blob" shapes — never repeats
  // exactly within a cycle, then yoyos back via repeatType: "reverse".
  const shapes = [
    "60% 40% 30% 70% / 60% 30% 70% 40%",
    "30% 60% 70% 40% / 50% 60% 30% 60%",
    "50% 50% 70% 30% / 40% 70% 30% 60%",
    "40% 60% 60% 40% / 70% 40% 60% 30%",
    "70% 30% 50% 50% / 30% 60% 40% 70%",
    "60% 40% 30% 70% / 60% 30% 70% 40%",
  ]

  return (
    <motion.div
      aria-hidden="true"
      className="absolute pointer-events-none"
      style={{
        width: size,
        height: size,
        background: color,
        opacity,
        filter: blur > 0 ? `blur(${blur}px)` : undefined,
        willChange: "transform, border-radius",
        ...style,
      }}
      animate={{
        borderRadius: shapes,
        x: [0, driftX, -driftX * 0.6, driftX * 0.4, 0],
        y: [0, -driftY, driftY * 0.7, -driftY * 0.4, 0],
        rotate: [0, 12, -8, 6, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      }}
    />
  )
}
