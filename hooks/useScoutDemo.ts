'use client';
// hooks/useScoutDemo.ts — State machine for the SCOUT demo simulation.
// To connect a real backend: replace buildScoutRun() with an async fetch() call inside start().

import { useState, useRef, useCallback } from 'react';
import { DemoStage, ScoutRun } from '@/lib/types';
import { buildScoutRun } from '@/lib/presets';

// Timing delays for each stage (ms) — adjust to pace your live presentation
const STAGE_DELAYS: Record<DemoStage, number> = {
  idle: 0,
  initialize: 1200,
  strategy: 2800,
  waterfall: 6000,
  cascade: 4500,
  filter: 3500,
  output: 2000,
  complete: 0,
};

const STAGE_ORDER: DemoStage[] = [
  'idle',
  'initialize',
  'strategy',
  'waterfall',
  'cascade',
  'filter',
  'output',
  'complete',
];

export interface ScoutDemoHook {
  stage: DemoStage;
  run: ScoutRun | null;
  isPlaying: boolean;
  elapsedMs: number;
  start: (url: string) => void;
  reset: () => void;
  skipToEnd: () => void;
  currentStageIndex: number;
  totalStages: number;
}

export function useScoutDemo(): ScoutDemoHook {
  const [stage, setStage] = useState<DemoStage>('idle');
  const [run, setRun] = useState<ScoutRun | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [elapsedMs, setElapsedMs] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const cancelRef = useRef(false);

  const clearTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const start = useCallback((url: string) => {
    if (!url.trim()) return;

    // Cancel any existing run
    cancelRef.current = true;
    clearTimer();

    const scoutRun = buildScoutRun(url);
    setRun(scoutRun);
    setElapsedMs(0);
    setIsPlaying(true);
    cancelRef.current = false;

    // Start elapsed timer
    const startTime = Date.now();
    timerRef.current = setInterval(() => {
      setElapsedMs(Date.now() - startTime);
    }, 100);

    // Advance through stages sequentially
    const runStages = async () => {
      for (let i = 1; i < STAGE_ORDER.length; i++) {
        if (cancelRef.current) return;
        const nextStage = STAGE_ORDER[i];
        const delay = STAGE_DELAYS[nextStage] ?? 1500;
        await new Promise((r) => setTimeout(r, delay));
        if (cancelRef.current) return;
        setStage(nextStage);
        if (nextStage === 'complete') {
          clearTimer();
          setIsPlaying(false);
        }
      }
    };

    setStage('initialize');
    runStages();
  }, []);

  const reset = useCallback(() => {
    cancelRef.current = true;
    clearTimer();
    setStage('idle');
    setRun(null);
    setIsPlaying(false);
    setElapsedMs(0);
  }, []);

  const skipToEnd = useCallback(() => {
    if (!run) return;
    cancelRef.current = true;
    clearTimer();
    setStage('complete');
    setIsPlaying(false);
  }, [run]);

  const currentStageIndex = STAGE_ORDER.indexOf(stage);

  return {
    stage,
    run,
    isPlaying,
    elapsedMs,
    start,
    reset,
    skipToEnd,
    currentStageIndex,
    totalStages: STAGE_ORDER.length - 1, // exclude idle
  };
}
