'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

type Chapter = {
  num: string
  tag: string
  headline: string
  body: string
  metric: string
  metricLabel: string
  color: string
  accent: string
  symbol: string
  code: string
}

const cards: Chapter[] = [
  {
    num: '01',
    tag: 'SCOUT Phase',
    headline: 'The evidence\nhunter.',
    body: 'RRE reads the listing context, pulls review signal, and surfaces what buyers actually experienced.',
    metric: '30+',
    metricLabel: 'Review signals parsed',
    color: '#3b82f6',
    accent: '#60a5fa',
    symbol: '\u{1F50D}',
    code: 'scout.run({ url, is_demo: false })',
  },
  {
    num: '02',
    tag: 'CRITIC Phase 1',
    headline: 'The gap\ndetector.',
    body: 'CRITIC extracts listing claims, then compares those claims against buyer expectations in evidence.',
    metric: '2',
    metricLabel: 'Risk spectrum axes',
    color: '#f59e0b',
    accent: '#fbbf24',
    symbol: '\u{1F9EA}',
    code: 'critic.extract({ listing_attrs })',
  },
  {
    num: '03',
    tag: 'CRITIC Phase 2',
    headline: 'The verdict\nmachine.',
    body: 'Each expectation gap is classified and grounded: LIABILITY_RISK or EXPERIENCE_RISK.',
    metric: '100%',
    metricLabel: 'Evidence-grounded',
    color: '#ef4444',
    accent: '#f87171',
    symbol: '\u{1F9E0}',
    code: 'critic.judge({ expectation_gap })',
  },
  {
    num: '04',
    tag: 'PRESCRIBER Phase',
    headline: 'The surgical\nfix.',
    body: 'Not vague advice. Inject this sentence. Replace this phrase. Remove this claim. Flag this risk. Copy-ready.',
    metric: '4',
    metricLabel: 'Intervention types',
    color: '#10b981',
    accent: '#4ade80',
    symbol: '\u270D\uFE0F',
    code: 'prescriber.draft({ gap, evidence })',
  },
]

