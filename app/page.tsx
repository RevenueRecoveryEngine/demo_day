"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";

// 1. Import your slides here
import { TitleSlide } from "@/components/TitleSlide";
import { TeamSlide } from "@/components/TeamSlide";
import { IntroSlider } from "@/components/IntroSlider";
import { ChaosToScout } from "@/components/ChaosToScout";
import { ScoutFlow } from "@/components/ScoutFlow";
import { PostScoutRuntime } from "@/components/PostScoutRuntime";
import { OrchestrationSlide } from "@/components/OrchestrationSlide";
import { StoryTheMismatch } from "@/components/StoryTheMismatch";
import { StoryTheRootCause } from "@/components/StoryTheRootCause";
import { TheIndustryProblem } from "@/components/TheIndustryProblem";
import { TheBlueprint } from "@/components/TheBlueprint";
import { SystemNodes } from "@/components/SystemNodes";
import { TheHardTruths } from "@/components/TheHardTruths";
import { SystemArchitecture } from "@/components/SystemArchitecture";
import { LlmInconsistency } from "@/components/LlmInconsistency";
import { StoryLlmExtraction } from "@/components/TheExtraction";
import { JoinUsSlide } from "@/components/JoinUsSlide";
// =====================================================================
// 2. THE SLIDE MASTER LIST
// Edit this array to add, remove, or reorder slides.
// "steps" = how many times you press Next before the slide is finished.
// =====================================================================
const SLIDE_CONFIG = [
  { component: TitleSlide, steps: 1 },
  { component: TeamSlide, steps: 1 },
  { component: StoryTheMismatch, steps: 3 },
  { component: StoryTheRootCause, steps: 3 },
  { component: TheIndustryProblem, steps: 8 },
  { component: SystemArchitecture, steps: 2 }, // Must be 2
  { component: SystemNodes, steps: 5 }, // Must be 5
  { component: TheHardTruths, steps: 4 }, // Must be 4
  { component: ChaosToScout, steps: 2 }, // Must be 2
  { component: ScoutFlow, steps: 11 },
  { component: LlmInconsistency, steps: 5 },
  { component: StoryLlmExtraction, steps: 3 },
  { component: PostScoutRuntime, steps: 5 },
  { component: OrchestrationSlide, steps: 4 },
  { component: TheBlueprint, steps: 5 },
  { component: JoinUsSlide, steps: 2 },
];
// Automatically calculates total steps so you never have to manually update it again
const TOTAL_STEPS = SLIDE_CONFIG.reduce(
  (total, slide) => total + slide.steps,
  0,
);

export default function Home() {
  const [globalStep, setGlobalStep] = useState(0);
  const channelRef = useRef<BroadcastChannel | null>(null);

  useEffect(() => {
    channelRef.current = new BroadcastChannel("rre-demo-sync");

    // Listen for commands from the presenter dashboard
    channelRef.current.onmessage = (event) => {
      if (event.data.action === "setStep") {
        setGlobalStep(event.data.step);
      }
    };

    return () => {
      channelRef.current?.close();
    };
  }, []);

  const triggerNext = useCallback(() => {
    setGlobalStep((p) => {
      const next = Math.min(p + 1, TOTAL_STEPS - 1);
      channelRef.current?.postMessage({ action: "setStep", step: next });
      return next;
    });
  }, []);

  const triggerPrev = useCallback(() => {
    setGlobalStep((p) => {
      const prev = Math.max(p - 1, 0);
      channelRef.current?.postMessage({ action: "setStep", step: prev });
      return prev;
    });
  }, []);

  useEffect(() => {
    // Keyboard sync logic
    const handleKey = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      )
        return;

      if (["ArrowRight", "ArrowDown", " "].includes(e.key)) {
        e.preventDefault();
        triggerNext();
      } else if (["ArrowLeft", "ArrowUp"].includes(e.key)) {
        e.preventDefault();
        triggerPrev();
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => {
      window.removeEventListener("keydown", handleKey);
    };
  }, [triggerNext, triggerPrev]);

  // =====================================================================
  // 3. THE MAGICAL CALCULATOR
  // This loop automatically figures out which slide to show and what
  // internal animation frame to pass it, based on the global step.
  // =====================================================================
  let currentSlideIndex = 0;
  let internalStep = globalStep;

  for (let i = 0; i < SLIDE_CONFIG.length; i++) {
    if (internalStep < SLIDE_CONFIG[i].steps) {
      currentSlideIndex = i;
      break;
    }
    internalStep -= SLIDE_CONFIG[i].steps;
  }

  // Determine direction based on slide index change
  const prevSlideIndexRef = useRef(currentSlideIndex);
  const directionRef = useRef(1);
  if (currentSlideIndex !== prevSlideIndexRef.current) {
    directionRef.current = currentSlideIndex > prevSlideIndexRef.current ? 1 : -1;
    prevSlideIndexRef.current = currentSlideIndex;
  }
  const direction = directionRef.current;

  // Render the currently active slide, passing its internal step
  const ActiveSlideComponent = SLIDE_CONFIG[currentSlideIndex].component;

  // Global click handler to advance slides
  const handleGlobalClick = (e: React.MouseEvent) => {
    // Prevent advancing if clicking on buttons, links, or inputs
    if (
      (e.target as HTMLElement).closest("button") ||
      (e.target as HTMLElement).closest("a") ||
      (e.target as HTMLElement).closest("input") ||
      (e.target as HTMLElement).closest("textarea")
    ) {
      return;
    }
    triggerNext();
  };

  return (
    <main 
      className="w-full h-screen overflow-hidden bg-[#030712] relative select-none"
      onClick={handleGlobalClick}
    >
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentSlideIndex}
          custom={direction}
          initial={{ y: direction > 0 ? "100%" : "-100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: direction > 0 ? "-100%" : "100%", opacity: 0 }}
          transition={{
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1], // Cinematic smooth ease
          }}
          className="absolute inset-0 w-full h-full"
        >
          <ActiveSlideComponent step={internalStep} />
        </motion.div>
      </AnimatePresence>

      {/* Implicit Navigation Overlays so it still feels cinematic */}
      {globalStep > 0 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            triggerPrev();
          }}
          className="absolute bottom-6 left-6 z-50 p-4 text-white/10 hover:text-white/50 transition-colors flex items-center justify-center rounded-full hover:bg-white/5"
          title="Previous Step"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </button>
      )}

      {globalStep < TOTAL_STEPS - 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            triggerNext();
          }}
          className="absolute bottom-6 right-6 z-50 p-4 text-white/10 hover:text-white/50 transition-colors flex items-center justify-center rounded-full hover:bg-white/5"
          title="Next Step"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
        </button>
      )}
    </main>
  );
}
