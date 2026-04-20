# Creating Dynamic Analyses

A Dynamic Analysis is an interactive, data-driven tool embedded on a research page. Readers use dropdowns and buttons to run statistical comparisons directly in the browser — no server required.

Dynamic analyses appear on the Research page alongside regular papers (with a red "Dynamic" badge) and are included in the homepage's "3 most recent" feed.

---

## Architecture

Each analysis is completely self-contained. Nothing is shared between analyses.

```
assets/analyses/<slug>/
  script.js   ← all JavaScript: stats, UI, chart rendering
  style.css   ← all CSS for this analysis's widget
  data.json   ← the dataset this analysis reads at runtime

_dynamic_analyses/<slug>.md
              ← front matter + prose body → becomes the page at /dynamic/<slug>/
```

The layout (`_layouts/dynamic-analysis.html`) automatically loads the right files based on `page.slug` (derived from the filename). You never touch the layout.

---

## Step 1 — Choose a slug

Pick a short, lowercase, hyphenated slug. This becomes the URL and must match between the folder name and the `.md` filename.

Example: slug = `tuition-trends`
- Folder: `assets/analyses/tuition-trends/`
- Analysis file: `_dynamic_analyses/tuition-trends.md`
- URL: `/esuh/dynamic/tuition-trends/`

---

## Step 2 — Create `data.json`

Create `assets/analyses/tuition-trends/data.json`.

The shape is entirely up to you — your `script.js` is the only thing that reads it. Design the schema to match what your analysis needs.

**Reference schema** (the grade comparison analysis uses this):

```json
{
  "meta": {
    "subjects": ["ECON", "MATH"],
    "last_updated": "YYYY-MM"
  },
  "courses": {
    "ECON 2301": {
      "title": "Principles of Macroeconomics",
      "subject": "ECON",
      "catalog": "2301",
      "instructors": {
        "Last, First M": {
          "n_students": 312,
          "n_sections": 13,
          "avg_gpa": 2.72,
          "pct_a": 0.124,
          "grade_counts": { "A": 38, "B": 95, "C": 110, "D": 45, "F": 24 },
          "excluded": { "W": 3, "S": 0, "NCR": 1 }
        }
      }
    }
  }
}
```

