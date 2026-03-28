'use client';
// components/ScoutFlow.tsx — Slide 2: SCOUT Internal Flow

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type FlowStage = 'idle' | 'strategy' | 'waterfall' | 'cascade' | 'quality' | 'output';

const STAGES: FlowStage[] = ['idle', 'strategy', 'waterfall', 'cascade', 'quality', 'output'];

// --- DATA: Stage Content ---
// Tailwind requires explicit class names for the parser to preserve them
const STAGE_CONTENT: Record<string, any> = {
  strategy: {
    title: 'Strategy Selected',
    subtitle: 'RRE decides how to approach the site before collecting any evidence.',
    theme: {
      text: 'text-violet-400',
      fromBg: 'from-violet-500/10',
      highlightText: 'text-violet-300',
      highlightBg: 'bg-violet-500/20',
      barBg: 'bg-violet-500'
    },
    items: [
      { label: 'URL analyzed', value: 'lasfit.com' },
      { label: 'Domain matched', value: 'target config' },
      { label: 'Pagination type', value: 'load_more_button' },
      { label: 'Anti-bot tier', value: 'Tier 1' },
      { label: 'Review provider candidates', value: 'Judge.me, Yotpo' },
      { label: 'Status', value: 'Extraction plan initialized', highlight: true },
    ]
  },
  waterfall: {
    title: 'Waterfall Execution',
    subtitle: 'RRE escalates only when cheaper extraction methods fail.',
    theme: {
      text: 'text-blue-400',
      fromBg: 'from-blue-500/10',
      highlightText: 'text-blue-300',
      highlightBg: 'bg-blue-500/20',
      barBg: 'bg-blue-500'
    },
    items: [
      { label: 'Attempt 1', value: 'Provider/API lookup' },
      { label: 'Attempt 2', value: 'Raw HTML parsing' },
      { label: 'Attempt 3', value: 'Headless browser fallback' },
      { label: 'Selected successful path', value: 'HTML + provider signals', highlight: true },
      { label: 'Status', value: 'Review data source detected' },
    ],
    visual: true
  },
  cascade: {
    title: 'Cascade Resolution',
    subtitle: 'RRE uses a structured cascade to get the cleanest product context.',
    theme: {
      text: 'text-teal-400',
      fromBg: 'from-teal-500/10',
      highlightText: 'text-teal-300',
      highlightBg: 'bg-teal-500/20',
      barBg: 'bg-teal-500'
    },
    items: [
      { label: 'Path A', value: 'Native JSON' },
      { label: 'Path B', value: 'Embedded state' },
      { label: 'Path C', value: 'DOM fallback' },
      { label: 'Chosen source', value: 'Native JSON', highlight: true },
      { label: 'listing_text_source', value: 'NATIVE_JSON' },
    ]
  },
  quality: {
    title: 'Quality Validation',
    subtitle: 'Only validated, structured evidence moves forward in the RRE pipeline.',
    theme: {
      text: 'text-emerald-400',
      fromBg: 'from-emerald-500/10',
      highlightText: 'text-emerald-300',
      highlightBg: 'bg-emerald-500/20',
      barBg: 'bg-emerald-500'
    },
    items: [
      { label: 'Reviews normalized', value: 'Done' },
      { label: 'Title/body formatting', value: 'Checked' },
      { label: 'Duplicates removed', value: 'Done' },
      { label: 'Ratings validated', value: 'Done' },
      { label: 'Output contract', value: 'Validated', highlight: true },
    ],
    snippet: `reviews_selected: 30\nlisting_text_source: NATIVE_JSON\nprovider: Judge.me`
  },
  output: {
    title: 'Output Ready',
    subtitle: 'Structured payload ready for CRITIC / PRESCRIBER',
    theme: {
      text: 'text-white',
      fromBg: 'from-white/10',
      highlightText: 'text-white',
      highlightBg: 'bg-white/20',
      barBg: 'bg-white'
    },
    codeSnippet: `{
  "scrape_id": "uuid-string-84a1-b2",
  "listing_text": "High-performance LED lighting upgrade for Ford F150...",
  "reviews": [
    {
      "review_id": "rev_001",
      "text": "Chevy 2016 Silverado\\nThese are a night and day difference...",
      "rating": 1
    },
    {
      "review_id": "rev_002",
      "text": "Install was easy but brightness was lower than expected...",
      "rating": 2
    }
  ]
}`
  }
};

