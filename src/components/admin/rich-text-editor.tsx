import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Underline from "@tiptap/extension-underline"
import Link from "@tiptap/extension-link"
import Image from "@tiptap/extension-image"
import { TextStyle, Color } from "@tiptap/extension-text-style"
import Highlight from "@tiptap/extension-highlight"
import { Table } from "@tiptap/extension-table"
import TableRow from "@tiptap/extension-table-row"
import TableCell from "@tiptap/extension-table-cell"
import TableHeader from "@tiptap/extension-table-header"
import TextAlign from "@tiptap/extension-text-align"
import CharacterCount from "@tiptap/extension-character-count"
import Placeholder from "@tiptap/extension-placeholder"
import {
  Bold, Italic, Underline as UIcon, Strikethrough, List, ListOrdered, Quote, Code, Code2,
  Link as LinkIcon, Image as ImgIcon, Table as TableIcon, Minus, Undo, Redo,
  Heading1, Heading2, Heading3, Maximize2, Minimize2,
  AlignLeft, AlignCenter, AlignRight, AlignJustify,
} from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { supabase } from "@/integrations/supabase/client"
import { toast } from "sonner"

interface Props {
  value: string
  onChange: (html: string, words: number, chars: number) => void
  placeholder?: string
  minHeight?: number
}

