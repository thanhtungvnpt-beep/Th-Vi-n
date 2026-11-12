export type UserRole =
  | 'admin'
  | 'knowledge_manager'
  | 'technical_expert'
  | 'content_approver'
  | 'ai_admin'
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
    parameter?: string;
    standard?: string;
    actual?: string;
    toolRequirements?: string[];
    safetyAlert?: string;
  }[];
  lessonsLearned?: {
    summary: string;
    keyTakeaways: string[];
    preventiveChecklist: string[];
  };
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
  validUntilDate?: string;
  reviewScheduledDate?: string;
  reviewStatus?: 'valid' | 'review_pending' | 'expired' | 'renewed';
  assignedReviewer?: string;
  sharingScope?: 'shared' | 'internal';
  authorizedVendors?: string[];
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

// =========================================================================
// KNOWLEDGE LIFECYCLE CONTROL CENTER DATA ARCHITECTURE
// =========================================================================

export type LifecycleStage =
  | 'incident_capture'       // 01 INCIDENT CAPTURE
  | 'technical_verification' // 02 TECHNICAL VERIFICATION
  | 'knowledge_approval'     // 03 KNOWLEDGE APPROVAL & PUBLISHING
  | 'ai_recommendation'      // 04 AI RECOMMENDATION MONITOR
  | 'knowledge_application'  // 05 KNOWLEDGE APPLICATION CENTER
  | 'outcome_validation';    // 06 OUTCOME VALIDATION WORKSPACE

export type SLAStatus = 'on_time' | 'due_soon' | 'overdue' | 'paused';
export type CasePriority = 'critical' | 'high' | 'medium' | 'low';
export type ValidationOutcome = 'verified_successful' | 'partially_successful' | 'failed' | 'needs_investigation' | 'pending';

export interface LifecycleEvidenceItem {
  id: string;
  name: string;
  type: 'image' | 'video' | 'sensor_log' | 'pdf';
  url: string;
  capturedAt: string;
  capturedBy: string;
  caption?: string;
  fileSize?: string;
}

export interface LifecycleCase {
  id: string;                      // Mã Case: 'LC-2025-0142'
  incidentId: string;              // Liên kết 'inc-01'
  title: string;
  equipmentId: string;             // 'CNC-04'
  model: string;                   // 'M-V800'
  vendor: string;                  // 'Mitsubishi'
  factory: 'SEV' | 'P1' | 'P2';
  line: string;                    // 'Line A'
  errorCode: string;               // 'E210'
  category: 'edm' | 'cnc' | 'robot' | 'auxiliary';
  currentStage: LifecycleStage;
  priority: CasePriority;
  statusText: string;
  
  // Participants & Assignment
  reportedBy: {
    name: string;
    role: string;
    avatar: string;
    vendor: string;
    phone?: string;
  };
  assignedExpert?: {
    id: string;
    name: string;
    role: string;
    avatar: string;
    assignedAt: string;
  };
  assignedApprover?: {
    id: string;
    name: string;
    role: string;
    avatar: string;
  };

  // Timestamps & SLA
  occurrenceTime: string;
  createdDate: string;
  dueDate: string;
  downtimeHours: number;
  slaStatus: SLAStatus;
  slaRemainingHours: number;
  slaTotalHours: number;
  slaPauseReason?: string;
  stageProgressPercent: number;

  // Technical Diagnostics
  phenomenon: string[];
  rootCauses: string[];
  verifiedRootCause?: string;
  rootCauseConfidence?: number; // 0 - 100%
  inspectionSteps: {
    number: number;
    title: string;
    parameter?: string;
    standard?: string;
    actual?: string;
    isPassed?: boolean;
  }[];
  correctiveActions: string[];
  safetyAlert?: string;
  evidences: LifecycleEvidenceItem[];
  missingEvidenceWarning?: boolean;

  // Knowledge Publishing (Stage 03)
  publishedArticle?: {
    articleId: string;
    version: string;
    publishedDate: string;
    validUntilDate: string;
    reviewScheduledDate: string;
    scope: 'shared' | 'internal';
    approverName: string;
  };

