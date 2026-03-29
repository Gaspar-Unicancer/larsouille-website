import type { Metadata } from "next"
import { Playfair_Display, Lato, Dancing_Script } from "next/font/google"
import "./globals.css"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
})

const lato = Lato({
  subsets: ["latin"],
  variable: "--font-lato",
  weight: ["300", "400", "700"],
  display: "swap",
})

const dancing = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-dancing",
  display: "swap",
})

export const metadata: Metadata = {
  title: "L'Arsouille — Bar de quartier brestois",
  description:
    "Vins nature, bières craft et bonne humeur au cœur du Quartier des 4 Moulins, Brest.",
  openGraph: {
    title: "L'Arsouille — Bar de quartier brestois",
    description:
      "Vins nature, bières craft et bonne humeur au cœur du Quartier des 4 Moulins, Brest.",
    locale: "fr_FR",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="fr"
      className={`${playfair.variable} ${lato.variable} ${dancing.variable}`}
    >
      <body className="min-h-screen bg-cream text-ink font-body antialiased">
        {children}
      </body>
    </html>
  )
}