export default function HorizontalScroll() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(max-width: 900px)')
    const update = () => setIsMobile(media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] })
  // Translate by viewport widths; percentages here are relative to rail width and overshoot.
  const x = useTransform(scrollYProgress, [0, 1], ['0vw', `-${(cards.length - 1) * 100}vw`])

  if (isMobile) {
    return (
      <section style={{ background: 'linear-gradient(180deg, #020518 0%, #020110 100%)', padding: '80px 20px 90px' }}>
        <div style={{ maxWidth: 680, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
            <div style={{ width: 20, height: 1, background: 'rgba(168,85,247,0.5)' }} />
            <span style={{ fontSize: 10, letterSpacing: '0.2em', color: 'rgba(168,85,247,0.65)', textTransform: 'uppercase', fontWeight: 700 }}>
              The Pipeline - Chapter by Chapter
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {cards.map((card) => (
              <div key={card.num} style={{ borderRadius: 16, border: `1px solid ${card.color}33`, background: 'rgba(8,10,28,0.7)', padding: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                  <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.16em', color: card.accent, fontWeight: 700 }}>
                    {card.num} {card.tag}
                  </div>
                  <div style={{ fontSize: 22 }}>{card.symbol}</div>
                </div>
                <div style={{ fontSize: 34, fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1.02, color: 'var(--text-90)', marginBottom: 10 }}>
                  {card.headline.replace('\n', ' ')}
                </div>
                <p style={{ margin: 0, fontSize: 13.5, color: 'var(--text-55)', lineHeight: 1.65 }}>{card.body}</p>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 12 }}>
                  <span style={{ fontSize: 30, fontWeight: 900, color: card.accent }}>{card.metric}</span>
                  <span style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--text-35)' }}>
                    {card.metricLabel}
                  </span>
                </div>
                <div style={{ marginTop: 12, padding: '9px 10px', borderRadius: 10, background: 'rgba(0,0,0,0.35)', border: '1px solid var(--glass-border)', fontFamily: 'monospace', fontSize: 11, color: card.accent }}>
                  <span style={{ color: 'var(--text-25)' }}>$ </span>
                  {card.code}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <div ref={containerRef} style={{ height: `${cards.length * 100}vh`, position: 'relative' }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', background: 'linear-gradient(135deg, #030110 0%, #020518 50%, #03030a 100%)' }}>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.03,
            backgroundImage:
              `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />

        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'rgba(255,255,255,0.04)', zIndex: 20 }}>
          <motion.div style={{ height: '100%', scaleX: scrollYProgress, transformOrigin: 'left', background: 'linear-gradient(90deg, #7c3aed, #3b82f6, #10b981)' }} />
        </div>

        <div style={{ position: 'absolute', top: 28, right: 32, zIndex: 20, fontSize: 11, letterSpacing: '0.15em', color: 'rgba(168,85,247,0.4)', fontFamily: 'monospace' }}>
          CHAPTER / 04
        </div>

        <div style={{ position: 'absolute', top: 28, left: 32, zIndex: 20, display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 20, height: 1, background: 'rgba(168,85,247,0.5)' }} />
          <span style={{ fontSize: 10, letterSpacing: '0.22em', color: 'rgba(168,85,247,0.5)', textTransform: 'uppercase', fontWeight: 600 }}>The Pipeline - Chapter by Chapter</span>
        </div>

        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center' }}>
          <motion.div style={{ display: 'flex', x, willChange: 'transform' }}>
            {cards.map((card, i) => (
              <div key={card.num} style={{ width: '100vw', height: '100vh', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 80px 60px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, maxWidth: 1100, width: '100%', alignItems: 'center' }}>
                  <div>
                    <motion.div
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6 }}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 8,
                        marginBottom: 40,
                        padding: '6px 14px',
                        borderRadius: 100,
                        background: card.color + '12',
                        border: `1px solid ${card.color}30`,
                        fontSize: 10,
                        letterSpacing: '0.2em',
                        color: card.accent,
                        fontWeight: 700,
                        textTransform: 'uppercase',
                      }}
                    >
                      <span style={{ fontFamily: 'monospace', fontSize: 9 }}>{card.num}</span>
                      {card.tag}
                    </motion.div>

                    <div style={{ marginBottom: 28 }}>
                      {card.headline.split('\n').map((line, li) => (
                        <div key={li} style={{ overflow: 'hidden' }}>
                          <motion.div
                            initial={{ y: '100%' }}
                            whileInView={{ y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.9, delay: li * 0.1, ease: [0.16, 1, 0.3, 1] }}
                            style={{
                              fontSize: 'clamp(48px, 6vw, 80px)',
                              fontWeight: 900,
                              letterSpacing: '-0.04em',
                              lineHeight: 1.0,
                              color: li === 0 ? 'var(--text-90)' : card.accent,
                            }}
                          >
                            {line}
                          </motion.div>
                        </div>
                      ))}
                    </div>

                    <motion.p
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 }}
                      style={{ fontSize: 15, color: 'var(--text-45)', lineHeight: 1.75, maxWidth: 420, marginBottom: 36 }}
                    >
                      {card.body}
                    </motion.p>

                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 }}
                      style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 28 }}
                    >
                      <span style={{ fontSize: 52, fontWeight: 900, lineHeight: 1, letterSpacing: '-0.04em', color: card.accent }}>{card.metric}</span>
                      <span style={{ fontSize: 11, color: 'var(--text-35)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>{card.metricLabel}</span>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.6 }}
                      style={{
                        padding: '12px 16px',
                        borderRadius: 10,
                        background: 'rgba(0,0,0,0.4)',
                        border: '1px solid var(--glass-border)',
                        fontFamily: 'monospace',
                        fontSize: 12,
                        color: card.accent + 'cc',
                        letterSpacing: '0.02em',
                      }}
                    >
                      <span style={{ color: 'var(--text-20)' }}>$ </span>
                      {card.code}
                    </motion.div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
                    whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      borderRadius: 28,
                      padding: 40,
                      background: `radial-gradient(ellipse at 30% 20%, ${card.color}18 0%, rgba(0,0,0,0.4) 70%)`,
                      border: `1px solid ${card.color}25`,
                      boxShadow: `0 0 80px ${card.color}20, 0 40px 80px rgba(0,0,0,0.5)`,
                      position: 'relative',
                      overflow: 'hidden',
                      minHeight: 340,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                    }}
                  >
                    <motion.div
                      animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.35, 0.15] }}
                      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                      style={{
                        position: 'absolute',
                        top: '-40%',
                        right: '-20%',
                        width: 300,
                        height: 300,
                        borderRadius: '50%',
                        background: `radial-gradient(circle, ${card.color}40, transparent 70%)`,
                        filter: 'blur(40px)',
                        pointerEvents: 'none',
                      }}
                    />

                    <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }} style={{ fontSize: 80, lineHeight: 1, zIndex: 1 }}>
                      {card.symbol}
                    </motion.div>

                    <div style={{ zIndex: 1 }}>
                      <div style={{ fontSize: 100, fontWeight: 900, letterSpacing: '-0.06em', lineHeight: 1, color: 'transparent', WebkitTextStroke: `1px ${card.color}30`, userSelect: 'none' }}>
                        {card.num}
                      </div>

                      <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
                        {cards.map((_, ci) => (
                          <motion.div
                            key={ci}
                            animate={{ opacity: ci === i ? 1 : 0.2, scale: ci === i ? 1.4 : 1 }}
                            style={{
                              width: 8,
                              height: 8,
                              borderRadius: '50%',
                              background: ci === i ? card.color : 'var(--text-15)',
                              boxShadow: ci === i ? `0 0 10px ${card.color}` : 'none',
                              transition: 'all 0.3s ease',
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          style={{
            position: 'absolute',
            bottom: 32,
            left: '50%',
            transform: 'translateX(-50%)',
            opacity: useTransform(scrollYProgress, [0, 0.15], [1, 0]),
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: 10, color: 'var(--text-20)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 8, textAlign: 'center' }}>
            Scroll to advance
          </div>
          <motion.div animate={{ x: [0, 16, 0] }} transition={{ duration: 1.5, repeat: Infinity }} style={{ fontSize: 16, color: 'rgba(168,85,247,0.4)', textAlign: 'center' }}>
            {'->'}
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

