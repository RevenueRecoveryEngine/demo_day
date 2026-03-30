"use client";

import { motion } from "framer-motion";

export function SystemArchitecture({ step }: { step: number }) {
  // Step 0: Shows the full architecture
  // Step 1: Highlights the middle AI pipeline

  const isHighlighted = step >= 1;

  return (
    <div className="flex flex-col items-center justify-center w-full h-full bg-[#030712] text-white relative p-12 overflow-hidden">
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .rre-diagram {
          --bg: #0a0c10; --surface: #111318; --border: #1e2230; --border-bright: #2d3347;
          --text: #e8eaf2; --muted: #6b7290; --accent-green: #00e5a0; --accent-blue: #3d8bff;
          --accent-amber: #ffb340; --accent-purple: #9b6dff; --accent-red: #ff5f6d;
          --layer-1: #141720; --layer-2: #0e1117; background: var(--bg); color: var(--text);
          font-family: 'Syne', sans-serif; border-radius: 12px; padding: 32px;
        }
        .rre-diagram * { box-sizing: border-box; margin: 0; padding: 0; }
        .rre-diagram-header { text-align: center; margin-bottom: 40px; }
        .rre-diagram-header h1 { font-size: 32px; font-weight: 800; letter-spacing: -0.02em; line-height: 1.2; }
        .rre-diagram-header h1 span { color: var(--accent-green); }
        .rre-diagram-header p { margin-top: 8px; color: var(--muted); font-size: 13px; font-family: 'DM Mono', monospace; letter-spacing: 0.05em; }
        .arch-grid { display: grid; grid-template-columns: 1fr 2fr 1fr; gap: 16px; width: 100%; position: relative; }
        .arch-section { background: var(--surface); border: 1px solid var(--border); border-radius: 12px; padding: 16px; transition: border-color 0.2s; }
        .arch-section:hover { border-color: var(--border-bright); }
        .section-label { font-family: 'DM Mono', monospace; font-size: 9px; letter-spacing: 0.2em; text-transform: uppercase; margin-bottom: 12px; display: flex; align-items: center; gap: 8px; }
        .section-label::before { content: ''; display: inline-block; width: 6px; height: 6px; border-radius: 50%; }
        .label-green .section-label::before { background: var(--accent-green); }
        .label-blue .section-label::before { background: var(--accent-blue); }
        .label-amber .section-label::before { background: var(--accent-amber); }
        .label-purple .section-label::before { background: var(--accent-purple); }
        .label-red .section-label::before { background: var(--accent-red); }
        .label-green .section-label { color: var(--accent-green); }
        .label-blue .section-label { color: var(--accent-blue); }
        .label-amber .section-label { color: var(--accent-amber); }
        .label-purple .section-label { color: var(--accent-purple); }
        .label-red .section-label { color: var(--accent-red); }
        .arch-section h2 { font-size: 14px; font-weight: 700; margin-bottom: 4px; letter-spacing: -0.01em; }
        .arch-section p.desc { font-size: 11px; color: var(--muted); line-height: 1.5; margin-bottom: 12px; font-family: 'DM Mono', monospace; }
        .chips { display: flex; flex-wrap: wrap; gap: 6px; }
        .chip { font-family: 'DM Mono', monospace; font-size: 9px; padding: 3px 8px; border-radius: 4px; border: 1px solid; letter-spacing: 0.04em; }
        .chip-green { color: var(--accent-green); border-color: rgba(0,229,160,0.25); background: rgba(0,229,160,0.07); }
        .chip-blue  { color: var(--accent-blue);  border-color: rgba(61,139,255,0.25); background: rgba(61,139,255,0.07); }
        .chip-amber { color: var(--accent-amber); border-color: rgba(255,179,64,0.25);  background: rgba(255,179,64,0.07); }
        .chip-purple{ color: var(--accent-purple);border-color: rgba(155,109,255,0.25); background: rgba(155,109,255,0.07); }
        .chip-red   { color: var(--accent-red);   border-color: rgba(255,95,109,0.25);  background: rgba(255,95,109,0.07); }
        .chip-muted { color: var(--muted); border-color: var(--border); background: transparent; }
        .pipeline { grid-column: 2; grid-row: 1 / 4; background: var(--layer-2); border: 1px solid var(--border-bright); border-radius: 16px; padding: 20px; box-shadow: 0 0 60px rgba(61,139,255,0.04) inset; }
        .pipeline-inner { display: flex; flex-direction: column; align-items: center; gap: 0; position: relative; }
        .agent { width: 100%; background: var(--surface); border-radius: 10px; padding: 14px; position: relative; z-index: 2; }
        .agent-icon { font-size: 20px; margin-bottom: 4px; }
        .agent-name { font-size: 13px; font-weight: 700; letter-spacing: -0.01em; }
        .agent-sub { font-family: 'DM Mono', monospace; font-size: 9px; color: var(--muted); margin-top: 3px; margin-bottom: 10px; line-height: 1.5; }
        .agent-scout  { border: 1px solid rgba(61,139,255,0.5); }
        .agent-critic { border: 1px solid rgba(255,179,64,0.5); }
        .agent-prescriber { border: 1px solid rgba(0,229,160,0.5); }
        .agent-scout .agent-name  { color: var(--accent-blue); }
        .agent-critic .agent-name { color: var(--accent-amber); }
        .agent-prescriber .agent-name { color: var(--accent-green); }
        .arrow { display: flex; flex-direction: column; align-items: center; padding: 4px 0; z-index: 1; }
        .arrow-line { width: 1px; height: 20px; background: linear-gradient(to bottom, var(--border-bright), var(--border)); }
        .arrow-head { font-size: 10px; color: var(--muted); margin-top: -4px; }
        .arrow-label { font-family: 'DM Mono', monospace; font-size: 8px; color: var(--muted); letter-spacing: 0.1em; text-transform: uppercase; margin-top: 2px; }
        .demo-badge { display: inline-flex; align-items: center; gap: 6px; background: rgba(155,109,255,0.12); border: 1px solid rgba(155,109,255,0.35); border-radius: 6px; padding: 6px 12px; font-family: 'DM Mono', monospace; font-size: 9px; color: var(--accent-purple); margin-top: 10px; width: 100%; }
        .orchestrator-badge { width: 100%; background: rgba(61,139,255,0.08); border: 1px solid rgba(61,139,255,0.3); border-radius: 8px; padding: 8px 12px; margin-bottom: 12px; font-family: 'DM Mono', monospace; font-size: 9px; color: var(--accent-blue); letter-spacing: 0.08em; text-align: center; }
        .left-col  { grid-column: 1; display: flex; flex-direction: column; gap: 16px; grid-row: 1 / 4; }
        .right-col { grid-column: 3; display: flex; flex-direction: column; gap: 16px; grid-row: 1 / 4; }
        `,
        }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-6xl flex flex-col items-center relative"
      >
        <div className="w-full bg-[#0a0c10] border border-white/10 rounded-xl overflow-hidden shadow-[0_0_50px_rgba(139,92,246,0.15)] relative">
          <div className="rre-diagram scale-[0.90] origin-top">
            <div className="rre-diagram-header">
              <h1>
                Revenue Recovery Engine
                <br />
                <span>System Architecture</span>
              </h1>
              <p>
                SCOUT → CRITIC → PRESCRIBER · Next.js · Supabase · Inngest ·
                Azure
              </p>
            </div>

            <div className="arch-grid">
              {/* LEFT COLUMN - Fades back on highlight */}
              <motion.div
                animate={{
                  opacity: isHighlighted ? 0.3 : 1,
                  filter: isHighlighted ? "blur(2px)" : "blur(0px)",
                }}
                transition={{ duration: 0.6 }}
                className="left-col"
              >
                <div className="arch-section label-green">
                  <div className="section-label">01 · Frontend / UI</div>
                  <h2>Browser Interface</h2>
                  <p className="desc">
                    Merchant pastes a URL. Results stream back live.
                  </p>
                  <div className="chips">
                    <span className="chip chip-green">React / Next.js</span>
                    <span className="chip chip-muted">Results Dashboard</span>
                  </div>
                </div>

                <div className="arch-section label-blue">
                  <div className="section-label">02 · Backend & Infra</div>
                  <h2>Next.js API Server</h2>
                  <p className="desc">
                    Serverless routes that trigger the pipeline and return
                    results.
                  </p>
                  <div className="chips">
                    <span className="chip chip-blue">POST /api/start</span>
                    <span className="chip chip-muted">
                      Inngest Event Trigger
                    </span>
                  </div>
                </div>

                <div className="arch-section label-red">
                  <div className="section-label">05 · External Services</div>
                  <h2>Data Sources</h2>
                  <p className="desc">
                    Live e-commerce storefronts scraped on demand.
                  </p>
                  <div className="chips">
                    <span className="chip chip-red">Scraper Layer</span>
                    <span className="chip chip-muted">
                      Product Page Ingestion
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* CENTER PIPELINE - Pops up and glows on highlight */}
              <motion.div
                animate={{
                  scale: isHighlighted ? 1.05 : 1,
                  boxShadow: isHighlighted
                    ? "0 0 80px rgba(61,139,255,0.2) inset, 0 0 60px rgba(61,139,255,0.4)"
                    : "0 0 60px rgba(61,139,255,0.04) inset",
                  zIndex: isHighlighted ? 10 : 1,
                }}
                transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
                className="pipeline label-blue"
              >
                <div className="section-label">03 · AI / ML Pipeline</div>
                <div className="pipeline-inner">
                  <div className="orchestrator-badge">
                    ⚡ INNGEST WORKERS — Orchestration · Step retry + backoff
                  </div>

                  <div className="agent agent-scout">
                    <div className="agent-icon">🔍</div>
                    <div className="agent-name">SCOUT Agent</div>
                    <div className="agent-sub">
                      Scrapes product data & competitor landscape
                    </div>
                    <div className="chips">
                      <span className="chip chip-blue">Vertex AI / Gemini</span>
                      <span className="chip chip-muted">Product Scrape</span>
                    </div>
                  </div>

                  <div className="arrow">
                    <div className="arrow-line"></div>
                    <div className="arrow-head">▼</div>
                    <div className="arrow-label">Structured Data</div>
                  </div>

                  <div className="agent agent-critic">
                    <div className="agent-icon">🧠</div>
                    <div className="agent-name">CRITIC Agent · Phase 1</div>
                    <div className="agent-sub">
                      Extracts pricing signals & listing gaps
                    </div>
                    <div className="chips">
                      <span className="chip chip-amber">Fact Extraction</span>
                    </div>
                  </div>

                  <div className="arrow">
                    <div className="arrow-line"></div>
                    <div className="arrow-head">▼</div>
                    <div className="arrow-label">Extracted Signals</div>
                  </div>

                  <div className="agent agent-prescriber">
                    <div className="agent-icon">💊</div>
                    <div className="agent-name">PRESCRIBER Agent</div>
                    <div className="agent-sub">
                      Drafts ranked revenue recovery playbooks
                    </div>
                    <div className="chips">
                      <span className="chip chip-green">
                        Intervention Drafting
                      </span>
                      <span className="chip chip-muted">
                        Prescriptions → DB
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* RIGHT COLUMN - Fades back on highlight */}
              <motion.div
                animate={{
                  opacity: isHighlighted ? 0.3 : 1,
                  filter: isHighlighted ? "blur(2px)" : "blur(0px)",
                }}
                transition={{ duration: 0.6 }}
                className="right-col"
              >
                <div className="arch-section label-purple">
                  <div className="section-label">04 · Database & Storage</div>
                  <h2>Supabase · Source of Truth</h2>
                  <p className="desc">
                    All pipeline state and results. RLS enforced.
                  </p>
                  <div className="chips">
                    <span className="chip chip-purple">PostgreSQL</span>
                    <span className="chip chip-purple">
                      pgvector Embeddings
                    </span>
                    <span className="chip chip-muted">insights</span>
                  </div>
                </div>

                <div className="arch-section label-amber">
                  <div className="section-label">Demo Path</div>
                  <h2>Golden Dataset</h2>
                  <p className="desc">
                    Pre-seeded data — full pipeline, deterministic.
                  </p>
                  <div className="chips">
                    <span className="chip chip-amber">Seeded Demo Data</span>
                    <span className="chip chip-muted">
                      Deterministic Output
                    </span>
                  </div>
                </div>

                <div className="arch-section label-red">
                  <div className="section-label">Security</div>
                  <h2>Access Control</h2>
                  <p className="desc">
                    No secrets in the browser. Server-side only.
                  </p>
                  <div className="chips">
                    <span className="chip chip-red">RLS Enabled</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
