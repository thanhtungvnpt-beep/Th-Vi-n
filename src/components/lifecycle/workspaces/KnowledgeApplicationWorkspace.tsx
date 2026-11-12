import React, { useState } from 'react';
import {
  Wrench,
  CheckCircle2,
  Clock,
  PlayCircle,
  AlertTriangle,
  ArrowRight,
  ShieldAlert,
  User,
  CheckSquare,
} from 'lucide-react';
import { LifecycleCase, UserRole } from '../../../types';

interface KnowledgeApplicationWorkspaceProps {
  cases: LifecycleCase[];
  selectedCase: LifecycleCase | null;
  onSelectCase: (c: LifecycleCase) => void;
  onSubmitApplicationResult: (caseId: string, durationMinutes: number, resultNotes: string) => void;
  currentRole: UserRole;
}

export const KnowledgeApplicationWorkspace: React.FC<KnowledgeApplicationWorkspaceProps> = ({
  cases,
  selectedCase,
  onSelectCase,
  onSubmitApplicationResult,
  currentRole,
}) => {
  const stageCases = cases.filter((c) => c.currentStage === 'knowledge_application');
  const activeCase =
    selectedCase?.currentStage === 'knowledge_application' ? selectedCase : stageCases[0] || cases[0];

  const [stepStates, setStepStates] = useState<boolean[]>([true, true, true, false, false]);
  const [duration, setDuration] = useState<number>(activeCase?.applicationRecord?.executionDurationMinutes || 45);
  const [resultNotes, setResultNotes] = useState<string>(
    activeCase?.applicationRecord?.actualResultSummary ||
      'Nhiệt độ Spindle giảm về 44.8°C, lưu lượng nước đạt 13.2 L/phút, máy vận hành ổn định.'
  );

  const toggleStep = (index: number) => {
    setStepStates((prev) => {
      const next = [...prev];
      next[index] = !next[index];
      return next;
    });
  };

  return (
    <div className="space-y-4 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="bg-[#0b1b42] border border-[#162c5e] rounded-2xl p-4 text-white flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-400">
            <Wrench className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs px-2 py-0.5 rounded font-bold bg-amber-500/20 text-amber-300 border border-amber-400/30">
                STAGE 05
              </span>
              <h2 className="font-bold text-base text-white">Áp dụng Thực tế trên Sàn máy (Knowledge Application)</h2>
            </div>
            <p className="text-xs text-[#9eb6e2] mt-0.5">
              Kỹ thuật viên tại xưởng triển khai theo hướng dẫn sửa chữa số hóa, ghi nhận thời gian thao tác và thông số thực tế.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-300">Phụ trách: <strong className="text-amber-300">Technician / Vendor</strong></span>
        </div>
      </div>

      {/* Grid: Queue & Interactive Execution Runner */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left Col: Queue */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-3.5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-bold text-xs text-slate-800 uppercase tracking-wider">
              Ca đang triển khai ({stageCases.length})
            </span>
            <span className="text-[11px] font-mono text-amber-600 font-bold">Hiện trường máy</span>
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
                        ? 'bg-amber-50/80 border-amber-500 shadow-xs ring-1 ring-amber-400'
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-amber-700">{c.id}</span>
                      <span className="font-mono text-[10px] px-1.5 py-0.2 rounded bg-amber-100 text-amber-800 font-bold">
                        {c.errorCode}
                      </span>
                    </div>
                    <p className="font-bold text-slate-800 line-clamp-1">{c.title}</p>
                    <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-100">
                      <span>{c.equipmentId} ({c.line})</span>
                      <span className="text-amber-600 font-bold">Đang sửa chữa</span>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="py-8 text-center text-slate-400 text-xs border border-dashed border-slate-200 rounded-xl">
                Không có ca đang ở khâu áp dụng sàn máy.
              </div>
            )}
          </div>
        </div>

        {/* Right 2 Cols: Step-by-Step Runner */}
        {activeCase ? (
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/90 shadow-xs p-4 lg:p-5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
              <div>
                <span className="font-mono text-xs px-2 py-0.5 rounded font-bold bg-amber-50 text-amber-700 border border-amber-200">
                  {activeCase.id} — {activeCase.equipmentId}
                </span>
                <h3 className="font-bold text-base text-slate-800 mt-1">{activeCase.title}</h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400">Thời gian thực tế:</span>
                <input
                  type="number"
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  className="w-16 px-2 py-1 rounded-lg border border-slate-200 text-xs font-mono font-bold text-slate-800"
                />
                <span className="text-xs text-slate-500">phút</span>
              </div>
            </div>

            {/* Interactive Step Execution Checklist */}
            <div className="space-y-2">
              <span className="font-bold text-xs text-slate-700 flex items-center gap-1.5">
                <CheckSquare className="w-3.5 h-3.5 text-blue-500" />
                Quy trình thao tác chuẩn (Digital Work Instruction)
              </span>

              <div className="space-y-2">
                {[
                  { step: 1, text: 'Tắt nguồn lực Spindle, khóa van an toàn khí nén' },
                  { step: 2, text: 'Tháo cốc lọc 10µm phía sau vách máy kiểm tra cặn mạt' },
                  { step: 3, text: 'Thay lõi lọc tinh 10µm chính hãng Mitsubishi' },
                  { step: 4, text: 'Mở van nước hồi, đo lưu lượng thực tế (Chuẩn >= 12 L/phút)' },
                  { step: 5, text: 'Chạy thử không tải 3,000 RPM trong 15 phút theo dõi nhiệt độ' },
                ].map((s, idx) => (
                  <div
                    key={s.step}
                    onClick={() => toggleStep(idx)}
                    className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition text-xs ${
                      stepStates[idx]
                        ? 'bg-emerald-50/60 border-emerald-300 text-slate-800'
                        : 'bg-slate-50 border-slate-200 text-slate-500'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-5 h-5 rounded-md flex items-center justify-center border text-xs font-bold ${
                          stepStates[idx]
                            ? 'bg-emerald-600 text-white border-emerald-600'
                            : 'border-slate-300 bg-white'
                        }`}
                      >
                        {stepStates[idx] && <CheckCircle2 className="w-3.5 h-3.5" />}
                      </div>
                      <span className="font-semibold">Bước {s.step}: {s.text}</span>
                    </div>
                    <span className="text-[11px] font-mono font-bold text-emerald-700">
                      {stepStates[idx] ? 'ĐÃ HOÀN TẤT' : 'CHƯA LÀM'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Field Results Notes */}
            <div className="space-y-1.5 text-xs">
              <label className="font-bold text-slate-700 block">
                Ghi nhận kết quả đo kiểm thực tế sau khi xử lý:
              </label>
              <textarea
                rows={2}
                value={resultNotes}
                onChange={(e) => setResultNotes(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800 focus:outline-none focus:border-amber-500"
                placeholder="Nhập thông số thực tế đo được..."
              />
            </div>

            {/* Action */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
              <button
                onClick={() => onSubmitApplicationResult(activeCase.id, duration, resultNotes)}
                className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 shadow-md shadow-amber-500/20 transition flex items-center gap-2"
              >
                <span>Xác nhận hoàn tất sửa chữa & Chuyển sang Stage 06 (Xác thực hiệu quả)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};
