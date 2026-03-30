"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Database, Bot, Code2, PenTool, ShieldAlert } from "lucide-react";

const PHASES = [
  {
    id: 0,
    label: "IDLE",
    explanation: "Raw listing text and reviews arrive from SCOUT. Unstructured and noisy — nothing is safe to act on yet.",
  },
  {
    id: 1,
    label: "CRITIC Analysis",
    explanation: "CRITIC extracts expectation gaps and listing attributes. It structures the evidence but makes zero final decisions.",
    theme: { text: "text-blue-400", bg: "bg-blue-500", border: "border-blue-500/50", glow: "shadow-[0_0_30px_rgba(59,130,246,0.4)]" },
  },
  {
    id: 2,
    label: "TS Logic Gate",
    explanation: "Deterministic safety check: Missing structural coverage becomes a hard-surfaced gap, even if the LLM hallucinated.",
    theme: { text: "text-emerald-400", bg: "bg-emerald-500", border: "border-emerald-500/50", glow: "shadow-[0_0_30px_rgba(16,185,129,0.4)]" },
  },
  {
    id: 3,
    label: "PRESCRIBER",
    explanation: "PRESCRIBER drafts surgical edits from the enriched gap set. This generates proposed merchant-facing improvements.",
    theme: { text: "text-purple-400", bg: "bg-purple-500", border: "border-purple-500/50", glow: "shadow-[0_0_30px_rgba(167,139,250,0.4)]" },
  },
  {
    id: 4,
    label: "TS Safety Gate",
    explanation: "The final safety gate scans prescriptions for unsupported numeric claims, aggressively downgrading unsafe content.",
    theme: { text: "text-orange-400", bg: "bg-orange-500", border: "border-orange-500/50", glow: "shadow-[0_0_30px_rgba(249,115,22,0.4)]" },
  },
];

