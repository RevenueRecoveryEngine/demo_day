'use client';
// components/SectionTakeaway.tsx — Final takeaway section with key messages and closing visual.

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Shield, ArrowRight } from 'lucide-react';

const messages = [
  { text: 'If your ingestion layer is weak,', emphasis: false },
  { text: 'your AI is unreliable.', emphasis: false },
  { text: 'SCOUT is not just ingestion.', emphasis: true },
  { text: 'It is a quality gate.', emphasis: true },
];

export function SectionTakeaway() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <section
      id="section-takeaway"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#030712] px-6 py-20"
    >
      {/* Ambient glow */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 65%)' }}
        animate={{ scale: [1, 1.05, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div ref={ref} className="relative z-10 w-full max-w-4xl mx-auto text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 text-xs font-medium tracking-widest uppercase mb-10"
        >
          <Shield className="w-3 h-3" />
          The Bottom Line
        </motion.div>

        {/* Key messages */}
        <div className="space-y-4 mb-16">
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.2, ease: [0.22, 1, 0.36, 1] }}
              className={`text-3xl md:text-5xl font-bold tracking-tight leading-tight ${
                msg.emphasis
                  ? 'bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent'
                  : 'text-white/50'
              }`}
            >
              {msg.text}
            </motion.div>
          ))}
        </div>

        {/* SCOUT → CRITIC pipeline visual */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="flex items-center justify-center gap-4"
        >
          {/* SCOUT block */}
          <div className="px-6 py-3 rounded-xl border border-violet-500/40 bg-violet-500/10">
            <div className="text-sm font-bold text-violet-300">SCOUT</div>
            <div className="text-xs text-violet-400/60 mt-0.5">Quality Gate</div>
          </div>

          {/* Arrow */}
          <div className="flex items-center gap-0">
            <div className="w-12 h-px bg-gradient-to-r from-violet-500/50 to-blue-500/50" />
            <ArrowRight className="w-4 h-4 text-blue-400/60" />
          </div>

          {/* CRITIC block */}
          <div className="px-6 py-3 rounded-xl border border-blue-500/30 bg-blue-500/8">
            <div className="text-sm font-bold text-blue-300">CRITIC</div>
            <div className="text-xs text-blue-400/60 mt-0.5">Analysis</div>
          </div>

          {/* Arrow */}
          <div className="flex items-center gap-0">
            <div className="w-12 h-px bg-gradient-to-r from-blue-500/50 to-emerald-500/50" />
            <ArrowRight className="w-4 h-4 text-emerald-400/60" />
          </div>

          {/* AUDITOR block */}
          <div className="px-6 py-3 rounded-xl border border-emerald-500/30 bg-emerald-500/8">
            <div className="text-sm font-bold text-emerald-300">AUDITOR</div>
            <div className="text-xs text-emerald-400/60 mt-0.5">Decision</div>
          </div>
        </motion.div>

        {/* Final note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 1.6 }}
          className="mt-10 text-white/20 text-sm"
        >
          Every downstream decision gets sharper when this stage is precise.
        </motion.p>
      </div>
    </section>
  );
}
