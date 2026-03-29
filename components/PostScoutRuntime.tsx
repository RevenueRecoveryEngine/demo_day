"use client";
// components/PostScoutRuntime.tsx — Slide 3: Post-SCOUT execution visualization

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Database,
  Bot,
  Code2,
  PenTool,
  ShieldAlert,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";

// --- CONFIG & DATA ---
const PHASES = [
  {
    id: 0,
    label: "IDLE",
    explanation:
      "Raw listing text and reviews arrive from SCOUT. Unstructured and noisy — nothing is safe to act on yet.",
  },
  {
    id: 1,
    label: "CRITIC Analysis",
    explanation:
      "CRITIC extracts two things: expectation gaps and listing attributes. It structures the evidence but does not make final decisions.",
    theme: {
      text: "text-blue-400",
      line: "bg-blue-500",
    },
  },
  {
    id: 2,
    label: "TS Logic Gate",
    explanation:
      "The TypeScript logic gate checks required pillars deterministically. Missing structural coverage becomes a hard surfaced gap, even if the LLM missed it.",
    theme: {
      text: "text-emerald-400",
      line: "bg-emerald-500",
    },
  },
  {
    id: 3,
    label: "PRESCRIBER",
    explanation:
      "PRESCRIBER drafts surgical edits from the enriched gap set. This is where proposed merchant-facing improvements appear.",
    theme: {
      text: "text-purple-400",
      line: "bg-purple-500",
    },
  },
  {
    id: 4,
    label: "TS Safety Gate",
    explanation:
      "The safety gate scans prescriptions for unsupported numeric claims and downgrades unsafe content before it can ship.",
    theme: {
      text: "text-amber-400",
      line: "bg-amber-500",
    },
  },
];

