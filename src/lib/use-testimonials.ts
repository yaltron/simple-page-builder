import { useEffect, useState } from "react"
import { supabase } from "@/integrations/supabase/client"

export type CMSTestimonial = {
  id: string
  name: string
  location: string | null
  story: string | null
  image: string | null
  video_url: string | null
  rating: number | null
  treatment: string | null
  display_order: number
  status: string
}

export function useTestimonials() {
  const [items, setItems] = useState<CMSTestimonial[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    const load = async () => {
      const { data } = await supabase
        .from("testimonials")
        .select("*")
        .eq("status", "published")
        .order("display_order", { ascending: true })
      if (mounted) {
        setItems((data as CMSTestimonial[]) || [])
        setLoading(false)
      }
    }
    load()
    const channel = supabase
      .channel("testimonials-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "testimonials" },
        () => load(),
      )
      .subscribe()
    return () => {
      mounted = false
      supabase.removeChannel(channel)
    }
  }, [])

  return { items, loading }
}
