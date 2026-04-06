'use client'

import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

/* ─── AI Pipeline SVG (diagram 1 & 2: Scout → Critic → Prescriber) ─── */

const pipelineSteps = [
  { id: 'scout',     label: 'Scout Agent',      sub: 'Tiered Ingestion + Vectorize Reviews', color: '#3b82f6', glow: 'rgba(59,130,246,0.4)',  shape: 'hex',    x: 160, y: 50 },
  { id: 'raw',       label: 'Raw Provider Data', sub: '',                                     color: '#52525b', glow: 'none',                   shape: 'tag',    x: 160, y: 180 },
  { id: 'critic1',   label: 'Critic Agent',      sub: 'Phase 1: Extraction',                 color: '#f59e0b', glow: 'rgba(245,158,11,0.4)',   shape: 'hex',    x: 160, y: 290 },
  { id: 'attrs',     label: 'Extracted Listing Attributes', sub: '',                          color: '#52525b', glow: 'none',                   shape: 'tag',    x: 160, y: 400 },
  { id: 'critic2',   label: 'Critic Agent',      sub: 'Phase 2: Gap Judgment',               color: '#f59e0b', glow: 'rgba(245,158,11,0.4)',   shape: 'hex',    x: 160, y: 490 },
  { id: 'gap',       label: 'Expectation Gap',   sub: '',                                     color: '#ef4444', glow: 'rgba(239,68,68,0.45)',   shape: 'tag',    x: 160, y: 590 },
  { id: 'prescriber',label: 'Prescriber Agent',  sub: 'Intervention Drafting',               color: '#10b981', glow: 'rgba(16,185,129,0.4)',   shape: 'hex',    x: 160, y: 680 },
]

const demoBox = { label: 'Demo Path', sub: '1. Load Golden Dataset\n2. Replay logs\n3. Skip Gemini/Apify\nDeterministic result', x: 380, y: 270 }

function HexShape({ cx, cy, r, fill, glow }: { cx: number; cy: number; r: number; fill: string; glow: string }) {
  const pts = Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 3) * i - Math.PI / 6
    return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`
  }).join(' ')
  return (
    <g>
      {glow !== 'none' && <filter id={`gf-${cx}`}><feGaussianBlur stdDeviation="8" /></filter>}
      {glow !== 'none' && <polygon points={pts} fill={glow.replace(/,\d+\.?\d*\)/, ',0.25)')} filter={`url(#gf-${cx})`} />}
      <polygon points={pts} fill={fill + '22'} stroke={fill} strokeWidth="1.5" />
    </g>
  )
}

function TagShape({ x, y, w, h, fill }: { x: number; y: number; w: number; h: number; fill: string }) {
  return <rect x={x} y={y} width={w} height={h} rx={4} fill={fill + '22'} stroke={fill} strokeWidth="1" strokeDasharray="4 2" />
}

function AnimatedPath({ d, color, delay }: { d: string; color: string; delay: number }) {
  return (
    <motion.path
      d={d} fill="none" stroke={color} strokeWidth="1.5"
      strokeDasharray="6 3"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 0.6 }}
      transition={{ duration: 1.2, delay, ease: 'easeInOut' }}
    />
  )
}

/* ─── Full system diagram (diagram.jpg / diagram2.jpg) ─── */
const systemNodes = [
  { id: 'browser',  label: 'BROWSER', sub: 'React / Next.js Web App', x: 400, y: 420, color: '#3b82f6', w: 180, h: 70 },
  { id: 'nextjs',   label: 'NEXT.JS SERVER', sub: 'Azure Static Web Apps', x: 700, y: 420, color: '#6366f1', w: 180, h: 70 },
  { id: 'inngest',  label: 'INNGEST WORKERS', sub: 'Orchestration Layer', x: 700, y: 220, color: '#7c3aed', w: 180, h: 70 },
  { id: 'supabase', label: 'SUPABASE', sub: 'Source of Truth', x: 400, y: 220, color: '#f59e0b', w: 180, h: 70 },
  { id: 'ai',       label: 'AI PIPELINE', sub: 'Scout → Critic → Prescriber', x: 540, y: 50,  color: '#10b981', w: 200, h: 70 },
  { id: 'external', label: 'EXTERNAL', sub: 'Gemini Flash · ZenRows · Shopify', x: 940, y: 220, color: '#ef4444', w: 180, h: 70 },
]

const systemEdges = [
  { from: 'browser', to: 'nextjs',  label: '1. POST URL', steps: true },
  { from: 'nextjs',  to: 'inngest', label: '2. job.start',  steps: false },
  { from: 'inngest', to: 'ai',      label: '3. Trigger',    steps: false },
  { from: 'inngest', to: 'supabase',label: '4. Persist',    steps: false },
  { from: 'inngest', to: 'external',label: '4b. LLM Call',  steps: false },
  { from: 'nextjs',  to: 'supabase',label: '6. Read RunDTO',steps: false },
  { from: 'supabase',to: 'browser', label: '7. RunDTO',     steps: false },
  { from: 'browser', to: 'nextjs',  label: '8. Poll loop',  steps: false },
]

