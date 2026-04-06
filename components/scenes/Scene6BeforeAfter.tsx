'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const demoSchemas = [
  {
    id: 'Schema 01',
    title: 'Pipeline Contract',
    note: 'Runtime sequence and handoff shape',
    code: [
      'INGEST WORKERS -- AI PIPELINE',
      '',
      '+----------------------------------------------+',
      '| Demo Mode? (is_demo=true)                    |',
      '+----------------------------------------------+',
      '    | is_demo=false                 | is_demo=true',
      '    v                               v',
      '  SCOUT -> CRITIC_P1 -> CRITIC_P2 -> PRESCRIBER',
      '    |                               |',
      '    v                               v',
      '  expectation_gaps[]           replay logs only',
      '',
      'input: listing_text + review_signals[]',
      'critic_out: expectation_gaps[]',
      'prescriber_out: surgical_edits[]',
    ],
  },
  {
    id: 'Schema 02',
    title: 'Demo Mode Firewall',
    note: 'What was intentionally faked in demo mode',
    code: [
      'if (is_demo) {',
      '  useSeededDataset()',
      '  replayDeterministicLogs()',
      '  blockExternalCalls()',
      '}',
    ],
  },
]

const shownInDemo = [
  'Live storytelling flow across the full build journey with scroll-triggered chapters.',
  'SCOUT -> CRITIC -> PRESCRIBER sequence with clear evidence-to-edit handoff.',
  'Architecture simulation showing Sidecar execution and persisted run artifacts.',
  'Before/after listing transformation with risk-reduction framing.',
]

const worked = [
  'Zero-failure run stability during the demo window.',
  'Fast interaction speed and smooth chapter transitions.',
  'Clear explanation of how pipeline output becomes copy-ready edits.',
  'Strong technical narrative for evaluators (architecture + constraints + tradeoffs).',
]

const fakedAndWhy = [
  'External calls (Gemini Flash, ZenRows, Apify) were bypassed in demo mode to avoid rate-limit failure during a live meeting.',
  'Logs were replayed from seeded data to keep timing deterministic and remove network variance.',
  'The point was to validate architecture and operator experience first, before showcasing live-production reliability.',
]

