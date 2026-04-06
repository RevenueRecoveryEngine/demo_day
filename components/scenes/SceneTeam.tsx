'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'

type Member = {
  image: string
  name: string
  linkedin: string
  title: string
  subtitle: string
  accent: string
  accentRgb: string
  contributions: string[]
  tags: string[]
}

const members: Member[] = [
  {
    image: '/sahal.png',
    name: 'Sahal Alarabi',
    linkedin: 'https://www.linkedin.com/in/sahalalarabi/',
    title: 'Lead Product Manager - RRE',
    subtitle: 'Product Strategy · Roadmapping · Blueprint Authority · GTM',
    accent: '#a855f7',
    accentRgb: '168,85,247',
    contributions: [
      'Authored the 5-part product blueprint (Strategy, Software, Data, Design, Roadmap) as the source of truth for execution.',
      'Defined MVP acceptance criteria, the SCOUT -> CRITIC -> PRESCRIBER contract, and Demo Mode firewall rules.',
      'Led cross-functional alignment across the engineering team and unblocked key blueprint decisions.',
      'Drove the GTM path: demo -> private connector beta -> Shopify App Store launch.',
    ],
    tags: ['Product Canon', 'Blueprint Authority', 'GTM Strategy', 'Stakeholder Mgmt'],
  },
  {
    image: '/youssef.png',
    name: 'Youssef Mohammed Abdelal',
    linkedin: 'https://www.linkedin.com/in/youssef-mohammed-abdelal/',
    title: 'AI Engineer - Multi-Agent Orchestration',
    subtitle: 'LangGraph · DSPy · vLLM · Inngest · Agentic Workflows',
    accent: '#3b82f6',
    accentRgb: '59,130,246',
    contributions: [
      'Designed the orchestration backbone with LangGraph and DSPy for the SCOUT -> CRITIC -> PRESCRIBER runtime loop.',
      'Built durable Inngest execution with retries, step boundaries, concurrency isolation, and API throttling.',
      'Implemented CRITIC classification logic for Liability vs Experience risk with deterministic scoring.',
      'Optimized high-throughput generation paths using vLLM for Surgical Edit workflows.',
    ],
    tags: ['LangGraph', 'DSPy', 'vLLM', 'Inngest', 'Agentic Systems'],
  },
  {
    image: '/jibin.png',
    name: 'Jibin Kunjumon',
    linkedin: 'https://www.linkedin.com/in/jibin-kunjumon/',
    title: 'AI Engineer - LLM & RAG Systems',
    subtitle: 'Gen AI · RAG · LLMs · Python · Evidence Retrieval',
    accent: '#10b981',
    accentRgb: '16,185,129',
    contributions: [
      'Implemented PRESCRIBER output generation (inject / replace / remove / flag) from CRITIC expectation gaps.',
      'Built evidence-grounded RAG flows so each Surgical Edit is anchored to customer language.',
      'Engineered review embeddings with pgvector for semantic retrieval.',
      'Implemented robust JSON output handling and strict validation for agent responses.',
    ],
    tags: ['RAG', 'PRESCRIBER', 'pgvector', 'LLMs', 'Python'],
  },
  {
    image: '/hamza.png',
    name: 'Hamza Chraim',
    linkedin: 'https://www.linkedin.com/in/hamza-chraim/',
    title: 'AI Engineer - Full-Stack & Backend',
    subtitle: 'Next.js · TypeScript · Supabase · PostgreSQL · API Design',
    accent: '#ec4899',
    accentRgb: '236,72,153',
    contributions: [
      'Built SCOUT ingestion including fallback scraping tiers, listing extraction cascade, and review signal filtering.',
      'Designed and built the Sidecar Console in Next.js with logs, evidence cards, and run-state UI.',
      'Implemented Supabase data contracts and database policies for run persistence and retrieval.',
      'Built backend API routes and RunDTO composition for stable UI data delivery.',
    ],
    tags: ['SCOUT', 'Next.js', 'Supabase', 'Full-Stack', 'Backend APIs'],
  },
]

const fadeUp = (i: number) => ({
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] as const },
  },
})

