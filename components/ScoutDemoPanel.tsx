'use client';
// components/ScoutDemoPanel.tsx — Main interactive SCOUT demo section with two-column layout.

import { useState, useRef } from 'react';
import { useInView } from 'framer-motion';
import { motion } from 'framer-motion';
import { FastForward, Zap } from 'lucide-react';
import { useScoutDemo } from '@/hooks/useScoutDemo';
import { UrlInputCard } from './UrlInputCard';
import { StageTimeline } from './StageTimeline';
import { WaterfallVisualizer } from './WaterfallVisualizer';
import { CascadeVisualizer } from './CascadeVisualizer';
import { FilterFunnel } from './FilterFunnel';
import { OutputSummaryCard } from './OutputSummaryCard';

interface ScoutDemoPanelProps {
  onStageChange?: (stage: import('@/lib/types').DemoStage) => void;
}

export function ScoutDemoPanel({ onStageChange }: ScoutDemoPanelProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const demo = useScoutDemo();
  const isComplete = demo.stage === 'complete';

  // Notify parent of stage changes for presenter mode
  const prevStage = useRef(demo.stage);
  if (prevStage.current !== demo.stage) {
    prevStage.current = demo.stage;
    onStageChange?.(demo.stage);
  }

  return (
    <section
      id="section-demo"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#030712] px-6 py-20"
    >
      {/* Ambient */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)' }}
      />

      <div ref={ref} className="relative z-10 w-full max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-300 text-xs font-medium tracking-widest uppercase mb-4">
            <Zap className="w-3 h-3" />
            Live Demo
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
            SCOUT in Action
          </h2>
          <p className="text-white/40 mt-2 text-lg">
            Enter a product URL and watch the decision system run.
          </p>
        </motion.div>

        {/* Skip button when running */}
        {demo.isPlaying && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-end mb-4"
          >
            <button
              onClick={demo.skipToEnd}
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-white/50 hover:text-white text-sm transition-colors"
            >
              <FastForward className="w-3 h-3" />
              Skip to result
            </button>
          </motion.div>
        )}

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-6 lg:gap-8 items-start">
          {/* LEFT: Input + Timeline */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="space-y-6 lg:sticky lg:top-8"
          >
            {/* URL Input Card */}
            <div className="p-5 rounded-2xl border border-white/10 bg-white/[0.02]">
              <UrlInputCard
                onStart={demo.start}
                onReset={demo.reset}
                isRunning={demo.isPlaying}
                isComplete={isComplete}
              />
            </div>

            {/* Stage Timeline */}
            <div className="p-5 rounded-2xl border border-white/10 bg-white/[0.02]">
              <StageTimeline currentStage={demo.stage} />
            </div>

            {/* Elapsed time */}
            {demo.isPlaying && (
              <div className="text-center text-xs text-white/20 font-mono">
                {(demo.elapsedMs / 1000).toFixed(1)}s elapsed
              </div>
            )}
          </motion.div>

          {/* RIGHT: Visualization */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="space-y-4"
          >
            {demo.stage === 'idle' ? (
              /* Empty state */
              <div className="flex flex-col items-center justify-center py-32 text-center border border-white/6 rounded-2xl bg-white/[0.01]">
                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center mb-4">
                  <Zap className="w-5 h-5 text-white/20" />
                </div>
                <p className="text-white/30 text-sm">Select a URL and click &quot;Run SCOUT&quot; to begin</p>
              </div>
            ) : (
              <>
                {/* Strategy info card */}
                {demo.run && (demo.stage === 'strategy' || demo.stage === 'waterfall' || demo.stage === 'cascade' || demo.stage === 'filter' || demo.stage === 'output' || demo.stage === 'complete') && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="px-5 py-4 rounded-2xl border border-white/10 bg-white/[0.02] grid grid-cols-2 md:grid-cols-4 gap-4"
                  >
                    {[
                      { label: 'Domain', value: demo.run.detectedDomain },
                      { label: 'Strategy', value: demo.run.strategy },
                      { label: 'Pagination', value: demo.run.paginationType },
                      { label: 'Anti-bot', value: demo.run.antiBotTier },
                    ].map((f) => (
                      <div key={f.label}>
                        <div className="text-[10px] text-white/30 uppercase tracking-wider mb-1">{f.label}</div>
                        <div className="text-sm font-mono text-white/70 truncate">{f.value}</div>
                      </div>
                    ))}
                    {!demo.run.isKnownDomain && (
                      <div className="col-span-2 md:col-span-4 text-xs text-amber-400/70 font-mono">
                        ⚠ Unknown domain — using generic fallback config
                      </div>
                    )}
                  </motion.div>
                )}

                {/* Waterfall */}
                {demo.run && (
                  <div className="p-5 rounded-2xl border border-white/10 bg-white/[0.02]">
                    <WaterfallVisualizer steps={demo.run.extractionSteps} stage={demo.stage} />
                  </div>
                )}

                {/* Cascade */}
                {demo.run && (
                  <div className="p-5 rounded-2xl border border-white/10 bg-white/[0.02]">
                    <CascadeVisualizer steps={demo.run.cascadeSteps} stage={demo.stage} />
                  </div>
                )}

                {/* Filter */}
                {demo.run && (
                  <div className="p-5 rounded-2xl border border-white/10 bg-white/[0.02]">
                    <FilterFunnel stats={demo.run.filterStats} stage={demo.stage} />
                  </div>
                )}

                {/* Output */}
                {demo.run && (
                  <div className="p-5 rounded-2xl border border-white/10 bg-white/[0.02]">
                    <OutputSummaryCard run={demo.run} stage={demo.stage} />
                  </div>
                )}
              </>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
