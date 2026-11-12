import React, { useState } from 'react';
import {
  Activity,
  AlertTriangle,
  Clock,
  Plus,
  Camera,
  Shield,
  ArrowRight,
  CheckCircle2,
  FileText,
  User,
  Zap,
  Search,
  Copy,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';
import { LifecycleCase, UserRole } from '../../../types';

interface IncidentCaptureWorkspaceProps {
  cases: LifecycleCase[];
  selectedCase: LifecycleCase | null;
  onSelectCase: (c: LifecycleCase) => void;
  onOpenNewIncidentModal: () => void;
  onProceedToVerification: (caseId: string) => void;
  currentRole: UserRole;
}

export const IncidentCaptureWorkspace: React.FC<IncidentCaptureWorkspaceProps> = ({
  cases,
  selectedCase,
  onSelectCase,
  onOpenNewIncidentModal,
  onProceedToVerification,
  currentRole,
}) => {
  const stageCases = cases.filter((c) => c.currentStage === 'incident_capture');
  const activeCase = selectedCase?.currentStage === 'incident_capture' ? selectedCase : stageCases[0] || cases[0];
  const [duplicateDismissed, setDuplicateDismissed] = useState<boolean>(false);

  // Check if current case has potential duplicate
  const potentialDuplicate = activeCase
    ? cases.find(
        (c) =>
          c.id !== activeCase.id &&
          c.errorCode === activeCase.errorCode &&
          c.equipmentId === activeCase.equipmentId
      )
    : null;

  return (
    <div className="space-y-4 animate-in fade-in duration-200">
      {/* Workspace Header Banner */}
      <div className="bg-[#0b1b42] border border-[#162c5e] rounded-2xl p-4 text-white flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-400">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs px-2 py-0.5 rounded font-bold bg-blue-500/20 text-cyan-300 border border-cyan-400/30">
                STAGE 01
              </span>
              <h2 className="font-bold text-base text-white">Ghi nhận Sự cố & Phân loại Ban đầu (Incident Capture)</h2>
            </div>
            <p className="text-xs text-[#9eb6e2] mt-0.5">
              Tiếp nhận lỗi từ sàn máy, đính kèm bằng chứng hiện trường, đánh giá mức độ khẩn cấp, phát hiện trùng lặp tự động (Duplicate Detection).
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-300">Phụ trách: <strong className="text-white">Technician / Sàn máy</strong></span>
          <button
            onClick={onOpenNewIncidentModal}
            className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 transition shadow-md flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ Tiếp nhận sự cố</span>
          </button>
        </div>
      </div>

      {/* Grid: Left List (1 col) - Right Workspace Shell (2 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left Column: Intake Queue */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-3.5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-bold text-xs text-slate-800 uppercase tracking-wider">
              Danh sách tiếp nhận ({stageCases.length})
            </span>
            <span className="text-[11px] font-mono text-blue-600 font-bold">Thời gian chờ TB: 1.5h</span>
          </div>

          <div className="space-y-2">
            {stageCases.length > 0 ? (
              stageCases.map((c) => {
                const isSelected = activeCase?.id === c.id;
                return (
                  <div
                    key={c.id}
                    onClick={() => {
                      onSelectCase(c);
                      setDuplicateDismissed(false);
                    }}
                    className={`p-3 rounded-xl border cursor-pointer transition text-xs space-y-1.5 ${
                      isSelected
                        ? 'bg-blue-50/80 border-blue-500 shadow-xs ring-1 ring-blue-400'
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-blue-700">{c.id}</span>
                      <span className="font-mono text-[10px] px-1.5 py-0.2 rounded bg-amber-100 text-amber-800 font-bold">
                        {c.errorCode}
                      </span>
                    </div>
                    <p className="font-bold text-slate-800 line-clamp-1">{c.title}</p>
                    <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-100">
                      <span>{c.equipmentId} ({c.model})</span>
                      <span>Dừng: <strong className="text-amber-600">{c.downtimeHours}h</strong></span>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="py-8 text-center text-slate-400 text-xs border border-dashed border-slate-200 rounded-xl">
                Không có hồ sơ mới đang chờ tại Stage 01.
              </div>
            )}
          </div>
        </div>

        {/* Right 2 Columns: Active Case Intake Inspection & Diagnostic Shell */}
        {activeCase ? (
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/90 shadow-xs p-4 lg:p-5 space-y-4">
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-xs text-blue-700 px-2 py-0.5 rounded bg-blue-50 border border-blue-200">
                    {activeCase.id}
                  </span>
                  <span className="font-mono text-xs px-2 py-0.5 rounded font-bold bg-amber-50 text-amber-700 border border-amber-200">
                    Mã lỗi: {activeCase.errorCode}
                  </span>
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200">
                    Ưu tiên: {activeCase.priority}
                  </span>
                </div>
                <h3 className="font-bold text-base text-slate-800 mt-1.5">{activeCase.title}</h3>
              </div>

              <div className="text-right text-xs text-slate-500">
                <div>Thời điểm xảy ra: <strong className="text-slate-700">{activeCase.occurrenceTime}</strong></div>
                <div>Nhà máy: <strong className="text-slate-700">{activeCase.factory} — {activeCase.line}</strong></div>
              </div>
            </div>

            {/* DUPLICATE DETECTION ALERT BANNER */}
            {potentialDuplicate && !duplicateDismissed && (
              <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs animate-in fade-in duration-150">
                <div className="flex items-start gap-2.5">
                  <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="flex items-center gap-2">
                      <strong className="text-amber-900 font-bold">CẢNH BÁO TRÙNG LẶP (DUPLICATE DETECTION):</strong>
                      <span className="px-2 py-0.2 rounded font-mono font-bold bg-amber-200 text-amber-800 text-[10px]">
                        91% Tương đồng
                      </span>
                    </div>
                    <p className="text-amber-800 text-[11px] mt-0.5">
                      Phát hiện hồ sơ <strong className="font-mono">{potentialDuplicate.id}</strong> cùng thiết bị <strong className="font-mono">{potentialDuplicate.equipmentId}</strong> và mã lỗi <strong className="font-mono">{potentialDuplicate.errorCode}</strong> đã được giải quyết trước đó.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0 self-end sm:self-center">
                  <button
                    onClick={() => onSelectCase(potentialDuplicate)}
                    className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-white border border-amber-300 text-amber-900 hover:bg-amber-100 transition flex items-center gap-1"
                  >
                    <span>Xem hồ sơ cũ</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => setDuplicateDismissed(true)}
                    className="px-2.5 py-1 rounded-lg text-[11px] text-amber-700 hover:bg-amber-100 transition"
                  >
                    Bỏ qua
                  </button>
                </div>
              </div>
            )}

            {/* Diagnostic Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1.5">
                <span className="font-bold text-slate-700 block flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                  Hiện tượng ghi nhận thực tế
                </span>
                <ul className="list-disc list-inside space-y-1 text-slate-600 pl-1 text-[11px]">
                  {activeCase.phenomenon.map((p, i) => (
                    <li key={i}>{p}</li>
                  ))}
                </ul>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1.5">
                <span className="font-bold text-slate-700 block flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-blue-500" />
                  Sơ bộ nguyên nhân nghi vấn
                </span>
                <ul className="list-disc list-inside space-y-1 text-slate-600 pl-1 text-[11px]">
                  {activeCase.rootCauses.map((r, i) => (
                    <li key={i}>{r}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Evidence & Telemetry Attachments Shell */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-700 flex items-center gap-1.5">
                  <Camera className="w-3.5 h-3.5 text-blue-500" />
                  Bằng chứng hiện trường ({activeCase.evidences.length})
                </span>
                <span className="text-[11px] text-slate-400">Ảnh màn hình HMI, Cốc lọc, Video đo</span>
              </div>

              <div className="grid grid-cols-3 gap-2.5">
                {activeCase.evidences.map((ev) => (
                  <div
                    key={ev.id}
                    className="group relative rounded-xl border border-slate-200 overflow-hidden bg-slate-900 aspect-video"
                  >
                    <img src={ev.url} alt={ev.name} className="w-full h-full object-cover group-hover:scale-105 transition" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-2">
                      <span className="text-[10px] text-white line-clamp-1">{ev.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Reporter & Action Bar */}
            <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <img src={activeCase.reportedBy.avatar} alt={activeCase.reportedBy.name} className="w-7 h-7 rounded-full object-cover border" />
                <div>
                  <span className="font-bold text-slate-800">{activeCase.reportedBy.name}</span>
                  <span className="text-slate-400 text-[11px] block">{activeCase.reportedBy.role} ({activeCase.reportedBy.vendor})</span>
                </div>
              </div>

              <button
                onClick={() => onProceedToVerification(activeCase.id)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-md shadow-blue-500/20 transition flex items-center justify-center gap-2"
              >
                <span>Xác nhận thông tin & Chuyển sang Stage 02 (Xác minh kỹ thuật)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ) : (
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/90 shadow-xs p-12 text-center text-slate-400 text-xs">
            Vui lòng chọn một hồ sơ tiếp nhận bên trái để xem chi tiết.
          </div>
        )}
      </div>
    </div>
  );
};
