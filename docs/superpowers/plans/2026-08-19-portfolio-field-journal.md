# Portfolio "Field Journal" Rebuild — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild `Devarsh05.github.io` from a dark-gradient template into the flat, editorial "Field Journal" design system, with all content sourced from the AI/ML resume.

**Architecture:** Vanilla HTML/CSS/JS served from repo root by GitHub Pages via the existing `.nojekyll`. Three files carry the whole site: `variables.css` (tokens), `styles.css` (presentation), `index.html` (content + inline moth SVG). `main.js` holds only nav toggle and smooth scroll. A `tools/check-design.sh` script enforces the design system's hard invariants as an automated gate.

**Tech Stack:** HTML5, CSS custom properties, vanilla ES6, Google Fonts (Inter 400/600 + DM Serif Display italic 400), bash + grep for verification, headless browser for screenshots.

**Spec:** `docs/superpowers/specs/2026-08-19-portfolio-field-journal-design.md`

## Global Constraints

Every task's requirements implicitly include this section. Values are verbatim from the spec.

- **Palette (only these):** forest-ink `#003329`, chartreuse `#e6ffa3`, deep-moss `#042725`, vivid-lime `#9bff48`, mist-paper `#e5e7eb`, white-sheet `#ffffff`, sage-dust `#52756e`, pine-shadow `#33544c`.
- **No `box-shadow` anywhere. No gradients anywhere.** Hierarchy comes from type and whitespace only.
- **Radius:** 8px on cards, buttons, images. 9999px on badges. Never 12px or 16px.
- **Fonts:** Inter (400, 600) for everything; DM Serif Display italic 400 for accent lines only.
- **Headline tracking in `em`, not px:** 62px → `-0.064em`, 52px → `-0.059em`, 43px → `-0.051em`, 36px → `-0.039em`.
- **Eyebrow labels:** Inter 12px, `+0.67px` tracking, prefixed by a small filled dot.
- **Body copy max-width: 460px.** Never wider.
- **Layout:** max-width 1200px centered. Section gaps 56–80px. **No dividers** — whitespace separates.
- **Card padding 28px. Element gaps 7–14px.**
- **Chartreuse CTA = chartreuse fill + forest-ink text.** Never reversed. At most one per visible section.
- **`--color-vivid-lime` is illustration/hover only** — never a UI surface.
- **Icons:** thin single-weight forest-ink line SVGs, 18–20px. **No emoji.**
- **Nav is NOT sticky and NOT shadowed.**
- **Content integrity:** never invent experience, titles, dates, metrics, or URLs. Anything the resume does not state gets `[PLACEHOLDER]` and a question. Only these figures may appear: `10+` MCP servers, `eight-node` pipeline, `10,000` files, `5-service` backend, `230+` tests, `May 2025 – Sep 2025`.
- **Graduation is "Expected 2027"** — this overrides the resume PDF's "Expected Dec 2026".
- **Git:** this repo needs `git -c safe.directory='D:/York University/personal-portfolio'` on every git invocation (ownership SID mismatch). Do not modify global git config.

---

## File Structure

| File | Responsibility |
|---|---|
| `variables.css` | Design tokens only. Colors, type ramp, spacing, radii. No selectors. |
| `styles.css` | All presentation. Rewritten from zero. |
| `index.html` | Document structure, all content, inline moth SVG. |
| `main.js` | Nav toggle + smooth scroll. Nothing else. |
| `tools/check-design.sh` | Automated design-invariant gate. |
| `assets/resume.pdf` | Already present, user-supplied. Untouched. |
| `assets/contextcode.png` | Captured screenshot, 16:10. |
| `assets/sixrise.png` | On-brand placeholder, 16:10, swappable. |
| `assets/moth.svg` | Reference copy of hero illustration (inlined into HTML for hover). |
| `favicon.svg` | Forest-ink moth mark. Replaces `cocktai.svg`. |
| `image.gif` | **Deleted.** |
| `cocktai.svg` | **Deleted.** |

---

## Task 1: Content sheet — extract and verify all copy

**BLOCKING GATE.** The user explicitly requires sign-off on every drafted string before it ships, because the resume's terse bullets are easy to over-expand. No markup is written until this task is approved.

**Files:**
- Create: `docs/superpowers/plans/content-sheet.md`

**Interfaces:**
- Produces: the exact, approved strings that Tasks 5–9 paste in verbatim.

- [ ] **Step 1: Draft every string, tagging its source**

Each line is tagged `[RESUME]` (verbatim or trivially compressed from the AI/ML resume), `[USER]` (given directly in conversation), `[OLD-SITE]` (carried from the user's existing site — the user's own words, but not the resume), or `[PLACEHOLDER]` (unknown, must be asked).

**Hero** — all `[USER]`, exact:
- Eyebrow: `Computer Science @ York University · AI Engineer`
- Line 1: `I build AI agents`
- Line 2 (italic): `that actually ship.`
- Lead: `I build multi-agent systems, custom MCP servers, and RAG pipelines — and put them in front of real users, not just in notebooks.`
- CTA: `View my work` / Ghost: `Get in touch`

**Capabilities** — eyebrow `What I work with` `[USER]`:

1. **Multi-Agent Systems** `[RESUME]` — "LangGraph and LangChain orchestration across specialized agents for call analysis, proposal generation, and task routing — over GPT, Claude, Gemini, and LLaMA."
2. **RAG & Retrieval** `[RESUME]` — "Tree-sitter AST chunking with pgvector and ChromaDB, producing cited, hallucination-resistant answers across codebases of up to 10,000 files."
3. **Backend & Deployment** `[RESUME]` — "Five-service backends on Railway and Northflank with async SQLAlchemy, Celery, and atomic Redis rate limiting — 230+ automated tests behind them."

