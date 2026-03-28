// lib/types.ts — Core TypeScript interfaces for the SCOUT simulation data model.
// Replace the simulation logic layer with real API calls when connecting to a backend.

export type StepStatus = 'pending' | 'active' | 'success' | 'failed' | 'skipped';

export interface ExtractionStep {
  id: string;
  label: string;
  tier: 1 | 2 | 3;
  status: StepStatus;
  note?: string;
  isEscalation?: boolean;
}

export interface CascadeStep {
  id: string;
  label: string;
  description: string;
  status: StepStatus;
  note?: string;
}

export interface FilterStats {
  rawCount: number;
  afterDedup: number;
  afterWeakRemoval: number;
  finalCount: number;
  warningFlags: string[];
}

export interface TopSignal {
  text: string;
  rating: number;
  signalScore: number;
}

export interface OutputSummary {
  scrapeId: string;
  strategy: string;
  listingTextSource: string;
  reviewCount: number;
  topSignals: TopSignal[];
  status: 'ready' | 'warning' | 'failed';
  warnings?: string[];
}

export interface ScoutRun {
  inputUrl: string;
  detectedDomain: string;
  strategy: string;
  paginationType: string;
  antiBotTier: string;
  isKnownDomain: boolean;
  extractionSteps: ExtractionStep[];
  cascadeSteps: CascadeStep[];
  filterStats: FilterStats;
  outputSummary: OutputSummary;
}

export type DemoStage =
  | 'idle'
  | 'initialize'
  | 'strategy'
  | 'waterfall'
  | 'cascade'
  | 'filter'
  | 'output'
  | 'complete';

export interface DemoState {
  stage: DemoStage;
  stepIndex: number;
  run: ScoutRun | null;
  isPlaying: boolean;
  elapsedMs: number;
}
