import { motion } from "framer-motion"
import type { CSSProperties } from "react"

export type OrbColor = "rose" | "teal" | "gold" | "rose-light" | "teal-light" | "white"

interface GradientOrbProps {
  color: OrbColor
  /** Diameter in px (600-900 recommended) */
  size?: number
  /** Min opacity for pulse */
  minOpacity?: number
  /** Max opacity for pulse */
  maxOpacity?: number
  /** Drift range in px (60-100 recommended) */
  driftRange?: number
  /** Drift duration in seconds */
  driftDuration?: number
  /** Pulse duration in seconds */
  pulseDuration?: number
  /** Delay (negative for pre-staggered start) */
  delay?: number
  /** Anchor positioning (top/left/right/bottom % or px) */
  style?: CSSProperties
}

const COLOR_VAR: Record<OrbColor, string> = {
  rose: "var(--rose)",
  teal: "var(--teal)",
  gold: "var(--gold)",
  "rose-light": "var(--rose-light)",
  "teal-light": "var(--teal-light)",
  white: "#ffffff",
}

/**
 * A large radial-gradient orb that drifts around its anchor and pulses
 * opacity. Uses screen blend so multiple orbs blend into a living mesh.
 */
export function GradientOrb({
  color,
  size = 720,
  minOpacity = 0.08,
  maxOpacity = 0.18,
  driftRange = 80,
  driftDuration = 18,
  pulseDuration = 9,
  delay = 0,
  style,
}: GradientOrbProps) {
  const c = COLOR_VAR[color]

  return (
    <motion.div
      aria-hidden="true"
      className="absolute pointer-events-none rounded-full"
      style={{
        width: size,
        height: size,
        // Radial gradient that fades to transparent — soft mesh feel
        background: `radial-gradient(circle at 50% 50%, ${c} 0%, ${c} 25%, transparent 70%)`,
        mixBlendMode: "multiply",
        filter: "blur(40px)",
        willChange: "transform, opacity",
        ...style,
      }}
      animate={{
        x: [0, driftRange, -driftRange * 0.6, driftRange * 0.4, 0],
        y: [0, -driftRange * 0.7, driftRange * 0.8, -driftRange * 0.3, 0],
        opacity: [minOpacity, maxOpacity, minOpacity * 1.2, maxOpacity * 0.9, minOpacity],
      }}
      transition={{
        duration: driftDuration,
        delay,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
        opacity: {
          duration: pulseDuration,
          delay,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        },
      }}
    />
  )
}

interface OrbItem extends Omit<GradientOrbProps, "style"> {
  top?: string
  left?: string
  right?: string
  bottom?: string
}

/**
 * Renders a layered field of GradientOrbs that blend into a living mesh.
 * Place inside a `relative overflow-hidden` parent.
 */
export function GradientMesh({
  items,
  blendMode = "multiply",
}: {
  items: OrbItem[]
  blendMode?: CSSProperties["mixBlendMode"]
}) {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 overflow-hidden pointer-events-none"
    >
      {items.map((item, i) => {
        const { top, left, right, bottom, ...rest } = item
        return (
          <GradientOrb
            key={i}
            {...rest}
            style={{ top, left, right, bottom, mixBlendMode: blendMode }}
          />
        )
      })}
    </div>
  )
}
