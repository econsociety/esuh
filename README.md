# ESUH Economics Research Portfolio

A professional Jekyll-based website for showcasing economics research by Isaac and Serena, members of ESUH (Economics Students at the University of Houston).

## Overview

This repository contains a static website built with Jekyll and hosted on GitHub Pages. The site serves as a centralized archive and portfolio for economics research papers, working papers, and ongoing research projects.

**Live Site:** [Your GitHub Pages URL will be here]

## Features

- 📚 **Research Archive**: Organized collection of research papers and working papers
- 🔍 **Filtering & Search**: Filter by topic and search by title/author
- 📱 **Responsive Design**: Professional academic design that works on all devices
- 🏷️ **Topic Organization**: Automatic categorization by research topic
- 📊 **Working Paper Series**: Support for multi-installment research projects
- 📖 **Citation Support**: Properly formatted references for each paper
- ⚡ **Easy Updates**: Add new research by simply creating a markdown file

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

## Getting Started

### Prerequisites

- Ruby (version 2.7 or higher)
- Bundler gem
- Git

### Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/[your-username]/esuh-research.git
   cd esuh-research
   ```

2. **Install dependencies:**
   ```bash
   bundle install
   ```

3. **Run the local server:**
   ```bash
   bundle exec jekyll serve
   ```

4. **View the site:**
   Open your browser to `http://localhost:4000`

The site will automatically rebuild when you make changes to files.

### Deploying to GitHub Pages

1. **Ensure your changes are committed:**
   ```bash
   git add .
   git commit -m "Your commit message"
   ```

2. **Push to GitHub:**
   ```bash
   git push origin main
   ```

3. **Enable GitHub Pages** (first time only):
   - Go to repository Settings
   - Navigate to "Pages" section
   - Under "Source", select your main branch
   - Click "Save"

Your site will be available at `https://[your-username].github.io/esuh-research/` within a few minutes.

## Adding New Research

Adding new research is simple! Just create a new markdown file in the `_research/` folder.

### Step 1: Create the File

Create a new file in `_research/` with the naming format:
```
YYYY-MM-DD-title-slug.md
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

```bash
git add _research/your-new-file.md
git commit -m "Add research: Your Title"
git push
```

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

## Working Paper Series

For multi-installment working papers:

1. Set `working_paper: true` in front matter
2. Add `installment: 1` (or 2, 3, etc.)
3. Use consistent title prefixes across installments
4. Link between installments in the content

Example:
```yaml
---
title: "Housing Markets: A Comprehensive Analysis"
author: Isaac
working_paper: true
installment: 1
---
```

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

### Local Server Issues

```bash
# Kill the server
Ctrl+C

# Clean Jekyll cache
bundle exec jekyll clean

# Rebuild
bundle exec jekyll serve
```

## Contributing

### For ESUH Members

1. Fork this repository
2. Create a feature branch
3. Add your research
4. Submit a pull request

### Content Guidelines

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

© 2024 ESUH Economics Research. All rights reserved.

## Contact

For questions or issues with the website:
- Create an issue in this repository
- Contact ESUH through the University of Houston student organization directory

---

**Maintained by:** Isaac and Serena
**Organization:** ESUH (Economics Students at the University of Houston)
**Last Updated:** November 2024