export function PostScoutRuntime({ step }: { step: number }) {
  const phase = step;
  const isActive = (id: number) => phase === id;
  const isPast = (id: number) => phase > id;
  const activeTheme = PHASES[phase]?.theme;

  // DELETE the useState hooks and the entire useEffect handleKey block!
  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-between overflow-hidden bg-[#020617] py-12 px-8 font-sans">
      {/* Header & Controls Area */}
      <div className="w-full max-w-6xl flex justify-between items-center z-10 shrink-0 mb-10">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            RRE Pipeline: Execution Runtime
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            LLM Extraction vs. Deterministic Code
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="px-3 py-1 rounded-full bg-slate-800 text-slate-400 font-mono text-[11px] font-semibold tracking-wider">
            STEP {phase} / 4
          </div>
        </div>
      </div>

      {/* Main Canvas Canvas */}
      <div className="relative w-full max-w-[88rem] flex-1 flex flex-col justify-center items-center shrink-0 min-h-[440px]">
        {/* Horizontal Node Track */}
        <div className="relative w-full flex justify-between items-center z-10">
          {/* Base Track Line */}
          <div className="absolute left-6 right-6 top-[3rem] h-[3px] bg-slate-800 z-[-2]" />

          {/* Animated Flow Line Container */}
          <div className="absolute left-6 right-6 top-[3rem] h-[3px] z-[-1] overflow-hidden">
            <motion.div
              className={`h-full ${activeTheme?.line || "bg-blue-500"}`}
              initial={{ width: "0%" }}
              animate={{ width: `${(phase / 4) * 100}%` }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />
          </div>

          {/* 0. SCOUT Data */}
          <div className="relative flex flex-col items-center flex-shrink-0 z-10 w-24">
            <div className="w-[4.75rem] h-[4.75rem] rounded-full border-2 border-slate-700 bg-[#020617] flex items-center justify-center transition-all duration-400 m-auto">
              <Database
                className="w-[1.875rem] h-[1.875rem] text-slate-500"
                strokeWidth={2}
              />
            </div>
            <div className="mt-[0.7rem] font-semibold text-slate-300 text-[0.78rem] text-center whitespace-nowrap">
              SCOUT Data
            </div>
            <div className="flex flex-col gap-[0.3rem] mt-[0.4rem] items-center">
              <span className="bg-slate-800 px-[0.55rem] py-[0.15rem] rounded-[0.2rem] text-[0.62rem] text-slate-400">
                listing_text
              </span>
              <span className="bg-slate-800 px-[0.55rem] py-[0.15rem] rounded-[0.2rem] text-[0.62rem] text-slate-400">
                reviews[]
              </span>
            </div>
          </div>

          {/* 1. CRITIC */}
          <div className="relative flex flex-col items-center flex-shrink-0 z-20 w-32">
            <motion.div
              className={`w-[4.75rem] h-[4.75rem] rounded-xl border-2 bg-[#020617] flex items-center justify-center m-auto transition-all duration-400 
                ${isActive(1) ? "border-blue-500 shadow-[0_0_22px_rgba(59,130,246,0.45)]" : "border-slate-700"}`}
            >
              <Bot
                className={`w-[1.875rem] h-[1.875rem] transition-colors duration-400 ${isActive(1) ? "text-blue-500" : "text-slate-500"}`}
                strokeWidth={2}
              />
            </motion.div>
            <div
              className={`mt-[0.7rem] font-semibold text-[0.78rem] text-center whitespace-nowrap ${isActive(1) ? "text-blue-400" : "text-slate-300"}`}
            >
              CRITIC (LLM)
            </div>
            <div className="text-slate-400 text-[0.6rem] mt-[0.15rem] text-center">
              Extraction Only
            </div>

            {/* Popup 1 */}
            <AnimatePresence>
              {phase === 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 8 }}
                  exit={{ opacity: 0, y: 15 }}
                  transition={{ duration: 0.3 }}
                  className="absolute top-[6.25rem] -left-[8.5rem] w-[22rem] bg-[#111827] border border-blue-500/30 rounded-lg p-[0.8rem] font-mono text-[0.615rem] leading-[1.65] shadow-[0_24px_38px_-5px_rgba(0,0,0,0.65)] z-50 text-[#e2e8f0] text-left"
                >
                  <div className="text-slate-600 mb-[5px]">
                    // 2 top-level output keys
                  </div>
                  <div>{"{"}</div>
                  <div className="pl-[0.7rem]">
                    <span className="text-[#7dd3fc]">"expectation_gaps"</span>:
                    [{"{"}
                  </div>
                  <div className="pl-[1.4rem]">
                    <span className="text-[#7dd3fc]">"problem_category"</span>:{" "}
                    <span className="text-[#86efac]">
                      "compatibility_issue"
                    </span>
                    ,
                  </div>
                  <div className="pl-[1.4rem]">
                    <span className="text-[#7dd3fc]">"listing_risk_type"</span>:{" "}
                    <span className="text-[#86efac]">"LIABILITY_RISK"</span>,
                  </div>
                  <div className="pl-[1.4rem]">
                    <span className="text-[#7dd3fc]">
                      "identified_keywords"
                    </span>
                    :{" "}
                    <span className="text-[#c4b5fd]">
                      ["fit", "doesn't fit"]
                    </span>
                    ,
                  </div>
                  <div className="pl-[1.4rem]">
                    <span className="text-[#7dd3fc]">
                      "classification_certainty"
                    </span>
                    : <span className="text-[#86efac]">"likely"</span>,
                  </div>
                  <div className="pl-[1.4rem]">
                    <span className="text-[#7dd3fc]">"reasoning_trace"</span>:{" "}
                    <span className="text-[#86efac]">
                      "Universal claim; review contradicts"
                    </span>
                    ,
                  </div>
                  <div className="pl-[1.4rem]">
                    <span className="text-[#7dd3fc]">
                      "required_check_category"
                    </span>
                    : <span className="text-[#86efac]">"fitment_check"</span>
                  </div>
                  <div className="pl-[0.7rem]">{"}"}],</div>
                  <div className="pl-[0.7rem]">
                    <span className="text-[#7dd3fc]">
                      "extracted_listing_attributes"
                    </span>
                    : {"{"}
                  </div>
                  <div className="pl-[1.4rem]">
                    <span className="text-[#7dd3fc]">"fitment_check"</span>:{" "}
                    <span className="bg-red-500/20 text-red-500 rounded-[3px] px-1 font-bold">
                      []
                    </span>{" "}
                    <span className="text-amber-400">← EMPTY</span>,
                  </div>
                  <div className="pl-[1.4rem]">
                    <span className="text-[#7dd3fc]">"specs_check"</span>:{" "}
                    <span className="text-[#c4b5fd]">["12V", "LED"]</span>,
                  </div>
                  <div className="pl-[1.4rem]">
                    <span className="text-[#7dd3fc]">"condition_check"</span>:{" "}
                    <span className="text-[#c4b5fd]">["New"]</span>
                  </div>
                  <div className="pl-[0.7rem]">{"}"}</div>
                  <div>{"}"}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* 2. TS Logic Gate */}
          <div className="relative flex flex-col items-center flex-shrink-0 z-20 w-32">
            <motion.div
              className={`w-[4.75rem] h-[4.75rem] rounded-[0.375rem] rotate-45 border-2 bg-[#020617] flex items-center justify-center m-auto transition-all duration-400 
                ${isActive(2) ? "border-emerald-500 shadow-[0_0_22px_rgba(16,185,129,0.45)]" : "border-slate-700"}`}
            >
              <Code2
                className={`-rotate-45 w-[1.875rem] h-[1.875rem] transition-colors duration-400 ${isActive(2) ? "text-emerald-500" : "text-slate-500"}`}
                strokeWidth={2}
              />
            </motion.div>
            <div
              className={`mt-[0.7rem] font-semibold text-[0.78rem] text-center whitespace-nowrap ${isActive(2) ? "text-emerald-400" : "text-slate-300"}`}
            >
              TS Logic Gate
            </div>
            <div className="text-slate-400 text-[0.6rem] mt-[0.15rem] text-center">
              Pillar Gate
            </div>

            {/* Popup 2 */}
            <AnimatePresence>
              {phase === 2 && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 8 }}
                  exit={{ opacity: 0, y: 15 }}
                  transition={{ duration: 0.3 }}
                  className="absolute top-[6.25rem] -left-[7.5rem] w-[20rem] bg-[#111827] border border-emerald-500/40 rounded-lg p-[0.8rem] font-mono text-[0.615rem] leading-[1.65] shadow-[0_24px_38px_-5px_rgba(0,0,0,0.65)] z-50 text-[#e2e8f0] text-left"
                >
                  <div className="text-amber-500 font-bold mb-[6px]">
                    ⚡ runPillarGate()
                  </div>
                  <div className="text-slate-600">
                    // checkSynonymMatch() per pillar:
                  </div>
                  <div className="pl-[0.5rem] flex items-center gap-[0.4rem]">
                    <span className="text-red-400">✗</span>{" "}
                    <span>
                      <span className="text-[#7dd3fc]">fitment_check</span>:{" "}
                      <span className="text-red-400">
                        [] → no synonym match
                      </span>
                    </span>
                  </div>
                  <div className="pl-[0.5rem] flex items-center gap-[0.4rem]">
                    <span className="text-emerald-400">✓</span>{" "}
                    <span>
                      <span className="text-[#7dd3fc]">specs_check</span>:{" "}
                      <span className="text-emerald-400">synonym matched</span>
                    </span>
                  </div>
                  <div className="pl-[0.5rem] flex items-center gap-[0.4rem]">
                    <span className="text-emerald-400">✓</span>{" "}
                    <span>
                      <span className="text-[#7dd3fc]">condition_check</span>:{" "}
                      <span className="text-emerald-400">synonym matched</span>
                    </span>
                  </div>
                  <div className="border-t border-slate-800 my-[5px]"></div>
                  <div className="text-slate-600">
                    // Missing pillar → inject HARD surface:
                  </div>
                  <div className="pl-[0.5rem] text-emerald-400">
                    + buildMissingPillarSurface(
                    <span className="text-[#86efac]">"fitment_check"</span>)
                  </div>
                  <div className="pl-[0.5rem] text-emerald-400">
                    + push → expectation_gaps[]
                  </div>
                  <div className="border-t border-slate-800 my-[5px]"></div>
                  <div className="flex items-center gap-[5px] text-emerald-500">
                    <svg
                      className="w-[9px] h-[9px] stroke-emerald-500 fill-none"
                      viewBox="0 0 24 24"
                    >
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                    Enriched gaps → PRESCRIBER
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* 3. PRESCRIBER */}
          <div className="relative flex flex-col items-center flex-shrink-0 z-20 w-32">
            <motion.div
              className={`w-[4.75rem] h-[4.75rem] rounded-xl border-2 bg-[#020617] flex items-center justify-center m-auto transition-all duration-400 
                ${isActive(3) ? "border-purple-500 shadow-[0_0_22px_rgba(139,92,246,0.45)]" : "border-slate-700"}`}
            >
              <PenTool
                className={`w-[1.875rem] h-[1.875rem] transition-colors duration-400 ${isActive(3) ? "text-purple-500" : "text-slate-500"}`}
                strokeWidth={2}
              />
            </motion.div>
            <div
              className={`mt-[0.7rem] font-semibold text-[0.78rem] text-center whitespace-nowrap ${isActive(3) ? "text-purple-400" : "text-slate-300"}`}
            >
              PRESCRIBER (LLM)
            </div>
            <div className="text-slate-400 text-[0.6rem] mt-[0.15rem] text-center">
              Surgical Edits
            </div>

            {/* Popup 3 */}
            <AnimatePresence>
              {phase === 3 && (
                <motion.div
                  initial={{ opacity: 0, y: -15 }}
                  animate={{ opacity: 1, y: -8 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="absolute bottom-[6.25rem] -left-[9.5rem] w-[24rem] bg-[#111827] border border-purple-500/40 rounded-lg p-[0.8rem] font-mono text-[0.615rem] leading-[1.65] shadow-[0_24px_38px_-5px_rgba(0,0,0,0.65)] z-50 text-[#e2e8f0] text-left"
                >
                  <div className="text-slate-600 mb-[6px]">
                    // PRESCRIBER — prescriptions[]
                  </div>

                  <div className="bg-purple-500/10 border border-purple-500/25 rounded p-[7px] mb-[6px]">
                    <div className="text-purple-300 font-bold mb-[4px]">
                      prescription[0]
                    </div>
                    <div>
                      <span className="text-[#7dd3fc]">action_type</span>:{" "}
                      <span className="text-[#86efac]">"inject"</span>
                    </div>
                    <div>
                      <span className="text-[#7dd3fc]">placement</span>:{" "}
                      <span className="text-[#86efac]">"top_block"</span>
                    </div>
                    <div>
                      <span className="text-[#7dd3fc]">target_segment</span>:{" "}
                      <span className="text-slate-500">null</span>
                    </div>
                    <div>
                      <span className="text-[#7dd3fc]">surgical_edit</span>:{" "}
                      <span className="text-[#86efac]">
                        "Warning: Verify year/make/model before ordering."
                      </span>
                    </div>
                    <div>
                      <span className="text-[#7dd3fc]">trigger</span>:{" "}
                      <span className="text-[#86efac]">
                        "fitment_check:missing"
                      </span>
                    </div>
                  </div>

                  <div className="bg-red-500/5 border border-red-500/25 rounded p-[7px]">
                    <div className="text-red-300 font-bold mb-[4px]">
                      prescription[1]
                    </div>
                    <div>
                      <span className="text-[#7dd3fc]">action_type</span>:{" "}
                      <span className="text-[#86efac]">"inject"</span>
                    </div>
                    <div>
                      <span className="text-[#7dd3fc]">placement</span>:{" "}
                      <span className="text-[#86efac]">"inline"</span>
                    </div>
                    <div>
                      <span className="text-[#7dd3fc]">target_segment</span>:{" "}
                      <span className="text-slate-500">null</span>
                    </div>
                    <div>
                      <span className="text-[#7dd3fc]">surgical_edit</span>:{" "}
                      <span className="text-[#86efac]">"Fits </span>
                      <span className="bg-red-500/30 text-red-500 rounded-[2px] px-[3px] font-bold">
                        94%
                      </span>
                      <span className="text-[#86efac]">
                        {" "}
                        of 2015–2022 trucks."
                      </span>
                    </div>
                    <div>
                      <span className="text-[#7dd3fc]">trigger</span>:{" "}
                      <span className="text-[#86efac]">
                        "fitment_check:missing"
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* 4. TS Safety Gate */}
          <div className="relative flex flex-col items-center flex-shrink-0 z-20 w-32">
            <motion.div
              className={`w-[4.75rem] h-[4.75rem] rounded-[0.375rem] rotate-45 border-2 bg-[#020617] flex items-center justify-center m-auto transition-all duration-400 
                ${isActive(4) ? "border-amber-500 shadow-[0_0_22px_rgba(245,158,11,0.45)]" : "border-slate-700"}`}
            >
              <ShieldAlert
                className={`-rotate-45 w-[1.875rem] h-[1.875rem] transition-colors duration-400 ${isActive(4) ? "text-amber-500" : "text-slate-500"}`}
                strokeWidth={2}
              />
            </motion.div>
            <div
              className={`mt-[0.7rem] font-semibold text-[0.78rem] text-center whitespace-nowrap ${isActive(4) ? "text-amber-400" : "text-slate-300"}`}
            >
              TS Logic Gate
            </div>
            <div className="text-slate-400 text-[0.6rem] mt-[0.15rem] text-center">
              Numeric Fabrication Check
            </div>

            {/* Popup 4 */}
            <AnimatePresence>
              {phase === 4 && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 8 }}
                  exit={{ opacity: 0, y: 15 }}
                  transition={{ duration: 0.3 }}
                  className="absolute top-[6.25rem] right-0 w-[22rem] bg-[#111827] border border-amber-500/40 rounded-lg p-[0.8rem] font-mono text-[0.615rem] leading-[1.65] shadow-[0_24px_38px_-5px_rgba(0,0,0,0.65)] z-50 text-[#e2e8f0] text-left"
                >
                  <div className="text-amber-500 font-bold mb-[7px]">
                    applyNumericFabricationFirewall()
                  </div>

                  <div className="mb-[6px]">
                    <div className="text-slate-600">
                      // Scanning prescription[0]:
                    </div>
                    <div>
                      regex →{" "}
                      <span className="text-slate-500">no numbers found</span>
                    </div>
                    <div className="text-emerald-400 flex items-center gap-[4px]">
                      <svg
                        className="w-[9px] h-[9px] stroke-emerald-400 fill-none"
                        viewBox="0 0 24 24"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      PASS — action_type:{" "}
                      <span className="text-[#86efac]">"inject"</span> preserved
                      ✓
                    </div>
                  </div>

                  <div className="border-t border-slate-800 my-[5px]"></div>

                  <div className="mb-[7px]">
                    <div className="text-slate-600">
                      // Scanning prescription[1]:
                    </div>
                    <div>
                      regex → found{" "}
                      <span className="text-[#fda4af]">"94%"</span>
                    </div>
                    <div className="text-red-400">
                      cross-ref listing_text → NOT FOUND
                    </div>
                    <div className="text-amber-400 flex items-center gap-[4px] mt-[2px]">
                      <span>⚠</span> NUMERIC HALLUCINATION DETECTED
                    </div>
                  </div>

                  <div className="border-t border-slate-800 my-[5px]"></div>

                  <div>
                    <div className="text-slate-600">
                      // Auto-mutation on prescription[1]:
                    </div>
                    <div className="text-red-400">- action_type: "inject"</div>
                    <div className="text-emerald-400">
                      + action_type: "flag"
                    </div>
                    <div className="text-red-400">
                      - surgical_edit: "Fits 94%..."
                    </div>
                    <div className="text-emerald-400">
                      + surgical_edit: null
                    </div>
                    <div className="text-amber-400 mt-[4px]">
                      emit: WARNING_HALLUCINATION_DETECTED
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Bottom Explanation Text Area */}
      <div className="w-full mt-14 h-12 flex items-center justify-center text-center px-4 shrink-0 transition-colors duration-500">
        <AnimatePresence mode="wait">
          <motion.p
            key={phase}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="text-slate-400 font-light text-[0.875rem] max-w-4xl"
          >
            {PHASES[phase].explanation}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}
