"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Network, ServerCog, DatabaseZap, CheckCircle2, ChevronRight, Activity, TerminalSquare, Layers, Fingerprint } from "lucide-react";

type FlowStage = "idle" | "strategy" | "waterfall" | "cascade" | "quality" | "output";

const STAGES: FlowStage[] = ["idle", "strategy", "waterfall", "cascade", "quality", "output"];

const STAGE_CONTENT: Record<string, any> = {
  strategy: {
    icon: Fingerprint,
    title: "Strategy Selection",
    subtitle: "Fingerprinting domain layout & constraints",
    theme: {
      text: "text-violet-400",
      fromBg: "from-violet-500/20",
      border: "border-violet-500/30",
      highlightText: "text-violet-300",
      highlightBg: "bg-violet-500/20",
      glow: "shadow-[0_0_30px_rgba(139,92,246,0.3)]",
    },
    items: [
      { label: "DNS / Domain Match", value: "lasfit.com (Known Tier)" },
      { label: "Pagination Strategy", value: "cursor_based_api" },
      { label: "Anti-Bot Evasion", value: "Tier 1: TLS + Proxies" },
      { label: "Target Provider", value: "Judge.me Widget", highlight: true },
      { label: "Execution Logic", value: "[PLAN_ARMED]" },
    ],
  },
  waterfall: {
    icon: Layers,
    title: "Extraction Waterfall",
    subtitle: "Resilient fallback mechanics deployed",
    theme: {
      text: "text-blue-400",
      fromBg: "from-blue-500/20",
      border: "border-blue-500/30",
      highlightText: "text-blue-300",
      highlightBg: "bg-blue-500/20",
      glow: "shadow-[0_0_30px_rgba(59,130,246,0.3)]",
    },
    items: [
      { label: "Attempt 0: Internal API", value: "[FAILED 403]" },
      { label: "Attempt 1: Raw HTML", value: "[FAILED Missing Data]" },
      { label: "Attempt 2: Headless + JS", value: "[SUCCESS]", highlight: true },
      { label: "Active Session", value: "Playwright / Chromium" },
      { label: "Data Retrieved", value: "1.2MB JSON payload" },
    ],
    visual: true,
  },
  cascade: {
    icon: Network,
    title: "Source Cascade",
    subtitle: "Prioritizing ground-truth data models",
    theme: {
      text: "text-teal-400",
      fromBg: "from-teal-500/20",
      border: "border-teal-500/30",
      highlightText: "text-teal-300",
      highlightBg: "bg-teal-500/20",
      glow: "shadow-[0_0_30px_rgba(20,184,166,0.3)]",
    },
    items: [
      { label: "GraphQL State", value: "[EMPTY]" },
      { label: "Next.js __NEXT_DATA__", value: "[DETECTED]" },
      { label: "Native JSON LD", value: "[DETECTED, PREFERRED]", highlight: true },
      { label: "Confidence Score", value: "99.8%" },
    ],
  },
  quality: {
    icon: Activity,
    title: "Quality Validation",
    subtitle: "Filtration and normalization of assets",
    theme: {
      text: "text-emerald-400",
      fromBg: "from-emerald-500/20",
      border: "border-emerald-500/30",
      highlightText: "text-emerald-300",
      highlightBg: "bg-emerald-500/20",
      glow: "shadow-[0_0_30px_rgba(16,185,129,0.3)]",
    },
    items: [
      { label: "Deduplication", value: "Removed 12 records" },
      { label: "Noise Reduction", value: "Stripped HTML tags" },
      { label: "Schema Validation", value: "Zod Pass: Product & Reviews" },
      { label: "Payload Status", value: "[SECURED & READY]", highlight: true },
    ],
    snippet: `[FILTER_LOG]\n> schema_match: TRUE\n> duplicates_dropped: 12\n> reviews_saved: 30\n> source: NATIVE_JSON`,
  },
  output: {
    icon: TerminalSquare,
    title: "Payload Assembly",
    subtitle: "Final structured evidence output",
    theme: {
      text: "text-white",
      fromBg: "from-white/20",
      border: "border-white/30",
      highlightText: "text-white",
      highlightBg: "bg-white/20",
      glow: "shadow-[0_0_40px_rgba(255,255,255,0.2)]",
    },
    codeSnippet: `{
  "scrape_status": "SUCCESS",
  "metadata": {
     "duration_ms": 3402,
     "source_url": "..."
  },
  "listing_text": "High-performance LED lighting upgrade for Ford F150...",
  "reviews": [
    {
      "id": "rev_001",
      "text": "Chevy 2016 Silverado\\nNight and day difference...",
      "rating": 1
    },
    {
      "id": "rev_002",
      "text": "Install easy but brightness lower than expected...",
      "rating": 2
    }
  ]
}`,
  },
};

