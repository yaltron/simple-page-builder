import { useState } from "react"
import { createFileRoute, useNavigate, Link } from "@tanstack/react-router"
import { supabase } from "@/integrations/supabase/client"
import { toast } from "sonner"
import { Hospital } from "lucide-react"

export const Route = createFileRoute("/admin/login")({
  component: AdminLoginPage,
})

function AdminLoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) { toast.error(error.message); setLoading(false); return }
    // Verify admin role
    const uid = data.user?.id
    const { data: role } = await supabase.from("user_roles").select("role").eq("user_id", uid!).eq("role", "admin").maybeSingle()
    if (!role) {
      await supabase.auth.signOut()
      toast.error("This account doesn't have admin access.")
      setLoading(false); return
    }
    toast.success("Welcome back")
    navigate({ to: "/admin" })
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{ background: "#f8f9fa" }}>
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-8 border">
        <div className="flex items-center gap-2 mb-6">
          <Hospital className="w-6 h-6" style={{ color: "#E6007E" }} />
          <span className="font-serif font-bold" style={{ color: "#2D0A1E" }}>Subhashree CMS</span>
        </div>
        <h1 className="text-2xl font-bold mb-1" style={{ color: "#2D0A1E" }}>Admin Login</h1>
        <p className="text-sm text-muted-foreground mb-6">Sign in to manage content</p>
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="text-sm font-medium block mb-1">Email</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500" />
          </div>
          <div>
            <label className="text-sm font-medium block mb-1">Password</label>
            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500" />
          </div>
          <button disabled={loading} type="submit"
            className="w-full py-2.5 rounded-lg text-white font-semibold disabled:opacity-60"
            style={{ background: "#E6007E" }}>
            {loading ? "Signing in…" : "Login to CMS"}
          </button>
        </form>
        <Link to="/" className="block text-center text-xs text-muted-foreground mt-6 hover:text-pink-600">← Back to website</Link>
      </div>
    </div>
  )
}