  // AI Recommendation (Stage 04)
  aiRecommendation?: {
    recommendationId: string;
    confidenceScore: number;
    sourceKnowledgeId: string;
    sourceVersion: string;
    similarCaseCount: number;
    safetyNotice: string;
    technicianFeedback?: 'helpful' | 'unhelpful';
  };

  // Application & Validation (Stage 05 & 06)
  applicationRecord?: {
    applicationId: string;
    appliedBy: string;
    appliedDate: string;
    executionDurationMinutes: number;
    deviationsNoted?: string;
    actualResultSummary: string;
  };
  outcomeValidation?: {
    validatedBy: string;
    validatedDate: string;
    outcome: ValidationOutcome;
    operatingStabilityHours: number;
    recurrenceObserved: boolean;
    mttrActualHours: number;
    costSavingVND: number;
    baselineMttrHours?: number;
    recurrenceRateBaseline?: number;
    recurrenceRateActual?: number;
    upgradeVersionProposed?: boolean;
    validationNotes: string;
  };
  lessonsLearned?: {
    summary: string;
    keyTakeaways: string[];
    preventiveChecklist: string[];
  };
}

export interface LifecycleAuditEntry {
  id: string;
  caseId: string;
  timestamp: string;
  actorName: string;
  actorRole: string;
  action: string;
  stage: LifecycleStage;
  details: string;
  previousValue?: string;
  newValue?: string;
}

export interface LifecycleQualityAlert {
  id: string;
  caseId: string;
  type: 'duplicate' | 'missing_evidence' | 'unverified_root_cause' | 'expired_document' | 'conflicting_procedure' | 'low_confidence_ai';
  severity: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  suggestedAction: string;
  createdAt: string;
}

export interface StagePipelineMetric {
  stage: LifecycleStage;
  stageName: string;
  totalCases: number;
  inProgress: number;
  overdueCount: number;
  completionRatePercent: number;
  responsibleRole: string;
  avgTurnaroundHours: number;
}

// =========================================================================
// 14 STRICTLY NECESSARY NEW EXPANSION ENTITIES (POSTGRESQL / CLOUD SQL TARGET)
// =========================================================================

// 01. Quản lý phiên bản chi tiết (M01 Knowledge Lifecycle)
export interface KnowledgeDocumentVersion {
  id: string;
  documentId: string;
  versionTag: string;
  status: 'draft' | 'verified' | 'published' | 'archived' | 'expired';
  contentPayload: string;
  changeSummary?: string;
  diffPatch?: Record<string, any>;
  authorId: string;
  verifierId?: string;
  approverId?: string;
  publishedAt?: string;
  createdAt: string;
}

// 03 & 04. Đồ thị liên kết tri thức (M02 Knowledge Graph)
export interface KnowledgeGraphNode {
  id: string;
  nodeType: 'equipment' | 'machine_model' | 'component' | 'error_code' | 'symptom' | 'root_cause' | 'sop';
  label: string;
  entityRefId?: string;
  attributes?: Record<string, any>;
}

export interface KnowledgeGraphEdge {
  id: string;
  sourceNodeId: string;
  targetNodeId: string;
  relationType: 'HAS_ERROR' | 'EXHIBITS_SYMPTOM' | 'CAUSED_BY' | 'RESOLVED_BY' | 'APPLIES_TO';
  weight: number;
  provenFrequency: number;
  isVerified: boolean;
}

// 06. Nhật ký thực thi hướng dẫn sửa chữa tại sàn máy (M03 Digital Work Instruction)
export interface WorkInstructionExecution {
  id: string;
  instructionId: string;
  machineId: string;
  caseId?: string;
  technicianId: string;
  stepChecklists: Array<{
    stepNumber: number;
    isConfirmed: boolean;
    actualValue?: string;
    completedAt?: string;
  }>;
  totalDurationMinutes: number;
  deviationNoted?: string;
  status: 'in_progress' | 'completed' | 'aborted';
  createdAt: string;
}

