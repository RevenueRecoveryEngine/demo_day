'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const stack = [
  {
    category: 'Frontend & UI',
    color: '#3b82f6',
    accentRgb: '59,130,246',
    tools: [
      { name: 'Next.js 14', sub: 'App Router · RSC · Server Actions', icon: '▲' },
      { name: 'TypeScript', sub: 'Strict mode · end-to-end typed', icon: 'TS' },
      { name: 'Framer Motion', sub: 'Scroll-triggered · spring physics', icon: '⚡' },
    ],
  },
  {
    category: 'AI & Orchestration',
    color: '#a855f7',
    accentRgb: '168,85,247',
    tools: [
      { name: 'LangGraph', sub: 'Multi-agent graph execution', icon: '🔗' },
      { name: 'DSPy', sub: 'Declarative LLM programming', icon: '🧠' },
      { name: 'Gemini Flash', sub: 'LLM inference · 2 RPM throttled', icon: '✦' },
      { name: 'vLLM', sub: 'High-throughput inference serving', icon: '⚙' },
    ],
  },
  {
    category: 'Backend & Data',
    color: '#10b981',
    accentRgb: '16,185,129',
    tools: [
      { name: 'Supabase', sub: 'PostgreSQL · RLS · pgvector', icon: '🗄' },
      { name: 'Inngest', sub: 'Durable async · retry · idempotency', icon: '🔀' },
      { name: 'ZenRows / Apify', sub: 'Paid scrape fallback layer', icon: '🌐' },
    ],
  },
  {
    category: 'Infra & Deployment',
    color: '#f59e0b',
    accentRgb: '245,158,11',
    tools: [
      { name: 'Vercel', sub: 'Edge deployment · serverless', icon: '▼' },
      { name: 'pgvector', sub: 'Semantic review embeddings', icon: '〈〉' },
      { name: 'Inngest Cloud', sub: 'Step fan-out · rate limiting', icon: '☁' },
    ],
  },
]