**Work** — eyebrow `Selected work`, headline `Things I built` + italic `& shipped.` `[USER]`

*SixRise — AI Shopping Visibility Platform*
- Description `[RESUME]`: "A live Shopify embedded app that lifts merchant visibility inside AI shopping assistants — auditing catalog data, publishing grounded fixes, and measuring share-of-model against named competitors."
- Bullet 1 `[RESUME]`: "Eight-node async agent pipeline fans buyer-intent queries across Perplexity Sonar and OpenAI, parses cited brands, and computes per-engine share-of-model."
- Bullet 2 `[RESUME]`: "Grounded Optimizer with a negative-grounding guard and two-layer staleness gate — never fabricates attributes, and routes every Shopify Admin API write through preview/approval."
- Bullet 3 `[RESUME]`: "TypeScript/Python monorepo on Northflank, Neon, and Upstash Redis with split-schema ownership; fixed a connection-pool advisory-lock deadlock via transaction-bound session storage."
- Chips `[RESUME]`: Python · FastAPI · TypeScript · Shopify Admin API · pgvector · Redis
- Live URL: `[PLACEHOLDER]` · Repo URL: `[PLACEHOLDER]`

*ContextCode — AI Codebase Onboarding Tool*
- Description `[RESUME]`: "A full-stack RAG system that indexes GitHub repositories for cited, hallucination-resistant Q&A across codebases of up to 10,000 files."
- Bullet 1 `[RESUME]`: "Tree-sitter AST parsing for function- and class-level chunking across Python, JavaScript, and TypeScript."
- Bullet 2 `[RESUME]`: "Cloudflare Turnstile plus atomic Redis dual rate limiting, per-session and global — a public zero-signup demo with bounded API spend and bot protection."
- Bullet 3 `[RESUME]`: "5-service backend on Railway with async SQLAlchemy and SSE progress streaming, a Next.js frontend on Vercel, and 230+ automated tests."
- Chips `[RESUME]`: FastAPI · Celery · ChromaDB · PostgreSQL · Redis · Next.js
- Live URL: `[PLACEHOLDER]` · Repo URL: `[PLACEHOLDER]`

*Also built* — neither project appears on either resume. One-liners below are compressed from the user's **existing site**, so they are the user's own prior claims, not inventions — but they need explicit confirmation:
- AI Stock Insights `[OLD-SITE]`: "ML-powered stock analysis with technical indicators and ensemble prediction models, served through a Streamlit dashboard." — live `https://ai-stock-insights.streamlit.app/`, repo `https://github.com/Devarsh05/AI-Stock-Insights`
- RateFlix `[OLD-SITE]`: "A movie-review platform with authentication, watchlists, and TMDB integration, built in Java Swing over MySQL." — repo `https://github.com/Devarsh05/RateFlix`

**Experience** `[RESUME]` — `Automators Lab` · `AI/ML Intern` · `May 2025 – Sep 2025`, with the resume's four bullets verbatim (multi-agent systems; 10+ MCP servers; RAG pipelines; n8n lead-generation automation).

**About**
- Prose `[PLACEHOLDER — needs approval]`: "I'm a Computer Science student at York University, finishing in 2027. Most of what I build sits where LLMs meet real infrastructure — agent pipelines that survive contact with production, retrieval systems that cite their sources, and the unglamorous backend work that keeps both honest."
- Education `[RESUME + USER]`: "York University — BSc. Honours in Computer Science, Toronto, ON. Expected 2027."
- Coursework `[RESUME]`: Machine Learning, Artificial Intelligence, Data Structures & Algorithms, Databases, Operating Systems, Computer Networks, Software Design.
- CS Hub `[RESUME]`: "CS Hub — Computing Students' Hub, Events & Academics Team." Dates `[PLACEHOLDER]`.

**Contact** `[RESUME]`: `devarsh.sp13@gmail.com` · `437-264-3155` · `linkedin.com/in/devarsh` · `github.com/devarsh05`

- [ ] **Step 2: Present the sheet to the user and collect answers to every `[PLACEHOLDER]`**

Do not proceed past this step without answers. Specifically required: SixRise live + repo URLs, ContextCode live + repo URLs, approval or rewrite of the About prose, confirmation of the two `[OLD-SITE]` one-liners, CS Hub dates (or confirmation to omit them).

- [ ] **Step 3: Record approved text back into the sheet, replacing every tag**

- [ ] **Step 4: Commit**

```bash
git -c safe.directory='D:/York University/personal-portfolio' add docs/superpowers/plans/content-sheet.md
git -c safe.directory='D:/York University/personal-portfolio' commit -m "docs: approved content sheet for portfolio rebuild"
```

---

## Task 2: Design-invariant check script

Written first so it can prove itself by **failing** against the current dark theme.

**Files:**
- Create: `tools/check-design.sh`

**Interfaces:**
- Produces: `bash tools/check-design.sh` → exit 0 when all invariants hold, exit 1 with a labelled FAIL line otherwise. Every later task runs this.

- [ ] **Step 1: Write the check script**

