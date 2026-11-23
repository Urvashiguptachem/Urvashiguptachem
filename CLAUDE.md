# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Urvashi Gupta's chemistry notes website: illustrated spectroscopy note pages (JPG images) grouped into Fundamentals, UV-Vis, IR, Raman and NMR. Each topic page also has its own Mini Lab tools and a multiple-choice quiz. Plain static HTML/CSS/JS with no framework, no package.json, no build step and no tests.

## Commands

- Run locally: `python -m http.server 5500 --bind 127.0.0.1` from the repo root, then open http://127.0.0.1:5500/. Opening `index.html` directly via `file://` mostly works, but use the server so that relative image paths and `#note=` deep links behave as they do in production.
- Syntax-check JS: `node --check app.js`
- Deploy: Vercel project `urvashiguptachem` (framework preset "Other", no build command, output `./`) is linked to GitHub `Urvashiguptachem/Urvashiguptachem`. Every push to `main` redeploys. `urvashigupta.vercel.app` belongs to someone else, so don't use it.
- Pushing: this machine's default GitHub credential is a different account. The remote URL embeds `Urvashiguptachem@` so Git Credential Manager uses the right account; keep it that way.

## Architecture

- Multi-page site, one shared `styles.css` + `app.js` at the root:
  - `index.html`: home (hero, topic tiles `#elements`, tool index `#toolIndex`). No quiz on the home page. Tiles, page counts and the tool index are rendered from `TOPICS`/`NOTES`, so nothing is hardcoded.
  - `fundamentals/`, `uv-vis/`, `ir/`, `raman/`, `nmr/` (`index.html` each): topic header `#topicHero`, that topic's notes `#groups`, its Mini Lab tools and its quiz `#quizCard`.
  - Each page sets `<body data-page="home|fundamentals|uv|ir|raman|nmr" data-base="">` (`data-base="../"` in folders). `BASE` prefixes every asset/link path. Header `#nav`, footer `#footer`, the lightbox and toast are injected by `app.js`.
  - Vercel `cleanUrls` + `trailingSlash`, so pages are served at `/ir/` etc. Old one-page links `/#note=<id>` redirect to the topic page.
- `app.js` is a single script, organised as sequential sections. Page-specific sections are wrapped in `on("#someId", () => {...})` and only run when that element is on the page. Shared data (`TOPICS`, `NOTES`, `IR`, `ARTIFACTS`, `read`) is global.
  - `CONFIG` at the top holds the author name, role, bio and social links. An empty string hides that icon. The icon SVGs and brand colours are in `ICONS`.
  - `TOPICS` (label, short, sym, slug = folder, tools list for the home index) and `NOTES` are the content model. A note's `id`, `src` and `thumb` are derived from `topic` + `n` (`notes/<topic>/NN.jpg` and `NN-thumb.jpg`). The `k` field is hidden search keywords: write it from the note image's actual text so search works.
  - Gallery: on a topic page it shows only `PAGE`'s notes; search sets `visible`. The lightbox navigates within `visible`, so it respects the current filter. It writes `#note=<id>` to the URL, which is read on load to deep-link a page.
  - Mini lab: each tool is an `<article class="tool">` in its topic page's `.lab-grid`; when adding one, also add its name to that topic's `tools` in `TOPICS`. Tools: EM spectrum explorer (`REGIONS`), Beer–Lambert solver, calibration-curve builder (`calData`, least squares), IR peak finder (`IR` from IR p.5, `ARTIFACTS`, `DIPS`), Hooke's-law calculator (`ATOMS`, `BONDS`, k in N/m), NMR chemical shift explorer (`SHIFTS` from NMR p.3/p.9), splitting simulator (Pascal/binomial), DBE calculator (formula parser), ¹³C/DEPT viewer (`DEPT_MOLS` literature shifts, `DEPT_RULE` per lane), Raman shift/Stokes–anti-Stokes calculator (formulas from Raman p.4), IR-vs-Raman activity (`MOLS` inside that section).
  - Quiz: `QUIZZES` is keyed by topic: `{title, sub, poster, posterLabel, qs: [[question, [A,B,C,D], correctIndex, explanation]]}`. Each topic page shows its own. Weekly quiz posters live in `notes/quiz/` (01 = week-1 cover, 02 = week-1 IR & UV-Vis questions, split between those two pages; 03 = week-2 Raman). Add new weekly poster questions to the matching topic's `qs`. Best scores are stored as `topic-<key>` in `localStorage` key `quizBest`.
  - Background molecule canvas, scroll-reveal observer.
- `localStorage` (always via the try/catch `store` helper) holds only per-visitor state: theme, read-page IDs and quiz best scores.
- `styles.css`: theme tokens on `:root` (dark is the default) and `:root[data-theme="light"]`. Topic colours are `--c-fund`, `--c-uv`, `--c-ir`, `--c-raman` and `--c-nmr`; components receive them through a local `--c` variable. The canvas reads `--mol-line` / `--mol-dot` as raw `r, g, b` triplets.

## Adding notes

1. Save the full image as `notes/<topic>/NN.jpg` (JPEG, quality ~88) and a thumbnail as `NN-thumb.jpg` (fit within 520×700, quality ~80). Pillow is available for this.
2. Add an entry to `NOTES` in `app.js`. Order within a topic is the series page order.
3. For a new topic: add it to `TOPICS` (nav, footer, home tile and counts update automatically), add a `--c-<topic>` colour for both themes plus a `.tag.<topic>` rule, and create `<slug>/index.html` by copying an existing topic page and changing `data-page`, the header text and the tools.
