'use client';
// components/FilterFunnel.tsx — Quality gate funnel: dedup → signal ranking → weak removal → top 30.

import { motion, AnimatePresence } from 'framer-motion';
import { Filter, Star, Trash2, Award } from 'lucide-react';
import { FilterStats, DemoStage } from '@/lib/types';

interface FilterFunnelProps {
  stats: FilterStats;
  stage: DemoStage;
}

const ACTIVE_STAGES: DemoStage[] = ['filter', 'output', 'complete'];

export function FilterFunnel({ stats, stage }: FilterFunnelProps) {
  const isActive = ACTIVE_STAGES.includes(stage);

  const steps = [
    {
      label: 'Raw Reviews',
      count: stats.rawCount,
      icon: null,
      color: 'text-white/60',
      barColor: 'bg-white/20',
    },
    {
      label: 'After Deduplication',
      count: stats.afterDedup,
      icon: Trash2,
      color: 'text-amber-400',
      barColor: 'bg-amber-500/40',
    },
    {
      label: 'After Weak Removal',
      count: stats.afterWeakRemoval,
      icon: Star,
      color: 'text-blue-400',
      barColor: 'bg-blue-500/40',
    },
    {
      label: 'Final Signal Set',
      count: stats.finalCount,
      icon: Award,
      color: 'text-emerald-400',
      barColor: 'bg-emerald-500/60',
    },
  ];

  const maxCount = stats.rawCount;

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 mb-3">
        <div className={`w-2 h-2 rounded-full transition-colors ${isActive ? 'bg-emerald-500' : 'bg-white/15'}`} />
        <p className="text-xs text-white/40 uppercase tracking-widest">Quality Gate</p>
        <Filter className="w-3 h-3 text-white/20 ml-auto" />
      </div>

      <div className="space-y-3">
        {steps.map((step, i) => {
          const pct = (step.count / maxCount) * 100;
          return (
            <motion.div
              key={step.label}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: isActive ? 1 : 0.3, x: 0 }}
              transition={{ duration: 0.4, delay: isActive ? i * 0.25 : 0 }}
              className="space-y-1.5"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {step.icon && <step.icon className={`w-3 h-3 ${step.color}`} />}
                  <span className={`text-xs ${step.color}`}>{step.label}</span>
                </div>
                <motion.span
                  className={`text-sm font-semibold tabular-nums ${step.color}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isActive ? 1 : 0.3 }}
                  transition={{ delay: isActive ? i * 0.25 + 0.15 : 0 }}
                >
                  {step.count.toLocaleString()}
                </motion.span>
              </div>

              {/* Bar */}
              <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                <motion.div
                  className={`h-full rounded-full ${step.barColor}`}
                  initial={{ width: 0 }}
                  animate={{ width: isActive ? `${pct}%` : '0%' }}
                  transition={{ duration: 0.8, delay: isActive ? i * 0.25 + 0.1 : 0, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Warnings */}
      <AnimatePresence>
        {isActive && stats.warningFlags.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="mt-4 px-3 py-2 rounded-lg border border-amber-500/30 bg-amber-500/8"
          >
            {stats.warningFlags.map((flag) => (
              <div key={flag} className="text-xs text-amber-400 font-mono">
                ⚠ {flag}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cap badge */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.1 }}
            className="flex items-center gap-2 px-3 py-2 rounded-lg border border-emerald-500/20 bg-emerald-500/5 text-xs text-emerald-400"
          >
            <Award className="w-3 h-3" />
            Top {Math.min(stats.finalCount, 30)} reviews selected for CRITIC
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
