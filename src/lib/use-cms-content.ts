import { useEffect, useState } from "react"
import { supabase } from "@/integrations/supabase/client"

type Cache = Record<string, any>
const homepageCache: Cache = {}
const aboutCache: Cache = {}

export function useHomepageSection<T = any>(section: string, defaults: T): T {
  const [data, setData] = useState<T>(homepageCache[section] ?? defaults)
  useEffect(() => {
    let cancelled = false
    ;(async () => {
      const { data: row } = await supabase
        .from("homepage_content")
        .select("content")
        .eq("section", section)
        .maybeSingle()
      if (cancelled) return
      if (row?.content) {
        const merged = { ...defaults, ...(row.content as object) } as T
        homepageCache[section] = merged
        setData(merged)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [section])
  return data
}

export function useAboutSection<T = any>(section: string, defaults: T): T {
  const [data, setData] = useState<T>(aboutCache[section] ?? defaults)
  useEffect(() => {
    let cancelled = false
    ;(async () => {
      const { data: row } = await supabase
        .from("about_content")
        .select("content")
        .eq("section", section)
        .maybeSingle()
      if (cancelled) return
      if (row?.content) {
        const merged = { ...defaults, ...(row.content as object) } as T
        aboutCache[section] = merged
        setData(merged)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [section])
  return data
}

/**
 * Convert a YouTube/Vimeo share URL into an embed URL.
 * Supports: youtube.com/watch?v=ID, youtu.be/ID, youtube.com/embed/ID,
 * vimeo.com/ID, vimeo.com/video/ID, player.vimeo.com/video/ID.
 * Returns the URL unchanged if it doesn't match.
 */
export function toEmbedUrl(url: string): string {
  if (!url) return url
  try {
    const u = new URL(url)
    const host = u.hostname.replace(/^www\./, "")
    if (host === "youtube.com" || host === "m.youtube.com") {
      const id = u.searchParams.get("v")
      if (id) return `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`
      if (u.pathname.startsWith("/embed/")) return url + (url.includes("?") ? "&" : "?") + "autoplay=1"
    }
    if (host === "youtu.be") {
      const id = u.pathname.slice(1)
      if (id) return `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`
    }
    if (host === "vimeo.com") {
      const id = u.pathname.split("/").filter(Boolean).pop()
      if (id) return `https://player.vimeo.com/video/${id}?autoplay=1`
    }
    if (host === "player.vimeo.com") {
      return url + (url.includes("?") ? "&" : "?") + "autoplay=1"
    }
  } catch {
    // not a URL — fall through
  }
  return url
}
