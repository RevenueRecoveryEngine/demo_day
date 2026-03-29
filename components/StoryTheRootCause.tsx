"use client";

import { motion } from "framer-motion";
import { Truck, AlertTriangle } from "lucide-react";

export function StoryTheRootCause({ step }: { step: number }) {
  // Step 0: Empty CMS Description
  // Step 1: Types "Fits Ford F-150."
  // Step 2: The Return hits

  return (
    <div className="flex flex-col items-center justify-center w-full h-full bg-[#030712] text-white relative p-12 overflow-hidden">
      {/* Merchant CMS Window */}
      <motion.div
        animate={{
          scale: step >= 2 ? 0.9 : 1,
          opacity: step >= 2 ? 0.5 : 1,
          borderColor:
            step >= 2 ? "rgba(225, 29, 72, 0.3)" : "rgba(255, 255, 255, 0.1)",
        }}
        transition={{ duration: 0.5 }}
        className="w-[600px] bg-[#0f111a] border border-white/10 rounded-xl overflow-hidden shadow-2xl relative z-10"
      >
        {/* Fake Browser/CMS Header */}
        <div className="bg-black/50 px-4 py-3 border-b border-white/10 flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-rose-500/50" />
            <div className="w-3 h-3 rounded-full bg-amber-500/50" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/50" />
          </div>
          <div className="ml-4 text-xs font-mono text-white/30 uppercase tracking-widest">
            Edit Product Description
          </div>
        </div>

        {/* Text Area */}
        <div className="p-6">
          <div className="text-sm font-bold text-white/50 mb-2 uppercase tracking-wide">
            Description
          </div>
          <div className="w-full h-32 bg-black/40 border border-white/5 rounded-lg p-4 font-mono text-lg flex">
            {/* Typing Effect */}
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: step >= 1 ? "100%" : "0%" }}
              transition={{ duration: 1.5, ease: "linear" }}
              className="overflow-hidden whitespace-nowrap text-white"
            >
              Fits Ford F-150.
            </motion.div>
            {/* Blinking Cursor */}
            <motion.div
              animate={{ opacity: [1, 0] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="w-2 h-6 bg-violet-500 ml-1"
            />
          </div>

          <div className="mt-4 flex justify-end">
            <div className="px-6 py-2 bg-white/10 text-white/50 rounded-md font-bold text-sm">
              Save Changes
            </div>
          </div>
        </div>
      </motion.div>

      {/* The Financial Consequence (Reverse Return Truck) */}
      <div className="absolute bottom-1/4 w-full max-w-4xl px-12 z-20">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: step >= 2 ? 1 : 0 }}
          className="w-full h-[2px] bg-rose-500/20 relative"
        >
          {/* Truck Reversing */}
          <motion.div
            initial={{ left: "100%" }}
            animate={{ left: step >= 2 ? "10%" : "100%" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute -top-8 -translate-x-1/2"
          >
            {/* Flipped Truck Icon */}
            <div className="w-16 h-16 bg-rose-950 border border-rose-500/50 rounded-xl flex items-center justify-center shadow-[0_0_40px_rgba(225,29,72,0.4)] transform -scale-x-100">
              <Truck className="w-8 h-8 text-rose-500" />
            </div>

            {/* Liability Badge Drops In */}
            <motion.div
              initial={{ y: -20, opacity: 0, scale: 0.8 }}
              animate={{
                y: step >= 2 ? -70 : -20,
                opacity: step >= 2 ? 1 : 0,
                scale: step >= 2 ? 1 : 0.8,
              }}
              transition={{ delay: 1, type: "spring" }}
              className="absolute left-1/2 -translate-x-1/2 w-48 text-center"
            >
              <div className="bg-rose-500 text-white px-4 py-3 rounded-lg font-mono font-black text-lg shadow-[0_0_30px_rgba(225,29,72,0.6)] flex items-center justify-center gap-2">
                {" "}
                <AlertTriangle className="w-5 h-5" />
                MERCHANT PAYS
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
