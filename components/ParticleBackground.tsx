'use client'
import { useEffect, useRef } from 'react'

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let W = window.innerWidth
    let H = window.innerHeight
    canvas.width = W
    canvas.height = H

    const resize = () => {
      W = window.innerWidth
      H = window.innerHeight
      canvas.width = W
      canvas.height = H
    }
    window.addEventListener('resize', resize)

    interface Particle {
      x: number; y: number; vx: number; vy: number
      size: number; opacity: number; pulse: number; pulseSpeed: number
    }

    const particles: Particle[] = Array.from({ length: 55 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      size: Math.random() * 1.8 + 0.4,
      opacity: Math.random() * 0.5 + 0.1,
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: Math.random() * 0.02 + 0.008,
    }))

    const draw = () => {
      ctx.clearRect(0, 0, W, H)

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 140) {
            const alpha = (1 - dist / 140) * 0.12
            ctx.beginPath()
            ctx.strokeStyle = `rgba(0,237,100,${alpha})`
            ctx.lineWidth = 0.6
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }

      // Draw particles
      particles.forEach(p => {
        p.pulse += p.pulseSpeed
        const glow = Math.sin(p.pulse) * 0.3 + 0.7
        const alpha = p.opacity * glow

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0,237,100,${alpha})`
        ctx.fill()

        // Glow ring on some particles
        if (p.size > 1.4) {
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(0,237,100,${alpha * 0.08})`
          ctx.fill()
        }

        p.x += p.vx
        p.y += p.vy
        if (p.x < 0) p.x = W
        if (p.x > W) p.x = 0
        if (p.y < 0) p.y = H
        if (p.y > H) p.y = 0
      })

      animId = requestAnimationFrame(draw)
    }

    draw()
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0, left: 0,
        width: '100%', height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.6,
      }}
    />
  )
}
