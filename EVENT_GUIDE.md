# How to Add Events to the ESUH Website

This guide explains how to add new events to the ESUH website. Events are automatically classified as **Today**, **Upcoming**, or **Past** based on their date.

## Adding a New Event

### Step 1: Create an Event File

Create a new markdown file in the `_events` directory with the following naming convention:
```
YYYY-MM-DD-event-name.md
```

For example: `2025-12-10-economics-workshop.md`

### Step 2: Add Event Front Matter

At the top of your markdown file, add the following front matter (metadata):

```yaml
---
title: "Event Title"
event_date: YYYY-MM-DD
time: "Start Time - End Time"
location: "Event Location"
description: "Brief description of the event (1-2 sentences)"
image: "/assets/images/events/image-name.jpg"
link: "https://link-to-event-page-or-registration"
---
```

#### Required Fields:
- `title`: The name of your event
- `event_date`: The date of the event in YYYY-MM-DD format

#### Optional Fields:
- `time`: Event time (e.g., "6:00 PM - 8:00 PM")
- `location`: Where the event takes place
- `description`: A short summary that appears on the events list page
- `image`: Path to an event image (store images in `/assets/images/events/`)
- `link`: URL for more details or registration

### Step 3: Write Event Content

Below the front matter, write the full event details using Markdown:

```markdown
---
title: "Economics Career Panel"
event_date: 2025-12-15
time: "5:30 PM - 7:00 PM"
location: "McElhinney Hall, Room 100"
description: "Hear from economics professionals about their career paths and get advice for your future."
image: "/assets/images/events/career-panel.jpg"
link: "https://uh.edu/esuh/events/career-panel"
---

## About This Event

Join us for an evening with economics professionals who will share their career journeys...

### Panelists

- **Dr. Jane Smith** - Economist at the Federal Reserve
- **John Doe** - Financial Analyst at JPMorgan Chase
- **Sarah Johnson** - Policy Advisor at Houston City Hall

### What to Expect

1. Panel discussion (30 minutes)
2. Q&A session (30 minutes)
3. Networking (30 minutes)

### RSVP

Please register by December 10th at our website.
```

## Event Auto-Classification

Events are automatically sorted into three categories based on the `event_date`:

- **Today's Events** 🎯 - Events happening today (green highlight)
- **Upcoming Events** 📅 - Events scheduled for future dates
- **Past Events** 📚 - Events that have already occurred (slightly faded)

The classification happens automatically - you don't need to do anything special!

## Example Event Files

Check the `_events` directory for example event files that demonstrate:
- General meetings
- Guest speaker events
- Networking events
- Social gatherings

## Tips

1. **Use descriptive titles** - Make it clear what the event is about
2. **Include all relevant details** - Date, time, location, and how to attend
3. **Add images when possible** - Visual content makes events more appealing
4. **Write engaging descriptions** - Encourage students to attend
5. **Update past events** - You can add summaries and photos to past events after they occur

## Image Guidelines

- Store event images in `/assets/images/events/`
- Recommended size: 800x600 pixels
- Formats: JPG, PNG
- Keep file sizes reasonable (< 500KB)

## Questions?

If you have questions about adding events, contact the ESUH web team or check the Jekyll documentation for more Markdown tips.