// 07 & 08. Hồ sơ thiết bị & Cụm linh kiện (M04 Machine Knowledge Profile)
export interface MachineKnowledgeProfile {
  machineId: string;
  qrCodeHash: string;
  modelName: string;
  vendorName: string;
  plantId: 'SEV' | 'P1' | 'P2';
  productionLine: string;
  commissioningDate?: string;
  totalIncidentsCount: number;
  totalImprovementsCount: number;
  mtbfHours: number;
  mttrHours: number;
  healthScore: number;
  updatedAt: string;
}

export interface MachineComponentAsset {
  id: string;
  machineId: string;
  componentCode: string;
  componentName: string;
  category: 'spindle' | 'axis_drive' | 'dielectric_filtration' | 'atc' | 'chiller';
  lifeExpectancyHours: number;
  accumulatedHours: number;
  replacementManualDocId?: string;
  lastServicedAt?: string;
}

// 09 & 10. Ma trận năng lực & Khóa đào tạo (M05 Technical Competency & Training)
export interface TechnicianCompetencyItem {
  id: string;
  technicianId: string;
  skillCategory: 'edm_operation' | 'error_troubleshooting' | 'spindle_maintenance' | 'precision_calibration';
  requiredLevel: 'A' | 'B+' | 'B' | 'C';
  currentLevel: 'A' | 'B+' | 'B' | 'C';
  isCompetent: boolean;
  overallScore: number;
  certifiedBy?: string;
  lastEvaluatedAt: string;
}

export interface TrainingCourseEnrollment {
  id: string;
  technicianId: string;
  courseCode: string;
  courseName: string;
  durationHours: number;
  triggerReason?: string;
  status: 'recommended' | 'in_progress' | 'completed';
  score?: number;
  completedAt?: string;
}

// 11. Phiên chẩn đoán AI (M06 AI Technical Assistant)
export interface AiDiagnosisSession {
  id: string;
  sessionId: string;
  userId: string;
  machineId?: string;
  errorQuery: string;
  aiResponseText: string;
  extractedCause?: string;
  suggestedSteps?: Array<{ stepNumber: number; title: string }>;
  technicianRating?: 'helpful' | 'unhelpful';
  technicianFeedbackNote?: string;
  citations?: Array<{
    documentId: string;
    version: string;
    confidenceScore: number;
    sectionTitle?: string;
  }>;
  createdAt: string;
}

// 14. Báo cáo đối sánh nhà máy (M07 Impact Analytics)
export interface PlantBenchmarkStat {
  id: string;
  plantId: 'SEV' | 'P1' | 'P2';
  reportingMonth: string;
  totalIncidentsResolved: number;
  mttrAvgHours: number;
  recurrenceRateAvg: number;
  totalCostSavingVND: number;
  reuseRatePercent: number;
}

// 15. Đơn vị nhà máy đa cơ sở (M08 Multi-Plant Knowledge)
export interface PlantTenant {
  id: 'SEV' | 'P1' | 'P2';
  plantName: string;
  locationAddress?: string;
  isCentralHub: boolean;
  activeMachinesCount: number;
  createdAt: string;
}

// 17 & 18. OCR bóc tách & Phát hiện trùng lặp (M09 AI Document Intelligence)
export interface OcrExtractedDocument {
  id: string;
  fileName: string;
  fileUrl: string;
  extractedModel?: string;
  extractedPartCode?: string;
  extractedEntitiesCount: number;
  rawOcrPayload: Record<string, any>;
  verificationStatus: 'pending_verification' | 'verified' | 'rejected';
  uploadedBy: string;
  createdAt: string;
}

export interface DuplicateDetectionRecord {
  id: string;
  sourceEntityId: string;
  candidateDuplicateId: string;
  similarityScore: number;
  conflictDetected: boolean;
  conflictSummary?: string;
  status: 'unresolved' | 'merged' | 'dismissed';
  resolvedBy?: string;
  createdAt: string;
}

// 20. Kế hoạch phòng ngừa dải máy tương đồng (M10 Lessons Learned & Prevention)
export interface CrossPlantRolloutAction {
  id: string;
  lessonId: string;
  targetEquipmentRange: string;
  totalTargetMachines: number;
  completedMachinesCount: number;
  rolloutStatus: 'in_progress' | 'completed';
  completionRatePercent: number;
  impactRecurrenceDrop: number;
  impactDowntimeDrop: number;
  updatedAt: string;
}