Validate your JSON before committing (paste it into [jsonlint.com](https://jsonlint.com) or use a VS Code extension).

---

## Step 3 — Write `script.js`

Create `assets/analyses/tuition-trends/script.js`.

**Rules:**
- Must be a single self-contained IIFE (immediately-invoked function expression)
- No globals exposed (`window.MyThing = ...` — don't do this)
- No external dependencies except Chart.js, which the layout loads before your script
- Plain ES5 JavaScript — no `const`, no arrow functions, no modules (for maximum browser compatibility and no build step)

**The base URL:** The layout injects your asset folder's URL as a `data-base` attribute on the `<script>` tag. Capture it at the very first line of the IIFE — `document.currentScript` returns `null` inside any callback.

```js
(function () {
  'use strict';

  // MUST be first — document.currentScript is null inside callbacks
  var BASE = document.currentScript.dataset.base;
  // BASE = "/esuh/assets/analyses/tuition-trends/" (ends with slash)

  // ── Your constants ──────────────────────────────────────────────
  // var MY_CONSTANT = 42;

  // ── Stats / data processing helpers ────────────────────────────
  // function processData(data) { ... }

  // ── Chart rendering ─────────────────────────────────────────────
  // function renderChart(results, containerEl) { ... }

  // ── UI builder ──────────────────────────────────────────────────
  // Builds controls into document.getElementById('analysis-root')
  // function buildUI(data) { ... }

  // ── Data loader ─────────────────────────────────────────────────
  function loadData() {
    return fetch(BASE + 'data.json')
      .then(function (r) {
        if (!r.ok) throw new Error('HTTP ' + r.status);
        return r.json();
      });
  }

  // ── Bootstrap ───────────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', function () {
    loadData()
      .then(buildUI)
      .catch(function (err) {
        var root = document.getElementById('analysis-root');
        if (root) root.innerHTML = '<p class="ae-error">Error loading data: ' + err.message + '</p>';
      });
  });

}());
```

**Mount point:** Build your entire widget inside `document.getElementById('analysis-root')`. The layout creates this `<div>` with a loading placeholder — your script should replace its contents.

**Chart.js:** The layout loads Chart.js from CDN before your script. Use `new Chart(canvas, config)` directly — no import needed.

**Reference implementation:** See `assets/analyses/grade-comparison/script.js` for a complete 400-line example covering Welch's t-test, dropdowns, Chart.js bar chart, and result interpretation.

---

## Step 4 — Write `style.css`

Create `assets/analyses/tuition-trends/style.css` with all CSS classes your widget uses.

The site's global CSS variables are always available (defined in `assets/css/main.css`):

```css
/* Use these — do not hardcode color values */
var(--primary-color)    /* #C8102E UH red */
var(--accent-color)     /* #B8904D gold */
var(--text-color)       /* main text */
var(--text-secondary)   /* muted text */
var(--light-gray)       /* backgrounds */
var(--border-gray)      /* borders */
var(--font-sans)        /* 'Inter', sans-serif */
var(--shadow-sm)        /* box-shadow values */
var(--white)
```

**Reference implementation:** See `assets/analyses/grade-comparison/style.css` for a complete example (~310 lines of widget styles including responsive breakpoints).

---

## Step 5 — Create the analysis page

Create `_dynamic_analyses/tuition-trends.md`. The filename slug must match the folder name exactly.

```yaml
---
title: "UH Tuition Trends"
subtitle: "How tuition has grown relative to inflation and income, 2000–2025"
layout: dynamic-analysis
topic: Education
dynamic: true
excerpt: "An interactive look at how UH tuition has changed over 25 years relative to inflation and median household income."
date: 2026-05-01
author: Isaac Turner
---

Write 2–4 paragraphs here explaining:

1. What the tool does and how to use it
2. How to interpret the output (what the numbers mean)
3. What the tool *cannot* tell you — confounders, caveats, limitations
```

### Required front matter fields

| Field | Value |
|---|---|
| `title` | Page title (also shown on listing cards) |
| `layout` | Must be `dynamic-analysis` |
| `topic` | Topic tag for the research filter |
| `dynamic` | Must be `true` — enables the Dynamic badge on listing pages |
| `date` | Publication date in `YYYY-MM-DD` |

### Optional fields

| Field | Value |
|---|---|
| `subtitle` | Italic subtitle below the title |
| `excerpt` | Short card description (defaults to first paragraph if omitted) |
| `author` | Full name of the author |

---

## Step 6 — Test locally

```bash
bundle exec jekyll serve
```

Open `http://localhost:4000/esuh/dynamic/tuition-trends/` and verify:

- The page loads without a 404
- The widget area appears (not just a blank page)
- `data.json` loads (check browser DevTools → Network tab — you should see a 200 for `data.json`)
- Your UI renders correctly
- No JavaScript errors in the browser console (DevTools → Console)

If you see a 404 for `data.json`, check that:
1. The slug in `_dynamic_analyses/<slug>.md` matches the folder name in `assets/analyses/<slug>/`
2. The `BASE` variable is captured at the top of your IIFE before any callbacks

---

## Step 7 — Commit and push

```bash
git add assets/analyses/tuition-trends/ _dynamic_analyses/tuition-trends.md
git commit -m "Add tuition trends dynamic analysis"
git push origin your-branch-name
```

Open a pull request against `main`.

---

## Checklist

- [ ] `assets/analyses/<slug>/data.json` — valid JSON
- [ ] `assets/analyses/<slug>/script.js` — self-contained IIFE, `BASE` captured first, mounts to `#analysis-root`
- [ ] `assets/analyses/<slug>/style.css` — widget-specific styles, uses CSS variables
- [ ] `_dynamic_analyses/<slug>.md` — `dynamic: true`, `layout: dynamic-analysis`, prose body
- [ ] Slug in `.md` filename matches folder name exactly
- [ ] Tested: widget loads, data fetches, analysis runs, no console errors
- [ ] Pull request opened against `main`
