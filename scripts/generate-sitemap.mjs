// Build-time sitemap generator. Runs as "prebuild" (see package.json) since
// the site is served via `vite preview` under PM2, not Cloudflare Workers —
// a Nitro server route (src/routes/sitemap[.]xml.ts) never executes there.
import { createClient } from "@supabase/supabase-js"
import { writeFile } from "node:fs/promises"
import path from "node:path"
import process from "node:process"

try {
  process.loadEnvFile()
} catch {
  // .env not present; rely on already-exported environment variables
}

const BASE_URL = "https://shubhashreeivf.com"
const OUTPUT_PATH = path.resolve(process.cwd(), "public/sitemap.xml")

const SUPABASE_URL = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL
const SUPABASE_KEY = process.env.VITE_SUPABASE_PUBLISHABLE_KEY || process.env.SUPABASE_PUBLISHABLE_KEY

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error("[sitemap] Missing SUPABASE_URL / SUPABASE_PUBLISHABLE_KEY env vars.")
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

const STATIC_PAGES = [
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

function escapeXml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
}

function toLastmod(value) {
  const date = value ? new Date(value) : new Date()
  return Number.isNaN(date.getTime()) ? new Date().toISOString().split("T")[0] : date.toISOString().split("T")[0]
}

function buildUrls(rows, pathPrefix, priority) {
  return (rows ?? [])
    .filter((row) => !!row.slug)
    .map((row) => {
      const lastmod = toLastmod(row.updated_at)
      return `  <url><loc>${BASE_URL}${pathPrefix}${escapeXml(row.slug)}</loc><lastmod>${lastmod}</lastmod><changefreq>monthly</changefreq><priority>${priority}</priority></url>`
    })
}

async function buildSitemapXml() {
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
  ]) {
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

  const urls = [...staticUrls, ...blogUrls, ...serviceUrls, ...doctorUrls, ...whyUsUrls]

  return {
    xml: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>\n`,
    count: urls.length,
  }
}

const { xml, count } = await buildSitemapXml()
await writeFile(OUTPUT_PATH, xml, "utf-8")
console.log(`[sitemap] Wrote ${count} URLs to ${path.relative(process.cwd(), OUTPUT_PATH)}`)
