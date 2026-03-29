"use client";

import { useEffect, useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { SECTION_NOTES, STAGE_NOTES } from "@/lib/speaker-notes";

export default function PresenterDashboard() {
  const channelRef = useRef<BroadcastChannel | null>(null);

  useEffect(() => {
    channelRef.current = new BroadcastChannel("rre-demo-sync");
    return () => channelRef.current?.close();
  }, []);

  const triggerNext = () => {
    channelRef.current?.postMessage({ action: "next" });
    // Also trigger it locally so the iframe preview updates
    window.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowRight" }));
  };

  const triggerPrev = () => {
    channelRef.current?.postMessage({ action: "prev" });
    window.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowLeft" }));
  };

  return (
    <div className="flex w-full h-screen bg-[#030712] text-white overflow-hidden">
      {/* LEFT HALF: Live Audience Preview */}
      <div className="w-1/2 h-full border-r border-white/10 flex flex-col relative bg-black">
        <div className="absolute top-4 left-4 z-10 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded animate-pulse">
          AUDIENCE VIEW
        </div>
        {/* We use an iframe pointing to the main page to show the exact preview */}
        <div className="w-full h-full pointer-events-none scale-90 origin-center">
          <iframe src="/" className="w-full h-full border-0" />
        </div>
      </div>

      {/* RIGHT HALF: Script & Controls */}
      <div className="w-1/2 h-full flex flex-col bg-[#0f111a]">
        {/* Big Controls */}
        <div className="flex items-center justify-between p-6 border-b border-white/10 bg-white/5 shrink-0">
          <button
            onClick={triggerPrev}
            className="flex items-center gap-2 px-6 py-4 bg-white/10 hover:bg-white/20 rounded-xl text-lg font-bold transition-colors"
          >
            <ArrowLeft className="w-6 h-6" /> Previous
          </button>
          <button
            onClick={triggerNext}
            className="flex items-center gap-2 px-12 py-4 bg-violet-600 hover:bg-violet-500 rounded-xl text-xl font-bold transition-colors shadow-[0_0_30px_rgba(139,92,246,0.4)]"
          >
            Next <ArrowRight className="w-6 h-6" />
          </button>
        </div>

        {/* Scrollable Script Area */}
        <div className="flex-1 overflow-y-auto p-8 space-y-12">
          <div>
            <h2 className="text-xl text-violet-400 font-mono mb-4 border-b border-white/10 pb-2">
              Main Sections
            </h2>
            {Object.entries(SECTION_NOTES).map(([key, note]) => (
              <div
                key={key}
                className="mb-6 p-4 bg-white/5 rounded-xl border border-white/10"
              >
                <h3 className="text-lg font-bold mb-2">{note.section}</h3>
                <p className="text-white/70 text-lg leading-relaxed">
                  {note.cue}
                </p>
              </div>
            ))}
          </div>

          <div>
            <h2 className="text-xl text-blue-400 font-mono mb-4 border-b border-white/10 pb-2">
              SCOUT Demo Stages
            </h2>
            {Object.entries(STAGE_NOTES).map(([key, text]) => (
              <div
                key={key}
                className="mb-4 p-4 bg-white/5 rounded-xl border border-white/10"
              >
                <h3 className="text-sm font-bold mb-2 uppercase text-blue-300">
                  {key}
                </h3>
                <p className="text-white/70 text-lg leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
