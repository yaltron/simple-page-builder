import { createFileRoute } from "@tanstack/react-router"
import type {} from "@tanstack/react-start"
import { createClient } from "@supabase/supabase-js"

const BASE_URL = "https://subhashree-ui.lovable.app"

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const sb = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_PUBLISHABLE_KEY!)
        const { data: posts } = await sb
          .from("blogs")
          .select("slug,updated_at")
          .eq("status", "published")

        const staticEntries = [
          { path: "/", priority: "1.0", changefreq: "weekly" },
          { path: "/about", priority: "0.8", changefreq: "monthly" },
          { path: "/services", priority: "0.9", changefreq: "monthly" },
          { path: "/team", priority: "0.7", changefreq: "monthly" },
          { path: "/success-stories", priority: "0.7", changefreq: "monthly" },
          { path: "/blog", priority: "0.8", changefreq: "weekly" },
          { path: "/gallery", priority: "0.6", changefreq: "monthly" },
          { path: "/contact", priority: "0.8", changefreq: "monthly" },
        ]

        const urls: string[] = staticEntries.map(
          (e) => `  <url><loc>${BASE_URL}${e.path}</loc><changefreq>${e.changefreq}</changefreq><priority>${e.priority}</priority></url>`
        )

        for (const p of posts || []) {
          urls.push(`  <url><loc>${BASE_URL}/blog/${p.slug}</loc><lastmod>${new Date(p.updated_at).toISOString()}</lastmod><changefreq>monthly</changefreq><priority>0.7</priority></url>`)
        }

        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>`
        return new Response(xml, { headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=600" } })
      },
    },
  },
})
