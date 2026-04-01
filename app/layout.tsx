import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "UGC Studio",
  description: "TikTok UGC generation for marketing agencies",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full bg-zinc-50 font-sans">{children}</body>
    </html>
  )
}
