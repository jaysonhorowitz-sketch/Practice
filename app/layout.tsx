import type { Metadata } from 'next'
import './globals.css'
import { Providers } from './providers'
import { Nav } from '@/components/Nav'

export const metadata: Metadata = {
  title: 'UGC Studio',
  description: 'Internal TikTok UGC generation tool',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen bg-background">
        <Providers>
          <Nav />
          <main className="max-w-6xl mx-auto px-4 py-8">{children}</main>
        </Providers>
      </body>
    </html>
  )
}
