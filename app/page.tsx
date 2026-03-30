"use client";

import { useState, useEffect } from "react";

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
  { component: SystemNodes, steps: 5 },
  { component: TheHardTruths, steps: 4 },
  { component: SystemArchitecture, steps: 3 },
  { component: ChaosToScout, steps: 2 },
  { component: ScoutFlow, steps: 11 },
  { component: LlmInconsistency, steps: 5 },
  { component: StoryLlmExtraction, steps: 3 },
  { component: PostScoutRuntime, steps: 5 },
  { component: OrchestrationSlide, steps: 4 },
  { component: TheBlueprint, steps: 5 },
];
// Automatically calculates total steps so you never have to manually update it again
const TOTAL_STEPS = SLIDE_CONFIG.reduce(
  (total, slide) => total + slide.steps,
  0,
);

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

    // Keyboard sync logic
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

  // Render the currently active slide, passing its internal step
  const ActiveSlideComponent = SLIDE_CONFIG[currentSlideIndex].component;

  return (
    <main className="w-full h-screen overflow-hidden bg-[#030712]">
      <ActiveSlideComponent step={internalStep} />
    </main>
  );
}
