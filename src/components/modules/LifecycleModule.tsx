import React, { useState, useMemo, useEffect } from 'react';
import {
  Workflow,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  AlertTriangle,
  AlertOctagon,
  Sparkles,
  FileText,
  FileCheck2,
  Activity,
  Layers,
  ArrowRight,
  TrendingDown,
  ChevronRight,
  UserCheck,
  Award,
  RefreshCw,
  Download,
  Plus,
  ShieldAlert,
  Zap,
  Users,
  Eye,
  Sliders,
  Check,
  Calculator,
  Play,
  GitCompare,
} from 'lucide-react';

import {
  LifecycleCase,
  LifecycleStage,
  SLAStatus,
  CasePriority,
  UserRole,
  ValidationOutcome,
  LifecycleQualityAlert,
} from '../../types';

import {
  LIFECYCLE_CASES_DATA,
  LIFECYCLE_STAGE_PIPELINE,
  TECHNICAL_EXPERTS_LIST,
  LIFECYCLE_QUALITY_ALERTS,
  LIFECYCLE_AUDIT_LOGS,
} from '../../data/mockData';

import { AssignExpertModal } from '../lifecycle/AssignExpertModal';
import { TechnicalVerificationModal } from '../lifecycle/TechnicalVerificationModal';
import { OutcomeValidationModal } from '../lifecycle/OutcomeValidationModal';
import { LifecycleDetailDrawer } from '../lifecycle/LifecycleDetailDrawer';
import { KpiFormulaModal } from '../lifecycle/KpiFormulaModal';
import { VersionComparisonModal } from '../lifecycle/VersionComparisonModal';
import { E2ELifecycleTestModal } from '../lifecycle/E2ELifecycleTestModal';

import { IncidentCaptureWorkspace } from '../lifecycle/workspaces/IncidentCaptureWorkspace';
import { TechnicalVerificationWorkspace } from '../lifecycle/workspaces/TechnicalVerificationWorkspace';
import { KnowledgeApprovalWorkspace } from '../lifecycle/workspaces/KnowledgeApprovalWorkspace';
import { AiRecommendationWorkspace } from '../lifecycle/workspaces/AiRecommendationWorkspace';
import { KnowledgeApplicationWorkspace } from '../lifecycle/workspaces/KnowledgeApplicationWorkspace';
import { OutcomeValidationWorkspace } from '../lifecycle/workspaces/OutcomeValidationWorkspace';
import { KnowledgeManagerWorkspace } from '../lifecycle/workspaces/KnowledgeManagerWorkspace';

interface LifecycleModuleProps {
  currentRole: UserRole;
  onOpenNewIncidentModal: () => void;
  onNavigateTab: (tab: string) => void;
}

