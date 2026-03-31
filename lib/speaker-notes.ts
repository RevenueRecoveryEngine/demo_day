import type { DemoStage } from '@/lib/types';

export const MASTER_SCRIPT = [
  // Slide 0: Title Screen (1 click)
  `Hello everyone, we are Team 6, and our project is RRE: the Revenue Recovery Engine.`,

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
  // Slide 5: System Architecture (2 clicks)
  // ==========================================
  /* Click 1 */ `This is the end-to-end architecture we built. We use Next.js and Supabase for the core, with Inngest reliably orchestrating our background jobs and data pipelines.`,

  /* Click 2 */ `But the real magic happens right here in the middle, in the AI pipeline. It consists of three specialized agents working together:`,

  // ==========================================
  // Slide 6: The System Nodes (5 clicks)
  // ==========================================
  /* Click 1 */ `First, SCOUT, which is responsible for aggressively scraping the product listings, specs, and reviews.`,

  /* Click 2 */ `Then CRITIC takes over, turning that messy text into structured expectation gaps.`,

  /* Click 3 */ `Finally, PRESCRIBER acts on those gaps, flagging the exact problems in the listing...`,

  /* Click 4 */ `...and outputting the final surgical edits.`,

  /* Click 5 */ `But a system diagram is just theory until you see it execute. Let me show you this exact stack in action. Let’s jump into the live demo.`,

  // *** [PAUSE PRESENTATION, ALT-TAB TO BROWSER FOR 5 MINUTE DEMO] ***

  // ==========================================
  // Slide 7: The Hard Truths (4 clicks)
  // ==========================================
  // *** [TAB BACK TO PRESENTATION] ***
  /* Click 1 */ `You just saw it work seamlessly. But here is what we learned actually building it:`,
  /* Click 2 */ `If your data pipeline is weak, your AI is useless.`,
  /* Click 3 */ `If your scraping breaks, your system lies.`,
  /* Click 4 */ `And if your output isn’t defensible, it’s just guesswork with better branding.
  So we’re going to show you what most people avoid: how to actually build this properly.
  Starting with the absolute hardest part: scraping.`,


  // Slide 5: ChaosToScout (2 steps)
  `Let me show you what actually happens when you try to pull data from the web.

On the surface, it feels simple...
you open the page, you read the HTML, you grab the data.

But once you’re in it, you realize pretty quickly... it’s not that easy.

Websites are messy.
Some pages block you.
And a lot of the time, the data you do get back is incomplete... or just wrong.

And then your AI starts making decisions based on bad information.

That’s the real problem.`,

  `So, instead of treating scraping like a simple step... we treated it like something that needs to think.

That’s where SCOUT comes in.

Because SCOUT isn’t a tool.
It’s a system that decides how to get the data.`,

  // Slide 6: ScoutFlow (11 steps)
  `Now, here’s how it works.
First, strategy.
  `,

  `It looks at the website, and it decides how to handle it.
If it knows the site, it uses a precise plan.
If it doesn’t, it falls back to a safe approach.`,

  `Then comes extraction.`,

  `SCOUT doesn’t rely on one method.

It starts simple... and if that doesn’t work, it moves up to more advanced approaches—like simulating a real browser.

`,

  `And while it’s doing that, it’s also looking for the best source of data.`,

  `It starts with structured data first...
then it looks for hidden data...
and if it has to, it falls all the way back to the raw page.

All the way through, it’s prioritizing quality.`,

  `And then, finally, filtering.`,

  `It strips out duplicates...
keeps only what’s actually useful...
and stays focused on what really matters.`,

  `Because more data isn’t better.

Better data is better.`,

  `And in the end... SCOUT gives you clean, reliable data.`,

  // Slide 7: PostScoutRuntime (5 steps)
  `That’s really the key idea.

The web is messy.

SCOUT makes it clear.

It doesn’t just collect data.

It decides how to get the right data.

But here’s the thing... getting clean data is only half the problem.

Because once you have it, you trust your AI to make a decision.

And that’s where things break again.

Youssef will show you why.`,

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

It’s the foundation.`,
  `Rec`,
  `Rec`,
];

export interface SectionNote {
  section: string;
  cue: string;
}

export const SECTION_NOTES: Record<string, SectionNote> = {
  intro: {
    section: 'Opening',
    cue: 'Set the context and the stakes before the technical deep dive.',
  },
  problem: {
    section: 'Problem',
    cue: 'Anchor every point in return-rate impact and listing ambiguity.',
  },
  solution: {
    section: 'Solution',
    cue: 'Frame SCOUT, CRITIC, and PRESCRIBER as one reliability pipeline.',
  },
  demo: {
    section: 'Live Demo',
    cue: 'Narrate decisions and evidence, not just interface actions.',
  },
  close: {
    section: 'Closing',
    cue: 'Reinforce consistency, defensibility, and measurable business outcome.',
  },
};

export const STAGE_NOTES: Partial<Record<DemoStage, string>> = {
  idle: 'Set the goal and expected output before triggering the flow.',
  initialize: 'Confirm the product URL and explain why setup quality matters.',
  strategy: 'Explain known-domain strategy detection and fallback logic.',
  waterfall: 'Walk through extraction tiers and why escalation is controlled.',
  cascade: 'Show source prioritization: structured data first, DOM last.',
  filter: 'Highlight dedupe, weak-signal removal, and evidence ranking.',
  output: 'Summarize the final evidence package and business decision readiness.',
  complete: 'Close with reliability gains and next operational step.',
};
