'use client';
// components/SectionMentalModel.tsx — Correct mental model: SCOUT as an intelligent decision system.

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Brain, Layers, Filter, CheckCircle2 } from 'lucide-react';

const stages = [
  {
    icon: Brain,
    label: 'Strategy',
    description: 'Domain-aware config selection before a single byte is fetched',
    color: 'from-violet-500 to-purple-500',
    glow: 'shadow-violet-500/20',
    border: 'border-violet-500/30',
  },
  {
    icon: Layers,
    label: 'Extraction',
    description: 'Progressive waterfall — tier by tier until signal is secured',
    color: 'from-blue-500 to-cyan-500',
    glow: 'shadow-blue-500/20',
    border: 'border-blue-500/30',
  },
  {
    icon: Filter,
    label: 'Filtering',
    description: 'Quality gate — deduplication, signal ranking, top-30 cap',
    color: 'from-emerald-500 to-teal-500',
    glow: 'shadow-emerald-500/20',
    border: 'border-emerald-500/30',
  },
];

const keyLines = [
  '"Scraping is not a task — it is a decision system"',
  '"You do not guess. You select a strategy."',
  '"You do not rely on one method. You use a waterfall."',
  '"More data is not better. Better data is better."',
];

export function SectionMentalModel() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section
      id="section-mental-model"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#030712] px-6 py-20"
    >
      {/* Ambient light */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)' }}
      />

      <div ref={ref} className="relative z-10 w-full max-w-5xl mx-auto">
        {/* Tag */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-300 text-xs font-medium tracking-widest uppercase mb-8"
        >
          <CheckCircle2 className="w-3 h-3" />
          The Right Mental Model
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-6xl font-bold tracking-tight text-white mb-4"
        >
          Scraping is not a task.
          <br />
          <span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
            It is a decision system.
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="text-lg text-white/40 mb-16 max-w-xl"
        >
          SCOUT takes a product URL and returns structured evidence — not raw HTML.
        </motion.p>

        {/* I/O → SCOUT → Output flow */}
        <div className="flex flex-col md:flex-row items-center gap-6 mb-16">
          {/* Input */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col items-center gap-2"
          >
            <div className="px-5 py-3 rounded-xl border border-white/10 bg-white/5 text-sm text-white/60 font-mono">
              product_url
            </div>
          </motion.div>

          {/* Arrow */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={inView ? { opacity: 1, scaleX: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.45 }}
            className="flex items-center gap-1 text-white/20"
          >
            <div className="w-8 md:w-16 h-px bg-white/20" />
            <div className="w-0 h-0 border-t-[5px] border-b-[5px] border-l-[8px] border-t-transparent border-b-transparent border-l-white/20" />
          </motion.div>

          {/* SCOUT hub */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.5, type: 'spring', stiffness: 200 }}
            className="relative"
          >
            <motion.div
              animate={{ boxShadow: ['0 0 30px rgba(139,92,246,0.2)', '0 0 60px rgba(139,92,246,0.35)', '0 0 30px rgba(139,92,246,0.2)'] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="px-10 py-6 rounded-2xl border border-violet-500/40 bg-gradient-to-br from-violet-900/40 to-purple-900/20 backdrop-blur"
            >
              <div className="text-2xl font-bold text-white tracking-tight text-center">SCOUT</div>
              <div className="text-xs text-violet-400 text-center mt-1 uppercase tracking-widest">Decision System</div>
            </motion.div>
          </motion.div>

          {/* Arrow */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={inView ? { opacity: 1, scaleX: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.7 }}
            className="flex items-center gap-1 text-white/20"
          >
            <div className="w-8 md:w-16 h-px bg-white/20" />
            <div className="w-0 h-0 border-t-[5px] border-b-[5px] border-l-[8px] border-t-transparent border-b-transparent border-l-white/20" />
          </motion.div>

          {/* Output */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.75 }}
          >
            <div className="px-5 py-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-sm text-emerald-400 font-mono">
              structured_evidence
            </div>
          </motion.div>
        </div>

        {/* Three stages */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
          {stages.map((stage, i) => (
            <motion.div
              key={stage.label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.85 + i * 0.12 }}
              className={`relative p-6 rounded-2xl border ${stage.border} bg-white/[0.02] shadow-xl ${stage.glow}`}
            >
              <div className={`inline-flex p-2 rounded-lg bg-gradient-to-br ${stage.color} bg-opacity-20 mb-4`}>
                <stage.icon className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{stage.label}</h3>
              <p className="text-sm text-white/40 leading-relaxed">{stage.description}</p>
              {/* Step indicator */}
              <div className="absolute top-4 right-4 text-xs text-white/20 font-mono">0{i + 1}</div>
            </motion.div>
          ))}
        </div>

        {/* Key lines */}
        <div className="space-y-3">
          {keyLines.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 1.2 + i * 0.1 }}
              className="text-white/25 text-sm italic"
            >
              {line}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
