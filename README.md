# ESUH Economics Research Portfolio

A professional Jekyll-based website for showcasing economics research by Isaac and Serena, members of ESUH (Economics Students at the University of Houston).

## Overview

This repository contains a static website built with Jekyll and hosted on GitHub Pages. The site serves as a centralized archive and portfolio for economics research papers, working papers, and ongoing research projects.


## Repository Structure

```
esuh-research/
├── _config.yml              # Jekyll configuration
├── _layouts/                # Page templates
│   ├── default.html        # Base template with header/footer
│   ├── home.html           # Homepage layout
│   ├── page.html           # Static pages layout
│   └── research.html       # Research paper layout
├── _includes/              # Reusable components
│   ├── header.html         # Site header with navigation
│   └── footer.html         # Site footer
├── _research/              # Research papers (Markdown files)
│   ├── 2024-10-15-minimum-wage-employment.md
│   ├── 2024-11-05-trade-policy-manufacturing.md
│   └── 2024-11-20-housing-affordability-working-paper-1.md
├── assets/                 # Static assets
│   ├── css/
│   │   └── main.css       # Site styles
│   ├── js/
│   │   └── main.js        # Site JavaScript
│   └── images/            # Images for research papers
├── index.html             # Homepage
├── about-team.html        # About the research team
├── about-esuh.html        # About ESUH organization
├── research.html          # Research index page
├── Gemfile                # Ruby dependencies
└── README.md              # This file
```


## Adding New Research

Adding new research is simple! Just create a new markdown file in the `_research/` folder.

### Step 1: Create the File

Create a new file in `_research/` with the naming format:
```
YYYY-MM-DD-example-title.md
```

Example: `2024-12-01-labor-market-analysis.md`

### Step 2: Add Front Matter

Start your file with YAML front matter containing metadata:

```yaml
---
title: "Your Research Title"
subtitle: "Optional Subtitle"
author: Isaac  # or Serena
date: 2024-12-01
topic: Labor Economics  # Choose appropriate topic
working_paper: false  # Set to true for working papers
working_paper_series: "SERIES NAME"  # Optional: Name of the working paper series (e.g., "UH INFLATION")
installment: 1  # Only needed for multi-part working papers
excerpt: A brief description of your research (1-2 sentences)
citations:
  - "Author, A. (Year). Title of Paper. Journal Name, Volume(Issue), Pages."
  - "Author, B. (Year). Title of Book. Publisher."
---
```

### Step 3: Write Your Content

After the front matter, write your research using Markdown:

```markdown
## Abstract

Your abstract here...

## Introduction

Your introduction...

## Methodology

Your methodology...

## Results

### Tables

| Column 1 | Column 2 | Column 3 |
|----------|----------|----------|
| Data     | Data     | Data     |

## Conclusion

Your conclusion...
```

### Step 4: Commit and Push

Click 'Commit changes...' and commit directly to the active branch.

Your research will appear on the site automatically!

## Markdown Reference

### Headings

```markdown
# Heading 1
## Heading 2
### Heading 3
```

### Text Formatting

```markdown
*italic text*
**bold text**
***bold and italic***
```

### Lists

```markdown
- Unordered item 1
- Unordered item 2

1. Ordered item 1
2. Ordered item 2
```

### Links

```markdown
[Link text](https://example.com)
```

### Tables

```markdown
| Header 1 | Header 2 | Header 3 |
|----------|----------|----------|
| Cell 1   | Cell 2   | Cell 3   |
| Cell 4   | Cell 5   | Cell 6   |
```

### Equations

For inline math: `E = mc²`

For display math, use LaTeX notation (requires additional plugin):
```
$$
E = mc^2
$$
```

### Images

1. Add your image to `assets/images/`
2. Reference it in your markdown:
```markdown
![Alt text](/assets/images/your-image.png)
```

## Research Topics

Use consistent topic names for proper filtering. Recommended topics:

- Labor Economics
- Macroeconomics
- Microeconomics
- International Economics
- Development Economics
- Urban Economics
- Public Economics
- Health Economics
- Environmental Economics
- Behavioral Economics
- Econometrics
- Economic History
- Education

## Working Paper Series

For multi-installment working papers, you can create a named series:

1. Set `working_paper: true` in front matter
2. Add `working_paper_series: "YOUR SERIES NAME"` to name your series (e.g., "UH INFLATION", "LABOR MARKET STUDY")
3. Add `installment: 1` (or 2, 3, etc.) to indicate which installment this is
4. Use consistent title prefixes across installments
5. Link between installments in the content

Example:
```yaml
---
title: "Housing Markets: A Comprehensive Analysis"
author: Isaac
working_paper: true
working_paper_series: "HOUSING RESEARCH"
installment: 1
excerpt: First installment examining housing market dynamics
---
```

This will display as: **HOUSING RESEARCH - Installment 1**

If you don't specify a `working_paper_series`, it will default to: **Working Paper - Installment 1**

## Customization

### Updating Site Information

Edit `_config.yml` to change:
- Site title and description
- Author information
- Build settings

### Modifying Styles

Edit `assets/css/main.css` to customize:
- Colors and fonts
- Layout and spacing
- Responsive breakpoints

### Adding New Pages

1. Create a new HTML or Markdown file in the root directory
2. Add front matter with `layout: page`
3. Add a link in `_includes/header.html`

## Troubleshooting

### Site Not Building

1. Check for YAML syntax errors in front matter
2. Ensure all required fields are present
3. Verify file names follow the date format
4. Check Jekyll build logs for specific errors

### Styling Issues

1. Clear your browser cache
2. Check that CSS file is loading (inspect browser console)
3. Verify CSS changes are committed and pushed


## Content Guidelines

- Use clear, descriptive titles
- Include comprehensive abstracts
- Properly cite all sources
- Proofread before publishing
- Use professional academic tone
- Format tables and figures clearly

## Resources

- [Jekyll Documentation](https://jekyllrb.com/docs/)
- [Markdown Guide](https://www.markdownguide.org/)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [YAML Syntax Guide](https://yaml.org/spec/1.2/spec.html)

## License

© 2025 ESUH Research. All rights reserved.


**Maintained by:** Isaac Turner
**Organization:** ESUH (Economics Society at the University of Houston)
**Last Updated:** November 2025
