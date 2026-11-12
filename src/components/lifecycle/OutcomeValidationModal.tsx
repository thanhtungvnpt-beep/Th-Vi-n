import React, { useState } from 'react';
import {
  X,
  CheckCircle2,
  Clock,
  DollarSign,
  AlertOctagon,
  RefreshCw,
  Award,
} from 'lucide-react';
import { LifecycleCase, ValidationOutcome } from '../../types';

interface OutcomeValidationModalProps {
  isOpen: boolean;
  onClose: () => void;
  caseItem: LifecycleCase | null;
  onValidateSuccess: (
    caseId: string,
    outcome: ValidationOutcome,
    stabilityHours: number,
    recurrence: boolean,
    mttrHours: number,
    costSaving: number,
    notes: string
  ) => void;
}

export const OutcomeValidationModal: React.FC<OutcomeValidationModalProps> = ({
  isOpen,
  onClose,
  caseItem,
  onValidateSuccess,
}) => {
  const [outcome, setOutcome] = useState<ValidationOutcome>(
    caseItem?.outcomeValidation?.outcome || 'verified_successful'
  );
  const [stabilityHours, setStabilityHours] = useState<number>(
    caseItem?.outcomeValidation?.operatingStabilityHours || 48
  );
  const [recurrence, setRecurrence] = useState<boolean>(
    caseItem?.outcomeValidation?.recurrenceObserved || false
  );
  const [mttrHours, setMttrHours] = useState<number>(
    caseItem?.outcomeValidation?.mttrActualHours || 0.75
  );
  const [costSaving, setCostSaving] = useState<number>(
    caseItem?.outcomeValidation?.costSavingVND || 35000000
  );
  const [validationNotes, setValidationNotes] = useState<string>(
    caseItem?.outcomeValidation?.validationNotes ||
      'Máy đã chạy ổn định qua 4 ca sản xuất không tái diễn cảnh báo. Tri thức SOP đạt chuẩn đóng hồ sơ.'
  );

  if (!isOpen || !caseItem) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onValidateSuccess(
      caseItem.id,
      outcome,
      stabilityHours,
      recurrence,
      mttrHours,
      costSaving,
      validationNotes
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-[#0b1938] border border-[#1f386e] rounded-2xl w-full max-w-xl text-slate-100 shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-5 py-4 border-b border-[#1b3160] flex items-center justify-between bg-gradient-to-r from-[#0d2250] to-[#091738]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white flex items-center gap-2">
                Xác thực Hiệu quả Thực tế (Outcome Validation)
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
          {/* Outcome Radio Options */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300 block">
              Kết luận Đánh giá Hiệu quả <span className="text-rose-400">*</span>
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              {[
                {
                  id: 'verified_successful' as ValidationOutcome,
                  label: 'Thành công (Đạt)',
                  desc: 'Máy chạy ổn định, không lỗi',
                  color: 'border-emerald-500 text-emerald-400 bg-emerald-500/10',
                },
                {
                  id: 'partially_successful' as ValidationOutcome,
                  label: 'Một phần (Theo dõi)',
                  desc: 'Cần quan sát thêm 48h',
                  color: 'border-amber-500 text-amber-400 bg-amber-500/10',
                },
                {
                  id: 'failed' as ValidationOutcome,
                  label: 'Không đạt (Tái diễn)',
                  desc: 'Cần điều tra lại nguyên nhân',
                  color: 'border-rose-500 text-rose-400 bg-rose-500/10',
                },
              ].map((item) => (
                <div
                  key={item.id}
                  onClick={() => setOutcome(item.id)}
                  className={`p-3 rounded-xl border text-center cursor-pointer transition flex flex-col justify-between ${
                    outcome === item.id
                      ? `${item.color} shadow-sm shadow-blue-500/10`
                      : 'border-[#1b3260] bg-[#091530] text-slate-400 hover:border-slate-500'
                  }`}
                >
                  <span className="font-bold text-xs">{item.label}</span>
                  <span className="text-[10px] opacity-80 mt-1">{item.desc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-[#091530] border border-[#1b3260] rounded-xl space-y-1">
              <label className="text-[11px] font-semibold text-slate-300 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-blue-400" />
                Giờ vận hành ổn định liên tục
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min={0}
                  value={stabilityHours}
                  onChange={(e) => setStabilityHours(Number(e.target.value))}
                  className="w-full bg-[#050e24] border border-[#182b52] rounded-lg px-2.5 py-1.5 text-xs text-white font-mono font-bold"
                />
                <span className="text-xs text-slate-400">giờ</span>
              </div>
            </div>

            <div className="p-3 bg-[#091530] border border-[#1b3260] rounded-xl space-y-1">
              <label className="text-[11px] font-semibold text-slate-300 flex items-center gap-1.5">
                <RefreshCw className="w-3.5 h-3.5 text-blue-400" />
                Thời gian MTTR thực tế
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  step="0.05"
                  min={0}
                  value={mttrHours}
                  onChange={(e) => setMttrHours(Number(e.target.value))}
                  className="w-full bg-[#050e24] border border-[#182b52] rounded-lg px-2.5 py-1.5 text-xs text-white font-mono font-bold"
                />
                <span className="text-xs text-slate-400">giờ</span>
              </div>
            </div>

            <div className="p-3 bg-[#091530] border border-[#1b3260] rounded-xl space-y-1">
              <label className="text-[11px] font-semibold text-slate-300 flex items-center gap-1.5">
                <AlertOctagon className="w-3.5 h-3.5 text-blue-400" />
                Có tái diễn sự cố tương tự không?
              </label>
              <div className="flex items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setRecurrence(false)}
                  className={`flex-1 py-1 px-2 rounded-lg text-xs font-bold border transition ${
                    !recurrence
                      ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                      : 'bg-[#050e24] text-slate-400 border-[#182b52]'
                  }`}
                >
                  KHÔNG
                </button>
                <button
                  type="button"
                  onClick={() => setRecurrence(true)}
                  className={`flex-1 py-1 px-2 rounded-lg text-xs font-bold border transition ${
                    recurrence
                      ? 'bg-rose-500/20 text-rose-400 border-rose-500/30'
                      : 'bg-[#050e24] text-slate-400 border-[#182b52]'
                  }`}
                >
                  CÓ TÁI DIỄN
                </button>
              </div>
            </div>

            <div className="p-3 bg-[#091530] border border-[#1b3260] rounded-xl space-y-1">
              <label className="text-[11px] font-semibold text-slate-300 flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                Chi phí tiết kiệm ước tính (VND)
              </label>
              <input
                type="number"
                step="1000000"
                min={0}
                value={costSaving}
                onChange={(e) => setCostSaving(Number(e.target.value))}
                className="w-full bg-[#050e24] border border-[#182b52] rounded-lg px-2.5 py-1.5 text-xs text-emerald-400 font-mono font-bold"
              />
            </div>
          </div>

          {/* Validation Notes */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 block">
              Ghi chú thẩm định & Đề xuất hành động tiếp theo
            </label>
            <textarea
              rows={3}
              value={validationNotes}
              onChange={(e) => setValidationNotes(e.target.value)}
              className="w-full bg-[#091530] border border-[#1b3260] rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
              placeholder="Nhận xét của chuyên gia về độ tin cậy..."
            />
          </div>

          {/* Footer Actions */}
          <div className="pt-3 border-t border-[#1b3160] flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 rounded-xl transition"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 rounded-xl shadow-lg shadow-purple-600/30 transition flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              Lưu & Hoàn tất Xác thực Hồ sơ
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
