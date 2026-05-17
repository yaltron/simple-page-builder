const SWATCHES = ["#C2185B", "#E6007E", "#2D0A1E", "#1BA0DC", "#8B0F50", "#FFFFFF"]

export function ColorPicker({
  value,
  onChange,
}: {
  value: string
  onChange: (hex: string) => void
}) {
  const v = value || "#E6007E"
  return (
    <div className="flex items-center gap-2 flex-wrap">
      {SWATCHES.map((c) => (
        <button
          key={c}
          type="button"
          onClick={() => onChange(c)}
          aria-label={c}
          className="w-7 h-7 rounded-full border-2 transition-transform hover:scale-110"
          style={{ background: c, borderColor: v.toLowerCase() === c.toLowerCase() ? "#2D0A1E" : "rgba(0,0,0,0.12)" }}
        />
      ))}
      <input
        type="color"
        value={v}
        onChange={(e) => onChange(e.target.value)}
        className="w-7 h-7 rounded cursor-pointer border"
        aria-label="Custom color"
      />
      <input
        type="text"
        value={v}
        onChange={(e) => onChange(e.target.value)}
        placeholder="#E6007E"
        className="w-24 px-2 py-1 border rounded text-sm font-mono"
      />
      <span className="inline-block w-5 h-5 rounded border" style={{ background: v }} aria-hidden="true" />
    </div>
  )
}
