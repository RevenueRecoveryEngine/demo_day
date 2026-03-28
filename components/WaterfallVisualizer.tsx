'use client';
// components/WaterfallVisualizer.tsx — Animated waterfall extraction visual showing tier escalation.

import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, ArrowDown, Loader2, MinusCircle } from 'lucide-react';
import { ExtractionStep, DemoStage } from '@/lib/types';

interface WaterfallVisualizerProps {
  steps: ExtractionStep[];
  stage: DemoStage;
}

const STATUS_CONFIG = {
  pending: { icon: null, color: 'text-white/20', border: 'border-white/8', bg: 'bg-transparent', label: 'Pending' },
  active: { icon: Loader2, color: 'text-violet-400', border: 'border-violet-500/40', bg: 'bg-violet-500/8', label: 'Running' },
  success: { icon: Check, color: 'text-emerald-400', border: 'border-emerald-500/30', bg: 'bg-emerald-500/8', label: 'Success' },
  failed: { icon: X, color: 'text-red-400', border: 'border-red-500/30', bg: 'bg-red-500/8', label: 'Failed' },
  skipped: { icon: MinusCircle, color: 'text-white/20', border: 'border-white/8', bg: 'bg-transparent', label: 'Skipped' },
};

function getStepStatus(step: ExtractionStep, waterfall_stage: DemoStage): typeof step.status {
  if (waterfall_stage !== 'waterfall' && waterfall_stage !== 'cascade' && waterfall_stage !== 'filter' && waterfall_stage !== 'output' && waterfall_stage !== 'complete') {
    return 'pending';
  }
  return step.status;
}

export function WaterfallVisualizer({ steps, stage }: WaterfallVisualizerProps) {
  const isActive = stage === 'waterfall' || stage === 'cascade' || stage === 'filter' || stage === 'output' || stage === 'complete';

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 mb-3">
        <div className={`w-2 h-2 rounded-full transition-colors ${isActive ? 'bg-violet-500' : 'bg-white/15'}`} />
        <p className="text-xs text-white/40 uppercase tracking-widest">Waterfall Extraction</p>
      </div>

      {steps.map((step, i) => {
        const status = getStepStatus(step, stage);
        const cfg = STATUS_CONFIG[status];
        const IconComponent = cfg.icon;

        return (
          <div key={step.id} className="flex flex-col">
            {step.isEscalation && i > 0 && (
              <div className="flex items-center gap-2 pl-3 mb-1">
                <div className="w-px h-3 bg-white/10" />
                <div className="text-[10px] text-white/20 uppercase tracking-widest">Escalation</div>
              </div>
            )}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: isActive ? 1 : 0.4, y: 0 }}
              transition={{ duration: 0.4, delay: isActive ? i * 0.15 : 0 }}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl border transition-all duration-500 ${cfg.border} ${cfg.bg} ${step.isEscalation ? 'ml-6' : ''}`}
            >
              {/* Tier badge */}
              <div className={`text-[10px] font-mono px-1.5 py-0.5 rounded border shrink-0 ${
                step.tier === 1 ? 'border-blue-500/30 text-blue-400' :
                step.tier === 2 ? 'border-amber-500/30 text-amber-400' :
                'border-red-500/30 text-red-400'
              }`}>
                T{step.tier}
              </div>

              {/* Label */}
              <span className={`text-sm flex-1 transition-colors duration-300 ${
                status === 'pending' || status === 'skipped' ? 'text-white/30' : 'text-white/80'
              }`}>
                {step.label}
              </span>

              {/* Status icon */}
              <AnimatePresence mode="wait">
                {IconComponent && (
                  <motion.div
                    key={status}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    className={cfg.color}
                  >
                    {status === 'active' ? (
                      <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>
                        <IconComponent className="w-4 h-4" />
                      </motion.div>
                    ) : (
                      <IconComponent className="w-4 h-4" />
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Note */}
              {step.note && (status === 'success' || status === 'failed') && (
                <span className={`text-xs shrink-0 ${status === 'success' ? 'text-emerald-400/60' : 'text-red-400/60'}`}>
                  {step.note}
                </span>
              )}
            </motion.div>

            {/* Connector arrow */}
            {i < steps.length - 1 && status === 'failed' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex items-center gap-1 pl-4 py-0.5"
              >
                <ArrowDown className="w-3 h-3 text-amber-500/50" />
                <span className="text-[10px] text-amber-500/50">fallback</span>
              </motion.div>
            )}
          </div>
        );
      })}
    </div>
  );
}