export default function SceneTechStack() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-8% 0px' })

  return (
    <section
      id="scene-tech"
      ref={ref}
      style={{
        minHeight: '100vh',
        background: 'var(--scene-bg-5)',
        padding: '120px 24px 100px',
        position: 'relative',
        overflow: 'hidden',
        transition: 'background 0.4s ease',
      }}
    >
      {/* Faint grid */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)',
        backgroundSize: '64px 64px', pointerEvents: 'none',
      }} />

      {/* Watermark */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        fontSize: 'clamp(120px, 20vw, 280px)', fontWeight: 900, letterSpacing: '-0.06em',
        color: 'transparent', WebkitTextStroke: '1px rgba(168,85,247,0.04)',
        pointerEvents: 'none', userSelect: 'none', whiteSpace: 'nowrap',
      }}>
        STACK
      </div>

      {/* Ambient glow */}
      <div style={{
        position: 'absolute', top: '30%', right: '10%',
        width: 600, height: 600, borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(168,85,247,0.08) 0%, transparent 70%)',
        filter: 'blur(80px)', pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1120, margin: '0 auto', position: 'relative', zIndex: 10 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <motion.div
            initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ duration: 0.5 }}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 18 }}
          >
            <div style={{ width: 28, height: 1, background: 'rgba(168,85,247,0.45)' }} />
            <span style={{ fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(168,85,247,0.7)', fontWeight: 600 }}>
              Tech Stack
            </span>
            <div style={{ width: 28, height: 1, background: 'rgba(168,85,247,0.45)' }} />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 18 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.15, color: 'var(--team-title)', marginBottom: 12 }}
          >
            Built with production-grade tools.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.2 }}
            style={{ fontSize: 14, color: 'var(--text-35)', lineHeight: 1.7, maxWidth: 520, margin: '0 auto' }}
          >
            No toy stack. Every tool was chosen to handle the edge cases that matter: rate limiting, idempotency, semantic retrieval, and durable async execution.
          </motion.p>
        </div>

        {/* Stack grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 16,
        }}>
          {stack.map((group, gi) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 32 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: gi * 0.1, ease: [0.16, 1, 0.3, 1] }}
              style={{
                background: 'var(--card-bg)',
                border: '1px solid var(--card-border)',
                borderRadius: 14,
                overflow: 'hidden',
                transition: 'border-color 0.3s ease',
              }}
              whileHover={{
                y: -4,
                transition: { duration: 0.25 },
              }}
            >
              {/* Category header */}
              <div style={{
                padding: '14px 18px',
                borderBottom: '1px solid var(--card-divider)',
                display: 'flex', alignItems: 'center', gap: 10,
                background: `rgba(${group.accentRgb},0.05)`,
              }}>
                <div style={{
                  width: 8, height: 8, borderRadius: '50%',
                  background: group.color,
                  boxShadow: `0 0 8px ${group.color}`,
                }} />
                <span style={{
                  fontSize: 10, fontWeight: 700, letterSpacing: '0.2em',
                  textTransform: 'uppercase', color: group.color,
                }}>
                  {group.category}
                </span>
              </div>

              {/* Tools */}
              <div style={{ padding: '12px 0' }}>
                {group.tools.map((tool, ti) => (
                  <motion.div
                    key={tool.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: gi * 0.1 + ti * 0.07 + 0.3 }}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 14,
                      padding: '10px 18px',
                      borderBottom: ti < group.tools.length - 1 ? '1px solid var(--card-divider)' : 'none',
                      transition: 'background 0.2s ease',
                    }}
                    whileHover={{ backgroundColor: `rgba(${group.accentRgb},0.04)` } as never}
                  >
                    {/* Icon badge */}
                    <div style={{
                      width: 36, height: 36, borderRadius: 9, flexShrink: 0,
                      background: `rgba(${group.accentRgb},0.1)`,
                      border: `1px solid rgba(${group.accentRgb},0.2)`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: tool.icon.length > 2 ? 10 : 14, fontWeight: 800,
                      color: group.color, fontFamily: 'monospace',
                    }}>
                      {tool.icon}
                    </div>

                    <div>
                      <div style={{
                        fontSize: 13, fontWeight: 700, color: 'var(--team-title)',
                        letterSpacing: '-0.01em', lineHeight: 1.3,
                      }}>
                        {tool.name}
                      </div>
                      <div style={{
                        fontSize: 11, color: 'var(--text-35)',
                        lineHeight: 1.4, marginTop: 1,
                      }}>
                        {tool.sub}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Engineering-honest note from the ticket */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.8 }}
          style={{
            marginTop: 40, padding: '22px 28px', borderRadius: 14,
            background: 'rgba(245,158,11,0.05)',
            border: '1px solid rgba(245,158,11,0.18)',
            display: 'flex', gap: 16, alignItems: 'flex-start',
          }}
        >
          <span style={{ fontSize: 20, flexShrink: 0 }}>🔬</span>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#fbbf24', letterSpacing: '0.08em', marginBottom: 5, textTransform: 'uppercase' }}>
              Engineering Transparency
            </div>
            <p style={{ fontSize: 13.5, color: 'var(--text-45)', lineHeight: 1.75, margin: 0 }}>
              The Mar 31 live demo used <strong style={{ color: 'var(--team-title)' }}>Demo Mode</strong> — a firewall that replaces all external calls
              (Gemini Flash, ZenRows, Apify) with a pre-seeded Golden Dataset and deterministic log replay.
              This was intentional: we shipped a{' '}
              <strong style={{ color: '#fbbf24' }}>zero-latency, zero-failure demo</strong> while the real pipeline handles rate limits,
              scraping fallbacks, and LLM throttling in production. Showing this distinction to a technical audience
              signals architectural maturity, not a shortcut.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
