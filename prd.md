# UGC Studio — Task List

Internal TikTok UGC generation tool for a solo marketing agency operator.
Full pipeline: campaign input → brief → script → HeyGen video → download.

---

## Project Setup

- [x] Initialize Next.js 14 app with TypeScript and App Router in the current directory
- [x] Install and configure Tailwind CSS
- [x] Install and configure shadcn/ui with neutral theme
- [x] Install Prisma and set up PostgreSQL connection with DATABASE_URL env var
- [x] Install NextAuth.js for authentication
- [x] Install OpenAI SDK
- [x] Install ElevenLabs SDK or add axios for ElevenLabs REST API calls
- [x] Install AWS SDK v3 (S3 client) for Cloudflare R2 / S3 file storage
- [x] Create .env.local.example listing all required environment variables
- [x] Add .env.local to .gitignore

## Database Schema

- [x] Create Prisma schema with Client model (id, name, createdAt)
- [x] Add Campaign model (id, clientName, productName, productOneLiner, targetAudience, status enum: DRAFT/GENERATING/DONE/FAILED, createdAt, updatedAt)
- [x] Add Brief model (id, campaignId, hookConcept, keyTalkingPoints as Json, ctaText, generatedAt)
- [x] Add Script model (id, briefId, hookLine, body, ctaLine, fullText, generatedAt)
- [x] Add Video model (id, scriptId, heygenJobId, status enum: PENDING/PROCESSING/DONE/FAILED, videoUrl, audioUrl, heygenCreditsUsed, elevenlabsCharsUsed, openaiTokensUsed, estimatedCostUsd, completedAt)
- [x] Add Notification model (id, videoId, message, read Boolean default false, createdAt)
- [x] Run initial Prisma migration

## Auth

- [x] Configure NextAuth.js with credentials provider (username + password)
- [x] Add NEXTAUTH_SECRET to env vars
- [x] Create login page at /login with email and password form using shadcn/ui
- [x] Protect all app routes — redirect unauthenticated users to /login
- [x] Add a minimal session header with logout button to the app layout

## Layout & Navigation

- [x] Create root app layout with a minimal top navigation bar
- [x] Add nav links: Dashboard, New Campaign, Notifications
- [x] Show unread notification count badge on the Notifications nav link
- [x] Make layout fully responsive for desktop use

## Dashboard Page

- [x] Create /dashboard page listing all campaigns newest-first
- [x] Show each campaign as a table row: client name, product name, status badge, estimated cost, created date
- [x] Add status badge colors: GENERATING=yellow, DONE=green, FAILED=red, DRAFT=gray
- [x] Add "New Campaign" button linking to /campaigns/new
- [x] Show total spend across all campaigns at the top of the dashboard
- [x] Add empty state when no campaigns exist yet

## New Campaign Form

- [x] Create /campaigns/new page with a form
- [x] Add form fields: Client Name, Product Name, Product One-Liner, Target Audience
- [x] Add client-side validation — all fields required
- [x] On submit, POST to /api/campaigns/create and redirect to /dashboard
- [x] Show loading state on the submit button while the request is in flight
- [x] Show error message if the API call fails

## Campaign API — Create & Trigger Pipeline

- [x] Create POST /api/campaigns/create route that saves a Campaign to the database with status GENERATING
- [x] After saving, immediately trigger the generation pipeline as a background task (do not await — respond to client first)
- [x] Pipeline step 1: call OpenAI GPT-4o to generate a Brief (hookConcept, keyTalkingPoints, ctaText) based on campaign fields and save to database
- [x] Pipeline step 2: call OpenAI GPT-4o to generate a Script (hookLine, body, ctaLine, fullText) in Problem→Solution format and save to database
- [x] Pipeline step 3: send fullText to ElevenLabs TTS API, get back audio, upload audio file to R2/S3, save audioUrl to Video record
- [x] Pipeline step 4: send script + audio to HeyGen API to create a video generation job, save heygenJobId and set Video status to PROCESSING
- [ ] Log openaiTokensUsed and elevenlabsCharsUsed to the Video record after each step
- [ ] If any step fails, set Campaign status to FAILED and save an error Notification

