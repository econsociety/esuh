---
layout: page
title: "Dynamic Analysis: Contributor Guide"
subtitle: "How to add new interactive analyses and datasets to the site"
---

This guide is for ESUH members who want to publish a new Dynamic Analysis — an interactive, data-driven tool — on the research pages. No build tools or Node.js are required; everything runs as plain HTML, CSS, and JavaScript directly in the browser.

---

## Overview

Each Dynamic Analysis has three parts:

| Part | Location | Purpose |
|---|---|---|
| Dataset | `assets/data/<name>.json` | The underlying data the tool reads at runtime |
| Analysis file | `_dynamic_analyses/<slug>.md` | Front matter config + prose body |
| Layout | `_layouts/dynamic-analysis.html` | Shared layout — you don't need to touch this |

---

## Step 1 — Prepare your dataset

Your data file goes in `assets/data/` and must be valid JSON. The site currently supports the **grades schema** (instructor grade distributions), but any shape of data can work once a matching analysis type is registered.

### Grades schema

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

Key rules:

- `n_students`, `avg_gpa`, and `pct_a` are **pre-calculated** and pooled across all terms for that instructor. Do not include per-semester breakdowns.
- `grade_counts` uses whole-letter grades only: `A`, `B`, `C`, `D`, `F`. No plus/minus.
- `excluded` stores withdrawal (`W`), satisfactory (`S`), and no-credit (`NCR`) grades. These are **not** counted in `n_students` or any statistical calculation.
- `avg_gpa` is the pooled mean GPA. `pct_a` is `A_count / n_students`.
- See `assets/data/README-grades-schema.md` for the full specification and field definitions.

Name your file something descriptive, e.g. `grades-econ-2025.json`. Place it at:

```
assets/data/grades-econ-2025.json
```

---

## Step 2 — Create the analysis file

Create a Markdown file in `_dynamic_analyses/`. The filename becomes the URL slug:

```
_dynamic_analyses/my-analysis.md  →  /dynamic/my-analysis/
```

### Required front matter

```yaml
---
title: "Your Analysis Title"
subtitle: "One-line description shown under the title"
layout: dynamic-analysis
dataset: grades-econ-2025        # filename without .json
topic: Education                 # shows in research filter
excerpt: "One or two sentences shown on the research listing card."
date: 2026-04-01
author: your-name                # lowercase, matches your team page entry
ui:
  min_students: 20               # hide instructors with fewer students than this
analysis:
  type: group_comparison         # the registered analysis type to use
  group_by: instructor
---
```

### Front matter fields

| Field | Required | Description |
|---|---|---|
| `title` | yes | Page title and card heading |
| `subtitle` | no | Italic subtitle below the title |
| `layout` | yes | Must be `dynamic-analysis` |
| `dataset` | yes | Filename in `assets/data/` without `.json` |
| `topic` | yes | Topic tag (used in the research filter) |
| `excerpt` | yes | Short description for the research listing card |
| `date` | yes | Publication date in `YYYY-MM-DD` |
| `author` | no | Lowercase team member name |
| `ui.min_students` | no | Minimum n to show an instructor (default: 20) |
| `analysis.type` | yes | Which registered analysis engine to use |

### Prose body

After the front matter, write 2–4 paragraphs of background prose in Markdown. This appears above the interactive widget and should explain:

1. What the tool does and how to use it
2. How to interpret the statistical output (p-value, effect size, etc.)
3. What the tool *cannot* tell you — confounders, limitations, caveats

---

## Step 3 — Test locally

If you have Ruby and Jekyll installed:

```bash
bundle exec jekyll serve
```

Then open `http://localhost:4000/esuh/dynamic/my-analysis/` in your browser. Open the browser console (F12) to see any JavaScript errors. Make sure:

- The dropdowns populate from your JSON
- Selecting two instructors enables the Run Comparison button
- Clicking Run Comparison produces a chart and interpretation

If you don't have Jekyll installed, you can push the branch and check the GitHub Pages preview.

---

## Step 4 — Push and open a pull request

```bash
git add assets/data/my-dataset.json _dynamic_analyses/my-analysis.md
git commit -m "Add [title] dynamic analysis"
git push origin your-branch-name
```

Open a pull request against `main`. The site will rebuild automatically on GitHub Pages once merged.

---

## Adding a new analysis type

If your analysis needs different controls or a different statistical method, you can register a new type in `assets/js/analysis-engine.js`. Add it to the `types` registry object:

```js
AnalysisEngine.types.my_new_type = {
  load: function(data, config, selections) {
    // return processed data for the selected context
  },
  run: function(processedData, selections) {
    // run the statistical test, return a results object
  },
  render: function(results, uiConfig) {
    // call a chart function and/or interpretations function
  }
};
```

Then set `analysis.type: my_new_type` in your analysis file's front matter. If your analysis needs different UI controls (different dropdowns, sliders, etc.), you'll also need to update the `buildUI` function in `analysis-engine.js` to conditionally build the right controls based on `ANALYSIS_CONFIG.type`.

For charts, add a new file under `assets/js/charts/` and load it from `_layouts/dynamic-analysis.html` — or open an issue and ask for help.

---

## Quick checklist

- [ ] Dataset file placed at `assets/data/<name>.json`
- [ ] Dataset validates against the schema (open it in a JSON validator)
- [ ] Analysis file at `_dynamic_analyses/<slug>.md` with all required front matter
- [ ] Prose body explains the tool, how to read results, and limitations
- [ ] Tested locally or in a preview deployment — dropdowns populate, comparison runs
- [ ] Pull request opened against `main`
