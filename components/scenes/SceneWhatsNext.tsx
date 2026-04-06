'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const roadmap = [
  {
    phase: 'Phase 2',
    status: 'Next',
    color: '#3b82f6',
    accentRgb: '59,130,246',
    title: 'Private Connector Beta',
    timeline: 'April – May 2026',
    icon: '🔌',
    items: [
      'Node.js Agentic Connector — ingests 12 months of returns via Shopify GraphQL Bulk API',
      '15-minute Zoom onboarding with Custom App token (replaces OAuth until Phase 3)',
      'Concierge CSV Bridge — fallback for merchants who won\'t generate tokens',
      'Golden Dataset flywheel — every Surgical Edit approval/rejection becomes training data',
    ],
    tag: 'In progress',
  },
  {
    phase: 'Phase 3',
    status: 'Planned',
    color: '#a855f7',
    accentRgb: '168,85,247',
    title: 'Shopify App Store Launch',
    timeline: 'June 2026',
    icon: '🏪',
    items: [
      'Full OAuth 2.0 + Shopify App Bridge — public install flow, App Store listing',
      'Metafield Persistence Layer — Surgical Edits written to metafields.rre.* (immune to ERP sync)',
      'Erasure Monitor — detects when nightly ERP sync restores dangerous claims; fires Regression Alert',
      'Shopify Billing API — recurring charges, first paying merchant',
    ],
    tag: 'Planned',
  },
  {
    phase: 'Phase 4',
    status: 'Gated',
    color: '#10b981',
    accentRgb: '16,185,129',
    title: 'Enterprise Refinery',
    timeline: 'Post-PMF — trigger-gated',
    icon: '🏭',
    items: [
      'Fine-tuned ABSA model (Llama 3 8B or DistilBERT) trained on Golden Dataset — ~90% cost reduction',
      'Kafka ingestion microservice — millions of review events, async and reliable',
      'Forensic Adjudication Engine — auto-generates INAD chargeback evidence from prescription history',
      'RLHF "Tinder for Data" — free-tier users validate edits, powering continuous model improvement',
    ],
    tag: '100+ merchants OR $5k/mo LLM spend',
  },
]

