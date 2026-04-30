
import { Link } from "@tanstack/react-router"
import { Facebook, Instagram, Youtube } from "lucide-react"

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

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Youtube, href: "#", label: "YouTube" },
]

function LotusIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      fill="currentColor"
    >
      <path d="M50 15c-5 10-5 25 0 35 5-10 5-25 0-35z" />
      <path d="M35 25c0 15 10 30 15 35-10-5-20-20-15-35z" />
      <path d="M65 25c0 15-10 30-15 35 10-5 20-20 15-35z" />
      <path d="M20 40c5 12 20 22 30 25-12 0-28-10-30-25z" />
      <path d="M80 40c-5 12-20 22-30 25 12 0 28-10 30-25z" />
      <path d="M50 65c-8 0-15 5-20 15 10-5 15-10 20-10s10 5 20 10c-5-10-12-15-20-15z" />
    </svg>
  )
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  )
}

export function Footer() {
  return (
    <footer className="bg-plum-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Column 1 - Logo & About */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2">
              <LotusIcon className="w-10 h-10 text-rose" />
              <div className="flex flex-col">
                <span className="font-serif font-bold text-xl text-white leading-tight">
                  Subhashree IVF
                </span>
                <span className="text-xs text-white/60">
                  Fertility Centre
                </span>
              </div>
            </Link>
            <p className="text-white/70 text-sm leading-relaxed">
              {"Nepal's"} leading fertility centre, transforming dreams of parenthood 
              into reality for over 12 years.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-rose transition-colors"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
              <a
                href="#"
                aria-label="TikTok"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-rose transition-colors"
              >
                <TikTokIcon className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Column 2 - Quick Links */}
          <div>
            <h4 className="font-serif font-semibold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-white/70 hover:text-rose transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Services */}
          <div>
            <h4 className="font-serif font-semibold text-lg mb-6">Our Services</h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <Link 
                    href="#services"
                    className="text-white/70 hover:text-rose transition-colors text-sm"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 - Contact */}
          <div>
            <h4 className="font-serif font-semibold text-lg mb-6">Contact Us</h4>
            <ul className="space-y-4 text-sm">
              <li className="text-white/70">
                <span className="block text-white font-medium mb-1">Address</span>
                Kathmandu, Nepal
              </li>
              <li className="text-white/70">
                <span className="block text-white font-medium mb-1">Phone</span>
                <a href="tel:+977-9800-000000" className="hover:text-rose transition-colors">
                  +977-9800-000000
                </a>
              </li>
              <li className="text-white/70">
                <span className="block text-white font-medium mb-1">Email</span>
                <a href="mailto:info@subhashreeivf.com" className="hover:text-rose transition-colors">
                  info@subhashreeivf.com
                </a>
              </li>
              <li className="text-white/70">
                <span className="block text-white font-medium mb-1">Hours</span>
                Sun - Fri: 9:00 AM - 6:00 PM
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/60">
            <p>
              &copy; {new Date().getFullYear()} Subhashree IVF & Fertility Centre. All rights reserved.
            </p>
            <p>
              Made with <span className="text-rose">&#10084;</span> in Nepal
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
