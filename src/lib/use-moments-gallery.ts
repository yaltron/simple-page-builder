import { useEffect, useState } from "react"
import { supabase } from "@/integrations/supabase/client"

export type SpanClass = "normal" | "wide" | "wider" | "high"

export type MomentItem = {
  id: string
  image_url: string
  image_alt: string | null
  span_class: SpanClass
  order_index: number
  is_active: boolean
}

export function useMomentsGallery() {
  const [items, setItems] = useState<MomentItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      const { data } = await supabase
        .from("moments_gallery")
        .select("*")
        .eq("is_active", true)
        .order("order_index", { ascending: true })
      if (cancelled) return
      setItems((data ?? []) as MomentItem[])
      setLoading(false)
    })()

    const channel = supabase
      .channel("moments_gallery_public")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "moments_gallery" },
        async () => {
          const { data } = await supabase
            .from("moments_gallery")
            .select("*")
            .eq("is_active", true)
            .order("order_index", { ascending: true })
          if (!cancelled) setItems((data ?? []) as MomentItem[])
        }
      )
      .subscribe()

    return () => {
      cancelled = true
      supabase.removeChannel(channel)
    }
  }, [])

  return { items, loading }
}
