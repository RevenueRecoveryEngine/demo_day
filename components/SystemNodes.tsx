"use client";

import { motion } from "framer-motion";
import {
  Link,
  Search,
  BrainCircuit,
  Stethoscope,
  FileCheck,
  MonitorPlay,
} from "lucide-react";

export function SystemNodes({ step }: { step: number }) {
  // Step 0: SCOUT
  // Step 1: CRITIC
  // Step 2: PRESCRIBER
  // Step 3: Surgical Edits
  // Step 4: Live Demo

  const nodes = [
    {
      icon: Search,
      name: "SCOUT",
      desc: "Data Hunter",
      color: "text-blue-400",
      bg: "bg-blue-500/20",
      border: "border-blue-500/50",
    },
    {
      icon: BrainCircuit,
      name: "CRITIC",
      desc: "Spectrum Classifier",
      color: "text-violet-400",
      bg: "bg-violet-500/20",
      border: "border-violet-500/50",
    },
    {
      icon: Stethoscope,
      name: "PRESCRIBER",
      desc: "The Surgeon",
      color: "text-emerald-400",
      bg: "bg-emerald-500/20",
      border: "border-emerald-500/50",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center w-full h-full bg-[#030712] text-white relative p-12 overflow-hidden">
      <div className="flex items-center justify-center gap-4 w-full max-w-6xl relative z-10">
        {/* INPUT URL */}
        <motion.div
          animate={{ opacity: 1 }}
          className="flex flex-col items-center z-10"
        >
          <div className="w-16 h-16 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-4">
            <Link className="w-8 h-8 text-white/50" />
          </div>
          <span className="font-mono text-white/50 text-sm">Target URL</span>
        </motion.div>

        {/* THE 3 AGENT NODES */}
        {nodes.map((node, i) => {
          // This ensures SCOUT triggers on step 0, CRITIC on step 1, PRESCRIBER on step 2
          const isActive = step >= i;

          return (
            <div key={i} className="flex items-center">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: isActive ? 80 : 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="h-1 bg-white/20 mx-2"
              />
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: isActive ? 1 : 0, opacity: isActive ? 1 : 0 }}
                transition={{ type: "spring", bounce: 0.5, delay: 0.1 }}
                className={`w-48 h-48 rounded-2xl border ${isActive ? node.border : "border-transparent"} ${isActive ? node.bg : "bg-transparent"} flex flex-col items-center justify-center p-6 backdrop-blur-md shadow-2xl relative z-10`}
              >
                <node.icon className={`w-12 h-12 ${node.color} mb-4`} />
                <h3 className="text-xl font-black tracking-widest uppercase">
                  {node.name}
                </h3>
                <span className="text-sm font-mono text-white/60 mt-2 text-center">
                  {node.desc}
                </span>
              </motion.div>
            </div>
          );
        })}

        {/* OUTPUT EDITS - Step 3 */}
        <div className="flex items-center">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: step >= 3 ? 80 : 0 }}
            className="h-1 bg-white/20 mx-2"
          />
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: step >= 3 ? 1 : 0, opacity: step >= 3 ? 1 : 0 }}
            className="flex flex-col items-center z-10"
          >
            <div className="w-16 h-16 rounded-xl bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center mb-4 shadow-[0_0_30px_rgba(16,185,129,0.3)]">
              <FileCheck className="w-8 h-8 text-emerald-400" />
            </div>
            <span className="font-mono text-emerald-400 text-sm font-bold">
              Surgical Edits
            </span>
          </motion.div>
        </div>
      </div>

      {/* LIVE DEMO - Step 4 */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: step >= 4 ? 0 : 50, opacity: step >= 4 ? 1 : 0 }}
        className="absolute bottom-12 bg-blue-600 text-white px-8 py-4 rounded-xl font-black text-3xl uppercase tracking-widest shadow-[0_0_40px_rgba(37,99,235,0.6)] flex items-center gap-4 z-50 cursor-pointer hover:bg-blue-500 transition-colors"
      >
        <MonitorPlay className="w-8 h-8" />
        Live Demo
      </motion.div>
    </div>
  );
}
