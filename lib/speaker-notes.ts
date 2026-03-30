export const MASTER_SCRIPT = [
  // Slide 0: Title Screen (1 click)
  `Hello everyone we are team 6, 
and our project is RRE lets dive deep into it`,
  
  // Slide 1: Team Screen (1 click)
  `and this our team`,

  // Slide 2: The Mismatch (3 clicks)
  `so imagine You run an online auto parts store.`,
  
  `A customer orders a brake caliper.`, 
`It arrives… and it doesn’t fit.`,
  
  `Not because it’s broken. 
Because your listing was vague.`,

  // Slide 3: The Root Cause (3 clicks)
  `“Fits Ford F-150.”
  
  That’s it. 

No year. No trim. No constraints.`,
  
  `And now you pay for the return.`,

// Slide 4: The Industry Problem (8 clicks)
  `This is not an edge case. 

This is the industry.`,

  `15 to 20 percent return rates… and people call that normal. 

It’s not normal. 

It’s what happens when nobody takes product truth seriously.`,

  `And here’s the part that’s actually embarrassing: 
Everyone knows this problem exists. 

And still… the solution is always the same:`,

  `Another dashboard.`,

  `Another graph.`,

  `Another “AI insight” that tells you something you already knew.`,

  `That doesn’t fix anything.`,

  `So we did something different. 
We built the Revenue Recovery Engine.

A system that doesn’t just analyze data…

it tells you exactly where your listing is wrong,
why customers are failing,
and what to change — with evidence.`,
// ==========================================
  // Slide 5: The System Nodes (5 clicks)
  // ==========================================
  `It consistes of Three parts:`,
  `SCOUT which is resposible for scraping the product listing and reviews`,
  `CRITIC  which turns the listings and reviews from messy text into structured expectation gaps`,
  `PRESCRIBER that prescribes edits and flags problems in the listing`,
  `Outputting the final surgical edits.`,

  // ==========================================
  // Slide 6: The Hard Truths (4 clicks)
  // ==========================================
  `And here’s what we learned building it:`,
  `If your data pipeline is weak, your AI is useless.`,
  `If your scraping breaks, your system lies.`,
  `If your output isn’t defensible, it’s just guesswork with better branding.`,

  // ==========================================
  // Slide 7: System Architecture Photo (3 clicks)
  // ==========================================
  `So instead of showing you another polished demo…`,
  `we’re going to show you what most people avoid: how to actually build this properly.`,
  `Starting with scraping.`,

  // --- NEW SCOUT SLIDES ---

  // Slide 5: ChaosToScout (2 steps)
  `Let me show you what really happens when you try to extract data from the web.

You start with a simple idea:
fetch the page, parse the HTML, get your data.

But in reality, the web fights back.

Pages are inconsistent.
Providers are hidden.
Anti-bot systems block you.
And the data you get is noisy and unreliable.

So your AI ends up making decisions on bad input.

That’s the real problem.`,

  `Now, instead of treating scraping as a simple step,
we treated it as a system that needs to think.

That’s where SCOUT comes in.

SCOUT is not a scraper.
It’s a decision engine designed to navigate this chaos.`,

  // Slide 6: ScoutFlow (11 steps)
  `When a user submits a product URL, SCOUT takes over.`,

  `First, strategy.
  It looks at the domain and decides how to approach it —
pagination, anti-bot behavior, structure.

If it knows the site, it uses a precise plan.
If not, it falls back to a safe default.`,

  `Then comes extraction.`,

  `SCOUT doesn’t rely on one method.

It starts simple — direct extraction and known providers.

If that fails, it escalates to headless scraping like ZenRows,
and can fall back to Apify.`,

  `At the same time, it looks for the best data source:`,

  `Shopify JSON first, then headless state, then DOM.

Always prioritizing signal over noise.`,

  `And finally, filtering.`,

  `It cleans the data, removes duplicates, ranks by signal strength,
and keeps only the most meaningful insights.`,

  `Because more data is not better.

Better data is better.`,

  `At the end, SCOUT delivers structured, reliable evidence.`,

  // Slide 7: PostScoutRuntime (5 steps)
  `And this is the key idea:

The web is chaotic.

  SCOUT brings structure.

  It doesn’t just scrape.

It decides.

  And that’s why it’s not an ingestion step.

  It’s a quality gate for everything that comes next.`,

  `The data is in. Here is exactly what NOT to do next.`,

  `Do not hand it to an LLM expecting a reliable business decision. Because you won't get one.`,

  `LLMs are non-deterministic. Run the exact same input twice, you get two different answers.`,

  `Meanwhile, your system doesn’t wait. It already acted on one of those outputs.`,

  `In our case, that means telling a merchant to change their product listing — and they apply it. At that point, it’s not just an AI response anymore. It’s a business decision based on something that isn’t consistent.`,

  // ==========================================
  // Slide 11: The Extraction (3 clicks)
  // ==========================================
  `So instead of asking what the LLM can do,`,

  `focus on where it fails —`,

  `and removed it from those parts.`,
  `in our case 
After SCOUT, everything goes into CRITIC.`,

`CRITIC finds where the listing says one thing and customers report something else.

We still use an LLM, but only to extract structured attributes. No decisions, just turning text into structured data.`,

`From here, deterministic code takes over. We validate against a strict schema. If a data point is missing, the logic gate handles it. No second model calls. No guessing.`,
  `Then PRESCRIBER takes those gaps and suggests edits, but only when they’re clearly supported by the data. If the evidence isn’t there, it doesn’t try to fill it in. It flags it.`,

  `The principle is simple. Don’t ask AI to do things it’s bad at. LLMs are excellent at transforming language, but unreliable when you expect precision.

If you don’t know the difference, you shouldn’t be building with them.

Jibin, tell them how we kept this system running reliably on serverless infrastructure.`,
// Slide 8: OrchestrationSlide (4 steps)
  `So our pipeline is simple on the surface — SCOUT scrapes, CRITIC analyses, PRESCRIBER drafts the fix.`,

  `That's 3 separate AI operations. Each one can be slow. Each one can fail mid-process.
Chaining them together and hoping nothing breaks? That's a huge risk in production.`,

  `So to solve that, we use Inngest — a durable workflow engine that controls traffic through the pipeline. Every step is registered as an isolated job.
If SCOUT finishes but CRITIC crashes halfway through, Inngest doesn't restart the whole pipeline — it retries from the failed stage. No polling loops. No always-on server. No manual retry logic.`,

  `Each job is also observable — we can see in real time which step is running, how long it took, and what failed. During development, that alone saved us hours of debugging.
The result: a pipeline that runs on serverless infrastructure, handles LLM timeouts gracefully, and doesn't need babysitting.
That's how three AI agents stay coordinated — without falling apart.`,
// ==========================================
  // Slide 9: The Blueprint (5 clicks)
  // ==========================================
  `And to close this — none of this works without alignment.`,

  `In systems like this, the biggest risk isn’t complexity. 

It’s drift.`,

  `So we built a single source of truth. 

A blueprint that defines how the system behaves and what “correct” means.`,

  `And when something is unclear, we don’t guess. 

We go back to it.`,

  `Because consistency isn’t optional. 

It’s the foundation.`
];