'use client'

import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

const transforms = [
  { from: 'Guesswork',  to: 'Precision',  color: '#a855f7' },
  { from: 'Confusion',  to: 'Clarity',    color: '#3b82f6' },
  { from: 'Loss',       to: 'Recovery',   color: '#10b981' },
  { from: 'Risk',       to: 'Confidence', color: '#ec4899' },
]

export default function Scene8FinalImpact() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-5% 0px' })
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['-12%', '12%'])

  return (
    <section ref={ref} id="scene-8" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--scene-bg-8)', position: 'relative', overflow: 'hidden', transition: 'background 0.4s ease' }}>
      {/* BG parallax */}
      <motion.div style={{ y: bgY, position: 'absolute', inset: 0, zIndex: 0 }}>
        {/* Giant background RRE */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          fontSize: 'clamp(200px, 40vw, 520px)', fontWeight: 900, letterSpacing: '-0.07em', lineHeight: 1,
          color: 'transparent', WebkitTextStroke: '1px rgba(168,85,247,0.055)',
          userSelect: 'none', pointerEvents: 'none', whiteSpace: 'nowrap',
        }}>
          RRE
        </div>

        {/* Multi-layer glow */}
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 1200, height: 1200, borderRadius: '50%', background: 'radial-gradient(circle, rgba(88,28,235,0.2) 0%, rgba(59,130,246,0.06) 40%, transparent 65%)', filter: 'blur(80px)', animation: 'orb-pulse 4s ease-in-out infinite' }} />

        {/* Light streams from right */}
        {[0, 1, 2].map(i => (
          <motion.div key={i}
            initial={{ x: '120%', opacity: 0 }}
            animate={{ x: '-130vw', opacity: [0, 0.5, 0] }}
            transition={{ duration: 5 + i * 1.5, delay: i * 2, repeat: Infinity, ease: 'linear', repeatDelay: 4 + i }}
            style={{
              position: 'absolute', top: `${38 + i * 10}%`, right: 0,
              width: '35vw', height: i === 1 ? 3 : 2,
              background: `linear-gradient(270deg, transparent, rgba(${['168,85,247', '59,130,246', '236,72,153'][i]},0.6), transparent)`,
              zIndex: 1, borderRadius: 2,
            }}
          />
        ))}
      </motion.div>

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', padding: '120px 24px', maxWidth: 1000, margin: '0 auto' }}>
        {/* Chapter label */}
        <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.2 }}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 64 }}>
          <div style={{ width: 32, height: 1, background: 'rgba(168,85,247,0.4)' }} />
          <span style={{ fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(168,85,247,0.6)', fontWeight: 600 }}>The Result</span>
          <div style={{ width: 32, height: 1, background: 'rgba(168,85,247,0.4)' }} />
        </motion.div>

        {/* Transformation lines */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 32, marginBottom: 80 }}>
          {transforms.map(({ from, to, color }, i) => (
            <motion.div key={from} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.3 + i * 0.14 }}
              style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 'clamp(18px, 2.5vw, 26px)', fontWeight: 700, letterSpacing: '-0.02em' }}>
              <span style={{ color: 'var(--text-25)', textDecoration: 'line-through', fontWeight: 300 }}>{from}</span>
              <span style={{ color: 'var(--text-20)', fontSize: '0.65em', fontWeight: 300 }}>→</span>
              <span style={{ color }}>{to}</span>
            </motion.div>
          ))}
        </div>

        {/* Main headline */}
        <div style={{ overflow: 'hidden', marginBottom: 48 }}>
          <motion.h2 initial={{ y: '100%' }} animate={isInView ? { y: 0 } : { y: '100%' }} transition={{ duration: 1.1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontSize: 'clamp(36px, 6vw, 72px)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1.0, background: 'linear-gradient(135deg, #c084fc 0%, #818cf8 50%, #38bdf8 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            This project shows:
          </motion.h2>
        </div>

        <motion.ul initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 1.4 }}
          style={{ fontSize: 'clamp(18px, 3vw, 32px)', color: 'var(--text-90)', lineHeight: 1.8, maxWidth: 800, margin: '0 auto 64px', fontWeight: 600, listStyle: 'none', padding: 0, textAlign: 'left', display: 'inline-block' }}>
          <li><span style={{ color: '#ec4899', marginRight: 16 }}>•</span> real-world AI system design</li>
          <li><span style={{ color: '#8b5cf6', marginRight: 16 }}>•</span> multi-agent architecture</li>
          <li><span style={{ color: '#3b82f6', marginRight: 16 }}>•</span> full-stack + backend engineering</li>
          <li><span style={{ color: '#10b981', marginRight: 16 }}>•</span> solving real business problems with data</li>
        </motion.ul>

        {/* CTAs */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 1.7 }}
          style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 0 50px rgba(124,58,237,0.5)' }}
            whileTap={{ scale: 0.97 }}
            style={{ padding: '18px 44px', borderRadius: 100, border: 'none', cursor: 'pointer', background: 'linear-gradient(135deg, #7c3aed, #3b82f6)', color: 'var(--text)', fontSize: 16, fontWeight: 700, letterSpacing: '-0.01em', fontFamily: 'Inter, sans-serif', boxShadow: '0 0 30px rgba(109,40,217,0.4)', transition: 'all 0.3s ease' }}>
            Explore the System →
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05, borderColor: 'rgba(168,85,247,0.4)', background: 'rgba(168,85,247,0.06)' }}
            whileTap={{ scale: 0.97 }}
            style={{ padding: '18px 44px', borderRadius: 100, cursor: 'pointer', background: 'transparent', border: '1px solid var(--text-15)', color: 'var(--text-55)', fontSize: 16, fontWeight: 500, fontFamily: 'Inter, sans-serif', transition: 'all 0.3s ease' }}>
            Request Demo
          </motion.button>
        </motion.div>

        {/* Footer tagline */}
        <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 2.2 }}
          style={{ marginTop: 120, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
          {['SCOUT', 'CRITIC', 'PRESCRIBER'].map((s, i) => (
            <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <span style={{ fontSize: 10, color: 'var(--text-15)', letterSpacing: '0.2em', fontWeight: 600 }}>{s}</span>
              {i < 2 && <div style={{ width: 4, height: 4, borderRadius: '50%', background: 'rgba(168,85,247,0.35)' }} />}
            </div>
          ))}
          <div style={{ marginLeft: 8, fontSize: 10, color: 'rgba(168,85,247,0.35)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
            Revenue Recovery Engine™
          </div>
        </motion.div>
      </div>
    </section>
  )
}
