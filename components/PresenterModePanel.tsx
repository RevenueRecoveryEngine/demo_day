'use client';
// components/PresenterModePanel.tsx — Discreet bottom bar for speaker notes during live presentation.
// Toggle with the 'p' key. Shows current section, stage, and speaker cue text.

import { motion, AnimatePresence } from 'framer-motion';
import { Mic, ChevronRight } from 'lucide-react';
import { DemoStage } from '@/lib/types';
import { SECTION_NOTES, STAGE_NOTES } from '@/lib/speaker-notes';

interface PresenterModePanelProps {
  isVisible: boolean;
  currentSection: string;
  currentStage: DemoStage;
  sectionIndex: number;
  totalSections: number;
}

export function PresenterModePanel({
  isVisible,
  currentSection,
  currentStage,
  sectionIndex,
  totalSections,
}: PresenterModePanelProps) {
  const note = SECTION_NOTES[currentSection];
  const stageCue = STAGE_NOTES[currentStage] ?? '';

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-t border-white/10"
        >
          <div className="max-w-6xl mx-auto px-6 py-3 flex items-center gap-6">
            {/* Presenter badge */}
            <div className="flex items-center gap-2 text-violet-400 shrink-0">
              <Mic className="w-4 h-4" />
              <span className="text-xs font-semibold uppercase tracking-widest">Presenter</span>
            </div>

            {/* Divider */}
            <div className="w-px h-8 bg-white/10 shrink-0" />

            {/* Section info */}
            <div className="shrink-0">
              <p className="text-xs text-white/40 uppercase tracking-wider">Section</p>
              <p className="text-sm font-medium text-white">{note?.section ?? currentSection}</p>
            </div>

            {/* Divider */}
            <ChevronRight className="w-4 h-4 text-white/20 shrink-0" />

            {/* Cue text */}
            <p className="text-sm text-white/70 flex-1 leading-relaxed line-clamp-2">
              {currentSection === 'demo' && currentStage !== 'idle'
                ? stageCue
                : note?.cue ?? ''}
            </p>

            {/* Progress dots */}
            <div className="flex items-center gap-1.5 shrink-0">
              {Array.from({ length: totalSections }).map((_, i) => (
                <div
                  key={i}
                  className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                    i === sectionIndex ? 'bg-violet-400' : i < sectionIndex ? 'bg-white/40' : 'bg-white/15'
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