```bash
#!/usr/bin/env bash
# Asserts the Field Journal design invariants. Exit 0 = clean.
set -u
cd "$(dirname "$0")/.." || exit 2
fail=0

report() {
  if [ "$2" -eq 0 ]; then
    printf 'PASS  %-34s %s\n' "$1" "$2"
  else
    printf 'FAIL  %-34s %s\n' "$1" "$2"
    fail=1
  fi
}

report "no box-shadow"        "$(grep -ci 'box-shadow' styles.css || true)"
report "no gradients"         "$(grep -cEi '(linear|radial|conic)-gradient' styles.css || true)"
report "no emoji in markup"   "$(LC_ALL=C grep -c $'\xF0\x9F\|\xF0\x9D\|\xE2\x9C' index.html || true)"
report "no off-palette rgba"  "$(grep -c 'rgba(79,70,229' main.js styles.css || true)"

# Only 8px, 9999px, 50%, or a token may set border-radius.
bad_radius=$(grep -ohE 'border-radius:[^;]+' styles.css \
  | grep -vE '(^|[^0-9])8px|9999px|50%|var\(--radius' | wc -l | tr -d ' ')
report "only 8px/9999px radii" "$bad_radius"

# Fonts: Inter and DM Serif Display are the only families allowed.
bad_font=$(grep -ohE "font-family:[^;]+" styles.css variables.css \
  | grep -viE 'inter|dm serif display|ui-sans-serif|system-ui|-apple-system|blinkmacsystemfont|segoe ui|roboto|sans-serif|serif|var\(--font' \
  | wc -l | tr -d ' ')
report "only approved font families" "$bad_font"

if [ "$fail" -eq 0 ]; then
  printf '\nAll design invariants hold.\n'
else
  printf '\nDesign invariants violated.\n'
fi
exit "$fail"
```

- [ ] **Step 2: Run it against the CURRENT repo to verify it fails**

Run: `bash tools/check-design.sh`
Expected: **FAIL** lines for `no box-shadow`, `no gradients`, `no emoji in markup`, and `no off-palette rgba` — the existing dark theme violates all four. Exit code 1.

This failure is the proof the script works. If it passes here, the script is broken — fix it before continuing.

- [ ] **Step 3: Commit**

```bash
git -c safe.directory='D:/York University/personal-portfolio' add tools/check-design.sh
git -c safe.directory='D:/York University/personal-portfolio' commit -m "test: add design-invariant check script"
```

---

## Task 3: Token layer

**Files:**
- Modify: `variables.css` (full rewrite)

**Interfaces:**
- Produces: the token names every later task consumes — `--color-forest-ink`, `--color-chartreuse`, `--color-deep-moss`, `--color-vivid-lime`, `--color-mist-paper`, `--color-white-sheet`, `--color-sage-dust`, `--color-pine-shadow`, `--font-sans`, `--font-accent`, `--text-display|heading-lg|heading|heading-sm|subheading|body-lg|body-sm|caption`, matching `--tracking-*` and `--leading-*`, `--radius-card|badge`, `--measure`, `--page-max`, `--card-padding`.

- [ ] **Step 1: Rewrite `variables.css`**

Key changes from the existing file: font families become Inter / DM Serif Display; **all headline tracking converts from px to em** so it scales with responsive type; the five unused radii (`13.8896px`, `110px`, `600px`, `9000px`, `999999px`) are dropped; `--measure: 460px` is added.

```css
:root {
  /* Colors */
  --color-forest-ink: #003329;
  --color-chartreuse: #e6ffa3;
  --color-deep-moss: #042725;
  --color-vivid-lime: #9bff48;
  --color-mist-paper: #e5e7eb;
  --color-white-sheet: #ffffff;
  --color-sage-dust: #52756e;
  --color-pine-shadow: #33544c;

  /* Fonts */
  --font-sans: 'Inter', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
  --font-accent: 'DM Serif Display', Georgia, serif;

  /* Type scale — tracking in em so it scales with size */
  --text-display: 62px;      --leading-display: 0.80;      --tracking-display: -0.064em;
  --text-heading-lg: 52px;   --leading-heading-lg: 0.83;   --tracking-heading-lg: -0.059em;
  --text-heading: 43px;      --leading-heading: 0.90;      --tracking-heading: -0.051em;
  --text-heading-sm: 36px;   --leading-heading-sm: 1.0;    --tracking-heading-sm: -0.039em;
  --text-subheading: 24px;   --leading-subheading: 1.13;   --tracking-subheading: -0.025em;
  --text-body-lg: 17px;      --leading-body-lg: 1.5;       --tracking-body-lg: -0.02em;
  --text-body-sm: 14px;      --leading-body-sm: 1.5;       --tracking-body-sm: 0.025em;
  --text-caption: 12px;      --leading-caption: 1.2;       --tracking-caption: 0.67px;

  --weight-regular: 400;
  --weight-semibold: 600;

  /* Spacing */
  --space-4: 4px;   --space-7: 7px;   --space-8: 8px;   --space-12: 12px;
  --space-14: 14px; --space-24: 24px; --space-28: 28px; --space-32: 32px;
  --space-56: 56px; --space-64: 64px; --space-80: 80px; --space-128: 128px;

  /* Layout */
  --page-max: 1200px;
  --measure: 460px;
  --card-padding: 28px;

  /* Radius — only these two exist */
  --radius-card: 8px;
  --radius-badge: 9999px;
}
```

- [ ] **Step 2: Verify no token is orphaned**

Run: `grep -oE 'var\(--[a-z0-9-]+\)' styles.css index.html 2>/dev/null | sort -u | sed 's/var(//;s/)//' | while read t; do grep -q -- "$t:" variables.css || echo "UNDEFINED: $t"; done`
Expected: no `UNDEFINED:` lines. (On a fresh `styles.css` this is trivially empty; it becomes meaningful from Task 4 onward — re-run it at the end of every later task.)

