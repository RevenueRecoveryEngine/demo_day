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

export const MASTER_SCRIPT = [
  // Slide 0: Story Intro
  "Welcome. Let's talk about the Revenue Recovery Engine and why scraping as a single step is a broken mental model.",
  "Without RRE, vague listings create expectation gaps, resulting in high return risks.",
  "With RRE, we set accurate expectations. We don't guess; we collect evidence.",

  // Slide 1: Chaos To System
  "Most teams treat scraping as a single step—fetch HTML and hope it works. That fails in real-world conditions.",
  "SCOUT is different. It is an intelligent decision system, not just a scraper.",

  // Slide 2: Scout Flow (11 states for nodes + popups)
  "Let's look at the SCOUT flow. It starts with the URL.",
  "First, Strategy. RRE decides how to approach the site before collecting any evidence.",
  "We analyze the domain, pagination type, and anti-bot tier to build an exact extraction plan.",
  "Next, Waterfall Execution. We escalate only when cheaper methods fail.",
  "We try API, then HTML, and only use headless browsers as a last resort.",
  "Then, Cascade Resolution. We need the cleanest product context possible.",
  "We check Shopify native JSON, headless state, and finally DOM fallback.",
  "Finally, the Quality Gate. This is crucial.",
  "We deduplicate, rank signals, and cap the reviews. Weak data is discarded here.",
  "The final structured output is now ready...",
  "...and this clean payload is handed off to CRITIC.",

  // Slide 3: Post Scout Runtime
  "Now, let's see what happens after SCOUT. Unstructured data arrives.",
  "CRITIC (our LLM) analyzes the data to extract expectation gaps and attributes.",
  "Then, a deterministic TypeScript logic gate checks required pillars. Code catches what AI misses.",
  "PRESCRIBER takes these gaps and drafts surgical edits for the listing.",
  "Finally, a TypeScript Safety Gate scans for numeric hallucinations before anything ships.",

  // Slide 4: Orchestration
  "All of this runs on Inngest for orchestration. Here is the pipeline.",
  "Without orchestration, a single failure breaks the whole chain and progress is lost.",
  "With Inngest, state persists. If CRITIC fails, it retries right there. PRESCRIBER just waits.",
  "Three agents. Zero babysitting. Resilient, observable, and perfectly coordinated."
];