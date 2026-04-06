<aside>
📚

**Purpose:** A glossary. If you encounter an unfamiliar RRE term in code, UI, or docs, find the plain-English meaning here.

**Not here:** Deep implementation guidance. Use the "See also" links to jump to the canonical contract/spec.

</aside>

<aside>
🏷️

**How to read the type tags** — each entry opens with an italic tag telling you what kind of thing is being defined.

- *agent* — one of the pipeline agents (SCOUT, CRITIC, `PRESCRIBER`)
- *concept* — a design, product, or architecture idea with no single code artifact
- *db column* — `table` — a field stored in a specific DB table
- *db table* — a database table itself
- *enum value* — `field` — a controlled-vocab value for a specific field
- *infra* — an infrastructure tool or constraint
- *invariant* — a named rule the system **must** enforce
- *orchestration* — an Inngest primitive, event, or setting
- *pattern* — an architecture pattern
- *runtime constant* — a named constant in code
- *ui element* — a UI component or rendering behavior
- *warning code* — a named warning emitted to `RunDTO.warnings`

</aside>

## A

### Ambiguity Gap → Listing Information Gaps

*concept*

The problem in online shopping where product descriptions don't include the key details a buyer needs to make a good decision, which causes the Double-Loss Scenario.

### Ambiguity Spectrum → Liability vs Experience Risk Spectrum

*concept*

How we categorize expectation gaps into liability risk vs experience risk. See [LIABILITY_RISK](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21) and [EXPERIENCE_RISK](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21).

### Ambiguity Tax → Listing Vagueness Cost

*concept*

The compounding financial loss a merchant suffers from vague listings, encompassing both Experience-Related Loss (bad reviews/churn) and Liability-Related Loss (returns/disputes).

### Ambiguity Traps → Vague Phrase Traps

*concept*

Specific vague phrases (e.g., "standard fit") intentionally included in the [Golden Dataset](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21) to prove the system detects them.

### Anti-over-pruning invariant → Preserve Existing Safety Constraints Rule

*invariant*

`PRESCRIBER` must not apply `remove` to any text that contains a negative constraint (e.g., "does not fit," "excludes," "not compatible," "only") unless removal is strictly safer than replacement. When in doubt, prefer `replace` or [`flag`](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21). Violating this silently erases safety guardrails already present in the listing.

