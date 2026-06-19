// Re-export shim — the canonical implementation lives in rich-text-editor.tsx.
// Kept so any in-flight imports of "@/components/admin/tiptap-editor" keep working.
export { RichTextEditor as TiptapEditor, RichTextEditor } from "./rich-text-editor"
