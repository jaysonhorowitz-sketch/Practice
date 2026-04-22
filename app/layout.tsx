import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import ParticleBackground from '@/components/ParticleBackground'

const geistSans = Geist({ subsets: ['latin'], variable: '--font-sans' })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-mono' })

export const metadata: Metadata = {
  title: 'MongoDB SDR Dashboard',
  description: 'Pre-loaded prospect sheets. Every morning.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`} style={{ background: 'var(--bg-deep)', color: 'var(--text)', position: 'relative', fontFamily: 'var(--font-sans)' }}>
        <ParticleBackground />
        <div style={{ position: 'relative', zIndex: 1 }}>
          {children}
        </div>
      </body>
    </html>
  )
}
