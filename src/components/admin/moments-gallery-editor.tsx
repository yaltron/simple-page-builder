import { useEffect, useState, useRef } from "react"
import { Plus, Trash2, Pencil, GripVertical, Upload, Camera, X } from "lucide-react"
import { supabase } from "@/integrations/supabase/client"
import { convertImageToWebp } from "@/lib/image-to-webp"
import { toast } from "sonner"
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core"
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

type SpanClass = "normal" | "wide" | "wider" | "high"

type Moment = {
  id: string
  image_url: string
  image_alt: string | null
  span_class: SpanClass
  order_index: number
  is_active: boolean
}

const BUCKET = "site-media"
const FOLDER = "moments-gallery"
const PINK = "#E6007E"
const PINK_SOFT = "#FFF1F7"
const PINK_BORDER = "rgba(230,0,126,0.35)"
const MAX_BYTES = 25 * 1024 * 1024 // 25MB source; converted to WebP before upload
const ACCEPTED = ["image/jpeg", "image/png", "image/webp", "image/avif"]

const SIZE_OPTIONS: { value: SpanClass; label: string; w: number; h: number }[] = [
  { value: "normal", label: "Normal", w: 20, h: 20 },
  { value: "wide", label: "Wide", w: 40, h: 20 },
  { value: "wider", label: "Wider", w: 56, h: 20 },
  { value: "high", label: "Tall", w: 20, h: 40 },
]

// ─────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────
function pathFromPublicUrl(url: string): string | null {
  // Public URL: .../storage/v1/object/public/<bucket>/<path>
  const marker = `/object/public/${BUCKET}/`
  const i = url.indexOf(marker)
  if (i === -1) return null
  return url.slice(i + marker.length)
}

async function uploadImage(file: File): Promise<string> {
  const webp = await convertImageToWebp(file)
  const safe = webp.name.replace(/[^a-zA-Z0-9.-]/g, "_")
  const path = `${FOLDER}/${Date.now()}-${safe}`
  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(path, webp, { upsert: false, contentType: webp.type })
  if (error) throw new Error(error.message)
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path)
  return data.publicUrl
}

// ─────────────────────────────────────────────────────────
// Card (sortable)
// ─────────────────────────────────────────────────────────
function MomentCard({
  item,
  onEdit,
  onDelete,
}: {
  item: Moment
  onEdit: (m: Moment) => void
  onDelete: (m: Moment) => void
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: item.id })

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
      }}
      className="bg-white rounded-xl border overflow-hidden flex flex-col"
    >
      <div className="relative aspect-square bg-gray-50">
        <img src={item.image_url} alt={item.image_alt || ""} className="w-full h-full object-cover" />
        <button
          type="button"
          className="absolute top-2 left-2 p-1.5 rounded-md bg-white/90 hover:bg-white text-gray-700 cursor-grab active:cursor-grabbing shadow-sm"
          {...attributes}
          {...listeners}
          aria-label="Drag to reorder"
        >
          <GripVertical className="w-4 h-4" />
        </button>
        <span className="absolute top-2 right-2 text-[10px] uppercase tracking-wider px-2 py-1 rounded-md bg-black/60 text-white">
          {item.span_class}
        </span>
        {!item.is_active && (
          <span className="absolute bottom-2 left-2 text-[10px] uppercase tracking-wider px-2 py-1 rounded-md bg-gray-800/80 text-white">
            Hidden
          </span>
        )}
      </div>
      <div className="flex items-center justify-between px-3 py-2 border-t bg-gray-50/60">
        <button
          onClick={() => onEdit(item)}
          className="inline-flex items-center gap-1 text-xs font-semibold text-gray-700 hover:text-[#E6007E]"
        >
          <Pencil className="w-3.5 h-3.5" /> Edit
        </button>
        <button
          onClick={() => onDelete(item)}
          className="inline-flex items-center gap-1 text-xs font-semibold text-red-600 hover:text-red-700"
        >
          <Trash2 className="w-3.5 h-3.5" /> Delete
        </button>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────
