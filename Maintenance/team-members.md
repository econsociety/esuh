# Managing Team Members

The Team page is driven entirely by `_data/officers.yml`. Edit that one file to add, update, or remove officers — no HTML editing required.

---

## File Location

```
_data/officers.yml
```

---

## Structure

Each officer is a YAML list item with these fields:

```yaml
- name: Jane Smith           # Full display name (required)
  role: President            # Title shown on the Team page (required)
  image: jane-pic.jpg        # Filename in assets/images/ (required)
  linkedin:                  # Full URL, e.g. https://www.linkedin.com/in/jane — omit or leave blank if none
  bio:                       # Short bio text — omit or leave blank if none
```

Order in the file = order on the page. The first entry appears top-left.

---

## Adding an Officer

1. Add a block to `_data/officers.yml`:

```yaml
- name: New Person
  role: Their Role
  image: newperson-pic.jpg
  linkedin: https://www.linkedin.com/in/newperson
  bio: Short bio here, or leave blank.
```

2. Upload their photo to `assets/images/` with a filename that exactly matches the `image` field above.

**Photo guidelines:**
- Format: JPG or PNG
- Recommended size: ~400×400 px (square or near-square)
- File size: under 300 KB
- Filename: lowercase, no spaces (use hyphens), e.g. `jane-smith-pic.jpg`

If no photo is available yet, temporarily use an existing placeholder image and update it later.

---

## Editing an Officer

Open `_data/officers.yml`, find the person's block, and change any field. Save and commit.

Common edits:
- **Role change:** Update the `role` field
- **New LinkedIn:** Update the `linkedin` field
- **New photo:** Replace the image file in `assets/images/` with the same filename, or update the `image` field to the new filename

---

## Removing an Officer

Delete the officer's entire block from `_data/officers.yml`. Also delete their photo from `assets/images/` to avoid accumulating unused files.

---

## Reordering Officers

Cut and paste blocks within `_data/officers.yml` into the order you want them to appear on the page.

---

## Research Authors

Research paper author names (`author:` field in `_research/*.md`) are plain display strings — just write the person's full name. The site creates a link from the author name to their anchor on the Team page using this formula:

```
"Isaac Turner" → /team#isaac-turner
```

The anchor is the name lowercased with spaces replaced by hyphens. This means the name in research front matter must match the name in `_data/officers.yml` for the link to work correctly.

**Example:** If `officers.yml` has `name: Isaac Turner`, use `author: Isaac Turner` in research files.

There is also a `_data/authors.yml` file with author bio entries keyed by lowercase slug (e.g., `isaac:`). This file is currently not used by any layout — it exists as a data source for potential future use. You do not need to maintain it for research pages to function.

---

## Team Page Anchor IDs

The Team page assigns an `id` to each officer card based on their name (lowercased, spaces → hyphens). This is what the research author link targets.

If an officer's name changes, update it in both `officers.yml` and in any `_research/*.md` files that list them as an author — otherwise the author link will 404.
