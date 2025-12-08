import type { Metadata } from "next"
import { Montserrat } from "next/font/google"
import "./globals.css"

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
})

export const metadata: Metadata = {
  title: "Mult Point Indústria",
  description: "Válvulas Injetoras e Kits para Bico Injetor",
  icons: {
    icon: "/imgs/icon.ico",
  },
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
