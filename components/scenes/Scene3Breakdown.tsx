'use client'

import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

const fakeReviews = [
  { q: '"Does this fit a 2019 Camry SE?"', type: 'q',   ago: '2h ago',  stars: null },
  { q: '"Not compatible - returned immediately"', type: 'bad', ago: '1d ago',  stars: 1 },
  { q: '"Looked nothing like the photo"', type: 'bad',  ago: '3d ago',  stars: 1 },
  { q: "\"Listing says universal. It's not.\"", type: 'bad',  ago: '1w ago',  stars: 2 },
]

export default function Scene3Breakdown() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-5% 0px' })
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%'])

  return (
    <section id="scene-3" ref={ref} style={{ minHeight: '100vh', background: 'var(--scene-bg-3)', paddingTop: 140, paddingBottom: 140, transition: 'background 0.4s ease' }}>
      {/* BG watermark */}
      <motion.div style={{ y: bgY, position: 'absolute', top: '5%', right: '-5%', zIndex: 0, pointerEvents: 'none', userSelect: 'none' }}>
        <div style={{
          fontSize: 'clamp(120px, 18vw, 240px)', fontWeight: 900, letterSpacing: '-0.06em',
          lineHeight: 1, color: 'transparent', WebkitTextStroke: '1px rgba(59,130,246,0.07)',
          whiteSpace: 'nowrap',
        }}>GAP</div>
      </motion.div>

      {/* Accent stream */}
      <motion.div
        initial={{ x: '110%', opacity: 0 }}
        animate={{ x: '-120vw', opacity: [0, 0.6, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear', repeatDelay: 3 }}
        style={{ position: 'absolute', top: '48%', right: 0, width: '50vw', height: 2, background: 'linear-gradient(270deg, transparent, rgba(59,130,246,0.5), rgba(168,85,247,0.3), transparent)', zIndex: 1 }}
      />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 10 }}>
        {/* Label */}
        <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}}
          style={{ textAlign: 'center', marginBottom: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
          <div style={{ width: 32, height: 1, background: 'rgba(59,130,246,0.4)' }} />
          <span style={{ fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(59,130,246,0.7)', fontWeight: 600 }}>The Core Concept</span>
          <div style={{ width: 32, height: 1, background: 'rgba(59,130,246,0.4)' }} />
        </motion.div>

        <div style={{ overflow: 'hidden', marginBottom: 72 }}>
          <motion.h2
            initial={{ y: '100%' }} animate={isInView ? { y: 0 } : { y: '100%' }}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{ textAlign: 'center', fontSize: 'clamp(38px, 5vw, 64px)', fontWeight: 900, letterSpacing: '-0.035em', lineHeight: 1.05 }}
          >
            The same product.{' '}
            <span style={{ background: 'linear-gradient(135deg, #60a5fa, #a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Two realities.
            </span>
          </motion.h2>
        </div>

        <div className="split-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          {/* Left â€” fake product page */}
          <motion.div initial={{ opacity: 0, x: -40 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.9, delay: 0.25 }}
            className="glass" style={{ borderRadius: 20, overflow: 'hidden' }}>
            {/* Browser bar */}
            <div style={{ padding: '10px 14px', background: 'var(--text-15)', borderBottom: '1px solid var(--text-15)', display: 'flex', gap: 6, alignItems: 'center' }}>
              {['#ef4444','#f59e0b','#22c55e'].map(c => <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c, opacity: 0.6 }} />)}
              <div style={{ flex: 1, background: 'var(--text-15)', borderRadius: 6, padding: '4px 12px', marginLeft: 8, fontSize: 11, color: 'var(--text-25)' }}>
                store.example.com/product/UNV-4422
              </div>
            </div>

            <div style={{ padding: 28 }}>
              {/* Image placeholder */}
              <div style={{ width: '100%', height: 160, borderRadius: 12, marginBottom: 20, background: 'linear-gradient(135deg, rgba(59,130,246,0.08), rgba(124,58,237,0.08))', border: '1px solid var(--text-15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, fontWeight: 800, color: 'var(--text-45)', letterSpacing: '0.08em' }}>
                PRODUCT
              </div>

              <div style={{ fontSize: 17, fontWeight: 700, marginBottom: 6, color: 'var(--text-90)' }}>
                Universal Car Mount - Premium Series
              </div>
              <div style={{ fontSize: 22, fontWeight: 800, color: '#22c55e', marginBottom: 14 }}>$34.99</div>
              <div style={{ fontSize: 13, color: 'var(--text-35)', lineHeight: 1.8, marginBottom: 20 }}>
                A high-quality universal fit car mount suitable for most vehicles. Easy installation and durable construction.
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 20 }}>
                {[['Model','UNV-4422'],['Category','Universal Fit'],['Material','ABS Plastic'],['Compatibility','-']].map(([k,v]) => (
                  <div key={k} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, padding: '7px 0', borderBottom: '1px solid var(--text-15)' }}>
                    <span style={{ color: 'var(--text-35)' }}>{k}</span>
                    <span style={{ color: v === '-' ? 'rgba(239,68,68,0.6)' : 'var(--text-55)', fontWeight: 500 }}>{v}</span>
                  </div>
                ))}
              </div>

              <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2.5, repeat: Infinity }}
                style={{ padding: '12px 16px', borderRadius: 8, background: 'rgba(239,68,68,0.07)', border: '1px solid rgba(239,68,68,0.2)', fontSize: 13, color: 'rgba(248,113,113,0.9)', lineHeight: 1.6 }}>
                <strong>Example:</strong> “Universal car mount” → expects it fits all cars<br/>
                <strong>Reality:</strong> not compatible → return<br/>
                <strong>RRE suggests:</strong> add exact compatibility details
              </motion.div>
            </div>
          </motion.div>

          {/* Right â€” reviews / reality */}
          <motion.div initial={{ opacity: 0, x: 40 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.9, delay: 0.35 }}
            style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-25)', marginBottom: 4 }}>Customer Reality -&gt;</div>

            {fakeReviews.map((r, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 + i * 0.12 }}
                className="glass"
                style={{ padding: '16px 18px', borderRadius: 14, borderColor: r.type === 'bad' ? 'rgba(239,68,68,0.12)' : 'var(--text-15)', background: r.type === 'bad' ? 'rgba(239,68,68,0.03)' : 'var(--text-15)' }}
              >
                <div style={{ fontSize: 14, color: 'var(--text-60)', fontStyle: 'italic', lineHeight: 1.5, marginBottom: 8 }}>{r.q}</div>
                <div style={{ fontSize: 11, color: 'var(--text-20)' }}>
                  {r.stars ? `${'*'.repeat(r.stars)} · ${r.ago}` : `? · ${r.ago}`}
                </div>
              </motion.div>
            ))}

            {/* Expectation gap badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 1.1, type: 'spring', stiffness: 220 }}
              style={{ marginTop: 8, padding: '18px 20px', borderRadius: 16, background: 'rgba(245,158,11,0.07)', border: '1px solid rgba(245,158,11,0.25)', display: 'flex', alignItems: 'center', gap: 14 }}
            >
              <motion.span animate={{ rotate: [0, -12, 12, -6, 0] }} transition={{ delay: 1.4, duration: 0.6 }} style={{ fontSize: 24 }}>!</motion.span>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#fde68a', marginBottom: 3 }}>The Listing Information Gap</div>
                <div style={{ fontSize: 12, color: 'rgba(253,230,138,0.5)', lineHeight: 1.5 }}>
                  This is called the "Listing Information Gap" — the difference between what the listing says and what customers expect.
                </div>
              </div>
            </motion.div>

            {/* Data callout */}
            <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 1.4 }}
              style={{ padding: '14px 18px', borderRadius: 12, background: 'rgba(59,130,246,0.05)', border: '1px solid rgba(59,130,246,0.12)', display: 'flex', gap: 20 }}>
              {[['24 %','Return rate'],['12 %','Dispute rate'],['3.2 / 5','Avg rating']].map(([v, l]) => (
                <div key={l} style={{ flex: 1, textAlign: 'center' }}>
                  <div style={{ fontSize: 18, fontWeight: 800, color: '#f87171' }}>{v}</div>
                  <div style={{ fontSize: 10, color: 'var(--text-25)', marginTop: 2, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{l}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}


