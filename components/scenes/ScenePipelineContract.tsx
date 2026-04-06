'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export default function ScenePipelineContract() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' })

  // Animation variants
  const containerVars = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
  }
  const itemVars = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
  }

  return (
    <section
      id="scene-contract"
      ref={ref}
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #03030a 0%, #050814 100%)',
        paddingTop: 120,
        paddingBottom: 120,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background Grid */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(var(--text-15) 1px, transparent 1px), linear-gradient(90deg, var(--text-15) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          pointerEvents: 'none',
        }}
      />

      {/* Glows */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '15%',
          width: 500,
          height: 500,
          background: 'radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '20%',
          right: '15%',
          width: 500,
          height: 500,
          background: 'radial-gradient(circle, rgba(168,85,247,0.06) 0%, transparent 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 10 }}>
        {/* Header */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={containerVars}
          style={{ textAlign: 'center', marginBottom: 70 }}
        >
          <motion.div
            variants={itemVars}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 16 }}
          >
            <div style={{ width: 32, height: 1, background: 'rgba(59,130,246,0.5)' }} />
            <span
              style={{
                fontSize: 11,
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: '#60a5fa',
                fontWeight: 600,
              }}
            >
              Live Validation
            </span>
            <div style={{ width: 32, height: 1, background: 'rgba(59,130,246,0.5)' }} />
          </motion.div>

          <motion.h2
            variants={itemVars}
            style={{
              fontSize: 'clamp(36px, 4vw, 48px)',
              fontWeight: 900,
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              color: 'var(--text)',
              marginBottom: 20,
            }}
          >
            The Scope. <span style={{ color: '#4ade80' }}>The Execution.</span>{' '}
            <span style={{ color: '#a855f7' }}>Live System Validation.</span>
          </motion.h2>

          <motion.p
            variants={itemVars}
            style={{
              fontSize: 16,
              color: 'var(--text-45)',
              maxWidth: 700,
              margin: '0 auto',
              lineHeight: 1.6,
            }}
          >
            End-to-End system validation for hiring managers and technical evaluators. This section reflects a fully live run
            with real execution and real outputs.
          </motion.p>
        </motion.div>

        {/* Two Column Layout for the Schemas */}
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 0.8fr)', gap: 32, alignItems: 'stretch' }}>
          {/* SCHEMA 01: PIPELINE CONTRACT */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{
              background: 'rgba(20,20,30,0.4)',
              border: '1px solid var(--text-15)',
              borderRadius: 24,
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '20px 24px',
                borderBottom: '1px solid var(--text-15)',
                background: 'var(--text-15)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#3b82f6', boxShadow: '0 0 10px #3b82f6' }} />
                <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', letterSpacing: '0.05em' }}>
                  Schema 01: Pipeline Contract
                </span>
              </div>
              <span style={{ fontSize: 11, color: 'var(--text-35)', fontFamily: 'monospace' }}>
                Runtime sequence and handoff shape
              </span>
            </div>

            <div style={{ padding: '32px 24px', flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
              <svg viewBox="0 0 600 360" style={{ width: '100%', height: 'auto', overflow: 'visible' }}>
                <defs>
                  <marker id="arrow-blue" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
                    <path d="M0,0 L0,6 L6,3 z" fill="#3b82f6" />
                  </marker>
                  <marker id="arrow-gray" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
                    <path d="M0,0 L0,6 L6,3 z" fill="#6b7280" />
                  </marker>
                  <marker id="arrow-amber" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
                    <path d="M0,0 L0,6 L6,3 z" fill="#f59e0b" />
                  </marker>
                </defs>

                {/* Outer Inngest Box */}
                <rect
                  x="20"
                  y="10"
                  width="560"
                  height="340"
                  rx="12"
                  fill="rgba(99,102,241,0.03)"
                  stroke="rgba(99,102,241,0.2)"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />
                <text
                  x="300"
                  y="32"
                  textAnchor="middle"
                  fill="rgba(129,140,248,0.5)"
                  fontSize="10"
                  fontFamily="monospace"
                  letterSpacing="0.1em"
                >
                  INGEST WORKERS -- AI PIPELINE
                </text>

                {/* Demo Mode Decision */}
                <rect x="220" y="55" width="160" height="36" rx="6" fill="rgba(245,158,11,0.1)" stroke="rgba(245,158,11,0.4)" strokeWidth="1.5" />
                <text x="300" y="77" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="700">
                  Demo Mode?
                </text>

                {/* Branches */}
                {/* is_demo = false */}
                <motion.path
                  d="M 220 73 L 130 73 L 130 115"
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="1.5"
                  markerEnd="url(#arrow-blue)"
                  initial={{ pathLength: 0 }}
                  animate={isInView ? { pathLength: 1 } : {}}
                  transition={{ duration: 1, delay: 0.8 }}
                />
                <text x="175" y="65" textAnchor="middle" fill="#60a5fa" fontSize="9" fontFamily="monospace">
                  is_demo=false
                </text>

                {/* is_demo = true */}
                <motion.path
                  d="M 380 73 L 470 73 L 470 115"
                  fill="none"
                  stroke="#6b7280"
                  strokeWidth="1.5"
                  strokeDasharray="3 3"
                  markerEnd="url(#arrow-gray)"
                  initial={{ pathLength: 0 }}
                  animate={isInView ? { pathLength: 1 } : {}}
                  transition={{ duration: 1, delay: 0.8 }}
                />
                <text x="425" y="65" textAnchor="middle" fill="#9ca3af" fontSize="9" fontFamily="monospace">
                  is_demo=true
                </text>

                {/* True Branch Target */}
                <rect x="400" y="125" width="140" height="36" rx="6" fill="var(--text-15)" stroke="var(--text-15)" strokeWidth="1" />
                <text x="470" y="147" textAnchor="middle" fill="var(--text-60)" fontSize="10" fontFamily="monospace">
                  replay logs only
                </text>

                {/* False Branch (Pipeline Sequence) */}
                <g transform="translate(45, 125)">
                  {/* Pipeline Nodes */}
                  {[
                    { id: 'scout', label: 'SCOUT', x: 0 },
                    { id: 'c1', label: 'CRITIC_P1', x: 90 },
                    { id: 'c2', label: 'CRITIC_P2', x: 180 },
                    { id: 'presc', label: 'PRESCRIBER', x: 270 },
                  ].map((n) => (
                    <g key={n.id}>
                      <rect x={n.x} y="0" width="70" height="30" rx="4" fill="rgba(59,130,246,0.15)" stroke="#3b82f6" strokeWidth="1.2" />
                      <text x={n.x + 35} y="19" textAnchor="middle" fill="#93c5fd" fontSize="9" fontWeight="700" fontFamily="monospace">
                        {n.label}
                      </text>
                    </g>
                  ))}
                  {/* Arrows between nodes */}
                  <path d="M 70 15 L 85 15" fill="none" stroke="#3b82f6" strokeWidth="1.5" markerEnd="url(#arrow-blue)" />
                  <path d="M 160 15 L 175 15" fill="none" stroke="#3b82f6" strokeWidth="1.5" markerEnd="url(#arrow-blue)" />
                  <path d="M 250 15 L 265 15" fill="none" stroke="#3b82f6" strokeWidth="1.5" markerEnd="url(#arrow-blue)" />
                </g>

                {/* Down arrow from pipeline to gaps */}
                <motion.path
                  d="M 130 155 L 130 195"
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="1.5"
                  strokeDasharray="3 3"
                  markerEnd="url(#arrow-blue)"
                  initial={{ pathLength: 0 }}
                  animate={isInView ? { pathLength: 1 } : {}}
                  transition={{ duration: 0.5, delay: 1.5 }}
                />

                {/* Expectation Gaps Array */}
                <rect x="65" y="205" width="130" height="26" rx="4" fill="rgba(239,68,68,0.1)" stroke="#ef4444" strokeWidth="1" />
                <text x="130" y="222" textAnchor="middle" fill="#f87171" fontSize="10" fontFamily="monospace">
                  expectation_gaps[]
                </text>

                {/* Data Contracts Section */}
                <line x1="40" y1="260" x2="560" y2="260" stroke="var(--text-15)" strokeWidth="1" />
                <text x="50" y="275" fill="var(--text-45)" fontSize="9" letterSpacing="0.05em" style={{ textTransform: 'uppercase' }}>
                  Handoff Contracts
                </text>

                <g fontFamily="monospace" fontSize="10" transform="translate(50, 295)">
                  <text y="0" fill="#a78bfa">
                    <tspan fill="var(--text-55)">input:</tspan> listing_text + review_signals[]
                  </text>
                  <text y="20" fill="#f87171">
                    <tspan fill="var(--text-55)">critic_out:</tspan> expectation_gaps[]
                  </text>
                  <text y="40" fill="#4ade80">
                    <tspan fill="var(--text-55)">prescriber_out:</tspan> surgical_edits[]
                  </text>
                </g>
              </svg>
            </div>
          </motion.div>

          {/* SCHEMA 02: LIVE RELIABILITY */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            style={{
              background: 'rgba(20,20,30,0.4)',
              border: '1px solid var(--text-15)',
              borderRadius: 24,
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '20px 24px',
                borderBottom: '1px solid var(--text-15)',
                background: 'var(--text-15)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#a855f7', boxShadow: '0 0 10px #a855f7' }} />
                <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', letterSpacing: '0.05em' }}>
                  Schema 02: Live Reliability
                </span>
              </div>
            </div>

            <div style={{ padding: '28px 24px', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
              <p style={{ fontSize: 13, color: 'var(--text-55)', marginBottom: 24, lineHeight: 1.5 }}>
                How live execution stayed stable and production-like during the demo:
              </p>

              {/* Code Window */}
              <div
                style={{
                  background: '#0d1117',
                  borderRadius: 12,
                  border: '1px solid #30363d',
                  fontFamily: '"Fira Code", monospace',
                  fontSize: 13,
                  lineHeight: 1.6,
                  overflow: 'hidden',
                }}
              >
                <div style={{ display: 'flex', gap: 6, padding: '12px 16px', borderBottom: '1px solid #30363d', background: '#161b22' }}>
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f56' }} />
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ffbd2e' }} />
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#27c93f' }} />
                </div>
                <div style={{ padding: '20px 16px' }}>
                  <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 1.2 }}>
                    <span style={{ color: '#ff7b72' }}>if</span> <span style={{ color: '#c9d1d9' }}>(is_live) {'{'}</span>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 1.5 }}
                    style={{ paddingLeft: 24, marginTop: 4 }}
                  >
                    <span style={{ color: '#d2a8ff' }}>callExternalServices</span>
                    <span style={{ color: '#c9d1d9' }}>()</span>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 1.7 }}
                    style={{ paddingLeft: 24, marginTop: 4 }}
                  >
                    <span style={{ color: '#d2a8ff' }}>streamRuntimeLogs</span>
                    <span style={{ color: '#c9d1d9' }}>()</span>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 1.9 }}
                    style={{ paddingLeft: 24, marginTop: 4 }}
                  >
                    <span style={{ color: '#d2a8ff' }}>persistRunArtifacts</span>
                    <span style={{ color: '#c9d1d9' }}>()</span>
                  </motion.div>
                  <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 2.1 }} style={{ marginTop: 4 }}>
                    <span style={{ color: '#c9d1d9' }}>{'}'}</span>
                  </motion.div>
                </div>
              </div>

              <div style={{ marginTop: 'auto', paddingTop: 24 }}>
                <div
                  style={{
                    display: 'flex',
                    gap: 10,
                    alignItems: 'center',
                    color: '#a855f7',
                    fontSize: 12,
                    fontWeight: 600,
                    background: 'rgba(168,85,247,0.1)',
                    padding: '10px 16px',
                    borderRadius: 8,
                    border: '1px solid rgba(168,85,247,0.2)',
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                  <span>Live API execution stayed stable during presentation</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* 3-Column Summary Cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 24,
            marginTop: 48,
          }}
        >
          {/* Card 1: What We Showed */}
          <div style={{ background: 'rgba(59,130,246,0.05)', border: '1px solid rgba(59,130,246,0.2)', borderRadius: 20, padding: 32 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <span style={{ fontSize: 24 }}>📺</span>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: '#60a5fa', margin: 0 }}>System Scope</h3>
            </div>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                'Live storytelling flow across the full build journey with scroll-triggered chapters.',
                'SCOUT -> CRITIC -> PRESCRIBER sequence with clear evidence-to-edit handoff.',
                'Architecture simulation showing Sidecar execution and persisted run artifacts.',
                'Before/after listing transformation with risk-reduction framing.',
              ].map((item, i) => (
                <li key={i} style={{ fontSize: 13, color: 'var(--text-55)', lineHeight: 1.6, display: 'flex', gap: 10 }}>
                  <span style={{ color: '#3b82f6', flexShrink: 0 }}>•</span> <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Card 2: What Worked */}
          <div style={{ background: 'rgba(16,185,129,0.05)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: 20, padding: 32 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <span style={{ fontSize: 24 }}>✅</span>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: '#4ade80', margin: 0 }}>Execution Success</h3>
            </div>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                'Zero-failure run stability during the demo window.',
                'Fast interaction speed and smooth chapter transitions.',
                'Clear explanation of how pipeline output becomes copy-ready edits.',
                'Strong technical narrative for evaluators (architecture + constraints + tradeoffs).',
              ].map((item, i) => (
                <li key={i} style={{ fontSize: 13, color: 'var(--text-55)', lineHeight: 1.6, display: 'flex', gap: 10 }}>
                  <span style={{ color: '#10b981', flexShrink: 0 }}>•</span> <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Card 3: What We Validated Live */}
          <div style={{ background: 'rgba(168,85,247,0.05)', border: '1px solid rgba(168,85,247,0.2)', borderRadius: 20, padding: 32 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <span style={{ fontSize: 24 }}>🎯</span>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: '#a855f7', margin: 0 }}>Live Validation</h3>
            </div>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                'External calls (Gemini Flash, ZenRows, Apify) ran live successfully during the demo.',
                'Logs were generated in real time from live execution without replay.',
                'The end-to-end SCOUT -> CRITIC -> PRESCRIBER flow remained stable with production-like behavior.',
              ].map((item, i) => (
                <li key={i} style={{ fontSize: 13, color: 'var(--text-55)', lineHeight: 1.6, display: 'flex', gap: 10 }}>
                  <span style={{ color: '#a855f7', flexShrink: 0 }}>•</span> <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
