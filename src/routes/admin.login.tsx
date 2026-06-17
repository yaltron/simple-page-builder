import { useState } from "react"
import { createFileRoute, useNavigate, Link } from "@tanstack/react-router"
import { supabase } from "@/integrations/supabase/client"
import { toast } from "sonner"
import { Eye, EyeOff, Loader2, Hospital, FileText, Users } from "lucide-react"
const logo = "/logo.png"

export const Route = createFileRoute("/admin/login")({
  component: AdminLoginPage,
})

function AdminLoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [showPw, setShowPw] = useState(false)
  const [err, setErr] = useState<string | null>(null)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErr(null)
    setLoading(true)
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setErr("Invalid email or password. Please try again.")
      setLoading(false)
      return
    }
    const uid = data.user?.id
    const { data: role } = await supabase.from("user_roles").select("role").eq("user_id", uid!).eq("role", "admin").maybeSingle()
    if (!role) {
      await supabase.auth.signOut()
      setErr("This account doesn't have admin access.")
      setLoading(false)
      return
    }
    toast.success("Welcome back")
    navigate({ to: "/admin" })
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "13px 16px",
    border: "1.5px solid rgba(230,0,126,0.2)",
    borderRadius: 12,
    fontSize: 15,
    background: "white",
    outline: "none",
    transition: "border-color 0.2s ease, box-shadow 0.2s ease",
  }
  const onFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.currentTarget.style.borderColor = "#E6007E"
    e.currentTarget.style.boxShadow = "0 0 0 3px rgba(230,0,126,0.1)"
  }
  const onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    e.currentTarget.style.borderColor = "rgba(230,0,126,0.2)"
    e.currentTarget.style.boxShadow = "none"
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
      {/* LEFT PANEL */}
      <div
        style={{
          flex: "0 0 45%",
          minWidth: 320,
          minHeight: "100vh",
          background: "linear-gradient(135deg, #2D0A1E 0%, #880E4F 60%, #E6007E 100%)",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px 40px",
          overflow: "hidden",
        }}
        className="admin-login-left"
      >
        {/* decorative blobs */}
        <div style={{ position: "absolute", top: -120, left: -120, width: 360, height: 360, borderRadius: "50%", background: "white", opacity: 0.05, filter: "blur(40px)" }} />
        <div style={{ position: "absolute", bottom: -140, right: -100, width: 400, height: 400, borderRadius: "50%", background: "white", opacity: 0.05, filter: "blur(50px)" }} />

        <div style={{ position: "relative", zIndex: 1, textAlign: "center", width: "100%", maxWidth: 360 }}>
          <img src={logo} alt="Subhashree IVF" className="crisp-logo" style={{ height: 60, width: "auto", maxWidth: 200, objectFit: "contain", objectPosition: "center", display: "block", margin: "0 auto 24px", background: "white", borderRadius: 12, padding: 8 }} />
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, color: "white", fontWeight: 700, textAlign: "center" }}>
            Subhashree IVF
          </div>
          <div style={{ fontSize: 13, letterSpacing: 2, textTransform: "uppercase", color: "rgba(255,255,255,0.55)", textAlign: "center", marginTop: 6, marginBottom: 40 }}>
            Fertility &amp; IVF Centre
          </div>
          <div className="admin-login-pills" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
            {[
              { icon: <Hospital className="w-4 h-4" />, label: "Manage Appointments" },
              { icon: <FileText className="w-4 h-4" />, label: "Edit Content & Blog" },
              { icon: <Users className="w-4 h-4" />, label: "Team & Services" },
            ].map((p) => (
              <span key={p.label} style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 50, padding: "10px 20px", color: "white", fontSize: 13, fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 8 }}>
                {p.icon}{p.label}
              </span>
            ))}
          </div>
        </div>

        <div style={{ position: "absolute", bottom: 24, left: 0, right: 0, fontSize: 11, color: "rgba(255,255,255,0.3)", textAlign: "center" }}>
          Secure admin access only
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div
        style={{
          flex: "1 1 55%",
          minWidth: 320,
          minHeight: "100vh",
          background: "#FFFAF8",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "60px 10%",
        }}
      >
        <div style={{ width: "100%", maxWidth: 440, margin: "0 auto" }}>
          <img src={logo} alt="Subhashree IVF" className="crisp-logo" style={{ height: 60, width: "auto", maxWidth: 200, objectFit: "contain", objectPosition: "center", display: "block", margin: "0 auto 8px" }} />
          <div style={{ fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase", color: "#b06090", textAlign: "center", marginBottom: 40 }}>
            CMS Dashboard
          </div>

          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, fontWeight: 700, color: "#2D0A1E", marginBottom: 6 }}>Welcome Back</h1>
          <p style={{ fontSize: 15, color: "#7A2050", marginBottom: 36 }}>Sign in to your admin dashboard</p>

          <form onSubmit={submit}>
            <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: "#2D0A1E", marginBottom: 6 }}>Email Address</label>
            <input
              type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
              style={{ ...inputStyle, marginBottom: 20 }}
              onFocus={onFocus} onBlur={onBlur}
            />

            <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: "#2D0A1E", marginBottom: 6 }}>Password</label>
            <div style={{ position: "relative", marginBottom: 8 }}>
              <input
                type={showPw ? "text" : "password"} required value={password} onChange={(e) => setPassword(e.target.value)}
                style={{ ...inputStyle, paddingRight: 44 }}
                onFocus={onFocus} onBlur={onBlur}
              />
              <button
                type="button"
                onClick={() => setShowPw(v => !v)}
                aria-label={showPw ? "Hide password" : "Show password"}
                style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "transparent", border: "none", cursor: "pointer", color: "#b06090", padding: 4, display: "flex" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#E6007E")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#b06090")}
              >
                {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            <button
              disabled={loading}
              type="submit"
              style={{
                width: "100%",
                padding: 14,
                borderRadius: 50,
                background: "linear-gradient(135deg, #E6007E, #B5005F)",
                color: "white",
                fontSize: 16,
                fontWeight: 700,
                border: "none",
                cursor: loading ? "not-allowed" : "pointer",
                marginTop: 8,
                boxShadow: "0 8px 24px rgba(230,0,126,0.3)",
                transition: "all 0.25s ease",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                opacity: loading ? 0.85 : 1,
              }}
              onMouseEnter={(e) => {
                if (loading) return
                e.currentTarget.style.opacity = "0.92"
                e.currentTarget.style.transform = "translateY(-1px)"
                e.currentTarget.style.boxShadow = "0 12px 32px rgba(230,0,126,0.4)"
              }}
              onMouseLeave={(e) => {
                if (loading) return
                e.currentTarget.style.opacity = "1"
                e.currentTarget.style.transform = "translateY(0)"
                e.currentTarget.style.boxShadow = "0 8px 24px rgba(230,0,126,0.3)"
              }}
            >
              {loading ? (<><Loader2 className="w-4 h-4 animate-spin" /> Signing in…</>) : "Sign In"}
            </button>

            {err && (
              <div style={{ background: "#FFF1F7", border: "1px solid rgba(230,0,126,0.3)", borderRadius: 10, padding: "10px 14px", color: "#C2185B", fontSize: 13, fontWeight: 600, marginTop: 12 }}>
                {err}
              </div>
            )}
          </form>

          <div style={{ borderTop: "1px solid rgba(230,0,126,0.15)", marginTop: 32, paddingTop: 16 }}>
            <div style={{ fontSize: 12, color: "#b06090", textAlign: "center" }}>
              © 2025 Subhashree IVF Clinic Pvt. Ltd.
            </div>
            <Link to="/" className="block text-center text-xs mt-3" style={{ color: "#b06090" }}>← Back to website</Link>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .admin-login-left {
            flex: 0 0 100% !important;
            min-height: 200px !important;
            padding: 24px !important;
          }
          .admin-login-left .admin-login-pills { display: none !important; }
        }
      `}</style>
    </div>
  )
}
