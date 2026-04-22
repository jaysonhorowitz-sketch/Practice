export type IcpTier = 'A' | 'B' | 'C'
export type ProspectStatus = 'not-started' | 'emailed' | 'called' | 'meeting-booked'
export type VossTechnique = 'mirror' | 'label' | 'accusation-audit'
export type OutreachStyle = 'my-style' | 'value-sniper' | 'voss' | 'challenger'

export interface Email {
  day: 1 | 3 | 7 | 14
  subject: string
  body: string
}

export interface CallStep {
  id: number
  label: string
  script: string
  ifTheyPushBack?: string
  coachingNote?: string
}

export interface CallScript {
  steps: CallStep[]
}

export interface Objection {
  objection: string
  response: string
  technique: VossTechnique
  techniquePhrase: string
}

export interface StyleEmails {
  'my-style': Email[]
  'value-sniper': Email[]
  'voss': Email[]
  'challenger': Email[]
}

export interface Prospect {
  id: string
  name: string
  title: string
  company: string
  industry: string
  phone?: string
  linkedinUrl?: string
  icpTier: IcpTier
  status: ProspectStatus
  priorityScore: number
  lastContactDate?: string
  daysSinceContact: number

  // Research signals
  whyNow: string[]
  techStack: string[]
  recentNews: string[]
  companySnapshot: string
  suggestedProofPointId: string

  // Content
  styleEmails: StyleEmails
  callScripts: { direct: CallScript; ea: CallScript }
  voicemailScript: string
  accusationAudit: string
  linkedin: { connectionNote: string; inMail: string }
  objections: Objection[]
  discoveryQuestions: string[]
  meetingPrep: { brief: string; suggestedQs: string[] }

  // Adaptive tracking
  outcomes: { date: string; type: 'emailed' | 'called' | 'replied' | 'meeting'; style?: OutreachStyle }[]
}

export interface ProofPoint {
  id: string
  title: string
  industry: string
  stat: string
  customerName: string
  project: string
}

export type LetterGrade = 'A+' | 'A' | 'A-' | 'B+' | 'B' | 'B-' | 'C+' | 'C' | 'C-' | 'D' | 'F'

export interface CallSubScore {
  label: string
  grade: LetterGrade
  score: number
  notes: string
  evidence?: string
}

export interface CallCategoryScore {
  grade: LetterGrade
  score: number
  verdict: string
  details: string
  evidence: string[]
  improvements: string[]
  subScores: CallSubScore[]
}

export interface CallAnalysis {
  id: string
  prospectId: string
  prospectName: string
  company: string
  date: string
  durationEstimate: string
  callType: 'direct' | 'ea' | 'unknown'
  transcriptSnippet: string
  overallGrade: LetterGrade
  overallScore: number
  topWin: string
  topMiss: string
  scores: {
    voss: CallCategoryScore
    commandOfMessage: CallCategoryScore
    scriptAdherence: CallCategoryScore
    objectionHandling: CallCategoryScore
  }
  suggestedNextAction: {
    action: string
    timing: string
    angle: string
    draftSubject?: string
  }
  rawTranscript: string
}

export interface Settings {
  sdrName: string
  sdrTitle: string
  availableSlots: [string, string]
  defaultStyle: OutreachStyle
  proofPoints: ProofPoint[]
  styleWins: Record<OutreachStyle, number>
}
