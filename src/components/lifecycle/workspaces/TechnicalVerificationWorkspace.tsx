import React, { useState } from 'react';
import {
  FileCheck2,
  CheckCircle2,
  AlertTriangle,
  Sliders,
  Shield,
  Layers,
  ArrowRight,
  UserCheck,
  Clock,
  Camera,
} from 'lucide-react';
import { LifecycleCase, UserRole } from '../../../types';

interface TechnicalVerificationWorkspaceProps {
  cases: LifecycleCase[];
  selectedCase: LifecycleCase | null;
  onSelectCase: (c: LifecycleCase) => void;
  onOpenVerifyModal: (c: LifecycleCase) => void;
  onOpenAssignModal: (c: LifecycleCase) => void;
  currentRole: UserRole;
}

export const TechnicalVerificationWorkspace: React.FC<TechnicalVerificationWorkspaceProps> = ({
  cases,
  selectedCase,
  onSelectCase,
  onOpenVerifyModal,
  onOpenAssignModal,
  currentRole,
}) => {
  const stageCases = cases.filter((c) => c.currentStage === 'technical_verification');
  const activeCase =
    selectedCase?.currentStage === 'technical_verification' ? selectedCase : stageCases[0] || cases[0];

  return (
    <div className="space-y-4 animate-in fade-in duration-200">
      {/* Workspace Header Banner */}
      <div className="bg-[#0b1b42] border border-[#162c5e] rounded-2xl p-4 text-white flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-400">
            <FileCheck2 className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs px-2 py-0.5 rounded font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                STAGE 02
              </span>
              <h2 className="font-bold text-base text-white">Xác minh Kỹ thuật & Thẩm tra Nguyên nhân (Technical Verification)</h2>
            </div>
            <p className="text-xs text-[#9eb6e2] mt-0.5">
              Chuyên gia thẩm định nguyên nhân gốc rễ, đối soát thông số tiêu chuẩn, kiểm tra chứng cứ và đảm bảo an toàn vận hành.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-300">Phụ trách: <strong className="text-emerald-400">Technical Expert</strong></span>
          {activeCase && (
            <button
              onClick={() => onOpenVerifyModal(activeCase)}
              className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 transition shadow-md flex items-center gap-1.5"
            >
              <FileCheck2 className="w-3.5 h-3.5" />
              <span>Mở form thẩm định chuyên sâu</span>
            </button>
          )}
        </div>
      </div>

      {/* Grid: Cases Queue (1 col) + Inspection Workbench (2 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left Col: Queue */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-3.5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-bold text-xs text-slate-800 uppercase tracking-wider">
              Hồ sơ chờ thẩm định ({stageCases.length})
            </span>
            <span className="text-[11px] font-mono text-amber-600 font-bold">SLA: 24h</span>
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
                        ? 'bg-emerald-50/80 border-emerald-500 shadow-xs ring-1 ring-emerald-400'
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-emerald-700">{c.id}</span>
                      <span className="font-mono text-[10px] px-1.5 py-0.2 rounded bg-amber-100 text-amber-800 font-bold">
                        {c.errorCode}
                      </span>
                    </div>
                    <p className="font-bold text-slate-800 line-clamp-1">{c.title}</p>
                    <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-100">
                      <span>{c.assignedExpert ? c.assignedExpert.name : 'Chưa phân công'}</span>
                      <span className="text-amber-600 font-bold">Còn {c.slaRemainingHours}h</span>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="py-8 text-center text-slate-400 text-xs border border-dashed border-slate-200 rounded-xl">
                Không có hồ sơ chờ thẩm định tại Stage 02.
              </div>
            )}
          </div>
        </div>

        {/* Right 2 Cols: Workbench */}
        {activeCase ? (
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/90 shadow-xs p-4 lg:p-5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-xs text-emerald-700 px-2 py-0.5 rounded bg-emerald-50 border border-emerald-200">
                    {activeCase.id}
                  </span>
                  <span className="font-mono text-xs px-2 py-0.5 rounded font-bold bg-amber-50 text-amber-700 border border-amber-200">
                    {activeCase.errorCode}
                  </span>
                  <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                    {activeCase.equipmentId} ({activeCase.model})
                  </span>
                </div>
                <h3 className="font-bold text-base text-slate-800 mt-1.5">{activeCase.title}</h3>
              </div>

              <div className="text-right text-xs">
                {activeCase.assignedExpert ? (
                  <div className="flex items-center gap-2">
                    <img src={activeCase.assignedExpert.avatar} alt={activeCase.assignedExpert.name} className="w-7 h-7 rounded-full object-cover border" />
                    <div className="text-left">
                      <span className="font-bold text-slate-800 block">{activeCase.assignedExpert.name}</span>
                      <span className="text-slate-400 text-[10px]">Chuyên gia thẩm tra</span>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => onOpenAssignModal(activeCase)}
                    className="px-3 py-1 rounded-lg text-xs font-semibold bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 transition"
                  >
                    + Phân công chuyên gia
                  </button>
                )}
              </div>
            </div>

            {/* Inspection Checklist Table */}
            <div className="space-y-2">
              <span className="font-bold text-xs text-slate-700 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-blue-500" />
                Hạng mục kiểm tra & Đo kiểm thông số kỹ thuật (Inspection Checklist)
              </span>

              <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 text-slate-500 text-[11px] font-semibold">
                    <tr>
                      <th className="p-2.5">Bước</th>
                      <th className="p-2.5">Nội dung</th>
                      <th className="p-2.5">Thông số chuẩn</th>
                      <th className="p-2.5">Thực tế</th>
                      <th className="p-2.5 text-center">Kết luận</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {activeCase.inspectionSteps.map((s) => (
                      <tr key={s.number} className="hover:bg-slate-50/50">
                        <td className="p-2.5 font-mono font-bold text-slate-400">{s.number}</td>
                        <td className="p-2.5 font-medium text-slate-800">{s.title}</td>
                        <td className="p-2.5 font-mono text-slate-600">{s.standard || '—'}</td>
                        <td className="p-2.5 font-mono text-amber-600 font-bold">{s.actual || '—'}</td>
                        <td className="p-2.5 text-center">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            s.isPassed
                              ? 'bg-emerald-100 text-emerald-700'
                              : 'bg-rose-100 text-rose-700'
                          }`}>
                            {s.isPassed ? 'PASS' : 'FAIL'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Verified Root Cause & Confidence */}
            <div className="p-3.5 bg-emerald-50/60 border border-emerald-200 rounded-xl space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-emerald-800 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Nguyên nhân gốc rễ đã xác minh (Verified Root Cause)
                </span>
                <span className="font-mono font-bold text-emerald-700">
                  Độ tin cậy: {activeCase.rootCauseConfidence || 95}%
                </span>
              </div>
              <p className="text-slate-700 font-medium leading-relaxed">
                {activeCase.verifiedRootCause || activeCase.rootCauses[0]}
              </p>
            </div>

            {/* Safety & Action */}
            <div className="pt-2 flex items-center justify-between">
              <span className="text-xs text-slate-400">
                Chứng cứ: <strong className="text-slate-600">{activeCase.evidences.length} file đính kèm</strong>
              </span>

              <button
                onClick={() => onOpenVerifyModal(activeCase)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-md shadow-emerald-500/20 transition flex items-center gap-2"
              >
                <span>Xác nhận kết quả & Chuyển sang Stage 03 (Phê duyệt SOP)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};