export default function Scene6BeforeAfter() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '0px 0px -5% 0px' })

  return (
    <section
      id="scene-6"
      ref={ref}
      style={{
        minHeight: '100vh',
        background: 'var(--scene-bg-6)',
        paddingTop: 140,
        paddingBottom: 140,
        position: 'relative',
        overflow: 'hidden',
        transition: 'background 0.4s ease',
      }}
    >
      <div style={{ position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)', zIndex: 0, pointerEvents: 'none', userSelect: 'none', whiteSpace: 'nowrap' }}>
        <div style={{ fontSize: 'clamp(100px, 18vw, 240px)', fontWeight: 900, letterSpacing: '-0.06em', color: 'transparent', WebkitTextStroke: '1px rgba(6,182,212,0.05)' }}>
          THE DEMO
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 10 }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 16 }}
        >
          <div style={{ width: 32, height: 1, background: 'rgba(6,182,212,0.4)' }} />
          <span style={{ fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(6,182,212,0.7)', fontWeight: 600 }}>Engineering Transparency</span>
          <div style={{ width: 32, height: 1, background: 'rgba(6,182,212,0.4)' }} />
        </motion.div>

        <div style={{ overflow: 'hidden', marginBottom: 20 }}>
          <motion.h2
            initial={{ y: '100%' }}
            animate={isInView ? { y: 0 } : { y: '100%' }}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{ textAlign: 'center', fontSize: 'clamp(34px, 5.5vw, 64px)', fontWeight: 900, letterSpacing: '-0.035em', lineHeight: 1.05 }}
          >
            <span style={{ background: 'linear-gradient(135deg, #06b6d4, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              What we built. What worked. The constraints.
            </span>
          </motion.h2>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.35 }}
          style={{ textAlign: 'center', fontSize: 14, color: 'var(--text-45)', lineHeight: 1.75, maxWidth: 760, margin: '0 auto 36px' }}
        >
          Mar 31 demo summary for hiring managers and technical evaluators. This section intentionally separates product promise from demo-time constraints.
        </motion.p>

        <div className="demo-capture-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 22 }}>
          {demoSchemas.map((schema, i) => (
            <motion.div
              key={schema.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.45 + i * 0.12 }}
              style={{ borderRadius: 16, overflow: 'hidden', border: '1px solid rgba(6,182,212,0.22)', background: 'rgba(6,182,212,0.04)', display: 'flex', flexDirection: 'column' }}
            >
              <div style={{ padding: '12px 14px', borderBottom: '1px solid rgba(6,182,212,0.2)' }}>
                <div style={{ fontSize: 11, color: '#67e8f9', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 700 }}>{schema.id}</div>
                <div style={{ fontSize: 13, color: 'var(--text-75)', marginTop: 3, fontWeight: 700 }}>{schema.title}</div>
                <div style={{ fontSize: 12, color: 'var(--text-45)', marginTop: 2 }}>{schema.note}</div>
              </div>
              <div style={{ padding: 14, flex: 1 }}>
                <pre
                  style={{
                    margin: 0,
                    borderRadius: 10,
                    padding: '12px 12px',
                    background: 'rgba(3,7,18,0.65)',
                    border: '1px solid rgba(148,163,184,0.25)',
                    color: 'rgba(191,219,254,0.95)',
                    fontSize: 12,
                    lineHeight: 1.6,
                    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
                    whiteSpace: 'pre',
                    overflowX: 'auto',
                  }}
                >
                  {schema.code.join('\n')}
                </pre>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.65 }}
          style={{ borderRadius: 14, border: '1px solid rgba(59,130,246,0.2)', background: 'rgba(59,130,246,0.05)', padding: '14px 16px', marginBottom: 24 }}
        >
          <div style={{ fontSize: 11, color: '#93c5fd', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 8 }}>The System Scope</div>
          <ul className="demo-list-grid" style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {shownInDemo.map((item) => (
              <li key={item} style={{ display: 'flex', gap: 8, fontSize: 12.5, color: 'var(--text-55)', lineHeight: 1.6 }}>
                <span style={{ marginTop: 5, width: 5, height: 5, borderRadius: '50%', background: '#60a5fa', flexShrink: 0 }} />
                {item}
              </li>
            ))}
          </ul>
        </motion.div>

        <div className="split-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
          <motion.div initial={{ opacity: 0, x: -30 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.75 }}>
            <div style={{ borderRadius: 18, border: '1px solid rgba(16,185,129,0.22)', background: 'rgba(16,185,129,0.03)', padding: 20 }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '4px 10px', borderRadius: 999, background: 'rgba(16,185,129,0.14)', color: '#4ade80', border: '1px solid rgba(16,185,129,0.3)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 12 }}>
                Production-Ready Elements
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {worked.map((item) => (
                  <li key={item} style={{ display: 'flex', gap: 8, fontSize: 12.5, color: 'var(--text-55)', lineHeight: 1.65 }}>
                    <span style={{ marginTop: 5, width: 5, height: 5, borderRadius: '50%', background: '#4ade80', flexShrink: 0 }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.9 }}>
            <div style={{ borderRadius: 18, border: '1px solid rgba(245,158,11,0.22)', background: 'rgba(245,158,11,0.04)', padding: 20 }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '4px 10px', borderRadius: 999, background: 'rgba(245,158,11,0.14)', color: '#fbbf24', border: '1px solid rgba(245,158,11,0.3)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 12 }}>
                Demo Constraints & Challenges
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {fakedAndWhy.map((item) => (
                  <li key={item} style={{ display: 'flex', gap: 8, fontSize: 12.5, color: 'var(--text-55)', lineHeight: 1.65 }}>
                    <span style={{ marginTop: 5, width: 5, height: 5, borderRadius: '50%', background: '#fbbf24', flexShrink: 0 }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