export const LifecycleModule: React.FC<LifecycleModuleProps> = ({
  currentRole,
  onOpenNewIncidentModal,
  onNavigateTab,
}) => {
  // Cases State with LocalStorage Persistence
  const [cases, setCases] = useState<LifecycleCase[]>(() => {
    try {
      const saved = localStorage.getItem('edm_smartguard_lifecycle_cases');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to load saved cases from localStorage:', e);
    }
    return LIFECYCLE_CASES_DATA;
  });

  useEffect(() => {
    try {
      localStorage.setItem('edm_smartguard_lifecycle_cases', JSON.stringify(cases));
    } catch (e) {
      console.warn('Failed to save cases to localStorage:', e);
    }
  }, [cases]);

  const [qualityAlerts, setQualityAlerts] = useState<LifecycleQualityAlert[]>(LIFECYCLE_QUALITY_ALERTS);

  // Filters State
  const [selectedStageFilter, setSelectedStageFilter] = useState<string>('all');
  const [selectedFactory, setSelectedFactory] = useState<string>('all');
  const [selectedVendor, setSelectedVendor] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [timeRange, setTimeRange] = useState<string>('30days');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedPriority, setSelectedPriority] = useState<string>('all');
  const [activeWorkspace, setActiveWorkspace] = useState<'overview' | 'km_workspace' | LifecycleStage>('overview');

  // Modals & Drawer State
  const [selectedCaseForDrawer, setSelectedCaseForDrawer] = useState<LifecycleCase | null>(null);
  const [assignModalCase, setAssignModalCase] = useState<LifecycleCase | null>(null);
  const [verifyModalCase, setVerifyModalCase] = useState<LifecycleCase | null>(null);
  const [validationModalCase, setValidationModalCase] = useState<LifecycleCase | null>(null);
  const [isKpiModalOpen, setIsKpiModalOpen] = useState<boolean>(false);
  const [isVersionModalOpen, setIsVersionModalOpen] = useState<boolean>(false);
  const [isE2ETestModalOpen, setIsE2ETestModalOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Filtered Cases
  const filteredCases = useMemo(() => {
    return cases.filter((c) => {
      if (selectedStageFilter !== 'all' && c.currentStage !== selectedStageFilter) return false;
      if (selectedFactory !== 'all' && c.factory !== selectedFactory) return false;
      if (selectedVendor !== 'all' && c.vendor !== selectedVendor) return false;
      if (selectedCategory !== 'all' && c.category !== selectedCategory) return false;
      if (selectedPriority !== 'all' && c.priority !== selectedPriority) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesId = c.id.toLowerCase().includes(q);
        const matchesTitle = c.title.toLowerCase().includes(q);
        const matchesCode = c.errorCode.toLowerCase().includes(q);
        const matchesEquip = c.equipmentId.toLowerCase().includes(q);
        const matchesModel = c.model.toLowerCase().includes(q);
        if (!matchesId && !matchesTitle && !matchesCode && !matchesEquip && !matchesModel) {
          return false;
        }
      }
      return true;
    });
  }, [cases, selectedStageFilter, selectedFactory, selectedVendor, selectedCategory, selectedPriority, searchQuery]);

  // Operational Statistics Calculation
  const totalIncidents = 42;
  const pendingVerification = cases.filter((c) => c.currentStage === 'technical_verification').length;
  const pendingApproval = cases.filter((c) => c.currentStage === 'knowledge_approval').length;
  const verifiedKnowledgeCount = 2846;
  const aiRecommendedCount = 64;
  const pendingValidation = cases.filter((c) => c.currentStage === 'outcome_validation').length;
  const overdueCasesCount = cases.filter((c) => c.slaStatus === 'overdue').length;
  const applicationSuccessRate = 94.2;

  // Handlers for Lifecycle Actions
  const handleAssignExpert = (caseId: string, expertId: string, slaHours: number, note: string) => {
    const expert = TECHNICAL_EXPERTS_LIST.find((e) => e.id === expertId);
    if (!expert) return;

    setCases((prev) =>
      prev.map((c) => {
        if (c.id === caseId) {
          return {
            ...c,
            currentStage: 'technical_verification',
            statusText: 'Đang thẩm định kỹ thuật',
            assignedExpert: {
              id: expert.id,
              name: expert.name,
              role: expert.role,
              avatar: expert.avatar,
              assignedAt: 'Vừa xong',
            },
            slaTotalHours: slaHours,
            slaRemainingHours: slaHours,
            slaStatus: 'on_time',
            stageProgressPercent: 40,
          };
        }
        return c;
      })
    );

    showToast(`Đã phân công Chuyên gia ${expert.name} cho hồ sơ ${caseId} (SLA: ${slaHours}h).`);
  };

  const handleVerifySuccess = (
    caseId: string,
    verifiedRootCause: string,
    confidence: number,
    safetyAlert: string
  ) => {
    setCases((prev) =>
      prev.map((c) => {
        if (c.id === caseId) {
          return {
            ...c,
            currentStage: 'knowledge_approval',
            statusText: 'Chờ duyệt xuất bản SOP',
            verifiedRootCause,
            rootCauseConfidence: confidence,
            safetyAlert,
            stageProgressPercent: 65,
            publishedArticle: {
              articleId: `SOP-${c.category.toUpperCase()}-${c.errorCode}`,
              version: 'v1.0 (Dự thảo)',
              publishedDate: 'Chờ duyệt',
              validUntilDate: '12 tháng sau khi duyệt',
              reviewScheduledDate: '6 tháng',
              scope: 'shared',
              approverName: 'Ban Phê duyệt Nội dung',
            },
          };
        }
        return c;
      })
    );

    showToast(`Đã xác minh nguyên nhân gốc (${confidence}% tin cậy). Chuyển bước Phê duyệt SOP.`);
  };

  const handleValidateSuccess = (
    caseId: string,
    outcome: ValidationOutcome,
    stabilityHours: number,
    recurrence: boolean,
    mttrHours: number,
    costSaving: number,
    notes: string
  ) => {
    setCases((prev) =>
      prev.map((c) => {
        if (c.id === caseId) {
          return {
            ...c,
            statusText: outcome === 'verified_successful' ? 'Đã đóng - Hoàn tất vòng đời' : 'Cần theo dõi thêm',
            stageProgressPercent: 100,
            outcomeValidation: {
              validatedBy: 'Chuyên gia Kỹ thuật & KM',
              validatedDate: 'Hôm nay',
              outcome,
              operatingStabilityHours: stabilityHours,
              recurrenceObserved: recurrence,
              mttrActualHours: mttrHours,
              costSavingVND: costSaving,
              validationNotes: notes,
            },
          };
        }
        return c;
      })
    );

    showToast(`Đã hoàn tất đánh giá hiệu quả hồ sơ ${caseId}. Vận hành ổn định: ${stabilityHours}h.`);
  };

  return (
    <div className="space-y-4 pb-12 text-slate-800">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-[#0d265a] border border-blue-400 text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2.5 animate-in slide-in-from-top-4 duration-200">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* 1. TOP OPERATIONAL HEADER & DYNAMIC FILTERS */}
      <div className="bg-[#0b1b42] border border-[#162c5e] rounded-2xl p-4 text-white shadow-xl space-y-3.5">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 border border-blue-400/40 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
              <Workflow className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="text-lg lg:text-xl font-black tracking-tight text-white flex items-center gap-2">
                  KNOWLEDGE LIFECYCLE CONTROL CENTER
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-blue-500/20 text-cyan-300 border border-cyan-400/30">
                  Điều hành vòng đời tri thức
                </span>
              </div>
              <p className="text-xs text-[#9eb6e2]">
                Quy trình khép kín: Ghi nhận sự cố → Xác minh kỹ thuật → Phê duyệt SOP → Đề xuất AI → Áp dụng sàn máy → Xác thực hiệu quả
              </p>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setIsE2ETestModalOpen(true)}
              className="px-3.5 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-lg shadow-purple-600/30 transition flex items-center gap-1.5 animate-pulse"
            >
              <Play className="w-3.5 h-3.5" />
              <span>Chạy E2E Test (10 bước)</span>
            </button>
            <button
              onClick={() => setIsKpiModalOpen(true)}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-[#122858] hover:bg-[#1a397c] text-cyan-300 border border-cyan-400/30 transition flex items-center gap-1.5"
            >
              <Calculator className="w-3.5 h-3.5 text-cyan-400" />
              <span>Công thức toán học KPI</span>
            </button>
            <button
              onClick={() => setIsVersionModalOpen(true)}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-[#122858] hover:bg-[#1a397c] text-slate-200 border border-[#21438a] transition flex items-center gap-1.5"
            >
              <GitCompare className="w-3.5 h-3.5 text-blue-400" />
              <span>So sánh SOP (Diff)</span>
            </button>
            <button
              onClick={() => showToast('Báo cáo SLA & Chu kỳ tri thức đã được tổng hợp.')}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-[#122858] hover:bg-[#1a397c] text-slate-200 border border-[#21438a] transition flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5 text-blue-400" />
              <span>Xuất báo cáo SLA</span>
            </button>
            <button
              onClick={() => {
                setCases(LIFECYCLE_CASES_DATA);
                try {
                  localStorage.setItem('edm_smartguard_lifecycle_cases', JSON.stringify(LIFECYCLE_CASES_DATA));
                } catch (e) {
                  console.warn(e);
                }
                showToast('Dữ liệu vòng đời tri thức đã được khôi phục về mặc định.');
              }}
              className="p-2 rounded-xl text-xs font-semibold bg-[#122858] hover:bg-[#1a397c] text-slate-200 border border-[#21438a] transition"
              title="Khôi phục dữ liệu gốc"
            >
              <RefreshCw className="w-4 h-4 text-slate-300" />
            </button>
            <button
              onClick={onOpenNewIncidentModal}
              className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 shadow-lg shadow-blue-600/30 transition flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Tiếp nhận sự cố mới</span>
            </button>
          </div>
        </div>

        {/* Dynamic Filter Controls Bar */}
        <div className="pt-2 border-t border-[#162d64] flex flex-wrap items-center gap-2.5 text-xs">
          {/* Search Box */}
          <div className="relative flex-1 min-w-[200px] max-w-xs">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm mã LC, mã lỗi, model máy..."
              className="w-full bg-[#081534] border border-[#1b3874] rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-blue-400"
            />
          </div>

          {/* Factory Filter */}
          <div className="flex items-center gap-1 bg-[#081534] border border-[#1b3874] rounded-xl p-1 text-[11px]">
            <span className="text-slate-400 px-1.5 font-medium">Nhà máy:</span>
            {['all', 'SEV', 'P1', 'P2'].map((f) => (
              <button
                key={f}
                onClick={() => setSelectedFactory(f)}
                className={`px-2.5 py-1 rounded-lg font-bold transition ${
                  selectedFactory === f
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {f === 'all' ? 'Tất cả' : f}
              </button>
            ))}
          </div>

          {/* Vendor Filter */}
          <select
            value={selectedVendor}
            onChange={(e) => setSelectedVendor(e.target.value)}
            className="bg-[#081534] border border-[#1b3874] rounded-xl px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-blue-400"
          >
            <option value="all">Hãng / Vendor: Tất cả</option>
            <option value="Mitsubishi">Mitsubishi</option>
            <option value="Makino">Makino</option>
            <option value="Sodick">Sodick</option>
            <option value="Fanuc">Fanuc</option>
            <option value="Okuma">Okuma</option>
          </select>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-[#081534] border border-[#1b3874] rounded-xl px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-blue-400"
          >
            <option value="all">Loại thiết bị: Tất cả</option>
            <option value="cnc">Máy Phay CNC</option>
            <option value="edm">Máy Cắt dây EDM</option>
            <option value="robot">Robot & Tự động</option>
            <option value="auxiliary">Trạm Phụ trợ / Thủy lực</option>
          </select>

          {/* Priority Filter */}
          <select
            value={selectedPriority}
            onChange={(e) => setSelectedPriority(e.target.value)}
            className="bg-[#081534] border border-[#1b3874] rounded-xl px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-blue-400"
          >
            <option value="all">Mức ưu tiên: Tất cả</option>
            <option value="critical">Khẩn cấp (Critical)</option>
            <option value="high">Cao (High)</option>
            <option value="medium">Trung bình (Medium)</option>
            <option value="low">Thấp (Low)</option>
          </select>

          {/* Reset button */}
          {(selectedStageFilter !== 'all' ||
            selectedFactory !== 'all' ||
            selectedVendor !== 'all' ||
            selectedCategory !== 'all' ||
            selectedPriority !== 'all' ||
            searchQuery.trim() !== '') && (
            <button
              onClick={() => {
                setSelectedStageFilter('all');
                setSelectedFactory('all');
                setSelectedVendor('all');
                setSelectedCategory('all');
                setSelectedPriority('all');
                setSearchQuery('');
              }}
              className="text-[11px] text-cyan-300 hover:underline px-2 py-1 font-semibold"
            >
              Đặt lại bộ lọc
            </button>
          )}
        </div>

        {/* 6-Stage Pipeline Navigation Tabs + KM Workspace Tab */}
        <div className="pt-2 border-t border-[#162d64] flex items-center justify-between overflow-x-auto gap-2">
          <div className="flex items-center gap-1.5 min-w-max">
            <button
              onClick={() => setActiveWorkspace('overview')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                activeWorkspace === 'overview'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'bg-[#081534] text-slate-300 hover:text-white border border-[#1b3874]'
              }`}
            >
              <Workflow className="w-3.5 h-3.5" />
              <span>Bàn điều hành chung</span>
            </button>

            {[
              { id: 'incident_capture', label: '01 Tiếp nhận', icon: Activity },
              { id: 'technical_verification', label: '02 Xác minh', icon: FileCheck2 },
              { id: 'knowledge_approval', label: '03 Phê duyệt', icon: FileText },
              { id: 'ai_recommendation', label: '04 Đề xuất AI', icon: Sparkles },
              { id: 'knowledge_application', label: '05 Áp dụng', icon: Zap },
              { id: 'outcome_validation', label: '06 Nghiệm thu', icon: Award },
            ].map((ws) => {
              const Icon = ws.icon;
              const isActive = activeWorkspace === ws.id;
              return (
                <button
                  key={ws.id}
                  onClick={() => setActiveWorkspace(ws.id as LifecycleStage)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-500/20'
                      : 'bg-[#081534] text-slate-400 hover:text-white border border-[#1b3874]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{ws.label}</span>
                </button>
              );
            })}

            {/* Knowledge Manager Dedicated Workspace Tab */}
            <button
              onClick={() => setActiveWorkspace('km_workspace')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                activeWorkspace === 'km_workspace'
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-500/20 ring-1 ring-purple-300'
                  : 'bg-[#0f1d46] text-purple-300 hover:text-white border border-purple-500/40 hover:bg-purple-900/40'
              }`}
            >
              <Users className="w-3.5 h-3.5 text-purple-300" />
              <span>Bàn điều hành KM (Chuyên gia & SLA)</span>
              {overdueCasesCount > 0 && (
                <span className="w-2 h-2 rounded-full bg-rose-400 animate-ping"></span>
              )}
            </button>
          </div>

          {activeWorkspace !== 'overview' && (
            <button
              onClick={() => setActiveWorkspace('overview')}
              className="text-xs text-cyan-300 hover:underline font-semibold flex items-center gap-1 min-w-max"
            >
              <span>Về Bàn điều hành</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* RENDER INDIVIDUAL STAGE WORKSPACE OR OVERVIEW */}
      {activeWorkspace === 'incident_capture' && (
        <IncidentCaptureWorkspace
          cases={cases}
          selectedCase={selectedCaseForDrawer}
          onSelectCase={(c) => setSelectedCaseForDrawer(c)}
          onOpenNewIncidentModal={onOpenNewIncidentModal}
          onProceedToVerification={(caseId) => {
            setCases((prev) =>
              prev.map((c) =>
                c.id === caseId
                  ? { ...c, currentStage: 'technical_verification', statusText: 'Chờ phân công chuyên gia' }
                  : c
              )
            );
            setActiveWorkspace('technical_verification');
            showToast('Đã chuyển hồ sơ sang Stage 02 (Xác minh kỹ thuật).');
          }}
          currentRole={currentRole}
        />
      )}

      {activeWorkspace === 'technical_verification' && (
        <TechnicalVerificationWorkspace
          cases={cases}
          selectedCase={selectedCaseForDrawer}
          onSelectCase={(c) => setSelectedCaseForDrawer(c)}
          onOpenVerifyModal={(c) => setVerifyModalCase(c)}
          onOpenAssignModal={(c) => setAssignModalCase(c)}
          currentRole={currentRole}
        />
      )}

      {activeWorkspace === 'knowledge_approval' && (
        <KnowledgeApprovalWorkspace
          cases={cases}
          selectedCase={selectedCaseForDrawer}
          onSelectCase={(c) => setSelectedCaseForDrawer(c)}
          onOpenVersionModal={() => setIsVersionModalOpen(true)}
          onApproveSop={(caseId) => {
            setCases((prev) =>
              prev.map((c) =>
                c.id === caseId
                  ? {
                      ...c,
                      currentStage: 'ai_recommendation',
                      statusText: 'Đã xuất bản SOP — AI sẵn sàng trích dẫn',
                      publishedArticle: {
                        articleId: `SOP-${c.category.toUpperCase()}-${c.errorCode}`,
                        version: 'v2.1',
                        publishedDate: 'Hôm nay',
                        validUntilDate: '12 tháng sau',
                        reviewScheduledDate: '6 tháng',
                        scope: 'shared',
                        approverName: 'Ban Phê duyệt Nội dung',
                      },
                    }
                  : c
              )
            );
            setActiveWorkspace('ai_recommendation');
            showToast('Đã phê duyệt và xuất bản tài liệu SOP chuẩn.');
          }}
          currentRole={currentRole}
        />
      )}

      {activeWorkspace === 'ai_recommendation' && (
        <AiRecommendationWorkspace
          cases={cases}
          selectedCase={selectedCaseForDrawer}
          onSelectCase={(c) => setSelectedCaseForDrawer(c)}
          onDeployToField={(caseId) => {
            setCases((prev) =>
              prev.map((c) =>
                c.id === caseId
                  ? { ...c, currentStage: 'knowledge_application', statusText: 'Đang triển khai tại sàn máy' }
                  : c
              )
            );
            setActiveWorkspace('knowledge_application');
            showToast('Đã chuyển giao hướng dẫn AI xuống sàn máy (Stage 05).');
          }}
          currentRole={currentRole}
        />
      )}

      {activeWorkspace === 'knowledge_application' && (
        <KnowledgeApplicationWorkspace
          cases={cases}
          selectedCase={selectedCaseForDrawer}
          onSelectCase={(c) => setSelectedCaseForDrawer(c)}
          onSubmitApplicationResult={(caseId, duration, notes) => {
            setCases((prev) =>
              prev.map((c) =>
                c.id === caseId
                  ? {
                      ...c,
                      currentStage: 'outcome_validation',
                      statusText: 'Chờ theo dõi ổn định 48h',
                      applicationRecord: {
                        applicationId: `APP-${Date.now()}`,
                        appliedBy: 'Kỹ thuật viên ca máy',
                        appliedDate: 'Hôm nay',
                        executionDurationMinutes: duration,
                        actualResultSummary: notes,
                      },
                    }
                  : c
              )
            );
            setActiveWorkspace('outcome_validation');
            showToast('Đã ghi nhận kết quả áp dụng. Chuyển sang theo dõi độ ổn định 48h.');
          }}
          currentRole={currentRole}
        />
      )}

      {activeWorkspace === 'outcome_validation' && (
        <OutcomeValidationWorkspace
          cases={cases}
          selectedCase={selectedCaseForDrawer}
          onSelectCase={(c) => setSelectedCaseForDrawer(c)}
          onOpenValidationModal={(c) => setValidationModalCase(c)}
          onCloseCaseSuccessfully={(caseId) => {
            handleValidateSuccess(caseId, 'verified_successful', 48, false, 0.75, 35000000, 'Nghiệm thu đạt chuẩn đóng hồ sơ.');
          }}
          currentRole={currentRole}
        />
      )}

      {/* 8. KNOWLEDGE MANAGER WORKSPACE (SECTION 11 DELIVERABLE) */}
      {activeWorkspace === 'km_workspace' && (
        <KnowledgeManagerWorkspace
          cases={cases}
          qualityAlerts={qualityAlerts}
          onOpenAssignModal={(c) => setAssignModalCase(c)}
          onOpenCaseDrawer={(c) => setSelectedCaseForDrawer(c)}
          onEscalateCase={(caseId, reason) => {
            showToast(`Đã tiếp nhận yêu cầu leo thang cho hồ sơ ${caseId}: ${reason}`);
          }}
          currentRole={currentRole}
        />
      )}

      {/* OVERVIEW MODE */}
      {activeWorkspace === 'overview' && (
        <>
          {/* 2. 8 HIGH-IMPACT KPI METRIC CARDS HEADER */}
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                8 Chỉ số hiệu năng cốt lõi (Core Lifecycle KPIs)
              </span>
            </div>
            <button
              onClick={() => setIsKpiModalOpen(true)}
              className="text-xs text-blue-600 hover:text-blue-800 hover:underline font-semibold flex items-center gap-1.5"
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>Xem đặc tả công thức toán học (Tử số, Mẫu số & Chuẩn đo)</span>
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2.5">
        {/* KPI 1 */}
        <div className="bg-white rounded-xl p-3 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 text-[11px]">
            <span>Tổng sự cố</span>
            <Activity className="w-3.5 h-3.5 text-blue-500" />
          </div>
          <div className="mt-1">
            <span className="text-xl font-black font-mono text-slate-800">{totalIncidents}</span>
            <span className="text-[10px] text-emerald-600 font-bold block mt-0.5">▲ +12% tháng</span>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="bg-white rounded-xl p-3 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 text-[11px]">
            <span>Chờ xác minh</span>
            <FileCheck2 className="w-3.5 h-3.5 text-amber-500" />
          </div>
          <div className="mt-1">
            <span className="text-xl font-black font-mono text-amber-600">{pendingVerification}</span>
            <span className="text-[10px] text-slate-400 font-medium block mt-0.5">5 ca ưu tiên cao</span>
          </div>
        </div>

        {/* KPI 3 */}
        <div className="bg-white rounded-xl p-3 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 text-[11px]">
            <span>Chờ duyệt SOP</span>
            <FileText className="w-3.5 h-3.5 text-blue-500" />
          </div>
          <div className="mt-1">
            <span className="text-xl font-black font-mono text-blue-600">{pendingApproval}</span>
            <span className="text-[10px] text-slate-400 font-medium block mt-0.5">SOP chuẩn hóa</span>
          </div>
        </div>

        {/* KPI 4 */}
        <div className="bg-white rounded-xl p-3 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 text-[11px]">
            <span>Tri thức ban hành</span>
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
          </div>
          <div className="mt-1">
            <span className="text-xl font-black font-mono text-emerald-600">{verifiedKnowledgeCount}</span>
            <span className="text-[10px] text-emerald-600 font-bold block mt-0.5">98% hiệu lực</span>
          </div>
        </div>

        {/* KPI 5 */}
        <div className="bg-white rounded-xl p-3 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 text-[11px]">
            <span>Đề xuất qua AI</span>
            <Sparkles className="w-3.5 h-3.5 text-purple-500" />
          </div>
          <div className="mt-1">
            <span className="text-xl font-black font-mono text-purple-600">{aiRecommendedCount}</span>
            <span className="text-[10px] text-purple-600 font-bold block mt-0.5">94% Matching</span>
          </div>
        </div>

        {/* KPI 6 */}
        <div className="bg-white rounded-xl p-3 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 text-[11px]">
            <span>Chờ xác thực</span>
            <Clock className="w-3.5 h-3.5 text-indigo-500" />
          </div>
          <div className="mt-1">
            <span className="text-xl font-black font-mono text-indigo-600">{pendingValidation}</span>
            <span className="text-[10px] text-slate-400 font-medium block mt-0.5">Theo dõi 48h</span>
          </div>
        </div>

        {/* KPI 7 - Overdue SLA (HIGHLIGHTED) */}
        <div className="bg-rose-50/80 rounded-xl p-3 border border-rose-200 shadow-xs flex flex-col justify-between ring-1 ring-rose-400/20">
          <div className="flex items-center justify-between text-rose-600 text-[11px] font-bold">
            <span>Quá hạn SLA</span>
            <AlertOctagon className="w-3.5 h-3.5 text-rose-500 animate-bounce" />
          </div>
          <div className="mt-1">
            <span className="text-xl font-black font-mono text-rose-600">{overdueCasesCount} ca</span>
            <span className="text-[10px] text-rose-700 font-bold block mt-0.5">Cần leo thang ngay!</span>
          </div>
        </div>

        {/* KPI 8 */}
        <div className="bg-emerald-50/80 rounded-xl p-3 border border-emerald-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-emerald-700 text-[11px] font-bold">
            <span>Tỷ lệ thành công</span>
            <Award className="w-3.5 h-3.5 text-emerald-600" />
          </div>
          <div className="mt-1">
            <span className="text-xl font-black font-mono text-emerald-700">{applicationSuccessRate}%</span>
            <span className="text-[10px] text-emerald-800 font-bold block mt-0.5">MTTR giảm 37%</span>
          </div>
        </div>
      </div>

      {/* 3. CENTRAL 6-STAGE INTERACTIVE PIPELINE */}
      <div className="bg-[#0b1b42] border border-[#162c5e] rounded-2xl p-4 text-white shadow-xl space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="font-bold text-sm text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              TRỤC ĐIỀU HÀNH 6 CÔNG ĐOẠN VÒNG ĐỜI (LIFECYCLE PIPELINE)
            </h2>
            <span className="text-xs text-slate-400">
              (Nhấp vào công đoạn để lọc danh sách tác vụ)
            </span>
          </div>
          {selectedStageFilter !== 'all' && (
            <button
              onClick={() => setSelectedStageFilter('all')}
              className="text-xs text-cyan-300 hover:underline flex items-center gap-1 font-semibold"
            >
              <span>Hiển thị tất cả 6 công đoạn</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-2.5">
          {LIFECYCLE_STAGE_PIPELINE.map((stg, idx) => {
            const isSelected = selectedStageFilter === stg.stage;
            const stageIcons = [Activity, FileCheck2, FileText, Sparkles, Zap, Award];
            const Icon = stageIcons[idx] || Workflow;

            return (
              <div
                key={stg.stage}
                onClick={() =>
                  setSelectedStageFilter(isSelected ? 'all' : stg.stage)
                }
                className={`p-3 rounded-xl border cursor-pointer transition-all flex flex-col justify-between relative overflow-hidden ${
                  isSelected
                    ? 'bg-blue-600/30 border-blue-400 shadow-md shadow-blue-500/20 ring-2 ring-blue-400'
                    : 'bg-[#081534] border-[#183166] hover:border-slate-500 hover:bg-[#0c1f4c]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#102450] text-blue-300 border border-blue-400/20">
                    STAGE 0{idx + 1}
                  </span>
                  <Icon className={`w-4 h-4 ${isSelected ? 'text-cyan-300' : 'text-slate-400'}`} />
                </div>

                <div className="mt-2 space-y-1">
                  <h3 className="font-bold text-xs text-white line-clamp-1">{stg.stageName}</h3>
                  <div className="flex items-baseline justify-between">
                    <span className="text-lg font-black font-mono text-white">{stg.inProgress}</span>
                    <span className="text-[10px] text-slate-400">/ {stg.totalCases} ca</span>
                  </div>
                </div>

                <div className="mt-2 pt-2 border-t border-[#132752] flex items-center justify-between text-[10px]">
                  <span className="text-slate-400 truncate max-w-[85px]">{stg.responsibleRole}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveWorkspace(stg.stage);
                    }}
                    className="text-cyan-400 hover:text-white hover:underline font-bold transition flex items-center gap-0.5"
                  >
                    <span>Vào việc</span>
                    <ArrowRight className="w-2.5 h-2.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. WORKFLOW BOTTLENECK ANALYSIS & QUALITY MONITOR */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3.5">
        {/* Left 2 Cols: Quality Alerts & Bottleneck Warnings */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-4 border border-slate-200/90 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-rose-500" />
              <h3 className="font-bold text-xs text-slate-800 uppercase tracking-wider">
                Điểm nghẽn quy trình & Cảnh báo chất lượng tri thức (Bottlenecks & Quality Alerts)
              </h3>
            </div>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 font-bold">
              {qualityAlerts.length} cảnh báo đang chờ xử lý
            </span>
          </div>

          <div className="space-y-2">
            {qualityAlerts.map((alert) => (
              <div
                key={alert.id}
                className="p-3 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100/80 transition flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs"
              >
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      alert.severity === 'high'
                        ? 'bg-rose-100 text-rose-700 border border-rose-200'
                        : 'bg-amber-100 text-amber-700 border border-amber-200'
                    }`}>
                      {alert.type.replace('_', ' ')}
                    </span>
                    <span className="font-bold text-slate-800">{alert.title}</span>
                    <span className="text-[10px] text-slate-400 font-mono">({alert.caseId})</span>
                  </div>
                  <p className="text-slate-600 text-[11px]">{alert.description}</p>
                  <p className="text-[11px] text-blue-700 font-medium flex items-center gap-1">
                    <ArrowRight className="w-3 h-3 flex-shrink-0" /> Gợi ý hành động: {alert.suggestedAction}
                  </p>
                </div>
                <button
                  onClick={() => {
                    const match = cases.find((c) => c.id === alert.caseId);
                    if (match) setSelectedCaseForDrawer(match);
                  }}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white border border-slate-300 text-slate-700 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition flex-shrink-0 self-start md:self-center"
                >
                  Xử lý ngay
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Right Col: Knowledge Manager Team Workload */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-xs space-y-3 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-blue-600" />
                <h3 className="font-bold text-xs text-slate-800 uppercase tracking-wider">
                  Tải công việc Chuyên gia (Expert Workload)
                </h3>
              </div>
              <span className="text-[10px] text-slate-400">Giới hạn: 5 ca/người</span>
            </div>

            <div className="space-y-2.5 mt-3">
              {TECHNICAL_EXPERTS_LIST.slice(0, 4).map((exp) => {
                const percent = Math.min(100, (exp.activeCases / 5) * 100);
                return (
                  <div key={exp.id} className="space-y-1 text-xs">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img
                          src={exp.avatar}
                          alt={exp.name}
                          className="w-5 h-5 rounded-full object-cover"
                        />
                        <span className="font-semibold text-slate-700">{exp.name}</span>
                        <span className="text-[10px] text-slate-400">({exp.vendor})</span>
                      </div>
                      <span className="font-mono font-bold text-slate-700">{exp.activeCases}/5 ca</span>
                    </div>
                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${
                          percent >= 80 ? 'bg-rose-500' : percent >= 60 ? 'bg-amber-500' : 'bg-blue-500'
                        }`}
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Sẵn sàng tiếp nhận: <strong className="text-emerald-600 font-bold">2 chuyên gia</strong></span>
            <button
              onClick={() => setActiveWorkspace('km_workspace')}
              className="text-blue-600 hover:underline font-semibold"
            >
              Điều phối tải
            </button>
          </div>
        </div>
      </div>

      {/* 5. PRIMARY WORK SURFACE: PENDING TASKS OPERATIONS CENTER TABLE */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden space-y-0">
        {/* Table Top Controls & Stage Selector */}
        <div className="p-4 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-3 bg-slate-50/50">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-sm text-slate-800">
              Danh sách Hồ sơ Vòng đời Tri thức ({filteredCases.length})
            </h3>
            {selectedStageFilter !== 'all' && (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
                Đang lọc: {selectedStageFilter}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400">Xem nhanh theo giai đoạn:</span>
            <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-xl p-1">
              {[
                { id: 'all', label: 'Tất cả' },
                { id: 'incident_capture', label: '01 Tiếp nhận' },
                { id: 'technical_verification', label: '02 Xác minh' },
                { id: 'knowledge_approval', label: '03 Phê duyệt' },
                { id: 'ai_recommendation', label: '04 AI' },
                { id: 'knowledge_application', label: '05 Áp dụng' },
                { id: 'outcome_validation', label: '06 Xác thực' },
              ].map((chip) => (
                <button
                  key={chip.id}
                  onClick={() => setSelectedStageFilter(chip.id)}
                  className={`px-2 py-1 rounded-lg font-medium text-[11px] transition ${
                    selectedStageFilter === chip.id
                      ? 'bg-blue-600 text-white font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {chip.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* The Operational Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#091738] text-slate-300 text-[11px] font-semibold">
              <tr>
                <th className="p-3 pl-4">Mã hồ sơ & Lỗi</th>
                <th className="p-3">Tiêu đề sự cố</th>
                <th className="p-3">Thiết bị & Xưởng</th>
                <th className="p-3">Công đoạn hiện tại</th>
                <th className="p-3">Cam kết SLA</th>
                <th className="p-3">Người phụ trách</th>
                <th className="p-3">Ưu tiên</th>
                <th className="p-3 pr-4 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredCases.length > 0 ? (
                filteredCases.map((item) => {
                  return (
                    <tr
                      key={item.id}
                      className="hover:bg-blue-50/40 transition cursor-pointer group"
                      onClick={() => setSelectedCaseForDrawer(item)}
                    >
                      {/* Code & Error */}
                      <td className="p-3 pl-4">
                        <div className="space-y-0.5">
                          <span className="font-mono font-bold text-blue-700 block text-xs">
                            {item.id}
                          </span>
                          <span className="font-mono text-[10px] px-1.5 py-0.2 rounded bg-amber-100 text-amber-800 font-bold border border-amber-200">
                            {item.errorCode}
                          </span>
                        </div>
                      </td>

                      {/* Title */}
                      <td className="p-3 max-w-xs">
                        <p className="font-bold text-slate-800 line-clamp-1 group-hover:text-blue-600 transition">
                          {item.title}
                        </p>
                        <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                          {item.phenomenon[0]}
                        </p>
                      </td>

                      {/* Equipment */}
                      <td className="p-3">
                        <div className="font-semibold text-slate-800">
                          {item.equipmentId} <span className="text-slate-400 font-normal">({item.model})</span>
                        </div>
                        <div className="text-[10px] text-slate-500">
                          {item.factory} — {item.line} • {item.vendor}
                        </div>
                      </td>

                      {/* Stage Badge */}
                      <td className="p-3">
                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                          {item.currentStage === 'incident_capture' && '01 Tiếp nhận'}
                          {item.currentStage === 'technical_verification' && '02 Xác minh'}
                          {item.currentStage === 'knowledge_approval' && '03 Phê duyệt SOP'}
                          {item.currentStage === 'ai_recommendation' && '04 Đề xuất AI'}
                          {item.currentStage === 'knowledge_application' && '05 Áp dụng'}
                          {item.currentStage === 'outcome_validation' && '06 Xác thực'}
                        </span>
                      </td>

                      {/* SLA */}
                      <td className="p-3">
                        <div className="space-y-1">
                          {item.slaStatus === 'on_time' && (
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                              Còn {item.slaRemainingHours}h
                            </span>
                          )}
                          {item.slaStatus === 'due_soon' && (
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 animate-pulse">
                              <Clock className="w-3.5 h-3.5 text-amber-500" />
                              Gấp: còn {item.slaRemainingHours}h
                            </span>
                          )}
                          {item.slaStatus === 'overdue' && (
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-700 animate-pulse">
                              <AlertOctagon className="w-3.5 h-3.5 text-rose-500" />
                              Quá hạn {Math.abs(item.slaRemainingHours)}h
                            </span>
                          )}
                          <div className="text-[10px] text-slate-400">
                            Dừng máy: {item.downtimeHours}h
                          </div>
                        </div>
                      </td>

                      {/* Assigned Actor */}
                      <td className="p-3">
                        {item.assignedExpert ? (
                          <div className="flex items-center gap-2">
                            <img
                              src={item.assignedExpert.avatar}
                              alt={item.assignedExpert.name}
                              className="w-6 h-6 rounded-full object-cover"
                            />
                            <div>
                              <div className="font-semibold text-slate-800 text-[11px]">{item.assignedExpert.name}</div>
                              <div className="text-[10px] text-slate-400">Chuyên gia</div>
                            </div>
                          </div>
                        ) : (
                          <span className="text-[11px] text-amber-600 font-semibold italic">
                            Chưa phân công
                          </span>
                        )}
                      </td>

                      {/* Priority */}
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          item.priority === 'critical'
                            ? 'bg-rose-100 text-rose-700 border border-rose-200'
                            : item.priority === 'high'
                            ? 'bg-amber-100 text-amber-700 border border-amber-200'
                            : 'bg-slate-100 text-slate-600'
                        }`}>
                          {item.priority}
                        </span>
                      </td>

                      {/* Action Buttons */}
                      <td className="p-3 pr-4 text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => setSelectedCaseForDrawer(item)}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-slate-100 transition"
                            title="Xem chi tiết"
                          >
                            <Eye className="w-4 h-4" />
                          </button>

                          {(currentRole === 'knowledge_manager' || currentRole === 'admin') && (
                            <button
                              onClick={() => setAssignModalCase(item)}
                              className="px-2 py-1 rounded-md text-[11px] font-semibold bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 transition"
                            >
                              Phân công
                            </button>
                          )}

                          {(currentRole === 'technical_expert' || currentRole === 'knowledge_manager' || currentRole === 'admin') &&
                            item.currentStage === 'technical_verification' && (
                              <button
                                onClick={() => setVerifyModalCase(item)}
                                className="px-2 py-1 rounded-md text-[11px] font-bold bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 transition"
                              >
                                Xác minh
                              </button>
                            )}

                          {item.currentStage === 'outcome_validation' && (
                            <button
                              onClick={() => setValidationModalCase(item)}
                              className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-purple-600 text-white hover:bg-purple-700 shadow-xs transition"
                            >
                              Xác thực
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={8} className="p-12 text-center text-slate-400">
                    Không tìm thấy hồ sơ nào phù hợp với bộ lọc hiện tại.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      </>
      )}

      {/* MODALS & SLIDE-OVER DRAWER */}
      <AssignExpertModal
        isOpen={!!assignModalCase}
        onClose={() => setAssignModalCase(null)}
        caseItem={assignModalCase}
        onConfirm={handleAssignExpert}
      />

      <TechnicalVerificationModal
        isOpen={!!verifyModalCase}
        onClose={() => setVerifyModalCase(null)}
        caseItem={verifyModalCase}
        onVerifySuccess={handleVerifySuccess}
      />

      <OutcomeValidationModal
        isOpen={!!validationModalCase}
        onClose={() => setValidationModalCase(null)}
        caseItem={validationModalCase}
        onValidateSuccess={handleValidateSuccess}
      />

      <LifecycleDetailDrawer
        isOpen={!!selectedCaseForDrawer}
        onClose={() => setSelectedCaseForDrawer(null)}
        caseItem={selectedCaseForDrawer}
        currentRole={currentRole}
        onOpenAssignModal={(c) => {
          setSelectedCaseForDrawer(null);
          setAssignModalCase(c);
        }}
        onOpenVerifyModal={(c) => {
          setSelectedCaseForDrawer(null);
          setVerifyModalCase(c);
        }}
        onOpenValidationModal={(c) => {
          setSelectedCaseForDrawer(null);
          setValidationModalCase(c);
        }}
      />

      <KpiFormulaModal
        isOpen={isKpiModalOpen}
        onClose={() => setIsKpiModalOpen(false)}
      />

      <VersionComparisonModal
        isOpen={isVersionModalOpen}
        onClose={() => setIsVersionModalOpen(false)}
        onRollbackVersion={(tag) => {
          showToast(`Đã khôi phục và kích hoạt tài liệu phiên bản ${tag}.`);
        }}
      />

      <E2ELifecycleTestModal
        isOpen={isE2ETestModalOpen}
        onClose={() => setIsE2ETestModalOpen(false)}
        onInjectTestedCase={(testedCase) => {
          setCases((prev) => [testedCase, ...prev.filter((c) => c.id !== testedCase.id)]);
          showToast(`Đã nạp hồ sơ mẫu kiểm thử ${testedCase.id} vào danh sách vận hành!`);
        }}
      />
    </div>
  );
};
