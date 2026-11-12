import React, { useState } from 'react';
import {
  Users,
  AlertOctagon,
  Clock,
  ShieldAlert,
  ArrowRight,
  UserCheck,
  CheckCircle2,
  Calendar,
  AlertTriangle,
  RotateCcw,
  Zap,
  Filter,
  Layers,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';
import { LifecycleCase, UserRole, LifecycleQualityAlert } from '../../../types';
import {
  TECHNICAL_EXPERTS_LIST,
  CONTENT_APPROVERS_LIST,
  ESCALATION_QUEUE,
  REVIEW_SCHEDULES_LIST,
} from '../../../data/mockData';

interface KnowledgeManagerWorkspaceProps {
  cases: LifecycleCase[];
  qualityAlerts: LifecycleQualityAlert[];
  onOpenAssignModal: (c: LifecycleCase) => void;
  onOpenCaseDrawer: (c: LifecycleCase) => void;
  onEscalateCase: (caseId: string, reason: string) => void;
  currentRole: UserRole;
}

export const KnowledgeManagerWorkspace: React.FC<KnowledgeManagerWorkspaceProps> = ({
  cases,
  qualityAlerts,
  onOpenAssignModal,
  onOpenCaseDrawer,
  onEscalateCase,
  currentRole,
}) => {
  const [activeTab, setActiveTab] = useState<'workload' | 'unassigned' | 'overdue' | 'escalations' | 'reviews'>('workload');
  const [escalations, setEscalations] = useState(ESCALATION_QUEUE);

  // Derived filtered queues
  const unassignedCases = cases.filter((c) => !c.assignedExpert && c.currentStage === 'incident_capture');
  const overdueCases = cases.filter((c) => c.slaStatus === 'overdue');
  const dueSoonCases = cases.filter((c) => c.slaStatus === 'due_soon');

  const handleResolveEscalation = (escId: string) => {
    setEscalations((prev) => prev.filter((e) => e.id !== escId));
  };

  return (
    <div className="space-y-4 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="bg-[#0b1b42] border border-[#162c5e] rounded-2xl p-4 text-white flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-400/30 flex items-center justify-center text-blue-400">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs px-2 py-0.5 rounded font-bold bg-blue-500/20 text-cyan-300 border border-cyan-400/30">
                KM MANAGEMENT WORKSPACE
              </span>
              <h2 className="font-bold text-base text-white">Bàn Làm Việc Chủ Quản Vòng Đời Tri Thức (Knowledge Manager)</h2>
            </div>
            <p className="text-xs text-[#9eb6e2] mt-0.5">
              Giám sát tồn đọng toàn trình, phân công chuyên gia, điều phối cân bằng tải, thiết lập SLA và giải quyết leo thang rủi ro.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <span className="text-slate-300">Vai trò điều hành: <strong className="text-cyan-300 uppercase">{currentRole}</strong></span>
        </div>
      </div>

      {/* 4 Quick Stat Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-white rounded-xl p-3 border border-slate-200/90 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 block">Tổng tồn đọng quy trình</span>
            <span className="text-xl font-black font-mono text-slate-800">{cases.length} hồ sơ</span>
          </div>
          <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 font-bold">
            <Layers className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-3 border border-slate-200/90 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 block">Chưa phân công</span>
            <span className="text-xl font-black font-mono text-amber-600">{unassignedCases.length} ca</span>
          </div>
          <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 font-bold">
            <UserCheck className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-rose-50/80 rounded-xl p-3 border border-rose-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-rose-600 font-bold block">Quá hạn SLA</span>
            <span className="text-xl font-black font-mono text-rose-700">{overdueCases.length} ca</span>
          </div>
          <div className="w-9 h-9 rounded-xl bg-rose-100 border border-rose-300 flex items-center justify-center text-rose-600 font-bold">
            <AlertOctagon className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-3 border border-slate-200/90 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 block">Cảnh báo chất lượng</span>
            <span className="text-xl font-black font-mono text-purple-600">{qualityAlerts.length} mục</span>
          </div>
          <div className="w-9 h-9 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-600 font-bold">
            <ShieldAlert className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="bg-white rounded-xl border border-slate-200/90 p-1 flex items-center gap-1 overflow-x-auto text-xs">
        {[
          { id: 'workload', label: 'Tải công việc Đội ngũ (Workload Matrix)' },
          { id: 'unassigned', label: `Chờ phân công (${unassignedCases.length})` },
          { id: 'overdue', label: `Quá hạn & Sắp đến hạn (${overdueCases.length + dueSoonCases.length})` },
          { id: 'escalations', label: `Hàng đợi Leo thang (${escalations.length})` },
          { id: 'reviews', label: `Lịch rà soát định kỳ (${REVIEW_SCHEDULES_LIST.length})` },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-3 py-1.5 rounded-lg font-bold transition whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: WORKLOAD MATRIX */}
      {activeTab === 'workload' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Technical Experts Workload */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-4 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="font-bold text-xs text-slate-800 uppercase tracking-wider flex items-center gap-2">
                <Users className="w-4 h-4 text-blue-600" />
                Tải công việc Chuyên gia Kỹ thuật (Technical Experts)
              </span>
              <span className="text-[11px] text-slate-400">Ngưỡng: 5 ca/người</span>
            </div>

            <div className="space-y-3">
              {TECHNICAL_EXPERTS_LIST.map((exp) => {
                const percent = Math.min(100, (exp.activeCases / 5) * 100);
                return (
                  <div key={exp.id} className="p-3 rounded-xl border border-slate-100 bg-slate-50/60 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <img src={exp.avatar} alt={exp.name} className="w-8 h-8 rounded-full object-cover border" />
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-slate-800">{exp.name}</span>
                            <span className="text-[10px] px-1.5 py-0.2 rounded font-mono font-bold bg-blue-100 text-blue-800">
                              {exp.vendor}
                            </span>
                          </div>
                          <span className="text-slate-400 text-[11px]">{exp.role} • Xưởng {exp.factory}</span>
                        </div>
                      </div>
                      <span className="font-mono font-bold text-slate-800 text-sm">{exp.activeCases}/5 ca</span>
                    </div>

                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${
                          percent >= 80 ? 'bg-rose-500' : percent >= 60 ? 'bg-amber-500' : 'bg-emerald-500'
                        }`}
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Content Approvers Workload */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-4 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="font-bold text-xs text-slate-800 uppercase tracking-wider flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-600" />
                Tải công việc Người Phê duyệt Nội dung (Content Approvers)
              </span>
              <span className="text-[11px] text-slate-400">Ngưỡng: 5 ca/người</span>
            </div>

            <div className="space-y-3">
              {CONTENT_APPROVERS_LIST.map((appr) => {
                const percent = Math.min(100, (appr.activeCases / appr.maxCapacity) * 100);
                return (
                  <div key={appr.id} className="p-3 rounded-xl border border-slate-100 bg-slate-50/60 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <img src={appr.avatar} alt={appr.name} className="w-8 h-8 rounded-full object-cover border" />
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-slate-800">{appr.name}</span>
                            <span className="text-[10px] px-1.5 py-0.2 rounded font-mono font-bold bg-cyan-100 text-cyan-800">
                              {appr.vendor}
                            </span>
                          </div>
                          <span className="text-slate-400 text-[11px]">{appr.role} • Xưởng {appr.factory}</span>
                        </div>
                      </div>
                      <span className="font-mono font-bold text-slate-800 text-sm">{appr.activeCases}/{appr.maxCapacity} ca</span>
                    </div>

                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${
                          percent >= 80 ? 'bg-rose-500' : percent >= 60 ? 'bg-amber-500' : 'bg-cyan-500'
                        }`}
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: UNASSIGNED QUEUE */}
      {activeTab === 'unassigned' && (
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-4 space-y-3">
          <span className="font-bold text-xs text-slate-800 uppercase tracking-wider block">
            Hồ sơ chưa phân công chuyên gia kỹ thuật ({unassignedCases.length})
          </span>

          <div className="space-y-2">
            {unassignedCases.length > 0 ? (
              unassignedCases.map((c) => (
                <div
                  key={c.id}
                  className="p-3.5 rounded-xl border border-amber-200 bg-amber-50/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-blue-700">{c.id}</span>
                      <span className="font-mono text-[10px] px-1.5 py-0.2 rounded bg-amber-100 text-amber-800 font-bold">
                        {c.errorCode}
                      </span>
                      <span className="font-bold text-slate-800">{c.title}</span>
                    </div>
                    <div className="text-slate-500 text-[11px] flex items-center gap-3">
                      <span>Thiết bị: <strong className="text-slate-700">{c.equipmentId} ({c.model})</strong></span>
                      <span>Xưởng: <strong className="text-slate-700">{c.factory} — {c.line}</strong></span>
                      <span>Thời điểm: {c.occurrenceTime}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onOpenCaseDrawer(c)}
                      className="px-3 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 font-semibold"
                    >
                      Xem chi tiết
                    </button>
                    <button
                      onClick={() => onOpenAssignModal(c)}
                      className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold transition flex items-center gap-1.5"
                    >
                      <UserCheck className="w-3.5 h-3.5" />
                      <span>Phân công chuyên gia</span>
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-8 text-center text-slate-400 text-xs border border-dashed border-slate-200 rounded-xl">
                Tất cả hồ sơ sự cố đã được phân công đầy đủ!
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 3: OVERDUE & DUE SOON */}
      {activeTab === 'overdue' && (
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-4 space-y-3">
          <span className="font-bold text-xs text-rose-700 uppercase tracking-wider block">
            Hồ sơ quá hạn cam kết SLA & Cần hành động khẩn ({overdueCases.length + dueSoonCases.length})
          </span>

          <div className="space-y-2">
            {[...overdueCases, ...dueSoonCases].map((c) => (
              <div
                key={c.id}
                className={`p-3.5 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs ${
                  c.slaStatus === 'overdue'
                    ? 'bg-rose-50/70 border-rose-300'
                    : 'bg-amber-50/60 border-amber-300'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-slate-800">{c.id}</span>
                    <span className="font-mono text-[10px] px-1.5 py-0.2 rounded bg-white text-slate-800 font-bold border">
                      {c.errorCode}
                    </span>
                    <span className="font-bold text-slate-800">{c.title}</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-600 text-[11px]">
                    <span>Công đoạn: <strong className="text-blue-700">{c.currentStage}</strong></span>
                    <span>Phụ trách: <strong>{c.assignedExpert?.name || 'Chưa phân công'}</strong></span>
                    <span className={c.slaStatus === 'overdue' ? 'text-rose-700 font-bold' : 'text-amber-700 font-bold'}>
                      {c.slaStatus === 'overdue' ? `Quá hạn ${Math.abs(c.slaRemainingHours)}h` : `Còn ${c.slaRemainingHours}h`}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onOpenCaseDrawer(c)}
                    className="px-3 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 font-semibold"
                  >
                    Hồ sơ
                  </button>
                  <button
                    onClick={() => onEscalateCase(c.id, `Hồ sơ ${c.id} quá hạn SLA ${Math.abs(c.slaRemainingHours)}h tại ${c.currentStage}.`)}
                    className="px-3.5 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold transition flex items-center gap-1.5"
                  >
                    <AlertOctagon className="w-3.5 h-3.5" />
                    <span>Bật leo thang khẩn cấp</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: ESCALATIONS QUEUE */}
      {activeTab === 'escalations' && (
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-4 space-y-3">
          <span className="font-bold text-xs text-rose-800 uppercase tracking-wider block">
            Hàng đợi hồ sơ leo thang cấp quản lý (Escalations Queue)
          </span>

          <div className="space-y-2">
            {escalations.length > 0 ? (
              escalations.map((esc) => (
                <div
                  key={esc.id}
                  className="p-3.5 rounded-xl border border-rose-300 bg-rose-50/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-rose-700">{esc.id}</span>
                      <span className="font-mono font-bold text-blue-700">({esc.caseId})</span>
                      <span className="px-2 py-0.2 rounded font-bold uppercase text-[10px] bg-rose-200 text-rose-800">
                        {esc.severity}
                      </span>
                      <span className="text-slate-400 text-[11px]">{esc.escalatedAt}</span>
                    </div>
                    <p className="font-medium text-slate-800">{esc.escalationReason}</p>
                    <div className="text-[11px] text-slate-500 flex items-center gap-3">
                      <span>Người kích hoạt: <strong>{esc.escalatedBy}</strong></span>
                      <span>Chủ quản thụ lý: <strong>{esc.assignedManager}</strong></span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleResolveEscalation(esc.id)}
                      className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition flex items-center gap-1"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Xác nhận giải quyết</span>
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-8 text-center text-slate-400 text-xs border border-dashed border-slate-200 rounded-xl">
                Không có cảnh báo leo thang nào đang tồn đọng.
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 5: REVIEWS SCHEDULE */}
      {activeTab === 'reviews' && (
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-4 space-y-3">
          <span className="font-bold text-xs text-slate-800 uppercase tracking-wider block">
            Lịch rà soát và đánh giá hiệu lực tài liệu định kỳ (Review Schedules)
          </span>

          <div className="space-y-2">
            {REVIEW_SCHEDULES_LIST.map((rev) => (
              <div
                key={rev.id}
                className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-blue-700">{rev.documentId}</span>
                    <span className="font-mono text-[10px] px-1.5 py-0.2 rounded bg-blue-100 text-blue-800 font-bold">
                      {rev.version}
                    </span>
                    <span className={`px-2 py-0.2 rounded font-bold text-[10px] uppercase ${
                      rev.status === 'expired' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {rev.status === 'expired' ? 'HẾT HIỆU LỰC' : 'CẦN XEM XÉT'}
                    </span>
                  </div>
                  <p className="font-bold text-slate-800">{rev.title}</p>
                  <div className="text-[11px] text-slate-500 flex items-center gap-3">
                    <span>Hạn rà soát: <strong className="text-amber-700">{rev.reviewDueDate}</strong></span>
                    <span>Hãng: {rev.vendor}</span>
                    <span>Người thẩm định: {rev.assignedReviewer}</span>
                  </div>
                </div>

                <button
                  onClick={() => alert(`Đã gửi yêu cầu rà soát lại tài liệu ${rev.documentId} cho ${rev.assignedReviewer}.`)}
                  className="px-3.5 py-1.5 rounded-lg border border-blue-300 bg-white hover:bg-blue-50 text-blue-700 font-bold transition flex items-center gap-1.5"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Kích hoạt rà soát</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