## OpenAI Prompt Engineering

- [ ] Write the system prompt for brief generation: extract hook concept, 2-3 key talking points, and CTA from product info
- [ ] Write the system prompt for script generation: Problem→Solution TikTok format, 30-45 seconds, hook (0-3s) + body (3-25s) + CTA (25-30s)
- [ ] Return structured JSON from both prompts using OpenAI response_format: json_object
- [ ] Validate the JSON shape before saving to database and throw a clear error if malformed

## HeyGen Integration

- [ ] Create a HeyGen API client utility in lib/heygen.ts
- [ ] Implement createVideoJob(scriptText, audioUrl, avatarId) that calls HeyGen v2 video generate endpoint
- [ ] Implement getVideoStatus(jobId) that polls HeyGen for job status and returns videoUrl when done
- [ ] Read HEYGEN_API_KEY and HEYGEN_AVATAR_ID from environment variables

## Background Polling — HeyGen Status

- [ ] Create a Vercel Cron job at /api/cron/poll-heygen that runs every 2 minutes
- [ ] Query all Video records with status PROCESSING
- [ ] For each, call HeyGen getVideoStatus and update status in database
- [ ] When a video is DONE: download the MP4 from HeyGen, upload to R2/S3, save videoUrl, set Campaign status to DONE
- [ ] Create a Notification record when a video completes successfully
- [ ] Set Campaign status to FAILED and create a Notification if HeyGen returns an error
- [ ] Add CRON_SECRET env var and verify it on the cron route to prevent unauthorized calls

## Cost Tracking

- [ ] After pipeline completes, calculate estimatedCostUsd: OpenAI tokens × rate + ElevenLabs chars × rate + HeyGen credits × rate
- [ ] Save estimatedCostUsd to the Video record
- [ ] Display cost breakdown on the campaign detail page (OpenAI / ElevenLabs / HeyGen line items + total)
- [ ] Display total spend on the dashboard (sum of all estimatedCostUsd values)

## Campaign Detail Page

- [ ] Create /campaigns/[id] page
- [ ] Show campaign metadata: client name, product, one-liner, target audience, status, created date
- [ ] Show the generated brief: hook concept, key talking points, CTA
- [ ] Show the generated script: hook line, body, CTA line
- [ ] If video is DONE: embed an HTML5 video player with the videoUrl
- [ ] Add a Download MP4 button that triggers a file download
- [ ] If video is PROCESSING: show a "Generating video…" spinner and status message
- [ ] If video is FAILED: show an error message with a Retry button
- [ ] Show cost breakdown section at the bottom of the page

## Notifications Page

- [ ] Create /notifications page listing all notifications newest-first
- [ ] Show notification message, linked campaign name, and timestamp
- [ ] Mark notifications as read when the page is visited
- [ ] Add a "Mark all as read" button
- [ ] Show empty state when there are no notifications

## File Storage — R2 / S3

- [ ] Create a storage utility in lib/storage.ts with uploadFile(buffer, key, contentType) and getSignedUrl(key) functions
- [ ] Use AWS SDK v3 S3Client pointed at Cloudflare R2 endpoint (or standard S3)
- [ ] Read R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET_NAME from env vars
- [ ] Store audio files under audio/{videoId}.mp3 and video files under video/{videoId}.mp4

## Error Handling & Resilience

- [ ] Wrap each pipeline step in try/catch and log errors to console with campaign ID context
- [ ] If ElevenLabs or HeyGen API returns a rate limit error (429), retry once after 10 seconds
- [ ] Show user-friendly error messages on the campaign detail page — no raw stack traces

## Final Checks

- [ ] Run npm run build and fix all TypeScript errors
- [ ] Confirm all pages load without console errors in development
- [ ] Confirm a campaign can be created end-to-end in development with test API keys
- [ ] Confirm the HeyGen polling cron updates video status correctly
- [ ] Confirm MP4 download works from the campaign detail page
