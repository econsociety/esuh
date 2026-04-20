# Managing Events

Events are Markdown files in `_events/`. Their status (upcoming vs. past) updates automatically based on today's date — you never need to change a status field or move files.

---

## File Naming

```
_events/YYYY-MM-DD-short-name.md
```

Examples:
- `_events/2026-09-10-fall-kickoff.md`
- `_events/2026-10-20-guest-speaker-johnson.md`

The date in the filename is used for sorting. Use the event date.

---

## Front Matter

```yaml
---
title: "Fall Kickoff Meeting"
event_date: 2026-09-10
time: "6:00 PM – 8:00 PM"
location: "McElhinney Hall, Room 100"
description: "Our first general body meeting of the fall semester. Come meet the team and learn about upcoming opportunities."
link: "https://optional-rsvp-or-info-link.com"
---
```

### Required fields

| Field | Description |
|---|---|
| `title` | Event name |
| `event_date` | Date in `YYYY-MM-DD` — drives upcoming/past logic |

### Optional fields

| Field | Description |
|---|---|
| `time` | Display string, e.g. `"6:00 PM – 8:00 PM"` |
| `location` | Venue name and room |
| `description` | Short summary shown on the Events listing page |
| `link` | URL for RSVP, Eventbrite, Zoom, or info page |

---

## Upcoming vs. Past Logic

The site compares `event_date` to today's date automatically:

- If `event_date` is today or in the future → shown in "Upcoming Events" on the homepage and Events page
- If `event_date` has passed → shown in the "Past Events" grid on the Events page

You do not need to do anything when an event passes. It moves itself.

---

## Adding an Event Recap

After the event occurs, optionally add a recap below the front matter. This content appears on the event's individual page (linked from the Past Events grid):

```markdown
---
[front matter]
---

## Event Recap

Over 60 students attended our fall kickoff. We introduced the executive board,
outlined this semester's research projects, and announced tutoring office hours.

![Group photo]({{ '/assets/images/events/fall-kickoff-group.jpg' | relative_url }})

![Presentation slide]({{ '/assets/images/events/fall-kickoff-slides.jpg' | relative_url }})
```

If the body is empty, the event's individual page still exists but shows no recap content. That's fine.

---

## Adding Event Photos

1. Place photos in `assets/images/events/`
2. Reference them in the event body using `relative_url`:

```markdown
![Alt text]({{ '/assets/images/events/your-photo.jpg' | relative_url }})
```

**Photo guidelines:**
- Format: JPG or PNG
- Recommended size: 800×600 px or similar landscape crop
- File size: under 500 KB per photo
- Use descriptive filenames: `fall-kickoff-2026-group.jpg`

---

## Removing or Cancelling an Event

**To cancel an upcoming event:** Delete the file, or update the `description` to note the cancellation. The simplest approach is to delete the file if the event never happened.

**To hide a past event:** Delete the file. Past events are shown in a grid; removing the file removes it from the grid.

---

## Complete Example

`_events/2026-09-10-fall-kickoff.md`:

```markdown
---
title: "Fall Kickoff Meeting"
event_date: 2026-09-10
time: "6:00 PM – 8:00 PM"
location: "McElhinney Hall, Room 100"
description: "Our first general body meeting of the fall semester."
link: "https://instagram.com/p/example"
---

## Event Recap

We kicked off the fall semester with over 70 students in attendance.
VP Isaac Turner presented the semester's research agenda, and
President Zoe Hancock introduced upcoming tutoring services.

![Group photo at fall kickoff]({{ '/assets/images/events/fall-kickoff-2026.jpg' | relative_url }})
```
