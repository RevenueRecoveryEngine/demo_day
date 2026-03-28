'use client';
// components/StoryIntro.tsx — Slide 0: Before & After Storytelling

import { useState, useEffect } from 'react';
import { IntroSlider } from './IntroSlider';

export function StoryIntro() {
  const [introStep, setIntroStep] = useState(0); // 0: Before, 1: After, 2: Transition
  const [isFinished, setIsFinished] = useState(false);

  // Keyboard navigation logic
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      // Ignore key events inside inputs
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      const isNext = ['ArrowDown', ' ', 'ArrowRight'].includes(e.key);
      const isPrev = ['ArrowUp', 'ArrowLeft'].includes(e.key);

      if (isNext) {
        if (isFinished) {
          // Let it propagate to page.tsx to switch to the next slide
          return;
        }

        e.preventDefault();
        e.stopImmediatePropagation();

        if (introStep < 2) {
          setIntroStep((prev) => prev + 1);
        } else {
          setIsFinished(true); // Next click goes to next slide
        }
      } else if (isPrev) {
        if (introStep === 0) {
          // Let it propagate back (though it's the first slide)
          return;
        }

        e.preventDefault();
        e.stopImmediatePropagation();

        if (isFinished) {
          setIsFinished(false);
          setIntroStep(2);
        } else if (introStep > 0) {
          setIntroStep((prev) => prev - 1);
        }
      }
    };
    
    // true = Use capture to fire BEFORE page.tsx listener
    window.addEventListener('keydown', handleKey, true);
    return () => window.removeEventListener('keydown', handleKey, true);
  }, [introStep, isFinished]);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#030712]">
      {/* IntroSlider handles its own exit animations natively when its step changes */}
      <IntroSlider step={introStep} />
    </div>
  );
}
