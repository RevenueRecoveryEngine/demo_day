"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { MASTER_SCRIPT } from "@/lib/speaker-notes";

export default function PresenterDashboard() {
  const channelRef = useRef<BroadcastChannel | null>(null);
  const [globalStep, setGlobalStep] = useState(0);

  useEffect(() => {
    channelRef.current = new BroadcastChannel("rre-demo-sync");
    channelRef.current.onmessage = (event) => {
      if (event.data.action === "setStep") {
        setGlobalStep(event.data.step);
      }
    };
    return () => channelRef.current?.close();
  }, []);

  const triggerNext = useCallback(() => {
    setGlobalStep((prev) => {
      const next = Math.min(prev + 1, MASTER_SCRIPT.length - 1);
      channelRef.current?.postMessage({ action: "setStep", step: next });
      return next;
    });
  }, []);

  const triggerPrev = useCallback(() => {
    setGlobalStep((prev) => {
      const prevStep = Math.max(prev - 1, 0);
      channelRef.current?.postMessage({ action: "setStep", step: prevStep });
      return prevStep;
    });
  }, []);

  // Keyboard controls for the Presenter window (Space/Arrows)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (["ArrowRight", "ArrowDown", " "].includes(e.key)) {
        e.preventDefault();
        triggerNext();
      } else if (["ArrowLeft", "ArrowUp"].includes(e.key)) {
        e.preventDefault();
        triggerPrev();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [triggerNext, triggerPrev]);

  return (
    <div className="flex w-full h-screen bg-[#030712] text-white overflow-hidden">
      {/* LEFT HALF: Live Audience Preview */}
      <div className="w-1/2 h-full border-r border-white/10 flex flex-col relative bg-black">
        <div className="absolute top-4 left-4 z-10 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded animate-pulse">
          AUDIENCE VIEW
        </div>
        <div className="w-full h-full pointer-events-none scale-90 origin-center">
          <iframe src="/" className="w-full h-full border-0" />
        </div>
      </div>

      {/* RIGHT HALF: Single-Block Teleprompter */}
      <div className="w-1/2 h-full flex flex-col bg-[#0f111a]">
        {/* Top Controls */}
        <div className="flex items-center justify-between p-6 border-b border-white/10 bg-white/5 shrink-0">
          <button
            onClick={triggerPrev}
            className="flex items-center gap-2 px-6 py-4 bg-white/10 hover:bg-white/20 rounded-xl text-lg font-bold transition-colors"
          >
            <ArrowLeft className="w-6 h-6" /> Previous
          </button>
          <div className="font-mono text-white/50 text-sm">
            Step {globalStep + 1} / {MASTER_SCRIPT.length}
          </div>
          <button
            onClick={triggerNext}
            className="flex items-center gap-2 px-12 py-4 bg-violet-600 hover:bg-violet-500 rounded-xl text-xl font-bold transition-colors shadow-[0_0_30px_rgba(139,92,246,0.4)]"
          >
            Next <ArrowRight className="w-6 h-6" />
          </button>
        </div>

        {/* Script Area */}
        <div className="flex-1 flex flex-col justify-center p-12">
          <h2 className="text-xl text-violet-400 font-mono mb-6 border-b border-white/10 pb-2 uppercase tracking-widest">
            Read Now:
          </h2>

          {/* This is the ONLY script shown */}
          <div className="text-4xl leading-relaxed font-medium text-white drop-shadow-md whitespace-pre-wrap">
            {MASTER_SCRIPT[globalStep]}
          </div>

          {/* Up Next Preview */}
          {globalStep < MASTER_SCRIPT.length - 1 && (
            <div className="mt-12 pt-8 border-t border-white/10">
              <h3 className="text-sm text-white/30 font-mono mb-2 uppercase tracking-widest">
                Coming Up Next:
              </h3>
              <div className="text-xl leading-relaxed text-white/40 italic whitespace-pre-wrap">
                {MASTER_SCRIPT[globalStep + 1]}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