- [ ] **Step 3: Commit**

```bash
git -c safe.directory='D:/York University/personal-portfolio' add variables.css
git -c safe.directory='D:/York University/personal-portfolio' commit -m "refactor: rewire design tokens to Inter + DM Serif Display"
```

---

## Task 4: Document shell — head, nav, footer, base stylesheet

**Files:**
- Modify: `index.html` (replace entirely; sections land in Tasks 6–9)
- Modify: `styles.css` (replace entirely with base layer)
- Modify: `main.js` (trim)
- Delete: `image.gif`, `cocktai.svg`

**Interfaces:**
- Consumes: all tokens from Task 3.
- Produces: `.wrap` (1200px centered container), `.eyebrow`, `.h-display`, `.h-section`, `.accent` (DM Serif italic), `.lead`, `.btn`, `.btn-cta`, `.btn-ghost`, `.card`, `.chip`, `.section` — the class vocabulary Tasks 5–9 use.

- [ ] **Step 1: Write the HTML shell**

Head loads both fonts in one request and preconnects. Nav is a plain `<header>` with **no** `position: sticky`. Footer carries thin line-SVG social icons — no emoji.

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Devarsh Prajapati — AI Engineer</title>
<meta name="description" content="Computer Science student and AI engineer. Multi-agent systems, MCP servers, and RAG pipelines shipped to real users.">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=DM+Serif+Display:ital@1&display=swap" rel="stylesheet">
<link rel="stylesheet" href="variables.css">
<link rel="stylesheet" href="styles.css">
<link rel="icon" href="favicon.svg" type="image/svg+xml">
</head>
<body>
<a class="skip-link" href="#main">Skip to content</a>

<header class="site-head">
  <div class="wrap head-inner">
    <a class="wordmark" href="#top">Devarsh Prajapati</a>
    <button class="nav-toggle" aria-expanded="false" aria-controls="nav-menu" aria-label="Menu">
      <span class="bar"></span><span class="bar"></span>
    </button>
    <nav aria-label="Main">
      <ul class="nav-menu" id="nav-menu">
        <li><a href="#work">Work</a></li>
        <li><a href="#experience">Experience</a></li>
        <li><a href="#about">About</a></li>
        <li><a class="btn btn-pill" href="assets/resume.pdf" target="_blank" rel="noopener">Resume</a></li>
      </ul>
    </nav>
  </div>
</header>

<main id="main">
  <!-- Task 5: hero --><!-- Task 6: capabilities --><!-- Task 7: work -->
  <!-- Task 8: experience --><!-- Task 9: about + contact -->
</main>

<footer class="site-foot">
  <div class="wrap foot-inner">
    <p>Devarsh Prajapati — Toronto, ON</p>
    <ul class="social">
      <li><a href="https://github.com/devarsh05" aria-label="GitHub" target="_blank" rel="noopener">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.9a3.4 3.4 0 0 0-.9-2.6c3-.3 6.2-1.5 6.2-6.7A5.2 5.2 0 0 0 19.9 5a4.9 4.9 0 0 0-.1-3.6s-1.1-.4-3.8 1.4a13 13 0 0 0-7 0C6.3 1 5.2 1.4 5.2 1.4A4.9 4.9 0 0 0 5 5a5.2 5.2 0 0 0-1.4 3.6c0 5.2 3.2 6.4 6.2 6.7a3.4 3.4 0 0 0-.9 2.6V22"/></svg>
      </a></li>
      <li><a href="https://linkedin.com/in/devarsh" aria-label="LinkedIn" target="_blank" rel="noopener">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
      </a></li>
    </ul>
  </div>
</footer>
<script src="main.js"></script>
</body>
</html>
```

- [ ] **Step 2: Write the base stylesheet**

```css
*, *::before, *::after { box-sizing: border-box; }
* { margin: 0; }

body {
  font-family: var(--font-sans);
  font-size: var(--text-body-sm);
  line-height: var(--leading-body-sm);
  color: var(--color-forest-ink);
  background: var(--color-white-sheet);
  -webkit-font-smoothing: antialiased;
}

img, svg { display: block; max-width: 100%; }
ul { list-style: none; padding: 0; }
a { color: inherit; text-decoration: none; }

.wrap { max-width: var(--page-max); margin-inline: auto; padding-inline: var(--space-24); }
.section { padding-block: var(--space-64); }

.skip-link {
  position: absolute; left: -9999px;
  background: var(--color-forest-ink); color: var(--color-white-sheet);
  padding: var(--space-8) var(--space-12); border-radius: var(--radius-card);
}
.skip-link:focus { left: var(--space-12); top: var(--space-12); z-index: 10; }

:focus-visible { outline: 2px solid var(--color-forest-ink); outline-offset: 2px; }

/* Type */
.eyebrow {
  font-size: var(--text-caption); letter-spacing: var(--tracking-caption);
  line-height: var(--leading-caption); color: var(--color-forest-ink);
  display: flex; align-items: center; gap: var(--space-8);
}
.eyebrow::before {
  content: ""; width: 5px; height: 5px; border-radius: var(--radius-badge);
  background: currentColor; flex: none;
}
.h-display {
  font-size: var(--text-display); font-weight: var(--weight-semibold);
  letter-spacing: var(--tracking-display); line-height: var(--leading-display);
}
.h-section {
  font-size: var(--text-heading); font-weight: var(--weight-semibold);
  letter-spacing: var(--tracking-heading); line-height: var(--leading-heading);
}
.accent {
  font-family: var(--font-accent); font-style: italic;
  font-weight: var(--weight-regular); letter-spacing: 0; display: block;
}
.lead {
  font-size: var(--text-body-lg); line-height: var(--leading-body-lg);
  letter-spacing: var(--tracking-body-lg);
  color: var(--color-sage-dust); max-width: var(--measure);
}
.prose { max-width: var(--measure); color: var(--color-sage-dust); }

