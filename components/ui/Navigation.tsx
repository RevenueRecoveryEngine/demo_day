'use client'

import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { useState, useEffect } from 'react'

const chapters = [
  { label: 'HOOK',         href: '#scene-1' },
  { label: 'PROBLEM',      href: '#scene-2' },
  { label: 'BREAKDOWN',    href: '#scene-3' },
  { label: 'SOLUTION',     href: '#scene-4' },
  { label: 'PIPELINE',     href: '#scene-5' },
  { label: 'DEMO',         href: '#scene-6' },
  { label: 'ARCHITECTURE', href: '#scene-7' },
  { label: 'TEAM',         href: '#scene-team' },
  { label: 'IMPACT',       href: '#scene-8' },
]

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 60))

  // Persist theme to html element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const isLight = theme === 'light'

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark')

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        padding: '16px 28px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: scrolled ? 'var(--nav-scrolled-bg)' : 'transparent',
        backdropFilter: scrolled ? 'blur(24px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(24px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--nav-scrolled-border)' : 'none',
        transition: 'all 0.4s ease',
      }}
    >
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{
          width: 30, height: 30, borderRadius: 8,
          background: 'linear-gradient(135deg, #7c3aed, #3b82f6)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 13, fontWeight: 900, color: '#fff',
          boxShadow: '0 0 16px rgba(109,40,217,0.5)',
        }}>
          R
        </div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--nav-logo)', letterSpacing: '-0.01em', lineHeight: 1 }}>RRE</div>
          <div style={{ fontSize: 8, color: 'var(--nav-sub)', letterSpacing: '0.12em', textTransform: 'uppercase', lineHeight: 1, marginTop: 2 }}>Revenue Recovery Engine</div>
        </div>
      </div>

      {/* Chapter dots */}
      <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
        {chapters.map((c) => (
          <a
            key={c.label}
            href={c.href}
            title={c.label}
            style={{ display: 'block', width: 6, height: 6, borderRadius: '50%', background: 'var(--nav-dot)', cursor: 'pointer', transition: 'all 0.3s ease', textDecoration: 'none' }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLAnchorElement
              el.style.background = 'rgba(168,85,247,0.8)'
              el.style.boxShadow = '0 0 10px rgba(168,85,247,0.6)'
              el.style.transform = 'scale(1.6)'
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLAnchorElement
              el.style.background = 'var(--nav-dot)'
              el.style.boxShadow = 'none'
              el.style.transform = 'scale(1)'
            }}
          />
        ))}
      </div>

      {/* Right: theme toggle + CTA */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>

        {/* ── Theme Toggle ── */}
        <motion.button
          onClick={toggleTheme}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          title={isLight ? 'Switch to dark mode' : 'Switch to light mode'}
          style={{
            width: 36, height: 36, borderRadius: '50%',
            border: '1px solid rgba(168,85,247,0.25)',
            cursor: 'pointer',
            background: 'var(--toggle-bg)',
            color: 'var(--toggle-icon)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 15, transition: 'all 0.3s ease',
            fontFamily: 'Inter, sans-serif',
          }}
        >
          {isLight ? '🌙' : '☀️'}
        </motion.button>

        {/* CTA */}
        <motion.button
          whileHover={{ scale: 1.05, boxShadow: '0 0 24px rgba(109,40,217,0.35)' }}
          whileTap={{ scale: 0.97 }}
          style={{
            padding: '9px 18px', borderRadius: 100,
            border: '1px solid rgba(168,85,247,0.3)',
            cursor: 'pointer',
            background: 'rgba(109,40,217,0.12)',
            color: '#c084fc',
            fontSize: 12, fontWeight: 700,
            fontFamily: 'Inter, sans-serif',
            transition: 'all 0.3s ease',
            letterSpacing: '0.02em',
          }}
        >
          Get Early Access
        </motion.button>
      </div>
    </motion.nav>
  )
}
