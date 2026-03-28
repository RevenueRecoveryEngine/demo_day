'use client';
// components/SectionProblem.tsx — "Wrong mental model" section showing why naive scraping fails.

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { AlertTriangle, Wifi, Code2, Skull } from 'lucide-react';

const steps = [
  { icon: Wifi, label: 'Fetch URL', color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
  { icon: Code2, label: 'Parse HTML', color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20' },
  { icon: Skull, label: 'Hope It Works', color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20' },
];

const failureReasons = [
  'Bot detection blocks HTML fetch',
  'Dynamic JS content not rendered',
  'Pagination varies per platform',
  'Review provider changes API paths',
  'Anti-bot tier escalates unpredictably',
];

export function SectionProblem() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <section
      id="section-problem"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#030712] px-6 py-20"
    >
      {/* Red ambient light */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(239,68,68,0.06) 0%, transparent 70%)' }}
      />

      <div ref={ref} className="relative z-10 w-full max-w-4xl mx-auto">
        {/* Tag */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-red-500/30 bg-red-500/10 text-red-400 text-xs font-medium tracking-widest uppercase mb-8"
        >
          <AlertTriangle className="w-3 h-3" />
          The Wrong Mental Model
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-6xl font-bold tracking-tight text-white mb-4"
        >
          Most teams get
          <br />
          <span className="text-red-400">scraping wrong</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl text-white/40 mb-16 max-w-xl"
        >
          They treat it as a single step — fetch HTML and hope it works.
          <br />
          That fails in real-world conditions.
        </motion.p>

        {/* Broken pipeline visual */}
        <div className="flex items-center gap-0 mb-12 overflow-x-auto pb-4">
          {steps.map((step, i) => (
            <div key={step.label} className="flex items-center gap-0 shrink-0">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.15 }}
              >
                <motion.div
                  animate={inView ? {
                    x: step.label === 'Hope It Works' ? [0, -2, 2, -2, 1, 0] : 0,
                    rotate: step.label === 'Hope It Works' ? [0, -1, 1, -1, 0] : 0,
                  } : {}}
                  transition={{ duration: 0.4, delay: 1.2 + i * 0.1, repeat: Infinity, repeatDelay: 3 }}
                  className={`flex flex-col items-center gap-3 px-6 py-5 rounded-xl border ${step.border} ${step.bg}`}
                >
                  <step.icon className={`w-6 h-6 ${step.color}`} />
                  <span className="text-sm font-medium text-white/80">{step.label}</span>
                </motion.div>
              </motion.div>

              {i < steps.length - 1 && (
                <motion.div
                  initial={{ opacity: 0, scaleX: 0 }}
                  animate={inView ? { opacity: 1, scaleX: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.5 + i * 0.15 }}
                  className="flex items-center"
                >
                  <div className="w-12 md:w-16 h-px bg-gradient-to-r from-white/20 to-white/5" />
                  <div className="w-0 h-0 border-t-[5px] border-b-[5px] border-l-[8px] border-t-transparent border-b-transparent border-l-white/20" />
                </motion.div>
              )}
            </div>
          ))}

          {/* Chaos / explosion */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.85, type: 'spring', stiffness: 200 }}
            className="ml-4 shrink-0"
          >
            <motion.div
              animate={inView ? { scale: [1, 1.08, 1], opacity: [0.8, 1, 0.8] } : {}}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
              className="flex flex-col items-center gap-3 px-6 py-5 rounded-xl border border-red-500/40 bg-red-500/10"
            >
              <div className="text-3xl">💥</div>
              <span className="text-sm font-semibold text-red-400">Chaos / Failure</span>
            </motion.div>
          </motion.div>
        </div>

        {/* Failure reasons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl"
        >
          {failureReasons.map((reason, i) => (
            <motion.div
              key={reason}
              initial={{ opacity: 0, x: -10 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: 1 + i * 0.08 }}
              className="flex items-center gap-3 text-sm text-white/50"
            >
              <div className="w-1 h-1 rounded-full bg-red-500/60 shrink-0" />
              {reason}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
