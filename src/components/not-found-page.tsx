import { Link } from "@tanstack/react-router"
import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { BRAND } from "@/components/page-layout"

export function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: BRAND.pinkSoft }}>
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-6 py-20">
        <div className="max-w-xl w-full text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <SadLotus />
            <div className="text-7xl font-bold mb-2" style={{ fontFamily: "'Playfair Display', serif", color: BRAND.heading }}>404</div>
            <h1 className="text-2xl md:text-3xl font-bold mb-3" style={{ fontFamily: "'Playfair Display', serif", color: BRAND.heading }}>
              Oops! Page not found
            </h1>
            <p className="mb-8" style={{ color: BRAND.navLink }}>
              The page you're looking for has wandered off. Let's get you back on track.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link to="/" className="px-6 py-2.5 rounded-full text-white font-bold" style={{ background: BRAND.pink }}>
                Go Back Home
              </Link>
              <Link to="/contact" className="px-6 py-2.5 rounded-full font-bold border-2" style={{ borderColor: BRAND.pink, color: BRAND.pink, background: "white" }}>
                Book Appointment
              </Link>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

function SadLotus() {
  return (
    <svg viewBox="0 0 200 160" className="mx-auto mb-6" style={{ width: 180, height: 144 }} aria-hidden="true">
      <defs>
        <linearGradient id="petal" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFC1DA" />
          <stop offset="100%" stopColor="#E6007E" />
        </linearGradient>
      </defs>
      <ellipse cx="100" cy="138" rx="70" ry="6" fill="#F2DCE8" />
      <path d="M100 120 C70 110, 55 90, 60 70 C75 80, 95 95, 100 120 Z" fill="url(#petal)" opacity="0.85" />
      <path d="M100 120 C130 110, 145 90, 140 70 C125 80, 105 95, 100 120 Z" fill="url(#petal)" opacity="0.85" />
      <path d="M100 120 C85 100, 80 70, 100 50 C120 70, 115 100, 100 120 Z" fill="url(#petal)" />
      <circle cx="88" cy="58" r="3" fill="#2D0A1E" />
      <circle cx="112" cy="58" r="3" fill="#2D0A1E" />
      <path d="M88 75 Q100 68 112 75" stroke="#2D0A1E" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    </svg>
  )
}
