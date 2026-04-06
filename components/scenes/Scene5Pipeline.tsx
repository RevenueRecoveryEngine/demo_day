'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'

const pipeline = [
  {
    id: 'scout',
    num: '01',
    name: 'SCOUT',
    subtitle: 'Data Ingestion Agent',
    color: '#3b82f6',
    glow: 'rgba(59,130,246,0.35)',
    icon: 'S',
    desc: 'gathers product and customer data',
    bullets: ['Scrapes multi-platform reviews', 'Extracts buyer language patterns', 'Mines Q&A for compatibility queries', 'Processes return & dispute signals'],
    metric: { val: '30', unit: 'reviews pruned per run' },
  },
  {
    id: 'critic',
    num: '02',
    name: 'CRITIC',
    subtitle: 'Analytical Reasoning Agent',
    color: '#f59e0b',
    glow: 'rgba(245,158,11,0.35)',
    icon: 'C',
    desc: 'detects expectation gaps and risks',
    bullets: ['Detects expectation-reality gaps', 'Scores: LIABILITY_RISK vs EXPERIENCE_RISK', 'Identifies missing Required Check Categories', 'Priority-ranks by revenue impact'],
    metric: { val: '2', unit: 'risk types classified' },
  },
  {
    id: 'prescriber',
    num: '03',
    name: 'PRESCRIBER',
    subtitle: 'Output Generation Agent',
    color: '#10b981',
    glow: 'rgba(16,185,129,0.35)',
    icon: 'P',
    desc: 'generates precise listing fixes',
    bullets: ['Generates Surgical Edits', 'Inject | Replace | Remove | Flag', 'Quote-grounded evidence on every card', '"Copy to clipboard" ready output'],
    metric: { val: '4', unit: 'intervention types' },
  },
]

