import type { Metadata } from "next"
import { Montserrat } from "next/font/google"
import "./globals.css"

// Fonte global
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
})

export const metadata: Metadata = {
  title: "Portal de Notícias",
  description: "Site corporativo com Next.js + Tailwind",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={montserrat.variable}>
      <body className="font-sans">{children}</body>
    </html>
  )
}