/* Buttons — flat, never shadowed */
.btn {
  display: inline-flex; align-items: center; gap: var(--space-7);
  font-size: var(--text-body-sm); font-weight: var(--weight-semibold);
  letter-spacing: var(--tracking-body-sm);
  padding: var(--space-12) 21px; border-radius: var(--radius-card);
  border: 0; background: none; cursor: pointer; transition: background-color .15s ease;
}
.btn-cta { background: var(--color-chartreuse); color: var(--color-forest-ink); }
.btn-cta:hover { background: var(--color-vivid-lime); }
.btn-ghost { padding-inline: 0; font-weight: var(--weight-regular); }
.btn-ghost:hover { color: var(--color-pine-shadow); }
.btn-pill { border: 1px solid var(--color-mist-paper); font-weight: var(--weight-regular); }
.btn-pill:hover { background: var(--color-mist-paper); }

/* Surfaces */
.card { background: var(--color-white-sheet); border-radius: var(--radius-card); padding: var(--card-padding); }
.chip {
  font-size: var(--text-caption); letter-spacing: var(--tracking-caption);
  padding: var(--space-4) var(--space-12); border-radius: var(--radius-badge);
  border: 1px solid var(--color-mist-paper); color: var(--color-pine-shadow);
}

/* Header — deliberately NOT sticky, NOT shadowed */
.site-head { padding-block: var(--space-28); background: var(--color-white-sheet); }
.head-inner { display: flex; align-items: center; justify-content: space-between; gap: var(--space-24); }
.wordmark {
  font-size: var(--text-body-lg); font-weight: var(--weight-semibold);
  letter-spacing: var(--tracking-body-lg);
}
.nav-menu { display: flex; align-items: center; gap: 21px; }
.nav-toggle { display: none; }

.site-foot { padding-block: var(--space-56); color: var(--color-sage-dust); }
.foot-inner { display: flex; justify-content: space-between; align-items: center; gap: var(--space-24); }
.social { display: flex; gap: var(--space-14); color: var(--color-forest-ink); }

@media (prefers-reduced-motion: reduce) {
  * { animation-duration: .01ms !important; transition-duration: .01ms !important; scroll-behavior: auto !important; }
}
```

- [ ] **Step 3: Trim `main.js` — delete the float-square generator entirely**

```js
const toggle = document.querySelector('.nav-toggle');
const menu = document.getElementById('nav-menu');

if (toggle && menu) {
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!open));
    menu.classList.toggle('open');
  });
}

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (e) => {
    const id = link.getAttribute('href');
    if (!id || id === '#') return;
    const el = document.querySelector(id);
    if (!el) return;
    e.preventDefault();
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    menu?.classList.remove('open');
    toggle?.setAttribute('aria-expanded', 'false');
  });
});
```

- [ ] **Step 4: Delete dead assets**

```bash
git -c safe.directory='D:/York University/personal-portfolio' rm image.gif cocktai.svg
```

- [ ] **Step 5: Run the check script — it must now pass**

Run: `bash tools/check-design.sh`
Expected: all PASS, exit 0. The four failures from Task 2 Step 2 are now resolved.

- [ ] **Step 6: Commit**

```bash
git -c safe.directory='D:/York University/personal-portfolio' add index.html styles.css main.js
git -c safe.directory='D:/York University/personal-portfolio' commit -m "feat: Field Journal document shell, base styles, trimmed JS"
```

---

## Task 5: Hero moth illustration

**Files:**
- Create: `assets/moth.svg`, `favicon.svg`
- Modify: `index.html` (inline the SVG into the hero slot)

**Interfaces:**
- Produces: `.moth` root class; `.moth-node--active` is the single vivid-lime node.

Per the spec: build **both** variants, render them, and let the user pick. The clean moth is the floor and must stand on its own.

- [ ] **Step 1: Author variant A — clean moth**

Single hand-inked moth, spread wings, ~460px wide, `stroke: var(--color-forest-ink)`, `stroke-width: 1.5`, `fill: none`, organic curves with visible hand wobble, feathered antennae, heavier body. `viewBox="0 0 460 380"`. No container, no clip, no background.

- [ ] **Step 2: Author variant B — graph-vein moth**

Variant A plus: wing veins resolve into a directed-graph structure — small `<circle r="3">` nodes at vein junctions, thin directed edges with a subtle arrowhead `<marker>`. Exactly one node carries `fill: var(--color-vivid-lime)` to read as an active state. Vein strokes drop to `stroke-width: 1` and `opacity: .55` so the silhouette still dominates.

- [ ] **Step 3: Render both side by side and judge**

Run: serve the repo and screenshot both at 460px wide.
Decision rule from the spec: **if the graph detail makes it read as neither botanical nor technical, ship variant A.** Present both to the user rather than deciding alone if it is close.

- [ ] **Step 4: Derive `favicon.svg` from the chosen variant**

A 32×32 reduction — moth silhouette only, forest ink on transparent, stroke-width scaled to ~2.5 so it survives at tab size. No graph nodes at this scale.

- [ ] **Step 5: Verify and commit**

Run: `bash tools/check-design.sh`
Expected: all PASS.

```bash
git -c safe.directory='D:/York University/personal-portfolio' add assets/moth.svg favicon.svg index.html
git -c safe.directory='D:/York University/personal-portfolio' commit -m "feat: hero moth illustration and favicon"
```

---

## Task 6: Hero section

**Files:**
- Modify: `index.html` (hero slot), `styles.css` (append `.hero` rules)

**Interfaces:**
- Consumes: `.wrap`, `.eyebrow`, `.h-display`, `.accent`, `.lead`, `.btn-cta`, `.btn-ghost` (Task 4); moth SVG (Task 5); approved copy (Task 1).

- [ ] **Step 1: Write the hero markup using the Task 1 copy verbatim**

45/55 asymmetric split — moth left, text right. Exactly one chartreuse CTA.

```html
<section class="hero section" id="top">
  <div class="wrap hero-grid">
    <div class="hero-art" aria-hidden="true"><!-- moth SVG from Task 5 --></div>
    <div class="hero-copy">
      <p class="eyebrow">Computer Science @ York University · AI Engineer</p>
      <h1 class="h-display">I build AI agents<span class="accent">that actually ship.</span></h1>
      <p class="lead">I build multi-agent systems, custom MCP servers, and RAG pipelines — and put them in front of real users, not just in notebooks.</p>
      <div class="hero-actions">
        <a class="btn btn-cta" href="#work">View my work</a>
        <a class="btn btn-ghost" href="#contact">Get in touch</a>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Style it**