- *See also:* [Project Blueprint - Part 3](https://www.notion.so/Project-Blueprint-Part-3-Software-62dabd95e1708231a48c81dce377bb83?pvs=21) → **§3.4.1**

### `all_reviews`

*db column* — `scrape_records`

The complete array of **all** reviews SCOUT extracted and parsed from a listing during scraping, stored as `jsonb`. Contains structured review objects (e.g., `review_id`, `text`, `rating`) for every review found — with **no filtering or truncation applied**.

**Distinct from `blob`:** `blob` is the raw, unprocessed provider payload (JSON/HTML). `all_reviews` is the parsed, structured form of every review SCOUT could extract from that payload.

**Distinct from the `reviews[]` passed to CRITIC:** That payload is produced at runtime by the Signal Filter, which takes `all_reviews` and truncates to the top `MAX_CRITIC_REVIEWS = 30` high-signal items. `all_reviews` is the full pre-filter universe; `reviews[]` is the downstream consumer slice.

Under BDR-017, reviews are stored here intentionally un-normalized — there is no separate `reviews` table for MVP.

- *See also:* `blob` · Signal filter · [Project Blueprint - Part 4 - Data](https://www.notion.so/Project-Blueprint-Part-4-Data-92dabd95e1708367928101ae4d93030d?pvs=21) → §4.2.1 Table: `scrape_records` · BDR-017

### ARR (Ambiguity Resolution Register) → Blueprint Decision Register (BDR)

*concept*

The single source of truth for all canonical decisions made about the RRE blueprint. When a conflict, gap, or unclear statement is discovered — in a meeting, PR review, ticket, or AI session — it is resolved here, once, by Sahal. **Blueprint text always wins over glossary, tickets, and AI interpretations (BDR-001, non-negotiable).** Decisions propagate everywhere via the BDR's synced block.

- *See also:* [Blueprint Decision Register](https://www.notion.so/Blueprint-Decision-Register-319abd95e17080c9a0e5f9bca972204e?pvs=21)

### `PRESCRIBER` (legacy: `AUDITOR`)

*agent*

The prescriptions-layer agent (action). Receives [`expectation_gaps[]`](/45babd95e17082ea96fd814311e8285c?pvs=25#88aabd95e170834d953981b06915f849) from CRITIC, selects an `action_type`, and drafts [Surgical Edits](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21). Writes exclusively to `prescriptions` — **never to `insights`.**

> **Legacy naming note (BDR-002):** "AUDITOR" is the deprecated carry-over name. Formally: CRITIC = diagnosis layer (`insights`). PRESCRIBER = action layer (`prescriptions`). Keep "AUDITOR" only when documenting legacy references.
>
- *See also:* [Project Blueprint - Part 4 - Data](https://www.notion.so/Project-Blueprint-Part-4-Data-92dabd95e1708367928101ae4d93030d?pvs=21) → **§4.2.3 Table: prescriptions** · BDR-002

## B

### Batch Safety Valve

*concept*

A bulk review view allowing users to quickly approve dozens of low-risk "[Gray Zone](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21)" description tweaks without visiting every PDP.

### `blob`

*db column* — [`scrape_records`](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21)

The `jsonb` column on [`scrape_records`](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21) that stores the full, unmodified scrape payload (raw JSON/HTML) returned by the provider. Treated as an immutable audit trail — never edited in place, never passed forward to agents. CRITIC and `PRESCRIBER` only receive `listing_text` and `reviews[]`, not the blob. See [Read-Only Scrape Payload](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21).

- *See also:* [Project Blueprint - Part 4 - Data](https://www.notion.so/Project-Blueprint-Part-4-Data-92dabd95e1708367928101ae4d93030d?pvs=21) → **§4.2.1 Table: [`scrape_records`](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21)**

### Blueprint

*concept*

The canonical written spec set for RRE (Parts 1–5 in the All Parts page).

## C

### Canonical Forensic Keyword List → Canonical Risk-Indicating Keyword List

*concept*

The curated set of high-signal terms `CRITIC` uses as a first-pass filter to identify [buyer expectation gaps](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21) in listing text and reviews. Terms are domain-specific (fitment, compatibility, specs, condition) and version-controlled in the spec. `CRITIC` must only report keywords that appear in this list — it must not invent or generalize new ones when populating [`identified_keywords`](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21).

- *See also:* [Project Blueprint - Part 3](https://www.notion.so/Project-Blueprint-Part-3-Software-62dabd95e1708231a48c81dce377bb83?pvs=21) → **§3.3**, [`identified_keywords`](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21)

### Chain-of-thought

*concept*

The LLM's internal step-by-step reasoning process. **Never surfaced directly in the RRE UI.** The [`reasoning_trace`](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21) field is a human-readable one-sentence distillation, not a raw chain-of-thought dump. Exposing raw chain-of-thought would violate the Observability / Glass Box contract and create brittle rendering dependencies.

- *See also:* Reasoning trace, Inspect (UI)

### Claim defensibility audit → Verbatim Grounding Check

*invariant*

The `PRESCRIBER`'s internal check that every claim in [`surgical_edit`](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21) is grounded in a verbatim [`evidence_quotes`](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21) entry or in `listing_text`. If any claim cannot be defended with a verbatim source, `PRESCRIBER` must fall back to `action_type = flag` and `surgical_edit = null`. Enforced by the [No-Invented-Numbers Rule](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21).

### Clarification

*concept*

An [EXPERIENCE_RISK](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21) [Surgical Edit](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21). Resolves an experience expectation mismatch (feel, finish, perceived quality, comfort, performance).

### `COMPLETE`

*enum value* — job state

Job state. Pipeline finished successfully with renderable outputs.

### Concurrency key

*orchestration*

The [Inngest](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21) field that scopes parallel run limits to a specific dimension. In RRE, keyed to `job_id` so each pipeline run is fully isolated — one run cannot block or starve another. Works alongside the `concurrency: 1` per-function limit that prevents overlapping SCOUT/CRITIC/`PRESCRIBER` invocations within a single run.

- *See also:* [Project Blueprint - Part 3](https://www.notion.so/Project-Blueprint-Part-3-Software-62dabd95e1708231a48c81dce377bb83?pvs=21) → **§3.1**, [Inngest](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21)

### `COMPLETE_WITH_WARNINGS`

*enum value* — job state

Job state. Pipeline finished, but at least one non-fatal issue occurred. UI should still render results and show `warnings[]`. See also [Warning codes](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21).

### Control (`control`)

*concept*

Part of the [Surgical Edit Plan export](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21). What the listing currently says (the baseline before any edit is applied).

### `confidence_score`

*db column* — `insights`

A 0.0–1.0 float emitted by CRITIC alongside each Insight. Represents the model's self-reported certainty that the [buyer expectation gap](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21) is real. Not the same as [`match_score`](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21), which measures Edit Anchor resolution. Not used to gate rendering — it is an observability signal.

- *See also:* [Project Blueprint - Part 4 - Data](https://www.notion.so/Project-Blueprint-Part-4-Data-92dabd95e1708367928101ae4d93030d?pvs=21) → **§4.4.3 Insight Contract**

### `contextual_certainty` → `classification_certainty`

*db column* — `insights`

CRITIC's categorical confidence label for a [buyer expectation gap](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21) prior to [`risk_severity`](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21) calculation. Values: `likely`, `possible`, `unlikely`. Input to the [`risk_severity`](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21) formula in TypeScript; not shown in UI.

- *See also:* [Project Blueprint - Part 4 - Data](https://www.notion.so/Project-Blueprint-Part-4-Data-92dabd95e1708367928101ae4d93030d?pvs=21) → **§4.6.3 CRITIC Agent**

### Controlled vocab

*concept*

A fixed allowlist of valid values for a given field (e.g., `action_type`, `problem_category`). Anything outside the list is invalid and should fail validation. See Taxonomy.

### CRITIC

*agent*

Classification agent. Takes evidence from SCOUT, detects [buyer expectation gaps](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21), classifies each as [LIABILITY_RISK](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21) or [EXPERIENCE_RISK](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21), and produces Insights.

## D

### Double-Loss Scenario

*concept*

The reality where vague listings cause merchants to pay twice: a Experience-Related Loss (bad reviews/churn) and a Liability-Related Loss (returns/[INAD](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21) disputes).

### Data Drought (`DATA_DROUGHT`)

*concept* / *warning code*

A condition where there are too few usable reviews/signals to make strong, high-confidence claims. The pipeline still completes and proceeds to surface insights, but logs a `DATA_DROUGHT` warning code to indicate lower confidence. See also [Warning codes](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21).

### Demo mode / Golden Path → Demo Mode (`demo=true` / `is_demo` column)

*concept* + *db column*

A mode where the system must produce deterministic results from seeded data and **must not** call external services. Backed by the `is_demo` boolean column on [`scrape_records`](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21) and `jobs` (where `true` means the row belongs to the [Golden Dataset](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21)). All runtime Demo Mode firewall logic keys off this flag.

- *See also:* [RRE Architecture & Developer Cheatsheet](https://www.notion.so/RRE-Architecture-Developer-Cheatsheet-5d0abd95e170828ba0fa011e500eb4ae?pvs=21) → **Demo Mode Firewall Contract**
- *See also:* [Project Blueprint - Part 4 - Data](https://www.notion.so/Project-Blueprint-Part-4-Data-92dabd95e1708367928101ae4d93030d?pvs=21) → **§4.3 Golden Dataset**

### Description Cascade

*concept*

The ordered fallback strategy SCOUT uses to extract `listing_text` across OS 2.0 Shopify themes. Attempts three paths in order: **JSON-LD** → **DOM selector** (theme-keyed) → **Heuristic fallback**. The first path that returns valid, non-truncated text wins. The method that succeeds is recorded as `listing_text_source` — **not** `review_scrape_method` (that field tracks *review* ingestion tier, not listing extraction).

- *See also:* [`listing_text_source`](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21) · [Project Blueprint - Part 3](https://www.notion.so/Project-Blueprint-Part-3-Software-62dabd95e1708231a48c81dce377bb83?pvs=21) → **§3.7**

### Deterministic

*concept*

Same input always produces the same output.

### Diff anchor → Edit Anchor

*concept*

The resolved location in listing text where a Surgical Edit is applied or highlighted. Produced by the [Locate and Repair Model Output](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21) layer resolving [`target_segment`](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21) → [`matched_segment`](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21). The UI uses the [edit anchor](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21) to strike through, highlight, or inject text at the correct position. If no anchor can be resolved above `MIN_MATCH_SCORE`, the prescription is skipped and [`MATCH_CONFIDENCE_TOO_LOW`](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21) is emitted.

- *See also:* [`match_score`](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21), [UI determinism](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21) critical for demo mode and eval reproducibility.

### Document Pane

*ui element*

The center UI view that renders the `listing_text` read-only, with AI-detected segments highlighted in context to coordinate with the active [Surgical Edit](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21) Card.

### `DOM_SELECTOR`

*enum value* — [`listing_text_source`](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21)

SCOUT extracted the product description by querying known CSS selectors in the storefront HTML. Second-tier fallback after [`JSON_LD`](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21). See [`listing_text_source`](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21).

## E

### Embedding

*concept*

A fixed-length vector representation of a chunk of text, produced by a single embedding model. Stored in `review_embeddings.embedding` as `vector(768)`. Used for semantic similarity search via pgvector. **One embedding model across the entire system** — never mix embedding dimensions.

- *See also:* [Project Blueprint - Part 4 - Data](https://www.notion.so/Project-Blueprint-Part-4-Data-92dabd95e1708367928101ae4d93030d?pvs=21) → **§4.1.1 Architecture** and §4.2.5 Table: `review_embeddings`

### Exponential backoff

*orchestration*

The retry delay strategy [Inngest](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21) applies to failed steps. Each successive retry waits progressively longer (e.g., 1s → 2s → 4s → 8s) before re-attempting. Prevents hammering external APIs or the Supabase connection pool on transient failures. Max retry count is configured per function.

- *See also:* [Project Blueprint - Part 3](https://www.notion.so/Project-Blueprint-Part-3-Software-62dabd95e1708231a48c81dce377bb83?pvs=21) → **§3.1**, [Inngest](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21)

### ELT (Extract, Load, Transform)

*concept*

The full payload is loaded first (immutable), and transformation/interpretation happens downstream. Contrast with ETL, where data is transformed before loading. Used as the data pattern for [`scrape_records](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21).blob`.

### Environment Isolation

*invariant*

The rule that demo-mode code paths (`is_demo = true`) must never call live external services, and production code paths must never read from seeded [Golden Dataset](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21) rows. Enforced by the Demo Mode Firewall (`fetchWrapper` guard) and Supabase RLS policies that restrict anon reads to `is_demo = true` rows only.

- *See also:* Demo mode / Golden Path, RLS, [RRE Architecture & Developer Cheatsheet](https://www.notion.so/RRE-Architecture-Developer-Cheatsheet-5d0abd95e170828ba0fa011e500eb4ae?pvs=21) → **Demo Mode Firewall Contract**

### Evidence Pillars (`evidence_pillar`) → Required Check Categories (`required_check_category`)

*concept* + *db column*

Categories we proactively check: **Fitment**, **Specs**, **Condition**. Under BDR-020, the LLM does **not** decide whether a pillar is present or missing. It extracts technical attributes from `listing_text` into `extracted_listing_attributes`; then a deterministic TypeScript gate evaluates those extractions against the Required Check Category synonym schema and programmatically appends any missing Required Check Category [`LIABILITY_RISK`](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21) buyer expectation gaps. Tracked via `required_check_category` on `insights` (`fitment_check`, `specs_check`, `condition_check`, `null`). `null` indicates a non-pillar-specific insight.

- *See also:* [Project Blueprint - Part 4 - Data](https://www.notion.so/Project-Blueprint-Part-4-Data-92dabd95e1708367928101ae4d93030d?pvs=21) → **§4.4.2.3 Required Check Categories**

### Evidence Grounding Score (E) → Verbatim Evidence Score

*concept*

An evaluation metric that verifies a [Surgical Edit](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21) preserves [Locked Listing Claims](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21) and stays firmly grounded in verbatim quotes.

- *See also:* [Project Blueprint - Part 4 - Data](https://www.notion.so/Project-Blueprint-Part-4-Data-92dabd95e1708367928101ae4d93030d?pvs=21) → **§4.8.2 Metrics**

### Evidence quotes (`evidence_quotes`)

*db column* — `insights`

Verbatim customer/review snippets that ground an [expectation gap](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21) or edit recommendation.

- *See also:* [RRE Architecture & Developer Cheatsheet](https://www.notion.so/RRE-Architecture-Developer-Cheatsheet-5d0abd95e170828ba0fa011e500eb4ae?pvs=21) → **Contracts, Enums & Zod Schema** (No-Invented-Numbers Rule)

### Expected outcome (`expected_outcome`)

*db column* — `prescriptions`

**PRESCRIBER**-generated plain-English outcome statement: what improves if the [Surgical Edit](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21) is applied (e.g., "Reduces INAD disputes by providing explicit fitment constraints"). Renders on the Prescription Card as the "If-This-Then-That" outcome (Part 2 §2.3.1 UX Principle 3). **Null contract:** `string | null` — `null` allowed only when `action_type = flag` and no defensible outcome claim exists. Never empty string. **(BDR-015)**

- *See also:* [Project Blueprint - Part 3](https://www.notion.so/Project-Blueprint-Part-3-Software-62dabd95e1708231a48c81dce377bb83?pvs=21) → **§3.4.2 (PRESCRIBER output block)** · **§3.2.2 (Field Name Convention Lock)** · [Project Blueprint - Part 4 - Data](https://www.notion.so/Project-Blueprint-Part-4-Data-92dabd95e1708367928101ae4d93030d?pvs=21) → **§4.2.3 (prescriptions DDL)** · BDR-015

### `extraction_tier` → `review_scrape_method`

*db column* — `scrape_records`

Controlled-vocab column on [`scrape_records`](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21) recording which [Scraping Fallback Chain](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21) tier provided reviews. Values: `PUBLIC_PROVIDER_API`, `HTML_TOKEN_SCRAPE`, `HTML_SCRAPE`, `PAID_SCRAPE`. Used for observability/debugging.

- *See also:* [Project Blueprint - Part 4 - Data](https://www.notion.so/Project-Blueprint-Part-4-Data-92dabd95e1708367928101ae4d93030d?pvs=21) → **§4.2.1 Table: [`scrape_records`](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21)**, **§4.6.2 SCOUT Agent**

## F

### Field casing lock → Field Name Convention Lock

*invariant*

All RRE field names follow a strict casing convention and must appear exactly as specified in code, Zod schemas, Supabase columns, prompt templates, and PRs. **This list is exhaustive for Sprint 1.** Any unlisted field requires BDR approval before introduction. Deviations are contract violations blocked by PR guardrails.

- *See also:* [Taxonomy value casing lock](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21) · [Project Blueprint - Part 3](https://www.notion.so/Project-Blueprint-Part-3-Software-62dabd95e1708231a48c81dce377bb83?pvs=21) → **§3.2.2** (the locked field list)

### Fail closed

*concept*

If validation or safety checks fail, the step should error rather than guess, coerce, or fall back silently.

### `fail_state`

*db column* — `insights`

A named "known loser" liability trap (taxonomy tag) that frequently causes returns/disputes. Present on an Insight when CRITIC detects a recognized failure pattern.

### FAILED

*enum value* — job state

Job state. Pipeline terminated early due to an error or fail-closed validation.

- *See also:* [RRE Architecture & Developer Cheatsheet](https://www.notion.so/RRE-Architecture-Developer-Cheatsheet-5d0abd95e170828ba0fa011e500eb4ae?pvs=21) → **Frontend, UI & API Contracts** (`RunDTO.job.state`)

### `flag`

*enum value* — `action_type`

Surfaces a review-only annotation for an uncertain or indefensible claim (no text change implied). Also used as a safety fallback when `PRESCRIBER` detects a liability risk but cannot draft a safe numeric edit (e.g., no verbatim spec exists), in which case [`surgical_edit`](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21) is `null`.

### Forensic Audit Mode → Evidence Audit View

*concept*

The UX paradigm of providing transparent, scannable evidence (e.g., inline evidence dropdowns) so users can validate AI recommendations in seconds.

### Fortress Architecture

*concept*

A storefront setup (like Loox) where review data is heavily obfuscated or inlined in scripts, requiring a SaaS fallback (JS rendering) to extract.

### `friction_surface_id` → `expectation_gap_id`

*db column* — `prescriptions`

The foreign key on `prescriptions` that points to the `insights` row that drove the prescription. Non-negotiable — this is the canonical CRITIC → `PRESCRIBER` join key. A prescription without an `expectation_gap_id` is invalid.

- *See also:* [Project Blueprint - Part 4 - Data](https://www.notion.so/Project-Blueprint-Part-4-Data-92dabd95e1708367928101ae4d93030d?pvs=21) → **§4.2.3 Table: prescriptions**

### Friction surface → Buyer Expectation Gap (`expectation_gap`)

*concept*

One expectation mismatch identified by CRITIC. Becomes an Insight row. Classified by `listing_risk_type`.

### `friction_type` → `listing_risk_type`

*db column* — `insights`

The severity class of a [buyer expectation gap](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21). See [LIABILITY_RISK](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21) and [EXPERIENCE_RISK](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21).

## G

### Gray Zone

*concept*

The bulk of a catalog with mid-tier return rates (e.g., 16–18%) that causes silent, compounding profit loss because it is often ignored.

### Golden Dataset

*concept*

The curated set of seeded scenarios used for deterministic demos and evaluation.

### Golden Record → Ideal Listing

*concept*

Long-term vision: a product description so specific and defensible that returns become rare.

## H

### HARD → LIABILITY_RISK

*enum value* — `listing_risk_type`

Missing or vague constraints can cause an objectively wrong purchase that becomes a return, dispute, or [INAD](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21) claim.

### `HEURISTIC_FALLBACK` → `RULE_BASED_FALLBACK_SCRAPE`

*enum value* — [`listing_text_source`](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21)

SCOUT extracted the product description using a heuristic rule (e.g., largest text block, meta description, or page title) because neither [`JSON_LD`](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21) nor [`DOM_SELECTOR`](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21) succeeded. Lowest-confidence source tier. See [`listing_text_source`](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21) and [Description Cascade](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21).

### HNSW (Hierarchical Navigable Small World)

*infra*

The pgvector index type used on `review_embeddings.embedding`. Enables approximate nearest-neighbor search over high-dimensional vectors. Faster at query time than exact search; trade-off is index build time and memory.

- *See also:* [Project Blueprint - Part 4 - Data](https://www.notion.so/Project-Blueprint-Part-4-Data-92dabd95e1708367928101ae4d93030d?pvs=21) → **§4.1.1 Architecture**

### `HTML_PARSE` → `HTML_SCRAPE`

*enum value* — [`review_scrape_method`](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21)

SCOUT collected reviews by parsing raw storefront HTML when no public API or token was available. Less reliable than `PUBLIC_PROVIDER_API` or `HTML_TOKEN_SCRAPE`. See [`review_scrape_method`](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21) and [Scraping Fallback Chain](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21).

## I

### `is_demo`

*db column* — `scrape_records`, `jobs` (SSOT tables only)

A boolean flag indicating whether a row belongs to the [Golden Dataset](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21) (demo mode). The system has two authoritative locations for this flag:

- `jobs.is_demo` — run-level truth: was this pipeline run triggered in demo mode?
- `scrape_records.is_demo` — scrape-level truth: does this ingestion row belong to the seeded Golden Dataset?

`scrape_records.is_demo` is the SSOT for all downstream demo state (BDR-022). `insights` and `prescriptions` do **not** carry `is_demo` — demo membership for those rows is derived via join (`scrape_id → scrape_records.id`), not a denormalized column. Denormalizing it would introduce silent data corruption risk.

In the UI and API contracts, the DB `snake_case` form (`is_demo`) is transformed to `camelCase` (`isDemo`) at the API boundary only — it must never appear as `is_demo` inside `src/components/` or client code (BDR-012).

- *See also:* Demo Mode · BDR-022 · BDR-012 · [Project Blueprint - Part 4 - Data](https://www.notion.so/Project-Blueprint-Part-4-Data-92dabd95e1708367928101ae4d93030d?pvs=21) → **§4.2.1** (`scrape_records`) · **§4.2.4** (`jobs`) · **§4.5** (RLS policies)

### Idempotency

*concept*

If you run a step again with the same information, you'll get the same result. It won't create duplicate records or repeat the same actions twice. [Inngest](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21) makes sure each task runs at least once. Using `job_id` and `scrape_id` prevents the system from running the same pipeline twice or adding the same data multiple times if something gets replayed.

- *See also:* [Project Blueprint - Part 3](https://www.notion.so/Project-Blueprint-Part-3-Software-62dabd95e1708231a48c81dce377bb83?pvs=21) → **§3.1**, Step boundary

### INAD (Item Not As Described)

*concept*

A buyer's claim that the item materially differs from the listing, forcing the merchant to accept the return and refund. Commonly used in chargeback disputes.

### Inngest

*infra*

The durable, event-driven orchestration platform RRE uses to run the SCOUT → CRITIC → `PRESCRIBER` pipeline outside the HTTP request/response cycle. Handles step retries (with exponential backoff), event fan-out, concurrency limits, throttling, and timeouts. Enables the [Sidecar](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21) architecture that avoids Vercel's function timeout limit.

- *See also:* [Project Blueprint - Part 3](https://www.notion.so/Project-Blueprint-Part-3-Software-62dabd95e1708231a48c81dce377bb83?pvs=21) → **§3.1**, [Sidecar](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21), Step boundary

### `identified_keywords`

*db column* — `insights`

A `string[]` field emitted by CRITIC per [buyer expectation gap](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21). Contains keywords extracted verbatim from listing/reviews signaling the mismatch. TypeScript runtime uses this array (with `classification_certainty`) to calculate [`risk_severity`](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21) deterministically. CRITIC extracts only—no scoring or weighting.

- *See also:* [Project Blueprint - Part 4 - Data](https://www.notion.so/Project-Blueprint-Part-4-Data-92dabd95e1708367928101ae4d93030d?pvs=21) → **§4.6.3 CRITIC Agent**

### Immutable payload → Read-Only Scrape Payload

*concept*

The raw scrape blob persisted in [`scrape_records](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21).blob`. Used for traceability and debugging; must never be edited in place.

### Immutable Tokens → Locked Listing Claims

*concept*

Existing listing tokens/claims that must be preserved through any edit. Dropping them triggers a [Quote Validity Fail](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21). See [No-Invented-Numbers Rule](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21).

### `inject`

*enum value* — `action_type`

Adds a missing constraint clause to the listing. Requires a `placement` value.

### Insight (`insight` / `InsightDTO`)

*concept* + *db table*

The core unit of CRITIC output. One insight = one [buyer expectation gap](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21) with evidence, taxonomy, risk score, and reasoning.

- In storage: a row in the `insights` table.
- In UI: feeds one [Surgical Edit](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21) card in the sidebar.
- *See also:* [RRE Architecture & Developer Cheatsheet](https://www.notion.so/RRE-Architecture-Developer-Cheatsheet-5d0abd95e170828ba0fa011e500eb4ae?pvs=21) → **Core Data Schema** (table roles)

### Insight-to-Action Gap

*concept*

The problem where merchants know their return rates are high but lack specific, evidence-backed steps to fix the underlying listing ambiguity. RRE bridges this gap.

### Inspect (UI)

*ui element*

A toggle on a [Surgical Edit](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21) card that reveals evidence quotes and reasoning trace without showing raw chain-of-thought.

### `intervention_type` → `action_type`

*db column* — `prescriptions`

The action class for a Prescription. Allowed values: `inject`, `replace`, `remove`, [`flag`](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21).

- *See also:* [Project Blueprint - The Revenue Recovery Engine - All Parts](https://www.notion.so/Project-Blueprint-The-Revenue-Recovery-Engine-All-Parts-30cabd95e17082ee9af501b8a59808de?pvs=21) → **Appendix — Frontend Rendering Contract (Surgical Edits)**

### `issue_category` → `problem_category`

*db column* — `insights`

The taxonomy bucket for the mismatch. Allowed values: `compatibility_issue`, `dimensional_issue`, `sensory_issue`, `performance_issue`.

## J

### `job.start`

*orchestration*

The [Inngest](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21) event name that triggers a new pipeline run. Fired by the Next.js API route when a user submits a listing URL. Carries `job_id`, `scrape_id`, and `is_demo` in its data payload. The pipeline function listens for this event and begins SCOUT execution on receipt.

- *See also:* [Project Blueprint - Part 3](https://www.notion.so/Project-Blueprint-Part-3-Software-62dabd95e1708231a48c81dce377bb83?pvs=21) → **§3.1**, [Inngest](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21)

### Job (`job_id`)

*concept*

The run identifier that ties together a scrape, its Insights, its Prescriptions, and UI rendering. States: `PENDING`, `RUNNING`, `COMPLETE`, `COMPLETE_WITH_WARNINGS`, `FAILED`.

### `jobs` (table)

*db table*

The minimal run-state tracking table. One row per pipeline run. Columns: `job_id` (PK), `state`, `is_demo`, `error_message`, `url`, `progress`, `logs`, `warnings`, `created_at`, `updated_at` (BDR-021). `logs` and `warnings` are the MVP telemetry surface on this table; a separate `job_logs` table remains out of scope.

- *See also:* [Project Blueprint - Part 4 - Data](https://www.notion.so/Project-Blueprint-Part-4-Data-92dabd95e1708367928101ae4d93030d?pvs=21) → **§4.2.4 Table: jobs**

### `JSON_LD`

*enum value* — [`listing_text_source`](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21)

SCOUT extracted the product description from a structured `application/ld+json` block in the storefront HTML — the richest and most reliable source. See Description Cascade and [`listing_text_source`](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21).

### `JSON_REPAIR_FAILED`

*warning code*

Model output could not be repaired into valid JSON; the step should fail closed. See [Warning codes](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21).

## L

### `LIABILITY_WARNING_NO_SPEC` → `LIABILITY_FLAG_NO_VERBATIM_SPEC`

*warning code*

High-risk expectation gap detected, but no verbatim spec existed to draft a safe numeric edit. Results in `action_type = flag`. See [No-Invented-Numbers Rule](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21) and [Warning codes](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21).

### Liability-Weighted F1 (L)

*concept*

A claim-proof evaluation metric that measures the correctness of outputs, weighting HIGH-liability classification failures more heavily than experience-related ones.

- *See also:* [Project Blueprint - Part 4 - Data](https://www.notion.so/Project-Blueprint-Part-4-Data-92dabd95e1708367928101ae4d93030d?pvs=21) → **§4.8.2 Metrics**

### `listing_text`

*db column* — [`scrape_records`](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21)

The canonical product description text that CRITIC and `PRESCRIBER` operate on. Extracted by SCOUT via the [Description Cascade](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21) and stored on [`scrape_records`](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21). This is the only listing artifact passed forward to agents — never the raw `blob`.

- *See also:* [Project Blueprint - Part 4 - Data](https://www.notion.so/Project-Blueprint-Part-4-Data-92dabd95e1708367928101ae4d93030d?pvs=21) → **§4.2.1 Table: [`scrape_records`](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21)**

### `listing_text_source`

*db column* — [`scrape_records`](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21)

A controlled-vocab column on [`scrape_records`](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21) that records which extraction method produced `listing_text`. Allowed values: [`JSON_LD`](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21), [`DOM_SELECTOR`](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21), [`RULE_BASED_FALLBACK_SCRAPE`](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21). Used for observability and debugging.

- *See also:* [Project Blueprint - Part 4 - Data](https://www.notion.so/Project-Blueprint-Part-4-Data-92dabd95e1708367928101ae4d93030d?pvs=21) → **§4.2.1 Table: [`scrape_records`](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21)**, [Description Cascade](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21)

### `LLM_INFERENCE_TEMPERATURE`

*runtime constant*

The inference temperature applied to every CRITIC and `PRESCRIBER` LLM call. Locked to `0` (or the nearest provider-equivalent deterministic mode). Any stochastic sampling breaks eval repeatability, makes Zod validation non-deterministic, and invalidates the Zero Mental Math rule.

- *See also:* [Project Blueprint - Part 3](https://www.notion.so/Project-Blueprint-Part-3-Software-62dabd95e1708231a48c81dce377bb83?pvs=21) → **§3.4.1**

### `LLM_MODEL_ID`

*runtime constant*

The pinned model version string used for all `CRITIC` and `PRESCRIBER` calls (e.g., `gemini-2.5-flash-preview-04-17`). See **Model pinning**.

- *See also:* [Project Blueprint - Part 3](https://www.notion.so/Project-Blueprint-Part-3-Software-62dabd95e1708231a48c81dce377bb83?pvs=21) → **§3.4.1**

### Log Replay / Neural Stream → Live Process View

*ui element*

The UI trace that animates step-by-step pipeline progress and outputs during or after a run. Data source: `jobs.logs` column — rehydrated on page load/refresh (BDR-021). For demo runs, it replays from a seeded demo timeline.

## M

### Match-and-Repair → Locate and Repair Model Output

*concept*

The resilience layer that sits between the LLM's probabilistic output and the deterministic UI. Processes raw model output in a strict sequence before any row is persisted:

1. `cleanJson` + `JSON.parse`
2. `cleanAIOutput` (jsonrepair) + `JSON.parse`
3. Fail closed if still unrecoverable — emit [`JSON_REPAIR_FAILED`](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21)

For `replace` and `remove` interventions, also resolves [`target_segment`](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21) → [`matched_segment`](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21) and scores the match. Any insights that cannot be anchored are skipped and surface [`MATCH_CONFIDENCE_TOO_LOW`](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21). A run with skipped insights completes as `COMPLETE_WITH_WARNINGS`, not `FAILED`.

- *See also:* [Project Blueprint - Part 3](https://www.notion.so/Project-Blueprint-Part-3-Software-62dabd95e1708231a48c81dce377bb83?pvs=21) → **§3.4.1**, [Project Blueprint - Part 4 - Data](https://www.notion.so/Project-Blueprint-Part-4-Data-92dabd95e1708367928101ae4d93030d?pvs=21) → **§4.4.1 [Locate and Repair Model Output](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21) Contracts**

### `MATCH_BELOW_THRESHOLD` → `MATCH_CONFIDENCE_TOO_LOW`

*warning code*

The system could not confidently anchor a diff to the listing text ([`match_score](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21) < 0.80`). The insight is skipped and must not be rendered as an in-place highlight. See [Warning codes](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21) and [`matched_segment`](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21).

### `match_score` (also `numeric_match_score`)

*db column* — `prescriptions`

A `float` (0.0–1.0) on `prescriptions` that records the confidence of the backend's resolution of [`target_segment`](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21) → [`matched_segment`](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21). Below `MIN_MATCH_SCORE` (0.80), the prescription must not be rendered as an [edit anchor](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21) and triggers [`MATCH_CONFIDENCE_TOO_LOW`](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21).

- *See also:* [Project Blueprint - Part 4 - Data](https://www.notion.so/Project-Blueprint-Part-4-Data-92dabd95e1708367928101ae4d93030d?pvs=21) → **§4.4.1 Locate and Repair Model Output Contracts**

### `matched_segment`

*db column* — `prescriptions`

The resolved excerpt the UI is allowed to highlight or strike through. Resolved by the backend from [`target_segment`](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21); never the raw model text.

- *See also:* [RRE Architecture & Developer Cheatsheet](https://www.notion.so/RRE-Architecture-Developer-Cheatsheet-5d0abd95e170828ba0fa011e500eb4ae?pvs=21) → **Frontend, UI & API Contracts**
- *See also:* [Project Blueprint - The Revenue Recovery Engine - All Parts](https://www.notion.so/Project-Blueprint-The-Revenue-Recovery-Engine-All-Parts-30cabd95e17082ee9af501b8a59808de?pvs=21) → **Appendix — Frontend Rendering Contract (Surgical Edits)**

### `MAX_CRITIC_REVIEWS`

*runtime constant*

The maximum number of reviews passed to CRITIC per run (currently 30). Reviews above this limit are discarded by the [Signal filter](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21) before the CRITIC LLM is invoked. Prevents context decay and degraded classification above the threshold.

- *See also:* [Project Blueprint - Part 4 - Data](https://www.notion.so/Project-Blueprint-Part-4-Data-92dabd95e1708367928101ae4d93030d?pvs=21) → **§4.6.2 SCOUT Agent**, **§4.6.3 CRITIC Agent**

### `MAX_PAGES`

*runtime constant*

The pagination hard limit for the review [Scraping Fallback Chain](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21) (currently 5 pages). SCOUT stops fetching reviews after this many pages regardless of total review count.

- *See also:* [Project Blueprint - Part 4 - Data](https://www.notion.so/Project-Blueprint-Part-4-Data-92dabd95e1708367928101ae4d93030d?pvs=21) → **§4.6.2 SCOUT Agent**

### Micro-batch cap → Per-Step Batch Size Limit

*invariant*

A single [Inngest](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21) step must process **at most 5 catalog items per LLM call**. Exceeding this risks context contamination — the model begins blending attributes (dimensions, fitment, specs) across items in the same prompt window, which corrupts CRITIC scoring and downstream prescriptions.

**Independence note:** This 5-item cap and `MAX_CRITIC_REVIEWS` (30) are **independent** limits that must both be enforced simultaneously. The 5-item cap applies *across* products per Inngest step; the 30-review cap applies *within* one product's CRITIC call.

- *See also:* [Project Blueprint - Part 3](https://www.notion.so/Project-Blueprint-Part-3-Software-62dabd95e1708231a48c81dce377bb83?pvs=21) → **§3.2.2**

### `MIN_MATCH_SCORE`

*runtime constant*

The minimum acceptable [`match_score`](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21) for an [edit anchor](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21) (currently 0.80). If a prescription's [`match_score`](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21) falls below this threshold, the prescription triggers [`MATCH_CONFIDENCE_TOO_LOW`](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21) and must not be rendered as an in-place highlight.

- *See also:* [Project Blueprint - Part 4 - Data](https://www.notion.so/Project-Blueprint-Part-4-Data-92dabd95e1708367928101ae4d93030d?pvs=21) → **§4.4.1 Match-and-Repair Contracts**

### Model pinning → LLM Version Lock

*invariant*

The requirement that every `CRITIC` and `PRESCRIBER` LLM call explicitly specifies a fixed model version string (`LLM_MODEL_ID`). Auto-upgrade and auto-downgrade must be disabled. If the pinned model is unavailable, the step must **fail closed** — never silently fall back to a different or newer model version. A silent model swap can change output shape and break Zod contracts without any visible error.

- *See also:* [Project Blueprint - Part 3](https://www.notion.so/Project-Blueprint-Part-3-Software-62dabd95e1708231a48c81dce377bb83?pvs=21) → **§3.4.1**, `LLM_MODEL_ID`

## N

### Negative Constraint Decay → Safety Constraint Erasure

*concept*

The failure mode where `PRESCRIBER` generates fabricated specs despite the [No-Invented-Numbers Rule](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21). Occurs when `PRESCRIBER` receives raw customer reviews in addition to `expectation_gaps[]` and `listing_text`: the expanded context window causes negative constraints already present in the listing ("does not fit," "excludes," "not compatible") to drift out of the model's active attention span. The architectural fix is **short-context input discipline** — `PRESCRIBER` receives only condensed [buyer expectation gaps](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21) and `listing_text`, never raw reviews. See Preserve Existing Safety Constraints Rule.

- *See also:* [Project Blueprint - Part 3](https://www.notion.so/Project-Blueprint-Part-3-Software-62dabd95e1708231a48c81dce377bb83?pvs=21) → **§3.4.2**

### Non-goals

*concept*

Explicitly out-of-scope items for MVP (used to prevent scope creep).

### Numeric Fabrication Firewall → No-Invented-Numbers Rule

*invariant*

A safety rule that forbids the `PRESCRIBER` from inventing any number, dimension, percentage, or spec that does not appear verbatim in evidence quotes or `listing_text`. If no verbatim value exists, the output must be `action_type = flag` and `surgical_edit = null`.

## O

### Observability / Glass Box

*concept*

UX principle: show users what the system is doing (steps, logs, state) so they can trust it. Implemented via the Live Process View and telemetry.

## P

### Payload discipline → Step Payload Rule

*invariant*

The rule that large or raw payloads must **never** be passed directly between [Inngest](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21) steps. Instead: persist large payloads to Supabase first (`blob` = raw provider payload / rendered HTML audit trail; `all_reviews` = full parsed review corpus), then pass only small, clean identifiers and fields between steps (`scrape_id`, `listing_text`, `job_id`). Violating this causes [Inngest](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21) payload-size failures (~4 MB limit) and risks passing raw HTML directly into LLM prompts.

- *See also:* [Project Blueprint - Part 3](https://www.notion.so/Project-Blueprint-Part-3-Software-62dabd95e1708231a48c81dce377bb83?pvs=21) → **§3.1.1**, **§3.2.2**

### Polling loop → Status Check Loop

*concept*

The frontend mechanism for tracking run progress. The browser polls `GET /api/runs/[id]/status` on a fixed interval until `job.state` reaches a terminal state (`COMPLETE`, `COMPLETE_WITH_WARNINGS`, `FAILED`). No WebSocket or SSE connection required. The [`RunDTO`](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21) returned on each poll carries the full current state. See [Sidecar](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21).

- *See also:* [Project Blueprint - Part 3](https://www.notion.so/Project-Blueprint-Part-3-Software-62dabd95e1708231a48c81dce377bb83?pvs=21) → **§3.1**, [RunDTO](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21), [RRE Architecture & Developer Cheatsheet](https://www.notion.so/RRE-Architecture-Developer-Cheatsheet-5d0abd95e170828ba0fa011e500eb4ae?pvs=21) → **Frontend, UI & API Contracts**

### pgvector

*infra*

The Postgres extension that adds vector storage and similarity-search capabilities to Supabase. Powers the `review_embeddings` table and enables semantic (nearest-neighbor) queries over embedded review text. Uses an [HNSW](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21) index for fast approximate search.

- *See also:* [Project Blueprint - Part 4 - Data](https://www.notion.so/Project-Blueprint-Part-4-Data-92dabd95e1708367928101ae4d93030d?pvs=21) → **§4.1.1 Architecture**

### Pillar Hallucination Gate → Listing Attribute Extraction Guard

*invariant*

The BDR-020 guardrail that prevents the LLM from making the binary present/missing judgment on Required Check Categories. Instead, CRITIC follows a Lean Gate workflow: (1) the LLM extracts `extracted_listing_attributes` from `listing_text` only, (2) deterministic TypeScript logic evaluates those extractions against the Required Check Category synonym schema, and (3) the runtime programmatically appends any missing Required Check Category [`LIABILITY_RISK`](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21) buyer expectation gaps. No secondary LLM fallback is used.

- *See also:* Required Check Categories, `required_check_category`, CRITIC, [Project Blueprint - Part 3](https://www.notion.so/Project-Blueprint-Part-3-Software-62dabd95e1708231a48c81dce377bb83?pvs=21) → **§3.3**

### PII redaction

*concept*

The mandatory pre-persist scrubbing step that removes personally identifiable information from review text before it is written to [`scrape_records`](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21). Required order: credit cards → emails → phone numbers. Replacement strings: `[REDACTED_CC]`, `[REDACTED_EMAIL]`, `[REDACTED_PHONE]`. Best-effort; blocks common leaks without slowing the pipeline.

- *See also:* [Project Blueprint - Part 4 - Data](https://www.notion.so/Project-Blueprint-Part-4-Data-92dabd95e1708367928101ae4d93030d?pvs=21) → **§4.5 Data Governance**

### `PENDING`

*enum value* — job state

Job state. Job exists but processing has not started yet (or has not been picked up by the queue).

### Pipeline (SCOUT → CRITIC → `PRESCRIBER`)

*concept*

The canonical three-step workflow: SCOUT collects evidence → CRITIC classifies Buyer Expectation Gaps → `PRESCRIBER` drafts Surgical Edits.

### `placement`

*db column* — `prescriptions`

Where an injected clause should render. Only relevant when `action_type = inject`.

- Allowed values: `inline`, `top_block`, `bullet_summary`.
- *See also:* [Project Blueprint - The Revenue Recovery Engine - All Parts](https://www.notion.so/Project-Blueprint-The-Revenue-Recovery-Engine-All-Parts-30cabd95e17082ee9af501b8a59808de?pvs=21) → **Appendix — Frontend Rendering Contract (Surgical Edits)**

### `prescription_insights` (table)

*db table*

The many-to-many join table that links `prescriptions` ↔ `insights`. One prescription can cite many insights; one insight can support multiple prescriptions. Primary key is composite: `(prescription_id, insight_id)`.

- *See also:* [Project Blueprint - Part 4 - Data](https://www.notion.so/Project-Blueprint-Part-4-Data-92dabd95e1708367928101ae4d93030d?pvs=21) → **§4.2.3 Table: prescriptions**

### Prescription Card → Surgical Edit Card

*ui element*

The sidebar UI component that surfaces a single prescription as a merchant-facing Surgical Edit. Displays: `action_type` badge, [`matched_segment`](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21) highlight ([edit anchor](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21)), [`surgical_edit`](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21) copy, [`reasoning_trace`](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21), and evidence quotes via the Inspect toggle. Also renders [Surgical Edit Plan export](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21) fields ([Control](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21), [Treatment](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21), [Trigger](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21), [Success metric](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21)).

- *See also:* Prescription, Inspect (UI), [Project Blueprint - Part 5](https://www.notion.so/Project-Blueprint-Part-5-Design-bd3abd95e170827b923b81aef9951cb5?pvs=21) → sidebar rendering contract

### Prescription (`prescription` / `PrescriptionDTO`)

*concept* + *db table*

The `PRESCRIBER` output. Contains the recommended action ([Surgical Edit](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21)) and all rendering hints (`action_type`, `placement`, [`matched_segment`](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21), [`surgical_edit`](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21), and export fields).

- In storage: a row in the `prescriptions` table.
- In UI: the sidebar [Surgical Edit](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21) card.
- *See also:* [RRE Architecture & Developer Cheatsheet](https://www.notion.so/RRE-Architecture-Developer-Cheatsheet-5d0abd95e170828ba0fa011e500eb4ae?pvs=21) → **Frontend, UI & API Contracts**

### PR guardrails

*concept*

Automated rules (via PR-Agent or CodeRabbit) that block merges if critical invariants are violated (e.g., wrong casing, `z.string()` instead of `z.enum()`, raw HTML in step output).

### `PUBLIC_API` → `PUBLIC_PROVIDER_API`

*enum value* — [`review_scrape_method`](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21)

SCOUT collected reviews using a publicly documented review provider API (e.g., JudgeMe, Stamped). The most reliable and preferred tier. See [`review_scrape_method`](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21) and [Scraping Fallback Chain](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21).

### Provider detection

*concept*

The SCOUT sub-step that identifies which review provider is active on a storefront (JudgeMe, Stamped, Yotpo, etc.) before selecting a [Scraping Fallback Chain](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21) tier. Detection uses storefront HTML signals — `<script>` src patterns, meta tags, JSON-LD clues. The detected provider name is recorded as `provider` on the [`scrape_records`](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21) row.

- *See also:* `provider`, [Scraping Fallback Chain](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21), SCOUT, [Project Blueprint - Part 3](https://www.notion.so/Project-Blueprint-Part-3-Software-62dabd95e1708231a48c81dce377bb83?pvs=21) → **§3.2.1**

### `provider`

*db column* — [`scrape_records`](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21)

The review provider detected on the storefront. **Allowed values (locked, Sprint 1):** `judgeme` | `stamped` | `okendo` | `yotpo` | `loox` | `unknown`. Detected by SCOUT via HTML signature scan and stored on the [`scrape_records`](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21) row. A result of `unknown` triggers a mandatory Tier 3 [Scraping Fallback Chain](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21) fallback.

### `provider_token` → `provider_api_key`

*db column* — [`scrape_records`](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21)

A nullable column on [`scrape_records`](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21). The public API token or key SCOUT discovered from the storefront HTML during an `HTML_TOKEN_SCRAPE` extraction. Null when not applicable (e.g., `PUBLIC_PROVIDER_API` or `HTML_SCRAPE` tiers).

- *See also:* [Project Blueprint - Part 4 - Data](https://www.notion.so/Project-Blueprint-Part-4-Data-92dabd95e1708367928101ae4d93030d?pvs=21) → **§4.2.1 Table: [`scrape_records`](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21)**

### `provenance_url`

*db column* — `insights`

The permalink URL to the specific customer review on the provider platform that supplied the primary evidence for this Insight (e.g., a direct link to the review on JudgeMe or Stamped). Complements `source_review_id`: one is the stable provider-assigned ID, the other is the human-verifiable clickable link. Used to support the evidence dropdown on the Prescription Card so reviewers can navigate directly to the original source. `null` when the review has no stable provider URL (e.g., reviews ingested via HTML parsing with no individual permalink).

- *See also:* `source_review_id` · [Project Blueprint - Part 4 - Data](https://www.notion.so/Project-Blueprint-Part-4-Data-92dabd95e1708367928101ae4d93030d?pvs=21) → **§4.2.2 Table: insights**

## Q

### Quote Validity Fail

*concept*

A validation failure triggered when `PRESCRIBER`'s [`surgical_edit`](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21) output drops one or more [Immutable Tokens](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21) from the listing. The edit is rejected and must not be persisted to `prescriptions`. Part of the [Locked Claims Survival Rule](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21) enforcement.

- *See also:* [Locked Claims Survival Rule](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21), [Locked Listing Claims](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21), [Project Blueprint - Part 3](https://www.notion.so/Project-Blueprint-Part-3-Software-62dabd95e1708231a48c81dce377bb83?pvs=21) → **§3.4.1**

## R

### RLS (Row Level Security)

*concept*

The Supabase/Postgres access control feature used to enforce that the client can never write to RRE tables, and that reads are scoped to the current `job_id`. Demo-only anon read policies (for `is_demo = true` rows) are the only exception to the no-anon-read rule.

- *See also:* [Project Blueprint - Part 4 - Data](https://www.notion.so/Project-Blueprint-Part-4-Data-92dabd95e1708367928101ae4d93030d?pvs=21) → **§4.5 Data Governance**

### Red Line invariant → Locked Claims Survival Rule

*invariant*

The rule that [Locked Listing Claims](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21) — existing listing claims extracted verbatim from `listing_text` — must survive intact through any [Surgical Edit](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21). If any token is lost in `PRESCRIBER` output, a [Quote Validity Fail](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21) is raised and the edit is blocked from being persisted. `PRESCRIBER` validates token preservation before writing to `prescriptions`.

- *See also:* [Locked Listing Claims](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21), [Quote Validity Fail](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21), [Project Blueprint - Part 3](https://www.notion.so/Project-Blueprint-Part-3-Software-62dabd95e1708231a48c81dce377bb83?pvs=21) → **§3.4.1**

### `reviews[]` (SCOUT to CRITIC payload)

*concept*

The in-memory, filtered array of review objects that SCOUT hands off to CRITIC at the end of ingestion. **Never stored as its own column or table.** Produced at runtime by the Signal Filter, which takes `all_reviews`, discards low-signal items (`rating == 4` or `text_length < 30`), scores the remainder by keyword match, sorts by score then text length, and truncates to the top `MAX_CRITIC_REVIEWS = 30`.

Each object in the array contains exactly three fields: `review_id`, `text`, `rating`. No additional nesting.

**Distinct from `all_reviews`:** `all_reviews` is the complete parsed universe of every review SCOUT extracted, stored as `jsonb` on `scrape_records`. `reviews[]` is the downstream consumer slice — a temporary, capped subset of it.

**Distinct from `blob`:** `blob` is the raw unprocessed provider payload. `reviews[]` is clean structured objects derived from it.

**`review_id` → `source_review_id` rename:** In this payload the field is `review_id`. When CRITIC detects a buyer expectation gap it emits that value as `source_review_id` in its output (per the Insight contract). The rename happens at the CRITIC output boundary — dropping it is a traceability bug (BDR-003).

- *See also:* `all_reviews` · `blob` · `source_review_id` · Signal filter · `MAX_CRITIC_REVIEWS` · [Project Blueprint - Part 4 - Data](https://www.notion.so/Project-Blueprint-Part-4-Data-92dabd95e1708367928101ae4d93030d?pvs=21) → **§4.6.2 SCOUT Agent**

### `scrape_records`

*db table*

The DB table that stores the immutable scrape payload for a listing (listing text + reviews). The single root of all downstream evidence. Every `insights` row and every `prescriptions` row traces back to a `scrape_records` row via `scrape_id`. Under BDR-017, raw reviews remain intentionally un-normalized inside this payload (`blob` / `all_reviews`) — there is no separate `reviews` table for MVP. See [Read-Only Scrape Payload](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21).

- *See also:* [Project Blueprint - Part 4 - Data](https://www.notion.so/Project-Blueprint-Part-4-Data-92dabd95e1708367928101ae4d93030d?pvs=21) → **§4.2.1 Table: [`scrape_records`](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21)**

### Reasoning trace (`reasoning_trace`)

*db column* — `insights`

One sentence. CRITIC's explanation of why a [buyer expectation gap](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21) exists. It is the only reasoning artifact shown in the UI and is not chain-of-thought. Under BDR-019, `reasoning_trace` is CRITIC-owned and must never appear on `prescriptions`.

### Recovery plan export → Surgical Edit Plan export

*concept*

The canonical export vocabulary. A prescription bundles four fields for export: [Control](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21), [Treatment](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21), [Trigger](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21), [Success metric](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21).

- *See also:* [Project Blueprint - The Revenue Recovery Engine - All Parts](https://www.notion.so/Project-Blueprint-The-Revenue-Recovery-Engine-All-Parts-30cabd95e17082ee9af501b8a59808de?pvs=21) → export requirements in the MVP feature set

### `remove`

*enum value* — `action_type`

Deletes a claim that is unsafe or directly contradicted by evidence. No replacement copy is generated.

### `replace`

*enum value* — `action_type`

Swaps a misleading or inaccurate claim for safer, evidence-grounded copy.

### `review_embeddings` (table)

*db table*

The semantic index table. One row per chunked review text, with a `vector(768)` embedding for similarity search via pgvector. Used for the V1.1 MapReduce path (semantic clustering at scale) and for finding reviews similar to a given query. Under BDR-018, it links back to the run via `scrape_id` only — there is no per-review Foreign Key. If granular review traceability is needed, rely on `source_review_id` as a text identifier rather than a DB constraint.

- *See also:* [Project Blueprint - Part 4 - Data](https://www.notion.so/Project-Blueprint-Part-4-Data-92dabd95e1708367928101ae4d93030d?pvs=21) → **§4.2.5 Table: review_embeddings**

### Review Sampling Gate

*invariant*

A deterministic, pre-LLM step that filters and truncates raw reviews to the top 30 highest-signal items to prevent context decay in the CRITIC agent.

### `review_count`

*db column* — [`scrape_records`](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21)

A nullable integer column on [`scrape_records`](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21). The total number of reviews fetched during ingestion. Stored as quick metadata for UI rendering and observability — does not affect pipeline logic.

- *See also:* [Project Blueprint - Part 4 - Data](https://www.notion.so/Project-Blueprint-Part-4-Data-92dabd95e1708367928101ae4d93030d?pvs=21) → **§4.2.1 Table: [`scrape_records`](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21)**

### Risk Assessment

*concept*

The structured breakdown presented to the user containing the Problem Category, Listing Risk Type, Evidence, Action Type, Proposed [Surgical Edit](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21), and [Expected Outcome](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21).

### `risk_severity`

*db column* — `insights`

An integer (1–100) on the `insights` table representing how likely a listing information gap is to cause a preventable return or dispute.

**⚠️ Runtime-injected — never emitted by the CRITIC LLM.** Under BDR-020, the raw CRITIC model output consists of top-level `extracted_listing_attributes` plus `expectation_gaps[]`; then the TypeScript runtime deterministically appends any missing Required Check Category [`LIABILITY_RISK`](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21) buyer expectation gaps and calculates `risk_severity` for **all** persisted surfaces from [`identified_keywords`](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21) and `classification_certainty` before the row is written. Asking the LLM to output this value would break the [No-Invented-Numbers Rule](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21).

**⚠️ Floor at 1 (BDR-016):** The formula wraps with `Math.max(1, ...)` to satisfy the DB `CHECK (risk_severity >= 1)` constraint. A score of 0 can occur when all keywords are filtered by the allowlist or when `classification_certainty = "unlikely"` with only low-weight terms — but a surface that survived Zod validation is real friction and must be persisted at minimum score 1, not discarded.

- *See also:* [Project Blueprint - Part 4 - Data](https://www.notion.so/Project-Blueprint-Part-4-Data-92dabd95e1708367928101ae4d93030d?pvs=21) → **§4.4.3 Insight Contract** and **Part 3 §3.2.2** (formula) · BDR-005 · BDR-016

### RRE (Revenue Recovery Engine)

*concept*

The system that turns listing text + reviews into evidence-backed [Surgical Edits](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21) to reduce returns and disputes.

### Run / `RunDTO`

*concept*

The single stable payload the frontend uses to render a run (job state, scrape, insights, prescriptions, warnings, `isDemo`).

- *See also:* [RRE Architecture & Developer Cheatsheet](https://www.notion.so/RRE-Architecture-Developer-Cheatsheet-5d0abd95e170828ba0fa011e500eb4ae?pvs=21) → **Frontend, UI & API Contracts** ([`RunDTO`](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21) shape)

### `RUNNING`

*enum value* — job state

Job state. Pipeline is actively processing.

## S

### Slang-to-Spec Translation

*concept*

The UX principle of converting subjective customer complaints (e.g., "feels cheap") into objective, actionable constraints (e.g., "Material GSM is low").

### Surgicality Score (S) → Edit Precision Score

*concept*

An evaluation metric that penalizes over-broad edits and rewards minimal, precise interventions. Ensures the pipeline acts like a scalpel, not a sledgehammer.

- *See also:* [Project Blueprint - Part 4 - Data](https://www.notion.so/Project-Blueprint-Part-4-Data-92dabd95e1708367928101ae4d93030d?pvs=21) → **§4.8.2 Metrics**

### Sync Problem

*concept*

The structural barrier where manual catalog improvements get overwritten by automated distributor data syncs. This is why RRE acts as an asynchronous [Sidecar](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21).

### `SAAS_FALLBACK` → `PAID_SCRAPE`

*enum value* — [`review_scrape_method`](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21)

SCOUT collected reviews via a paid third-party scraping service (e.g., Oxylabs, Apify) as a last resort when all other tiers failed. Highest cost per run. See [`review_scrape_method`](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21) and [Scraping Fallback Chain](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21).

### SCOUT

*agent*

Evidence ingestion agent. Extracts `listing_text` via the [Description Cascade](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21) and reviews via the [Scraping Fallback Chain](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21). Output is stored in [`scrape_records`](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21).

### Silent-failure detector

*concept*

The runtime check that catches pipeline steps that return `200 OK` but with empty or near-empty output (zero insights, zero prescriptions). Without this check, the job would reach `COMPLETE` with nothing actionable rendered and no user-visible warning. When output falls below a minimum viable threshold, the detector emits `DATA_DROUGHT` and transitions the job to `COMPLETE_WITH_WARNINGS`.

- *See also:* `DATA_DROUGHT`, `COMPLETE_WITH_WARNINGS`, Warning codes

### Signal filter

*concept*

A pure TypeScript (no LLM) step that runs after review ingestion and before CRITIC invocation. Discards reviews with `rating == 4` or `text_length < 30`, scores remaining reviews by keyword match, sorts by score then text length, and truncates to `MAX_CRITIC_REVIEWS`. Ensures CRITIC only receives high-signal input.

- *See also:* [Project Blueprint - Part 4 - Data](https://www.notion.so/Project-Blueprint-Part-4-Data-92dabd95e1708367928101ae4d93030d?pvs=21) → **§4.6.2 SCOUT Agent**

### Sidecar

*pattern*

The architectural approach of running the SCOUT → CRITIC → `PRESCRIBER` pipeline as a durable [Inngest](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21) function that executes **outside the HTTP request/response cycle**, rather than inside a Vercel serverless function. The API route fires `job.start` and returns immediately; the pipeline runs in Inngest with no execution time cap. This sidesteps the [Vercel Wall](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21). In RRE, "Sidecar" refers to this logical separation via [Inngest](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21) functions, not a separate process or container.

- *See also:* [`maxDuration`](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21), [Project Blueprint - Part 3](https://www.notion.so/Project-Blueprint-Part-3-Software-62dabd95e1708231a48c81dce377bb83?pvs=21) → **§3.1**

### SOFT → EXPERIENCE_RISK

*enum value* — `listing_risk_type`

The buyer can complete the purchase but may have expectation mismatches about feel, quality, appearance, or performance.

### Semantic diffing

*concept*

The process of resolving [`target_segment`](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21) → [`matched_segment`](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21) by comparing meaning rather than exact characters. Used by the [Locate and Repair Model Output](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21) layer when the model's output text is paraphrased or slightly reformatted relative to the original listing. The [`match_score`](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21) represents the confidence of the semantic resolution.

- *See also:* [Edit Anchor](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21)

### Shield of Clarity

*concept*

The overarching metaphor for RRE. It acts as a preventative shield highlighting constraints upfront to avoid mismatches, rather than a weapon to fight customer disputes after the fact.

### `scrape_id`

*db column* — [`scrape_records`](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21)

The `uuid` primary key of a [`scrape_records`](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21) row, used as a foreign key on `insights`, `prescriptions`, and `review_embeddings` to tie every derived artifact back to its immutable source. The canonical traceability join key within a run (alongside `job_id`).

- *See also:* [Project Blueprint - Part 4 - Data](https://www.notion.so/Project-Blueprint-Part-4-Data-92dabd95e1708367928101ae4d93030d?pvs=21) → **§4.2 Core Schema**

### Step boundary

*orchestration*

A `step.run(...)` call in [Inngest](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21) that marks a durable checkpoint in a pipeline function. If the function crashes or times out after a step completes, [Inngest](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21) replays from the last completed boundary — the completed step is not re-executed. All SCOUT, CRITIC, and `PRESCRIBER` agent invocations are wrapped in step boundaries. Each step must be idempotent.

- *See also:* [Project Blueprint - Part 3](https://www.notion.so/Project-Blueprint-Part-3-Software-62dabd95e1708231a48c81dce377bb83?pvs=21) → **§3.1**, [Idempotency](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21), [Inngest](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21)

### Step I/O Contract

*concept*

The canonical definition of what each pipeline step must emit and must never pass forward as step output. Defined once in [Project Blueprint - Part 3](https://www.notion.so/Project-Blueprint-Part-3-Software-62dabd95e1708231a48c81dce377bb83?pvs=21) → **§3.4.2** — do not restate in PRs or tickets. Key rules: SCOUT outputs only IDs + small cleaned fields (never raw HTML or blob); CRITIC must not output `risk_severity`; `PRESCRIBER` receives only `expectation_gaps[]` + `listing_text` (never raw reviews).

- *See also:* [Project Blueprint - Part 3](https://www.notion.so/Project-Blueprint-Part-3-Software-62dabd95e1708231a48c81dce377bb83?pvs=21) → **§3.4.2 Step I/O Contract** · BDR-004 · BDR-005

### `step.waitForEvent`

*orchestration*

An [Inngest](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21) primitive that suspends a function execution until a named event arrives. Used in RRE orchestration handoffs where one stage fires a completion event and the next stage waits for it before proceeding. Enables clean inter-agent sequencing without polling or sleep loops.

- *See also:* [Project Blueprint - Part 3](https://www.notion.so/Project-Blueprint-Part-3-Software-62dabd95e1708231a48c81dce377bb83?pvs=21) → **§3.1**, [Inngest](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21)

### `status`

*db column* — `prescriptions`

The merchant-facing review state for a Prescription. Tracks whether the merchant has acted on a given Surgical Edit recommendation. Stored as `text` with a DB-level check constraint.

- Allowed values: `pending` | `approved` | `rejected` | `applied`
- Default: `pending` (set on insert; no merchant action yet).
- `approved` — merchant has reviewed and accepted the Surgical Edit but has not yet pushed it to the listing.
- `rejected` — merchant has dismissed the recommendation.
- `applied` — the Surgical Edit has been applied to the live listing.
- *See also:* [Project Blueprint - Part 4 - Data](https://www.notion.so/Project-Blueprint-Part-4-Data-92dabd95e1708367928101ae4d93030d?pvs=21) → **§4.2.3 Table: prescriptions** · Prescription Card

### Stuttering

*ui element*

Refers to two distinct issues:

1. **LLM defect:** The model recursively repeats tokens (e.g., "the the"), breaking semantic diffing. Prevented by collapsing adjacent identical inserts/deletes before rendering.
2. **UI defect:** [Prescription Cards](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21) flicker, duplicate, or re-animate during Log Replay polling. Prevented by stable `key` props on list items keyed to `prescription_id` and terminal-state detection to freeze the UI.

- *See also:* [Live Process View](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21), [Status Check Loop](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21), [UI determinism](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21)

### `source_review_id`

*db column* — `insights`

A stable identifier for the specific customer review that provided the primary evidence for an Insight. Comes from the raw scrape payload. Used for traceability — lets a developer trace any Insight back to its exact source review.

- *See also:* [Project Blueprint - Part 4 - Data](https://www.notion.so/Project-Blueprint-Part-4-Data-92dabd95e1708367928101ae4d93030d?pvs=21) → **§4.2.2 Table: insights**

### Supavisor / pgbouncer

*infra*

The connection pooler that sits between the Next.js/[Inngest](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21) runtime and the Supabase Postgres database. Prevents connection exhaustion under concurrent pipeline runs. Supavisor is Supabase's built-in pooler; pgbouncer is the OSS equivalent. The runtime must use the **pooler connection string** (port 6543), not the direct connection string (port 5432), in all deployed environments.

- *See also:* [Project Blueprint - Part 4 - Data](https://www.notion.so/Project-Blueprint-Part-4-Data-92dabd95e1708367928101ae4d93030d?pvs=21) → **§4.1.1 Architecture**, [Inngest](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21)

### Success metric (`success_metric`)

*db column* — `prescriptions`

Part of the [Surgical Edit Plan export](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21). What to measure to validate a [Surgical Edit](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21) (e.g., "fitment-related returns per 100 orders"). Should be measurable, even if not computed by the system in MVP.

### `surgical_edit`

*db column* — `prescriptions`

The exact, raw machine text used by the UI to execute the `inject` or `replace` action. Stored on `prescriptions`. Rules: required for `inject` and `replace`; `null` for `remove`; a short annotation (or `null`) for [`flag`](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21). The [No-Invented-Numbers Rule](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21) forbids inventing any numeric values here.

- *See also:* [Project Blueprint - Part 4 - Data](https://www.notion.so/Project-Blueprint-Part-4-Data-92dabd95e1708367928101ae4d93030d?pvs=21) → **§4.2.3 Table: prescriptions**

### Surgical Edit

*concept*

The final, evidence-backed recommendation produced by `PRESCRIBER`. Either a Warning for [LIABILITY_RISK](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21) friction, or a Clarification for [EXPERIENCE_RISK](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21) friction.

## T

### `TOKEN_HUNT` → `HTML_TOKEN_SCRAPE`

*enum value* — [`review_scrape_method`](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21)

SCOUT discovered a private or semi-private review provider API token embedded in the storefront HTML (e.g., in a script tag) and used it to fetch reviews directly. More reliable than `HTML_SCRAPE`; less reliable than `PUBLIC_PROVIDER_API`. The discovered token is stored as `provider_api_key`. See [`review_scrape_method`](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21) and [Scraping Fallback Chain](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21).

### `target_segment`

*db column* — `prescriptions`

The model's intended excerpt to change. **Not safe for UI anchoring on its own.** The backend resolves this to [`matched_segment`](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21) before persisting.

- *See also:* [RRE Architecture & Developer Cheatsheet](https://www.notion.so/RRE-Architecture-Developer-Cheatsheet-5d0abd95e170828ba0fa011e500eb4ae?pvs=21) → **Frontend, UI & API Contracts** (Locate & Repair guidance)

### Throttle

*orchestration*

An [Inngest](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21) rate-limit setting that caps how many new runs can start within a rolling time window (e.g., 10 runs per minute). Prevents burst traffic from exhausting the Supabase connection pool or hitting LLM provider API rate limits.

- *See also:* [Project Blueprint - Part 3](https://www.notion.so/Project-Blueprint-Part-3-Software-62dabd95e1708231a48c81dce377bb83?pvs=21) → **§3.1**, [Concurrency key](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21), [Inngest](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21)

### Taxonomy

*concept*

The system's categorical labels with fixed allowed values. Includes `problem_category`, `listing_risk_type`, [`fail_state`](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21), `action_type`, `placement`, `provider`, [`review_scrape_method`](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21). See Controlled vocab.

- *See also:* [RRE Architecture & Developer Cheatsheet](https://www.notion.so/RRE-Architecture-Developer-Cheatsheet-5d0abd95e170828ba0fa011e500eb4ae?pvs=21) → **Contracts, Enums & Zod Schema**

### Taxonomy value casing lock

*invariant*

The following taxonomy values are locked strings. Deviations are contract violations blocked by the PR guardrail.

- `action_type`: `inject` | `replace` | `remove` | `flag` *(lowercase)*
- `placement`: `inline` | `top_block` | `bullet_summary` *(lowercase)*
- `listing_risk_type`: [`LIABILITY_RISK`](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21) | [`EXPERIENCE_RISK`](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21) *(UPPER exception — DB check constraints)*
- `classification_certainty`: `"likely"` | `"possible"` | `"unlikely"` *(lowercase)*
- `review_scrape_method`: `PUBLIC_PROVIDER_API` | `HTML_TOKEN_SCRAPE` | `HTML_SCRAPE` | `PAID_SCRAPE` *(UPPER — enum constants)*
- `listing_text_source`: `JSON_LD` | [`DOM_SELECTOR`](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21) | [`RULE_BASED_FALLBACK_SCRAPE`](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21) *(UPPER — enum constants)*
- *See also:* [Field Name Convention Lock](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21) · [Project Blueprint - Part 3](https://www.notion.so/Project-Blueprint-Part-3-Software-62dabd95e1708231a48c81dce377bb83?pvs=21) → **§3.2.2**

### Treatment (`treatment`)

*db column* — `prescriptions`

Part of the [Surgical Edit Plan export](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21). A human-readable summary of the proposed fix (e.g., "~~Fits all models~~"), used purely for reports. It is **not** the entire listing copy.

### Trigger (`trigger`)

*db column* — `prescriptions`

Part of the [Surgical Edit Plan export](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21). The evidence pattern or feedback cluster that caused the recommendation (the "why now").

## U

### UI determinism

*concept*

The principle that the UI renders from stable, backend-resolved fields (especially [`matched_segment`](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21)) and never anchors directly on raw model text.

## V

### Vercel Wall (also `maxDuration`) → Serverless Timeout Limit

*infra*

The hard execution timeout imposed by Vercel on serverless and edge functions (e.g., via the `maxDuration` config). The SCOUT → CRITIC → `PRESCRIBER` pipeline routinely exceeds this limit. The architectural fix is the [Sidecar](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21) pattern: the API route fires `job.start` and returns immediately (well within the wall); the pipeline executes in [Inngest](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21) with no equivalent cap.

- *See also:* [Sidecar](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21), [Inngest](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21), [Project Blueprint - Part 3](https://www.notion.so/Project-Blueprint-Part-3-Software-62dabd95e1708231a48c81dce377bb83?pvs=21) → **§3.1**

### Viability gap

*concept*

The condition where a listing has enough friction to warrant [Surgical Edits](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21) but the available evidence is too thin for `PRESCRIBER` to produce defensible copy. Results in all insights being prescribed as `flag` with `surgical_edit = null`. A viability gap run completes as `COMPLETE` but the seller sees only review-only flags — no copy suggestions. Distinct from [Data Drought](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21) (which is a signals problem, not a specificity problem).

- *See also:* [`flag`](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21), [No-Invented-Numbers Rule](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21), [Data Drought](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21)

## W

### Waterfall (Review Waterfall) → Scraping Fallback Chain

*concept*

The tiered strategy SCOUT uses to collect reviews when the primary source fails. Falls back through providers in order until it gathers enough signal. See [`review_scrape_method`](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21) and `provider`.

### Weight Table (`KEYWORD_WEIGHT`)

*runtime constant*

The locked dictionary used by the TypeScript runtime to deterministically calculate [`risk_severity`](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21) from [`identified_keywords`](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21). Terms not in this table are silently dropped to prevent LLM hallucinations from inflating scores.

- *See also:* [Project Blueprint - Part 3](https://www.notion.so/Project-Blueprint-Part-3-Software-62dabd95e1708231a48c81dce377bb83?pvs=21) → **§3.2.2**

### Warning (LIABILITY_RISK edit)

*concept*

A [LIABILITY_RISK](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21)-friction [Surgical Edit](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21). It resolves a liability risk by making a missing or vague constraint explicit.

### Warning codes

*concept*

Named non-fatal issues surfaced in `RunDTO.warnings` and as UI banners. See also: [`MATCH_CONFIDENCE_TOO_LOW`](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21), [`JSON_REPAIR_FAILED`](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21), [`LIABILITY_FLAG_NO_VERBATIM_SPEC`](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21).

## Z

### Zero Mental Math Rule

*invariant*

The principle that **the CRITIC LLM must never calculate, estimate, or output a `risk_severity` value.** Under BDR-020, the raw model output includes top-level `extracted_listing_attributes` plus `expectation_gaps[]`; the model still emits [`identified_keywords](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21)[]` and `classification_certainty` per buyer expectation gap, but never the numeric score. The TypeScript runtime may append deterministic Required Check Category gap [`LIABILITY_RISK`](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21) buyer expectation gaps, then computes [`risk_severity`](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21) from the persisted surface fields using a fixed weight table and certainty multiplier. Keeping severity math in TypeScript (not in the LLM) makes the [No-Invented-Numbers Rule](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21) enforceable and makes every score reproducible. See [`risk_severity`](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21).

- *See also:* [Project Blueprint - Part 3](https://www.notion.so/Project-Blueprint-Part-3-Software-62dabd95e1708231a48c81dce377bb83?pvs=21) → **§3.2.2**

## Notes

- This glossary is intended to be comprehensive and can be long. The "See also" links jump to the canonical contract or spec.
- Internal cross-references (e.g., "See [HARD](https://www.notion.so/RRE-Glossary-Taxonomy-45babd95e17082ea96fd814311e8285c?pvs=21)") link to headings within this page.
