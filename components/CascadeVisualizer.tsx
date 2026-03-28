'use client';
// components/CascadeVisualizer.tsx — Product data cascade: Shopify JSON → Headless State → DOM/JSON-LD.

import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, Loader2, MinusCircle } from 'lucide-react';
import { CascadeStep, DemoStage } from '@/lib/types';

interface CascadeVisualizerProps {
  steps: CascadeStep[];
  stage: DemoStage;
}

const ACTIVE_STAGES: DemoStage[] = ['cascade', 'filter', 'output', 'complete'];

export function CascadeVisualizer({ steps, stage }: CascadeVisualizerProps) {
  const isActive = ACTIVE_STAGES.includes(stage);

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 mb-3">
        <div className={`w-2 h-2 rounded-full transition-colors ${isActive ? 'bg-blue-500' : 'bg-white/15'}`} />
        <p className="text-xs text-white/40 uppercase tracking-widest">Product Data Cascade</p>
      </div>

      {steps.map((step, i) => {
        const status: CascadeStep['status'] = isActive ? step.status : 'pending';
        const isSuccess = status === 'success';
        const isFailed = status === 'failed';
        const isSkipped = status === 'skipped';

        return (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: isActive ? 1 : 0.3, x: 0 }}
            transition={{ duration: 0.4, delay: isActive ? i * 0.2 : 0 }}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-500 ${
              isSuccess
                ? 'border-blue-500/30 bg-blue-500/8'
                : isFailed
                ? 'border-red-500/20 bg-red-500/5'
                : isSkipped
                ? 'border-white/5 bg-transparent'
                : 'border-white/8 bg-transparent'
            }`}
          >
            {/* Step number */}
            <div className={`text-[10px] font-mono w-5 h-5 rounded border flex items-center justify-center shrink-0 ${
              isSuccess ? 'border-blue-500/40 text-blue-400' :
              isFailed ? 'border-red-500/30 text-red-400/60' :
              'border-white/10 text-white/20'
            }`}>
              {i + 1}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className={`text-sm font-medium transition-colors ${
                isSuccess ? 'text-white' : isFailed ? 'text-white/40' : 'text-white/25'
              }`}>
                {step.label}
              </div>
              <div className="text-xs text-white/25 truncate">{step.description}</div>
              {step.note && (isSuccess || isFailed) && (
                <div className={`text-xs mt-0.5 ${isSuccess ? 'text-blue-400/70' : 'text-red-400/60'}`}>
                  {step.note}
                </div>
              )}
            </div>

            {/* Status icon */}
            <AnimatePresence mode="wait">
              {status !== 'pending' && (
                <motion.div
                  key={status}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.3 }}
                  className={
                    isSuccess ? 'text-blue-400' : isFailed ? 'text-red-400/60' : 'text-white/15'
                  }
                >
                  {isSuccess ? <Check className="w-4 h-4" /> :
                   isFailed ? <X className="w-4 h-4" /> :
                   <MinusCircle className="w-4 h-4" />}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}