```css
.hero-grid { display: grid; grid-template-columns: 45fr 55fr; gap: var(--space-64); align-items: center; }
.hero-copy { display: flex; flex-direction: column; gap: var(--space-14); }
.hero-actions { display: flex; align-items: center; gap: var(--space-24); margin-top: var(--space-14); }
.hero-art svg { width: 100%; height: auto; }
```

- [ ] **Step 3: Verify the type renders at spec**

Run: serve, then in the browser console —
`const h=getComputedStyle(document.querySelector('.h-display')); [h.fontSize, h.letterSpacing, h.lineHeight]`
Expected: `["62px", "-3.968px", "49.6px"]` (62 × −0.064em, 62 × 0.80).

Also confirm `.lead` computed `max-width` is `460px`.

- [ ] **Step 4: Run the check script and commit**

Run: `bash tools/check-design.sh` → all PASS.

```bash
git -c safe.directory='D:/York University/personal-portfolio' add index.html styles.css
git -c safe.directory='D:/York University/personal-portfolio' commit -m "feat: hero section"
```

---

## Task 7: Capabilities section

**Files:**
- Modify: `index.html`, `styles.css`

**Interfaces:**
- Consumes: `.card`, `.eyebrow`, `.h-section`, `.accent`; approved capability copy (Task 1).
- Produces: `.cap-grid`, `.cap-card` (chartreuse surface), `.cap-icon`.

- [ ] **Step 1: Write the markup — three chartreuse cards, each with a thin line icon top-right**

Eyebrow is `What I work with`. Cards use the approved Task 1 one-liners verbatim. Icons are 20px forest-ink line SVGs: a node-graph for Multi-Agent Systems, a layered-stack for RAG & Retrieval, a server for Backend & Deployment. **No chartreuse button in this section** — the cards already carry the accent.

- [ ] **Step 2: Style the cards**

```css
.cap-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-14); margin-top: var(--space-32); }
.cap-card {
  background: var(--color-chartreuse); border-radius: var(--radius-card);
  padding: var(--card-padding); position: relative;
  display: flex; flex-direction: column; gap: var(--space-12);
}
.cap-card h3 {
  font-size: var(--text-subheading); font-weight: var(--weight-semibold);
  letter-spacing: var(--tracking-subheading); line-height: var(--leading-subheading);
  padding-right: var(--space-32);
}
.cap-card p { color: var(--color-forest-ink); }
.cap-icon { position: absolute; top: var(--card-padding); right: var(--card-padding); }
```

Note the body text here is **forest-ink, not sage-dust** — sage-dust on chartreuse is not a tested pairing, and the spec only cleared sage-dust on white.

- [ ] **Step 3: Verify and commit**

Run: `bash tools/check-design.sh` → all PASS. Confirm visually that exactly one accent surface family appears in this section.

```bash
git -c safe.directory='D:/York University/personal-portfolio' add index.html styles.css
git -c safe.directory='D:/York University/personal-portfolio' commit -m "feat: capabilities section"
```

---

## Task 8: Project imagery

**Files:**
- Create: `assets/contextcode.png`, `assets/sixrise.png`

**BLOCKED** on the ContextCode live URL from Task 1 Step 2.

- [ ] **Step 1: Capture ContextCode**

Drive a headless browser to the ContextCode demo URL at viewport `1440×900`, wait for network idle, screenshot, then crop to **16:10** (1440×900 is already exactly 16:10 — crop only if the capture includes chrome). Save as `assets/contextcode.png`.

- [ ] **Step 2: Build the SixRise placeholder at identical dimensions**

1440×900 PNG. White-sheet ground, a forest-ink botanical line composition (reuse motifs from the Task 5 moth — leaves and seed pods, not the moth itself, so the hero stays singular), and `SixRise` set large in Inter 600 with display tracking. No stock imagery, no fabricated UI, nothing that could be mistaken for a real screenshot of the product.

- [ ] **Step 3: Verify both files are byte-identical in dimensions**

