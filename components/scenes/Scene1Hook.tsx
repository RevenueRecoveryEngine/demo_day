'use client'

import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { useRef, useEffect, useState, useCallback } from 'react'

const streams = [
  { delay: 0,   dur: 5,  width: '45vw', top: '38%', color: 'linear-gradient(90deg, transparent, rgba(124,58,237,0.7), rgba(168,85,247,0.3), transparent)' },
  { delay: 1.2, dur: 6,  width: '60vw', top: '50%', color: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.5), rgba(99,102,241,0.2), transparent)' },
  { delay: 0.6, dur: 4.5,width: '35vw', top: '42%', color: 'linear-gradient(90deg, transparent, rgba(192,132,252,0.8), transparent)' },
  { delay: 1.8, dur: 7,  width: '50vw', top: '55%', color: 'linear-gradient(90deg, transparent, rgba(124,58,237,0.4), rgba(59,130,246,0.3), transparent)' },
  { delay: 0.3, dur: 5.5,width: '30vw', top: '46%', color: 'linear-gradient(90deg, transparent, rgba(236,72,153,0.3), rgba(168,85,247,0.4), transparent)' },
]

/* Typewriter hook */
function useTypewriter(phrases: string[], speed = 60) {
  const [text, setText] = useState('')
  const [phraseIdx, setPhraseIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const phrase = phrases[phraseIdx]
    const timeout = setTimeout(() => {
      if (!deleting) {
        if (text.length < phrase.length) {
          setText(phrase.slice(0, text.length + 1))
        } else {
          setTimeout(() => setDeleting(true), 1800)
        }
      } else {
        if (text.length > 0) {
          setText(text.slice(0, -1))
        } else {
          setDeleting(false)
          setPhraseIdx((phraseIdx + 1) % phrases.length)
        }
      }
    }, deleting ? speed / 2 : speed)
    return () => clearTimeout(timeout)
  }, [text, deleting, phraseIdx, phrases, speed])

  return text
}