// Upload / Edit Modal
// ─────────────────────────────────────────────────────────
type ModalProps = {
  mode: "add" | "edit"
  initial?: Moment
  nextOrderIndex: number
  onClose: () => void
  onSaved: () => void
}

function MomentModal({ mode, initial, nextOrderIndex, onClose, onSaved }: ModalProps) {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string>(initial?.image_url || "")
  const [alt, setAlt] = useState<string>(initial?.image_alt || "")
  const [span, setSpan] = useState<SpanClass>(initial?.span_class || "normal")
  const [active, setActive] = useState<boolean>(initial?.is_active ?? true)
  const [order, setOrder] = useState<number>(initial?.order_index ?? nextOrderIndex)
  const [dragOver, setDragOver] = useState(false)
  const [saving, setSaving] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  const handleFile = (f: File | null) => {
    if (!f) return
    if (!ACCEPTED.includes(f.type)) {
      toast.error("Only JPG, PNG, or WEBP allowed")
      return
    }
    if (f.size > MAX_BYTES) {
      toast.error("Max file size is 5MB")
      return
    }
    setFile(f)
    setPreview(URL.createObjectURL(f))
  }

  const onSave = async () => {
    if (mode === "add" && !file) {
      toast.error("Please choose an image")
      return
    }
    setSaving(true)
    try {
      let imageUrl = initial?.image_url || ""
      let oldPath: string | null = null

      if (file) {
        if (mode === "edit" && initial?.image_url) {
          oldPath = pathFromPublicUrl(initial.image_url)
        }
        imageUrl = await uploadImage(file)
      }

      if (mode === "add") {
        const { error } = await supabase.from("moments_gallery").insert({
          image_url: imageUrl,
          image_alt: alt || null,
          span_class: span,
          order_index: order,
          is_active: active,
        })
        if (error) throw new Error(error.message)
        toast.success("✅ Image added to gallery")
      } else if (initial) {
        const { error } = await supabase
          .from("moments_gallery")
          .update({
            image_url: imageUrl,
            image_alt: alt || null,
            span_class: span,
            order_index: order,
            is_active: active,
          })
          .eq("id", initial.id)
        if (error) throw new Error(error.message)
        if (oldPath) {
          await supabase.storage.from(BUCKET).remove([oldPath])
        }
        toast.success("✅ Image updated")
      }

      onSaved()
      onClose()
    } catch (e: any) {
      toast.error(e.message || "Save failed")
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={onClose}>
      <div
        className="bg-white rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="font-bold text-lg">{mode === "add" ? "Add Gallery Image" : "Edit Gallery Image"}</h2>
          <button onClick={onClose} className="p-1 rounded hover:bg-gray-100">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="px-6 py-5 space-y-5">
          {/* Upload zone / preview */}
          {preview && !file && mode === "edit" ? (
            <div className="space-y-2">
              <div className="rounded-2xl overflow-hidden border bg-gray-50">
                <img src={preview} alt="" className="w-full max-h-64 object-contain" />
              </div>
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border"
                style={{ borderColor: PINK_BORDER, color: PINK }}
              >
                <Upload className="w-3.5 h-3.5" /> Change Image
              </button>
              <input
                ref={fileRef}
                type="file"
                accept={ACCEPTED.join(",")}
                className="hidden"
                onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
              />
            </div>
          ) : preview && file ? (
            <div className="space-y-2">
              <div className="rounded-2xl overflow-hidden border bg-gray-50">
                <img src={preview} alt="" className="w-full max-h-64 object-contain" />
              </div>
              <button
                type="button"
                onClick={() => {
                  setFile(null)
                  setPreview(initial?.image_url || "")
                }}
                className="text-xs underline text-gray-600"
              >
                Choose a different file
              </button>
            </div>
          ) : (
            <div
              onDragOver={(e) => {
                e.preventDefault()
                setDragOver(true)
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={(e) => {
                e.preventDefault()
                setDragOver(false)
                handleFile(e.dataTransfer.files?.[0] ?? null)
              }}
              className="text-center"
              style={{
                border: `2px dashed ${PINK_BORDER}`,
                background: dragOver ? "#fde4ee" : PINK_SOFT,
                borderRadius: 16,
                padding: 32,
                transition: "background 150ms",
              }}
            >
              <Camera className="w-8 h-8 mx-auto mb-2" style={{ color: PINK }} />
              <div className="font-semibold text-gray-800 mb-1">Drag & drop image here</div>
              <div className="text-xs text-gray-500 mb-3">or</div>
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border bg-white"
                style={{ borderColor: PINK_BORDER, color: PINK }}
              >
                Browse Files
              </button>
              <div className="text-[11px] text-gray-500 mt-3">Accepted: JPG, PNG, WEBP • Max 5MB</div>
              <input
                ref={fileRef}
                type="file"
                accept={ACCEPTED.join(",")}
                className="hidden"
                onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
              />
            </div>
          )}

          {/* Alt text */}
          <label className="block">
            <div className="text-xs font-semibold text-gray-700 mb-1">Image Alt Text</div>
            <input
              value={alt}
              onChange={(e) => setAlt(e.target.value)}
              placeholder="Describe this image..."
              className="w-full px-3 py-2 border rounded-lg text-sm"
            />
          </label>

          {/* Grid size selector */}
          <div>
            <div className="text-xs font-semibold text-gray-700 mb-2">Grid Size</div>
            <div className="grid grid-cols-4 gap-2">
              {SIZE_OPTIONS.map((opt) => {
                const selected = span === opt.value
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setSpan(opt.value)}
                    className="rounded-lg p-3 flex flex-col items-center gap-2 transition-all"
                    style={{
                      border: selected ? `2px solid ${PINK}` : "1px solid rgba(230,0,126,0.2)",
                      background: selected ? PINK_SOFT : "white",
                    }}
                  >
                    <div
                      style={{
                        width: opt.w,
                        height: opt.h,
                        background: selected ? PINK : "#d4d4d8",
                        borderRadius: 4,
                      }}
                    />
                    <div className="text-xs font-semibold text-gray-800">{opt.label}</div>
                  </button>
                )
              })}
            </div>
            <div className="text-[11px] mt-2" style={{ color: "#b06090" }}>
              Wide = spans 2 columns, Wider = spans 3 columns, Tall = spans 2 rows
            </div>
          </div>

          {/* Order (edit only) */}
          {mode === "edit" && (
            <label className="block">
              <div className="text-xs font-semibold text-gray-700 mb-1">Order</div>
              <input
                type="number"
                value={order}
                onChange={(e) => setOrder(Number(e.target.value))}
                className="w-32 px-3 py-2 border rounded-lg text-sm"
              />
            </label>
          )}

          {/* Active toggle */}
          <label className="flex items-center justify-between gap-3 py-2">
            <span className="text-sm font-semibold text-gray-800">Show on website</span>
            <button
              type="button"
              role="switch"
              aria-checked={active}
              onClick={() => setActive((a) => !a)}
              className="relative w-11 h-6 rounded-full transition-colors"
              style={{ background: active ? PINK : "#d4d4d8" }}
            >
              <span
                className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all"
                style={{ left: active ? 22 : 2 }}
              />
            </button>
          </label>
        </div>

        <div className="flex justify-end gap-2 px-6 py-4 border-t bg-gray-50/60">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-sm font-semibold border bg-white"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            disabled={saving}
            className="px-5 py-2 rounded-lg text-sm font-semibold text-white disabled:opacity-50"
            style={{ background: PINK }}
          >
            {saving ? "Saving…" : mode === "add" ? "Upload & Add" : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────
// Delete confirm
// ─────────────────────────────────────────────────────────
function ConfirmDelete({
  onCancel,
  onConfirm,
}: {
  onCancel: () => void
  onConfirm: () => void
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={onCancel}>
      <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <h3 className="font-bold text-base mb-2">Delete this image from the Moments gallery?</h3>
        <p className="text-sm text-gray-600 mb-4">This action cannot be undone.</p>
        <div className="flex justify-end gap-2">
          <button onClick={onCancel} className="px-4 py-2 rounded-lg text-sm font-semibold border bg-white">
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg text-sm font-semibold text-white"
            style={{ background: "#dc2626" }}
          >
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────
// Main editor
// ─────────────────────────────────────────────────────────
export function MomentsGalleryEditor() {
  const [items, setItems] = useState<Moment[]>([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState<{ mode: "add" | "edit"; item?: Moment } | null>(null)
  const [deleting, setDeleting] = useState<Moment | null>(null)

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }))

  const load = async () => {
    const { data, error } = await supabase
      .from("moments_gallery")
      .select("*")
      .order("order_index", { ascending: true })
    if (error) {
      toast.error(error.message)
      return
    }
    setItems((data ?? []) as Moment[])
    setLoading(false)
  }

  useEffect(() => {
    load()
  }, [])

  const onDragEnd = async (e: DragEndEvent) => {
    const { active, over } = e
    if (!over || active.id === over.id) return
    const oldIndex = items.findIndex((i) => i.id === active.id)
    const newIndex = items.findIndex((i) => i.id === over.id)
    if (oldIndex < 0 || newIndex < 0) return
    const next = arrayMove(items, oldIndex, newIndex).map((it, idx) => ({ ...it, order_index: idx }))
    setItems(next)
    // Batch update order_index
    const updates = await Promise.all(
      next.map((it) =>
        supabase.from("moments_gallery").update({ order_index: it.order_index }).eq("id", it.id)
      )
    )
    const failed = updates.find((u) => u.error)
    if (failed) toast.error("Failed to save new order")
  }

  const handleDelete = async () => {
    if (!deleting) return
    const target = deleting
    setDeleting(null)
    const path = pathFromPublicUrl(target.image_url)
    const { error } = await supabase.from("moments_gallery").delete().eq("id", target.id)
    if (error) {
      toast.error(error.message)
      return
    }
    if (path) await supabase.storage.from(BUCKET).remove([path])
    setItems((prev) => prev.filter((p) => p.id !== target.id))
    toast.success("🗑️ Image removed")
  }

  const nextOrderIndex = items.length > 0 ? Math.max(...items.map((i) => i.order_index)) + 1 : 0

  return (
    <div className="space-y-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="font-bold text-lg">Moments That Matter — Gallery Images</h2>
          <p className="text-sm text-gray-600 max-w-2xl">
            Upload images for the grid gallery on the homepage. Each image can be set to span different sizes in the grid.
          </p>
        </div>
        <button
          onClick={() => setModal({ mode: "add" })}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white font-semibold shrink-0"
          style={{ background: PINK }}
        >
          <Plus className="w-4 h-4" /> Add Image
        </button>
      </div>

      {loading ? (
        <div className="text-sm text-gray-500">Loading…</div>
      ) : items.length === 0 ? (
        <div className="bg-white rounded-xl border p-10 text-center">
          <div className="text-sm text-gray-500">No images yet. Click "Add Image" to upload your first one.</div>
        </div>
      ) : (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
          <SortableContext items={items.map((i) => i.id)} strategy={rectSortingStrategy}>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {items.map((it) => (
                <MomentCard
                  key={it.id}
                  item={it}
                  onEdit={(m) => setModal({ mode: "edit", item: m })}
                  onDelete={(m) => setDeleting(m)}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}

      {modal && (
        <MomentModal
          mode={modal.mode}
          initial={modal.item}
          nextOrderIndex={nextOrderIndex}
          onClose={() => setModal(null)}
          onSaved={load}
        />
      )}

      {deleting && <ConfirmDelete onCancel={() => setDeleting(null)} onConfirm={handleDelete} />}
    </div>
  )
}
