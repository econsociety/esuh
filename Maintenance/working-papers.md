# Working Paper Series

A Working Paper Series is a named collection of related research installments published over time (e.g., a recurring economic index). Each series has its own index page listing all installments in order.

---

## How It Works

| File | Purpose |
|---|---|
| `working-papers/<series-slug>.html` | The series index page — lists all installments automatically |
| `_research/<date>-<title>.md` | Individual installment files — linked to a series via front matter |

The series index page queries all research papers whose `working_paper_series` field matches the series's `series_name`.

---

## Creating a New Series

Create a file in `working-papers/` with only front matter (no body content):

```yaml
---
layout: series
title: "UH Inflation Index"
subtitle: "A recurring analysis of inflation's impact on UH students"
series_name: "UH Inflation Index"
description: "Quarterly analysis tracking how inflation affects the cost of attending the University of Houston."
---
```

### Fields

| Field | Required | Description |
|---|---|---|
| `layout` | yes | Must be `series` |
| `title` | yes | Display name of the series |
| `series_name` | yes | The exact string that installment files use to link to this series |
| `subtitle` | no | Shown below the title on the series page |
| `description` | no | Paragraph shown at the top of the series index |

**Important:** `series_name` is case-sensitive and must match exactly. Copy-paste it when using it in installment files.

The file's URL slug (e.g., `working-papers/uh-inflation-index.html` → `/working-papers/uh-inflation-index/`) does not need to match `series_name` — only `series_name` is used for the lookup.

The series also appears automatically on the Working Papers listing page (`/working-papers/`).

---

## Adding an Installment

Each installment is a regular research paper in `_research/` with three extra front matter fields:

```yaml
---
title: "UH Inflation Index — Spring 2026"
author: Isaac Turner
date: 2026-04-01
topic: Macroeconomics
excerpt: "Fourth installment tracking how inflation has affected UH student costs."
working_paper: true
working_paper_series: "UH Inflation Index"
installment: 4
---
```

### Extra fields

| Field | Description |
|---|---|
| `working_paper` | Set to `true` |
| `working_paper_series` | Must exactly match the `series_name` of the target series |
| `installment` | Integer — installment number, used for ordering and display |

Installments appear on the series index page in installment order and are also listed on the main Research page like any other paper (with a "Working Paper – Installment N" label in the meta line).

---

## Complete Example

**Series file:** `working-papers/uh-cost-of-living.html`

```yaml
---
layout: series
title: "UH Cost of Living Index"
series_name: "UH Cost of Living Index"
description: "Annual tracking of cost-of-living changes for UH students."
---
```

**Installment file:** `_research/2026-09-01-uh-cost-of-living-2026.md`

```yaml
---
title: "UH Cost of Living Index — 2026"
author: Serena Emeonye
date: 2026-09-01
topic: Macroeconomics
excerpt: "Second annual installment of the UH Cost of Living Index."
working_paper: true
working_paper_series: "UH Cost of Living Index"
installment: 2
---

Paper body in Markdown...
```

---

## Removing a Series

1. Delete the `working-papers/<series-slug>.html` file
2. Remove `working_paper: true`, `working_paper_series:`, and `installment:` from the installment files (or delete those files entirely)

The installment papers still appear on the Research page as regular papers unless deleted.
