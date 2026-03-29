"use client";

import { useState, useEffect } from "react";
import { IntroSlider } from "@/components/IntroSlider";
import { ChaosToScout } from "@/components/ChaosToScout";
import { ScoutFlow } from "@/components/ScoutFlow";
import { PostScoutRuntime } from "@/components/PostScoutRuntime";
import { OrchestrationSlide } from "@/components/OrchestrationSlide";

const TOTAL_STEPS = 25;

export default function Home() {
  const [globalStep, setGlobalStep] = useState(0);

  useEffect(() => {
    const channel = new BroadcastChannel("rre-demo-sync");

    // Listen for commands from the presenter dashboard
    channel.onmessage = (event) => {
      if (event.data.action === "setStep") {
        setGlobalStep(event.data.step);
      }
    };

    // If you use the keyboard on the main window, it syncs back to the presenter
    const handleKey = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      )
        return;

      if (["ArrowRight", "ArrowDown", " "].includes(e.key)) {
        e.preventDefault();
        setGlobalStep((p) => {
          const next = Math.min(p + 1, TOTAL_STEPS - 1);
          channel.postMessage({ action: "setStep", step: next });
          return next;
        });
      } else if (["ArrowLeft", "ArrowUp"].includes(e.key)) {
        e.preventDefault();
        setGlobalStep((p) => {
          const prev = Math.max(p - 1, 0);
          channel.postMessage({ action: "setStep", step: prev });
          return prev;
        });
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => {
      channel.close();
      window.removeEventListener("keydown", handleKey);
    };
  }, []);

  // Map the global step to the correct slide and internal animation state
  let currentSlide = 0;
  let internalStep = 0;

  if (globalStep < 3) {
    currentSlide = 0;
    internalStep = globalStep;
  } else if (globalStep < 5) {
    currentSlide = 1;
    internalStep = globalStep - 3;
  } else if (globalStep < 16) {
    currentSlide = 2;
    internalStep = globalStep - 5;
  } else if (globalStep < 21) {
    currentSlide = 3;
    internalStep = globalStep - 16;
  } else {
    currentSlide = 4;
    internalStep = globalStep - 21;
  }

  return (
    <main className="w-full h-screen overflow-hidden bg-[#030712]">
      {currentSlide === 0 && <IntroSlider step={internalStep} />}
      {currentSlide === 1 && <ChaosToScout step={internalStep} />}
      {currentSlide === 2 && <ScoutFlow step={internalStep} />}
      {currentSlide === 3 && <PostScoutRuntime step={internalStep} />}
      {currentSlide === 4 && <OrchestrationSlide step={internalStep} />}
    </main>
  );
}
