# ESUH Economics Research Portfolio

A professional Jekyll-based website for showcasing economics research by Isaac and Serena, members of ESUH (Economics Society at the University of Houston).

## Overview

This repository contains a static website built with Jekyll and hosted on GitHub Pages. The site serves as a centralized archive and portfolio for economics research papers and ongoing research projects.

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
├── assets/                 # Static assets
│   ├── css/
│   ├── js/
│   └── images/
├── index.html             # Homepage
├── research-team.html     # About the research team
├── about-esuh.html        # About ESUH organization
├── team.html              # ESUH officers and leadership
├── research.html          # Research index page
├── Gemfile                # Ruby dependencies
└── README.md              # This file
```

## Adding New Research

Create a new markdown file in the `_research/` folder with the naming format:
```
YYYY-MM-DD-example-title.md
```

Example: `2024-12-01-labor-market-analysis.md`

### Front Matter

Start your file with YAML front matter:

```yaml
---
title: "Your Research Title"
subtitle: "Optional Subtitle"
author: Isaac  # or Serena
date: 2024-12-01
topic: Labor Economics
excerpt: A brief description of your research (1-2 sentences)
citations:
  - "Author, A. (Year). Title of Paper. Journal Name, Volume(Issue), Pages."
  - "Author, B. (Year). Title of Book. Publisher."
---
```

### Content

After the front matter, write your research content:

```
## Abstract

Your abstract here...

## Introduction

Your introduction...

## Methodology

Your methodology...

## Results

Your results...

## Conclusion

Your conclusion...
```

### Images

1. Add your image to `assets/images/`
2. Reference it in your markdown:
```
![Alt text]({{ '/assets/images/your-image.png' | relative_url }})
```

### Commit Changes

Click 'Commit changes...' and commit directly to the active branch. Your research will appear on the site automatically!

## Research Topics

Use consistent topic names for proper filtering:

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

## Customization

### Site Information

Edit `_config.yml` to change site title, description, and author information.

### Styles

Edit `assets/css/main.css` to customize colors, fonts, layout, and spacing.

### New Pages

1. Create a new HTML or Markdown file in the root directory
2. Add front matter with `layout: page`
3. Add a link in `_includes/header.html`

## Content Guidelines

- Use clear, descriptive titles
- Include comprehensive abstracts
- Properly cite all sources
- Proofread before publishing
- Use professional academic tone
- Format tables and figures clearly

## Resources

- [Jekyll Documentation](https://jekyllrb.com/docs/)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)

## License

© 2025 ESUH Research. All rights reserved.

**Maintained by:** Isaac Turner
**Organization:** ESUH (Economics Society at the University of Houston)
**Last Updated:** November 2025