Run: `python -c "from PIL import Image; print([Image.open(f).size for f in ['assets/contextcode.png','assets/sixrise.png']])"`
Expected: `[(1440, 900), (1440, 900)]` — identical, so the later swap needs no markup change. If Pillow is unavailable, use `file assets/*.png` and compare the reported geometry.

- [ ] **Step 4: Commit**

```bash
git -c safe.directory='D:/York University/personal-portfolio' add assets/contextcode.png assets/sixrise.png
git -c safe.directory='D:/York University/personal-portfolio' commit -m "assets: project imagery"
```

---

## Task 9: Work section

**Files:**
- Modify: `index.html`, `styles.css`

**Interfaces:**
- Consumes: Task 1 project copy, Task 8 images, `.card`, `.chip`.
- Produces: `.work-grid`, `.project`, `.project-shot`, `.also-grid`.

- [ ] **Step 1: Write the deep cards**

Eyebrow `Selected work`, headline `Things I built` + `<span class="accent">&amp; shipped.</span>`. Two `.project` cards in a 2-column grid. Each: image, name (17px/600), description (sage-dust), bullets, chips, then live + repo links.

Alt text is real and descriptive — `alt="ContextCode dashboard showing an indexed repository and a cited answer"` — not `alt="screenshot"`.

- [ ] **Step 2: Write the compact row — 2 columns, intentional at exactly two items**

```html
<div class="also">
  <p class="eyebrow">Also built</p>
  <div class="also-grid">
    <article><h3>AI Stock Insights</h3><p>…</p><a href="…">GitHub</a></article>
    <article><h3>RateFlix</h3><p>…</p><a href="…">GitHub</a></article>
  </div>
</div>
```

- [ ] **Step 3: Style both, locking the image ratio**

```css
.work-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: var(--space-14); margin-top: var(--space-32); }
.project { display: flex; flex-direction: column; gap: var(--space-14); }
.project-shot {
  width: 100%; aspect-ratio: 16 / 10; object-fit: cover;
  border-radius: var(--radius-card); background: var(--color-mist-paper);
  margin-bottom: var(--space-12);
}
.project h3 { font-size: var(--text-body-lg); font-weight: var(--weight-semibold); letter-spacing: var(--tracking-body-lg); }
.project p, .project li { color: var(--color-sage-dust); }
.project ul { display: flex; flex-direction: column; gap: var(--space-8); }
.project li { padding-left: var(--space-14); position: relative; }
.project li::before { content: "–"; position: absolute; left: 0; }
.chips { display: flex; flex-wrap: wrap; gap: var(--space-7); }
.project-links { display: flex; gap: var(--space-24); margin-top: auto; padding-top: var(--space-12); }

/* Exactly two items — equal columns, never a 3-col grid with a hole */
.also { margin-top: var(--space-56); }
.also-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: var(--space-24); margin-top: var(--space-14); }
.also-grid h3 { font-size: var(--text-body-lg); font-weight: var(--weight-semibold); }
.also-grid p { color: var(--color-sage-dust); max-width: var(--measure); margin-block: var(--space-7); }
```

`aspect-ratio: 16 / 10` plus `object-fit: cover` is what makes the `sixrise.png` swap markup-free.

- [ ] **Step 4: Verify the swap invariant**

Run: serve, then in console —
`[...document.querySelectorAll('.project-shot')].map(i => i.getBoundingClientRect().height)`
Expected: two identical values. If they differ, the ratio lock is broken.

- [ ] **Step 5: Run the check script and commit**

Run: `bash tools/check-design.sh` → all PASS.

```bash
git -c safe.directory='D:/York University/personal-portfolio' add index.html styles.css
git -c safe.directory='D:/York University/personal-portfolio' commit -m "feat: work section with deep cards and compact row"
```

---

## Task 10: Experience, About, Contact

**Files:**
- Modify: `index.html`, `styles.css`

**Interfaces:**
- Consumes: Task 1 approved copy.
- Produces: `.exp-row`, `.about-grid`, `.contact`.

- [ ] **Step 1: Write Experience — Automators Lab only, pure type, no cards**

Role and org left, dates right, four resume bullets below. **The York roles are not included.** No `.card` class in this section.

```html
<section class="section" id="experience">
  <div class="wrap">
    <p class="eyebrow">Experience</p>
    <h2 class="h-section">Where I've worked</h2>
    <div class="exp-row">
      <div class="exp-head">
        <h3>Automators Lab <span class="exp-role">AI/ML Intern</span></h3>
        <p class="exp-date">May 2025 – Sep 2025</p>
      </div>
      <ul><!-- four resume bullets verbatim --></ul>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Build the fold-into-About alternative for comparison**

The spec requires showing the user a version where Experience folds into About as a short line, in case a single-entry section reads thin. Build it behind a temporary `body.exp-folded` class so both can be screenshotted from one file, then delete the losing variant.

- [ ] **Step 3: Write About and Contact**

About: 460px `.prose` column with the approved bio, education (**Expected 2027**), coursework, and CS Hub. Contact: `.h-section` + `.accent`, one chartreuse `mailto:` CTA, ghost LinkedIn and GitHub links.

- [ ] **Step 4: Style**

```css
.exp-row { margin-top: var(--space-32); display: flex; flex-direction: column; gap: var(--space-14); }
.exp-head { display: flex; justify-content: space-between; align-items: baseline; gap: var(--space-24); flex-wrap: wrap; }
.exp-head h3 { font-size: var(--text-subheading); font-weight: var(--weight-semibold); letter-spacing: var(--tracking-subheading); }
.exp-role { font-weight: var(--weight-regular); color: var(--color-pine-shadow); }
.exp-date { color: var(--color-sage-dust); font-size: var(--text-body-sm); }
.exp-row ul { display: flex; flex-direction: column; gap: var(--space-8); max-width: 720px; }
.exp-row li { color: var(--color-sage-dust); padding-left: var(--space-14); position: relative; }
.exp-row li::before { content: "–"; position: absolute; left: 0; }

