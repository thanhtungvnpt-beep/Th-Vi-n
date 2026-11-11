export type UserRole =
  | 'admin'
  | 'knowledge_manager'
  | 'technical_expert'
  | 'technician'
  | 'viewer';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  roleTitle: string;
  vendor: string;
  avatar: string;
  points: number;
  monthlyPoints: number;
  level: string;
  levelProgress: number;
  levelTarget: number;
  contributionsCount: {
    documents: number;
    incidents: number;
    improvements: number;
    community: number;
  };
}

export interface IncidentItem {
  id: string;
  title: string;
  code: string;
  machineId: string;
  vendor: string;
  model: string;
  status: 'confirmed' | 'pending' | 'supplement' | 'rejected';
  statusText: string;
  likes: number;
  commentsCount: number;
  thumbnail: string;
  updatedAt: string;
  views: number;
  category: 'edm' | 'cnc' | 'robot' | 'auxiliary';
  phenomenon: string[];
  rootCauses: string[];
  steps: {
    number: number | string;
    isSuccess?: boolean;
    title: string;
    image: string;
  }[];
  author: {
    name: string;
    role: string;
    avatar: string;
    postDate: string;
    confirmDate: string;
    confirmedBy: string;
  };
  documents: {
    id: string;
    name: string;
    type: 'pdf' | 'dwg' | 'docx';
    color: 'red' | 'purple' | 'blue';
    size?: string;
  }[];
  similar: {
    id: string;
    title: string;
    machine: string;
    vendor: string;
    thumbnail: string;
  }[];
}

export interface ImprovementItem {
  id: string;
  title: string;
  machineCode: string;
  model: string;
  vendor: string;
  line: string;
  factory: string;
  status: 'applied' | 'pending' | 'in_progress' | 'draft' | 'rejected';
  statusText: string;
  views: number;
  likes: number;
  commentsCount: number;
  thumbnail: string;
  appliedDate: string;
  isStarred?: boolean;
  category: 'optimize' | 'reduce_ng' | 'reduce_downtime' | 'cost' | 'safety' | 'other';
  problemPoints: string[];
  solutionPoints: string[];
  implementationSteps: string[];
  beforeImage: string;
  afterImage: string;
  quantitativeResults: {
    metric1: { label: string; before: string; after: string; diff: string; isGood: boolean };
    metric2: { label: string; before: string; after: string; diff: string; isGood: boolean };
    metric3: { label: string; before: string; after: string; diff: string; isGood: boolean };
  };
  proposer: {
    name: string;
    role: string;
    avatar: string;
    pointsAwarded: number;
  };
  team: {
    name: string;
    avatar: string;
  }[];
  additionalTeamCount: number;
  appliedScope: {
    machine: string;
    status: 'applied' | 'in_progress' | 'proposed';
    statusText: string;
  }[];
  documents: {
    id: string;
    name: string;
    type: 'pdf' | 'docx';
    color: 'red' | 'blue';
  }[];
}

export interface DiscussionItem {
  id: string;
  title: string;
  content: string;
  topic: 'qa' | 'repair' | 'improve' | 'sharing' | 'notice';
  topicText: string;
  machine: string;
  vendor: string;
  status: 'discussing' | 'solved' | 'pending_confirm';
  statusText: string;
  author: {
    name: string;
    role: string;
    avatar: string;
    vendor?: string;
  };
  timeAgo: string;
  views: number;
  repliesCount: number;
  likes: number;
  thumbnail?: string;
  hasAcceptedSolution?: boolean;
  solutionSummary?: string;
  replies?: {
    id: string;
    author: string;
    role: string;
    avatar: string;
    timeAgo: string;
    content: string;
    likes: number;
    isAccepted?: boolean;
  }[];
}

export interface TechnicalDocumentItem {
  id: string;
  code: string;
  title: string;
  type: 'manual' | 'sop' | 'diagram' | 'drawing' | 'maintenance' | 'spare_parts';
  typeText: string;
  machine: string;
  model: string;
  vendor: string;
  version: string;
  fileFormat: 'PDF' | 'DXF' | 'DOCX';
  fileSize: string;
  updatedAt: string;
  views: number;
  downloads: number;
  approvalStatus: 'approved' | 'pending' | 'revision';
  author: string;
  summary: string;
}

export interface VendorRankingItem {
  rank: number;
  vendor: 'KHV' | 'DREAM TECH' | 'HSTEC' | 'KTECH' | 'HOJEONGB' | 'HOJEONG VINA' | 'DAAL';
  totalPoints: number;
  contributionsCount: number;
  trend: string;
  trendPositive: boolean;
}

export interface IndividualRankingItem {
  rank: number;
  name: string;
  role: string;
  vendor: string;
  avatar: string;
  points: number;
  docCount: number;
  incidentCount: number;
  improveCount: number;
}

export interface ApprovalQueueItem {
  id: string;
  title: string;
  type: 'incident' | 'improvement' | 'document' | 'discussion';
  typeText: string;
  author: string;
  authorRole: string;
  authorAvatar: string;
  vendor: string;
  equipment: string;
  model: string;
  submittedAt: string;
  version: string;
  views: number;
  ratingsCount: number;
  isUrgent?: boolean;
  phenomenon: string[];
  rootCauses: string[];
  steps: {
    number: number;
    title: string;
    image: string;
  }[];
  expectedResult: string;
  checklist: {
    clearAndFull: boolean;
    safeAndFeasible: boolean;
    evidenceAttached: boolean;
    practicalUsability: boolean;
  };
  ratingStars: number;
  reviewerNotes?: string;
}

export interface AuditLogItem {
  id: string;
  action: string;
  performedBy: string;
  timestamp: string;
  details: string;
  module: string;
}
