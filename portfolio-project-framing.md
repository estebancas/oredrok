# Portfolio project framing — instructions for oredrok.dev

These instructions define how every project card should be written and structured.
The goal is to speak to small business owners and non-technical clients first,
and to developers second.

---

## Core principle

> Lead with the problem and the result. Your role and the tech stack come last.

Clients don't hire a stack. They hire someone who understands their problem and can solve it.

---

## Project card structure

Each project must follow this exact order:

### 1. Title
One short sentence describing what was built — from the client's perspective, not yours.

- ✅ "Booking system for a local dental clinic"
- ✅ "E-commerce store for a handmade goods shop"
- ❌ "Next.js + Supabase booking app"
- ❌ "Full-stack web application v2"

### 2. Role badge
A small label that sets context without hierarchy. Use one of these:

| Label | When to use |
|---|---|
| `Freelance` | Client work done independently |
| `Solo project` | Personal project built entirely by you |
| `Team · [Your Role]` | Employee work — e.g. `Team · Frontend Dev` |
| `Collaboration` | Built with 1–2 others outside a company |

Do NOT separate freelance and employee projects into different sections.
Mix them together and sort by relevance or impressiveness instead.

### 3. The problem (1–2 sentences)
Describe the client's pain in plain language. No jargon. Write it as if explaining
to a friend who doesn't know anything about software.

Ask yourself: what was broken, slow, or missing before this project existed?

- ✅ "The clinic was managing appointments through WhatsApp and a paper notebook —
  they were losing bookings and spending hours on manual scheduling every day."
- ❌ "The client needed a modern booking solution to replace their legacy workflow."

### 4. Your contribution (2–4 sentences)
Describe specifically what YOU did. For team/employee projects, start with
"I was responsible for..." to make your role clear without overstating it.

Focus on:
- What you designed or built
- What decisions you made
- What problem your piece solved

Do NOT list technologies here. That goes in the tech stack section.

- ✅ "I designed and built an online booking portal where patients self-schedule,
  receive automatic reminders, and can cancel without calling."
- ❌ "I used React and Node.js to build a REST API connected to a PostgreSQL database."

### 5. Results (2–3 metrics)
Use real numbers when you have them. Estimates and relative numbers are fine too.
If you have no numbers, use a meaningful qualitative outcome.

Format as small metric cards with a number and a short label:

- `-80% manual scheduling`
- `3 months to launch`
- `solo build, end to end`
- `used by 200+ customers`
- `cut support tickets in half`

Avoid vague outcomes like "improved performance" or "better UX" — be specific.

### 6. Tech stack (collapsed/hidden by default)
List the main technologies used. This section should be collapsed or visually
secondary so it doesn't distract non-technical visitors.

Format: `Next.js · PostgreSQL · Twilio · Vercel`

Keep it short. No need to list every library.

---

## Tone guidelines

- Write in **plain English** — avoid developer jargon in the problem and contribution sections
- Use **active voice** — "I built", "I designed", not "a system was developed"
- Keep sentences **short** — one idea per sentence
- Address the reader's real concern: *"can this person solve my problem?"*

---

## Employee vs. freelance projects

Do NOT create separate sections for each type. Instead:

- Show all projects together, sorted by impressiveness or relevance
- Use the role badge (e.g. `Team · Frontend Dev`) to give context
- For confidential work: anonymize the company name (e.g. "B2B SaaS startup, 2023")
  and blur sensitive data in screenshots

The type of engagement doesn't define the quality of the work.

---

## Full example

```
[screenshot or preview image]

Booking system for a local dental clinic          [Freelance badge]

The clinic was managing appointments through WhatsApp and a paper notebook —
they were losing bookings and spending hours on manual scheduling every day.

  | I designed and built an online booking portal where patients self-schedule,
  | receive automatic reminders, and can cancel without calling. The clinic staff
  | got a simple dashboard to manage their daily calendar.

[-80% manual scheduling]  [3 months to launch]  [solo build]

▸ Tech stack   Next.js · PostgreSQL · Twilio · Vercel

[View project]  [Live site]
```

---

## Checklist before publishing each project

- [ ] Title describes what was built, not what tech was used
- [ ] Problem section uses plain language, no jargon
- [ ] Contribution section says what I specifically did
- [ ] At least one measurable or concrete result included
- [ ] Role badge is accurate (Freelance / Solo / Team · Role / Collaboration)
- [ ] Tech stack is present but not the main focus
- [ ] Confidential details are anonymized if needed
