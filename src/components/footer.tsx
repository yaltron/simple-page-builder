import { Link } from "@tanstack/react-router"
import { Facebook, Instagram, Youtube, MapPin, Phone, Mail, Clock } from "lucide-react"
import logo from "@/assets/logo-trimmed.png"

const quickLinks = [
  { name: "About Us", to: "/about" },
  { name: "Services", to: "/services" },
  { name: "Our Team", to: "/team" },
  { name: "Success Stories", to: "/success-stories" },
  { name: "Blog", to: "/blog" },
  { name: "FAQs", to: "/faqs" },
  { name: "Career", to: "/careers" },
  { name: "Contact", to: "/contact" },
] as const

const services = [
  "IVF Treatment",
  "ICSI Procedure",
  "Embryo Freezing",
  "Genetic Testing (PGT)",
  "Donor Egg Programme",
  "Infertility Diagnosis",
]

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  )
}

const socialLinks = [
  { Icon: Facebook, href: "https://www.facebook.com/shubhashreeivf/", label: "Facebook" },
  { Icon: Instagram, href: "https://www.instagram.com/shubhashreeivf/", label: "Instagram" },
  { Icon: Youtube, href: "https://www.youtube.com/hashtag/shubhashreeivf", label: "YouTube" },
  { Icon: TikTokIcon, href: "https://www.tiktok.com/@shubhashreeivfclinic", label: "TikTok" },
]

const headingStyle: React.CSSProperties = {
  fontWeight: 700,
  fontSize: 17,
  color: "#8B0F50",
  position: "relative",
  paddingBottom: 6,
  marginBottom: 10,
  display: "inline-block",
}

function ColumnHeading({ children }: { children: React.ReactNode }) {
  return <h4 style={headingStyle}>{children}</h4>
}

const linkStyle: React.CSSProperties = {
  color: "#7A2050",
  fontSize: 15,
  fontWeight: 500,
  lineHeight: 1.8,
  display: "inline-block",
  transition: "color 0.2s, padding-left 0.2s",
}

const contactItems = [
  { Icon: MapPin, label: "Address", value: "Kathmandu, Nepal", href: "https://maps.app.goo.gl/uBT758S7LyZYjHJz5", external: true },
  { Icon: Phone, label: "Phone", value: "+977 9861141699", href: "tel:+9779861141699", external: false },
  { Icon: Mail, label: "Email", value: "Shubhashreeivf@gmail.com", href: "mailto:Shubhashreeivf@gmail.com", external: false },
  { Icon: Clock, label: "Hours", value: "Sun–Fri: 8:00 AM – 6:00 PM", href: undefined, external: false },
] as const

export function Footer() {
  return (
    <footer className="footer-root">
      {/* ROW 1 — Main footer */}
      <div
        className="footer-main"
        style={{
          background: "#FFF1F7",
          padding: "60px 8%",
        }}
      >
        <div className="footer-grid grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1 - Brand */}
          <div className="footer-col-brand space-y-5">
            <Link to="/" className="inline-flex items-center w-fit" style={{ marginBottom: 16 }}>
              <img
                src={logo}
                alt="Shubhashree IVF Clinic Pvt. Ltd."
                className="footer-logo"
                style={{ width: 200, height: "auto" }}
              />
            </Link>
            <p style={{ color: "#7A2050", fontSize: 14, lineHeight: 1.7, textAlign: "justify" }}>
              Supporting your journey to parenthood with advanced fertility treatments and customized care plans, ensuring dignity, comfort, confidentiality, and the hope of bringing happiness into your life.
            </p>
            <div className="flex gap-2.5">
              {socialLinks.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: "50%",
                    background: "white",
                    border: "1.5px solid rgba(230,0,126,0.2)",
                    color: "#E6007E",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#E6007E"
                    e.currentTarget.style.color = "white"
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "white"
                    e.currentTarget.style.color = "#E6007E"
                  }}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2 - Quick Links */}
          <div className="footer-col-quick">
            <ColumnHeading>Quick Links</ColumnHeading>
            <ul>
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.to}
                    style={linkStyle}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "#E6007E"
                      e.currentTarget.style.paddingLeft = "4px"
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "#7A2050"
                      e.currentTarget.style.paddingLeft = "0"
                    }}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Services */}
          <div className="footer-col-services">
            <ColumnHeading>Our Services</ColumnHeading>
            <ul>
              {services.map((service) => (
                <li key={service}>
                  <Link
                    to="/services"
                    style={linkStyle}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "#E6007E"
                      e.currentTarget.style.paddingLeft = "4px"
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "#7A2050"
                      e.currentTarget.style.paddingLeft = "0"
                    }}
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 - Contact */}
          <div>
            <ColumnHeading>Contact Us</ColumnHeading>
            <ul>
              {contactItems.map(({ Icon, label, value, href, external }) => (
                <li
                  key={label}
                  style={{
                    display: "flex",
                    gap: 12,
                    alignItems: "flex-start",
                    marginBottom: 14,
                  }}
                >
                  <span
                    style={{
                      width: 28,
                      height: 28,
                      flexShrink: 0,
                      borderRadius: "50%",
                      background: "white",
                      border: "1px solid rgba(230,0,126,0.2)",
                      color: "#E6007E",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Icon size={13} />
                  </span>
                  <div>
                    <div style={{ fontWeight: 700, color: "#8B0F50", fontSize: 13 }}>{label}</div>
                    {href ? (
                      <a
                        href={href}
                        target={external ? "_blank" : undefined}
                        rel={external ? "noopener noreferrer" : undefined}
                        style={{ color: "#7A2050", fontSize: 13 }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = "#E6007E")}
                        onMouseLeave={(e) => (e.currentTarget.style.color = "#7A2050")}
                      >
                        {value}
                      </a>
                    ) : (
                      <div style={{ color: "#7A2050", fontSize: 13 }}>{value}</div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ROW 2 — Bottom bar */}
      <div
        style={{
          background: "white",
          borderTop: "1px solid rgba(230,0,126,0.12)",
          padding: "16px 8%",
          minHeight: 52,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 8,
        }}
      >
        <p style={{ fontSize: 13, color: "#7A2050", margin: 0 }}>
          © {new Date().getFullYear()} Subhashree IVF Clinic Pvt. Ltd. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
