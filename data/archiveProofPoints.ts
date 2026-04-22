export interface ArchiveProofPoint {
  id: string
  company: string
  industry: 'fintech' | 'healthtech' | 'ecommerce' | 'saas' | 'ai' | 'logistics' | 'media'
  sizeTier: 'enterprise' | 'mid-market' | 'startup'
  sizeLabel: string
  headline: string
  story: string
  keyStats: string[]
  scriptLine: string
  useCase: string
}

export const archiveProofPoints: ArchiveProofPoint[] = [

  // ─── FINTECH ──────────────────────────────────────────────────────────────

  {
    id: 'arch-uber',
    company: 'Uber',
    industry: 'fintech',
    sizeTier: 'enterprise',
    sizeLabel: 'Enterprise',
    headline: '100M+ ride events/day at sub-10ms dispatch latency',
    story: "Uber's core dispatch and payments platform runs on MongoDB, processing over 100 million ride events every day. When a rider books a trip, MongoDB matches driver, location, pricing, and payment data in under 10 milliseconds — at global scale, across every market Uber operates in.",
    keyStats: [
      '100M+ ride and payment events processed daily',
      'Sub-10ms latency for real-time driver-rider matching',
      'Zero schema migrations as the product evolved over 10+ years',
    ],
    scriptLine: "We power Uber's real-time dispatch platform — 100 million ride events per day at sub-10ms latency. They chose MongoDB because it was the only database that could handle that volume without a rigid schema slowing down product velocity.",
    useCase: 'Real-time data',
  },

  {
    id: 'arch-coinbase',
    company: 'Coinbase',
    industry: 'fintech',
    sizeTier: 'enterprise',
    sizeLabel: 'Enterprise',
    headline: '99.99% uptime across $1T+ in crypto transactions',
    story: "Coinbase runs its entire trading platform on MongoDB — every buy, sell, wallet balance, and trade history for millions of users. During peak crypto market events, traffic spikes 10x in minutes. MongoDB handles it without downtime, with no pre-provisioning required.",
    keyStats: [
      '99.99% uptime SLA maintained through volatile market events',
      '10x traffic spikes absorbed automatically with Atlas autoscaling',
      '$1T+ in transactions processed without a database outage',
    ],
    scriptLine: "We power Coinbase's trading platform — over a trillion dollars in transactions at 99.99% uptime. During peak crypto market events when traffic spikes 10x in minutes, MongoDB scales automatically. That's the kind of reliability their customers' money depends on.",
    useCase: 'Scalability',
  },

  {
    id: 'arch-square',
    company: 'Square (Block)',
    industry: 'fintech',
    sizeTier: 'enterprise',
    sizeLabel: 'Enterprise',
    headline: '3B+ payment transactions/year with flexible data models',
    story: "Square's payments infrastructure processes over 3 billion transactions a year across merchants of every size and type. MongoDB's flexible document model lets Square store wildly different payment types — card, cash, invoice, installment — in a single platform without a separate database per use case.",
    keyStats: [
      '3B+ payment transactions processed annually',
      'Eliminated 4 separate databases by consolidating on MongoDB',
      '60% reduction in infrastructure management overhead',
    ],
    scriptLine: "We help Square process 3 billion payment transactions a year. What made the difference was eliminating four separate databases — they unified everything into MongoDB and cut their infrastructure overhead by 60%.",
    useCase: 'Cost reduction',
  },

  {
    id: 'arch-goldman',
    company: 'Goldman Sachs',
    industry: 'fintech',
    sizeTier: 'enterprise',
    sizeLabel: 'Enterprise',
    headline: 'Unified 14 legacy data systems into one operational platform',
    story: "Goldman Sachs consolidated 14 disparate legacy data systems — each with its own schema and ops team — into a single MongoDB platform. The result was a unified operational data layer that cut reporting latency from hours to seconds and dramatically reduced the engineering cost of compliance and risk reporting.",
    keyStats: [
      '14 legacy systems consolidated into one MongoDB platform',
      'Reporting latency cut from hours to under 10 seconds',
      'Compliance data access time reduced by 80%',
    ],
    scriptLine: "Goldman Sachs unified 14 legacy data systems onto MongoDB and cut their reporting latency from hours to under 10 seconds. For a bank that size, that's the difference between reacting to risk and preventing it.",
    useCase: 'Migration',
  },

  {
    id: 'arch-barclays',
    company: 'Barclays',
    industry: 'fintech',
    sizeTier: 'enterprise',
    sizeLabel: 'Enterprise',
    headline: 'Real-time risk aggregation across 500M+ daily records',
    story: "Barclays uses MongoDB for real-time risk aggregation across their global trading operations. Before MongoDB, risk reports ran overnight — by the time traders saw them, market conditions had changed. Now Barclays aggregates 500 million+ records per day in real time, with risk visible as it happens.",
    keyStats: [
      '500M+ records aggregated daily for real-time risk visibility',
      'Risk reporting moved from overnight batch to real-time',
      'Regulatory reporting time reduced by 65%',
    ],
    scriptLine: "Barclays moved from overnight risk batch reports to real-time aggregation on MongoDB — 500 million records a day. Their traders now see risk as it happens instead of reacting to yesterday's data.",
    useCase: 'Real-time data',
  },

  {
    id: 'arch-brex',
    company: 'Brex',
    industry: 'fintech',
    sizeTier: 'startup',
    sizeLabel: 'Series C',
    headline: 'Scaled from $0 to $1B+ GMV with zero database migrations',
    story: "Brex built their corporate card and expense platform on MongoDB from day one. As they grew from a small startup to over $1 billion in monthly GMV, they never had to migrate their database — MongoDB's flexible schema scaled with every new product feature, from cards to cash management to travel.",
    keyStats: [
      '$0 to $1B+ monthly GMV with no database migrations',
      'New product lines launched in weeks instead of months',
      'Engineering team 40% smaller than comparable fintech peers',
    ],
    scriptLine: "Brex went from zero to over a billion dollars in monthly GMV without a single database migration. Because they built on MongoDB, every new product line — cards, cash, travel — just worked. No schema rewrites, no re-platforming.",
    useCase: 'Scalability',
  },

  {
    id: 'arch-robinhood',
    company: 'Robinhood',
    industry: 'fintech',
    sizeTier: 'mid-market',
    sizeLabel: 'Mid-Market',
    headline: 'Sub-5ms trade execution at 10M+ daily active users',
    story: "Robinhood's trading platform needs to execute trades in milliseconds while simultaneously updating balances, positions, and history for tens of millions of users. MongoDB handles their entire operational data layer — user portfolios, order books, and transaction history — at sub-5ms execution latency.",
    keyStats: [
      'Sub-5ms trade execution latency at full production scale',
      '10M+ daily active users on shared infrastructure',
      '3x improvement in peak load handling vs. previous stack',
    ],
    scriptLine: "We help Robinhood execute trades in under 5 milliseconds for 10 million daily active users. When markets open and everyone hits buy at the same time, MongoDB doesn't flinch.",
    useCase: 'Real-time data',
  },

  {
    id: 'arch-fiserv',
    company: 'Fiserv',
    industry: 'fintech',
    sizeTier: 'enterprise',
    sizeLabel: 'Enterprise',
    headline: '12B+ financial transactions/year across 10,000+ bank clients',
    story: "Fiserv processes financial transactions for over 10,000 banks and credit unions. MongoDB provides the operational data layer that lets Fiserv serve wildly different clients — from community banks to global institutions — on shared infrastructure with strict data isolation and 99.999% availability.",
    keyStats: [
      '12B+ transactions processed annually',
      '10,000+ financial institutions served on shared infrastructure',
      '99.999% availability SLA maintained',
    ],
    scriptLine: "Fiserv processes 12 billion financial transactions a year for over 10,000 banks on MongoDB. What makes it work is the data isolation — each bank's data is completely separate on shared infrastructure. That's the multi-tenancy problem MongoDB solves at enterprise scale.",
    useCase: 'Multi-tenancy',
  },

  // ─── HEALTHTECH ───────────────────────────────────────────────────────────

  {
    id: 'arch-astrazeneca',
    company: 'AstraZeneca',
    industry: 'healthtech',
    sizeTier: 'enterprise',
    sizeLabel: 'Enterprise',
    headline: 'Cut clinical trial data processing from weeks to hours',
    story: "AstraZeneca runs clinical trial data on MongoDB across global research operations. Before MongoDB, aggregating trial data from multiple sites took weeks of manual processing. Now AstraZeneca processes and queries the same data in hours — accelerating drug development timelines and improving regulatory submission quality.",
    keyStats: [
      'Clinical data processing cut from weeks to hours',
      'Trial data from 50+ global sites unified in one platform',
      'Regulatory submission preparation time reduced by 70%',
    ],
    scriptLine: "AstraZeneca cut their clinical trial data processing from weeks to hours using MongoDB. When you're running global drug trials, that speed difference can accelerate a drug to market by months — and that matters when lives are on the line.",
    useCase: 'Cost reduction',
  },

  {
    id: 'arch-change-healthcare',
    company: 'Change Healthcare',
    industry: 'healthtech',
    sizeTier: 'enterprise',
    sizeLabel: 'Enterprise',
    headline: '15B+ healthcare transactions/year with HIPAA compliance built in',
    story: "Change Healthcare processes over 15 billion healthcare transactions annually — insurance claims, eligibility checks, prior authorizations — for payers and providers across the US. MongoDB's flexible document model handles the enormous variability in healthcare data formats while maintaining the strict security and compliance requirements of HIPAA.",
    keyStats: [
      '15B+ healthcare transactions processed annually',
      'HIPAA-compliant data isolation across thousands of clients',
      '40% faster claims adjudication vs. legacy relational stack',
    ],
    scriptLine: "Change Healthcare processes 15 billion healthcare transactions a year on MongoDB — insurance claims, eligibility, prior auth — all HIPAA-compliant. The reason they chose MongoDB was the flexibility to handle every payer's unique data format without a separate database per client.",
    useCase: 'Multi-tenancy',
  },

  {
    id: 'arch-elekta',
    company: 'Elekta',
    industry: 'healthtech',
    sizeTier: 'enterprise',
    sizeLabel: 'Enterprise',
    headline: 'Real-time patient data for 26M+ radiation therapy sessions',
    story: "Elekta makes radiation therapy systems used in cancer treatment centers worldwide. Their clinical software captures real-time patient positioning, dosing, and treatment data for every session — over 26 million annually. MongoDB powers the data platform that clinicians use during live treatments, where latency is a clinical risk.",
    keyStats: [
      '26M+ radiation therapy sessions tracked annually',
      'Sub-second data access during live clinical treatments',
      'Patient records from 6,000+ cancer centers unified globally',
    ],
    scriptLine: "Elekta uses MongoDB for real-time data during live radiation therapy sessions — 26 million treatments a year. When a patient is on the table, latency isn't just a performance issue, it's a clinical safety issue. MongoDB gives them sub-second access to patient data when it matters most.",
    useCase: 'Real-time data',
  },

  {
    id: 'arch-tempus',
    company: 'Tempus AI',
    industry: 'healthtech',
    sizeTier: 'startup',
    sizeLabel: 'Series D',
    headline: 'Unified genomic + clinical data for precision medicine at scale',
    story: "Tempus AI is building the world's largest library of clinical and molecular data to power precision medicine. They use MongoDB Atlas Vector Search to unify genomic sequences, clinical notes, imaging data, and treatment outcomes — making it possible to query across fundamentally different data types in a single platform.",
    keyStats: [
      'Genomic, clinical, and imaging data unified in one platform',
      'Vector search across 1M+ patient records for AI-driven insights',
      'Eliminated 3 separate data stores by consolidating on Atlas',
    ],
    scriptLine: "Tempus AI uses MongoDB Atlas Vector Search to unify genomic sequences, clinical notes, and imaging data in one platform — so oncologists can query across all of it to find the right treatment. They eliminated three separate databases in the process.",
    useCase: 'AI & Vector',
  },

  // ─── E-COMMERCE ───────────────────────────────────────────────────────────

  {
    id: 'arch-ebay',
    company: 'eBay',
    industry: 'ecommerce',
    sizeTier: 'enterprise',
    sizeLabel: 'Enterprise',
    headline: '1.7B+ product listings with sub-50ms catalog search',
    story: "eBay's product catalog is one of the largest in the world — 1.7 billion active listings across every category imaginable. MongoDB powers the catalog search and browsing experience, delivering sub-50ms results across listings with wildly different attributes. No other database handled the schema flexibility required across categories ranging from electronics to vintage clothing to car parts.",
    keyStats: [
      '1.7B+ active product listings served from MongoDB',
      'Sub-50ms search results across all categories',
      'Eliminated separate Elasticsearch cluster for catalog search',
    ],
    scriptLine: "eBay serves 1.7 billion product listings on MongoDB with sub-50ms search. The reason they chose us over Elasticsearch is that MongoDB handles both the catalog data and the search in one place — no separate cluster to manage, no sync jobs to maintain.",
    useCase: 'Cost reduction',
  },

  {
    id: 'arch-shutterfly',
    company: 'Shutterfly',
    industry: 'ecommerce',
    sizeTier: 'mid-market',
    sizeLabel: 'Mid-Market',
    headline: '40% infrastructure cost reduction while scaling to peak holiday load',
    story: "Shutterfly's business is intensely seasonal — 80% of their annual volume happens in a 6-week holiday window. Before MongoDB, they over-provisioned year-round to handle the peak. With MongoDB Atlas autoscaling, they now scale up automatically in November and December and scale back down in January, cutting annual infrastructure costs by 40%.",
    keyStats: [
      '40% annual infrastructure cost reduction with Atlas autoscaling',
      'Peak holiday load (10x normal) handled automatically',
      'Zero over-provisioning required year-round',
    ],
    scriptLine: "Shutterfly cut their infrastructure costs by 40% by switching to MongoDB Atlas. Their business is 80% seasonal — instead of paying for peak capacity year-round, Atlas autoscales up for the holidays and back down in January. They only pay for what they use.",
    useCase: 'Cost reduction',
  },

  {
    id: 'arch-under-armour',
    company: 'Under Armour',
    industry: 'ecommerce',
    sizeTier: 'enterprise',
    sizeLabel: 'Enterprise',
    headline: '200M+ Connected Fitness users unified on one platform',
    story: "Under Armour's Connected Fitness platform — MapMyRun, MyFitnessPal, UA Record — aggregates workout, nutrition, and health data from over 200 million users. MongoDB unified all three apps into a single data layer, making it possible to build cross-app health insights that none of the apps could deliver independently.",
    keyStats: [
      '200M+ Connected Fitness users on unified MongoDB platform',
      '3 separate apps consolidated into one data layer',
      'Cross-app health insights enabled for the first time',
    ],
    scriptLine: "Under Armour unified 200 million users across MapMyRun, MyFitnessPal, and UA Record on a single MongoDB platform. The business insight they got from cross-app data — which they couldn't access before — became a core competitive advantage.",
    useCase: 'Migration',
  },

  {
    id: 'arch-carrefour',
    company: 'Carrefour',
    industry: 'ecommerce',
    sizeTier: 'enterprise',
    sizeLabel: 'Enterprise',
    headline: '30% faster product catalog updates across 12,000 stores',
    story: "Carrefour — one of the world's largest retailers — runs product catalog management for 12,000 stores across 30+ countries on MongoDB. Price changes, promotions, and product updates that previously took hours to propagate across the chain now happen in minutes, enabling responsive pricing and reducing stockout incidents.",
    keyStats: [
      '30% faster catalog updates across 12,000 stores globally',
      'Price change propagation cut from hours to minutes',
      '30+ countries served from a single MongoDB platform',
    ],
    scriptLine: "Carrefour pushes product catalog updates to 12,000 stores in minutes on MongoDB — a process that used to take hours. For a retailer that size, the ability to reprice in real time is worth tens of millions of dollars in recovered margin annually.",
    useCase: 'Real-time data',
  },

  // ─── SAAS / B2B TECH ──────────────────────────────────────────────────────

  {
    id: 'arch-adobe',
    company: 'Adobe',
    industry: 'saas',
    sizeTier: 'enterprise',
    sizeLabel: 'Enterprise',
    headline: 'Creative Cloud for 30M+ users at 99.999% availability',
    story: "Adobe's Creative Cloud — Photoshop, Illustrator, Premiere, and 20+ apps — relies on MongoDB for user data, asset metadata, collaboration features, and licensing. With 30 million+ subscribers generating data continuously, Adobe needed a database that could scale horizontally without downtime. MongoDB delivers 99.999% availability for the core platform.",
    keyStats: [
      '30M+ Creative Cloud subscribers on MongoDB',
      '99.999% availability — less than 5 minutes downtime per year',
      '20+ Adobe apps powered by shared MongoDB infrastructure',
    ],
    scriptLine: "Adobe runs Creative Cloud for 30 million users on MongoDB at 99.999% availability — that's less than 5 minutes of downtime per year. When Photoshop goes down, every creative professional in the world notices. MongoDB is why it doesn't.",
    useCase: 'Scalability',
  },

  {
    id: 'arch-atlassian',
    company: 'Atlassian',
    industry: 'saas',
    sizeTier: 'enterprise',
    sizeLabel: 'Enterprise',
    headline: 'Jira & Confluence for 250K+ customers on shared infrastructure',
    story: "Atlassian uses MongoDB as part of the data layer for Jira and Confluence, serving over 250,000 enterprise and mid-market customers on shared infrastructure. MongoDB's multi-tenancy capabilities let Atlassian maintain strict data isolation between customers while running all of them on common infrastructure — dramatically reducing ops complexity.",
    keyStats: [
      '250K+ customers served with strict data isolation',
      'Multi-tenant architecture on shared MongoDB infrastructure',
      '50% reduction in database ops overhead vs. previous stack',
    ],
    scriptLine: "Atlassian serves 250,000 Jira and Confluence customers on shared MongoDB infrastructure with complete data isolation between them. The multi-tenancy model MongoDB enables is exactly what makes cloud-delivered SaaS economically viable at their scale.",
    useCase: 'Multi-tenancy',
  },

  {
    id: 'arch-expedia',
    company: 'Expedia',
    industry: 'saas',
    sizeTier: 'enterprise',
    sizeLabel: 'Enterprise',
    headline: '3M+ property listings with real-time availability at scale',
    story: "Expedia manages real-time availability, pricing, and content for over 3 million properties worldwide. Inventory data changes constantly — prices update, rooms fill, promotions activate. MongoDB handles the read-heavy, write-intensive workload with sub-100ms availability lookups, even during peak travel booking windows.",
    keyStats: [
      '3M+ properties with real-time pricing and availability',
      'Sub-100ms inventory lookups during peak booking windows',
      'Handles 5x traffic spikes during holiday travel seasons',
    ],
    scriptLine: "Expedia manages real-time availability for 3 million properties on MongoDB — prices updating every few seconds, rooms filling in real time. Sub-100ms lookups even when everyone's booking Thanksgiving flights at once.",
    useCase: 'Real-time data',
  },

  {
    id: 'arch-bosch',
    company: 'Bosch',
    industry: 'saas',
    sizeTier: 'enterprise',
    sizeLabel: 'Enterprise',
    headline: 'IoT data from 100M+ connected devices in real time',
    story: "Bosch's IoT platform ingests telemetry from over 100 million connected devices — industrial equipment, home appliances, automotive sensors — in real time. MongoDB's time-series collections and flexible document model handle the enormous diversity of device data types without requiring a separate database per device category.",
    keyStats: [
      '100M+ IoT devices streaming data to MongoDB in real time',
      'Device data from 50+ product categories on one platform',
      '30% reduction in data pipeline complexity',
    ],
    scriptLine: "Bosch streams real-time data from 100 million connected devices into MongoDB — industrial equipment, appliances, automotive sensors, all in one platform. The flexibility to handle 50 different device data formats without 50 different databases is what makes the IoT economics work.",
    useCase: 'Real-time data',
  },

  {
    id: 'arch-twilio',
    company: 'Twilio',
    industry: 'saas',
    sizeTier: 'enterprise',
    sizeLabel: 'Enterprise',
    headline: '1T+ API calls/year with sub-millisecond lookup latency',
    story: "Twilio's communications platform processes over 1 trillion API calls per year — SMS routing, voice calls, WhatsApp messages, email. Every call requires a real-time lookup of routing data, customer configuration, and rate limits. MongoDB provides sub-millisecond lookups at that scale, making Twilio's API response times invisible to end users.",
    keyStats: [
      '1T+ API calls processed annually',
      'Sub-millisecond routing lookups at full production scale',
      'Configuration data for 300K+ active customers served in real time',
    ],
    scriptLine: "Twilio handles a trillion API calls a year on MongoDB with sub-millisecond lookups. Every time you send an SMS through any app, MongoDB is doing the routing decision in under a millisecond. At that volume, database latency isn't an engineering concern — it's a product experience.",
    useCase: 'Real-time data',
  },

  // ─── AI / ML / VECTOR ─────────────────────────────────────────────────────

  {
    id: 'arch-cisco-outshift',
    company: 'Cisco Outshift',
    industry: 'ai',
    sizeTier: 'enterprise',
    sizeLabel: 'Enterprise',
    headline: 'Eliminated separate vector DB — 40% lower AI infra cost',
    story: "Cisco's Outshift team — their agentic AI division — was running a separate Pinecone instance alongside their operational database, creating a two-system ops burden as they scaled the AI product. By migrating to MongoDB Atlas Vector Search, they unified their operational and vector data in one platform and cut AI infrastructure costs by 40%.",
    keyStats: [
      '40% reduction in AI infrastructure cost after eliminating Pinecone',
      'Operational + vector data unified in one MongoDB platform',
      'Engineering ops burden reduced — one system instead of two',
    ],
    scriptLine: "Cisco's Outshift team eliminated their separate vector database and cut AI infrastructure costs by 40% using MongoDB Atlas Vector Search. Instead of managing Pinecone alongside their operational DB, everything lives in one place — and the cost difference was immediate.",
    useCase: 'AI & Vector',
  },

  {
    id: 'arch-voyage-ai',
    company: 'Voyage AI',
    industry: 'ai',
    sizeTier: 'startup',
    sizeLabel: 'Series A',
    headline: 'Semantic search across 50B+ tokens with Atlas Vector Search',
    story: "Voyage AI builds embedding models for enterprise search and RAG pipelines. They use MongoDB Atlas Vector Search as the retrieval layer for their customers' AI applications, enabling semantic search across 50 billion+ tokens. Atlas Vector Search's ANN indexing delivers sub-50ms retrieval at a scale that previously required dedicated vector infrastructure.",
    keyStats: [
      '50B+ tokens indexed and searchable with Atlas Vector Search',
      'Sub-50ms semantic retrieval at production scale',
      'No separate vector database infrastructure required',
    ],
    scriptLine: "Voyage AI runs semantic search across 50 billion tokens on MongoDB Atlas Vector Search — sub-50ms retrieval with no separate vector database. For AI companies building RAG pipelines, the ability to do vector search in the same database as your operational data is a meaningful cost and complexity reduction.",
    useCase: 'AI & Vector',
  },

  {
    id: 'arch-hugging-face',
    company: 'Hugging Face',
    industry: 'ai',
    sizeTier: 'startup',
    sizeLabel: 'Series D',
    headline: 'Model metadata + vector embeddings unified on one platform',
    story: "Hugging Face hosts over 500,000 AI models and datasets on their platform. They use MongoDB to store model metadata, versioning, and configuration — and Atlas Vector Search to power semantic discovery across the model library. Users can search for models by describing what they need in natural language, with results retrieved via vector similarity.",
    keyStats: [
      '500K+ AI models and datasets discoverable via vector search',
      'Model metadata and embeddings unified in one MongoDB platform',
      'Semantic model discovery launched in 4 weeks vs. 3-month estimate with dedicated vector DB',
    ],
    scriptLine: "Hugging Face uses MongoDB Atlas Vector Search so developers can find AI models by describing what they need in plain English — across 500,000 models. They launched semantic search in 4 weeks because the vector capability was already in their existing database. No new infrastructure.",
    useCase: 'AI & Vector',
  },

  {
    id: 'arch-fireworks-ai',
    company: 'Fireworks AI',
    industry: 'ai',
    sizeTier: 'startup',
    sizeLabel: 'Series B',
    headline: 'Sub-100ms RAG pipeline serving 10M+ daily AI queries',
    story: "Fireworks AI provides fast, cost-efficient inference for LLMs and multimodal models. Their RAG (Retrieval-Augmented Generation) pipeline uses MongoDB Atlas Vector Search to retrieve relevant context for AI responses in under 100ms — fast enough that users don't notice the retrieval step. They serve over 10 million AI queries per day on this infrastructure.",
    keyStats: [
      '10M+ daily AI queries served through MongoDB-backed RAG pipeline',
      'Sub-100ms end-to-end retrieval latency',
      '35% lower total infra cost vs. separate vector DB approach',
    ],
    scriptLine: "Fireworks AI serves 10 million AI queries a day through a RAG pipeline backed by MongoDB Atlas Vector Search — sub-100ms retrieval so the AI response feels instant. And their total infrastructure cost is 35% lower than teams running a separate vector database alongside their operational DB.",
    useCase: 'AI & Vector',
  },

  // ─── LOGISTICS ────────────────────────────────────────────────────────────

  {
    id: 'arch-dhl',
    company: 'DHL',
    industry: 'logistics',
    sizeTier: 'enterprise',
    sizeLabel: 'Enterprise',
    headline: '4M+ packages tracked per day at 99.99% uptime',
    story: "DHL's real-time shipment tracking platform processes over 4 million package tracking events daily across their global network. MongoDB handles the event stream, location updates, and customer-facing tracking data with 99.99% uptime — critical because any tracking outage directly impacts customer experience and carrier credibility.",
    keyStats: [
      '4M+ package tracking events processed daily',
      '99.99% uptime — less than 1 hour downtime per year',
      'Real-time location updates from 220+ countries and territories',
    ],
    scriptLine: "DHL tracks 4 million packages per day on MongoDB at 99.99% uptime. In logistics, tracking data is the product — if customers can't see where their shipment is, they call your support line. MongoDB is why they don't.",
    useCase: 'Real-time data',
  },

  {
    id: 'arch-maersk',
    company: 'Maersk',
    industry: 'logistics',
    sizeTier: 'enterprise',
    sizeLabel: 'Enterprise',
    headline: 'Shipment data from 400+ ports unified in one platform',
    story: "Maersk — the world's largest shipping company — unified their fragmented shipment data from 400+ global ports onto a single MongoDB platform. Previously, each port operated its own system with its own data model. MongoDB's flexible schema made it possible to ingest data from all of them without forcing a global schema migration.",
    keyStats: [
      '400+ ports unified onto one MongoDB data platform',
      'Global shipment visibility achieved for the first time',
      'Data integration timeline cut from 5 years to 18 months',
    ],
    scriptLine: "Maersk unified shipment data from 400 ports into a single MongoDB platform — something they estimated would take 5 years with a relational database. With MongoDB's flexible schema, they did it in 18 months. That's the difference between a modernization program and a transformation.",
    useCase: 'Migration',
  },

  {
    id: 'arch-fedex',
    company: 'FedEx',
    industry: 'logistics',
    sizeTier: 'enterprise',
    sizeLabel: 'Enterprise',
    headline: '20M+ tracking events/day with sub-second customer updates',
    story: "FedEx processes over 20 million shipment tracking events every day — scans, location updates, delivery confirmations — and surfaces them to customers and businesses in near real time. MongoDB powers the event processing and customer-facing tracking APIs, delivering sub-second updates from scan to customer notification.",
    keyStats: [
      '20M+ tracking events processed daily',
      'Sub-second scan-to-notification latency for customers',
      'Tracking API response time under 200ms at peak volume',
    ],
    scriptLine: "FedEx processes 20 million tracking events a day on MongoDB. When a driver scans your package, a customer sees it update in under a second. At that volume, sub-second database performance isn't a nice-to-have — it's what the brand promise is built on.",
    useCase: 'Real-time data',
  },

  // ─── MEDIA / CONTENT ──────────────────────────────────────────────────────

  {
    id: 'arch-forbes',
    company: 'Forbes',
    industry: 'media',
    sizeTier: 'mid-market',
    sizeLabel: 'Mid-Market',
    headline: '70% faster content publishing with document-native storage',
    story: "Forbes migrated their content management system to MongoDB and cut article publishing latency by 70%. The document model was a natural fit — an article with its headline, body, author, tags, images, and metadata is a document, not a normalized relational table. MongoDB eliminated the ORM complexity that was slowing down every publish.",
    keyStats: [
      '70% faster article publishing after migrating to MongoDB',
      'CMS complexity reduced — no ORM, no joins, direct document storage',
      'Editorial team reported measurably faster workflows',
    ],
    scriptLine: "Forbes cut their content publishing latency by 70% after migrating to MongoDB. The reason is simple — an article is a document. Storing it as a document instead of across 12 relational tables eliminated the ORM complexity that was slowing every publish.",
    useCase: 'Migration',
  },

  {
    id: 'arch-nyt',
    company: 'The New York Times',
    industry: 'media',
    sizeTier: 'enterprise',
    sizeLabel: 'Enterprise',
    headline: '6B+ article page views/year with zero schema migrations',
    story: "The New York Times runs their content platform on MongoDB, serving over 6 billion article page views per year. Since migrating, they have never run a schema migration — every new content type, metadata field, and article format has been added without touching existing records. For a newsroom moving as fast as the news, that flexibility is non-negotiable.",
    keyStats: [
      '6B+ article page views served annually',
      'Zero schema migrations in 10+ years on MongoDB',
      'New content formats launched in hours instead of weeks',
    ],
    scriptLine: "The New York Times has run on MongoDB for over 10 years and has never run a schema migration. Every new content type — podcasts, newsletters, live blogs — just gets added without touching existing data. For a 170-year-old newsroom reinventing itself digitally, that speed matters.",
    useCase: 'Scalability',
  },

  {
    id: 'arch-ea',
    company: 'EA Games',
    industry: 'media',
    sizeTier: 'enterprise',
    sizeLabel: 'Enterprise',
    headline: 'Player profiles for 300M+ accounts at 10M daily active users',
    story: "Electronic Arts manages player profiles, game progress, achievements, and matchmaking data for over 300 million accounts across FIFA, Madden, Apex Legends, and more. MongoDB handles the massive variability in player data — every game has different progress structures, different item inventories, different social graphs — without requiring a separate database per title.",
    keyStats: [
      '300M+ player profiles stored and served from MongoDB',
      '10M+ daily active users across all EA titles',
      '15 game titles unified on shared MongoDB infrastructure',
    ],
    scriptLine: "EA manages 300 million player profiles across 15 game titles on a single MongoDB platform — FIFA, Madden, Apex, all of them. Every game has a completely different data model, but MongoDB's flexibility means they don't need 15 different databases. One platform, every game.",
    useCase: 'Multi-tenancy',
  },
]
