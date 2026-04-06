'use client'

import { useEffect, useRef } from 'react'

interface Particle {
  x: number; y: number; vx: number; vy: number; life: number; maxLife: number; size: number; color: string
}

const COLORS = ['rgba(168,85,247,', 'rgba(99,102,241,', 'rgba(59,130,246,', 'rgba(236,72,153,', 'rgba(6,182,212,']

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let animId: number
    let particles: Particle[] = []
    let mouse = { x: -9999, y: -9999 }

    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const onMove = (e: MouseEvent) => { mouse.x = e.clientX; mouse.y = e.clientY }
    window.addEventListener('mousemove', onMove)

    const spawn = () => {
      if (particles.length > 180) return
      // Ambient spawn
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4 - 0.15,
        life: 0,
        maxLife: 180 + Math.random() * 120,
        size: 1 + Math.random() * 2.5,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      })
      // Mouse burst
      if (mouse.x > 0 && Math.random() > 0.6) {
        const angle = Math.random() * Math.PI * 2
        const speed = 0.6 + Math.random() * 1.4
        particles.push({
          x: mouse.x + (Math.random() - 0.5) * 60,
          y: mouse.y + (Math.random() - 0.5) * 60,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 0.5,
          life: 0,
          maxLife: 80 + Math.random() * 60,
          size: 1.5 + Math.random() * 3,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
        })
      }
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      spawn()

      particles = particles.filter(p => p.life < p.maxLife)
      particles.forEach(p => {
        p.life++
        p.x += p.vx
        p.y += p.vy
        p.vy -= 0.002 // gentle float

        const progress = p.life / p.maxLife
        const alpha = progress < 0.2
          ? progress * 5
          : progress > 0.8
            ? (1 - progress) * 5
            : 1

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size * (1 - progress * 0.5), 0, Math.PI * 2)
        ctx.fillStyle = p.color + (alpha * 0.5).toFixed(2) + ')'
        ctx.fill()
      })

      animId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
        pointerEvents: 'none', zIndex: 0, opacity: 0.6,
      }}
    />
  )
}