export function PostScoutRuntime({ step }: { step: number }) {
  const phase = step;
  const isActive = (id: number) => phase === id;
  const isPast = (id: number) => phase > id;
  const activeTheme = PHASES[phase]?.theme;

  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-between overflow-hidden bg-[#020617] py-12 px-8 font-sans">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_40%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />

      {/* Header */}
      <div className="w-full max-w-7xl flex flex-col items-center z-10 shrink-0 mb-4 mt-4">
        <h1 className="text-3xl font-black tracking-tight text-white mb-2 text-transparent bg-clip-text bg-gradient-to-r from-slate-200 to-slate-500">
          The Runtime Engine
        </h1>
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 font-mono text-[10px] font-bold tracking-widest uppercase">
            LLM Extraction
          </span>
          <span className="text-slate-600 font-mono text-xs">vs</span>
          <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-[10px] font-bold tracking-widest uppercase">
            Deterministic Code
          </span>
        </div>
      </div>

      {/* Main Pipeline Canvas */}
      <div className="relative w-full max-w-6xl flex-1 flex flex-col justify-center items-center shrink-0">
        
        {/* Horizontal Node Track Container */}
        <div className="relative w-full flex justify-between items-center z-10 px-8">
          
          {/* Base Track */}
          <div className="absolute left-16 right-16 top-1/2 -translate-y-1/2 h-[2px] bg-slate-800/80 z-[-2]" />

          {/* Animated Flow Line */}
          <div className="absolute left-16 right-16 top-1/2 -translate-y-1/2 h-[2px] z-[-1] overflow-hidden">
            <motion.div
              className={`h-full ${activeTheme?.bg || "bg-blue-500"}`}
              initial={{ width: "0%" }}
              animate={{ width: `${(phase / 4) * 100}%` }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />
          </div>

          {[
            { id: 0, title: "Data In", icon: Database, label: "SCOUT" },
            { id: 1, title: "Analysis", icon: Bot, label: "CRITIC" },
            { id: 2, title: "Pillar Gate", icon: Code2, label: "TS LOGIC", isGate: true },
            { id: 3, title: "Edits", icon: PenTool, label: "PRESCRIBER" },
            { id: 4, title: "Safety Gate", icon: ShieldAlert, label: "TS LOGIC", isGate: true }
          ].map((node) => {
            const active = isActive(node.id);
            const past = isPast(node.id);
            const nodeTheme = PHASES[node.id]?.theme || { border: "border-slate-700", text: "text-slate-500", glow: "" };
            
            return (
              <div key={node.id} className="relative flex flex-col items-center z-20">
                <motion.div
                  className={`w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center bg-[#020617] border-2 transition-all duration-500 relative
                    ${node.isGate ? "rounded-[0.5rem] rotate-45" : "rounded-2xl"}
                    ${active ? `${nodeTheme.border} ${nodeTheme.glow} scale-110 bg-[#060b1f]` : past ? "border-slate-600 bg-[#050812]" : "border-slate-800 bg-[#020617]/50"}`}
                >
                  {active && <div className="absolute inset-0 bg-white/5 animate-pulse" />}
                  <node.icon 
                    className={`w-6 h-6 sm:w-8 sm:h-8 transition-colors duration-500 ${node.isGate ? "-rotate-45" : ""} ${active ? nodeTheme.text : past ? "text-slate-400" : "text-slate-700"}`} 
                    strokeWidth={active ? 2.5 : 1.5} 
                  />
                  {active && (
                    <motion.div className="absolute inset-0 border-2 rounded-inherit border-white/20" animate={{ scale: [1, 1.2, 1], opacity: [1, 0, 1] }} transition={{ duration: 2, repeat: Infinity }} style={{ borderRadius: "inherit" }} />
                  )}
                </motion.div>
                
                <div className={`absolute ${node.isGate ? "bottom-[-3.5rem]" : "bottom-[-3rem]"} flex flex-col items-center w-32 pb-4`}>
                  <div className={`font-mono font-bold tracking-widest text-[10px] sm:text-xs uppercase ${active ? nodeTheme.text : "text-slate-500"}`}>
                    {node.label}
                  </div>
                  <div className="text-[9px] sm:text-[10px] text-slate-400 mt-1 uppercase tracking-wider">{node.title}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* POPUP AREA OVERLAY */}
      <div className="absolute inset-x-0 top-1/2 -mt-40 flex justify-center pointer-events-none z-50">
        <AnimatePresence mode="wait">
          {phase === 1 && (
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: -20 }} className="w-[32rem] bg-[#090e1f]/95 border border-blue-500/30 rounded-2xl p-6 font-mono text-[10px] sm:text-xs leading-relaxed shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8),0_0_40px_rgba(59,130,246,0.15)] backdrop-blur-xl text-left -translate-x-32 top-10 relative">
               {/* Terminal Top Bar */}
               <div className="absolute top-0 inset-x-0 h-6 border-b border-blue-500/20 bg-blue-500/5 flex items-center px-4 rounded-t-2xl">
                 <div className="text-[9px] text-blue-400/50 tracking-widest uppercase">critic.extract()</div>
               </div>
               <div className="mt-4 text-slate-300">
                  <span className="text-blue-300">"expectation_gaps"</span>: [{"{"}
                  <div className="pl-4 border-l border-blue-900/50 ml-2 mt-1 mb-1">
                    <span className="text-blue-300">"problem_category"</span>: <span className="text-emerald-300">"compatibility_issue"</span>,<br/>
                    <span className="text-blue-300">"listing_risk_type"</span>: <span className="text-emerald-300">"LIABILITY_RISK"</span>,<br/>
                    <span className="text-blue-300">"identified_keywords"</span>: <span className="text-purple-300">["fit", "doesn't fit"]</span>,<br/>
                    <span className="text-blue-300">"reasoning_trace"</span>: <span className="text-emerald-300">"Universal claim; review contradicts"</span>,<br/>
                    <span className="text-blue-300">"required_check_category"</span>: <span className="text-emerald-300">"fitment_check"</span>
                  </div>
                  {"}"}],<br/><br/>
                  <span className="text-blue-300">"extracted_listing_attributes"</span>: {"{"}
                  <div className="pl-4 border-l border-blue-900/50 ml-2 mt-1">
                    <span className="text-blue-300">"fitment_check"</span>: <span className="bg-red-500/20 text-red-400 rounded px-1 font-bold">[]</span> <span className="text-orange-400 text-[10px] ml-2 animate-pulse">← MISSING</span>,<br/>
                    <span className="text-blue-300">"specs_check"</span>: <span className="text-purple-300">["12V", "LED"]</span>,<br/>
                    <span className="text-blue-300">"condition_check"</span>: <span className="text-purple-300">["New"]</span>
                  </div>
                  {"}"}
               </div>
            </motion.div>
          )}

          {phase === 2 && (
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: -20 }} className="w-[28rem] bg-[#090e1f]/95 border border-emerald-500/40 rounded-2xl p-6 font-mono text-[10px] sm:text-xs leading-relaxed shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8),0_0_40px_rgba(16,185,129,0.15)] backdrop-blur-xl text-left relative z-[60]">
               <div className="absolute top-0 inset-x-0 h-6 border-b border-emerald-500/20 bg-emerald-500/5 flex items-center px-4 rounded-t-2xl">
                 <div className="text-[9px] text-emerald-400/50 tracking-widest uppercase">runPillarGate()</div>
               </div>
               <div className="mt-4 text-slate-300">
                  <div className="flex items-center gap-2 mb-1"><span className="text-red-400 font-bold">✗</span> <span>fitment_check: <span className="text-red-400">[] → no synonym match</span></span></div>
                  <div className="flex items-center gap-2 mb-1"><span className="text-emerald-400 font-bold">✓</span> <span>specs_check: <span className="text-emerald-400">synonym matched</span></span></div>
                  <div className="flex items-center gap-2 mb-1"><span className="text-emerald-400 font-bold">✓</span> <span>condition_check: <span className="text-emerald-400">synonym matched</span></span></div>
                  
                  <div className="h-px bg-slate-800 my-4" />
                  
                  <div className="text-slate-500 mb-2">// Missing pillar fallback triggered:</div>
                  <div className="text-emerald-400 pl-4 border-l-2 border-emerald-500/30">
                    + buildMissingPillarSurface(<span className="text-emerald-200">"fitment_check"</span>)<br/>
                    + push → <span className="text-emerald-200">expectation_gaps[]</span>
                  </div>
                  
                  <div className="mt-4 flex items-center gap-2 text-emerald-500 bg-emerald-500/10 py-1.5 px-3 rounded text-[10px] font-bold tracking-widest border border-emerald-500/20 w-fit">
                    <span>ENRICHED GAPS</span> → PRESCRIBER
                  </div>
               </div>
            </motion.div>
          )}

          {phase === 3 && (
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: -20 }} className="w-[34rem] bg-[#090e1f]/95 border border-purple-500/40 rounded-2xl p-6 font-mono text-[10px] sm:text-[11px] leading-[1.6] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8),0_0_40px_rgba(167,139,250,0.15)] backdrop-blur-xl text-left translate-x-32 top-10 relative">
               <div className="absolute top-0 inset-x-0 h-6 border-b border-purple-500/20 bg-purple-500/5 flex items-center px-4 rounded-t-2xl">
                 <div className="text-[9px] text-purple-400/50 tracking-widest uppercase">prescriber.draft_edits()</div>
               </div>
               <div className="mt-4 flex gap-4">
                  <div className="flex-1 bg-purple-500/10 border border-purple-500/30 rounded-lg p-3">
                    <div className="text-purple-300 font-bold mb-2">prescription[0]</div>
                    <span className="text-blue-300">action:</span> <span className="text-emerald-300">"inject"</span><br/>
                    <span className="text-blue-300">placement:</span> <span className="text-emerald-300">"top_block"</span><br/>
                    <span className="text-blue-300">edit:</span> <span className="text-emerald-300">"Warning: Verify year/make/model before ordering."</span>
                  </div>
                  <div className="flex-1 bg-red-500/10 border border-red-500/30 rounded-lg p-3 relative overflow-hidden">
                    <div className="absolute inset-0 bg-red-500/5 animate-[pulse_2s_infinite]" />
                    <div className="text-red-300 font-bold mb-2 relative">prescription[1]</div>
                    <span className="text-blue-300 relative">action:</span> <span className="text-emerald-300 relative">"inject"</span><br/>
                    <span className="text-blue-300 relative">placement:</span> <span className="text-emerald-300 relative">"inline"</span><br/>
                    <span className="text-blue-300 relative">edit:</span> <span className="text-emerald-300 relative">"Fits </span><span className="bg-red-500/40 text-red-100 rounded-[2px] px-1 font-bold relative z-10">94%</span><span className="text-emerald-300 relative"> of 2015–2022 trucks."</span>
                  </div>
               </div>
            </motion.div>
          )}

          {phase === 4 && (
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: -20 }} className="w-[30rem] bg-[#090e1f]/95 border border-orange-500/50 rounded-2xl p-6 font-mono text-[10px] sm:text-[11px] leading-[1.65] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8),0_0_50px_rgba(249,115,22,0.2)] backdrop-blur-xl text-left right-0 absolute z-[60]">
               <div className="absolute top-0 inset-x-0 h-6 border-b border-orange-500/20 bg-orange-500/5 flex items-center px-4 rounded-t-2xl">
                 <div className="text-[9px] text-orange-400/80 tracking-widest uppercase flex items-center gap-2"><ShieldAlert className="w-3 h-3" /> applyNumericFabricationFirewall()</div>
               </div>
               
               <div className="mt-4 space-y-3 font-mono">
                  <div className="bg-black/40 border border-slate-800 rounded p-2">
                    <div className="text-slate-500 text-[9px] mb-1 uppercase">Scan P0</div>
                    <div className="flex items-center justify-between text-slate-300">
                      <span>regex [0-9] → Not Found</span>
                      <span className="text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded text-[9px]">PASS</span>
                    </div>
                  </div>

                  <div className="bg-orange-500/10 border border-orange-500/40 rounded p-2 relative">
                    <div className="text-orange-300 text-[9px] mb-1 uppercase font-bold flex items-center justify-between">
                      <span>Scan P1</span>
                      <span className="text-orange-400 bg-orange-500/20 px-2 py-0.5 rounded animate-pulse">HALLUCINATION DETECTED</span>
                    </div>
                    <div className="text-slate-300 mb-1">regex [0-9] → found <span className="text-red-400 font-bold bg-red-500/20 px-1 rounded px-1">"94%"</span></div>
                    <div className="text-slate-300">cross-ref listing_text → <span className="text-red-400">NOT FOUND</span></div>
                  </div>

                  <div className="border-t border-slate-800 pt-3">
                    <div className="text-slate-500 text-[9px] mb-1 uppercase">Auto-Mutation Applied</div>
                    <div className="flex justify-between items-center text-slate-400 bg-green-950/30 p-2 rounded border border-green-900/50">
                      <div>
                        <div className="line-through text-red-400/70">action: "inject"</div>
                        <div className="text-emerald-400 font-bold ml-2">+ action: "flag"</div>
                      </div>
                      <div className="text-right">
                        <div className="line-through text-red-400/70">edit: "Fits 94%..."</div>
                        <div className="text-emerald-400 font-bold ml-2">+ edit: null</div>
                      </div>
                    </div>
                  </div>
               </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Narrative Footer */}
      <div className="w-full h-24 flex items-center justify-center shrink-0 mb-8 border-t border-slate-800/50 relative z-30">
        <AnimatePresence mode="wait">
          <motion.div
            key={phase}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center justify-center text-center max-w-3xl"
          >
            <div className={`font-mono text-xs font-bold tracking-[0.2em] mb-3 uppercase ${activeTheme ? activeTheme.text : 'text-slate-300'}`}>
              {PHASES[phase].label}
            </div>
            <p className="text-slate-400 text-sm md:text-base font-light leading-relaxed">
              {PHASES[phase].explanation}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Progress Footer Hint */}
      <div className="absolute bottom-6 right-8 z-50 pointer-events-none">
        <div className="flex items-center gap-3 px-4 py-2 rounded-full border border-white/5 bg-white/[0.02] backdrop-blur-sm">
          <span className="text-white/30 text-[9px] tracking-[0.2em] uppercase font-bold">
            Space to Advance ( {phase}/4 )
          </span>
        </div>
      </div>
    </div>
  );
}
