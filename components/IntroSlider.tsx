'use client';
// components/IntroSlider.tsx — Pre-Pipeline Storytelling Slider

import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, CheckCircle2, Search, ArrowRight, Lock } from 'lucide-react';

interface IntroSliderProps {
  step: number; // 0, 1, 2
}

const slides = [
  { id: 'before', label: 'Before RRE' },
  { id: 'after', label: 'After RRE' },
  { id: 'transition', label: 'How RRE gets there' }
];

export function IntroSlider({ step }: IntroSliderProps) {
  
  return (
    <div className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-[#030712] px-6">
      <AnimatePresence mode="wait">
        
        {/* SLIDE 0: BEFORE */}
        {step === 0 && (
          <motion.div
            key="before"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-4xl flex flex-col items-center gap-8"
          >
            {/* Storytelling Header */}
            <div className="text-center space-y-3 mb-4">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 font-mono text-sm tracking-widest uppercase mb-2 shadow-[0_0_15px_rgba(239,68,68,0.2)]">
                <AlertTriangle className="w-4 h-4" /> Before RRE
              </div>
              <h2 className="text-4xl font-bold tracking-wide text-white">Vague listing. Preventable buyer confusion.</h2>
              <p className="text-white/50 text-lg">Before RRE, the listing creates expectation gaps resulting in high return risks.</p>
            </div>

            {/* Browser Mock */}
            <div className="w-full rounded-2xl border border-white/10 bg-[#0f111a] shadow-2xl overflow-hidden">
              {/* URL Bar */}
              <div className="flex items-center gap-4 px-6 py-3 bg-white/5 border-b border-white/10">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-white/10" />
                  <div className="w-3 h-3 rounded-full bg-white/10" />
                  <div className="w-3 h-3 rounded-full bg-white/10" />
                </div>
                <div className="flex-1 flex items-center gap-3 px-4 py-1.5 rounded-md bg-black/40 border border-white/5 font-mono text-xs text-white/40">
                  <Lock className="w-3 h-3 text-white/30" />
                  https://www.lasfit.com/products/chevrolet-silverado-1500-2016-2018-custom-d5s-...
                </div>
              </div>

              {/* Product Page Content */}
              <div className="p-8 grid grid-cols-[1fr_2fr] gap-8">
                {/* Image */}
                <div className="aspect-square rounded-xl bg-gradient-to-br from-white/5 to-white/10 border border-white/5 flex items-center justify-center overflow-hidden">
                  <img src="/product.png" alt="Product Image" className="w-full h-full object-cover" />
                </div>
                {/* Product Info */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold text-white/90 mb-2">Chevrolet Silverado 1500 LED Conversion Kit</h3>
                    <p className="text-white/60 text-sm leading-relaxed">
                      High performance LED upgrade for improved visibility and modern styling.
                    </p>
                  </div>
                  
                  <div className="p-4 rounded-xl border border-red-500/30 bg-red-500/5 relative">
                    <div className="absolute -top-3 left-4 px-2 bg-[#0f111a] text-red-400 text-xs font-mono uppercase tracking-widest">Compatibility (Vague)</div>
                    <p className="text-white/80 font-medium pt-2">
                      <span className="border-b border-red-500/50 pb-0.5">Standard fit for Silverado models.</span>
                    </p>
                  </div>

                  <div className="space-y-3 pt-4 border-t border-white/5">
                    <div className="text-xs uppercase tracking-widest text-white/30 font-mono">Customer Reviews</div>
                    <div className="p-3 rounded-lg bg-white/5 text-sm italic text-white/50 border-l-2 border-red-500/50">
                      "Did not fit my 2016 Silverado."
                    </div>
                    <div className="p-3 rounded-lg bg-white/5 text-sm italic text-white/50 border-l-2 border-red-500/50">
                      "Needed more compatibility details."
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* SLIDE 1: AFTER */}
        {step === 1 && (
          <motion.div
            key="after"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-4xl flex flex-col items-center gap-8"
          >
            {/* Storytelling Header */}
            <div className="text-center space-y-3 mb-4">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-sm tracking-widest uppercase mb-2 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                <CheckCircle2 className="w-4 h-4" /> After RRE
              </div>
              <h2 className="text-4xl font-bold tracking-wide text-white">Clear constraints. Stronger listing truth.</h2>
              <p className="text-white/50 text-lg">After RRE, the listing sets accurate expectations before purchase.</p>
            </div>

            {/* Browser Mock */}
            <div className="w-full rounded-2xl border border-emerald-500/30 bg-[#0f111a] shadow-[0_0_50px_rgba(16,185,129,0.1)] overflow-hidden">
              {/* URL Bar */}
              <div className="flex items-center gap-4 px-6 py-3 bg-white/5 border-b border-white/10">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-white/10" />
                  <div className="w-3 h-3 rounded-full bg-white/10" />
                  <div className="w-3 h-3 rounded-full bg-white/10" />
                </div>
                <div className="flex-1 flex items-center gap-3 px-4 py-1.5 rounded-md bg-black/40 border border-white/5 font-mono text-xs text-white/40">
                  <Lock className="w-3 h-3 text-emerald-500/50" />
                  <span className="text-emerald-100">https://www.lasfit.com/products/chevrolet-silverado-1500-2016-2018-custom-d5s-...</span>
                </div>
              </div>

              {/* Product Page Content */}
              <div className="p-8 grid grid-cols-[1fr_2fr] gap-8">
                {/* Image */}
                <div className="aspect-square rounded-xl bg-gradient-to-br from-white/5 to-white/10 border border-white/5 flex items-center justify-center overflow-hidden">
                  <img src="/product.png" alt="Product Image" className="w-full h-full object-cover" />
                </div>
                {/* Product Info */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold text-white/90 mb-2">Chevrolet Silverado 1500 LED Conversion Kit</h3>
                    <p className="text-white/60 text-sm leading-relaxed">
                      High performance LED upgrade. <span className="text-emerald-300">Brightness optimized for urban driving conditions. Review fitment details before purchase.</span>
                    </p>
                  </div>
                  
                  <div className="p-5 rounded-xl border border-emerald-500/40 bg-emerald-500/10 relative shadow-inner">
                    <div className="absolute -top-3 left-4 px-2 bg-[#0f111a] text-emerald-400 text-xs font-mono uppercase tracking-widest font-bold">Compatibility (Precise)</div>
                    <ul className="text-emerald-100/90 text-sm space-y-2 pt-2 list-disc list-inside">
                      <li>Fits Chevrolet Silverado 1500 (2016–2018)</li>
                      <li className="text-red-300">Not compatible with older trims</li>
                      <li>Verify trim before ordering</li>
                    </ul>
                  </div>

                  <div className="space-y-3 pt-4 border-t border-white/5 opacity-40">
                    <div className="text-xs uppercase tracking-widest text-white/30 font-mono">Customer Reviews</div>
                    <div className="p-3 rounded-lg bg-white/5 text-sm italic text-white/50">
                      "Did not fit my 2016 Silverado."
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* SLIDE 2: TRANSITION */}
        {step === 2 && (
          <motion.div
            key="transition"
            initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -50, filter: 'blur(10px)' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-2xl flex flex-col items-center gap-6 text-center"
          >
            <div className="p-6 rounded-full bg-violet-500/10 border border-violet-500/20 mb-4 shadow-[0_0_30px_rgba(139,92,246,0.3)]">
              <ArrowRight className="w-10 h-10 text-violet-400" />
            </div>
            <h2 className="text-5xl font-bold tracking-wide text-white drop-shadow-lg">How RRE gets there</h2>
            <p className="text-white/60 text-xl leading-relaxed max-w-lg mt-4">
              RRE does not guess.<br />
              It collects evidence, detects expectation gaps, and generates precise listing improvements.
            </p>
          </motion.div>
        )}

      </AnimatePresence>

      {/* Intro Navigation Indicator */}
      <div className="absolute bottom-12 flex items-center gap-6 z-50">
        <div className="flex gap-3">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === step ? 'w-8 bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]' : 'w-2 bg-white/20'
              }`}
            />
          ))}
        </div>
        <span className="text-white/30 text-xs tracking-wider uppercase flex items-center gap-3 font-semibold border-l border-white/10 pl-6">
          Press Space / Arrow Down to continue <kbd className="px-2 py-0.5 rounded border border-white/10 bg-white/10 font-mono text-white/50 shadow-inner">→</kbd>
        </span>
      </div>

    </div>
  );
}
