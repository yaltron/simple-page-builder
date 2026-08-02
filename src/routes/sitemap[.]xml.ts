import { createFileRoute } from "@tanstack/react-router"
import { supabase } from "@/integrations/supabase/client"

const BASE_URL = "https://shubhashreeivf.com"

const STATIC_PAGES: { path: string; changefreq: string; priority: string }[] = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/about", changefreq: "monthly", priority: "0.8" },
  { path: "/services", changefreq: "monthly", priority: "0.9" },
  { path: "/team", changefreq: "monthly", priority: "0.8" },
  { path: "/contact", changefreq: "monthly", priority: "0.8" },
  { path: "/blog", changefreq: "weekly", priority: "0.8" },
  { path: "/faqs", changefreq: "monthly", priority: "0.6" },
  { path: "/careers", changefreq: "monthly", priority: "0.5" },
  { path: "/gallery", changefreq: "monthly", priority: "0.6" },
  { path: "/success-stories", changefreq: "monthly", priority: "0.7" },
  { path: "/privacy-policy", changefreq: "yearly", priority: "0.3" },
]

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
}

function toLastmod(value: string | null): string {
  const date = value ? new Date(value) : new Date()
  return Number.isNaN(date.getTime()) ? new Date().toISOString().split("T")[0] : date.toISOString().split("T")[0]
}

function buildUrls(
  rows: { slug: string | null; updated_at: string | null }[] | null,
  pathPrefix: string,
  priority: string,
): string[] {
  return (rows ?? [])
    .filter((row): row is { slug: string; updated_at: string | null } => !!row.slug)
    .map((row) => {
      const lastmod = toLastmod(row.updated_at)
      return `  <url><loc>${BASE_URL}${pathPrefix}${escapeXml(row.slug)}</loc><lastmod>${lastmod}</lastmod><changefreq>monthly</changefreq><priority>${priority}</priority></url>`
    })
}

async function buildSitemapXml(): Promise<string> {
  const [blogsRes, servicesRes, doctorsRes, trustFeaturesRes] = await Promise.all([
    supabase
      .from("blogs")
      .select("slug,updated_at,published_at")
      .eq("status", "published")
      .order("published_at", { ascending: false }),
    supabase.from("services").select("slug,updated_at").eq("status", "published"),
    supabase.from("doctors").select("slug,updated_at").eq("status", "published"),
    supabase.from("trust_features").select("slug,updated_at").eq("is_active", true),
  ])

  for (const [label, res] of [
    ["blogs", blogsRes],
    ["services", servicesRes],
    ["doctors", doctorsRes],
    ["trust_features", trustFeaturesRes],
  ] as const) {
    if (res.error) {
      console.error(`[sitemap] Failed to fetch ${label}:`, res.error.message)
    }
  }

  const today = new Date().toISOString().split("T")[0]

  const staticUrls = STATIC_PAGES.map(
    (page) =>
      `  <url><loc>${BASE_URL}${page.path}</loc><lastmod>${today}</lastmod><changefreq>${page.changefreq}</changefreq><priority>${page.priority}</priority></url>`,
  )

  const blogUrls = (blogsRes.data ?? []).map((blog) => {
    const lastmod = toLastmod(blog.updated_at ?? blog.published_at)
    return `  <url><loc>${BASE_URL}/blog/${escapeXml(blog.slug)}</loc><lastmod>${lastmod}</lastmod><changefreq>monthly</changefreq><priority>0.7</priority></url>`
  })

  const serviceUrls = buildUrls(servicesRes.data, "/services/", "0.7")
  const doctorUrls = buildUrls(doctorsRes.data, "/team/", "0.6")
  const whyUsUrls = buildUrls(trustFeaturesRes.data, "/why-us/", "0.5")

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${[...staticUrls, ...blogUrls, ...serviceUrls, ...doctorUrls, ...whyUsUrls].join("\n")}\n</urlset>\n`
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const xml = await buildSitemapXml()
        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
          },
        })
      },
    },
  },
})
