# Portfolio Rebuild — "Field Journal" Design

**Date:** 2026-08-19
**Repo:** `Devarsh05/Devarsh05.github.io` (GitHub Pages, deploys from root)
**Status:** Approved — pending content verification checkpoint

## Goal

Rebuild the personal portfolio from a dark-gradient template into the flat, editorial,
botanical "Field Journal" design system, with content sourced from the AI/ML resume.

The current site is a mismatch on both axes: its dark gradient theme shares nothing with
Field Journal, and its three showcased projects (AI Stock Insights, RateFlix, Multi-Agent
Task Automator) do not reflect current work. This is a rebuild, not a retheme.

## Positioning

**AI/ML-forward, single voice.** One hosted resume PDF (the AI/ML version). No audience
toggle, no second PDF, no resume menu.

Backend and distributed-systems depth (FastAPI, Celery, Postgres, Redis, Docker,
deployment) is woven into project substance as *evidence*, never as a competing headline.

## Architecture

Vanilla HTML/CSS/JS at repo root. No build step, no framework — the design is entirely
static and GitHub Pages already serves this directory via `.nojekyll`.

| File | Action |
|---|---|
| `variables.css` | Rewire tokens: Inter + DM Serif Display replace UntitledSans/BoogyBrutPoster (unobtainable). Convert tracking px to **em** so it scales responsively. Drop unused radii. |
| `styles.css` | Rewrite from zero. |
| `index.html` | Rewrite. Moth SVG inlined (enables lime hover accent). |
| `main.js` | Trim to nav toggle + smooth scroll. **Delete the float-square generator** — injects 12 `rgba(79,70,229,.15)` indigo squares, off-palette. |
| `assets/resume.pdf` | Already present (95KB), user-supplied. |
| `assets/contextcode.png` | Captured from live demo, headless browser at 1440px, cropped to 16:10. |
| `assets/sixrise.png` | On-brand placeholder (forest-ink botanical line composition, project name in Inter 600). Gated behind Shopify merchant auth. |
| `image.gif` | **Delete** — 381KB, unused after rebuild. |
| `cocktai.svg` | Replace with forest-ink moth favicon matching the hero. |

## Design tokens

Inter 400/600 + DM Serif Display italic 400, both Google Fonts.

Ramp: 62 / 43 / 36 / 24 / 17 / 14 / 12px with negative tracking
(62px -0.064em, 52px -0.059em, 43px -0.051em, 36px -0.039em).
Eyebrows: 12px, +0.67px tracking, filled-dot prefix.
Body copy never exceeds **460px**.

Palette per design system. Contrast verified:

- sage-dust `#52756e` on white = **5.09:1** (passes AA normal text)
- forest-ink `#003329` on chartreuse `#e6ffa3` = **12.75:1**

Radius: 8px on cards/buttons/images, 9999px on badges. Nothing else.
**No box-shadow, no gradients, anywhere.** Max width 1200px. Section gaps 56-80px,
separated by whitespace only — no dividers.

## Page structure

Hero → Capabilities → Work → Experience → About → Contact

### Nav

White, full-bleed, 28px vertical padding, **not sticky** (reference is explicit:
"not sticky, not shadowed" — this changes current behavior). Name left at 17px/600.
Links right. Resume as white pill with mist-paper hairline border.

### Hero

45/55 asymmetric split. Moth illustration floats uncontained at ~460px, left.

Exact approved copy:

- **Eyebrow:** `• Computer Science @ York University · AI Engineer`
- **Line 1** (Inter 600): `I build AI agents`
- **Line 2** (DM Serif Display italic): `that actually ship.`
- **Lead** (sage-dust, 460px max): `I build multi-agent systems, custom MCP servers, and RAG pipelines — and put them in front of real users, not just in notebooks.`
- **CTA:** `View my work` (chartreuse) · **Ghost:** `Get in touch`

### Hero illustration — the moth

Single hand-inked moth, spread wings, ~460px, forest-ink single-weight strokes,
white negative space, floating uncontained.

**Attempt:** render wing veins as a faint directed-graph structure — nodes at vein
junctions, thin directed edges — with the single vivid-lime accent on one node so it
reads as an active state.

