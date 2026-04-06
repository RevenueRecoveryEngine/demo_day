'use client'

import { motion, useScroll, useSpring } from 'framer-motion'

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

  return (
    <motion.div
      style={{
        scaleX,
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '2px',
        background: 'linear-gradient(90deg, #7c3aed, #3b82f6, #ec4899)',
        transformOrigin: '0%',
        zIndex: 9999,
        boxShadow: '0 0 10px rgba(168, 85, 247, 0.8)',
      }}
    />
  )
}