export function ScoutFlow({ step }: { step: number }) {
  const stageIdx = Math.floor((step + 1) / 2);
  const isPopupVisible = step % 2 !== 0;

  const currentStage = STAGES[stageIdx];
  const isPast = (s: FlowStage) => STAGES.indexOf(currentStage) > STAGES.indexOf(s);
  const isActive = (s: FlowStage) => currentStage === s;
  const popupData = currentStage !== "idle" ? STAGE_CONTENT[currentStage] : null;

  const renderNode = (id: FlowStage, Icon: any, label: string, color: string, activeColor: string) => {
    const active = isActive(id);
    const past = isPast(id);
    const stateColor = active ? activeColor : past ? color : "text-white/20";
    const bgClass = active ? "bg-[#060b1f] border-violet-500/50" : past ? "bg-white/5 border-white/20" : "bg-white/5 border-white/5";

    return (
      <div className="relative w-full flex flex-col items-center">
        {/* Connection Line */}
        {id !== "strategy" && (
          <div className="w-0.5 h-10 relative bg-white/5">
            {past && <div className={`absolute inset-0 w-full h-full bg-gradient-to-b ${color}`} />}
            {active && !isPopupVisible && (
              <motion.div
                className={`w-full bg-gradient-to-b ${color}`}
                initial={{ height: "0%" }}
                animate={{ height: "100%" }}
                transition={{ duration: 1 }}
              />
            )}
            {past && !isPopupVisible && (
               <motion.div className="w-full h-4 bg-white/50 blur-[2px] absolute" animate={{ top: ["0%", "100%"] }} transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }} />
            )}
          </div>
        )}

        <motion.div
          className={`w-full max-w-[280px] p-4 rounded-xl border backdrop-blur-md transition-all duration-700 flex items-center gap-4 relative overflow-hidden ${bgClass}`}
          animate={{ scale: active ? 1.05 : past ? 0.95 : 0.9, opacity: active || past ? 1 : 0.3 }}
        >
          {active && <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 translate-x-[-150%] animate-[shimmer_2s_infinite]" />}
          <div className={`p-2 rounded-lg ${active ? "bg-white/10" : "bg-black/20"}`}>
            <Icon className={`w-5 h-5 ${stateColor}`} strokeWidth={active ? 2.5 : 1.5} />
          </div>
          <div className={`font-mono text-sm tracking-[0.15em] uppercase font-bold ${stateColor}`}>
            {label}
          </div>
          {active && !isPopupVisible && (
            <motion.div className="absolute right-4 w-2 h-2 rounded-full bg-current" animate={{ opacity: [1, 0, 1] }} transition={{ duration: 0.8, repeat: Infinity }} style={{ color: activeColor.replace('text-', '') }} />
          )}
        </motion.div>
      </div>
    );
  };

  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-[#020617] px-6 font-sans">
      {/* Abstract Background */}
      <div className="absolute inset-0">
         <motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[100px] opacity-10 pointer-events-none" animate={{ background: "radial-gradient(circle, rgba(139,92,246,0.8) 0%, transparent 70%)" }} />
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay pointer-events-none"></div>
      </div>

      <motion.div
        className="absolute inset-0 w-full h-full flex items-center justify-between px-20 pt-10 pb-10 max-w-7xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
      >
        {/* Left Side: Pipeline Visual */}
        <div className={`relative w-full max-w-md flex flex-col items-center justify-center transition-all duration-[800ms] ${isPopupVisible ? "opacity-20 blur-md -translate-x-10 scale-95" : "opacity-100 translate-x-0 scale-100"}`}>
          
          <div className="mb-6 flex items-center gap-3 bg-white/5 px-6 py-2 rounded-full border border-white/10">
            <ServerCog className="w-4 h-4 text-violet-400" />
            <span className="font-mono text-[11px] tracking-[0.2em] text-white/50 uppercase font-bold">Execution Pipeline</span>
          </div>

          <div className="flex flex-col w-full px-8 py-8 bg-[#0a0f25]/50 border border-white/5 rounded-3xl shadow-2xl backdrop-blur-xl relative">
             <div className="absolute -top-px left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />
             
             {renderNode("strategy", Fingerprint, "1. Strategy", "from-violet-500/40 to-violet-500/40", "text-violet-400")}
             {renderNode("waterfall", Layers, "2. Waterfall", "from-violet-500/40 to-blue-500/40", "text-blue-400")}
             {renderNode("cascade", Network, "3. Cascade", "from-blue-500/40 to-teal-500/40", "text-teal-400")}
             {renderNode("quality", Activity, "4. Quality", "from-teal-500/40 to-emerald-500/40", "text-emerald-400")}
             {renderNode("output", TerminalSquare, "5. Output", "from-emerald-500/40 to-white/40", "text-white")}
          </div>
        </div>

        {/* Right Side: STAGE POPUP OVERLAY */}
        <div className="flex-1 flex justify-center items-center ml-10">
          <AnimatePresence mode="wait">
            {isPopupVisible && popupData && (
              <motion.div
                key={popupData.title}
                initial={{ opacity: 0, x: 40, filter: "blur(10px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, x: -20, filter: "blur(10px)" }}
                transition={{ type: "spring", damping: 25, stiffness: 120 }}
                className={`relative w-full max-w-2xl rounded-3xl border ${popupData.theme.border} bg-[#060b1f]/90 backdrop-blur-3xl overflow-hidden ${popupData.theme.glow}`}
              >
                {/* Accent glow behind popup */}
                <div className={`absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br ${popupData.theme.fromBg} to-transparent blur-3xl opacity-50 pointer-events-none rounded-full`} />
                
                {/* Header */}
                <div className={`relative px-8 py-6 border-b border-white/5 flex items-center gap-4 bg-gradient-to-r from-white/[0.03] to-transparent`}>
                  <div className={`p-3 rounded-xl bg-black/40 border ${popupData.theme.border}`}>
                     <popupData.icon className={`w-6 h-6 ${popupData.theme.text}`} />
                  </div>
                  <div>
                    <h3 className={`text-2xl font-black tracking-tight ${popupData.theme.text} mb-1 drop-shadow-sm`}>
                      {popupData.title}
                    </h3>
                    <p className="text-white/50 text-xs font-mono tracking-wider uppercase">
                      {popupData.subtitle}
                    </p>
                  </div>
                </div>

                {/* Content Body */}
                <div className="p-8 space-y-6 relative z-10">
                  {popupData.items && (
                    <ul className="space-y-4">
                      {popupData.items.map((item: any, i: number) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 * i }}
                          className="flex items-center justify-between group"
                        >
                          <span className="text-white/40 text-sm font-mono tracking-wide flex items-center gap-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-white/50 transition-colors" />
                            {item.label}
                          </span>
                          <span className={`font-mono text-sm font-semibold tracking-wide ${item.highlight ? `${popupData.theme.highlightText} ${popupData.theme.highlightBg} px-3 py-1 rounded-md border border-current/20` : "text-white/80"}`}>
                            {item.value}
                          </span>
                        </motion.li>
                      ))}
                    </ul>
                  )}

                  {popupData.visual && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-8 relative">
                       <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-transparent to-blue-500/10 rounded-xl blur-md" />
                       <div className="relative p-5 rounded-xl bg-[#030712] border border-blue-500/30 flex items-center justify-between font-mono text-[11px] font-bold text-white/50 tracking-widest uppercase overflow-hidden">
                          <motion.div className="absolute top-0 bottom-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-blue-500/10 to-transparent" animate={{ x: ["-100%", "300%"] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} />
                          <span className="opacity-40 line-through decoration-red-500/50">Internal API</span>
                          <ChevronRight className="w-4 h-4 text-white/20" />
                          <span className="opacity-40 line-through decoration-red-500/50">HTML DOM</span>
                          <ChevronRight className="w-4 h-4 text-white/20" />
                          <span className="text-blue-400 drop-shadow-[0_0_8px_rgba(59,130,246,0.8)] px-3 py-1.5 bg-blue-500/10 rounded-lg border border-blue-500/30 flex items-center gap-2">
                             <CheckCircle2 className="w-3.5 h-3.5" /> Headless Agent
                          </span>
                       </div>
                    </motion.div>
                  )}

                  {popupData.snippet && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mt-6">
                       <div className="bg-[#030712] border border-emerald-500/20 rounded-xl p-5 shadow-inner relative overflow-hidden">
                          <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500/50" />
                          <pre className="font-mono text-xs text-emerald-400/80 whitespace-pre-wrap leading-relaxed">
                            {popupData.snippet}
                          </pre>
                       </div>
                    </motion.div>
                  )}

                  {popupData.codeSnippet && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mt-6 group">
                      <div className="relative bg-[#030712] border border-white/10 rounded-xl p-6 overflow-hidden transition-all duration-500 hover:border-white/30 shadow-2xl">
                        {/* Fake title bar */}
                        <div className="absolute top-0 inset-x-0 h-8 bg-white/[0.02] border-b border-white/5 flex items-center px-4 gap-2">
                           <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                           <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                           <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                           <span className="ml-2 font-mono text-[9px] text-white/30 tracking-widest pl-2 border-l border-white/10">payload.json</span>
                        </div>
                        <pre className="mt-6 font-mono text-[11px] leading-relaxed text-slate-300 drop-shadow-sm">
                          <code dangerouslySetInnerHTML={{
                              __html: popupData.codeSnippet
                                .replace(/"([^"]+)":/g, '<span class="text-indigo-300">"$1"</span>:')
                                .replace(/: "([^"]+)"/g, ': <span class="text-emerald-300">"$1"</span>')
                                .replace(/: ([0-9]+)/g, ': <span class="text-orange-300">$1</span>')
                                .replace(/\[|\]|\{|\}/g, '<span class="text-white/40">$&</span>')
                          }} />
                        </pre>
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Footer Hint */}
      <div className="absolute bottom-8 right-8 z-50 pointer-events-none">
        <div className="flex items-center gap-3 px-4 py-2 rounded-full border border-white/5 bg-white/[0.02] backdrop-blur-sm">
          <span className="text-white/30 text-[9px] tracking-[0.2em] uppercase font-bold">
            Space to Advance
          </span>
        </div>
      </div>
    </div>
  );
}
