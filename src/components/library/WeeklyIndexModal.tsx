import React from 'react';
import { X, CalendarDays, CheckCircle2, AlertCircle, Lightbulb, Clock } from 'lucide-react';
import { BookWeeklyPage, MachineBook } from '../../types';

interface WeeklyIndexModalProps {
  isOpen: boolean;
  book: MachineBook;
  pages: BookWeeklyPage[];
  activeWeek: number;
  onSelectWeek: (weekNumber: number) => void;
  onClose: () => void;
}

const QUARTERS = [
  { id: 'Q1', label: 'Quý I (W01 – W13)', start: 1, end: 13 },
  { id: 'Q2', label: 'Quý II (W14 – W26)', start: 14, end: 26 },
  { id: 'Q3', label: 'Quý III (W27 – W39)', start: 27, end: 39 },
  { id: 'Q4', label: 'Quý IV (W40 – W52)', start: 40, end: 52 },
];

export const WeeklyIndexModal: React.FC<WeeklyIndexModalProps> = ({
  isOpen,
  book,
  pages,
  activeWeek,
  onSelectWeek,
  onClose,
}) => {
  if (!isOpen) return null;

  const loggedWeeksCount = pages.filter((p) => p.status !== 'planned').length;
  const yearProgressPct = Math.round((loggedWeeksCount / 52) * 100);
  const allIncidents = pages.flatMap((p) => p.incidents);
  const resolvedIncidentsCount = allIncidents.filter(
    (inc) => inc.status === 'RESOLVED' || inc.status === 'VERIFIED' || Boolean(inc.solution)
  ).length;
  const activeOeePages = pages.filter((p) => p.oeeRate > 0);
  const avgOee =
    activeOeePages.length > 0
      ? (activeOeePages.reduce((sum, p) => sum + p.oeeRate, 0) / activeOeePages.length).toFixed(1)
      : '0.0';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl w-full max-w-4xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-5 py-3.5 bg-[#091738] text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-[#1864f3] flex items-center justify-center shrink-0">
              <CalendarDays className="w-4 h-4 text-white" />
            </div>
            <div className="min-w-0">
              <h3 className="font-bold text-sm truncate">
                Mục Lục 52 Tuần — {book.assetCode} ({book.machineName})
              </h3>
              <p className="text-[11px] text-blue-200">
                Chọn trực tiếp trang tuần (W01–W52) để xem nhật ký sự cố, 5-Why và Kaizen
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Status Legend */}
        <div className="px-5 py-2.5 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center gap-3 text-[11px] font-medium text-slate-700">
          <span className="inline-flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-[#1864f3]" />
            <span>Đang xem (Active Week)</span>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-emerald-500" />
            <span>Đã đóng sổ / ISO 100%</span>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-red-500" />
            <span>Sự cố khẩn (Alarm/Line Stop)</span>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-amber-500" />
            <span>Sáng kiến Kaizen (+ROI)</span>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-slate-300" />
            <span>Tuần kế hoạch tương lai</span>
          </span>
        </div>

        {/* 4 Quarters Matrix */}
        <div className="p-5 overflow-y-auto space-y-4">
          {QUARTERS.map((q) => {
            const quarterPages = pages.filter(
              (p) => p.weekNumber >= q.start && p.weekNumber <= q.end
            );

            return (
              <div key={q.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    {q.label}
                  </h4>
                  <span className="font-mono text-[11px] text-slate-500">
                    {quarterPages.filter((p) => p.isSignedOff).length}/{quarterPages.length} tuần
                    đã nghiệm thu ISO
                  </span>
                </div>

                <div className="grid grid-cols-4 sm:grid-cols-7 md:grid-cols-13 gap-2">
                  {quarterPages.map((page) => {
                    const isCurrent = page.weekNumber === activeWeek;
                    const hasIncident = page.incidents.length > 0;
                    const hasKaizen = page.kaizens.length > 0;

                    let cardClass =
                      'bg-slate-100 border-slate-200 text-slate-500 hover:bg-slate-200/70';
                    if (isCurrent) {
                      cardClass =
                        'bg-[#1864f3] border-[#0f4ac2] text-white ring-2 ring-blue-300 shadow-sm';
                    } else if (page.status === 'incident_alert') {
                      cardClass =
                        'bg-red-50 border-red-300 text-red-900 hover:bg-red-100';
                    } else if (page.status === 'kaizen_highlight') {
                      cardClass =
                        'bg-amber-50 border-amber-300 text-amber-900 hover:bg-amber-100';
                    } else if (page.status === 'signed_off' || page.isSignedOff) {
                      cardClass =
                        'bg-emerald-50 border-emerald-300 text-emerald-900 hover:bg-emerald-100';
                    } else if (page.status === 'active_review') {
                      cardClass =
                        'bg-blue-50 border-blue-300 text-blue-900 hover:bg-blue-100';
                    }

                    return (
                      <button
                        key={page.id}
                        type="button"
                        onClick={() => {
                          onSelectWeek(page.weekNumber);
                          onClose();
                        }}
                        className={`p-2 rounded-lg border text-left transition-all cursor-pointer flex flex-col justify-between min-h-[60px] ${cardClass}`}
                      >
                        <div className="flex items-center justify-between gap-1">
                          <span className="font-mono text-[11px] font-bold tabular-nums">
                            W{String(page.weekNumber).padStart(2, '0')}
                          </span>
                          {isCurrent ? (
                            <Clock className="w-3 h-3 text-white" />
                          ) : page.isSignedOff ? (
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          ) : hasIncident ? (
                            <AlertCircle className="w-3 h-3 text-red-600" />
                          ) : hasKaizen ? (
                            <Lightbulb className="w-3 h-3 text-amber-600" />
                          ) : null}
                        </div>

                        <div className="mt-1 flex items-center justify-between text-[9px] font-mono tabular-nums">
                          <span>{page.oeeRate > 0 ? `${page.oeeRate}%` : 'Kế hoạch'}</span>
                          {(hasIncident || hasKaizen) && (
                            <span className="font-bold">
                              {hasIncident ? `${page.incidents.length}SC` : `${page.kaizens.length}KZ`}
                            </span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Cumulative Annual Footer */}
        <div className="px-5 py-3 bg-slate-50 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="bg-white p-2.5 rounded-xl border border-slate-200 flex items-center justify-between">
            <span className="text-slate-600 font-medium">Tiến độ ghi nhận năm:</span>
            <strong className="font-mono text-slate-900 tabular-nums">
              {loggedWeeksCount}/52 tuần ({yearProgressPct}%)
            </strong>
          </div>
          <div className="bg-white p-2.5 rounded-xl border border-slate-200 flex items-center justify-between">
            <span className="text-slate-600 font-medium">Tổng sự cố đã xử lý:</span>
            <strong className="font-mono text-emerald-700 tabular-nums">
              {resolvedIncidentsCount}/{allIncidents.length} ca
            </strong>
          </div>
          <div className="bg-white p-2.5 rounded-xl border border-slate-200 flex items-center justify-between">
            <span className="text-slate-600 font-medium">OEE trung bình lũy kế:</span>
            <strong className="font-mono text-blue-700 tabular-nums">{avgOee}%</strong>
          </div>
        </div>
      </div>
    </div>
  );
};
