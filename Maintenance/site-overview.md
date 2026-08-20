# Site Overview

This document describes the ESUH website's architecture, file structure, and how all the pieces fit together. Read this first before making any changes.

---

## What Kind of Site This Is

The site is a **Jekyll static site** hosted on **GitHub Pages**. There is no server, no database, and no build step you need to run manually — GitHub rebuilds the site automatically whenever you push a commit to the `main` branch.

**Live URL:** `https://econsociety.github.io/esuh`

Jekyll turns Markdown and HTML files into a complete website. You write content in plain text files; Jekyll assembles the pages and deploys them.

**No npm, no Node.js, no bundler.** All JavaScript runs as plain files directly in the browser.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Site generator | Jekyll 4.3.2 |
| Hosting | GitHub Pages |
| Markup | Markdown (Kramdown) + HTML |
| Styling | Vanilla CSS (`assets/css/main.css`) |
| JavaScript | Vanilla JS (no build tools) |
| Math rendering | MathJax 3 (CDN) |
| Charts | Chart.js 4.4.1 (CDN, only on analysis pages) |
| Fonts | Inter (Google Fonts) |

---

## File Structure

```
esuh/
├── _config.yml                 ← Site settings (rarely needs editing)
├── Gemfile / Gemfile.lock      ← Ruby dependencies (don't edit)
│
├── _data/
│   ├── officers.yml            ← Drives the Team page
│   └── authors.yml             ← Research author bios (currently unused by layouts)
│
├── _includes/
│   ├── header.html             ← Site navigation (shared across all pages)
│   └── footer.html             ← Site footer (shared across all pages)
│
├── _layouts/
│   ├── default.html            ← Master template: loads CSS, fonts, MathJax, header, footer
│   ├── page.html               ← Generic content page (extends default)
│   ├── home.html               ← Homepage wrapper (extends default)
│   ├── research.html           ← Individual research paper page (extends default)
│   ├── event.html              ← Individual event page (extends default)
│   ├── dynamic-analysis.html   ← Interactive analysis page (extends default, loads per-analysis JS/CSS)
│   └── series.html             ← Working paper series index page (extends default)
│
├── _research/                  ← One .md file per research paper → /research/<title>/
├── _events/                    ← One .md file per event → /events/<title>/
├── _dynamic_analyses/          ← One .md file per dynamic analysis → /dynamic/<name>/
│
├── assets/
│   ├── css/main.css            ← All site-wide styles (~1250 lines)
│   ├── js/main.js              ← Research page search/filter (36 lines)
│   ├── analyses/
│   │   └── grade-comparison/   ← Self-contained analysis: script.js, style.css, data.json
│   └── images/
│       ├── *.jpg / *.png       ← Team photos and other images
│       └── events/             ← Event photos
│
├── working-papers/             ← One .html file per series (front matter only)
│
├── index.html                  ← Homepage
├── research.html               ← Research archive (all papers + analyses, filterable)
├── events.html                 ← Events listing (auto-sorted past/upcoming)
├── team.html                   ← Team page (auto-built from _data/officers.yml)
├── working-papers.html         ← Working paper series index
└── dynamic-analysis-guide.md  ← Developer guide for new dynamic analyses
```

---

## How Jekyll Collections Work

Three content types use Jekyll Collections — they are automatically turned into pages:

| Collection folder | URL pattern | Layout applied |
|---|---|---|
| `_research/` | `/research/<title>/` | `research` |
| `_events/` | `/events/<title>/` | `event` |
| `_dynamic_analyses/` | `/dynamic/<name>/` | `dynamic-analysis` |

The `permalink` in `_config.yml` controls the URL pattern. The `defaults` block in `_config.yml` applies layouts automatically — you don't need to specify `layout:` in most files.

**Exception:** dynamic analyses are not in the defaults block, so they must include `layout: dynamic-analysis` in their front matter.

---

## How the Dynamic Analysis System Works

Each dynamic analysis is fully self-contained. The `dynamic-analysis.html` layout reads `page.slug` (derived from the filename) to load:

- `assets/analyses/<slug>/style.css` — analysis-specific CSS
- `assets/analyses/<slug>/script.js` — all JS (stats, UI, chart)

The script receives the asset folder's base URL via a `data-base` attribute and fetches `data.json` from that same folder.

Adding a new analysis = creating `_dynamic_analyses/<slug>.md` and `assets/analyses/<slug>/` with three files. No other files need to be touched.

See [`dynamic-analyses.md`](./dynamic-analyses.md) for the full walkthrough.

---

## How Pages Become URLs

| File | URL |
|---|---|
| `index.html` | `/esuh/` |
| `research.html` | `/esuh/research/` |
| `events.html` | `/esuh/events/` |
| `team.html` | `/esuh/team/` |
| `working-papers.html` | `/esuh/working-papers/` |
| `_research/2026-03-15-my-paper.md` | `/esuh/research/2026-03-15-my-paper/` |
| `_events/2026-09-10-kickoff.md` | `/esuh/events/2026-09-10-kickoff/` |
| `_dynamic_analyses/grade-comparison.md` | `/esuh/dynamic/grade-comparison/` |
| `working-papers/uh-inflation-index.html` | `/esuh/working-papers/uh-inflation-index/` |

**Important for links:** All internal links must use the `relative_url` Liquid filter to prepend the `/esuh` base path. Example: `{{ '/team' | relative_url }}` → `/esuh/team`. Hardcoded paths like `/team` will 404 in production.

---

## The CSS Design System

`assets/css/main.css` defines CSS custom properties (variables) in the `:root` block:

```css
--primary-color: #D6495A   /* ESUH pink-red */
--accent-color: #1a1a1a    /* black */
--font-sans: 'Inter', sans-serif
--content-width: 740px
/* ...etc */
```

All site styles and per-analysis stylesheets reference these variables. Do not hardcode color values — use the variables so a future redesign only requires changing one place.

---

## Local Development

Requires Ruby and Bundler. Run once after cloning:

```bash
bundle install
```

Then start the development server:

```bash
bundle exec jekyll serve
```

Visit `http://localhost:4000/esuh/`. The server auto-rebuilds on file saves; refresh the browser to see changes. Liquid template errors appear in the terminal.

---

## Deploying Changes

1. Commit your changes to a branch
2. Push and open a pull request against `main`
3. After merging to `main`, GitHub Pages rebuilds automatically (takes ~1–2 minutes)
4. Visit the live URL to verify

Never push directly to `main` without a pull request unless you are the sole maintainer and are making a trivial change.
