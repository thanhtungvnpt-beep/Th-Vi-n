import React, { useState } from 'react';
import {
  X,
  Workflow,
  CheckCircle2,
  AlertCircle,
  Clock,
  Sparkles,
  FileText,
  Shield,
  Activity,
  User,
  ArrowRight,
  TrendingDown,
  DollarSign,
  Layers,
  History,
  Sliders,
  AlertTriangle,
  PlayCircle,
  Share2,
} from 'lucide-react';
import { LifecycleCase, LifecycleStage, UserRole } from '../../types';
import { LIFECYCLE_AUDIT_LOGS } from '../../data/mockData';

interface LifecycleDetailDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  caseItem: LifecycleCase | null;
  currentRole: UserRole;
  onOpenAssignModal: (caseItem: LifecycleCase) => void;
  onOpenVerifyModal: (caseItem: LifecycleCase) => void;
  onOpenValidationModal: (caseItem: LifecycleCase) => void;
}

export const LifecycleDetailDrawer: React.FC<LifecycleDetailDrawerProps> = ({
  isOpen,
  onClose,
  caseItem,
  currentRole,
  onOpenAssignModal,
  onOpenVerifyModal,
  onOpenValidationModal,
}) => {
  const [activeTab, setActiveTab] = useState<'timeline' | 'diagnostics' | 'knowledge' | 'application' | 'audit'>('timeline');

  if (!isOpen || !caseItem) return null;

  const stages: { key: LifecycleStage; label: string; number: string }[] = [
    { key: 'incident_capture', label: 'Tiếp nhận sự cố', number: '01' },
    { key: 'technical_verification', label: 'Xác minh kỹ thuật', number: '02' },
    { key: 'knowledge_approval', label: 'Phê duyệt SOP', number: '03' },
    { key: 'ai_recommendation', label: 'Đề xuất AI', number: '04' },
    { key: 'knowledge_application', label: 'Áp dụng thực tế', number: '05' },
    { key: 'outcome_validation', label: 'Xác thực hiệu quả', number: '06' },
  ];

  const currentStageIndex = stages.findIndex((s) => s.key === caseItem.currentStage);

  const filteredLogs = LIFECYCLE_AUDIT_LOGS.filter((l) => l.caseId === caseItem.id);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div className="w-full max-w-3xl bg-[#091738] border-l border-[#1a3364] h-full flex flex-col shadow-2xl text-slate-100">
        {/* Drawer Header */}
        <div className="p-4 lg:p-5 border-b border-[#162a54] bg-[#0b1b42] flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs px-2 py-0.5 rounded font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30">
                {caseItem.id}
              </span>
              <span className="font-mono text-xs px-2 py-0.5 rounded font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">
                {caseItem.errorCode}
              </span>
              <span className={`text-[10px] px-2 py-0.5 rounded font-semibold uppercase ${
                caseItem.priority === 'critical'
                  ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                  : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
              }`}>
                Ưu tiên {caseItem.priority}
              </span>
            </div>
            <h2 className="text-base lg:text-lg font-bold text-white line-clamp-1">
              {caseItem.title}
            </h2>
            <div className="flex items-center gap-4 text-xs text-slate-400">
              <span>Máy: <strong className="text-slate-200">{caseItem.equipmentId} ({caseItem.model})</strong></span>
              <span>Hãng: <strong className="text-slate-200">{caseItem.vendor}</strong></span>
              <span>Xưởng: <strong className="text-slate-200">{caseItem.factory} — {caseItem.line}</strong></span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 6-Stage Top Progress Bar */}
        <div className="px-5 py-3 bg-[#06112a] border-b border-[#14264e] overflow-x-auto">
          <div className="flex items-center justify-between min-w-[560px] gap-2">
            {stages.map((stg, idx) => {
              const isPast = idx < currentStageIndex;
              const isCurrent = idx === currentStageIndex;
              return (
                <div key={stg.key} className="flex-1 flex flex-col items-center relative">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold transition ${
                      isPast
                        ? 'bg-emerald-600 text-white'
                        : isCurrent
                        ? 'bg-blue-600 text-white ring-4 ring-blue-500/20 shadow-md shadow-blue-500/30 animate-pulse'
                        : 'bg-[#12234a] text-slate-400'
                    }`}
                  >
                    {isPast ? <CheckCircle2 className="w-4 h-4" /> : stg.number}
                  </div>
                  <span className={`text-[10px] mt-1 text-center font-medium line-clamp-1 ${
                    isCurrent ? 'text-blue-400 font-bold' : isPast ? 'text-emerald-400' : 'text-slate-500'
                  }`}>
                    {stg.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Drawer Tabs */}
        <div className="flex border-b border-[#162a54] bg-[#081533] px-4">
          {[
            { id: 'timeline', label: 'Tiến trình vòng đời', icon: Workflow },
            { id: 'diagnostics', label: 'Chẩn đoán & Bằng chứng', icon: Layers },
            { id: 'knowledge', label: 'Tri thức & Đề xuất AI', icon: Sparkles },
            { id: 'application', label: 'Áp dụng & Kết quả', icon: Activity },
            { id: 'audit', label: 'Audit Trail', icon: History },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-1.5 px-3.5 py-2.5 text-xs font-semibold border-b-2 transition ${
                  isActive
                    ? 'border-blue-500 text-white bg-blue-600/10'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-blue-400' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {/* TAB 1: TIMELINE */}
          {activeTab === 'timeline' && (
            <div className="space-y-4">
              {/* SLA & Time Status Card */}
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 bg-[#0d204a] border border-[#1b3874] rounded-xl">
                  <span className="text-[11px] text-slate-400 block">Trạng thái SLA</span>
                  <div className="flex items-center gap-1.5 mt-1 font-bold text-sm">
                    {caseItem.slaStatus === 'on_time' ? (
                      <span className="text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" /> Đúng hạn
                      </span>
                    ) : caseItem.slaStatus === 'due_soon' ? (
                      <span className="text-amber-400 flex items-center gap-1">
                        <Clock className="w-4 h-4" /> Sắp đến hạn ({caseItem.slaRemainingHours}h)
                      </span>
                    ) : (
                      <span className="text-rose-400 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" /> Quá hạn SLA ({Math.abs(caseItem.slaRemainingHours)}h)
                      </span>
                    )}
                  </div>
                </div>
                <div className="p-3 bg-[#0d204a] border border-[#1b3874] rounded-xl">
                  <span className="text-[11px] text-slate-400 block">Thời gian dừng máy (Downtime)</span>
                  <span className="font-mono font-bold text-amber-300 text-sm mt-1 block">
                    {caseItem.downtimeHours} giờ
                  </span>
                </div>
                <div className="p-3 bg-[#0d204a] border border-[#1b3874] rounded-xl">
                  <span className="text-[11px] text-slate-400 block">Tiến độ quy trình</span>
                  <span className="font-mono font-bold text-blue-400 text-sm mt-1 block">
                    {caseItem.stageProgressPercent}%
                  </span>
                </div>
              </div>

              {/* Journey Timeline Cards */}
              <div className="space-y-3 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-[#193262] pl-8">
                {/* 01 Incident Capture */}
                <div className="relative bg-[#0d204a] border border-[#1a3872] rounded-xl p-3.5 space-y-1.5">
                  <div className="absolute -left-8 top-3.5 w-6 h-6 rounded-full bg-emerald-600 flex items-center justify-center text-white text-xs font-bold">
                    1
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-white">01 Tiếp nhận & Phân loại Sự cố</span>
                    <span className="text-[11px] text-slate-400">{caseItem.occurrenceTime}</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    Báo cáo bởi: <strong className="text-white">{caseItem.reportedBy.name}</strong> ({caseItem.reportedBy.role} — {caseItem.reportedBy.vendor})
                  </p>
                  <div className="text-[11px] text-slate-400 bg-[#07132e] p-2 rounded-lg">
                    Hiện tượng: {caseItem.phenomenon[0]}
                  </div>
                </div>

                {/* 02 Technical Verification */}
                <div className="relative bg-[#0d204a] border border-[#1a3872] rounded-xl p-3.5 space-y-1.5">
                  <div className={`absolute -left-8 top-3.5 w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold ${
                    currentStageIndex >= 1 ? 'bg-emerald-600' : 'bg-[#183060]'
                  }`}>
                    2
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-white">02 Xác minh Kỹ thuật (Technical Verification)</span>
                    <span className="text-[11px] text-slate-400">
                      {caseItem.assignedExpert ? caseItem.assignedExpert.assignedAt : 'Chưa phân công'}
                    </span>
                  </div>
                  {caseItem.assignedExpert ? (
                    <div className="flex items-center gap-2 text-xs text-slate-300">
                      <img
                        src={caseItem.assignedExpert.avatar}
                        alt={caseItem.assignedExpert.name}
                        className="w-5 h-5 rounded-full object-cover"
                      />
                      <span>Chuyên gia: <strong className="text-white">{caseItem.assignedExpert.name}</strong> ({caseItem.assignedExpert.role})</span>
                    </div>
                  ) : (
                    <p className="text-xs text-amber-400 font-semibold">Chưa có chuyên gia thẩm định!</p>
                  )}
                  {caseItem.verifiedRootCause && (
                    <div className="text-[11px] text-emerald-300 bg-[#071d34] border border-emerald-500/20 p-2 rounded-lg">
                      Nguyên nhân gốc: {caseItem.verifiedRootCause} (Tin cậy: {caseItem.rootCauseConfidence}%)
                    </div>
                  )}
                </div>

                {/* 03 Knowledge Approval & Publishing */}
                <div className="relative bg-[#0d204a] border border-[#1a3872] rounded-xl p-3.5 space-y-1.5">
                  <div className={`absolute -left-8 top-3.5 w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold ${
                    currentStageIndex >= 2 ? 'bg-emerald-600' : 'bg-[#183060]'
                  }`}>
                    3
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-white">03 Phê duyệt & Ban hành SOP Chuẩn</span>
                    <span className="text-[11px] text-slate-400">
                      {caseItem.publishedArticle?.publishedDate || 'Đang thẩm tra'}
                    </span>
                  </div>
                  {caseItem.publishedArticle ? (
                    <div className="text-xs text-slate-300 flex items-center justify-between">
                      <span>Mã SOP: <strong className="text-cyan-300 font-mono">{caseItem.publishedArticle.articleId}</strong> ({caseItem.publishedArticle.version})</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-semibold">
                        Hiệu lực đến: {caseItem.publishedArticle.validUntilDate}
                      </span>
                    </div>
                  ) : (
                    <p className="text-xs text-slate-400">Đang chờ hoàn tất xác minh chuyên gia.</p>
                  )}
                </div>

                {/* 04 AI Recommendation */}
                <div className="relative bg-[#0d204a] border border-[#1a3872] rounded-xl p-3.5 space-y-1.5">
                  <div className={`absolute -left-8 top-3.5 w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold ${
                    currentStageIndex >= 3 ? 'bg-emerald-600' : 'bg-[#183060]'
                  }`}>
                    4
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-white">04 Đề xuất AI qua RAG & Giám sát Nguồn</span>
                    <span className="text-[11px] text-purple-300 font-bold">
                      {caseItem.aiRecommendation ? `${caseItem.aiRecommendation.confidenceScore}% Matching` : 'Sẵn sàng'}
                    </span>
                  </div>
                  {caseItem.aiRecommendation && (
                    <div className="text-[11px] text-slate-300 bg-[#12163b] p-2 rounded-lg border border-purple-500/20">
                      Trích dẫn từ: <strong className="text-white">{caseItem.aiRecommendation.sourceKnowledgeId}</strong>. Đã hỗ trợ xử lý {caseItem.aiRecommendation.similarCaseCount} ca tương đồng.
                    </div>
                  )}
                </div>

                {/* 05 Application */}
                <div className="relative bg-[#0d204a] border border-[#1a3872] rounded-xl p-3.5 space-y-1.5">
                  <div className={`absolute -left-8 top-3.5 w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold ${
                    currentStageIndex >= 4 ? 'bg-emerald-600' : 'bg-[#183060]'
                  }`}>
                    5
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-white">05 Áp dụng Thực tế trên Máy</span>
                    <span className="text-[11px] text-slate-400">{caseItem.applicationRecord?.appliedDate || 'Chưa áp dụng'}</span>
                  </div>
                  {caseItem.applicationRecord ? (
                    <p className="text-xs text-slate-300">
                      Thực hiện bởi: <strong className="text-white">{caseItem.applicationRecord.appliedBy}</strong> ({caseItem.applicationRecord.executionDurationMinutes} phút)
                    </p>
                  ) : (
                    <p className="text-xs text-slate-400">Đang chờ kỹ thuật viên ca máy triển khai.</p>
                  )}
                </div>

                {/* 06 Outcome Validation */}
                <div className="relative bg-[#0d204a] border border-[#1a3872] rounded-xl p-3.5 space-y-1.5">
                  <div className={`absolute -left-8 top-3.5 w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold ${
                    caseItem.outcomeValidation?.outcome === 'verified_successful'
                      ? 'bg-emerald-600'
                      : 'bg-[#183060]'
                  }`}>
                    6
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-white">06 Xác nhận Kết quả & Đóng Hồ sơ</span>
                    <span className="text-[11px] text-emerald-400 font-bold">
                      {caseItem.outcomeValidation ? 'ĐÃ ĐÁNH GIÁ' : 'CHỜ ĐÁNH GIÁ'}
                    </span>
                  </div>
                  {caseItem.outcomeValidation ? (
                    <div className="text-xs text-slate-300 bg-[#061e2b] p-2 rounded-lg border border-emerald-500/30 space-y-1">
                      <div>Thời gian chạy ổn định: <strong className="text-emerald-400 font-mono">{caseItem.outcomeValidation.operatingStabilityHours} giờ liên tục</strong></div>
                      <div>Tiết kiệm chi phí: <strong className="text-amber-300 font-mono">{caseItem.outcomeValidation.costSavingVND.toLocaleString()} VNĐ</strong></div>
                    </div>
                  ) : (
                    <p className="text-xs text-slate-400">Chờ theo dõi độ ổn định máy sau sửa chữa.</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: DIAGNOSTICS & EVIDENCE */}
          {activeTab === 'diagnostics' && (
            <div className="space-y-4">
              {/* Evidence Gallery */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-300 block">
                  Bằng chứng hiện trường ({caseItem.evidences.length})
                </span>
                <div className="grid grid-cols-2 gap-3">
                  {caseItem.evidences.map((ev) => (
                    <div
                      key={ev.id}
                      className="rounded-xl border border-[#1b346c] bg-[#07132e] overflow-hidden"
                    >
                      <img
                        src={ev.url}
                        alt={ev.name}
                        className="w-full h-36 object-cover"
                      />
                      <div className="p-2.5 space-y-1">
                        <span className="text-xs font-bold text-white block truncate">{ev.name}</span>
                        <div className="flex items-center justify-between text-[10px] text-slate-400">
                          <span>{ev.capturedBy}</span>
                          <span>{ev.capturedAt}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Inspection Steps Table */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-300 block">
                  Các bước kiểm tra thông số chi tiết
                </span>
                <div className="bg-[#091530] border border-[#1b3260] rounded-xl overflow-hidden">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#0d2250] text-slate-400 text-[11px]">
                      <tr>
                        <th className="p-2.5">Bước</th>
                        <th className="p-2.5">Nội dung kiểm tra</th>
                        <th className="p-2.5">Thông số chuẩn</th>
                        <th className="p-2.5">Thực tế</th>
                        <th className="p-2.5 text-center">Kết quả</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#132754]">
                      {caseItem.inspectionSteps.map((step) => (
                        <tr key={step.number} className="hover:bg-[#0c1c40]">
                          <td className="p-2.5 font-bold font-mono text-slate-400">{step.number}</td>
                          <td className="p-2.5 font-medium text-white">{step.title}</td>
                          <td className="p-2.5 text-slate-300 font-mono">{step.standard || '—'}</td>
                          <td className="p-2.5 text-amber-300 font-mono">{step.actual || '—'}</td>
                          <td className="p-2.5 text-center">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              step.isPassed
                                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                            }`}>
                              {step.isPassed ? 'PASS' : 'FAIL'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Safety Alert */}
              {caseItem.safetyAlert && (
                <div className="p-3.5 bg-amber-500/10 border border-amber-500/30 rounded-xl flex items-start gap-3">
                  <Shield className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-amber-300 block">Cảnh báo An toàn Vận hành</span>
                    <p className="text-xs text-amber-200/90 mt-0.5">{caseItem.safetyAlert}</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: KNOWLEDGE & AI */}
          {activeTab === 'knowledge' && (
            <div className="space-y-4">
              {caseItem.publishedArticle && (
                <div className="p-4 bg-[#0d204a] border border-[#1b3874] rounded-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-cyan-300 flex items-center gap-1.5">
                      <FileText className="w-4 h-4" /> Tài liệu SOP Chuẩn đã ban hành
                    </span>
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                      {caseItem.publishedArticle.version}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white">{caseItem.publishedArticle.articleId}</h4>
                  <div className="grid grid-cols-2 gap-3 text-xs text-slate-300 pt-2 border-t border-[#173062]">
                    <div>Ngày ban hành: <strong className="text-white">{caseItem.publishedArticle.publishedDate}</strong></div>
                    <div>Hết hạn hiệu lực: <strong className="text-amber-300">{caseItem.publishedArticle.validUntilDate}</strong></div>
                    <div>Người phê duyệt: <strong className="text-white">{caseItem.publishedArticle.approverName}</strong></div>
                    <div>Phạm vi chia sẻ: <strong className="text-white uppercase">{caseItem.publishedArticle.scope}</strong></div>
                  </div>
                </div>
              )}

              {caseItem.aiRecommendation && (
                <div className="p-4 bg-purple-950/20 border border-purple-500/30 rounded-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-purple-300 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4" /> Đề xuất AI qua Knowledge RAG Engine
                    </span>
                    <span className="text-xs font-mono font-bold text-emerald-400">
                      {caseItem.aiRecommendation.confidenceScore}% Matching Score
                    </span>
                  </div>
                  <p className="text-xs text-slate-300">
                    {caseItem.aiRecommendation.safetyNotice}
                  </p>
                  <div className="p-2.5 bg-[#08132c] rounded-lg text-xs text-slate-400 flex items-center justify-between">
                    <span>Độ tương đồng với {caseItem.aiRecommendation.similarCaseCount} ca trước đây</span>
                    <span className="text-emerald-400 font-semibold">Phản hồi: Hữu ích (100%)</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: APPLICATION & OUTCOME */}
          {activeTab === 'application' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 bg-[#0d204a] border border-[#1b3874] rounded-xl space-y-1">
                  <span className="text-xs text-slate-400">Giờ vận hành ổn định</span>
                  <span className="text-lg font-bold font-mono text-emerald-400 block">
                    {caseItem.outcomeValidation?.operatingStabilityHours || 0} giờ
                  </span>
                  <span className="text-[10px] text-slate-500">Liên tục không xuất hiện cảnh báo nhiệt</span>
                </div>
                <div className="p-3.5 bg-[#0d204a] border border-[#1b3874] rounded-xl space-y-1">
                  <span className="text-xs text-slate-400">Tiết kiệm chi phí dừng máy</span>
                  <span className="text-lg font-bold font-mono text-amber-300 block">
                    {caseItem.outcomeValidation?.costSavingVND
                      ? `${caseItem.outcomeValidation.costSavingVND.toLocaleString()} VNĐ`
                      : '0 VNĐ'}
                  </span>
                  <span className="text-[10px] text-slate-500">Giảm thời gian chết 2.75 giờ</span>
                </div>
              </div>

              {caseItem.outcomeValidation && (
                <div className="p-4 bg-[#091530] border border-[#1b3260] rounded-xl space-y-2">
                  <span className="text-xs font-bold text-white block">Biên bản Đánh giá Chuyên gia</span>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {caseItem.outcomeValidation.validationNotes}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-slate-400 pt-2 border-t border-[#132754]">
                    <span>Thẩm định bởi: <strong className="text-white">{caseItem.outcomeValidation.validatedBy}</strong></span>
                    <span>Ngày: <strong className="text-white">{caseItem.outcomeValidation.validatedDate}</strong></span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 5: AUDIT TRAIL */}
          {activeTab === 'audit' && (
            <div className="space-y-3">
              <span className="text-xs font-bold text-slate-300 block">
                Nhật ký truy vết & Kiểm toán Hồ sơ (Audit Trail)
              </span>
              <div className="space-y-2">
                {filteredLogs.length > 0 ? (
                  filteredLogs.map((log) => (
                    <div
                      key={log.id}
                      className="p-3 bg-[#091530] border border-[#1b3260] rounded-xl text-xs space-y-1"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono font-bold text-blue-400">{log.action}</span>
                        <span className="text-[10px] text-slate-400">{log.timestamp}</span>
                      </div>
                      <p className="text-slate-300">{log.details}</p>
                      <div className="text-[11px] text-slate-400 flex items-center justify-between pt-1 border-t border-[#13264c]">
                        <span>Thực hiện: <strong className="text-slate-200">{log.actorName}</strong> ({log.actorRole})</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                          Giai đoạn: {log.stage}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center text-slate-400 text-xs border border-dashed border-[#1a3468] rounded-xl">
                    Chưa có nhật ký kiểm toán mới cho hồ sơ này.
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Drawer Action Footer */}
        <div className="p-4 border-t border-[#162a54] bg-[#07132e] flex items-center justify-between">
          <div className="text-xs text-slate-400">
            Vai trò hiện tại: <strong className="text-blue-300 uppercase">{currentRole}</strong>
          </div>
          <div className="flex items-center gap-2">
            {(currentRole === 'knowledge_manager' || currentRole === 'admin') && (
              <button
                type="button"
                onClick={() => onOpenAssignModal(caseItem)}
                className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-blue-600/20 text-blue-300 hover:bg-blue-600/30 border border-blue-500/30 transition"
              >
                Phân công Chuyên gia
              </button>
            )}

            {(currentRole === 'technical_expert' || currentRole === 'knowledge_manager' || currentRole === 'admin') && (
              <button
                type="button"
                onClick={() => onOpenVerifyModal(caseItem)}
                className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-emerald-600/20 text-emerald-300 hover:bg-emerald-600/30 border border-emerald-500/30 transition"
              >
                Xác minh Kỹ thuật
              </button>
            )}

            <button
              type="button"
              onClick={() => onOpenValidationModal(caseItem)}
              className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 shadow-md shadow-blue-600/20 transition flex items-center gap-1.5"
            >
              <span>Xác thực Kết quả</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
