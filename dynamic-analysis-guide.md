---
layout: page
title: "Dynamic Analysis: Contributor Guide"
subtitle: "How to add a new interactive analysis to the site"
---

This guide is for ESUH members who want to publish a new Dynamic Analysis — an interactive, data-driven tool — on the research pages. No build tools or Node.js are required; everything runs as plain HTML, CSS, and JavaScript directly in the browser.

---

## Overview

Each Dynamic Analysis is fully self-contained in its own folder. Nothing is shared between analyses.

```
assets/analyses/<slug>/
  script.js   — all JavaScript for this analysis (stats, UI, chart)
  style.css   — all CSS specific to this analysis's widget
  data.json   — the dataset this analysis reads at runtime

_dynamic_analyses/<slug>.md
              — front matter + prose body (becomes the page at /dynamic/<slug>/)
```

The layout (`_layouts/dynamic-analysis.html`) automatically loads the right `script.js` and `style.css` based on the page slug. You do not need to touch the layout.

---

## Step 1 — Create the analysis folder

Pick a short, lowercase, hyphenated slug for your analysis (e.g. `tuition-trends`). Create its folder:

```
assets/analyses/tuition-trends/
```

---

## Step 2 — Prepare your dataset

Create `assets/analyses/tuition-trends/data.json`. The shape of this file is entirely up to you — your `script.js` is the only thing that reads it, so design the schema around what your analysis needs.

The existing grade comparison analysis uses this schema as a reference:

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

---

## Step 3 — Write `script.js`

Create `assets/analyses/tuition-trends/script.js`. This file must be a single self-contained IIFE — no external dependencies other than Chart.js (which the layout loads for you before your script runs).

The layout passes your asset folder's URL as a `data-base` attribute on the `<script>` tag. Capture it at the very top of your IIFE so your script can fetch `data.json`:

```js
(function () {
  'use strict';

  var BASE = document.currentScript.dataset.base;
  // BASE ends with a slash, e.g. "/esuh/assets/analyses/tuition-trends/"

  // ... your stats, chart, and UI code ...

  document.addEventListener('DOMContentLoaded', function () {
    fetch(BASE + 'data.json')
      .then(function (r) { return r.json(); })
      .then(function (data) {
        buildUI(data);
      })
      .catch(function (err) {
        var root = document.getElementById('analysis-root');
        if (root) root.innerHTML = '<p class="ae-error">Error: ' + err.message + '</p>';
      });
  });

}());
```

Your script should mount everything into `<div id="analysis-root">`, which the layout provides. Use `document.getElementById('analysis-root')` as your mount point.

**Important:** `document.currentScript` is only available synchronously during script parsing. Capture `BASE` as the first line of the IIFE — never inside a `DOMContentLoaded` handler or other callback.

---

## Step 4 — Write `style.css`

Create `assets/analyses/tuition-trends/style.css` with all CSS classes your widget needs. CSS custom properties from the site's design system (`var(--primary-color)`, `var(--font-sans)`, etc.) are defined in the global stylesheet and are available here without duplication.

See `assets/analyses/grade-comparison/style.css` for a complete example.

---

## Step 5 — Create the analysis page

Create `_dynamic_analyses/tuition-trends.md`. The filename slug must match your folder name exactly.

```yaml
---
title: "UH Tuition Trends"
subtitle: "One-line description shown under the title"
layout: dynamic-analysis
topic: Education
dynamic: true
excerpt: "One or two sentences shown on the research listing card."
date: 2026-05-01
author: your-name
---
```

After the front matter, write 2–4 paragraphs of prose in Markdown. This appears above the widget and should explain:

1. What the tool does and how to use it
2. How to interpret the output
3. What the tool cannot tell you — confounders, limitations, caveats

### Front matter fields

| Field | Required | Description |
|---|---|---|
| `title` | yes | Page title and card heading |
| `subtitle` | no | Italic subtitle below the title |
| `layout` | yes | Must be `dynamic-analysis` |
| `topic` | yes | Topic tag (used in the research filter) |
| `dynamic` | yes | Must be `true` — enables the Dynamic badge on listing pages |
| `excerpt` | yes | Short description for the research listing card |
| `date` | yes | Publication date in `YYYY-MM-DD` |
| `author` | no | Lowercase team member name (links to team page) |

---

## Step 6 — Test locally

If you have Ruby and Jekyll installed:

```bash
bundle exec jekyll serve
```

Open `http://localhost:4000/esuh/dynamic/tuition-trends/` in your browser. Open the browser console (F12) to check for JavaScript errors. Verify:

- `data.json` loads (check the Network tab)
- The widget renders correctly
- The analysis runs and produces output

If you don't have Jekyll installed, push your branch and check the GitHub Pages preview.

---

## Step 7 — Push and open a pull request

```bash
git add assets/analyses/tuition-trends/ _dynamic_analyses/tuition-trends.md
git commit -m "Add tuition trends dynamic analysis"
git push origin your-branch-name
```

Open a pull request against `main`. The site rebuilds automatically on GitHub Pages once merged.

---

## Quick checklist

- [ ] `assets/analyses/<slug>/data.json` created with your dataset
- [ ] `assets/analyses/<slug>/script.js` — self-contained IIFE, fetches `BASE + 'data.json'`, mounts to `#analysis-root`
- [ ] `assets/analyses/<slug>/style.css` — analysis-specific widget styles
- [ ] `_dynamic_analyses/<slug>.md` — front matter includes `dynamic: true`, prose body explains the tool
- [ ] Slug in `_dynamic_analyses/<slug>.md` matches the folder name in `assets/analyses/<slug>/`
- [ ] Tested locally or in a preview — widget loads, analysis runs
- [ ] Pull request opened against `main`
