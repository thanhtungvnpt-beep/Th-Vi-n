import React from 'react';
import {
  Award,
  CheckCircle2,
  Clock,
  DollarSign,
  TrendingDown,
  RefreshCw,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  Check,
} from 'lucide-react';
import { LifecycleCase, UserRole, ValidationOutcome } from '../../../types';

interface OutcomeValidationWorkspaceProps {
  cases: LifecycleCase[];
  selectedCase: LifecycleCase | null;
  onSelectCase: (c: LifecycleCase) => void;
  onOpenValidationModal: (c: LifecycleCase) => void;
  onCloseCaseSuccessfully: (caseId: string) => void;
  currentRole: UserRole;
}

export const OutcomeValidationWorkspace: React.FC<OutcomeValidationWorkspaceProps> = ({
  cases,
  selectedCase,
  onSelectCase,
  onOpenValidationModal,
  onCloseCaseSuccessfully,
  currentRole,
}) => {
  const stageCases = cases.filter((c) => c.currentStage === 'outcome_validation');
  const activeCase =
    selectedCase?.currentStage === 'outcome_validation' ? selectedCase : stageCases[0] || cases[0];

  return (
    <div className="space-y-4 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="bg-[#0b1b42] border border-[#162c5e] rounded-2xl p-4 text-white flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-indigo-400">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs px-2 py-0.5 rounded font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
                STAGE 06
              </span>
              <h2 className="font-bold text-base text-white">Xác thực Hiệu quả & Nghiệm thu Đóng Hồ sơ (Outcome Validation)</h2>
            </div>
            <p className="text-xs text-[#9eb6e2] mt-0.5">
              Đo lường thời gian chạy ổn định (48h–72h), xác nhận dứt điểm tái diễn, tính toán chi phí tiết kiệm và chính thức đóng hồ sơ.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-300">Phụ trách: <strong className="text-indigo-300">Technical Expert & KM</strong></span>
          {activeCase && (
            <button
              onClick={() => onOpenValidationModal(activeCase)}
              className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 transition shadow-md flex items-center gap-1.5"
            >
              <Award className="w-3.5 h-3.5" />
              <span>Thẩm định nghiệm thu</span>
            </button>
          )}
        </div>
      </div>

      {/* Grid: Queue & Outcome Validation Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left Col: Queue */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-3.5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-bold text-xs text-slate-800 uppercase tracking-wider">
              Chờ xác thực độ ổn định ({stageCases.length})
            </span>
            <span className="text-[11px] font-mono text-indigo-600 font-bold">Theo dõi 48h</span>
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
                        ? 'bg-indigo-50/80 border-indigo-500 shadow-xs ring-1 ring-indigo-400'
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-indigo-700">{c.id}</span>
                      <span className="font-mono text-[10px] px-1.5 py-0.2 rounded bg-indigo-100 text-indigo-800 font-bold">
                        {c.outcomeValidation?.operatingStabilityHours || 48}h
                      </span>
                    </div>
                    <p className="font-bold text-slate-800 line-clamp-1">{c.title}</p>
                    <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-100">
                      <span>{c.equipmentId}</span>
                      <span className="text-emerald-600 font-bold">
                        {c.outcomeValidation?.outcome === 'verified_successful' ? 'Đạt chuẩn' : 'Chờ nghiệm thu'}
                      </span>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="py-8 text-center text-slate-400 text-xs border border-dashed border-slate-200 rounded-xl">
                Không có hồ sơ chờ nghiệm thu tại Stage 06.
              </div>
            )}
          </div>
        </div>

        {/* Right 2 Cols: Quantitative Outcome Workbench */}
        {activeCase ? (
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/90 shadow-xs p-4 lg:p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="font-mono text-xs px-2 py-0.5 rounded font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                  {activeCase.id} — {activeCase.equipmentId} ({activeCase.model})
                </span>
                <h3 className="font-bold text-base text-slate-800 mt-1">{activeCase.title}</h3>
              </div>
              <span className={`font-bold text-xs px-3 py-1 rounded-xl uppercase ${
                activeCase.outcomeValidation?.outcome === 'verified_successful'
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                  : 'bg-amber-100 text-amber-800 border border-amber-300'
              }`}>
                {activeCase.outcomeValidation?.outcome === 'verified_successful' ? 'Đã đạt nghiệm thu' : 'Đang theo dõi máy'}
              </span>
            </div>

            {/* 4 Quantitative Validation Metrics Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <span className="text-[11px] text-slate-500 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-blue-500" /> Giờ chạy ổn định
                </span>
                <span className="text-lg font-black font-mono text-slate-800 block">
                  {activeCase.outcomeValidation?.operatingStabilityHours || 48}h
                </span>
                <span className="text-[10px] text-emerald-600 font-semibold">Liên tục không báo lỗi</span>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <span className="text-[11px] text-slate-500 flex items-center gap-1">
                  <TrendingDown className="w-3.5 h-3.5 text-emerald-500" /> MTTR thực tế
                </span>
                <span className="text-lg font-black font-mono text-emerald-600 block">
                  {activeCase.outcomeValidation?.mttrActualHours || 0.75}h
                </span>
                <span className="text-[10px] text-emerald-600 font-semibold">Giảm 75% so với chuẩn</span>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <span className="text-[11px] text-slate-500 flex items-center gap-1">
                  <RefreshCw className="w-3.5 h-3.5 text-purple-500" /> Tái diễn sự cố
                </span>
                <span className="text-lg font-black font-mono text-emerald-600 block">
                  0 LẦN
                </span>
                <span className="text-[10px] text-emerald-600 font-semibold">Giải quyết dứt điểm</span>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <span className="text-[11px] text-slate-500 flex items-center gap-1">
                  <DollarSign className="w-3.5 h-3.5 text-amber-500" /> Tiết kiệm chi phí
                </span>
                <span className="text-sm font-black font-mono text-amber-600 block truncate">
                  {activeCase.outcomeValidation?.costSavingVND
                    ? `${(activeCase.outcomeValidation.costSavingVND / 1000000).toFixed(0)} tr VNĐ`
                    : '35 tr VNĐ'}
                </span>
                <span className="text-[10px] text-slate-400">Dừng máy tránh được</span>
              </div>
            </div>

            {/* Expert Evaluation Report */}
            <div className="p-4 bg-indigo-50/50 rounded-xl border border-indigo-200 space-y-2 text-xs">
              <span className="font-bold text-indigo-900 block">Biên bản nghiệm thu của Chuyên gia & Quản lý tri thức:</span>
              <p className="text-slate-700 leading-relaxed">
                {activeCase.outcomeValidation?.validationNotes ||
                  'Máy đã chạy liên tục 4 ca sản xuất không phát sinh cảnh báo nhiệt độ. Quy trình SOP-CNC-M800-E210 đạt chuẩn đóng hồ sơ và lưu trữ làm tài liệu chuẩn mực.'}
              </p>
              <div className="flex items-center gap-4 text-slate-500 text-[11px] pt-2 border-t border-indigo-100">
                <span>Người nghiệm thu: <strong className="text-slate-700">{activeCase.outcomeValidation?.validatedBy || 'Nguyễn Văn A (Technical Expert)'}</strong></span>
                <span>Ngày xác nhận: <strong className="text-slate-700">{activeCase.outcomeValidation?.validatedDate || 'Hôm nay'}</strong></span>
              </div>
            </div>

            {/* Action */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
              <button
                onClick={() => onCloseCaseSuccessfully(activeCase.id)}
                className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-emerald-600 to-indigo-600 hover:from-emerald-500 hover:to-indigo-500 shadow-md shadow-indigo-500/20 transition flex items-center gap-2"
              >
                <Check className="w-4 h-4" />
                <span>Hoàn tất nghiệm thu & Đóng hồ sơ vòng đời (Close Case)</span>
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};
