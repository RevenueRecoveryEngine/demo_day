'use client';
// components/StageTimeline.tsx — Vertical timeline showing SCOUT pipeline stages with active/complete states.

import { motion } from 'framer-motion';
import { Check, Loader2, Clock } from 'lucide-react';
import { DemoStage } from '@/lib/types';

const STAGES: { id: DemoStage; label: string; sub: string }[] = [
  { id: 'initialize', label: 'Initialize', sub: 'Run started' },
  { id: 'strategy', label: 'Strategy Selection', sub: 'Domain resolved' },
  { id: 'waterfall', label: 'Waterfall Extraction', sub: 'Tier 1 → 2 → 3' },
  { id: 'cascade', label: 'Data Cascade', sub: 'Shopify → Headless → DOM' },
  { id: 'filter', label: 'Quality Gate', sub: 'Dedup + signal ranking' },
  { id: 'output', label: 'Structured Output', sub: 'CRITIC handoff ready' },
];

const STAGE_ORDER: DemoStage[] = ['idle', 'initialize', 'strategy', 'waterfall', 'cascade', 'filter', 'output', 'complete'];

interface StageTimelineProps {
  currentStage: DemoStage;
}

function getStatus(stageId: DemoStage, current: DemoStage): 'pending' | 'active' | 'complete' {
  const currentIdx = STAGE_ORDER.indexOf(current);
  const stageIdx = STAGE_ORDER.indexOf(stageId);
  if (stageIdx < currentIdx) return 'complete';
  if (stageIdx === currentIdx) return 'active';
  return 'pending';
}

export function StageTimeline({ currentStage }: StageTimelineProps) {
  return (
    <div className="space-y-1">
      <p className="text-xs text-white/30 uppercase tracking-widest mb-4">Pipeline Stages</p>
      {STAGES.map((stage, i) => {
        const status = getStatus(stage.id, currentStage);
        return (
          <div key={stage.id} className="flex items-start gap-3">
            {/* Icon column */}
            <div className="flex flex-col items-center">
              <motion.div
                animate={status === 'active' ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 1.5, repeat: Infinity }}
                className={`w-6 h-6 rounded-full border flex items-center justify-center shrink-0 transition-all duration-500 ${
                  status === 'complete'
                    ? 'border-emerald-500 bg-emerald-500/20'
                    : status === 'active'
                    ? 'border-violet-500 bg-violet-500/20'
                    : 'border-white/15 bg-transparent'
                }`}
              >
                {status === 'complete' ? (
                  <Check className="w-3 h-3 text-emerald-400" />
                ) : status === 'active' ? (
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}>
                    <Loader2 className="w-3 h-3 text-violet-400" />
                  </motion.div>
                ) : (
                  <Clock className="w-3 h-3 text-white/15" />
                )}
              </motion.div>
              {i < STAGES.length - 1 && (
                <div
                  className={`w-px h-8 mt-1 transition-colors duration-500 ${
                    status === 'complete' ? 'bg-emerald-500/30' : 'bg-white/8'
                  }`}
                />
              )}
            </div>

            {/* Text */}
            <div className={`pb-5 transition-all duration-500 ${status === 'pending' ? 'opacity-30' : 'opacity-100'}`}>
              <div
                className={`text-sm font-medium transition-colors duration-300 ${
                  status === 'active' ? 'text-violet-300' : status === 'complete' ? 'text-white/80' : 'text-white/40'
                }`}
              >
                {stage.label}
              </div>
              <div className="text-xs text-white/30 mt-0.5">{stage.sub}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
