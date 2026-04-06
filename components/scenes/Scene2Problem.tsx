'use client'

import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

const problems = [
  { n: '01', head: 'Incomplete Data', body: 'Product listings often lack critical details like exact compatibility, dimensions, or material specs.', color: '#ef4444' },
  { n: '02', head: 'Buyer Confusion', body: 'Customers misunderstand what they are buying, assuming a product fits their specific needs when it doesn\'t.', color: '#f97316' },
  { n: '03', head: 'High Return Rates', body: "When expectations meet reality and fail, the product is returned. This is a direct loss for the merchant.", color: '#f59e0b' },
  { n: '04', head: 'Costly Disputes', body: "Ambiguous listings lead to chargebacks and disputes, where platforms almost always side with the buyer.", color: '#ef4444' },
  { n: '05', head: 'Silent Value Leak', body: 'Profits erode quietly across the catalog. There are no dashboards showing exactly why conversions fail.', color: '#a855f7' },
]

export default function Scene2Problem() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-8% 0px' })
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  return (
    <section id="scene-2" ref={ref} style={{ minHeight: '100vh', background: 'var(--scene-bg-2)', paddingTop: 140, paddingBottom: 140, transition: 'background 0.4s ease' }}>
      {/* Bg watermark */}
      <motion.div style={{ y: bgY, position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', zIndex: 0, pointerEvents: 'none', userSelect: 'none' }}>
        <div style={{
          fontSize: 'clamp(120px, 22vw, 300px)', fontWeight: 900, letterSpacing: '-0.06em',
          lineHeight: 1, whiteSpace: 'nowrap', color: 'transparent',
          WebkitTextStroke: '1px rgba(239,68,68,0.06)',
          paddingLeft: 32,
        }}>
          PROBLEM
        </div>
      </motion.div>

      {/* Light streams */}
      {[0, 1].map(i => (
        <motion.div key={i}
          initial={{ x: '-100%', opacity: 0 }}
          animate={{ x: '140vw', opacity: [0, 0.5, 0] }}
          transition={{ duration: 6 + i * 2, delay: i * 2, repeat: Infinity, ease: 'linear', repeatDelay: 4 + i }}
          style={{
            position: 'absolute', top: `${40 + i * 20}%`, left: 0,
            width: '40vw', height: 2,
            background: 'linear-gradient(90deg, transparent, rgba(239,68,68,0.5), rgba(168,85,247,0.3), transparent)',
            borderRadius: 2, zIndex: 1,
          }}
        />
      ))}

      <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 10 }}>
        {/* Label */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6 }}
          style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 56 }}>
          <span style={{ fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(239,68,68,0.7)', fontWeight: 600 }}>
            The E-Commerce Problem
          </span>
          <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, rgba(239,68,68,0.3), transparent)', maxWidth: 120 }} />
        </motion.div>

        {/* Headline */}
        <div style={{ overflow: 'hidden', marginBottom: 80 }}>
          <motion.h2
            initial={{ y: '100%' }} animate={isInView ? { y: 0 } : { y: '100%' }}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontSize: 'clamp(32px, 4.5vw, 56px)', fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1.1 }}
          >
            Revenue is lost when customers{' '}
            <span style={{ background: 'linear-gradient(135deg, #ef4444, #f97316)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              misunderstand what they are buying.
            </span>
            <br />
            <span style={{ color: 'var(--text-45)', fontWeight: 400, fontSize: '0.65em', marginTop: '16px', display: 'inline-block' }}>Most issues come from missing or unclear product information.</span>
          </motion.h2>
        </div>

        {/* Problem cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {problems.map((p, i) => (
            <motion.div key={p.n}
              initial={{ opacity: 0, x: -48 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -48 }}
              transition={{ duration: 0.8, delay: 0.25 + i * 0.14, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ x: 8, background: 'rgba(239,68,68,0.04)' }}
              style={{
                display: 'grid', gridTemplateColumns: '52px 1fr', gap: 20,
                padding: '22px 24px', borderRadius: 14,
                border: '1px solid var(--prob-card-border)',
                background: 'var(--prob-card-bg)',
                cursor: 'default', transition: 'all 0.3s ease',
              }}
            >
              <div style={{
                fontSize: 11, fontWeight: 700, fontFamily: 'monospace',
                color: p.color, opacity: 0.8, letterSpacing: '0.08em',
                paddingTop: 3,
              }}>
                {p.n}
              </div>
              <div>
                <div style={{ fontSize: 18, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 6, color: 'var(--prob-head)' }}>
                  {p.head}
                </div>
                <div style={{ fontSize: 13, color: 'var(--prob-body)', lineHeight: 1.65 }}>
                  {p.body}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.3 }}
          style={{
            marginTop: 56, padding: '24px 28px', borderRadius: 16,
            background: 'rgba(239,68,68,0.05)',
            border: '1px solid rgba(239,68,68,0.15)',
          }}
        >
          <p style={{ fontSize: 15, color: 'var(--text-55)', lineHeight: 1.7 }}>
            <strong style={{ color: '#fca5a5', fontWeight: 600 }}>Business Impact:</strong>{' '}
            Every lost sale and costly return traces back to one root cause: a gap between what the listing promised and what the buyer received. We built a system to close it.
          </p>
        </motion.div>
      </div>
    </section>
  )
}