export default function SceneWhatsNext() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-8% 0px' })

  return (
    <section
      id="scene-next"
      ref={ref}
      style={{
        minHeight: '85vh',
        background: 'var(--scene-bg-8)',
        padding: '120px 24px 100px',
        position: 'relative',
        overflow: 'hidden',
        transition: 'background 0.4s ease',
      }}
    >
      {/* Grid */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)',
        backgroundSize: '64px 64px', pointerEvents: 'none',
      }} />

      {/* Ambient glow */}
      <div style={{
        position: 'absolute', bottom: '20%', left: '20%',
        width: 700, height: 500, borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(124,58,237,0.09) 0%, transparent 70%)',
        filter: 'blur(80px)', pointerEvents: 'none',
      }} />

      {/* Watermark */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        fontSize: 'clamp(100px, 18vw, 260px)', fontWeight: 900, letterSpacing: '-0.06em',
        color: 'transparent', WebkitTextStroke: '1px rgba(168,85,247,0.035)',
        pointerEvents: 'none', userSelect: 'none', whiteSpace: 'nowrap',
      }}>
        NEXT
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 10 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <motion.div
            initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ duration: 0.5 }}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 18 }}
          >
            <div style={{ width: 28, height: 1, background: 'rgba(168,85,247,0.45)' }} />
            <span style={{ fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(168,85,247,0.7)', fontWeight: 600 }}>
              What&apos;s Next
            </span>
            <div style={{ width: 28, height: 1, background: 'rgba(168,85,247,0.45)' }} />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 18 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontSize: 'clamp(26px, 3.8vw, 44px)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.15, color: 'var(--team-title)', marginBottom: 12 }}
          >
            The roadmap is written.
            <br />
            <span style={{ background: 'linear-gradient(135deg, #a855f7, #3b82f6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Phase 2 starts now.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.2 }}
            style={{ fontSize: 14, color: 'var(--text-35)', lineHeight: 1.7, maxWidth: 500, margin: '0 auto' }}
          >
            Each phase is trigger-gated — no premature infrastructure. Build what the business needs, when it needs it.
          </motion.p>
        </div>

        {/* Roadmap cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {roadmap.map((item, i) => (
            <motion.div
              key={item.phase}
              initial={{ opacity: 0, x: -32 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ x: 6, transition: { duration: 0.25 } }}
              style={{
                display: 'grid',
                gridTemplateColumns: '180px 1fr',
                gap: 24,
                background: 'var(--card-bg)',
                border: '1px solid var(--card-border)',
                borderRadius: 14,
                padding: '24px 28px',
                cursor: 'default',
                transition: 'border-color 0.3s ease',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLDivElement).style.borderColor = `rgba(${item.accentRgb},0.28)`
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--card-border)'
              }}
            >
              {/* Left: phase info */}
              <div style={{ borderRight: '1px solid var(--card-divider)', paddingRight: 24 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                  <span style={{ fontSize: 22 }}>{item.icon}</span>
                  <span style={{
                    fontSize: 10, fontWeight: 700, padding: '3px 8px', borderRadius: 5,
                    background: `rgba(${item.accentRgb},0.1)`,
                    border: `1px solid rgba(${item.accentRgb},0.22)`,
                    color: item.color, letterSpacing: '0.08em', textTransform: 'uppercase',
                  }}>
                    {item.phase}
                  </span>
                </div>
                <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--team-title)', marginBottom: 4, letterSpacing: '-0.01em' }}>
                  {item.title}
                </div>
                <div style={{ fontSize: 11, color: item.color, fontWeight: 600, marginBottom: 10 }}>
                  {item.timeline}
                </div>
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: 5,
                  fontSize: 9.5, fontWeight: 600,
                  padding: '3px 8px', borderRadius: 12,
                  background: i === 0 ? 'rgba(59,130,246,0.1)' : i === 2 ? 'rgba(16,185,129,0.08)' : 'rgba(168,85,247,0.08)',
                  border: `1px solid rgba(${item.accentRgb},0.2)`,
                  color: item.color, letterSpacing: '0.04em', textTransform: 'uppercase',
                  maxWidth: '100%',
                }}>
                  {i === 0 && <motion.span animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1.4, repeat: Infinity }} style={{ width: 5, height: 5, borderRadius: '50%', background: item.color, display: 'inline-block', flexShrink: 0 }} />}
                  <span style={{ fontSize: 9, lineHeight: 1.3 }}>{item.tag}</span>
                </div>
              </div>

              {/* Right: bullet items */}
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {item.items.map((bullet, bi) => (
                  <motion.li
                    key={bi}
                    initial={{ opacity: 0, x: -8 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: i * 0.15 + bi * 0.06 + 0.4 }}
                    style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}
                  >
                    <span style={{
                      flexShrink: 0, marginTop: 5,
                      width: 5, height: 5, borderRadius: '50%',
                      background: item.color, opacity: 0.65,
                    }} />
                    <span style={{ fontSize: 13, color: 'var(--card-text)', lineHeight: 1.7, letterSpacing: '0.003em' }}>
                      {bullet}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Footer CTA */}
        <motion.div
          initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 1 }}
          style={{ textAlign: 'center', marginTop: 52 }}
        >
          <div style={{ fontSize: 13, color: 'var(--text-25)', letterSpacing: '0.06em', marginBottom: 14, textTransform: 'uppercase' }}>
            Built by a 4-person team · Full-stack + AI engineering
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 10, flexWrap: 'wrap' }}>
            {['Next.js', 'LangGraph', 'DSPy', 'Inngest', 'Supabase', 'vLLM', 'Gemini Flash'].map(tag => (
              <span key={tag} style={{
                fontSize: 10, fontWeight: 600,
                padding: '4px 10px', borderRadius: 20,
                background: 'rgba(168,85,247,0.07)',
                border: '1px solid rgba(168,85,247,0.18)',
                color: 'rgba(168,85,247,0.8)',
                letterSpacing: '0.04em',
              }}>{tag}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