export function RichTextEditor({ value, onChange, placeholder = "Write here…", minHeight = 300 }: Props) {
  const [fullscreen, setFullscreen] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [1, 2, 3, 4] } }),
      Underline,
      Link.configure({ openOnClick: false, HTMLAttributes: { rel: "noopener noreferrer" } }),
      Image.configure({ HTMLAttributes: { class: "rounded-lg max-w-full h-auto" } }),
      TextStyle,
      Color,
      Highlight.configure({ multicolor: true }),
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      CharacterCount,
      Placeholder.configure({ placeholder }),
    ],
    content: value || "<p></p>",
    autofocus: false,
    immediatelyRender: false,
    shouldRerenderOnTransaction: true,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML()
      const words = editor.storage.characterCount?.words?.() ?? 0
      const chars = editor.storage.characterCount?.characters?.() ?? 0
      onChange(html, words, chars)
    },
  })

  useEffect(() => {
    if (editor && value !== editor.getHTML() && !editor.isFocused) {
      editor.commands.setContent(value || "<p></p>", { emitUpdate: false })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  if (!editor) {
    return <div className="border rounded-lg p-4 bg-white text-sm text-muted-foreground">Loading editor…</div>
  }

  const words = editor.storage.characterCount?.words?.() ?? 0
  const chars = editor.storage.characterCount?.characters?.() ?? 0
  const reading = Math.max(1, Math.round(words / 200))

  const addLink = () => {
    const url = window.prompt("URL")
    if (!url) return
    const open = window.confirm("Open in new tab?")
    editor.chain().focus().extendMarkRange("link").setLink({ href: url, target: open ? "_blank" : null }).run()
  }

  const onUpload = async (original: File) => {
    const alt = window.prompt("Image alt text (for accessibility & SEO)") || ""
    const { convertImageToWebp } = await import("@/lib/image-to-webp")
    const file = await convertImageToWebp(original)
    const ext = file.name.split(".").pop()
    const path = `posts/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`
    const { error } = await supabase.storage.from("blog-images").upload(path, file, { contentType: file.type })
    if (error) { toast.error(error.message); return }
    const { data } = supabase.storage.from("blog-images").getPublicUrl(path)
    editor.chain().focus().setImage({ src: data.publicUrl, alt }).run()
  }

  const Btn = ({ active, onClick, title, children }: { active?: boolean; onClick: () => void; title: string; children: React.ReactNode }) => (
    <button
      type="button"
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      title={title}
      className="p-1.5 transition-colors"
      style={{
        background: active ? "#8B0F50" : "transparent",
        color: active ? "white" : "#374151",
        borderRadius: 6,
      }}
    >
      {children}
    </button>
  )

  return (
    <div className={fullscreen ? "fixed inset-0 z-[1000] bg-white p-4 overflow-auto" : ""}>
      <div className="border rounded-lg bg-white">
        <div className="flex flex-wrap items-center gap-1 p-2 border-b">
          <Btn title="H1" active={editor.isActive("heading", { level: 1 })} onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}><Heading1 className="w-4 h-4" /></Btn>
          <Btn title="H2" active={editor.isActive("heading", { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}><Heading2 className="w-4 h-4" /></Btn>
          <Btn title="H3" active={editor.isActive("heading", { level: 3 })} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}><Heading3 className="w-4 h-4" /></Btn>
          <span className="w-px h-5 bg-gray-200 mx-1" />
          <Btn title="Bold" active={editor.isActive("bold")} onClick={() => editor.chain().focus().toggleBold().run()}><Bold className="w-4 h-4" /></Btn>
          <Btn title="Italic" active={editor.isActive("italic")} onClick={() => editor.chain().focus().toggleItalic().run()}><Italic className="w-4 h-4" /></Btn>
          <Btn title="Underline" active={editor.isActive("underline")} onClick={() => editor.chain().focus().toggleUnderline().run()}><UIcon className="w-4 h-4" /></Btn>
          <Btn title="Strikethrough" active={editor.isActive("strike")} onClick={() => editor.chain().focus().toggleStrike().run()}><Strikethrough className="w-4 h-4" /></Btn>
          <input
            type="color"
            title="Text color"
            onMouseDown={(e) => e.preventDefault()}
            onChange={(e) => editor.chain().focus().setColor(e.target.value).run()}
            className="w-7 h-7 rounded cursor-pointer border"
          />
          <input
            type="color"
            title="Highlight"
            onMouseDown={(e) => e.preventDefault()}
            onChange={(e) => editor.chain().focus().toggleHighlight({ color: e.target.value }).run()}
            className="w-7 h-7 rounded cursor-pointer border"
          />
          <span className="w-px h-5 bg-gray-200 mx-1" />
          <Btn title="Bullet List" active={editor.isActive("bulletList")} onClick={() => editor.chain().focus().toggleBulletList().run()}><List className="w-4 h-4" /></Btn>
          <Btn title="Numbered List" active={editor.isActive("orderedList")} onClick={() => editor.chain().focus().toggleOrderedList().run()}><ListOrdered className="w-4 h-4" /></Btn>
          <Btn title="Quote" active={editor.isActive("blockquote")} onClick={() => editor.chain().focus().toggleBlockquote().run()}><Quote className="w-4 h-4" /></Btn>
          <Btn title="Inline Code" active={editor.isActive("code")} onClick={() => editor.chain().focus().toggleCode().run()}><Code className="w-4 h-4" /></Btn>
          <Btn title="Code Block" active={editor.isActive("codeBlock")} onClick={() => editor.chain().focus().toggleCodeBlock().run()}><Code2 className="w-4 h-4" /></Btn>
          <span className="w-px h-5 bg-gray-200 mx-1" />
          <Btn title="Align Left" active={editor.isActive({ textAlign: "left" })} onClick={() => editor.chain().focus().setTextAlign("left").run()}><AlignLeft className="w-4 h-4" /></Btn>
          <Btn title="Align Center" active={editor.isActive({ textAlign: "center" })} onClick={() => editor.chain().focus().setTextAlign("center").run()}><AlignCenter className="w-4 h-4" /></Btn>
          <Btn title="Align Right" active={editor.isActive({ textAlign: "right" })} onClick={() => editor.chain().focus().setTextAlign("right").run()}><AlignRight className="w-4 h-4" /></Btn>
          <Btn title="Justify" active={editor.isActive({ textAlign: "justify" })} onClick={() => editor.chain().focus().setTextAlign("justify").run()}><AlignJustify className="w-4 h-4" /></Btn>
          <span className="w-px h-5 bg-gray-200 mx-1" />
          <Btn title="Link" active={editor.isActive("link")} onClick={addLink}><LinkIcon className="w-4 h-4" /></Btn>
          <Btn title="Image" onClick={() => fileRef.current?.click()}><ImgIcon className="w-4 h-4" /></Btn>
          <input ref={fileRef} type="file" accept="image/*" hidden onChange={(e) => { const f = e.target.files?.[0]; if (f) onUpload(f); e.target.value = "" }} />
          <Btn title="Table" onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}><TableIcon className="w-4 h-4" /></Btn>
          <Btn title="Divider" onClick={() => editor.chain().focus().setHorizontalRule().run()}><Minus className="w-4 h-4" /></Btn>
          <span className="w-px h-5 bg-gray-200 mx-1" />
          <Btn title="Undo" onClick={() => editor.chain().focus().undo().run()}><Undo className="w-4 h-4" /></Btn>
          <Btn title="Redo" onClick={() => editor.chain().focus().redo().run()}><Redo className="w-4 h-4" /></Btn>
          <div className="ml-auto flex items-center gap-3 text-xs text-muted-foreground pr-1">
            <span>{words} words</span>
            <span>{chars} chars</span>
            <span>{reading} min read</span>
            <button type="button" onClick={() => setFullscreen((v) => !v)} title="Fullscreen" className="p-1 hover:text-pink-600">
              {fullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          </div>
        </div>
        <EditorContent
          editor={editor}
          className="prose prose-sm max-w-none p-4 focus:outline-none [&_.ProseMirror]:outline-none"
          style={{ minHeight }}
        />
      </div>
    </div>
  )
}

// Backwards-compatible alias so legacy imports keep working during the swap.
export const TiptapEditor = RichTextEditor
