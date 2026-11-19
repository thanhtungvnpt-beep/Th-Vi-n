import React, { useState, useMemo, useEffect } from 'react';
import { Search, X, MapPin, BookOpen, AlertCircle, Cpu } from 'lucide-react';
import { BookWeeklyPage, MachineBook } from '../../types';
import { OEM_CABINETS } from '../../data/libraryData';

interface SpotlightLocatorModalProps {
  isOpen: boolean;
  books: MachineBook[];
  pagesByBookId: Record<string, BookWeeklyPage[]>;
  onClose: () => void;
  onLocateOnShelf: (book: MachineBook) => void;
  onOpenLogbook: (book: MachineBook, weekNumber?: number) => void;
}

export const SpotlightLocatorModal: React.FC<SpotlightLocatorModalProps> = ({
  isOpen,
  books,
  pagesByBookId,
  onClose,
  onLocateOnShelf,
  onOpenLogbook,
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return books
      .map((book) => {
        const pages = pagesByBookId[book.id] || [];
        const matchedIncident = q
          ? pages
              .flatMap((p) => p.incidents)
              .find(
                (inc) =>
                  inc.errorCode.toLowerCase().includes(q) ||
                  inc.title.toLowerCase().includes(q) ||
                  inc.solution?.why5RootCause.toLowerCase().includes(q)
              )
          : undefined;

        const matchesBook =
          !q ||
          book.assetCode.toLowerCase().includes(q) ||
          book.machineName.toLowerCase().includes(q) ||
          book.vendorName.toLowerCase().includes(q) ||
          book.specSubtitle.toLowerCase().includes(q) ||
          book.footerTag.toLowerCase().includes(q) ||
          Boolean(matchedIncident);

        if (!matchesBook) return null;

        const cabinet = OEM_CABINETS.find((c) => c.id === book.vendorId);
        return {
          book,
          cabinet,
          matchedIncident,
        };
      })
      .filter((item): item is NonNullable<typeof item> => item !== null)
      .slice(0, 10);
  }, [query, books, pagesByBookId]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Input */}
        <div className="px-4 py-3 bg-[#091738] text-white flex items-center gap-3">
          <Search className="w-4 h-4 text-blue-300 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Tìm theo mã máy (BK-DMU-50), mã lỗi OEM (AL-310), thông số (RPM, Bar, HSK-A63)..."
            className="w-full bg-transparent text-sm text-white placeholder-blue-200/70 outline-none"
          />
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Preset Hints */}
        <div className="px-4 py-2 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center gap-1.5 text-[11px]">
          <span className="text-slate-500 font-medium mr-1">Gợi ý nhanh:</span>
          {['AL-310', 'BK-DMU-50', 'MZK-800', '20k RPM', 'HSK-A63', '315 bar'].map((chip) => (
            <button
              key={chip}
              type="button"
              onClick={() => setQuery(chip)}
              className="px-2 py-0.5 rounded bg-white border border-slate-200 hover:border-blue-400 text-slate-700 font-mono cursor-pointer"
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Results */}
        <div className="p-3 overflow-y-auto space-y-2">
          {results.length === 0 ? (
            <div className="py-10 text-center text-xs text-slate-500">
              Không tìm thấy cuốn sổ tay hoặc mã lỗi phù hợp với "{query}".
            </div>
          ) : (
            results.map(({ book, cabinet, matchedIncident }) => (
              <div
                key={book.id}
                className="p-3 rounded-xl border border-slate-200 hover:border-blue-400 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors"
              >
                <div className="space-y-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-[#091738] text-white font-mono text-[10px] font-bold">
                      {book.assetCode}
                    </span>
                    <span className="font-mono text-[11px] font-semibold text-blue-700 flex items-center gap-1">
                      <Cpu className="w-3 h-3" />
                      Tủ {cabinet?.shortName || book.vendorName} &gt; Kệ 0{book.cabinetShelfNo}{' '}
                      &gt; Vị trí #0{book.positionIndex}
                    </span>
                  </div>

                  <div className="text-xs font-bold text-slate-900 truncate">
                    {book.machineName}
                  </div>
                  <div className="text-[11px] text-slate-500 font-mono">
                    {book.specSubtitle} • Hoàn thiện: {book.completionRate.toFixed(1)}%
                  </div>

                  {matchedIncident && (
                    <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-red-50 border border-red-200 text-red-800 text-[11px]">
                      <AlertCircle className="w-3 h-3 shrink-0" />
                      <span>
                        Khớp mã lỗi <strong>{matchedIncident.errorCode}</strong> (Tuần W
                        {String(matchedIncident.weekNumber).padStart(2, '0')}):{' '}
                        {matchedIncident.title}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => {
                      onLocateOnShelf(book);
                      onClose();
                    }}
                    className="px-3 py-1.5 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-950 text-xs font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Định vị trên kệ</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      onOpenLogbook(book, matchedIncident?.weekNumber);
                      onClose();
                    }}
                    className="px-3 py-1.5 rounded-lg bg-[#1864f3] hover:bg-[#1456d8] text-white text-xs font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Mở sổ tay</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
