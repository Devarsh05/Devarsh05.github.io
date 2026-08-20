# Content Sheet — Portfolio Rebuild

**Date:** 2026-08-19
**Status:** Approved. This is the provenance record for every claim on the site.

Source tags: `[RESUME]` from the AI/ML resume PDF · `[USER]` given directly in
conversation · `[OLD-SITE]` carried from the previous site (the user's own prior
words, confirmed) · `[VOICE]` non-factual copy written for the site and approved.

## Hero — all `[USER]`, verbatim

- Eyebrow: `Computer Science @ York University · AI Engineer`
- Line 1: `I build AI agents`
- Line 2 (italic): `that actually ship.`
- Lead: `I build multi-agent systems, custom MCP servers, and RAG pipelines — and put them in front of real users, not just in notebooks.`
- CTA `View my work` · Ghost `Get in touch`

## Capabilities

Eyebrow `What I work with` `[USER]`. Headline `Systems, retrieval, / and what runs them.` `[VOICE]`

| Card | Copy | Source |
|---|---|---|
| Multi-Agent Systems | LangGraph and LangChain orchestration across specialized agents for call analysis, proposal generation, and task routing — over GPT, Claude, Gemini, and LLaMA. | `[RESUME]` |
| RAG & Retrieval | Tree-sitter AST chunking into ChromaDB for cited, hallucination-resistant Q&A over codebases of up to 10,000 files. | `[RESUME]` |
| Backend & Deployment | A 5-service backend on Railway with async SQLAlchemy and Celery, atomic Redis rate limiting, and 230+ automated tests behind it. | `[RESUME]` |

**Two over-expansions were caught in draft and corrected before shipping:**

1. "Five-service backends on Railway **and Northflank**" — the resume states 5-service
   only for ContextCode on Railway. Northflank is SixRise's platform and is never
   described as 5-service. Corrected to Railway only.
2. "Tree-sitter AST chunking with **pgvector and** ChromaDB" — Tree-sitter and ChromaDB
   are ContextCode; pgvector is SixRise. Combining them implied one system. pgvector
   now appears only in the SixRise stack chips.

## Work

Eyebrow `Selected work` `[USER]`. Headline `Things I built / & shipped.` `[USER]`

**SixRise** — description and all three bullets `[RESUME]`. URLs `[USER]`:
`https://www.sixrise.app/` · `https://github.com/Devarsh05/sixrise`
(`.git` suffix stripped — that is a clone endpoint, not a browse link.)

**ContextCode** — description and all three bullets `[RESUME]`. URLs `[USER]`:
`https://context-code.vercel.app/` · `https://github.com/Devarsh05/ContextCode`

**Also built** — both one-liners `[OLD-SITE]`, explicitly confirmed by the user.
Neither project appears on either resume.

- AI Stock Insights — `https://ai-stock-insights.streamlit.app/` · `https://github.com/Devarsh05/AI-Stock-Insights`
- RateFlix — `https://github.com/Devarsh05/RateFlix`

## Experience — `[RESUME]`, verbatim

`Automators Lab` · `AI/ML Intern` · `May 2025 – Sep 2025`, all four resume bullets
unaltered. The York roles (Student Success Mentor, Client Services Rep) are **not**
the user's and are excluded.

## About

- Prose `[VOICE]`, approved with one edit ("survive contact with production" →
  "hold up in production").
- Education `[USER]`: **Expected Dec 2026** — this is the live value, matching the
  resume PDF. It supersedes an earlier instruction to use "Expected 2027"; the user
  set Dec 2026 directly in `index.html` after the rebuild. The same date appears in
  the About prose ("finishing in Dec 2026"), so site and PDF now agree.
- Coursework `[RESUME]`.
- CS Hub `[RESUME]` — listed **undated** by user instruction; the resume gives no dates.

## Contact — `[RESUME]`

`devarsh.sp13@gmail.com` · `linkedin.com/in/devarsh` · `github.com/devarsh05`

`linkedin.com/in/devarsh` supersedes the old site's `/in/devarsh-prajapati-63a451275`.

## Figures permitted anywhere on the site

Only these, all stated by the resume: `10+` MCP servers · `eight-node` pipeline ·
`10,000` files · `5-service` backend · `230+` tests · `May 2025 – Sep 2025`.

## Imagery

- `assets/contextcode.png` — real capture of the live dependency-graph view at
  1440×900, from `https://context-code.vercel.app/` indexing `encode/databases`.
- `assets/sixrise.png` — real capture of the public marketing homepage at
  `https://www.sixrise.app/` at 1440×900. This replaced the earlier botanical
  placeholder (recoverable from git history at `tools/sixrise-plate.html`).
  The app itself has no public URL — the site states it "runs inside the Shopify
  admin, behind OAuth" — so the homepage is the only real screenshot available.
