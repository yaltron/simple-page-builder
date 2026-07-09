import { createFileRoute, Link, notFound } from "@tanstack/react-router"
import { createServerFn } from "@tanstack/react-start"
import { Calendar } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import type { CMSDoctor } from "@/lib/use-doctors"

const fetchDoctor = createServerFn({ method: "GET" })
  .inputValidator((data: { slug: string }) => data)
  .handler(async ({ data }) => {
    const { createClient } = await import("@supabase/supabase-js")
    const sb = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_PUBLISHABLE_KEY!)
    const { data: doctor } = await sb
      .from("doctors")
      .select("*")
      .eq("slug", data.slug)
      .eq("status", "published")
      .maybeSingle()
    if (!doctor) throw notFound()
    return doctor as CMSDoctor
  })

export const Route = createFileRoute("/team/$doctorSlug")({
  loader: ({ params }) => fetchDoctor({ data: { slug: params.doctorSlug } }),
  head: ({ loaderData }) => {
    const doctor = loaderData as CMSDoctor
    const title = `${doctor.name} - Shubhashree IVF`
    const url = `https://shubhashreeivf.com/team/${doctor.slug}`
    return {
      meta: [
        { title },
        { property: "og:url", content: url },
        { property: "og:title", content: title },
        { name: "twitter:title", content: title },
      ],
      links: [{ rel: "canonical", href: url }],
    }
  },
  component: DoctorProfilePage,
  errorComponent: ({ error }) => <div className="p-10 text-center">{error.message}</div>,
  notFoundComponent: () => <div className="p-10 text-center">Doctor not found</div>,
})

function DoctorProfilePage() {
  const doctor = Route.useLoaderData() as CMSDoctor

  return (
    <main>
      <Navbar />


      {/* Breadcrumb */}
      <div style={{ background: "#FFF1F7", padding: "12px 5%" }}>
        <div className="max-w-7xl mx-auto text-sm" style={{ color: "#7A2050" }}>
          <Link to="/" style={{ color: "#7A2050" }}>Home</Link>
          <span style={{ margin: "0 8px", opacity: 0.6 }}>›</span>
          <Link to="/team" style={{ color: "#7A2050" }}>Our Team</Link>
          <span style={{ margin: "0 8px", opacity: 0.6 }}>›</span>
          <span style={{ color: "#8B0F50", fontWeight: 600 }}>{doctor.name}</span>
        </div>
      </div>

      {/* Main two-column content */}
      <section style={{ background: "#fff", padding: "60px 5%" }}>
        <div className="max-w-7xl mx-auto grid md:grid-cols-[2fr_3fr] gap-10 items-start">
          {/* Left */}
          <div>
            {doctor.image && (
              <img
                src={doctor.image}
                alt={doctor.name}
                style={{ width: "100%", aspectRatio: "4/5", objectFit: "cover", borderRadius: 20, display: "block" }}
              />
            )}
            <Link
              to="/contact"
              className="mt-5 w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-full font-bold transition-transform hover:scale-[1.02]"
              style={{ background: "#8B0F50", color: "#fff" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.background = "#6D0A3E")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.background = "#8B0F50")}
            >
              <Calendar className="w-4 h-4" /> Book Consultation with {doctor.name.replace(/^Dr\.?\s*/, "Dr. ")}
            </Link>
          </div>

          {/* Right */}
          <div>
            <h2 className="font-serif font-bold" style={{ color: "#C2185B", fontSize: "clamp(26px, 3vw, 36px)", margin: 0 }}>
              {doctor.name}
            </h2>
            {doctor.title && (
              <p style={{ color: "#8B0F50", fontWeight: 700, fontSize: 15, marginTop: 6 }}>{doctor.title}</p>
            )}
            {doctor.nmc_number && (
              <p style={{ color: doctor.nmc_color || "#8B0F50", fontSize: 12, fontWeight: 600, marginTop: 4 }}>
                NMC No: {doctor.nmc_number}
              </p>
            )}
            <hr style={{ margin: "18px 0", border: 0, borderTop: "1px solid rgba(139,15,80,0.18)" }} />

            <div className="flex flex-wrap gap-2 mb-6">
              {doctor.experience_years ? (
                <Chip>{doctor.experience_years}+ Years Experience</Chip>
              ) : null}
              {doctor.qualifications ? <Chip>{doctor.qualifications}</Chip> : null}
            </div>

            {doctor.bio && (
              <>
                <h3 className="font-serif font-bold mb-2" style={{ color: "#8B0F50", fontSize: 22 }}>About {doctor.name}</h3>
                <p style={{ color: "#3D2040", lineHeight: 1.8, marginBottom: 24 }}>{doctor.bio}</p>
              </>
            )}

            {doctor.specialties && doctor.specialties.length > 0 && (
              <>
                <h3 className="font-serif font-bold mb-3" style={{ color: "#8B0F50", fontSize: 22 }}>Areas of Expertise</h3>
                <ul style={{ paddingLeft: 0, listStyle: "none", marginBottom: 24 }}>
                  {doctor.specialties.map((s) => (
                    <li key={s} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 8, color: "#3D2040" }}>
                      <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#8B0F50", marginTop: 8, flexShrink: 0 }} />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </>
            )}

            {doctor.qualifications && (
              <>
                <h3 className="font-serif font-bold mb-2" style={{ color: "#8B0F50", fontSize: 22 }}>Qualifications</h3>
                <p style={{ color: "#3D2040", lineHeight: 1.8 }}>{doctor.qualifications}</p>
              </>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span style={{ background: "#FFF1F7", color: "#8B0F50", borderRadius: 50, padding: "6px 14px", fontSize: 13, fontWeight: 600 }}>
      {children}
    </span>
  )
}
