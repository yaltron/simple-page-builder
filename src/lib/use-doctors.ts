import { useEffect, useState } from "react"
import { supabase } from "@/integrations/supabase/client"

export type CMSDoctor = {
  id: string
  name: string
  slug: string | null
  title: string | null
  bio: string | null
  image: string | null
  specialties: string[] | null
  qualifications: string | null
  experience_years: number | null
  display_order: number
  status: string
}

export function useDoctors() {
  const [doctors, setDoctors] = useState<CMSDoctor[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    const fetchDoctors = async () => {
      const { data } = await supabase
        .from("doctors")
        .select("*")
        .eq("status", "published")
        .order("display_order", { ascending: true })
      if (mounted) {
        setDoctors((data as CMSDoctor[]) || [])
        setLoading(false)
      }
    }
    fetchDoctors()

    const channel = supabase
      .channel("doctors-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "doctors" },
        () => fetchDoctors(),
      )
      .subscribe()

    return () => {
      mounted = false
      supabase.removeChannel(channel)
    }
  }, [])

  return { doctors, loading }
}
