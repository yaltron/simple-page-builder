## Plan: Enhance Miracles & Counting section

Edit only `src/components/miracles-gallery.tsx`. No other files change.

### 1. Section background
Replace `bg-gradient-to-br from-cream via-rose-light/20 to-teal-light/20` with an inline `style={{ background: "linear-gradient(120deg, #FFF1F7 0%, #ffffff 50%, #EAF7FD 100%)" }}` on the `<section>`. Keep `relative overflow-hidden` for absolute children.

### 2. Rotating gradient ring behind logo mask
Wrap the existing masked `motion.div` in a `relative` container sized 520x520. Add an absolutely-positioned sibling sitting BEHIND the mask (z-0), the mask gets z-10:

```tsx
<div className="relative" style={{ width: 520, height: 520 }}>
  <motion.div
    aria-hidden
    className="absolute inset-0 -m-6 rounded-full"
    style={{
      background: "conic-gradient(#E6007E, #1BA0DC, #E6007E)",
      padding: 3,
      opacity: 0.7,
      zIndex: 0,
    }}
    animate={{ rotate: 360 }}
    transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
  >
    <div className="w-full h-full rounded-full bg-white" />
  </motion.div>
  {/* existing masked motion.div, add style zIndex: 10, position relative */}
</div>
```

Note: `-m-6` extends 24px on each side as specified.

### 3. Floating stat pills (left column, below button)
Add a stacked list after the Button:

```tsx
<div className="mt-7 flex flex-col gap-2.5">
  {[
    { icon: "🍼", num: "5,000+", label: "Babies Born", delay: 0 },
    { icon: "📈", num: "75%",    label: "Success Rate", delay: 0.8 },
    { icon: "❤️", num: "12+",     label: "Years of Care", delay: 1.6 },
  ].map((p, i) => (
    <motion.div
      key={p.label}
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
      className="inline-flex items-center gap-2.5 self-start bg-white rounded-full"
      style={{
        border: "1px solid rgba(230,0,126,0.15)",
        padding: "10px 18px",
        boxShadow: "0 4px 20px rgba(230,0,126,0.10)",
        animation: `pillBob 3s ease-in-out ${p.delay}s infinite`,
      }}
    >
      <span
        className="inline-flex items-center justify-center rounded-full"
        style={{ width: 32, height: 32, background: "#FFF1F7", color: "#E6007E" }}
      >
        {p.icon}
      </span>
      <span style={{ fontWeight: 700, color: "#1A1535", fontSize: 15 }}>{p.num}</span>
      <span style={{ color: "#6B6B8A", fontSize: 12 }}>{p.label}</span>
    </motion.div>
  ))}
</div>
```

Inject keyframes locally via a `<style>` tag inside the component (kept self-contained, no edits to `styles.css`):

```tsx
<style>{`
  @keyframes pillBob {
    0%,100% { transform: translateY(0); }
    50%     { transform: translateY(-5px); }
  }
`}</style>
```

### 4. Floating background dots
Add an absolutely-positioned, `pointer-events-none`, `z-0` overlay inside the section as the first child, with 8 dots at hard-coded positions/sizes/colors and varied float durations/delays via inline `animation`. Reuse existing `float-slow`/`float-slower` keyframes from `styles.css` — they vary translate; combine with random `animationDuration` (8–14s) and `animationDelay` per dot. Wrap section content in `relative z-10` so dots sit behind.

Sample dots array (8 entries):
```
[ {top:"8%",left:"6%",size:12,color:"rgba(230,0,126,0.12)",dur:9,delay:0},
  {top:"22%",left:"92%",size:8, color:"rgba(27,160,220,0.10)",dur:11,delay:1.5},
  {top:"40%",left:"3%", size:16,color:"rgba(27,160,220,0.10)",dur:13,delay:0.8},
  {top:"70%",left:"45%",size:6, color:"rgba(230,0,126,0.12)",dur:10,delay:2},
  {top:"85%",left:"88%",size:14,color:"rgba(230,0,126,0.12)",dur:12,delay:0.4},
  {top:"55%",left:"96%",size:10,color:"rgba(27,160,220,0.10)",dur:8, delay:3},
  {top:"15%",left:"55%",size:7, color:"rgba(27,160,220,0.10)",dur:14,delay:1.2},
  {top:"92%",left:"15%",size:18,color:"rgba(230,0,126,0.12)",dur:9, delay:2.5} ]
```
Positions chosen near edges to avoid the centered text and right-side mask.

### What stays the same
- Layout (5-col grid), photo set, mask shape (`/shubhashree-01.png`), left-side copy, button, drop-shadow on mask, all other sections.
