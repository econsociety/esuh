# ESUH Website — Maintenance Guide

This is the website for the Economics Society at the University of Houston (ESUH), built with [Jekyll](https://jekyllrb.com/) and hosted on [GitHub Pages](https://econsociety.github.io/esuh).

Everything on this site is driven by simple text files — no coding required for day-to-day updates. This guide covers every common task.

---

## Quick Reference

| Task | Where |
|---|---|
| Add / edit an event | Create or edit a file in `_events/` |
| Add a research paper | Create a file in `_research/` |
| Add an interactive analysis | Create a file in `_dynamic_analyses/` + a data file in `assets/data/` |
| Update officer info | Edit `_data/officers.yml` |
| Add a research author | Edit `_data/authors.yml` |
| Add a working paper series | Create a file in `working-papers/` |

All changes take effect automatically after committing to the `main` branch — no manual rebuilds needed.

---

## Events

### How events work

Events are stored as Markdown files in the `_events/` folder. Their status updates **automatically** based on today's date — you never need to move files around or change a status field:

- **Upcoming** — event date is in the future (shown on the homepage and Events page)
- **Past** — event date has passed (shown as a card grid on the Events page)

### Adding an event

1. Create a new file in `_events/` named `YYYY-MM-DD-short-name.md`
   Example: `2026-09-10-fall-kickoff.md`

2. Add front matter at the top:

```yaml
---
title: "Fall Kickoff Meeting"
event_date: 2026-09-10
time: "6:00 PM - 8:00 PM"
location: "McElhinney Hall, Room 100"
description: "Our first general body meeting of the fall semester."
link: "https://optional-registration-link.com"
---
```

3. Optionally write a recap below the front matter (appears on the event's individual page):

```markdown
## Event Recap

Over 60 students attended our fall kickoff...

![Photo caption]({{ '/assets/images/events/fall-kickoff-1.jpg' | relative_url }})
```

**Required fields:** `title`, `event_date`
**Optional fields:** `time`, `location`, `description`, `link`

### Adding event photos

Place images in `assets/images/events/` and reference them in the event file body:

```markdown
![Alt text]({{ '/assets/images/events/your-image.jpg' | relative_url }})
```

Recommended: JPG or PNG, under 500 KB, 800×600 px or similar.

---

## Research

### How research works

Research papers are stored as Markdown files in `_research/`. They appear automatically on the Research page and homepage, sorted by date with the most recent first. The **3 most recent** pieces (papers and/or dynamic analyses) are shown automatically on the homepage — no extra configuration needed.

The Research page includes a **topic filter** that populates itself from whatever topics exist in the files — no configuration needed.

### Adding a research paper

1. Create a file in `_research/` named `YYYY-MM-DD-short-title.md`
   Example: `2026-03-15-houston-labor-markets.md`

2. Add front matter:

```yaml
---
title: "Your Paper Title"
subtitle: "Optional subtitle"
author: isaac
date: 2026-03-15
topic: Labor Economics
excerpt: "One or two sentence summary that appears on the research listing page."
---
```

3. Write the paper body below the front matter using standard Markdown. LaTeX math is supported via MathJax:

```markdown
## Abstract

Your abstract here. Inline math: $E = mc^2$. Display math:

$$\hat{\beta} = (X'X)^{-1}X'y$$

## Introduction
...
```

**Required fields:** `title`, `author`, `date`, `topic`
**Optional fields:** `subtitle`, `excerpt`, `working_paper`, `working_paper_series`, `installment`, `citations`

### Author keys

The `author` field must match a key in `_data/authors.yml`. Currently available:

- `isaac` — Isaac Turner
- `serena` — Serena Emeonye
- `corey` — Corey Maurice

To add a new author, add an entry to `_data/authors.yml` (see the Officers section for the pattern).

### Topics

Use consistent topic names so the filter works correctly. You can use any value — new ones appear in the filter automatically. Some examples in use:

- Labor Economics, Macroeconomics, Microeconomics
- Education, Market Economics, Economic Development
- Econometrics, Public Economics, Environmental Economics

### Citations

```yaml
citations:
  - "Author, A. (Year). Title. *Journal*, Volume(Issue), Pages."
  - "https://doi.org/10.xxxx/example"
```

URLs in citations are automatically turned into clickable links.

### Working paper series

Papers that belong to a series need these extra fields:

```yaml
working_paper: true
working_paper_series: "UH Inflation Index"
installment: 2
```

The `working_paper_series` value must exactly match the `series_name` in the corresponding file under `working-papers/`.

### Adding a new working paper series

Create a file in `working-papers/` (e.g., `working-papers/my-series.html`) with only front matter:

```yaml
---
layout: series
title: "My Series Name"
subtitle: "Optional subtitle"
series_name: "My Series Name"
description: "A short description of what this series is about."
---
```

The series page automatically lists all papers whose `working_paper_series` matches `series_name`.

---

## Dynamic Analyses

Dynamic analyses are interactive tools — the reader uses dropdowns and buttons to run statistical comparisons directly in the browser. They appear on the Research page alongside regular papers (with a red "Dynamic" badge) and are included in the homepage's "3 most recent" feed.

### How they work

Each dynamic analysis has two parts:

| Part | Location | What it does |
|---|---|---|
| Data file | `assets/data/<name>.json` | The dataset the tool reads at runtime |
| Analysis file | `_dynamic_analyses/<slug>.md` | Front matter config + prose explanation |

### Adding a dynamic analysis

1. **Prepare your data file** — place a `.json` file in `assets/data/`. See `assets/data/README-grades-schema.md` for the grades data schema. Name it descriptively, e.g. `grades-econ-2026.json`.

2. **Create the analysis file** in `_dynamic_analyses/`:

```yaml
---
title: "Instructor Grade Comparison"
subtitle: "Compare grade distributions between two instructors"
layout: dynamic-analysis
dataset: grades-econ-2026        # filename in assets/data/, without .json
topic: Education
excerpt: "Short description shown on the research listing card."
date: 2026-04-01
author: isaac
ui:
  min_students: 20               # hide instructors with fewer students than this
analysis:
  type: group_comparison
  group_by: instructor
---

Write 2–4 paragraphs here explaining what the tool does, how to read
the results, and any important limitations or caveats.
```

3. Commit both files and push to `main`.

For a detailed walkthrough — including how to structure data, test locally, and add new analysis types — see the **[Contributor Guide](/esuh/dynamic-analysis-guide/)** on the live site, or read `dynamic-analysis-guide.md` in this repository.

---

## Officers

All officer information lives in **`_data/officers.yml`**. Editing this file is all that's needed to update the Team page — no HTML editing required.

### Updating an officer

Open `_data/officers.yml` and edit the relevant block:

```yaml
- name: Jane Smith
  role: President
  image: jane-pic.jpg
  linkedin: https://www.linkedin.com/in/jane-smith
  bio: Jane is a senior majoring in Economics.
```

### Adding a new officer

Copy any existing block and fill in the fields. Order in the file determines order on the page.

```yaml
- name: New Person
  role: Their Role
  image: newperson-pic.jpg       # filename in assets/images/
  linkedin:                      # leave blank if none
  bio:                           # leave blank if none
```

Then upload their photo to `assets/images/` with the matching filename.

### Removing an officer

Delete their block from `_data/officers.yml`.

---

## Site Structure

```
esuh/
├── _data/
│   ├── officers.yml            ← Edit to update the Team page
│   └── authors.yml             ← Edit to add research authors
├── _events/                    ← One .md file per event
├── _research/                  ← One .md file per research paper
├── _dynamic_analyses/          ← One .md file per interactive analysis
├── working-papers/             ← One .html file per series (front matter only)
├── assets/
│   ├── css/main.css            ← All styles
│   ├── data/                   ← JSON datasets for dynamic analyses
│   ├── js/
│   │   ├── main.js             ← Research page filtering
│   │   ├── analysis-engine.js  ← Dynamic analysis framework
│   │   ├── interpretations.js  ← Statistical interpretation text
│   │   └── charts/             ← Chart rendering (Chart.js wrappers)
│   └── images/                 ← All images (events/ subfolder for event photos)
├── _layouts/
│   ├── default.html            ← Master template (header/footer)
│   ├── page.html               ← Generic page template
│   ├── research.html           ← Research paper template
│   ├── dynamic-analysis.html   ← Interactive analysis template
│   ├── event.html              ← Event page template
│   └── series.html             ← Working paper series template
├── _includes/
│   ├── header.html             ← Site navigation
│   └── footer.html             ← Site footer
├── index.html                  ← Homepage
├── research.html               ← Research archive (all types, sorted by date)
├── events.html                 ← All events (auto-sorted by date)
├── team.html                   ← Team page (auto-built from _data/officers.yml)
├── working-papers.html         ← Working paper series index
├── dynamic-analysis-guide.md   ← Contributor guide for dynamic analyses
└── _config.yml                 ← Site settings (rarely needs editing)
```

---

## Local Development

```bash
bundle install
bundle exec jekyll serve
```

Then visit `http://localhost:4000/esuh/`.

---

## Resources

- [Jekyll Documentation](https://jekyllrb.com/docs/)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Markdown Guide](https://www.markdownguide.org/)
- [MathJax Documentation](https://docs.mathjax.org/)
