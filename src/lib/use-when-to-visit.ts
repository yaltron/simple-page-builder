import { useEffect, useState } from "react"
import { supabase } from "@/integrations/supabase/client"

export type WhenToVisitItem = {
  id: string
  text: string
  order_index: number
  is_active: boolean
}

let cache: WhenToVisitItem[] | null = null

export function useWhenToVisitItems(fallback: string[] = []): WhenToVisitItem[] {
  const [items, setItems] = useState<WhenToVisitItem[]>(
    cache ?? fallback.map((text, i) => ({ id: `f-${i}`, text, order_index: i, is_active: true })),
  )
  useEffect(() => {
    let cancelled = false
    ;(async () => {
      const { data } = await supabase
        .from("when_to_visit_items")
        .select("id,text,order_index,is_active")
        .eq("is_active", true)
        .order("order_index", { ascending: true })
      if (cancelled) return
      if (data && data.length) {
        cache = data as WhenToVisitItem[]
        setItems(data as WhenToVisitItem[])
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])
  return items
}