export default function SceneTeam() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-8% 0px' })

  return (
    <section
      id="scene-team"
      ref={ref}
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--team-bg)',
        position: 'relative',
        padding: '120px 24px 100px',
        overflow: 'hidden',
        transition: 'background 0.4s ease',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          position: 'absolute',
          top: '15%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 1000,
          height: 600,
          borderRadius: '50%',
          background:
            'radial-gradient(ellipse, rgba(124,58,237,0.1) 0%, rgba(59,130,246,0.04) 45%, transparent 70%)',
          filter: 'blur(90px)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', marginBottom: 64, maxWidth: 760 }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 18 }}
        >
          <div style={{ width: 28, height: 1, background: 'rgba(168,85,247,0.45)' }} />
          <span style={{ fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(168,85,247,0.7)', fontWeight: 600 }}>
            The Team
          </span>
          <div style={{ width: 28, height: 1, background: 'rgba(168,85,247,0.45)' }} />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontSize: 'clamp(26px, 3.8vw, 42px)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            lineHeight: 1.15,
            color: 'var(--team-title)',
            marginBottom: 12,
          }}
        >
          Team Roles and LinkedIn Profiles
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          style={{ fontSize: 14, color: 'var(--team-sub)', lineHeight: 1.7 }}
        >
          Hiring-manager focused view of who built what, with direct profile links for verification and outreach.
        </motion.p>
      </div>

      <div
        style={{
          position: 'relative',
          zIndex: 10,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))',
          gap: 18,
          maxWidth: 1200,
          width: '100%',
        }}
      >
        {members.map((m, i) => (
          <TeamCard key={m.name} member={m} index={i} isInView={isInView} />
        ))}
      </div>
    </section>
  )
}

function TeamCard({ member, index, isInView }: { member: Member; index: number; isInView: boolean }) {
  const { image, name, linkedin, title, subtitle, accent, accentRgb, contributions, tags } = member

  return (
    <motion.div
      custom={index}
      variants={fadeUp(index)}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      whileHover={{ y: -5, transition: { duration: 0.28, ease: 'easeOut' } }}
      style={{
        background: 'var(--card-bg)',
        border: '1px solid var(--card-border)',
        borderRadius: 14,
        padding: '24px 22px 20px',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          background: `linear-gradient(90deg, ${accent}, transparent)`,
          borderRadius: '14px 14px 0 0',
        }}
      />

      <div style={{ display: 'flex', alignItems: 'center', gap: 13, marginBottom: 16 }}>
        <div
          style={{
            position: 'relative',
            width: 56,
            height: 56,
            borderRadius: '50%',
            flexShrink: 0,
            overflow: 'hidden',
            border: `1.5px solid rgba(${accentRgb},0.35)`,
            background: 'var(--text-15)',
          }}
        >
          <Image src={image} alt={name} fill style={{ objectFit: 'cover' }} />
        </div>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontSize: 14.5, fontWeight: 700, color: 'var(--team-title)', letterSpacing: '-0.02em', lineHeight: 1.25, marginBottom: 3 }}>
            {name}
          </div>
          <div style={{ fontSize: 10.5, fontWeight: 600, color: accent, letterSpacing: '0.005em', lineHeight: 1.3 }}>{title}</div>
        </div>
      </div>

      <div
        style={{
          fontSize: 10,
          color: 'var(--team-sub)',
          letterSpacing: '0.01em',
          lineHeight: 1.55,
          marginBottom: 12,
          paddingBottom: 12,
          borderBottom: '1px solid var(--card-divider)',
          fontFamily: "'Space Grotesk', sans-serif",
        }}
      >
        {subtitle}
      </div>

      <a
        href={linkedin}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          alignSelf: 'flex-start',
          marginBottom: 14,
          fontSize: 10.5,
          fontWeight: 700,
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          color: accent,
          textDecoration: 'none',
          padding: '6px 10px',
          borderRadius: 999,
          border: `1px solid rgba(${accentRgb},0.35)`,
          background: `rgba(${accentRgb},0.08)`,
        }}
      >
        LinkedIn Profile
      </a>

      <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 16px 0', display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
        {contributions.map((c) => (
          <li key={c} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
            <span style={{ flexShrink: 0, marginTop: 5, width: 5, height: 5, borderRadius: '50%', background: accent, opacity: 0.7 }} />
            <span style={{ fontSize: 12.5, color: 'var(--card-text)', lineHeight: 1.68, letterSpacing: '0.003em' }}>{c}</span>
          </li>
        ))}
      </ul>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
        {tags.map((tag) => (
          <span
            key={tag}
            style={{
              fontSize: 9.5,
              fontWeight: 600,
              padding: '3px 8px',
              borderRadius: 5,
              background: `rgba(${accentRgb},0.08)`,
              border: `1px solid rgba(${accentRgb},0.2)`,
              color: `rgba(${accentRgb},0.9)`,
              letterSpacing: '0.03em',
              textTransform: 'uppercase',
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  )
}

