'use client';
// components/OutputSummaryCard.tsx — Final structured output card shown after SCOUT completes.

import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertTriangle, ArrowRight, Star } from 'lucide-react';
import { ScoutRun, DemoStage } from '@/lib/types';

interface OutputSummaryCardProps {
  run: ScoutRun;
  stage: DemoStage;
}

const ACTIVE_STAGES: DemoStage[] = ['output', 'complete'];

export function OutputSummaryCard({ run, stage }: OutputSummaryCardProps) {
  const isActive = ACTIVE_STAGES.includes(stage);
  const { outputSummary } = run;
  const isWarning = outputSummary.status === 'warning';

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Status header */}
          <div className={`flex items-center gap-3 mb-4 px-4 py-3 rounded-xl border ${
            isWarning
              ? 'border-amber-500/30 bg-amber-500/8'
              : 'border-emerald-500/30 bg-emerald-500/8'
          }`}>
            {isWarning
              ? <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
              : <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
            <span className={`font-semibold text-sm ${isWarning ? 'text-amber-400' : 'text-emerald-400'}`}>
              {isWarning ? 'SCOUT complete — DATA_DROUGHT warning' : 'SCOUT output ready for CRITIC'}
            </span>
          </div>

          {/* Structured output card */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden"
          >
            {/* Card header */}
            <div className="px-5 py-3 border-b border-white/8 flex items-center justify-between">
              <span className="text-xs text-white/30 uppercase tracking-widest font-medium">Structured Output</span>
              <span className="text-xs font-mono text-violet-400">{outputSummary.scrapeId}</span>
            </div>

            {/* Fields */}
            <div className="px-5 py-4 space-y-3">
              {[
                { label: 'strategy', value: outputSummary.strategy },
                { label: 'listing_text_source', value: outputSummary.listingTextSource },
                { label: 'review_count', value: String(outputSummary.reviewCount) },
                { label: 'status', value: outputSummary.status === 'ready' ? 'ready' : outputSummary.status },
              ].map((field) => (
                <div key={field.label} className="flex items-baseline gap-3">
                  <span className="text-xs font-mono text-white/30 shrink-0 w-36">{field.label}:</span>
                  <span className={`text-sm font-mono ${
                    field.label === 'status'
                      ? isWarning ? 'text-amber-400' : 'text-emerald-400'
                      : 'text-white/70'
                  }`}>
                    &quot;{field.value}&quot;
                  </span>
                </div>
              ))}
            </div>

            {/* Top signals */}
            {outputSummary.topSignals.length > 0 && (
              <div className="px-5 pb-5 border-t border-white/5 pt-4">
                <p className="text-xs text-white/30 uppercase tracking-widest mb-3">Top Signals</p>
                <div className="space-y-2">
                  {outputSummary.topSignals.map((signal, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                      className="flex items-start gap-3 px-3 py-2.5 rounded-lg bg-white/[0.03] border border-white/6"
                    >
                      <div className="flex gap-0.5 mt-0.5 shrink-0">
                        {Array.from({ length: signal.rating }).map((_, j) => (
                          <Star key={j} className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      <span className="text-xs text-white/60 flex-1 leading-relaxed">{signal.text}</span>
                      <span className="text-[10px] font-mono text-violet-400/70 shrink-0 tabular-nums">
                        {(signal.signalScore * 100).toFixed(0)}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          {/* CRITIC handoff arrow */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-4 flex items-center gap-3"
          >
            <div className="flex-1 h-px bg-gradient-to-r from-violet-500/30 to-blue-500/30" />
            <div className="flex items-center gap-2 text-xs text-white/40">
              <ArrowRight className="w-3 h-3 text-violet-400" />
              <span>Handoff to <span className="text-violet-400 font-medium">CRITIC</span></span>
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-blue-500/30 to-transparent" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
