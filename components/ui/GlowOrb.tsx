'use client'

import { useEffect, useRef } from 'react'

interface GlowOrbProps {
  color?: 'purple' | 'blue' | 'pink' | 'cyan'
  size?: number
  intensity?: number
  className?: string
  animate?: boolean
}

const colorMap = {
  purple: 'rgba(168, 85, 247, OPACITY)',
  blue: 'rgba(59, 130, 246, OPACITY)',
  pink: 'rgba(236, 72, 153, OPACITY)',
  cyan: 'rgba(6, 182, 212, OPACITY)',
}

export default function GlowOrb({
  color = 'purple',
  size = 600,
  intensity = 0.4,
  className = '',
  animate = true,
}: GlowOrbProps) {
  const colorTemplate = colorMap[color]
  const orbColor = colorTemplate.replace('OPACITY', String(intensity))
  const orbColorFaint = colorTemplate.replace('OPACITY', String(intensity * 0.3))

  return (
    <div
      className={`pointer-events-none ${className}`}
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: `radial-gradient(circle, ${orbColor} 0%, ${orbColorFaint} 40%, transparent 70%)`,
        filter: 'blur(40px)',
        animation: animate ? 'pulse-glow 4s ease-in-out infinite' : undefined,
      }}
    />
  )
}
