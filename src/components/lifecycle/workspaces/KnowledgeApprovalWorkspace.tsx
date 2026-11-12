import React from 'react';
import {
  FileText,
  CheckCircle2,
  Calendar,
  Share2,
  Lock,
  ArrowRight,
  ShieldCheck,
  Award,
  GitCompare,
  History,
  RotateCcw,
} from 'lucide-react';
import { LifecycleCase, UserRole } from '../../../types';

interface KnowledgeApprovalWorkspaceProps {
  cases: LifecycleCase[];
  selectedCase: LifecycleCase | null;
  onSelectCase: (c: LifecycleCase) => void;
  onApproveSop: (caseId: string) => void;
  onOpenVersionModal?: () => void;
  currentRole: UserRole;
}

export const KnowledgeApprovalWorkspace: React.FC<KnowledgeApprovalWorkspaceProps> = ({
  cases,
  selectedCase,
  onSelectCase,
  onApproveSop,
  onOpenVersionModal,
  currentRole,
}) => {
  const stageCases = cases.filter((c) => c.currentStage === 'knowledge_approval');
  const activeCase =
    selectedCase?.currentStage === 'knowledge_approval' ? selectedCase : stageCases[0] || cases[0];

  return (
    <div className="space-y-4 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="bg-[#0b1b42] border border-[#162c5e] rounded-2xl p-4 text-white flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center text-cyan-400">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs px-2 py-0.5 rounded font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-400/30">
                STAGE 03
              </span>
              <h2 className="font-bold text-base text-white">Phê duyệt & Ban hành SOP Chuẩn (Knowledge Approval & Publishing)</h2>
            </div>
            <p className="text-xs text-[#9eb6e2] mt-0.5">
              Kiểm duyệt tính chuẩn hóa, quản lý phiên bản tài liệu (v1.0 → v2.0 → v2.1), so sánh diff thay đổi, thiết lập hạn hiệu lực và phạm vi chia sẻ đa Vendor.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {onOpenVersionModal && (
            <button
              onClick={onOpenVersionModal}
              className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-[#142d62] hover:bg-[#1e4390] text-cyan-300 border border-cyan-400/30 transition flex items-center gap-1.5"
            >
              <GitCompare className="w-3.5 h-3.5" />
              <span>So sánh phiên bản (Diff)</span>
            </button>
          )}
          <span className="text-xs text-slate-300">Phụ trách: <strong className="text-cyan-300">Content Approver</strong></span>
        </div>
      </div>

      {/* Grid: Queue & Publishing Workbench */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left Col: Queue */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-3.5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-bold text-xs text-slate-800 uppercase tracking-wider">
              Chờ duyệt xuất bản ({stageCases.length})
            </span>
            <span className="text-[11px] font-mono text-blue-600 font-bold">Chuẩn hóa SOP</span>
          </div>

          <div className="space-y-2">
            {stageCases.length > 0 ? (
              stageCases.map((c) => {
                const isSelected = activeCase?.id === c.id;
                return (
                  <div
                    key={c.id}
                    onClick={() => onSelectCase(c)}
                    className={`p-3 rounded-xl border cursor-pointer transition text-xs space-y-1.5 ${
                      isSelected
                        ? 'bg-cyan-50/80 border-cyan-500 shadow-xs ring-1 ring-cyan-400'
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-cyan-700">{c.id}</span>
                      <span className="font-mono text-[10px] px-1.5 py-0.2 rounded bg-cyan-100 text-cyan-800 font-bold">
                        {c.publishedArticle?.version || 'v2.1'}
                      </span>
                    </div>
                    <p className="font-bold text-slate-800 line-clamp-1">{c.title}</p>
                    <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-100">
                      <span>{c.equipmentId} ({c.model})</span>
                      <span className="text-emerald-600 font-semibold">Đã xác minh</span>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="py-8 text-center text-slate-400 text-xs border border-dashed border-slate-200 rounded-xl">
                Không có tài liệu chờ phê duyệt tại Stage 03.
              </div>
            )}
          </div>
        </div>

        {/* Right 2 Cols: Publishing Controls */}
        {activeCase ? (
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/90 shadow-xs p-4 lg:p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="font-mono text-xs px-2 py-0.5 rounded font-bold bg-cyan-50 text-cyan-700 border border-cyan-200">
                  {activeCase.publishedArticle?.articleId || `SOP-${activeCase.category.toUpperCase()}-${activeCase.errorCode}`}
                </span>
                <h3 className="font-bold text-base text-slate-800 mt-1">{activeCase.title}</h3>
              </div>
              <div className="flex items-center gap-2">
                {onOpenVersionModal && (
                  <button
                    onClick={onOpenVersionModal}
                    className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition flex items-center gap-1"
                  >
                    <History className="w-3.5 h-3.5 text-blue-600" />
                    <span>Lịch sử phiên bản</span>
                  </button>
                )}
                <span className="font-mono font-bold text-sm text-cyan-700 px-3 py-1 rounded-xl bg-cyan-50 border border-cyan-200">
                  {activeCase.publishedArticle?.version || 'v2.1'}
                </span>
              </div>
            </div>

            {/* Checklist 4 tiêu chuẩn kiểm duyệt */}
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 space-y-2 text-xs">
              <span className="font-bold text-slate-700 block">Tiêu chí chuẩn hóa tài liệu công nghiệp:</span>
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div className="flex items-center gap-2 p-2 bg-white rounded-lg border border-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>1. Nội dung rõ ràng, đủ 5 bước</span>
                </div>
                <div className="flex items-center gap-2 p-2 bg-white rounded-lg border border-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>2. An toàn tuyệt đối (Có LOTO)</span>
                </div>
                <div className="flex items-center gap-2 p-2 bg-white rounded-lg border border-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>3. Có ảnh chụp thực tế hiện trường</span>
                </div>
                <div className="flex items-center gap-2 p-2 bg-white rounded-lg border border-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>4. Tính khả thi trên toàn bộ Line</span>
                </div>
              </div>
            </div>

            {/* Validity & Sharing Scope Settings */}
            <div className="grid grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-xl border border-slate-200 space-y-1">
                <span className="text-slate-400 text-[11px] flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-blue-500" /> Thời hạn hiệu lực
                </span>
                <span className="font-bold text-slate-700 block">
                  {activeCase.publishedArticle?.validUntilDate || '12/01/2026 (12 tháng)'}
                </span>
              </div>
              <div className="p-3 rounded-xl border border-slate-200 space-y-1">
                <span className="text-slate-400 text-[11px] flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-amber-500" /> Lịch xét duyệt định kỳ
                </span>
                <span className="font-bold text-amber-700 block">
                  {activeCase.publishedArticle?.reviewScheduledDate || '20/02/2025 (6 tháng)'}
                </span>
              </div>
              <div className="p-3 rounded-xl border border-slate-200 space-y-1">
                <span className="text-slate-400 text-[11px] flex items-center gap-1">
                  <Share2 className="w-3.5 h-3.5 text-blue-500" /> Phạm vi chia sẻ tri thức
                </span>
                <span className="font-bold text-emerald-700 block uppercase">
                  {activeCase.publishedArticle?.scope === 'shared' ? 'Chia sẻ toàn bộ 7 Vendor' : 'Nội bộ xưởng'}
                </span>
              </div>
            </div>

            {/* Action */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
              <div className="text-[11px] text-slate-400">
                Tài liệu sẽ được ký số và tự động lập chỉ mục cho AI Assistant.
              </div>
              <button
                onClick={() => onApproveSop(activeCase.id)}
                className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 shadow-md shadow-cyan-500/20 transition flex items-center gap-2"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Phê duyệt & Xuất bản vào Thư viện SOP chuẩn</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};
