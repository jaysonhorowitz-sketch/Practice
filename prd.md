# Product Requirements Document — UGC Studio

## Overview

UGC Studio is an internal web app for a solo marketing agency operator to generate TikTok UGC videos at scale. It replaces the manual workflow of writing briefs by hand and sending them to freelance creators. The app takes minimal campaign inputs and autonomously runs the full pipeline: brief → script → AI-generated video, with no manual review steps in between.

---

## Core User

- **Single user** (solo agency operator)
- No auth complexity needed — simple login or no login for MVP
- No client-facing portal

---

## Core Pipeline

```
Campaign Input → Brief (auto) → Script (auto) → HeyGen Video → Download
```

Each step runs automatically without requiring user approval between steps. The user fills in campaign details and clicks "Generate" — the app handles everything else and notifies them when the video is ready.

---

## Campaign Inputs (per video)

The user provides these fields when creating a new campaign/video:

| Field | Description | Example |
|---|---|---|
| Client name | For organizational purposes | "Glow Skincare" |
| Product name | Name of the product | "HydraSerum Pro" |
| Product one-liner | What it does in plain English | "A daily serum that reduces dark spots in 2 weeks" |
| Target audience | Who the video is for | "Women aged 25–40 dealing with uneven skin tone" |

That's it. The AI infers everything else.

---

## Script Format

All scripts follow the **Problem → Solution** structure:

1. **Hook (0–3s)** — Open with the audience's core problem/frustration
2. **Body (3–25s)** — Introduce the product as the solution with 2–3 key benefits
3. **CTA (25–30s)** — Clear call to action (e.g. "Link in bio to try it free")

Script length is optimized for 30–45 second TikTok videos.

---

## AI Video Generation

- **Provider**: HeyGen API
- **Avatar**: HeyGen stock avatar (user selects from available avatars once, saved as default)
- **Voiceover**: ElevenLabs (natural-sounding TTS, one default voice)
- **Captions**: Always burned into the video (critical for silent TikTok viewing)
- **Video format**: 9:16 vertical, 1080×1920

### Generation Flow
1. Script is sent to ElevenLabs → audio file generated
2. Audio + script sent to HeyGen → video generation job created
3. App polls HeyGen webhook/status endpoint in the background
4. When complete: video is saved to storage, user receives in-app notification
5. User downloads the MP4 directly

---

## Cost Tracking

Every video generation logs:

- OpenAI tokens used (brief + script)
- ElevenLabs characters used
- HeyGen credits consumed
- Estimated USD cost

Displayed as a cost breakdown on the video detail page and as a total on the dashboard.

---

## UI Principles

- **Fast and minimal** — no onboarding flows, no modals, no animations
- **One primary action per screen**
- Dense information layout — everything visible without scrolling
- No marketing copy, no empty states with illustrations

### Key Screens

| Screen | Purpose |
|---|---|
| Dashboard | List of all campaigns with status (generating / done / failed) and total cost |
| New Campaign | Single form — 4 fields + "Generate" button |
| Campaign Detail | Shows brief, script, video player, download button, cost breakdown |
| Notifications | In-app feed of completed/failed video jobs |

---

## Tech Stack

| Layer | Choice | Reason |
|---|---|---|
| Framework | Next.js 14 (App Router) + TypeScript | Full-stack, fast to build, Vercel-native |
| Styling | Tailwind CSS + shadcn/ui | Fast, minimal, accessible components |
| Database | PostgreSQL + Prisma ORM | Reliable, easy schema management |
| Auth | NextAuth.js (credentials) | Simple username/password for solo use |
| AI — Scripts | OpenAI GPT-4o | Best instruction-following for structured scripts |
| AI — Voiceover | ElevenLabs API | Natural TTS with good pacing |
| AI — Video | HeyGen API | Best talking-head AI avatar quality |
| File Storage | Cloudflare R2 (or AWS S3) | Store generated MP4s |
| Background Jobs | Vercel Cron + database polling | Poll HeyGen status, trigger notifications |
| Deployment | Vercel | Instant deploys, free tier, Next.js-native |

---

## Data Models

```
Campaign
  id, clientName, productName, productOneLiner, targetAudience
  status: draft | generating | done | failed
  createdAt, updatedAt

Brief
  id, campaignId
  hookConcept, keyTalkingPoints (array), ctaText
  generatedAt

Script
  id, briefId
  hookLine, body, ctaLine, fullText
  generatedAt

Video
  id, scriptId
  heygenJobId, status: pending | processing | done | failed
  videoUrl, audioUrl
  heygenCreditsUsed, elevenlabsCharsUsed, openaiTokensUsed
  estimatedCostUsd
  completedAt

Notification
  id, videoId, message, read (bool), createdAt
```

---

## MVP Scope

### In Scope
- [x] Campaign creation form (4 fields)
- [x] Automated brief generation via GPT-4o
- [x] Automated script generation via GPT-4o (Problem → Solution)
- [x] ElevenLabs voiceover generation
- [x] HeyGen video generation with stock avatar
- [x] Captions burned into video
- [x] Background polling for video completion
- [x] In-app notification when video is ready
- [x] Download MP4
- [x] Cost tracking per video + dashboard total
- [x] Campaign list view with status

### Out of Scope (V1)
- Client-facing portal
- TikTok direct publishing
- Multiple script variations / manual review
- Custom brand assets or brand kits
- Team/multi-user access
- Performance analytics
- Multiple video styles (only Problem → Solution in V1)

---

## Environment Variables Required

```
OPENAI_API_KEY
ELEVENLABS_API_KEY
HEYGEN_API_KEY
DATABASE_URL
NEXTAUTH_SECRET
R2_ACCOUNT_ID / AWS_ACCESS_KEY_ID
R2_BUCKET_NAME / S3_BUCKET_NAME
```

---

## Verification Plan

1. `npm run dev` — all pages load without errors
2. Fill in campaign form → confirm GPT-4o returns a valid brief and script
3. Script triggers ElevenLabs → audio file generated and stored
4. Audio + script sent to HeyGen → job ID returned and stored
5. Background poller updates video status from `processing` → `done`
6. Notification appears in-app when video is complete
7. Video plays in the browser and MP4 downloads successfully
8. Cost breakdown shows accurate USD estimates
9. `npm run build` — no TypeScript errors
10. Deploy to Vercel — all env vars set, production build works
