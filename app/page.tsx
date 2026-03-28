'use client';
// app/page.tsx — Ultra-Minimal Presentation Container

import { useState, useEffect } from 'react';
import { StoryIntro } from '@/components/StoryIntro';
import { ChaosToScout } from '@/components/ChaosToScout';
import { ScoutFlow } from '@/components/ScoutFlow';
import { PostScoutRuntime } from '@/components/PostScoutRuntime';
import { OrchestrationSlide } from '@/components/OrchestrationSlide';
import { PresenterModePanel } from '@/components/PresenterModePanel';

const SLIDES = ['story-intro', 'chaos-to-scout', 'scout-flow', 'post-scout-runtime', 'orchestration'];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [presenterMode, setPresenterMode] = useState(false);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      // Ignore key events inside inputs
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      switch (e.key) {
        case 'ArrowDown':
        case ' ':
        case 'ArrowRight':
          e.preventDefault();
          setCurrentSlide((prev) => Math.min(prev + 1, SLIDES.length - 1));
          break;
        case 'ArrowUp':
        case 'ArrowLeft':
          e.preventDefault();
          setCurrentSlide((prev) => Math.max(prev - 1, 0));
          break;
        case 'p':
        case 'P':
          setPresenterMode((m) => !m);
          break;
      }
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <main className="w-full h-screen overflow-hidden bg-[#030712]">
      {/* Active Slide */}
      {currentSlide === 0 && <StoryIntro />}
      {currentSlide === 1 && <ChaosToScout />}
      {currentSlide === 2 && <ScoutFlow />}
      {currentSlide === 3 && <PostScoutRuntime />}
      {currentSlide === 4 && <OrchestrationSlide />}

      {/* Navigation dots */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-3">
        {SLIDES.map((id, i) => (
          <button
            key={id}
            onClick={() => setCurrentSlide(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              i === currentSlide
                ? 'bg-violet-400 scale-125 shadow-[0_0_10px_rgba(139,92,246,0.6)]'
                : 'bg-white/15 hover:bg-white/35'
            }`}
          />
        ))}
      </div>

      {/* Presenter Mode Panel */}
      <PresenterModePanel
        isVisible={presenterMode}
        currentSection={SLIDES[currentSlide]}
        currentStage={'idle'} // simplified for minimal layout
        sectionIndex={currentSlide}
        totalSections={SLIDES.length}
      />

      {/* Keyboard hint */}
      <div className="fixed top-6 left-6 z-30 flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur text-white/30 text-xs shadow-xl pointer-events-none">
        <span>Space / Arrows to navigate</span>
        <span className="w-px h-3 bg-white/15" />
        <span>P for presenter mode</span>
      </div>
    </main>
  );
}
