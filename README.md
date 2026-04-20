# ESUH Website

Website for the Economics Society at the University of Houston (ESUH).
Built with [Jekyll](https://jekyllrb.com/) and hosted on [GitHub Pages](https://econsociety.github.io/esuh).

Everything on this site is driven by plain text files — no coding required for day-to-day updates. Detailed guides for every common task live in the [`Maintenance/`](./Maintenance/) folder.

---

## Quick Reference

| Task | Guide |
|---|---|
| Understand how the site works | [Site Overview](./Maintenance/site-overview.md) |
| Add or edit a team member | [Team Members](./Maintenance/team-members.md) |
| Add a research paper | [Research Papers](./Maintenance/research-papers.md) |
| Add or edit an event | [Events](./Maintenance/events.md) |
| Create a new dynamic analysis | [Dynamic Analyses](./Maintenance/dynamic-analyses.md) |
| Create a working paper series | [Working Papers](./Maintenance/working-papers.md) |

All changes go live automatically after merging to `main` — no manual rebuilds needed.

---

## Site Structure

```
esuh/
├── Maintenance/                ← Guides for maintaining the site (start here)
│   ├── site-overview.md
│   ├── team-members.md
│   ├── research-papers.md
│   ├── events.md
│   ├── dynamic-analyses.md
│   └── working-papers.md
│
├── _data/
│   ├── officers.yml            ← Edit to update the Team page
│   └── authors.yml             ← Research author bios (not used by current layouts)
│
├── _events/                    ← One .md file per event
├── _research/                  ← One .md file per research paper
├── _dynamic_analyses/          ← One .md file per interactive analysis
├── working-papers/             ← One .html file per series (front matter only)
│
├── assets/
│   ├── css/main.css            ← All site-wide styles
│   ├── js/main.js              ← Research page search/filter
│   ├── analyses/               ← One folder per dynamic analysis
│   │   └── grade-comparison/
│   │       ├── script.js       ← Self-contained analysis JS
│   │       ├── style.css       ← Analysis-specific CSS
│   │       └── data.json       ← Analysis dataset
│   └── images/                 ← Team photos, paper images, event photos
│
├── _layouts/                   ← Page templates (rarely need editing)
├── _includes/                  ← Header and footer (rarely need editing)
│
├── index.html                  ← Homepage
├── research.html               ← Research archive
├── events.html                 ← Events listing
├── team.html                   ← Team page
├── working-papers.html         ← Working paper series index
├── dynamic-analysis-guide.md  ← Developer reference for new dynamic analyses
└── _config.yml                 ← Site settings (rarely needs editing)
```

---

## Local Development

```bash
bundle install
bundle exec jekyll serve
```

Visit `http://localhost:4000/esuh/`. The server rebuilds on file saves.

---

## Resources

- [Jekyll Documentation](https://jekyllrb.com/docs/)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Markdown Guide](https://www.markdownguide.org/)
- [MathJax Documentation](https://docs.mathjax.org/)
