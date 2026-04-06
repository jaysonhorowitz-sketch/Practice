# MongoDB SDR Dashboard

A Next.js web app that pre-loads every prospect before you walk in at 9am — emails written, call scripts ready, objections handled.

---

## What We're Building

**Stack:** Next.js + TypeScript + Tailwind CSS (MongoDB dark theme)  
**Location:** This folder — run `npm run dev` to start

---

## Features Planned

### Dashboard (Two-Panel Layout)
- Left: Ranked prospect list with ICP tier (A/B/C), status badges, and priority score bars
- Right: Full prospect sheet with 5 tabs

### Prospect Sheet Tabs
1. **Email** — Full 4-email sequence (Day 1, 3, 7, 14) — copy with one click
2. **Call Script** — Direct Call vs Through EA toggle + Enter Call Mode
3. **LinkedIn** — Connection note + InMail draft
4. **Objections** — Pre-loaded objections with Voss-technique responses
5. **Meeting Prep** — News brief + discovery questions

### Call Mode (Step-by-Step Coach)
- Yes-streak technique built in (3 yes answers before pitching)
- Accusation audit pre-written per prospect
- Always-visible Voss Tactics panel: Mirror / Label / Accusation Audit
- Dates auto-filled from your available slots in Settings

### Outreach Styles (Adaptive)
- **My Style** — Insight + specific ROI bullets + direct 15-min ask (Jayson's format)
- **Value Sniper** — One shocking stat → connect to their situation → CTA
- **Voss / Empathetic** — Accusation audit opener → label their concern → soft ask
- **Challenger** — Provocative insight they haven't heard → MongoDB solves this
- App silently tracks which style books the most meetings and auto-promotes the winner

### Pipeline Heat Map
- Priority score (1–100) per prospect based on ICP tier + days since last touch
- List re-ranks automatically as you update statuses

### Settings Page
- Your name and title
- Two available time slots (auto-fill into every script and email)
- Proof point library (5–6 customer stories, industry-matched per prospect)

---

## Sample Data
8 MongoDB-specific prospects (VP Engineering, CTO, Dir of Engineering at fintech, healthtech, e-commerce, SaaS, logistics, edtech). Fully populated — all emails, scripts, LinkedIn content, and objections pre-written.

---

## Build Order
1. Next.js scaffolding + MongoDB theme
2. Sample data + TypeScript types
3. Prospect list + two-panel layout
4. Prospect sheet + all 5 tabs
5. Call Mode + Voss Tactics panel
6. Settings page + auto-fill logic
7. Outreach styles + adaptive tracking
8. Priority scores + status flow

---

## Design
- Background: `#001E2B` (MongoDB dark)
- Accent: `#00ED64` (MongoDB green)
- Cards: `#1C2B33`
- Font: Inter

---

*Plan saved. Resume anytime — full context is stored.*