export default function Scene5Pipeline() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-5% 0px' })
  const [active, setActive] = useState<string | null>(null)

  return (
    <section id="scene-5" ref={ref} style={{ minHeight: '100vh', background: 'var(--scene-bg-5)', paddingTop: 140, paddingBottom: 140, position: 'relative', overflow: 'hidden', transition: 'background 0.4s ease' }}>
      {/* Watermark */}
      <div style={{ position: 'absolute', bottom: '5%', right: '-2%', zIndex: 0, pointerEvents: 'none', userSelect: 'none' }}>
        <div style={{ fontSize: 'clamp(80px, 16vw, 220px)', fontWeight: 900, letterSpacing: '-0.06em', color: 'transparent', WebkitTextStroke: '1px rgba(168,85,247,0.05)', whiteSpace: 'nowrap' }}>
          PIPELINE
        </div>
      </div>

      {/* Faint grid */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.02, backgroundImage: 'linear-gradient(rgba(168,85,247,1) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

      <div style={{ maxWidth: 1120, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 10 }}>
        {/* Label */}
        <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 16 }}>
          <div style={{ width: 32, height: 1, background: 'rgba(168,85,247,0.4)' }} />
          <span style={{ fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(168,85,247,0.7)', fontWeight: 600 }}>Technical Implementation</span>
          <div style={{ width: 32, height: 1, background: 'rgba(168,85,247,0.4)' }} />
        </motion.div>

        <div style={{ overflow: 'hidden', marginBottom: 80 }}>
          <motion.h2 initial={{ y: '100%' }} animate={isInView ? { y: 0 } : { y: '100%' }} transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{ textAlign: 'center', fontSize: 'clamp(38px, 5.5vw, 68px)', fontWeight: 900, letterSpacing: '-0.035em', lineHeight: 1.05 }}>
            Three specialized AI agents.{' '}
            <span style={{ background: 'linear-gradient(135deg, #a855f7, #3b82f6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>One autonomous pipeline.</span>
          </motion.h2>
        </div>

        {/* Step flow connector */}
        <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.4 }}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 56 }}>
          {pipeline.map((step, i) => (
            <div key={step.id} style={{ display: 'flex', alignItems: 'center' }}>
              <motion.div initial={{ scale: 0, opacity: 0 }} animate={isInView ? { scale: 1, opacity: 1 } : {}} transition={{ delay: 0.5 + i * 0.2, type: 'spring', stiffness: 200 }}
                style={{ width: 36, height: 36, borderRadius: '50%', background: step.color, boxShadow: `0 0 20px ${step.glow}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 900, color: '#000', flexShrink: 0 }}>
                {step.num}
              </motion.div>
              {i < pipeline.length - 1 && (
                <motion.div initial={{ scaleX: 0 }} animate={isInView ? { scaleX: 1 } : {}} transition={{ duration: 0.7, delay: 0.7 + i * 0.2 }}
                  style={{ width: 80, height: 2, background: `linear-gradient(90deg, ${pipeline[i].color}, ${pipeline[i+1].color})`, transformOrigin: 'left', position: 'relative' }}>
                  <motion.div animate={{ x: [0, 80, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    style={{ position: 'absolute', top: -3, left: 0, width: 8, height: 8, borderRadius: '50%', background: 'var(--text)', opacity: 0.6, boxShadow: '0 0 6px var(--text)' }} />
                </motion.div>
              )}
            </div>
          ))}
        </motion.div>

        {/* Cards */}
        <div className="pipeline-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {pipeline.map((step, i) => (
            <motion.div key={step.id}
              initial={{ opacity: 0, y: 64 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.4 + i * 0.2, ease: [0.16, 1, 0.3, 1] }}
              onMouseEnter={() => setActive(step.id)}
              onMouseLeave={() => setActive(null)}
              className="glass"
              style={{
                borderRadius: 20, padding: 28, cursor: 'default', transition: 'all 0.4s ease',
                background: 'var(--pipe-bg)',
                border: `1px solid ${active === step.id ? step.color + '44' : 'var(--pipe-border)'}`,
                boxShadow: active === step.id ? `0 0 40px ${step.glow}, 0 20px 60px rgba(0,0,0,0.4)` : '0 20px 60px rgba(0,0,0,0.2)',
                transform: active === step.id ? 'translateY(-4px)' : 'translateY(0)',
              }}
            >
              {/* Header */}
              <div style={{ marginBottom: 20 }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '3px 10px', borderRadius: 100, background: `${step.color}14`, border: `1px solid ${step.color}30`, fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: step.color, fontWeight: 700, marginBottom: 16 }}>
                  <span style={{ fontFamily: 'monospace' }}>{step.num}</span> {step.subtitle}
                </div>
                <div style={{ fontSize: 32, marginBottom: 8 }}>{step.icon}</div>
                <h3 style={{ fontSize: 30, fontWeight: 900, letterSpacing: '-0.03em', color: step.color, textShadow: `0 0 30px ${step.glow}`, marginBottom: 3 }}>{step.name}</h3>
                <div style={{ fontSize: 11, color: 'var(--text-35)', letterSpacing: '0.05em' }}>{step.subtitle}</div>
              </div>

              <p style={{ fontSize: 13, color: 'var(--pipe-desc)', lineHeight: 1.75, marginBottom: 20 }}>{step.desc}</p>

              {/* Bullets */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 7, marginBottom: 20 }}>
                {step.bullets.map((b, bi) => (
                  <motion.div key={b} initial={{ opacity: 0, x: -10 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.6 + i * 0.2 + bi * 0.07 }}
                    style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 12, color: 'var(--pipe-bullet)' }}>
                    <span style={{ width: 5, height: 5, borderRadius: '50%', background: step.color, boxShadow: `0 0 6px ${step.glow}`, flexShrink: 0 }} />
                    {b}
                  </motion.div>
                ))}
              </div>

              {/* Metric */}
              <div style={{ padding: '12px 16px', borderRadius: 10, background: `${step.color}0d`, border: `1px solid ${step.color}20` }}>
                <span style={{ fontSize: 22, fontWeight: 900, color: step.color }}>{step.metric.val} </span>
                <span style={{ fontSize: 11, color: 'var(--pipe-unit)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{step.metric.unit}</span>
              </div>

              {/* Shimmer on hover */}
              {active === step.id && (
                <motion.div initial={{ top: '-5%' }} animate={{ top: '110%' }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  style={{ position: 'absolute', left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, ${step.color}80, transparent)`, pointerEvents: 'none' }} />
              )}
            </motion.div>
          ))}
        </div>

        <motion.p initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 1.4 }}
          style={{ textAlign: 'center', marginTop: 48, fontSize: 14, color: 'var(--text-25)', letterSpacing: '0.03em' }}>
          Each agent feeds the next. The output is a prescription - not a suggestion.
        </motion.p>
      </div>
    </section>
  )
}


