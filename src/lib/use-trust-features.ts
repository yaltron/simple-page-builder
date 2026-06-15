import { useEffect, useState } from "react"
import { supabase } from "@/integrations/supabase/client"

export type TrustFeature = {
  id: string
  title: string
  slug: string
  short_description: string
  full_content: string
  icon: string
  icon_bg_color: string
  page_heading: string
  page_subtext: string
  meta_title: string
  meta_description: string
  order_index: number
  is_active: boolean
}

export function useTrustFeatures() {
  const [items, setItems] = useState<TrustFeature[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    const load = async () => {
      const { data } = await supabase
        .from("trust_features" as any)
        .select("*")
        .eq("is_active", true)
        .order("order_index", { ascending: true })
      if (mounted) {
        setItems((data as TrustFeature[]) || [])
        setLoading(false)
      }
    }
    load()
    const ch = supabase
      .channel("trust-features-changes")
      .on("postgres_changes", { event: "*", schema: "public", table: "trust_features" }, () => load())
      .subscribe()
    return () => {
      mounted = false
      supabase.removeChannel(ch)
    }
  }, [])

  return { items, loading }
}