/* Counting number animation */
function CountUp({ target, suffix = '', duration = 2000 }: { target: number; suffix?: string; duration?: number }) {
  const [val, setVal] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting && !started) setStarted(true) }, { threshold: 0.5 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [started])

  useEffect(() => {
    if (!started) return
    const start = Date.now()
    const tick = () => {
      const elapsed = Date.now() - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setVal(Math.round(eased * target))
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [started, target, duration])

  return <span ref={ref}>{val}{suffix}</span>
}

export default function Scene1Hook() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const bgY    = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])
  const textY  = useTransform(scrollYProgress, [0, 1], ['0%', '40%'])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  /* Mouse-tracking spotlight */
  const [mousePos, setMousePos] = useState({ x: -9999, y: -9999 })
  const springX = useSpring(mousePos.x, { stiffness: 60, damping: 20 })
  const springY = useSpring(mousePos.y, { stiffness: 60, damping: 20 })

  const handleMouse = useCallback((e: MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY })
  }, [])

  useEffect(() => {
    window.addEventListener('mousemove', handleMouse)
    return () => window.removeEventListener('mousemove', handleMouse)
  }, [handleMouse])

  const typedText = useTypewriter([
    'multi-agent orchestration.',
    'scraping fallback chains.',
    'CRITIC risk classification.',
    'agentic Surgical Edit generation.',
    'LangGraph + Inngest pipelines.',
  ], 55)

  return (
    <section ref={ref} id="scene-1"
      style={{ minHeight: '100vh', background: 'var(--scene-bg-1)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', transition: 'background 0.4s ease' }}>

      {/* â”€â”€ Mouse follow spotlight â”€â”€ */}
      <motion.div style={{
        position: 'absolute', pointerEvents: 'none', zIndex: 1,
        width: 600, height: 600, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(109,40,217,0.12) 0%, transparent 70%)',
        x: useTransform(springX, v => v - 300),
        y: useTransform(springY, v => v - 300),
        filter: 'blur(20px)',
      }} />

      {/* â”€â”€ Deep bg â”€â”€ */}
      <motion.div style={{ y: bgY, position: 'absolute', inset: 0, zIndex: 0 }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: `
            radial-gradient(ellipse 80% 60% at 50% 60%, rgba(88,28,235,0.28) 0%, transparent 70%),
            radial-gradient(ellipse 40% 40% at 20% 30%, rgba(124,58,237,0.15) 0%, transparent 60%),
            radial-gradient(ellipse 40% 40% at 80% 70%, rgba(59,130,246,0.1) 0%, transparent 60%)
          `,
        }} />

        {/* Grid */}
        <div style={{ position: 'absolute', inset: 0, opacity: 0.022, backgroundImage: `linear-gradient(rgba(168,85,247,1) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,1) 1px, transparent 1px)`, backgroundSize: '72px 72px' }} />

        {/* Giant watermark */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          fontSize: 'clamp(140px, 22vw, 320px)', fontWeight: 900, lineHeight: 1,
          letterSpacing: '-0.06em', userSelect: 'none', pointerEvents: 'none', whiteSpace: 'nowrap',
          background: 'linear-gradient(180deg, rgba(124,58,237,0.12) 0%, rgba(124,58,237,0.04) 100%)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
        }}>RRE</div>

        {/* Light streams */}
        {streams.map((s, i) => (
          <motion.div key={i}
            initial={{ x: '-120%', opacity: 0 }}
            animate={{ x: '140vw', opacity: [0, 0.8, 0.5, 0] }}
            transition={{ duration: s.dur, delay: s.delay, repeat: Infinity, ease: 'linear', repeatDelay: s.dur * 0.3 }}
            style={{ position: 'absolute', top: s.top, left: 0, width: s.width, height: 2, background: s.color, borderRadius: 2, zIndex: 1, skewX: '-6deg' }}
          />
        ))}

        {/* Orbiting rings */}
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 0 }}>
          {[600, 450, 300].map((sz, i) => (
            <div key={sz} style={{ position: 'absolute', width: sz, height: sz, borderRadius: '50%', border: `1px solid rgba(168,85,247,${0.06 + i * 0.03})`, animation: `${i % 2 === 0 ? 'spin-slow' : 'spin-reverse'} ${25 + i * 10}s linear infinite` }}>
              <div style={{ position: 'absolute', top: i === 0 ? -4 : i === 1 ? -3 : -2, left: '50%', marginLeft: i === 0 ? -4 : i === 1 ? -3 : -2, width: i === 0 ? 8 : i === 1 ? 6 : 4, height: i === 0 ? 8 : i === 1 ? 6 : 4, borderRadius: '50%', background: ['#a855f7','#3b82f6','#ec4899'][i], boxShadow: `0 0 ${12 + i * 4}px ${['rgba(168,85,247,0.9)','rgba(59,130,246,0.9)','rgba(236,72,153,0.9)'][i]}` }} />
            </div>
          ))}
        </div>
      </motion.div>

      {/* â”€â”€ Foreground content â”€â”€ */}
      <motion.div style={{ y: textY, opacity, position: 'relative', zIndex: 10, textAlign: 'center', padding: '0 24px', maxWidth: 1000, margin: '0 auto', paddingTop: 80 }}>

        {/* Chapter label */}
        <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 56 }}>
          <div style={{ width: 32, height: 1, background: 'rgba(168,85,247,0.5)' }} />
          <span style={{ fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(168,85,247,0.8)', fontWeight: 600 }}>Portfolio Project - AI Engineering Team</span>
          <motion.div style={{ width: 6, height: 6, borderRadius: '50%', background: '#a855f7', boxShadow: '0 0 10px #a855f7' }} animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.5, repeat: Infinity }} />
        </motion.div>

        {/* Line 1 */}
        <div style={{ marginBottom: 20, overflow: 'hidden' }}>
          <motion.h1 initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ duration: 1.1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontSize: 'clamp(52px, 9vw, 110px)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1.0, color: 'var(--text)' }}>
            We built{' '}
            <span style={{ background: 'linear-gradient(135deg, #a855f7 0%, #818cf8 60%, #38bdf8 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>RRE.</span>
          </motion.h1>
        </div>

        {/* Divider */}
        <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.8, delay: 0.9 }}
          style={{ width: 80, height: 1, margin: '28px auto', background: 'linear-gradient(90deg, transparent, rgba(168,85,247,0.5), transparent)', transformOrigin: 'center' }} />

        {/* Line 2 */}
        <div style={{ marginBottom: 20, overflow: 'hidden' }}>
          <motion.div initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ duration: 1.1, delay: 1, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontSize: 'clamp(28px, 4.5vw, 56px)', fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1.1, color: 'var(--text-60)' }}>
            RRE helps e-commerce teams recover lost revenue caused by unclear or incomplete product listings.
          </motion.div>
        </div>

        {/* Typewriter line */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
          style={{ fontSize: 'clamp(16px, 2vw, 22px)', color: 'var(--text-45)', marginBottom: 8, minHeight: 36, letterSpacing: '-0.01em' }}>
          Built with:{' '}
          <span style={{ color: '#c084fc', fontWeight: 600 }}>{typedText}</span>
          <motion.span animate={{ opacity: [1, 0] }} transition={{ duration: 0.6, repeat: Infinity }}
            style={{ display: 'inline-block', width: 2, height: '1em', background: '#c084fc', marginLeft: 2, verticalAlign: 'middle' }} />
        </motion.div>

        {/* Tag line */}
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 1.9 }}
          style={{ fontSize: 'clamp(15px, 1.8vw, 20px)', color: 'var(--text-45)', lineHeight: 1.7, maxWidth: 640, margin: '0 auto 52px', fontWeight: 400 }}>
          <strong style={{ color: '#c084fc', fontWeight: 700 }}>Customers often buy with one expectation and receive another</strong>
          {' '}→ returns, disputes, lost trust.<br/><br/>
          RRE detects these gaps using real customer feedback and turns them into precise fixes.
        </motion.p>

        {/* Live stats ticker */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.3 }}
          style={{ display: 'flex', justifyContent: 'center', gap: 40, marginBottom: 52, flexWrap: 'wrap' }}>
          {[
            { val: 3,  suffix: '',  label: 'AI agents (SCOUT, CRITIC, PRESCRIBER)' },
            { val: 4,  suffix: '',  label: 'team members' },
            { val: 5,  suffix: '+', label: 'project blueprint parts' },
          ].map(({ val, suffix, label }) => (
            <div key={label} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1, background: 'linear-gradient(135deg, #a855f7, #3b82f6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                <CountUp target={val} suffix={suffix} duration={2200} />
              </div>
              <div style={{ fontSize: 10, color: 'var(--text-25)', marginTop: 4, letterSpacing: '0.08em', textTransform: 'uppercase', maxWidth: 140 }}>{label}</div>
            </div>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.8 }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, color: 'var(--scroll-text)' }}>
          <span style={{ fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase' }}>Scroll to explore</span>
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 1.8, repeat: Infinity }}
            style={{ width: 24, height: 40, borderRadius: 12, border: '1px solid var(--scroll-border)', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: 6 }}>
            <motion.div animate={{ opacity: [1, 0], y: [0, 12] }} transition={{ duration: 1.8, repeat: Infinity }}
              style={{ width: 3, height: 8, borderRadius: 2, background: 'var(--scroll-dot)' }} />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}


