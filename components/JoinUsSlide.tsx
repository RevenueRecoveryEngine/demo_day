"use client";

import { motion } from "framer-motion";
import QRCode from "react-qr-code";
import { ArrowRight, Sparkles, Terminal } from "lucide-react";

export function JoinUsSlide({ step }: { step: number }) {
  // Step 0: Just the title/text
  // Step 1: QR Code reveal

  return (
    <div className="flex flex-col items-center justify-center w-full h-full bg-[#030712] text-white overflow-hidden relative p-12">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-rose-500/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Decorative Grid */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, #fff 1px, transparent 1px),
            linear-gradient(to bottom, #fff 1px, transparent 1px)
          `,
          backgroundSize: "4rem 4rem",
        }}
      />

      <div className="z-10 flex flex-col items-center max-w-4xl w-full">

        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16 flex flex-col items-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 font-mono text-xs font-semibold tracking-widest mb-6 border-glow">
            <Sparkles className="w-4 h-4" />
            WE ARE HIRING
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight bg-gradient-to-br from-white via-white/90 to-white/40 bg-clip-text text-transparent">
            Join the Engine
          </h1>
          <p className="text-xl text-white/50 max-w-2xl mx-auto leading-relaxed">
            We are looking for elite builders to scale the future of AI-driven architecture. Scan the code to apply.
          </p>
        </motion.div>

        {/* QR Code Reveal Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{
            opacity: step >= 1 ? 1 : 0,
            scale: step >= 1 ? 1 : 0.9,
            y: step >= 1 ? 0 : 20
          }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
          className="relative group mt-4 pointer-events-auto"
        >
          {/* Animated glow behind QR code */}
          <div className="absolute inset-0 bg-gradient-to-r from-rose-500/30 to-indigo-500/30 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

          <div className="relative p-8 bg-[#0f111a] border border-white/10 rounded-2xl shadow-2xl flex flex-col items-center cursor-pointer transition-transform duration-500">

            <div className="p-4 bg-white rounded-xl mb-6 shadow-[0_0_40px_rgba(255,255,255,0.1)] group-hover:scale-105 transition-transform duration-500">
              <QRCode
                value="https://docs.google.com/forms/d/e/1FAIpQLSfpR46twPb532AA04eqcnadV2XbXnpTxUfadztohDW7HH8uhQ/viewform?usp=sharing&ouid=113135793548074052221"
                size={200}
                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                viewBox={`0 0 256 256`}
              />
            </div>

            <div className="flex items-center gap-3 text-white/70 font-mono text-sm">
              <Terminal className="w-4 h-4" />
              <span>Apply now to start building</span>
              <ArrowRight className="w-4 h-4 text-rose-400 group-hover:translate-x-1 transition-transform" />
            </div>

          </div>
        </motion.div>

      </div>
    </div>
  );
}
