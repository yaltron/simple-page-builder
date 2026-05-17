import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Link from "@tiptap/extension-link"
import Image from "@tiptap/extension-image"
import Underline from "@tiptap/extension-underline"
import { TextStyle } from "@tiptap/extension-text-style"
import { Color } from "@tiptap/extension-color"
import Highlight from "@tiptap/extension-highlight"
import { Table } from "@tiptap/extension-table"
import TableRow from "@tiptap/extension-table-row"
import TableCell from "@tiptap/extension-table-cell"
import TableHeader from "@tiptap/extension-table-header"
import CharacterCount from "@tiptap/extension-character-count"
import Placeholder from "@tiptap/extension-placeholder"
import {
  Bold, Italic, Underline as UIcon, Strikethrough, List, ListOrdered, Quote, Code,
  Link as LinkIcon, Image as ImgIcon, Table as TableIcon, Minus, Undo, Redo, Heading1, Heading2, Heading3, Maximize2, Minimize2, FileCode,
} from "lucide-react"
import { useEffect, useState, useRef } from "react"
import { supabase } from "@/integrations/supabase/client"
import { toast } from "sonner"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"

interface Props {
  value: string
  onChange: (html: string, words: number, chars: number) => void
}

export function TiptapEditor({ value, onChange }: Props) {
  const [fullscreen, setFullscreen] = useState(false)
  const [importOpen, setImportOpen] = useState(false)
  const [importHtml, setImportHtml] = useState("")
  const fileRef = useRef<HTMLInputElement>(null)

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextStyle,
      Color,
      Highlight.configure({ multicolor: true }),
      Link.configure({ openOnClick: false, HTMLAttributes: { rel: "noopener noreferrer" } }),
      Image.configure({ HTMLAttributes: { class: "rounded-lg max-w-full h-auto" } }),
      Table.configure({ resizable: true }),
      TableRow, TableHeader, TableCell,
      CharacterCount,
      Placeholder.configure({ placeholder: "Write your post content…" }),
    ],
    content: value || "",
    onUpdate: ({ editor }) => {
      const html = editor.getHTML()
      const words = editor.storage.characterCount.words()
      const chars = editor.storage.characterCount.characters()
      onChange(html, words, chars)
    },
    immediatelyRender: false,
  })

  useEffect(() => {
    if (editor && value !== editor.getHTML() && !editor.isFocused) {
      editor.commands.setContent(value || "", { emitUpdate: false })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  if (!editor) return <div className="border rounded-lg p-4 bg-white text-sm text-muted-foreground">Loading editor…</div>

  const words = editor.storage.characterCount.words()
  const chars = editor.storage.characterCount.characters()
  const reading = Math.max(1, Math.round(words / 200))

  const addLink = () => {
    const url = window.prompt("URL")
    if (!url) return
    const open = window.confirm("Open in new tab?")
    editor.chain().focus().extendMarkRange("link").setLink({ href: url, target: open ? "_blank" : null }).run()
  }

  const onUpload = async (file: File) => {
    const alt = window.prompt("Image alt text (for accessibility & SEO)") || ""
    const ext = file.name.split(".").pop()
    const path = `posts/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`
    const { error } = await supabase.storage.from("blog-images").upload(path, file, { contentType: file.type })
    if (error) { toast.error(error.message); return }
    const { data } = supabase.storage.from("blog-images").getPublicUrl(path)
    editor.chain().focus().setImage({ src: data.publicUrl, alt }).run()
  }

  const Btn = ({ active, onClick, title, children }: { active?: boolean; onClick: () => void; title: string; children: React.ReactNode }) => (
    <button type="button" onClick={onClick} title={title}
      className="p-1.5 rounded hover:bg-pink-50 transition-colors"
      style={{ background: active ? "#FFE4EF" : "transparent", color: active ? "#E6007E" : "#374151" }}>
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
          <input type="color" title="Text color" onChange={(e) => editor.chain().focus().setColor(e.target.value).run()} className="w-7 h-7 rounded cursor-pointer border" />
          <input type="color" title="Highlight" onChange={(e) => editor.chain().focus().toggleHighlight({ color: e.target.value }).run()} className="w-7 h-7 rounded cursor-pointer border" />
          <span className="w-px h-5 bg-gray-200 mx-1" />
          <Btn title="Bullet List" active={editor.isActive("bulletList")} onClick={() => editor.chain().focus().toggleBulletList().run()}><List className="w-4 h-4" /></Btn>
          <Btn title="Numbered List" active={editor.isActive("orderedList")} onClick={() => editor.chain().focus().toggleOrderedList().run()}><ListOrdered className="w-4 h-4" /></Btn>
          <Btn title="Quote" active={editor.isActive("blockquote")} onClick={() => editor.chain().focus().toggleBlockquote().run()}><Quote className="w-4 h-4" /></Btn>
          <Btn title="Code Block" active={editor.isActive("codeBlock")} onClick={() => editor.chain().focus().toggleCodeBlock().run()}><Code className="w-4 h-4" /></Btn>
          <span className="w-px h-5 bg-gray-200 mx-1" />
          <Btn title="Link" onClick={addLink}><LinkIcon className="w-4 h-4" /></Btn>
          <Btn title="Image" onClick={() => fileRef.current?.click()}><ImgIcon className="w-4 h-4" /></Btn>
          <input ref={fileRef} type="file" accept="image/*" hidden onChange={(e) => { const f = e.target.files?.[0]; if (f) onUpload(f); e.target.value = "" }} />
          <Btn title="Table" onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}><TableIcon className="w-4 h-4" /></Btn>
          <Btn title="Divider" onClick={() => editor.chain().focus().setHorizontalRule().run()}><Minus className="w-4 h-4" /></Btn>
          <span className="w-px h-5 bg-gray-200 mx-1" />
          <Btn title="Import HTML" onClick={() => { setImportHtml(""); setImportOpen(true) }}><FileCode className="w-4 h-4" /></Btn>
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
        <EditorContent editor={editor} className="prose prose-sm max-w-none p-4 min-h-[400px] focus:outline-none [&_*:focus]:outline-none" />
      </div>
      <Dialog open={importOpen} onOpenChange={setImportOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Import HTML Content</DialogTitle>
          </DialogHeader>
          <Textarea
            value={importHtml}
            onChange={(e) => setImportHtml(e.target.value)}
            placeholder="Paste raw HTML here…"
            className="min-h-[300px] font-mono text-xs"
          />
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => {
                editor.commands.setContent(importHtml || "", { emitUpdate: true })
                setImportOpen(false)
                setImportHtml("")
              }}
              className="px-4 py-2 rounded-md text-white font-medium"
              style={{ background: "#E6007E" }}
            >
              Import & Render
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
