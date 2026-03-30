"use client";

import { motion } from "framer-motion";
import { MousePointer2, ShoppingCart, Truck, XCircle } from "lucide-react";

export function StoryTheMismatch({ step }: { step: number }) {
  // Step 0: Idle Product Page
  // Step 1: Mouse clicks Order
  // Step 2: Shipping & The Failure

  return (
    <div className="flex flex-col items-center justify-center w-full h-full bg-[#030712] text-white relative p-12 overflow-hidden">
      <motion.div
        animate={{
          backgroundColor:
            step >= 2 ? "rgba(225, 29, 72, 0.05)" : "rgba(139, 92, 246, 0.02)",
        }}
        className="absolute inset-0 transition-colors duration-1000 pointer-events-none"
      />

      {/* The Product Card */}
      <motion.div
        animate={{
          scale: step >= 2 ? 0.8 : 1,
          y: step >= 2 ? -80 : 0,
          opacity: step >= 2 ? 0.4 : 1,
        }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="w-[500px] bg-[#0f111a] border border-white/10 rounded-2xl p-8 relative z-10 shadow-2xl"
      >
        {/* IMAGE CONTAINER */}
        <div className="w-full h-48 bg-white/5 rounded-xl mb-6 flex items-center justify-center border border-white/5 overflow-hidden relative">
          <img
            src="/brake-caliper.png"
            alt="Performance Brake Caliper"
            className="w-full h-full object-cover z-10"
            onError={(e) => {
              // Hides the image tag if the photo isn't in the public folder yet
              e.currentTarget.style.display = "none";
            }}
          />
          {/* Fallback text if the image is missing */}
          <span className="text-white/20 font-mono absolute">
            IMAGE: BRAKE CALIPER
          </span>
        </div>

        <h2 className="text-2xl font-bold mb-2">Performance Brake Caliper</h2>
        <p className="text-lg text-white/50 mb-6">
          High quality replacement part. Fits Ford F-150.
        </p>

        <div className="flex justify-between items-center">
          <div className="text-3xl font-mono">$129.99</div>

          <motion.button
            animate={{
              scale: step === 1 ? 0.95 : 1,
              backgroundColor: step >= 1 ? "#4c1d95" : "#8b5cf6",
            }}
            className="flex items-center gap-2 px-6 py-3 bg-violet-500 rounded-lg font-bold text-white relative overflow-hidden"
          >
            <ShoppingCart className="w-5 h-5" />
            {step >= 1 ? "Processing..." : "Order Now"}
          </motion.button>
        </div>

        {/* The Mouse Cursor */}
        <motion.div
          initial={{ x: 200, y: 150, opacity: 0 }}
          animate={{
            x: step >= 1 ? 140 : 200,
            y: step >= 1 ? -30 : 150,
            opacity: step >= 2 ? 0 : 1,
            scale: step === 1 ? 0.8 : 1,
          }}
          transition={{ duration: 0.5, ease: "circOut" }}
          className="absolute right-0 bottom-0 z-50 text-white drop-shadow-[0_5px_15px_rgba(0,0,0,0.5)]"
        >
          <MousePointer2 className="w-10 h-10 fill-white" />
        </motion.div>
      </motion.div>

      {/* The Shipping & Failure Road */}
      <div className="absolute bottom-1/3 w-full max-w-4xl px-12">
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: step >= 2 ? 1 : 0, opacity: step >= 2 ? 1 : 0 }}
          transition={{ duration: 0.8 }}
          className="w-full h-1 bg-white/10 relative origin-left"
        >
          {/* Truck Moving Forward */}
          <motion.div
            initial={{ left: "0%" }}
            animate={{ left: step >= 2 ? "90%" : "0%" }}
            transition={{ duration: 1.5, ease: "anticipate", delay: 0.2 }}
            className="absolute -top-6 -translate-x-1/2"
          >
            <div className="w-12 h-12 bg-violet-600 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(139,92,246,0.5)]">
              <Truck className="w-6 h-6 text-white" />
            </div>
          </motion.div>

          {/* Failure State */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: step >= 2 ? 1 : 0, opacity: step >= 2 ? 1 : 0 }}
            transition={{ delay: 1.6, type: "spring" }}
            className="absolute right-0 -top-8 flex flex-col items-center"
          >
            <div className="w-16 h-16 bg-rose-500 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(225,29,72,0.6)] z-20">
              <XCircle className="w-10 h-10 text-white" />
            </div>
            <div className="absolute top-20 w-64 text-center">
              <div className="bg-rose-500/10 border border-rose-500/30 text-rose-400 px-4 py-2 rounded-lg font-mono text-sm font-bold uppercase tracking-widest">
                Doesn't Fit
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
