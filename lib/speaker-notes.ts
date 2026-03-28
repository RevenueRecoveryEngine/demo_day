// lib/speaker-notes.ts — Speaker cue text for each section and demo stage.
// Edit these strings to update what appears in Presenter Mode during the demo.

export interface SpeakerNote {
  section: string;
  cue: string;
}

export const SECTION_NOTES: Record<string, SpeakerNote> = {
  hero: {
    section: 'Hero',
    cue: 'Open strong. This is about why scraping as a single step always breaks in production.',
  },
  problem: {
    section: 'The Problem',
    cue: 'Most teams ship a fetch-and-parse loop and call it done. Walk through why this fails at scale.',
  },
  'mental-model': {
    section: 'The Mental Model',
    cue: 'Reframe: scraping is a decision system, not a command. Three internal stages — strategy, extraction, filtering.',
  },
  demo: {
    section: 'Live SCOUT Demo',
    cue: 'Pick a preset URL and click Go. Walk through each stage as it appears. Emphasize the quality gate at the end.',
  },
  takeaway: {
    section: 'Final Takeaway',
    cue: 'Land the core message: SCOUT is not scraping — it is a quality gate. Every downstream decision depends on this stage being precise.',
  },
};

export const STAGE_NOTES: Record<string, string> = {
  idle: 'Choose a URL and click Go to begin the simulation.',
  initialize: 'SCOUT receives the product URL and begins the run. A run ID is created.',
  strategy: 'SCOUT resolves the domain against targets.json. If unknown, it falls back to a safe generic config.',
  waterfall: 'Tier 1: direct fetch + provider detection. If blocked, SCOUT escalates to ZenRows headless — no wasted calls.',
  cascade: 'Product data is enriched: Shopify JSON first, then headless state, then DOM/JSON-LD. Quality-first cascade.',
  filter: 'Raw signals are deduplicated, ranked, and capped to the top 30. Weak entries are discarded.',
  output: 'CRITIC receives a clean, structured handoff: scrape_id, listing_text, and shaped reviews.',
  complete: 'Run complete. SCOUT output is ready for CRITIC.',
};
