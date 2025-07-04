import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import "./globals.css"
import type React from "react"
import Script from "next/script"
import { ParticlesBackground } from "@/components/particles-background"
import { LoadingScreen } from "@/components/loading-screen"

const inter = Inter({ subsets: ["latin"] })
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
})

export const metadata: Metadata = {
  title: "The Codepreneur Network - Empowering Future Innovators",
  description: "Empowering youth through coding and entrepreneurship education",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <Script src="https://app.cal.com/embed/embed.js" strategy="beforeInteractive" />
      </head>
      <body className={`${inter.className} ${playfair.variable} bg-black text-white antialiased`}>
        <LoadingScreen />
        <div className="fixed inset-0 z-0">
          <ParticlesBackground />
        </div>
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  )
}

