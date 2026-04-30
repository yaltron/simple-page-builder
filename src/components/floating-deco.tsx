import { motion } from "framer-motion"
import type { CSSProperties } from "react"

export type DecoShape = "hollow-circle" | "dashed-ring" | "plus" | "lines" | "square"
export type DecoColor = "rose" | "teal" | "gold"

interface FloatingDecoProps {
  shape: DecoShape
  color: DecoColor
  /** Pixel size of the shape's bounding box (12-64 typical) */
  size?: number
  /** Float duration for vertical motion in seconds */
  floatDuration?: number
  /** Vertical drift range in px (20-40 recommended) */
  floatRange?: number
  /** Rotation duration in seconds (15-25 recommended) */
  rotateDuration?: number
  /** Opacity pulse duration in seconds */
  pulseDuration?: number
  /** Delay (negative for staggered start) */
  delay?: number
  /** Positioning style (top/left/right/bottom etc.) */
  style?: CSSProperties
}

const COLOR_MAP: Record<DecoColor, { stroke: string; opacity: number }> = {
  rose: { stroke: "var(--rose)", opacity: 0.1 },
  teal: { stroke: "var(--teal)", opacity: 0.08 },
  gold: { stroke: "var(--gold)", opacity: 0.06 },
}

function ShapeSvg({ shape, color, size }: { shape: DecoShape; color: DecoColor; size: number }) {
  const { stroke } = COLOR_MAP[color]
  const strokeWidth = Math.max(1, size * 0.06)
  const half = size / 2

  switch (shape) {
    case "hollow-circle":
      return (
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
          <circle
            cx={half}
            cy={half}
            r={half - strokeWidth}
            fill="none"
            stroke={stroke}
            strokeWidth={strokeWidth}
          />
        </svg>
      )
    case "dashed-ring":
      return (
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
          <circle
            cx={half}
            cy={half}
            r={half - strokeWidth}
            fill="none"
            stroke={stroke}
            strokeWidth={strokeWidth}
            strokeDasharray={`${size * 0.12} ${size * 0.08}`}
          />
        </svg>
      )
    case "plus":
      return (
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
          <line
            x1={half}
            y1={strokeWidth}
            x2={half}
            y2={size - strokeWidth}
            stroke={stroke}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
          <line
            x1={strokeWidth}
            y1={half}
            x2={size - strokeWidth}
            y2={half}
            stroke={stroke}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
        </svg>
      )
    case "lines": {
      // Diagonal line pair (//)
      const gap = size * 0.32
      return (
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
          <line
            x1={size * 0.15}
            y1={size - strokeWidth}
            x2={size * 0.55}
            y2={strokeWidth}
            stroke={stroke}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
          <line
            x1={size * 0.15 + gap}
            y1={size - strokeWidth}
            x2={size * 0.55 + gap}
            y2={strokeWidth}
            stroke={stroke}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
        </svg>
      )
    }
    case "square":
      return (
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
          <rect
            x={size * 0.2}
            y={size * 0.2}
            width={size * 0.6}
            height={size * 0.6}
            fill="none"
            stroke={stroke}
            strokeWidth={strokeWidth}
            transform={`rotate(45 ${half} ${half})`}
          />
        </svg>
      )
  }
}

/**
 * Abstract geometric decoration that slowly floats vertically, rotates
 * continuously, and pulses opacity. Designed for luxury medical brand feel.
 */
export function FloatingDeco({
  shape,
  color,
  size = 28,
  floatDuration = 7,
  floatRange = 28,
  rotateDuration = 20,
  pulseDuration = 5,
  delay = 0,
  style,
}: FloatingDecoProps) {
  const baseOpacity = COLOR_MAP[color].opacity

  return (
    <motion.div
      aria-hidden="true"
      className="absolute pointer-events-none"
      style={{
        width: size,
        height: size,
        opacity: baseOpacity,
        willChange: "transform, opacity",
        ...style,
      }}
      animate={{
        y: [0, -floatRange, 0],
        opacity: [baseOpacity, baseOpacity * 1.6, baseOpacity],
      }}
      transition={{
        duration: floatDuration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <motion.div
        style={{ width: "100%", height: "100%" }}
        animate={{ rotate: 360 }}
        transition={{
          duration: rotateDuration,
          delay,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <ShapeSvg shape={shape} color={color} size={size} />
      </motion.div>
      {/* opacity pulse runs via parent animate; pulseDuration kept for API symmetry */}
      <span style={{ display: "none" }}>{pulseDuration}</span>
    </motion.div>
  )
}

interface DecoItem {
  shape: DecoShape
  color: DecoColor
  size?: number
  top?: string
  left?: string
  right?: string
  bottom?: string
  floatDuration?: number
  floatRange?: number
  rotateDuration?: number
  delay?: number
}

/**
 * Renders a scattered field of FloatingDeco items inside an absolutely
 * positioned overlay. Place inside a `relative overflow-hidden` parent.
 */
export function FloatingDecoField({ items }: { items: DecoItem[] }) {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 overflow-hidden pointer-events-none"
    >
      {items.map((item, i) => {
        const { top, left, right, bottom, ...rest } = item
        return (
          <FloatingDeco
            key={i}
            {...rest}
            style={{ top, left, right, bottom }}
          />
        )
      })}
    </div>
  )
}
