import { useEffect, useState } from "react"
import { useNavigate, useRouterState } from "@tanstack/react-router"
import { supabase } from "@/integrations/supabase/client"

export function useAdminAuth(opts: { redirectIfNotAdmin?: boolean } = {}) {
  const { redirectIfNotAdmin = true } = opts
  const navigate = useNavigate()
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  const [loading, setLoading] = useState(true)
  const [userId, setUserId] = useState<string | null>(null)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    let cancelled = false

    const check = async (uid: string | null) => {
      if (!uid) {
        if (!cancelled) {
          setUserId(null); setIsAdmin(false); setLoading(false)
          if (redirectIfNotAdmin) navigate({ to: "/admin/login", search: { from: pathname } as any })
        }
        return
      }
      const { data } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", uid)
        .eq("role", "admin")
        .maybeSingle()
      if (cancelled) return
      const admin = !!data
      setUserId(uid); setIsAdmin(admin); setLoading(false)
      if (redirectIfNotAdmin && !admin) navigate({ to: "/admin/login", search: { from: pathname } as any })
    }

    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      check(session?.user?.id ?? null)
    })
    supabase.auth.getSession().then(({ data }) => check(data.session?.user?.id ?? null))

    return () => { cancelled = true; sub.subscription.unsubscribe() }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { loading, userId, isAdmin }
}