export default function Scene7Architecture() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-5% 0px' })
  const [activeTab, setActiveTab] = useState<'pipeline' | 'system'>('pipeline')
  const [activeStep, setActiveStep] = useState<number>(0)
  const [running, setRunning] = useState(false)

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  /* Step-by-step simulation */
  useEffect(() => {
    if (!running) return
    const timer = setInterval(() => {
      setActiveStep(s => {
        if (s >= pipelineSteps.length - 1) { setRunning(false); return s }
        return s + 1
      })
    }, 700)
    return () => clearInterval(timer)
  }, [running])

  const startRun = () => { setActiveStep(0); setRunning(true) }

  return (
    <section ref={ref} id="scene-7" style={{ minHeight: '100vh', background: 'linear-gradient(180deg, #04060f 0%, #03030a 100%)', paddingTop: 120, paddingBottom: 120, position: 'relative', overflow: 'hidden', transition: 'background 0.4s ease' }}>
      {/* BG watermark */}
      <motion.div style={{ y: bgY, position: 'absolute', top: '5%', left: '50%', transform: 'translateX(-50%)', zIndex: 0, pointerEvents: 'none', userSelect: 'none', whiteSpace: 'nowrap' }}>
        <div style={{ fontSize: 'clamp(80px, 16vw, 220px)', fontWeight: 900, letterSpacing: '-0.05em', color: 'transparent', WebkitTextStroke: '1px rgba(59,130,246,0.05)' }}>
          SIDECAR
        </div>
      </motion.div>

      <div style={{ maxWidth: 1120, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 10 }}>
        {/* Header */}
        <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 16 }}>
          <div style={{ width: 32, height: 1, background: 'rgba(59,130,246,0.4)' }} />
          <span style={{ fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(59,130,246,0.7)', fontWeight: 600 }}>End-to-End Workflow</span>
          <div style={{ width: 32, height: 1, background: 'rgba(59,130,246,0.4)' }} />
        </motion.div>

        <div style={{ overflow: 'hidden', marginBottom: 14 }}>
          <motion.h2 initial={{ y: '100%' }} animate={isInView ? { y: 0 } : { y: '100%' }} transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{ textAlign: 'center', fontSize: 'clamp(36px, 5.5vw, 64px)', fontWeight: 900, letterSpacing: '-0.035em', lineHeight: 1.05 }}>
            A decoupled, event-driven
            <span style={{ background: 'linear-gradient(135deg, #60a5fa, #a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}> autonomous system.</span>
          </motion.h2>
        </div>

        <motion.p initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.4 }}
          style={{ textAlign: 'center', fontSize: 15, color: 'var(--text-35)', lineHeight: 1.7, maxWidth: 540, margin: '0 auto 40px' }}>
          Next.js (App Router) · Inngest workers · Supabase (PostgreSQL + pgvector) · Gemini Flash · ZenRows · Vercel
        </motion.p>

        {/* Tabs */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.5 }}
          style={{ display: 'flex', justifyContent: 'center', gap: 4, marginBottom: 48, background: 'var(--text-15)', borderRadius: 100, padding: 4, border: '1px solid var(--text-15)', width: 'fit-content', margin: '0 auto 48px' }}>
          {(['pipeline', 'system'] as const).map(t => (
            <button key={t} onClick={() => setActiveTab(t)}
              style={{
                padding: '10px 26px', borderRadius: 100, border: 'none', cursor: 'pointer', fontFamily: 'Inter, sans-serif',
                fontSize: 13, fontWeight: 600, letterSpacing: '0.03em', transition: 'all 0.3s ease',
                background: activeTab === t ? 'linear-gradient(135deg, #7c3aed, #3b82f6)' : 'transparent',
                color: activeTab === t ? 'var(--text)' : 'var(--text-35)',
                boxShadow: activeTab === t ? '0 0 20px rgba(109,40,217,0.4)' : 'none',
              }}>
              {t === 'pipeline' ? '🤖 AI Pipeline' : '🏗️ System Architecture'}
            </button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          {activeTab === 'pipeline' && (
            <motion.div key="pipeline" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }}>
              {/* Run button */}
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 32 }}>
                <motion.button onClick={startRun} disabled={running}
                  whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(16,185,129,0.5)' }}
                  whileTap={{ scale: 0.97 }}
                  style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 28px', borderRadius: 100, border: '1px solid rgba(16,185,129,0.35)', cursor: running ? 'default' : 'pointer', background: running ? 'rgba(16,185,129,0.05)' : 'rgba(16,185,129,0.1)', color: '#4ade80', fontSize: 13, fontWeight: 700, fontFamily: 'Inter, sans-serif', transition: 'all 0.3s ease' }}>
                  <motion.span animate={{ rotate: running ? 360 : 0 }} transition={{ duration: 1, repeat: running ? Infinity : 0, ease: 'linear' }}>⚡</motion.span>
                  {running ? 'Running pipeline...' : 'Simulate Pipeline Run'}
                </motion.button>
              </div>

              {/* SVG Pipeline Diagram */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, alignItems: 'start' }}>
                {/* Left: SVG diagram */}
                <div style={{ background: 'var(--text-15)', borderRadius: 20, border: '1px solid var(--text-15)', padding: 24, overflow: 'hidden' }}>
                  <div style={{ fontSize: 11, color: 'var(--text-25)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 16, textAlign: 'center' }}>
                    Inngest Workers — AI Pipeline
                  </div>
                  <svg viewBox="0 0 560 800" style={{ width: '100%', height: 'auto' }}>
                    <defs>
                      <marker id="arrowBlue" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
                        <path d="M0,0 L0,6 L6,3 z" fill="#3b82f6" />
                      </marker>
                      <marker id="arrowAmber" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
                        <path d="M0,0 L0,6 L6,3 z" fill="#f59e0b" />
                      </marker>
                      <marker id="arrowGreen" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
                        <path d="M0,0 L0,6 L6,3 z" fill="#10b981" />
                      </marker>
                      <marker id="arrowRed" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
                        <path d="M0,0 L0,6 L6,3 z" fill="#ef4444" />
                      </marker>
                      <filter id="glow-blue" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="6" result="blur"/>
                        <feComposite in="SourceGraphic" in2="blur" operator="over"/>
                      </filter>
                    </defs>

                    {/* Outer box */}
                    <rect x="30" y="10" width="360" height="760" rx="12" fill="rgba(109,40,217,0.04)" stroke="rgba(109,40,217,0.2)" strokeWidth="1" strokeDasharray="6 3"/>
                    <text x="210" y="32" textAnchor="middle" fill="rgba(168,85,247,0.5)" fontSize="11" fontFamily="monospace" letterSpacing="2">INNGEST WORKERS</text>

                    {/* Demo Mode decision box */}
                    <rect x="120" y="45" width="160" height="50" rx="8" fill="rgba(245,158,11,0.08)" stroke="rgba(245,158,11,0.4)" strokeWidth="1.5"/>
                    <text x="200" y="65" textAnchor="middle" fill="#fbbf24" fontSize="11" fontFamily="Inter, sans-serif" fontWeight="700">Demo Mode?</text>
                    <text x="200" y="82" textAnchor="middle" fill="rgba(251,191,36,0.6)" fontSize="9" fontFamily="monospace">is_demo = true</text>

                    {/* is_demo=false path */}
                    <motion.line initial={{ opacity: 0 }} animate={{ opacity: isInView ? 0.5 : 0 }} transition={{ delay: 0.8 }}
                      x1="120" y1="72" x2="70" y2="72" stroke="#6b7280" strokeWidth="1" strokeDasharray="4 2"/>
                    <text x="65" y="70" textAnchor="end" fill="rgba(107,114,128,0.6)" fontSize="8" fontFamily="monospace">is_demo=false</text>

                    {/* is_demo=true path to demo box */}
                    <motion.line initial={{ opacity: 0 }} animate={{ opacity: isInView ? 0.5 : 0 }} transition={{ delay: 0.8 }}
                      x1="280" y1="72" x2="370" y2="72" stroke="#f59e0b" strokeWidth="1" strokeDasharray="4 2"/>
                    <text x="325" y="68" textAnchor="middle" fill="rgba(245,158,11,0.5)" fontSize="8" fontFamily="monospace">is_demo=true</text>

                    {/* Demo path box */}
                    <rect x="370" y="45" width="160" height="90" rx="8" fill="rgba(16,185,129,0.06)" stroke="rgba(16,185,129,0.3)" strokeWidth="1"/>
                    <text x="450" y="68" textAnchor="middle" fill="#4ade80" fontSize="10" fontFamily="Inter, sans-serif" fontWeight="700">Demo Path</text>
                    {['1. Load Golden Dataset','2. Replay logs','3. Skip Gemini/Apify','Deterministic result'].map((t,i) => (
                      <text key={i} x="450" y={84 + i * 11} textAnchor="middle" fill="rgba(74,222,128,0.55)" fontSize="8" fontFamily="monospace">{t}</text>
                    ))}

                    {/* AI Pipeline inner box */}
                    <rect x="55" y="105" width="310" height="590" rx="10" fill="rgba(99,102,241,0.04)" stroke="rgba(99,102,241,0.15)" strokeWidth="1" strokeDasharray="4 3"/>
                    <text x="210" y="122" textAnchor="middle" fill="rgba(129,140,248,0.4)" fontSize="9" fontFamily="monospace" letterSpacing="2">AI Pipeline</text>

                    {/* Scout */}
                    {(() => {
                      const cx = 210, cy = 175, r = 38, isActive = activeStep >= 0 && running
                      const pts = Array.from({length:6},(_,i) => { const a=(Math.PI/3)*i-Math.PI/6; return `${cx+r*Math.cos(a)},${cy+r*Math.sin(a)}` }).join(' ')
                      return (
                        <g>
                          {isActive && <polygon points={pts} fill={`rgba(59,130,246,0.15)`} filter="url(#glow-blue)"/>}
                          <polygon points={pts} fill={isActive ? "rgba(59,130,246,0.15)" : "rgba(59,130,246,0.05)"} stroke={isActive ? "#60a5fa" : "#3b82f6"} strokeWidth={isActive ? 2 : 1.5}/>
                          <text x={cx} y={cy-6} textAnchor="middle" fill="#60a5fa" fontSize="9" fontFamily="Inter,sans-serif" fontWeight="700">Scout Agent</text>
                          <text x={cx} y={cy+6} textAnchor="middle" fill="rgba(96,165,250,0.6)" fontSize="8" fontFamily="monospace">Tiered Ingestion</text>
                          <text x={cx} y={cy+16} textAnchor="middle" fill="rgba(96,165,250,0.6)" fontSize="8" fontFamily="monospace">+ Vectorize Reviews</text>
                        </g>
                      )
                    })()}

                    {/* Arrow Scout→Raw */}
                    <motion.line initial={{opacity:0}} animate={{opacity: isInView ? 0.4 : 0}} transition={{delay:1}} x1="210" y1="213" x2="210" y2="237" stroke="#3b82f6" strokeWidth="1.5" markerEnd="url(#arrowBlue)"/>
                    <rect x="140" y="240" width="140" height="22" rx="4" fill="rgba(82,82,91,0.15)" stroke="rgba(82,82,91,0.5)" strokeWidth="1" strokeDasharray="3 2"/>
                    <text x="210" y="255" textAnchor="middle" fill="rgba(161,161,170,0.7)" fontSize="8" fontFamily="monospace">Raw Provider Data</text>

                    {/* Arrow to Critic1 */}
                    <motion.line initial={{opacity:0}} animate={{opacity: isInView ? 0.4 : 0}} transition={{delay:1.2}} x1="210" y1="262" x2="210" y2="282" stroke="#f59e0b" strokeWidth="1.5" markerEnd="url(#arrowAmber)"/>

                    {/* Critic 1 */}
                    {(() => {
                      const cx = 210, cy = 325, r = 38, isActive = activeStep >= 2 && running
                      const pts = Array.from({length:6},(_,i) => { const a=(Math.PI/3)*i-Math.PI/6; return `${cx+r*Math.cos(a)},${cy+r*Math.sin(a)}` }).join(' ')
                      return (
                        <g>
                          <polygon points={pts} fill={isActive ? "rgba(245,158,11,0.15)" : "rgba(245,158,11,0.05)"} stroke={isActive?"#fbbf24":"#f59e0b"} strokeWidth={isActive?2:1.5}/>
                          <text x={cx} y={cy-7} textAnchor="middle" fill="#fbbf24" fontSize="9" fontFamily="Inter,sans-serif" fontWeight="700">Critic Agent</text>
                          <text x={cx} y={cy+6} textAnchor="middle" fill="rgba(251,191,36,0.55)" fontSize="8" fontFamily="monospace">Phase 1: Extraction</text>
                        </g>
                      )
                    })()}

                    <motion.line initial={{opacity:0}} animate={{opacity:isInView?0.4:0}} transition={{delay:1.4}} x1="210" y1="363" x2="210" y2="382" stroke="#f59e0b" strokeWidth="1.5" markerEnd="url(#arrowAmber)"/>
                    <rect x="110" y="385" width="200" height="22" rx="4" fill="rgba(82,82,91,0.15)" stroke="rgba(82,82,91,0.5)" strokeWidth="1" strokeDasharray="3 2"/>
                    <text x="210" y="400" textAnchor="middle" fill="rgba(161,161,170,0.7)" fontSize="8" fontFamily="monospace">Extracted Listing Attributes</text>

                    <motion.line initial={{opacity:0}} animate={{opacity:isInView?0.4:0}} transition={{delay:1.6}} x1="210" y1="407" x2="210" y2="427" stroke="#f59e0b" strokeWidth="1.5" markerEnd="url(#arrowAmber)"/>

                    {/* Critic 2 */}
                    {(() => {
                      const cx = 210, cy = 470, r = 38, isActive = activeStep >= 4 && running
                      const pts = Array.from({length:6},(_,i) => { const a=(Math.PI/3)*i-Math.PI/6; return `${cx+r*Math.cos(a)},${cy+r*Math.sin(a)}` }).join(' ')
                      return (
                        <g>
                          <polygon points={pts} fill={isActive?"rgba(245,158,11,0.15)":"rgba(245,158,11,0.05)"} stroke={isActive?"#fbbf24":"#f59e0b"} strokeWidth={isActive?2:1.5}/>
                          <text x={cx} y={cy-7} textAnchor="middle" fill="#fbbf24" fontSize="9" fontFamily="Inter,sans-serif" fontWeight="700">Critic Agent</text>
                          <text x={cx} y={cy+6} textAnchor="middle" fill="rgba(251,191,36,0.55)" fontSize="8" fontFamily="monospace">Phase 2: Gap Judgment</text>
                        </g>
                      )
                    })()}

                    <motion.line initial={{opacity:0}} animate={{opacity:isInView?0.4:0}} transition={{delay:1.8}} x1="210" y1="508" x2="210" y2="527" stroke="#ef4444" strokeWidth="1.5" markerEnd="url(#arrowRed)"/>
                    <rect x="130" y="530" width="160" height="22" rx="4" fill="rgba(239,68,68,0.08)" stroke="rgba(239,68,68,0.5)" strokeWidth="1" strokeDasharray="3 2"/>
                    <text x="210" y="545" textAnchor="middle" fill="rgba(248,113,113,0.8)" fontSize="8" fontFamily="monospace">Expectation Gap</text>

                    <motion.line initial={{opacity:0}} animate={{opacity:isInView?0.4:0}} transition={{delay:2}} x1="210" y1="552" x2="210" y2="572" stroke="#10b981" strokeWidth="1.5" markerEnd="url(#arrowGreen)"/>

                    {/* Prescriber */}
                    {(() => {
                      const cx = 210, cy = 618, r = 42, isActive = activeStep >= 6 && running
                      const pts = Array.from({length:6},(_,i) => { const a=(Math.PI/3)*i-Math.PI/6; return `${cx+r*Math.cos(a)},${cy+r*Math.sin(a)}` }).join(' ')
                      return (
                        <g>
                          {isActive && <polygon points={pts} fill="rgba(16,185,129,0.08)" filter="url(#glow-blue)"/>}
                          <polygon points={pts} fill={isActive?"rgba(16,185,129,0.15)":"rgba(16,185,129,0.05)"} stroke={isActive?"#4ade80":"#10b981"} strokeWidth={isActive?2:1.5}/>
                          <text x={cx} y={cy-8} textAnchor="middle" fill="#4ade80" fontSize="9" fontFamily="Inter,sans-serif" fontWeight="700">Prescriber Agent</text>
                          <text x={cx} y={cy+5} textAnchor="middle" fill="rgba(74,222,128,0.55)" fontSize="8" fontFamily="monospace">Intervention Drafting</text>
                        </g>
                      )
                    })()}

                    {/* Output arrow */}
                    <motion.line initial={{opacity:0}} animate={{opacity:isInView?0.6:0}} transition={{delay:2.2}} x1="210" y1="660" x2="210" y2="690" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrowGreen)"/>
                    <rect x="110" y="693" width="200" height="28" rx="8" fill="rgba(16,185,129,0.1)" stroke="rgba(16,185,129,0.4)" strokeWidth="1.5"/>
                    <text x="210" y="710" textAnchor="middle" fill="#4ade80" fontSize="10" fontFamily="Inter,sans-serif" fontWeight="700">Surgical Edit Output</text>
                  </svg>
                </div>

                {/* Right: step-by-step explanation */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {[
                    { icon: '🔍', step: 0, name: 'SCOUT', desc: 'Scrapes product page + reviews. Vectorizes for semantic retrieval. Demo mode loads from seeded dataset.', color: '#3b82f6' },
                    { icon: '⚗️', step: 2, name: 'CRITIC Phase 1', desc: 'Extracts listing attributes: title, description, specs. Identifies what IS stated.', color: '#f59e0b' },
                    { icon: '🧠', step: 4, name: 'CRITIC Phase 2', desc: 'Cross-references buyer signals against listing attributes. Identifies the Expectation Gap.', color: '#f59e0b' },
                    { icon: '⚠️', step: 5, name: 'GAP DETECTED', desc: 'Classifies: LIABILITY_RISK (missing fitment/specs) vs EXPERIENCE_RISK (sensory/performance).', color: '#ef4444' },
                    { icon: '✍️', step: 6, name: 'PRESCRIBER', desc: 'Drafts Surgical Edit: Inject | Replace | Remove | Flag. Evidence-backed, copy-ready.', color: '#10b981' },
                  ].map(({ icon, step, name, desc, color }) => (
                    <motion.div key={name}
                      initial={{ opacity: 0, x: 20 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ delay: step * 0.15 + 0.6 }}
                      style={{
                        padding: '14px 18px', borderRadius: 14,
                        background: (activeStep >= step && running) ? `${color}12` : 'var(--text-15)',
                        border: `1px solid ${(activeStep >= step && running) ? color + '35' : 'var(--text-15)'}`,
                        transition: 'all 0.5s ease',
                        display: 'flex', gap: 12, alignItems: 'flex-start',
                      }}>
                      <span style={{ fontSize: 18, flexShrink: 0 }}>{icon}</span>
                      <div>
                        <div style={{ fontSize: 11, fontWeight: 700, color, letterSpacing: '0.1em', marginBottom: 3, fontFamily: 'monospace' }}>{name}</div>
                        <div style={{ fontSize: 12, color: 'var(--text-45)', lineHeight: 1.65 }}>{desc}</div>
                      </div>
                      {activeStep >= step && running && (
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} style={{ marginLeft: 'auto', color: '#4ade80', fontSize: 14, flexShrink: 0 }}>✓</motion.div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'system' && (
            <motion.div key="system" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }}>
              {/* System architecture diagram */}
              <div style={{ background: 'var(--text-15)', borderRadius: 20, border: '1px solid var(--text-15)', padding: 28, overflow: 'auto' }}>
                <svg viewBox="0 0 1100 600" style={{ width: '100%', height: 'auto', minWidth: 800 }}>
                  <defs>
                    {['blue','purple','amber','green','red','indigo'].map(c => (
                      <marker key={c} id={`arrow-${c}`} markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
                        <path d="M0,0 L0,8 L8,4 z" fill={({'blue':'#3b82f6','purple':'#a855f7','amber':'#f59e0b','green':'#10b981','red':'#ef4444','indigo':'#6366f1'} as any)[c]}/>
                      </marker>
                    ))}
                  </defs>

                  {/* Shopify Storefront (external input) */}
                  <ellipse cx="80" cy="300" rx="65" ry="38" fill="rgba(239,68,68,0.06)" stroke="rgba(239,68,68,0.35)" strokeWidth="1.5"/>
                  <text x="80" y="294" textAnchor="middle" fill="#f87171" fontSize="9" fontFamily="Inter,sans-serif" fontWeight="700">Shopify Storefront</text>
                  <text x="80" y="307" textAnchor="middle" fill="rgba(248,113,113,0.5)" fontSize="7.5" fontFamily="monospace">Merchant&#39;s Product URLs</text>
                  <text x="80" y="318" textAnchor="middle" fill="rgba(248,113,113,0.5)" fontSize="7.5" fontFamily="monospace">Entry point for user input</text>

                  {/* 0. Merchant pastes URL */}
                  <motion.line initial={{opacity:0,pathLength:0}} animate={{opacity:isInView?0.6:0}} transition={{delay:0.5,duration:0.8}}
                    x1="145" y1="300" x2="305" y2="460" stroke="#6b7280" strokeWidth="1.5" strokeDasharray="5 3" markerEnd="url(#arrow-blue)"/>
                  <text x="210" y="380" fill="rgba(107,114,128,0.7)" fontSize="8" fontFamily="monospace" transform="rotate(-25,210,380)">0. Merchant pastes URL</text>

                  {/* Browser box */}
                  <rect x="300" y="410" width="200" height="120" rx="12" fill="rgba(59,130,246,0.06)" stroke="rgba(59,130,246,0.3)" strokeWidth="1.5"/>
                  <text x="400" y="432" textAnchor="middle" fill="rgba(59,130,246,0.4)" fontSize="8" fontFamily="monospace" letterSpacing="2">BROWSER — React / Next.js</text>
                  <rect x="318" y="438" width="164" height="34" rx="6" fill="rgba(59,130,246,0.06)" stroke="rgba(59,130,246,0.2)" strokeWidth="1"/>
                  <text x="400" y="450" textAnchor="middle" fill="#93c5fd" fontSize="8" fontFamily="Inter,sans-serif" fontWeight="700">User Interface</text>
                  {['• URL Input Form','• Glass Box Log Replay','• Results Dashboard'].map((t,i)=>
                    <text key={i} x="400" y={461+i*9} textAnchor="middle" fill="rgba(147,197,253,0.5)" fontSize="7" fontFamily="monospace">{t}</text>
                  )}
                  <rect x="318" y="480" width="164" height="22" rx="4" fill="rgba(239,68,68,0.08)" stroke="rgba(239,68,68,0.4)" strokeWidth="1"/>
                  <text x="400" y="495" textAnchor="middle" fill="#f87171" fontSize="8" fontFamily="monospace" fontWeight="700">Never calls external services</text>
                  <rect x="318" y="508" width="164" height="18" rx="4" fill="rgba(59,130,246,0.05)"/>
                  <text x="400" y="520" textAnchor="middle" fill="rgba(147,197,253,0.5)" fontSize="7" fontFamily="monospace">Polling Loop GET /api/runs/:id</text>

                  {/* 1. POST URL: Browser → Next.js */}
                  <motion.line initial={{opacity:0}} animate={{opacity:isInView?0.7:0}} transition={{delay:0.9}}
                    x1="500" y1="470" x2="620" y2="470" stroke="#6366f1" strokeWidth="1.5" markerEnd="url(#arrow-indigo)"/>
                  <text x="558" y="462" textAnchor="middle" fill="rgba(99,102,241,0.7)" fontSize="8" fontFamily="monospace">1. POST URL</text>

                  {/* Next.js box */}
                  <rect x="620" y="370" width="200" height="200" rx="12" fill="rgba(99,102,241,0.06)" stroke="rgba(99,102,241,0.3)" strokeWidth="1.5"/>
                  <text x="720" y="390" textAnchor="middle" fill="rgba(99,102,241,0.4)" fontSize="8" fontFamily="monospace" letterSpacing="1">NEXT.JS SERVER — Azure</text>
                  {[
                    {t:'POST /api/inngest',s1:'• Inngest hook route',s2:'• Executes background functions',y:400},
                    {t:'POST /api/jobs/start',s1:'• Validate URL',s2:'• Generate job_id + Emit event',y:450},
                    {t:'GET /api/runs/:id',s1:'• Query Supabase',s2:'• Build RunDTO',y:500},
                  ].map(({t,s1,s2,y})=>(
                    <g key={t}>
                      <rect x="635" y={y} width="170" height="44" rx="6" fill="rgba(30,30,46,0.5)" stroke="rgba(99,102,241,0.2)" strokeWidth="1"/>
                      <text x="720" y={y+13} textAnchor="middle" fill="#a5b4fc" fontSize="8" fontFamily="monospace" fontWeight="700">{t}</text>
                      <text x="720" y={y+25} textAnchor="middle" fill="rgba(165,180,252,0.45)" fontSize="6.5" fontFamily="monospace">{s1}</text>
                      <text x="720" y={y+35} textAnchor="middle" fill="rgba(165,180,252,0.45)" fontSize="6.5" fontFamily="monospace">{s2}</text>
                    </g>
                  ))}
                  {/* Event Payload box */}
                  <rect x="850" y="440" width="140" height="50" rx="8" fill="rgba(30,30,46,0.6)" stroke="rgba(99,102,241,0.25)" strokeWidth="1"/>
                  <text x="920" y="458" textAnchor="middle" fill="rgba(165,180,252,0.7)" fontSize="8" fontFamily="monospace" fontWeight="700">Event Payload</text>
                  <text x="920" y="475" textAnchor="middle" fill="rgba(165,180,252,0.4)" fontSize="7" fontFamily="monospace">{'{ job_id, product_url, is_demo }'}</text>
                  <line x1="805" y1="465" x2="850" y2="465" stroke="rgba(99,102,241,0.3)" strokeWidth="1" strokeDasharray="3 2"/>

                  {/* 2. job.start: Next.js → Inngest */}
                  <motion.line initial={{opacity:0}} animate={{opacity:isInView?0.7:0}} transition={{delay:1.3}}
                    x1="720" y1="370" x2="720" y2="320" stroke="#7c3aed" strokeWidth="1.5" markerEnd="url(#arrow-purple)"/>
                  <text x="726" y="350" fill="rgba(124,58,237,0.8)" fontSize="8" fontFamily="monospace">2. job.start</text>

                  {/* Inngest workers box */}
                  <rect x="500" y="100" width="440" height="215" rx="12" fill="rgba(109,40,217,0.05)" stroke="rgba(109,40,217,0.25)" strokeWidth="1.5" strokeDasharray="5 3"/>
                  <text x="720" y="120" textAnchor="middle" fill="rgba(168,85,247,0.4)" fontSize="9" fontFamily="monospace" letterSpacing="2">INNGEST WORKERS</text>
                  <rect x="515" y="128" width="200" height="70" rx="8" fill="rgba(30,20,70,0.6)" stroke="rgba(109,40,217,0.3)" strokeWidth="1"/>
                  <text x="615" y="145" textAnchor="middle" fill="#c4b5fd" fontSize="9" fontFamily="Inter,sans-serif" fontWeight="700">Orchestration Layer</text>
                  {['• Step retry + backoff','• Rate limit: Gemini 2 RPM','• Idempotency: job_id','• Fail closed on error'].map((t,i)=>
                    <text key={i} x="615" y={158+i*10} textAnchor="middle" fill="rgba(196,181,253,0.45)" fontSize="7.5" fontFamily="monospace">{t}</text>
                  )}

                  {/* AI Pipeline inside Inngest (simplified) */}
                  <rect x="730" y="128" width="195" height="170" rx="8" fill="rgba(16,185,129,0.04)" stroke="rgba(16,185,129,0.2)" strokeWidth="1"/>
                  <text x="827" y="145" textAnchor="middle" fill="rgba(16,185,129,0.5)" fontSize="8" fontFamily="monospace" letterSpacing="1">AI Pipeline</text>
                  {[
                    {label:'Scout Agent',color:'#3b82f6',y:155},
                    {label:'↓ Raw Provider Data',color:'#6b7280',y:175},
                    {label:'Critic Agent Phase 1',color:'#f59e0b',y:195},
                    {label:'Critic Agent Phase 2',color:'#f59e0b',y:215},
                    {label:'↓ Expectation Gap',color:'#ef4444',y:235},
                    {label:'Prescriber Agent',color:'#10b981',y:258},
                  ].map(({label,color,y})=>(
                    <text key={y} x="827" y={y} textAnchor="middle" fill={color} fontSize="8" fontFamily="monospace">{label}</text>
                  ))}

                  {/* Supabase */}
                  <rect x="60" y="100" width="200" height="200" rx="12" fill="rgba(245,158,11,0.05)" stroke="rgba(245,158,11,0.3)" strokeWidth="1.5"/>
                  <text x="160" y="120" textAnchor="middle" fill="rgba(245,158,11,0.5)" fontSize="9" fontFamily="monospace" letterSpacing="1">SUPABASE</text>
                  <text x="160" y="133" textAnchor="middle" fill="rgba(245,158,11,0.35)" fontSize="7.5" fontFamily="monospace">Source of Truth</text>
                  <ellipse cx="160" cy="155" rx="55" ry="18" fill="rgba(16,185,129,0.1)" stroke="rgba(16,185,129,0.4)" strokeWidth="1.5"/>
                  <text x="160" y="150" textAnchor="middle" fill="#4ade80" fontSize="7.5" fontFamily="monospace" fontWeight="700">Golden Dataset</text>
                  <text x="160" y="162" textAnchor="middle" fill="rgba(74,222,128,0.5)" fontSize="6.5" fontFamily="monospace">Seeded demo rows</text>
                  {[{t:'Postgres Tables',s:['• scrape_records','• insights: fitment/specs','• prescriptions','• jobs: state']},{t:'Security',s:['• RLS enabled','• Server-only reads']}].map(({t,s},bi)=>(
                    <g key={bi}>
                      <rect x="75" y={180+bi*55} width="170" height={42+s.length*2} rx="6" fill="rgba(30,20,10,0.5)" stroke="rgba(245,158,11,0.2)" strokeWidth="1"/>
                      <text x="160" y={195+bi*55} textAnchor="middle" fill="#fbbf24" fontSize="8" fontFamily="Inter,sans-serif" fontWeight="700">{t}</text>
                      {s.map((l,i)=><text key={i} x="160" y={206+i*10+bi*55} textAnchor="middle" fill="rgba(251,191,36,0.4)" fontSize="6.5" fontFamily="monospace">{l}</text>)}
                    </g>
                  ))}

                  {/* Inngest→Supabase */}
                  <motion.line initial={{opacity:0}} animate={{opacity:isInView?0.6:0}} transition={{delay:1.5}}
                    x1="500" y1="200" x2="265" y2="200" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="5 3" markerEnd="url(#arrow-amber)"/>
                  <text x="380" y="194" textAnchor="middle" fill="rgba(245,158,11,0.7)" fontSize="7.5" fontFamily="monospace">4c. Persist Artifacts</text>

                  {/* Supabase→Browser */}
                  <motion.line initial={{opacity:0}} animate={{opacity:isInView?0.6:0}} transition={{delay:1.7}}
                    x1="160" y1="300" x2="370" y2="440" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4 3" markerEnd="url(#arrow-blue)"/>
                  <text x="240" y="390" fill="rgba(245,158,11,0.6)" fontSize="7.5" fontFamily="monospace" transform="rotate(30,240,390)">7. RunDTO</text>

                  {/* Next.js→Supabase */}
                  <motion.line initial={{opacity:0}} animate={{opacity:isInView?0.6:0}} transition={{delay:1.9}}
                    x1="620" y1="500" x2="265" y2="250" stroke="#6366f1" strokeWidth="1" strokeDasharray="3 2" markerEnd="url(#arrow-indigo)"/>
                  <text x="420" y="390" fill="rgba(99,102,241,0.5)" fontSize="7" fontFamily="monospace" transform="rotate(-35,420,390)">6. Read RunDTO</text>

                  {/* Inngest→External */}
                  <motion.line initial={{opacity:0}} animate={{opacity:isInView?0.6:0}} transition={{delay:2.1}}
                    x1="940" y1="200" x2="1010" y2="200" stroke="#ef4444" strokeWidth="1.5" markerEnd="url(#arrow-red)"/>
                  {/* External services box */}
                  <rect x="1005" y="150" width="85" height="100" rx="8" fill="rgba(239,68,68,0.06)" stroke="rgba(239,68,68,0.3)" strokeWidth="1"/>
                  <text x="1048" y="168" textAnchor="middle" fill="#f87171" fontSize="7.5" fontFamily="Inter,sans-serif" fontWeight="700">External</text>
                  {['Gemini Flash','2 RPM throttle','LLM Inference','','ZenRows / Apify','Scraper Layer'].map((t,i)=>
                    <text key={i} x="1048" y={180+i*10} textAnchor="middle" fill={i===0||i===1||i===2?'rgba(248,113,113,0.6)':i===4||i===5?'rgba(248,113,113,0.6)':'transparent'} fontSize="7" fontFamily="monospace">{t}</text>
                  )}
                  <text x="990" y="194" fill="rgba(239,68,68,0.6)" fontSize="7" fontFamily="monospace">4b. LLM Call</text>
                </svg>
              </div>

              {/* Key insight cards */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, marginTop: 20 }}>
                {[
                  { icon: '🔌', t: 'Non-invasive', d: 'Zero changes to your existing tech stack. Reads public storefront data the same way a browser does.' },
                  { icon: '⚡', t: 'Async Sidecar', d: 'Inngest decouples the heavy work from your request. Browser disconnects while the pipeline runs.' },
                  { icon: '🔒', t: 'Data Isolated', d: 'No merchant API keys. No oauth. No client-side access to Supabase. Audit trail stays internal.' },
                ].map(f => (
                  <motion.div key={f.t} initial={{opacity:0,y:12}} animate={isInView?{opacity:1,y:0}:{}} transition={{delay:1.2}}
                    className="glass" style={{borderRadius:14,padding:'16px 18px'}}>
                    <span style={{fontSize:20}}>{f.icon}</span>
                    <div style={{fontSize:13,fontWeight:700,color:'var(--text-75)',margin:'8px 0 4px'}}>{f.t}</div>
                    <div style={{fontSize:11,color:'var(--text-35)',lineHeight:1.65}}>{f.d}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
