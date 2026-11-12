import React, { useState } from 'react';
import {
  X,
  CheckCircle,
  AlertTriangle,
  FileCheck2,
  ShieldAlert,
  Sliders,
  Camera,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { LifecycleCase } from '../../types';

interface TechnicalVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  caseItem: LifecycleCase | null;
  onVerifySuccess: (caseId: string, verifiedRootCause: string, confidence: number, safetyAlert: string) => void;
}

export const TechnicalVerificationModal: React.FC<TechnicalVerificationModalProps> = ({
  isOpen,
  onClose,
  caseItem,
  onVerifySuccess,
}) => {
  const [rootCause, setRootCause] = useState<string>(
    caseItem?.verifiedRootCause || caseItem?.rootCauses[0] || ''
  );
  const [confidence, setConfidence] = useState<number>(caseItem?.rootCauseConfidence || 95);
  const [safetyAlert, setSafetyAlert] = useState<string>(
    caseItem?.safetyAlert || 'Bắt buộc ngắt nguồn điện và gắn thẻ LOTO trước khi can thiệp cụm động cơ.'
  );
  const [inspectionChecks, setInspectionChecks] = useState<boolean[]>(
    caseItem?.inspectionSteps.map((s) => s.isPassed ?? true) || [true, true, true]
  );

  if (!isOpen || !caseItem) return null;

  const handleToggleCheck = (index: number) => {
    setInspectionChecks((prev) => {
      const next = [...prev];
      next[index] = !next[index];
      return next;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onVerifySuccess(caseItem.id, rootCause, confidence, safetyAlert);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-[#0b1938] border border-[#1f386e] rounded-2xl w-full max-w-2xl text-slate-100 shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-5 py-4 border-b border-[#1b3160] flex items-center justify-between bg-gradient-to-r from-[#0d2250] to-[#091738]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <FileCheck2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white flex items-center gap-2">
                Thẩm định & Xác minh Kỹ thuật (Technical Verification)
              </h3>
              <p className="text-xs text-blue-300">
                Hồ sơ: <span className="font-mono font-semibold text-white">{caseItem.id}</span> — {caseItem.title}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4 flex-1 overflow-y-auto max-h-[75vh]">
          {/* Diagnostic Evidence Preview */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-2">
                <Camera className="w-4 h-4 text-blue-400" />
                Bằng chứng hiện trường đã đính kèm ({caseItem.evidences.length})
              </label>
              {caseItem.evidences.length === 0 && (
                <span className="text-[11px] text-amber-400 flex items-center gap-1 font-semibold">
                  <AlertTriangle className="w-3.5 h-3.5" /> Chưa có ảnh/video hiện trường
                </span>
              )}
            </div>
            <div className="grid grid-cols-3 gap-2.5">
              {caseItem.evidences.length > 0 ? (
                caseItem.evidences.map((ev) => (
                  <div
                    key={ev.id}
                    className="group relative rounded-xl border border-[#1b3260] overflow-hidden bg-[#07132e] aspect-video flex items-center justify-center"
                  >
                    <img
                      src={ev.url}
                      alt={ev.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-2">
                      <span className="text-[10px] text-slate-200 line-clamp-1">{ev.name}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-3 py-6 text-center border border-dashed border-[#1e366a] rounded-xl text-slate-400 text-xs">
                  Không có file đính kèm. Kỹ thuật viên có thể bổ sung sau khi xác minh.
                </div>
              )}
            </div>
          </div>

          {/* Inspection Steps Verification */}
          {caseItem.inspectionSteps.length > 0 && (
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-2">
                <Layers className="w-4 h-4 text-blue-400" />
                Hạng mục kiểm tra thông số kỹ thuật
              </label>
              <div className="space-y-1.5 bg-[#091530] border border-[#1b3260] rounded-xl p-3">
                {caseItem.inspectionSteps.map((step, idx) => (
                  <div
                    key={step.number}
                    className="flex items-center justify-between py-1.5 border-b border-[#14264e] last:border-0 text-xs"
                  >
                    <div className="flex-1 pr-3">
                      <span className="font-semibold text-slate-200">
                        Bước {step.number}: {step.title}
                      </span>
                      {step.parameter && (
                        <div className="text-[11px] text-slate-400 flex items-center gap-3 mt-0.5">
                          <span>Thông số: <strong className="text-slate-300">{step.parameter}</strong></span>
                          <span>Chuẩn: <strong className="text-slate-300">{step.standard}</strong></span>
                          <span>Thực tế: <strong className="text-amber-300">{step.actual}</strong></span>
                        </div>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => handleToggleCheck(idx)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border transition flex items-center gap-1.5 ${
                        inspectionChecks[idx]
                          ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                          : 'bg-rose-500/20 text-rose-400 border-rose-500/30'
                      }`}
                    >
                      {inspectionChecks[idx] ? 'ĐẠT (PASS)' : 'KHÔNG ĐẠT (FAIL)'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Verified Root Cause */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 block">
              Kết luận Nguyên nhân gốc đã được Chuyên gia xác minh <span className="text-rose-400">*</span>
            </label>
            <textarea
              rows={3}
              value={rootCause}
              onChange={(e) => setRootCause(e.target.value)}
              className="w-full bg-[#091530] border border-[#1b3260] rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
              placeholder="Ghi rõ nguyên nhân kỹ thuật cốt lõi..."
              required
            />
          </div>

          {/* Root Cause Confidence Slider */}
          <div className="p-3.5 bg-[#091530] border border-[#1b3260] rounded-xl space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-blue-400" />
                Mức độ tin cậy nguyên nhân kỹ thuật (Confidence Score)
              </span>
              <span className="font-mono font-bold text-emerald-400 text-sm">{confidence}%</span>
            </div>
            <input
              type="range"
              min={50}
              max={100}
              step={1}
              value={confidence}
              onChange={(e) => setConfidence(Number(e.target.value))}
              className="w-full h-1.5 bg-[#1b3260] rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>50% (Sơ bộ)</span>
              <span>75% (Khá chắc chắn)</span>
              <span>90%+ (Kiểm chứng thực tế đầy đủ)</span>
            </div>
          </div>

          {/* Safety Alert Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-amber-400" />
              Cảnh báo an toàn bắt buộc khi áp dụng
            </label>
            <input
              type="text"
              value={safetyAlert}
              onChange={(e) => setSafetyAlert(e.target.value)}
              className="w-full bg-[#091530] border border-[#1b3260] rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
              placeholder="Quy chuẩn bảo hộ và an toàn..."
            />
          </div>

          {/* Footer Actions */}
          <div className="pt-3 border-t border-[#1b3160] flex items-center justify-between">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 rounded-xl transition"
            >
              Đóng
            </button>
            <div className="flex items-center gap-2">
              <button
                type="submit"
                className="px-5 py-2 text-xs font-bold text-white bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 rounded-xl shadow-lg shadow-emerald-600/30 transition flex items-center gap-2"
              >
                <CheckCircle className="w-4 h-4" />
                Xác nhận & Chuyển Phê duyệt Xuất bản SOP
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
