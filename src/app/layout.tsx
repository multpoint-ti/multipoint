import type { Metadata } from "next"
import { Montserrat } from "next/font/google"
import "./globals.css"
import { WhatsAppButton } from "@/shared/whatsapp-button"
import { baseMetadata, generateOrganizationJsonLd } from "@/lib/seo"
import { JsonLd } from "@/shared/json-ld"

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
})

export const metadata: Metadata = {
  ...baseMetadata,
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
      <head>
        <JsonLd data={generateOrganizationJsonLd()} />
      </head>
      <body className="font-sans">
        {children}
        <WhatsAppButton />
      </body>
    </html>
  )
}
