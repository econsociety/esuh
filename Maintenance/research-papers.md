# Adding Research Papers

Research papers live in `_research/` as Markdown files. Each file becomes a page at `/research/<filename-slug>/` and appears automatically on the Research archive page and homepage.

---

## File Naming

```
_research/YYYY-MM-DD-short-title.md
```

Examples:
- `_research/2026-03-15-houston-labor-markets.md`
- `_research/2026-05-01-uh-tuition-analysis.md`

The date in the filename drives the sort order (newest first). Use the actual publication date.

---

## Front Matter

```yaml
---
title: "Your Paper Title"
subtitle: "Optional subtitle shown below the title"
author: Isaac Turner
date: 2026-03-15
topic: Labor Economics
excerpt: "One or two sentences shown on the research listing card. Keep it under 200 characters."
---
```

### Required fields

| Field | Description |
|---|---|
| `title` | Displayed as the page heading and listing card title |
| `author` | Full name of the author — must match a name in `_data/officers.yml` for the team page link to work |
| `date` | Publication date in `YYYY-MM-DD` format |
| `topic` | Topic tag used by the research filter. Use an existing topic if possible (see below) |

### Optional fields

| Field | Description |
|---|---|
| `subtitle` | Italic subtitle shown below the title |
| `excerpt` | Short description for listing cards. If omitted, Jekyll uses the first paragraph of the body. |
| `citations` | List of reference strings (see Citations section below) |
| `working_paper` | Set to `true` if this belongs to a working paper series |
| `working_paper_series` | Exact name of the series (must match `series_name` in the series file) |
| `installment` | Integer — the installment number within the series |

---

## Topic Tags

The Research page filter is populated automatically from whatever `topic` values exist in the files. Use a consistent name so papers are grouped correctly.

**Topics currently in use:**
- `Education`
- `Labor Economics`
- `Macroeconomics`
- `Microeconomics`
- `Market Economics`
- `Economic Development`
- `Econometrics`
- `Public Economics`
- `Environmental Economics`

You can introduce a new topic just by using a new string — it will appear in the filter automatically. Avoid minor variations of existing topics (e.g., don't use both `Labor Economics` and `Labor`).

---

## Writing the Body

Write the paper body in standard Markdown below the front matter. A header image is conventional:

```markdown
---
[front matter]
---

![Alt text for image]({{ '/assets/images/your-image.jpg' | relative_url }})
[*Photo credit / license*](https://link-to-source.com)

#### Introduction

Your introduction paragraph here...

#### Section Title

Content...

#### Conclusion

...
```

**Important:** Always use `{{ '/assets/images/filename.jpg' | relative_url }}` for image paths, never a bare path like `/assets/images/...`. The `relative_url` filter prepends the site's `/esuh` base path.

### LaTeX Math

MathJax is loaded on all pages. Use standard LaTeX delimiters:

- Inline: `$E = mc^2$`
- Display block: `$$\hat{\beta} = (X'X)^{-1}X'y$$`

---

## Citations

Add a `citations` list to front matter. Each entry is a string. URLs in citation strings are automatically converted to clickable links by the research layout.

```yaml
citations:
  - "Author, A. (Year). Title. *Journal*, Volume(Issue), Pages. https://doi.org/10.xxxx/example"
  - "Author, B. (Year). Book title. Publisher."
```

Markdown formatting (like `*italics*` for journal names) renders correctly in citation strings.

---

## Working Paper Series

Papers belonging to a series need these additional front matter fields:

```yaml
working_paper: true
working_paper_series: "UH Inflation Index"
installment: 2
```

`working_paper_series` must exactly match the `series_name` field in the corresponding file under `working-papers/`. See [`working-papers.md`](./working-papers.md) for how to create a series.

---

## Adding Images to Papers

1. Place the image in `assets/images/` (or `assets/images/events/` for event-related images)
2. Reference it in the paper body using `relative_url`:

```markdown
![Description of image]({{ '/assets/images/your-image.jpg' | relative_url }})
```

**Image guidelines:**
- Format: JPG or PNG
- Recommended width: 800–1200 px
- File size: under 600 KB
- Use descriptive filenames, e.g. `houston-unemployment-chart.png`

---

## Complete Example

`_research/2026-05-01-houston-housing.md`:

```markdown
---
title: "Houston Housing Affordability"
subtitle: "An Analysis of Rent Trends, 2015–2025"
author: Isaac Turner
date: 2026-05-01
topic: Market Economics
excerpt: "Houston rents have outpaced income growth since 2020, pricing out a growing share of the working population."
citations:
  - "Smith, J. (2024). Housing Markets in Sun Belt Cities. *Journal of Urban Economics*, 45(2), 112–130. https://doi.org/10.xxxx/example"
---

![Houston skyline]({{ '/assets/images/houston-skyline.jpg' | relative_url }})

#### Introduction

Since the COVID-19 pandemic, housing costs in Houston have risen sharply...
```
