import React from 'react';
import { Plus, AlertTriangle, Trash2, BookOpen } from 'lucide-react';
import { MachineBook, OemCabinetId, OemCabinetInfo } from '../../types';
import { BookSpineCard } from './BookSpineCard';

interface BookshelfCabinetSectionProps {
  cabinet: OemCabinetInfo;
  books: MachineBook[];
  highlightedBookId?: string | null;
  canManageCabinets?: boolean;
  onSelectBook: (book: MachineBook) => void;
  onOpenAddBook: (cabinetId: OemCabinetId) => void;
  onDeleteCustomCabinet?: (cabinetId: OemCabinetId) => void;
}

export const BookshelfCabinetSection: React.FC<BookshelfCabinetSectionProps> = ({
  cabinet,
  books,
  highlightedBookId,
  canManageCabinets = false,
  onSelectBook,
  onOpenAddBook,
  onDeleteCustomCabinet,
}) => {
  const totalAdminAlerts = books.reduce((sum, b) => sum + b.adminErrorCount, 0);

  return (
    <section id={`library-cabinet-${cabinet.id}`} className="flex flex-col gap-2.5">
      {/* Cabinet Header Bar */}
      <div
        className={`flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 rounded-xl border ${
          totalAdminAlerts >= 4
            ? 'bg-red-50/85 border-red-200/80'
            : 'bg-white border-slate-200/85'
        } shadow-xs`}
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <span
            className="w-3 h-3 rounded-xs shrink-0"
            style={{ backgroundColor: cabinet.accentColor }}
          />
          <h2 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight truncate">
            {cabinet.shelfCode} • {cabinet.name}
          </h2>
          {cabinet.isCustom && (
            <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 font-mono text-[10px] font-bold shrink-0">
              TỦ MỚI (ADMIN)
            </span>
          )}
          {totalAdminAlerts > 0 && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-red-100 text-red-700 font-mono text-[10px] font-bold shrink-0">
              <AlertTriangle className="w-3 h-3" />
              {totalAdminAlerts} MÃ LỖI CHỜ XỬ LÝ
            </span>
          )}
        </div>

        <div className="flex items-center gap-3 font-mono text-[11px] text-slate-500 tabular-nums shrink-0">
          <span>XUẤT XỨ: {cabinet.country.toUpperCase()}</span>
          <span className="text-slate-300">|</span>
          <span className="font-semibold text-slate-700">
            SỨC CHỨA TỦ: {cabinet.totalAssets} CUỐN ({books.length}{' '}
            {cabinet.isCustom ? 'ĐÃ TẠO' : 'TIÊU BIỂU'})
          </span>
          {cabinet.isCustom && canManageCabinets && books.length === 0 && onDeleteCustomCabinet && (
            <button
              type="button"
              onClick={() => onDeleteCustomCabinet(cabinet.id)}
              className="p-1 rounded-md text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
              title="Xóa kệ tủ trống"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Wooden Bookshelf Bay */}
      <div className="rounded-2xl p-4 sm:p-5 bg-[#f7f2ea] border border-[#e5decb] shadow-sm overflow-hidden flex flex-col">
        <div className="w-full overflow-x-auto pb-1">
          <div className="grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-8 gap-2.5 w-full items-end px-1 pt-4 pb-0">
            {books.map((book) => (
              <BookSpineCard
                key={book.id}
                book={book}
                isHighlighted={highlightedBookId === book.id}
                onSelectBook={onSelectBook}
              />
            ))}

            {/* 8th Slot: Admin Upload New Book */}
            <button
              type="button"
              onClick={() => onOpenAddBook(cabinet.id)}
              className="w-full h-[250px] rounded-lg border-2 border-dashed border-[#b09e80] bg-[#eee8db]/70 hover:bg-[#e7dfcd] flex flex-col items-center justify-center p-2.5 text-center cursor-pointer transition-colors group"
            >
              <div className="w-9 h-9 rounded-full border-2 border-[#8c7355] flex items-center justify-center text-[#8c7355] group-hover:scale-110 group-hover:bg-[#8c7355] group-hover:text-[#eee8db] transition-all">
                <Plus className="w-5 h-5 stroke-[2.2]" />
              </div>
              <span className="text-[12px] font-bold text-[#6a5338] mt-2.5 group-hover:text-[#3d2f1f]">
                Thêm Sách Mới
              </span>
              <span className="text-[10px] text-[#8c7355] mt-0.5 font-medium">
                (Admin Upload)
              </span>
            </button>

            {books.length === 0 && (
              <div className="col-span-1 sm:col-span-3 xl:col-span-7 h-[250px] rounded-lg border border-dashed border-[#d4c8b4] bg-[#f3ede2]/70 flex flex-col items-center justify-center p-4 text-center">
                <BookOpen className="w-7 h-7 text-[#8c7355] mb-2" />
                <div className="text-xs font-bold text-[#5a452d]">
                  Kệ tủ {cabinet.shortName} đã sẵn sàng tiếp nhận sổ tay máy
                </div>
                <p className="text-[11px] text-[#7c664c] mt-1 max-w-md">
                  Nhấp vào ô &ldquo;Thêm Sách Mới (Admin Upload)&rdquo; bên cạnh để đặt cuốn sổ
                  tay 52 tuần đầu tiên cho nhà cung cấp này.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Industrial Wood Bottom Shelf Rail */}
        <div className="w-full h-7 bg-gradient-to-r from-[#6e4e2e] via-[#876239] to-[#6e4e2e] rounded-md shadow-inner flex items-center justify-center px-4 border-t-2 border-[#a67c52] mt-0">
          <div className="flex items-center gap-2 overflow-hidden">
            <span className="w-2 h-2 rounded-full bg-[#fde047] opacity-80 shrink-0" />
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#f5ebd7] font-semibold truncate">
              {cabinet.shelfLabel}
            </span>
            <span className="w-2 h-2 rounded-full bg-[#fde047] opacity-80 shrink-0" />
          </div>
        </div>
      </div>
    </section>
  );
};
