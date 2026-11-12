import React, { useState } from 'react';
import { X, UserCheck, Clock, AlertTriangle, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { LifecycleCase } from '../../types';
import { TECHNICAL_EXPERTS_LIST } from '../../data/mockData';

interface AssignExpertModalProps {
  isOpen: boolean;
  onClose: () => void;
  caseItem: LifecycleCase | null;
  onConfirm: (caseId: string, expertId: string, slaHours: number, note: string) => void;
}

export const AssignExpertModal: React.FC<AssignExpertModalProps> = ({
  isOpen,
  onClose,
  caseItem,
  onConfirm,
}) => {
  const [selectedExpertId, setSelectedExpertId] = useState<string>(
    caseItem?.assignedExpert?.id || TECHNICAL_EXPERTS_LIST[0].id
  );
  const [slaHours, setSlaHours] = useState<number>(24);
  const [assignmentNote, setAssignmentNote] = useState<string>(
    'Ưu tiên thẩm định nguyên nhân gốc và kiểm tra lưu lượng làm mát.'
  );

  if (!isOpen || !caseItem) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm(caseItem.id, selectedExpertId, slaHours, assignmentNote);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-[#0b1938] border border-[#1f386e] rounded-2xl w-full max-w-xl text-slate-100 shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-5 py-4 border-b border-[#1b3160] flex items-center justify-between bg-gradient-to-r from-[#0d2250] to-[#091738]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white flex items-center gap-2">
                Phân công Chuyên gia Thẩm định Kỹ thuật
              </h3>
              <p className="text-xs text-blue-300">
                Hồ sơ: <span className="font-mono font-semibold text-white">{caseItem.id}</span> — {caseItem.equipmentId} ({caseItem.model})
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
          {/* Case Summary Card */}
          <div className="p-3.5 bg-[#091530] border border-[#1b3260] rounded-xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-300">Mã lỗi: <span className="text-amber-400 font-mono font-bold">{caseItem.errorCode}</span></span>
              <span className="text-[11px] px-2 py-0.5 rounded-full font-semibold uppercase bg-blue-500/10 text-blue-400 border border-blue-500/20">
                {caseItem.priority}
              </span>
            </div>
            <p className="text-sm font-medium text-white">{caseItem.title}</p>
            <div className="flex items-center gap-4 text-xs text-slate-400 pt-1 border-t border-[#162950]">
              <span>Nhà máy: <strong className="text-slate-200">{caseItem.factory}</strong></span>
              <span>Line: <strong className="text-slate-200">{caseItem.line}</strong></span>
              <span>Thời gian dừng máy: <strong className="text-amber-300">{caseItem.downtimeHours}h</strong></span>
            </div>
          </div>

          {/* Expert Selection */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300 block">
              Chọn Chuyên gia kỹ thuật chịu trách nhiệm (Technical Expert) <span className="text-rose-400">*</span>
            </label>
            <div className="space-y-2">
              {TECHNICAL_EXPERTS_LIST.map((expert) => {
                const isSelected = selectedExpertId === expert.id;
                return (
                  <div
                    key={expert.id}
                    onClick={() => setSelectedExpertId(expert.id)}
                    className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition ${
                      isSelected
                        ? 'bg-blue-600/15 border-blue-500 shadow-sm shadow-blue-500/20'
                        : 'bg-[#091530] border-[#1b3260] hover:border-slate-600 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={expert.avatar}
                        alt={expert.name}
                        className="w-10 h-10 rounded-full object-cover border border-[#2b4c8c]"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-white">{expert.name}</span>
                          <span className="text-[10px] px-2 py-0.5 rounded font-mono font-bold bg-[#142955] text-blue-300 border border-blue-500/30">
                            {expert.vendor}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400">{expert.role}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-slate-400">Đang xử lý:</span>
                      <div className="text-xs font-bold text-amber-400">{expert.activeCases} hồ sơ</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* SLA Target Selection */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
              <span>Thời hạn cam kết SLA (Cam kết hoàn thành xác minh)</span>
              <span className="text-blue-400 font-bold">{slaHours} giờ</span>
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[8, 12, 24, 48].map((hours) => (
                <button
                  type="button"
                  key={hours}
                  onClick={() => setSlaHours(hours)}
                  className={`py-2 px-3 rounded-lg text-xs font-semibold border transition ${
                    slaHours === hours
                      ? 'bg-blue-600 text-white border-blue-400 shadow-sm'
                      : 'bg-[#091530] text-slate-300 border-[#1b3260] hover:bg-[#132758]'
                  }`}
                >
                  <Clock className="w-3.5 h-3.5 inline mr-1 opacity-70" />
                  {hours}h
                </button>
              ))}
            </div>
          </div>

          {/* Assignment Note */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 block">
              Ghi chú chỉ đạo cho Chuyên gia
            </label>
            <textarea
              rows={3}
              value={assignmentNote}
              onChange={(e) => setAssignmentNote(e.target.value)}
              className="w-full bg-[#091530] border border-[#1b3260] rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
              placeholder="Yêu cầu kiểm tra các hạng mục quan trọng..."
            />
          </div>

          {/* Footer Actions */}
          <div className="pt-3 border-t border-[#1b3160] flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 rounded-xl transition"
            >
              Hủy bỏ
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 rounded-xl shadow-lg shadow-blue-600/30 transition flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              Xác nhận phân công
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
