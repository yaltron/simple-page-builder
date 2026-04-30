import type { Metadata, Viewport } from 'next'
import { Playfair_Display, Nunito } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: '--font-playfair',
  display: 'swap',
})

const nunito = Nunito({ 
  subsets: ["latin"],
  variable: '--font-nunito',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Subhashree IVF & Fertility Centre | Where Dreams of Parenthood Begin',
  description: 'Nepal\'s leading IVF centre with 12+ years of excellence, 5,000+ successful treatments, and 75% success rate. Comprehensive fertility care in Kathmandu.',
  keywords: ['IVF', 'fertility', 'Nepal', 'Kathmandu', 'infertility treatment', 'ICSI', 'embryo freezing'],
}

export const viewport: Viewport = {
  themeColor: '#C2185B',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${nunito.variable} bg-background scroll-smooth`}>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
