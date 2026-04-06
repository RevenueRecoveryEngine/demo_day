'use client'

import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export default function Scene4IntroRRE() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' })
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const orbY = useTransform(scrollYProgress, [0, 1], ['-15%', '15%'])

  return (
    <section id="scene-4" ref={ref} style={{ minHeight: '100vh', background: 'var(--scene-bg-4)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', transition: 'background 0.4s ease' }}>
      {/* Layered background glows */}
      <motion.div style={{ y: orbY, position: 'absolute', inset: 0, zIndex: 0 }}>
        {/* Central burst */}
        <motion.div
          initial={{ opacity: 0, scale: 0.4 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.4 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 1000, height: 1000, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(109,40,217,0.3) 0%, rgba(59,130,246,0.1) 35%, transparent 65%)',
            filter: 'blur(60px)',
          }}
        />

        {/* Vertical light beam */}
        <motion.div
          initial={{ scaleY: 0, opacity: 0 }}
          animate={isInView ? { scaleY: 1, opacity: 1 } : {}}
          transition={{ duration: 1.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
            width: 2, height: '100%',
            background: 'linear-gradient(180deg, transparent, rgba(168,85,247,0.5) 30%, rgba(168,85,247,0.8) 50%, rgba(168,85,247,0.5) 70%, transparent)',
            transformOrigin: 'top',
          }}
        />

        {/* Expanding rings */}
        {[500, 700, 900].map((sz, i) => (
          <motion.div key={sz}
            initial={{ opacity: 0, scale: 0.4 }}
            animate={isInView ? { opacity: [0, 0.2, 0], scale: 1 } : {}}
            transition={{ duration: 2.5, delay: 0.3 + i * 0.25, ease: 'easeOut' }}
            style={{
              position: 'absolute', top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              width: sz, height: sz, borderRadius: '50%',
              border: '1px solid rgba(168,85,247,0.4)',
            }}
          />
        ))}

        {/* Light streams (horizontal sweeps) */}
        {[0, 1].map(i => (
          <motion.div key={i}
            initial={{ x: '-110%', opacity: 0 }}
            animate={{ x: '130vw', opacity: [0, 0.7, 0] }}
            transition={{ duration: 5 + i * 2, delay: 1 + i * 1.5, repeat: Infinity, ease: 'linear', repeatDelay: 6 }}
            style={{
              position: 'absolute', top: `${42 + i * 16}%`, left: 0,
              width: '35vw', height: i === 0 ? 2 : 3,
              background: 'linear-gradient(90deg, transparent, rgba(168,85,247,0.8), rgba(99,102,241,0.4), transparent)',
              zIndex: 1, borderRadius: 2,
            }}
          />
        ))}
      </motion.div>

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', padding: '0 24px', maxWidth: 960, margin: '0 auto' }}>
        {/* Turning point label */}
        <motion.div initial={{ opacity: 0, y: -16 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 40 }}>
          <div style={{ width: 32, height: 1, background: 'rgba(168,85,247,0.4)' }} />
          <span style={{ fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(168,85,247,0.7)', fontWeight: 600 }}>Our Solution</span>
          <div style={{ width: 32, height: 1, background: 'rgba(168,85,247,0.4)' }} />
        </motion.div>

        {/* "Introducing" */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }}
          style={{ fontSize: 'clamp(13px, 1.5vw, 17px)', color: 'var(--text-35)', letterSpacing: '0.06em', marginBottom: 12 }}>
          Introducing
        </motion.div>

        {/* RRE */}
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.92 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 1.2, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: 8 }}
        >
          <h2 style={{
            fontSize: 'clamp(80px, 16vw, 200px)',
            fontWeight: 900, letterSpacing: '-0.05em', lineHeight: 0.9,
            background: 'linear-gradient(135deg, #c084fc 0%, #818cf8 40%, #38bdf8 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}>
            RRE
          </h2>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.8 }}
          style={{ fontSize: 'clamp(11px, 1.5vw, 14px)', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--text-20)', marginBottom: 72 }}>
          Revenue Recovery Engine
        </motion.div>

        {/* Stacked lines */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, marginBottom: 80 }}>
          <motion.div initial={{ y: '110%' }} animate={isInView ? { y: 0 } : { y: '110%' }}
             transition={{ duration: 0.9, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
             style={{ fontSize: 'clamp(24px, 3vw, 40px)', fontWeight: 400, color: 'var(--text-45)', marginBottom: 16 }}>
             Solving this requires <strong style={{ color: '#c084fc', fontWeight: 700 }}>3 steps:</strong>
          </motion.div>
          {[
            { t: 'understand the listing', d: 1.2 },
            { t: 'understand customer feedback', d: 1.4 },
            { t: 'fix the gap', d: 1.6, accent: true },
          ].map(({ t, d, accent }) => (
            <div key={t} style={{ overflow: 'hidden' }}>
              <motion.div
                initial={{ y: '110%' }} animate={isInView ? { y: 0 } : { y: '110%' }}
                transition={{ duration: 0.9, delay: d, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  fontSize: 'clamp(28px, 4vw, 48px)',
                  fontWeight: accent ? 800 : 300,
                  letterSpacing: '-0.02em', lineHeight: 1.2,
                  color: accent ? 'var(--text-90)' : 'var(--text-55)',
                }}
              >
                {accent
                  ? <span style={{ background: 'linear-gradient(135deg, #a855f7, #ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{t}</span>
                  : <span style={{ color: 'var(--text-60)' }}>{t}</span>}
              </motion.div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 1.9 }}
          style={{ display: 'flex', justifyContent: 'center', gap: 60, flexWrap: 'wrap' }}>
          {[
            { v: '3', l: 'AI Agents' },
            { v: '4', l: 'Engineers' },
            { v: '0', l: 'Code Changes Required' },
          ].map(({ v, l }) => (
            <div key={l} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 'clamp(36px, 5vw, 52px)', fontWeight: 900, lineHeight: 1, background: 'linear-gradient(135deg, #a855f7, #3b82f6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', letterSpacing: '-0.03em' }}>
                {v}
              </div>
              <div style={{ fontSize: 11, color: 'var(--text-35)', marginTop: 6, letterSpacing: '0.12em', textTransform: 'uppercase' }}>{l}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}


