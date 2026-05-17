import { useEffect, useState } from "react"
import { Link } from "@tanstack/react-router"
import { motion } from "framer-motion"
import { supabase } from "@/integrations/supabase/client"

type BlogPost = {
  id: string
  title: string
  slug: string
  excerpt: string | null
  featured_image: string | null
  featured_image_alt: string | null
  category: string | null
  published_at: string | null
}

const fmtDate = (d: string | null) =>
  d
    ? new Date(d).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : ""

export function BlogPreview() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    ;(async () => {
      const { data } = await supabase
        .from("blogs")
        .select(
          "id,title,slug,excerpt,featured_image,featured_image_alt,category,published_at",
        )
        .eq("status", "published")
        .order("published_at", { ascending: false })
        .limit(3)
      setPosts((data as BlogPost[]) || [])
      setLoaded(true)
    })()
  }, [])

  if (!loaded || posts.length === 0) return null

  return (
    <section style={{ background: "#ffffff", padding: "70px 8%" }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="text-center"
        style={{ marginBottom: 48 }}
      >
        <h2
          style={{
            fontFamily: "'Playfair Display', serif",
            color: "#C2185B",
            fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
            fontWeight: 700,
            margin: 0,
          }}
        >
          Latest From Our Blog
        </h2>
        <p
          style={{
            color: "#7A2050",
            fontSize: 16,
            marginTop: 12,
            marginBottom: 0,
          }}
        >
          Expert insights, fertility tips and patient stories
        </p>
      </motion.div>

      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        style={{ gap: 24, maxWidth: 1200, margin: "0 auto" }}
      >
        {posts.map((post, i) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: i * 0.15, ease: "easeOut" }}
          >
            <Link
              to="/blog/$slug"
              params={{ slug: post.slug }}
              className="blog-preview-card"
              style={{
                display: "block",
                background: "#ffffff",
                borderRadius: 20,
                border: "1px solid rgba(230,0,126,0.10)",
                overflow: "hidden",
                boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease",
                cursor: "pointer",
                textDecoration: "none",
                color: "inherit",
                height: "100%",
              }}
            >
              <div
                style={{
                  height: 200,
                  width: "100%",
                  background:
                    "linear-gradient(135deg, #FFF1F7, #EAF7FD)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 40,
                }}
              >
                {post.featured_image ? (
                  <img
                    src={post.featured_image}
                    alt={post.featured_image_alt || post.title}
                    loading="lazy"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <span aria-hidden>📝</span>
                )}
              </div>
              <div style={{ padding: 20 }}>
                {post.category && (
                  <span
                    style={{
                      background: "#FFF1F7",
                      color: "#E6007E",
                      borderRadius: 50,
                      padding: "4px 12px",
                      fontSize: 11,
                      fontWeight: 700,
                      display: "inline-block",
                      marginBottom: 10,
                    }}
                  >
                    {post.category}
                  </span>
                )}
                <h3
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 17,
                    fontWeight: 700,
                    color: "#2D0A1E",
                    lineHeight: 1.4,
                    margin: 0,
                    marginBottom: 10,
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {post.title}
                </h3>
                {post.excerpt && (
                  <p
                    style={{
                      fontSize: 14,
                      color: "#7A2050",
                      lineHeight: 1.65,
                      margin: 0,
                      marginBottom: 16,
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {post.excerpt}
                  </p>
                )}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderTop: "1px solid rgba(230,0,126,0.08)",
                    paddingTop: 14,
                  }}
                >
                  <span style={{ fontSize: 12, color: "#b06090" }}>
                    {fmtDate(post.published_at)}
                  </span>
                  <span
                    style={{
                      color: "#E6007E",
                      fontSize: 13,
                      fontWeight: 700,
                    }}
                    className="blog-preview-readmore"
                  >
                    Read More →
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="text-center" style={{ marginTop: 40 }}>
        <Link
          to="/blog"
          className="blog-preview-cta"
          style={{
            display: "inline-block",
            border: "2px solid #E6007E",
            color: "#E6007E",
            background: "transparent",
            padding: "12px 32px",
            borderRadius: 50,
            fontWeight: 700,
            textDecoration: "none",
            transition: "background 0.25s ease, color 0.25s ease",
          }}
        >
          View All Posts →
        </Link>
      </div>
    </section>
  )
}
