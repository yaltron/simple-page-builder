import { Link } from "@tanstack/react-router"
import { Facebook, Instagram, Youtube, MapPin, Phone, Mail, Clock } from "lucide-react"
import logo from "@/assets/logo.png"

const quickLinks = [
  { name: "About Us", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Our Team", href: "#team" },
  { name: "Success Stories", href: "#testimonials" },
  { name: "Blog", href: "#blog" },
  { name: "Contact", href: "#contact" },
]

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
  { Icon: Facebook, href: "#", label: "Facebook" },
  { Icon: Instagram, href: "#", label: "Instagram" },
  { Icon: Youtube, href: "#", label: "YouTube" },
  { Icon: TikTokIcon, href: "#", label: "TikTok" },
]

const headingStyle: React.CSSProperties = {
  fontWeight: 700,
  fontSize: 15,
  color: "#2D0A1E",
  position: "relative",
  paddingBottom: 10,
  marginBottom: 20,
  display: "inline-block",
}

function ColumnHeading({ children }: { children: React.ReactNode }) {
  return (
    <h4 style={headingStyle}>
      {children}
      <span
        style={{
          content: "''",
          position: "absolute",
          bottom: 0,
          left: 0,
          width: 32,
          height: 2.5,
          background: "linear-gradient(90deg, #E6007E, #1BA0DC)",
          borderRadius: 2,
          display: "block",
        }}
      />
    </h4>
  )
}

const linkStyle: React.CSSProperties = {
  color: "#7A2050",
  fontSize: 14,
  fontWeight: 500,
  lineHeight: 2.2,
  display: "inline-block",
  transition: "color 0.2s, padding-left 0.2s",
}

const contactItems = [
  { Icon: MapPin, label: "Address", value: "Kathmandu, Nepal", href: undefined },
  { Icon: Phone, label: "Phone", value: "+977 9861141699", href: "tel:+9779861141699" },
  { Icon: Mail, label: "Email", value: "Shubhashreeivf@gmail.com", href: "mailto:Shubhashreeivf@gmail.com" },
  { Icon: Clock, label: "Hours", value: "Sun–Fri: 8:00 AM – 6:00 PM", href: undefined },
]

export function Footer() {
  return (
    <footer>
      {/* ROW 1 — Main footer */}
      <div
        style={{
          background: "#FFF1F7",
          borderTop: "2.5px solid transparent",
          borderImage: "linear-gradient(90deg, #E6007E, #1BA0DC) 1",
          padding: "60px 8%",
        }}
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1 - Brand */}
          <div className="space-y-5">
            <Link to="/" className="inline-flex items-center w-fit">
              <img src={logo} alt="Shubhashree IVF Clinic Pvt. Ltd." className="h-12 w-auto" />
            </Link>
            <p style={{ color: "#7A2050", fontSize: 14, lineHeight: 1.7 }}>
              Nepal's leading fertility centre, transforming dreams of parenthood into reality for over 12 years.
            </p>
            <div className="flex gap-2.5">
              {socialLinks.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
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
          <div>
            <ColumnHeading>Quick Links</ColumnHeading>
            <ul>
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
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
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Services */}
          <div>
            <ColumnHeading>Our Services</ColumnHeading>
            <ul>
              {services.map((service) => (
                <li key={service}>
                  <a
                    href="#services"
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
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 - Contact */}
          <div>
            <ColumnHeading>Contact Us</ColumnHeading>
            <ul>
              {contactItems.map(({ Icon, label, value, href }) => (
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
                    <div style={{ fontWeight: 700, color: "#2D0A1E", fontSize: 13 }}>{label}</div>
                    {href ? (
                      <a
                        href={href}
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
        <p style={{ fontSize: 13, color: "#7A2050", margin: 0 }}>
          Made with <span style={{ color: "#E6007E" }}>❤</span> in Nepal
        </p>
      </div>
    </footer>
  )
}
