import type { ProofPoint } from './types'

export const defaultProofPoints: ProofPoint[] = [
  {
    id: 'fintech-payments',
    title: 'Digital Payments Scale',
    industry: 'fintech',
    stat: 'reduced platform complexity costs by 30% and cut $200K+ in annual infrastructure spend',
    customerName: 'a leading digital payments company',
    project: 'real-time transaction processing platform',
  },
  {
    id: 'healthtech-records',
    title: 'Healthcare Data Platform',
    industry: 'healthtech',
    stat: 'cut query latency from 4 seconds to under 80ms and unified 12 disparate data sources',
    customerName: 'a top-10 US health system',
    project: 'patient records and clinical data platform',
  },
  {
    id: 'ecommerce-catalog',
    title: 'E-commerce Product Catalog',
    industry: 'ecommerce',
    stat: 'scaled to 500M product SKUs with sub-50ms search and saved $1.2M in re-platforming costs',
    customerName: 'a Fortune 500 retailer',
    project: 'product catalog and personalization engine',
  },
  {
    id: 'saas-multitenancy',
    title: 'SaaS Multi-Tenancy',
    industry: 'saas',
    stat: 'onboarded 3x more enterprise tenants without infrastructure changes and cut time-to-provision from 2 weeks to 4 hours',
    customerName: 'a high-growth B2B SaaS company',
    project: 'multi-tenant data architecture',
  },
  {
    id: 'ai-vector',
    title: 'GenAI & Vector Search',
    industry: 'ai',
    stat: 'reduced AI infrastructure costs by 40% by eliminating a separate vector database and unifying operational + vector data',
    customerName: 'a Series B AI platform company',
    project: 'agentic AI and RAG pipeline',
  },
  {
    id: 'logistics-tracking',
    title: 'Supply Chain & Logistics',
    industry: 'logistics',
    stat: 'achieved 99.99% uptime across 200M daily tracking events and cut operational costs by 25%',
    customerName: 'a global logistics provider',
    project: 'real-time shipment tracking platform',
  },
]