// --- COMPONENT ---
export function ScoutFlow() {
  const [stageIdx, setStageIdx] = useState(0);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const currentStage = STAGES[stageIdx];

  // Keyboard navigation logic
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      // Ignore key events inside inputs
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      const isNext = ['ArrowDown', ' ', 'ArrowRight'].includes(e.key);
      const isPrev = ['ArrowUp', 'ArrowLeft'].includes(e.key);

      if (isNext) {
        if (isFinished) {
          // Let it propagate to page.tsx to switch to the next slide
          return;
        }

        e.preventDefault();
        e.stopImmediatePropagation();

        if (stageIdx === 0) {
          setStageIdx(1);
          setIsPopupVisible(false); // Reveal node only
        } else if (!isPopupVisible) {
          setIsPopupVisible(true); // Popup overlay
        } else {
          // popup is visible
          if (stageIdx < STAGES.length - 1) {
            setStageIdx((prev) => prev + 1);
            setIsPopupVisible(false); // Reveal next node
          } else {
            // At the last stage with popup visible
            setIsPopupVisible(false); // Hide popup to show final pipeline state
            setIsFinished(true); // Next click will move to next slide
          }
        }
      } else if (isPrev) {
        if (stageIdx === 0) {
          // Let it propagate back to previous slide
          return;
        }

        e.preventDefault();
        e.stopImmediatePropagation();

        if (isFinished) {
          setIsFinished(false);
          setIsPopupVisible(true); // Restore output popup
        } else if (isPopupVisible) {
          setIsPopupVisible(false); // Hide popup, back to just the node
        } else {
          setStageIdx((prev) => prev - 1); // Go back one node
          setIsPopupVisible(stageIdx - 1 > 0); // Show previous node's popup (unless moving back to idle)
        }
      }
    };
    
    // true = Use capture to fire BEFORE page.tsx listener
    window.addEventListener('keydown', handleKey, true);
    return () => window.removeEventListener('keydown', handleKey, true);
  }, [stageIdx, isPopupVisible, isFinished]);

  // Helpers to determine active/past states
  const isActive = (s: FlowStage) => currentStage === s;
  const isPast = (s: FlowStage) => STAGES.indexOf(currentStage) > STAGES.indexOf(s);

  // Popup data
  const popupData = currentStage !== 'idle' ? STAGE_CONTENT[currentStage] : null;

  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-[#030712] px-6">
      <motion.div
        className="absolute inset-0 w-full h-full flex flex-col items-center justify-center pt-10 pb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
      >
        {/* Central Pipeline Visual */}
        <div className={`relative w-full max-w-2xl flex flex-col items-center transition-all duration-700 ${isPopupVisible ? 'opacity-30 blur-[2px] scale-95' : 'opacity-100 scale-100'}`}>

        
        {/* URL Input */}
        <div className="mb-8 font-mono text-xl tracking-widest text-white/50 uppercase">URL</div>

        {/* 1. STRATEGY */}
        <div className="relative w-full flex flex-col items-center">
          <div className={`w-0.5 h-8 transition-colors duration-700 ${isPast('idle') ? 'bg-violet-500' : 'bg-white/10'}`} />
          <motion.div
            className={`w-full max-w-sm px-8 py-5 rounded-2xl border text-center transition-all duration-700 border-violet-500 ${
              isActive('strategy') ? 'bg-violet-500/20 shadow-[0_0_40px_rgba(139,92,246,0.3)] scale-105' : 
              isPast('strategy') ? 'bg-violet-500/5 opacity-60 scale-95' : 'border-white/10 bg-white/5 opacity-30 scale-95'
            }`}
          >
            <h2 className={`text-3xl font-bold tracking-widest transition-colors duration-700 ${isActive('strategy') ? 'text-violet-400 drop-shadow-[0_0_15px_rgba(139,92,246,0.5)]' : 'text-white/40'}`}>
              STRATEGY
            </h2>
          </motion.div>
        </div>

        {/* 2. WATERFALL */}
        <div className="relative w-full flex flex-col items-center">
          <div className="relative">
            <div className={`w-0.5 h-12 transition-colors duration-700 ${isPast('strategy') ? 'bg-blue-500' : 'bg-white/10'}`}>
              {isActive('strategy') && !isPopupVisible && <motion.div className="w-0.5 h-full bg-blue-400" animate={{ scaleY: [0, 1], originY: 0 }} transition={{ duration: 1 }} />}
            </div>
          </div>
          
          <motion.div
            className={`w-full max-w-md px-8 py-6 rounded-2xl border transition-all duration-700 border-blue-500 ${
              isActive('waterfall') ? 'bg-blue-500/20 shadow-[0_0_40px_rgba(59,130,246,0.2)] scale-105' : 
              isPast('waterfall') ? 'bg-blue-500/5 opacity-60 scale-95' : 'border-white/10 bg-white/5 opacity-30 scale-95'
            }`}
          >
            <h2 className={`text-3xl font-bold tracking-widest text-center transition-colors duration-700 mb-4 ${isActive('waterfall') ? 'text-blue-400 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]' : 'text-white/40'}`}>
              WATERFALL
            </h2>
            <div className="flex items-center justify-between gap-4 font-mono text-sm tracking-wider">
              <span className={`transition-colors duration-500 ${isActive('waterfall') || isPast('waterfall') ? 'text-blue-300' : 'text-white/20'}`}>API</span>
              <span className="text-white/20">→</span>
              <span className={`transition-colors duration-500 ${isActive('waterfall') || isPast('waterfall') ? 'text-blue-300' : 'text-white/20'}`}>HTML</span>
              <span className="text-white/20">→</span>
              <span className={`transition-colors duration-500 ${isActive('waterfall') || isPast('waterfall') ? 'text-blue-300' : 'text-white/20'}`}>HEADLESS</span>
            </div>
          </motion.div>
        </div>

        {/* 3. CASCADE */}
        <div className="relative w-full flex flex-col items-center">
          <div className={`w-0.5 h-12 transition-colors duration-700 ${isPast('waterfall') ? 'bg-teal-500' : 'bg-white/10'}`}>
            {isActive('waterfall') && !isPopupVisible && <motion.div className="w-0.5 h-full bg-teal-400" animate={{ scaleY: [0, 1], originY: 0 }} transition={{ duration: 1 }} />}
          </div>
          <motion.div
            className={`w-full max-w-md px-8 py-6 rounded-2xl border transition-all duration-700 border-teal-500 ${
              isActive('cascade') ? 'bg-teal-500/20 shadow-[0_0_40px_rgba(20,184,166,0.2)] scale-105' : 
              isPast('cascade') ? 'bg-teal-500/5 opacity-60 scale-95' : 'border-white/10 bg-white/5 opacity-30 scale-95'
            }`}
          >
            <h2 className={`text-3xl font-bold tracking-widest text-center transition-colors duration-700 mb-4 ${isActive('cascade') ? 'text-teal-400 drop-shadow-[0_0_15px_rgba(20,184,166,0.5)]' : 'text-white/40'}`}>
              CASCADE
            </h2>
            <div className="flex items-center justify-between gap-4 font-mono text-sm tracking-wider">
              <span className={`transition-colors duration-500 ${isActive('cascade') || isPast('cascade') ? 'text-teal-300' : 'text-white/20'}`}>JSON</span>
              <span className="text-white/20">→</span>
              <span className={`transition-colors duration-500 ${isActive('cascade') || isPast('cascade') ? 'text-teal-300' : 'text-white/20'}`}>STATE</span>
              <span className="text-white/20">→</span>
              <span className={`transition-colors duration-500 ${isActive('cascade') || isPast('cascade') ? 'text-teal-300' : 'text-white/20'}`}>DOM</span>
            </div>
          </motion.div>
        </div>

        {/* 4. QUALITY */}
        <div className="relative w-full flex flex-col items-center">
          <div className={`w-0.5 h-12 transition-colors duration-700 ${isPast('cascade') ? 'bg-emerald-500' : 'bg-white/10'}`}>
            {isActive('cascade') && !isPopupVisible && <motion.div className="w-0.5 h-full bg-emerald-400" animate={{ scaleY: [0, 1], originY: 0 }} transition={{ duration: 1 }} />}
          </div>
          <motion.div
            className={`w-full max-w-sm px-8 py-5 rounded-2xl border transition-all duration-700 border-emerald-500 ${
              isActive('quality') ? 'bg-emerald-500/20 shadow-[0_0_40px_rgba(16,185,129,0.2)] scale-105' : 
              isPast('quality') ? 'bg-emerald-500/5 opacity-60 scale-95' : 'border-white/10 bg-white/5 opacity-30 scale-95'
            }`}
          >
            <h2 className={`text-3xl font-bold tracking-widest text-center transition-colors duration-700 ${isActive('quality') ? 'text-emerald-400 drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]' : 'text-white/40'}`}>
              QUALITY
            </h2>
            <AnimatePresence>
              {isActive('quality') && !isPopupVisible && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden mt-4"
                >
                  <div className="flex flex-col items-center gap-1 opacity-70">
                    <div className="w-full h-1 bg-emerald-400 rounded-full" />
                    <div className="w-3/4 h-1 bg-emerald-400 rounded-full" />
                    <div className="w-1/2 h-1 bg-emerald-400 rounded-full" />
                    <div className="w-1/4 h-1 bg-emerald-400 rounded-full" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* 5. OUTPUT */}
        <div className="relative w-full flex flex-col items-center">
          <div className={`w-0.5 h-12 transition-colors duration-700 ${isPast('quality') ? 'bg-white' : 'bg-white/10'}`}>
             {isActive('quality') && !isPopupVisible && <motion.div className="w-0.5 h-full bg-white" animate={{ scaleY: [0, 1], originY: 0 }} transition={{ duration: 1 }} />}
          </div>
          <motion.div
            className={`w-full max-w-sm px-8 py-5 rounded-2xl border transition-all duration-700 ${
              isActive('output') || stageIdx === STAGES.length - 1 ? 'border-white/50 bg-white/10 shadow-[0_0_40px_rgba(255,255,255,0.15)] scale-105' : 
              'border-white/10 bg-white/5 opacity-30 scale-95'
            }`}
          >
            <h2 className={`text-2xl font-mono tracking-widest text-center transition-colors duration-700 ${isActive('output') || stageIdx === STAGES.length - 1 ? 'text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]' : 'text-white/30'}`}>
              OUTPUT
            </h2>
          </motion.div>
        </div>

      </div>

      {/* STAGE POPUP OVERLAY */}
      <AnimatePresence>
        {isPopupVisible && popupData && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20, filter: 'blur(10px)' }}
            transition={{ type: 'spring', damping: 20, stiffness: 100 }}
            className="absolute z-40 w-[640px] max-w-[90vw] rounded-3xl border border-white/10 bg-[#0f111a]/95 backdrop-blur-2xl shadow-[0_0_100px_rgba(0,0,0,0.8)] overflow-hidden"
          >
            {/* Glossy Header */}
            <div className={`relative px-8 py-6 border-b border-white/5 bg-gradient-to-br ${popupData.theme.fromBg} to-transparent`}>
              <h3 className={`text-2xl font-bold tracking-widest uppercase ${popupData.theme.text} mb-2`}>
                {popupData.title}
              </h3>
              <p className="text-white/60 text-sm leading-relaxed">{popupData.subtitle}</p>
            </div>

            {/* Content Body */}
            <div className="p-8 space-y-4">
              {popupData.items && (
                <ul className="space-y-4 text-sm md:text-base">
                  {popupData.items.map((item: any, i: number) => (
                    <motion.li 
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * i }}
                      className="flex items-center justify-between"
                    >
                      <span className="text-white/40 tracking-wide">{item.label}</span>
                      <span className={`font-medium ${item.highlight ? `${popupData.theme.highlightText} ${popupData.theme.highlightBg} px-4 py-1.5 rounded-full shadow-inner` : 'text-white/90'}`}>
                        {item.value}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              )}

              {popupData.visual && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
                  className="mt-8 p-5 rounded-xl bg-black/40 border border-white/5 text-center font-mono text-[13px] md:text-sm tracking-widest text-white/50"
                >
                  API <span className="text-white/20 mx-3">→</span> <span className={`text-blue-400 drop-shadow-[0_0_8px_rgba(59,130,246,0.8)] px-3 py-1 bg-blue-500/10 rounded-lg border border-blue-500/20`}>HTML</span> <span className="text-white/20 mx-3">→</span> HEADLESS
                </motion.div>
              )}

              {popupData.snippet && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
                  className="mt-8 p-5 rounded-xl bg-black/40 border border-white/5 font-mono text-sm text-emerald-300 whitespace-pre-wrap leading-relaxed shadow-inner"
                >
                  {popupData.snippet}
                </motion.div>
              )}

              {popupData.codeSnippet && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                  className="mt-6 p-6 rounded-2xl bg-[#080a10] border border-white/10 font-mono text-[13px] leading-relaxed text-white/80 overflow-x-auto shadow-inner"
                >
                  <pre><code dangerouslySetInnerHTML={{ __html: popupData.codeSnippet
                    .replace(/"([^"]+)":/g, '<span class="text-blue-300">"$1"</span>:')
                    .replace(/: "([^"]+)"/g, ': <span class="text-emerald-300">"$1"</span>')
                    .replace(/: ([0-9]+)/g, ': <span class="text-orange-300">$1</span>')
                  }} /></pre>
                </motion.div>
              )}
            </div>

            {/* Footer / Controls */}
            <div className="px-8 py-4 border-t border-white/5 bg-white/5 flex items-center justify-end">
              <span className="text-white/30 text-xs tracking-wider uppercase flex items-center gap-3 font-semibold">
                Press Space / Arrow Down to continue <kbd className="px-2 py-0.5 rounded border border-white/10 bg-white/10 font-mono text-white/50 shadow-inner">→</kbd>
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      </motion.div>
    </div>
  );
}
