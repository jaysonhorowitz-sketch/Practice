import type { Prospect } from './types'

export const sampleProspects: Prospect[] = [
  // ─── A-TIER ───────────────────────────────────────────────────────────────

  {
    id: 'p1',
    name: 'Jordan Lee',
    title: 'VP of Engineering',
    company: 'Finquery',
    industry: 'fintech',
    phone: '+1 (415) 555-0182',
    linkedinUrl: 'linkedin.com/in/jordanlee-finquery',
    icpTier: 'A',
    status: 'not-started',
    priorityScore: 91,
    daysSinceContact: 0,
    suggestedProofPointId: 'fintech-payments',

    whyNow: ['Series B closed Jan 2025 ($42M)', '4 backend engineers hired in 90 days', 'CTO tweeted about DB scaling walls', 'Job posting: "experience with high-throughput databases"'],
    techStack: ['PostgreSQL', 'Redis', 'AWS RDS', 'Node.js'],
    recentNews: ['Series B announcement — Finquery raises $42M to expand AP automation', 'New CTO hire from Stripe', 'Opening London engineering office Q2'],
    companySnapshot: 'Finquery automates accounts payable for mid-market companies. 180 employees, $42M Series B, growing 3x YoY. Their core product processes $2B+ in invoices monthly — latency and scale are existential.',

    styleEmails: {
      'my-style': [
        {
          day: 1,
          subject: "Finquery's AP scale post-Series B",
          body: `Jordan,

Your $42M raise and the backend hiring push you've had over the last 90 days caught my attention. That kind of growth usually means your data layer is about to get stress-tested in ways it hasn't before.

MongoDB is working with fintech engineering teams at this exact stage to:
• Reduce platform complexity costs by ~30% by replacing multi-database setups with a unified document model
• Avoid $200K+ in annual infrastructure spend by delivering sub-second retrieval without bolting on separate caching layers

The next step most teams take is a short working session to pressure-test their data architecture before scale forces the issue.

Would you be open to 15 minutes next week?

Jayson`
        },
        {
          day: 3,
          subject: "Re: Finquery's AP scale post-Series B",
          body: `Jordan,

Wanted to follow up quickly — I know you're heads-down post-funding.

One thing worth knowing: the teams we work with at your stage almost always discover the same two chokepoints when they hit 10x volume. Happy to walk through what we typically see in 15 minutes — no prep needed on your end.

Worth a quick call?

Jayson`
        },
        {
          day: 7,
          subject: 'One thing we fixed for a company exactly like Finquery',
          body: `Jordan,

I'll keep this short — we helped a digital payments company at your stage reduce DB complexity costs by 30% and eliminate $200K in annual infrastructure spend. Their situation looked a lot like what I'm seeing at Finquery right now.

Happy to share the specifics. 15 minutes, I'll bring the data.

Jayson`
        },
        {
          day: 14,
          subject: 'Leaving the door open',
          body: `Jordan,

I've reached out a few times — I'll take the hint if the timing isn't right.

I'll leave this here: if scaling your data layer ever becomes a priority (especially post-Series B), I'd love to be the first call you make. We've done this exact thing with fintech teams at your stage and the results are usually fast.

Whenever you're ready — no pressure.

Jayson`
        }
      ],
      'value-sniper': [
        {
          day: 1,
          subject: '80% of fintech DB migrations fail at the $50M ARR mark',
          body: `Jordan,

Here's a stat that surprises most VPs of Engineering: 80% of fintech teams that close a Series B are running on a database architecture that won't survive their next 18 months of growth — and they don't find out until it breaks.

Finquery's AP volume is exactly the kind of workload that exposes this. I'd love to show you what we're seeing at comparable companies and whether it applies to you.

15 minutes next week?

Jayson`
        },
        { day: 3, subject: 'The $42M question most engineering teams skip', body: `Jordan,\n\nWith a fresh $42M in the bank, the question most engineering teams skip: "Will our data layer survive 3x the load?"\n\nWe have a quick framework for stress-testing this — 15 minutes, no prep needed.\n\nJayson` },
        { day: 7, subject: 'Quick follow-up on DB scaling', body: `Jordan,\n\nStill think there's a relevant story here for Finquery. Happy to share what we did for a comparable fintech team if you have 15 minutes.\n\nJayson` },
        { day: 14, subject: 'Last note from me', body: `Jordan,\n\nNot going to keep filling your inbox — just wanted to leave the door open. If scaling your data layer ever becomes a priority, I'm here.\n\nJayson` }
      ],
      'voss': [
        {
          day: 1,
          subject: "You're probably thinking this is another MongoDB pitch",
          body: `Jordan,

You're probably thinking I'm just another vendor who saw your Series B announcement and fired off a templated email. I get it — you're getting a lot of those right now.

I'm not here to push a product. I'm genuinely curious whether what we're seeing at other fintech teams at your stage is relevant to what you're dealing with at Finquery.

It sounds like you're in the middle of serious infrastructure scaling decisions. Am I reading that right?

If so — 15 minutes to compare notes?

Jayson`
        },
        { day: 3, subject: 'Still curious about the Finquery stack', body: `Jordan,\n\nIt sounds like you might be heads-down right now. Totally fair.\n\nWhen things settle — would it make sense to have a quick conversation about what we're seeing in fintech infrastructure at your stage?\n\nJayson` },
        { day: 7, subject: 'One specific thing worth knowing', body: `Jordan,\n\nI'll be direct — we helped a fintech company reduce DB costs by 30% at almost exactly Finquery's stage. I think it's worth 15 minutes to see if that's relevant to you.\n\nJayson` },
        { day: 14, subject: 'Leaving this here', body: `Jordan,\n\nI'll take the hint if now isn't the right time. The door's open whenever it is.\n\nJayson` }
      ],
      'challenger': [
        {
          day: 1,
          subject: 'Most fintech Series B teams are one bad month from a DB crisis',
          body: `Jordan,

Most VPs of Engineering I talk to at your stage are confident their database will scale — right up until it doesn't. And when it breaks at fintech scale, it breaks in production, during a payment run.

Finquery's transaction volume makes this a question worth asking before you need to ask it.

I'd like to challenge your assumptions on this in 15 minutes — not to sell you anything, but because I've seen this movie a few too many times.

Worth it?

Jayson`
        },
        { day: 3, subject: 'The assumption most fintech teams regret', body: `Jordan,\n\nMost teams assume their current stack will scale linearly. It almost never does in fintech. Happy to share what we typically see — 15 minutes.\n\nJayson` },
        { day: 7, subject: 'Still think this is worth your time', body: `Jordan,\n\nOne more try — we helped a fintech team at your exact stage avoid a DB rewrite that would've taken 6 months. Worth 15 minutes to see if it's relevant?\n\nJayson` },
        { day: 14, subject: 'Final note', body: `Jordan,\n\nI'll stop here. If the DB scaling question ever becomes urgent, I'd love to be the first call.\n\nJayson` }
      ]
    },

    callScripts: {
      direct: {
        steps: [
          { id: 1, label: 'OPENER', script: "Hey Jordan? Hey Jordan, this is Jayson over at MongoDB — how are you doing today?", ifTheyPushBack: "I totally understand you're busy — do you have just 60 seconds? I'll be quick.", coachingNote: "Warm, casual. Not a sales robot. Breathe." },
          { id: 2, label: 'YES STREAK #1', script: "Jordan, you probably don't recognize my name —", ifTheyPushBack: undefined, coachingNote: "Pause here. Let them confirm. Get the first yes." },
          { id: 3, label: 'YES STREAK #2', script: "— but you most likely know who MongoDB is, right?", ifTheyPushBack: "We power the data layer for a lot of the fintech infrastructure you interact with every day — Uber, Coinbase, that kind of scale.", coachingNote: "Second yes. Nod along to their response." },
          { id: 4, label: 'YES STREAK #3', script: "Do you mind if I get straight to the point?", ifTheyPushBack: undefined, coachingNote: "Third yes. Now you've earned the right to pitch." },
          { id: 5, label: 'PROOF POINT', script: "We just helped a digital payments company at your exact stage — post-Series B, scaling fast — reduce their DB complexity costs by 30% and cut $200K in annual infrastructure spend. Your name came up when I was looking at fintech teams dealing with the same scaling questions.", ifTheyPushBack: "I hear you — I'm not asking you to switch anything today. I just want to show you what we saw and let you decide if it's relevant.", coachingNote: "Specific. Numbers. Connect it to their situation." },
          { id: 6, label: 'ASK FOR MEETING', script: "I'd like to get 15 minutes on your calendar to walk through what we did. How does [DATE 1] work for you?", ifTheyPushBack: "I totally understand — what about [DATE 2]?", coachingNote: "Ask, then go silent. Say nothing. Wait." },
          { id: 7, label: 'CLOSE', script: "Perfect. You'll get a calendar invite from me with a clear agenda — nothing to prep. Talk to you [DATE 1].", ifTheyPushBack: undefined, coachingNote: "End the call NOW. Don't summarize. Don't give them a reason to change their mind." }
        ]
      },
      ea: {
        steps: [
          { id: 1, label: 'REACH THE EA', script: "Hello, this is Jayson from MongoDB. I'd like to be connected to Jordan Lee please.", ifTheyPushBack: undefined, coachingNote: "Statement, not a question. Deep voice. You expect to be connected." },
          { id: 2, label: 'EA ASKS WHY', script: "It's to discuss a data infrastructure proposal for Finquery's engineering team. I'll wait on the line — thank you.", ifTheyPushBack: "I understand — I just need two minutes with Jordan. It's time-sensitive.", coachingNote: "Confident. Brief. Don't over-explain — that signals you can be blocked." },
          { id: 3, label: 'CONNECTED — OPENER', script: "Hey Jordan — this is Jayson from MongoDB. Your assistant was kind enough to connect us. Do you have 60 seconds?", coachingNote: "Acknowledge the EA helped. Shows respect. Keep it short." },
          { id: 4, label: 'YES STREAK #1 + #2', script: "You probably don't recognize my name, but you most likely know MongoDB, right?", ifTheyPushBack: "We power the data layer for Uber, Coinbase, a lot of the fintech infrastructure at scale.", coachingNote: "Faster here — they didn't choose to take this call." },
          { id: 5, label: 'PROOF POINT', script: "I'll get to the point — we helped a payments company at Finquery's stage cut DB costs 30% and save $200K a year. I think it's worth 15 minutes to see if it's relevant to what you're building.", ifTheyPushBack: "Totally fair — what if I send a one-pager and we find 15 minutes after you've had a chance to look?", coachingNote: "Specific. Fast. Earn the meeting." },
          { id: 6, label: 'ASK FOR MEETING', script: "How does [DATE 1] look on your calendar?", ifTheyPushBack: "What about [DATE 2]?", coachingNote: "Ask and stop talking. The silence is yours to hold." },
          { id: 7, label: 'CLOSE', script: "Great — you'll get an invite from me shortly with a clear agenda. Thanks Jordan, talk to you [DATE 1].", coachingNote: "End it. Clean close. No summaries." }
        ]
      }
    },

    voicemailScript: "Hey Jordan, it's Jayson from MongoDB — I'll keep this under 20 seconds. We just helped a fintech company at Finquery's stage cut database costs by 30%. I think it's worth a quick conversation. I'll send you a note with the details — talk soon.",

    accusationAudit: "You're probably thinking I saw your Series B announcement and fired off the same email I send to every VP of Engineering on LinkedIn. You might be thinking MongoDB's just another vendor trying to get on your roadmap. I get it — and honestly, if this isn't relevant to what you're dealing with right now, I'll tell you that in the first two minutes.",

    linkedin: {
      connectionNote: "Jordan — saw your Series B announcement and the backend hiring push. I work with fintech engineering teams at this exact stage on DB scaling. Would love to connect.",
      inMail: `Jordan,

Your work scaling Finquery's AP platform post-Series B caught my attention — specifically the backend hiring velocity you've had in the last 90 days.

I work with MongoDB and we just finished a project with a fintech company at your stage that reduced their database complexity costs by 30%. The situation looked pretty similar to what I'm seeing at Finquery.

Worth 15 minutes to compare notes?

Jayson`
    },

    objections: [
      { objection: "We're happy with PostgreSQL", technique: 'mirror', techniquePhrase: "Happy with PostgreSQL?", response: "That makes sense — Postgres is solid. The question we usually ask is: happy at current volume, or happy at 10x current volume? Most teams are surprised where the gaps show up. Happy to show you what that looks like in 15 minutes." },
      { objection: "Now isn't a good time", technique: 'label', techniquePhrase: "It sounds like you've got a lot on your plate right now.", response: "It sounds like you've got a lot on your plate right now. That's exactly why I want to keep this to 15 minutes — and if it's not relevant, I'll tell you in the first five." },
      { objection: "Send me an email", technique: 'accusation-audit', techniquePhrase: "You're probably thinking an email is a polite way to end this call.", response: "Of course — let me send you a calendar invite that includes all the information and a clear agenda for [DATE 1] at [TIME 1]. You'll have everything you need in the invite." },
      { objection: "We already looked at MongoDB", technique: 'mirror', techniquePhrase: "Already looked at MongoDB?", response: "Already looked at MongoDB — when was that? A lot has changed in the last 18 months, especially around what we're doing for fintech teams at your scale. Worth a quick refresh?" }
    ],

    discoveryQuestions: [
      "How are you handling write-heavy workloads as you scale post-Series B?",
      "What does your current database architecture look like — single Postgres instance, RDS cluster, or something else?",
      "When you think about the next 18 months of growth, what's the part of your data layer that keeps you up at night?",
      "Have you hit any caching or indexing limits with your current setup yet?",
      "How long does a schema change take in your current system — days, weeks?"
    ],

    meetingPrep: {
      brief: "Jordan is 3 months post-Series B ($42M). They've been hiring backend engineers aggressively — 4 in 90 days — which signals they're scaling product, not just headcount. CTO is a Stripe alum who will know MongoDB. Core product processes $2B+ in invoices monthly. PostgreSQL + Redis setup is common at their stage but typically starts showing cracks around 5-10x current volume.",
      suggestedQs: [
        "What's driving the backend hiring push — new product features or existing system capacity?",
        "How is the new CTO thinking about the data architecture long-term?",
        "Where are you seeing the most latency pain today?",
        "What does your DB monitoring look like — are you tracking query performance proactively?"
      ]
    },

    outcomes: []
  },

  // ─── A-TIER #2 ─────────────────────────────────────────────────────────────
  {
    id: 'p2',
    name: 'Sarah Kim',
    title: 'CTO',
    company: 'MedVault',
    industry: 'healthtech',
    phone: '+1 (617) 555-0247',
    linkedinUrl: 'linkedin.com/in/sarahkim-medvault',
    icpTier: 'A',
    status: 'emailed',
    priorityScore: 84,
    lastContactDate: '2026-04-02',
    daysSinceContact: 4,
    suggestedProofPointId: 'healthtech-records',

    whyNow: ['HIPAA compliance audit Q2', 'Migrating from on-prem to AWS', '3 open Data Engineer roles posted', 'Recent blog post: "Why we outgrew relational databases"'],
    techStack: ['MySQL', 'MongoDB Atlas (partial)', 'Python', 'AWS'],
    recentNews: ['MedVault raises $18M Series A', 'Partnership announced with Epic Systems', 'Hiring across engineering for cloud migration'],
    companySnapshot: 'MedVault builds clinical data infrastructure for mid-size hospitals. 90 employees, Series A. They\'re mid-migration from on-prem MySQL to AWS — and their CTO already knows MongoDB (partial Atlas usage). This is an expansion play.',

    styleEmails: {
      'my-style': [
        {
          day: 1,
          subject: "MedVault's cloud migration and the data layer question",
          body: `Sarah,

Your recent post on outgrowing relational databases and the AWS migration you're in the middle of — that combination is exactly when teams like yours usually hit the same inflection point.

MongoDB is working with healthcare engineering teams at this stage to:
• Cut query latency by 95% (4 seconds → under 80ms) by unifying fragmented clinical data sources
• Eliminate $150K+ in annual ops overhead from managing multiple database systems in parallel

You're already using Atlas partially — I'd love to show you what a full consolidation looks like for teams at MedVault's scale.

15 minutes next week?

Jayson`
        },
        { day: 3, subject: 'Following up on the MedVault migration', body: `Sarah,\n\nQuick follow-up. Given you're mid-migration, I know timing matters. Happy to work around your schedule — even 15 minutes is enough.\n\nJayson` },
        { day: 7, subject: 'One thing that surprised a healthtech CTO like you', body: `Sarah,\n\nWe helped a health system cut query latency from 4 seconds to under 80ms. Their stack looked a lot like MedVault's pre-migration setup.\n\nHappy to walk through how they did it. 15 minutes.\n\nJayson` },
        { day: 14, subject: 'Last note — leaving the door open', body: `Sarah,\n\nI'll stop reaching out after this. If the Atlas expansion question ever becomes a priority, I'd love to be your first call.\n\nJayson` }
      ],
      'value-sniper': [
        { day: 1, subject: '95% query latency reduction in healthcare — how?', body: `Sarah,\n\nWe helped a top-10 US health system cut query latency from 4 seconds to under 80ms. The key was eliminating the fragmented multi-database setup they were running during migration.\n\nMedVault's mid-migration moment is exactly when this matters most. Worth 15 minutes?\n\nJayson` },
        { day: 3, subject: 'The $150K ops cost most healthtech CTOs don\'t see', body: `Sarah,\n\nRunning MySQL and Atlas in parallel during migration typically adds $150K+ in annual ops overhead. We have a faster path. 15 minutes?\n\nJayson` },
        { day: 7, subject: 'Still think this is relevant', body: `Sarah,\n\nOne more try — I think the timing is actually perfect for MedVault right now. 15 minutes to see if the numbers apply?\n\nJayson` },
        { day: 14, subject: 'Last one', body: `Sarah,\n\nI'll leave the door open. Reach out whenever the migration timeline becomes a priority.\n\nJayson` }
      ],
      'voss': [
        { day: 1, subject: "You're probably skeptical of another MongoDB pitch", body: `Sarah,\n\nYou're probably thinking: we're already using Atlas partially, so why am I getting a sales email?\n\nFair. But it sounds like you're in the middle of a migration where the data architecture decisions you make in the next 90 days will define MedVault's infrastructure for the next five years.\n\nIs that accurate? If so — worth 15 minutes to compare notes?\n\nJayson` },
        { day: 3, subject: 'Still curious about the migration', body: `Sarah,\n\nIt sounds like the migration is consuming most of your bandwidth right now. Makes sense.\n\nWhen there's a window — would 15 minutes be worth it to see what we're doing for healthtech teams at your stage?\n\nJayson` },
        { day: 7, subject: 'One specific thing', body: `Sarah,\n\nWe helped a health system eliminate $150K in annual ops overhead during their migration. I think it's worth 15 minutes to see if that applies to MedVault.\n\nJayson` },
        { day: 14, subject: 'Leaving this here', body: `Sarah,\n\nI'll stop here. Door's open whenever the timing is right.\n\nJayson` }
      ],
      'challenger': [
        { day: 1, subject: 'Most healthtech CTOs underestimate this migration risk', body: `Sarah,\n\nMost CTOs running a MySQL → cloud migration assume their data model translates cleanly. It almost never does in healthcare — and the moment you discover that is usually three months after go-live.\n\nI'd like to challenge your assumptions on this in 15 minutes. Not to pitch — to make sure you're not building toward a problem.\n\nWorth it?\n\nJayson` },
        { day: 3, subject: 'The migration assumption worth questioning', body: `Sarah,\n\nStill think there's a relevant conversation here about MedVault's migration architecture. 15 minutes?\n\nJayson` },
        { day: 7, subject: 'One more try', body: `Sarah,\n\nHappy to share what we've seen go wrong in healthtech migrations at your stage. 15 minutes.\n\nJayson` },
        { day: 14, subject: 'Last note', body: `Sarah,\n\nLeaving the door open. Reach out anytime.\n\nJayson` }
      ]
    },

    callScripts: {
      direct: {
        steps: [
          { id: 1, label: 'OPENER', script: "Hey Sarah? This is Jayson from MongoDB — how are you doing today?", coachingNote: "She's a CTO — expect efficiency. Match her pace." },
          { id: 2, label: 'YES STREAK #1 + #2', script: "You probably don't recognize my name, but you're already using MongoDB Atlas — so you know us. Do you have 60 seconds?", coachingNote: "Lead with 'you're already a customer' — disarms immediately." },
          { id: 3, label: 'YES STREAK #3', script: "Do you mind if I get straight to the point?", coachingNote: "Third yes. Move fast — she'll appreciate it." },
          { id: 4, label: 'PROOF POINT', script: "We just finished a project with a health system mid-migration like MedVault — cut their query latency 95% and eliminated $150K in ops overhead. I think there's something directly applicable to what you're doing right now.", ifTheyPushBack: "Totally fair — I'll send the case study and we can go from there.", coachingNote: "Healthcare-specific. Numbers. Tie it to her migration." },
          { id: 5, label: 'ASK FOR MEETING', script: "I'd love to get 15 minutes on your calendar. How does [DATE 1] look?", ifTheyPushBack: "What about [DATE 2]?", coachingNote: "Ask. Stop. Wait." },
          { id: 6, label: 'CLOSE', script: "Perfect — you'll get an invite from me with a clear agenda. Talk to you [DATE 1].", coachingNote: "Done. End it clean." }
        ]
      },
      ea: {
        steps: [
          { id: 1, label: 'REACH THE EA', script: "Hello, this is Jayson from MongoDB. I'd like to be connected to Sarah Kim please.", coachingNote: "Direct. Expect to be connected." },
          { id: 2, label: 'EA ASKS WHY', script: "It's regarding MedVault's Atlas environment and an infrastructure proposal. I'll hold — thank you.", coachingNote: "Specific enough to sound legitimate, brief enough to not oversell." },
          { id: 3, label: 'CONNECTED', script: "Sarah — Jayson from MongoDB. I'll be quick. You're already using Atlas, and I think there's a fast win in your migration timeline I'd love to show you.", coachingNote: "Lead with the relationship. No cold-call energy." },
          { id: 4, label: 'PROOF POINT + ASK', script: "We cut query latency 95% for a health system mid-migration. 15 minutes — how does [DATE 1] look?", ifTheyPushBack: "What about [DATE 2]?", coachingNote: "Fast and direct. She values her time." },
          { id: 5, label: 'CLOSE', script: "Great — invite coming your way. Talk to you [DATE 1].", coachingNote: "Clean. Done." }
        ]
      }
    },

    voicemailScript: "Hey Sarah, Jayson from MongoDB. Quick one — you're already using Atlas and I have a specific case study from a health system mid-migration that I think is worth 15 minutes of your time. I'll send it over. Talk soon.",

    accusationAudit: "You're probably thinking: we're already using MongoDB, so why is a sales rep calling? And maybe that I'm just trying to upsell you without understanding where you actually are in the migration. I get it — and if this isn't the right time, I'll tell you that upfront.",

    linkedin: {
      connectionNote: "Sarah — I work with healthtech CTOs on data architecture during cloud migrations. Your Atlas usage and AWS move caught my attention. Would love to connect.",
      inMail: `Sarah,\n\nYour post on outgrowing relational databases and MedVault's AWS migration are exactly the combination I wanted to reach out about.\n\nI work with MongoDB and just wrapped a project with a health system in a similar spot — cut query latency 95% mid-migration. I think there's something directly applicable to MedVault.\n\n15 minutes worth it?\n\nJayson`
    },

    objections: [
      { objection: "We're already using MongoDB", technique: 'mirror', techniquePhrase: "Already using MongoDB?", response: "That's actually why I'm calling — I want to make sure you're getting the most out of it during the migration. A lot of teams in partial Atlas setups leave significant performance gains on the table. 15 minutes to show you what that looks like?" },
      { objection: "We're in the middle of a migration, bad timing", technique: 'label', techniquePhrase: "It sounds like the migration is consuming everything right now.", response: "It sounds like the migration is consuming everything right now — totally understand. That's actually the best time to have this conversation, because the decisions you make in the next 90 days define your architecture for years. Can we do 15 minutes around your schedule?" },
      { objection: "I'll have my team evaluate it", technique: 'accusation-audit', techniquePhrase: "You're probably thinking this is something to delegate.", response: "Of course — and I'd love to set up that session. But given you're CTO, I'd love 15 minutes with you first so I can make sure what we show your team is actually relevant to your architecture goals. Does [DATE 1] work?" }
    ],

    discoveryQuestions: [
      "Where are you in the MySQL to Atlas migration — early planning, mid-execution, or mostly done?",
      "Are you running both systems in parallel right now? How long do you expect that to last?",
      "What's been the most painful part of the migration so far?",
      "How is the Epic partnership affecting your data model requirements?",
      "What does clinical query performance look like today vs. what you need post-migration?"
    ],

    meetingPrep: {
      brief: "Sarah is CTO at MedVault, mid-migration from MySQL to AWS. She's already a partial MongoDB Atlas customer — this is an expansion conversation, not a new logo. The Epic partnership is new and likely adding schema complexity. She's a technical CTO who will engage on architecture details.",
      suggestedQs: ["What's the Epic integration requiring from a data model perspective?", "Where are the biggest performance gaps in the current MySQL setup?", "What's the go-live timeline for the full AWS migration?"]
    },

    outcomes: [{ date: '2026-04-02', type: 'emailed', style: 'my-style' }]
  },

  // ─── A-TIER #3 ─────────────────────────────────────────────────────────────
  {
    id: 'p3',
    name: 'Marcus Chen',
    title: 'Director of Engineering',
    company: 'ShopStream',
    industry: 'ecommerce',
    phone: '+1 (206) 555-0391',
    linkedinUrl: 'linkedin.com/in/marcuschen-shopstream',
    icpTier: 'A',
    status: 'called',
    priorityScore: 78,
    lastContactDate: '2026-04-04',
    daysSinceContact: 2,
    suggestedProofPointId: 'ecommerce-catalog',

    whyNow: ['Black Friday outage reported in TechCrunch', 'Hiring 2 senior DB engineers', 'Product catalog growing 40% QoQ', 'Engineering blog: "We need to rethink our data layer"'],
    techStack: ['PostgreSQL', 'Elasticsearch', 'Redis', 'AWS', 'React'],
    recentNews: ['ShopStream raises $30M Series B', 'Black Friday outage post-mortem published', 'New VP Product hired from Shopify'],
    companySnapshot: 'ShopStream is a live-commerce platform (think QVC meets Twitch). 150 employees, $30M Series B. Their product catalog has grown 40% QoQ and their Black Friday outage was very public — they\'re now actively looking to fix the data layer.',

    styleEmails: {
      'my-style': [
        { day: 1, subject: 'ShopStream\'s catalog scale and the Black Friday post-mortem', body: `Marcus,\n\nYour engineering blog post on the Black Friday outage was honest — and the root cause you identified (catalog query volume overwhelming the DB) is something we've fixed for e-commerce teams at your exact stage.\n\nMongoDB is working with platforms like ShopStream to:\n• Scale to 500M+ product SKUs with sub-50ms search — no separate Elasticsearch cluster needed\n• Save $1M+ in re-platforming costs by consolidating catalog, inventory, and session data\n\nGiven the timing — post-Series B, actively hiring DB engineers — I'd love 15 minutes to show you what that looks like in practice.\n\nJayson` },
        { day: 3, subject: 'Re: ShopStream catalog scale', body: `Marcus,\n\nQuick follow-up — I know you're in the middle of the post-outage fix. Happy to work around your schedule.\n\nJayson` },
        { day: 7, subject: 'What we did for a platform exactly like ShopStream', body: `Marcus,\n\nWe helped a Fortune 500 retailer scale to 500M SKUs with sub-50ms search. Their setup looked a lot like ShopStream pre-Series B.\n\n15 minutes to walk through it?\n\nJayson` },
        { day: 14, subject: 'Last note', body: `Marcus,\n\nLeaving the door open — reach out whenever the catalog scaling becomes the priority.\n\nJayson` }
      ],
      'value-sniper': [
        { day: 1, subject: '$1.2M saved in re-platforming — here\'s how', body: `Marcus,\n\nWe helped a Fortune 500 retailer save $1.2M in re-platforming costs and scale to 500M product SKUs. The setup they were on pre-migration looked like ShopStream's current stack.\n\nWorth 15 minutes given the post-Series B timing?\n\nJayson` },
        { day: 3, subject: 'Sub-50ms catalog search without Elasticsearch', body: `Marcus,\n\nIf you're still running separate Elasticsearch for catalog search, we can consolidate that into MongoDB Atlas Search — sub-50ms, no cluster to manage. 15 minutes?\n\nJayson` },
        { day: 7, subject: 'Still relevant', body: `Marcus,\n\nOne more try on the catalog scaling conversation. 15 minutes whenever works.\n\nJayson` },
        { day: 14, subject: 'Final note', body: `Marcus,\n\nI'll leave the door open. Reach out anytime.\n\nJayson` }
      ],
      'voss': [
        { day: 1, subject: 'You\'re probably tired of vendors piling on after the outage', body: `Marcus,\n\nYou're probably thinking every database vendor in the world saw your Black Friday post-mortem and is now cold-calling you. You're not wrong.\n\nI'll be direct: I'm not here to pile on. I'm curious whether what we're seeing at live-commerce platforms at your scale is actually relevant to what you're debugging right now.\n\nIs it worth 15 minutes to compare notes?\n\nJayson` },
        { day: 3, subject: 'Still curious about the ShopStream stack', body: `Marcus,\n\nIt sounds like post-outage mode is consuming everything right now. Totally understand.\n\nWhen there's a window — 15 minutes to see if what we're doing for similar platforms applies?\n\nJayson` },
        { day: 7, subject: 'One specific thing worth knowing', body: `Marcus,\n\nWe helped a live-commerce platform eliminate their catalog query bottleneck in 6 weeks. Worth 15 minutes to see if it's relevant?\n\nJayson` },
        { day: 14, subject: 'Last note', body: `Marcus,\n\nDoor's open whenever.\n\nJayson` }
      ],
      'challenger': [
        { day: 1, subject: 'The Black Friday fix most engineering teams get wrong', body: `Marcus,\n\nMost teams that survive a catalog outage fix the symptom — add caching, tune indexes, scale the cluster. The problem is that usually comes back in 18 months at the next inflection point.\n\nI'd like to challenge your post-mortem assumptions in 15 minutes — not to pitch, but because I've seen this movie and the plot twist is usually the same.\n\nWorth it?\n\nJayson` },
        { day: 3, subject: 'The fix that usually comes back', body: `Marcus,\n\nStill think there's a conversation worth having about the long-term architecture, not just the immediate fix. 15 minutes?\n\nJayson` },
        { day: 7, subject: 'One more', body: `Marcus,\n\nHappy to share what we've seen at comparable platforms. 15 minutes.\n\nJayson` },
        { day: 14, subject: 'Last note', body: `Marcus,\n\nLeaving the door open.\n\nJayson` }
      ]
    },

    callScripts: {
      direct: {
        steps: [
          { id: 1, label: 'OPENER', script: "Hey Marcus? This is Jayson from MongoDB — how are you doing today?", coachingNote: "He's post-outage, likely stressed. Be calm and empathetic." },
          { id: 2, label: 'YES STREAK #1 + #2', script: "You probably don't recognize my name, but I'm guessing MongoDB is top of mind for you right now — right?", ifTheyPushBack: "We're the document database — Uber, Coinbase, a lot of live-commerce platforms at your scale.", coachingNote: "Reference the outage context without being crass about it." },
          { id: 3, label: 'YES STREAK #3', script: "Do you mind if I get straight to the point?", coachingNote: "Third yes. Move." },
          { id: 4, label: 'PROOF POINT', script: "We helped a Fortune 500 retailer scale to 500M product SKUs with sub-50ms search — and they eliminated their separate Elasticsearch cluster at the same time. The setup they were on pre-migration looked like ShopStream's current stack.", ifTheyPushBack: "Fair — I can send a one-pager and we find 15 minutes after you've read it.", coachingNote: "Specific. Connects to their exact pain (catalog + Elasticsearch)." },
          { id: 5, label: 'ASK FOR MEETING', script: "I'd like 15 minutes to walk through how they did it. How does [DATE 1] look?", ifTheyPushBack: "What about [DATE 2]?", coachingNote: "Ask. Stop talking." },
          { id: 6, label: 'CLOSE', script: "Great — invite coming your way with a clear agenda. Talk to you [DATE 1].", coachingNote: "End it." }
        ]
      },
      ea: {
        steps: [
          { id: 1, label: 'REACH THE EA', script: "Hello, this is Jayson from MongoDB. I'd like to be connected to Marcus Chen please.", coachingNote: "Confident. Statement." },
          { id: 2, label: 'EA ASKS WHY', script: "It's regarding ShopStream's catalog infrastructure. I'll hold — thank you.", coachingNote: "Brief. Specific enough." },
          { id: 3, label: 'CONNECTED', script: "Marcus — Jayson from MongoDB. Quick one: we just helped a live-commerce platform fix the same catalog scaling issue you wrote about. Worth 15 minutes?", coachingNote: "Lead with the outage reference. He'll know you did your research." },
          { id: 4, label: 'ASK FOR MEETING', script: "How does [DATE 1] look?", ifTheyPushBack: "What about [DATE 2]?", coachingNote: "Fast. He's busy." },
          { id: 5, label: 'CLOSE', script: "Invite coming your way. Talk to you [DATE 1].", coachingNote: "Done." }
        ]
      }
    },

    voicemailScript: "Hey Marcus, Jayson from MongoDB. Quick one — we helped a live-commerce platform fix a catalog scaling issue that sounds like what you described in your post-mortem. Worth 15 minutes. I'll send a note. Talk soon.",

    accusationAudit: "You're probably thinking every database vendor in the world saw your Black Friday post-mortem and now I'm one of fifty cold calls this week. You'd be right. But I genuinely think what we did for a comparable platform is worth 15 minutes of your time — and I'll tell you in the first five if it's not.",

    linkedin: {
      connectionNote: "Marcus — your post-mortem post on the catalog outage was honest and well-written. I work with MongoDB on exactly this type of scaling challenge. Would love to connect.",
      inMail: `Marcus,\n\nYour engineering blog post on the Black Friday outage was the most honest post-mortem I've read this year. The catalog query bottleneck you described is something we've fixed for live-commerce platforms at your scale.\n\nWe helped a Fortune 500 retailer scale to 500M SKUs with sub-50ms search — and eliminated their Elasticsearch cluster at the same time.\n\nWorth 15 minutes to compare notes?\n\nJayson`
    },

    objections: [
      { objection: "We're already in the middle of fixing the issue", technique: 'label', techniquePhrase: "It sounds like you're heads-down on the immediate fix right now.", response: "It sounds like you're heads-down on the immediate fix right now — totally makes sense. The reason I'd still love 15 minutes is to make sure the fix you're deploying doesn't set up the same problem 18 months from now. Can we find time around your current sprint?" },
      { objection: "We're happy with PostgreSQL / Elasticsearch", technique: 'mirror', techniquePhrase: "Happy with the current setup?", response: "Happy with the current setup — after the Black Friday outage? I hear that. Walk me through what changed — because if the fix holds, we may genuinely not have a conversation to have. But if it's a patch job, I want to show you what a permanent fix looks like." },
      { objection: "We just raised, we're focused on product", technique: 'accusation-audit', techniquePhrase: "You're probably thinking infrastructure changes post-raise are the last thing you want.", response: "You're probably thinking the last thing you want is a major infrastructure project right after a raise. I agree — that's why I'm not suggesting one. I'm suggesting 15 minutes to see if there's a low-lift path that gets you the headroom you need." }
    ],

    discoveryQuestions: [
      "What's the current fix you're deploying post-outage — more caching, index tuning, or something bigger?",
      "How long are you expecting the current fix to buy you before you hit the next ceiling?",
      "How much engineering time is the Elasticsearch cluster consuming to manage?",
      "What does catalog search latency look like today at peak traffic?",
      "Is the new VP Product from Shopify changing the catalog requirements at all?"
    ],

    meetingPrep: {
      brief: "Marcus is Director of Engineering at ShopStream, post-Series B, post-public outage. He's been through a painful event and is in fix-it mode. He's smart and will be skeptical — come with specifics. The VP Product hire from Shopify likely means new feature velocity is coming, which means the data layer will be stressed again.",
      suggestedQs: ["What's the post-mortem conclusion — infrastructure fix or architectural change?", "Is the new VP Product already changing your roadmap?", "What's your current Elasticsearch setup — managed or self-hosted?"]
    },

    outcomes: [
      { date: '2026-04-01', type: 'emailed', style: 'my-style' },
      { date: '2026-04-04', type: 'called' }
    ]
  },

  // ─── B-TIER ────────────────────────────────────────────────────────────────
  {
    id: 'p4',
    name: 'Priya Nair',
    title: 'Engineering Manager',
    company: 'Teamflow',
    industry: 'saas',
    phone: '+1 (512) 555-0156',
    linkedinUrl: 'linkedin.com/in/priyanair-teamflow',
    icpTier: 'B',
    status: 'not-started',
    priorityScore: 62,
    daysSinceContact: 0,
    suggestedProofPointId: 'saas-multitenancy',

    whyNow: ['Growing from 50 to 200 enterprise tenants', 'Job posting mentions multi-tenant data isolation', 'Product blog on enterprise expansion strategy'],
    techStack: ['PostgreSQL', 'Redis', 'Node.js', 'Heroku'],
    recentNews: ['Teamflow raises $12M Series A', 'Enterprise plan launched', 'Remote work trend tailwinds'],
    companySnapshot: 'Teamflow is a virtual office platform for remote teams. 60 employees, $12M Series A. Moving upmarket to enterprise — multi-tenancy and data isolation are their current scaling challenge.',

    styleEmails: {
      'my-style': [
        { day: 1, subject: "Teamflow's enterprise expansion and multi-tenant data", body: `Priya,\n\nYour enterprise expansion and the job posting mentioning multi-tenant data isolation caught my attention. Moving from 50 to 200 enterprise tenants is exactly when teams hit the ceiling on their current data model.\n\nMongoDB is working with B2B SaaS companies at this stage to:\n• Onboard 3x more enterprise tenants without infrastructure changes\n• Cut time-to-provision from 2 weeks to 4 hours with document-based tenant isolation\n\nWould 15 minutes be worth it to see how comparable teams have handled this?\n\nJayson` },
        { day: 3, subject: 'Following up on multi-tenant scaling', body: `Priya,\n\nQuick follow-up on the enterprise expansion question. 15 minutes whenever works.\n\nJayson` },
        { day: 7, subject: 'What we did for a SaaS team at your stage', body: `Priya,\n\nWe helped a B2B SaaS company cut tenant provisioning time from 2 weeks to 4 hours. Their setup looked like Teamflow's current stack. 15 minutes?\n\nJayson` },
        { day: 14, subject: 'Last note', body: `Priya,\n\nLeaving the door open. Reach out whenever multi-tenancy becomes the priority.\n\nJayson` }
      ],
      'value-sniper': [
        { day: 1, subject: 'Tenant provisioning from 2 weeks to 4 hours', body: `Priya,\n\nWe helped a B2B SaaS company cut tenant provisioning from 2 weeks to 4 hours and onboard 3x more enterprise customers. Their challenge was identical to what I see in Teamflow's job postings.\n\n15 minutes?\n\nJayson` },
        { day: 3, subject: 'The multi-tenant scaling pattern', body: `Priya,\n\nStill think the multi-tenancy conversation is worth having as you scale to 200 enterprise tenants. 15 minutes?\n\nJayson` },
        { day: 7, subject: 'One more', body: `Priya,\n\nHappy to share the specifics. 15 minutes whenever.\n\nJayson` },
        { day: 14, subject: 'Last note', body: `Priya,\n\nDoor's open.\n\nJayson` }
      ],
      'voss': [
        { day: 1, subject: "You're probably skeptical of another infrastructure pitch", body: `Priya,\n\nYou're probably thinking: we're busy scaling to enterprise and the last thing I need is an infrastructure conversation.\n\nFair. But it sounds like the multi-tenant data challenge is going to hit Teamflow in the next 6-12 months whether you plan for it or not.\n\nIs that accurate? If so — worth 15 minutes?\n\nJayson` },
        { day: 3, subject: 'Still curious', body: `Priya,\n\nIt sounds like you're heads-down on the enterprise expansion. Makes sense.\n\nWhen there's a window — 15 minutes?\n\nJayson` },
        { day: 7, subject: 'One specific thing', body: `Priya,\n\nWe helped a SaaS team eliminate their tenant provisioning backlog in 6 weeks. Worth 15 minutes?\n\nJayson` },
        { day: 14, subject: 'Last note', body: `Priya,\n\nLeaving the door open.\n\nJayson` }
      ],
      'challenger': [
        { day: 1, subject: "Most SaaS teams scale to 200 tenants and then stop growing", body: `Priya,\n\nMost B2B SaaS companies that move upmarket to enterprise hit the same wall at around 200 tenants — and it's almost always a data isolation architecture problem, not a product problem.\n\nI'd like to challenge your current approach in 15 minutes — not to pitch, but to make sure you're not building toward that wall.\n\nWorth it?\n\nJayson` },
        { day: 3, subject: 'The enterprise wall most SaaS teams don\'t see coming', body: `Priya,\n\nStill think this is worth 15 minutes. The multi-tenant architecture decisions you make now will define your ceiling at 200+ tenants.\n\nJayson` },
        { day: 7, subject: 'One more try', body: `Priya,\n\n15 minutes whenever works.\n\nJayson` },
        { day: 14, subject: 'Last note', body: `Priya,\n\nDoor's open.\n\nJayson` }
      ]
    },

    callScripts: {
      direct: {
        steps: [
          { id: 1, label: 'OPENER', script: "Hey Priya? This is Jayson from MongoDB — how are you doing?", coachingNote: "B-tier — be efficient. Earn the meeting quickly." },
          { id: 2, label: 'YES STREAK', script: "You probably don't recognize my name, but you likely know MongoDB. Do you have 60 seconds?", coachingNote: "Standard yes streak. Keep moving." },
          { id: 3, label: 'PROOF POINT + ASK', script: "We helped a SaaS company at Teamflow's stage cut tenant provisioning from 2 weeks to 4 hours and 3x their enterprise onboarding. The job posting you have mentioning multi-tenant isolation is why I'm calling. Worth 15 minutes to see if it applies? How does [DATE 1] look?", ifTheyPushBack: "What about [DATE 2]?", coachingNote: "Compress the script — get to the ask faster for B-tier." },
          { id: 4, label: 'CLOSE', script: "Great — invite coming. Talk to you [DATE 1].", coachingNote: "Clean close." }
        ]
      },
      ea: {
        steps: [
          { id: 1, label: 'REACH THE EA', script: "Hello, this is Jayson from MongoDB. I'd like to be connected to Priya Nair please.", coachingNote: "Direct. Statement." },
          { id: 2, label: 'EA ASKS WHY', script: "It's regarding Teamflow's enterprise data architecture. I'll hold — thank you.", coachingNote: "Brief and specific." },
          { id: 3, label: 'CONNECTED + ASK', script: "Priya — Jayson from MongoDB. Quick one: we helped a SaaS company cut tenant provisioning from 2 weeks to 4 hours. Given Teamflow's enterprise expansion, worth 15 minutes? How does [DATE 1] look?", ifTheyPushBack: "[DATE 2]?", coachingNote: "Fast." },
          { id: 4, label: 'CLOSE', script: "Invite coming. Talk to you [DATE 1].", coachingNote: "Done." }
        ]
      }
    },

    voicemailScript: "Hey Priya, Jayson from MongoDB. We helped a SaaS company cut tenant provisioning from 2 weeks to 4 hours as they scaled to enterprise. Given Teamflow's expansion, think it's worth 15 minutes. I'll send a note. Talk soon.",
    accusationAudit: "You're probably thinking this is another infrastructure sales call at the worst possible time — you're in the middle of an enterprise launch. Fair. I'll make it worth your while in 15 minutes or I'll tell you it's not relevant.",

    linkedin: {
      connectionNote: "Priya — saw Teamflow's enterprise expansion and the multi-tenant data role. I work with MongoDB on exactly this challenge. Would love to connect.",
      inMail: `Priya,\n\nTeamflow's move to enterprise and the multi-tenant isolation challenge it creates is something I've worked on with SaaS companies at your exact stage.\n\nWe helped one cut tenant provisioning from 2 weeks to 4 hours. Worth 15 minutes to see if it applies?\n\nJayson`
    },

    objections: [
      { objection: "We're happy with PostgreSQL", technique: 'mirror', techniquePhrase: "Happy with Postgres for multi-tenancy?", response: "Happy with Postgres for multi-tenancy — at 50 tenants or at 200? The pattern we see is teams are great at 50 and hit a wall at 150-200. Happy to show you what that looks like." },
      { objection: "Now isn't a good time", technique: 'label', techniquePhrase: "It sounds like the enterprise launch is consuming everything.", response: "It sounds like the enterprise launch is consuming everything right now — I get it. What if we do 15 minutes in two weeks, after the initial push?" }
    ],

    discoveryQuestions: [
      "How are you currently handling tenant data isolation — separate schemas, separate databases, or row-level security?",
      "How long does it take to provision a new enterprise tenant today?",
      "What's the biggest technical challenge as you move upmarket?",
      "Are enterprise customers requiring data residency or compliance features that are changing your architecture?"
    ],

    meetingPrep: {
      brief: "Priya is Engineering Manager at Teamflow, a remote-work SaaS company moving upmarket. Her current challenge is multi-tenant data isolation at enterprise scale. Postgres row-level security or schema-per-tenant approaches both have scaling limits she's likely approaching.",
      suggestedQs: ["How are you handling tenant isolation today?", "What's the biggest enterprise customer requirement that's changing your architecture?"]
    },

    outcomes: []
  },

  // ─── B-TIER #2 ─────────────────────────────────────────────────────────────
  {
    id: 'p5',
    name: 'David Torres',
    title: 'Director of IT',
    company: 'FreightX',
    industry: 'logistics',
    phone: '+1 (214) 555-0478',
    linkedinUrl: 'linkedin.com/in/davidtorres-freightx',
    icpTier: 'B',
    status: 'not-started',
    priorityScore: 55,
    daysSinceContact: 0,
    suggestedProofPointId: 'logistics-tracking',

    whyNow: ['New real-time tracking product launching Q2', 'Acquired competitor in Jan 2026', 'IT modernization budget approved'],
    techStack: ['Oracle', 'MySQL', 'Python', 'Azure'],
    recentNews: ['FreightX acquires Parcel Pro for $85M', 'New CMO hired', 'Q2 product roadmap includes real-time tracking'],
    companySnapshot: 'FreightX is a mid-market freight brokerage going digital. 300 employees. The Parcel Pro acquisition doubled their data volume overnight. Their Oracle + MySQL stack is legacy and they know it.',

    styleEmails: {
      'my-style': [
        { day: 1, subject: "FreightX's Parcel Pro acquisition and the data consolidation question", body: `David,\n\nThe Parcel Pro acquisition in January effectively doubled your data volume overnight. The real-time tracking product you're launching in Q2 is going to put a lot of pressure on a combined Oracle/MySQL stack.\n\nMongoDB is working with logistics companies at this stage to:\n• Achieve 99.99% uptime across 200M+ daily tracking events\n• Cut operational costs 25% by consolidating legacy database environments\n\nWorth 15 minutes to see how comparable teams have handled post-acquisition data consolidation?\n\nJayson` },
        { day: 3, subject: 'Following up on the FreightX data consolidation', body: `David,\n\nQuick follow-up. Given the Q2 tracking launch timeline, happy to work around your schedule.\n\nJayson` },
        { day: 7, subject: 'What we did for a logistics company post-acquisition', body: `David,\n\nWe helped a global logistics provider handle 200M daily tracking events at 99.99% uptime. Their post-acquisition data challenge looked like FreightX's. 15 minutes?\n\nJayson` },
        { day: 14, subject: 'Last note', body: `David,\n\nLeaving the door open.\n\nJayson` }
      ],
      'value-sniper': [
        { day: 1, subject: '25% cost reduction in logistics infrastructure — how', body: `David,\n\nWe helped a global logistics provider cut operational costs 25% and handle 200M daily tracking events at 99.99% uptime. Post-acquisition, their data challenge looked like what FreightX is heading into.\n\n15 minutes?\n\nJayson` },
        { day: 3, subject: 'The post-acquisition data problem', body: `David,\n\nStill think the data consolidation conversation is worth having before the Q2 tracking launch. 15 minutes?\n\nJayson` },
        { day: 7, subject: 'One more', body: `David,\n\n15 minutes whenever works.\n\nJayson` },
        { day: 14, subject: 'Last note', body: `David,\n\nDoor's open.\n\nJayson` }
      ],
      'voss': [
        { day: 1, subject: "You're probably thinking you have bigger problems than your database", body: `David,\n\nYou're probably thinking: we just closed an $85M acquisition, we're launching a new product, and now some database vendor is calling. You'd be right to push back.\n\nBut it sounds like the Oracle + MySQL consolidation is going to become an urgent problem before Q2 tracking goes live. Is that accurate?\n\nIf so — worth 15 minutes before it becomes a crisis?\n\nJayson` },
        { day: 3, subject: 'Still curious about FreightX post-acquisition', body: `David,\n\nIt sounds like the acquisition integration is consuming everything. Makes sense.\n\nWhen there's a window — 15 minutes to talk data consolidation?\n\nJayson` },
        { day: 7, subject: 'One specific thing', body: `David,\n\nWe helped a logistics company consolidate post-acquisition data and cut costs 25%. Worth 15 minutes?\n\nJayson` },
        { day: 14, subject: 'Last note', body: `David,\n\nLeaving the door open.\n\nJayson` }
      ],
      'challenger': [
        { day: 1, subject: "Most logistics companies regret the database decision they made post-acquisition", body: `David,\n\nMost IT leaders I talk to after an acquisition make the same mistake: they defer the database consolidation decision until after the new product launches. And then they spend 18 months firefighting.\n\nI'd like to challenge that assumption in 15 minutes — not to pitch, but because the Q2 timeline makes the decision window short.\n\nWorth it?\n\nJayson` },
        { day: 3, subject: 'The deferred decision that always comes back', body: `David,\n\nStill think this is worth 15 minutes before the Q2 launch.\n\nJayson` },
        { day: 7, subject: 'One more', body: `David,\n\n15 minutes whenever.\n\nJayson` },
        { day: 14, subject: 'Last note', body: `David,\n\nDoor's open.\n\nJayson` }
      ]
    },

    callScripts: {
      direct: {
        steps: [
          { id: 1, label: 'OPENER', script: "Hey David? This is Jayson from MongoDB — how are you doing?", coachingNote: "IT Director, not engineering. Frame in business/ops terms, not code." },
          { id: 2, label: 'YES STREAK', script: "You probably don't recognize my name, but you likely know MongoDB. Do you have 60 seconds?", coachingNote: "Standard." },
          { id: 3, label: 'PROOF POINT + ASK', script: "We helped a logistics company handle 200M daily tracking events post-acquisition at 99.99% uptime and cut ops costs 25%. Given the Parcel Pro acquisition and your Q2 tracking launch — worth 15 minutes? How does [DATE 1] look?", ifTheyPushBack: "What about [DATE 2]?", coachingNote: "Lead with the acquisition. He knows the problem is coming." },
          { id: 4, label: 'CLOSE', script: "Invite coming. Talk to you [DATE 1].", coachingNote: "Clean." }
        ]
      },
      ea: {
        steps: [
          { id: 1, label: 'REACH THE EA', script: "Hello, this is Jayson from MongoDB. I'd like to be connected to David Torres please.", coachingNote: "Direct." },
          { id: 2, label: 'EA ASKS WHY', script: "It's regarding FreightX's post-acquisition data infrastructure. I'll hold — thank you.", coachingNote: "Brief." },
          { id: 3, label: 'CONNECTED + ASK', script: "David — Jayson from MongoDB. Quick one: we helped a logistics company handle 200M tracking events post-acquisition at 25% lower cost. Given the Parcel Pro integration, worth 15 minutes? How does [DATE 1] look?", ifTheyPushBack: "[DATE 2]?", coachingNote: "Fast." },
          { id: 4, label: 'CLOSE', script: "Invite coming. Talk to you [DATE 1].", coachingNote: "Done." }
        ]
      }
    },

    voicemailScript: "Hey David, Jayson from MongoDB. We helped a logistics company handle a post-acquisition data consolidation — 200M tracking events daily at 99.99% uptime. Given the Parcel Pro acquisition, think it's worth 15 minutes. I'll send a note. Talk soon.",
    accusationAudit: "You're probably thinking: we're post-acquisition, pre-product-launch, and the last thing I have time for is a database pitch. I hear that. I'll make the 15 minutes worth your while or I'll tell you it's not relevant in the first five.",

    linkedin: {
      connectionNote: "David — saw the Parcel Pro acquisition and FreightX's Q2 tracking launch. I work with logistics companies on exactly the post-acquisition data challenge. Would love to connect.",
      inMail: `David,\n\nThe Parcel Pro acquisition doubled FreightX's data volume overnight — and the real-time tracking launch in Q2 is going to stress-test whatever consolidation path you choose.\n\nWe helped a global logistics provider handle 200M daily tracking events post-acquisition at 25% lower cost. Worth 15 minutes?\n\nJayson`
    },

    objections: [
      { objection: "We're committed to Oracle", technique: 'mirror', techniquePhrase: "Committed to Oracle?", response: "Committed to Oracle — even with the Parcel Pro data volume on top? Oracle at that scale is a significant licensing cost. Happy to show you what comparable companies have done to keep Oracle for what it's good at and offload the rest." },
      { objection: "We have a modernization plan already", technique: 'label', techniquePhrase: "It sounds like you've already got a roadmap in place.", response: "It sounds like you've got a roadmap in place — that's great. Is real-time tracking data part of what you're planning to modernize, or is that still Oracle? Because the tracking workload specifically is where we can add the most." }
    ],

    discoveryQuestions: [
      "How are you handling the Parcel Pro data integration — separate systems or consolidating?",
      "What does the real-time tracking data volume look like at peak — events per second?",
      "Is the Q2 launch building on the existing Oracle stack or is there a net-new component?",
      "What's the IT modernization budget covering — cloud migration, new tools, or both?"
    ],

    meetingPrep: {
      brief: "David is Director of IT at FreightX, a logistics company that just completed an $85M acquisition. He has a Q2 tracking product launch deadline and a post-acquisition data mess. He's likely under pressure from leadership to modernize without disrupting operations.",
      suggestedQs: ["How are you handling the Parcel Pro data integration?", "What's the Q2 tracking launch timeline?", "Is the IT modernization plan covering the database layer?"]
    },

    outcomes: []
  },

  // ─── B-TIER #3 ─────────────────────────────────────────────────────────────
  {
    id: 'p6',
    name: 'Aisha Johnson',
    title: 'CTO',
    company: 'LearnLoop',
    industry: 'edtech',
    phone: '+1 (347) 555-0203',
    linkedinUrl: 'linkedin.com/in/aishajohnson-learnloop',
    icpTier: 'B',
    status: 'not-started',
    priorityScore: 48,
    daysSinceContact: 0,
    suggestedProofPointId: 'saas-multitenancy',

    whyNow: ['AI-powered tutoring feature in development', 'Student data growing 5x YoY', 'Job posting for "ML/AI infrastructure engineer"'],
    techStack: ['PostgreSQL', 'Python', 'AWS', 'Pinecone (vector DB)'],
    recentNews: ['LearnLoop raises $8M seed extension', 'AI tutoring beta announced', 'Partnership with 3 university systems'],
    companySnapshot: 'LearnLoop is an AI-powered learning platform for university students. 40 employees, $8M seed. Their AI tutoring feature requires vector search — and they\'re currently running a separate Pinecone instance they don\'t love.',

    styleEmails: {
      'my-style': [
        { day: 1, subject: "LearnLoop's AI tutoring and the vector + operational data problem", body: `Aisha,\n\nThe AI tutoring feature you're building in beta caught my attention — specifically the Pinecone instance you're running alongside Postgres. That two-database pattern for AI features is something we've helped a lot of teams simplify.\n\nMongoDB Atlas Vector Search lets you:\n• Run semantic search and operational queries in one place — no Pinecone to manage\n• Reduce AI infrastructure costs by 40% by eliminating the separate vector database\n\nWould 15 minutes be worth it to see what consolidation looks like for a team at LearnLoop's stage?\n\nJayson` },
        { day: 3, subject: 'Following up on the AI tutoring infrastructure', body: `Aisha,\n\nQuick follow-up on the AI tutoring stack question. 15 minutes whenever works.\n\nJayson` },
        { day: 7, subject: 'What we did for an AI platform at your stage', body: `Aisha,\n\nWe helped a Series B AI company cut infrastructure costs 40% by eliminating their separate vector database. Their setup looked like LearnLoop's.\n\n15 minutes?\n\nJayson` },
        { day: 14, subject: 'Last note', body: `Aisha,\n\nLeaving the door open.\n\nJayson` }
      ],
      'value-sniper': [
        { day: 1, subject: '40% AI infrastructure cost reduction — by eliminating Pinecone', body: `Aisha,\n\nWe helped an AI company reduce infrastructure costs by 40% by eliminating their separate vector database. Their Pinecone + Postgres setup looked exactly like what I see at LearnLoop.\n\n15 minutes?\n\nJayson` },
        { day: 3, subject: 'The two-database AI problem', body: `Aisha,\n\nStill think the vector DB consolidation is worth 15 minutes as you build out the AI tutoring feature.\n\nJayson` },
        { day: 7, subject: 'One more', body: `Aisha,\n\n15 minutes whenever works.\n\nJayson` },
        { day: 14, subject: 'Last note', body: `Aisha,\n\nDoor's open.\n\nJayson` }
      ],
      'voss': [
        { day: 1, subject: "You're probably happy with Pinecone for now", body: `Aisha,\n\nYou're probably thinking: Pinecone works fine for the AI tutoring beta, so why change it?\n\nFair. But it sounds like as the feature scales beyond beta, the two-database ops burden is going to become a real cost and engineering-time issue.\n\nIs that accurate? Worth 15 minutes to see what consolidation looks like?\n\nJayson` },
        { day: 3, subject: 'Still curious about the LearnLoop AI stack', body: `Aisha,\n\nIt sounds like the AI tutoring beta is consuming most of your attention right now. Makes sense.\n\nWhen there's a window — 15 minutes to compare notes?\n\nJayson` },
        { day: 7, subject: 'One specific thing', body: `Aisha,\n\nWe helped an AI team eliminate their Pinecone dependency and cut costs 40%. Worth 15 minutes?\n\nJayson` },
        { day: 14, subject: 'Last note', body: `Aisha,\n\nLeaving the door open.\n\nJayson` }
      ],
      'challenger': [
        { day: 1, subject: "Most AI teams regret the separate vector DB decision at scale", body: `Aisha,\n\nMost CTOs building AI features choose a separate vector database for the prototype because it's the fastest path. The problem is it creates an ops and cost burden that compounds as you scale beyond beta.\n\nI'd like to challenge that assumption in 15 minutes — specifically for the AI tutoring feature you're launching.\n\nWorth it?\n\nJayson` },
        { day: 3, subject: 'The prototype pattern that doesn\'t scale', body: `Aisha,\n\nStill think this is worth 15 minutes before the AI tutoring launch.\n\nJayson` },
        { day: 7, subject: 'One more', body: `Aisha,\n\n15 minutes whenever.\n\nJayson` },
        { day: 14, subject: 'Last note', body: `Aisha,\n\nDoor's open.\n\nJayson` }
      ]
    },

    callScripts: {
      direct: {
        steps: [
          { id: 1, label: 'OPENER', script: "Hey Aisha? This is Jayson from MongoDB — how are you doing?", coachingNote: "Edtech CTO, AI-forward. Lead with the AI angle." },
          { id: 2, label: 'YES STREAK', script: "You probably don't recognize my name, but you likely know MongoDB — and you may have heard of Atlas Vector Search. Do you have 60 seconds?", coachingNote: "Lead with Vector Search — it's why she'd care." },
          { id: 3, label: 'PROOF POINT + ASK', script: "We helped an AI platform company cut infrastructure costs 40% by eliminating their separate vector database — same Pinecone + Postgres setup I see at LearnLoop. Worth 15 minutes? How does [DATE 1] look?", ifTheyPushBack: "What about [DATE 2]?", coachingNote: "Specific to their exact stack." },
          { id: 4, label: 'CLOSE', script: "Invite coming. Talk to you [DATE 1].", coachingNote: "Done." }
        ]
      },
      ea: {
        steps: [
          { id: 1, label: 'REACH THE EA', script: "Hello, this is Jayson from MongoDB. I'd like to be connected to Aisha Johnson please.", coachingNote: "Direct." },
          { id: 2, label: 'EA ASKS WHY', script: "It's regarding LearnLoop's AI infrastructure. I'll hold — thank you.", coachingNote: "Brief." },
          { id: 3, label: 'CONNECTED + ASK', script: "Aisha — Jayson from MongoDB. Quick one: we helped an AI company eliminate their separate vector DB and cut costs 40%. Given LearnLoop's AI tutoring build, worth 15 minutes? How does [DATE 1] look?", ifTheyPushBack: "[DATE 2]?", coachingNote: "Fast." },
          { id: 4, label: 'CLOSE', script: "Invite coming. Talk to you [DATE 1].", coachingNote: "Done." }
        ]
      }
    },

    voicemailScript: "Hey Aisha, Jayson from MongoDB. We helped an AI team cut infrastructure costs 40% by eliminating their separate vector database — same Pinecone + Postgres setup I see at LearnLoop. Think it's worth 15 minutes. I'll send a note. Talk soon.",
    accusationAudit: "You're probably thinking: we're in beta, we don't have scaling problems yet, and this is premature. Fair. But the teams I talk to who address the vector DB architecture in beta almost always thank themselves later. 15 minutes to see if it applies.",

    linkedin: {
      connectionNote: "Aisha — saw the AI tutoring beta and the Pinecone + Postgres setup. I work with MongoDB on exactly this AI infrastructure challenge. Would love to connect.",
      inMail: `Aisha,\n\nThe AI tutoring feature you're building and the two-database (Pinecone + Postgres) pattern you're likely running is something I've helped a lot of AI teams simplify.\n\nMongoDB Atlas Vector Search can eliminate the separate vector DB and cut AI infra costs 40%. Worth 15 minutes?\n\nJayson`
    },

    objections: [
      { objection: "We're happy with Pinecone", technique: 'mirror', techniquePhrase: "Happy with Pinecone?", response: "Happy with Pinecone — at beta scale or at production scale? The ops burden of managing two databases usually becomes real at around 10-50k daily active users. Happy to show you the crossover point." },
      { objection: "We're not ready to make infrastructure changes", technique: 'label', techniquePhrase: "It sounds like you're focused on shipping the feature first.", response: "It sounds like you're focused on shipping the feature first — totally makes sense. The reason I'd still want 15 minutes is that architecture decisions made in beta are usually 10x harder to change in production. Just want to make sure you're aware of the options." }
    ],

    discoveryQuestions: [
      "How are you currently running vector search — Pinecone, pgvector, or something else?",
      "What's the AI tutoring feature's data model — are you embedding student learning history, course content, or both?",
      "What does your target monthly active user count look like post-launch?",
      "Is the ML/AI infrastructure engineer you're hiring expected to own the vector DB?"
    ],

    meetingPrep: {
      brief: "Aisha is CTO at LearnLoop, an AI-forward edtech company building an AI tutoring feature. She's running Pinecone + Postgres — a two-database pattern that creates ops overhead as she scales. She's technically strong and will engage on architecture trade-offs.",
      suggestedQs: ["How are you handling vector search for the AI tutoring feature?", "What's the production timeline after beta?", "How are you thinking about the vector DB long-term?"]
    },

    outcomes: []
  },

  // ─── C-TIER ────────────────────────────────────────────────────────────────
  {
    id: 'p7',
    name: 'Ryan Mitchell',
    title: 'Tech Lead',
    company: 'Pixel & Co',
    industry: 'agency',
    phone: '+1 (503) 555-0334',
    linkedinUrl: 'linkedin.com/in/ryanmitchell-pixelco',
    icpTier: 'C',
    status: 'not-started',
    priorityScore: 28,
    daysSinceContact: 0,
    suggestedProofPointId: 'saas-multitenancy',

    whyNow: ['Client projects requiring real-time data', 'Team growing from 5 to 12 engineers', 'Evaluating new tech stack for next year'],
    techStack: ['MySQL', 'PHP', 'Node.js', 'AWS'],
    recentNews: ['Pixel & Co wins enterprise client contract', 'Team expansion announced'],
    companySnapshot: 'Pixel & Co is a 40-person digital agency going through a tech stack modernization. Their new enterprise contract requires real-time data capabilities they don\'t currently have. Lower priority — smaller scale and longer sales cycle.',

    styleEmails: {
      'my-style': [
        { day: 1, subject: "Pixel & Co's enterprise contract and real-time data", body: `Ryan,\n\nCongratulations on the enterprise contract win. Real-time data requirements from enterprise clients are usually the trigger that makes teams reconsider their MySQL + PHP stack.\n\nMongoDB is used by a lot of agencies making this exact transition. Worth a quick 15-minute conversation to see if it's relevant to what you're building?\n\nJayson` },
        { day: 3, subject: 'Following up', body: `Ryan,\n\nQuick follow-up on the stack modernization. 15 minutes whenever works.\n\nJayson` },
        { day: 7, subject: 'One more', body: `Ryan,\n\nStill think there's a relevant conversation here. 15 minutes?\n\nJayson` },
        { day: 14, subject: 'Last note', body: `Ryan,\n\nLeaving the door open.\n\nJayson` }
      ],
      'value-sniper': [
        { day: 1, subject: 'Real-time data for agencies — what we see', body: `Ryan,\n\nMost agencies that win enterprise contracts discover their MySQL stack can't handle the real-time requirements that come with them. We've helped several make the transition without disrupting active projects.\n\n15 minutes?\n\nJayson` },
        { day: 3, subject: 'Stack modernization timing', body: `Ryan,\n\nStill think the real-time data conversation is worth having before the enterprise project kicks off. 15 minutes?\n\nJayson` },
        { day: 7, subject: 'One more', body: `Ryan,\n\n15 minutes whenever.\n\nJayson` },
        { day: 14, subject: 'Last note', body: `Ryan,\n\nDoor's open.\n\nJayson` }
      ],
      'voss': [
        { day: 1, subject: "You're probably not thinking about databases right now", body: `Ryan,\n\nYou're probably thinking: we just won a big contract, the last thing I want is an infrastructure conversation.\n\nFair. But it sounds like the enterprise client's real-time requirements are going to surface the stack limitations pretty quickly.\n\nWorth 15 minutes to get ahead of it?\n\nJayson` },
        { day: 3, subject: 'Still curious', body: `Ryan,\n\nIt sounds like you're heads-down on the enterprise project kickoff. Makes sense.\n\nWhen there's a window — 15 minutes?\n\nJayson` },
        { day: 7, subject: 'One specific thing', body: `Ryan,\n\nHappy to share what we've seen with agencies making this transition. 15 minutes?\n\nJayson` },
        { day: 14, subject: 'Last note', body: `Ryan,\n\nLeaving the door open.\n\nJayson` }
      ],
      'challenger': [
        { day: 1, subject: "Most agency enterprise contracts reveal a stack problem in month 2", body: `Ryan,\n\nMost agencies I talk to after winning an enterprise contract discover the same thing in month 2: the real-time requirements can't be met on their current stack.\n\nWorth 15 minutes to see if that applies to Pixel & Co's situation?\n\nJayson` },
        { day: 3, subject: 'The month-2 problem', body: `Ryan,\n\nStill think this is worth 15 minutes before the project kicks off.\n\nJayson` },
        { day: 7, subject: 'One more', body: `Ryan,\n\n15 minutes whenever.\n\nJayson` },
        { day: 14, subject: 'Last note', body: `Ryan,\n\nDoor's open.\n\nJayson` }
      ]
    },

    callScripts: {
      direct: {
        steps: [
          { id: 1, label: 'OPENER', script: "Hey Ryan? This is Jayson from MongoDB — how are you doing?", coachingNote: "C-tier. Be efficient. This is a shorter call." },
          { id: 2, label: 'YES STREAK + ASK', script: "You probably don't recognize my name, but you likely know MongoDB. Do you have 60 seconds? We've helped a few digital agencies handle real-time data requirements for enterprise clients. Given Pixel & Co's recent contract win, worth 15 minutes? How does [DATE 1] look?", ifTheyPushBack: "What about [DATE 2]?", coachingNote: "Compress for C-tier. Get to the ask fast." },
          { id: 3, label: 'CLOSE', script: "Invite coming. Talk to you [DATE 1].", coachingNote: "Clean close." }
        ]
      },
      ea: {
        steps: [
          { id: 1, label: 'REACH + ASK', script: "Hello, this is Jayson from MongoDB. I'd like to be connected to Ryan Mitchell please — it's about Pixel & Co's new enterprise project. I'll hold — thank you.", coachingNote: "Combine steps for efficiency." },
          { id: 2, label: 'CONNECTED + CLOSE', script: "Ryan — Jayson from MongoDB. We've helped agencies handle real-time data for enterprise clients. Given your new contract, worth 15 minutes? [DATE 1]?", ifTheyPushBack: "[DATE 2]?", coachingNote: "Fast." },
          { id: 3, label: 'CLOSE', script: "Invite coming. Talk to you [DATE 1].", coachingNote: "Done." }
        ]
      }
    },

    voicemailScript: "Hey Ryan, Jayson from MongoDB. Congrats on the enterprise contract win. We've helped agencies handle real-time data requirements for enterprise clients. Think it might be relevant. I'll send a note. Talk soon.",
    accusationAudit: "You're probably thinking: we're a small agency, MongoDB is for big companies. Not necessarily — we work with teams at your scale all the time, and the real-time requirements from enterprise clients are the exact trigger that makes MongoDB relevant.",

    linkedin: {
      connectionNote: "Ryan — saw the enterprise contract win at Pixel & Co. I work with MongoDB and we've helped agencies modernize for real-time requirements. Would love to connect.",
      inMail: `Ryan,\n\nCongrats on the enterprise contract. Real-time data requirements from enterprise clients are usually what triggers a stack modernization at agencies like Pixel & Co.\n\nWe've helped a few make that transition. Worth 15 minutes?\n\nJayson`
    },

    objections: [
      { objection: "MongoDB is too expensive for us", technique: 'mirror', techniquePhrase: "Too expensive?", response: "Too expensive — compared to what? MySQL licensing and the engineering time to build real-time capabilities on top of it? Happy to walk through the actual cost comparison." },
      { objection: "We're not ready to change our stack", technique: 'label', techniquePhrase: "It sounds like a stack change feels risky right now.", response: "It sounds like a stack change feels risky right now — especially with the enterprise project starting. I agree. I'm not suggesting a full migration. I'm suggesting 15 minutes to understand if there's a low-lift path for the real-time piece specifically." }
    ],

    discoveryQuestions: [
      "What are the real-time requirements in the enterprise contract specifically?",
      "Are you using MySQL for all your client projects or just internal tools?",
      "When you say stack modernization — is that for this project or for the whole agency?"
    ],

    meetingPrep: {
      brief: "Ryan is a Tech Lead at a growing digital agency that just won an enterprise contract with real-time requirements. He's evaluating a stack modernization. Lower priority but worth qualifying — agency wins can lead to wider MongoDB adoption across their client base.",
      suggestedQs: ["What are the real-time requirements in the enterprise contract?", "Are you evaluating MongoDB specifically or looking at options broadly?"]
    },

    outcomes: []
  },

  // ─── C-TIER #2 ─────────────────────────────────────────────────────────────
  {
    id: 'p8',
    name: 'Linda Park',
    title: 'IT Director',
    company: 'NorthMart',
    industry: 'retail',
    phone: '+1 (651) 555-0419',
    linkedinUrl: 'linkedin.com/in/lindapark-northmart',
    icpTier: 'C',
    status: 'not-started',
    priorityScore: 22,
    daysSinceContact: 0,
    suggestedProofPointId: 'ecommerce-catalog',

    whyNow: ['E-commerce replatform project started', 'Legacy Oracle costs rising', 'New IT budget approved for modernization'],
    techStack: ['Oracle', 'Java', 'On-premises servers'],
    recentNews: ['NorthMart announces e-commerce replatform', 'IT modernization initiative announced'],
    companySnapshot: 'NorthMart is a regional retail chain (200 stores) beginning an e-commerce replatform. Legacy Oracle on-prem. Long sales cycle, but the e-commerce replatform is a real trigger. Lower priority — IT Director, not Engineering.',

    styleEmails: {
      'my-style': [
        { day: 1, subject: "NorthMart's e-commerce replatform and the database decision", body: `Linda,\n\nThe e-commerce replatform at NorthMart is the kind of project where the database decision either accelerates or complicates everything downstream.\n\nMongoDB is working with retailers making this transition to:\n• Scale to hundreds of millions of product SKUs with sub-50ms search\n• Cut Oracle licensing costs significantly by moving catalog and inventory to a modern stack\n\nWorth 15 minutes to see what other retailers have done at your stage?\n\nJayson` },
        { day: 3, subject: 'Following up on the replatform', body: `Linda,\n\nQuick follow-up. Given the replatform timeline, happy to work around your schedule.\n\nJayson` },
        { day: 7, subject: 'What a Fortune 500 retailer did in this exact situation', body: `Linda,\n\nWe helped a Fortune 500 retailer cut Oracle costs significantly and scale to 500M SKUs. Their replatform started exactly like NorthMart's.\n\n15 minutes?\n\nJayson` },
        { day: 14, subject: 'Last note', body: `Linda,\n\nLeaving the door open.\n\nJayson` }
      ],
      'value-sniper': [
        { day: 1, subject: 'Retailers are cutting Oracle costs on replatform — here\'s how', body: `Linda,\n\nMost retailers we work with cut Oracle licensing costs significantly when they replatform their e-commerce stack. NorthMart's replatform is exactly the right moment to evaluate this.\n\n15 minutes?\n\nJayson` },
        { day: 3, subject: 'Oracle costs on the replatform', body: `Linda,\n\nStill think the Oracle cost conversation is worth having before the replatform architecture is finalized. 15 minutes?\n\nJayson` },
        { day: 7, subject: 'One more', body: `Linda,\n\n15 minutes whenever works.\n\nJayson` },
        { day: 14, subject: 'Last note', body: `Linda,\n\nDoor's open.\n\nJayson` }
      ],
      'voss': [
        { day: 1, subject: "You're probably thinking the database decision is already made", body: `Linda,\n\nYou're probably thinking: the replatform architecture is already being scoped, and changing the database is the last thing we want to add to the project.\n\nFair. But it sounds like Oracle costs are going to be a significant line item on the replatform budget.\n\nIs that accurate? Worth 15 minutes before the architecture is locked?\n\nJayson` },
        { day: 3, subject: 'Still curious about the replatform', body: `Linda,\n\nIt sounds like the replatform is consuming most of your bandwidth. Makes sense.\n\nWhen there's a window — 15 minutes to talk database options?\n\nJayson` },
        { day: 7, subject: 'One specific thing', body: `Linda,\n\nWe helped a Fortune 500 retailer on their replatform cut Oracle costs and scale to 500M SKUs. Worth 15 minutes?\n\nJayson` },
        { day: 14, subject: 'Last note', body: `Linda,\n\nLeaving the door open.\n\nJayson` }
      ],
      'challenger': [
        { day: 1, subject: "Most retail replatforms pick the wrong database in week 1", body: `Linda,\n\nMost retailers I talk to make the database decision in the first two weeks of a replatform — and it's almost always based on what IT already knows, not what the e-commerce workload actually needs.\n\nI'd like to challenge that assumption in 15 minutes before it's locked in.\n\nWorth it?\n\nJayson` },
        { day: 3, subject: 'The week-1 decision', body: `Linda,\n\nStill think this is worth 15 minutes before the architecture is finalized.\n\nJayson` },
        { day: 7, subject: 'One more', body: `Linda,\n\n15 minutes whenever.\n\nJayson` },
        { day: 14, subject: 'Last note', body: `Linda,\n\nDoor's open.\n\nJayson` }
      ]
    },

    callScripts: {
      direct: {
        steps: [
          { id: 1, label: 'OPENER', script: "Hey Linda? This is Jayson from MongoDB — how are you doing?", coachingNote: "IT Director, not Engineering. Frame in cost and project risk terms." },
          { id: 2, label: 'YES STREAK + ASK', script: "You probably don't recognize my name, but you likely know MongoDB. Do you have 60 seconds? We've helped several retailers reduce Oracle costs significantly on their e-commerce replatforms. Given NorthMart's replatform project, worth 15 minutes? How does [DATE 1] look?", ifTheyPushBack: "What about [DATE 2]?", coachingNote: "Lead with Oracle cost reduction — that's the IT Director's language." },
          { id: 3, label: 'CLOSE', script: "Invite coming. Talk to you [DATE 1].", coachingNote: "Clean." }
        ]
      },
      ea: {
        steps: [
          { id: 1, label: 'REACH + ASK', script: "Hello, this is Jayson from MongoDB. I'd like to be connected to Linda Park please — it's regarding NorthMart's replatform project. I'll hold — thank you.", coachingNote: "Brief and specific." },
          { id: 2, label: 'CONNECTED + CLOSE', script: "Linda — Jayson from MongoDB. We've helped retailers cut Oracle costs on their replatform. Given NorthMart's project, worth 15 minutes? [DATE 1]?", ifTheyPushBack: "[DATE 2]?", coachingNote: "Fast." },
          { id: 3, label: 'CLOSE', script: "Invite coming. Talk to you [DATE 1].", coachingNote: "Done." }
        ]
      }
    },

    voicemailScript: "Hey Linda, Jayson from MongoDB. We've helped retailers reduce Oracle costs significantly on their e-commerce replatform. Given NorthMart's project, think it's worth 15 minutes. I'll send a note. Talk soon.",
    accusationAudit: "You're probably thinking: we have an existing Oracle relationship and a replatform plan already in motion. Changing the database mid-project sounds like a nightmare. I hear that — I'm not suggesting a mid-project change. I'm suggesting 15 minutes to see if there's a lower-cost path for the new e-commerce components specifically.",

    linkedin: {
      connectionNote: "Linda — saw NorthMart's e-commerce replatform announcement. I work with MongoDB and we've helped retailers modernize their database stack on replatforms. Would love to connect.",
      inMail: `Linda,\n\nNorthMart's e-commerce replatform is exactly the kind of project where the database decision matters a lot for the long-term cost structure.\n\nWe've helped retailers cut Oracle costs significantly and scale to hundreds of millions of SKUs. Worth 15 minutes?\n\nJayson`
    },

    objections: [
      { objection: "We're committed to Oracle", technique: 'mirror', techniquePhrase: "Committed to Oracle?", response: "Committed to Oracle — even for the new e-commerce stack being built on the replatform? Most retailers keep Oracle for the ERP and use a modern database for the e-commerce layer specifically. Happy to show you what that looks like." },
      { objection: "We're early in the replatform, not ready for vendor conversations", technique: 'label', techniquePhrase: "It sounds like you're in early scoping and don't want to add complexity.", response: "It sounds like you're in early scoping and don't want to add complexity — totally fair. The reason I'd argue for a 15-minute conversation now is that early is exactly when the database decision is easiest to get right. Once it's locked in, changing it is 10x harder." }
    ],

    discoveryQuestions: [
      "What's the replatform timeline — phased rollout or big bang?",
      "Is the e-commerce layer being built net-new or migrating from an existing Oracle schema?",
      "What's driving the modernization — cost, performance, or both?",
      "Who's the system integrator on the replatform project?"
    ],

    meetingPrep: {
      brief: "Linda is IT Director at NorthMart, a 200-store regional retailer beginning an e-commerce replatform. Oracle on-prem, long sales cycle. The replatform is the trigger but she's an IT Director (not Engineering), so frame everything in cost reduction and project risk terms.",
      suggestedQs: ["What's driving the replatform timeline?", "Who's the SI on the project?", "Is Oracle staying for ERP or being evaluated for replacement too?"]
    },

    outcomes: []
  }
]
