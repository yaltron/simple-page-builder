import { useEffect, useState } from "react"
import { createFileRoute, Link } from "@tanstack/react-router"
import { Plus, Pencil, Trash2, Eye, Search } from "lucide-react"
import { AdminShell, AdminLoading } from "@/components/admin/admin-shell"
import { useAdminAuth } from "@/lib/use-admin-auth"
import { supabase } from "@/integrations/supabase/client"
import { toast } from "sonner"

export const Route = createFileRoute("/admin/blog/")({
  component: AdminBlogListPage,
})

function AdminBlogListPage() {
  const { loading, isAdmin } = useAdminAuth()
  const [posts, setPosts] = useState<any[]>([])
  const [q, setQ] = useState("")
  const [statusFilter, setStatusFilter] = useState<"all" | "published" | "draft">("all")

  const load = async () => {
    const { data, error } = await supabase.from("blogs").select("*").order("created_at", { ascending: false })
    if (error) toast.error(error.message)
    setPosts(data || [])
  }

  useEffect(() => { if (isAdmin) load() }, [isAdmin])

  const filtered = posts.filter((p) => {
    if (statusFilter !== "all" && p.status !== statusFilter) return false
    if (q && !p.title.toLowerCase().includes(q.toLowerCase())) return false
    return true
  })

  const remove = async (id: string) => {
    if (!confirm("Delete this post permanently?")) return
    const { error } = await supabase.from("blogs").delete().eq("id", id)
    if (error) return toast.error(error.message)
    toast.success("Deleted")
    load()
  }

  if (loading || !isAdmin) return <AdminLoading />

  return (
    <AdminShell title="Blog Posts" breadcrumb="Admin / Blog">
      <div className="flex flex-wrap items-center gap-3 mb-5">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search title…"
            className="w-full pl-9 pr-3 py-2 border rounded-lg bg-white" />
        </div>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as any)} className="px-3 py-2 border rounded-lg bg-white">
          <option value="all">All status</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
        </select>
        <Link to="/admin/blog/$id" params={{ id: "new" }} className="ml-auto inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white font-semibold" style={{ background: "#E6007E" }}>
          <Plus className="w-4 h-4" /> New Post
        </Link>
      </div>

      <div className="bg-white rounded-xl border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left text-xs uppercase text-muted-foreground">
            <tr>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Author</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Words</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && <tr><td colSpan={7} className="px-4 py-10 text-center text-muted-foreground">No posts found.</td></tr>}
            {filtered.map((p) => (
              <tr key={p.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">{p.title}</td>
                <td className="px-4 py-3 text-muted-foreground">{p.category || "-"}</td>
                <td className="px-4 py-3">
                  <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: p.status === "published" ? "#D1FADF" : "#FEF3C7", color: p.status === "published" ? "#027A48" : "#92400E" }}>{p.status}</span>
                </td>
                <td className="px-4 py-3 text-muted-foreground">{p.author || "-"}</td>
                <td className="px-4 py-3 text-muted-foreground">{new Date(p.published_at || p.created_at).toLocaleDateString()}</td>
                <td className="px-4 py-3 text-muted-foreground">{p.word_count || 0}</td>
                <td className="px-4 py-3 text-right">
                  <div className="inline-flex items-center gap-1">
                    <Link to="/admin/blog/$id" params={{ id: p.id }} className="p-1.5 hover:bg-pink-50 rounded" title="Edit"><Pencil className="w-4 h-4" /></Link>
                    {p.status === "published" && (
                      <Link to="/blog/$slug" params={{ slug: p.slug }} target="_blank" className="p-1.5 hover:bg-pink-50 rounded" title="View"><Eye className="w-4 h-4" /></Link>
                    )}
                    <button onClick={() => remove(p.id)} className="p-1.5 hover:bg-red-50 rounded text-red-600" title="Delete"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminShell>
  )
}
