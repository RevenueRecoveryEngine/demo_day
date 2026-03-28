'use client';
// components/OrchestrationSlide.tsx — Slide 5: Agent Orchestration and Runtime Resilience

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, CheckCircle2, RefreshCcw, Clock, AlertCircle, Activity, LayoutGrid, ShieldCheck } from 'lucide-react';

const SUB_SLIDES = [
  { id: 'pipeline', title: 'The Pipeline' },
  { id: 'problem', title: 'The Problem' },
  { id: 'solution', title: 'The Solution' },
  { id: 'result', title: 'The Result' }
];

export function OrchestrationSlide() {
  const [step, setStep] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  // Keyboard navigation logic
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      const isNext = ['ArrowDown', ' ', 'ArrowRight'].includes(e.key);
      const isPrev = ['ArrowUp', 'ArrowLeft'].includes(e.key);

      if (isNext) {
        if (isFinished) return; // Propagate to next slide
        
        e.preventDefault();
        e.stopImmediatePropagation();
        
        if (step < SUB_SLIDES.length - 1) {
          setStep(p => p + 1);
        } else {
          setIsFinished(true);
        }
      } else if (isPrev) {
        if (step === 0) return; // Propagate to previous slide

        e.preventDefault();
        e.stopImmediatePropagation();

        if (isFinished) {
          setIsFinished(false);
        } else {
          setStep(p => Math.max(0, p - 1));
        }
      }
    };
    
    window.addEventListener('keydown', handleKey, true);
    return () => window.removeEventListener('keydown', handleKey, true);
  }, [step, isFinished]);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#020617] text-white font-sans flex flex-col items-center py-12 px-8">
      
      {/* Elegant Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-transparent to-[#020617] opacity-80 pointer-events-none" />

      {/* Header & Controls Area */}
      <div className="relative w-full max-w-6xl flex justify-between items-center z-20 shrink-0 mb-10">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white drop-shadow-md">
            {SUB_SLIDES[step].title}
          </h1>
          <p className="text-slate-400 text-sm mt-1 uppercase tracking-widest font-mono text-[10px]">
            Runtime Reliability & Orchestration
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex gap-2 mr-4">
            {SUB_SLIDES.map((_, i) => (
              <div 
                key={i} 
                className={`w-2 h-2 rounded-full transition-all duration-500 ${i === step ? 'bg-white scale-125' : 'bg-white/20'}`} 
              />
            ))}
          </div>
          <div className="px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-400 font-mono text-[11px] font-semibold tracking-wider shadow-sm">
            0{step + 1} / 0{SUB_SLIDES.length}
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => { if(step > 0) { setIsFinished(false); setStep(p => p - 1); } }}
              disabled={step === 0}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800 text-white text-xs font-medium disabled:opacity-40 hover:bg-slate-700 transition"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Prev
            </button>
            <button 
              onClick={() => { if(step < 3) setStep(p => p + 1); else setIsFinished(true); }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800 text-white text-xs font-medium hover:bg-slate-700 transition relative overflow-hidden group"
            >
              <span className="relative z-10 flex items-center gap-2">Next <ArrowRight className="w-3.5 h-3.5" /></span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Slide Content Canvas */}
      <div className="relative w-full max-w-6xl flex-1 flex flex-col justify-center items-center shrink-0 min-h-[460px] z-10">
        <AnimatePresence mode="wait">
          
          {/* SLIDE 1: THE PIPELINE */}
          {step === 0 && (
            <motion.div 
              key="slide-1"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30, filter: 'blur(5px)' }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="w-full flex flex-col items-center"
            >
              <div className="relative flex justify-between items-center w-full max-w-4xl mt-12">
                
                {/* Connecting Line */}
                <div className="absolute left-[15%] right-[15%] top-[3rem] h-1 bg-slate-800 rounded-full z-[-1]" />
                <motion.div 
                  initial={{ width: '0%' }} animate={{ width: '70%' }} transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
                  className="absolute left-[15%] top-[3rem] h-1 bg-gradient-to-r from-cyan-500 via-orange-500 to-emerald-500 rounded-full z-[-1] opacity-60" 
                />

                {/* Node 1: SCOUT */}
                <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.1 }} className="flex flex-col items-center relative group">
                  <div className="absolute -inset-4 bg-cyan-500/10 rounded-full blur-xl group-hover:bg-cyan-500/20 transition-all duration-500" />
                  <div className="w-[6rem] h-[6rem] rounded-full border-2 border-cyan-500 bg-[#020617] flex items-center justify-center shadow-[0_0_25px_rgba(6,182,212,0.3)] z-10 relative">
                    <span className="font-mono font-bold tracking-widest text-cyan-400 text-sm">SCOPE</span>
                  </div>
                  <div className="mt-6 text-center">
                    <h3 className="text-xl font-bold text-white tracking-wide">SCOUT</h3>
                    <p className="text-cyan-400/80 font-mono text-xs mt-2 uppercase tracking-wider">Gathers evidence</p>
                  </div>
                </motion.div>

                {/* Node 2: CRITIC */}
                <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.5 }} className="flex flex-col items-center relative group">
                  <div className="absolute -inset-4 bg-orange-500/10 rounded-full blur-xl group-hover:bg-orange-500/20 transition-all duration-500" />
                  <div className="w-[6rem] h-[6rem] rounded-xl border-2 border-orange-500 bg-[#020617] flex items-center justify-center shadow-[0_0_25px_rgba(249,115,22,0.3)] z-10 relative">
                    <Activity className="w-8 h-8 text-orange-400" />
                  </div>
                  <div className="mt-6 text-center">
                    <h3 className="text-xl font-bold text-white tracking-wide">CRITIC</h3>
                    <p className="text-orange-400/80 font-mono text-xs mt-2 uppercase tracking-wider">Analyzes risk</p>
                  </div>
                </motion.div>

                {/* Node 3: PRESCRIBER */}
                <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.9 }} className="flex flex-col items-center relative group">
                  <div className="absolute -inset-4 bg-emerald-500/10 rounded-full blur-xl group-hover:bg-emerald-500/20 transition-all duration-500" />
                  <div className="w-[6rem] h-[6rem] rounded-xl border-2 border-emerald-500 bg-[#020617] flex items-center justify-center shadow-[0_0_25px_rgba(16,185,129,0.3)] z-10 relative">
                    <ShieldCheck className="w-8 h-8 text-emerald-400" />
                  </div>
                  <div className="mt-6 text-center">
                    <h3 className="text-xl font-bold text-white tracking-wide">PRESCRIBER</h3>
                    <p className="text-emerald-400/80 font-mono text-xs mt-2 uppercase tracking-wider">Drafts surgical edits</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}

          {/* SLIDE 2: THE PROBLEM */}
          {step === 1 && (
            <motion.div 
              key="slide-2"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05, filter: 'blur(5px)' }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="w-full flex flex-col items-center"
            >
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-white tracking-tight">One failure breaks the chain</h2>
                <p className="text-slate-400 mt-4 text-lg max-w-2xl mx-auto leading-relaxed">
                  Without orchestration, a single stage failure can restart the whole flow and lose progress.
                </p>
              </div>

              <div className="relative flex justify-between items-center w-full max-w-4xl">
                
                {/* Connecting Line - Broken */}
                <div className="absolute left-[15%] right-[15%] top-[3rem] h-1 bg-slate-800 rounded-full z-[-1] overflow-hidden">
                  <div className="absolute left-0 top-0 h-full w-[70%] bg-gradient-to-r from-slate-600 to-red-600" />
                </div>

                {/* Node 1: SCOUT (Faded/Wasted) */}
                <div className="flex flex-col items-center relative opacity-40 grayscale">
                  <div className="w-[6rem] h-[6rem] rounded-full border-2 border-slate-600 bg-[#020617] flex items-center justify-center z-10 relative">
                    <CheckCircle2 className="w-8 h-8 text-slate-500" />
                  </div>
                  <div className="mt-6 text-center">
                    <h3 className="text-xl font-bold text-white">SCOUT</h3>
                    <p className="text-red-400 font-mono text-[10px] mt-2 uppercase tracking-widest border border-red-500/30 px-2 py-1 bg-red-500/10 rounded">Progress Lost</p>
                  </div>
                </div>

                {/* Node 2: CRITIC (Faded/Wasted) */}
                <div className="flex flex-col items-center relative opacity-40 grayscale">
                  <div className="w-[6rem] h-[6rem] rounded-xl border-2 border-slate-600 bg-[#020617] flex items-center justify-center z-10 relative">
                    <CheckCircle2 className="w-8 h-8 text-slate-500" />
                  </div>
                  <div className="mt-6 text-center">
                    <h3 className="text-xl font-bold text-white">CRITIC</h3>
                    <p className="text-red-400 font-mono text-[10px] mt-2 uppercase tracking-widest border border-red-500/30 px-2 py-1 bg-red-500/10 rounded">Progress Lost</p>
                  </div>
                </div>

                {/* Node 3: PRESCRIBER (FAILED) */}
                <div className="flex flex-col items-center relative group">
                  <motion.div animate={{ opacity: [0.3, 0.8, 0.3] }} transition={{ repeat: Infinity, duration: 1.5 }} className="absolute -inset-6 bg-red-600/20 rounded-full blur-2xl" />
                  <div className="w-[6rem] h-[6rem] rounded-xl border-2 border-red-500 bg-[#2a0808] flex items-center justify-center shadow-[0_0_30px_rgba(220,38,38,0.5)] z-10 relative">
                    <AlertCircle className="w-10 h-10 text-red-500" />
                  </div>
                  <div className="mt-6 text-center">
                    <h3 className="text-xl font-bold text-red-100">PRESCRIBER</h3>
                    <p className="text-red-400 font-mono text-xs mt-2 font-bold uppercase tracking-widest bg-red-500/20 border border-red-500/50 px-3 py-1 rounded-full shadow-[0_0_15px_rgba(220,38,38,0.3)]">Exception Fatal</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* SLIDE 3: THE SOLUTION */}
          {step === 2 && (
            <motion.div 
              key="slide-3"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30, filter: 'blur(5px)' }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="w-full flex flex-col items-center"
            >
              <h2 className="text-5xl font-bold text-white tracking-tighter mb-12 flex items-center gap-4">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">Inngest</span> 
                <span className="text-3xl text-slate-500 font-light">Orchestration</span>
              </h2>

              {/* State Cards */}
              <div className="flex justify-center gap-6 w-full max-w-5xl mb-12">
                
                {/* Card 1: SCOUT (Completed) */}
                <div className="flex-1 bg-slate-900/50 border border-emerald-500/20 rounded-2xl p-6 relative overflow-hidden flex flex-col items-center text-center">
                  <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500/50" />
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center mb-4 text-emerald-400">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white">SCOUT</h3>
                  <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-xs uppercase tracking-widest font-bold">
                    Completed
                  </div>
                  <p className="text-slate-500 text-xs mt-4">State persists safely in durable storage.</p>
                </div>

                {/* Card 2: CRITIC (Retrying) */}
                <div className="flex-1 bg-slate-900/50 border border-orange-500/40 rounded-2xl p-6 relative overflow-hidden flex flex-col items-center text-center shadow-[0_0_30px_rgba(249,115,22,0.1)]">
                  <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 1.5 }} className="absolute top-0 left-0 w-full h-1 bg-orange-500" />
                  <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center mb-4 text-orange-400 relative">
                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }}>
                      <RefreshCcw className="w-6 h-6" />
                    </motion.div>
                  </div>
                  <h3 className="text-lg font-bold text-white">CRITIC</h3>
                  <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded bg-orange-500/10 border border-orange-500/30 text-orange-400 font-mono text-xs uppercase tracking-widest font-bold">
                    Failed — Retrying Here
                  </div>
                  <p className="text-slate-400 text-xs mt-4">Execution resumes exactly from this step.</p>
                </div>

                {/* Card 3: PRESCRIBER (Waiting) */}
                <div className="flex-1 bg-slate-900/30 border border-slate-800 rounded-2xl p-6 relative overflow-hidden flex flex-col items-center text-center opacity-60">
                  <div className="absolute top-0 left-0 w-full h-1 bg-slate-700" />
                  <div className="w-12 h-12 rounded-xl bg-slate-800/50 flex items-center justify-center mb-4 text-slate-500">
                    <Clock className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-300">PRESCRIBER</h3>
                  <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded bg-slate-800/50 border border-slate-700 text-slate-400 font-mono text-xs uppercase tracking-widest">
                    Waiting
                  </div>
                  <p className="text-slate-500 text-xs mt-4">Standing by for valid upstream output.</p>
                </div>

              </div>

              {/* Benefit Pills */}
              <div className="flex flex-wrap justify-center gap-4 max-w-4xl">
                {["Stage-isolated retries", "No manual retry logic", "Built-in observability", "Durable coordination"].map((pill, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 + (idx * 0.1) }}
                    className="flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-200 text-sm font-medium"
                  >
                    <CheckCircle2 className="w-4 h-4 text-blue-400" /> {pill}
                  </motion.div>
                ))}
              </div>

            </motion.div>
          )}

          {/* SLIDE 4: THE RESULT */}
          {step === 3 && (
            <motion.div 
              key="slide-4"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="w-full flex flex-col items-center text-center"
            >
              <h2 className="text-5xl md:text-6xl font-bold tracking-tight text-white mb-20 drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                Three agents. <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Zero babysitting.</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
                <div className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-sm flex flex-col items-center hover:bg-white/10 transition duration-300 group">
                  <div className="w-14 h-14 bg-indigo-500/20 text-indigo-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <RefreshCcw className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3 tracking-wide">Resilient</h3>
                  <p className="text-slate-400 leading-relaxed font-light">Retries seamlessly isolated to the failed stage.</p>
                </div>

                <div className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-sm flex flex-col items-center hover:bg-white/10 transition duration-300 group relative">
                  <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="w-14 h-14 bg-blue-500/20 text-blue-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform relative z-10">
                    <LayoutGrid className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3 tracking-wide relative z-10">Observable</h3>
                  <p className="text-slate-400 leading-relaxed font-light relative z-10">Every single step is logged, durable, and traceable.</p>
                </div>

                <div className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-sm flex flex-col items-center hover:bg-white/10 transition duration-300 group">
                  <div className="w-14 h-14 bg-emerald-500/20 text-emerald-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Activity className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3 tracking-wide">Coordinated</h3>
                  <p className="text-slate-400 leading-relaxed font-light">SCOUT, CRITIC, and PRESCRIBER stay perfectly in sync.</p>
                </div>
              </div>

              <motion.p 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 1 }}
                className="mt-24 text-xl text-slate-400 font-light max-w-3xl"
              >
                That is how the RRE pipeline stays reliable under <strong className="text-white font-semibold">real runtime conditions.</strong>
              </motion.p>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