.about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-64); margin-top: var(--space-32); }
.contact { display: flex; flex-direction: column; gap: var(--space-14); }
.contact-actions { display: flex; align-items: center; gap: var(--space-24); margin-top: var(--space-14); }
```

- [ ] **Step 5: Screenshot both Experience variants, get the user's pick, delete the loser**

- [ ] **Step 6: Run the check script and commit**

Run: `bash tools/check-design.sh` → all PASS.

```bash
git -c safe.directory='D:/York University/personal-portfolio' add index.html styles.css
git -c safe.directory='D:/York University/personal-portfolio' commit -m "feat: experience, about, and contact sections"
```

---

## Task 11: Responsive and final verification

**Files:**
- Modify: `styles.css`

- [ ] **Step 1: Add the two breakpoints**

```css
@media (max-width: 1024px) {
  :root { --text-display: 43px; --tracking-display: -0.051em; --leading-display: 0.90; }
  .hero-grid { grid-template-columns: 1fr; gap: var(--space-32); }
  .hero-art { max-width: 340px; }
  .cap-grid, .work-grid, .about-grid { grid-template-columns: 1fr; }
  .about-grid { gap: var(--space-32); }
}

@media (max-width: 640px) {
  :root { --text-display: 36px; --tracking-display: -0.039em; --leading-display: 1; --text-heading: 36px; --tracking-heading: -0.039em; }
  .nav-toggle { display: block; }
  .nav-menu { display: none; }
  .nav-menu.open { display: flex; flex-direction: column; align-items: flex-start; gap: var(--space-12); }
  .also-grid { grid-template-columns: 1fr; }
  .foot-inner { flex-direction: column; align-items: flex-start; gap: var(--space-14); }
}
```

The `.also-grid` collapse to `1fr` is what makes the two-item row become two equal full-width rows on mobile, per the spec.

- [ ] **Step 2: Screenshot at all three widths**

Run: serve locally (`python -m http.server 8080`), capture at 1440, 768, and 375 px wide.
Expected: no horizontal scrollbar at any width; hero stacks below 1024; nav collapses below 640.

- [ ] **Step 3: Run the full verification battery**

```bash
bash tools/check-design.sh
grep -c 'position: *sticky' styles.css   # expect 0
grep -c 'resume.pdf' index.html          # expect 1
```

Then in the browser console, confirm at most one chartreuse CTA per section:

```js
[...document.querySelectorAll('section')].map(s => ({
  id: s.id || s.className,
  ctas: s.querySelectorAll('.btn-cta').length
})).filter(x => x.ctas > 1)
```

Expected: `[]`.

And confirm no paragraph exceeds the measure:

```js
[...document.querySelectorAll('p')].filter(p => p.getBoundingClientRect().width > 461).map(p => p.className)
```

Expected: `[]` — or only structural paragraphs (`.exp-date`, footer) that are not body copy.

- [ ] **Step 4: Verify every referenced asset resolves**

Run: `for f in $(grep -oE '(href|src)="[^"#h][^"]*"' index.html | cut -d'"' -f2 | sort -u); do [ -e "$f" ] || echo "MISSING: $f"; done`
Expected: no `MISSING:` lines.

- [ ] **Step 5: Commit**

```bash
git -c safe.directory='D:/York University/personal-portfolio' add styles.css
git -c safe.directory='D:/York University/personal-portfolio' commit -m "feat: responsive breakpoints and final verification pass"
```

---

## Self-Review

**Spec coverage:** Positioning → Task 1. Architecture/file table → Tasks 2–4, 8. Tokens → Task 3. Nav (non-sticky) → Task 4 + Task 11 Step 3. Hero copy → Task 6. Moth (both variants, fallback rule) → Task 5. Capabilities → Task 7. Work deep cards + 2-col compact row → Task 9. 16:10 swap lock → Tasks 8–9. Experience (Automators Lab only, plus folded alternative) → Task 10. About with Expected 2027 → Task 10. Contact with line-SVG icons → Tasks 4, 10. Content integrity rules → Task 1. Open gaps → Task 1 Step 2 (blocking) and Task 8 (blocked). Responsive → Task 11. Accessibility → Tasks 4, 9, 11. Verification battery → Task 11. **No gaps.**

**Placeholder scan:** The `[PLACEHOLDER]` tags in Task 1 are deliberate content gaps with a named owner and a blocking gate, not plan evasions. No "TBD", no "add error handling", no "similar to Task N". Every code step carries real code.

**Type consistency:** Class names verified consistent across tasks — `.wrap`, `.eyebrow`, `.h-display`, `.h-section`, `.accent`, `.lead`, `.prose`, `.btn`/`.btn-cta`/`.btn-ghost`/`.btn-pill`, `.card`, `.chip`, `.cap-grid`/`.cap-card`/`.cap-icon`, `.work-grid`/`.project`/`.project-shot`, `.also`/`.also-grid`, `.exp-row`/`.exp-head`, `.about-grid`, `.contact`. Token names in Tasks 4–11 all resolve against the Task 3 definitions; Task 3 Step 2 provides the standing check for this.