**Hard rule:** if the graph detail makes it read as neither botanical nor technical,
drop it and ship the clean moth. The clean moth is the floor and must look deliberate
and beautiful on its own. Show both versions if uncertain.

### Capabilities

Eyebrow: `• What I work with`. Three chartreuse cards, 28px padding, 8px radius,
thin forest-ink line icon top-right (18-20px). Labels fixed:

1. **Multi-Agent Systems**
2. **RAG & Retrieval**
3. **Backend & Deployment**

Each gets a real one-line description backed by shipped work. **Only figures the resume
actually states may be used.** Permitted numbers: `10+` MCP servers, `eight-node` async
pipeline, `10,000` files, `5-service` backend, `230+` automated tests, `May 2025 – Sep 2025`.

### Work

Eyebrow: `• Selected work`. Headline: `Things I built` + italic `& shipped.`

**Deep cards (2-column grid):** SixRise and ContextCode. White sheet, 8px radius, 28px
padding, no shadow. Screenshot locked to **16:10** with `object-fit: cover` so
`assets/sixrise.png` swaps in with zero markup change. Project name 17px/600,
description 14px sage-dust, stack chips, real resume bullets, live + GitHub links.

**Compact row ("Also built"):** AI Stock Insights and RateFlix. Text-only one-liners
with GitHub links. **Designed as a 2-column layout that looks intentional at exactly two
items** — never a 3-column grid with an empty slot. Stacks to equal-width full rows on
mobile. URLs carried over from the existing site (verified, not invented):

- AI Stock Insights — `https://ai-stock-insights.streamlit.app/` · `https://github.com/Devarsh05/AI-Stock-Insights`
- RateFlix — `https://github.com/Devarsh05/RateFlix`

### Experience

**Automators Lab only.** Pure type and whitespace, no cards. The York roles
(Student Success Mentor, Client Services Rep) are **not** included — not the user's.

If it reads thin as a standalone section, present an alternative that folds it into
About as a short line, for the user to choose between.

### About

460px column. Education: **York University — BSc. Honours in Computer Science,
Expected 2027.** (This overrides the resume PDF's "Expected Dec 2026" — two courses
remain; user-confirmed correct.) Plus CS Hub involvement and relevant coursework.

### Contact

Headline + italic accent. One chartreuse email CTA. Ghost LinkedIn/GitHub links with
**thin line SVG icons** — the current site's emoji violate the no-emoji rule.

Verified contact details from resume:
`437-264-3155` · `devarsh.sp13@gmail.com` · `linkedin.com/in/devarsh` · `github.com/devarsh05`

Note: `linkedin.com/in/devarsh` supersedes the old site's `/in/devarsh-prajapati-63a451275`.

## Content integrity rules

1. **Do not invent** experience, titles, dates, metrics, or URLs.
2. Anything the resume does not cover is marked `[PLACEHOLDER]` and raised as a question —
   never filled with plausible specifics.
3. The resume's bullets are terse and easy to over-expand. All drafted card copy and
   capability one-liners go to the user for verification **before** they ship.

## Open gaps — blocking content, must be asked

| Gap | Why blocked |
|---|---|
| ContextCode live demo URL | Not in resume. Also blocks the screenshot capture step. |
| ContextCode GitHub URL | Not in resume. |
| SixRise public URL | Not in resume. |
| SixRise GitHub URL | Not in resume (may be private). |
| CS Hub dates | Not in resume. |

## Responsive

Max 1200px. Breakpoints ~1024px (hero stacks, work grid to 1 column) and ~640px
(nav collapses, type ramp steps 62 → 43 → 36).

## Accessibility

Skip link, proper landmarks, visible focus rings (2px forest-ink outline, 2px offset —
flat, no shadow), `aria-expanded` on nav toggle, real alt text on screenshots,
`prefers-reduced-motion` respected. Moth SVG marked decorative.

## Verification

Serve locally, screenshot at 1440 / 768 / 375, then assert:

- zero `box-shadow` occurrences
- zero `gradient` occurrences
- zero emoji in markup
- radii only 8px / 9999px
- at most one chartreuse CTA per section
- no paragraph exceeding 460px
- both project cards render identical dimensions (placeholder swap integrity)
